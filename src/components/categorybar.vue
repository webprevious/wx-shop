<template>
  <scroll-view class="scroll-view-box" scroll-x>
    <view id="red" class="scroll-item">
      <text :class="currentTab===1 ? 'active' : ''" @click="toggleTab(1)">推荐</text>
    </view>
    <block v-for="(item,index) in categoryArray" :key="index">
      <view id="green" class="scroll-item" >
        <text :class="currentTab===item.categoryId ? 'active' : ''" @click="toggleTab(item.categoryId)">{{item.name}}</text>
      </view>
    </block>
  </scroll-view>
</template>

<script>
export default {
  name: 'category-bar',
  data () {
    return {
      currentTab: 1,
      categoryArray: []
    }
  },
  methods: {
    // 点击切换分类
    toggleTab (tab) {
      // 点击当前tab不触发
      if (this.currentTab === tab) {
        return
      }
      this.$emit('tabChange', tab)
      this.currentTab = tab
    },
    // 获取分类列表
    async getCategory () {
      const res = await this.$request('/getGoodsCateory')
      // console.log(res)
      res.data.forEach(item => {
        this.categoryArray.push({
          categoryId: item._id,
          name: item.title
        })
      })
    }
  },
  mounted () {
    this.getCategory()
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
