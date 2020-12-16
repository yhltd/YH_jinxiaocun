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
        }
      },
      err: res => {
        console.log("错误!", res)
      },
      complete : function(){
        that.setData({
          lock : true
        })
      }
    })
  } else if(system=="云合未来财务系统"){
    console.log("财务管理")
    //财务管理
    var sql = "select * from Account where name = '"+info.inputName+"' and pwd = '"+info.inputPwd+"' and company = '"+that.data.gongsi+"'"
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
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
      },
      complete : function(){
        that.setData({
          lock : true
        })
      }
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
        }
        wx.hideNavigationBarLoading(); //隐藏加载
        wx.stopPullDownRefresh();
      },
      fail(res) {
        console.log("失败", res)
      },
      complete : function(){
        that.setData({
          lock : true
        })
      }
    })
  } else if(system=="零售管理系统"){
    //零售管理系统
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select id,userName,password,power,shop from zeng_user where userName = '"+info.inputName+"' and password = '"+info.inputPwd+"' and shop = '"+that.data.gongsi+"'"
      },
      success: res => {
        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          wx.navigateTo({
            url: '../z_home/z_home?userInfo='+ JSON.stringify(userInfo)
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
        } else {
          wx.showToast({
            title: '用户名密码错误',
            icon: 'none',
          })
        }
      },
      fail: res => {
        console.log("小程序连接数据库失败")
        wx.showToast({
          title: '连接数据库出错，请联系我公司',
          mask: true,
        })
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  }else if(system=="云合分权编辑系统"){
    var ssql = "select * from baitaoquanxian_renyun where B = '" + that.data.gongsi + "' and E = '" + info.inputPwd + "' and C ='" + info.inputName + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : ssql
      },
      success(res){       
        if(res.result.recordset.length > 0){
            if(info.inputName=="管理员"){
              wx.navigateTo({
                url: '../../100lie_page/pages/shows/shows?gongsi='+ that.data.gongsi + '&name='+ info.inputName
              })
              wx.showToast({
                title: '登录成功',
              })

            }else{
              wx.navigateTo({
                url: '../../100lie_page/pages/show/show?gongsi='+ that.data.gongsi + '&name='+ info.inputName
              })
              wx.showToast({
                title: '登录成功',
              })
              
            }

          
        }else{
          wx.showToast({
            title: '用户名密码不对',
            icon:"none"
          })

        }

      },
      fail(res) {
        console.log("失败", res)
      },
      complete : function(){
        that.setData({
          lock : true
        })
      }
    })
  } else if(system=="零售管理系统"){
    //零售管理系统
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select id,userName,password,power,shop from zeng_user where userName = '"+info.inputName+"' and password = '"+info.inputPwd+"' and shop = '"+that.data.gongsi+"'"
      },
      success: res => {
        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          wx.navigateTo({
            url: '../z_home/z_home?userInfo='+ JSON.stringify(userInfo)
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
        } else {
          wx.showToast({
            title: '用户名密码错误',
            icon: 'none',
          })
        }
      },
      fail: res => {
        console.log("小程序连接数据库失败")
        wx.showToast({
          title: '连接数据库出错，请联系我公司',
          mask: true,
        })
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  }else if(system=="云合信用卡管理系统") {
    var xsql = "select * from users where company = '" + that.data.gongsi + "' and password = '" + info.inputPwd + "' and uname ='" + info.inputName + "'"
    wx.cloud.callFunction({
      
      name: 'sqlserver_xinyongka',
      data: {
        sql: xsql
      },
      
      success(res) {
        if (res.result.length > 0) {
          if (info.inputName == "bbb") {
            wx.navigateTo({
              url: '../../xykManager/pages/logins/logins?company=' + that.data.gongsi + '&uname=' + info.inputName
            })
            wx.showToast({
              title: '登录成功',
            })

          } else {
            wx.navigateTo({
              url: '../../xykManager/pages/login/login?company=' + that.data.gongsi + '&uname=' + info.inputName
            })
            wx.showToast({
              title: '登录成功',
            })

          }


        } else {
          wx.showToast({
            title: '用户名密码不对',
            icon: "none"
          })

        }

      },
      fail(res) {
        console.log("失败", res)
      },
      complete: function () {
        that.setData({
          lock: true
        })
      }
    })

  }else{
    wx.showToast({
      title: '请选择系统',
      icon : 'none'   
    })
    that.setData({
      lock : true
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

function getCompanyTime(that,info,sort_name){
  var date = new Date()
  var nowTime = date.getFullYear()+"/"+(parseInt(date.getMonth())+1)+"/"+date .getDate()
  var sql = "select CASE endtime WHEN '"+nowTime+"' THEN 1 ELSE 0 END as endtime,CASE mark2 WHEN '"+nowTime+"' THEN 1 ELSE 0 END as mark2 from control_soft_time where soft_name = '"+sort_name+"'"
  if(sort_name=='云合未来财务系统'){
    sql += " and name = '"+that.data.gongsi+"'"
  }
  wx.cloud.callFunction({
    name : 'sqlServer_system',
    data : {
      query : sql
    },
    success : res=> {
      var list = res.result.recordset
      var result = ""
      if(list[0].endtime == 1){
        result = "工具到期，请联系我公司续费"
      }else if(list[0].mark2 == 1){
        result = "服务器到期，请联系我公司续费"
      }
      if(result==""){
        login(that,info)
      }else{
        wx.showModal({
          title : '提示',
          content : result,
          showCancel: false,
        })
        return;
      }
    }
  })
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
    wx.showLoading({
      title: '获取系统信息中',
      mask : 'true'
    })
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
        _this.setData({
          systemArray : list
        })
      },
      err: res => {
        console.log("错误!"+ res)
      },
      complete : function(){
        wx.hideLoading({
          success: (res) => {},
        })
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
    if(system=="零售管理系统"){
      _this.setData({
        gongsi : "选择店铺"
      })
    }else{
      _this.setData({
        gongsi : "选择公司"
      })
    }
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
        fail:res=>{
          console.log(res)
        }
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
    }else if(system=="零售管理系统"){
      _this.setData({
        system
      })
      arr = ["sqlServer_117","select shop from zeng_user GROUP BY shop","shop"]
    }else if(system == "云合分权编辑系统"){
      _this.setData({
        system
      })
      arr = ["sqlServer_117","select B from baitaoquanxian_renyun GROUP BY B","B"]
    } else if (system == "云合信用卡管理系统") {
      _this.setData({
        system,
      })
      wx.showLoading({
        title: '获取公司信息中',
        mask: 'true'
      })
      var _this = this;
      wx.cloud.callFunction({
        name: "sqlserver_xinyongka",
        data: {
          sql: "select company from users group by company"
        },
        success: res => {
          console.log(res);
          var list = []
          for (var i = 0; i < res.result.length; i++) {
            list.push(res.result[i].company)
          }
          _this.setData({
            pickerArray: list
          })
          wx.hideLoading({
            success: (res) => { },
          })
          return;
        },
        err: res => {
          console.log("错误!", res)
        },
      })
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
    if(this.data.system=="云合未来财务系统"){
      getCompanyTime(this,e.detail.value,'财务')
    }else if(this.data.system=="零售管理系统"){
      getCompanyTime(this,e.detail.value,this.data.system)
    }else{
      login(this,e.detail.value)
    }
  },

  formLogin: function(e) {
    if(this.data.system=="云合未来财务系统"){
      getCompanyTime(this,e.detail.value,'财务')
    }else if(this.data.system=="零售管理系统"){
      getCompanyTime(this,e.detail.value,this.data.system)
    }else{
      login(this,e.detail.value)
    }
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