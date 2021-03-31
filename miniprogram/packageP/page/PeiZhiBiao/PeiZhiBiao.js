// miniprogram/packageP/page/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    showList: [{ text: "模块", url: "../PZ_MoKuaiDanWei/PZ_MoKuaiDanWei" },
      { text: "工作时间", url: "../PZ_GongZuoShiJian/PZ_GongZuoShiJian" },
      { text: "bom", url: "../PZ_Bom/PZ_Bom" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onChange: function (event){
    var _this=this;
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../PeiZhiBiao/PeiZhiBiao'
      })
    } else if (event.detail==1){
      wx.redirectTo({
        url: '../DingDan/DingDan'
      })
    } else if (event.detail == 2){
      wx.redirectTo({
        url: '../PaiChan/PaiChan'
      })
    } else if (event.detail == 3) {
      wx.redirectTo({
        url: '../HuiZong/HuiZong'
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
    
    wx.stopPullDownRefresh();
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