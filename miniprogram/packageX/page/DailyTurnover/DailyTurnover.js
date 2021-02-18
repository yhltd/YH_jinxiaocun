// miniprogram/packageX/page/Turnover/Turnover.js
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
    gongsi: "",
    uname: "",
    getDate: function () {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1);
      var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
      return year + "-" + month + "-" + day
    },
    title: [{ text: "编号", width: "100rpx", columnName: "did", type: "digit", isupd: true },
            { text: "日期", width: "200rpx", columnName: "date_time", type: "text", isupd: true },
            { text: "已还款", width: "300rpx", columnName: "repayment", type: "text", isupd: true },
            { text: "商户", width: "250rpx", columnName: "commercial_tenant", type: "text", isupd: true },
            { text: "刷卡额", width: "250rpx", columnName: "swipe", type: "text", isupd: true },
            { text: "费率", width: "200rpx", columnName: "rate", type: "date", isupd: true },
            { text: "到账金额", width: "250rpx", columnName: "arrival_amount", type: "date", isupd: true },
      { text: "基础手续费", width: "250rpx", columnName: "basics_service_charge", type: "digit", isupd: true },
      { text: "其他手续费", width: "250rpx", columnName: "other_service_charge", type: "digit", isupd: true },
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
    if (_this.data.riqi1==""){
      _this.setData({
        riqi1:"1900/1/1"
      })
    }
    if (_this.data.riqi2 == "") {
      _this.setData({
        riqi2:"2030/12/31"
      })
    }
    let sql = "select * from day_trading where cast(date_time as date)>= cast('" + _this.data.riqi1 + "' as date) and cast(date_time as date)<= cast('" + _this.data.riqi2 +"' as date) and day_trading.gongsi='" + _this.data.gongsi +"' "
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
      riqi1:"1900/1/1",
      riqi2: "2030/12/31",
    })
    _this.init();
  },



  inquire_QX: function () {
    var _this = this;
    _this.setData({
      frmStudfind: true,
      mask_hid: true,
    })
  },




  save: function (e) {
    var _this = this;
    _this.setData({
      riqi1: e.detail.value.riqi1,
      riqi2: e.detail.value.riqi2,
    })
    _this.init();
    _this.setData({
      frmStudfind: true,
      mask_hid: true,
    })
  },

  inquire: function () {
    var _this = this;
    _this.setData({
      riqi1: "",
      riqi2: "",
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
    _this.entering();
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