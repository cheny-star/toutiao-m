<template>
    <div class="search-result">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <van-cell v-for="(item, index) in list" :key="index" :title="item.title"/>
        </van-list>
    </div>
</template>

<script>
// 导入获取搜索结果请求模块
import { getResults } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getResults({
          page: this.page, // 页数
          per_page: this.per_page, // 每页数量
          q: this.searchText// 搜索关键词
        })
        // console.log(data)
        const { results } = data.data
        this.list.push(...results)
        // console.log(results)

        // 测试环节
        // if (Math.random() > 0.5) {
        //   JSON.parse('wefwefewf')
        // }
        this.loading = false
        // 判断是否还有数据
        if (results.length) {
          // 如果有，则更新下一页数据
          this.page++
        } else {
          // 如果没有，加载状态finished，设置为结束
          this.finished = true
        }
      } catch (err) {
        // this.$toast('获取搜索结果失败，请稍后重试')
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
