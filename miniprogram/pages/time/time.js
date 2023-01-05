// pages/time/time.js
var app = getApp()
var common = require('../../utils/common.js');

var szzhi = [] //
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
    pd: 0,
    sjkj: "",
    ddh: ""
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var all
    var that = this
    cpxinxi = []
    slxinxi = []
    jgxinxi = []
    // console.log("onload")
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
    var openid = wx.getStorageSync("openid").openid
    // console.log(openid)
    const db = wx.cloud.database();
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    console.log(finduser)
    console.log("a")
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select * from yh_jinxiaocun_jinhuofang where gongsi = '" + gongsi + "'"
      },
      success(res) {
        console.log("成功", res.result)
        console.log(id)
        if (id != null) {   //如果id不为空则赋值
          that.setData({
            all: res.result[id].beizhu
          })
        }
      },
      fail(res) {
        console.log("失败", res)
      }
    });
    // db.collection('Yh_JinXiaoCun_jinhuofang').where({
    //   finduser: finduser,
    //   gongsi: gongsi
    // }).get({
    // success: function (res) {
    //   console.log(res.data)
    //   that.setData({
    //     all: res.data[id].beizhu
    //   })
    // }
    //   })

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
  onReady: function() {
    var that = this
    that.popup = that.selectComponent("#popup");
  },
  showPopup: function() {
    var that = this
    that.popup.showPopup();
  },

  // error() {
  //   console.log('你点击了取消');
  //   this.popup.hidePopup();
  // },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var id = wx.getStorageSync("jinhuofang")
    console.log(id)
    if (id != "") {
      that.setData({
        hideen1: false,
        hideen2: true,
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

  xuanshangpin: function() {
    var that = this

    if (that.data.sjkj == "") {
      console.log(that.data.ddh)
      wx.showModal({
        title: '提示',
        content: '请选择入库时间',
      })

    } else {
      if (that.data.all == undefined) { //2020/7/2
        wx.showModal({
          title: '提示',
          content: '请选择进货方',
        })
      } else {
        if (that.data.ddh == "") {
          console.log(that.data.ddh)
          wx.showModal({
            title: '提示',
            content: '请输入订单号',
          })
        } else {
            wx.setStorageSync('type', '1');
            wx.navigateTo({
              url: '/pages/shangpinxuanze/shangpinxuanze',
            })
          
        }
      }
    }
  },

  querenRk: function() {
    var that = this

    if (that.data.sjkj == "") {
      console.log(that.data.ddh)
      wx.showModal({
        title: '提示',
        content: '请选择入库时间',
      })

    } else {
      if (that.data.all == undefined) { //2020/7/2
        wx.showModal({
          title: '提示',
          content: '请选择进货方',
        })
      } else {
        if (that.data.ddh == "") {
          console.log(that.data.ddh)
          wx.showModal({
            title: '提示',
            content: '请输入订单号',
          })
        } else {
          if (cpxinxi.length == 0) {
            wx.showModal({
              title: '提示',
              content: '请选择入库商品',
            })
          } else {

            var today = that.data.sjkj;
            var ddh = that.data.ddh;
            const db = wx.cloud.database();
            pd = 0
            var finduser = app.globalData.finduser
            var gongsi = app.globalData.gongsi
            console.log(finduser)
            for (var i = 0; i < cpxinxi.length; i++) {
              wx.cloud.callFunction({
                name: "sqlConnection",
                data: {
                  sql: "insert yh_jinxiaocun_mingxi(gs_name,zh_name,shou_h,shijian,sp_dm,cpname,cpsj,cplb,cpsl,mxtype,orderid)values('" + gongsi + "','" + finduser + "','" + that.data.all + "','" + today + "','" + cpxinxi[i].sp_dm + "','" + cpxinxi[i].name + "','" + jgxinxi[i] + "','" + cpxinxi[i].lei_bie + "','" + slxinxi[i] + "','入库','" + ddh + "')"
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
              //     gongsi: gongsi,
              //     finduser: finduser,
              //     jinhuofang: that.data.all,
              //     shijian: today,
              //     cpid: cpxinxi[i]._id,
              //     cpname: cpxinxi[i].value0,
              //     cpsj: cpxinxi[i].value1,
              //     cpjj: cpxinxi[i].value2,
              //     cplb: cpxinxi[i].value3,
              //     cpsl: slxinxi[i],
              //     cpjg: jgxinxi[i],
              //     mxtype: "入库",
              //     orderid: ddh
              //   },
              //   success: res => {
              //     wx.showToast({
              //       title: '入库成功',
              //     })
              //   }
              // })

            }
            wx.showToast({
              title: '入库成功',
            })
            that.onLoad()
          }
        }
      }
    }
  },
  xuanzejinhuofang: function() {
    wx.navigateTo({
      url: '../Location/Location?jinhuo=1',
    })
  },
})