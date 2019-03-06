<template>
  <div class="publish-wrap">
    <div class="content-box">
      <textarea maxlength="50" v-model="goodsTitle" class="title" placeholder="请输入发布物品的标题"/>
      <textarea maxlength="-1" v-model="goodsDesc" class="goods-detail" placeholder="物品详情描述"/>
      <div class="upload-img-wrap">
        <div class="add-icon-wrap">
          <img class="icon" src="../../../static/images/upload-icon.png">
        </div>
      </div>
      <input class="price-input" v-model="goodsPrice" type="digit" placeholder="请输入物品价格"/>
      <picker class="picker-wrap" @change="CategoryPickerChange" :value="index" :range="objectArray" range-key="name">
        <view class="picker">
          当前选择：{{objectArray[index].name}}
        </view>
      </picker>
      <div class="bussiness-wrap">
        <div class="text">交易方式</div>
        <my-checkbox @selectChange="bussSelectChange"></my-checkbox>
      </div>
      <div class="connect-wrap">
        <div class="connect-text">
          <text>联系方式</text>
          <text class="tip">(必填一项)</text>
        </div>
        <input class="input" v-model="qq" type="number" placeholder="请输入qq">
        <input class="input" v-model="wechat" type="text" placeholder="请输入微信">
        <input class="input" v-model="phone" type="number" placeholder="请输入手机号">
      </div>
      <div class="comfirm-publish-btn" @click="comfirmPublish">确认发布</div>
    </div>
  </div>
</template>

<script>
import MyCheckbox from '@/components/mycheckbox.vue'
export default {
  data () {
    return {
      goodsTitle: '',
      goodsDesc: '',
      goodsPrice: '',
      bussPath: [],
      qq: '',
      wechat: '',
      phone: '',
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
  computed: {
    isInputConnect () {
      return this.qq || this.wechat || this.phone
    }
  },
  watch: {
    phone (newValue) {
      if (newValue.length >= 11) {
        let reg = /^1\d{10}$/
        if (!reg.test(newValue)) {
          this.$toast('请输入正确的手机号')
        }
      }
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
    bussSelectChange (value) {
      console.log(value)
      this.bussPath = value
    },
    comfirmPublish () {
      let inputCheck = this.inputCheck()
      if (inputCheck) {
        return this.$toast(inputCheck)
      }
      let data = this.createReqData()
      console.log(data)
    },
    createReqData () {
      let data = {
        goodsTitle: this.goodsTitle,
        goodsDesc: this.goodsDesc,
        goodsPrice: this.goodsPrice
      }
      if (this.qq) {
        data.qq = this.qq
      }
      if (this.wechat) {
        data.wechat = this.wechat
      }
      if (this.phone) {
        data.phone = this.phone
      }
      return data
    },
    inputCheck () {
      let err = ''
      if (!this.goodsTitle) {
        err = '请输入物品标题'
      } else if (!this.goodsDesc) {
        err = '请输入物品描述'
      } else if (!this.goodsPrice) {
        err = '请输入物品价格'
      } else if (!this.bussPath.length) {
        err = '请选择交易方式'
      } else if (!this.isInputConnect) {
        err = '请输入联系方式'
      }
      return err
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
  padding-top: 30rpx;
  padding-bottom: 160rpx;
  .content-box {
    width: 690rpx;
    margin-left: 30rpx;
    .title {
      width: 100%;
      height: 110rpx;
      background: #fff;
      font-size: 30rpx;
      border-radius: 8rpx;
      padding-left: 10rpx;
      padding-right: 10rpx;
      box-sizing: border-box;
    }
    .goods-detail {
      width: 100%;
      min-height: 200rpx;
      background: #fff;
      font-size: 30rpx;
      margin-top: 30rpx;
      border-radius: 8rpx;
      padding-left: 10rpx;
      padding-right: 10rpx;
      box-sizing: border-box;
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
      height: 80rpx;
      line-height: 80rpx;
      background: #fff;
      margin-top: 30rpx;
      font-size: 30rpx;
      padding-left: 10rpx;
      padding-right: 10rpx;
      box-sizing: border-box;
      border-radius: 8rpx;
    }
    .picker-wrap {
      height: 80rpx;
      line-height: 80rpx;
      background: #fff;
      margin-top: 30rpx;
      padding-left: 10rpx;
      padding-right: 10rpx;
      box-sizing: border-box;
      font-size: 30rpx;
      border-radius: 8rpx;
    }
    .bussiness-wrap {
      background: #fff;
      display: flex;
      flex-direction: row;
      height: 80rpx;
      align-items: center;
      justify-content: space-between;
      margin-top: 30rpx;
      border-radius: 8rpx;
      padding-left: 10rpx;
      padding-right: 10rpx;
      box-sizing: border-box;
      .text {
        font-size: 28rpx;
      }
    }
    .connect-wrap {
      display: flex;
      flex-direction: column;
      .connect-text {
        height: 40rpx;
        margin-top: 30rpx;
        font-size: 30rpx;
        padding-left: 10rpx;
        padding-right: 10rpx;
        box-sizing: border-box;
        border-radius: 8rpx;
        display: table-cell;
        vertical-align: bottom;
        .tip {
          font-size: 26rpx;
          color: #f40;
        }
      }
      .input {
        height: 80rpx;
        line-height: 80rpx;
        background: #fff;
        margin-top: 30rpx;
        font-size: 30rpx;
        padding-left: 10rpx;
        padding-right: 10rpx;
        box-sizing: border-box;
        border-radius: 8rpx;
      }
    }
  }
}
.comfirm-publish-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 750rpx;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 32rpx;
  background: #2c6acb;
  color: white;
  z-index: 2000;
  &:active {
    opacity: 0.6;
  }
}
</style>
