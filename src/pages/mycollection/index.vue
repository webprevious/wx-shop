<template>
  <div class="my-buy-wrap">
    <div class="my-buy-item" v-for="(item, index) in myStoreArray" :key="index" @click="goToDetail(item)">
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
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      myStoreArray: []
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
    async getMyStore () {
      const res = await this.$request('/storeList', { storeMan: this.userInfo._id }, 'POST')
      if (res.code) {
        console.log(res)
        this.myStoreArray = res.data.map(item => {
          item.goodsId.publishAt = item.goodsId.publishAt.slice(0, 10)
          return item.goodsId
        })
      } else {
        this.myStoreArray = []
      }
    },
    // 点击前往详情
    goToDetail (item) {
      this.saveCurrentGoodsMessage(item)
      wx.navigateTo({
        url: '/pages/goodsdetail/main?from=mystore'
      })
    },
    ...mapActions(['saveCurrentGoodsMessage'])
  },
  mounted () {
    this.getMyStore()
  }
}
</script>

<style lang="less" scoped>
@import "~@/utils/common.less";
</style>
