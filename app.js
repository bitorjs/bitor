import Vue from 'vue'
import App from './view/index.vue'
import Empty from './view/empty.vue'
import C from './controllers/index'
import D from './decorators';
// import loader from './.classloader';

export default app => {
  // app.loader = loader;
  D.routes(C, app)
  // new C(app.ctx).renderApp()

  app.on('before-server', () => {

    // new C(app.ctx);

    // app.$route.register('/a11/:id/:age', {}, () => {
    //   app.ctx.render(App)
    // })

    // app.$route.register('*', {}, () => {
    //   app.ctx.render(Empty)
    // })

    app.use(function (ctx, next) {
      let routes = app.$route.match(ctx.url);
      console.log(routes)
      if (routes[0]) {
        routes[0].handle()
      } else {
        // app.ctx.render
      }
      next()
    }).use(function (ctx, dispatch) {
      console.log('success-----')
    })
  })

}