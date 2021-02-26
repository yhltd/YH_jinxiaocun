// miniprogram/packageX/page/Statistics/Statistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    input_type: 'text',
    list: [],
    riqi1: "",
    riqi2: "",
    empty: "",
    gongsi:"",
    uname:"",
    getDate: function () {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1);
      var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
      return year + "-" + month + "-" + day
    },
    title: [{ text: "日期", width: "300rpx", columnName: "date_time", type: "digit", isupd: true },
    { text: "交易额", width: "300rpx", columnName: "recipient", type: "text", isupd: true },
    { text: "已刷额", width: "300rpx", columnName: "swipe", type: "text", isupd: true },
    { text: "手续费", width: "350rpx", columnName: "the_total_fee", type: "text", isupd: true },
    { text: "利润", width: "350rpx", columnName: "profit", type: "text", isupd: true },
    ],
    input_hid: true,
    frmStudfind: true,
    mask_hid: true,
  },


  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
  },

  init: function () {
    var _this = this;
    if (_this.data.riqi1 == "") {
      _this.setData({
        riqi1: "1900/1/1"
      })
    }
    if (_this.data.riqi2 == "") {
      _this.setData({
        riqi2: "2030/12/31"
      })
    }
    let sql = "select a.date_time,sum(a.repayment) as repayment,sum(a.swipe) as swipe,(sum(a.basics_service_charge)+sum(a.other_service_charge)) as the_total_fee,sum(a.swipe)*(b.service_charge)-sum(a.basics_service_charge)+sum(a.other_service_charge) as profit from day_trading as a,customer as b where a.id=b.id and cast(a.date_time as date) >= cast('" + _this.data.riqi1 + "' as date) and cast(a.date_time as date) >= cast('" + _this.data.riqi2 +"' as date) and a.gongsi='" + _this.data.gongsi + "' group by a.date_time"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        console.log("select-success", res)
        _this.setData({
          list: res.result,
          skr: "",
          fkr: "",
          ckr: "",
        })
      },
      fail: res => {
        console.log("select-fail", res)
      }
    })
  },



  entering: function () {
    var _this = this;
    _this.setData({
      riqi1:"",
      riqi2: "",
    })
    _this.init();
  },




  inquire_QX: function () {
    var _this = this;
    _this.setData({
      riqi1:"",
      riqi2: "",
      frmStudfind: true,
      mask_hid: true,
    })
  },




  save: function (e) {
    var _this = this;
    _this.setData({
      skr: e.detail.value.skr,
      fkr: e.detail.value.fkr,
      ckr: e.detail.value.ckr
    })
    _this.init();
    _this.setData({
      frmStudfind: true,
      mask_hid: true,
    })
    _this.init();
  },

  inquire: function () {
    var _this = this;
    _this.setData({
      frmStudfind: false,
      mask_hid: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      gongsi: userInfo.gongsi,
      uname: userInfo.uname,
    })
    _this.init();
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