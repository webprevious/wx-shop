<template>
  <div class="app-home">
    <search></search>
    <carousel></carousel>
    <category @tabChange="tabChange"></category>
    <goods-list></goods-list>
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
      msg: '首页'
    }
  },
  components: {
    Carousel,
    Search,
    Category,
    GoodsList
  },
  methods: {
    tabChange (currentTab) {
      this.msg = currentTab
    }
  }
}
</script>

<style scoped lang="less">
.app-home {
  padding-bottom: 100rpx;
}
</style>