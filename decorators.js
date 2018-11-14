import 'reflect-metadata';

const metakeys = ["namespace", "Get", "Post", "Delete", "Put", "Head"];
let decorators = {}
metakeys.map(key => {
  // console.log(key)
  decorators[key] = (path) => (target, name, descriptor) => {
    // console.log(key, path, target, name, descriptor)
    Reflect.defineMetadata(key, {
      path,
      prototype: name,
      method: key
    }, target, name);
  }
})

function getRoutes(classname, app) {
  const c = new classname(app.ctx)
  let routes = {};
  const prefix = Reflect.getMetadata('namespace', classname) || '';

  const ownPropertyNames = Object.getOwnPropertyNames(classname['prototype']);
  ownPropertyNames.forEach(propertyName => {
    let curUrl = metakeys.reduce((ret, cur) => {
      let r = Reflect.getMetadata(cur, classname['prototype'], propertyName);
      console.log(r, classname.name)
      if (r) {
        let path = prefix.path ? `${prefix.path}${r.path}` : `${r.path}`
        app.$route.register(path, {
          method: r.method.toLowerCase()
        }, c[r.prototype].bind(c))
      }
    }, '')
    // if (curUrl.length > 0)
    // console.log(`${prefix}`);
  })
}

decorators['routes'] = getRoutes;

export default decorators;