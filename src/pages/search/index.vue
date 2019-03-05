<template>
  <div class="search-wrap">
    <div class="search-bar">
      <icon color="#ffffff" class="search-icon" type="search" size="20" />
      <input class="search-input" placeholder-style="color:white;" placeholder="请输入进行搜索"/>
    </div>
    <scroll-view class="scroll-view-box" scroll-y>
      <div class="search-recently">
        <text class="recently-item">华为手机</text>
        <text class="recently-item">小米手机</text>
        <text class="recently-item">oppo</text>
        <text class="recently-item">笔记本电脑</text>
        <text class="recently-item">鼠标</text>
        <text class="recently-item">键盘</text>
        <text class="recently-item">iphone7</text>
        <text class="recently-item">笔记本电脑</text>
        <text class="recently-item">鼠标</text>
        <text class="recently-item">键盘</text>
        <text class="recently-item">iphone7</text>
      </div>
    </scroll-view>
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

<style lang="less" scoped>
.search-wrap {
  overflow: scroll;
  .search-bar {
    height: 100rpx;
    width: 100%;
    background: #2c6acb;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-input {
      width: 540rpx;
      height: 60rpx;
      line-height: 60rpx;
      background: #6495ED;
      color: #fff;
      font-size: 24rpx;
      border-radius: 30rpx;
      padding-left: 100rpx;
    }
    .search-icon {
      position: absolute;
      top: 33rpx;
      left: 100rpx;
    }
  }
  .scroll-view-box {
    width: 750rpx;
    height: 100vh;
    white-space: nowrap;
    background: #F1F1F1;
    .search-recently {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 750rpx;
      padding-top: 20rpx;
      .recently-item {
        font-size: 24rpx;
        border-radius: 10rpx;
        padding: 10rpx 20rpx;
        background: #ccc;
        margin-left: 10rpx;
        margin-right: 10rpx;
      }
    }
  }
}
</style>
