<template>
  <div class="app-home">
    <search></search>
    <carousel></carousel>
    <category @tabChange="tabChange"></category>
    <div class="goods-list-wrap">
      <goods-list :goodsLists="goodsLists"></goods-list>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/carousel.vue'
import Search from '@/components/search.vue'
import Category from '@/components/categorybar.vue'
import GoodsList from '@/components/goodslist.vue'
export default {
  data () {
    return {
      goodsLists: [],
      // 记录当前tab
      currentTab: 1,
      // 记录当前tab下物品总数
      currentTabTotal: -1
    }
  },
  props: {
    currentPage: {
      type: Number,
      require: true
    },
    pageSize: {
      type: Number,
      require: true
    }
  },
  watch: {
    currentPage (newValue) {
      // console.log(newValue, 'jiankong', this.currentPage)
      if (this.currentTabTotal === this.goodsLists.length) {
        this.$emit('notMore')
        return false
      }
      if (this.newValue === 1) {
        return false
      }
      this.getGoodsByTab(this.currentTab)
    }
  },
  components: {
    Carousel,
    Search,
    Category,
    GoodsList
  },
  methods: {
    // 父组件收到子组件的tab切换回调
    tabChange (currentTab) {
      // 记录当前tab
      this.currentTab = currentTab
      this.goodsLists = []
      // tab切换要通知父组件修改物品tab当前页
      this.$emit('categoryChange')
      // 如果没有分页就进行tab切换
      if (this.currentPage === 1) {
        this.getGoodsByTab(currentTab)
      }
    },
    // 根据tab获取该tab下的商品
    async getGoodsByTab (tab) {
      const res = await this.$request('/getGoodsByCategoryId', {goodsCategoryId: tab, currentPage: this.currentPage, pageSize: this.pageSize}, 'POST')
      if (res.code) {
        this.goodsLists = this.goodsLists.concat(res.data)
        this.currentTabTotal = res.total
      } else {
        this.goodsLists = []
      }
      // console.log(this.goodsLists)
    }
  },
  mounted () {
    this.getGoodsByTab(1)
    // console.log(this.currentPage, this.pageSize)
  }
}
</script>

<style scoped lang="less">
.app-home {
  height: 100vh;
  background: #F1F1F1;
  .goods-list-wrap {
    padding-bottom: 100rpx;
  }
}
</style>