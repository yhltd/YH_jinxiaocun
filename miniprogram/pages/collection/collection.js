// pages/shangpinxuanze/shangpinxuanze.js
var jg
var sl
var dtid
var cpid
var cpjg = []
var cpsl = []
var szZhi = []
var zongjia
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jghide: "none",
    sl: [],
    jg: [],

    rkck: "选择商品"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    that.setData({
      rkSum: 0,
      sl: [],
      jg: []
    })
    var all = []
    var _openid = wx.getStorageSync('openid').openid;
    // console.log(_openid)
 
    const db = wx.cloud.database();
    db.collection('Yh_JinXiaoCun_chanpin').where({
      _openid: _openid
    })
      .get({
        success: res => {

          console.log(res.data)
          that.setData({
            all: res.data,

          })
          szZhi = res.data
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
    var that = this
    that.setData({
      rkSum: 0,
      sl: [],
      jg: []
    })
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

  },
  jiahao1: function () {
    wx.navigateTo({
      url: '/pages/xinjianshangpin/xinjianshangpin',
    })

  },
  srJg: function (e) {
    var that = this
    dtid = e.target.dataset.id
    console.log(dtid)
   var _id=that.data.all[dtid]._id
   console.log(_id)
   wx.navigateTo({
     url: '/pages/shangpinchazhao/shangpinchazhao?_id='+_id,
   })
    // var _openid = wx.getStorageSync('openid').openid;
    // const db = wx.cloud.database();
    // db.collection('Yh_JinXiaoCun_mingxi').where({
    //   _openid: _openid,
    //   cpid:_id
    // })
    //   .get({
    //     success: res => {

    //       console.log(res.data)
    //       that.setData({
    //         alll: res.data,

    //       })
         
    //     }
    //   })

  },

  
})