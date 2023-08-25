// pages/xiangqingxiugai/xiangqingxiugai.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  changeBigImg(e) {
    let that = this;
    let openid = app.globalData.openid || wx.getStorageSync('openid');
    var id=e.id;
    console.log(id)
    // var tupianmingchen = e.detail.value.tupianmingchen
    // var lujing = e.detail.value.lujing
    // var bangdingshuxing = e.detail.value.bangdingshuxing
    var mingzi = e.detail.value.mingzi
    var chanpinming = e.detail.value.chanpinming
    var jiagezheng = e.detail.value.jiagezheng
    var jiagexiao = e.detail.value.jiagexiao
    var text1 = e.detail.value.text1
    var text2 = e.detail.value.text2
    var text3 = e.detail.value.text3
    var text4 = e.detail.value.text4
    var text5 = e.detail.value.text5
    var text6 = e.detail.value.text6
    var text7 = e.detail.value.text7
    var text8 = e.detail.value.text8

    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]

        wx.cloud.uploadFile({
          cloudPath: "tupian/" + cloudPath,//云存储图片名字

          filePath,//临时路径

          success: res => {
            console.log('[上传图片] 成功：', res)
            that.setData({
              bigImg: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
            let fileID = res.fileID;
            //把图片存到users集合表
            var name3 = wx.getStorageSync("name3")
            console.log(name3)
            const db = wx.cloud.database();
            db.collection(name3).doc(id).update({
              data: {
                path: fileID,
                mingzi: mingzi,
                chanpinming: chanpinming,
                jiagezheng: jiagezheng,
                jiagexiao: jiagexiao,
                text1: text1,
                text2: text2,
                text3: text3,
                text4: text4,
                text5: text5,
                text6: text6,
                text7: text7,
                text8: text8
              },
              success: function () {
                wx.showToast({
                  title: '图片修改成功',
                  'icon': 'none',
                  duration: 3000
                })
              },
              fail: function () {
                wx.showToast({
                  title: '图片修改失败',
                  'icon': 'none',
                  duration: 3000
                })
              }
            });
          },
          fail: e => {
            console.error('[修改图片] 失败：', e)
          },
          complete: () => {
            wx.hideLoading()
          }
        });
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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