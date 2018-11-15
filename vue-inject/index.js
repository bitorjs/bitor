import 'reflect-metadata';
import Vue from 'vue'
import metakeys from './metakeys';
import Application from '../../application/Application'
import client from '../app';

class VueApplication extends Application {
  constructor() {
    super()
    this.$vue = this.createVueRoot()

    this.ctx.render = (webview, props) => {
      this.$vue.webview = webview;
      this.$vue.props = props;
    }

    this.use((ctx, next) => {
      let routes = this.$route.match(ctx.url);
      console.log(routes)
      if (routes[0]) {
        routes[0].handle()
      }
      next()
    }).use(function (ctx, dispatch) {
      console.log('middleware end')
    })

    client(this);
  }

  mountVue() {
    Vue.prototype.$bitor = this;
  }

  createVueRoot() {

    return new Vue({
      el: '#root',
      data() {
        return {
          webview: null,
          props: null
        }
      },
      render: h => h({
        name: 'webview-container',
        render(h) {
          if (Object.prototype.toString.call(this.$root.webview) === '[object String]') {
            return h('span', this.$root.webview);
          }
          return h(this.$root.webview, {
            props: this.$root.props
          });
        }
      })
    })
  }

  start() {
    this.emit('ready');
    this.startServer()
    this.emit('after-server');
  }


  registerRoutes(classname) {
    const c = new classname(this.ctx)
    let routes = {};
    const prefix = Reflect.getMetadata('namespace', classname) || '';

    const ownPropertyNames = Object.getOwnPropertyNames(classname['prototype']);
    ownPropertyNames.forEach(propertyName => {
      metakeys.reduce((ret, cur) => {
        let subroute = Reflect.getMetadata(cur, classname['prototype'], propertyName);
        if (subroute) {
          let path;
          subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
          if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
            path = `${prefix.path}${subroute.path}`
          } else {
            path = `${subroute.path}`
          }

          this.$route.register(path, {
            method: subroute.method.toLowerCase(),
            // end: subroute.path !== '/'
          }, c[subroute.prototype].bind(c))
        }
      }, '')
    })
  }

  registerController(controller) {
    this.registerRoutes(controller)
  }

  registerComponent(component) {
    if (!(component instanceof Object)) {
      throw new TypeError('component must be Vue instance')
    }

    Vue.component(component.name, component);
  }

  registerDirective(name, option) {
    Vue.directive(name, option)
  }
}

new VueApplication().start()