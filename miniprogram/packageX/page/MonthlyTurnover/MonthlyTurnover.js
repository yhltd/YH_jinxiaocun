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
    { text: "付款人", width: "200rpx", columnName: "cardholder", type: "text", isupd: true },
    { text: "持卡人", width: "200rpx", columnName: "drawee", type: "text", isupd: true },
    { text: "发卡行", width: "300rpx", columnName: "issuing_bank", type: "text", isupd: true },
    { text: "账单日", width: "200rpx", columnName: "bill_day", type: "date", isupd: true },
    { text: "还款日", width: "200rpx", columnName: "repayment_date", type: "number", isupd: true },
      { text: "总金额", width: "180rpx", columnName: "total", type: "number", isupd: true },
      { text: "应还款", width: "180rpx", columnName: "repayable", type: "number", isupd: true },
      { text: "剩余金额", width: "180rpx", columnName: "balance", type: "number", isupd: true },
      { text: "借款金额", width: "180rpx", columnName: "loan", type: "number", isupd: true },
      { text: "已还款", width: "180rpx", columnName: "repayment", type: "number", isupd: true },
      { text: "已刷金额", width: "180rpx", columnName: "swipe", type: "number", isupd: true },
      { text: "未刷金额", width: "180rpx", columnName: "balance_of_credit_card",type: "number", isupd: true },
      { text: "总手续费", width: "180rpx", columnName: "the_total_fee",type: "number", isupd: true },
      { text: "应收金额", width: "180rpx", columnName: "collected_amount",type: "number", isupd: true },
      { text: "利润", width: "180rpx", columnName: "profit",type: "number", isupd: true },
    ],
    input_hid: true,
    frmStudfind: true,
    mask_hid: true,
    handle3 : true,
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
        handle3:true,
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

  use_book:function(){
    wx.showModal({
      title: '使用说明',
      content: '1.点击查询按钮，输入条件点击确定即可查询。\n2.点击全部按钮，页面显示所有数据。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
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

  gengduo_show:function(){
    var _this = this;
    _this.setData({
      mask_hid:false,
      handle3:false
    })
  },

  getExcel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list;
    var title = [
      { text: "收卡人", width: "200rpx", columnName: "recipient", type: "text", isupd: true },
      { text: "付款人", width: "200rpx", columnName: "cardholder", type: "text", isupd: true },
      { text: "持卡人", width: "200rpx", columnName: "drawee", type: "text", isupd: true },
      { text: "发卡行", width: "300rpx", columnName: "issuing_bank", type: "text", isupd: true },
      { text: "账单日", width: "200rpx", columnName: "bill_day", type: "date", isupd: true },
      { text: "还款日", width: "200rpx", columnName: "repayment_date", type: "date", isupd: true },
      { text: "总金额", width: "180rpx", columnName: "total", type: "number", isupd: true },
      { text: "应还款", width: "180rpx", columnName: "repayable", type: "number", isupd: true },
      { text: "剩余金额", width: "180rpx", columnName: "balance", type: "number", isupd: true },
      { text: "借款金额", width: "180rpx", columnName: "loan", type: "number", isupd: true },
      { text: "已还款", width: "180rpx", columnName: "repayment", type: "number", isupd: true },
      { text: "已刷金额", width: "180rpx", columnName: "swipe", type: "number", isupd: true },
      { text: "未刷金额", width: "180rpx", columnName: "balance_of_credit_card", type: "number", isupd: true },
      { text: "总手续费", width: "180rpx", columnName: "the_total_fee", type: "number", isupd: true },
      { text: "应收金额", width: "180rpx", columnName: "collected_amount", type: "number", isupd: true },
      { text: "利润", width: "180rpx", columnName: "profit", type: "number", isupd: true },
    ]
    var cloudList = {
      name: '排产订单',
      items: [],
      header: []
    }

    for (let i = 0; i < title.length; i++) {
      cloudList.header.push({
        item: title[i].text,
        type: title[i].type,
        width: parseInt(title[i].width.split("r")[0]) / 6,
        columnName: title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name: 'getExcel',
      data: {
        list: cloudList
      },
      success: function (res) {
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu: 'true',
              fileType: 'xlsx',
              success: res => {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail: res => {
        console.log(res)
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

  }
})