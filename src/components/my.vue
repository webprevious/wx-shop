<template>
  <div class="box">
    <user-message></user-message>
    <div class="about-my-goods">
      <div class="item" @click="goTo('mybuy')">
        <img class="icon" src="../../static/images/buy-icon.png" alt="">
        <text>我买到的</text>
      </div>
      <div class="item" @click="goTo('mypublish')">
        <img class="icon" src="../../static/images/publish-icon.png" alt="">
        <text>我发布的</text>
      </div>
      <div class="item" @click="goTo('mycollection')">
        <img class="icon" src="../../static/images/collection-icon.png" alt="">
        <text>我收藏的</text>
      </div>
      <div class="item" @click="goTo('mysale')">
        <img class="icon" src="../../static/images/sale-icon.png" alt="">
        <text>我卖出的</text>
      </div>
    </div>
  </div>
</template>

<script>
import UserMessage from '@/components/usermessage.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo.userInfo
    })
  },
  components: {
    UserMessage
  },
  methods: {
    goTo (to) {
      // 检查是否登录
      if (!this.userInfo) {
        return this.$toast('请先登录')
      }
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
      padding-left: 26rpx;
      padding-right: 14rpx;
      width: 630rpx;
      position: relative;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
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
      .icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 10rpx;
      }
    }
  }
}
</style>