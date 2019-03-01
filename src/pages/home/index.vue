<template>
  <div>
    <div class="btn-wrap">
      <van-button type="info" @click="getMsg">小程序第一页面</van-button>
    </div>
    <my-tab-bar></my-tab-bar>
  </div>
</template>

<script>
import MyTabBar from '@/components/tabbar.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    MyTabBar
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
#tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.btn-wrap,
.url-wrap {
  text-align: center;
  margin: 20rpx 0;
}
</style>
