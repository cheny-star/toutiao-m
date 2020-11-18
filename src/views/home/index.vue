<template>
    <div class="home-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" fixed>
        <van-button slot="title" class="search-btn" round icon="search" type="info" to="search">搜索</van-button>
      </van-nav-bar>

      <!-- 频道列表 -->
      <van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
          <!-- 文章列表 -->
          <article-list :channel="channel"></article-list>
          <!-- /文章列表 -->
        </van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="hamburger-btn" @click="isEditChannelShow=true">
          <i class="iconfont icongengduo"></i>
        </div>
      </van-tabs>

      <!-- 频道编辑弹出层 -->
      <van-popup v-model="isEditChannelShow" closeable close-icon-position="top-left" position="bottom" :style="{ height: '100%' }" >
        <channel-edit :myChannels="channels" :active="active"  @update-active="onUpdateActive"></channel-edit>
      </van-popup>
      <!-- /频道编辑弹出层 -->
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isEditChannelShow: false // 是否显示弹出层
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      console.log(getItem('TOUTIAO-CHANNELS'))
      try {
        // 定义一个频道列表
        let channels = []
        // 1.判断用户是否登录
        if (this.user) {
          const { data } = await getUserChannels()
          // console.log(data)
          channels = data.data.channels
          // console.log(this.channel)
        } else {
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 2.判断是否有本地存储列表
          if (localChannels) {
            // 3.如果有本地列表，直接获取
            channels = localChannels
          } else {
            // 4.如果没有本地列表，按照接口文档请求
            const { data } = await getUserChannels()
            // console.log(data)
            channels = data.data.channels
            // console.log(this.channel)
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('加载频道失败')
      }
    },
    // 弹出层
    showPopup () {},
    onUpdateActive (index, isEditChannelShow = true) {
      this.active = index
      this.isEditChannelShow = isEditChannelShow
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
