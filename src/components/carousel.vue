<template>
  <view>
    <swiper
      :indicator-dots="swiperConfig.indicatorDots"
      :autoplay="swiperConfig.autoplay"
      indicator-active-color="#ffffff"
      :circular="true"
      class="swiper">
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item @click="goTo(item.goodsMsg)">
          <img :src="item.url" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'carousel',
  data () {
    return {
      swiperConfig: {
        indicatorDots: true,
        autoplay: true
      },
      imgUrls: []
    }
  },
  methods: {
    // 点击广告轮播图进行跳转到相应商品
    goTo (goodsMsg) {
      console.log(goodsMsg)
      goodsMsg.publishAt = goodsMsg.publishAt.slice(0, 10)
      this.saveCurrentGoodsMessage(goodsMsg)
      wx.navigateTo({
        url: '/pages/goodsdetail/main'
      })
    },
    // 获取轮播图
    async getCarousel () {
      const res = await this.$request('/getAdCarousel')
      if (res.code) {
        // console.log(res)
        res.data.forEach(item => {
          this.imgUrls.push({
            goodsMsg: item.goodsId,
            url: item.adImgUrl
          })
        })
      } else {
        this.$toast('网络错误')
      }
    },
    ...mapActions(['saveCurrentGoodsMessage'])
  },
  mounted () {
    this.getCarousel()
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
