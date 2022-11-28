// package_huaqun/page/shows/shows.js
Page({

  /**
  * 页面的初始数据
  */
 data: {
   userInfo:'',
   active:0,
   showList: [{
     text: "账号管理",
     url: "../zhanghaoguanli/zhanghaoguanli"
   },
   {
     text: "二维码",
     url: "../erweima/erweima"
   },
   {
     text: "明细(配置表)",
     url: "../mingxipeizhibiao/mingxipeizhibiao"
   },
   {
     text: "产品明细",
     url: "../chanpinmingxi/chanpinmingxi"
   },
   {
    text: "下单表",
    url: "../kehuxiadan/kehuxiadan"
  },
  {
    text: "下单明细表",
    url: "../kehuxiadanmingxi/kehuxiadanmingxi"
  },
 ]
 },
 

 go: function (e) {
   var _this = this;
   var index = e.currentTarget.dataset.index;
   var url = _this.data.showList[index].url
   var text = _this.data.showList[index].text
   console.log(_this.data.userInfo.power)
   
  //  if (_this.data.userInfo.power=="业务员"){
  //   if(url != ''){
  //     wx.navigateTo({
  //       url: "../erweima/erweima?userInfo=" + JSON.stringify(_this.data.userInfo)
  //     })
  //   }
  // }else if (_this.data.userInfo.power=="业务员" || _this.data.userInfo.power=="管理员" || _this.data.userInfo.power=="司机" || _this.data.userInfo.power=="客户"){
  //   if(url != ''){
  //     wx.navigateTo({
  //       url: "../zhanghaoguanli/zhanghaoguanli?userInfo=" + JSON.stringify(_this.data.userInfo)
  //     })
  //   }
  // }else if (_this.data.userInfo.power=="业务员" || _this.data.userInfo.power=="管理员" || _this.data.userInfo.power=="司机" || _this.data.userInfo.power=="客户"){
  //   if(url != ''){
  //     wx.navigateTo({
  //       url: "../mingxipeizhibiao/mingxipeizhibiao?userInfo=" + JSON.stringify(_this.data.userInfo)
  //     })
  //   }
  // }else if (_this.data.userInfo.power=="业务员" || _this.data.userInfo.power=="管理员" || _this.data.userInfo.power=="司机" || _this.data.userInfo.power=="客户"){
  //   if(url != ''){
  //     wx.navigateTo({
  //       url: "../chanpinmingxi/chanpinmingxi?userInfo=" + JSON.stringify(_this.data.userInfo)
  //     })
  //   }
  // }else{
  //   wx.showToast({
  //     title: '无权限！',
  //     icon: 'none'
  //   })
  // }

  if(url != ''){
    wx.navigateTo({
      url: url + "?userInfo=" + JSON.stringify(_this.data.userInfo)
    })
  }
   
 },

 onChange: function (event) {
   var _this = this;
   console.log(_this.data.userInfo.power)
   if (event.detail == 0) {
     wx.redirectTo({
       url: '../shows/shows?userInfo='+JSON.stringify(_this.data.userInfo)
     })
   } else if (event.detail == 1) {
     wx.redirectTo({
       url: '../shows2/shows2?userInfo='+JSON.stringify(_this.data.userInfo)
     })
   }
 },

 /**
  * 生命周期函数--监听页面加载
  */
 onLoad(options) {
   var _this = this
   var userInfo = JSON.parse(options.userInfo)
   _this.setData({
     userInfo:userInfo
   })
 },

 /**
  * 生命周期函数--监听页面初次渲染完成
  */
 onReady() {

 },

 /**
  * 生命周期函数--监听页面显示
  */
 onShow() {

 },

 /**
  * 生命周期函数--监听页面隐藏
  */
 onHide() {

 },

 /**
  * 生命周期函数--监听页面卸载
  */
 onUnload() {

 },

 /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
 onPullDownRefresh() {

 },

 /**
  * 页面上拉触底事件的处理函数
  */
 onReachBottom() {

 },

 /**
  * 用户点击右上角分享
  */
 onShareAppMessage() {

 }
})