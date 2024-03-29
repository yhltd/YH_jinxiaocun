//app.js

var rkall=[]
var szsl=[]
var szje=[]
var cpsum =0
var dateUtil = require('./utils/date.js');
App({
  globalData: {
    //瑞利达小程序，批量选择商品存储变量
    ruili_pro:[],
    userNum:'',
    gongsi:"",
    finduser: "",
    passwod: "",
    adminis: "",
    file_path_linshi:'',
    userInfo: null,
    header: {
      'Cookie': ''

    },
    openid:"",
    this_id1: '', //填写微信小程序this_id
    this_id2:'',
    this_id3:'',
    sec_dd1: '',//填写微信小程序sec_dd
    sec_dd2: '',
    sec_dd3: '',
    imageInfopath: "cloud://yhltd-lzok7.7968-yhltd-lzok7/tupian/",
    imageInfopath2:"cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/yhltd_wechar/tupian/",
    cookie: "",
    nickName: "",
    gender: "",
    avatarUrl: "",
    province: "",
    city: "",
    country: "",
    language: "",
    //财务系统用来计算用户数据库容量
    spaceList_cw : {
      list_table : [],
      usedSpace : 0,
      allSpace : 0
    },
    //排产系统用来计算用户数据库容量
    spaceList_pc : {
      list_table : [],
      usedSpace : 0,
      allSpace : 0
    },
    //零售管理系统用来计算用户数据库容量
    spaceList_z : {
      list_table : [],
      usedSpace : 0,
      allSpace : 0
    },
    z_option_BLE : {
      deviceId : "",
      serviceId : "",
      characteristicId : ""
    },

    paichan_user: {
      gongsi:"",
    }
  },

  



  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'my-env-id',
        env:'yhltd-hsxl2',
        traceUser: true,
      })
    }

    var _this = this
    var sql = "select * from wechart_peizhi"
    wx.cloud.callFunction({
      name : 'sqlServer_system',
      data : {
        query : sql
      },
      success : res=> {
        var _this = this
        var list = res.result.recordset[0]
        _this.globalData.this_id1 = list.this_id
        _this.globalData.sec_dd1 = list.this_sec
        var that = this
        var user = wx.getStorageSync('user') || {};
        var userInfo = wx.getStorageSync('userInfo') || {};
        if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
          wx.login({
            success: function (res) {
              if (res.code) {
                wx.getUserInfo({
                  success: function (res) {
                    var objz = {};
                    objz.avatarUrl = res.userInfo.avatarUrl;
                    objz.nickName = res.userInfo.nickName;
                    console.log(objz);
                    wx.setStorageSync('userInfo', objz);//存储userInfo
                  }
                });

                var d = that.globalData;//这里存储了this_id、sec_dd、token串  
                var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.this_id1 + d.this_id2 + d.this_id3 + '&secret=' + d.sec_dd1 + d.sec_dd2 + d.sec_dd3 + '&js_code=' + res.code + '&grant_type=authorization_code';

                wx.setStorageSync('url', l);
                wx.request({
                  url: l,
                  data: {},
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
                  // header: {}, // 设置请求的 header  
                  success: function (res) {
                    var obj = {};
                    obj.openid = res.data.openid;
                    obj.expires_in = Date.now() + res.data.expires_in;

                    wx.setStorageSync('openid', obj);//存储openid  
                    console.log(obj);
                  
                  }
                });
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          });
        }
      }
    })
  }
})

