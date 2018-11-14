import Vue from 'vue'
import Application from '../application/Application'
import Bootstrap from './app';

const app = new Application()
Bootstrap(app);
Vue.prototype.$bitor = app;
let root = new Vue({
  el: '#root',
  data(){
    return {
      webview:null,
      props: null
    }
  },
  render: h => h({
    name: 'webview-container',
    render(h) {
      return h(this.$root.webview, { props: this.$root.props });
    }
  })
})

app.ctx.render = (webview,props) =>{
  root.webview = webview;
  root.props = props;
}




app.emit('before-server');
app.startServer()
app.emit('after-server');