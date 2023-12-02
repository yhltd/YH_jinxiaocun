var QQMapWX = require("../utils/qqmap-wx-jssdk");
var qqmapsdk = new QQMapWX({
  key: 'KKRBZ-TBCW3-TXD37-OWJED-QYFPF-VYFCL'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    songhuoyuan:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    console.log(userInfo)
    _this.setData({
      userInfo:userInfo
    })
    wx.getLocation({
      isHighAccuracy: true,
      type: 'gcj02',
      success (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        _this.setData({
          latitude: latitude,
          longitude: longitude,
          markers:[{
            id: 0,
            iconPath: '../../images/start.png',
            latitude: latitude,
            longitude: longitude,
            width:64,
            height:64
          }]
         })
      }
     })
    // _this.getWxLocation()
    var sql = "select name,id from userInfo where power = '管理员' or power = '操作员'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var songhuoyuan_list = res.result.recordset
        console.log(songhuoyuan_list)
        _this.setData({
          songhuoyuan_list
        })
      },
      err: res => {
        wx.showToast({
          title: '读取下拉列表错误！',
          icon: 'none'
        })
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

  onInput_text: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]:  e.detail.value
    })
    if(column == 'songhuoyuan'){
      var new_id = ''
      var list = _this.data.songhuoyuan_list
      for(var i=0; i<list.length; i++){
        if(list[i].name == e.detail.value){
          new_id = list[i].id
          break;
        }
      }
      if(new_id != ''){
        _this.setData({
          new_id
        })
      }else{
        _this.setData({
          new_id:''
        })
      }
      console.log(new_id)
    }
  },

  header_xiala: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + '_list']
    var new_list = []
    if(_this.data.songhuoyuan != ''){
      for(var i=0; i<list.length; i++){
        if(list[i].name.indexOf(_this.data.songhuoyuan) != -1){
          new_list.push(list[i])
        }
      }
    }else{
      new_list = list
    }
    _this.setData({
      list_xiala: new_list,
      click_column:column,
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
      var new_id = e.detail.id
      var click_column = _this.data.click_column
      _this.setData({
        xlShow2: false,
        [click_column]: new_val,
        new_id:new_id
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },

  sel_weizhi:function(){
    var _this = this
    var id = _this.data.new_id
    console.log(id)
    if (id == ''){
      wx.showToast({
        title: '请选择送货员！',
        icon: 'none'
      })
      return;
    }
    var songhuoyuan = _this.data.songhuoyuan
    var sql = "select zhongdian_jihua,dingwei,dingwei_shijian,zhongdian,zhongdian_name,isnull(jihua_mingxi,'') as jihua_mingxi from userInfo as us left join peisong_jihua as ps on us.zhongdian_jihua = ps.id where us.id =" + id + ";select order_number + ' ' + customer_name as content,erqi_peisongdan.quyu,songhuoyuan,wancheng,isnull(address,'') as address,isnull(address_name,'') as address_name from erqi_peisongdan left join (select address,address_name,company from userInfo where address != '') as userinfo on erqi_peisongdan.customer_name = userinfo.company where songhuoyuan = '" + songhuoyuan + "' and wancheng = '正在配送'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var songhuoyuan_list = res.result.recordsets[0]
        console.log(songhuoyuan_list)
        var this_weizhi = songhuoyuan_list[0].dingwei
        console.log(this_weizhi)
        var this_zhongdian = songhuoyuan_list[0].zhongdian
        var jihua_list = res.result.recordsets[1]
        var this_mingxi = ""
        var this_mingxi2 = []
        var this_index = 0
        for (var i = 0; i < jihua_list.length; i++) {
          if (jihua_list[i].address != '') {
            var this_la = jihua_list[i].address.split(',')[0] * 1
            var this_lo = jihua_list[i].address.split(',')[1] * 1
            this_mingxi2.push({
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
        if(this_mingxi2.length > 0){
          this_mingxi = this_mingxi2
        }
        if(this_weizhi == ''){
          wx.showToast({
            title: '未读取到此用户定位信息',
            icon: 'none'
          })
          return;
        }else{
          if(this_mingxi != ''){
            var markers = this_mingxi
            var e = [this_weizhi,this_zhongdian]
            _this.formSubmit(e)
            this_weizhi = this_weizhi.split(',')
            markers.push({
              id: this_index,
              iconPath: '../../images/start.png',
              latitude: this_weizhi[0],
              longitude: this_weizhi[1],
              width:64,
              height:64
            })
            console.log(markers)
            this_zhongdian = this_zhongdian.split(',')
            _this.setData({
              last_date: songhuoyuan_list[0].dingwei_shijian,
              latitude: this_weizhi[0] * 1,
              longitude: this_weizhi[1] * 1,
              markers: markers
            })
          }else{
            this_weizhi = this_weizhi.split(',')
            _this.setData({
              last_date: songhuoyuan_list[0].dingwei_shijian,
              latitude: this_weizhi[0] * 1,
              longitude: this_weizhi[1] * 1,
              markers:[
                {
                  id: 0,
                  iconPath: '../../images/start.png',
                  latitude: this_weizhi[0] * 1,
                  longitude: this_weizhi[1] * 1,
                  width:64,
                  height:64
                }
              ]
              })
              console.log(_this.data.markers)
          
          }
        }
      },
      err: res => {
        wx.showToast({
          title: '读取下拉列表错误！',
          icon: 'none'
        })
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
    return new Promise((resolve, reject) => {
      const _locationChangeFn = (res) => {
        console.log('location change', res)
        wx.offLocationChange(_locationChangeFn)
        var zuobiao = res.latitude + "," + res.longitude
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers:[{
            id: 0,
            iconPath: '../../images/start.png',
            latitude: res.latitude,
            longitude: res.longitude,
            width:64,
            height:64
          }]
         })
      }
      wx.startLocationUpdate({
        isHighAccuracy:true,
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

  onShow: function () {

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