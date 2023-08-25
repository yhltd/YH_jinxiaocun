
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
    db.collection('todos').doc('XCCC2sDR1TiNEP9l').get({
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