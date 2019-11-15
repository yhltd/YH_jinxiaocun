// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    var _id=options._id
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi 
    var _openid = wx.getStorageSync('openid').openid;
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select * from yh_jinxiaocun_jichuziliao where zh_name = '" + finduser + "' and gs_name = '" + gongsi + "' and sp_dm ='" + _id+"'"
      },
      success(res) {
        console.log("成功", res)
        that.setData({
          szZhi : res.result
        })
       
      }, fail(res) {
        console.log("失败", res)

      }
    });
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
  xixi: function (e) {
    if (e.detail.value == "") {
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "select * from yh_jinxiaocun_jichuziliao where zh_name = '" + finduser + "' and gs_name = '" + gongsi + "'"
        },
        success(res) {
          console.log("成功", res)
          that.setData({
            szzhi: res.result
          })
          // szZhi = 
        }, fail(res) {
          console.log("失败", res)

        }
      });
      // db.collection("Yh_JinXiaoCun_mingxi").where({
      //   finduser: finduser,
      //   gongsi: gongsi,

      // }).get({
      //   success: res => {
      //     that.setData({
      //       szzhi: res.data
      //     })
      //   }
      // })

    } else {
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "select * from yh_jinxiaocun_jichuziliao where zh_name = '" + finduser + "' and gs_name = '" + gongsi + "' and name='" + db.RegExp({
            regexp: e.detail.value,
            options: 'i',
          })+"'"
        },
        success(res) {
          console.log("成功", res)
          that.setData({
            szzhi: res.result
          })
          // szZhi =
        }, fail(res) {
          console.log("失败", res)

        }
      });
      // db.collection("Yh_JinXiaoCun_mingxi").where({
      //   finduser: finduser,
      //   gongsi: gongsi,
      //   cpname: db.RegExp({
      //     regexp: e.detail.value,
      //     options: 'i',
      //   })
      // }).get({
      //   success: res => {
      //     that.setData({
      //       szzhi: res.data
      //     })
      //   }
      // })

    }
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