// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    list: [],
    yewu_list:[],
    xlShow: false,
    mark1:'',
    id:'',
    // qr_code:'wxp://f2f0nIzIuG52daqiJhSKJ14P1q8gtBMmXc7QTP_p5yEs2S59qfVjBF47yZnutMsixDVw',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var id = options.id
    _this.setData({
     id:id
   })
   _this.tableShow()
  },

  tableShow:function(){
    var _this = this
    var sql = "select mark1 from DetailedConfiguration where id =" + _this.data.id
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var mark1 = "data:image/png;base64," + res.result.recordset[0].mark1
        console.log(mark1)
        _this.setData({
          mark1: mark1
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

  chooseImage: function(e) {
    var _this = this
    wx.chooseImage({
      success: res => {
      wx.getFileSystemManager().readFile({
        filePath: res.tempFilePaths[0], //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: res => { //成功的回调
        console.log('data:image/png;base64,' + res.data)
        _this.setData({
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

  upd_image:function(){
    var _this = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success(res) {
        console.log(res.tempFiles)
        var list = res.tempFiles
        if(list.length > 0){
          console.log(res.tempFiles[0].tempFilePath)
          console.log(res.tempFiles[0].size)
          wx.getFileSystemManager().readFile({
            filePath: res.tempFiles[0].tempFilePath, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)
            var sql = "update DetailedConfiguration set mark1 ='" + res.data + "' where id=" + _this.data.id
            wx.cloud.callFunction({
              name: 'sqlserver_yiwa',
              data: {
                query: sql
              },
              success: res => {
                _this.tableShow()
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
            _this.setData({
              mark1: "data:image/jpeg;base64," + res.data,
            }, wx.showToast({
              title: '图片选择成功',
              'icon': 'none',
              duration: 3000
            }))
            }
          })
        }
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
