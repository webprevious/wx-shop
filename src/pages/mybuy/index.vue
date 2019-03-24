<template>
  <div class="my-buy-wrap">
    <div class="my-buy-item" v-for="(item, index) in myBuyArray" :key="index" @click="goToDetail(item)">
      <img class="goods-img" :src="item.goodsFirstPic"/>
      <div class="goods-msg">
        <div class="goods-title">{{item.goodsTitle}}</div>
        <div class="buy-time-price">
          <div class="time">购买于{{item.buyAt}}</div>
          <price :price="String(item.goodsPrice)"></price>
        </div>
      </div>
    </div>
    <div class="not-data" v-show="!myBuyArray.length">暂无数据</div>
  </div>
</template>

<script>
import Price from '@/components/price.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      myBuyArray: []
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo.userInfo
    })
  },
  components: {
    Price
  },
  methods: {
    // 获取我购买到的物品列表
    async getMyBuy () {
      const res = await this.$request('/getMyBuy', {userId: this.userInfo._id}, 'POST')
      console.log(res)
      if (res.code) {
        this.myBuyArray = res.data.map(item => {
          item.publishAt = item.publishAt.slice(0, 10)
          item.buyAt = item.buyAt.slice(0, 10)
          return item
        })
      } else {
        this.myBuyArray = []
      }
    },
    // 点击前往详情
    goToDetail (item) {
      this.saveCurrentGoodsMessage(item)
      wx.navigateTo({
        url: '/pages/goodsdetail/main?from=mybuy'
      })
    },
    ...mapActions(['saveCurrentGoodsMessage'])
  },
  mounted () {
    this.getMyBuy()
  }
}
</script>

<style lang="less" scoped>
@import "~@/utils/common.less";
</style>
