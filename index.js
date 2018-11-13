import Vue from 'vue'
import App from './index.vue'
import Application from "../application/Application";

Vue.prototype.$bitor = new Application();

new Vue({
  el: '#root',
  render: h => h(App)
})