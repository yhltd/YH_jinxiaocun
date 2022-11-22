Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    active:0,
    showList: [{
      text: "任务单（下派）-待接受",
      url: "../task_list/task_list"
    },{
      text: "任务单（下派）-进行中",
      url: "../task_list/task_list"
    },{
      text: "任务单（下派）-已完成",
      url: "../task_list/task_list"
    },{
      text: "任务单（下派）-已取消",
      url: "../task_list/task_list"
    },
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo,
    })
  },

  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    console.log(index)
    var picker_select = ''
    if(index == 0){
      picker_select = "待接受任务"
    }else if(index == 1){
      picker_select = "进行中任务"
    }else if(index == 2){
      picker_select = "已完成任务"
    }else if(index == 3){
      picker_select = "已取消任务"
    }
    wx.navigateTo({
      url: url + "?userInfo="+JSON.stringify(_this.data.userInfo) + "&picker_select=" + JSON.stringify(picker_select)
    })
  },

  onChange: function (event) {
    var _this = this;
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../index/index?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../wode/wode?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    }
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