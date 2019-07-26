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
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi 
    db.collection("Yh_JinXiaoCun_mingxi").where({
      finduser: finduser,
      gongsi: gongsi
    }).get({
      success:res=>{
        that.setData({
          szzhi:res.data
        })
      }
    })
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

  },
  shanchu: function (e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    console.log(id)
    console.log(that.data.szzhi)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).remove({
            success: console.log,
            fail: console.error,

          })
          that.onLoad()
        } else if (res.cancel) {

          return false;
        }

      }
    })


  },
  xiugai: function (e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).update({
      data: {


      }
    })

  }
})