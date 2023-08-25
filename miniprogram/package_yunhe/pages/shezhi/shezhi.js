// pages/shezhi/shezhi.js
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
  ,

  button1:function(){
    wx.setStorageSync('name1', 'tupian1')
    wx.navigateTo({
        url: '/pages/shezhi1/shezhi1'
    })
  },
button2: function () {
  wx.setStorageSync('name1', 'tupian2')
    wx.navigateTo({
      url: '/pages/shezhi1/shezhi1'
    })
  },
  button3: function () {
    wx.setStorageSync('name1', 'tupian3')
    wx.navigateTo({
      url: '/pages/shezhi1/shezhi1'
    })
  },
  button4: function () {
    wx.setStorageSync('name1', 'tupian4')
    wx.navigateTo({
      url: '/pages/shezhi1/shezhi1'
    })
  },
  button5: function () {
    wx.setStorageSync('name1', 'tupian5')
    wx.navigateTo({
      url: '/pages/shezhi1/shezhi1'
    })
  },
  button6: function () {
    wx.setStorageSync('name1', 'xinxi')
    wx.navigateTo({
      url: '/pages/shezhi1/shezhi1'
    })
  },
  button7: function () {
    wx.setStorageSync('name1', 'todos')
    wx.navigateTo({
      url: '/pages/shezhi1/shezhi1'
    })
  },


})