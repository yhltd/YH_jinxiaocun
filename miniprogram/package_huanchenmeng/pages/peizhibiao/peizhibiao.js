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
        columnName: "C",
        type: "text",
        isupd: true
      },
      {
        text: "计划类别",
        width: "350rpx",
        columnName: "D",
        type: "text",
        isupd: true
      }
      
    ],

    id:'',
    C: '', 
    D: '',
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
        query: "select id,isnull(C,'') as C,isnull(D,'') as D from peizhi"
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
      C: _this.data.list[e.currentTarget.dataset.index].C, 
      D: _this.data.list[e.currentTarget.dataset.index].D, 
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      C:'',
      D: '', 
    })
  },
  add1: function(){
    var _this = this

      wx.cloud.callFunction({
        name: 'sqlserver_huanchenmeng',
        data: {
          query: "insert into peizhi(C,D) values('" + _this.data.C + "','" + _this.data.D + "')"
        },
        success: res => {
          _this.setData({
            id:'',
            C:'',
            D: '', 
            
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
        query: "update peizhi set C='" + _this.data.C + "',D='" + _this.data.D + "' where id=" + _this.data.id  
      },
      success: res => {
        _this.setData({
            id:'',
            C: '', 
            D: '',
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
            C:'',
            D: '', 
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
      C:'',
      D: '', 
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

