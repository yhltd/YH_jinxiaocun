// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        url: "../../images/rili.png",
        text: "考勤表",
        lianjie: "../../packageA/pages/1kaoqin/kaoqin",
        index: 0
      },
      {
        url: "../../images/shezhi.png",
        text: "配置表",
        index: 1,
        lianjie: "../../packageA/pages/1peizhi/index",
      },
      {
        url: "../../images/kaoqinjilu.png",
        text: "考勤记录",
        index: 2,
        lianjie: "../../packageA/pages/1kaoqinjilu/kaoqinjilu",
      },
      {
        url: "../../images/gerenxinxi.png",
        text: "个人信息",
        index: 3,
        lianjie: "../../packageA/pages/1renyuanjibenxinxi/index",

      },
      {
        url: "../../images/renyuanxinxiguanli.png",
        text: "人员信息管理",
        index: 4,
        lianjie: "../../packageA/pages/1renyuanxinxiguanli/renyuanxinxiguanli",
      },
      {
        url: "../../images/gongzimingxi.png",

        text: "工资明细",
        index: 5,
        lianjie: "../../packageA/pages/1gongzimingxi/gongzimingxi",
      },
      {
        url: "../../images/bumenhuizong.png",
        text: "部门汇总",
        index: 6,
        lianjie: "../../packageA/pages/1bumenhuizong/index",
      },
      {
        url: "../../images/gerensuodeshui.png",
        text: "个人所得税",
        index: 7,
        lianjie: "../../packageA/pages/1gerensuodeshui/gerensuodeshui"
      },
      {

        url: "../../images/baopan.png",
        text: "报盘",
        index: 8,
        lianjie: "../../packageA/pages/1baopan/baopan"
      },
      {

        url: "../../images/baoshui.png",
        text: "报税",
        index: 9,
        lianjie: "../../packageA/pages/1baoshui/index"
      },
      {

        url: "../../images/shebao.png",
        text: "社保",
        index: 10,
        lianjie: "../../packageA/pages/1shebaohuizong/index"
      },
      {
        url: "../../images/gongzitiao.png",
        text: "工资条",
        index: 11,
        lianjie: "../../packageA/pages/1gongzitiao/gongzitiao"
      }
    ]
  },
  submit: function(e) {
    var that = this
    var idx = e.currentTarget.dataset.index;
    wx.showToast({
      title:'页面跳转中',
      icon:'none'
    })
    wx.navigateTo({
      url: that.data.list[idx].lianjie + '?index=' + idx,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '人资管理系统'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})