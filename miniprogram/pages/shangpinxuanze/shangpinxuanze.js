// pages/shangpinxuanze/shangpinxuanze.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this
    var all=[]
    var _openid = "o1tYZ42DXusfK42hRYB6i_Blm89A"
    const db = wx.cloud.database();
    db.collection('Yh_JinXiaoCun_chanpin').where({
     _openid:_openid
    })
    .get({
      success: res => {

        console.log(res.data)
        that.setData({
           all:res.data
                    })

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

  },
  jiahao1:function(){
    wx.navigateTo({
      url: '/pages/xinjianshangpin/xinjianshangpin',
    })
  }
})