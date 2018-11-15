import 'reflect-metadata';
// 1. 这两个导入时候，接收的成员名称，必须这么写
import React from 'react' // 创建组件、虚拟dom元素，生命周期
import {
  render
} from 'react-dom' // 把创建好的组件和虚拟dom放到页面上展示的
import metakeys from './metakeys';
import Application from '../../application/Application'
// import client from '../app';

class ReactApplication extends Application {
  constructor() {
    super()

    this.$react = {
      webview: null,
      props: null
    }

    this.ctx.render = (webview, props) => {
      this.$react.webview = webview;
      this.$react.props = props;
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
  }

  mountVue() {}

  createVueRoot(rootElementId, rootComponent) {
    let root = React.createElement(this.$react.webview, this.$react.props)
    render(root, document.getElementById(rootElementId));
  }

  start(client, rootElementId, rootComponent) {
    rootElementId = rootElementId || "root"
    this.createVueRoot(rootElementId, rootComponent)
    this.registerPlugin(client)
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

          if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
            subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
            subroute.path = subroute.path === '*' ? '(.*)' : subroute.path;
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

  registerPlugin(plugin) {
    plugin(this);
  }
}

export default ReactApplication;