// 100lie_page/pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    name:'',
    user:''
  },
  onLoad: function (options) {
    this.setData({
      gongsi:options.gongsi,
      name : options.name,
      user : options.user
    })
    console.log(options)
  },
  //使用人员
 userren:function(){
  wx.navigateTo({
    url: '../guserpeople/guserpeople?gongsi='+this.data.gongsi + '&name='+ this.data.name
  })
},
 //工作台
 work:function(){
  wx.navigateTo({
    url: '../gwork/gwork?gongsi='+this.data.gongsi + '&name='+ this.data.name
  })
},
  // 公司规定
  gongsi:function(){
    wx.showToast({
      title: '你没有使用权限',
      icon:'none'
    })
  },
  //人员规定
  ren:function(){
    wx.showToast({
      title: '你没有使用权限',
      icon:'none'
    })
  },
 //人员管理
 renmasg:function(){
  wx.showToast({
    title: '你没有使用权限',
    icon:'none'
  })
 },
 //登录人员
loginren:function(){
  wx.showToast({
    title: '你没有使用权限',
    icon:'none'
  })
},

})