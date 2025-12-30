// pages/time/time.js
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
    rkSum: 0,
    rkck: "确认入库",
    hideen1: true,
    hideen2: false,
    pd: 0,
    sjkj: "",
    ddh: "",
    shangpin_list: [],
    cangku: "", // 仓库值
    cangkuIndex: -1, // 仓库选择索引
    cangkuOptions: [], // 仓库选项列表
    isRukuIndex: 0,
    isRukuOptions: ['是', '否'],
    isRuku: '是'
  },

  // 仓库选择变化
  cangkuChange: function(e) {
    var index = e.detail.value;
    var value = this.data.cangkuOptions[index];
    console.log("仓库选择:", index, value);
    this.setData({
      cangkuIndex: index,
      cangku: value
    });
  },

  // 是否入库选择变化
  isRukuChange: function(e) {
    var index = e.detail.value;
    var value = this.data.isRukuOptions[index];
    console.log("是否入库选择:", value);
    this.setData({
      isRukuIndex: index,
      isRuku: value,
      rkck: value === '是' ? '确认采购' : '确认采购'
    });
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
  },

  ddh_input: function(e) {
    var that = this
    that.setData({
      ddh: e.detail.value
    })

  },
  cangku_input: function(e) {
    var that = this
    that.setData({
      cangku: e.detail.value
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
      pd: 0,
      isRukuIndex: 0,
      isRuku: '是',
      cangkuIndex: -1,
      cangku: "",
      cangkuOptions: []
    });
    
    var id = null
    if (id != null) {
      that.setData({
        hideen1: !that.data.hideen1,
        hideen2: !that.data.hideen2,
        all: id
      })
    }
    
    // 加载仓库数据
    that.loadCangkuData();
    
    var openid = wx.getStorageSync("openid").openid
    const db = wx.cloud.database();
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    console.log(finduser)
    
    if(app.globalData.shujuku==0){
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "select * from yh_jinxiaocun_jinhuofang where gongsi = '" + gongsi + "'"
        },
        success(res) {
          console.log("成功", res.result)
          if (id != null) {
            that.setData({
              all: res.result[id].beizhu
            })
          }
        },
        fail(res) {
          console.log("失败", res)
        }
      })
    }else if(app.globalData.shujuku == 1){
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jinhuofang_mssql where gongsi = '" + gongsi + "'"
        },
        success(res) {
          console.log("成功", res.result.recordset)
          if (id != null) {
            that.setData({
              all: res.result.recordset[id].beizhu
            })
          }
        },
        fail(res) {
          console.log("失败", res)
        }
      })
    }
  },

  srJg: function(e) {
    sl = ""
    jg = ""
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
        content: '请选择日期',
      })
    } else {
      if (that.data.all == undefined) {
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
          if (that.data.cangku == "" || that.data.cangkuIndex < 0) {
            console.log(that.data.cangku)
            wx.showModal({
              title: '提示',
              content: '请选择仓库',
            })
          } else {
            wx.setStorageSync('type', '1');
            wx.navigateTo({
              url: '/pages/shangpinxuanze/shangpinxuanze',
            })
          }
        }
      }
    }
  },

   // 加载仓库数据
   loadCangkuData: function() {
    var that = this;
    var gongsi = app.globalData.gongsi;
    
    if(app.globalData.shujuku == 0){
      // MySQL数据库
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "select distinct cangku from yh_jinxiaocun_cangku where gongsi = '" + gongsi + "' order by cangku"
        },
        success(res) {
          console.log("仓库数据成功", res)
          if(res.result && res.result.length > 0){
            var cangkuList = res.result.map(item => item.cangku);
            that.setData({
              cangkuOptions: cangkuList
            });
            console.log("仓库选项:", cangkuList);
          } else {
            that.setData({
              cangkuOptions: ['暂无仓库数据']
            });
          }
        },
        fail(res) {
          console.log("仓库数据失败", res)
          that.setData({
            cangkuOptions: ['加载失败']
          });
        }
      });
    } else if(app.globalData.shujuku == 1){
      // SQL Server数据库
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "select distinct cangku from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_cangku_mssql where gongsi = '" + gongsi + "' order by cangku"
        },
        success(res) {
          console.log("仓库数据成功", res)
          if(res.result && res.result.recordset && res.result.recordset.length > 0){
            var cangkuList = res.result.recordset.map(item => item.cangku);
            that.setData({
              cangkuOptions: cangkuList
            });
            console.log("仓库选项:", cangkuList);
          } else {
            that.setData({
              cangkuOptions: ['暂无仓库数据']
            });
          }
        },
        fail(res) {
          console.log("仓库数据失败", res)
          that.setData({
            cangkuOptions: ['加载失败']
          });
        }
      });
    }
  },

 querenRk: function() {
  var that = this

  if (that.data.sjkj == "") {
    console.log(that.data.ddh)
    wx.showModal({
      title: '提示',
      content: '请选择日期',
    })
  } else {
    if (that.data.all == undefined) {
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
        if (that.data.cangku == "" || that.data.cangkuIndex < 0) {
          console.log(that.data.cangku)
          wx.showModal({
            title: '提示',
            content: '请选择仓库',
          })
        } else {
          if (cpxinxi.length == 0) {
            wx.showModal({
              title: '提示',
              content: '请选择入库商品',
            })
          } else {
            // 获取当前时间
            var date = new Date();
            var y = date.getFullYear();
            var mon = date.getMonth() + 1;
            var d = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            
            var today = `${y}-${mon}-${d} ${h}:${m}:${s}`;
            console.log(today)
            var ddh = that.data.ddh;
            var cangku = that.data.cangku;
            var isRuku = that.data.isRuku; // 获取是否入库选项
            var mxtype = isRuku === '是' ? '采购' : '退货'; // 根据选择确定类型
            var rukuField = isRuku === '是' ? '已入库' : ''; // 设置ruku字段值
            console.log("是否入库:", isRuku, "类型:", mxtype);
            
            const db = wx.cloud.database();
            pd = 0
            var finduser = app.globalData.finduser
            var gongsi = app.globalData.gongsi
            console.log(finduser)
         
            // 遍历所有商品
            for (var i = 0; i < cpxinxi.length; i++) {
              // 获取当前商品的基本信息
              var sp_dm = cpxinxi[i].sp_dm;
              var cpname = cpxinxi[i].name;
              var cpsj = jgxinxi[i];
              var cplb = cpxinxi[i].lei_bie;
              var cpsl = slxinxi[i];
              
              if(app.globalData.shujuku == 0){
                // MySQL数据库
                
                // 1. 无论选择"是"还是"否"，都向 yh_jinxiaocun_tuihuomingxi 表插入数据
                wx.cloud.callFunction({
                  name: "sqlConnection",
                  data: {
                    sql: "insert into yh_jinxiaocun_tuihuomingxi (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku,ruku) values ('" + gongsi + "','" + finduser + "','" + that.data.all + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','采购','" + ddh + "','" + cangku + "','" + rukuField + "')"
                  },
                  success(res) {
                    console.log("插入退货明细表成功", res)
                  },
                  fail(res) {
                    console.log("插入退货明细表失败", res)
                  }
                });
                
                // 2. 如果选择"是"，则额外向 yh_jinxiaocun_mingxi 表插入数据
                if (isRuku === '是') {
                  wx.cloud.callFunction({
                    name: "sqlConnection",
                    data: {
                      sql: "insert into yh_jinxiaocun_mingxi (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku) values ('" + gongsi + "','" + finduser + "','" + that.data.all + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','入库','" + ddh + "','" + cangku + "')"
                    },
                    success(res) {
                      console.log("插入明细表成功", res)
                    },
                    fail(res) {
                      console.log("插入明细表失败", res)
                    }
                  });
                }
                
              } else if(app.globalData.shujuku == 1){
                // SQL Server数据库
                
                // 1. 无论选择"是"还是"否"，都向 yh_jinxiaocun_tuihuomingxi_mssql 表插入数据
                wx.cloud.callFunction({
                  name: "sqlServer_117",
                  data: {
                    query: "insert into yh_jinxiaocun_excel.dbo.yh_jinxiaocun_tuihuomingxi_mssql (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku,ruku) values ('" + gongsi + "','" + finduser + "','" + that.data.all + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','" + mxtype + "','" + ddh + "','" + cangku + "','" + rukuField + "')"
                  },
                  success(res) {
                    console.log("插入退货明细表成功", res)
                  },
                  fail(res) {
                    console.log("插入退货明细表失败", res)
                  }
                });
                
                // 2. 如果选择"是"，则额外向 yh_jinxiaocun_mingxi_mssql 表插入数据
                if (isRuku === '是') {
                  wx.cloud.callFunction({
                    name: "sqlServer_117",
                    data: {
                      query: "insert into yh_jinxiaocun_excel.dbo.yh_jinxiaocun_mingxi_mssql (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku) values ('" + gongsi + "','" + finduser + "','" + that.data.all + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','入库','" + ddh + "','" + cangku + "')"
                    },
                    success(res) {
                      console.log("插入明细表成功", res)
                    },
                    fail(res) {
                      console.log("插入明细表失败", res)
                    }
                  });
                }
              }
            }
            
            // 显示成功提示
            var successMsg = isRuku === '是' ? '成功' : '成功';
            wx.showToast({
              title: successMsg,
              icon: 'success',
              duration: 2000
            })
            
            // 重置页面
            setTimeout(() => {
              that.onLoad()
            }, 1500)
          }
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