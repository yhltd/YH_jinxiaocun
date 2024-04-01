Page({

  /**
   * 页面的初始数据
   */
  cxShow: false,
  xgShow: false,
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo: userInfo,    
    })
    _this.tableShow()
  },
  tableShow: function (e) {
    var _this = this
    var sql = ""
    sql = "select ptgx from fuwudianhua"
    var userInfo = _this.data.userInfo
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        console.log(list)
        _this.setData({
          list: list,
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
    })
  },




  qxShow: function () {
    var _this = this
    _this.setData({
      cxShow: false,
      xgShow: false,
     
    })
  },

  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
    
    })
  },


  // click_03: function () {
  //   wx.showModal({
  //     title: '平台共享',
  //     content:'智居系产品标准：标准化生产流程，订单时时信息掌控，\n高定工艺量产，全产品链供货，让销售团队无后顾之忧 \r\n 智居系生产平台：生产平台产品库/信息化共享，\n智居系品牌加盟：单名称智居蔚来\n为工作室/整装/零售店提供更合理的合作模式。\n服务电话：15261236783',
  //     showCancel:false,
  //     confirmText:"知道了",
  //     confirmColor:'#84B9F2',
  //     success: function (res) {},
  //     fail: function (res) {},
  //     complete: function (res) {},
  //   })
  // },
  // success: res => {
  //   wx.showToast({
  //     title: '已付款回传',
  //     icon: 'none',
  //     duration: 3000
  //   })
  //   var e = ['','','']
  //   _this.tableShow(e)
  //   _this.qxShow()
  // },
  // err: res => {
  //   console.log("错误!")
  // },
  // fail: res => {
  //   wx.showToast({
  //     title: '请求失败！',
  //     icon: 'none',
  //     duration: 3000
  //   })
  //   console.log("请求失败！")
  // },

 



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
  //  */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})

