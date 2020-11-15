<template>
    <div class="channel-edit">
        <!-- 我的频道 -->
        <van-cell :border="false" class="my-channel">
            <div slot="title" class="title">我的频道</div>
            <van-button type="danger" plain size="mini" round class="editBtn" @click="isEdit = !isEdit">{{isEdit ? '完成' : '编辑' }}</van-button>
        </van-cell>
        <van-grid :gutter="10" class="my-grid">
          <van-grid-item class="my-guid-item" v-for="(channel, index) in myChannels" :key="index" @click="onMyChannelClick(channel,index)">
              <van-icon slot="icon" name="add-o" v-show="isEdit && !fiexChannels.includes(channel.id)"></van-icon>
              <span slot="text" class="text" :class="{active : index === active}">{{channel.name}}</span>
          </van-grid-item>
        </van-grid>
        <!-- /我的频道 -->

        <!-- 频道推荐 -->
        <van-cell :border="false" class="recommend-channel">
            <div slot="title" class="title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10" class="recommend-grid">
          <van-grid-item class="recommend-grid-item" v-for="(channel, index) in recommendChannels" :key="index" icon="plus" :text="channel.name" @click="onAddChannel(channel)"/>
        </van-grid>
        <!-- /频道推荐 -->
    </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allchannels: [], // 获取所有频道
      isEdit: false, //  控制编辑状态
      fiexChannels: [0] //  固定频道，不允许删除
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allchannels.filter(channel => {
        return !this.myChannels.find(mychannel => {
          return mychannel.id === channel.id
        })
      })
    //  定义推荐的频道列表
    //   const channels = []
    //  遍历所有频道并选择出与我的频道中id相等的channel
    //   this.allchannels.forEach(channel => {
    //     const ret = this.myChannels.find(mychannel => {
    //       return mychannel.id === channel.id
    //     })
    //  判断出id不相等的channel，添加到推荐的频道列表
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   return channels
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allchannels = data.data.channels
        // console.log(data)
      } catch (err) {
        this.$toast('获取频道失败')
      }
    },
    // 添加 我的频道
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      if (this.user) {
        try {
        // 已登录状态添加频道
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          console.log('保存频道失败')
        }
      } else {
      // 未登录状态添加频道
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 编辑状态，删除频道
        // 1.如果是固定频道，不删除
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        // 2.删除频道项
        this.myChannels.splice(index, 1)
        // 3.当删除频道的index<=active时，保持active红色激活的频道不变
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        // 4.数据持久化处理
        this.deleteChannels(channel)
      } else {
        // 点击channel，跳转页面
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannels (channel) {
      if (this.user) {
        try {
        // 已登录状态删除我的频道
          await deleteUserChannel(channel.id)
        } catch (err) {
          this.$toast('删除频道请求失败')
        }
      } else {
        // 未登录用户删除我的频道
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
    padding-top: 80px;
    .title {
            font-size: 32px;
            color: #333;
        }
    .my-channel {
        .editBtn {
            width: 104px;
            height: 50px;
            font-size: 27px;
            color: #f85a5a;
            border: 1px solid #f85a5a;
        }
    }

    /deep/.my-grid {
        margin-bottom: 45px;
        .my-guid-item {
            width: 160px;
            height: 86px;
        }
        .van-grid-item__icon-wrapper {
            position: unset;
        }
        .van-icon-add-o {
            position: absolute;
            top: -16px;
            right: -16px;
            font-size: 30px;
            z-index: 2;
        }
    }

    /deep/.van-grid-item__content {
        flex-direction: row;
        background-color: #f4f5f6;
        .van-icon-plus {
            font-size: 28px;
            margin-right: 6px;
        }
        .van-grid-item__text, .text {
            font-size: 28px;
            color: #222222;
            margin-top: 0;
        }
    }
    .active {
      color: red !important;
    }
}
</style>
