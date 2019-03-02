<template>
  <div>
    <div class="btn-wrap">
      <van-button type="info" @click="getMsg">我买到的</van-button>
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
