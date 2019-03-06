<template>
  <div class="goods-list-wrap">
    <div class="goods-item" @click="goToGoodsDetail(12)">
      <image class="goods-img" src="http://shopdev.test.upcdn.net/test1.jpg"></image>
      <div class="goods-title">视频标题测试测试测试测试视频标题测试测试测试测试视频标题测试测试测试测试视频标题测试测试测试测试</div>
      <div class="goods-price-and-read">
        <price price="888.8"></price>
        <div class="goods-dreamed">12人浏览</div>
      </div>
    </div>
    <div class="goods-item">1</div>
    <div class="goods-item">1</div>
    <div class="goods-item">1</div>
  </div>
</template>

<script>
import Price from '@/components/price.vue'
export default {
  name: 'goods-list',
  components: {
    Price
  },
  methods: {
    goToGoodsDetail (goodsId) {
      wx.navigateTo({
        url: '/pages/goodsdetail/main?goodsId=' + goodsId
      })
    }
  }
}
</script>

<style scoped lang="less">
.goods-list-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 750rpx;
  background: #F1F1F1;
  padding-bottom: 30rpx;
  .goods-item {
    width: 340rpx;
    height: 490rpx;
    margin-top: 20rpx;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 10rpx;
    overflow: hidden;
    .goods-img {
      width: 345rpx;
      height: 345rpx;
    }
    .goods-title {
      font-size: 28rpx;
      height: 80rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding: 4rpx;
    }
    .goods-price-and-read {
      position: relative;
      .goods-dreamed {
        font-size: 24rpx;
        color: #ccc;
        position: absolute;
        top: 8rpx;
        right: 12rpx;
      }
    }
  }
}
</style>
