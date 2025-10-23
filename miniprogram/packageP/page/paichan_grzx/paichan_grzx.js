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
    
    // 设置用户信息
    _this.setData({
      userInfo: userInfo,
      // 初始化欢迎语
      welcomeText: "欢迎使用云合排产管理系统"
    })
    
    // 生成动态欢迎语
    _this.generateWelcomeText(userInfo)
  },
  
  /**
   * 生成动态欢迎语
   */
  generateWelcomeText: function(userInfo) {
    var _this = this
    
    // 从userInfo中获取公司名称
    if (userInfo && userInfo.company && userInfo.company.trim() !== "") {
      var companyName = userInfo.company.trim()
      
      // 取前四位，不足四位取全部
      var firstFourChars = companyName.length >= 4 ? 
                          companyName.substring(0, 4) : 
                          companyName
      
      // 拼接欢迎语
      var welcomeText = "欢迎使用" + firstFourChars + "排产管理系统"
      
      console.log('公司名称:', companyName)
      console.log('前四位:', firstFourChars)
      console.log('欢迎语:', welcomeText)
      
      // 更新到页面数据
      _this.setData({
        welcomeText: welcomeText
      })
      
    } else {
      console.log('company字段为空或不存在，使用默认欢迎语')
    }
  },

  go3:function(){
    wx.reLaunch({
      url: '../../../pages/login/login',
    })
  },

  onChange: function (event) {
    var _this = this;
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../PeiZhiBiao/PeiZhiBiao?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../DingDan/DingDan?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: '../PaiChan/PaiChan?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 3) {
      wx.redirectTo({
        url: '../HuiZong/HuiZong?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 4) {
      wx.redirectTo({
        url: '../paichan_grzx/paichan_grzx?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    }
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