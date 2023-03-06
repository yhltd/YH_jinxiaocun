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
    this_column:{
      '值班A':'F',
      '值班B':'G',
      '加强A':'H',
      '加强B':'I',
      '九加':'J',
      '早班':'K',
      '正常上班1':'L',
      '正常上班2':'M',
      '正常上班3':'N',
    },
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
    }
  ],

    id:'',
    D: '',
    E: '',
    F: '',
    G: '',
    start_date:'',
    stop_date:'',
    this_date:'',
    this_name:'',
    this_banci:'',
    name_list:[],
    banci_list:[],
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
    var e = [_this.data.userInfo.C,'1900/1/1','2100/12/31']
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data: {
        query: "select * from (select id,D,E,F,'值班A' as G from paiban_mingxi union all select id,D,E,G,'值班B' as G from paiban_mingxi union  all select id,D,E,H,'加强A' as G from paiban_mingxi union all select id,D,E,I,'加强B' as G from paiban_mingxi union all select id,D,E,J,'九加' as G from paiban_mingxi union all select id,D,E,K,'早班' as G from paiban_mingxi union all select id,D,E,L,'正常上班1' as G from paiban_mingxi union all select id,D,E,M,'正常上班2' as G from paiban_mingxi union all select id,D,E,N,'正常上班3' as G from paiban_mingxi) as putong where F = '" + e[0] + "' and convert(date,D) >= convert(date,'" + e[1] + "') and convert(date,D) <= convert(date,'" + e[2] + "') order by id,convert(date,D)"
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
      D: _this.data.list[e.currentTarget.dataset.index].D, 
      E: _this.data.list[e.currentTarget.dataset.index].E, 
      F: _this.data.list[e.currentTarget.dataset.index].F, 
      G: _this.data.list[e.currentTarget.dataset.index].G,
      this_date:'',
      this_name:'',
      this_banci:'',
      name_list:[],
      banci_list:[],
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      D: '',
      E: '',
      F: '',
      G: '',
      start_date:'',
      stop_date:'',
      name_list:[],
      banci_list:[],
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
    var e = [_this.data.userInfo.C,_this.data.start_date,_this.data.stop_date]
    _this.tableShow(e)
    _this.qxShow()
  },

  upd1:function(){
    var _this = this
    if(_this.data.this_date == ''){
      wx.showToast({
        title: '未选择日期！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.this_name == ''){
      wx.showToast({
        title: '未选择姓名！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.this_banci == ''){
      wx.showToast({
        title: '未选择班次！',
        icon: 'none'
      })
      return;
    }

    var yuan_column = _this.data.this_column[_this.data.G]
    var huan_column = _this.data.this_column[_this.data.this_banci]
    var sql = "update paiban_mingxi set " + yuan_column + " ='" + _this.data.this_name + "' where convert(date,D) = convert(date,'" + _this.data.D + "');"
    sql = sql & "update paiban_mingxi set " + huan_column + " ='" + _this.data.F + "' where convert(date,D) = convert(date,'" & _this.data.this_date & "');"
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data: {
        query: sql
      },
      success: res => {
        _this.setData({
            id:'',
            D: '',
            E: '',
            F: '',
            G: '',
            start_date:'',
            stop_date:'',
            this_date:'',
            this_name:'',
            this_banci:'',
            name_list:[],
            banci_list:[],
        })
        _this.qxShow()
        var e = [_this.data.userInfo.C,'1900/1/1','2100/12/31']
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

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      id:'',
      D: '',
      E: '',
      F: '',
      G: '',
      start_date:'',
      stop_date:'',
      this_date:'',
      this_name:'',
      this_banci:'',
      name_list:[],
      banci_list:[],
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
    _this.setData({
      banci_list:[]
    })
    var sql = "select * from paiban_mingxi where convert(date,D) = convert(date,'" + _this.data.this_date + "')"

    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        var banci_list = []
        if(list.length > 0){
          if(list[0].F == _this.data.this_name){
            banci_list.push('值班A')
          }
          if(list[0].G == _this.data.this_name){
            banci_list.push('值班B')
          }
          if(list[0].H == _this.data.this_name){
            banci_list.push('加强A')
          }
          if(list[0].I == _this.data.this_name){
            banci_list.push('加强B')
          }
          if(list[0].J == _this.data.this_name){
            banci_list.push('九加')
          }
          if(list[0].K == _this.data.this_name){
            banci_list.push('早班')
          }
          if(list[0].L == _this.data.this_name){
            banci_list.push('正常上班1')
          }
          if(list[0].M == _this.data.this_name){
            banci_list.push('正常上班2')
          }
          if(list[0].N == _this.data.this_name){
            banci_list.push('正常上班3')
          }
          _this.setData({
            banci_list
          })
        }
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

  bindPickerChange2: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column_name
    console.log(_this.data.banci_list[e.detail.value])
    _this.setData({
      [column]: _this.data.banci_list[e.detail.value]
    })
  },

  choiceDate: function (e) {
    var _this = this
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
    _this.setData({
      name_list:[],
      this_banci:[],
      this_name:'',
      this_banci:'',
    })
    var sql = "select DISTINCT F from (select id,D,E,F,'值班A' as G from paiban_mingxi union all select id,D,E,G,'值班B' as G from paiban_mingxi union  all select id,D,E,H,'加强A' as G from paiban_mingxi union all select id,D,E,I,'加强B' as G from paiban_mingxi union all select id,D,E,J,'九加' as G from paiban_mingxi union all select id,D,E,K,'早班' as G from paiban_mingxi union all select id,D,E,L,'正常上班1' as G from paiban_mingxi union all select id,D,E,M,'正常上班2' as G from paiban_mingxi union all select id,D,E,N,'正常上班3' as G from paiban_mingxi) as putong where F != '" + _this.data.userInfo.C + "' and convert(date,D) = convert(date,'" + e.detail.value + "') order by F"
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        if(list.length == 0){
          wx.showToast({
            title: '未读取到当日排班计划！',
            icon: 'none',
            duration: 3000
          })
          return;
        }
        var name_list = []
        for(var i=0; i<list.length; i++){
          if(list[i].F != ''){
            name_list.push(list[i].F)
          }
        }
        _this.setData({
          name_list
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

