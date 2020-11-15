<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录">
          <van-icon slot="left" name="cross" @click="$router.back()"/>
        </van-nav-bar>
        <!-- /导航栏 -->

        <!-- 登录表单 -->
        <van-form ref="loginFormRef" @submit="onSubmit">
          <van-field
            v-model="user.mobile"
            name="mobile"
            placeholder="请输入手机号"
            :rules="userFormRules.mobile"
            type="number"
            maxlength="11">
            <i slot="left-icon" class="iconfont iconshouji"></i>
          </van-field>
          <van-field
            v-model="user.code"
            name="code"
            placeholder="请输入验证码"
            :rules="userFormRules.code"
            type="number"
            maxlength="6">
            <i slot="left-icon" class="iconfont iconyanzhengma"></i>
            <template #button>
              <van-count-down v-if="isCountDownShow" :time="3*1000" format="ss s" @finish="isCountDownShow = false"/>
              <van-button class="send-sms-btn" v-else round size="small" type="default"  native-type="button" @click="onSendSms">获取验证码</van-button>
            </template>
          </van-field>
          <div class="login-btn-wrap">
            <van-button class="login-btn" block type="info" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
        <!-- /登录表单 -->
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '15210338252',
        code: '246810'
      },
      //  登录信息验证规则
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号输入有误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码输入有误' }
        ]
      },
      //  获取验证码按钮显示隐藏
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    //  提交表单
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      this.$toast.loading({
        message: '加载中...',
        forbidClick: false,
        duration: 0
      })
      // 3.提交表单请求登录
      try {
        const { data } = await login(user)
        // console.log(data)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')

        //  TODO:需要优化
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    //  获取验证码
    async onSendSms () {
      try {
        // 1.验证手机号是否符合规则
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        console.log('验证失败', err)
      }
      // 2.发送验证码倒计时
      this.isCountDownShow = true
      // 3.发送验证码请求
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送验证码成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送过于频繁')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
    .iconfont{
        font-size: 37px;
    }
    .send-sms-btn{
        width: 152px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 22px;
        padding: 0;
    }
    .login-btn-wrap{
        padding: 53px 33px;
        .login-btn{
            background-color: #6db4fb;
            border: none;
        }
    }
}
</style>
