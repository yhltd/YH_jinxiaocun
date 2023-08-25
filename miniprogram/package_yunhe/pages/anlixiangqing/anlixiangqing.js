// pages/anlixiangqing/anlixiangqing.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl : app.globalData.imageInfopath2,
    anlizhanshi: {

      pageone: [
        {
          name: "软件开发",
          src: app.globalData.imageInfopath2+"ruanjian.png",
          url:"/pages/chanpin1/chanpin1?id=XCBDTnffS3SWOCjG"
        },
        {
          name: "网站建设",
          src: app.globalData.imageInfopath2+"wangzhan.png",
          url: "/pages/chanpin1/chanpin1?id=XCCC13ffS3SWOXSZ"
        },
        {
          name: "小程序",
          src: app.globalData.imageInfopath2 +"xiaochengxu.png",
          url: "/pages/chanpin1/chanpin1?id=XCCC2sDR1TiNEP9l"
        },
        {
          name: "手机APP",
          src: app.globalData.imageInfopath2 +"shouji.png",
          url: "/pages/chanpin1/chanpin1?id=XCCC3N7E7L4w38Y9"
        }
      ]
    }

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