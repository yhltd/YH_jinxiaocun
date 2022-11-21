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
        text: "铝框型号",
        width: "250rpx",
        columnName: "lkxh",
        type: "text",
        isupd: true
      },
      {
        text: "长",
        width: "250rpx",
        columnName: "chang",
        type: "text",
        isupd: true
      },
      {
        text: "宽",
        width: "250rpx",
        columnName: "kuan",
        type: "text",
        isupd: true
      },
      
    ],

    id:'',
    lkxh: '', 
    chang: '',
    kuan: '',
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    //   wx.cloud.callFunction({
    //   name: 'sqlserver_huaqun',
    //   data: {
    //     query: "select lkxh,isnull(chang,'') as chang,isnull(kuan,'') as kuan from refertable"
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
        query: "select id,lkxh,isnull(chang,'') as chang ,isnull(kuan,'') as kuan from refertable where lkxh like '%" + e[0] + "%'"
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
      lkxh: _this.data.list[e.currentTarget.dataset.index].lkxh, 
      chang: _this.data.list[e.currentTarget.dataset.index].chang,
      kuan: _this.data.list[e.currentTarget.dataset.index].kuan,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      lkxh: '', 
      chang: '',
      kuan: '',
    })
  },
  add1: function(){
    var _this = this

    if(_this.data.lkxh == ''){
      wx.showToast({
        title: '请输铝框型号！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.chang == ''){
      wx.showToast({
        title: '请输入长！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.kuan == ''){
      wx.showToast({
        title: '请输入宽！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    

      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "insert into refertable(lkxh,chang,kuan) values('" + _this.data.lkxh + "','" + _this.data.chang + "','" + _this.data.kuan + "')"
        },
        success: res => {
          _this.setData({
            id:'',
            lkxh: '', 
            chang: '',
            kuan: '',
            
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
        query: "update refertable set lkxh='" + _this.data.lkxh + "',chang='" + _this.data.chang + "',kuan='" + _this.data.kuan + "' where id=" + _this.data.id  
      },
      success: res => {
        _this.setData({
            id:'',
            lkxh: '', 
            chang: '',
            kuan: '',
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
          query: "delete from refertable where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            lkxh: '', 
            chang: '',
            kuan: '',
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
      customer:"",
      leibie:"",
      area:"",
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
    var e = [_this.data.lkxh]
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

