var app = getApp();
let register = false;

Page({
  data: {

    // 小程序版本
    version: "1.0.0",

    // 用户信息
    userInfo: {
      avatarUrl: "/images/avatar_user_0.png",
      bind_account: {
        zxyy_id: "------"
      },
      doctor: false
    },
    finduser: "",
    listAll: [],
  },

  onShow: function () {

    var that = this;
    var listAll = [];

    console.log('1111');
    const db = wx.cloud.database();
    db.collection('Yh_JinXiaoCun_user').where({
      name: app.globalData.finduser
    })
      .get({

        success(res) {
          listAll.push(res.data)
          that.setData({
            // finduser: app.globalData.finduser,
            listAll: listAll[0]
          },
            console.log(listAll)
          )
        }
      }),

      // 初始化版本
      this.setData({
        finduser: app.globalData.finduser

      },

      );
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
  navgiate: function () {
    //登录状态写入缓存
    wx.setStorage({
      key: "IsLogin",
      data: false
    }),
      wx.navigateTo({
        url: '../login/login',
      })

  }

});