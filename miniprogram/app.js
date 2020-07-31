//app.js

var rkall=[]
var szsl=[]
var szje=[]
var cpsum =0
var dateUtil = require('./utils/date.js');
App({
  globalData: {
    gongsi:"",
    finduser: "",
    passwod: "",
    adminis: "",
    userInfo: null,
    header: {
      'Cookie': ''

    },
    openid:"",
    appid: 'wxf3c03c2a0c59d299', //填写微信小程序appid
    secret: '8dc02d24aada51fb37721a2d8fcea8ee',//填写微信小程序secret
    imageInfopath: "cloud://yhltd-lzok7.7968-yhltd-lzok7/tupian/",
    cookie: "",
    nickName: "",
    gender: "",
    avatarUrl: "",
    province: "",
    city: "",
    country: "",
    language: "",
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
                //console.log(objz);
                wx.setStorageSync('userInfo', objz);//存储userInfo
              }
            });


            var d = that.globalData;//这里存储了appid、secret、token串  
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';

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

