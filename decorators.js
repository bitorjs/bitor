import 'reflect-metadata';

const metakeys = ["namespace", "Get", "Post", "Delete", "Put", "Head"];
const decorators = {}
metakeys.map(key => {

  decorators[key] = (path) => (target, name, descriptor) => {
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
    metakeys.reduce((ret, cur) => {
      let subroute = Reflect.getMetadata(cur, classname['prototype'], propertyName);
      if (subroute) {
        let path;
        if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
          path = `${prefix.path}${subroute.path}`
        } else {
          path = `${subroute.path}`
        }

        app.$route.register(path, {
          method: subroute.method.toLowerCase()
        }, c[subroute.prototype].bind(c))
      }
    }, '')
  })
}

decorators['routes'] = getRoutes;


export default decorators;



// console.log(Reflect.getMetadata('Get', Controller.prototype, 'renderEmpty'))
// console.log(Reflect.getMetadata('Get', Controller.prototype))
// console.log('@@@@-----')


// console.log(Reflect.getMetadata('namespace', Controller))

// const keys = Object.getOwnPropertyNames(Controller.prototype);
// console.log(keys)
// keys.forEach(key => {
//   console.log(Reflect.getMetadata('Get', Controller.prototype, key))
// })
// console.log('@@@@-----end')

// console.log(Object.keys(Controller.prototype))