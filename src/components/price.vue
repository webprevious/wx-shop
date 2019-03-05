<template>
  <div class="goods-price">
    <text class="icon">￥</text>
    <text class="front">{{yuan}}</text>
    <text class="behind">{{jiao}}</text>
  </div>
</template>

<script>
export default {
  name: 'price',
  computed: {
    yuan () {
      return this.price.split('.')[0]
    },
    jiao () {
      return this.price.split('.')[1] ? ('.' + this.price.split('.')[1]) : ''
    }
  },
  props: {
    price: {
      type: String,
      default: '0.0'
    }
  }
}
</script>

<style lang="less" scoped>
.goods-price{
  color: #f40;
  .icon {
    margin-left: 8rpx;
    font-size: 24rpx;
  }
  .behind {
    font-size: 20rpx;
  }
}
</style>
