var app = getApp()
Page({
  data: {
    list: [
      {
        url: "../images/rukuguanli.png",
        text: "入库",
        lianjie: "../time/time",
        index: 0
      },
      {
        url: "../images/chuku.png",
        text: "出库",
        index: 1,
        lianjie: "../remittance/remittance",
      },
      {
        url: "../images/qichukucun.png",
        text: "期初数",
        index: 2,
        lianjie: "../procurement/procurement",
      },
      {
        url: "../images/shoufamingxi.png",
        text: "明细",
        index: 3,
        lianjie: "../Tosell/Tosell",

      },
      {
        url: "../images/jinxiaocun.png",
        text: "进销存",
        index: 4,
        lianjie: "../kucun/kucun",
      },
      {
        url: "../images/gys.png",

        text: "进货方资料",
        index: 5,
        lianjie: "../Location/Location",
      },
      {
        url: "../images/kehu.png",
        text: "客户资料",
        index: 6,
        lianjie: "../contract/contract",
      },
      {
        url: "../images/shangpinguanli.png",
        text: "基础资料",
        index: 7,
        lianjie: "../collection/collection"
      },
      {
        url: "../images/biji.png",
        text: "笔记",
        index: 8,
        lianjie: "../biji/biji"
      },
      {
        url: "../images/shangpin_jinchu.png",
        text: "商品进出查询",
        index: 9,
        lianjie: "../shangpin_jinchu/shangpin_jinchu"
      },
      {
        url: "../images/kehu_chuhuo.png",
        text: "客户/供应商查询",
        index: 10,
        lianjie: "../kehu_chuhuo/kehu_chuhuo"
      },
      {
        url: "../images/danju_dayin.png",
        text: "单据打印",
        index: 11,
        lianjie: "../out_in_print/out_in_print"
      },
      // {
        
      //   url: "../../images/anQun_03.jpg",
      //   text: "统计报表",
      //   index: 8,
      //   lianjie: "../dayin/dayin"
      // },
      // {
      //   url: "../../images/hao_03.jpg",
      //   text: "破损数量查询",
      //   index: 8,
      //   lianjie: "../broken/broken"
      // },
      // {
      //   url: "../../images/appa_10.jpg",
      //   text: "抽样数量查询",
      //   index: 9,
      //   lianjie: "../sampling/sampling"
      // }
    ]
  },
  remove: function (e) {
    var that = this
    var idx = e.currentTarget.dataset.index;
    console.log(that.data.list[idx].lianjie + '?index=' + idx)
      wx.navigateTo({
        url: that.data.list[idx].lianjie + '?index=' + idx,
      })

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  onShow: function () {
    // if (app.globalData.gongsi == null || app.globalData.finduser == null) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '用户未登录！',
    //   })
    //   wx.navigateTo({
    //     url: '../login/login'
    //   })
    // }
    console.log(wx.getStorageSync("JianYan"))
    if (wx.getStorageSync("JianYan") == 1) {
      wx.showModal({
        title: '提示',
        content: '暂无权限',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../logs/logs',
            })
          }
        }
      })
    }
  },
  onReady: function () {
    wx.removeStorage({
      key: 'optiontime',
      success: function (res) {

      }
    })
    // 
    wx.removeStorage({
      key: 'optiontime1',
      success: function (res) {

      }
    })
    // 
    wx.removeStorage({
      key: 'optiontime2',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime3',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime4',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime5',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime6',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime7',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime8',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num',
      success: function (res) {

      }
    })
    // 
    wx.removeStorage({
      key: 'num0',
      success: function (res) {

      }
    })
    // 
    wx.removeStorage({
      key: 'num1',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num2',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num3',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num4',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num5',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num6',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num7',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num8',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'numq',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'allsleect',
      success: function (res) {

      }
    })
    //

    wx.removeStorage({
      key: 'numt',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'allsleect1',
      success: function (res) {

      }
    })
   
  },
})