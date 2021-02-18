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


  showChoiceMonth : function(e){
    var _this = this;
    _this.setData({
      month: e.detail.value
    })
    _this.init();
  },

  getMonth: function(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() > 8 ? date.getMonth()+1 : '0' + (date.getMonth()+1);
    return year + '-' + month;
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