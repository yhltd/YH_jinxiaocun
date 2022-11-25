// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    list: [],
    title: [
        
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    this.init();
  },
  init: function(){
    var that = this
    that.setData({
      rkSum: 0,
      sl: [],
      jg: []
    })
    var all = []
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi

    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select qr_code from userInfo where gs_name = '" + gongsi + "'"
      },
      success: res=> {
        for(var i=0;i<res.result.length;i++){
          res.result[i].mark1 = "data:image/jpeg;base64," + res.result[i].mark1.replace(/[\r\n]/g, '')
        }
        that.setData({
          all: res.result,
        })
      },
      fail: res=> {
        console.log("失败", res)
      }
    });
  },


  chooseImage: function(e) {
    var that = this
    wx.chooseImage({
      success: res => {
      wx.getFileSystemManager().readFile({
        filePath: res.tempFilePaths[0], //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: res => { //成功的回调
        console.log('data:image/png;base64,' + res.data)
        that.setData({
          bigImg: res.data, //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
        }, wx.showToast({
          title: '图片选择成功',
          'icon': 'none',
          duration: 3000
        }))
        }
      })
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
