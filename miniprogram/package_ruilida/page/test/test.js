// miniprogram/pages/frmbasedata/frmbasedata.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listAll: [],
    filename:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var that = this;
    const db = wx.cloud.database();
    var listAll = [];
    db.collection('SY_LHDataAnalysis_canshu').where({

        name: app.globalData.finduser
      })
      .get({
        success(res) {

          listAll.push(res.data)
          that.setData({
              // finduser: app.globalData.finduser,
              listAll: listAll[0]
            },
            console.log(listAll)
          )
        }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  searchBox: function(e) {
    const that = this;
    var uname, canshu1, canshu2;
    canshu1 = e.detail.value.inputPwd,
      canshu2 = e.detail.value.inputcnashuer,
      uname = app.globalData.finduser
    const db = wx.cloud.database();

    db.collection('SY_LHDataAnalysis_canshu').where({

        name: uname
      })
      .get({
        success(res) {
          console.log(res.data[0]._id)
          db.collection('SY_LHDataAnalysis_canshu').doc(res.data[0]._id).update({
            // data 传入需要局部更新的数据
            data: {
              canshu: canshu1,
              usetype: '1',
              canshu2: canshu2
            },
            success: res => {
              wx.showToast({
                  title: '更新完成',
                }),
                wx.navigateBack({

                })
            },
          })
        }

      })


  },
  wx_up() {
    var myThis = this;
    var filename;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        const cloudPath = 'SY_LHDataAnalysis/txt/data' + tempFilePaths[0].match(/\.[^.]+?$/)[0]

        wx.cloud.uploadFile({        
          cloudPath,
          filePath: tempFilePaths[0],
          name: 'data',
          success(res) {
            myThis.setData({
              statusCode: res.statusCode,
              filename: tempFilePaths[0]
            })
          }
        },
          console.log(tempFilePaths[0])
        )
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})