// package_huaqun/page/qtpeizhi/qtpeizhi.js
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
        text: "灯带型号",
        width: "210rpx",
        columnName: "ddxh",
        type: "text",
        isupd: true
      },
      {
        text: "400mm单价",
        width: "230rpx",
        columnName: "mmdj",
        type: "text",
        isupd: true
      },
      {
        text: "每100mm增加单价",
        width: "310rpx",
        columnName: "zjdj",
        type: "text",
        isupd: true
      },
      
    ],

    id:'',
    ddxh: '', 
    mmdj: '',
    zjdj: '',
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    //   wx.cloud.callFunction({
    //   name: 'sqlserver_huaqun',
    //   data: {
    //     query: "select ddxh,isnull(mmdj,'') as mmdj,isnull(zjdj,'') as zjdj from otherconfigurations"
    //   },
    //   success: res => {
    //     var list = res.result.recordset
    //     console.log(list)
    //     _this.setData({
    //       list: list
    //     })
    //     console.log(list)
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
    var e = ['']
    _this.tableShow(e)
  },



  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select id,ddxh,isnull(mmdj,'') as mmdj ,isnull(zjdj,'') as zjdj from otherconfigurations where ddxh like '%" + e[0] + "%'"
      },
      success: res => {
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
      ddxh: _this.data.list[e.currentTarget.dataset.index].ddxh, 
      mmdj: _this.data.list[e.currentTarget.dataset.index].mmdj,
      zjdj: _this.data.list[e.currentTarget.dataset.index].zjdj,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      ddxh: '', 
      mmdj: '',
      zjdj: '',
    })
  },
  add1: function(){
    var _this = this

    if(_this.data.ddxh == ''){
      wx.showToast({
        title: '灯带型号',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.mmdj == ''){
      wx.showToast({
        title: '400mm单价',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.zjdj == ''){
      wx.showToast({
        title: '每100mm增加单价',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    

      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "insert into otherconfigurations(ddxh,mmdj,zjdj) values('" + _this.data.ddxh + "','" + _this.data.mmdj + "','" + _this.data.zjdj + "')"
        },
        success: res => {
          _this.setData({
            id:'',
            ddxh: '', 
            mmdj: '',
            zjdj: '',
            
          })
          _this.qxShow()
          var e = ['']
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
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "update otherconfigurations set ddxh='" + _this.data.ddxh + "',mmdj='" + _this.data.mmdj + "',zjdj='" + _this.data.zjdj + "' where id=" + _this.data.id  
      },
      success: res => {
        _this.setData({
            id:'',
            ddxh: '', 
            mmdj: '',
            zjdj: '',
        })
        _this.qxShow()
        var e = ['']
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
          query: "delete from otherconfigurations where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            ddxh: '', 
            mmdj: '',
            zjdj: '',
          })
          _this.qxShow()
          var e = ['']
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
      id:'',
      ddxh: '', 
      mmdj: '',
      zjdj: '',
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.ddxh]
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

