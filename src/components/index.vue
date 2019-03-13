<template>
  <div class="app-home">
    <search></search>
    <carousel></carousel>
    <category @tabChange="tabChange"></category>
    <div class="goods-list-wrap">
      <goods-list :goodsLists="goodsLists"></goods-list>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/carousel.vue'
import Search from '@/components/search.vue'
import Category from '@/components/categorybar.vue'
import GoodsList from '@/components/goodslist.vue'
export default {
  data () {
    return {
      goodsLists: []
    }
  },
  components: {
    Carousel,
    Search,
    Category,
    GoodsList
  },
  methods: {
    // 父组件收到子组件的tab切换回调
    tabChange (currentTab) {
      this.getGoodsByTab(currentTab)
    },
    // 根据tab获取该tab下的商品
    async getGoodsByTab (tab) {
      const res = await this.$request('/getGoodsByCategoryId', {goodsCategoryId: tab}, 'POST')
      if (res.code) {
        this.goodsLists = res.data
      } else {
        this.goodsLists = []
      }
      // console.log(this.goodsLists)
    }
  },
  mounted () {
    this.getGoodsByTab(1)
  }
}
</script>

<style scoped lang="less">
.app-home {
  height: 100vh;
  background: #F1F1F1;
  .goods-list-wrap {
    padding-bottom: 100rpx;
  }
}
</style>