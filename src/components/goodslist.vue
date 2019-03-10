<template>
  <div>
    <div class="goods-list-wrap" v-if="goodsLists.length">
      <div v-for="(item,index) in goodsLists" :key="index" class="goods-item" @click="goToGoodsDetail(item._id)">
        <image class="goods-img" :src="item.goodsFirstPic"></image>
        <div class="goods-title">{{item.goodsTitle}}</div>
        <div class="goods-price-and-read">
          <price :price="String(item.goodsPrice)"></price>
          <div class="goods-dreamed">浏览{{item.goodsViewTimes}}次</div>
        </div>
      </div>
    </div>
    <div class="no-goods" v-else>
      暂无数据
    </div>
  </div>
</template>

<script>
import Price from '@/components/price.vue'
export default {
  name: 'goods-list',
  components: {
    Price
  },
  props: {
    goodsLists: {
      type: Array,
      default: []
    }
  },
  methods: {
    async goToGoodsDetail (goodsId) {
      const res = this.$request('/addGoodsViewTimes', { goodsId }, 'POST')
      console.log(res)
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
      width: 345rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
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
.no-goods {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 28rpx;
  color: #ccc;
}
</style>
