import C from './app/controllers/index'
import A from './app/controllers/demo';
import {
  a
} from './test/index'

export default app => {
  app.on('ready', () => {
    app.controller(C);
    app.controller(A);

    app.use(function (ctx, next) {
      let routes = app.$route.match(ctx.url);
      console.log(routes)
      if (routes[0]) {
        routes[0].handle()
      }
      next()
    }).use(function (ctx, dispatch) {
      console.log('middleware end')
    })
  })

}