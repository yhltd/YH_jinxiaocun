// pages/shangpinxuanze/shangpinxuanze.js
var app = getApp()
var jg
var sl
var dtid
var cpid
var cpjg = []
var cpsl = []
var szZhi = []
var zongjia
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jghide: "none",
    sl: [],
    jg: [],

    rkck: "选择商品"
  },

  select : function(e){
    var _this = this;
    var all = _this.data.all;
    for(let i = 0;i<all.length;i++){
      if(all[i].name.indexOf(e.detail.value)==-1){
        _this.setData({
          ["all["+i+"].isSelect"] : 1
        })
      }else{
        _this.setData({
          ["all["+i+"].isSelect"] : 0
        })
      }

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.init();

  },

  init: function(){
    var that = this
    that.setData({
      rkSum: 0,
      sl: [],
      jg: []
    })
    var all = []
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi

    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select *,0 as isSelect from yh_jinxiaocun_jichuziliao where zh_name = '" + finduser + "' and gs_name = '" + gongsi + "'"
      },
      success: res=> {
        that.setData({
          all: res.result,
        })
      },
      fail: res=> {
        console.log("失败", res)
      }
    });
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
    var that = this
    that.init();
    that.setData({
      rkSum: 0,
      sl: [],
      jg: []
    })
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
    var that = this
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 500
    })
    that.onLoad()
    that.onShow()
    wx.stopPullDownRefresh()
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

  },

  xixi: function(e) {
    console.log(e.detail.value)
    if (e.detail.value == "") {
      
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "SELECT * from yh_jinxiaocun_jichuziliao where zh_name='" + finduser + "' and gs_name = '" + gongsi + "'"
        },
        success(res) {
          that.setData({
            all: res.result
          })
          console.log(that.data.szzhi)
        },
        fail(res) {
          console.log("失败", res)

        }
      });
      // db.collection("Yh_JinXiaoCun_mingxi").where({
      //   finduser: finduser,
      //   gongsi: gongsi,

      // }).get({
      //   success: res => {
      //     that.setData({
      //       szzhi: res.data
      //     })
      //   }
      // })

    } else {
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "SELECT * from yh_jinxiaocun_jichuziliao where zh_name='" + finduser + "' and gs_name = '" + gongsi + "'and name like '%" + e.detail.value + "%'"
        },
        success(res) {
          that.setData({
            all: res.result
          })
          console.log(that.data.all)
        },
        fail(res) {
          console.log("失败", res)

        }
      });
    }
  },





  shanchu: function(e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    console.log(id)
    console.log(that.data.all)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "sqlConnection",
            data: {
              sql: "delete from Yh_JinXiaoCun_jichuziliao where sp_dm = '" + that.data.all[id].sp_dm + "'"
            },
            success(res) {
              console.log("成功", res)
              // that.setData({
              //     all: res.data,

              //   })
              // szZhi = 
            },
            fail(res) {
              console.log("失败", res)

            }
          });
          // db.collection("Yh_JinXiaoCun_chanpin").doc(that.data.all[id]._id).remove({
          //   success: console.log,
          //   fail: console.error,

          // })
          that.onLoad()
        } else if (res.cancel) {

          return false;
        }

      }
    })


  },
  jiahao1: function() {
    wx.navigateTo({
      url: '/pages/xinjianshangpin/xinjianshangpin',
    })

  },
  srJg: function(e) {
    var that = this
    dtid = e.target.dataset.id
    console.log(dtid)
    var _id = that.data.all[dtid].id
    console.log(_id)
    wx.navigateTo({
      url: '/pages/shangpinchazhao/shangpinchazhao?_id=' + _id,
    })
  },


})