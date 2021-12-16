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
    console.log(options.userInfo)
    _this.setData({
      userInfo : JSON.parse(options.userInfo),
      this_name:user.name,
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