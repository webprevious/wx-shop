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
          url: 'http://shopdev.test.upcdn.net/test1.jpg'
        },
        {
          id: 2,
          url: 'http://shopdev.test.upcdn.net/test2.jpg'
        },
        {
          id: 3,
          url: 'http://shopdev.test.upcdn.net/test3.jpg'
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
