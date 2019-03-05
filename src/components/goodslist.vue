<template>
  <div class="goods-list-wrap">
    <div class="goods-item" @click="goToGoodsDetail(12)">
      <image class="goods-img" src="http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/cc3d11699168c35fd5f52a8a9a38711b1551709690.jpg"></image>
      <div class="goods-title">视频标题测试测试测试测试视频标题测试测试测试测试视频标题测试测试测试测试视频标题测试测试测试测试</div>
      <div class="goods-price-and-read">
        <div class="goods-price">
          <text class="icon">￥</text>
          <text class="front">9</text>
          <text class="behind">.00</text>
        </div>
        <div class="goods-dreamed">12人浏览</div>
      </div>
    </div>
    <div class="goods-item">1</div>
    <div class="goods-item">1</div>
    <div class="goods-item">1</div>
  </div>
</template>

<script>
export default {
  name: 'goods-list',
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
  padding-bottom: 160rpx;
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
      .goods-price{
        position: relative;
        color: #f40;
        .icon {
          margin-left: 8rpx;
          font-size: 24rpx;
        }
        .behind {
          font-size: 20rpx;
        }
      }
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
