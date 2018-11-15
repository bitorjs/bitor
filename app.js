import ReactApplication from './react-inject';
// import A from './app/controllers/demo';
// import D from './vue-inject/decorators';
import classloader from './.classloader'


let client = app => {
  app.on('ready', () => {
    const ctrls = classloader['controllers'];
    for (const key in ctrls) {
      if (ctrls.hasOwnProperty(key)) {
        const c = ctrls[key];
        app.registerController(c);
      }
    }
  })
}

new ReactApplication().start(client);

// 1. 这两个导入时候，接收的成员名称，必须这么写
// import React from 'react' // 创建组件、虚拟dom元素，生命周期
// import {
//   render
// } from 'react-dom' // 把创建好的组件和虚拟dom放到页面上展示的
// // import App from "./app/view"
// import Demo from './app/view/demo'

// render(React.createElement((() => {
//   return class extends React.Component {
//     constructor(props) {
//       super(props)
//     }

//     render() {
//       return (
//         <h1>Hello, Element</h1>
//       )
//     }
//   }
// })()), document.getElementById('root'));