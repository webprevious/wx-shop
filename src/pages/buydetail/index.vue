<template>
  <div class="buy-detail">
    <div class="my-buy-wrap">
      <div class="my-buy-item" @click="goToDetail(oneGoodsMessage)">
        <img class="goods-img" :src="oneGoodsMessage.goodsFirstPic"/>
        <div class="goods-msg">
          <div class="goods-title">{{oneGoodsMessage.goodsTitle}}</div>
          <div class="buy-time-price">
            <div class="time">发布于{{oneGoodsMessage.publishAt}}</div>
            <price :price="String(oneGoodsMessage.goodsPrice)"></price>
          </div>
        </div>
      </div>
    </div>
    <div class="address-and-user">
      <input type="text" placeholder="请输入收货地址" class="address" v-model="address">
      <input type="text" placeholder="请输入收货人姓名" class="receiver" v-model="receiver">
      <input type="text" placeholder="请输入收货人手机" class="phone" v-model="phone">
    </div>
    <div class="pay-confirm">
      <div class="pay">实付款<span class="price">￥{{oneGoodsMessage.goodsPrice}}</span></div>
      <div class="confirm" @click="buyConfirm">确定</div>
    </div>
  </div>
</template>

<script>
import Price from '@/components/price.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      address: '',
      receiver: '',
      phone: ''
    }
  },
  computed: {
    ...mapState({
      oneGoodsMessage: state => state.goods.oneGoodsMessage,
      userInfo: state => state.userInfo.userInfo
    })
  },
  components: {
    Price
  },
  methods: {
    // 点击购买按钮
    async buyConfirm () {
      // 检查输入
      let errResult = this.inputCheck()
      if (errResult) {
        return this.$toast(errResult)
      }
      let reqData = {
        goodsId: this.oneGoodsMessage._id,
        buyer: this.userInfo._id,
        address: this.address,
        phone: this.phone,
        receiver: this.receiver
      }
      const res = await this.$request('/buyGoods', reqData, 'POST')
      if (res.code) {
        this.$toast('购买成功', 'success')
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/mybuy/main'
          })
        }, 1500)
      } else {
        this.$toast('购买失败')
      }
    },
    // 输入检查
    inputCheck () {
      let err = ''
      if (!this.address) {
        err = '请输入收货地址'
      } else if (!this.receiver) {
        err = '请输入收货人'
      } else if (!this.phone) {
        err = '请输入收货人手机号'
      }
      return err
    }
  }
}
</script>

<style lang="less" scoped>
.buy-detail {
  .my-buy-wrap {
    width: 750rpx;
    background: #fff;
    border-bottom: 20rpx solid #f1f1f1;
    .my-buy-item {
      width: 750rpx;
      height: 200rpx;
      display: flex;
      overflow: hidden;
      .goods-img {
        width: 200rpx;
        height: 200rpx;
      }
      .goods-msg {
        padding-left: 20rpx;
        .goods-title {
          font-size: 28rpx;
          height: 100rpx;
          line-height: 50rpx;
          width: 500rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          padding: 4rpx;
        }
        .buy-time-price {
          display: flex;
          align-items: center;
          height: 90rpx;
          justify-content: space-between;
          padding-right: 30rpx;
          padding-left: 10rpx;
          .time {
            font-size: 24rpx;
          }
        }
      }
    }
  }
  .address-and-user {
    padding-top: 40rpx;
    input {
      width: 690rpx;
      margin-left: 30rpx;
      margin-bottom: 30rpx;
      height: 70rpx;
      border-radius: 12rpx;
      font-size: 28rpx;
      padding-left: 12rpx;
      box-sizing: border-box;
      border: 1px solid #f1f1f1;
    }
  }
  .pay-confirm {
    width: 750rpx;
    height: 100rpx;
    line-height: 100rpx;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .pay {
      width: 500rpx;
      padding-left: 20rpx;
      border-top: 1px solid #f1f1f1;
      box-sizing: border-box;
      .price {
        color: #f44;
      }
    }
    .confirm {
      width: 250rpx;
      background: #f44;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
