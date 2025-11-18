

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
    rkck: "",
    startTime: 0,
    endTime: 0
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

  upd: function (e) {
    var _this = this;
    if (_this.data.endTime - _this.data.startTime >= 350) {
      return;
    }
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/biji_update/biji_update?id=' + id + '&fun=update',
    })
  },

  tianjia:function(e){
    var _this = this;
    if (_this.data.endTime - _this.data.startTime >= 350) {
      return;
    }
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/biji_update/biji_update?id=' + id + '&fun=insert',
    })
  },

  del: function (e) {
    var id = e.currentTarget.dataset.id
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确定删除么？',
      success(res) {
        if (res.confirm) {

          if(app.globalData.shujuku==0){

            wx.cloud.callFunction({
              name: 'sqlConnection',
              data: {
                sql: "delete from yh_jinxiaocun_zhengli where id = '" + id + "'"
              },
              success: res => {
                if (res.result.affectedRows > 0) {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success'
                  })
                  _this.init();
                }
              }
            })

          }else if(app.globalData.shujuku == 1){

            wx.cloud.callFunction({
              name: 'sqlServer_117',
              data: {
                query: "delete from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_zhengli_mssql where id = '" + id + "'"
              },
              success: res => {
                if (res.result && (res.result.rowsAffected > 0 || res.result.affectedRows > 0)) {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success'
                  })
                  _this.init();
                } else {
                  wx.showToast({
                    title: '删除失败或记录不存在',
                    icon: 'none'
                  })
                }
              }
            })
            
          }

          
        } else if (res.cancel) {
          return;
        }
      }
    })
  },



  bindTouchStart: function (e) { //触碰开始
    var _this = this
    _this.startTime = e.timeStamp;
    _this.setData({
      startTime: e.timeStamp
    })
  },
  bindTouchEnd: function (e) { //触碰结束
    var _this = this
    _this.setData({
      endTime: e.timeStamp
    })
  },

  init: function () {
    var _this = this;
    var zh_name = app.globalData.finduser;
    var gs_name = app.globalData.gongsi;

    if(app.globalData.shujuku==0){

      wx.cloud.callFunction({
        name: 'sqlConnection',
        data: {
          sql: "select * from yh_jinxiaocun_zhengli where gs_name = '" + gs_name + "'"
        },
        success: res => {
          _this.setData({
            szzhi: res.result,
          })
        }
      })

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_zhengli_mssql where gs_name = '" + gs_name + "'"
        },
        success: res => {
          _this.setData({
            szzhi:res.result.recordset,
          })
        }
      })
      
    }

    
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
            sql: "select * from yh_jinxiaocun_zhengli where gs_name = '" + gongsi + "'"
          },
          success(res) {
            that.setData({
              szzhi: res.result
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
            query: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_zhengli_mssql where gs_name = '" + gongsi + "'"
          },
          success(res) {
            that.setData({
              szzhi: res.result.recordset
            })
            console.log(that.data.szzhi)
          },
          fail(res) {
            console.log("失败", res)
  
          }
        });
        
      }

      
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
            sql: "select * from yh_jinxiaocun_zhengli where gs_name = '" + gongsi + "' and name like '%" + e.detail.value + "%'"
          },
          success(res) {
            that.setData({
              szzhi: res.result
            })
          },
          fail(res) {
            console.log("失败", res)
          }
        });

      }else if(app.globalData.shujuku == 1){

        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_zhengli_mssql where gs_name = '" + gongsi + "' and name like '%" + e.detail.value + "%'"
          },
          success(res) {
            that.setData({
              szzhi: res.result.recordset
            })
          },
          fail(res) {
            console.log("失败", res)
          }
        });
        
      }
    
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init();
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
    this.init();
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
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
      url: '/pages/shangpinxuanze/shangpinxuanze?fun=qichu',
    })
  },
  querenRk: function () {
return;

    // var app = getApp()
    // var that = this;
    // const db = wx.cloud.database();
    // pd = 0
    // console.log(szzhi.length)
    // if (that.data.date == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请选择入库时间',
    //   })
    // } else {
    //   var finduser = app.globalData.finduser
    //   var gongsi = app.globalData.gongsi
    //   for (var i = 0; i < szzhi.length; i++) {
    //     wx.cloud.callFunction({
    //       name: "sqlConnection",
    //       data: {
    //         sql: "INSERT yh_jinxiaocun_qichushu (cpid,cplb,cpname,cpsj,cpsl,zh_name,gs_name,shijian)values('" + szzhi[i].sp_dm + "','" + szzhi[i].lei_bie + "','" + szzhi[i].name + "','" + jgxinxi[i] + "','" + slxinxi[i] + "','" + finduser + "','" + gongsi + "','" + that.data.date + "')"
    //       },
    //       success(res) {
    //         console.log("成功", res)
    //         wx.showToast({
    //           title: '初期数录入成功',
    //         }, that.onShow())
    //       },
    //       fail(res) {
    //         console.log("失败", res)

    //       }
    //     });
    //   }
    // }
  },
  bindDateChange: function (e) {
    var that = this
    that.setData({
      date: e.detail.value,
      sjkj: e.detail.value
    })
  },

})