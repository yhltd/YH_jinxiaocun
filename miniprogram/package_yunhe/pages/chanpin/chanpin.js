// pages/anli1/anli1.js
var app = getApp();
Page({

  data: {
    imageUrl: app.globalData.imageInfopath2,

  },
   compare: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },

  onChange: function (event) {
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../shouye/shouye'
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../xinxi/xinxi'
      })
    }else if (event.detail == 2) {
      wx.redirectTo({
        url: '../chanpin/chanpin'
      })
    }else if (event.detail == 3) {
      wx.redirectTo({
        url: '../yonghu/yonghu'
      })
    }
  },

  onLoad: function () {
    var that = this;
    var all = [];
    // var imagepath1 = app.globalData.imageInfopath + "" 
    // console.log(imagepath1)
    // that.setData({
    //   imageUrl: imagepath1
    // })
    const db = wx.cloud.database();
    db.collection('todos').get({
      success(res) {
        all.push(res.data)
        all[0].sort(that.compare("Sort_index"));//排序
        that.setData({
          all: res.data
        },
          console.log(all),
          // wx.setStorageSync('id', res.data[0]._id)
        )
        //循环取值
        // for (let i = 0; i < countResult; i++) {
        //   console.log(all[i])
        // }
        var countResult = all[0].length;
        //循环取值
        for (let i = 0; i < countResult; i++) {
          // oki
          
          console.log(all[0][i]._id)
        }
        wx.setStorageSync('countResult', countResult)
      }
    })
 
  }
})