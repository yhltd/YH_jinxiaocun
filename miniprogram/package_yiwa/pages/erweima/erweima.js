// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    list: [],
    yewu_list:[],
    xlShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
     userInfo:userInfo
   })
   if(userInfo == '业务员'){
    var e = [userInfo.id]
    _this.setData({
      name:userInfo.name,
      id:userInfo.id
    })
   _this.tableShow(e)
   }

   var sql = "select name,id from userInfo where power ='业务员'"
   wx.cloud.callFunction({
    name: 'sqlserver_yiwa',
    data: {
      query: sql
    },
    success: res => {
      console.log(res)
      var yewu_list=res.result.recordset
      console.log(yewu_list)
      _this.setData({
        yewu_list: yewu_list
      })
      console.log(yewu_list)
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

  tableShow:function(e){
    var _this = this
    var sql = "select qr_code from userInfo where id =" + e[0]
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var qr_code = res.result.recordset[0].qr_code
        console.log(qr_code)
        _this.setData({
          qr_code_head: "data:image/png;base64," + qr_code,
          qr_code_body: qr_code
        })
        console.log(qr_code)
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
            var sql = "update userInfo set qr_code ='" + res.data + "' where id=" + _this.data.id
            wx.cloud.callFunction({
              name: 'sqlserver_yiwa',
              data: {
                query: sql
              },
              success: res => {
                var e = [_this.data.id]
                _this.tableShow(e)
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
              qr_code_head: "data:image/jpeg;base64," + res.data,
              qr_code_body: res.data
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

  sel_xiala: function () {
    var _this = this
    if(_this.data.userInfo.power != '管理员'){

      return;
    }
    _this.setData({
      xlShow: true
    })
  },

  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow: false,
        id:e.detail.id,
        name:e.detail.name
      })
      var e = [e.detail.id]
      _this.tableShow(e)
    } else if (e.type == "close") {
      _this.setData({
        xlShow: false,
      })
    }
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
