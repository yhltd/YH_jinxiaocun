const updSpace = require('../../util/updSpace')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    bianhao:"",
    this_name:"",
    gongsi:""
  },

  go1:function(){
    var _this = this
    var sql = "select * from quanxian where bianhao ='" + _this.data.bianhao + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset[0]
        _this.setData({
          this_quanxian:list[0]
        })

          console.log(list)
          if(list.bmsz_select == '是'){
            wx.navigateTo({
              url: '../../pages/c_bumenpeizhi/c_bumenpeizhi' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        
      },
      err: res => {
        console.log("错误!")
      }
    })

  },

  go2:function(){
    var _this = this
    var sql = "select * from quanxian where bianhao ='" + _this.data.bianhao + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset[0]
        _this.setData({
          this_quanxian:list[0]
        })
          console.log(list)
          if(list.zhgl_select == '是'){
            wx.navigateTo({
              url: '../../pages/c_zhanghaoguanli/c_zhanghaoguanli' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        
      },
      err: res => {
        console.log("错误!")
      }
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var user = JSON.parse(options.userInfo)
    console.log("财务公司数据", user)
    
    // 设置用户信息
    _this.setData({
      userInfo: JSON.parse(options.userInfo),
      this_name: user.name,
      bianhao: user.bianhao,
      user: user,
      // 初始化欢迎语
      welcomeText: "欢迎使用云合未来财务系统"
    })
    
    // 生成动态欢迎语
    _this.generateWelcomeText(user)
  },
  
  /**
   * 生成动态欢迎语
   */
  generateWelcomeText: function(user) {
    var _this = this
    
    // 从user中获取公司名称
    if (user && user.company && user.company.trim() !== "") {
      var companyName = user.company.trim()
      
      // 如果包含下划线，取第一部分
      if (companyName.includes('_')) {
        companyName = companyName.split('_')[0]
      }
      
      // 取前四位，不足四位取全部
      var firstFourChars = companyName.length >= 4 ? 
                          companyName.substring(0, 4) : 
                          companyName
      
      // 拼接欢迎语
      var welcomeText = "欢迎使用" + firstFourChars + "财务系统"
      
      console.log('公司名称:', companyName)
      console.log('前四位:', firstFourChars)
      console.log('欢迎语:', welcomeText)
      
      // 更新到页面数据
      _this.setData({
        welcomeText: welcomeText,
        companyFirstFour: firstFourChars
      })
      
    } else {
      console.log('company字段为空或不存在，使用默认欢迎语')
      // 保持默认欢迎语
    }
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