// pages/Tosell/Tosell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden1:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    var _openid = wx.getStorageSync('openid').openid;
    db.collection("Yh_JinXiaoCun_mingxi").where({
      _openid: _openid
    }).get({
      success: res => {
        that.setData({
          szzhi: res.data
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
  shanchu:function(e){
    var that=this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    console.log(id)
    console.log(that.data.szzhi)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).remove({
            success: console.log,
            fail: console.error,
             
          })
          that.onLoad()
        } else if (res.cancel) {
       
          return false;
        }
   
      }
    })

  
  },
  xiugai:function(e){
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    console.log(id)
    that.setData({
       hidden1:!that.data.hidden1,
      szzh: that.data.szzhi[id],
      cpsj: that.data.szzhi[id].cpsj,
      cpjj: that.data.szzhi[id].cpjj,
      cplb: that.data.szzhi[id].cplb,
      mxtype: that.data.szzhi[id].mxtype,
      cpsl: that.data.szzhi[id].cpsl,
      cpjg: that.data.szzhi[id].cpjg,
    })
    // db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).update({
    //   data:{


    //   }
    // })

  },
  cpsj:function(e){
    var cpsj = e.detail.value
    console.log(cpsj)
    this.setData({
      cpsj: cpsj
    })
  },
  cpjj: function (e) {
    var cpjj = e.detail.value
    console.log(cpjj)
    this.setData({
      cpjj: cpjj
    })
  }
  ,
  cplb: function (e) {
    var cplb = e.detail.value
    console.log(cplb)
    this.setData({
      cplb: cplb
    })
  }
  ,
  mxtype: function (e) {
    var mxtype = e.detail.value
    console.log(mxtype)
    this.setData({
      mxtype: mxtype
    })
  }
  ,
  cpsl: function (e) {
    var cpsl = e.detail.value
    console.log(cpsl)
    this.setData({
      cpsl: cpsl
    })
  }
  ,
  cpjg: function (e) {
    var cpjg = e.detail.value
    console.log(cpjg)
    this.setData({
      cpjg: cpjg
    })
  },
    tjjg:function(){
      var that=this
      var cpsj = that.data.cpsj
      var cpjj = that.data.cpjj
      var cplb = that.data.cplb
      var mxtype = that.data.mxtype
      var cpsl = that.data.cpsl
      var cpjg = that.data.cpjg
      const db = wx.cloud.database()

      db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzh._id).update({
data:{
  cpsj: cpsj,
  cpjj: cpjj,
  cplb: cplb,
  mxtype: mxtype,
  cpsl: cpsl,
  cpjg: cpjg,


},
 success: res => {
  wx.showToast({

    title: '修改成功！',

  })

}

      })
that.setData({
  hidden1: true,

  cpsljg: ""
})

that.onLoad()


    },
spClose:function(){
  this.setData({
    hidden1: true,

    cpsljg: ""
  })
}
})