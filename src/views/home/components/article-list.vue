<template>
    <div class="article-list">
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="isRefreshLoading" :success-text="refreshSuccessText" :success-duration="1500" @refresh="onRefresh">
      <!-- 文章列表组件 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item v-for="(article, index) in list" :key="index" :article="article"></article-item>
        <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" /> -->
      </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, //  控制加载中loading状态
      finished: false, //  控制数据加载结束的状态
      timestamp: null, //  请求获取下一页数据的时间戳
      error: false,
      isRefreshLoading: false,
      refreshSuccessText: '刷新成功'
    }
  },
  methods: {
    // 初始化请求数据
    async onLoad () {
      // 异步更新数据
      try {
      // 1.请求数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 0
        })

        // 测试加载数据
        // if (Math.random() > 0.5) {
        //   JSON.parse('dfwefwefew')
        // }

        // console.log(data)
        // 2.把数据添加到list列表中
        const { results } = data.data
        this.list.push(...results)
        // 3.loading设置本次加载中，loading状态的结束
        this.loading = false
        // 4.判断数据是否加载结束
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // console.log(err)
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        // 1.请求列表数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 0
        })

        // 失败测试
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdfwdfwe')
        // }

        // console.log(results)
        // 2.将最新请求的数据添加到列表最前面
        const { results } = data.data
        this.list.unshift(...results)
        // 3.控制加载状态，停止加载
        this.isRefreshLoading = false
        // 4.更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，已更新${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isRefreshLoading = false
      }
    }
    // 实例
    // onLoad () {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
