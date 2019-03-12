<template>
  <div class="my-buy-wrap">
    <!-- <div class="my-buy-item">
      <img class="goods-img" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJZjQNfwkJNblWMzsLpW6W2N5xU5QUVFpRvu9zVRQSC67TRTDTBfoIibN1vaoxRBHy8AKZHWic7jdXA/132"/>
      <div class="goods-msg">
        <div class="goods-title">商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题</div>
        <div class="buy-time-price">
          <div class="time">收藏于2019-03-06</div>
          <price price="999.9"></price>
        </div>
      </div>
    </div> -->
    <div class="my-buy-item" v-for="(item, index) in myStoreArray" :key="index">
      <img class="goods-img" :src="item.goodsFirstPic"/>
      <div class="goods-msg">
        <div class="goods-title">{{item.goodsTitle}}</div>
        <div class="buy-time-price">
          <div class="time">收藏于{{item.publishAt}}</div>
          <price :price="String(item.goodsPrice)"></price>
        </div>
      </div>
    </div>
    <div class="not-data" v-show="!myStoreArray.length">暂无数据</div>
  </div>
</template>

<script>
import Price from '@/components/price.vue'
export default {
  data () {
    return {
      myStoreArray: []
    }
  },
  components: {
    Price
  },
  methods: {
    async getMyStore () {
      const res = await this.$request('/storeList', { storeMan: this.userInfo._id }, 'POST')
      if (res.code) {
        console.log(res)
      } else {
        console.log(res)
      }
    }
  },
  mounted () {
    this.getMyStore()
  }
}
</script>

<style lang="less" scoped>
@import "~@/utils/common.less";
</style>
