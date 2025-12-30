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
    cangku:'',
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
          sql: "select * from yh_jinxiaocun_cangku where gongsi = '" + gongsi + "'"
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
          querysql: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_cangku_mssql where gongsi = '" + gongsi + "'"
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
            sql: "select * from yh_jinxiaocun_cangku where gongsi = '" + gongsi + "'"
          },
          success(res) {
            console.log("成功", res)
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
            query: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_cangku_mssql where gongsi = '" + gongsi + "'"
          },
          success(res) {
            console.log("成功", res)
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
            sql: "select * from yh_jinxiaocun_cangku where gongsi = '" + gongsi + "' and cangku like '%" + e.detail.value + "%'"
          },
          success(res) {
            console.log("成功", res)
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
            query: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_cangku_mssql where gongsi = '" + gongsi + "' and cangku like '%" + e.detail.value + "%'"
          },
          success(res) {
            console.log("成功", res)
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
          sql: "select * from yh_jinxiaocun_cangku where gongsi = '" + gongsi + "'"
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
          query: "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_cangku_mssql where gongsi = '" + gongsi + "'"
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
    var cangku = e.detail.value
    console.log(cangku)
    this.setData({
      cangku: cangku
    })
  },
 


  shanchu: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    
    console.log("=== 删除操作开始 ===")
    console.log("删除的ID值:", id)
    console.log("ID数据类型:", typeof id)
    console.log("当前shujuku值:", app.globalData.shujuku)
    console.log("完整事件数据:", e.currentTarget.dataset)
    
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          console.log("用户确认删除")
          
          if(app.globalData.shujuku == 0){
            console.log("=== 使用MySQL数据库删除 ===")
            
            wx.cloud.callFunction({
              name: "sqlConnection",
              data: {
                sql: "delete from yh_jinxiaocun_cangku where id = '" + id + "'"
              },
              success(res) {
                console.log("=== MySQL删除成功 ===")
                console.log("成功响应:", res)
                console.log("响应状态:", res.errMsg)
                console.log("返回结果:", res.result)
                
                // 刷新数据
                that.onShow();
                
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail(res) {
                console.log("=== MySQL删除失败 ===")
                console.error("失败响应:", res)
                console.error("错误信息:", res.errMsg)
                console.error("错误代码:", res.errCode)
                
                // 显示详细错误信息
                wx.showToast({
                  title: '删除失败',
                  icon: 'error',
                  duration: 3000
                })
                
                // 显示详细错误对话框
                setTimeout(() => {
                  wx.showModal({
                    title: '删除失败',
                    content: '错误信息: ' + (res.errMsg || '未知错误') + 
                            '\n错误代码: ' + (res.errCode || '无') +
                            '\n请检查云函数sqlConnection是否正确配置。',
                    showCancel: false,
                    confirmText: '知道了'
                  })
                }, 500)
              }
            });
  
          } else if(app.globalData.shujuku == 1){
            console.log("=== 使用SQL Server数据库删除 ===")
            console.log("执行的SQL:", "delete from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_cangku_mssql where id = '" + id + "'")
            
            wx.cloud.callFunction({
              name: "sqlServer_117",
              data: {
                query: "delete from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_cangku_mssql where id = '" + id + "'"
              },
              success(res) {
                console.log("=== SQL Server删除成功 ===")
                console.log("成功响应:", res)
                console.log("响应状态:", res.errMsg)
                console.log("返回结果:", JSON.stringify(res.result))
                
                if (res.result && res.result.success === false) {
                  console.log("云函数返回了业务错误:", res.result.error)
                  wx.showToast({
                    title: '删除失败: ' + (res.result.error || '业务错误'),
                    icon: 'none',
                    duration: 3000
                  })
                  return
                }
                
                // 刷新数据
                that.onShow();
                
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail(res) {
                console.log("=== SQL Server删除失败 ===")
                console.error("完整失败响应:", res)
                console.error("错误信息:", res.errMsg)
                console.error("错误代码:", res.errCode)
                
                // 尝试解析错误信息
                var errorMsg = '未知错误'
                if (res.errMsg) {
                  errorMsg = res.errMsg
                  // 提取更具体的错误信息
                  if (res.errMsg.includes('connection is not defined')) {
                    errorMsg = '云函数sqlServer_117中的数据库连接未定义，请检查云函数代码'
                  } else if (res.errMsg.includes('functions execute fail')) {
                    errorMsg = '云函数执行失败，请检查云函数日志'
                  } else if (res.errMsg.includes('timeout')) {
                    errorMsg = '请求超时，请稍后重试'
                  }
                }
                
                wx.showToast({
                  title: '删除失败',
                  icon: 'error',
                  duration: 3000
                })
                
                // 显示详细错误对话框
                setTimeout(() => {
                  wx.showModal({
                    title: '删除失败',
                    content: '错误信息: ' + errorMsg + 
                            '\n错误代码: ' + (res.errCode || '无') +
                            '\n可能原因:\n1. 云函数sqlServer_117未正确部署\n2. 数据库连接配置错误\n3. SQL语句有问题\n4. 网络连接问题',
                    showCancel: false,
                    confirmText: '知道了'
                  })
                }, 500)
                
                // 尝试用不同的ID格式
                console.log("尝试不同的ID格式...")
                console.log("ID作为数字:", parseInt(id))
                console.log("ID作为字符串:", String(id))
              }
            });
          }
          
        } else if (res.cancel) {
          console.log("用户取消删除")
          return false;
        }
      },
      fail: function(res) {
        console.log("showModal失败:", res)
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
    var cangku = that.data.cangku
   
    console.log(cangku)
   
    if(cangku == '' ){
      wx.showToast({
        title: '信息填写不全',
        icon:'none'
      })
      return;
    }
    if (cangku != null ) {
      const db = wx.cloud.database()
      var finduser = app.globalData.finduser
      var gongsi = app.globalData.gongsi

      if(app.globalData.shujuku==0){

        wx.cloud.callFunction({
          name: "sqlConnection",
          data: {
            sql: "insert yh_JinXiaoCun_cangku (gongsi,cangku) VALUES('" + gongsi + "','" + cangku + "')"
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
         
        })

      }else if(app.globalData.shujuku == 1){

        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: "insert into yh_jinxiaocun_excel.dbo.yh_jinxiaocun_cangku_mssql (gongsi,cangku) VALUES('" + gongsi + "','" + cangku + "')"
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
      wx.setStorageSync('jinhuofang', that.data.all[e.currentTarget.dataset.index].cangku);
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
          sql: "update Yh_JinXiaoCun_cangku set cangku = '"+e.detail.cangku+"' where id = '" + _this.data.all[updIndex].id + "'"
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
          query: "update yh_jinxiaocun_excel.dbo.yh_jinxiaocun_cangku_mssql set cangku = '"+e.detail.cangku+"' where id = '" + _this.data.all[updIndex].id + "'"
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
      content: '1.点击右下角“+”按钮可以添加仓库信息。\n2.点击一条数据可以弹出文本框进行修改。\n3.长按数据可删除。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },


})