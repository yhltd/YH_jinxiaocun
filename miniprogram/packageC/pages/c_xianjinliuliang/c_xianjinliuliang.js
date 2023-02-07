// miniprogram/packageC/pages/c_xianjinliuliang/c_xianjinliuliang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],
    month : 7,
    sum_year : 0,
    sum_month : 0,
    initHidView :false,
    chaxun_hidden:true,
    list : {},
    titil : [
      {text:"明细",width:"400rpx"},
      {text:"当月余额",width:"400rpx"},
      {text:"本年合计",width:"400rpx"},
    ],

    animationData_choice : []
  },

  


  init : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select expenditure,isnull((select sum(s.money) from VoucherSummary as s where company = '"+userInfo.company+"' and year(voucherDate) = year('"+_this.data.month+"'+'-01') and month(voucherDate) = month('"+_this.data.month+"'+'-01') and s.expenditure = v.expenditure),0) as money_month,isnull((select sum(s.money) from VoucherSummary as s where company = '"+userInfo.company+"' and year(voucherDate) = year(getdate()) and s.expenditure = v.expenditure),0) as money_year from VoucherSummary as v where company = '"+userInfo.company+"' GROUP BY expenditure"
      },
      success: res => {
        var list = res.result.recordset
        var sum_month = 0;
        var sum_year = 0
        if(list != undefined){
          for(let i=0;i<list.length;i++){
            sum_month+=list[i].money_month
            sum_year+=list[i].money_year
          }
          _this.setData({
            list,
            sum_month,
            sum_year
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      complete: res => {
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },


  showChoiceMonth1 : function(e){
    var _this = this;
    _this.setData({
      start_date: e.detail.value
    })
  },
  showChoiceMonth2 : function(e){
    var _this = this;
    _this.setData({
      stop_date: e.detail.value
    })
  },

  getMonth: function(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() > 8 ? date.getMonth()+1 : '0' + (date.getMonth()+1);
    return year + '-' + month;
  },

  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.点击左下角按钮，选择日期点击确定按钮后即可按日期查询。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  chaxun_show:function(){
    var _this = this
    _this.setData({
      chaxun_hidden:false,
      start_date:"",
      stop_date:"",
    })
  },

  chaxun_quxiao:function(){
    var _this = this
    _this.setData({
      chaxun_hidden:true
    })
  },

  select:function(e){
    var _this = this
    console.log(e.detail.value)
    var start_date = e.detail.value.start_date
    var stop_date = e.detail.value.stop_date
    if(start_date > stop_date){
      wx.showToast({
        title: '开始日期不能大于结束日期',
        icon:'none',
        duration: 2000//持续的时间
      })
      return
    }
    var start_nian = start_date.split('-')
    start_nian = start_nian[0]
    var stop_nian = stop_date.split('-')
    stop_nian = stop_nian[0]
    console.log(start_nian)
    console.log(stop_nian)
    if(start_nian != stop_nian){
      wx.showToast({
        title: '不允许跨年查询',
        icon:'none',
        duration: 2000//持续的时间
      })
      return
    }
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var userInfo = _this.data.userInfo;
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select expenditure,isnull((select sum(s.money) from VoucherSummary as s where company = '"+userInfo.company+"' and year(voucherDate) = year(convert(date,'"+ start_date +"')) and month(voucherDate) >= month(convert(date,'" + start_date + "')) and month(voucherDate) <= month(convert(date,'" + stop_date + "')) and s.expenditure = v.expenditure),0) as money_month,isnull((select sum(s.money) from VoucherSummary as s where company = '"+userInfo.company+"' and year(voucherDate) = year(convert(date,'" + start_date + "')) and s.expenditure = v.expenditure),0) as money_year from VoucherSummary as v where company = '"+userInfo.company+"' GROUP BY expenditure"
      },
      success: res => {
        var list = res.result.recordset
        var sum_month = 0;
        var sum_year = 0
        if(list != undefined){
          for(let i=0;i<list.length;i++){
            sum_month+=list[i].money_month
            sum_year+=list[i].money_year
          }
          _this.setData({
            list,
            sum_month,
            sum_year
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      complete: res => {
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
    _this.chaxun_quxiao()
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    _this.setData({
      month: _this.getMonth()
    })
    _this.init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})