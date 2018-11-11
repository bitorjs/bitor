# bitor


### vue 运行时构建
```
npm install之后的vue
再去看查vue模块，添加几行
resolve: {
  alias: {
  'vue': 'vue/dist/vue.js'
  }
}
```

webpack4 后， Vue-loader 插件都需要显式引入

webpack -p 

webpack-dev-server 不会生成 dist

原因

webpack-dev-server动态生成的包并不发布到你的真实目录中（dist/）,而是放在了内存中。

四、解决

将项目的指向配置到虚拟服务器中。

修改index.html中的src路径为：

<script src="http://localhost:8080/bundle.js"></script>

content-base
设定webpack-dev-server伺服的directory。如果不进行设定的话，默认是在当前目录下。

这个时候还要注意的一点就是在webpack.config.js文件里面，如果配置了output的publicPath这个字段的值的话，在index.html文件里面也应该做出调整。因为webpack-dev-server伺服的文件是相对publicPath这个路径的。因此，如果你的webpack.config.js配置成这样的：

webpack-dev-server支持2种自动刷新的方式：

Iframe mode

inline mode

这2种模式配置的方式和访问的路径稍微有点区别，最主要的区别还是Iframe mode是在网页中嵌入了一个iframe，将我们自己的应用注入到这个iframe当中去，因此每次你修改的文件后，都是这个iframe进行了reload。