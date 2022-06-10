
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    bianhao:"",
    this_name:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var user = JSON.parse(options.userInfo)
    console.log(options.userInfo)
    _this.setData({
      userInfo : JSON.parse(options.userInfo),
      this_name:user.full_name,
      bianhao:user.bianhao
    })
  },

  go3:function(){
    wx.reLaunch({
      url: '../../../pages/login/login',
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

  }
})