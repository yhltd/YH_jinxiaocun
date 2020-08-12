// pages/shezhi/shezhi.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid: 'wxf3c03c2a0c59d299',
    secret: '691ce55bfc793a9aa352291877afffb4',
    showView: true,
    text: '\n',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  
  goUserManager : function(){
    if(app.globalData.adminis=="true"){
      wx.navigateTo({
        url: '/pages/frmadminindex/frmadminindex',
      })
    }else{
      wx.showToast({
        title: '没有权限！',
        icon : 'none'
      })
    }
  },
  onGotUserInfo(res) {
    var that = this;
    var requestUrl = wx.getStorageSync("url")
    this.setData({
      login_name: res.detail.userInfo.nickName,
      gender: res.detail.userInfo.gender,
      showView: (!that.data.showView)
    })
    wx.request({
      url: requestUrl,
      data: {
        code: res.code
      },
      success: function (res) {
        let ret = res.data;
        if (ret.status == 200) {
          // 添加到全局数据的header中
          app.globalData.header.Cookie = 'JSESSIONID=' + ret.data.sessionid;
        }
      }
    })
  },
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