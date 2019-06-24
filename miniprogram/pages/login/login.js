// miniprogram/pages/login/login.js
// const requestUrl = require('../../config').requestUrl
const app = getApp();
var login = function (that) {
  var finduser, passwod, adminis;
  var listAll = [];
  const db = wx.cloud.database();
  db.collection('Yh_JinXiaoCun_user').where({
    name: that.data.name, // 填入当前用户 openid
  }).get({
    success: function (res) {
      listAll.push(res.data)
      // res.data 是包含以上定义的两条记录的数组
      // console.log(res.data)
      listAll = res.data;
      that.setData({
        listAll: listAll[0]
        // finduser=listAll[0].name,
        // passwod= listAll[0].passwod
      },

        finduser = listAll[0].name,
        passwod = listAll[0].password,
        adminis = listAll[0].AdminIS,
        openid = listAll[0]._openid,
        app.globalData.openid = openid,
        app.globalData.finduser = finduser,
        app.globalData.passwod = passwod,
        app.globalData.adminis = adminis,
        console.log(adminis),
        console.log(finduser),
        console.log(passwod)
      )

      if (finduser == that.data.name && that.data.pwd == passwod) {
        //登录状态写入缓存
        wx.setStorage({
          key: "IsLogin",
          data: true
        })
        wx.switchTab({
          url: '../shouye/shouye'
        })
      }
      else {
        wx.showToast({
          title: '密码错误',
          image: "../../images/icon-no.png",
          mask: true,
          duration: 1000
        })
      }
      wx.hideNavigationBarLoading();//隐藏加载
      wx.stopPullDownRefresh();

    },
    fail: function (event) {
      wx.hideNavigationBarLoading();//隐藏加载
      wx.stopPullDownRefresh();
    }
  })


}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    pwd: ''
  },
  bindNameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  bindPwdInput: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  bindInputLogin: function (e) {
    login(this)
  },

  formLogin: function (e) {
    login(this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    app.globalData.finduser = 'name1'

    wx.getStorage({
      key: 'IsLogin',
      success: function (res) {
        if (res.data) {

          wx.switchTab({
            url: '../shouye/shouye'
          })
          // wx.navigateTo({
          //   url: '../shouye/shouye',
          // })
        }
      }
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