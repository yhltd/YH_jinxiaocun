// package_huaqun/page/shows/shows.js
Page({

  /**
  * 页面的初始数据
  */
 data: {
   userInfo:'',
   active:1,
   showList: [
   {
     text: "灯带下单表",
     url: "../ddxiadan/ddxiadan"
   },
   {
    text: "铝框下单表",
    url: "../lvkuang_xiadan/lvkuang_xiadan"
  },
  {
    text: "灯带下单明细",
    url: "../ddchakan/ddchakan"
  },
  {
    text: "铝框下单明细",
    url: "../lvkuang_mingxi/lvkuang_mingxi"
  },
  {
    text: "玻璃下单明细",
    url: "../boli_mingxi/boli_mingxi"
  },
 ]
 },
 

 go: function (e) {
   var _this = this;
   var index = e.currentTarget.dataset.index;
   var url = _this.data.showList[index].url
   var text = _this.data.showList[index].text

   if((index == 0 || index == 1) && _this.data.userInfo.power == '玻璃厂' ){
    wx.showToast({
      title: '玻璃厂账号无权限下单！',
      icon: 'none'
    })
    return;
   }

   if((index == 2 || index == 3) && _this.data.userInfo.power == '玻璃厂' ){
    wx.showToast({
      title: '玻璃厂账号无权限查看订单明细！',
      icon: 'none'
    })
    return;
   }

   if(index == 4 && _this.data.userInfo.power != '玻璃厂' && _this.data.userInfo.power != '管理员'){
    wx.showToast({
      title: '非玻璃厂账号无权限查看玻璃下单明细！',
      icon: 'none'
    })
    return;
   }

   if(url != ''){
     wx.navigateTo({
       url: url + "?userInfo=" + JSON.stringify(_this.data.userInfo)
     })
   }
 },

 onChange: function (event) {
   var _this = this;
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