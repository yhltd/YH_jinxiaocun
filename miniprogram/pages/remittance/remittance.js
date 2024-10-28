// pages/remittance/remittance.js
var szzhi = []
var szsl = []
var szje = []
var khname
var cpxinxi = []
var slxinxi = []
var jgxinxi = []
var app = getApp()
var jg = ""
var sl = ""
var dtid
var cpid
var cpjg = []
var cpsl = []
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jghide: "none",
    szzhi: [],
    szje: [],
    szsl: [],
    rkSum: 0,
    rkck: "确认出库",
    jinhuo: 1,
    hidden1: true,
    hidden2: false,
    sjkj: "",
    ddh: "",
    shangpin_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    cpjg = []
    cpsl = []
    wx.setStorageSync('khname', null)
    var that = this;
    cpxinxi = []
    slxinxi = []
    jgxinxi = []
   var gongsi=app.globalData.gongsi
    that.setData({
      szzhi: [],
      szjg: [],
      szsl: []
    });
    // console.log("select *,0 as isSelect,IFNULL((select sum(CASE mxtype WHEN '入库' THEN cpsl ELSE (cpsl*-1) END) as cpsl from yh_jinxiaocun_mingxi where cpname = j.name and gs_name = '"+gongsi+"'),0) as allSL from yh_jinxiaocun_jichuziliao as j where gs_name = '"+gongsi+"'")
    // var gongsi = app.globalData.gongsi
    // wx.cloud.callFunction({
    //   name: "sqlConnection",
    //   data: {
    //     sql: "select *,0 as isSelect,IFNULL((select sum(CASE mxtype WHEN '入库' THEN cpsl ELSE (cpsl*-1) END) as cpsl from yh_jinxiaocun_mingxi where cpname = j.name and gs_name = '"+gongsi+"'),0) as allSL from yh_jinxiaocun_jichuziliao as j where gs_name = '"+gongsi+"'"
    //   },
    //   success(res) {
    //     for(var i=0;i<res.result.length;i++){
    //       if(res.result[i].mark1 != null){
    //         res.result[i].mark1 = "data:image/jpeg;base64," + res.result[i].mark1.replace(/[\r\n]/g, '')
    //       }
    //     }
    //     that.setData({
    //       shangpin_list: res.result,
    //       szzhi: res.result,
    //     })
    //   },
    //   fail(res) {
    //     console.log("失败", res)
    //   }
    // });
  // },

  // srJg: function(e) {
  //   sl = ""
  //   jg = ""
  //   console.log("触发点击")
  //   var _this = this
  //   dtid = e.currentTarget.dataset.id
  //   console.log(dtid)
  //   _this.setData({
  //     jghide: "flex",
  //     cpid: dtid,
  //     cpsl: _this.data.szsl,
  //     cpjg: _this.data.szje,
  //     backhidden: false
  //   })
  },

  spClose: function(e) {
    var that = this
    that.setData({
      jghide: true,
      jghide: "none",
      backhidden: true
    })
  },

  cunsl: function(e) {
    sl = e.detail.value
  },
  cunjg: function(e) {
    jg = e.detail.value
  },

zongjia_refresh:function(){
  var that = this
  var zongjia = that.data.rkSum
  zongjia = 0
  for(let idx=0;idx < cpsl.length ;idx++){
    if(cpsl[idx] != '' && cpsl[idx] != undefined && cpjg[idx] != '' && cpjg[idx] != undefined){
      zongjia += parseInt(cpsl[idx]) * parseInt(cpjg[idx])
    }
  }
  that.setData({
    rkSum: zongjia
  })
},

  tjjg: function(e) {
    var that = this
    that.setData({
      jghide: true,
      jghide: "none",
      backhidden: true
    })
    console.log(sl)
    console.log(jg)
    var zongjia = that.data.rkSum
    if (sl != "" && jg != "") {
      if(sl*1 <=0 || jg*1 <=0 ){
        wx.showToast({
          title: '数量和价格必须大于0',
          icon:'none'
        })
        return;
      }
      cpsl[dtid] = sl
      cpjg[dtid] = jg
      zongjia = 0
      for(let idx=0;idx < cpsl.length ;idx++){
        if(cpsl[idx] != '' && cpsl[idx] != undefined && cpjg[idx] != '' && cpjg[idx] != undefined){
          zongjia += parseInt(cpsl[idx]) * parseInt(cpjg[idx])
        }
      }
    }else{
      wx.showToast({
        title: '请填写数量和价格',
        icon:'none'
      })
      return;
    }
    for (var i = 0; i < cpsl.length; i++) {
      if (cpjg[i] == null) {
        cpjg[i] = ""
        cpsl[i] = ""
      }
    }
    that.setData({
      jghide: "none",
      cpid: dtid,
      szsl: cpsl,
      szje: cpjg,
      rkSum: zongjia
    })
  },

  qrcode: function(e){
    var _this = this

    wx.showModal({
      title: '提示',
      content: '请选择扫码类型',
      confirmText: '商品',
      showCancel: true,
      cancelText:'订单',
      success (res) {
        if (res.confirm) {
          console.log('用户点击商品按钮')
          wx.scanCode({
            success: (res) => {
            wx.showToast({
             title: '成功',
             icon: 'success',
             duration: 2000
            })
            console.log(res.result)
            console.log(_this.data.szzhi)
            console.log(_this.data.szsl)
            console.log(_this.data.szje)
            console.log(_this.data.shangpin_list)
            var panduan = false
            var qr_sp_dm = res.result
            for(var i=0; i<_this.data.szzhi.length; i++){
              if(_this.data.szzhi[i].sp_dm == qr_sp_dm){
                panduan = true
                var szsl = _this.data.szsl
                szsl[i] = (szsl[i] * 1) + 1
                _this.setData({
                  szsl
                })
                wx.pageScrollTo({
                  scrollTop: 168+i*97,
                  duration: 300
                })
                break;
              }
            }
            if(panduan == false){
              for(var i=0; i<_this.data.shangpin_list.length; i++){
                if(_this.data.shangpin_list[i].sp_dm == qr_sp_dm){
                  var szzhi = _this.data.szzhi
                  var szsl = _this.data.szsl
                  var szje = _this.data.szje
                  szzhi.push(_this.data.shangpin_list[i])
                  szsl.push(1)
                  szje.push(0)
                  _this.setData({
                    szzhi,
                    szsl,
                    szje
                  })
                  wx.pageScrollTo({
                    scrollTop: 168+i*szzhi.length,
                    duration: 300
                  })
                  break;
                }
              }
            }
            _this.zongjia_refresh()
            },
            fail: (res) => {
            wx.showToast({
             title: '失败',
             icon: 'error',
             duration: 2000
            })
            },
            complete: (res) => {
            } 
            })
        } else if (res.cancel) {
          console.log('用户点击订单按钮')
          wx.scanCode({
            success: (res) => {
              wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
              })
              console.log(res.result)
              console.log(_this.data.szzhi)
              console.log(_this.data.szsl)
              console.log(_this.data.szje)
              console.log(_this.data.shangpin_list)
              var panduan = false
              var qr_order_dm = res.result
              var sql = "select * from yh_jinxiaocun_mingxi where orderid = '" + qr_order_dm + "' and gs_name = '" + app.globalData.gongsi + "'"
              wx.cloud.callFunction({
                name: "sqlConnection",
                data: {
                  sql: sql
                },
                success(res) {
                  console.log(res.result)
                  var order_list = res.result
                  for(var i=0; i<order_list.length; i++){
                    var this_sp_dm = order_list[i].sp_dm
                    panduan = false
                    for(var j=0; j<_this.data.szzhi.length; j++){
                      if(this_sp_dm = _this.data.szzhi[j].sp_dm){
                        panduan = true
                        var szsl = _this.data.szsl
                        szsl[i] = (szsl[i] * 1) + 1
                        _this.setData({
                          szsl
                        })
                        break;
                      }
                    }
                    if(panduan == false){
                      for(var j=0; j<_this.data.shangpin_list.length; j++){
                        if(_this.data.shangpin_list[j].sp_dm == this_sp_dm){
                          var szzhi = _this.data.szzhi
                          var szsl = _this.data.szsl
                          var szje = _this.data.szje
                          szzhi.push(_this.data.shangpin_list[j])
                          szsl.push(1)
                          szje.push(0)
                          _this.setData({
                            szzhi,
                            szsl,
                            szje
                          })
                          break;
                        }
                      }
                    }
                  }
                  _this.zongjia_refresh()
                },
                fail(res) {
                  console.log("失败", res)
                }
              });
            },
            fail: (res) => {
            wx.showToast({
             title: '失败',
             icon: 'error',
             duration: 2000
            })
            },
            complete: (res) => {
            } 
            })
        }
      }
    })
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
    // var today = that.data.date;
    var date = new Date();
    var y = date.getFullYear();
    var mon = date.getMonth()+1;
    var d = date.getDate();

    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    var today = `${y}-${mon}-${d} ${h}:${m}:${s}`;
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