// package_huaqun/page/shows/shows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    active: 2,
    showList: [{
        text: "品牌加盟",
        url: "../pinpaijiameng/pinpaijiameng"
      },
      {
        text: "平台共享",
        url: "../pingtaigongxiang/pingtaigongxiang"
      },
      {
        text: "投诉建议",
        url: "../tousujianyi/tousujianyi"
      }
    ]
  },


  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var text = _this.data.showList[index].text
    console.log(_this.data.userInfo.power)
    var userInfo = _this.data.userInfo
    if(index <= 1){
      wx.showToast({
        title: '敬请期待',
        icon: 'none'
      })
      return;
    }
    if (url != '') {
      wx.navigateTo({
        url: url + "?userInfo=" + JSON.stringify(_this.data.userInfo)
      })
    }
  },



  onChange: function (event) {
    var _this = this;
    console.log(_this.data.userInfo.power)
    if (event.detail == 0) {
      if(_this.data.userInfo.quanxian == '游客'){
        wx.showToast({
          title: '请联系管理员!',
          icon: 'none'
        })
        return;
      }
      wx.redirectTo({
        url: '../wode/wode?userInfo=' + JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../chanpin/chanpin?userInfo=' + JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: '../lianxi/lianxi?userInfo=' + JSON.stringify(_this.data.userInfo)
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
      userInfo: userInfo
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