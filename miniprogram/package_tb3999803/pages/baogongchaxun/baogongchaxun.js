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
    list: [],
    title: [{
        text: "月份",
        width: "250rpx",
        columnName: "rq",
        type: "text",
        isupd: true
      },{
        text: "工序",
        width: "250rpx",
        columnName: "wczt",
        type: "text",
        isupd: true
      },{
        text: "工序员",
        width: "250rpx",
        columnName: "bgry",
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
    sql="select id,month(rq) as rq,wczt,bgry,sl from xiaoxiguanli where month(rq) = '" + e[0] + "' and wczt like '%" + e[1] + "%' and  bgry like '%" + e[2] + "%'"
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
      wczt: '',
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
