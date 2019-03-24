<template>
  <div class="goods-detail-wrap" :class="{'is-has-buy-collection': isBuySuccess}">
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
    <div v-if="isBuySuccess" class="collection-buy-bar">
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
      goodsLists: [],
      // 如果购买成功或者已经购买隐藏收藏和购买按钮,这种情况只会出现在从我的购买进入
      // 首页的时候不会出现这种情况，首先对于已经购买的物品是不会出现在首页展示的
      isBuySuccess: true
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
    async toCollection () {
      // 收藏之前检查是否登录
      if (!this.userInfo) {
        return this.$toast('请先登录')
      }
      console.log(this.oneGoodsMessage)
      console.log(this.userInfo)
      // 收藏之前判断这个物品是否是自己发布的，不能收藏自己的
      if (this.oneGoodsMessage.publisherId._id === this.userInfo._id) {
        return this.$toast('不能收藏自己的物品')
      }
      if (this.isCollection) {
        // 取消收藏
        const res = await this.$request('/storeGoods', { goodsId: this.oneGoodsMessage._id, storeMan: this.userInfo._id, isStore: false }, 'POST')
        if (res.code) {
          this.isCollection = false
        } else {
          this.$toast('取消收藏失败')
        }
      } else {
        // 确认收藏
        const res = await this.$request('/storeGoods', { goodsId: this.oneGoodsMessage._id, storeMan: this.userInfo._id, isStore: true }, 'POST')
        if (res.code) {
          this.isCollection = true
        } else {
          this.$toast('收藏失败')
        }
      }
    },
    // 购买按钮
    async buyGoods () {
      if (!this.userInfo) {
        return this.$toast('请先登录')
      }
      // 购买之前判断这个物品是否是自己发布的，不能购买自己的
      if (this.oneGoodsMessage.publisherId._id === this.userInfo._id) {
        return this.$toast('不能购买自己的物品')
      }
      // let that = this
      // wx.showModal({
      //   title: '提示',
      //   content: '确认要购买吗',
      //   success: async res => {
      //     if (res.confirm) {
      //       const res = await that.$request('/buyGoods', { goodsId: that.oneGoodsMessage._id, buyer: that.userInfo._id }, 'POST')
      //       if (res.code) {
      //         that.isBuySuccess = false
      //         that.$toast('购买成功', 'success')
      //       } else {
      //         that.$toast('购买失败')
      //       }
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
      wx.navigateTo({
        url: '/pages/buydetail/main'
      })
    },
    // 获取猜你喜欢
    async getLove () {
      const res = await this.$request('/getUserLove', {userId: this.userInfo._id}, 'POST')
      this.goodsLists = res.data
      // console.log(this.goodsLists)
    },
    // 检查是否已经收藏
    async checkStore () {
      // 检查之前判断这个物品是否是自己发布的，如果是自己发布的就不需要发送请求
      if (this.oneGoodsMessage.publisherId._id === this.userInfo._id) {
        return false
      }
      const res = await this.$request('/judgeStore', { goodsId: this.oneGoodsMessage._id, storeMan: this.userInfo._id }, 'POST')
      if (res.code) {
        if (!res.data) {
          this.isCollection = false
        } else {
          this.isCollection = res.data.isStore
        }
      } else {
        this.isCollection = false
      }
    },
    // 初始化数据
    initData () {
      // 数据复原
      this.isCollection = false
      this.goodsLists = []
      this.isBuySuccess = true
      // 开始检查从哪里来
      if (this.$root.$mp.query.from === 'mybuy') {
        this.isBuySuccess = false
      } else if (this.$root.$mp.query.from === 'mypublish') {
        this.isBuySuccess = false
      } else if (this.$root.$mp.query.from === 'mystore') {
        this.isBuySuccess = true
        this.isCollection = true
      } else if (this.$root.$mp.query.from === 'mysale') {
        this.isBuySuccess = false
      } else {
        // 控制检查收藏发送
        this.checkStore()
      }
    }
  },
  mounted () {
    // 初始化
    this.initData()
    // 未登录不会执行，干啥都要获取我喜欢
    this.getLove()
  }
}
</script>

<style scoped lang="less">
.goods-detail-wrap {
  width: 750rpx;
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
    border-top: 1px solid #eee;
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
.is-has-buy-collection {
  padding-bottom: 100rpx;
}
</style>
