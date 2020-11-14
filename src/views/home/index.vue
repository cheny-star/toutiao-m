<template>
    <div class="home-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" fixed>
        <van-button slot="title" class="search-btn" round icon="search" type="info">搜索</van-button>
      </van-nav-bar>

      <!-- 频道列表 -->
      <van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
          <!-- 文章列表 -->
          <article-list :channel="channel"></article-list>
          <!-- /文章列表 -->
        </van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="hamburger-btn">
          <i class="iconfont icongengduo"></i>
        </div>
      </van-tabs>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list'

export default {
  name: 'HomePage',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      // console.log(data)
      this.channels = data.data.channels
      // console.log(this.channel)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    .van-icon {
      font-size: 32px;
    }
    .van-button__text {
      font-size: 27px;
    }
  }
  /deep/.channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      right: 0;
      left: 0;
      height: 82px;
      .van-tabs__nav {
        padding-bottom: 0;
        .van-tab--active {
          color: #333333;
        }
        .van-tab {
        border-right: 1px solid #edeff3;
        min-width: 200px;
        color: #777;
        font-size: 27px;
        }
        .van-tabs__line {
        width: 31px;
        height: 6px;
        background-color: #3296fa;
        bottom: 8px;
        }
      }
    }
    .placeholder {
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 20%;
        background: url(~@/assets/gradient-gray-line.png) no-repeat;
        width: 1px;
        height: 100%;
        background-size: contain;
      }
    }
  }
}
</style>
