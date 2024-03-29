// package_huaqun/page/shows/shows.js
Page({

  /**
  * 页面的初始数据
  */
 data: {
   userInfo:'',
   active:0,
   showList: [
    {
      text: "下单表",
      url: "../kehuxiadan/kehuxiadan"
    },
    {
      text: "下单明细表",
      url: "../kehuxiadanmingxi/kehuxiadanmingxi"
    }, 
    // {
    //  text: "业务员报货汇总单",
    //  url: "../yewuyuan_huizong/yewuyuan_huizong"
    // },
    // {
    //   text: "司机报货汇总单",
    //   url: "../siji_huizong/siji_huizong"
    // },
    // {
    //   text: "司机以往报货明细",
    //   url: "../siji_mingxi/siji_mingxi"
    // },
    // {
    //   text: "客户周期汇总单",
    //   url: "../kehu_huizong/kehu_huizong"
    // },
    // {
    //   text: "送货单生成",
    //   url: "../songhuodan/songhuodan"
    // },
 ]
 },
 

go: function (e) {
  var _this = this;
  var index = e.currentTarget.dataset.index;
  var url = _this.data.showList[index].url
  var text = _this.data.showList[index].text
  console.log(index)

  if((index == 0 || index == 1 || index == 2 || index == 5) && _this.data.userInfo.power == '司机'){
    wx.showToast({
      title: '司机无权限查看！',
      icon: 'none'
    })
    return;
  }
  if(index == 0  && _this.data.userInfo.power == '客户' && _this.data.userInfo.fahuoquanxian == '否'){
    wx.showToast({
      title: '客户有未付款订单，请先结款！',
      icon: 'none'
    })
    return;
  }

  if((index == 2 || index == 3 || index == 4 || index == 5 || index == 6) && _this.data.userInfo.power == '客户'){
    wx.showToast({
      title: '客户无权限查看！',
      icon: 'none'
    })
    return;
  }

  if((index == 3 || index == 4 || index == 6 ) && _this.data.userInfo.power == '业务员'){
    wx.showToast({
      title: '业务员无权限查看！',
      icon: 'none'
    })
    return;
  }

  if(url != ''){
    if(index == 0 && _this.data.userInfo.power == '客户' ){
      wx.navigateTo({
        url: "../time/time?userInfo=" + JSON.stringify(_this.data.userInfo)
      })
    }else{
      wx.navigateTo({
        url: url + "?userInfo=" + JSON.stringify(_this.data.userInfo)
      })
    }
    
  }
},


//  onChange: function (event) {
//    var _this = this;
//    console.log(_this.data.userInfo.power)
//    if (event.detail == 0) {
//      wx.redirectTo({
//        url: '../shows/shows?userInfo='+JSON.stringify(_this.data.userInfo)
//      })
//    } else if (event.detail == 1) {
//      wx.redirectTo({
//        url: '../shows2/shows2?userInfo='+JSON.stringify(_this.data.userInfo)
//      })
//    }
//  },

 /**
  * 生命周期函数--监听页面加载
  */
 onLoad(options) {
   var _this = this
   var userInfo = JSON.parse(options.userInfo)
   _this.setData({
     userInfo:userInfo
   })
   console.log("基础配置")
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