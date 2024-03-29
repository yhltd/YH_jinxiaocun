// packageH/page/contract_personnel_pitcure/contract_personnel_pitcure.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personnel_id : '',
    all:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      personnel_id : userInfo.id,
    })

    _this.init();
  },

  init: function(){
    var _this = this

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from contract_personnel_pitcure where personnel_id = '" + _this.data.personnel_id + "'"
      }, 
      success: res => {
        var list = res.result.recordset
        for(var i=0;i<list.length;i++){
          list[i].picture = "data:image/jpeg;base64," + list[i].picture.replace(/[\r\n]/g, '')
        }
        _this.setData({
          all: list
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

  shanchu: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    console.log(that.data.all)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "sqlServer_cw",
            data: {
              query: "delete from contract_personnel_pitcure where id = '" + that.data.all[id].id + "'"
            },
            success(res) {
              console.log("成功", res)
              that.init();
            },
            fail(res) {
              console.log("失败", res)
              that.init();
            }
          });
        } else if (res.cancel) {
          return false;
        }
      }
    })
  },

  jiahao1: function() {
    var _this = this
    wx.navigateTo({
      url: "../qianzi/qianzi?userInfo=" + JSON.stringify({
      id : _this.data.personnel_id,
      })
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
    var _this = this
    _this.init()
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