import { BASE_URL } from '../config'

const request = (url, method = 'GET', data = {}) => {
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

export default {
  request
}
