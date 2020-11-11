<template>
    <div class="layout-container">
        <!-- 子路由出口 -->
        <router-view />

        <!-- 标签栏导航 -->
        <van-tabbar class="layout-tabbar" v-model="active" route>
          <van-tabbar-item to="/">
              <i slot="icon" class="iconfont iconshouye"></i>
              <span class="text">首页</span>
          </van-tabbar-item>
          <van-tabbar-item to="/qa">
              <i slot="icon" class="iconfont iconshouye"></i>
              <span class="text">问答</span>
          </van-tabbar-item>
          <van-tabbar-item to="/video">
              <i slot="icon" class="iconfont iconshouye"></i>
              <span class="text">视频</span>
          </van-tabbar-item>
          <van-tabbar-item to="/my">
              <i slot="icon" class="iconfont iconshouye"></i>
              <span class="text">{{ $store.state.user ? '我的' : '未登录'}}</span>
          </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'layout',
  components: {},
  props: {},
  data () {
    return {
      active: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
    .layout-tabbar {
        i.iconfont {
            font-size: 40px;
        }
        span.text {
            font-size: 20px;
        }
    }
}
</style>
