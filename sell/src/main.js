// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'Axios'


// 1. 導入路由要用的組件
import Goods from './components/Goods/Goods'
import Ratings from './components/Ratings/Ratings'
import Seller from './components/Seller/Seller'



Vue.config.productionTip = false


// 安裝vue router插件
Vue.use(VueRouter);
//這讓MAIN.JS可以使用axios。但其他組件如果要使用axios需要改寫vue的原形屬性。這句必加
Vue.prototype.$axios = Axios;

// 2. 定義路由(我們在router link to 所寫的)
const routes = [
  { path: '/', redirect:'/goods' },
  // 重新定向，也就是在/根的時候就讓，/goods顯示
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller },

]
// 3. 創建router實例(這是有關route的配置)
const router = new VueRouter({
  routes,
  //把上面定義的路由放入
  linkActiveClass:'active',
  // 選中後新增的class名稱(這官網有說明)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  //4.  創建掛載根實例
  router,
})
