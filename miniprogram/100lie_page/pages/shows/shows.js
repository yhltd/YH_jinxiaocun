// 100lie_page/pages/shows/shows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    name:'',
    user:''
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
  // 公司规定
  gongsi:function(){
    var _this = this
    wx.navigateTo({
      url: '../companyfix/companyfix?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  },

  // 部门设置
  bumen:function(){
    var _this = this
    wx.navigateTo({
      url: '../management/management?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  },

  //人员规定
  ren:function(){
    var _this = this
    wx.navigateTo({
      url: '../personfix/personfix?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  },
  //工作台
  work:function(){
    wx.navigateTo({
      url: '../work/work?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  },
 //使用人员
 userren:function(){
   wx.navigateTo({
     url: '../userpeople/userpeople?userInfo='+JSON.stringify(_this.data.userInfo)
   })
 },
 //人员管理
 renmasg:function(){
  var _this = this
   wx.navigateTo({
     url: '../personmasg/personmasg?userInfo='+JSON.stringify(_this.data.userInfo)
   })
 },
 //登录人员
loginren:function(){
  var _this = this
  wx.navigateTo({
    url: '../loginpeople/loginpeople?userInfo='+JSON.stringify(_this.data.userInfo)
  })
},

})