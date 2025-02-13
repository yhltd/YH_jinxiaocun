// package_tb3999803/pages/gongzuoshouce/gongzuoshouce.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  cxShow: false,
  data: {
    list: [],
    title: [{
        text: "大类",
        width: "250rpx",
        columnName: "dl",
        type: "text",
        isupd: true
      },{
        text: "工段",
        width: "250rpx",
        columnName: "gd",
        type: "text",
        isupd: true
      },{
        text: "问题",
        width: "250rpx",
        columnName: "wt",
        type: "text",
        isupd: true
      },{
        text: "扣分值",
        width: "250rpx",
        columnName: "kfz",
        type: "text",
        isupd: true
      },
    ],
    id:'',
    dl:'',
    gd:'',
    wt:'',
    kfz:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo
    })
    var e = ['', '',]
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    var userInfo = _this.data.userInfo
    console.log(userInfo.quanxian)
    var sql = ""
    if (userInfo.quanxian == '超级管理员' || userInfo.quanxian == '管理员'){
      sql="select * from gongzuoshouce where dl like '%" + e[0] + "%' and gd like '%" + e[1] + "%'"
    }else{
      sql="select * from gongzuoshouce where ckr = '" + userInfo.quanxian + "' and dl like '%" + e[0] + "%' and gd like '%" + e[1] + "%'"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list
        })
        console.log(list)
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

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      cxShow: false,
      xgShow: false,
    })
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      dl: '',
      gd: '',
    })
  },
  
  sel1: function () {
    var _this = this
    var e = [_this.data.dl,_this.data.gd]
    _this.tableShow(e)
    _this.qxShow()
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
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