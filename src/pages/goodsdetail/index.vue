<template>
  <div>
    <div class="btn-wrap">
      <van-button type="info" @click="getMsg">物品详情</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    getMsg () {
      console.log('我的页面')
    }
  },
  mounted () {
    console.log(this.$root.$mp.query.goodsId)
  }
}
</script>

<style scoped lang="less">
.btn-wrap,
.url-wrap {
  text-align: center;
  margin: 20rpx 0;
}
</style>
