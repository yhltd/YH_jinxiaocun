// pages/shangpinxuanze/shangpinxuanze.js
import QR from '../utils/weapp-qrcode-base64.js'
var app = getApp()
var jg
var sl
var dtid
var cpid
var cpjg = []
var cpsl = []
var szZhi = []
var zongjia
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jghide: "none",
    sl: [],
    jg: [],

    rkck: "选择商品"
  },

  select : function(e){
    var _this = this;
    var all = _this.data.all;
    for(let i = 0;i<all.length;i++){
      if(all[i].name.indexOf(e.detail.value)==-1){
        _this.setData({
          ["all["+i+"].isSelect"] : 1
        })
      }else{
        _this.setData({
          ["all["+i+"].isSelect"] : 0
        })
      }

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.init();

  },

  init: function(){
    var that = this
    that.setData({
      rkSum: 0,
      sl: [],
      jg: []
    })
    var all = []
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi

    const db = wx.cloud.database();

    if(app.globalData.shujuku==0){

      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "select *,0 as isSelect,'' as checkbox from yh_jinxiaocun_jichuziliao where gs_name = '" + gongsi + "'"
        },
        success: res=> {
          console.log(res.result)
          for(var i=0;i<res.result.length;i++){
            var imgData = QR.drawImg(res.result[i].sp_dm, {
              typeNumber: 4,
              errorCorrectLevel: 'M',
              size: 500
           })
           res.result[i].qrcode = imgData
            if(res.result[i].mark1 != null){
              res.result[i].mark1 = "data:image/jpeg;base64," + res.result[i].mark1.replace(/[\r\n]/g, '')
            }
          }
          console.log(res.result)
          that.setData({
            all: res.result,
          })
        },
        fail: res=> {
          console.log("失败", res)
        }
      });

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "select *,0 as isSelect,'' as checkbox from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jichuziliao_mssql where gs_name = '" + gongsi + "'"
        },
        success: res=> {
          console.log(res.result)
          for(var i=0;i<res.result.recordset.length;i++){
            var imgData = QR.drawImg(res.result.recordset[i].sp_dm, {
              typeNumber: 4,
              errorCorrectLevel: 'M',
              size: 500
           })
           res.result.recordset[i].qrcode = imgData
            if(res.result.recordset[i].mark1 != null){
              res.result.recordset[i].mark1 = "data:image/jpeg;base64," + res.result.recordset[i].mark1.replace(/[\r\n]/g, '')
            }
          }
          console.log(res.result)
          that.setData({
            all: res.result.recordset,
          })
        },
        fail: res=> {
          console.log("失败", res)
        }
      });
      
    }

    
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
    that.init();
    that.setData({
      rkSum: 0,
      sl: [],
      jg: []
    })
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
    that.onLoad()
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

  xixi: function(e) {
    console.log(e.detail.value)
    if (e.detail.value == "") {
      
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi

      if(app.globalData.shujuku==0){

        wx.cloud.callFunction({
          name: "sqlConnection",
          data: {
            sql: "SELECT *,0 as isSelect,'' as checkbox from yh_jinxiaocun_jichuziliao where gs_name = '" + gongsi + "'"
          },
          success(res) {
            that.setData({
              all: res.result
            })
            console.log(that.data.szzhi)
          },
          fail(res) {
            console.log("失败", res)
  
          }
        });

      }else if(app.globalData.shujuku == 1){

        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: "select *,0 as isSelect,'' as checkbox from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jichuziliao_mssql where gs_name = '" + gongsi + "'"
          },
          success(res) {
            that.setData({
              all: res.result.recordset
            })
            console.log(that.data.szzhi)
          },
          fail(res) {
            console.log("失败", res)
  
          }
        });
        
      }

      
      // db.collection("Yh_JinXiaoCun_mingxi").where({
      //   finduser: finduser,
      //   gongsi: gongsi,

      // }).get({
      //   success: res => {
      //     that.setData({
      //       szzhi: res.data
      //     })
      //   }
      // })

    } else {
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi

      if(app.globalData.shujuku==0){

        wx.cloud.callFunction({
          name: "sqlConnection",
          data: {
            sql: "SELECT *,0 as isSelect,'' as checkbox from yh_jinxiaocun_jichuziliao where gs_name = '" + gongsi + "'and name like '%" + e.detail.value + "%'"
          },
          success(res) {
            that.setData({
              all: res.result
            })
            console.log(that.data.all)
          },
          fail(res) {
            console.log("失败", res)
  
          }
        });

      }else if(app.globalData.shujuku == 1){

        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: "select *,0 as isSelect,'' as checkbox from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jichuziliao_mssql where gs_name = '" + gongsi + "' and name like '%" + e.detail.value + "%'"
          },
          success(res) {
            that.setData({
              all: res.result.recordset
            })
            console.log(that.data.all)
          },
          fail(res) {
            console.log("失败", res)
  
          }
        });
        
      }

      
    }
  },





  shanchu: function(e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    console.log(id)
    console.log(that.data.all)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {

          if(app.globalData.shujuku==0){

            wx.cloud.callFunction({
              name: "sqlConnection",
              data: {
                sql: "delete from Yh_JinXiaoCun_jichuziliao where sp_dm = '" + that.data.all[id].sp_dm + "'"
              },
              success(res) {
                console.log("成功", res)
                wx.showToast({
                  title: '删除成功',
                  icon:'none',
                })
                that.init();
                // that.setData({
                //     all: res.data,
  
                //   })
                // szZhi = 
              },
              fail(res) {
                console.log("失败", res)
  
              }
            });

          }else if(app.globalData.shujuku == 1){

            wx.cloud.callFunction({
              name: "sqlServer_117",
              data: {
                query: "delete from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jichuziliao_mssql where sp_dm = '" + that.data.all[id].sp_dm + "'"
              },
              success(res) {
                console.log("成功", res)
                wx.showToast({
                  title: '删除成功',
                  icon:'none',
                })
                that.init();
                // that.setData({
                //     all: res.data,
  
                //   })
                // szZhi = 
              },
              fail(res) {
                console.log("失败", res)
  
              }
            });
            
          }

          
          // db.collection("Yh_JinXiaoCun_chanpin").doc(that.data.all[id]._id).remove({
          //   success: console.log,
          //   fail: console.error,

          // })
          that.onLoad()
        } else if (res.cancel) {

          return false;
        }

      }
    })


  },
  jiahao1: function() {
    wx.navigateTo({
      url: '/pages/xinjianshangpin/xinjianshangpin',
    })
  },

  print_out:function(){
    var _this = this
    var list = _this.data.all
    var output_list = []
    console.log(list)
    for(var i=0; i<list.length; i++){
      if(list[i].isSelect == 0 && list[i].checkbox == true){
        output_list.push({
          sp_dm: "商品代码：" + list[i].sp_dm,
          mingcheng: "商品名称：" + list[i].name,
        })
      }
    }
    console.log(output_list)
    if(output_list.length == 0){
      wx.showToast({
        title: '未读取到选中商品',
        icon: 'none',
        duration: 2000
       })
       return;
    }
    wx.navigateTo({
      url: '../../packageJ/page/printQR/printQR?list=' + JSON.stringify(output_list),
    })
  },

  srJg: function(e) {
    var that = this
    dtid = e.target.dataset.id
    console.log(dtid)
    if(dtid != undefined){
      var _id = that.data.all[dtid].id
      wx.navigateTo({
        url: '/pages/shangpinchazhao/shangpinchazhao?_id=' + _id,
      })
    }else{
      var hang = e.target.dataset.hang
      var all = that.data.all
      if(all[hang].checkbox == true){
        all[hang].checkbox = ""
      }else{
        all[hang].checkbox = true
      }
      that.setData({
        all
      })
      console.log(that.data.all)
    }

  },

  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.点击右下角“+”按钮可以添加商品信息。\n2.点击一条数据可以弹出文本框进行修改。\n3.长按数据可删除。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

})