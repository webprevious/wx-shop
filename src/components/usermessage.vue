<template>
  <div class="user-msg-wrap">
    <div class="user-content" v-if="isLogin">
      <div class="nickname-and-address">
        <div class="nickname">{{userInfo.nickName}}</div>
        <div class="address">{{userInfo.province + userInfo.city}}</div>
      </div>
      <div class="sign-wrap">
        <img class="sign-icon" src="../../static/images/sign.png" v-if="sign.isSignedSuccess">
        <div class="van-btn" v-else>
          <van-button :loading="sign.signIsloading" type="info" size="small" loading-text="签到中..." @click="toSinged">签到</van-button>
        </div>
      </div>
      <div class="avatar-wrap">
        <img class="avatar" :src="userInfo.avatarUrl"/>
      </div>
    </div>
    <div class="login-btn-content" v-else>
      <button class="btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">注册/登录</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'user-msg',
  data () {
    return {
      isLogin: false,
      userInfo: {},
      sign: {
        signIsloading: false,
        isSignedSuccess: false
      }
    }
  },
  methods: {
    // 注册和登录一体
    async onGotUserInfo (res) {
      let wxUserInfo = res.target.userInfo
      let result = await this.$request('/register', wxUserInfo, 'POST')
      if (result.code) {
        // 注册成功就进行登录接口访问
        let result = await this.$request('/getUserInfo', { nickName: wxUserInfo.nickName })
        if (result.code) {
          this.userInfo = result.data
          // 判断是否签过到
          this.judgeSignedToday()
          // 显示登录界面
          this.isLogin = true
          // 登录成功存储用户信息到localStorage
          wx.setStorage({
            key: 'userInfo',
            data: JSON.stringify(result.data)
          })
          this.saveUserInfo(result.data)
        }
      }
    },
    // 签到
    async toSinged () {
      this.sign.signIsloading = true
      let result = await this.$request('/signed', { userId: this.userInfo._id }, 'POST')
      if (result.code) {
        this.sign.signIsloading = false
        this.sign.isSignedSuccess = true
      } else {
        this.sign.signIsloading = false
      }
    },
    // 判断当天是否签过到
    async judgeSignedToday () {
      const res = await this.$request('/isSignedToday', { userId: this.userInfo._id })
      if (res.code) {
        this.sign.isSignedSuccess = res.data.todayIsSigned
      }
    },
    ...mapActions(['saveUserInfo'])
  },
  mounted () {
    this.$getLocalStorageUserInfo().then(res => {
      console.log(res)
      // 有用户信息说明已经登录
      this.userInfo = res
      // 判断是否签过到
      this.judgeSignedToday()
      // 登录和未登录两个界面切换
      this.isLogin = true
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="less" scoped>
.user-msg-wrap {
  width: 670rpx;
  height: 200rpx;
  background: #F1F1F1;
  margin-left: 40rpx;
  margin-top: 30rpx;
  border-radius: 12rpx;
  position: relative;
  .user-content {
    .nickname-and-address {
      position: absolute;
      top: 56rpx;
      left: 40rpx;
      .address {
        font-size: 24rpx;
      }
    }
    .avatar-wrap {
      position: absolute;
      top: 20rpx;
      right: 30rpx;
      .avatar {
        width: 160rpx;
        height: 160rpx;
      }
    }
    .sign-wrap {
      position: absolute;
      top: 56rpx;
      right: 230rpx;
      .sign-icon {
        width: 80rpx;
        height: 80rpx;
      }
      .van-btn {
        transform: translateY(10rpx);
      }
    }
  }
  .login-btn-content {
    padding-top: 50rpx;
    .btn {
      width: 200rpx;
      font-size: 28rpx;
    }
  }
}
</style>
