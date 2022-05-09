// pages/xinjianshangpin/xinjianshangpin.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigImg: "",
    list: [{
        txet: "商品代码",
        index: 0
      },
      {
        txet: "品名",
        index: 1
      },
      {
        txet: "单位",
        index: 2
      },
      // {
      //   txet: "进价",
      //   index: 3
      // },
      {
        txet: "类别",
        index: 4
      },
      // {
      //   txet: "备注",
      //   index: 5
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.query != null) {
      console.log(options.query)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 500
    })
    that.onLoad()
    that.onShow()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // chooseImage: function(e) {
  //   let that = this;
  //   wx.chooseImage({
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function(res) {
  //       wx.showLoading({
  //         title: '上传中',
  //       });
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       let filePath = res.tempFilePaths[0];
  //       const name = Math.random() * 1000000;
  //       const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]

  //       wx.cloud.uploadFile({
  //         cloudPath: "tupian/" + cloudPath, //云存储图片名字

  //         filePath, //临时路径

  //         success: res => {
  //           console.log('[上传图片] 成功：', res)
  //           that.setData({
  //             bigImg: res.fileID, //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
  //           });
  //           let fileID = res.fileID;
  //           //把图片存到users集合表

  //           console.log(name1)

  //         },
  //         fail: e => {
  //           console.error('[上传图片] 失败：', e)
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       });
  //     }

  //   })
  // },

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
  input: function(e) {

    var id = e.currentTarget.dataset.id
    var value = e.detail.value
    this.setData({
      [`value${id}`]: value
    })
    console.log(id)
    console.log(value)
    console.log([`value${id}`])
  },
  querenxinjian: function() {
    var that = this;

    var value0 = that.data.value0
    var value1 = that.data.value1
    var value2 = that.data.value2
    var value3 = that.data.value3
    var value4 = that.data.value4
    var value5 = that.data.value5
    var bigImg = that.data.bigImg
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    console.log(gongsi)
    console.log(finduser)
    console.log(value0)
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "insert yh_jinxiaocun_jichuziliao (sp_dm,`name`,lei_bie,dan_wei,zh_name,gs_name,mark1) values('" + value0 + "','" + value1 + "','" + value4 + "','" + value2 + "','" + finduser + "','" + gongsi + "','" + bigImg + "')"
      },
      success(res) {
        console.log("成功", res)
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '新建成功',
          'icon': 'none',
          duration: 3000
        })
      },
      fail(res) {
        console.log("失败", res)

      }
    });
    // db.collection('Yh_JinXiaoCun_chanpin').add({

    //   data: {
    //     finduser:finduser,
    //     gongsi:gongsi,
    //     bigImg: bigImg,
    //     value0: value0,
    //     value1: value1,
    //     value2: value2,
    //     value3: value3,
    //     value4: value4,
    //     value5: value5

    //   },
    //   success: res => {
    //     // 在返回结果中会包含新创建的记录的 _id
    //     wx.showToast({
    //       title: '新建成功',
    //       'icon': 'none',
    //       duration: 3000
    //     })

    //   }
    // })

    wx.navigateBack({
      // delta: 1 
    })
  }
})