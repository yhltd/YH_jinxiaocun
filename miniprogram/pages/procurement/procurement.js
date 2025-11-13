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
    rkck: "刷新",
    startTime: 0,
    endTime: 0,
    product_name:'',
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

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  upd: function (e) {
    var _this = this;
    if (_this.data.endTime - _this.data.startTime >= 350) {
      return;
    }
    var _id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shangpinchazhao/shangpinchazhao?_id=' + _id + '&fun=qichu',
    })
  },

  del: function (e) {
    var _id = e.currentTarget.dataset.id
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
                sql: "delete from yh_jinxiaocun_qichushu where _id = '" + _id + "'"
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
                query: "delete from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_qichushu_mssql where _id = '" + _id + "'"
              },
              success: res => {
                if (res.result.recordset.affectedRows > 0) {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success'
                  })
                  _this.init();
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

  querenRk:function(){
    var _this = this
    _this.setData({
      product_name:''
    })
    _this.init()
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
          sql: "select * from yh_jinxiaocun_qichushu where gs_name = '" + gs_name + "' and cpname like '%" + _this.data.product_name + "%'"
        },
        success: res => {
          var sum = 0;
          for (let i = 0; i < res.result.length; i++) {
            sum += res.result[i].cpsl * res.result[i].cpsj
          }
          console.log(res.result)
          _this.setData({
            szzhi: res.result,
            rkSum: sum
          })
        }
      })

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_qichushu_mssql where gs_name = '" + gs_name + "' and cpname like '%" + _this.data.product_name + "%'"
        },
        success: res => {
          var sum = 0;
          for (let i = 0; i < res.result.recordset.length; i++) {
            sum += res.result.recordset[i].cpsl * res.result.recordset[i].cpsj
          }
          console.log(res.result.recordset)
          _this.setData({
            szzhi: res.result.recordset,
            rkSum: sum
          })
        }
      })
      
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
  bindDateChange: function (e) {
    var that = this
    that.setData({
      date: e.detail.value,
      sjkj: e.detail.value
    })
  },

})