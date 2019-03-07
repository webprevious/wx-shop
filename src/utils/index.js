import { BASE_URL } from '../config'

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

const $toast = (title, icon = 'none', duration = 1500) => {
  wx.showToast({
    title,
    icon,
    duration
  })
}

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
export default {
  request,
  $toast,
  $getLocalStorageUserInfo
}
