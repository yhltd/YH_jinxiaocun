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
     text: "排班生成",
     url: "../paiban_shengcheng/paiban_shengcheng"
   },
   {
    text: "排班明细-管理员",
    url: "../paiban_mingxi_guanli/paiban_mingxi_guanli"
  },
  {
    text: "排班明细-用户",
    url: "../paiban_mingxi_yonghu/paiban_mingxi_yonghu"
  },
  {
    text: "考勤明细",
    url: "../kaoqin_mingxi/kaoqin_mingxi"
  },
  // {
  //   text: "考勤表-管理员",
  //   url: "../kaoqin_guanli/kaoqin_guanli"
  // },
  {
    text: "计划明细",
    url: "../jihua_mingxi/jihua_mingxi"
  },
 ]
 },
 

 go: function (e) {
   var _this = this;
   var index = e.currentTarget.dataset.index;
   var url = _this.data.showList[index].url
   var text = _this.data.showList[index].text

   if((index == 0 || index == 1 || index == 4) && _this.data.userInfo.G != '管理员' ){
    wx.showToast({
      title: '非管理员账号无权限查看！',
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