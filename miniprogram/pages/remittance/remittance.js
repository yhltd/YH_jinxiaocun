// pages/remittance/remittance.js
var szzhi =[]
var szsl=[]
var szje=[]
var khname
var cpxinxi= []
var slxinxi =[]
var jgxinxi= []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    szzhi:[],
    szjg:[],
    szsl:[],
    rkSum:0,
    rkck:"确认出库",
    jinhuo:1,
    hidden1:true,
    hidden2:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('khname', null)
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
    var that = this;
    for (var i = 0; i < that.data.szzhi.length ; i++ ){
      if (that.data.szzhi[i] != null) {
        cpxinxi[i] = that.data.szzhi[i]
          slxinxi[i] = that.data.szsl[i]
        jgxinxi[i] = that.data.szje[i]
      }
      
    }
     
    if (wx.getStorageSync("khpd") != "1"){
      var rk = that.data.rkSum

      if (wx.getStorageSync("rkall") != null) {
        rk = rk + Number(wx.getStorageSync("cpsum"))
        szzhi = wx.getStorageSync("rkall")
        var sl = wx.getStorageSync("szsl")
        var je =wx.getStorageSync("szje")
     
        var fuzhii = 0
        var szzhilength = that.data.szzhi.length;
        console.log(sl)
        for (var i = szzhilength; i < szzhilength + wx.getStorageSync("rkall").length;i++){
            if(cpxinxi[i] == null) {
              cpxinxi[i] = szzhi[fuzhii]
              slxinxi[i] = sl[fuzhii]
              jgxinxi[i] = je[fuzhii]
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
    }else{
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
    var that = this
    const db = wx.cloud.database();
    console.log(szzhi.length)
    for (var i = 0; i < szzhi.length; i++) {
      db.collection('Yh_JinXiaoCun_mingxi').add({
        data: {
          jinhuofang: that.data.khname,
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
    // var id = e.currentTarget.dataset.id
    // console.log(id)
    console.log(that.data.jinhuo)
    if (that.data.jinhuo == 1) {
      wx.navigateTo({
        url: '../contract/contract?jinhuo=' + that.data.jinhuo,
      })

  }}
})