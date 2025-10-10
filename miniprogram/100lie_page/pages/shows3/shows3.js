// 100lie_page/pages/shows/shows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImg: [
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/fenquan-lunbotu2.jpg",
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/lunbo-shouye1.jpg",
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/lunbo-shouye2.jpg"
  ],
  swiperIndex:0,//轮播图索引
  bgColor:[
      "linear-gradient(145deg, #477ead 0%, #cccccc 100%)",
      "linear-gradient(145deg, #dedede 0%, #142638 100%)",
      "linear-gradient(145deg, #679a5a 0%, #b5d6b9 100%);"
  ],// linear-gradient 渐变色需要四个颜色属性
    gongsi:'',
    name:'',
    user:'',
    showList: [{
      text: "工作台使用状态",
      url: '../userpeople/userpeople'
    },{
      text: "工作台公式设置",
      url: '../gongzuotaigongs/gongzuotaigongs'
    },
  ]
  },

  getSwiperIndex(e){
    let currentIndex = e.detail.current
    this.setData({
        swiperIndex:currentIndex
    })
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