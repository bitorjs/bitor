import Vue from 'vue'
import tem from './view/index.vue'
import Application from "../application/Application";
import Router from '../router/router';
let router = new Router()
Vue.prototype.$bitor = new Application();

new Vue({
  el: '#root',
  render: h => h(tem)
  // data() {
  //   return {
  //     message: 'hello , bitor'
  //   }
  // }
})


// import Router from '../router/layer';

// var router1 = new Router("/asdf/:id/:name/:age", {
//   name: 'test'
// }, () => {
//   console.log()
// })
// router1.match("/asdf/1/3/5")

// var router2 = new Router("*", {
//   name: 'test'
// }, () => {
//   console.log()
// })
// router2.match("/test/1312")
//
// window.router = router;

// router.register("/asdf/:id/:name/:age", "GET", {}, () => {})
// router.register("/asdf/:id/ttt/:age", "POST", {}, (val) => {
//   console.log("=====000", val)
// })
// router.register("*", "GET", {}, () => {})

// router.match('/asdf/1/4/5', "GET");