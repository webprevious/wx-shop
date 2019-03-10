<template>
  <div class="publish-wrap">
    <div class="content-box">
      <textarea maxlength="50" v-model="goodsTitle" class="title" placeholder="请输入发布物品的标题"/>
      <textarea maxlength="-1" v-model="goodsDesc" class="goods-detail" placeholder="物品详情描述"/>
      <div class="upload-img-wrap">
        <div v-for="(url,index) in wxLocalImgUrls" class="upload-img" :key="index">
          <img :src="url" class="img">
        </div>
        <div class="add-icon-wrap" @click="selectImgs">
          <img class="icon" src="../../../static/images/upload-icon.png">
        </div>
      </div>
      <input class="price-input" v-model="goodsPrice" type="digit" placeholder="请输入物品价格"/>
      <picker class="picker-wrap" @change="CategoryPickerChange" :value="categoryIndex" :range="objectArray" range-key="name">
        <view class="picker">
          当前选择：{{objectArray[categoryIndex].name}}
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
      <div class="comfirm-publish-btn" @click="imgsUploadAndConfirm">确认发布</div>
    </div>
  </div>
</template>

<script>
import MyCheckbox from '@/components/mycheckbox.vue'
import utils from '@/utils/index.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      goodsTitle: '',
      goodsDesc: '',
      goodsPrice: '',
      // 交易方式选择结果
      bussPath: [],
      qq: '',
      wechat: '',
      phone: '',
      // 物品分类选择结果
      categoryIndex: 0,
      // 物品分类选择器数组
      objectArray: [{
        id: '0',
        name: '未选择'
      }],
      upyun: {},
      // 上传成功的图片url地址
      uploadSuccessImgsUrl: [],
      // 微信本地url用来展示提示用户体验，在用户确定发布的时候才去真实上传图片
      wxLocalImgUrls: []
    }
  },
  computed: {
    isInputConnect () {
      return this.qq || this.wechat || this.phone
    },
    ...mapState({
      userInfo: state => state.userInfo.userInfo
    })
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
    // 分类picker回调
    CategoryPickerChange (e) {
      this.categoryIndex = e.target.value
    },
    // 交易方式回调
    bussSelectChange (value) {
      // console.log(value)
      this.bussPath = value
    },
    // 收集确认发布数据
    createReqData () {
      let data = {
        publisherId: this.userInfo._id,
        goodsTitle: this.goodsTitle,
        goodsDetailMsg: this.goodsDesc,
        goodsPrice: this.goodsPrice,
        goodsCategoryId: this.objectArray[this.categoryIndex].id,
        goodsBussPath: this.bussPath
      }
      if (this.uploadSuccessImgsUrl.length) {
        data.goodsPics = this.uploadSuccessImgsUrl
      }
      if (this.uploadSuccessImgsUrl.length) {
        data.goodsFirstPic = this.uploadSuccessImgsUrl[0]
      }
      if (this.qq) {
        data.goodsConnQq = this.qq
      }
      if (this.wechat) {
        data.goodsConnWx = this.wechat
      }
      if (this.phone) {
        data.goodsConnPhone = this.phone
      }
      return data
    },
    // 填写检查
    inputCheck () {
      let err = ''
      if (!this.goodsTitle) {
        err = '请输入物品标题'
      } else if (!this.goodsDesc) {
        err = '请输入物品描述'
      } else if (!this.wxLocalImgUrls.length) {
        err = '请上传物品图片'
      } else if (!this.goodsPrice) {
        err = '请输入物品价格'
      } else if (this.categoryIndex === 0) {
        err = '请选择物品分类'
      } else if (!this.bussPath.length) {
        err = '请选择交易方式'
      } else if (!this.isInputConnect) {
        err = '请输入联系方式'
      }
      return err
    },
    // 上传图片
    selectImgs () {
      let that = this
      wx.chooseImage({
        success (selectRes) {
          // console.log(selectRes)
          selectRes.tempFilePaths.forEach(item => {
            // promiseArr.push(utils.uploadFile(item, that.upyun))
            that.wxLocalImgUrls.push(item)
          })
        },
        fail (err) {
          console.log(err)
        }
      })
    },
    // 点击确认按钮后先检查字段然后真实上传图片，然后发送请求物品信息
    imgsUploadAndConfirm () {
      // 检查字段
      let inputCheck = this.inputCheck()
      if (inputCheck) {
        return this.$toast(inputCheck)
      }
      // 检查字段无误开启loading
      wx.showLoading({
        title: '正在发布'
      })
      // 上传图片，成功后发送请求信息
      let promiseArr = []
      this.wxLocalImgUrls.forEach(item => {
        promiseArr.push(utils.uploadFile(item, this.upyun))
      })
      Promise.all(promiseArr).then(async res => {
        // console.log(res)
        res.forEach(item => {
          // console.log(JSON.parse(item.data))
          let url = 'http://shopdev.test.upcdn.net/' + JSON.parse(item.data).url
          this.uploadSuccessImgsUrl.push(url)
        })
        // 请求后端接口发送物品信息
        let data = this.createReqData()
        console.log(data)
        const result = await this.$request('/publishGoods', data, 'POST')
        if (result.code) {
          this.$toast('发布成功', 'success')
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/home/main'
            })
          }, 1500)
        } else {
          this.$toast('网络错误')
        }
      }).catch(err => {
        this.$toast('发布失败，请稍后重试')
        console.log(err)
      })
    },
    // 获取upyun签名
    async getUpyun () {
      const res = await this.$request('/getUpyun')
      if (res.code) {
        // console.log(res.data)
        this.upyun = res.data
      } else {
        this.$toast('网络错误')
      }
    },
    // 获取物品分类
    async getGoodsCategory () {
      const res = await this.$request('/getGoodsCateory')
      if (res.code) {
        res.data.forEach(item => {
          let obj = {
            id: item._id,
            name: item.title
          }
          this.objectArray.push(obj)
        })
      } else {
        this.$toast('网络错误')
      }
    }
  },
  mounted () {
    this.getUpyun()
    this.getGoodsCategory()
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
        margin-bottom: 20rpx;
        .icon {
          width: 48rpx;
          height: 48rpx;
        }
      }
      .upload-img 
      {
        width: 210rpx;
        height: 210rpx;
        border-radius: 12rpx;
        margin-bottom: 20rpx;
        .img {
          width: 210rpx;
          height: 210rpx;
          border-radius: 12rpx;
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
