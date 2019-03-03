<template>
  <div>
    <div class="test">{{msg}}</div>
    <van-button @click="goTo('mybuy')">我买到的</van-button>
    <van-button @click="goTo('mypublish')">我发布的</van-button>
    <van-button @click="goTo('mycollection')">我发布的</van-button>
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
    }
  }
}
</script>

<style scoped>
.test {
  color: yellow;
}
</style>