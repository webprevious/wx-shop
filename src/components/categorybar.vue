<template>
  <scroll-view class="scroll-view-box" scroll-x>
    <view id="green" class="scroll-item" >
      <text>推荐</text>
    </view>
    <view id="red" class="scroll-item">
      <text class="active">笔记本电脑</text>
    </view>
    <view id="yellow" class="scroll-item">手机</view>
    <view id="blue" class="scroll-item">耳机</view>
    <view id="blue1" class="scroll-item">鼠标</view>
    <view id="blue2" class="scroll-item">键盘</view>
  </scroll-view>
</template>

<script>
export default {
  name: 'category-bar',
  data () {
    return {
      currentTab: 1
    }
  }
}
</script>

<style scoped>
.scroll-view-box {
  width: 100%;
  white-space: nowrap;
  font-size: 28rpx;
  height: 80rpx;
  line-height: 80rpx;
}
.scroll-view-box .scroll-item {
  display: inline-block;
  margin-left: 30rpx;
  margin-right: 30rpx;
}
.scroll-view-box .scroll-item .active {
  position: relative;
}
.scroll-view-box .scroll-item .active:after {
  content: "";
  position: absolute;
  width: 56rpx;
  height: 8rpx;
  bottom: -16rpx;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #2c6acb;
  border-radius: 18rpx;
}
</style>
