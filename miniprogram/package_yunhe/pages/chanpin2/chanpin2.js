// pages/chanpin2/chanpin2.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  onShow: function () {
    var that = this;
    app.editTabBar1();
    const db = wx.cloud.database();
    db.collection('todos').doc('XCCC13ffS3SWOXSZ').get({
      success(res) {
        that.setData({
          all: res.data
        })
        wx.setStorageSync('id', res.data._id),
          console.log(res.data._id)
      }
    })
  }
})