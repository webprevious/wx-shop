<template>
  <div class="goods-detail-wrap">
    <div class="publish-msg">
      <img class="publisher-avatar" :src="oneGoodsMessage.publisherId.avatarUrl"/>
      <div class="publisher-and-address">
        <div class="name">{{oneGoodsMessage.publisherId.nickName}}</div>
        <div class="time-and-address">
          <text>发布于{{oneGoodsMessage.publishAt}}</text>
          <text>{{oneGoodsMessage.publisherId.province + oneGoodsMessage.publisherId.city}}</text>
        </div>
      </div>
    </div>
    <price :price="String(oneGoodsMessage.goodsPrice)"></price>
    <div class="goods-title">{{oneGoodsMessage.goodsTitle}}</div>
    <div class="goods-detail">{{oneGoodsMessage.goodsDetailMsg}}</div>
    <div class="goods-buss">本交易支持{{bussPath}}</div>
    <div class="goods-imgs">
      <img v-for="(item,index) in goodsImgs" :src="item" :key="index" class="img-item" mode="widthFix" :lazy-load="true">
    </div>
    <div class="publisher-introduction">
      <div class="name">{{oneGoodsMessage.publisherId.nickName}}</div>
      <div class="introduction">来自{{oneGoodsMessage.publisherId.province + oneGoodsMessage.publisherId.city}}的{{oneGoodsMessage.publisherId.gender === '1' ? '小男生' : '小天仙'}}一枚</div>
    </div>
    <div class="love-wrap">
      <img src="../../../static/images/love.png" class="love-icon">
      <text>猜你喜欢</text>
    </div>
    <goods-list :goodsLists="goodsLists" direction="detail"></goods-list>
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 收藏按钮样式控制
      isCollection: false,
      // 传入物品列表组件的数组
      goodsLists: []
    }
  },
  computed: {
    // 计算收藏icon
    collectionIconUrl () {
      return this.isCollection ? 'http://shopdev.test.upcdn.net/yes-collection.png' : 'http://shopdev.test.upcdn.net/no-collection.png'
    },
    // 计算图片数组
    goodsImgs () {
      return this.oneGoodsMessage.goodsPics[0].split(',')
    },
    // 计算交易方式
    bussPath () {
      let obj = {
        'byself': '自提',
        'byexpress': '邮寄',
        'byboth': '面交'
      }
      let bussArray = this.oneGoodsMessage.goodsBussPath[0].split(',')
      let strArray = bussArray.map(item => {
        return obj[item]
      })
      return strArray.join('、')
    },
    ...mapState({
      oneGoodsMessage: state => state.goods.oneGoodsMessage,
      userInfo: state => state.userInfo.userInfo
    })
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
      console.log(this.oneGoodsMessage)
    },
    // 获取猜你喜欢
    async getLove () {
      const res = await this.$request('/getUserLove', {userId: this.userInfo._id}, 'POST')
      this.goodsLists = res.data
      // console.log(this.goodsLists)
    }
  },
  mounted () {
    this.getLove()
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
