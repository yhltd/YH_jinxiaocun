const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    actions: [],
    dayOff: [],
    sijianShow: false,
    currentDate: '',
    minHour: 0,
    maxHour: 20,
    minMinute: 0,
    maxMinute: 60,
    empty: "",
    monring1: "",
    monring2: "",
    noon1: "",
    noon2: "",
    night1: "",
    night2: "",
    column: "",
    delWindow1: false,
    delId: "",
    addWindow1: false,
    moduleName: "",
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 15 === 0 || option === 0);
      }
      return options;
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //新增代码
    var _this = this
    _this.panduanquanxian()
    if (_this.data.isdischa == 1) {
      _this.addMK(),
        _this.module_info_show('')
    }
    //结束
  },

  goto_yanshi: function(){
    wx.navigateTo({
      url: "../PC_mp4/PC_mp4?this_url=cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/pakageP_mp4/gongzuoshijian.mp4"
      }) 
  },

  //新增代码
  //判断权限
  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa: 1,
      isdisgai: 1,
      isdisshan: 1
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log("department_list1")
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "工作时间及休息日") {
        console.log("工作时间及休息日没有添加权限")
        console.log(department_list1[i])
        //添加没权限
        if (department_list1[i].add == "否") {
          _this.setData({
            isdis: 2
          });
          // console.log("否 isdis："+_this.data.isdis)
        } else {
          _this.setData({
            isdis: 1
          });
          // console.log("是 isdis："+_this.data.isdis)

        }
        //修改没权限
        if (department_list1[i].upd == "否") {
          _this.setData({
            isdisgai: 2
          });
        } else {
          _this.setData({
            isdisgai: 1
          });

        }
        //删除没权限
        if (department_list1[i].del == "否") {
          _this.setData({
            isdisshan: 2
          });
        } else {
          _this.setData({
            isdisshan: 1
          });

        }
        //查询没权限
        if (department_list1[i].sel == "否") {
          _this.setData({
            isdischa: 2
          });
        } else {
          _this.setData({
            isdischa: 1
          });

        }
        console.log(_this.data.isdis)

      }
    }
  },
  addMK: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select name,id from module_type where company = '" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        console.log(res)
        _this.setData({
          list: list
        })
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },

  module_info_show: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select * from(select id,isnull((select name from module_type as t where module_info.type_id=t.id),'') as type_name,isnull(name,'') as name,isnull(cast(num as varchar),'') as num,isnull((select name from module_info as i where module_info.parent_id=i.id),'') as parent from module_info where company = '" + user + "') as p where not p.type_name  is null and p.type_name !='' and p.type_name like '%" + e + "%'"
      },
      success: res => {
        var list_module_info = res.result.recordset
        console.log(res)
        _this.setData({
          list_module_info: list_module_info
        })
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },

  //结束

  onChange(event) {
    var _this = this
    let user = app.globalData.gongsi;
    if (event.detail != "" && event.detail != "8") {
      _this.setData({
        monring1: "",
        monring2: "",
        noon1: "",
        noon2: "",
        night1: "",
        night2: "",
      });
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "select morning_start,morning_end,noon_start,noon_end,night_start,night_end from time_config where company='" + user + "' and week='" + event.detail + "'"
        },
        success: res => {
          if (res.result.recordset.length > 0) {
            var list = res.result.recordset[0]
            _this.setData({
              monring1: list.morning_start,
              monring2: list.morning_end,
              noon1: list.noon_start,
              noon2: list.noon_end,
              night1: list.night_start,
              night2: list.night_end,
            })
          }
          wx.hideLoading({

          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })
    }
    if (event.detail == "8") {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "select id,CONVERT(varchar(100), day_or_reset, 23) as day_or_reset from holiday_config where company='" + user + "'"
        },
        success: res => {
          if (res.result.recordset.length > 0) {
            var list = res.result.recordset
            _this.setData({
              dayOff: list
            })
          }
          wx.hideLoading({

          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })
    }
    _this.setData({
      activeNames: event.detail,
    });

  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    if (column == "monring1") {
      _this.setData({
        minHour: 6,
        maxHour: 10,
        minMinute: 0,
        maxMinute: 59,
        sijianShow: true,
        column: column
      })
    } else if (column == "monring2") {
      _this.setData({
        minHour: 6,
        maxHour: 10,
        minMinute: 0,
        maxMinute: 59,
        sijianShow: true,
        column: column
      })
    } else if (column == "noon1") {
      _this.setData({
        minHour: 10,
        maxHour: 12,
        minMinute: 0,
        maxMinute: 59,
        sijianShow: true,
        column: column
      })
    } else if (column == "noon2") {
      _this.setData({
        minHour: 10,
        maxHour: 12,
        minMinute: 0,
        maxMinute: 59,
        sijianShow: true,
        column: column
      })
    } else if (column == "night1") {
      _this.setData({
        minHour: 12,
        maxHour: 23,
        minMinute: 0,
        maxMinute: 59,
        sijianShow: true,
        column: column
      })
    } else if (column == "night2") {
      _this.setData({
        minHour: 12,
        maxHour: 23,
        minMinute: 0,
        maxMinute: 59,
        sijianShow: true,
        column: column
      })
    }
    _this.setData({
      [column]: e.detail.value
    })
  },
  timeQX: function (e) {
    var _this = this
    _this.setData({
      sijianShow: false
    })
  },
  timeWC: function (e) {
    var _this = this
    let time = e.detail
    var column = _this.data.column
    _this.setData({
      [column]: time,
      sijianShow: false
    })
  },
  save1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select morning_start,morning_end,noon_start,noon_end,night_start,night_end from time_config where company='" + user + "' and week='" + _this.data.activeNames + "'"
      },
      success: res => {
        var monring1 = new Date("2021-01-01 " + this.data.monring1 + ':00')
        var monring2 = new Date("2021-01-01 " + this.data.monring2 + ':00')
        var noon1 = new Date("2021-01-01 " + this.data.noon1 + ':00')
        var noon2 = new Date("2021-01-01 " + this.data.noon2 + ':00')
        var night1 = new Date("2021-01-01 " + this.data.night1 + ':00')
        var night2 = new Date("2021-01-01 " + this.data.night2 + ':00')
        monring1.setMinutes(monring1.getMinutes() + 15);
        noon1.setMinutes(noon1.getMinutes() + 15);
        night1.setMinutes(night1.getMinutes() + 15);
        if (monring1 > monring2 || noon1 > noon2 || night1 > night2) {
          wx.showToast({
            title: '结束时间必须大于开始时间！',
            icon: 'none',
            duration: 3000
          })
        } else {
          if (res.result.recordset.length <= 0) {
            wx.cloud.callFunction({
              name: 'sqlServer_PC',
              data: {
                query: "insert into time_config(week,morning_start,morning_end,noon_start,noon_end,night_start,night_end,company) values('" + this.data.activeNames + "','" + this.data.monring1 + "','" + this.data.monring2 + "','" + this.data.noon1 + "','" + this.data.noon2 + "','" + this.data.night1 + "','" + this.data.night2 + "','" + user + "')"
              },
              success: res => {
                wx.showToast({
                  title: '保存成功！',
                  icon: 'none',
                  duration: 3000
                })
                wx.hideLoading({

                })
              },
              err: res => {
                console.log("错误!")
              },
              fail: res => {
                wx.showToast({
                  title: '请求失败！',
                  icon: 'none',
                  duration: 3000
                })
                console.log("请求失败！")
              }
            })
          } else {
            wx.cloud.callFunction({
              name: 'sqlServer_PC',
              data: {
                query: "update time_config set morning_start='" + _this.data.monring1 + "',morning_end='" + _this.data.monring2 + "',noon_start='" + _this.data.noon1 + "',noon_end='" + _this.data.noon2 + "',night_start='" + _this.data.night1 + "',night_end='" + _this.data.night2 + "' where week='" + _this.data.activeNames + "' and company='" + user + "'"
              },
              success: res => {
                wx.showToast({
                  title: '保存成功！',
                  icon: 'none'
                })
                wx.hideLoading({

                })
              },
              err: res => {
                console.log("错误!")
              },
              fail: res => {
                wx.showToast({
                  title: '请求失败！',
                  icon: 'none',
                  duration: 3000
                })
                console.log("请求失败！")
              }
            })
          }
          wx.hideLoading({

          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },
  sure1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "delete from holiday_config where id='" + this.data.delId + "' and company='" + user + "'"
      },
      success: res => {
        _this.setData({
          delId: ""
        })
        wx.cloud.callFunction({
          name: 'sqlServer_PC',
          data: {
            query: "select id,CONVERT(varchar(100), day_or_reset, 23) as day_or_reset from holiday_config where company='" + user + "'"
          },
          success: res => {
            if (res.result.recordset.length > 0) {
              var list = res.result.recordset
              _this.setData({
                dayOff: list
              })
            }
            wx.hideLoading({

            })
          },
          err: res => {
            console.log("错误!")
          },
          fail: res => {
            wx.showToast({
              title: '请求失败！',
              icon: 'none',
              duration: 3000
            })
            console.log("请求失败！")
          }
        })
        wx.showToast({
          title: '删除成功！',
          icon: 'none'
        })
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },
  clickView: function (e) {
    var _this = this
    _this.setData({
      delWindow1: true,
      delId: e.currentTarget.dataset.id
    })
  },
  add2: function () {
    var _this = this
    _this.setData({
      addWindow1: true
    })
  },
  sure2: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "insert into holiday_config(day_or_reset,company) values('" + this.data.empty + "','" + user + "')"
      },
      success: res => {
        wx.showToast({
          title: '添加成功！',
          icon: 'none',
          duration: 3000
        })
        wx.cloud.callFunction({
          name: 'sqlServer_PC',
          data: {
            query: "select id,CONVERT(varchar(100), day_or_reset, 23) as day_or_reset from holiday_config where company='" + user + "'"
          },
          success: res => {
            if (res.result.recordset.length > 0) {
              var list = res.result.recordset
              _this.setData({
                dayOff: list
              })
            }
            wx.hideLoading({

            })
          },
          err: res => {
            console.log("错误!")
          },
          fail: res => {
            wx.showToast({
              title: '请求失败！',
              icon: 'none',
              duration: 3000
            })
            console.log("请求失败！")
          }
        })
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },
  onInput2: function (e) {
    var _this = this
    let moduleName = e.detail.value
    _this.setData({
      moduleName: moduleName
    })
  },
  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
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