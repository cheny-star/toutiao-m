/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
// import store from '@/store'
/**
 * 用户登录
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 获取短信验证码
 * 每手机号每分钟1次
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    //  发送请求头数据
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
