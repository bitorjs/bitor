import classloader from './.classloader';
import C from './app/controllers/index'
import A from './app/controllers/demo';
import D from './vue-inject/decorators';

console.log(classloader)

export default app => {
  app.on('ready', () => {
    const ctrls = classloader['controllers'];
    for (const key in ctrls) {
      if (ctrls.hasOwnProperty(key)) {
        const c = ctrls[key];
        app.controller(c);
      }
    }
  })
}