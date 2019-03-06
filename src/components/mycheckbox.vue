<template>
  <div class="my-checkbox">
    <div class="item" :class="{'item-active': isSelectedBySelf}" @click="selectItem('byself')">自提</div>
    <div class="item" :class="{'item-active': isSelectedByBoth}" @click="selectItem('byboth')">面交</div>
    <div class="item" :class="{'item-active': isSelectedByExpress}" @click="selectItem('byexpress')">邮寄</div>
  </div>
</template>

<script>
export default {
  name: 'mycheckbox',
  data () {
    return {
      result: []
    }
  },
  computed: {
    isSelectedBySelf () {
      return this.result.includes('byself')
    },
    isSelectedByBoth () {
      return this.result.includes('byboth')
    },
    isSelectedByExpress () {
      return this.result.includes('byexpress')
    }
  },
  methods: {
    selectItem (item) {
      if (!this.result.includes(item)) {
        this.result.push(item)
      } else {
        let index = this.result.indexOf(item)
        this.result.splice(index, 1)
      }
      this.$emit('selectChange', this.result)
    }
  }
}
</script>

<style lang="less" scoped>
.my-checkbox {
  display: flex;
  flex-direction: row;
  .item {
    padding: 4rpx 12rpx;
    border: 1px solid #ccc;
    font-size: 26rpx;
    color: #606266;
    margin: 0 8rpx;
    border-radius: 8rpx;
  }
  .item-active {
    color: #f40!important;
    border: 1px solid #f40!important;
  }
}
</style>
