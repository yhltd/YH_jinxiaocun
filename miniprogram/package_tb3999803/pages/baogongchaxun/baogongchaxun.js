Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  tjShow: false,
  xgShow: false,
  cxShow: false,
  data: {
    rq_type: ['1','2','3','4','5','6','7','8','9','10','11','12'],
    gx_type: [],
    bgry_type: [],
    list: [],
    title: [{
        text: "月份",
        width: "250rpx",
        columnName: "rq",
        type: "text",
        isupd: true
      },{
        text: "工序员",
        width: "250rpx",
        columnName: "bgry",
        type: "text",
        isupd: true
      },{
        text: "工序",
        width: "250rpx",
        columnName: "wczt",
        type: "text",
        isupd: true
      },{
        text: "报工数量",
        width: "250rpx",
        columnName: "sl",
        type: "text",
        isupd: true
      },
    ],
    id: '',
    rq: '',
    wczt: '',
    bgry: '',
    sl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var e = ['', '', '',]
    _this.tableShow(e)
    _this.xlShow1()
    _this.xlShow2()
  },

  bindPickerChange: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.rq_type[e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    // sql="select id,month(rq) as rq,wczt,bgry,sl from xiaoxiguanli where month(rq) = '" + e[0] + "' and wczt like '%" + e[1] + "%' and  bgry like '%" + e[2] + "%'"
    sql="WITH RankedRecords AS (SELECT id,gx,bgry,MONTH(rq) AS rq_month,sl,ROW_NUMBER() OVER (PARTITION BY id, wczt ORDER BY rq DESC) AS rn FROM xiaoxiguanli WHERE MONTH(rq) = '" + e[0] + "' AND wczt like '%" + e[1] + "%' AND bgry LIKE '%" + e[2] + "%')SELECT gx as wczt,bgry,rq_month AS rq,SUM(CASE WHEN sl <> '' THEN CONVERT(int, sl) ELSE 0 END) AS sl FROM RankedRecords WHERE rn = 1 GROUP BY gx,bgry,rq_month"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
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

  xlShow1: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: "select DISTINCT gx from xiaoxiguanli where gx is not null and gx <> ''"
      },
      success: res => {
        console.log(res)
        var gx_type = []
        var list = res.result.recordset
        
        console.log(list)
        for(var i=0; i<list.length; i++){
          gx_type.push(list[i].gx)
        }
        _this.setData({
          gx_type:gx_type
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

  xlShow2: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: "select DISTINCT bgry from xiaoxiguanli where bgry is not null and bgry <> ''"
      },
      success: res => {
        console.log(res)
        var bgry_type = []
        var list = res.result.recordset
        
        console.log(list)
        for(var i=0; i<list.length; i++){
          bgry_type.push(list[i].bgry)
        }
        _this.setData({
          bgry_type:bgry_type
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

bindPickerChange1: function(e){
  var _this = this
  var column = e.currentTarget.dataset.column_name
  console.log(_this.data.gx_type[e.detail.value])
  _this.setData({
    [column]: _this.data.gx_type[e.detail.value]
  })
},

bindPickerChange2: function(e){
  var _this = this
  var column = e.currentTarget.dataset.column_name
  console.log(_this.data.bgry_type[e.detail.value])
  _this.setData({
    [column]: _this.data.bgry_type[e.detail.value]
  })
},

  qxShow: function () {
    var _this = this
    _this.setData({
      cxshow: false,
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      cxShow: false,
      xgShow: false,
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      rq: '',
      gx: '',
      bgry: '',
    })
  },

  sel1: function () {
    var _this = this
    var e = [_this.data.rq,_this.data.wczt,_this.data.bgry,]
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

function dateStrChangeTimeTamp(dateStr){
  dateStr = dateStr.substring(0,19);
  dateStr = dateStr.replace(/-/g,'/');
  var timeTamp = new Date(dateStr).getTime();
  document.write(timesTamp);
}
