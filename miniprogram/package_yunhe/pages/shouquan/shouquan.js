var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })
          
          wx.getUserInfo({
            success(res) {
              const userInfo = res.userInfo
              app.globalData.language = userInfo.language
              app.globalData.nickName = userInfo.nickName
              app.globalData.avatarUrl = userInfo.avatarUrl
              app.globalData.gender = userInfo.gender // 性别 0：未知、1：男、2：女
              app.globalData.openid = userInfo.openid
              app.globalData.province = userInfo.province
              app.globalData.city = userInfo.city
              app.globalData.country = userInfo.country
              app.globalData.userInfo = userInfo;
              
               if (app.globalData.gender = 1) {
                app.globalData.gender = '男'
              } else if (app.globalData.gender = 2) {
                app.globalData.gender = '女'
              } else {
                app.globalData.gender = ''
              }

            }
          })
          
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  }
  ,
  // denglu: function () {
  //   wx.navigateBack({
  //     url: '/pages/yonghu/yonghu',
  //   })
  // },
})