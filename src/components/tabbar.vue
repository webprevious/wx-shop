<template>
  <cover-view class="tabbar">
    <div class="bar-item">
      <div class="wrap">
        <img class="img" :src="isSelected ? indexItem.iconSelect : indexItem.iconPath" alt="">
        <span :class="{active: isSelected}">{{indexItem.text}}</span>
      </div>
    </div>
    <div class="bar-item">
      <div class="wrap">
        <img class="img" :src="publishItem.iconPath">
        <span>发布</span>
      </div>
    </div>
    <div class="bar-item">
      <div class="wrap">
        <img class="img" :src="!isSelected ? myItem.iconSelect : myItem.iconPath" alt="">
        <span :class="{active: !isSelected}">{{myItem.text}}</span>
      </div>
    </div>
  </cover-view>
</template>

<script>
export default {
  data () {
    return {
      currentTab: 1,
      indexItem: {
        tab: 1,
        pagePath: 'pages/tabbar/index/main',
        iconPath: '/static/tabs/index.png',
        iconSelect: '/static/tabs/index-active.png',
        text: '首页'
      },
      myItem: {
        tab: 2,
        pagePath: 'pages/tabbar/my/main',
        iconPath: '/static/tabs/my.png',
        iconSelect: '/static/tabs/my-active.png',
        text: '我的'
      },
      publishItem: {
        pagePath: 'pages/tabbar/publish/main',
        iconPath: '/static/tabs/publish-active.png'
      }
    }
  },
  computed: {
    isSelected () {
      return this.currentTab === 1
    }
  }
}
</script>

<style>
.tabbar {
  height: 100rpx;
  width: 750rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  font-size: 24rpx;
  color: #eee;
  border-top: 1px solid #eee;
}
.tabbar .bar-item {
  display: flex;
  flex-direction: column;
  width: 250rpx;
}
.tabbar .bar-item .wrap {
  width: 100rpx;
  height: 100rpx;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tabbar .bar-item .wrap .active {
  color: #2c6acb;
}
.tabbar .bar-item .wrap .img {
  width: 50rpx;
  height: 50rpx;
  margin-top: 10rpx;
  margin-bottom: 8rpx;
}
</style>