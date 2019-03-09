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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      currentTab: 1,
      indexItem: {
        iconPath: 'http://shopdev.test.upcdn.net/index.png',
        iconSelect: 'http://shopdev.test.upcdn.net/index-active.png'
      },
      myItem: {
        iconPath: 'http://shopdev.test.upcdn.net/my.png',
        iconSelect: 'http://shopdev.test.upcdn.net/my-active.png'
      },
      publishItem: {
        iconPath: 'http://shopdev.test.upcdn.net/publish-active.png'
      }
    }
  },
  components: {
    Index,
    My
  },
  computed: {
    // 计算选中的是首页还是我的
    isSelected () {
      return this.currentTab === 1
    },
    ...mapState({
      userInfo: state => state.userInfo.userInfo
    })
  },
  methods: {
    // tab切换
    switchMyTab (tab) {
      if (this.currentTab !== tab) {
        this.currentTab = tab
      }
    },
    // 点击发布按钮，检查是否进行登录，没有登录跳转到登录提示登录
    goToPublish () {
      console.log(this.userInfo)
      if (this.userInfo) {
        wx.navigateTo({
          url: '/pages/publish/main'
        })
      } else {
        this.currentTab = 2
        this.$toast('请您先登录')
      }
    }
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
