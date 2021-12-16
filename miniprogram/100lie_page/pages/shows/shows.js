// 100lie_page/pages/shows/shows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    name:'',
    user:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      gongsi:options.gongsi,
      name : options.name,
      user : options.user
    })
  },
  // 公司规定
  gongsi:function(){
    wx.navigateTo({
      url: '../companyfix/companyfix?gongsi='+this.data.gongsi 
    })
  },
  //人员规定
  ren:function(){
    wx.navigateTo({
      url: '../personfix/personfix?gongsi='+this.data.gongsi 
    })
  },
  //工作台
  work:function(){
    wx.navigateTo({
      url: '../work/work?gongsi='+this.data.gongsi + '&name='+ this.data.name + '&user='+ this.data.user
    })
  },
 //使用人员
 userren:function(){
   wx.navigateTo({
     url: '../userpeople/userpeople?gongsi='+this.data.gongsi+ '&name='+ this.data.name
   })
 },
 //人员管理
 renmasg:function(){
   wx.navigateTo({
     url: '../personmasg/personmasg?gongsi='+this.data.gongsi
   })
 },
 //登录人员
loginren:function(){
  wx.navigateTo({
    url: '../loginpeople/loginpeople?gongsi='+this.data.gongsi +'&name='+this.data.name +'&user='+this.data.user
  })
},





})