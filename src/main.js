import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//  导入全局样式
import './styles/index.less'
//  导入Vant组件库
import Vant from 'vant'
//  导入Vant样式
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
