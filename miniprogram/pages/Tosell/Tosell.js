// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    szzhi: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    var szzhi = null;
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    // db.collection("Yh_JinXiaoCun_mingxi").where({
    //   finduser: finduser,
    //   gongsi: gongsi
    // }).get({
    //   success:res=>{
    //     that.setData({
    //       szzhi:res.data
    //     })
    //   }
    // })

    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "SELECT *,date_format(yh_jinxiaocun_mingxi.shijian,'%Y-%m-%d') as time,yh_jinxiaocun_jichuziliao.mark1 as mark1 from yh_jinxiaocun_mingxi LEFT JOIN yh_jinxiaocun_jichuziliao ON yh_jinxiaocun_mingxi.cpname = yh_jinxiaocun_jichuziliao.`name` where yh_jinxiaocun_mingxi.gs_name = '" + gongsi + "'"
      },
      success(res) {
        that.setData({
          szzhi: res.result
        })
        console.log(that.data.szzhi)
      },
      fail(res) {
        console.log("失败", res)

      }
    });

    // const [rows, fields] = await connection.execute('SELECT * from yh_jinxiaocun_mingxi')
    // console.log("jieguo:")
    // console.log(rows)
    // that.setData({
    //   szzhi: rows
    // })
    // return rows;
  },


  xixi: function(e) {
    if (e.detail.value == "") {
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "SELECT *,date_format(yh_jinxiaocun_mingxi.shijian,'%Y-%m-%d') as time,yh_jinxiaocun_jichuziliao.mark1 as mark1 from yh_jinxiaocun_mingxi LEFT JOIN yh_jinxiaocun_jichuziliao ON yh_jinxiaocun_mingxi.cpname = yh_jinxiaocun_jichuziliao.`name` where yh_jinxiaocun_mingxi.gs_name = '" + gongsi + "'"
        },
        success(res) {
          that.setData({
            szzhi: res.result
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
          sql: "SELECT *,date_format(yh_jinxiaocun_mingxi.shijian,'%Y-%m-%d') as time,yh_jinxiaocun_jichuziliao.mark1 as mark1 from yh_jinxiaocun_mingxi LEFT JOIN yh_jinxiaocun_jichuziliao ON yh_jinxiaocun_mingxi.cpname = yh_jinxiaocun_jichuziliao.`name` where yh_jinxiaocun_mingxi.gs_name = '" + gongsi + "'and yh_jinxiaocun_mingxi.cpname like '%" + e.detail.value + "%'"
        },
        success(res) {
          that.setData({
            szzhi: res.result
          })
          console.log(that.data.szzhi)
        },
        fail(res) {
          console.log("失败", res)

        }
      });
      // db.collection("Yh_JinXiaoCun_mingxi").where({      
      //     finduser: finduser,
      //     gongsi: gongsi,
      //     cpname: db.RegExp({
      //       regexp: e.detail.value,    
      //     options: 'i',   
      //     })    
      // }).get({
      //   success: res => {
      //     that.setData({
      //       szzhi: res.data
      //     })
      //   }
      // })

    }

  },

  xixi2: function(e) {
    if (e.detail.value == "") {
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "SELECT *,date_format(yh_jinxiaocun_mingxi.shijian,'%Y-%m-%d') as time,yh_jinxiaocun_jichuziliao.mark1 as mark1 from yh_jinxiaocun_mingxi LEFT JOIN yh_jinxiaocun_jichuziliao ON yh_jinxiaocun_mingxi.cpname = yh_jinxiaocun_jichuziliao.`name` where yh_jinxiaocun_mingxi.gs_name = '" + gongsi + "'"
        },
        success(res) {
          that.setData({
            szzhi: res.result
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
          sql: "SELECT *,date_format(yh_jinxiaocun_mingxi.shijian,'%Y-%m-%d') as time,yh_jinxiaocun_jichuziliao.mark1 as mark1 from yh_jinxiaocun_mingxi LEFT JOIN yh_jinxiaocun_jichuziliao ON yh_jinxiaocun_mingxi.cpname = yh_jinxiaocun_jichuziliao.`name` where yh_jinxiaocun_mingxi.gs_name = '" + gongsi + "'and yh_jinxiaocun_mingxi.shou_h like '%" + e.detail.value + "%'"
        },
        success(res) {
          that.setData({
            szzhi: res.result
          })
          console.log(that.data.szzhi)
        },
        fail(res) {
          console.log("失败", res)

        }
      });
      // db.collection("Yh_JinXiaoCun_mingxi").where({      
      //     finduser: finduser,
      //     gongsi: gongsi,
      //     cpname: db.RegExp({
      //       regexp: e.detail.value,    
      //     options: 'i',   
      //     })    
      // }).get({
      //   success: res => {
      //     that.setData({
      //       szzhi: res.data
      //     })
      //   }
      // })

    }

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
  shanchu: function(e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    var uid = e.currentTarget.dataset.uid;
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "sqlConnection",
            data: {
              sql: "DELETE FROM yh_jinxiaocun_mingxi where _id = '" + uid + "'"
            },
            success: res=> {
              that.onLoad()
            },
            fail: res=> {
              console.log("失败", res)
            }
          });
        } else if (res.cancel) {

          return false;
        }

      }
    })


  },

  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.头部可根据商品名称、供应商或客户进行出入库明细查询。\n2.长按数据可进行删除。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  xiugai: function(e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    // wx.cloud.callFunction({
    //   name: "sqlConnection",
    //   data: {
    //     sql: "UPdat yh_jinxiaocun_mingxi set  where sp_dm='" + that.data.szzhi[id].sp_dm + "'"
    //   },
    //   success(res) {
    //     // that.setData({
    //     //   szzhi: res.result
    //     // }
    //     // )
    //     console.log
    //     // console.log(that.data.szzhi)
    //   }, fail(res) {
    //     console.log("失败", res)

    //   }
    // });
    // db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).update({
    //   data: {


    //   }
    // })

  }
  
})