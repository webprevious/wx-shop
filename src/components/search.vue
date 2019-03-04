<template>
  <div class="search">
    <icon color="#ffffff" class="search-icon" type="search" size="20" />
    <div class="search-input" @click="goToSearchPage">请输入进行搜索</div>
  </div>
</template>

<script>
export default {
  name: 'search',
  methods: {
    goToSearchPage () {
      wx.navigateTo({
        url: '/pages/search/main'
      })
    }
  }
}
</script>

<style scoped>
.search {
  height: 100rpx;
  width: 100%;
  background: #2c6acb;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.search .search-input {
  width: 540rpx;
  height: 60rpx;
  line-height: 60rpx;
  background: #DCDFE6;
  color: #fff;
  font-size: 24rpx;
  border-radius: 30rpx;
  padding-left: 100rpx;
}
.search .search-icon {
  position: absolute;
  top: 33rpx;
  left: 100rpx;
}
</style>
