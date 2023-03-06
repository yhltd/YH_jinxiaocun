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

    id:'',
    D: '',
    E: '',
    F: '',
    G: '',
    H: '',
    I: '',
    J: '',
    K: '',
    L: '',
    M: '',
    N: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    _this.tableShow()
  },

  tableShow: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data: {
        query: "select * from paiban_mingxi"
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
      H: _this.data.list[e.currentTarget.dataset.index].H, 
      I: _this.data.list[e.currentTarget.dataset.index].I, 
      J: _this.data.list[e.currentTarget.dataset.index].J, 
      K: _this.data.list[e.currentTarget.dataset.index].K, 
      L: _this.data.list[e.currentTarget.dataset.index].L, 
      M: _this.data.list[e.currentTarget.dataset.index].M, 
      N: _this.data.list[e.currentTarget.dataset.index].N, 
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
      H: '',
      I: '',
      J: '',
      K: '',
      L: '',
      M: '',
      N: '',
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
        query: "update paiban_mingxi set D='" + _this.data.D + "',E='" + _this.data.E + "',F='" + _this.data.F + "',G='" + _this.data.G + "',H='" + _this.data.H + "',I='" + _this.data.I + "',J='" + _this.data.J + "',K='" + _this.data.K + "',L='" + _this.data.L + "',M='" + _this.data.M + "',N='" + _this.data.N + "' where id=" + _this.data.id  
      },
      success: res => {
        _this.setData({
            id:'',
            D: '',
            E: '',
            F: '',
            G: '',
            H: '',
            I: '',
            J: '',
            K: '',
            L: '',
            M: '',
            N: '',
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
          query: "delete from peizhi where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            D: '',
            E: '',
            F: '',
            G: '',
            H: '',
            I: '',
            J: '',
            K: '',
            L: '',
            M: '',
            N: '',
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

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      id:'',
      D: '',
      E: '',
      F: '',
      G: '',
      H: '',
      I: '',
      J: '',
      K: '',
      L: '',
      M: '',
      N: '',
    })
  },

  choiceDate: function (e) {
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

