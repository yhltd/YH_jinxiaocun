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
    list: [],
    title: [{
        text: "明细id",
        width: "250rpx",
        columnName: "Thedetail_id",
        type: "text",
        isupd: true
      },
      {
        text: "客户id",
        width: "250rpx",
        columnName: "Customer_id",
        type: "text",
        isupd: true
      },
      {
        text: "产品名称",
        width: "250rpx",
        columnName: "NameofProduct",
        type: "text",
        isupd: true
      },
      {
        text: "单位",
        width: "250rpx",
        columnName: "unit",
        type: "text",
        isupd: true
      },
      {
        text: "单价",
        width: "250rpx",
        columnName: "Theunitprice",
        type: "text",
        isupd: true
      },
    ],
   
    id:'',
    Thedetail_id: '', 
    Customer_id: '',
    NameofProduct:'',
    unit: '',
    Theunitprice:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "select * from DetailsofProducts"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list:list,
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



  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "select * from DetailsofProducts where NameofProduct like '%" + e[0] + "%' "
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
      NameofProduct: _this.data.list[e.currentTarget.dataset.index].NameofProduct, 
      unit: _this.data.list[e.currentTarget.dataset.index].unit,
      Theunitprice: _this.data.list[e.currentTarget.dataset.index].Theunitprice,
      xgShow:true,
    })
  },
  
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      NameofProduct: '', 
      unit: '',
      Theunitprice:'',
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
      name: 'sqlserver_yiwa',
      data: {
        query: "update DetailsofProducts set Theunitprice='" + _this.data.Theunitprice + "' where id=" + _this.data.id
      },
      success: res => {
        _this.setData({
            id:'',
            NameofProduct: '', 
            unit: '',
            Theunitprice:'',
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
      [e.target.dataset.NameofProduct]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.NameofProduct]
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
