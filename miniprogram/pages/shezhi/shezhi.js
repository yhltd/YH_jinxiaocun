// pages/shezhi/shezhi.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true,
    text: '\n',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 小程序版本
    version: "1.0.0",

    // 用户信息
    userInfo: {
      avatarUrl: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/login.png",
      bind_account: {
        zxyy_id: "------"
      },
      doctor: false
    },
    finduser: "",
    listAll: [],
    isUpdPwd :true,
    empty : "",
    gongsi:""
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
  onLoad: function (a) {
    Object.defineProperty(this.data, "userInfo", {
      set: data => {
        app.globalData.userInfo = data;
      }
    });
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
    var that = this;
    var listAll = [];
    const db = wx.cloud.database();
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    console.log("进销存公司名称",gongsi)
    wx.cloud.callFunction({
      name : 'sqlConnection',
      data : {
        sql : "select * from yh_jinxiaocun_user where gongsi = '"+gongsi+"' and name = '"+finduser+"'"
      },
      success : res=> {
        that.setData({
          listAll : res.result
          
        })
        console.log("进销存数据检查",listAll)
      }
    })
    this.setData({
      finduser: app.globalData.finduser,
      gongsi: app.globalData.gongsi
    })
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

  },

  go3:function(){
    wx.reLaunch({
      url: '../../pages/login/login',
    })
  },
})