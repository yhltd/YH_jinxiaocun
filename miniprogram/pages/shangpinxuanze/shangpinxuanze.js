// pages/shangpinxuanze/shangpinxuanze.js
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
    jghide:"none",
    sl:[],
    jg:[],
     
    rkck:"选择商品"
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this
    that.setData({
      rkSum: 0,
      sl: [],
      jg: []
    })
    var all = []
    var _openid = wx.getStorageSync('openid').openid;
    // console.log(_openid)
    const db = wx.cloud.database();
    db.collection('Yh_JinXiaoCun_chanpin').where({
     _openid:_openid
    })
    .get({
      success: res => {

        console.log(res.data)
        that.setData({
           all:res.data,
          
                    })
        szZhi=res.data
      }
      })

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
    var that = this
    that.setData({
      rkSum: 0,
      sl: [],
      jg: []
    })
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
  jiahao1:function(){
    wx.navigateTo({
      url: '/pages/xinjianshangpin/xinjianshangpin',
    })
  
  },
  srJg:function(e){
    var that=this
   
     dtid = e.target.dataset.id
 
    console.log(dtid)
      that.setData({
        jghide: "flex",
        cpid : dtid,
        cpsljg : "",
        cpjgsl : ""
      })

  }, 
  spClose:function(e){
      var that = this
      that.setData({
        jghide: "none",

      })
     
  },
  cunsl:function(e){
      sl  =e.detail.value
  },
  cunjg:function(e){
    jg = e.detail.value
  }, 
  tjjg:function(e){
    var that = this
    zongjia = that.data.rkSum
     if (sl!=null && jg !=null){
      cpsl[dtid] = sl
      cpjg[dtid] = jg
      zongjia = zongjia + (jg * sl)
     }
    
   
    for (var  i =0 ;i< cpsl.length;i++){
      if (cpjg[i] == null){
          cpjg[i]=""
          cpsl[i]=""
      }
    }
    that.setData({
      jghide: "none",
      cpid:dtid,
      sl : cpsl,
      jg:cpjg,
      rkSum: zongjia
    })
  }, 
  querenRk:function(){
      var sli = 0
      var sl =[]
      var jg = []
      var zhi = []
      console.log(cpsl)
      console.log(cpjg)
      console.log(szZhi)
      for (var i = 0; i < cpsl.length; i++) {
        if (cpsl[i] != null && cpsl[i]!= "") {
          sl[sli] = cpsl[i]
          jg[sli] = cpjg[i]
          zhi[sli]= szZhi[i]
          sli = sli+1
        }
      }
      console.log(zhi)
      console.log(sl)
      console.log(jg)
    if (zhi == null ) {
        wx.showToast({
          title: '数量或价格不能为空',
          icon: "none",
          duration: 2000
        })
      }else{
        // var appjson = getApp()
        // appjson.rkall=zhi
        // appjson.szsl = sl
        // appjson.szje = jg
        // appjson.cpsum = zongjia
      wx.setStorageSync('rkall', zhi);
      wx.setStorageSync('szsl', sl);
      wx.setStorageSync('szje', jg);
      wx.setStorageSync('cpsum', zongjia);
      //返回上一页
      wx.navigateBack();
        cpjg = []
        cpsl = []
        
      }
  }
       
  
})