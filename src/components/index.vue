<template>
  <div>
    <div class="test" @click="test">{{msg}}</div>
    <van-button @click="goToGoodsDetail">商品详情</van-button>
    <van-button @click="goToSearch">搜索</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '首页'
    }
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