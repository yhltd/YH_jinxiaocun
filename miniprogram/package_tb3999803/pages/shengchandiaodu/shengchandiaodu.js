// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  xgShow: false,
  data: {
    list: [],
    title: [ {
      text: "倒计时",
      width: "110rpx",
      columnName: "daojishi",
      type: "text",
      isupd: true
    },
      {
        text: "生产单号",
        width: "180rpx",
        columnName: "productionNo",
        type: "text",
        isupd: true
      },
      {
        text: "客户名称",
        width: "200rpx",
        columnName: "customerName",
        type: "text",
        isupd: true
      },
      {
        text: "终端用户",
        width: "300rpx",
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
        text: "订单状态",
        width: "160rpx",
        columnName: "orderState",
        type: "text",
        isupd: true
      },
      {
        text: "文件编号",
        width: "210rpx",
        columnName: "spareMoney",
        type: "text",
        isupd: true
      },
      {
        text: "生产时效",
        width: "200rpx",
        columnName: "beizhu2",
        type: "text",
        isupd: true
      },
      {
        text: "派单日期",
        width: "200rpx",
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
      {
        text: "总包数",
        width: "250rpx",
        columnName: "gx",
        type: "text",
        isupd: true
      },
      {
        text: "材料数量",
        width: "250rpx",
        columnName: "sl",
        type: "text",
        isupd: true
      },
    ],
    shengchan_list: ['优先生产', '正常'],
    gongxu_list: ['配料','开料','封边','排孔','线条','覆膜','手工','五金','包装','入库','出库','派单'],
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
    var e = ''
    _this.tableShow(e)
  },

  
  bindPickerChange: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.gongxu_list[e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    // sql = "select id,productionNo,customerName,[user],orderContent,beizhu2,orderState,spareMoney,paidanDate,shengchanzhouqi,daojishi,searchNO,endDate,isnull(ddh,'') as ddh,isnull(gx,'') as gx from (select id,productionNo,customerName,[user],orderContent,beizhu2,orderState,spareMoney,isnull(paidanDate,'')  as paidanDate,'' as shengchanzhouqi,'' as daojishi,isnull(searchNO,'') as searchNO,isnull(endDate,'') as endDate from madeOrder where orderState <> '出库' and orderState <> '制单中' and orderState <> '预算中'  ) as dingdan left join (select ddh,gx from (select max(id) as max_id from xiaoxiguanli group by ddh,khmc,zdyh,ddje) as quchong left join xiaoxiguanli on max_id = id where ddje != '生产时效超期' and wczt != '' and wczt != '缺料') as gongxu on productionNo = ddh order by case orderState when '生产' then 1 else 2 end,orderState,case searchNO when '优先生产' then 1 else 2 end,convert(datetime,endDate),productionNo desc"

    // sql="select id,productionNo,customerName,[user],orderContent,beizhu2,orderState,spareMoney,isnull(paidanDate,'')  as paidanDate,'' as shengchanzhouqi,'' as daojishi,isnull(searchNO,'') as searchNO,isnull(endDate,'') as endDate from madeOrder where orderState <> '出库' and orderState <> '制单中' and orderState <> '预算中' order by case searchNO when '优先生产' then 1 else 2 end,orderState,convert(datetime,endDate),productionNo;select ddh,gx from (select max(id) as max_id from xiaoxiguanli group by ddh) as quchong left join xiaoxiguanli on max_id = id where ddje != '生产时效超期' and wczt != '' and wczt != '缺料'"
    sql="select id,productionNo,customerName,[user],orderContent,beizhu2,orderState,spareMoney,isnull(paidanDate,'')  as paidanDate,'' as shengchanzhouqi,'' as daojishi,isnull(searchNO,'') as searchNO,isnull(endDate,'') as endDate from madeOrder where orderState <> '出库' and orderState <> '制单中' and orderState <> '预算中' order by searchNO desc,orderState asc,convert(datetime,endDate),productionNo desc;select ddh,gx,sl from (select max(id) as max_id from xiaoxiguanli group by ddh) as quchong left join xiaoxiguanli on max_id = id where ddje != '生产时效超期' and wczt != '' and wczt != '缺料' and gx like '%" + e + "%'"
    console.log(sql)
    // sql = "select paixu,A,B,C,D,E,F,G,H,I,M,N,J,K,L,isnull(gx,'') as gx from (select a.paixu,'□' as A,isnull(a.productionNO,'') as B,isnull(a.customerName,'') as C,isnull(a.[user],'') as D,isnull(a.orderContent,'') as E,isnull(a.beizhu2,'') as F,isnull(a.orderState,'') as G,isnull(a.spareMoney,'') as H,isnull(paidanDate,'') as I,'' as M,'' as N,isnull(searchNO,'') as J,isnull(endDate,'') as K,case a.orderState when '生产' then 1 else 2 end as L from(select isnull(paixu,'') as paixu,productionNO,customerName,[user],orderContent,orderType,deliveryMode,CONVERT(float,isnull(orderMoney,0))-CONVERT(float,isnull(dingjin,0))-CONVERT(float,isnull(yukuan,0)) as chukufukuan,orderState,spareMoney,wenjian_name,baozhuangshuliang,beizhu1,beizhu2,shou_yukuan,shou_yukuan_riqi,paidanDate,searchNO,endDate from madeOrder where orderState is not NULL and orderState <> '出库' and orderState <> '制单中' and orderState <> '预算中' ) as a left join (select payNo,max(convert(date,opetationDate)) as opetationDate from moneyDetails group by payNo) as b on a.productionNO = b.payNo) as dingdan left join (select ddh,gx from (select max(id) as max_id from xiaoxiguanli group by ddh,khmc,zdyh,ddje) as quchong left join xiaoxiguanli on max_id = id where ddje != '生产时效超期' and wczt != '' and wczt != '缺料') as gx on B = ddh"
   
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
       
        var gongxu_list = res.result.recordsets[1]
        for(var i=0; i<list.length; i++){
          for(var j=0; j<gongxu_list.length; j++){
            if(list[i].productionNo == gongxu_list[j].ddh){
              list[i].orderState = gongxu_list[j].gx
            }
          }
        }
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
          var paidan_riqi = list[j].beizhu2
          var riqi = new Date();
          var year = riqi.getFullYear(); //得到年份
          var month = riqi.getMonth(); //得到月份
          var date = riqi.getDate(); //得到日期
          month = month + 1;
          if (month < 10) month = "0" + month;
          if (date < 10) date = "0" + date;
          var time = year + "/" + month + "/" + date; //（格式化"yyyy-MM-dd"）
          if (paidan_riqi != '' && paidan_riqi != null && paidan_riqi !== "") {
            paidan_riqi = paidan_riqi.replaceAll("/", "-")
            riqi = time.replaceAll("/", "-")
            var date = DateDiff(paidan_riqi,riqi) 
            list[j].daojishi = date
          }
        }
        _this.setData({
          list: list,
        })
        console.log(list)
        // list.sort(_this.compare("daojishi"))
        // console.log(list)
        // _this.setData({
        //   list: list,
        // })
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
      cxShow: false,
    })
  },

  clickView: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var id = _this.data.list[index].id
    var searchNO = _this.data.list[index].searchNO
    var endDate = _this.data.list[index].endDate
    var userInfo = _this.data.userInfo
    if(userInfo.quanxian == '工序员'){
      wx.showToast({
        title: '工序员无设置生产顺序权限',
        icon: 'none'
      })
      return;
    }
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
  // goto_baogong: function(e){
  //   var _this = this
  //   wx.showModal({
  //     title: "提示",
  //     content: '是否跳转此订单的下料单？',
  //     cancelColor: '#282B33',
  //     confirmColor: '#BC4A4A',
  //     success: res => {
  //       if (res.confirm) { 
  //         var index = e.currentTarget.dataset.index
  //         // var order_number = _this.data.list[index].productionNo
  //         // console.log(order_number)
  //         var khmc = _this.data.list[index].customerName
  //         var zdyh = _this.data.list[index].user
  //         var productionNo = _this.data.list[index].productionNo
  //         wx.navigateTo({
  //           url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&khmc=' + khmc+'&zdyh=' + zdyh+ '&productionNo=' + productionNo+'&xmjy='+"1",
  //         })
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // },
  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      id: '',
      ddh: '',
      khmc: '',
      zdyh: '',
      ddje: '',
      gx: '',
      wczt: '',
      bgry: '',
      start_date: '',
      stop_date: '',

    })
  },
  sel1: function () {
    var _this = this
    // var e = [_this.data.mccl]
    var e = [_this.data.gx]
    _this.tableShow(e)
    _this.qxShow()
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
    var sql = "update madeOrder set searchNO = '',endDate = '' where id='" + _this.data.id + "'"
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
  compare: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
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
function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式  
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split("-")
  oDate1 = new Date(aDate[0] + '/' + aDate[1] + '/' + aDate[2] + " 00:00:00") //转换为12-18-2002格式  
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[0] + '/' + aDate[1] + '/' + aDate[2] + " 00:00:00")
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
  if(oDate1 - oDate2 > 0){
    return iDays
  }else{
    return iDays * -1
  }

}
  