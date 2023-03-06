// package_huaqun/page/canzhao/canzhao.js
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
    list_A:[],
    list_B:[],
    list_pai: [],
    name_list:[],
    title: [{
        text: "日期",
        width: "350rpx",
        columnName: "D",
        type: "text",
        isupd: true
      },
      {
        text: "星期",
        width: "350rpx",
        columnName: "E",
        type: "text",
        isupd: true
      },
      {
        text: "值班A",
        width: "350rpx",
        columnName: "F",
        type: "text",
        isupd: true
      },
      {
        text: "值班B",
        width: "350rpx",
        columnName: "G",
        type: "text",
        isupd: true
      },
      {
        text: "加强A",
        width: "350rpx",
        columnName: "H",
        type: "text",
        isupd: true
      },
      {
        text: "加强B",
        width: "350rpx",
        columnName: "I",
        type: "text",
        isupd: true
      },
      {
        text: "九加",
        width: "350rpx",
        columnName: "J",
        type: "text",
        isupd: true
      },
      {
        text: "早班",
        width: "350rpx",
        columnName: "K",
        type: "text",
        isupd: true
      },
      {
        text: "正常上班1",
        width: "350rpx",
        columnName: "L",
        type: "text",
        isupd: true
      },
      {
        text: "正常上班2",
        width: "350rpx",
        columnName: "M",
        type: "text",
        isupd: true
      },
      {
        text: "正常上班3",
        width: "350rpx",
        columnName: "N",
        type: "text",
        isupd: true
      }
    ],

    this_date: '',
    lunci: '',
    A_1A: '',
    A_2A: '',
    A_3A: '',
    A_1B: '',
    A_2B: '',
    A_3B: '',
    A_1C: '',
    A_2C: '',
    A_3C: '',
    B_1A: '',
    B_2A: '',
    B_3A: '',
    B_1B: '',
    B_2B: '',
    B_3B: '',
    B_1C: '',
    B_2C: '',
    B_3C: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this

    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data: {
        query: "select * from paiban_A;select * from paiban_B;select C from login;"
      },
      success: res => {
        console.log(res)
        var list_A = res.result.recordsets[0]
        var list_B = res.result.recordsets[1]
        var list = res.result.recordsets[2]
        var name_list = []
        for(var i=0; i<list.length; i++){
          if(list[i].C != ''){
            name_list.push(list[i].C)
          }
        }
        _this.setData({
          list_A,
          list_B,
          name_list,
          list:[]
        })
        console.log(list_A)
        console.log(list_B)
        console.log(name_list)
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

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      this_date: '',
      lunci: '',
      A_1A: '',
      A_2A: '',
      A_3A: '',
      A_1B: '',
      A_2B: '',
      A_3B: '',
      A_1C: '',
      A_2C: '',
      A_3C: '',
      B_1A: '',
      B_2A: '',
      B_3A: '',
      B_1B: '',
      B_2B: '',
      B_3B: '',
      B_1C: '',
      B_2C: '',
      B_3C: '',
    })
  },

  add1: function(){
    var _this = this
    if(_this.data.this_date == ''){
      wx.showToast({
        title: '请选择开始日期！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.lunci == ''){
      wx.showToast({
        title: '请填写排班轮次！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.A_1A == '' || _this.data.A_2A == '' || _this.data.A_3A == '' || _this.data.A_1B == '' || _this.data.A_2B == '' || _this.data.A_3B == '' || _this.data.A_1C == '' || _this.data.A_2C == '' || _this.data.A_3C == '' || _this.data.B_1A == '' || _this.data.B_2A == '' || _this.data.B_3A == '' || _this.data.B_1B == '' || _this.data.B_2B == '' || _this.data.B_3B == '' || _this.data.B_1C == '' || _this.data.B_2C == '' || _this.data.B_3C == ''){
      wx.showToast({
        title: '选择人员数量不足！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    var start_date = _this.data.this_date
    var rq = start_date.split("-")
    var start_date = rq[0] + "/" + rq[1] + "/" + rq[2]
    var stop_date = new Date(rq[0], rq[1] - 1, parseInt(rq[2], 10) + parseInt(_this.data.lunci*18 - 1, 10))
    var yy = stop_date.getFullYear()
    var mm = stop_date.getMonth() + 1
    var dd = stop_date.getDate()
    stop_date = yy + "/" + mm + "/" + dd
    console.log(start_date) 
    console.log(stop_date)

    var sql = "select * from paiban_mingxi where convert(date,D) >= convert(date,'" + start_date + "') and convert(date,D) <= convert(date,'" + stop_date + "')"
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data: {
        query: sql
      },
      success: res => {
        console.log(res.result.recordset)
        var list = res.result.recordset
        if(list.length > 0){
          wx.showToast({
            title: '已有包含此时间段的排班信息！',
            icon: 'none',
            duration: 3000
          })
          return;
        }
        var A_list = _this.data.list_A
        var B_list = _this.data.list_B
        for(var i=0; i<B_list.length; i++){
          for(let j in B_list[i]){
            if(A_list[i][j] == '1A'){
              A_list[i][j] = _this.data.A_1A
            }
            if(A_list[i][j] == '1B'){
              A_list[i][j] = _this.data.A_1B
            }
            if(A_list[i][j] == '1C'){
              A_list[i][j] = _this.data.A_1C
            }
            if(A_list[i][j] == '2A'){
              A_list[i][j] = _this.data.A_2A
            }
            if(A_list[i][j] == '2B'){
              A_list[i][j] = _this.data.A_2B
            }
            if(A_list[i][j] == '2C'){
              A_list[i][j] = _this.data.A_2C
            }
            if(A_list[i][j] == '3A'){
              A_list[i][j] = _this.data.A_3A
            }
            if(A_list[i][j] == '3B'){
              A_list[i][j] = _this.data.A_3B
            }
            if(A_list[i][j] == '3C'){
              A_list[i][j] = _this.data.A_3C
            }
          }
        }
        for(var i=0; i<B_list.length; i++){
          for(let j in B_list[i]){
            if(B_list[i][j] == '1A'){
              B_list[i][j] = _this.data.B_1A
            }
            if(B_list[i][j] == '1B'){
              B_list[i][j] = _this.data.B_1B
            }
            if(B_list[i][j] == '1C'){
              B_list[i][j] = _this.data.B_1C
            }
            if(B_list[i][j] == '2A'){
              B_list[i][j] = _this.data.B_2A
            }
            if(B_list[i][j] == '2B'){
              B_list[i][j] = _this.data.B_2B
            }
            if(B_list[i][j] == '2C'){
              B_list[i][j] = _this.data.B_2C
            }
            if(B_list[i][j] == '3A'){
              B_list[i][j] = _this.data.B_3A
            }
            if(B_list[i][j] == '3B'){
              B_list[i][j] = _this.data.B_3B
            }
            if(B_list[i][j] == '3C'){
              B_list[i][j] = _this.data.B_3C
            }
          }
        }
        console.log(A_list)
        console.log(B_list)

        var this_list = []
        var this_day = 1
        for(i=1; i<=_this.data.lunci*18; i++){
          var this_date = new Date(rq[0], rq[1] - 1, parseInt(rq[2], 10) + parseInt(i - 1, 10))
          _this.get_week(this_date)
          var yy = this_date.getFullYear()
          var mm = this_date.getMonth() + 1
          var dd = this_date.getDate()
          this_date = yy + "/" + mm + "/" + dd
          var this_week = _this.data.this_week
          if(this_day % 2 != 0){
            var this_xiabiao = parseInt(this_day / 2 - 1)
            A_list[this_xiabiao].id = this_date
            A_list[this_xiabiao].C = this_week
            this_list.push({
              D:this_date,
              E:this_week,
              F:A_list[this_xiabiao].D,
              G:A_list[this_xiabiao].E,
              H:A_list[this_xiabiao].F,
              I:A_list[this_xiabiao].G,
              J:A_list[this_xiabiao].H,
              K:A_list[this_xiabiao].I,
              L:A_list[this_xiabiao].J,
              M:A_list[this_xiabiao].K,
              N:A_list[this_xiabiao].L,
            })
          }else{
            var this_xiabiao = parseInt(this_day / 2 - 1)
            B_list[this_xiabiao].id = this_date
            B_list[this_xiabiao].C = this_week
            this_list.push({
              D:this_date,
              E:this_week,
              F:B_list[this_xiabiao].D,
              G:B_list[this_xiabiao].E,
              H:B_list[this_xiabiao].F,
              I:B_list[this_xiabiao].G,
              J:B_list[this_xiabiao].H,
              K:B_list[this_xiabiao].I,
              L:B_list[this_xiabiao].J,
              M:B_list[this_xiabiao].K,
              N:B_list[this_xiabiao].L,
            })
          }
          this_day = this_day +1
          if(this_day > 18){
            this_day = 1
          }
        }
        console.log(this_list)
        _this.setData({
          list:this_list
        })
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
  chear_all:function(){
    var _this = this
    _this.onLoad()
  },
  save:function(){
    var _this = this
    var list = _this.data.list
    if(list.length == 0){
      wx.showToast({
        title: '请先生成排班计划！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var sql1 = "insert into paiban_mingxi(D,E,F,G,H,I,J,K,L,M,N) values "
    var sql2 = ""
    for(var i=0; i<list.length; i++){
      if(sql2 == ''){
        sql2 = "('" + list[i].D + "','" + list[i].E + "','" + list[i].F + "','" + list[i].G + "','" + list[i].H + "','" + list[i].I + "','" + list[i].J + "','" + list[i].K + "','" + list[i].L + "','" + list[i].M + "','" + list[i].N + "')"
      }else{
        sql2 = sql2 + ",('" + list[i].D + "','" + list[i].E + "','" + list[i].F + "','" + list[i].G + "','" + list[i].H + "','" + list[i].I + "','" + list[i].J + "','" + list[i].K + "','" + list[i].L + "','" + list[i].M + "','" + list[i].N + "')"
      }
    }
    var sql = sql1 + sql2
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data: {
        query: sql
      },
      success: res => {
        _this.qxShow()
        wx.showToast({
          title: '排班成功！请到排班明细表中查看明细。',
          icon: 'none',
          duration: 3000
        })
        _this.onLoad()
      },
      err: res => {
        console.log("错误!")
        _this.setData({
          onOff: true,
        })
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
        _this.setData({
          onOff: true,
        })
      }
    })
  },

  bindPickerChange1: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column_name
    console.log(_this.data.name_list[e.detail.value])
    _this.setData({
      [column]: _this.data.name_list[e.detail.value]
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

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  get_week: function(dates){
    var _this = this
    let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    let date = new Date(dates);
    date.setDate(date.getDate());
    let day = date.getDay();
    _this.setData({
      this_week:show_day[day]
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



