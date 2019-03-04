<template>
  <scroll-view class="scroll-view-box" scroll-x>
    <view id="green" class="scroll-item" >
      <text :class="currentTab===1 ? 'active' : ''" @click="toggleTab(1)">推荐</text>
    </view>
    <view id="red" class="scroll-item">
      <text :class="currentTab===2 ? 'active' : ''" @click="toggleTab(2)">笔记本电脑</text>
    </view>
    <view id="yellow" class="scroll-item">
      <text :class="currentTab===3 ? 'active' : ''" @click="toggleTab(3)">手机</text>
    </view>
    <view id="blue" class="scroll-item">
      <text :class="currentTab===4 ? 'active' : ''" @click="toggleTab(4)">耳机</text>
    </view>
    <view id="blue1" class="scroll-item">
      <text :class="currentTab===5 ? 'active' : ''" @click="toggleTab(5)">鼠标</text>
    </view>
    <view id="blue2" class="scroll-item">
      <text :class="currentTab===6 ? 'active' : ''" @click="toggleTab(6)">键盘</text>
    </view>
    <view id="blue3" class="scroll-item">
      <text :class="currentTab===7 ? 'active' : ''" @click="toggleTab(7)">吹风机</text>
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: 'category-bar',
  data () {
    return {
      currentTab: 1,
      active: [true]
    }
  },
  methods: {
    toggleTab (tab) {
      this.$emit('tabChange', tab)
      this.currentTab = tab
    }
  }
}
</script>

<style scoped lang="less">
.scroll-view-box {
  width: 100%;
  white-space: nowrap;
  font-size: 28rpx;
  height: 80rpx;
  line-height: 80rpx;
  background: #F1F1F1;
  .scroll-item {
    display: inline-block;
    margin-left: 30rpx;
    margin-right: 30rpx;
    .active {
      position: relative;
      &:after {
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
    }
  }
}
</style>
