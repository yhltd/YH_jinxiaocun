// pages/remittance/remittance.js
var szzhi = []
var szsl = []
var szje = []
var khname
var cpxinxi = []
var slxinxi = []
var jgxinxi = []
var app = getApp()

var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    szzhi: [],
    szjg: [],
    szsl: [],
    rkSum: 0,
    rkck: "确认出库",
    jinhuo: 1,
    hidden1: true,
    hidden2: false,
    sjkj: "",
    ddh: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setStorageSync('khname', null)
    var that = this;
    cpxinxi = []
    slxinxi = []
    jgxinxi = []
    that.setData({
      szzhi: [],
      szjg: [],
      szsl: []
    });
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
    var that = this;
    if (wx.getStorageSync('khname') != undefined && wx.getStorageSync('khname') != '') {
      that.setData({
        khname: wx.getStorageSync('khname'),
        hidden1: false,
        hidden2: true
      })
      wx.clearStorageSync('khname');
      wx.setStorageSync("khpd", "0")
    }
    for (var i = 0; i < that.data.szzhi.length; i++) {
      if (that.data.szzhi[i] != null) {
        cpxinxi[i] = that.data.szzhi[i]
        slxinxi[i] = that.data.szsl[i]
        jgxinxi[i] = that.data.szje[i]
      }
    }
    var aa = wx.getStorageSync("khpd")
    var bb = wx.getStorageSync('khname')
    console.log("传回页面的参数1是：", aa)
    console.log("传回页面的参数2是：", bb)

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
    var that = this
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 500
    })
    that.onShow()
    wx.stopPullDownRefresh()
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

  },
  XzspClick: function() {
    var that=this;
    if (that.data.sjkj == "") {
      console.log(that.data.sjkj, "!!!!!!!!!!!")
      wx.showModal({
        title: '提示',
        content: '请选择出库时间',
      })
    }else if (that.data.khname == undefined) {
      console.log(that.data.khname)
      wx.showModal({
        title: '提示',
        content: '请选择客户',
      })
    }else if (that.data.ddh == "") {
      console.log(that.data.ddh)
      wx.showModal({
        title: '提示',
        content: '请输入订单号',
      })
    }else{
      wx.setStorageSync('type', '0');
      let szzhi = this.data.szzhi
      let sz = {}
      for(let i = 0 ;i< szzhi.length ;i++){
        sz[szzhi[i].id] = this.data.szsl[i]
      }
      wx.setStorageSync('sz', JSON.stringify(sz));
      wx.navigateTo({
        url: '/pages/shangpinxuanze/shangpinxuanze',
      })
    }
    
  },
  querenRk: function() {
    var app = getApp()
    var that = this
    const db = wx.cloud.database();
    console.log(szzhi.length)
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    var today = that.data.date;
    if (that.data.sjkj == "") {
      console.log(that.data.sjkj, "!!!!!!!!!!!")
      wx.showModal({
        title: '提示',
        content: '请选择出库时间',
      })
    } else {
      if (that.data.khname == undefined) {
        console.log(that.data.khname)
        wx.showModal({
          title: '提示',
          content: '请选择客户',
        })

      } else {
        if (that.data.ddh == "") {
          console.log(that.data.ddh)
          wx.showModal({
            title: '提示',
            content: '请输入订单号',
          })
        } else {
          if (szzhi.length == 0) {
            wx.showModal({
              title: '提示',
              content: '请选择出库商品',
            })
          } else {
            for (var i = 0; i < szzhi.length; i++) {
              wx.cloud.callFunction({
                name: "sqlConnection",
                data: {
                  // sql: "insert yh_jinxiaocun_mingxi(gs_name,zh_name,shou_h,shijian,sp_dm,cpname,cpsj,cplb,cpsl,mxtype,orderid)values('" + gongsi + "','" + app.globalData.finduser + "','" + that.data.khname + "','" + today + "','" + szzhi[i]._id + "','" + szzhi[i].value0 + "','" + szzhi[i].value1 + "','" + szzhi[i].value3 + "','" + szsl[i] + "','出库','" + that.data.ddh+"')"
                  sql: "insert yh_jinxiaocun_mingxi(gs_name,zh_name,shou_h,shijian,sp_dm,cpname,cpsj,cplb,cpsl,mxtype,orderid)values('" + gongsi + "','" + finduser + "','" + that.data.khname + "','" + today + "','" + cpxinxi[i].sp_dm + "','" + cpxinxi[i].name + "','" + jgxinxi[i] + "','" + cpxinxi[i].lei_bie + "','" + slxinxi[i] + "','出库','" + that.data.ddh + "')"
                  // sql:"insert yh_jinxiaocun_mingxi(cpname)values('1122')"
                },
                success(res) {
                  console.log("成功", res)
                  // that.setData({
                  //   all: res.result[id][0].beizhu
                  // })

                },
                fail(res) {
                  console.log("失败", res)

                }
              });
              // db.collection('Yh_JinXiaoCun_mingxi').add({
              //   data: {
              //     today:today,
              //     finduser:finduser,
              //     gongsi:gongsi,
              //     jinhuofang: that.data.khname,
              //     cpid: szzhi[i]._id,
              //     cpname:szzhi[i].value0,
              //     cpsj: szzhi[i].value1,
              //     cpjj: szzhi[i].value2,
              //     cplb: szzhi[i].value3,
              //     cpsl: szsl[i],
              //     cpjg: szje[i],
              //     mxtype: "出库",
              //     nameid: app.globalData.finduser
              //   }

              // })
            }

            wx.showToast({
              title: '出库成功',
            })
            that.onLoad();
          }
        }
      }
    }
  },
  xuanzekehu: function(e) {
    var that = this
    // var id = e.currentTarget.dataset.id
    // console.log(id)
    console.log(that.data.jinhuo)
    if (that.data.jinhuo == 1) {
      wx.navigateTo({
        url: '../contract/contract?jinhuo=' + that.data.jinhuo,
      })

    }
  },
  bindDateChange: function(e) {
    var that = this
    that.setData({
      date: e.detail.value,
      sjkj: e.detail.value
    })
  },
  ddh_input: function(e) {
    var that = this
    that.setData({
      ddh: e.detail.value
    })
  }
})