// pages/shangpinxuanze/shangpinxuanze.js
var jg
var sl
var dtid
var cpid
var cpjg = []
var cpsl = []
var szZhi = []
var zongjia
var all = []
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jghide: "none",
    sl: [],
    jg: [],
    backhidden: true,
    rkck: "选择商品",
    fun : "",
    dms : [],
    dm : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo,
      rkSum: 0,
      sl: [],
      jg: [],
    })
    all = []
    var sql = "select *,'0' as [isSelect] from DetailsofProducts where Customer_id = '" + userInfo.id + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          all:list
        })
        console.log(_this.data.all)
      },
      err: res => {
        wx.showToast({
          title: '读取产品信息错误！',
          icon: 'none'
        })
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },

  select : function(e){
    var _this = this;
    var all = _this.data.all;
    console.log(e.detail.value)
    for(let i = 0;i<all.length;i++){
      if(all[i].NameofProduct.indexOf(e.detail.value)==-1){
        _this.setData({
          ["all["+i+"].isSelect"] : 1
        })
      }else{
        _this.setData({
          ["all["+i+"].isSelect"] : 0
        })
      }
      console.log(_this.data.all)

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
    cpsl = []
    cpjg = []
    var that = this
    that.setData({
      rkSum: 0,
      sl: [],
      jg: []
    })
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    var name = app.globalData.value1
    const db = wx.cloud.database();
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
  srJg: function(e) {
    var that = this
    dtid = e.currentTarget.dataset.id
    console.log(dtid)
    that.setData({
      dtid,
      jghide: "flex",
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

  tjjg: function(e) {
    var that = this
    var _this = this
    var all = _this.data.all
    var dtid = _this.data.dtid
    that.setData({
      jghide: true,
      jghide: "none",
      backhidden: true
    })
    zongjia = 0
    if (sl != null) { 
      all[dtid].num = sl
    }
    for (var i = 0; i < all.length; i++) {
      if (all[i].num != null && all[i].num != undefined && all[i].num != '' && all[i].Theunitprice != '') {
        zongjia = zongjia + all[i].num * all[i].Theunitprice
      }
    }
    that.setData({
      jghide: "none",
      cpid: dtid,
      sl: cpsl,
      jg: cpjg,
      rkSum: zongjia,
      all
    })
  },
  querenRk: function() {
    var _this = this;
    var all = _this.data.all
    var panduan = false
    for(var i=0; i<all.length; i++){
      if(all[i].num != null && all[i].num != undefined && all[i].num != ''){
        panduan = true
      }
    }
    if(panduan){
      console.log(all)
      wx.setStorageSync('all', all);
      wx.navigateBack();
    }else{
      wx.showToast({
        title: '未选择任何商品信息',
        icon:'none',
      })
    }
    
    //返回上一页
    
    
    
  }
})