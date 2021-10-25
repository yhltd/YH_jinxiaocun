// miniprogram/packageX/page/MonthlyTurnover/MonthlyTurnover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    input_type: 'text',
    list: [],
    skr: "",
    fkr: "",
    ckr: "",
    gongsi:"",
    uname:"",
    empty: "",
    getDate: function () {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1);
      var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
      return year + "-" + month + "-" + day
    },
    title: [{ text: "序号", width: "100rpx", columnName: "rownum", type: "digit", isupd: true },
    { text: "收卡人", width: "200rpx", columnName: "recipient", type: "text", isupd: true },
    { text: "付款人", width: "300rpx", columnName: "cardholder", type: "text", isupd: true },
    { text: "持卡人", width: "250rpx", columnName: "drawee", type: "text", isupd: true },
    { text: "发卡行", width: "250rpx", columnName: "issuing_bank", type: "text", isupd: true },
    { text: "账单日", width: "200rpx", columnName: "bill_day", type: "date", isupd: true },
    { text: "还款日", width: "250rpx", columnName: "repayment_date", type: "date", isupd: true },
      { text: "总金额", width: "250rpx", columnName: "total", type: "digit", isupd: true },
      { text: "应还款", width: "250rpx", columnName: "repayable", type: "digit", isupd: true },
      { text: "剩余金额", width: "250rpx", columnName: "balance", type: "digit", isupd: true },
      { text: "借款金额", width: "250rpx", columnName: "loan", type: "digit", isupd: true },
      { text: "已还款", width: "250rpx", columnName: "repayment", type: "digit", isupd: true },
      { text: "已刷金额", width: "250rpx", columnName: "swipe", type: "digit", isupd: true },
      { text: "未刷金额", width: "250rpx", columnName: "balance_of_credit_card", isupd: true },
      { text: "总手续费", width: "250rpx", columnName: "the_total_fee", isupd: true },
      { text: "应收金额", width: "250rpx", columnName: "collected_amount", isupd: true },
      { text: "利润", width: "250rpx", columnName: "profit", isupd: true },
    ],
    input_hid: true,
    frmStudfind: true,
    mask_hid: true,
  },




  init: function () {
    var _this = this;
    var skr = _this.data.skr.split("'").join("").trim();
    var fkr = _this.data.fkr.split("'").join("").trim();
    var ckr = _this.data.ckr.split("'").join("").trim();
    let sql = "select b.*,sum(a.repayment) as repayment,sum(a.swipe) as swipe,sum(a.repayment)-sum(a.swipe) as balance_of_credit_card,sum(a.basics_service_charge)+sum(a.other_service_charge) as the_total_fee,sum(a.swipe)*(b.service_charge)+sum(a.repayment)-sum(a.swipe) as collected_amount,sum(a.swipe)*(b.service_charge)-sum(a.basics_service_charge)+sum(a.other_service_charge) as profit from customer as b left join day_trading as a on b.id = a.id where b.recipient like '%" + skr + "%' and b.cardholder like '%" + fkr + "%' and b.drawee like '%" + ckr + "%' and b.gongsi='" + _this.data.gongsi +"' group by b.id"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        var _list
        console.log("select-success", res)
        if(res.result[0].id==null){
          _list=null
        }else{
        _list= res.result
        }
        _this.setData({
          list: _list,
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
      skr: "",
      fkr: "",
      ckr: "",
    })
    _this.init();
  },



  inquire_QX: function () {
    var _this = this;
      _this.setData({
        frmStudfind: true,
        mask_hid: true,
        empty:""
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
  },

  inquire: function () {
    var _this = this;
    _this.setData({
      frmStudfind: false,
      mask_hid: false,
      empty:""
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