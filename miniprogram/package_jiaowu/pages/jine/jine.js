// miniprogram/packageP/page/index/index.js
const app = getApp();
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
  ],
    list: [],
    isdis:'',
    handle:true,
    renyuan_list: [],
    active: 1,
    showList: [
      
      {
        text: "缴费记录",
        url: "../jiaofei/jiaofei"
      },
      
      {
        text: "收支明细",
        url: "../shouzhi/shouzhi"
      },
      {
        text: "欠费学员",
        url: "../qianfeixueyuan/qianfeixueyuan"
      },
      {
        text: "教师工资",
        url: "../jiaoshigongzi/jiaoshigongzi"
      },
      
      {
        text: "账号管理",
        url: "../zhgl/zhgl"
      },
      {
        text: "考勤表",
        url: "../kaoqinbiao/kaoqinbiao"
      },
      {
        text: "权限",
        url: "../quanxian/quanxian"
      },
      
      // {
      //   text: "工作时间",
      //   url: "../PZ_GongZuoShiJian/PZ_GongZuoShiJian"
      // },
      // {
      //   text: "BOM",
      //   url: "../PZ_Bom/PZ_Bom"
      // },
      // {
      //   text: "账号管理",
      //   url: "../ZhangHaoGuanLi/ZhangHaoGuanLi"
      // },
      // {
      //   text: "数据空间",
      //   url: ""
      // },
    ]
  },
  getSwiperIndex(e){
    let currentIndex = e.detail.current
    this.setData({
        swiperIndex:currentIndex
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo
    })
  },

  hid_view: function () {
    var _this = this
    _this.setData({
      handle: true
    })
  },

  onChange: function (event) {
    var _this = this;
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../shows/shows?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    }else if (event.detail == 1) {
      wx.redirectTo({
        url: '../jine/jine?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } 
    // else if (event.detail == 1) {
    //   wx.redirectTo({
    //     url: '../DingDan/DingDan'
    //   })
    // } else if (event.detail == 2) {
    //   wx.redirectTo({
    //     url: '../PaiChan/PaiChan'
    //   })
    // } else if (event.detail == 3) {
    //   wx.redirectTo({
    //     url: '../HuiZong/HuiZong'
    //   })
    // }
  },

  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var text = _this.data.showList[index].text
    
    if(url != ''){
      wx.navigateTo({
        url: url + "?userInfo=" + JSON.stringify(_this.data.userInfo)
      })
    }
    
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

    wx.stopPullDownRefresh();
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