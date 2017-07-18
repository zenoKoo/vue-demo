// 引用 vue 没什么要说的
import Vue from 'vue'
// 引用路由
import VueRouter from 'vue-router'
// 光引用不成，还得使用
Vue.use(VueRouter)
// 引用resource
import VueResource from 'vue-resource'
// 光引用不成，还得使用
Vue.use(VueResource)
// 引用vue-async-data
import VueAsync from 'vue-async-data'
// 光引用不成，还得使用
Vue.use(VueAsync)
// 引用路由配置文件
import routes from './config/routes'
// 引用API文件
import api from './config/api'
// 将API方法绑定到全局
Vue.prototype.$api = api
import 'babel-polyfill'

//import Counters from './components/Counters.vue'
//import store from './vuex2/index' 
//console.log(store)
import App from './App.vue'
// 使用配置文件规则
const router = new VueRouter({
  routes
})
// 跑起来吧
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router: router,
  //store,
  render: h => h(App)
})
//console.log(app)
//router.push('/content');

