<template>
    <div class="search-suggestion">
        <van-cell icon="search" v-for="(text, index) in suggestions" :key="index" @click="$emit('search', text)"
        >
        <!-- 利用插槽，用v-html来显示带样式的字符 -->
        <!-- 并用v-html传递方法 -->
          <span slot="title" v-html="highlight(text)"></span>
        </van-cell>
    </div>
</template>

<script>
// 导入联想建议请求模块
import { getSuggestions } from '@/api/search.js'
// 导入lodash模块(防抖)
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadGetSuggestions(value)
      }, 200),
      // handler (value) {
      //   this.loadGetSuggestions(value)
      // },
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadGetSuggestions (q) {
      try {
        const { data } = await getSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    // 联想建议内容高亮
    highlight (text) {
      // console.log(text)
      // 定义要高亮的内容--也就是输入的内容
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 定义正则表达构造函数对象，定义一个自动解析的活动正则表达式，并设置全部字符和忽略大小写
      const reg = new RegExp(this.searchText, 'gi')
      // 返回将请求到的联想建议数据，并用高亮的样式，显示数据中与输入数据相同的全部字符。
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/span.active {
    color: red;
}
}
</style>
