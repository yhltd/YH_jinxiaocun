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
    title: [
      {
        text: "区域",
        width: "400rpx",
        columnName: "quyu",
        type: "text",
        isupd: true
      },{
        text: "优先",
        width: "175rpx",
        columnName: "youxian",
        type: "text",
        isupd: true
      },
      {
        text: "未完成",
        width: "175rpx",
        columnName: "weiwancheng",
        type: "text",
        isupd: true
      },
    ],
    switch_val:false,
    zhongdian:'',
    zhongdian_name:'',
    markers:[],
    order_type_list:[
      {name:'优先处理'},
      {name:'未完成'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var id = options.id
    console.log(userInfo)
    console.log(id)
    _this.setData({
      userInfo,
      jihua_id: id
    })
    var sql = "select quyu as name,quyu,sum(case when wancheng = '优先处理' then 1 else 0 end) as youxian,sum(case when wancheng != '优先处理' and wancheng != '完成' then 1 else 0 end) as weiwancheng from erqi_peisongdan where quyu != '' group by quyu"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        _this.setData({
          list,
          quyu_list:list
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log("请求失败！")
      }
    })
    var sql = "select jihua_mingxi from peisong_jihua where id=" + _this.data.jihua_id
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        if(list.length > 0){
          var markers = JSON.parse(list[0].jihua_mingxi)
          _this.setData({
            markers
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log("请求失败！")
      }
    })
    wx.getLocation({
      isHighAccuracy: true,
      type: 'gcj02',
      success (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          latitude: latitude,
          longitude: longitude,
         })
      }
     })
  },

  click_marker:function(e){
    var _this = this
    console.log(e.detail.markerId)
    wx.showModal({
      title: '提示',
      content: '确认删除此地点？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var markers = _this.data.markers
          for(var i=0; i<markers.length; i++){
            if(markers[i].id == e.detail.markerId){
              markers.splice(i,1)
            }
          }
          _this.setData({
            markers
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  save:function(){
    var _this = this
    var markers = _this.data.markers
    if(markers.length == 0){
      wx.showToast({
        title: '未读取到送货地点',
        icon: 'none'
      })
      return;
    }
    var sql = "update peisong_jihua set jihua_mingxi ='" + JSON.stringify(markers) + "' where id = " + _this.data.jihua_id
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '保存成功',
          icon: 'none'
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

  del_weizhi:function(){
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
            zhongdian:'',
            zhongdian_name:'',
            latitude: _this.data.latitude,
            longitude: _this.data.longitude,
            markers:[
              {
                id:0,
                latitude: _this.data.latitude,
                longitude: _this.data.longitude,
                iconPath: '../../images/start.png',
                width:64,
                height:64
              }
            ]
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  select_weizhi: function(e){
    var _this = this
    const key = 'SEUBZ-4CGL4-YC3UO-FW2T5-W5DVT-QVFJJ'; //使用在腾讯位置服务申请的key
    const referer = '进销存云合'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: _this.data.latitude,
      longitude: _this.data.longitude
    });
    if(_this.data.order_number == "" || _this.data.customer == ""){
      wx.showToast({
        title: '请选择订单后点击此按钮',
        icon: 'none'
      })
      return;
    }
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

  select_peizhi: function(){
    var _this = this
    if(_this.data.order_number == "" || _this.data.customer == ""){
      wx.showToast({
        title: '请选择订单后点击此按钮',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '将读取客户配送地址，是否继续？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var sql = "select address,address_name from userInfo where company = '" + _this.data.customer + "' and address_name != ''"
          wx.cloud.callFunction({
            name: 'sqlserver_huaqun',
            data: {
              query: sql
            },
            success: res => {
              console.log(res.result.recordset)
              var list = res.result.recordset
              if(list.length == 0){
                wx.showToast({
                  title: '未读取到此客户地址信息',
                  icon: 'none',
                })
                return;
              }else{
                var address = list[0].address.split(',')
                var markers = _this.data.markers
                var index = 0
                if(markers.length > 0){
                  index = markers[markers.length - 1].id + 1
                }
                markers.push({
                  id:index,
                  latitude: address[0] * 1,
                  longitude: address[1] * 1,
                  label: {
                    content: _this.data.order_number + " " + _this.data.customer,
                    bgColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#000000',
                    borderRadius: 3,
                    padding: 3,
                    textAlign: 'center'
                  }
                })
                _this.setData({
                  latitude: address[0] * 1,
                  longitude: address[1] * 1,
                  markers
                })
              }
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
              console.log("请求失败！")
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  chean_marke:function(){
    var _this = this
    wx.showModal({
      title: '提示',
      content: '将清空目前的所有选点，是否继续？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          _this.setData({
            markers: []
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  switch_change:function(e){
    var _this = this
    console.log(e.detail.value)
    _this.setData({
      switch_val: e.detail.value
    })
    if(e.detail.value){
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
    if(_this.data.switch_val){
      return new Promise((resolve, reject) => {
        const _locationChangeFn = (res) => {
          wx.offLocationChange(_locationChangeFn)
          var zuobiao = res.latitude + "," + res.longitude
          var shijian = getNowDate()
          var zhongdian = _this.data.zhongdian
          var zhongdian_name = _this.data.zhongdian_name
          if(zhongdian != ''){
            var qidian = res.latitude + "," + res.longitude
            var e = [qidian,zhongdian]
            _this.formSubmit(e)
            var zhongdian_arr = zhongdian.split(",")
            _this.setData({
              latitude: res.latitude,
              longitude: res.longitude,
              markers:[
                {
                  id:0,
                  iconPath: '../../images/start.png',
                  latitude: res.latitude,
                  longitude: res.longitude,
                  width:64,
                  height:64
                },
                {
                  id:1,
                  iconPath: '../../images/end.png',
                  latitude: zhongdian_arr[0] * 1,
                  longitude: zhongdian_arr[1] * 1,
                  width:64,
                  height:64
                }
              ]
            })
          }else{
            _this.setData({
              latitude: res.latitude,
              longitude: res.longitude,
              markers:[{
                id:0,
                iconPath: '../../images/start.png',
                latitude: res.latitude,
                longitude: res.longitude,
                width:64,
                height:64
              }]
            })
          }
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
           if(_this.data.switch_val){
            setTimeout(()=>
            {
              _this.getWxLocation()
            }, 5000)
           }
        }
        wx.startLocationUpdate({
          type:'gcj02',
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
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: e[0],
      to: e[1], 
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          polyline: [{
            points: pl,
            width: 6,
            color: '#0099CC',
            arrowLine:true,
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

  header_xiala: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    _this.setData({
      list_xiala: list,
      click_column:column,
    })
    console.log(list)
    _this.setData({
      xlShow2: true
    })
    if(_this.data.quyu != '' && _this.data.order_type != ''){
      var sql = "select order_number + ' ' + customer_name as name,order_number,customer_name,quyu,wancheng from erqi_peisongdan where quyu='" + _this.data.quyu + "'"
      if(_this.data.order_type == '优先处理'){
        sql = sql + " and wancheng ='优先处理'"
      }else{
        sql = sql + " and wancheng !='完成'"
      }
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var list = res.result.recordset
          _this.setData({
            order_number_list: list,
            customer_list: list,
          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          console.log("请求失败！")
        }
      })
    }else{
      _this.setData({
        order_number_list:[],
        customer_list:[],
      })
    }
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      if(click_column == 'order_number' || click_column == 'customer'){
        _this.setData({
          xlShow2: false,
          order_number: e.detail.order_number,
          customer: e.detail.customer_name
        })
      }else{
        _this.setData({
          xlShow2: false,
          [click_column]:new_val
        })
      }
      
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    var _this = this
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    console.log(location)
    if(location != null){
      var markers = _this.data.markers
      var index = 0
      if(markers.length > 0){
        index = markers[markers.length - 1].id + 1
      }
      markers.push({
        id:index,
        latitude: location.latitude,
        longitude: location.longitude,
        label: {
          content: _this.data.order_number + " " + _this.data.customer,
          bgColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#000000',
          borderRadius: 3,
          padding: 3,
          textAlign: 'center'
        }
      })
      _this.setData({
        latitude: location.latitude,
        longitude: location.longitude,
        markers
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
  var day  = date.getDate(); // 日
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