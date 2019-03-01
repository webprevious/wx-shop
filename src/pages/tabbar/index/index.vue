<template>
  <div>
    <div class="btn-wrap">
      <van-button type="info" @click="getMsg">发一个请求</van-button>
    </div>
    <div>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">获取用户信息</button>
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
    async getMsg () {
      const res = await this.$request('/test')
      console.log(res)
    },
    getUserInfo (res) {
      console.log(1111)
      console.log(res)
    },
    getPhoneNumber (res) {
      console.log(res)
    }
  },
  created () {
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
