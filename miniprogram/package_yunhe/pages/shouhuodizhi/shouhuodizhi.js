// pages/shouhuodizhi/shouhuodizhi.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const db = wx.cloud.database();
    var obj = wx.getStorageSync("openid")
    var openid = obj.openid;

    db.collection('dizhi').where({
      _openid: openid,
    })
      .get({
        success: res => {
         console.log(res.data)
         var dizhi=res.data[0].dizhi
          var xingming = res.data[0].xingming
          var shoujihaoma = res.data[0].shoujihaoma
         that.setData({
           dizhi: dizhi,
           xingming: xingming,
           shoujihaoma: shoujihaoma
         })
        }
        })
  },

  dizhi: function (e) {
    const that = this;
   var xingming = e.detail.value.xingming
    var shoujihaoma = e.detail.value.shoujihaoma
    var xindizhi = e.detail.value.xindizhi
    var obj = wx.getStorageSync("openid")
    var openid = obj.openid;
    
    const db = wx.cloud.database();
    db.collection('dizhi').where({
      _openid: openid,
    })
      .get({
        success: res => {
          console.log(res.data.id)
          db.collection('dizhi').doc(res.data.id).update({
      data: {
        dizhi: xindizhi,
        xingming:xingming,
        shoujihaoma: shoujihaoma
      },
      success: res => {
        
        wx.showToast({
          title: '修改成功',
        })
      },
    })

          if (res.data == "") {
    db.collection('dizhi').add({
      data: {
        dizhi: xindizhi,
        xingming: xingming,
        shoujihaoma: shoujihaoma
      },
        success: res => {

        wx.showToast({
          title: '修改成功',
                    })
                        },
                              })
       }
        }
      })
       }
})