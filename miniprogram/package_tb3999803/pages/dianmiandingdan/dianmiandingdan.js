// package_tb3999803/pages/dianmiandingdan/dianmiandingdan.js
Page({

  /**
   * 页面的初始数据
   */
  xgShow: false,
  cxShow: false,
  data: {
    // header_list:{
    //   khmc:'',
    // },
    list: [],
    title: [{
      text: "客户名称",
      width: "350rpx",
      columnName: "khmc",
      type: "text",
      isupd: true
    },{
      text: "终端用户",
      width: "350rpx",
      columnName: "zdyh",
      type: "text",
      isupd: true
    }, {
      text: "进度",
      width: "270rpx",
      columnName: "jd",
      type: "text",
      isupd: true
    }, {
      text: "备注",
      width: "400rpx",
      columnName: "bz",
      type: "text",
      isupd: true
    }, {
      text: "项目负责",
      width: "270rpx",
      columnName: "xmfz",
      type: "text",
      isupd: true
    }, {
      text: "联系方式",
      width: "300rpx",
      columnName: "lxfs",
      type: "text",
      isupd: true
    }, {
      text: "订单属性",
      width: "230rpx",
      columnName: "ddsx",
      type: "text",
      isupd: true
    }, {
      text: "订单号",
      width: "350rpx",
      columnName: "ddh",
      type: "text",
      isupd: true
    }
  ],
    khmc: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo: userInfo,
    })
    var e = ['']
    _this.tableShow(e)
  },

  bindPickerChange: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.gongxu_list[e.detail.value]
    })
  },
      
  choiceDate: function (e) {
    _this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    sql = "select * from dianmiandingdan"
    var userInfo = _this.data.userInfo
    if (userInfo.quanxian == '客户') {
      sql = sql + " where khmc like '" + userInfo.name + "'"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        console.log(sql)
        var list = res.result.recordsets[0]
        console.log(list)
        _this.setData({
          list: list,
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
      },
    })
  },

  
    
  goto_buhuo: function(e){
    var _this = this
    wx.showModal({
      title: "提示",
      content: '是否跳转至补货明细？',
      cancelColor: '#282B33',
      confirmColor: '#BC4A4A',
      success: res => {
        if (res.confirm) { 
          var index = e.currentTarget.dataset.index
          var khmc = _this.data.list[index].khmc
          console.log(khmc)
          wx.navigateTo({
            url: '../buhuomingxi/buhuomingxi?userInfo=' + JSON.stringify(_this.data.userInfo) + '&khmc=' + khmc,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      cxShow: false,
      xgShow: false,
    })
  },

  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
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
    // var _this = this
    // _this.tableShow()
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