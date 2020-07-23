// miniprogram/packageC/pages/c_kaizhixiangmu/c_kaizhixiangmu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],
    
    list : [

    ],
    titil : [
      {text:"序号",width:"100rpx"},
      {text:"经营收入",width:"400rpx"},
      {text:"经营支出",width:"400rpx"},
      {text:"筹资收入",width:"400rpx"},
      {text:"筹资支出",width:"400rpx"},
      {text:"投资收入",width:"400rpx"},
      {text:"投资支出 ",width:"400rpx"},
      {text:"凭证字",width:"100rpx"}
    ],
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
        query: "select * from FinancingExpenditure where company = '"+userInfo.company+"';select * from FinancingIncome where company = '"+userInfo.company+"';select * from InvestmentExpenditure where company = '"+userInfo.company+"';select * from InvestmentIncome where company = '"+userInfo.company+"';select * from ManagementExpenditure where company = '"+userInfo.company+"';select * from ManagementIncome where company = '"+userInfo.company+"';select word from VoucherSummary where company = '"+userInfo.company+"' GROUP BY word"
      },
      success: res => {
        _this.setData({
          list : _this.handle(res.result.recordsets)
        })
        wx.hideLoading({
          success: (res) => {},
        })
        
      },
      err: res => {
        console.log("错误!")
      },
      fail : res=>{
        wx.showToast({
          title: '请求失败！',
          icon : 'none'
        })
        console.log("请求失败！")
      }
    })
  },

  handle : function(list){
    var index = 0
    var newList = []
    for(var i=0;i<list.length;i++){

      var length = 0
      if(list[i].length>length){
        length = list[i].length
        index = i
      }
      if(i==list.length-1){
        var data_list = []
        for(var x=0;list[index].length;x++){
          data_list.push({"ROW_ID" : x})
        }
        list.unshift(data_list)
      }
    }
    console.log(newList)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
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