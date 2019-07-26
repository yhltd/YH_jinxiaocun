// pages/userConsole/userConsole.js
var app = getApp()
Page({

  data: {
    openid: ''
  },

  onLoad: function (options) {
    this.setData({
      openid: getApp().globalData.openid
    })
  }
})