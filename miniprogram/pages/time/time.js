// pages/time/time.js

var common = require('../utils/util.js');

var szzhi = []
var szsl=[]
var szje = []
var pd =0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rkSum: 0,
    rkck:"确认入库"
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var app = getApp();
    var that = this;
   
  
   
    var rk =that.data.rkSum
    if (app.rkall != null) {
      rk = rk + app.cpsum
      szzhi = app.rkall
      var sl =app.szsl
      var je = app.szje
      for (var i = 0; i < app.szsl.length;i++){
        if (szsl[i]==null){
          szsl[i] = 0
          szje[i] = 0
        } 
        szsl[i] = Number(szsl[i]) + Number(sl[i]) 
        szje[i] = Number(szje[i]) + Number(je[i]) 
      
      }
     
      that.setData({
        szzhi: app.rkall,
        szsl: szsl,
        szje: szje,
        rkSum: rk

      })

    }
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

  xuanshangpin:function(){

wx.navigateTo({
  url: '/pages/shangpinxuanze/shangpinxuanze',
})
  }, 
  querenRk:function(){
    var app = getApp()
    var today = common.getToday();
    const db = wx.cloud.database();
    pd = 0
    console.log(szzhi.length)
    for (var i =0 ;i<szzhi.length;i++){
     
              db.collection('Yh_JinXiaoCun_mingxi').add({
                data:{
                  shijian:today,
                  cpid: szzhi[i]._id,
                  cpname: szzhi[i].value0,
                  cpsj: szzhi[i].value1,
                  cpjj: szzhi[i].value2,
                  cplb: szzhi[i].value3,
                  cpsl: szsl[i],
                  cpjg: szje[i],
                  mxtype:"入库",
                  
                },
                success: res => {
                 wx.showToast({
                           title: '入库成功',
                              })
                }
              })   
         }
    // var _openid = wx.getStorageSync('openid').openid;
    // for (var kci = 0; kci < szzhi.length; kci++){
      
      
    //        db.collection('Yh_JinXiaoCun_kucun').where({
    //          cpid: szzhi[kci]._id,
    //          _openid: _openid
    //        }).get({
    //          success: res => {
    //            if (res.data.length == 0) {
    //              pd = pd+1
    //            }
    //          }
    //        })
    //      }
    //       if (pd == 0) {
    //         for(var kci = 0;kci <szzhi.length;kci++){
    //           db.collection('Yh_JinXiaoCun_kucun').add({
    //             data: {
    //               cpid: szzhi[kci]._id,
    //               cpsj: szzhi[kci].value1,
    //               cpjj: szzhi[kci].value2,
    //               cplb: szzhi[kci].value3,
    //               cpsl: szsl[kci],
    //               cpjg: szje[kci],
                 
    //             }
    //           })
    //         }
    //       } else {
    //         for(var kci =0;kci<szzhi.length;kci++){
    //           var slsum = res.data[kci].cpsl.cpsl + szsl[kci]
    //           var jesum = res.data[kci].cpsl.cpjg + szje[kci]
    //           console.log(res.data[kci]._id)
    //           db.collection('Yh_JinXiaoCun_kucun').doc(res.data[kci]._id).update({
    //             data: {
    //               cpsl: slsum,
    //               cpjg: jesum
    //             }


    //           })
    //         }
           
    //       }
   
  }

})
