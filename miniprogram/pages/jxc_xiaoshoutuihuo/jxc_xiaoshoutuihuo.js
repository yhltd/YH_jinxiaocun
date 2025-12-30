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
    rkck: "确认",
    jinhuo: 1,
    hidden1: true,
    hidden2: false,
    sjkj: "",
    ddh: "",
    shangpin_list: [],
    cangku: "",
    cangkuOptions: [],  // 新增：仓库下拉选项
    cangkuIndex: -1,    // 新增：选中的仓库索引
    date: "",           // 日期
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
    var gongsi = app.globalData.gongsi
    
    that.setData({
      szzhi: [],
      szjg: [],
      szsl: []
    });
    
    // 设置默认日期为今天
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    
    that.setData({
      date: formattedDate,
      sjkj: formattedDate
    });
    
    // 加载仓库数据
    that.loadCangkuData();
  },

  // 新增：加载仓库数据
  loadCangkuData: function() {
    var that = this;
    var gongsi = app.globalData.gongsi;
    
    // 根据数据库类型查询仓库数据
    if(app.globalData.shujuku == 0) {
      // MySQL数据库
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "select distinct cangku from yh_jinxiaocun_cangku where gongsi = '" + gongsi + "' order by cangku"
        },
        success(res) {
          console.log("仓库数据查询成功", res);
          if (res.result && res.result.length > 0) {
            var cangkuOptions = res.result.map(item => item.cangku);
            that.setData({
              cangkuOptions: cangkuOptions,
              cangkuIndex: 0,  // 默认选择第一个
              cangku: cangkuOptions[0]  // 设置默认值
            });
          } else {
            that.setData({
              cangkuOptions: ['暂无仓库数据'],
              cangkuIndex: 0,
              cangku: '暂无仓库数据'
            });
            wx.showToast({
              title: '暂无仓库数据',
              icon: 'none',
              duration: 2000
            });
          }
        },
        fail(res) {
          console.log("仓库数据查询失败", res);
          that.setData({
            cangkuOptions: ['加载失败'],
            cangkuIndex: 0,
            cangku: '加载失败'
          });
          wx.showToast({
            title: '仓库数据加载失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    } else if(app.globalData.shujuku == 1) {
      // SQL Server数据库
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "select distinct cangku from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_cangku_mssql where gongsi = '" + gongsi + "' order by cangku"
       },
        success(res) {
          console.log("仓库数据查询成功", res);
          if (res.result && res.result.recordset && res.result.recordset.length > 0) {
            var cangkuOptions = res.result.recordset.map(item => item.cangku);
            that.setData({
              cangkuOptions: cangkuOptions,
              cangkuIndex: 0,  // 默认选择第一个
              cangku: cangkuOptions[0]  // 设置默认值
            });
          } else {
            that.setData({
              cangkuOptions: ['暂无仓库数据'],
              cangkuIndex: 0,
              cangku: '暂无仓库数据'
            });
            wx.showToast({
              title: '暂无仓库数据',
              icon: 'none',
              duration: 2000
            });
          }
        },
        fail(res) {
          console.log("仓库数据查询失败", res);
          that.setData({
            cangkuOptions: ['加载失败'],
            cangkuIndex: 0,
            cangku: '加载失败'
          });
          wx.showToast({
            title: '仓库数据加载失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  },

  // 新增：仓库下拉框选择事件
  cangkuChange: function(e) {
    var that = this;
    var index = e.detail.value;
    var cangkuOptions = that.data.cangkuOptions;
    
    if (index >= 0 && index < cangkuOptions.length) {
      var selectedCangku = cangkuOptions[index];
      that.setData({
        cangkuIndex: index,
        cangku: selectedCangku
      });
      console.log("选择的仓库:", selectedCangku);
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

              if(app.globalData.shujuku==0){

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

              }else if(app.globalData.shujuku == 1){

                var sql = "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_mingxi_mssql where orderid = '" + qr_order_dm + "' and gs_name = '" + app.globalData.gongsi + "'"
              wx.cloud.callFunction({
                name: "sqlServer_117",
                data: {
                  query: sql
                },
                success(res) {
                  console.log(res.result.recordset)
                  var order_list = res.result.recordset
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
                
              }

              
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
        content: '请选择日期',
      })
    }else if (that.data.khname == undefined) {
      console.log(that.data.khname)
      wx.showModal({
        title: '提示',
        content: '请选择客户',
      })
    }else if (that.data.cangku == "" || that.data.cangku == "暂无仓库数据" || that.data.cangku == "加载失败") {
      console.log(that.data.cangku)
      wx.showModal({
        title: '提示',
        content: '请选择有效的仓库',
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
        content: '请选择日期',
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
          if (that.data.cangku == "" || that.data.cangku == "暂无仓库数据" || that.data.cangku == "加载失败") {
            console.log(that.data.cangku)
            wx.showModal({
              title: '提示',
              content: '请选择有效的仓库',
            })
          } else {
            if (szzhi.length == 0) {
              wx.showModal({
                title: '提示',
                content: '请选择商品',
              })
            } else {
              for (var i = 0; i < szzhi.length; i++) {
                // 获取当前商品的基本信息
                var sp_dm = cpxinxi[i].sp_dm;
                var cpname = cpxinxi[i].name;
                var cpsj = jgxinxi[i];
                var cplb = cpxinxi[i].lei_bie;
                var cpsl = slxinxi[i];
                var khname = that.data.khname;
                var ddh = that.data.ddh;
                var cangku = that.data.cangku;

                if(app.globalData.shujuku==0){
                  // MySQL数据库
                  
                  // 1. 向 yh_jinxiaocun_mingxi 表插入数据（入库）
                  wx.cloud.callFunction({
                    name: "sqlConnection",
                    data: {
                      sql: "insert into yh_jinxiaocun_mingxi (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku) values ('" + gongsi + "','" + finduser + "','" + khname + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','入库','" + ddh + "','" + cangku + "')"
                    },
                    success(res) {
                      console.log("插入明细表成功（入库）", res)
                    },
                    fail(res) {
                      console.log("插入明细表失败（出库）", res)
                    }
                  });

                  // 2. 同时向 yh_jinxiaocun_tuihuomingxi 表插入数据，mxtype为"销售退货"，ruku字段为空字符串
                  wx.cloud.callFunction({
                    name: "sqlConnection",
                    data: {
                      // 尝试带ruku字段插入
                      sql: "insert into yh_jinxiaocun_tuihuomingxi (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku, ruku) values ('" + gongsi + "','" + finduser + "','" + khname + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','销售退货','" + ddh + "','" + cangku + "','')"
                    },
                    success(res) {
                      console.log("插入退货明细表成功", res)
                    },
                    fail(res) {
                      console.log("插入退货明细表失败", res)
                      // 如果失败，可能是表结构中没有ruku字段，尝试不带ruku字段的插入
                      wx.cloud.callFunction({
                        name: "sqlConnection",
                        data: {
                          sql: "insert into yh_jinxiaocun_tuihuomingxi (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku) values ('" + gongsi + "','" + finduser + "','" + khname + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','销售退货','" + ddh + "','" + cangku + "')"
                        },
                        success(res2) {
                          console.log("插入退货明细表成功（不带ruku字段）", res2)
                        },
                        fail(res2) {
                          console.log("插入退货明细表失败（不带ruku字段）", res2)
                        }
                      });
                    }
                  });

                }else if(app.globalData.shujuku == 1){
                  // SQL Server数据库
                  
                  // 1. 向 yh_jinxiaocun_mingxi_mssql 表插入数据（出库）
                  wx.cloud.callFunction({
                    name: "sqlServer_117",
                    data: {
                      query: "insert into yh_jinxiaocun_excel.dbo.yh_jinxiaocun_mingxi_mssql (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku) values ('" + gongsi + "','" + finduser + "','" + khname + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','入库','" + ddh + "','" + cangku + "')"
                    },
                    success(res) {
                      console.log("插入明细表成功（出库）", res)
                    },
                    fail(res) {
                      console.log("插入明细表失败（出库）", res)
                    }
                  });

                  // 2. 同时向 yh_jinxiaocun_tuihuomingxi_mssql 表插入数据，mxtype为"销售退货"，ruku字段为空字符串
                  wx.cloud.callFunction({
                    name: "sqlServer_117",
                    data: {
                      query: "insert into yh_jinxiaocun_excel.dbo.yh_jinxiaocun_tuihuomingxi_mssql (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku, ruku) values ('" + gongsi + "','" + finduser + "','" + khname + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','销售退货','" + ddh + "','" + cangku + "','')"
                    },
                    success(res) {
                      console.log("插入退货明细表成功", res)
                    },
                    fail(res) {
                      console.log("插入退货明细表失败", res)
                      // 如果失败，可能是表结构中没有ruku字段，尝试不带ruku字段的插入
                      wx.cloud.callFunction({
                        name: "sqlServer_117",
                        data: {
                          query: "insert into yh_jinxiaocun_excel.dbo.yh_jinxiaocun_tuihuomingxi_mssql (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku) values ('" + gongsi + "','" + finduser + "','" + khname + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','销售退货','" + ddh + "','" + cangku + "')"
                        },
                        success(res2) {
                          console.log("插入退货明细表成功（不带ruku字段）", res2)
                        },
                        fail(res2) {
                          console.log("插入退货明细表失败（不带ruku字段）", res2)
                        }
                      });
                    }
                  });
                }
              }

              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              
              // 清空表单数据
              that.setData({
                szzhi: [],
                szsl: [],
                szje: [],
                rkSum: 0,
                ddh: "",
                khname: undefined,
                hidden1: true,
                hidden2: false
              });
              
              // 重新加载仓库数据
              that.loadCangkuData();
              
              // 清空全局变量
              szzhi = [];
              cpxinxi = [];
              slxinxi = [];
              jgxinxi = [];
            }
          }
        }
      }
    }
  },
  
  xuanzekehu: function(e) {
    var that = this
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