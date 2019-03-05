<template>
  <div class="user-msg-wrap">
    <div class="user-content" v-if="false">
      <div class="nickname-and-address">
        <div class="nickname">XXXx</div>
        <div class="address">江西南昌</div>
      </div>
      <div class="sign-wrap">
        <img class="sign-icon" src="../../static/images/sign.png" v-if="false">
        <div class="van-btn" v-else>
          <van-button :loading="sign.signIsloading" type="info" size="small" loading-text="签到中...">签到</van-button>
        </div>
      </div>
      <div class="avatar-wrap">
        <img class="avatar" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJZjQNfwkJNblWMzsLpW6W2N5xU5QUVFpRvu9zVRQSC67TRTDTBfoIibN1vaoxRBHy8AKZHWic7jdXA/132" alt="">
      </div>
    </div>
    <div class="login-btn-content" v-else>
      <button class="btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">注册/登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-msg',
  data () {
    return {
      sign: {
        signIsloading: false
      }
    }
  },
  methods: {
    async onGotUserInfo (res) {
      console.log(res.target.userInfo)
      let result = await this.$request('/register', 'POST', res.target.userInfo)
      console.log(result)
    }
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
