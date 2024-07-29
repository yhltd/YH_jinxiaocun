// package_tb3999803/pages/buhuomingxi/buhuomingxi.js
Page({

  /**
   * 页面的初始数据
   */
  // tableShow: true,
  xgShow: false,
  cxShow: false,
  data: {
    list: [],
    title: [{
      text: "项目",
      width: "230rpx",
      columnName: "xm",
      type: "text",
      isupd: true
    }, {
      text: "大类",
      width: "300rpx",
      columnName: "dl",
      type: "text",
      isupd: true
    }, {
      text: "名称数量",
      width: "450rpx",
      columnName: "mcsl",
      type: "text",
      isupd: true
    }, {
      text: "进度",
      width: "270rpx",
      columnName: "jd",
      type: "text",
      isupd: true
    }, {
      text: "发起日期",
      width: "180rpx",
      columnName: "fqrq",
      type: "text",
      isupd: true
    }, {
      text: "单号",
      width: "300rpx",
      columnName: "dh",
      type: "text",
      isupd: true
    }, {
      text: "客户名称",
      width: "270rpx",
      columnName: "khmc",
      type: "text",
      isupd: true
    }, {
      text: "终端用户",
      width: "270rpx",
      columnName: "zdyh",
      type: "text",
      isupd: true
    }, {
      text: "材料名称",
      width: "350rpx",
      columnName: "clmc",
      type: "text",
      isupd: true
    }],
    // xm_list: ['补货','配件','返厂'],
    // id: '',
    // xm: '',
    // dl: '',
    // mcsl: '',
    // jd: '',
    // fqrq: '',
    // dh: '',
    // khmc: '',
    // zdyh: '',
    // clmc: '',
  },

  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo: userInfo,
    })
    _this.tableShow()
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
    sql = "select * from buhuoxialiao where xm = '补货' or xm = '配件' or xm = '返厂'"
    var userInfo = _this.data.userInfo
    if (userInfo.quanxian == '客户') {
      sql = sql + " khmc = '" + userInfo.name + "'"
    }
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
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

  // sel1: function () {
  //   var _this = this
  //   var e = [_this.data.xm, _this.data.khmc, _this.data.zdyh, _this.data.clmc]
  //   _this.tableShow(e)
  //   _this.qxShow()
  // },

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
    // var e = ['', '', '', '']
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

function getNowDate() {
  var date = new Date();
  var sign1 = "/";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  // if (month >= 1 && month <= 9) {
  //  month = "0" + month;
  // }
  // if (day >= 0 && day <= 9) {
  //  day = "0" + day;
  // }
  // if (hour >= 0 && hour <= 9) {
  //  hour = "0" + hour;
  // }
  // if (minutes >= 0 && minutes <= 9) {
  //  minutes = "0" + minutes;
  // }
  // if (seconds >= 0 && seconds <= 9) {
  //  seconds = "0" + seconds;
  // }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
  return currentdate;
 }

//ios端字符串转时间戳，字符串必须以yyyy/m/d hh:mm:ss格式放入时间戳
// function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式  
//   var aDate, oDate1, oDate2, iDays
//   aDate = sDate1.split("-")
//   oDate1 = new Date(aDate[0] + '/' + aDate[1] + '/' + aDate[2] + " 00:00:00") //转换为12-18-2002格式  
//   aDate = sDate2.split("-")
//   oDate2 = new Date(aDate[0] + '/' + aDate[1] + '/' + aDate[2] + " 00:00:00")
//   iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
//   if(oDate1 - oDate2 > 0){
//     return iDays
//   }else{
//     return iDays * -1
//   }
// }