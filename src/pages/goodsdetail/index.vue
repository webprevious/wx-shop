<template>
  <div class="goods-detail-wrap">
    <div class="publish-msg">
      <img class="publisher-avatar" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJZjQNfwkJNblWMzsLpW6W2N5xU5QUVFpRvu9zVRQSC67TRTDTBfoIibN1vaoxRBHy8AKZHWic7jdXA/132"/>
      <div class="publisher-and-address">
        <div class="name">测试发布者昵称</div>
        <div class="time-and-address">
          <text>发布于2019-03-05</text>
          <text>江西南昌</text>
        </div>
      </div>
    </div>
    <price price="1000"></price>
    <div class="goods-title">扫描二维码登录微信. 登录手机微信. 手机上安装并登录微信. 从“发现”，进入“扫一扫”，扫码登录微信网页版. 扫描成功. 请在手机上点击确认以登录.</div>
    <div class="goods-detail">扫描二维码登录微信. 登录手机微信. 手机上安装并登录微信. 从“发现”，进入“扫一扫”，扫码登录微信网页版. 扫描成功. 请在手机上点击确认以登录.扫描二维码登录微信. 登录手机微信. 手机上安装并登录微信. 从“发现”，进入“扫一扫”，扫码登录微信网页版. 扫描成功. 请在手机上点击确认以登录.</div>
    <div class="goods-buss">本交易支持邮寄、面交、自提</div>
    <div class="goods-imgs">
      <img src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJZjQNfwkJNblWMzsLpW6W2N5xU5QUVFpRvu9zVRQSC67TRTDTBfoIibN1vaoxRBHy8AKZHWic7jdXA/132" class="img-item">
      <img src="http://www.pptbz.com/d/file/p/201701/927d2f6225ff1bf414593c1c0eff0ea4.jpg" class="img-item">
    </div>
    <div class="publisher-introduction">
      <div class="name">测试发布者昵称</div>
      <div class="introduction">来自江西南昌的小男生一枚</div>
    </div>
    <div class="love-wrap">
      <img src="../../../static/images/love.png" class="love-icon">
      <text>猜你喜欢</text>
    </div>
    <goods-list></goods-list>
    <div class="collection-buy-bar">
      <div class="collection" @click="toCollection">
        <img class="icon" :src="collectionIconUrl">
        <text>收藏</text>
      </div>
      <van-button @click="buyGoods" type="danger" size="small">购买</van-button>
    </div>
  </div>
</template>

<script>
import GoodsList from '@/components/goodslist.vue'
import Price from '@/components/price.vue'
export default {
  data () {
    return {
      isCollection: false
    }
  },
  computed: {
    collectionIconUrl () {
      return this.isCollection ? 'http://shopdev.test.upcdn.net/no-collection.png' : 'http://shopdev.test.upcdn.net/yes-collection.png'
    }
  },
  components: {
    Price,
    GoodsList
  },
  methods: {
    // 收藏按钮
    toCollection () {
      if (this.isCollection) {
        this.isCollection = false
      } else {
        this.isCollection = true
      }
    },
    // 购买按钮
    buyGoods () {
      console.log(this.$root.$mp.query.goodsId)
    }
  },
  mounted () {
    console.log(this.$root.$mp.query.goodsId)
  }
}
</script>

<style scoped lang="less">
.goods-detail-wrap {
  width: 750rpx;
  padding-bottom: 100rpx;
  .publish-msg {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 120rpx;
    padding-left: 20rpx;
    border: 1px solid #f1f1f1;
    .publisher-avatar {
      width: 80rpx;
      height: 80rpx;
    }
    .publisher-and-address {
      padding-left: 30rpx;
      .name {
        font-size: 30rpx;
        color: #303133;
        padding-bottom: 8rpx;
      }
      .time-and-address {
        font-size: 24rpx;
        color: #909399;
      }
    }
  }
  .goods-title,
  .goods-detail,
  .goods-buss {
    padding: 0 20rpx;
    font-size: 32rpx;
    line-height: 56rpx;
    color: #303133;
  }
  .goods-imgs {
    .img-item {
      width: 710rpx;
      padding: 0 20rpx;
    }
  }
  .publisher-introduction {
    padding: 20rpx;
    border-top: 12rpx solid #f1f1f1;
    border-bottom: 12rpx solid #f1f1f1;
    .name {
      font-size: 30rpx;
      color: #303133;
      padding-bottom: 8rpx;
    }
    .introduction {
      font-size: 24rpx;
      color: #909399;
    }
  }
  .love-wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 80rpx;
    align-items: center;
    font-size: 26rpx;
    color: #f40;
    .love-icon {
      height: 40rpx;
      width: 40rpx;
      margin-right: 20rpx;
    }
  }
  .collection-buy-bar {
    width: 750rpx;
    height: 100rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    .collection {
      display: flex;
      .icon {
        width: 38rpx;
        height: 38rpx;
      }
      text {
        font-size: 32rpx;
        padding-left: 8rpx;
        letter-spacing: 4rpx;
      }
    }
  }
}
</style>
