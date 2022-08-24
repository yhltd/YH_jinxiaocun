// 100lie_page/pages/loginpeople/loginpeople.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    name:'',
    user:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo,
    })
  },

  go3:function(){
    wx.reLaunch({
      url: '../../../pages/login/login',
    })
  },
  go2:function(){
    var _this = this
    wx.navigateTo({
      url: '../work/work?gongsi='+_this.data.gongsi + '&name='+ _this.data.name + '&user='+ _this.data.user
    })
  },
  go1:function(){
    var _this = this
    wx.navigateTo({
      url: '../userpeople/userpeople?gongsi='+_this.data.gongsi+ '&name='+ _this.data.name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中',
      mask : 'true'
    }) 
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
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