import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//  导入Vant组件库
import Vant from 'vant'
//  导入Vant样式
import 'vant/lib/index.css'
//  导入全局样式
import './styles/index.less'
//  加载amfe-flexible
import 'amfe-flexible'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
