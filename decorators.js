import 'reflect-metadata';

const metakeys = ["namespace","Get","Post", "Delete", "Put", "Head"];
let decorators = {}
metakeys.map(key=>{
  // console.log(key)
  decorators[key] = (path)=>(target, name, descriptor) => {
    // console.log(key, path, target, name, descriptor)
    Reflect.defineMetadata(key, path, target, name);
  }
})

function getRoutes(classname) {
  let routes = {};
  const prefix = Reflect.getMetadata('namespace', classname) || '';

  const ownPropertyNames = Object.getOwnPropertyNames(classname['prototype']);
  ownPropertyNames.forEach(propertyName=>{
    let curUrl = metakeys.reduce((ret,cur)=>{
      let r = Reflect.getMetadata(cur, classname['prototype'], propertyName);
      if(r)ret += r;
      return ret;
    },'')
    if(curUrl.length>0) 
    console.log(`${prefix}${curUrl}`);
  })
}

decorators['routes'] = getRoutes;

export default decorators;