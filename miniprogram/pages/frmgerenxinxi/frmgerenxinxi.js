var app = getApp();
let register = false;

Page({
  data: {

    // 小程序版本
    version: "1.0.0",

    // 用户信息
    userInfo: {
      avatarUrl: "/images/login.png",
      bind_account: {
        zxyy_id: "------"
      },
      doctor: false
    },
    finduser: "",
    listAll: [],
    isUpdPwd :true,
    empty : ""
  },

  onShow: function () {

    var that = this;
    var listAll = [];
    const db = wx.cloud.database();
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi 
    wx.cloud.callFunction({
      name : 'sqlConnection',
      data : {
        sql : "select * from yh_jinxiaocun_user where gongsi = '"+gongsi+"' and name = '"+finduser+"'"
      },
      success : res=> {
        that.setData({
          listAll : res.result
        })
      }
    })
    this.setData({
      finduser: app.globalData.finduser
    })
  },

  onLoad: function (a) {
    // 监听数据 同步全局
    Object.defineProperty(this.data, "userInfo", {
      set: data => {
        app.globalData.userInfo = data;
      }
    });
  },

  // 提示版本
  printVersion: function () {
    this.setData({
      toast: {
        text: "VERSION " + this.data.version,
        icon: "loading",
        hideTime: 4e3
      }
    });
  },

  // 设置账号
  settingAccount: function (res, load) {
    // if (this.__viewData__.userInfo.xcxid) return;

    // 兼容事件处理
    res.detail && (res = res.detail);
  },

  Show_updPwd : function(){
    this.setData({
      isUpdPwd : false
    })
  },
  backUpdPwd : function(){
    this.setData({
      isUpdPwd : true
    })
  },
  updPwd : function(e){
    var _this = this;
    var listAll = _this.data.listAll;
    var oldPwd = e.detail.value.oldPwd
    var newPwd = e.detail.value.newPwd==e.detail.value.newPwd_again?e.detail.value.newPwd:""
    if(newPwd==""){
      wx.showToast({
        title: '两次新密码输入不一致',
        icon : 'none'
      })
      return;
    }
    if(listAll[0].password!=oldPwd){
      wx.showToast({
        title: '旧密码错误',
        icon : 'none'
      })
      return;
    }
    wx.cloud.callFunction({
      name : 'sqlConnection',
      data : {
        sql : "update yh_jinxiaocun_user set password = '"+newPwd+"' where _id = '"+listAll[0]._id+"'"
      },
      success : res=> {
        
        if(res.result.changedRows >= 1){
          wx.showToast({
            title: '修改成功',
            icon : 'success'
          })
          this.setData({
            isUpdPwd : true,
            empty : ""
          })
        }
      }
    })
  },
  

  navgiate: function (e) {
    //登录状态写入缓存
    wx.setStorage({
      key: "IsLogin",
      data: false
    })
    if(e.currentTarget.dataset.delta=="2"){
      wx.reLaunch({
        url: '../../pages/login/login',
      })
      return;
    }
    wx.navigateBack({
      delta : parseInt(e.currentTarget.dataset.delta),
      complete: (res) => {},
    })
  },

  toHome: function(){
    wx.navigateTo({
      url: '../shouye/shouye',
    })
  }

});