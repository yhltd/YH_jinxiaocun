// 100lie_page/pages/shows/shows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    name:'',
    user:'',
    showList: [{
      text: "工作台",
      url: '../work_bench/work_bench'
    },
    {
      text: "工作台权限设置",
      url: '../companyfix/companyfix'
    },
    {
      text: "部门权限设置",
      url: '../management/management'
    },
    {
      text: "公司数据分析",
      url: "../company_chart/company_chart"
    },
  ]
  },

  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo,
    })
  },

onChange: function (event) {
  var _this = this;
  if (event.detail == 0) {
    wx.redirectTo({
      url: '../shows/shows?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  } else if (event.detail == 1) {
    wx.redirectTo({
      url: '../shows2/shows2?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  } else if (event.detail == 2) {
    wx.redirectTo({
      url: '../shows3/shows3?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  } else if (event.detail == 3) {
    wx.redirectTo({
      url: '../loginpeople/loginpeople?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  }
}, 

go: function (e) {
  var _this = this;
  var index = e.currentTarget.dataset.index;
  var url = _this.data.showList[index].url
  if(url != ''){
    wx.navigateTo({
      url: url + "?userInfo="+JSON.stringify(_this.data.userInfo)
    })
  }
},

})