// package_huaqun/page/ddchakan/ddchakan.js
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
        text: "客户名称",
        width: "250rpx",
        columnName: "khmc",
        type: "text",
        isupd: true
      },
      {
        text: "下单日期",
        width: "250rpx",
        columnName: "xdrq",
        type: "text",
        isupd: true
      },
      {
        text: "单据编号",
        width: "250rpx",
        columnName: "djbh",
        type: "text",
        isupd: true
      },
      {
        text: "送货地址",
        width: "250rpx",
        columnName: "shouhuo",
        type: "text",
        isupd: true
      },
      {
        text: "联系电话",
        width: "250rpx",
        columnName: "lxdh",
        type: "text",
        isupd: true
      },
      {
        text: "送货方式",
        width: "250rpx",
        columnName: "shfs",
        type: "text",
        isupd: true
      },
      {
        text: "安装地址",
        width: "250rpx",
        columnName: "azdz",
        type: "text",
        isupd: true
      },
      {
        text: "订单号",
        width: "250rpx",
        columnName: "ddh",
        type: "text",
        isupd: true
      },
    ],
    djbh:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
      wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select distinct ddh,xdrq,djbh,shouhuo,lxdh,shfs,azdz,khmc from lightbelt "
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



  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select distinct khmc,xdrq,djbh,shouhuo,lxdh,shfs,azdz,ddh from lightbelt where khmc like '%"+  e[0] +"%' and ddh like '%"+  e[1] +"%'"
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
    var djbh=[]
    djbh.push( _this.data.list[e.currentTarget.dataset.index].djbh)
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      khmc: _this.data.list[e.currentTarget.dataset.index].khmc, 
      xdrq: _this.data.list[e.currentTarget.dataset.index].xdrq,
      djbh: _this.data.list[e.currentTarget.dataset.index].djbh,
      shouhuo: _this.data.list[e.currentTarget.dataset.index].shouhuo,
      lxdh: _this.data.list[e.currentTarget.dataset.index].lxdh,
      shfs: _this.data.list[e.currentTarget.dataset.index].shfs,
      azdz: _this.data.list[e.currentTarget.dataset.index].azdz,
      ddh: _this.data.list[e.currentTarget.dataset.index].ddh,
      djbh:djbh,
      xgShow:true,
    })
    console.log(djbh)
  },

  

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },
  
  del1:function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "delete from lightbelt where ddh='"+ _this.data.ddh +"'"
        },
        success: res => {
          _this.setData({
            id:'',
            khmc: '', 
            xdrq: '',
            djbh: '',
            shouhuo: '',
            lxdh: '',
            shfs: '',
            azdz: '',
            ddh: '',
          })
          _this.qxShow()
          var e = ['','']
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
      khmc:"",
      ddh:"",
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  cha1:function(){
    var _this=this

    wx.navigateTo({
      url: "../ddchakanxiangqing/ddchakanxiangqing?djbh="+JSON.stringify(_this.data.djbh)
    })
    _this.qxShow()
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.khmc,_this.data.ddh]
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

