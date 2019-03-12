<template>
  <div class="search-wrap">
    <div class="search-bar">
      <icon color="#ffffff" class="search-icon" type="search" size="20" />
      <input class="search-input" v-model="keyword" placeholder-style="color:white;" placeholder="请输入进行搜索" confirm-type="search" @confirm="search"/>
    </div>
    <scroll-view class="scroll-view-box" scroll-y @scrolltolower="scrollToLower">
      <div class="search-recently">
        <text class="recently-item" v-for="(item,index) in searchKeyword" :key="index" @click="spKeyword(item)">{{item}}</text>
      </div>
      <goods-list :goodsLists="goodsLists"></goods-list>
      <div style="height:100rpx;"></div>
    </scroll-view>
  </div>
</template>

<script>
import GoodsList from '@/components/goodslist.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      keyword: '',
      goodsLists: [],
      // 暂存本地
      keywordHistory: []
    }
  },
  computed: {
    ...mapState({
      searchKeyword: state => state.search.searchKeyword
    })
  },
  components: {
    GoodsList
  },
  methods: {
    // 屏幕触底事件
    scrollToLower () {
      console.log('我的页面')
    },
    // 输入关键字后点击键盘确定
    async search () {
      // console.log(this.keyword)
      if (this.keyword) {
        const res = await this.$request('/search', {keyword: this.keyword}, 'POST')
        this.goodsLists = res.data
        // 判断是否已存在,不存在就存进去
        if (!this.keywordHistory.includes(this.keyword)) {
          this.keywordHistory.push(this.keyword)
          this.saveKeyword(this.keywordHistory)
        }
      } else {
        this.$toast('请输入关键字')
      }
    },
    // 点击关键字
    spKeyword (keyword) {
      this.keyword = keyword
      this.search()
    },
    ...mapActions(['saveKeyword'])
  },
  mounted () {
    console.log(this.searchKeyword)
    this.keywordHistory = this.searchKeyword
    this.keyword = ''
    this.goodsLists = []
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
    background: #F1F1F1;
    .search-recently {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 750rpx;
      padding-top: 20rpx;
      padding-left: 10rpx;
      overflow: hidden;
      .recently-item {
        font-size: 24rpx;
        border-radius: 10rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;
        padding-top: 18rpx;
        padding-bottom: 20rpx;
        background:#DCDFE6;
        margin-left: 10rpx;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
      }
    }
  }
}
</style>
