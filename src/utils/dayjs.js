import Vue from 'vue'
import dayjs from 'dayjs'

//  加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

//  dayjs默认是英文，所以我们配置成中文
dayjs.locale('zh-cn')
//    全局使用

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
// 测试打印当前时间
// console.log(dayjs().format('YYYY-MM-DD'))
