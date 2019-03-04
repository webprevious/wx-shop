<template>
  <div>
    <index v-if="isSelected"></index>
    <my v-else></my>
    <div class="tabbar">
      <div class="bar-item">
        <div class="wrap" @click="switchMyTab(1)">
          <img class="img" :src="isSelected ? indexItem.iconSelect : indexItem.iconPath" alt="">
          <span :class="{active: isSelected}">首页</span>
        </div>
      </div>
      <div class="bar-item">
        <div class="wrap" @click="goToPublish">
          <img class="img" :src="publishItem.iconPath">
          <span>发布</span>
        </div>
      </div>
      <div class="bar-item">
        <div class="wrap" @click="switchMyTab(2)">
          <img class="img" :src="!isSelected ? myItem.iconSelect : myItem.iconPath" alt="">
          <span :class="{active: !isSelected}">我的</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Index from '@/components/index.vue'
import My from '@/components/my.vue'
export default {
  data () {
    return {
      currentTab: 1,
      indexItem: {
        iconPath: 'http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/3eefad9fd65f77c2b388023b855bc9f41551456269.png',
        iconSelect: 'http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/04c896b7fc7932adb83e80575b456ba91551456234.png'
      },
      myItem: {
        iconPath: 'http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/cbd31725fce518d34d84dceab3686a431551456320.png',
        iconSelect: 'http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/9496571e12a983f67c4ab63b45ed7d611551456295.png'
      },
      publishItem: {
        iconPath: 'http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/61f457575be8820aac15b1af48bc4d3f1551456346.png'
      }
    }
  },
  components: {
    Index,
    My
  },
  computed: {
    isSelected () {
      return this.currentTab === 1
    }
  },
  methods: {
    switchMyTab (tab) {
      if (this.currentTab !== tab) {
        this.currentTab = tab
      }
    },
    goToPublish () {
      wx.navigateTo({
        url: '/pages/publish/main'
      })
    }
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped lang="less">
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
  color: #909399;
  border-top: 1px solid #eee;
  z-index: 2000;
  background: #fff;
  .bar-item {
    display: flex;
    flex-direction: column;
    width: 250rpx;
    .wrap {
      width: 100rpx;
      height: 100rpx;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .active {
        color: #2c6acb;
      }
      .img {
        width: 50rpx;
        height: 50rpx;
        margin-top: 10rpx;
        margin-bottom: 8rpx;
      }
    }
  }
}
</style>
