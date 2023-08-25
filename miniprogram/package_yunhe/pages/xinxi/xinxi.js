// pages/xinxi/xinxi.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: app.globalData.imageInfopath2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    var that = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // console.log("当前时间戳为：" + timestamp);
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    var shijian = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    wx.setStorageSync("shijian", shijian)
    // console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);
    console.log(shijian);
    that.setData({
      Y:Y,
      M:M,
      D:D,
      h:h,
      m:m,
      s:s
    })
   
    var all=[]
    const db = wx.cloud.database();
    db.collection('xinxi').get({
      success(res) {
        
       console.log(res.data)
        that.setData({          
          all: res.data
        })
      }
    })
  },

  onChange: function (event) {
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../shouye/shouye'
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../xinxi/xinxi'
      })
    }else if (event.detail == 2) {
      wx.redirectTo({
        url: '../chanpin/chanpin'
      })
    }else if (event.detail == 3) {
      wx.redirectTo({
        url: '../yonghu/yonghu'
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