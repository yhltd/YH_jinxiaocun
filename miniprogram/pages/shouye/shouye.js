Page({
  data: {
    list: [
      {
        url: "../../images/zhuangyu_03.jpg",
        text: "入库",
        lianjie: "../time/time",
        index: 0
      },
      {
        url: "../../images/fuhui_03.jpg",
        text: "出库",
        index: 1,
        lianjie: "../remittance/remittance",
      },
      {
        url: "../../images/caigou_03.jpg",
        text: "期初数",
        index: 2,
        lianjie: "../procurement/procurement",
      },
      {
        url: "../../images/jibiexiao_03.jpg",
        text: "明细",
        index: 3,
        lianjie: "../Tosell/Tosell",

      },
      {
        url: "../../images/login.png",
        text: "进销存",
        index: 4,
        lianjie: "../kucun/kucun",
      },
      {
        url: "../../images/sun_03.jpg",

        text: "进货方资料",
        index: 5,
        lianjie: "../Location/Location",
      },
      {
        url: "../../images/sepal_03.jpg",
        text: "客户资料",
        index: 6,
        lianjie: "../contract/contract",
      },
      {
        url: "../../images/appa_10.jpg",
        text: "商品查询",
        index: 7,
        lianjie: "../collection/collection"
      },
      {
        url: "../../images/anQun_03.jpg",
        text: "统计报表",
        index: 8,
        lianjie: "../dayin/dayin"
      },
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
    if (idx == 8) {
      wx.navigateTo({
        url: that.data.list[idx].lianjie,
      })
    } else {
      console.log(that.data.list[idx].lianjie + '?index=' + idx)
      wx.navigateTo({
        url: that.data.list[idx].lianjie + '?index=' + idx,
      })
    }

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