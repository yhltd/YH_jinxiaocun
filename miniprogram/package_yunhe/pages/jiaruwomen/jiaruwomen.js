// pages/jiaruwomen/jiaruwomen.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: app.globalData.imageInfopath2,
    items: [
      {
        name: "16619776280",
        src: app.globalData.imageInfopath2+'dianhua.png',
        
      },
      {
        name: "512250428@qq.com",
        src: app.globalData.imageInfopath2 +'youxiang.png',
        
      },
      {
        name: "BQWL07910",
        src: app.globalData.imageInfopath2 +'weixin.png',
        
      },
      {
        name: "512250428",
        src: app.globalData.imageInfopath2 +'QQ.png',
        url:"/pages/dakaiQQ/dakaiQQ"
      },
      {
        name: "大连市高新园区设计城A座1204室",
        src: app.globalData.imageInfopath2 +'dizhi.png',
        
      }
      ]

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
})