import Vue from 'vue'
import Vuex from 'vuex'
//  导入封装的本地存储模块
import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)

//  将token用常量保存到本地存储
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    //  一个对象，用于存储登录用户信息（token等数据）
    user: getItem(TOKEN_KEY)
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
  },
  mutations: {
    //  先将token保存到vuex容器中
    setUser (state, data) {
      state.user = data

      //  防止刷新页面，vuex中token消失，所以保存到本地存储
      setItem(TOKEN_KEY, state.user)
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
