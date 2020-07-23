// miniprogram/pages/login/login.js
// const requestUrl = require('../../config').requestUrl
const app = getApp();
var login = function(that,info) {
  var lock = that.data.lock;
  if(!lock){
    return;
  }else{
    that.setData({
      lock : false
    })
  }
  
  var finduser, passwod, adminis, gongsi;
  var listAll = [];
  const db = wx.cloud.database();
  var gongsi = app.globalData.gongsi
  console.log(that.data.gongsi)
  //财务
  var system = that.data.system
  if (system=="云合人事管理系统") {
    console.log("1")
    var login = false;
    //人资管理系统
    console.log("ligng")
    var sql = "select id from gongzi_renyuan where L = '" + that.data.gongsi + "' and J = '" + info.inputPwd + "' and I ='" + info.inputName + "'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        console.log("小程序连接数据库成功,返回res为: ", res.result.recordset)
        if (res.result.recordset.length > 0) {
          wx.navigateTo({
            url: '../home/home?id='+res.result.recordset[0].id,
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
          app.globalData.gongsi = that.data.gongsi;
        } else {
          console.log("数据库返回为空！返回res长度为：", res.result.recordset.length)
          wx.showToast({
            title: '输入有误 请重试',
            icon: 'none',
          })
          that.setData({
            lock : true
          })
        }
      },
      err: res => {
        console.log("错误!", res)
        that.setData({
          lock : true
        })
      },
    })
  } else if(system=="云合未来财务系统"){
    console.log("财务管理")
    //财务管理
    var sql = "select * from Account where name = '"+that.data.name+"' and pwd = '"+that.data.pwd+"' and company = '"+that.data.gongsi+"'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        console.log("小程序连接数据库成功,返回res为: ", res)
        if(res.result.name=="RequestError"){
          console.log("数据库连接错误:RequestError")
        }
        if (res.result.recordset.length > 0) {

          var userInfo = res.result.recordset[0]
          wx.navigateTo({
            url: '../c_home/c_home?userInfo='+ JSON.stringify(userInfo)
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
        } else {
          console.log("数据库返回为空！返回res长度为：", res.result.recordset.length)
          wx.showToast({
            title: '输入有误 请重试',
            icon: 'none',
          })
          that.setData({
            lock : true
          })
        }
      },
      fail: res => {
        console.log("小程序连接数据库失败")
        wx.showToast({
          title: '连接数据库出错',
          image: "../../images/icon-no.png",
          mask: true,
          duration: 1000
        })
        that.setData({
          lock : true
        })
      },
      complete: () => {}
    })
  }else if(system=="服务器_jxc"){
    //进销存
    console.log("2")
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select * from yh_jinxiaocun_user where gongsi = '" + that.data.gongsi + "' and `password` = '" + that.data.pwd + "' and `name` ='" + that.data.name + "'"
      },
      success(res) {
        console.log("成功", res)
        if (res.result.length > 0) {
          listAll.push(res.result)
          gongsi = listAll[0][0].gongsi,
            finduser = listAll[0][0].name,
            passwod = listAll[0][0].password,

            adminis = listAll[0][0].AdminIS,
            // openid = listAll[0]._openid,          
            // app.globalData.openid = openid,
            app.globalData.finduser = finduser,
            app.globalData.passwod = passwod,
            app.globalData.adminis = adminis,
            app.globalData.gongsi = gongsi
          console.log("密码对")
          //登录状态写入缓存
          wx.setStorage({
            key: "IsLogin",
            data: true
          })
          wx.switchTab({
            url: '../shouye/shouye'
          })
        } else {
          console.log("密码错误")
          wx.showToast({
            title: '密码错误',
            image: "../../images/icon-no.png",
            mask: true,
            duration: 1000
          })
          that.setData({
            lock : true
          })
        }
        wx.hideNavigationBarLoading(); //隐藏加载
        wx.stopPullDownRefresh();

      },
      fail(res) {
        console.log("失败", res)
        that.setData({
          lock : true
        })
      }
    })
  }else{
    wx.showToast({
      title: '请选择系统',
      icon : 'none'   
    })
  }
  //财务

  // db.collection('Yh_JinXiaoCun_user').where({
  //   name: that.data.name, // 填入当前用户 openid
  //   gongsi: that.data.gongsi

  // }).get({
  //   success: function (res) {
  //     listAll.push(res.data)
  //     // res.data 是包含以上定义的两条记录的数组
  //     // console.log(res.data)
  //     console.log(res.data)
  //     listAll = res.data;
  //     that.setData({
  //       listAll: listAll[0]
  //       // finduser=listAll[0].name,
  //       // passwod= listAll[0].passwod
  //     },
  //       gongsi= listAll[0].gongsi,
  //       finduser = listAll[0].name,
  //       passwod = listAll[0].password,

  //       adminis = listAll[0].AdminIS,
  //       // openid = listAll[0]._openid,          
  //       // app.globalData.openid = openid,
  //       app.globalData.finduser = finduser,
  //       app.globalData.passwod = passwod,
  //       app.globalData.adminis = adminis,
  //       app.globalData.gongsi = gongsi,
  //       console.log(adminis),
  //       console.log(finduser),
  //       console.log(passwod),
  //       console.log(gongsi)
  //     )

  //     if (finduser == that.data.name && that.data.pwd == passwod && that.data.gongsi == gongsi) {
  //       console.log("密码对")
  //       //登录状态写入缓存
  //       wx.setStorage({
  //         key: "IsLogin",
  //         data: true
  //       })
  //       wx.switchTab({
  //         url: '../shouye/shouye'
  //       })
  //     }
  //     else {
  //       console.log("密码错误")
  //       wx.showToast({
  //         title: '密码错误',
  //         image: "../../images/icon-no.png",
  //         mask: true,
  //         duration: 1000
  //       })
  //     }
  //     wx.hideNavigationBarLoading();//隐藏加载
  //     wx.stopPullDownRefresh();

  //   },
  //   fail: function (event) {
  //     wx.hideNavigationBarLoading();//隐藏加载
  //     wx.stopPullDownRefresh();
  //   }
  // })


}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lock : true,
    system : "选择系统",
    systemArray :[],
    pickerArray : [],
    input_text: "",
    name: '',
    pwd: '',
    gongsi: "选择公司"
  },

  getCompanyName : function(arr){
    wx.showLoading({
      title: '获取公司信息中',
      mask : 'true'
    })
    var _this = this;
    wx.cloud.callFunction({
      name: arr[0],
      data: {
        query: arr[1]
      },
      success: res => {
        console.log(res);
        var list = []
        for(var i=0;i<res.result.recordset.length;i++){
          list.push(res.result.recordset[i][arr[2]])
        }
        
        _this.setData({
          pickerArray : list
        })
        wx.hideLoading({
          success: (res) => {},
        })
      },
      err: res => {
        console.log("错误!", res)
      },
    })
  },

  getSystemName : function(){
    var _this = this;
    wx.cloud.callFunction({
      name: 'sqlServer_system',
      data: {
        query: "select systemName from all_systems"
      },
      success: res => {
        var list = []
        for(var i=0;i<res.result.recordset.length;i++){
          list.push(res.result.recordset[i].systemName)
        }
        console.log(list)
        _this.setData({
          systemArray : list
        })
      },
      err: res => {
        console.log("错误!"+ res)
      },
      fail: res =>{
        console.log("失败"+res)
      }
    })
  },

  choice: function(e){
    var _this = this;
    var input_text = _this.data.pickerArray[e.detail.value]
    _this.setData({
      gongsi : input_text
    })
  },

  choice_system : function(e){
    var _this = this;
    var system = _this.data.systemArray[e.detail.value];
    var arr = "";
    if(system=="服务器_jxc"){
      _this.setData({
        system,
      })
      wx.showLoading({
        title: '获取公司信息中',
        mask : 'true'
      })
      var _this = this;
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "select gongsi from yh_jinxiaocun_user GROUP BY gongsi"
        },
        success: res => {
          console.log(res);
          var list = []
          for(var i=0;i<res.result.length;i++){
            list.push(res.result[i].gongsi)
          }
          _this.setData({
            pickerArray : list
          })
          wx.hideLoading({
            success: (res) => {},
          })
          return;
        },
        err: res => {
          console.log("错误!", res)
        },
      })
    }else if(system=="云合人事管理系统"){
      _this.setData({
        system
      })
      arr = ["sqlServer_117","select L from gongzi_renyuan GROUP BY L","L"]
    }else if(system=="云合未来财务系统"){
      _this.setData({
        system
      })
      arr = ["sqlServer_cw","select company from Account GROUP BY company","company"]
    }
    _this.getCompanyName(arr)
  },
  out_choice_system : function(){
  },

  out_choice : function(){
  },
  
  bindNameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindPwdInput: function(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  bindInputLogin: function(e) {
    login(this)
  },

  formLogin: function(e) {
    login(this,e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    
    var that = this;
    app.globalData.finduser = 'name1'
    if (app.globalData.finduser != null && app.globalData.gongsi != null) {
      /*
      wx.switchTab({
        url: '../shouye/shouye'
      })
      */
    }
    // wx.getStorage({
    //   key: 'IsLogin',
    //   success: function (res) {
    //     if (res.data) {

    //       wx.switchTab({
    //         url: '../shouye/shouye'
    //       })
    //       // wx.navigateTo({
    //       //   url: '../shouye/shouye',
    //       // })
    //     }
    //   }
    // })

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
    var _this =this
    _this.getSystemName();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    wx.hideToast({
      success: (res) => {
        console.log("隐藏消息提示框")
      },
    })
    this.setData({
      lock : true
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})