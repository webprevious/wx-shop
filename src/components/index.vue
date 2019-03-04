<template>
  <div>
    <search></search>
    <carousel></carousel>
    <category></category>
    <div class="test" @click="test">{{msg}}</div>
    <van-button @click="goToGoodsDetail">商品详情</van-button>
    <van-button @click="goToSearch">搜索</van-button>
  </div>
</template>

<script>
import Carousel from '@/components/carousel.vue'
import Search from '@/components/search.vue'
import Category from '@/components/categorybar.vue'
export default {
  data () {
    return {
      msg: '首页'
    }
  },
  components: {
    Carousel,
    Search,
    Category
  },
  methods: {
    test () {
      console.log(2)
    },
    goToGoodsDetail () {
      wx.navigateTo({
        url: '/pages/goodsdetail/main'
      })
    },
    goToSearch () {
      wx.navigateTo({
        url: '/pages/search/main'
      })
    }
  }
}
</script>

<style scoped>
.test {
  color: red;
}
</style>