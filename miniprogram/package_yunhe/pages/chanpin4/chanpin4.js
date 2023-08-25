// pages/chanpin2/chanpin2.js
var app = getApp();
Page({
  data: {
    
  },
  onShow: function () {
    var that = this;
    app.editTabBar1();
    const db = wx.cloud.database();
    db.collection('todos').doc('XCCC3N7E7L4w38Y9').get({
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