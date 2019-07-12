// pages/remittance/remittance.js
var szzhi =[]
var szsl=[]
var szje=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    szzhi:[],
    szjg:[],
    szsl:[],
    rkSum:0,
    rkck:"确认出库"
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
    var rk = that.data.rkSum
    if (app.rkall != null) {
      rk = rk + app.cpsum
      szzhi = app.rkall
      var sl = app.szsl
      var je = app.szje
      for (var i = 0; i < app.szsl.length; i++) {
        if (szsl[i] == null) {
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

  }, XzspClick:function(){
    wx.navigateTo({
      url: '/pages/shangpinxuanze/shangpinxuanze',
    })
  }, querenRk:function(){
    var app = getApp()
    const db = wx.cloud.database();
    console.log(szzhi.length)
    for (var i = 0; i < szzhi.length; i++) {
      db.collection('Yh_JinXiaoCun_mingxi').add({
        data: {
          cpid: szzhi[i]._id,
          cpname:szzhi[i].value0,
          cpsj: szzhi[i].value1,
          cpjj: szzhi[i].value2,
          cplb: szzhi[i].value3,
          cpsl: szsl[i],
          cpjg: szje[i],
          mxtype: "出库",
          nameid: app.globalData.finduser
        }
        
      })
    }
  }
  ,xuanzekehu:function(e){
    var that = this

    var id = e.currentTarget.dataset.id
    console.log(id)
    if (that.data.jinhuo == 1) {
wx.navigateTo({

  url: '../contract/contract?id'+id,

})

  }}
})