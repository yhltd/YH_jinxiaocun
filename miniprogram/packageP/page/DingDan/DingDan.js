// packageP/page/DingDan/DingDan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    showList: [{text: "订单",url: "../DD_DD/DD_DD"}],
    showList2:[{text: "部门",url: "../BuMen/BuMen"}]
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
  
  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var text = _this.data.showList[index].text
      wx.navigateTo({
        url: url 
        }) 
  },
  goto: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList2[index].url
    var text = _this.data.showList2[index].text
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