// pages/Location/Location.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden1:true,
    jinhuo:0,
    backhidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that=this
 
    if (options.jinhuo != ""){

      that.setData({
        jinhuo: options.jinhuo
      })
    }
    
    const db = wx.cloud.database()
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi 

    var _openid = wx.getStorageSync('openid').openid;
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select * from yh_jinxiaocun_jinhuofang where finduser = '" + finduser + "' and gongsi = '" + gongsi + "'"
      },
      success(res) {
        console.log("成功", res)
        that.setData({
          all: res.result
        })
      }, fail(res) {
        console.log("失败", res)

      }
    });
    // db.collection("Yh_JinXiaoCun_jinhuofang").where({
    //   gongsi: gongsi,
    //   finduser: finduser
    // }).get({
    //   success: res => {
    //     console.log(res.data)
    //     that.setData({
    //       all: res.data
    //     })
    //   }
    // })
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
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi

    var _openid = wx.getStorageSync('openid').openid;
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select * from yh_jinxiaocun_jinhuofang where finduser = '" + finduser + "' and gongsi = '" + gongsi + "'"
      },
      success(res) {
        console.log("成功", res)
        that.setData({
          all: res.result
        })
      }, fail(res) {
        console.log("失败", res)

      }
    });
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
input1:function(e){
  var beizhu = e.detail.value
  console.log(beizhu)
  this.setData({
    beizhu:beizhu 
  })
},
  input2: function (e) {
    var lianxifangshi = e.detail.value
    console.log(lianxifangshi)
    this.setData({
      lianxifangshi: lianxifangshi
    })
  },
  input3: function (e) {
    var lianxidizhi = e.detail.value
    console.log(lianxidizhi)
    this.setData({
      lianxidizhi: lianxidizhi
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tianjia:function(){
    var that=this;
    that.setData({
      hidden1:!that.data.hidden1,
      backhidden: false
    })


  },
  quedingjinhuo:function(){
    var that=this
    var beizhu=that.data.beizhu
    var lianxifangshi=that.data.lianxifangshi
    var lianxidizhi=that.data.lianxidizhi 
    console.log (beizhu)
    console.log(lianxifangshi)
    console.log(lianxidizhi)
    if (beizhu!=null || lianxifangshi!=null){
    const db = wx.cloud.database()
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi 
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "insert Yh_JinXiaoCun_jinhuofang (finduser,gongsi,beizhu,lianxifangshi,lianxidizhi) VALUES('" + finduser + "','" + gongsi + "','" + beizhu + "','" + lianxifangshi + "','" + lianxidizhi + "')"
          // sql:"insert yh_jinxiaocun_mingxi(cpname)values('1122')"
        },
        success(res) {
          console.log("成功", res)
          wx.showToast({
            title: '添加成功',
          })
        }, fail(res) {
          console.log("失败", res)
          
        }
//     db.collection("Yh_JinXiaoCun_jinhuofang").add({
//       data:{
//         gongsi: gongsi,
//         finduser: finduser,
//         beizhu: beizhu,
//         lianxifangshi: lianxifangshi,
//         lianxidizhi: lianxidizhi
//       },
//       success (res){
//        wx.showToast({
//        title: '添加成功',
// })
      // }
    })

    }
that.setData({
  
  hidden1: !that.data.hidden1,
  backhidden: true
})
    //  that.onLoad()
  },

  sp_Close: function(e){
    var that = this
    that.setData({
      backhidden: true,
      hidden1: !that.data.hidden1
    })

  },
  jin: function (e){
    var that=this
   
    var id = e.currentTarget.dataset.id
  console.log(id)

    if (that.data.jinhuo==1){
      wx.setStorageSync('jinhuofang', id)
      wx.navigateBack({
        url: '../time/time?id='+id
})

  }
  },
 
  
})