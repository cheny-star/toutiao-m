/**
 * 封装请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const user = store.state.user
    if (user && user.token) { //  判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config)
    return config
  },
  err => {
    return Promise.reject(err)
  })
// 响应拦截器

export default request
