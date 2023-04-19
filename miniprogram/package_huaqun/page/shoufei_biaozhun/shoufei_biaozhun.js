// package_huaqun/page/shoufei_biaozhun/shoufei_biaozhun.js
Page({
  shoufei_text,
  shoufei_dis:false,
  /**
   * 页面的初始数据
   */
  data: {
    shoufei_text,
    shoufei_dis
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var shoufei_dis = _this.data.shoufei_dis
    if(userInfo.power != '管理员'){
      shoufei_dis:ture
    }
    _this.setData({
      userInfo: userInfo,
      shoufei_dis,
    })
    
    _this.tableShow()
  },

  tableShow: function () {
    var _this = this
    var sql = ""
    sql = "SELECT sfbz FROM shoufei_biaozhun"

    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        for (var i = 0; i < list.length; i++) {
          shoufei_text = list[i]
        }
        _this.setData({
          shoufei_text: shoufei_text
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
      }
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