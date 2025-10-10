// packageP/page/PaiChan/PaiChan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 2,
    showList: [{ text: "排产", url: "../PC_PC/PC_PC" }],
    showList2: [{ text: "排班", url: "../PaiBan/PaiBan" }],
    showList3: [{ text: "人员信息", url: "../PC_RenYuanXinXi/PC_RenYuanXinXi" }],
    showList4: [{ text: "排班明细", url: "../PC_PaiBanMingXi/PC_PaiBanMingXi" }],
    showList5: [{ text: "排产核对", url: "../PaiChanHeDui/PaiChanHeDui" }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo,
    })

  },
  onChange: function (event) {
    var _this = this;
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../PeiZhiBiao/PeiZhiBiao?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../DingDan/DingDan?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: '../PaiChan/PaiChan?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 3) {
      wx.redirectTo({
        url: '../HuiZong/HuiZong?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 4) {
      wx.redirectTo({
        url: '../paichan_grzx/paichan_grzx?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    }
  },
  go1: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var text = _this.data.showList[index].text
    wx.navigateTo({
      url: url
    })
  },
  go2: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList2[index].url
    var text = _this.data.showList2[index].text
    wx.navigateTo({
      url: url
    })
  },

  go3: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList3[index].url
    var text = _this.data.showList3[index].text
    wx.navigateTo({
      url: url
    })
  },

  go4: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList4[index].url
    var text = _this.data.showList4[index].text
    wx.navigateTo({
      url: url
    })
  },

  go5: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList5[index].url
    var text = _this.data.showList5[index].text
    wx.navigateTo({
      url: url
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
