// pages/Location/Location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden1:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    var _openid = wx.getStorageSync('openid').openid;
    db.collection("Yh_JinXiaoCun_jinhuofang").where({
      _openid: _openid
    }).get({
      success: res => {
        that.setData({
          all: res.data
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
  tianjia:function(){
    var that=this;
    that.setData({
      hidden1:!that.data.hidden1
    })
  }
})