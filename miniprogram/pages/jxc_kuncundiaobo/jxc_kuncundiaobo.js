// pages/jxc_kuncundiaobo/jxc_kuncundiaobo.js
var app = getApp()
var common = require('../../utils/common.js');
var jg = ""
var sl = ""
var szzhi = [] //
var szsl = []
var szje = []
var khname
var cpxinxi = []
var slxinxi = []
var jgxinxi = []
var ckxinxi = []
var pd = 0

var dtid = 0
var cpid
var cpjg = []
var cpsl = []


Page({

  /**
   * 页面的初始数据
   */

  data: {
    jghide: "none",
    szzhi: [],
    szjg: [],
    szsl: [],
    szck: [],
    rkSum: 0,
    rkck: "确认入库",
    hideen1: true,
    hideen2: false,
    pd: 0,
    sjkj: "",
    ddh: "",
    wareHouse:'',
    warehouseOptions: ['A仓库', 'B仓库', '广州仓库', '深圳仓库'],
    shangpin_list: [],
  },
  bindDateChange: function(e) {
    var that = this
    that.setData({
      date: e.detail.value,
      sjkj: e.detail.value
    })
  },

  qrcode: function(e){
    var _this = this
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
            var szck = _this.data.szck
            szzhi.push(_this.data.shangpin_list[i])
            szsl.push(1)
            // szje.push(0)
            
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
    ckxinxi = []
    cpjg = []
    cpsl = []
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
    // if (options.id != null) {
    //   id = options.id
    // }
    // console.log(id)
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
    //       szzhi:res.result
    //     })
    //   },
    //   fail(res) {
    //     console.log("失败", res)
    //   }
    // });
  },

  srJg: function(e) {
    sl = ""
    jg = ""
    ck = ""
    console.log("触发点击")
    var _this = this
    dtid = e.currentTarget.dataset.id
    console.log(dtid)
    _this.setData({
      jghide: "flex",
      cpid: dtid,
      cpsl: _this.data.szsl,
      cpjg: _this.data.szje,
      backhidden: false
    })
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
  cunck: function(e) {
    ck = e.detail.value
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
  var _this = this
  // that.setData({
  //   jghide: true,
  //   jghide: "none",
  //   backhidden: true
  // })
  var zongjia = that.data.rkSum
  if (sl != "" && jg != "") {
    if(sl*1 <=0 || jg*1 <=0 ){
      wx.showToast({
        title: '数量和价格必须大于0',
        icon:'none'
      })
      return;
    }
    console.log(cpsl)
    console.log(cpjg)
    cpsl[dtid] = sl
    cpjg[dtid] = jg
    cpck[dtid] = ck
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
    szck:cangku,
    rkSum: zongjia
  })
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
        ckxinxi[i] = that.data.szck[i]
      }
    }

    if (wx.getStorageSync("khpd") != "1") {
      var rk = that.data.rkSum
      if (wx.getStorageSync("rkall") != null) {
        rk = rk + Number(wx.getStorageSync("cpsum"))
        szzhi = wx.getStorageSync("rkall")
        var sl = wx.getStorageSync("szsl")
        var je = wx.getStorageSync("szje")
        var ck = wx.getStorageSync("szck")

        var fuzhii = 0
        var szzhilength = that.data.szzhi.length;
        console.log(sl)
        console.log(ck)
        for (var i = szzhilength; i < szzhilength + wx.getStorageSync("rkall").length; i++) {
          if (cpxinxi[i] == null) {
            cpxinxi[i] = szzhi[fuzhii]
            slxinxi[i] = sl[fuzhii]
            jgxinxi[i] = je[fuzhii]
            ckxinxi[i] = ck[fuzhii]
            fuzhii++;
          }
        }

        that.setData({
          szzhi: cpxinxi,
          szsl: slxinxi,
          szje: jgxinxi,
          szck: ckxinxi,
          rkSum: rk

        })
        wx.clearStorageSync("cpsum")
        wx.clearStorageSync("rkall")
        wx.clearStorageSync("szsl")
        wx.clearStorageSync("szje")
        wx.clearStorageSync("szck")
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
  choicewareHouse: function(e) {
    const selectedIndex = e.detail.value;
    const wareHouse = this.data.warehouseOptions[selectedIndex];
    
    this.setData({
      selectedIndex: selectedIndex,
      wareHouse: wareHouse
    })
    console.log(wareHouse)
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
      if (that.data.wareHouse == "") { //2020/7/2
        wx.showModal({
          title: '提示',
          content: '请选择目标仓库',
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
      if (that.data.wareHouse == "") { //2020/7/2
        wx.showModal({
          title: '提示',
          content: '请选择目标仓库',
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

            // var today = that.data.sjkj;
            var date = new Date();
            var y = date.getFullYear();
            var mon = date.getMonth()+1;
            var d = date.getDate();

            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
console.log(date)
            var today = `${y}-${mon}-${d} ${h}:${m}:${s}`;
            console.log(today)
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
                  // sql = `INSERT INTO yh_jinxiaocun_mingxi (gs_name,zh_name,shou_h,shijian,sp_dm,cpname,cpsj,cplb,cpsl,mxtype,orderid,cangku) SELECT '${gongsi}','${finduser}','${that.data.all}','${today}','${cpxinxi[i].sp_dm}','${cpxinxi[i].name}','${jgxinxi[i]}','${cpxinxi[i].lei_bie}','${slxinxi[i]}','调拨出库','${ddh}','${cpxinxi[i].cangku}' UNION ALL SELECT '${gongsi}','${finduser}','${that.data.all}','${today}','${cpxinxi[i].sp_dm}','${cpxinxi[i].name}','${jgxinxi[i]}','${cpxinxi[i].lei_bie}','${slxinxi[i]}','调拨入库','${ddh}','${wareHouse}'`
                  // sql: "insert yh_jinxiaocun_mingxi(gs_name,zh_name,shou_h,shijian,sp_dm,cpname,cpsj,cplb,cpsl,mxtype,orderid)values('" + gongsi + "','" + finduser + "','" + that.data.all + "','" + today + "','" + cpxinxi[i].sp_dm + "','" + cpxinxi[i].name + "','" + jgxinxi[i] + "','" + cpxinxi[i].lei_bie + "','" + slxinxi[i] + "','调拨入库','" + ddh + "')"
                  sql : "INSERT INTO yh_jinxiaocun_mingxi (gs_name,zh_name,shou_h,shijian,sp_dm,cpname,cpsj,cplb,cpsl,mxtype,orderid,cangku) SELECT '" + gongsi + "','" + finduser + "','" + that.data.all + "','" + today + "','" + cpxinxi[i].sp_dm + "','" + cpxinxi[i].name + "','" + jgxinxi[i] + "','" + cpxinxi[i].lei_bie + "','" + slxinxi[i] + "','调拨出库','" + ddh + "','" + ckxinxi[i] + "' UNION ALL SELECT '" + gongsi + "','" + finduser + "','" + that.data.all + "','" + today + "','" + cpxinxi[i].sp_dm + "','" + cpxinxi[i].name + "','" + jgxinxi[i] + "','" + cpxinxi[i].lei_bie + "','" + slxinxi[i] + "','调拨入库','" + ddh + "','" + that.data.wareHouse + "'"
                },
                success(res) {
                  
                  console.log("成功", res)
                  // that.setData({
                  //   all: res.result[id][0].beizhu
                  // })
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
                  //       szzhi:res.result
                  //     })
                  //   },
                  //   fail(res) {
                  //     console.log("失败", res)
                  //   }
                  // });
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
              title: '调拨成功',
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