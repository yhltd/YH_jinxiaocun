// pages/kaoqin/kaoqin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      ne:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ne = [];
    wx.cloud.callFunction({
      name: "sqlServer_117",
      data:
      {
        query:"select * from gongzi_kaoqinjilu where "
      }, 
      success(res) {
        console.log("成功", res.result)
        ne.push(res.result.recordset)
        console.log("数组", ne)
      },
      fail(res) {
        console.log("失败", res)

      }
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