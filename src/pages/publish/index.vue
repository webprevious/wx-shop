<template>
  <div class="publish-wrap">
    <div class="content-box">
      <textarea maxlength="30" class="title" placeholder="请输入发布物品的标题" auto-focus />
      <textarea maxlength="-1" class="goods-detail" placeholder="物品详情描述"/>
      <div class="upload-img-wrap">
        <div class="add-icon-wrap">
          <img class="icon" src="../../../static/images/upload-icon.png">
        </div>
      </div>
      <input class="price-input" placeholder="请输入物品价格"/>
      <picker class="picker-wrap" @change="CategoryPickerChange" :value="index" :range="objectArray" range-key="name">
        <view class="picker">
          当前选择：{{objectArray[index].name}}
        </view>
      </picker>
      <div class="bussiness-wrap">
        <div class="text">交易方式</div>
        <my-checkbox></my-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import MyCheckbox from '@/components/mycheckbox.vue'
export default {
  data () {
    return {
      list: ['a', 'b', 'c'],
      result: [],
      index: 0,
      objectArray: [
        {
          id: 0,
          name: '美国'
        },
        {
          id: 1,
          name: '中国'
        },
        {
          id: 2,
          name: '巴西'
        },
        {
          id: 3,
          name: '日本'
        }
      ]
    }
  },
  components: {
    MyCheckbox
  },
  methods: {
    CategoryPickerChange (e) {
      console.log(e)
      this.index = e.target.value
    },
    bussPathChange (e) {
      console.log(e.target)
    }
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style lang="less" scoped>
.publish-wrap {
  width: 750rpx;
  background: #F1F1F1;
  padding-top: 20rpx;
  .content-box {
    width: 690rpx;
    .title {
      width: 100%;
      height: 100rpx;
      background: #fff;
      font-size: 30rpx;
      border-radius: 8rpx;
      padding-left: 10rpx;
      padding-right: 10rpx;
      padding-top: 16rpx;
      box-sizing: border-box;
    }
    .goods-detail {
      width: 100%;
      height: 200rpx;
      background: #fff;
      font-size: 30rpx;
      margin-top: 20rpx;
      border-radius: 8rpx;
      padding-left: 10rpx;
      padding-right: 10rpx;
      box-sizing: border-box;
      padding-top: 16rpx;
    }
    .upload-img-wrap {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      flex-direction: row;
      margin-top: 30rpx;
      .add-icon-wrap {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 210rpx;
        height: 210rpx;
        border: 2px solid #ccc;
        border-radius: 12rpx;
        .icon {
          width: 48rpx;
          height: 48rpx;
        }
      }
    }
    .price-input {
      height: 60rpx;
      line-height: 60rpx;
      background: #fff;
      margin-top: 30rpx;
      font-size: 30rpx;
      padding-left: 10rpx;
      padding-right: 10rpx;
      box-sizing: border-box;
      border-radius: 8rpx;
    }
    .picker-wrap {
      height: 60rpx;
      line-height: 60rpx;
      background: #fff;
      margin-top: 30rpx;
      padding-left: 10rpx;
      padding-right: 10rpx;
      box-sizing: border-box;
      font-size: 30rpx;
      border-radius: 8rpx;
    }
    .bussiness-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
