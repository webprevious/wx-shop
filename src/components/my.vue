<template>
  <div class="box">
    <img src="http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/3f37eb058a813169eba1be6a08f9ad461551683677.jpg" class="img">
    <div class="test">{{msg}}</div>
    <van-button @click="goTo('mybuy')">我买到的</van-button>
    <van-button @click="goTo('mypublish')">我发布的</van-button>
    <van-button @click="goTo('mycollection')">我发布的</van-button>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">获取用户信息</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '我的'
    }
  },
  methods: {
    goTo (to) {
      if (to === 'mybuy') {
        wx.navigateTo({
          url: '/pages/mybuy/main'
        })
      } else if (to === 'mypublish') {
        wx.navigateTo({
          url: '/pages/mypublish/main'
        })
      } else {
        wx.navigateTo({
          url: '/pages/mycollection/main'
        })
      }
    },
    async onGotUserInfo (res) {
      console.log(res.target.userInfo)
      let result = await this.$request('/register', 'POST', res.target.userInfo)
      console.log(result)
    }
  }
}
</script>

<style scoped lang="less">
.box {
  position: relative;
}
.test {
  position: absolute;
  top: 0;
  color: yellow;
}
.img {
  width: 100%;
  height: 366rpx;
}
</style>