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
    title: [
            { text: "会员总数", width: "200rpx", columnName: "hyzs", type: "date", isupd: true },
            { text: "下单会员人数", width: "180rpx", columnName: "xdhyrs", type: "number", isupd: true },
            { text: "订单总数", width: "250rpx", columnName: "commercial_tenant", type: "tenumberxt", isupd: true },
            { text: "消费金额", width: "180rpx", columnName: "xfje", type: "number", isupd: true },
            { text: "实收金额", width: "180rpx", columnName: "ssje", type: "number", isupd: true },
            { text: "优惠金额", width: "180rpx", columnName: "yhje", type: "number", isupd: true },
      
      ],
    input_hid: true,
    frmStudfind: true,
    mask_hid: true,
    handle3 : true,
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
    let sql = "select round(sum(ifnull(heji.xfje,0)),2) as xfje,round(sum(ifnull(heji.ssje,0)),2) as ssje,round(sum(ifnull(heji.yhje,0)),2) as yhje from orders as ord left join(select ddid,company,sum(convert(dj,float) * convert(gs,float)) as xfje,sum(convert(zhdj,float) * convert(gs,float)) as ssje,round(sum(convert(dj,float) * convert(gs,float)) - sum(convert(zhdj,float) * convert(gs,float)),2) as yhje from orders_details group by ddid) as heji on ord.ddh = heji.ddid and ord.company = heji.company where ord.company = '" + _this.data.company + "' and riqi >='" + _this.data.riqi1 + "' and riqi <= '" + _this.data.riqi2 + "'"
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
      handle3 : true,
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
    var title = _this.data.title
    var cloudList = {
      name: '统计报表',
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      company: userInfo.gongsi,
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