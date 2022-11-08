// pages/peizhi/peizhi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    active:2,
    showList: [{
      text: "收付款明细",
      url: "../payment/payment"
    },
    {
      text: "发票",
      url: "../invoice/invoice"
    },
    {
      text: "客户往来款看板",
      url: "../customer_kanban/customer_kanban"
    },
    {
      text: "销售额统计",
      url: "../tongji/tongji"
    },
    {
      text: "按月统计",
      url: "../anyuetongji/anyuetongji"
    },
    {
      text: "审核管理",
      url: "../shenhe/shenhe"
    },
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var userPower = JSON.parse(options.userPower)
    _this.setData({
      userInfo,
      userPower
    })
  },

  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var view_name = _this.data.showList[index].text
    var quanxian = ''
    if(_this.data.userInfo.power != '管理员'){
      for(var i=0; i<_this.data.userPower.length; i++){
        if(view_name == _this.data.userPower[i].view_name){
          quanxian={
            zeng:_this.data.userPower[i].zeng,
            shan:_this.data.userPower[i].shan,
            gai:_this.data.userPower[i].gai,
            cha:_this.data.userPower[i].cha
          }
        }
      }
    }
    if(quanxian == '' && _this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(quanxian.cha != '可操作' && _this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(url != ''){
      wx.navigateTo({
        url: url + "?userInfo="+JSON.stringify(_this.data.userInfo) + "&userPower=" + JSON.stringify(quanxian)
      })
    }
  },

  onChange: function (event) {
    var _this = this;
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../peizhi/peizhi?userInfo='+JSON.stringify(_this.data.userInfo) + "&userPower=" +JSON.stringify(_this.data.userPower)
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../jinxiaocun/jinxiaocun?userInfo='+JSON.stringify(_this.data.userInfo) + "&userPower=" +JSON.stringify(_this.data.userPower)
      })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: '../caiwu/caiwu?userInfo='+JSON.stringify(_this.data.userInfo) + "&userPower=" +JSON.stringify(_this.data.userPower)
      })
    } else if (event.detail == 3) {
      wx.redirectTo({
        url: '../yonghu/yonghu?userInfo='+JSON.stringify(_this.data.userInfo) + "&userPower=" +JSON.stringify(_this.data.userPower)
      })
    }
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