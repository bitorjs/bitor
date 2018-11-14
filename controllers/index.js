import 'reflect-metadata';
import D from "../decorators";

@D.namespace('/order')
class Controller{
  constructor(ctx) {
    this.ctx = ctx;
  }

  //get /a11/:id/:age
  @D.Get('/a11/:id/:age')
  renderApp(){
    this.ctx.render(App);
  }
 
  //get *
  @D.Get('/a12/:id/:age')
  renderEmpty(){
    this.ctx.render(Empty)
  }

  test(){
    
  }
  
}

const {a} = {a:1}
console.log(a)
export default Controller;


console.log(Reflect.getMetadata('Get', Controller.prototype, 'renderEmpty'))
console.log(Reflect.getMetadata('Get', Controller.prototype))
console.log('@@@@-----')


console.log(Reflect.getMetadata('namespace', Controller))

const keys = Object.getOwnPropertyNames(Controller.prototype);
console.log(keys)
keys.forEach(key=>{
  console.log(Reflect.getMetadata('Get', Controller.prototype, key))
})
console.log('@@@@-----end')

console.log(Object.keys(Controller.prototype))

D.routes(Controller)