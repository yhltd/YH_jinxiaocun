// pages/Location/Location.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden1: true,
    jinhuo: '',
    backhidden: true,
    updIndex: -1,
    isStock: false,
    beizhu:'',
    lianxifangshi:'',
    lianxidizhi:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this
    var relief = '';
    if (options.jinhuo != undefined) {
      relief = options.jinhuo
      that.setData({
        isStock: true
      })
    }
    if (relief != "") {
      that.setData({
        jinhuo: relief
      })
    }

    console.log(that.data.jinhuo)

    const db = wx.cloud.database()
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    var _openid = wx.getStorageSync('openid').openid;

    if(app.globalData.shujuku==0){

      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "select * from yh_jinxiaocun_jinhuofang where gongsi = '" + gongsi + "'"
        },
        success(res) {
          console.log("成功", res)
          that.setData({
            all: res.result
          })
        },
        fail(res) {
          console.log("失败", res)
        }
      });

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          querysql: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jinhuofang_mssql where gongsi = '" + gongsi + "'"
        },
        success(res) {
          console.log("成功", res)
          that.setData({
            all: res.result.recordset
          })
        },
        fail(res) {
          console.log("失败", res)
        }
      });
      
    }

    
  },

  xixi: function(e) {
    console.log(e.detail.value)
    if (e.detail.value == "") {
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi

      if(app.globalData.shujuku==0){

        wx.cloud.callFunction({
          name: "sqlConnection",
          data: {
            sql: "select * from yh_jinxiaocun_jinhuofang where gongsi = '" + gongsi + "'"
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

      }else if(app.globalData.shujuku == 1){

        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jinhuofang_mssql where gongsi = '" + gongsi + "'"
          },
          success(res) {
            that.setData({
              all: res.result.recordset
            })
            console.log(that.data.szzhi)
          },
          fail(res) {
            console.log("失败", res)
  
          }
        });
        
      }

    
    } else {
      var that = this
      const db = wx.cloud.database()
      var app = getApp();
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi

      if(app.globalData.shujuku==0){

        wx.cloud.callFunction({
          name: "sqlConnection",
          data: {
            sql: "select * from yh_jinxiaocun_jinhuofang where gongsi = '" + gongsi + "' and beizhu like '%" + e.detail.value + "%'"
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

      }else if(app.globalData.shujuku == 1){

        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jinhuofang_mssql where gongsi = '" + gongsi + "' and beizhu like '%" + e.detail.value + "%'"
          },
          success(res) {
            that.setData({
              all:res.result.recordset
            })
            console.log(that.data.all)
          },
          fail(res) {
            console.log("失败", res)
          }
        });
        
      }


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
    var that = this;
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi

    var _openid = wx.getStorageSync('openid').openid;

    if(app.globalData.shujuku==0){

      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "select * from yh_jinxiaocun_jinhuofang where gongsi = '" + gongsi + "'"
        },
        success(res) {
          console.log("成功", res)
          that.setData({
            all: res.result
          })
        },
        fail(res) {
          console.log("失败", res)
  
        }
      });

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jinhuofang_mssql where gongsi = '" + gongsi + "'"
        },
        success(res) {
          console.log("成功", res)
          that.setData({
            all: res.result.recordset
          })
        },
        fail(res) {
          console.log("失败", res)
  
        }
      });
      
    }


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
    that.onShow()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  input1: function(e) {
    var beizhu = e.detail.value
    console.log(beizhu)
    this.setData({
      beizhu: beizhu
    })
  },
  input2: function(e) {
    var lianxifangshi = e.detail.value
    console.log(lianxifangshi)
    this.setData({
      lianxifangshi: lianxifangshi
    })
  },
  input3: function(e) {
    var lianxidizhi = e.detail.value
    console.log(lianxidizhi)
    this.setData({
      lianxidizhi: lianxidizhi
    })
  },


  shanchu: function(e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    // console.log(id)
    // console.log(that.data.all)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {

          if(app.globalData.shujuku==0){

            wx.cloud.callFunction({
              name: "sqlConnection",
              data: {
                sql: "delete from yh_jinxiaocun_jinhuofang where _id = '" + id + "'"
              },
              success(res) {
                console.log("成功", res)
                that.onShow();
                // that.setData({
                //     all: res.data,
                //   })
                // szZhi = 
              },
              fail(res) {
                console.log("失败", res)
              }
            });

          }else if(app.globalData.shujuku == 1){

            wx.cloud.callFunction({
              name: "sqlServer_117",
              data: {
                sql: "delete fromyh_jinxiaocun_excel.dbo.yh_jinxiaocun_jinhuofang_mssql where _id = '" + id + "'"
              },
              success(res) {
                console.log("成功", res)
                that.onShow();
                // that.setData({
                //     all: res.data,
                //   })
                // szZhi = 
              },
              fail(res) {
                console.log("失败", res)
              }
            });
            
          }

        } else if (res.cancel) {
          return false;
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  tianjia: function() {
    var that = this;
    that.setData({
      hidden1: !that.data.hidden1,
      backhidden: false,
      updIndex: -1
    })


  },
  quedingjinhuo: function() {
    var that = this
    var beizhu = that.data.beizhu
    var lianxifangshi = that.data.lianxifangshi
    var lianxidizhi = that.data.lianxidizhi
    console.log(beizhu)
    console.log(lianxifangshi)
    console.log(lianxidizhi)
    if(beizhu == '' || lianxifangshi == '' || lianxidizhi == ''){
      wx.showToast({
        title: '信息填写不全',
        icon:'none'
      })
      return;
    }
    if (beizhu != null || lianxifangshi != null) {
      const db = wx.cloud.database()
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi

      if(app.globalData.shujuku==0){

        wx.cloud.callFunction({
          name: "sqlConnection",
          data: {
            sql: "insert Yh_JinXiaoCun_jinhuofang (finduser,gongsi,beizhu,lianxifangshi,lianxidizhi) VALUES('" + finduser + "','" + gongsi + "','" + beizhu + "','" + lianxifangshi + "','" + lianxidizhi + "')"
          },
          success(res) {
            console.log("成功", res)
            wx.showToast({
              title: '添加成功',
            })
            that.onShow()
            wx.stopPullDownRefresh()
          },
          fail(res) {
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

      }else if(app.globalData.shujuku == 1){

        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: "insert into yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jinhuofang_mssql (finduser,gongsi,beizhu,lianxifangshi,lianxidizhi) VALUES('" + finduser + "','" + gongsi + "','" + beizhu + "','" + lianxifangshi + "','" + lianxidizhi + "')"
          },
          success(res) {
            console.log("成功", res)
            wx.showToast({
              title: '添加成功',
            })
            that.onShow()
            wx.stopPullDownRefresh()
          },
          fail(res) {
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



    }
    that.setData({
      hidden1: !that.data.hidden1,
      backhidden: true
    })
    that.onShow();
  },

  sp_Close: function(e) {
    var that = this
    that.setData({
      backhidden: true,
      hidden1: !that.data.hidden1
    })

  },
  jin: function(e) {
    var that = this
    if(that.data.isStock){
      wx.setStorageSync('jinhuofang', that.data.all[e.currentTarget.dataset.index].beizhu);
      wx.navigateBack()
      return;
    }
    var index = e.currentTarget.dataset.index
    that.setData({
      updIndex: index,
      backhidden: true,
      hidden1: true
    })
  },

  save: function(e){
    var _this = this;
    let updIndex = _this.data.updIndex

    if(app.globalData.shujuku==0){

      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "update Yh_JinXiaoCun_jinhuofang set beizhu = '"+e.detail.beizhu+"',lianxifangshi= '"+e.detail.lianxifangshi+"',lianxidizhi= '"+e.detail.lianxidizhi+"' where _id = '" + _this.data.all[updIndex]._id + "'"
        },
        success(res) {
          if(res.errMsg == 'cloud.callFunction:ok'){
            _this.setData({
              updIndex: -1
            }, function(){
              _this.onShow()
              wx.showToast({
                title: '修改成功',
              })
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '修改失败',
            icon: 'none',
            mask: true
          })
        }
      });

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "update yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jinhuofang_mssql set beizhu = '"+e.detail.beizhu+"',lianxifangshi= '"+e.detail.lianxifangshi+"',lianxidizhi= '"+e.detail.lianxidizhi+"' where _id = '" + _this.data.all[updIndex]._id + "'"
        },
        success(res) {
          if(res.errMsg == 'cloud.callFunction:ok'){
            _this.setData({
              updIndex: -1
            }, function(){
              _this.onShow()
              wx.showToast({
                title: '修改成功',
              })
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '修改失败',
            icon: 'none',
            mask: true
          })
        }
      });
      
    }

    
  },

  back: function(){
    this.setData({
      updIndex: -1
    })
  },

  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.点击右下角“+”按钮可以添加进货方信息。\n2.点击一条数据可以弹出文本框进行修改。\n3.长按数据可删除。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },


})