<template>
  <div class="search-wrap">
    <div class="search-bar">
      <icon color="#ffffff" class="search-icon" type="search" size="20" />
      <input class="search-input" v-model="keyword" placeholder-style="color:white;" placeholder="请输入进行搜索" confirm-type="search" @confirm="search"/>
    </div>
    <scroll-view class="scroll-view-box" scroll-y @scrolltolower="scrollToLower">
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
      <goods-list></goods-list>
      <div style="height:100rpx;"></div>
    </scroll-view>
  </div>
</template>

<script>
import GoodsList from '@/components/goodslist.vue'
export default {
  data () {
    return {
      keyword: ''
    }
  },
  components: {
    GoodsList
  },
  methods: {
    scrollToLower () {
      console.log('我的页面')
    },
    search () {
      console.log(this.keyword)
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
      padding-left: 10rpx;
      height: 190rpx;
      overflow: hidden;
      .recently-item {
        font-size: 24rpx;
        border-radius: 10rpx;
        padding: 10rpx 20rpx;
        background:#DCDFE6;
        margin-left: 10rpx;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
      }
    }
  }
}
</style>
