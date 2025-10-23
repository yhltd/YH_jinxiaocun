// package_jiaowu/pages/gerenzhongxin/gerenzhongxin.js
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
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    console.log("培训机构", options.userInfo)
    
    // 设置用户信息
    _this.setData({
      userInfo: userInfo,
    })
    
    // 生成动态欢迎语
    _this.generateWelcomeText(userInfo)
  },
  
  /**
   * 生成动态欢迎语
   */
  generateWelcomeText: function(userInfo) {
    var _this = this
    var welcomeText = "欢迎使用云合教务管理系统" // 默认值
    
    // 从userInfo中获取公司名称
    if (userInfo && userInfo.Company) {
      var companyName = userInfo.Company
      // 取公司名称的前四位
      var firstFourChars = companyName.substring(0, 4)
      // 拼接欢迎语
      welcomeText = "欢迎使用" + firstFourChars + "教务管理系统"
      console.log('公司名称:', companyName)
      console.log('前四位:', firstFourChars)
      console.log('生成的欢迎语:', welcomeText)
    } else {
      console.log('未找到Company字段，使用默认欢迎语')
    }
    
    // 更新到页面数据
    _this.setData({
      welcomeText: welcomeText
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
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})