// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: [],
    id: "",
    value0: "",
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
    value7: "",
    // szzhi:[],
    // szZhi:[],
    list: [{
        txet: "订单号",
        index: 0,
        name : 'orderid',
        fun : 'orderid',
        type:'text',
      },
      {
        txet: "商品代码",
        index: 1,
        name : 'sp_dm',
        fun : 'sp_dm',
        type:'text',
      },
      {
        txet: "商品名称",
        index: 2,
        name : 'cpname',
        fun : 'cpname',
        type:'text',
      },
      {
        txet: "商品类别",
        index: 3,
        name : 'cplb',
        fun : 'cplb',
        type:'text',
      },{
        txet: "价格",
        index: 4,
        name : 'cpsj',
        fun : 'cpsj',
        type:'number',
      },{
        txet: "数量",
        index: 5,
        name : 'cpsl',
        fun : 'cpsl',
        type:'number',
      },{
        txet: "明细类型",
        index: 6,
        name : 'mxtype',
        fun : 'mxtype',
        type:'text',
      },{
        txet: "收/进货方",
        index: 7,
        name : 'shou_h',
        fun : 'shou_h',
        type:'text',
      },{
        txet: "仓库",
        index: 8,
        name : 'cangku',
        fun : 'cangku',
        type:'text',
      }
    ],
    fun : "",
    tuihuoIndex: -1, // 是否退货选择索引
    tuihuoOptions: ['是', '否'], // 是否退货选项
    isTuihuo: false, // 是否退货
  },

  // 是否退货选择变化
  tuihuoChange: function(e) {
    var index = e.detail.value;
    var value = this.data.tuihuoOptions[index];
    console.log("是否退货选择:", value, "索引:", index);
    this.setData({
      tuihuoIndex: index,
      isTuihuo: value === '是'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      fun: options.fun
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
    var that = this
    var gongsi = app.globalData.gongsi
    var fun = that.data.fun;
    var ssql = ""
    if(fun == 'update'){
      ssql = "select * from yh_jinxiaocun_tuihuomingxi where gs_name = '" + gongsi + "' and id ='" + that.data.id + "'"
    }else{
      ssql=""
    }
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: ssql
      },
      success(res) {
        console.log(res.result)
        if(res.result && res.result.length > 0){
          that.setData({
            all: res.result,
            value0:res.result[0].orderid,
            value1:res.result[0].sp_dm,
            value2:res.result[0].cpname,
            value3:res.result[0].cplb,
            value4:res.result[0].cpsj,
            value5:res.result[0].cpsl,
            value6:res.result[0].mxtype,
            value7:res.result[0].shou_h,
            value8:res.result[0].cangku,
          })
        }
      },
      fail(res) {
        console.log("失败", res)
      }
    });
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

  },


  input: function(e) {
    var id = e.currentTarget.dataset.id
    var value = e.detail.value
    this.setData({
      [`value${id}`]: value
    })
    console.log(id)
    console.log(value)
    console.log([`value${id}`])
  },

  querenxinjian: function() {
    var that = this;
    var id = that.data.id;
    var fun = that.data.fun;
    var gongsi = app.globalData.gongsi
    var finduser = app.globalData.finduser
    
    // 获取输入框的值
    var orderid = that.data.value0;      // 订单号
    var sp_dm = that.data.value1;        // 商品代码
    var cpname = that.data.value2;       // 商品名称
    var cplb = that.data.value3;         // 商品类别
    var cpsj = that.data.value4;         // 价格
    var cpsl = that.data.value5;         // 数量
    var mxtype = that.data.value6;       // 明细类型
    var shou_h = that.data.value7;       // 收/进货方
    var cangku = that.data.value8;       // 仓库
    
    // 获取是否退货选择
    var isTuihuo = that.data.isTuihuo;
    
    // 验证必填字段
    if (!orderid || !sp_dm || !cpname || !cpsl || !cangku) {
      wx.showToast({
        title: '请填写必填字段',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    
    if (cpsl <= 0) {
      wx.showToast({
        title: '数量必须大于0',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    
    // 根据是否退货执行不同的操作
    if (isTuihuo) {
      // 选择"是"：更新并设置ruku为"已入库"，同时插入数据到mingxi表
      
      // 获取当前时间
      var date = new Date();
      var y = date.getFullYear();
      var mon = date.getMonth() + 1;
      mon = mon < 10 ? '0' + mon : mon;
      var d = date.getDate();
      d = d < 10 ? '0' + d : d;
      var h = date.getHours();
      h = h < 10 ? '0' + h : h;
      var m = date.getMinutes();
      m = m < 10 ? '0' + m : m;
      var s = date.getSeconds();
      s = s < 10 ? '0' + s : s;
      
      var today = `${y}-${mon}-${d} ${h}:${m}:${s}`;
      
      if(app.globalData.shujuku == 0){
        // MySQL数据库
        
        // 1. 更新退货表数据，设置ruku为"已入库"
        var updateSql = "update yh_jinxiaocun_tuihuomingxi set orderid = '" + orderid + "', sp_dm = '" + sp_dm + "', cpname = '" + cpname + "', cplb = '" + cplb + "', cpsj = '" + cpsj + "', cpsl = '" + cpsl + "', mxtype = '" + mxtype + "', shou_h = '" + shou_h + "', cangku = '" + cangku + "', ruku = '已入库' where id = '" + id + "'";
        
        // 2. 向明细表插入数据
        var insertSql = "insert into yh_jinxiaocun_mingxi (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku) values ('" + gongsi + "','" + finduser + "','" + shou_h + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','入库','" + orderid + "','" + cangku + "')";
        
        // 先执行更新
        wx.cloud.callFunction({
          name: "sqlConnection",
          data: {
            sql: updateSql
          },
          success(res) {
            console.log("更新退货表成功", res)
            
            // 再执行插入
            wx.cloud.callFunction({
              name: "sqlConnection",
              data: {
                sql: insertSql
              },
              success(res2) {
                console.log("插入明细表成功", res2)
                wx.showToast({
                  title: '成功，已入库',
                  icon: 'success',
                  duration: 3000
                })
                
                // 延迟返回
                setTimeout(() => {
                  wx.navigateBack()
                }, 1500)
              },
              fail(res2) {
                console.log("插入明细表失败", res2)
                wx.showToast({
                  title: '更新成功但入库失败',
                  icon: 'none',
                  duration: 3000
                })
                // 仍然返回页面
                setTimeout(() => {
                  wx.navigateBack()
                }, 1500)
              }
            });
          },
          fail(res) {
            console.log("更新退货表失败", res)
            wx.showToast({
              title: '操作失败',
              icon: 'none',
              duration: 3000
            })
          }
        });
        
      } else if(app.globalData.shujuku == 1){
        // SQL Server数据库
        
        // 1. 更新退货表数据，设置ruku为"已入库"
        var updateQuery = "update yh_jinxiaocun_excel.dbo.yh_jinxiaocun_tuihuomingxi_mssql set orderid = '" + orderid + "', sp_dm = '" + sp_dm + "', cpname = '" + cpname + "', cplb = '" + cplb + "', cpsj = '" + cpsj + "', cpsl = '" + cpsl + "', mxtype = '" + mxtype + "', shou_h = '" + shou_h + "', cangku = '" + cangku + "', ruku = '已入库' where id = '" + id + "'";
        
        // 2. 向明细表插入数据
        var insertQuery = "insert into yh_jinxiaocun_excel.dbo.yh_jinxiaocun_mingxi_mssql (gs_name, zh_name, shou_h, shijian, sp_dm, cpname, cpsj, cplb, cpsl, mxtype, orderid, cangku) values ('" + gongsi + "','" + finduser + "','" + shou_h + "','" + today + "','" + sp_dm + "','" + cpname + "','" + cpsj + "','" + cplb + "','" + cpsl + "','入库','" + orderid + "','" + cangku + "')";
        
        // 先执行更新
        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: updateQuery
          },
          success(res) {
            console.log("更新退货表成功", res)
            
            // 再执行插入
            wx.cloud.callFunction({
              name: "sqlServer_117",
              data: {
                query: insertQuery
              },
              success(res2) {
                console.log("插入明细表成功", res2)
                wx.showToast({
                  title: '成功，已入库',
                  icon: 'success',
                  duration: 3000
                })
                
                // 延迟返回
                setTimeout(() => {
                  wx.navigateBack()
                }, 1500)
              },
              fail(res2) {
                console.log("插入明细表失败", res2)
                wx.showToast({
                  title: '更新成功但入库失败',
                  icon: 'none',
                  duration: 3000
                })
                // 仍然返回页面
                setTimeout(() => {
                  wx.navigateBack()
                }, 1500)
              }
            });
          },
          fail(res) {
            console.log("更新退货表失败", res)
            wx.showToast({
              title: '操作失败',
              icon: 'none',
              duration: 3000
            })
          }
        });
      }
      
    } else {
      // 选择"否"：只更新其他字段，不处理ruku字段，不插入数据
      
      if(app.globalData.shujuku == 0){
        // MySQL数据库
        var updateSql = "update yh_jinxiaocun_tuihuomingxi set orderid = '" + orderid + "', sp_dm = '" + sp_dm + "', cpname = '" + cpname + "', cplb = '" + cplb + "', cpsj = '" + cpsj + "', cpsl = '" + cpsl + "', mxtype = '" + mxtype + "', shou_h = '" + shou_h + "', cangku = '" + cangku + "' where id = '" + id + "'";
        
        wx.cloud.callFunction({
          name: "sqlConnection",
          data: {
            sql: updateSql
          },
          success(res) {
            console.log("更新退货表成功", res)
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 3000
            })
            
            // 延迟返回
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          },
          fail(res) {
            console.log("更新退货表失败", res)
            wx.showToast({
              title: '更新失败',
              icon: 'none',
              duration: 3000
            })
          }
        });
        
      } else if(app.globalData.shujuku == 1){
        // SQL Server数据库
        var updateQuery = "update yh_jinxiaocun_excel.dbo.yh_jinxiaocun_tuihuomingxi_mssql set orderid = '" + orderid + "', sp_dm = '" + sp_dm + "', cpname = '" + cpname + "', cplb = '" + cplb + "', cpsj = '" + cpsj + "', cpsl = '" + cpsl + "', mxtype = '" + mxtype + "', shou_h = '" + shou_h + "', cangku = '" + cangku + "' where id = '" + id + "'";
        
        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: updateQuery
          },
          success(res) {
            console.log("更新退货表成功", res)
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 3000
            })
            
            // 延迟返回
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          },
          fail(res) {
            console.log("更新退货表失败", res)
            wx.showToast({
              title: '更新失败',
              icon: 'none',
              duration: 3000
            })
          }
        });
      }
    }
  }
})