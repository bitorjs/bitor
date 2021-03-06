import Vue from 'vue'
import Application from '../application/Application'
import Bootstrap from './app';
import D from './decorators';

const app = new Application()
Bootstrap(app);
Vue.prototype.$bitor = app;
let root = new Vue({
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

app.controller = (Controller) => {
  D.routes(Controller, app)
}


app.ctx.render = (webview, props) => {
  root.webview = webview;
  root.props = props;
}


app.emit('ready');
app.startServer()
app.emit('after-server');