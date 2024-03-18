// package_huaqun/page/shows/shows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    active: 0,
    showList: [{
        text: "消息通知",
        url: "../xiaoxitongzhi/xiaoxitongzhi"
      },
      {
        text: "订单付款",
        url: "../dingdanfukuan/dingdanfukuan"
      },
      {
        text: "扫码报工",
        url: "../saomabaogong/saomabaogong"
      },
      {
        text: "生产调度",
        url: "../shengchandiaodu/shengchandiaodu"
      },
      {
        text: "账号管理",
        url: "../zhanghaoguanli/zhanghaoguanli"
      }
    ]
  },


  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var text = _this.data.showList[index].text
    console.log(_this.data.userInfo.power)
    var userInfo = _this.data.userInfo
    var panduan = true
    if(userInfo.quanxian == '客户'){
      if(index >= 2){
        panduan = false
      }
    }
    if(userInfo.quanxian == '工序员'){
      if(index == 4){
        panduan = false
      }
    }
    if(panduan){
      if (url != '') {
        wx.navigateTo({
          url: url + "?userInfo=" + JSON.stringify(_this.data.userInfo)
        })
      }
    }else{
      wx.showToast({
        title: '无权限,请联系管理员',
        icon: 'none',
      })
    }
  },

  saoma: function (e) {
    var _this = this;
    var userInfo=_this.data.userInfo
    if (_this.data.userInfo.quanxian == '客户'){
      wx.showToast({
        title: '没有权限!',
        icon: 'none'
      })
      return;
    }
    
    wx.navigateTo({
      url: "../saomabaogong/saomabaogong" + "?userInfo=" + JSON.stringify(_this.data.userInfo)+"type=saoma"
    })
  },

  onChange: function (event) {
    var _this = this;
    console.log(_this.data.userInfo.power)
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../wode/wode?userInfo=' + JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../chanpin/chanpin?userInfo=' + JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: '../lianxi/lianxi?userInfo=' + JSON.stringify(_this.data.userInfo)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var gongxu = ''
    if (userInfo.peiliao == '是'){
      gongxu = gongxu + " 配料"
    }
    if (userInfo.kailiao == '是'){
      gongxu = gongxu + " 开料"
    }
    if (userInfo.fengbian == '是'){
      gongxu = gongxu + " 封边"
    }
    if (userInfo.paikong == '是'){
      gongxu = gongxu + " 排孔"
    }
    if (userInfo.xiantiao == '是'){
      gongxu = gongxu + " 线条"
    }
    if (userInfo.fumo == '是'){
      gongxu = gongxu + " 覆膜"
    }
    if (userInfo.shougong == '是'){
      gongxu = gongxu + " 手工"
    }
    if (userInfo.wujin == '是'){
      gongxu = gongxu + " 五金"
    }
    if (userInfo.baozhuang == '是'){
      gongxu = gongxu + " 包装"
    }
    if (userInfo.ruku == '是'){
      gongxu = gongxu + " 入库"
    }
    if (userInfo.chuku == '是'){
      gongxu = gongxu + " 出库"
    }
    _this.setData({
      userInfo: userInfo,
      gongxu: gongxu,
    })
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