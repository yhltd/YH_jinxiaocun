// pages/time/time.js

var common = require('../utils/util.js');

var szzhi = []
var szsl = []
var szje = []
var khname
var cpxinxi = []
var slxinxi = []
var jgxinxi = []
var pd = 0
Page({

  /**
   * 页面的初始数据
   */

  data: {
    szzhi: [],
    szjg: [],
    szsl: [],
    rkSum: 0,
    rkck: "确认入库",
    hideen1: true,
    hideen2: false,
    pd: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var all
    var that = this
    wx.setStorageSync('jinhuofang', null)
    cpxinxi=[]
    slxinxi=[]
    jgxinxi=[]
    console.log("onload")
     that.setData({
      szzhi: [],
       szjg: [],
       szsl: [],
      rkSum: 0,
      rkck: "确认入库",
      hideen1: true,
      hideen2: false,
      pd: 0
    });
    var id = null
    if (options.id != null) {
      id = options.id
    }
    console.log(id)
    if (id != null) {
      that.setData({
        hideen1: !that.data.hideen1,
        hideen2: !that.data.hideen2,
        all: id
      })

    }
    if (that.data.pd == 0) {

    }
    var openid=wx.getStorageSync("openid").openid
    console.log(openid)
    const db = wx.cloud.database();
    db.collection('Yh_JinXiaoCun_jinhuofang').where({
      _openid: openid
    }).get({
    success: function (res) {
      console.log(res.data)
      that.setData({
        all: res.data[id].beizhu
      })
    }
      })

    // db.collection('Yh_JinXiaoCun_jinhuofang').get({
    //   success: res => {

    //     that.setData({
    //       all: res.data[id].beizhu
    //     })


    //   }


    // })
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
    var id =wx.getStorageSync("jinhuofang")
  
    console.log(id)
    if (id != null) {
      that.setData({
        hideen1: !that.data.hideen1,
        hideen2: !that.data.hideen2,
        all: id
      })

    }
   
    for (var i = 0; i < that.data.szzhi.length; i++) {
      if (that.data.szzhi[i] != null) {
        cpxinxi[i] = that.data.szzhi[i]
        slxinxi[i] = that.data.szsl[i]
        jgxinxi[i] = that.data.szje[i]
        
      }

    }
    
    if (wx.getStorageSync("khpd") != "1") {
      var rk = that.data.rkSum
        if (wx.getStorageSync("rkall") != null) {
        rk = rk + Number(wx.getStorageSync("cpsum"))
        szzhi = wx.getStorageSync("rkall")
        var sl = wx.getStorageSync("szsl")
        var je = wx.getStorageSync("szje")

        var fuzhii = 0
        var szzhilength = that.data.szzhi.length;
        console.log(sl)
        for (var i = szzhilength; i < szzhilength + wx.getStorageSync("rkall").length; i++) {
          if (cpxinxi[i] == null) {
            cpxinxi[i] = szzhi[fuzhii]
            slxinxi[i] = sl[fuzhii]
            jgxinxi[i] = je[fuzhii]
          }
        }

        that.setData({
          szzhi: cpxinxi,
          szsl: slxinxi,
          szje: jgxinxi,
          rkSum: rk

        })
        wx.clearStorageSync("cpsum")
        wx.clearStorageSync("rkall")
        wx.clearStorageSync("szsl")
        wx.clearStorageSync("szje")

      }
    } else {
      if (wx.getStorageSync('khname') != null) {
        that.setData({
          khname: wx.getStorageSync('khname'),
          hidden1: false,
          hidden2: true
        })
        wx.clearStorageSync("khname")
        wx.setStorageSync("khpd", "0")
      }
    }

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

  xuanshangpin: function () {

    wx.navigateTo({
      url: '/pages/shangpinxuanze/shangpinxuanze',
    })
  },
  querenRk: function () {
    var that = this
    var app = getApp()
    var today = common.getToday();
    const db = wx.cloud.database();
    pd = 0
    console.log(cpxinxi)
    for (var i = 0; i < cpxinxi.length; i++) {

      db.collection('Yh_JinXiaoCun_mingxi').add({
        data: {
          jinhuofang: that.data.all,
          shijian: today,
          cpid: cpxinxi[i]._id,
          cpname: cpxinxi[i].value0,
          cpsj: cpxinxi[i].value1,
          cpjj: cpxinxi[i].value2,
          cplb: cpxinxi[i].value3,
          cpsl: slxinxi[i],
          cpjg: jgxinxi[i],
          mxtype: "入库",

        },
        success: res => {
          wx.showToast({
            title: '入库成功',
          })
        }
      })
    }
  },
  xuanzejinhuofang: function () {
    wx.navigateTo({
      url: '../Location/Location?jinhuo=1',
    })
  }

})