// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: [],
    id: "",
    // szzhi:[],
    // szZhi:[],
    list: [{
        txet: "商品代码",
        index: 0
      },
      {
        txet: "商品名称",
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
    var _id = options._id
    console.log(_id)
    this.setData({
      id: _id
    })
    // var that = this
    // const db = wx.cloud.database()
    // var app = getApp();
    // var _id = options._id
    // var finduser = app.globalData.finduser
    // var gongsi = app.globalData.gongsi 
    // var _openid = wx.getStorageSync('openid').openid;
    // wx.cloud.callFunction({
    //   name: "sqlConnection",
    //   data: {
    //     sql: "select * from yh_jinxiaocun_jichuziliao where zh_name = '" + finduser + "' and gs_name = '" + gongsi + "' and id ='" + _id+"'" //这里不知道标识的是什么，暂且认定是id标识而不是sp_dm
    //   },
    //   success(res) {
    //     console.log("成功", res)
    //     that.setData({
    //       szzhi : res.result
    //     })

    //   }, fail(res) {
    //     console.log("失败", res)

    //   }
    // });
    // db.collection("Yh_JinXiaoCun_mingxi").where({
    //   finduser: finduser,
    //   gongsi: gongsi,
    //   cpid: _id
    // }).get({
    //   success: res => {
    //     that.setData({
    //       szzhi: res.data
    //     })
    //   }
    // })
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
    var that = this
    var gongsi = app.globalData.gongsi
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select * from yh_jinxiaocun_jichuziliao where gs_name = '" + gongsi + "' and id ='" + this.data.id + "'" //这里不知道标识的是什么，暂且认定是id标识而不是sp_dm
      },
      success(res) {
        console.log("成功", res)
        that.setData({
          all: res.result
        })
        console.log(that.data.all[0].sp_dm)
      },
      fail(res) {
        console.log("失败", res)
      }
    });
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








  chooseImage: function(e) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]

        wx.cloud.uploadFile({
          cloudPath: "tupian/" + cloudPath, //云存储图片名字

          filePath, //临时路径

          success: res => {
            console.log('[上传图片] 成功：', res)
            that.setData({
              bigImg: res.fileID, //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            }, wx.showToast({
              title: '图片选择成功',
              'icon': 'none',
              duration: 3000
            }));
            let fileID = res.fileID;
            //把图片存到users集合表

            console.log(name1)

          },
          fail: e => {
            console.error('[上传图片] 失败：', e)
          },
          complete: () => {
            wx.hideLoading()
          }
        });
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
    var id = that.data.id;
    if (that.data.value0 == undefined) {
      var value0 = that.data.all[0].sp_dm
    } else {
      var value0 = that.data.value0
    }
    if (that.data.value1 == undefined) {
      var value1 = that.data.all[0].name
    } else {
      var value1 = that.data.value1
    }
    if (that.data.value2 == undefined) {
      var value2 = that.data.all[0].dan_wei
    } else {
      var value2 = that.data.value2
    }
    if (that.data.value3 == undefined) {
      var value3 = that.data.all[0].dan_wei
    } else {
      var value3 = that.data.value3
    }
    if (that.data.value4 == undefined) {
      var value4 = that.data.all[0].lei_bie
    } else {
      var value4 = that.data.value4
    }
    var value5 = that.data.value5
    if (that.data.bigImg == undefined) {
      var bigImg = that.data.all[0].mark1
    } else {
      var bigImg = that.data.bigImg
    }
    
    var gongsi = app.globalData.gongsi
    console.log(gongsi)
    console.log(value0)
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "update yh_jinxiaocun_jichuziliao set sp_dm ='" + value0 + "',`name` = '" + value1 + "',lei_bie ='" + value4 + "',dan_wei = '" + value2 + "',gs_name='" + gongsi + "',mark1='" + bigImg + "' where id =" + id
      },
      success(res) {
        console.log("成功", res)
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '修改成功',
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