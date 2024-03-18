// package_huaqun/page/shows/shows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    active: 1,
    showList: [{
        text: "工艺类",
        url: "../chanpin_item/chanpin_item"
      },
      {
        text: "模压类",
        url: "../chanpin_item/chanpin_item"
      }, {
        text: "平板类",
        url: "../chanpin_item/chanpin_item"
      }, {
        text: "套装类",
        url: "../chanpin_item/chanpin_item"
      },
    ]
  },


  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var text = _this.data.showList[index].text
    console.log(_this.data.userInfo.power)
    var userInfo = _this.data.userInfo
    if (url != '') {
      wx.navigateTo({
        url: url + "?userInfo=" + JSON.stringify(_this.data.userInfo) + "&type=" + text
      })
    }
  },

  saoma: function (e) {
    var _this = this;
    var userInfo=_this.data.userInfo
    if (_this.data.userInfo.quanxian == '客户'){
      wx.showToast({
        title: '没有权限!',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: "../saomabaogong/saomabaogong" + "?userInfo=" + JSON.stringify(_this.data.userInfo)+"type=saoma"
    })
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
    var this_type = options.type
    _this.setData({
      userInfo: userInfo,
      this_type: this_type,
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
    var _this = this
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