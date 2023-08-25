// pages/gouwuche/gouwuche.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: []
  },

  compare: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
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
  onLoad: function () {

    var that = this
    var obj = wx.getStorageSync("openid")
    var openid = obj.openid;
    var alll = [];
    const db = wx.cloud.database();
    db.collection('shoucang').where({
      _openid: openid,
      zhuangtai: 4
    })
      .get({
        success(res) {

          that.setData({
            alll: res.data
          })
          var alll = that.data.alll
          var countResult = alll.length;
          //循环取值
          for (let i = 0; i < countResult; i++) {

            var id = alll[i].id
            console.log(id)

            db.collection('todos').doc(id).get({
              success(res) {

                that.data.all.push(res.data)
                that.data.all.sort(that.compare("Sort_index"));//排序
                console.log(that.data.all)
                that.setData({
                  all: that.data.all
                },
                )
              }
            })
          }
        }
      })

  },
  fahuozhong: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    console.log(id)
    var obj = wx.getStorageSync("openid")
    var openid = obj.openid;
    console.log(openid)
    const db = wx.cloud.database();
    db.collection('shoucang').where({
      _openid: openid,
      id: id
    })
      .get({
        success(res) {
          console.log(res.data[0]._id)

          db.collection('shoucang').doc(res.data[0]._id).update({
            data: {
              zhuangtai: 1,
            },
            success: res => {
              wx.showToast({
                title: '评价成功',
              })
            },
          })
        }
      })
  },

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