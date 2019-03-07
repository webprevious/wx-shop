import { BASE_URL } from '../config'

// 封装微信请求
const request = (url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: BASE_URL + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        resolve(res.data)
      },
      fail (err) {
        wx.showToast({
          title: '网络异常,请连接网络',
          icon: 'none',
          duration: 3000
        })
        reject(err)
      }
    })
  })
}

// 封装微信toast
const $toast = (title, icon = 'none', duration = 1500) => {
  wx.showToast({
    title,
    icon,
    duration
  })
}

// 获取本地用户信息工具函数
const $getLocalStorageUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'userInfo',
      success (res) {
        resolve(JSON.parse(res.data))
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

// 封装微信文件上传
const uploadFile = (filePath, formData) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: 'https://v0.api.upyun.com/shopdev',
      filePath,
      name: 'file',
      formData,
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}
export default {
  request,
  $toast,
  $getLocalStorageUserInfo,
  uploadFile
}
