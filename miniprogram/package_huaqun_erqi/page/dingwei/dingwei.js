// package_huaqun_erqi/page/dingwei/dingwei.js
const chooseLocation = requirePlugin('chooseLocation');
var QQMapWX = require("../utils/qqmap-wx-jssdk");
var qqmapsdk = new QQMapWX({
  key: 'KKRBZ-TBCW3-TXD37-OWJED-QYFPF-VYFCL'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch_val: false,
    zhongdian: '',
    zhongdian_name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    console.log(userInfo)
    _this.setData({
      userInfo
    })

    var sql = "select order_number + ' ' + customer_name as content,erqi_peisongdan.quyu,songhuoyuan,wancheng,isnull(address,'') as address,isnull(address_name,'') as address_name from erqi_peisongdan left join (select address,address_name,company from userInfo where address != '') as userinfo on erqi_peisongdan.customer_name = userinfo.company where songhuoyuan = '" + userInfo.name + "' and wancheng = '正在配送'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var jihua_list = res.result.recordset
        console.log(jihua_list)

        wx.getLocation({
          isHighAccuracy: true,
          type: 'gcj02',
          success(res) {
            console.log(res)
            var latitude = res.latitude
            var longitude = res.longitude


            var sql = "select zhongdian,zhongdian_name from userInfo where id =" + userInfo.id
            wx.cloud.callFunction({
              name: 'sqlserver_huaqun',
              data: {
                query: sql
              },
              success: res => {
                console.log(res)
                var zhongdian = res.result.recordset[0].zhongdian
                var zhongdian_name = res.result.recordset[0].zhongdian_name
                _this.setData({
                  zhongdian,
                  zhongdian_name
                })
                if (jihua_list.length == 0) {
                  _this.setData({
                    latitude: latitude,
                    longitude: longitude,
                    markers: [{
                      id: 0,
                      iconPath: '../../images/start.png',
                      latitude: latitude,
                      longitude: longitude,
                      width: 64,
                      height: 64
                    }]
                  })
                } else {
                  var qidian = latitude + "," + longitude
                  // var e = [qidian,zhongdian]
                  // _this.formSubmit(e)
                  var zhongdian_arr = zhongdian.split(",")
                  var jihua_name_list = _this.data.jihua_name_list
                  var jihua_mingxi = []
                  var this_index = 0
                  for (var i = 0; i < jihua_list.length; i++) {
                    if (jihua_list[i].address != '') {
                      var this_la = jihua_list[i].address.split(',')[0] * 1
                      var this_lo = jihua_list[i].address.split(',')[1] * 1
                      jihua_mingxi.push({
                        id: this_index,
                        latitude: this_la,
                        longitude: this_lo,
                        label: {
                          content: jihua_list[i].content,
                          bgColor: "#FFFFFF",
                          borderWidth: 1,
                          borderColor: "#000000",
                          borderRadius: 3,
                          padding: 3,
                          textAlign: "center"
                        }
                      })
                      this_index = this_index + 1
                    }
                  }
                  if (jihua_mingxi.length == 0) {
                    wx.showToast({
                      title: '未读取到计划信息，请检查客户账号是否有定位信息',
                      icon: 'none'
                    })
                    return;
                  } else {
                    var this_id = this_index
                    for (var i = 0; i < jihua_mingxi.length; i++) {
                      jihua_mingxi[i].name = jihua_mingxi[i].label.content
                    }
                    jihua_mingxi.push({
                      id: this_id,
                      iconPath: '../../images/start.png',
                      latitude: latitude,
                      longitude: longitude,
                      width: 64,
                      height: 64
                    })
                    console.log(jihua_mingxi)
                    _this.setData({
                      zhongdian_name_list: jihua_mingxi,
                      latitude: latitude,
                      longitude: longitude,
                      markers: jihua_mingxi
                    })
                    if (zhongdian != '') {
                      console.log(qidian)
                      console.log(zhongdian)
                      var e = [qidian, zhongdian]
                      console.log(e)
                      _this.formSubmit(e)
                    }
                  }
                }
              },
              err: res => {
                console.log("错误!")
              },
              fail: res => {
                console.log("请求失败！")
              }
            })
          }
        })

      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log("请求失败！")
      }
    })
  },

  wancheng: function () {
    var _this = this
    var userInfo = _this.data.userInfo
    if (_this.data.zhongdian_name == '') {
      return;
    }
    var sql = "update erqi_peisongdan set wancheng = '完成' where order_number = '" + _this.data.zhongdian_name.split(" ")[0] + "'; update userInfo set zhongdian='',zhongdian_name='' where id=" + userInfo.id
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        _this.setData({
          zhongdian_name:'',
        })
        var sql = "select order_number + ' ' + customer_name as content,erqi_peisongdan.quyu,songhuoyuan,wancheng,isnull(address,'') as address,isnull(address_name,'') as address_name from erqi_peisongdan left join (select address,address_name,company from userInfo where address != '') as userinfo on erqi_peisongdan.customer_name = userinfo.company where songhuoyuan = '" + userInfo.name + "' and wancheng = '正在配送'"
        wx.cloud.callFunction({
          name: 'sqlserver_huaqun',
          data: {
            query: sql
          },
          success: res => {
            console.log(res)
            var jihua_list = res.result.recordset
            console.log(jihua_list)

            wx.getLocation({
              isHighAccuracy: true,
              type: 'gcj02',
              success(res) {
                console.log(res)
                var latitude = res.latitude
                var longitude = res.longitude


                var sql = "select zhongdian,zhongdian_name from userInfo where id =" + userInfo.id
                wx.cloud.callFunction({
                  name: 'sqlserver_huaqun',
                  data: {
                    query: sql
                  },
                  success: res => {
                    console.log(res)
                    var zhongdian = res.result.recordset[0].zhongdian
                    var zhongdian_name = res.result.recordset[0].zhongdian_name
                    _this.setData({
                      zhongdian,
                      zhongdian_name
                    })
                    if (jihua_list.length == 0) {
                      _this.setData({
                        latitude: latitude,
                        longitude: longitude,
                        markers: [{
                          id: 0,
                          iconPath: '../../images/start.png',
                          latitude: latitude,
                          longitude: longitude,
                          width: 64,
                          height: 64
                        }]
                      })
                    } else {
                      var qidian = latitude + "," + longitude
                      // var e = [qidian,zhongdian]
                      // _this.formSubmit(e)
                      var zhongdian_arr = zhongdian.split(",")
                      var jihua_name_list = _this.data.jihua_name_list
                      var jihua_mingxi = []
                      var this_index = 0
                      for (var i = 0; i < jihua_list.length; i++) {
                        if (jihua_list[i].address != '') {
                          var this_la = jihua_list[i].address.split(',')[0] * 1
                          var this_lo = jihua_list[i].address.split(',')[1] * 1
                          jihua_mingxi.push({
                            id: this_index,
                            latitude: this_la,
                            longitude: this_lo,
                            label: {
                              content: jihua_list[i].content,
                              bgColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: "#000000",
                              borderRadius: 3,
                              padding: 3,
                              textAlign: "center"
                            }
                          })
                          this_index = this_index + 1
                        }
                      }
                      if (jihua_mingxi.length == 0) {
                        wx.showToast({
                          title: '未读取到计划信息，请检查客户账号是否有定位信息',
                          icon: 'none'
                        })
                        return;
                      } else {
                        var this_id = this_index
                        for (var i = 0; i < jihua_mingxi.length; i++) {
                          jihua_mingxi[i].name = jihua_mingxi[i].label.content
                        }
                        jihua_mingxi.push({
                          id: this_id,
                          iconPath: '../../images/start.png',
                          latitude: latitude,
                          longitude: longitude,
                          width: 64,
                          height: 64
                        })
                        console.log(jihua_mingxi)
                        _this.setData({
                          zhongdian_name_list: jihua_mingxi,
                          latitude: latitude,
                          longitude: longitude,
                          markers: jihua_mingxi
                        })
                        if (zhongdian != '') {
                          console.log(qidian)
                          console.log(zhongdian)
                          var e = [qidian, zhongdian]
                          _this.formSubmit(e)
                        }
                      }
                    }
                  },
                  err: res => {
                    console.log("错误!")
                  },
                  fail: res => {
                    console.log("请求失败！")
                  }
                })
              }
            })

          },
          err: res => {
            console.log("错误!")
          },
          fail: res => {
            console.log("请求失败！")
          }
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log("请求失败！")
      }
    })

  },

  header_xiala: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    _this.setData({
      list_xiala: list,
      click_column: column,
    })
    console.log(list)
    _this.setData({
      xlShow2: true
    })
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      if (click_column == 'zhongdian_name') {
        console.log(e.detail.id)
        var markers = _this.data.markers
        var latitude = ''
        var longitude = ''
        var name = ''
        var markers_id = e.detail.id
        for (var i = 0; i < markers.length; i++) {
          if (markers[i].id == e.detail.id) {
            latitude = markers[i].latitude
            longitude = markers[i].longitude
            name = markers[i].name
            break;
          }
        }
        if (latitude != '') {
          var qidian = _this.data.latitude + "," + _this.data.longitude
          var zhongdian = latitude + "," + longitude
          var e = [qidian, zhongdian]
          _this.formSubmit(e)
          var sql = "update userInfo set zhongdian='" + latitude + "," + longitude + "',zhongdian_name='" + name + "' where id='" + _this.data.userInfo.id + "'"
          wx.cloud.callFunction({
            name: 'sqlserver_huaqun',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
              console.log("请求失败！")
            }
          })
          _this.setData({
            xlShow2: false,
            [click_column]: new_val,
            zhongdian_id: markers_id,
            zhongdian: latitude + "," + longitude,
            zhongdian_name: name
          })
        } else {
          wx.showToast({
            title: '未读取到终点信息',
            icon: 'none'
          })
        }
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow2: false,
      })
    }
  },

  del_weizhi: function () {
    var _this = this
    wx.showModal({
      title: '提示',
      content: '将清除终点信息，是否继续？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var sql = "update userInfo set zhongdian='',zhongdian_name='' where id=" + _this.data.userInfo.id
          wx.cloud.callFunction({
            name: 'sqlserver_huaqun',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
              console.log("请求失败！")
            }
          })
          console.log(_this.data.latitude)
          console.log(_this.data.longitude)
          _this.setData({
            zhongdian: '',
            zhongdian_name: '',
            latitude: _this.data.latitude,
            longitude: _this.data.longitude,
            markers: [{
              id: 0,
              latitude: _this.data.latitude,
              longitude: _this.data.longitude,
              iconPath: '../../images/start.png',
              width: 64,
              height: 64
            }]
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  select_weizhi: function (e) {
    var _this = this
    const key = 'SEUBZ-4CGL4-YC3UO-FW2T5-W5DVT-QVFJJ'; //使用在腾讯位置服务申请的key
    const referer = '进销存云合'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: _this.data.latitude,
      longitude: _this.data.longitude
    });
    wx.showModal({
      title: '提示',
      content: '将跳转到终点选择，是否继续？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  switch_change: function (e) {
    var _this = this
    console.log(e.detail.value)
    if (_this.data.zhongdian_name == '') {
      wx.showToast({
        title: '未读取到终点信息',
        icon: 'none'
      })
      _this.setData({
        switch_val: false
      })
      return;
    }
    _this.setData({
      switch_val: e.detail.value
    })
    if (e.detail.value) {
      _this.getWxLocation()
    }
  },


  async location() {
    const that = this;
    try {
      await that.getWxLocation()
    } catch (error) {
      Model({
        title: '温馨提示',
        tip: '获取权限失败，需要获取您的地理位置才能为您提供更好的服务！是否授权获取地理位置？',
        showCancel: true,
        confirmText: '前往设置',
        cancelText: '取消',
        sureCall() {
          that.toSetting()
        },
        cancelCall() {}
      })
      return
    }
  },

  // 获取位置信息
  getWxLocation() {
    var _this = this
    if (_this.data.switch_val) {
      return new Promise((resolve, reject) => {
        const _locationChangeFn = (res) => {
          wx.offLocationChange(_locationChangeFn)
          var zuobiao = res.latitude + "," + res.longitude
          var shijian = getNowDate()
          var zhongdian = _this.data.zhongdian
          var zhongdian_name = _this.data.zhongdian_name
          var markers = _this.data.markers
          for (var i = 0; i < markers.length; i++) {
            if (markers[i].iconPath == '../../images/start.png') {
              markers[i].latitude = res.latitude
              markers[i].longitude = res.longitude
              break;
            }
          }
          _this.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            markers
          })
          console.log(zuobiao)
          console.log(shijian)
          var sql = "update userInfo set dingwei='" + zuobiao + "',dingwei_shijian='" + shijian + "' where id=" + _this.data.userInfo.id
          console.log(sql)
          wx.cloud.callFunction({
            name: 'sqlserver_huaqun',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
              console.log("请求失败！")
            }
          })
          if (_this.data.switch_val) {
            setTimeout(() => {
              _this.getWxLocation()
            }, 5000)
          }
        }
        wx.startLocationUpdate({
          type: 'gcj02',
          success: (res) => {
            wx.onLocationChange(_locationChangeFn)
            resolve()
          },
          fail: (err) => {
            reject()
          }
        })
      })
    }
  },

  formSubmit(e) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: e[0],
      to: e[1],
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline,
          pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          polyline: [{
            points: pl,
            width: 6,
            color: '#0099CC',
            arrowLine: true,
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },

  // 调起客户端小程序设置界面
  toSetting() {
    wx.openSetting({
      success(res) {
        if (res.authSetting["scope.userLocation"]) {
          this.authorization()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var _this = this
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    console.log(location)
    if (location != null) {
      var sql = "update userInfo set zhongdian = '" + location.latitude + "," + location.longitude + "',zhongdian_name='" + location.name + "' where id=" + _this.data.userInfo.id
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          console.log("请求失败！")
        }
      })
      var qidian = _this.data.latitude + "," + _this.data.longitude
      var zhongdian = location.latitude + "," + location.longitude
      var e = [qidian, zhongdian]
      _this.formSubmit(e)
      _this.setData({
        zhongdian: location.latitude + "," + location.longitude,
        zhongdian_name: location.name,
        latitude: _this.data.latitude,
        longitude: _this.data.longitude,
        markers: [{
          id: 0,
          latitude: _this.data.latitude,
          longitude: _this.data.longitude,
          iconPath: '../../images/start.png',
          width: 64,
          height: 64
        }, {
          id: 1,
          latitude: location.latitude,
          longitude: location.longitude,
        }, ]
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    var _this = this
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null);
    _this.setData({
      switch_val: false
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})

function getNowDate() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
  // var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
}