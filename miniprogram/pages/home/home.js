// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        url: "../../images/rili.png",
        text: "考勤表",
        lianjie: "../kaoqin/kaoqin",
        index: 0
      },
      {
        url: "../../images/shezhi.png",
        text: "配置表",
        index: 1,
        lianjie: "../peizhi/peizhi",
      },
      {
        url: "../../images/kaoqinjilu.png",
        text: "考勤记录",
        index: 2,
        lianjie: "../kaoqinjilu/kaoqinjilu",
      },
      {
        url: "../../images/gerenxinxi.png",
        text: "个人信息",
        index: 3,
        lianjie: "../gerenxinxi/gerenxinxi",

      },
      {
        url: "../../images/renyuanxinxiguanli.png",
        text: "人员信息管理",
        index: 4,
        lianjie: "../renyuanxinxiguanli/renyuanxinxiguanli",
      },
      {
        url: "../../images/gongzimingxi.png",

        text: "工资明细",
        index: 5,
        lianjie: "../gongzimingxi/gongzimingxi",
      },
      {
        url: "../../images/bumenhuizong.png",
        text: "部门汇总",
        index: 6,
        lianjie: "../bumenhuizong/bumenhuizong",
      },
      {
        url: "../../images/gerensuodeshui.png",
        text: "个人所得税",
        index: 7,
        lianjie: "../gerensuodeshui/gerensuodeshui"
      },
      {

        url: "../../images/baopan.png",
        text: "报盘",
        index: 8,
        lianjie: "../baopan/baopan"
      },
      {

        url: "../../images/baoshui.png",
        text: "报税",
        index: 9,
        lianjie: "../baoshui/baoshui"
      }, 
      {

        url: "../../images/shebao.png",
        text: "社保",
        index: 10,
        lianjie: "../shebao/shebao"
      },
       {
         url: "../../images/gongzitiao.png",
        text: "工资条",
        index: 11,
         lianjie: "../gongzitiao/gongzitiao"
      }
      ]
  },
  submit:function(e){
    var that = this
    var idx = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: that.data.list[idx].lianjie + '?index=' + idx,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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