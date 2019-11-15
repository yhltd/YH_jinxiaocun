// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    szzhi:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
   const db = wx.cloud.database()
   var app = getApp();
    var szzhi=null;
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
      data:{
        sql: "SELECT * from yh_jinxiaocun_mingxi where zh_name='" + finduser+"' and gs_name = '" + gongsi+"'"
      },
      success(res) {     
            that.setData({
              szzhi: res.result
    } 
    )      
        console.log(that.data.szzhi)
      }, fail(res) {
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


  xixi: function (e) {
    if(e.detail.value==""){
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "SELECT * from yh_jinxiaocun_mingxi where zh_name='" + finduser + "' and gs_name = '" + gongsi + "'"
        },
        success(res) {
          that.setData({
            szzhi: res.result
          }
          )
          console.log(that.data.szzhi)
        }, fail(res) {
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

    }else{
 var that = this
    const db = wx.cloud.database()
    var app = getApp();
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "SELECT * from yh_jinxiaocun_mingxi where zh_name='" + finduser + "' and gs_name = '" + gongsi + "',cpname='" + e.detail.value  +"'"
        },
        success(res) {
          that.setData({
            szzhi: res.result
          }
          )
          console.log(that.data.szzhi)
        }, fail(res) {
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

  },
  shanchu: function (e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    console.log(id)
    console.log(that.data.szzhi)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "sqlConnection",
            data: {
              sql: "DELETE  FROM yh_jinxiaocun_mingxi  where orderid='" + that.data.szzhi[id].orderid+"'"
            },
            success(res) {
              // that.setData({
              //   szzhi: res.result
              // }
              // )
              console.log
              // console.log(that.data.szzhi)
            }, fail(res) {
              console.log("失败", res)

            }
          });
          // db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).remove({
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
  xiugai: function (e) {
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