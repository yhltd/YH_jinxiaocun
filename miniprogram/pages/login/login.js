// miniprogram/pages/login/login.js
// const requestUrl = require('../../config').requestUrl
const app = getApp();

var login = function(that) {
  var finduser, passwod, adminis, gongsi;
  var listAll = [];
  const db = wx.cloud.database();
  var gongsi = app.globalData.gongsi
  console.log(that.data.gongsi)
  if (that.data.gongsi.indexOf("_hr") > -1) {
    console.log("1")
    var login = false;
    //人资管理系统
    console.log("ligng")
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select id from gongzi_renyuan where L = '" + that.data.gongsi + "' and J = '" + that.data.pwd + "' and I ='" + that.data.name + "'"
      },
      success: res => {
        console.log("小程序连接数据库成功,返回res为: ", res.result.recordset)
        if (res.result.recordset.length > 0) {
          wx.navigateTo({
            url: '../home/home',
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
        } else {
          console.log("数据库返回为空！返回res长度为：", res.result.recordset.length)
          wx.showToast({
            title: '输入有误 请重试',
            icon: 'none',
          })
        }
      },
      fail: res => {
        console.log("小程序连接数据库失败")
        wx.showToast({
          title: '连接数据库出错',
          image: "../../images/icon-no.png",
          mask: true,
          duration: 1000
        })
      },
      complete: () => {}
    })
  } else {
    //进销存
    console.log("2")
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select * from yh_jinxiaocun_user where gongsi = '" + that.data.gongsi + "' and `password` = '" + that.data.pwd + "' and `name` ='" + that.data.name + "'"
      },
      success(res) {
        console.log("成功", res)
        if (res.result.length > 0) {
          listAll.push(res.result)
          gongsi = listAll[0][0].gongsi,
            finduser = listAll[0][0].name,
            passwod = listAll[0][0].password,

            adminis = listAll[0][0].AdminIS,
            // openid = listAll[0]._openid,          
            // app.globalData.openid = openid,
            app.globalData.finduser = finduser,
            app.globalData.passwod = passwod,
            app.globalData.adminis = adminis,
            app.globalData.gongsi = gongsi
          console.log("密码对")
          //登录状态写入缓存
          wx.setStorage({
            key: "IsLogin",
            data: true
          })
          wx.switchTab({
            url: '../shouye/shouye'
          })
        } else {
          console.log("密码错误")
          wx.showToast({
            title: '密码错误',
            image: "../../images/icon-no.png",
            mask: true,
            duration: 1000
          })
        }
        wx.hideNavigationBarLoading(); //隐藏加载
        wx.stopPullDownRefresh();

      },
      fail(res) {
        console.log("失败", res)

      }
    })
  };
  // db.collection('Yh_JinXiaoCun_user').where({
  //   name: that.data.name, // 填入当前用户 openid
  //   gongsi: that.data.gongsi

  // }).get({
  //   success: function (res) {
  //     listAll.push(res.data)
  //     // res.data 是包含以上定义的两条记录的数组
  //     // console.log(res.data)
  //     console.log(res.data)
  //     listAll = res.data;
  //     that.setData({
  //       listAll: listAll[0]
  //       // finduser=listAll[0].name,
  //       // passwod= listAll[0].passwod
  //     },
  //       gongsi= listAll[0].gongsi,
  //       finduser = listAll[0].name,
  //       passwod = listAll[0].password,

  //       adminis = listAll[0].AdminIS,
  //       // openid = listAll[0]._openid,          
  //       // app.globalData.openid = openid,
  //       app.globalData.finduser = finduser,
  //       app.globalData.passwod = passwod,
  //       app.globalData.adminis = adminis,
  //       app.globalData.gongsi = gongsi,
  //       console.log(adminis),
  //       console.log(finduser),
  //       console.log(passwod),
  //       console.log(gongsi)
  //     )

  //     if (finduser == that.data.name && that.data.pwd == passwod && that.data.gongsi == gongsi) {
  //       console.log("密码对")
  //       //登录状态写入缓存
  //       wx.setStorage({
  //         key: "IsLogin",
  //         data: true
  //       })
  //       wx.switchTab({
  //         url: '../shouye/shouye'
  //       })
  //     }
  //     else {
  //       console.log("密码错误")
  //       wx.showToast({
  //         title: '密码错误',
  //         image: "../../images/icon-no.png",
  //         mask: true,
  //         duration: 1000
  //       })
  //     }
  //     wx.hideNavigationBarLoading();//隐藏加载
  //     wx.stopPullDownRefresh();

  //   },
  //   fail: function (event) {
  //     wx.hideNavigationBarLoading();//隐藏加载
  //     wx.stopPullDownRefresh();
  //   }
  // })


}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    pwd: '',
    gongsi: ""
  },
  bindNameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindGsInput: function(e) {
    this.setData({
      gongsi: e.detail.value
    })
  },
  bindPwdInput: function(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  bindInputLogin: function(e) {
    login(this)
  },

  formLogin: function(e) {
    login(this)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this;
    app.globalData.finduser = 'name1'
    if (app.globalData.finduser != null && app.globalData.gongsi != null) {
      /*
      wx.switchTab({
        url: '../shouye/shouye'
      })
      */
    }
    // wx.getStorage({
    //   key: 'IsLogin',
    //   success: function (res) {
    //     if (res.data) {

    //       wx.switchTab({
    //         url: '../shouye/shouye'
    //       })
    //       // wx.navigateTo({
    //       //   url: '../shouye/shouye',
    //       // })
    //     }
    //   }
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})