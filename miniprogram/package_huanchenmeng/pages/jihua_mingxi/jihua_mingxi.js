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
        text: "计划类型",
        width: "350rpx",
        columnName: "D",
        type: "text",
        isupd: true
      },
      {
        text: "计划类别",
        width: "350rpx",
        columnName: "E",
        type: "text",
        isupd: true
      },
      {
        text: "计划名称",
        width: "350rpx",
        columnName: "F",
        type: "text",
        isupd: true
      },
      {
        text: "所属人员",
        width: "350rpx",
        columnName: "G",
        type: "text",
        isupd: true
      },
      {
        text: "截止时间",
        width: "350rpx",
        columnName: "H",
        type: "text",
        isupd: true
      },
      {
        text: "流程说明",
        width: "350rpx",
        columnName: "I",
        type: "text",
        isupd: true
      },
      {
        text: "是否完成",
        width: "350rpx",
        columnName: "J",
        type: "text",
        isupd: true
      },
      {
        text: "备注",
        width: "350rpx",
        columnName: "K",
        type: "text",
        isupd: true
      }
      
    ],

    wancheng_list:['是','否'],

    id:'',
    C: '', 
    D: '',
    E:'',
    F:'',
    G:'',
    H:'',
    I:'',
    J:'',
    K:'',
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
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data: {
        query: "select C from login;select id,isnull(C,'') as C,isnull(D,'') as D from peizhi"
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var list2 = res.result.recordsets[1]
        var leixing_list = []
        var leibie_list = []
        for(var i=0; i<list2.length; i++){
          if(list2[i].C != ''){
            leixing_list.push(list2[i].C)
          }
          if(list2[i].D != ''){
            leibie_list.push(list2[i].D)
          }
        }
        var name_list = []
        for(var i=0; i<list.length; i++){
          if(list[i].C != ''){
            name_list.push(list[i].C)
          }
        }
        if(_this.data.userInfo.G == '管理员'){
          _this.setData({
            name_list,
            leixing_list,
            leibie_list
          })
        }else{
          _this.setData({
            name_list:[_this.data.userInfo.C],
            leixing_list,
            leibie_list
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
    _this.tableShow()
  },

  tableShow: function () {
    var _this = this
    var sql = ""
    if(_this.data.userInfo.G == '管理员'){
      sql = "select jihua.id,isnull(jihua.D,'') as D,isnull(jihua.E,'') as E,isnull(jihua.F,'') as F,isnull(jihua.G,'') as G,isnull(jihua.H,'') as H,isnull(jihua.I,'') as I,isnull(jihua.J,'') as J,isnull(jihua.K,'') as K,isnull(jihua_peizhi.F,'') as shuoming from jihua left join jihua_peizhi on jihua.D = jihua_peizhi.C and jihua.E = jihua_peizhi.D and jihua.F = jihua_peizhi.E order by convert(date,jihua.H)"
    }else{
      sql = "select jihua.id,isnull(jihua.D,'') as D,isnull(jihua.E,'') as E,isnull(jihua.F,'') as F,isnull(jihua.G,'') as G,isnull(jihua.H,'') as H,isnull(jihua.I,'') as I,isnull(jihua.J,'') as J,isnull(jihua.K,'') as K,isnull(jihua_peizhi.F,'') as shuoming from jihua left join jihua_peizhi on jihua.D = jihua_peizhi.C and jihua.E = jihua_peizhi.D and jihua.F = jihua_peizhi.E where jihua.G = '" + _this.data.userInfo.C + "' order by convert(date,jihua.H)"
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
        for(var i=0; i<list.length; i++){
          if(list[i].shuoming != '' && list[i].I == ''){
            list[i].I = list[i].shuoming
          }
        }
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

  bindPickerChange1: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column_name
    console.log(_this.data.leixing_list[e.detail.value])
    _this.setData({
      [column]: _this.data.leixing_list[e.detail.value]
    })
  },

  bindPickerChange2: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column_name
    console.log(_this.data.leibie_list[e.detail.value])
    _this.setData({
      [column]: _this.data.leibie_list[e.detail.value]
    })
  },

  bindPickerChange3: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column_name
    console.log(_this.data.name_list[e.detail.value])
    _this.setData({
      [column]: _this.data.name_list[e.detail.value]
    })
  },

  bindPickerChange4: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column_name
    console.log(_this.data.wancheng_list[e.detail.value])
    _this.setData({
      [column]: _this.data.wancheng_list[e.detail.value]
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
      H: _this.data.list[e.currentTarget.dataset.index].H, 
      I: _this.data.list[e.currentTarget.dataset.index].I, 
      J: _this.data.list[e.currentTarget.dataset.index].J, 
      K: _this.data.list[e.currentTarget.dataset.index].K, 
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      D: '',
      E:'',
      F:'',
      G:'',
      H:'',
      I:'',
      J:'',
      K:'',
    })
  },
  add1: function(){
    var _this = this

      wx.cloud.callFunction({
        name: 'sqlserver_huanchenmeng',
        data: {
          query: "insert into jihua(D,E,F,G,H,I,J,K) values('" + _this.data.D + "','" + _this.data.E + "','" + _this.data.F + "','" + _this.data.G + "','" + _this.data.H + "','" + _this.data.I + "','" + _this.data.J + "','" + _this.data.K + "')"
        },
        success: res => {
          _this.setData({
            id:'',
            D: '',
            E:'',
            F:'',
            G:'',
            H:'',
            I:'',
            J:'',
            K:'',
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
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data: {
        query: "update jihua set D='" + _this.data.D + "',E='" + _this.data.E + "',F='" + _this.data.F + "',G='" + _this.data.G + "',H='" + _this.data.H + "',I='" + _this.data.I + "',J='" + _this.data.J + "',K='" + _this.data.K + "' where id=" + _this.data.id  
      },
      success: res => {
        _this.setData({
            id:'',
            D: '',
            E:'',
            F:'',
            G:'',
            H:'',
            I:'',
            J:'',
            K:'',
        })
        _this.qxShow()
         _this.tableShow()

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
        name: 'sqlserver_huanchenmeng',
        data: {
          query: "delete from jihua where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            D: '',
            E:'',
            F:'',
            G:'',
            H:'',
            I:'',
            J:'',
            K:'',
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

  choiceDate: function (e) {
    //e.preventDefault(); 
    var this_date = e.detail.value.split("-")
    this_date = this_date[0] + "/" + this_date[1] + "/" + this_date[2]
    this.setData({
      [e.target.dataset.column_name]: this_date
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

