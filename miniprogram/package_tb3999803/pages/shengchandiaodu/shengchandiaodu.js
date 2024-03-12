// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  xgShow: false,
  data: {
    list: [],
    title: [{
        text: "生产单号",
        width: "250rpx",
        columnName: "productionNo",
        type: "text",
        isupd: true
      },
      {
        text: "客户名称",
        width: "250rpx",
        columnName: "customerName",
        type: "text",
        isupd: true
      },
      {
        text: "终端用户",
        width: "450rpx",
        columnName: "user",
        type: "text",
        isupd: true
      },
      {
        text: "订单备注",
        width: "250rpx",
        columnName: "orderContent",
        type: "text",
        isupd: true
      },
      {
        text: "生产时效",
        width: "250rpx",
        columnName: "beizhu2",
        type: "text",
        isupd: true
      },
      {
        text: "订单状态",
        width: "180rpx",
        columnName: "orderState",
        type: "text",
        isupd: true
      },
      {
        text: "文件编号",
        width: "250rpx",
        columnName: "spareMoney",
        type: "text",
        isupd: true
      },
      {
        text: "派单日期",
        width: "250rpx",
        columnName: "paidanDate",
        type: "text",
        isupd: true
      },
      {
        text: "生产周期",
        width: "180rpx",
        columnName: "shengchan_zhouqi",
        type: "text",
        isupd: true
      },
      {
        text: "倒计时",
        width: "180rpx",
        columnName: "daojishi",
        type: "text",
        isupd: true
      },
      {
        text: "生产顺序",
        width: "180rpx",
        columnName: "searchNO",
        type: "text",
        isupd: true
      },
      {
        text: "设置优先生产时间",
        width: "320rpx",
        columnName: "endDate",
        type: "text",
        isupd: true
      },
    ],
    shengchan_list: ['优先生产', '正常'],
    shengchan: "",
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
    _this.tableShow()
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    sql = "select id,productionNo,customerName,[user],orderContent,beizhu2,orderState,spareMoney,isnull(paidanDate,'') as paidanDate,'' as shengchanzhouqi,'' as daojishi,isnull(searchNO,'') as searchNO,isnull(endDate,'') as endDate from madeOrder where orderState <> '出库' and orderState <> '制单中' and orderState <> '预算中' order by case orderState when '生产' then 1 else 2 end,orderState,case searchNO when '优先生产' then 1 else 2 end,convert(datetime,endDate),productionNo"
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        for (var i = 0; i < list.length; i++) {
          var shengchan_shixiao = list[i].beizhu2
          var paidan_riqi = list[i].paidanDate
          if (shengchan_shixiao != '' && paidan_riqi != '' && paidan_riqi != null && shengchan_shixiao != null) {
            shengchan_shixiao = list[i].beizhu2.replaceAll("/", "-")
            paidan_riqi = list[i].paidanDate.replaceAll("/", "-")
            var date = DateDiff(shengchan_shixiao,paidan_riqi)
            // console.log(date)
            list[i].shengchan_zhouqi = date
          }
        }
        for (var j = 0; j < list.length; j++) {
          var paidan_riqi = list[j].paidanDate
          var riqi = new Date();
          var year = riqi.getFullYear(); //得到年份
          var month = riqi.getMonth(); //得到月份
          var date = riqi.getDate(); //得到日期
          month = month + 1;
          if (month < 10) month = "0" + month;
          if (date < 10) date = "0" + date;
          var time = year + "/" + month + "/" + date; //（格式化"yyyy-MM-dd"）
          (function () {
            time.value = time;
          })
          if (paidan_riqi != '' && paidan_riqi != null) {
            paidan_riqi = list[j].paidanDate.replaceAll("/", "-")
            riqi = time.replaceAll("/", "-")
            var date = DateDiff(riqi,paidan_riqi)
            list[j].daojishi = date
          }
        }
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
      }
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      xgShow: false,
    })
  },

  clickView: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var id = _this.data.list[index].id
    var searchNO = _this.data.list[index].searchNO
    var endDate = _this.data.list[index].endDate
    _this.setData({
      id,
      index,
      column,
      searchNO,
      endDate,
      xgShow : true,
    })
  },

  goto_baogong: function(e){
    var _this = this
    wx.showModal({
      title: "提示",
      content: '是否查看此订单的报工单？',
      cancelColor: '#282B33',
      confirmColor: '#BC4A4A',
      success: res => {
        if (res.confirm) { 
          var index = e.currentTarget.dataset.index
          var order_number = _this.data.list[index].productionNo
          console.log(order_number)
          wx.navigateTo({
            url: '../saomabaogong/saomabaogong?userInfo=' + JSON.stringify(_this.data.userInfo) + '&order_number=' + order_number,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  click_01: function () {
    var _this = this
    var sql = "update madeOrder set searchNO = '优先生产',endDate = '" + getNowDate() + "' where id=" + _this.data.id
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '完成！',
          icon: 'none',
          duration: 3000
        })
        _this.tableShow()
        _this.qxShow()
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

  click_02: function () {
    var _this = this
    var sql = "update madeOrder set searchNO = '',endDate = '" + getNowDate() + "' where id='" + _this.data.id + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '完成！',
          icon: 'none',
          duration: 3000
        })
        _this.tableShow()
        _this.qxShow()
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

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  back: function () {
    wx.navigateBack({
      delta: 1
    });
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
    var _this = this
    _this.tableShow()
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


function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式  
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split("-")
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2002格式  
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
  if(oDate1 - oDate2 > 0){
    return iDays
  }else{
    return iDays * -1
  }

}