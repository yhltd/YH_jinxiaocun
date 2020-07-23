// pages/time/time.js

var common = require('../utils/util.js');

var szzhi = []
var szsl = []
var szje = []
var pd = 0
var app = getApp()
var cpxinxi = []
var slxinxi = []
var jgxinxi = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    szzhi: [],
    szjg: [],
    szsl: [],
    rkSum: 0,
    rkck: "初期数录入"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that= this;
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
        // console.log(sl)
        for (var i = szzhilength; i < szzhilength + wx.getStorageSync("rkall").length; i++) {
          if (cpxinxi[i] == null) {
            cpxinxi[i] = szzhi[fuzhii]
            slxinxi[i] = sl[fuzhii]
            jgxinxi[i] = je[fuzhii]
            fuzhii++;
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
    // var app = getApp();
    // var that = this;



    // var rk = that.data.rkSum
    // if (app.rkall != null) {
    //   rk = rk + app.cpsum
    //   szzhi = app.rkall
    //   var sl = app.szsl
    //   var je = app.szje
    //   for (var i = 0; i < app.szsl.length; i++) {
    //     if (szsl[i] == null) {
    //       szsl[i] = 0
    //       szje[i] = 0
    //     }
    //     szsl[i] = Number(szsl[i]) + Number(sl[i])
    //     szje[i] = Number(szje[i]) + Number(je[i])

    //   }

    //   that.setData({
    //     szzhi: app.rkall,
    //     szsl: szsl,
    //     szje: szje,
    //     rkSum: rk

    //   })

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
    var app = getApp()
    var that = this;
    // var today = common.getToday();
    const db = wx.cloud.database();
    pd = 0
    console.log(szzhi.length)
    if (that.data.date=="")
    {
      wx.showModal({
        title: '提示',
        content: '请选择入库时间',
      })

    }else{
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    for (var i = 0; i < szzhi.length; i++) {
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "INSERT yh_jinxiaocun_qichushu (cpid,cplb,cpname,cpsj,cpsl,zh_name,gs_name,shijian)values('" + szzhi[i].sp_dm + "','" + szzhi[i].lei_bie + "','" + szzhi[i].name + "','" + jgxinxi[i] + "','" + slxinxi[i] + "','" + finduser + "','" + gongsi + "','" + that.data.date+"')"
        },
        success(res) {
          console.log("成功", res)
          wx.showToast({
            title: '初期数录入成功',
          },that.onShow())
        }, fail(res) {
          console.log("失败", res)

        }

      });
    }
      // db.collection('Yh_JinXiaoCun_qichushu').add({
      //   data: {
      //     finduser: finduser,
      //     gongsi: gongsi,
      //     shijian: today,
      //     cpid: szzhi[i]._id,
      //     cpname: szzhi[i].value0,
      //     cpsj: szzhi[i].value1,
      //     cpjj: szzhi[i].value2,
      //     cplb: szzhi[i].value3,
      //     cpsl: szsl[i],
      //     cpjg: szje[i],
      //     mxtype: "期初数",

      //   },
      //   success: res => {
      //     wx.showToast({
      //       title: '初期数录入成功',
      //     })
      //   }
      // })
    }
    // var _openid = wx.getStorageSync('openid').openid;
    // for (var kci = 0; kci < szzhi.length; kci++){


    //        db.collection('Yh_JinXiaoCun_kucun').where({
    //          cpid: szzhi[kci]._id,
    //          _openid: _openid
    //        }).get({
    //          success: res => {
    //            if (res.data.length == 0) {
    //              pd = pd+1
    //            }
    //          }
    //        })
    //      }
    //       if (pd == 0) {
    //         for(var kci = 0;kci <szzhi.length;kci++){
    //           db.collection('Yh_JinXiaoCun_kucun').add({
    //             data: {
    //               cpid: szzhi[kci]._id,
    //               cpsj: szzhi[kci].value1,
    //               cpjj: szzhi[kci].value2,
    //               cplb: szzhi[kci].value3,
    //               cpsl: szsl[kci],
    //               cpjg: szje[kci],

    //             }
    //           })
    //         }
    //       } else {
    //         for(var kci =0;kci<szzhi.length;kci++){
    //           var slsum = res.data[kci].cpsl.cpsl + szsl[kci]
    //           var jesum = res.data[kci].cpsl.cpjg + szje[kci]
    //           console.log(res.data[kci]._id)
    //           db.collection('Yh_JinXiaoCun_kucun').doc(res.data[kci]._id).update({
    //             data: {
    //               cpsl: slsum,
    //               cpjg: jesum
    //             }


    //           })
    //         }

    //       }

  },bindDateChange: function (e) {
    var that = this
    that.setData({
      date: e.detail.value,
      sjkj: e.detail.value
    })
  },

})
