// miniprogram/pages/x_home/x_home.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gongsi:"aa",
    uname:"aa",
    id:"aa",

    sheetqx1:[],
    sheetqx2: [],
    sheetqx3: "",
    sheetqx4: "",
    sheetqx5: [],

    userInfo: [],
    showList: [
      {
        text: "客户信息",
        url: "../../packageX/page/customerInfo/customerInfo"
      }, {
        text: "日交易额",
        url: "../../packageX/page/DailyTurnover/DailyTurnover"
      }, {
        text: "月交易额",
        url: "../../packageX/page/MonthlyTurnover/MonthlyTurnover"
      }, {
        text: "总交易额",
        url: "../../packageX/page/Statistics/Statistics"
      }, {
        text: "员工信息",
        url: "../../packageX/page/UserInfo/UserInfo"
      }, {
        text: "商品设置",
        url: "../../packageX/page/product/product"
      }, {
        text: "会员管理",
        url: "../../packageX/page/member_info/member_info"
      }, {
        text: "会员等级",
        url: "../../packageX/page/membership_level/membership_level"
      }, {
        text: "点单面板",
        url: "../../packageX/page/order_panel/order_panel"
      },{
        text: "订单信息",
        url: "../../packageX/page/orders/orders"
      }, {
        text: "统计报表",
        url: "../../packageX/page/report_form/report_form"
      },  {
        text: "退出",
        url: 　""
      }
    ]
  },
  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var text = _this.data.showList[index].text
    if (url == "") {
      wx.showModal({
        title: '提示',
        content: '确认退出吗？',
        success(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1,
            })
          } else if (res.cancel) {
            return
          }
        }
      })
    } else {
      if (text == "客户信息") {
        if ( _this.data.sheetqx1.Sel != "1"){
          wx.showToast({
            title: '无权限',
            icon: 'none',
          })
        }else{
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            }) + '&sheetqx1=' + JSON.stringify(_this.data.sheetqx1) + '&sheetqx2=' + JSON.stringify(_this.data.sheetqx2)
          })
        }
      } else if (text == "日交易额"){
        if (_this.data.sheetqx2.Sel != "1") {
          wx.showToast({
            title: '无权限',
            icon: 'none',
          })
        }else{
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            })
          })
        }
      } else if (text == "月交易额") {
        if (_this.data.sheetqx3 != "1") {
          wx.showToast({
            title: '无权限',
            icon: 'none',
          })
        } else {
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            })
          })
        }
      } else if (text == "总交易额") {
        if (_this.data.sheetqx4 != "1") {
          wx.showToast({
            title: '无权限',
            icon: 'none',
          })
        } else {
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            }) 
          })
        }
      } else if (text == "员工信息") {
        if (_this.data.sheetqx5.Sel != "1") {
          wx.showToast({
            title: '无权限',
            icon: 'none',
          })
        } else {
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            }) + '&sheetqx5=' + JSON.stringify(_this.data.sheetqx5)
          })
        }
      }else if (text == "商品设置") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              company: _this.data.gongsi,
              uname: _this.data.uname
            })
          })
        
      }else if (text == "会员管理") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              company: _this.data.gongsi,
              uname: _this.data.uname
            })
          })
        
      }else if (text == "会员等级") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              company: _this.data.gongsi,
              uname: _this.data.uname
            }) 
          })
        
      }else if (text == "点单面板") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            })
          })
        
      }else if (text == "订单信息") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              company: _this.data.gongsi,
              uname: _this.data.uname
            }) 
          })
        
      }else if (text == "统计报表") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            }) 
          })
        
      }
      
    }
  },




  quanxian: function () {
    var _this = this;
    let sql = "SELECT `Add`,Del,Upd,Sel FROM `management` where Uid='"+ _this.data.id +"' ORDER BY `Table` ASC"
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        if (res.result.length ==5) {
        console.log("select-success", res)
          
          _this.setData({
            sheetqx1: res.result[0],
            sheetqx2: res.result[1],
            sheetqx3: res.result[2].Sel,
            sheetqx4: res.result[3].Sel,
            sheetqx5: res.result[4],
          })
        }else{
          wx.navigateBack({
            delta: 1,
          })
        }
      },
      fail: res => {
        console.log("select-fail", res)
      },
      complete: res=>{
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    if(options.company == undefined){
      wx.login({
        success: (res) => {
            console.log(res);
            _this.setData({
                wxCode: res.code,
            })
            // ====== 【获取OpenId】
            let m_code = _this.data.wxCode; // 获取code
            let m_AppId = app.globalData.this_id1 + app.globalData.this_id2 + app.globalData.this_id3 ; // appid
            let m_mi =  app.globalData.sec_dd1 + app.globalData.sec_dd2 + app.globalData.sec_dd3; // 小程序密钥
            console.log("m_code:" + m_code);
            let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + m_AppId + "&secret=" + m_mi + "&js_code=" + m_code + "&grant_type=authorization_code";
            wx.request({
                url: url,
                success: (res) => {
                    console.log(res);
                    _this.setData({
                        wxOpenId: res.data.openid
                    })
                    //获取到你的openid
                    console.log("====openID=======");
                    console.log(_this.data.wxOpenId);
                    var sql = "select * from users where wechart_user = '" + _this.data.wxOpenId + "'"
                    console.log(sql)
                    wx.cloud.callFunction({
                      name: 'sqlserver_xinyongka',
                      data:{
                        sql : sql
                      },
                      success(res){
                        console.log(res)
                        var list = res.result
                        console.log(list)
                        if(list.length > 0){
                          _this.setData({
                            gongsi: list[0].company,
                            uname: list[0].uname,
                            id: list[0].id,
                          })
                          _this.quanxian()
                        }else{
                          wx.showToast({
                            title: '未绑定账号信息',
                            icon:"none"
                          })
                        }
                      }
                    })
                }
            })
        }
    })
    }else{
      var _this=this
      _this.setData({
        gongsi: options.company,
        uname: options.uname,
        id: options.id,
      })
      _this.quanxian()
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

  }
})