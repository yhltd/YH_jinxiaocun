// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  xlShow:false,
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  xgShow2: false,
  cxShow: false,
  data: {
    list: [],
    title: [
      {
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
        width: "250rpx",
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
        width: "250rpx",
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
        width: "250rpx",
        columnName: "shengchan_zhouqi",
        type: "text",
        isupd: true
      },
      {
        text: "倒计时",
        width: "250rpx",
        columnName: "daojishi",
        type: "text",
        isupd: true
      },
      {
        text: "生产顺序",
        width: "250rpx",
        columnName: "searchNO",
        type: "text",
        isupd: true
      },
    ],
    shengchan_list: ['优先生产','正常'],
    shengchan: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var e = ''
    _this.tableShow(e)
    // var sql = "select id,productionNo,customerName,[user],orderContent,beizhu2,orderState,spareMoney,paidanDate,'' as shengchanzhouqi,'' as daojishi,searchNO from madeOrder where orderState = '生产' or orderState = '审核收款' or orderState = '完工'"
    // wx.cloud.callFunction({
    //   name: 'sqlServer_tb3999803',
    //   data: {
    //     query: sql
    //   },
    //   success: res => {
    //     var list = res.result.recordset
    //     for(var i=0; i< list.length; i++){
    //       var shengchan_shixiao = list[i].beizhu2
    //       var paidan_riqi = list[i].paidanDate
    //       if(shengchan_shixiao != '' && paidan_riqi != '' && paidan_riqi != null &&   shengchan_shixiao != null){
    //         shengchan_shixiao = list[i].beizhu2.replaceAll("/","-")
    //         paidan_riqi = list[i].paidanDate.replaceAll("/","-")
    //         var date = DateDiff(paidan_riqi,shengchan_shixiao)
    //         // console.log(date)
    //         list[i].shengchan_zhouqi = date
    //       }
    //     }
    //     for(var j=0; j< list.length; j++){
    //       var paidan_riqi = list[j].paidanDate
    //       var riqi = new Date();
    //       var year = riqi.getFullYear(); //得到年份
    //       var month = riqi.getMonth(); //得到月份
    //       var date = riqi.getDate(); //得到日期
    //       month = month + 1;
    //       if (month < 10) month = "0" + month;
    //       if (date < 10) date = "0" + date;
    //       var time = year + "/" + month + "/" + date; //（格式化"yyyy-MM-dd"）
    //       (function() {
    //           time.value = time;
    //           // console.log(time)
    //       })
    //       // console.log(time)
    //       if(paidan_riqi != '' && paidan_riqi != null){
    //         paidan_riqi = list[j].paidanDate.replaceAll("/","-")
    //         riqi = time.replaceAll("/","-")
    //         var date = DateDiff(paidan_riqi,riqi)
    //         // console.log(date)
    //         list[j].daojishi = date
    //       }
    //     }
    //     console.log(list)
    //     _this.setData({
    //       list: list
    //     })
    //   },
    //   err: res => {
    //     console.log("错误!")
    //   },
    //   fail: res => {
    //     wx.showToast({
    //       title: '请求失败！',
    //       icon: 'none',
    //       duration: 3000
    //     })
    //     console.log("请求失败！")
    //   }
    // })
  },

  bindPickerChange: function (e) {
    var _this = this
    var column_name = e.target.dataset.column_name
    var list_name = e.target.dataset.list_name
    // console.log(_this.data[list_name][e.detail.value])
    _this.setData({
      // [column_name]: _this.data[list_name][e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
      sql = "select id,productionNo,customerName,[user],orderContent,beizhu2,orderState,spareMoney,paidanDate,'' as shengchanzhouqi,'' as daojishi,searchNO from madeOrder where orderState = '生产' or orderState = '审核收款' or orderState = '完工'"
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        for(var i=0; i< list.length; i++){
          var shengchan_shixiao = list[i].beizhu2
          var paidan_riqi = list[i].paidanDate
          if(shengchan_shixiao != '' && paidan_riqi != '' && paidan_riqi != null &&   shengchan_shixiao != null){
            shengchan_shixiao = list[i].beizhu2.replaceAll("/","-")
            paidan_riqi = list[i].paidanDate.replaceAll("/","-")
            var date = DateDiff(paidan_riqi,shengchan_shixiao)
            // console.log(date)
            list[i].shengchan_zhouqi = date
          }
        }
        for(var j=0; j< list.length; j++){
          var paidan_riqi = list[j].paidanDate
          var riqi = new Date();
          var year = riqi.getFullYear(); //得到年份
          var month = riqi.getMonth(); //得到月份
          var date = riqi.getDate(); //得到日期
          month = month + 1;
          if (month < 10) month = "0" + month;
          if (date < 10) date = "0" + date;
          var time = year + "/" + month + "/" + date; //（格式化"yyyy-MM-dd"）
          (function() {
              time.value = time;
              // console.log(time)
          })
          // console.log(time)
          if(paidan_riqi != '' && paidan_riqi != null){
            paidan_riqi = list[j].paidanDate.replaceAll("/","-")
            riqi = time.replaceAll("/","-")
            var date = DateDiff(paidan_riqi,riqi)
            // console.log(date)
            list[j].daojishi = date
          }
        }
        // var list = res.result.recordsets[0]
        // console.log(list)
        // console.log(res.result.recordsets[1])
        _this.setData({
          list: list,
          // list_out: res.result.recordsets[1]
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

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      xgShow2: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  upd1:function(e){
    var _this = this
    var sql = "update madeOrder set " + _this.data.this_column + "='" + _this.data.this_value + "' where order_number='" + _this.data.order_number + "'"
    console.log(sql)
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
        var e = ['','', '1900-01-01', '2100-12-31', '', '']
        _this.tableShow(e)
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

  xiala_open:function(){
    var _this = this
    _this.setData({
      xlShow: true
    })
  },

  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      _this.setData({
        xlShow: false,
        this_value:new_val
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow: false,
      })
    }
  },

  clickView: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var order_number = _this.data.list[index].order_number
    // console.log(order_number)
    // console.log(index)
    // console.log(column)

  },

  click_01: function () {
    var _this = this
    var sql = "update madeOrder set " + _this.data.this_column + "='优先生产' where order_number='" + _this.data.order_number + "'"
    
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
        var e = ['','', '1900-01-01', '2100-12-31', '', '']
        _this.tableShow(e)
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

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id: '',
      productionNo: '',
      customerName: '',
      user: '',
      orderContent: '',
      beizhu2: '',
      orderState: '',
      spareMoney: '',
      paidanDate: '',
      shengchan_zhouqi: '',
      daojishi: '',
      searchNO: '',
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },


  del1: function (e) {
    var _this = this
    var order_number = _this.data.list[e.currentTarget.dataset.index].order_number
    console.log(order_number)
    if (_this.data.userInfo.power == '管理员') {

    } else {
      wx.showToast({
        title: '非管理员账号，无删除订单权限！',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确认删除此条订单？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlServer_tb3999803',
            data: {
              query: "delete from madeOrder where order_number='" + order_number + "';delete from boli_xiadan where order_number='" + order_number + "'"
            },
            
            success: res => {
              _this.qxShow()
              var e = ['','', '1900-01-01', '2100-12-31', '', '']
              _this.tableShow(e)
              wx.showToast({
                title: '删除成功！',
                icon: 'none'
              })
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
              wx.showToast({
                title: '请求失败！',
                icon: 'none'
              })
              console.log("请求失败！")
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      order_number: "",
      start_date: "",
      stop_date: "",
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },



  sel1: function () {
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if (start_date == '') {
      start_date = '1900-01-01'
    }
    if (stop_date == '') {
      stop_date = '2100-12-31'
    }
    var e = [_this.data.order_number,_this.data.customer_name, start_date, stop_date, _this.data.wancheng,_this.data.install_address]
    _this.tableShow(e)
    _this.qxShow()
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

function getTime(){
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth()+1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth()+1);
  var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
  return year+"-"+month+"-"+day
}

function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式  
        var  aDate,  oDate1,  oDate2,  iDays  
        aDate  =  sDate1.split("-")  
        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式  
          aDate  =  sDate2.split("-")  
        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
       iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
          return  iDays  
   }