// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    var _id=options._id
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi 
    var _openid = wx.getStorageSync('openid').openid;
    db.collection("Yh_JinXiaoCun_mingxi").where({
      finduser: finduser,
      gongsi: gongsi,
      cpid: _id
    }).get({
      success: res => {
        that.setData({
          szzhi: res.data
        })
      }
    })
  },
  xixi: function (e) {
    if (e.detail.value == "") {
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi
      db.collection("Yh_JinXiaoCun_mingxi").where({
        finduser: finduser,
        gongsi: gongsi,

      }).get({
        success: res => {
          that.setData({
            szzhi: res.data
          })
        }
      })

    } else {
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi
      db.collection("Yh_JinXiaoCun_mingxi").where({
        finduser: finduser,
        gongsi: gongsi,
        cpname: db.RegExp({
          regexp: e.detail.value,
          options: 'i',
        })
      }).get({
        success: res => {
          that.setData({
            szzhi: res.data
          })
        }
      })

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})