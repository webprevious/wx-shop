<template>
  <div>
    <div class="goods-list-wrap" v-if="goodsLists.length">
      <div v-for="(item,index) in goodsLists" :key="index" class="goods-item" @click="goToGoodsDetail(item)">
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
import { mapActions } from 'vuex'
export default {
  name: 'goods-list',
  components: {
    Price
  },
  props: {
    // 父组件传进来的物品数组
    goodsLists: {
      type: Array,
      default: []
    },
    // 标识哪里使用了这个组件，如果是在首页使用应该使用navigate去跳转，详情页面应该是redirectTo
    direction: {
      type: String,
      default: 'index'
    }
  },
  methods: {
    async goToGoodsDetail (item) {
      // 存入当前商品进入vuex
      item.publishAt = item.publishAt.slice(0, 10)
      this.saveCurrentGoodsMessage(item)
      if (this.direction === 'index') {
        wx.navigateTo({
          url: '/pages/goodsdetail/main'
        })
      } else {
        wx.redirectTo({
          url: '/pages/goodsdetail/main'
        })
      }
      // 浏览次数+1
      const res = await this.$request('/addGoodsViewTimes', { goodsId: item._id }, 'POST')
      if (!res.code) {
        console.log(res, '记录浏览次数失败')
      }
    },
    ...mapActions(['saveCurrentGoodsMessage'])
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
