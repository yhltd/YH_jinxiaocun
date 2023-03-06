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
    list: [],
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
      text: "姓名",
      width: "350rpx",
      columnName: "F",
      type: "text",
      isupd: true
    },
    {
      text: "班次",
      width: "350rpx",
      columnName: "G",
      type: "text",
      isupd: true
    },
    {
      text: "考勤",
      width: "350rpx",
      columnName: "H",
      type: "text",
      isupd: true
    },
    {
      text: "备注",
      width: "350rpx",
      columnName: "I",
      type: "text",
      isupd: true
    }
  ],

    id:'',
    D: '',
    E: '',
    F: '',
    G: '',
    H:'',
    I:'',
    kaoqin_list:['出勤','例假','病假','全天事假','非全天事假','补休','年休']
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
    _this.tableShow()
  },

  add1: function(){
    var _this = this
    if(_this.data.H == ''){
      wx.showToast({
        title: '未选择考勤！',
        icon: 'none'
      })
      return;
    }
      wx.cloud.callFunction({
        name: 'sqlserver_huanchenmeng',
        data: {
          query: "insert into kaoqin_mingxi(D,E,F,G,H,I) values('" + _this.data.D + "','" + _this.data.E + "','" + _this.data.F + "','" + _this.data.G + "','" + _this.data.H + "','" + _this.data.I + "')"
        },
        success: res => {
          _this.setData({
            id:'',
            D: '',
            E: '',
            F: '',
            G: '',
            H:'',
            I:'',
          })
          _this.qxShow()
          _this.tableShow()
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

  tableShow: function () {
    var _this = this
    var sql = ""
    if(_this.data.userInfo.G == '管理员'){
      sql = "select * from kaoqin_mingxi"
    }else{
      sql = "select * from kaoqin_mingxi where F='" + _this.data.userInfo.C + "'"
    }
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
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

  clickView:function(e){
    var _this = this
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      xgShow:true,
    })
  },

  del1:function(){
    var _this = this
    if(_this.data.userInfo.G != '管理员'){
      wx.showToast({
        title: '非管理员权限不允许删除！',
        icon: 'none'
      })
      return;
    }
      wx.cloud.callFunction({
        name: 'sqlserver_huanchenmeng',
        data: {
          query: "delete from kaoqin_mingxi where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
          })
          _this.qxShow()
          _this.tableShow()
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

  inquire: function () {
    var _this = this
    var this_date = new Date()
    var yy = this_date.getFullYear()
    var mm = this_date.getMonth() + 1
    var dd = this_date.getDate()
    this_date = yy + "/" + mm + "/" + dd
    console.log(this_date)

    var sql = "select * from (select id,D,E,F,'值班A' as G from paiban_mingxi union all select id,D,E,G,'值班B' as G from paiban_mingxi union  all select id,D,E,H,'加强A' as G from paiban_mingxi union all select id,D,E,I,'加强B' as G from paiban_mingxi union all select id,D,E,J,'九加' as G from paiban_mingxi union all select id,D,E,K,'早班' as G from paiban_mingxi union all select id,D,E,L,'正常上班1' as G from paiban_mingxi union all select id,D,E,M,'正常上班2' as G from paiban_mingxi union all select id,D,E,N,'正常上班3' as G from paiban_mingxi) as putong where F = '" + _this.data.userInfo.C + "' and convert(date,D) = convert(date,'" + this_date + "') order by id,convert(date,D);select * from kaoqin_mingxi where convert(date,D) = convert(date,'" + this_date + "') and F = '" + _this.data.userInfo.C + "';"
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var list2 = res.result.recordsets[1]
        console.log(list)
        console.log(list2)
        if(list.length == 0){
          wx.showToast({
            title: '当前用户今日无需考勤！',
            icon: 'none',
            duration: 3000
          })
          return;
        }
        if(list2.length > 0){
          wx.showToast({
            title: '当天已考勤，无需重复考勤！',
            icon: 'none',
            duration: 3000
          })
          return;
        }
        _this.setData({
          tjShow: true,
          D: list[0].D,
          E: list[0].E,
          F: list[0].F,
          G: list[0].G,
          H: '',
          I: '',
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

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  sel1:function(){
    var _this = this
    _this.tableShow()
    _this.qxShow()
  },

  bindPickerChange1: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column_name
    console.log(_this.data.kaoqin_list[e.detail.value])
    _this.setData({
      [column]: _this.data.kaoqin_list[e.detail.value]
    })
  },


  choiceDate: function (e) {
    var _this = this
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
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

