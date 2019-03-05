<template>
  <div class="box">
    <user-message></user-message>
    <div class="about-my-goods">
      <div class="item" @click="goTo('mybuy')">我买到的</div>
      <div class="item" @click="goTo('mypublish')">我发布的</div>
      <div class="item" @click="goTo('mycollection')">我收藏的</div>
      <div class="item" @click="goTo('mysale')">我卖出的</div>
    </div>
  </div>
</template>

<script>
import UserMessage from '@/components/usermessage.vue'
export default {
  data () {
    return {
      msg: '我的'
    }
  },
  components: {
    UserMessage
  },
  methods: {
    goTo (to) {
      if (to === 'mybuy') {
        wx.navigateTo({
          url: '/pages/mybuy/main'
        })
      } else if (to === 'mypublish') {
        wx.navigateTo({
          url: '/pages/mypublish/main'
        })
      } else if (to === 'mycollection') {
        wx.navigateTo({
          url: '/pages/mycollection/main'
        })
      } else {
        wx.navigateTo({
          url: '/pages/mysale/main'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.box {
  position: relative;
  .about-my-goods {
    width: 670rpx;
    background: #F1F1F1;
    margin-left: 40rpx;
    margin-top: 30rpx;
    border-radius: 12rpx;
    overflow: hidden;
    .item {
      height: 80rpx;
      line-height: 80rpx;
      color: #606266;
      font-size: 30rpx;
      padding-left: 40rpx;
      width: 630rpx;
      position: relative;
      border-bottom: 1px solid #ccc;
      &:last-child {
        border-bottom: none;
      }
      &:after {
        content: "";
        width: 36rpx;
        height: 36rpx;
        position: absolute;
        top: 20rpx;
        right: 16rpx;
        display: inline-block;
        background: url("http://shopdev.test.upcdn.net/join-black.png") no-repeat;
        background-size: 36rpx;
      }
      &:active {
        background: rgb(218, 213, 213);
      }
    }
  }
}
</style>