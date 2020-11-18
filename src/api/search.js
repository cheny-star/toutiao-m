/**
 * 请求联想建议接口
 */
import request from '@/utils/request.js'
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 */
export const getResults = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
