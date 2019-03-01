<template>
  <div>
    <div class="btn-wrap">
      <van-button type="info" @click="getMsg">小程序第一页面</van-button>
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
      console.log('小程序第一页面')
    }
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.btn-wrap,
.url-wrap {
  text-align: center;
  margin: 20rpx 0;
}
</style>
