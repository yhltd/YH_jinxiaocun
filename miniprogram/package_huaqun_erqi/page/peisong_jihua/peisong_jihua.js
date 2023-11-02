// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  data: {
    quanxian_type:['管理员','操作员','客户'],
    peisong_wancheng_list:[
      {name: '完成'},
      {name: '未完成'}
    ],
    list: [],
    title: [
      {
        text: "创建日期",
        width: "250rpx",
        columnName: "jihua_riqi",
        type: "text",
        isupd: true
      },{
        text: "计划名称",
        width: "250rpx",
        columnName: "jihua_name",
        type: "text",
        isupd: true
      },
      {
        text: "计划内容",
        width: "250rpx",
        columnName: "jihua_item",
        type: "text",
        isupd: true
      },
      {
        text: "送货员",
        width: "250rpx",
        columnName: "songhuoyuan",
        type: "text",
        isupd: true
      },
      {
        text: "配送情况",
        width: "250rpx",
        columnName: "peisong_wancheng",
        type: "text",
        isupd: true
      },
      {
        text: "备注",
        width: "250rpx",
        columnName: "mark",
        type: "text",
        isupd: true
      },
    ],
    jihua_riqi:'',
    jihua_name:'',
    jihua_item:'',
    songhuoyuan:'',
    mark:'',
    peisong_wancheng:'',
    start_date:'',
    stop_date:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    console.log(userInfo)
    _this.setData({
      userInfo
    })
    var sql = "select id,name from userInfo where power = '管理员' or power = '操作员'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          songhuoyuan_list: list
        })
        console.log(list)
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
    var e = ['1900-01-01','2100-12-31','','']
    _this.tableShow(e)
  },

  header_xiala: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    var list2 = []
    console.log(list)
    for(var i=0; i< list.length; i++){
      var name = list[i].name
      console.log(name.indexOf(_this.data[column]))
      if(name.indexOf(_this.data[column]) > -1){
        list2.push({name:name})
      }
    }
    console.log(list2)
    _this.setData({
      list_xiala: list2,
      click_column:column,
    })
    console.log(list)
    _this.setData({
      xlShow2: true
    })
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      _this.setData({
        xlShow2: false,
        [click_column]:new_val
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },

  bindPickerChange: function(e){
    var _this = this 
    console.log(e)
    console.log(e.target.dataset.column_name)
    var column = e.target.dataset.column_name
    console.log(_this.data[column + '_list'][e.detail.value])
    _this.setData({
      [column]: _this.data[column + '_list'][e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    var sql = "select * from peisong_jihua where jihua_riqi >= '" + e[0] + "' and jihua_riqi <= '" + e[1] + "' and jihua_name like '%" + e[2] + "%' and songhuoyuan like '%" + e[3] + "%'"    
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list
        })
        console.log(list)
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
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  jihua_riqi:'',
  jihua_name:'',
  jihua_item:'',
  songhuoyuan:'',
  mark:'',
  peisong_wancheng:'',
  start_date:'',
  stop_date:'',
  clickView:function(e){
    var _this = this
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      jihua_riqi: _this.data.list[e.currentTarget.dataset.index].jihua_riqi,
      jihua_name: _this.data.list[e.currentTarget.dataset.index].jihua_name, 
      jihua_item: _this.data.list[e.currentTarget.dataset.index].jihua_item,
      songhuoyuan: _this.data.list[e.currentTarget.dataset.index].songhuoyuan,
      mark: _this.data.list[e.currentTarget.dataset.index].mark,
      peisong_wancheng: _this.data.list[e.currentTarget.dataset.index].peisong_wancheng,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      jihua_riqi:'',
      jihua_name:'',
      jihua_item:'',
      songhuoyuan:'',
      mark:'',
      peisong_wancheng:'',
    })
  },

  add1:function(){
    var _this = this
    if(_this.data.jihua_riqi == ''){
      wx.showToast({
        title: '未填写创建日期',
      })
      return;
    }
    if(_this.data.jihua_name == ''){
      wx.showToast({
        title: '未填写计划名称',
      })
      return;
    }
    if(_this.data.jihua_item == ''){
      wx.showToast({
        title: '未填写计划内容',
      })
      return;
    }
    if(_this.data.songhuoyuan == ''){
      wx.showToast({
        title: '未填写送货员',
      })
      return;
    }
    if(_this.data.mark == ''){
      wx.showToast({
        title: '未填写备注',
      })
      return;
    }
    var sql = "insert into peisong_jihua(jihua_riqi,jihua_name,jihua_item,songhuoyuan,mark) values ('" + _this.data.jihua_riqi + "','" + _this.data.jihua_name + "','" + _this.data.jihua_item + "','" + _this.data.songhuoyuan + "','" + _this.data.mark + "')"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        _this.setData({
          id:'',
          jihua_riqi:'',
          jihua_name:'',
          jihua_item:'',
          songhuoyuan:'',
          mark:'',
          peisong_wancheng:'',
        })
        _this.qxShow()
        var e = ['1900-01-01','2100-12-31','','']
         _this.tableShow(e)
        wx.showToast({
          title: '添加成功！',
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
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  upd1:function(){
    var _this = this
    if(_this.data.jihua_riqi == ''){
      wx.showToast({
        title: '未填写创建日期',
      })
      return;
    }
    if(_this.data.jihua_name == ''){
      wx.showToast({
        title: '未填写计划名称',
      })
      return;
    }
    if(_this.data.jihua_item == ''){
      wx.showToast({
        title: '未填写计划内容',
      })
      return;
    }
    if(_this.data.songhuoyuan == ''){
      wx.showToast({
        title: '未填写送货员',
      })
      return;
    }
    if(_this.data.mark == ''){
      wx.showToast({
        title: '未填写备注',
      })
      return;
    }
    if(_this.data.peisong_wancheng == '完成'){
      var sql = "select jihua_mingxi from peisong_jihua where id=" + _this.data.id
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var mingxi = res.result.recordset[0].jihua_mingxi
          var where_sql = ""
          if(mingxi != ''){
            mingxi = JSON.parse(mingxi)
            for(var i=0; i<mingxi.length; i++){
              var this_dan = mingxi[i].label.content.split(" ")[0]
              if(where_sql == ''){
                where_sql = "where order_number ='" + this_dan + "' "
              }else{
                where_sql = where_sql + "or order_number ='" + this_dan + "' "
              }
            }
            if(where_sql != ''){
              var sql = "update erqi_peisongdan set wancheng = '完成' " + where_sql
              wx.cloud.callFunction({
                name: 'sqlserver_huaqun',
                data: {
                  query: sql
                },
                success: res => {
                  console.log(res)
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
            }
          }
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
    }
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "update peisong_jihua set jihua_riqi='" + _this.data.jihua_riqi + "',jihua_name='" + _this.data.jihua_name + "',jihua_item='" + _this.data.jihua_item + "',songhuoyuan='" + _this.data.songhuoyuan + "',peisong_wancheng='" + _this.data.peisong_wancheng + "',mark='" + _this.data.mark + "' where id=" + _this.data.id  
      },
      success: res => {
        console.log(res)
        _this.setData({
          id:'',
          jihua_riqi:'',
          jihua_name:'',
          jihua_item:'',
          songhuoyuan:'',
          mark:'',
          peisong_wancheng:'',
        })
        _this.qxShow()
        var e = ['1900-01-01','2100-12-31','','']
         _this.tableShow(e)
        wx.showToast({
          title: '修改成功！',
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
  },

  del1:function(){
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "delete from peisong_jihua where id='" + _this.data.id + "'"
      },
      success: res => {
        _this.setData({
          id:'',
          jihua_riqi:'',
          jihua_name:'',
          jihua_item:'',
          songhuoyuan:'',
          mark:'',
          peisong_wancheng:'',
      })
        _this.qxShow()
        var e = ['1900-01-01','2100-12-31','','']
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
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      start_date:"",
      stop_date:"",
      id:'',
      jihua_riqi:'',
      jihua_name:'',
      jihua_item:'',
      songhuoyuan:'',
      mark:'',
      peisong_wancheng:'',
    })
  },

  choiceDate: function (e) {
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == ''){
      start_date = '1900-01-01'
    }
    if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    var e = [start_date, stop_date, _this.data.jihua_name, _this.data.songhuoyuan]
    _this.tableShow(e)
    _this.qxShow()
  },

  goto:function(){
    var _this = this
    var id = _this.data.id
    wx.navigateTo({
      url: '../peisong_jihua_xiangqing/peisong_jihua_xiangqing?userInfo=' + JSON.stringify(_this.data.userInfo) + '&id=' + id,
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
  var sign1 = "-";
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
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }
