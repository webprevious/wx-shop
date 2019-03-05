<template>
  <view>
    <swiper
      :indicator-dots="swiperConfig.indicatorDots"
      :autoplay="swiperConfig.autoplay"
      indicator-active-color="#ffffff"
      :circular="true"
      class="swiper">
      <block v-for="item in imgUrls" :key="item.id">
        <swiper-item @click="goTo(item.id)">
          <img :src="item.url" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>

<script>
export default {
  name: 'carousel',
  data () {
    return {
      swiperConfig: {
        indicatorDots: true,
        autoplay: true
      },
      imgUrls: [
        {
          id: 1,
          url: 'http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/67171751e81e65160a25c10d0e569fde1551680692.jpg'
        },
        {
          id: 2,
          url: 'http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/2bb8e6bad2a6a763962204ee69cb4fbc1551681228.jpg'
        },
        {
          id: 3,
          url: 'http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/cdafdabf0ba98693a2c1e5a922e53e611551685353.jpg'
        }
      ]
    }
  },
  methods: {
    goTo (goodsId) {
      console.log(goodsId)
      wx.navigateTo({
        url: '/pages/goodsdetail/main?goodsId=' + goodsId
      })
    }
  }
}
</script>

<style scoped lang="less">
.swiper {
  width: 750rpx;
  height: 366rpx;
  .slide-image {
    width: 750rpx;
    height: 366rpx;
  }
}
</style>
