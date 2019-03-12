<template>
  <div class="my-buy-wrap">
    <div class="my-buy-item" v-for="(item, index) in myPublishArray" :key="index">
      <img class="goods-img" :src="item.goodsFirstPic"/>
      <div class="goods-msg">
        <div class="goods-title">{{item.goodsTitle}}</div>
        <div class="buy-time-price">
          <div class="time">发布于{{item.publishAt}}</div>
          <price :price="String(item.goodsPrice)"></price>
        </div>
      </div>
    </div>
    <div class="not-data" v-show="!myPublishArray.length">暂无数据</div>
  </div>
</template>

<script>
import Price from '@/components/price.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      myPublishArray: []
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
    // 获取我发布的物品列表
    async getMyPublish () {
      const res = await this.$request('/getMyPublishOrSale', {publisherId: this.userInfo._id}, 'POST')
      if (res.code) {
        this.myPublishArray = res.data.map(item => {
          item.publishAt = item.publishAt.slice(0, 10)
          return item
        })
      } else {
        this.myPublishArray = []
      }
    }
  },
  mounted () {
    this.getMyPublish()
  }
}
</script>

<style lang="less" scoped>
@import "~@/utils/common.less";
</style>
