
Page({

  /**
   * 页面的初始数据
   */
  xlShow:false,
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  xgShow2: false,
  cxShow: false,
  data: {
    list: [],
    title: [
      {
        text: "订单号",
        width: "250rpx",
        columnName: "ddh",
        type: "text",
        isupd: true
      },{
        text: "客户名称",
        width: "250rpx",
        columnName: "khmc",
        type: "text",
        isupd: true
      },{
        text: "终端用户",
        width: "250rpx",
        columnName: "zdyh",
        type: "text",
        isupd: true
      },{
        text: "订单金额",
        width: "250rpx",
        columnName: "ddje",
        type: "text",
        isupd: true
      },{
        text: "工序",
        width: "250rpx",
        columnName: "gx",
        type: "text",
        isupd: true
      },{
        text: "完成状态",
        width: "250rpx",
        columnName: "wczt",
        type: "text",
        isupd: true
      },{
        text: "报工人员",
        width: "250rpx",
        columnName: "bgry",
        type: "text",
        isupd: true
      },{
        text: "日期",
        width: "250rpx",
        columnName: "rq",
        type: "text",
        isupd: true
      }
    ],
    ddh: '',
    khmc :'',
    zdyh: '',
    ddje: '',
    gx: '',
    wczt: '',
    bgry: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo: userInfo,
    })
    var e = ['']
    _this.tableShow(e)
  },

  

  bindPickerChange: function (e) {
    var _this = this
    var column_name = e.target.dataset.column_name
    var list_name = e.target.dataset.list_name
    console.log(_this.data[list_name][e.detail.value])
    _this.setData({
      [column_name]: _this.data[list_name][e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    _this.tableShow(e)
    var sql = ""
      sql = "select ddh,khmc,zdyh,ddje,gx,wczt,bgry,rq from xiaoxiguanli" 
    
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        console.log(list)
        _this.setData({
          list: list,
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
      },
      // choiceDate: function (e) {
      //   //e.preventDefault(); 
      //   this.setData({
      //     [e.target.dataset.column_name]: e.detail.value
      //   })
      //   console.log(e.detail.value)
      // },
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      xgShow2: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  xiala_open:function(){
    var _this = this
    _this.setData({
      xlShow: true
    })
  },

  // select1: function (e) {
  //   var _this = this
  //   if (e.type == "select") {
  //     var new_val = e.detail.name
  //     _this.setData({
  //       xlShow: false,
  //       this_value:new_val
  //     })
  //   } else if (e.type == "close") {
  //     _this.setData({
  //       xlShow: false,
  //     })
  //   }
  // },

  // onInput: function (e) {
  //   var _this = this
  //   let column = e.currentTarget.dataset.column
  //   _this.setData({
  //     currentDate: e.detail,
  //     [column]: e.detail.value
  //   })
  // },

  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  // entering: function () {
  //   var _this = this
  //   _this.setData({
  //     cxShow: true,
  //     ddh: "",
  //     khmc: "",
  //     zdyh: "",
  //     ddje: "",
  //     gx: "",
  //     wczt: "",
  //     bgry: "",
  //     rq: "",
  //     stop_date: "",
  //   })
  // },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },



  sel1: function () {
    var _this = this
    var e = ['']
    _this.tableShow(e)
    _this.qxShow()
  },

  sel1: function () {
    var _this = this
    var rq = _this.data.rq
    var stop_date = _this.data.stop_date
    if (rq == '') {
      rq = '1900-01-01'
    }
    if (stop_date == '') {
      stop_date = '2100-12-31'
    }
    var e = [_this.data.ddh,_this.data.khmc,_this.data.zdyh,_this.data.ddje,_this.data.gx, _this.data.wczt,_this.data.bgry,rq, stop_date]
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

function getTime(){
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth()+1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth()+1);
  var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
  return year+"-"+month+"-"+day
}

function delCloudFile(fileId){
  var fileIds = [];
  fileIds.push(fileId);
  wx.cloud.deleteFile({
    fileList: fileIds,
    success: res => {
      console.log(res.fileList);
    },
    fail : console.error
  })
}