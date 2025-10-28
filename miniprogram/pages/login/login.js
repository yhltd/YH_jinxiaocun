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
  console.log("1212",that.data.gongsi)
  //财务
  var system = that.data.system
  if (system=="云合人事管理系统") {
    console.log("1")
    var login = false;
    //人资管理系统
    console.log("ligng")
    var sql = "select id,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,wechart_user from gongzi_renyuan where L = '" + that.data.gongsi + "' and J = '" + info.inputPwd + "' and I ='" + info.inputName + "'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        console.log("小程序连接数据库成功,返回res为: ", res.result.recordset)

        if (res.result.recordset && res.result.recordset.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.recordset.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result.recordset);
        }

        if (res.result.recordset.length > 0) {
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../home/home?id='+res.result.recordset[0].id + '&userInfo=' + JSON.stringify(res.result.recordset[0])
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
          app.globalData.gongsi = that.data.gongsi;
          app.globalData.userNum = that.data.userNum;
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
    var sql = "select id,company,pwd,do,name,salt,bianhao,wechart_user,xingming from Account where name = '"+info.inputName+"' and pwd = '"+info.inputPwd+"' and company = '"+that.data.gongsi+"'"
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {

        if (res.result.recordset && res.result.recordset.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.recordset.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result.recordset);
        }

        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../c_home/c_home?userInfo='+ JSON.stringify(userInfo)
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
          app.globalData.userInfo = userInfo
          app.globalData.userNum = that.data.userNum;
          console.log(app.globalData.userInfo)
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
          image: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/icon-no.png",
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
  }else if(system=="云合未来进销存系统"){
    //进销存
    console.log("2")
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select _id,AdminIS,Btype,Createdate,_openid,gongsi,jigoudaima,name,password,mi_bao,C_id,wechart_user from yh_jinxiaocun_user where gongsi = '" + that.data.gongsi + "' and `password` = '" + that.data.pwd + "' and `name` ='" + that.data.name + "'"
       
      },
      success(res) {
        console.log("成功", res)

        if (res.result && res.result.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result);
        }

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
            app.globalData.userNum = that.data.userNum;
          console.log("密码对")
          //登录状态写入缓存
          wx.setStorage({
            key: "IsLogin",
            data: true
          })
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.switchTab({
            url: '../shouye/shouye'
          })
        } else {
          console.log("密码错误")
          wx.showToast({
            title: '密码错误',
            image: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/icon-no.png",
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
  }else if(system=="云合教务管理系统"){
    //进销存
    console.log("2")
    wx.cloud.callFunction({
      name: "sql_jiaowu",
      data: {
        sql: "select ID,UserName,Password,RealName,UseType,Age,Phone,Home,photo,Education,Company,state,wechart_user from teacher where Company = '" + that.data.gongsi + "' and `Password` = '" + that.data.pwd + "' and `UserName` ='" + that.data.name + "'"
      },
      success(res) {
        console.log("成功", res)

        if (res.result && res.result.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result);
        }

        if (res.result.length > 0) {
          var userInfo = res.result[0]
          console.log(userInfo)
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../../package_jiaowu/pages/shows/shows?userInfo='+JSON.stringify(userInfo)
          })
          app.globalData.userNum = that.data.userNum;
        } else {
          console.log("密码错误")
          wx.showToast({
            title: '密码错误',
            image: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/icon-no.png",
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
  }
  
  else if(system=="零售管理系统"){
    wx.showLoading({
      title: '正在登录',
      mask: true
    })
    //零售管理系统
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select id,userName,password,power,shop from zeng_user where userName = '"+info.inputName+"' and password = '"+info.inputPwd+"' and shop = '"+that.data.gongsi+"'"
      },
      success: res => {
        wx.hideLoading({
          success: (res) => {},
        })
        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
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
    var ssql = "select B,C,D,E,renyuan_id,zhuangtai,email,phone,bianhao,quanxian_id,bumen,wechart_user from baitaoquanxian_renyun where B = '" + that.data.gongsi + "' and E = '" + info.inputPwd + "' and D ='" + info.inputName + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : ssql
      },
      success(res){       

        if (res.result.recordset && res.result.recordset.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.recordset.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result.recordset);
        }
        
        if(res.result.recordset.length > 0){
          let user = res.result.recordset[0]
          if(user.zhuangtai != '正常'){
            wx.showToast({
              title: '此账号已被锁定',
              icon:"none"
            })
            return;
          }
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../../100lie_page/pages/shows/shows?userInfo='+JSON.stringify(user)
          })
          app.globalData.userNum = that.data.userNum;
          wx.showToast({
            title: '登录成功',
          })
        }else{
          wx.showToast({
            title: '用户名或密码错误',
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
    wx.showLoading({
      title: '正在登录',
      mask: true
    })
    //零售管理系统
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select id,userName,password,power,shop from zeng_user where userName = '"+info.inputName+"' and password = '"+info.inputPwd+"' and shop = '"+that.data.gongsi+"'"
      },
      success: res => {
        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
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
  }else if(system=="云合智慧门店收银系统") {
    var xsql = "select id,company,position,uname,account,password,wechart_user from users where company = '" + that.data.gongsi + "' and password = '" + info.inputPwd + "' and account ='" + info.inputName + "'"
    wx.cloud.callFunction({
      
      name: 'sqlserver_xinyongka',
      data: {
        sql: xsql
      },
      success(res) {

        if (res.result && res.result.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result);
          console.log("处理mima: ", res.result[0].password);
        }

        if (res.result.length > 0) {
          if (info.inputName == "bbb") {
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            
            wx.navigateTo({
              url: '../x_home/x_home?company=' + that.data.gongsi + '&uname=' + info.inputName + '&id=' + res.result[0].id + '&position=' + res.result[0].position + '&zname=' + res.result[0].uname + '&password=' + res.result[0].password
            })
            wx.showToast({
              title: '登录成功',
            })
          } else {
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            wx.navigateTo({
              url: '../x_home/x_home?company=' + that.data.gongsi + '&uname=' + info.inputName + '&id=' + res.result[0].id + '&position=' + res.result[0].position + '&zname=' + res.result[0].uname + '&password=' + res.result[0].password
            })
            wx.showToast({
              title: '登录成功',
            })

          }
          app.globalData.userNum = that.data.userNum;

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

  } else if (system == "云合排产管理系统") {
    wx.showLoading({
      title: '正在登录',
      mask: true
    })
    //零售管理系统
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select id,user_code,password,company,department_name,state,wechart_user from user_info where user_code = '" + info.inputName + "' and password = '" + info.inputPwd + "' and company = '" + that.data.gongsi + "'"
      },
      success: res => {
        wx.hideLoading({
          success: (res) => { },
        })

        if (res.result.recordset && res.result.recordset.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.recordset.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result.recordset);
        }

        //app.paichan_user.gongsi = that.data.gongsi
        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          console.log("denglu",userInfo)
          if(userInfo.state != '正常'){
            wx.showToast({
              title: '此账号已被锁定',
              icon: 'none'
            })
            return;
          }
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            // url: '../../packageP/page/PeiZhiBiao/PeiZhiBiao'
            url: '../../packageP/page/PeiZhiBiao/PeiZhiBiao?userInfo='+JSON.stringify(userInfo)
          })
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
          console.log("paichan"+info.inputName)
          app.globalData.gongsi = that.data.gongsi
          app.globalData.finduser = info.inputName
          app.globalData.userNum = that.data.userNum;
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
          lock: true
        })
      }
    })

    //803登录  20210709  胡超
  }else if(system =="智居生产平台"){
    console.log("803登录")
    wx.showLoading({
      title:'正在登录...'
    })
    var sql = "select * from user_info where username = '" + info.inputName + "' and password = '" + info.inputPwd + "';select customerName as name,zhanghao as username,mima as password,'客户' as quanxian,khpower from customerInformation where zhanghao = '" + info.inputName + "' and mima = '" + info.inputPwd + "' and zhanghao != '' and mima != ''";
    
    wx.cloud.callFunction({
      
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success(res) {
        console.log(res)
        if(res.result.recordsets[0].length == 0 && res.result.recordsets[1].length == 0 && info.inputName == '' && info.inputPwd == ''){
          wx.hideLoading()
          
          wx.showModal({
            title: "提示",
            content: '是否以游客身份登录?',
            cancelColor: '#282B33',
            confirmColor: '#BC4A4A',
            success: res => {
              if (res.confirm) {
                var userInfo = {
                  name: '游客',
                  username: '',
                  password: '',
                  quanxian: '游客',
                }
                wx.navigateTo({
                  url: '../../package_tb3999803/pages/chanpin/chanpin?userInfo=' + JSON.stringify(userInfo)
                })
              } else if (res.cancel) {
                wx.showToast({
                  title: '已取消',
                  icon: 'none',
                  duration: 3000
                })
              }
            }
          })
          // wx.showToast({
          //   title: '用户密码错误',
          //   icon: 'none'
          // })
        }
        else if(res.result.recordsets[0].length == 0 && res.result.recordsets[1].length == 0){
          wx.hideLoading()
          wx.showToast({
            title: '用户密码错误',
            icon: 'none'
          })
        }else{
          if (res.result.recordsets[0].length > 0) {
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            console.log("跳转")
            wx.navigateTo({
              url: '../../package_tb3999803/pages/wode/wode?userInfo=' + JSON.stringify(res.result.recordsets[0][0])
            })
            wx.hideLoading()
            wx.showToast({
              title: '登录成功',
            })
          }else if (res.result.recordsets[1].length > 0) {
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            console.log("跳转")
            wx.navigateTo({
              url: '../../package_tb3999803/pages/wode/wode?userInfo=' + JSON.stringify(res.result.recordsets[1][0])
            })
            wx.hideLoading()
            wx.showToast({
              title: '登录成功',
            })
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '用户名密码错误',
              icon: "none"
            })
          }
        }
      },
      fail(res) {
        wx.hideLoading()
        console.log("失败", res)
      },
      complete: function () {
        that.setData({
          lock: true
        })
      }
    })
  //结束
  
  }else if(system =="合同管理系统"){
    console.log("合同管理系统")
    //合同管理系统
    var sql = "select * from contract_personnel where user_name = '"+info.inputName+"' and password = '"+info.inputPwd+"' and company = '"+that.data.gongsi+"'"
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../../packageH/page/index/index?userInfo='+ JSON.stringify(userInfo)
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
          app.globalData.userInfo = userInfo
          console.log(app.globalData.userInfo)
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
          image: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/icon-no.png",
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
  }else if(system =="浙江省磐安外贸药业"){
    console.log(system)
    var sql = "select * from userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          var sql = "select * from userPower where user_id=" + user_list.id
          wx.cloud.callFunction({
            name: 'sqlserver_zhejiang',
            data:{
              query : sql
            },
            success : res =>{
              var list = res.result.recordset
              console.log(user_list)
              console.log(list)
              if(that.data.jizhu_panduan){
                that.remember_user(info.inputName,info.inputPwd)
              }else{
                that.remove_user()
              }
              wx.navigateTo({
                url:'../../miniprogram/pages/peizhi/peizhi?userInfo='+JSON.stringify(user_list) + "&userPower=" + JSON.stringify(list)
              })
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
              console.log(res)
              wx.showToast({
                title: '请求失败！',
                icon: 'none',
                duration: 3000
              })
              console.log("请求失败！")
            }
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="霸州市智科启达自动化"){
    console.log(system)
    var sql = "select * from userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_bazhou',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(user_list.power != '制造商'){
            wx.showToast({
              title: '非制造商账号，不能登录',
              icon:'none',
            })
          }else{
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            wx.navigateTo({
              url:'../../package_bazhou/pages/index/index?userInfo='+JSON.stringify(user_list)
            })
          }
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="华群家具材料" && that.data.gongsi == '订单管理系统'){
    console.log(system)
    var sql = "select * from userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url:'../../package_huaqun/page/shows/shows?userInfo='+JSON.stringify(user_list)
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="瑞利达物资贸易" ){
    console.log(system)
    var sql = "select * from userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url:'../../package_ruilida/page/shows/shows?userInfo='+JSON.stringify(user_list)
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="华群家具材料" && that.data.gongsi == '配送管理系统'){
    console.log(system)
    var sql = "select * from erqi_userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url:'../../package_huaqun_erqi/page/shows/shows?userInfo='+JSON.stringify(user_list)
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="幻尘萌"){
    console.log(system)
    var sql = "select * from login where E ='" + info.inputName + "' and F = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url:'../../package_huanchenmeng/pages/shows/shows?userInfo='+JSON.stringify(user_list)
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="销售管理系统"){
    console.log(system)
    var sql = "select * from userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(user_list.power == '客户'){
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            wx.navigateTo({
              url:'../../package_yiwa/pages/shows_kehu/shows_kehu?userInfo='+JSON.stringify(user_list)
            })
          }else{
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            wx.navigateTo({
              url:'../../package_yiwa/pages/shows/shows?userInfo='+JSON.stringify(user_list)
            })
          }
          
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else{
    wx.showToast({
      title: '请选择系统',
      icon : 'none'   
    })
    that.setData({
      lock : true
    })
  }
}



function getCompanyTime(that,info,sort_name){
  var date = new Date()
  var nowTime = date.getFullYear()+"/"+(parseInt(date.getMonth())+1)+"/"+date.getDate()
  var sql = "select CASE WHEN endtime < '"+nowTime+"' THEN 1 ELSE 0 END as endtime,CASE WHEN mark2<'"+nowTime+"' THEN 1 ELSE 0 END as mark2,mark1,isnull(mark3,'') as mark3 from control_soft_time where soft_name ='"+sort_name+"'"

  if(sort_name=='财务' || sort_name=='排产' || sort_name=='人事' || sort_name=='进销存' || sort_name=='分权' || sort_name=='门店' || sort_name=='教务'){
    sql += " and name = '"+that.data.gongsi+"'"
  }
  console.log(sql)
  wx.cloud.callFunction({
    name : 'sqlServer_system',
    data : {
      query : sql
    },
    success : res=> {
      var list = res.result.recordset
      var result = ""
      console.log(list)
      if(list[0].endtime == 1){
        result = "工具到期，请联系我公司续费"
      }else if(list[0].mark2 == 1){
        result = "服务器到期，请联系我公司续费"
      }
      if(list[0].mark3 != null && list[0].mark3 != undefined){
        list[0].mark3 = list[0].mark3.trim()
        if(list[0].mark3 != ""){
          list[0].mark3 = list[0].mark3.split(":")[1]
          list[0].mark3 = list[0].mark3.replace("(","")
          list[0].mark3 = list[0].mark3.replace(")","")
        }
        that.setData({
          userNum: list[0].mark3
        })
      }
      console.log(list[0].mark3)
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
    gongsi: "选择公司",
    jizhu_panduan:false,
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

  checkboxChange(e){
    var _this = this
    _this.setData({
      jizhu_panduan: !_this.data.jizhu_panduan
    })
    console.log(_this.data.jizhu_panduan)
  },

  remember_user(username,password){
    var _this = this
    wx.setStorage({
      key:"user",
      data:username
    })
    wx.setStorage({
      key:"pass",
      data:password
    })
    wx.setStorage({
      key:"system",
      data:_this.data.system
    })
    wx.setStorage({
      key:"gongsi",
      data:_this.data.gongsi
    })
  },

  remove_user(){
    wx.removeStorage({
      key: 'user',
      success (res) {
          console.log(res.errMsg)
      }
    })
    wx.removeStorage({
      key: 'pass',
      success (res) {
          console.log(res.errMsg)
      }
    })
    wx.removeStorage({
      key: 'system',
      success (res) {
          console.log(res.errMsg)
      }
    })
    wx.removeStorage({
      key: 'gongsi',
      success (res) {
          console.log(res.errMsg)
      }
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

    //803登录  20210709  胡超
    if (system == '智居生产平台'){
      _this.setData({
        system,
        gongsi : '智居生产平台',
        pickerArray: ['智居生产平台']
      })
      return;
    //结束

    }else if(system == '浙江省磐安外贸药业'){
      _this.setData({
        system,
        gongsi : '浙江省磐安外贸药业',
        pickerArray: ['浙江省磐安外贸药业']
      })
      return;
    }else if(system == '霸州市智科启达自动化'){
      _this.setData({
        system,
        gongsi : '霸州市智科启达自动化',
        pickerArray: ['霸州市智科启达自动化']
      })
      return;
    }else if(system == '华群家具材料'){
      // _this.setData({
      //   system,
      //   gongsi : '订单管理系统',
      //   pickerArray: ['订单管理系统','配送管理系统']
      // })
      _this.setData({
        system,
        gongsi : '订单管理系统',
        pickerArray: ['订单管理系统']
      })
      return;
    }else if(system == '瑞利达物资贸易'){
      // _this.setData({
      //   system,
      //   gongsi : '订单管理系统',
      //   pickerArray: ['订单管理系统','配送管理系统']
      // })
      _this.setData({
        system,
        gongsi : '瑞利达物资贸易',
        pickerArray: ['瑞利达物资贸易']
      })
      return;
    }else if(system == '幻尘萌'){
      _this.setData({
        system,
        gongsi : '幻尘萌',
        pickerArray: ['幻尘萌']
      })
      return;
    }else if(system == '销售管理系统'){
      _this.setData({
        system,
        gongsi : '销售管理系统',
        pickerArray: ['销售管理系统']
      })
      return;
    }else{
      _this.setData({
        gongsi : "选择公司",
        pickerArray: []
      })
    }
    if(system=="零售管理系统"){
      _this.setData({
        gongsi : "选择店铺"
      })
    }else{
      _this.setData({
        gongsi : "选择公司"
      })
    }
    if(system=="云合未来进销存系统"){
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
    }if(system=="云合教务管理系统"){
      _this.setData({
        system,
      })
      wx.showLoading({
        title: '获取公司信息中',
        mask : 'true'
      })
      var _this = this;
      wx.cloud.callFunction({
        name: "sql_jiaowu",
        data: {
          sql: "select Company from teacher GROUP BY Company"
        },
        success: res => {
          console.log(res);
          var list = []
          for(var i=0;i<res.result.length;i++){
            list.push(res.result[i].Company)
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
    }
    else if(system=="云合人事管理系统"){
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
    } else if (system == "云合智慧门店收银系统") {
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
    } else if (system == "云合排产管理系统") {
      _this.setData({
        system
      })
      arr = ["sqlServer_PC", "select company from user_info GROUP BY company", "company"]
    } else if (system == "合同管理系统"){
      _this.setData({
        system,
      })
      arr = ["sqlServer_cw","select company from contract_personnel GROUP BY company","company"]
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

  formLogin: function(e) {
    var _this = this

    if(this.data.system=="云合未来财务系统"){
      getCompanyTime(this,e.detail.value,'财务')
    }else if(this.data.system=="云合排产管理系统"){
      getCompanyTime(this,e.detail.value,'排产')
    }else if(this.data.system=="云合人事管理系统"){
      getCompanyTime(this,e.detail.value,'人事')
    }else if(this.data.system=="云合未来进销存系统"){
      getCompanyTime(this,e.detail.value,'进销存')
    }else if(this.data.system=="云合分权编辑系统"){
      getCompanyTime(this,e.detail.value,'分权')
    }else if(this.data.system=="云合智慧门店收银系统"){
      getCompanyTime(this,e.detail.value,'门店')
    }else if(this.data.system=="云合教务管理系统"){
      getCompanyTime(this,e.detail.value,'教务')
    }else if(this.data.system=="零售管理系统" || this.data.system == "销售管理系统" || this.data.system == "浙江省磐安外贸药业" || this.data.system == "华群家具材料"){
      getCompanyTime(this,e.detail.value,this.data.system)
    }else{
      login(this,e.detail.value)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function(e) {
    
  //   var that = this;
  //   app.globalData.finduser = 'name1'
  //   if (app.globalData.finduser != null && app.globalData.gongsi != null) {
  //     /*
  //     wx.switchTab({
  //       url: '../shouye/shouye'
  //     })
  //     */
  //   }
  //   // wx.getStorage({
  //   //   key: 'IsLogin',
  //   //   success: function (res) {
  //   //     if (res.data) {

  //   //       wx.switchTab({
  //   //         url: '../shouye/shouye'
  //   //       })
  //   //       // wx.navigateTo({
  //   //       //   url: '../shouye/shouye',
  //   //       // })
  //   //     }
  //   //   }
  //   // })
  //   wx.getStorage({
  //     key: 'system',
  //     success (res) {
  //       console.log(res.data)
  //       that.setData({
  //         system:res.data,
  //         jizhu_panduan:true
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'gongsi',
  //     success (res) {
  //       console.log(res.data)
  //       that.setData({
  //         gongsi:res.data,
  //         jizhu_panduan:true
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'user',
  //     success (res) {
  //       console.log(res.data)
  //       that.setData({
  //         name:res.data,
  //         jizhu_panduan:true
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'pass',
  //     success (res) {
  //       console.log(res.data)
  //       that.setData({
  //         pwd:res.data,
  //         jizhu_panduan:true
  //       })
  //     }
  //   })
  // },

  onLoad: function(e) {
    var that = this;
    app.globalData.finduser = 'name1'
    
    // 定义变量来存储公司名和系统名
    let companyName = '';
    let systemName = '';
    
    // 从缓存获取系统名称
    wx.getStorage({
      key: 'system',
      success: function(res) {
        console.log('获取系统名称:', res.data)
        systemName = res.data;
        that.setData({
          system: res.data,
          jizhu_panduan: true
        })
        
        // 检查是否两个值都有了，然后发送请求
        if (companyName && systemName && companyName !== '选择公司' && systemName !== '选择系统') {
          that.queryUserPermissions(companyName, systemName);
        }
      }
    })
    
    // 从缓存获取公司名称
    wx.getStorage({
      key: 'gongsi',
      success: function(res) {
        console.log('获取公司名称:', res.data)
        companyName = res.data;
        that.setData({
          gongsi: res.data,
          jizhu_panduan: true
        })
        
        // 检查是否两个值都有了，然后发送请求
        if (companyName && systemName && companyName !== '选择公司' && systemName !== '选择系统') {
          that.queryUserPermissions(companyName, systemName);
        }
      }
    })
    
    // 获取用户名
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log('获取用户名:', res.data)
        that.setData({
          name: res.data,
          jizhu_panduan: true
        })
      }
    })
    
    // 获取密码
    wx.getStorage({
      key: 'pass',
      success: function(res) {
        console.log('获取密码:', res.data)
        that.setData({
          pwd: res.data,
          jizhu_panduan: true
        })
      }
    })
  },
  
  /**
   * 查询用户权限和推送数据
   */
  queryUserPermissions: function(companyName, systemName) {
    console.log('=== 开始调用云函数 ===')
    console.log('公司名称:', companyName)
    console.log('系统名称:', systemName)

    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "SELECT beizhu1, beizhu2, beizhu3 FROM yh_notice.dbo.product_pushnews WHERE gsname = '" + companyName + "' AND xtname = '" + systemName + "'"
      },
      success: res => {
        console.log('云函数返回结果:', res)
        var pushdata = res.result.recordset
        if (pushdata && pushdata.length > 0) {
          const firstItem = pushdata[0]
          
  
          // 处理beizhu2（图片数据）

            this.processBeizhu2(firstItem.beizhu2);

            this.processBeizhu3(firstItem.beizhu3);
          
        } else {
          console.log('未查询到相关数据')
        }
      },
      fail: err => {
        console.error('云函数调用失败:', err)
      }
    })
  },
  
  /**
   * 处理beizhu2（图片数据）
   */
 /**
 * 处理beizhu2（图片数据）
 */
processBeizhu2: function(beizhu2) {
    console.log('beizhu2原始数据:', beizhu2);
    
    // 🆕 使用更严格的判断条件
    const isValidBeizhu2 = beizhu2 && 
                          typeof beizhu2 === 'string' && 
                          beizhu2.trim().length > 0;
    
    if (isValidBeizhu2) {
        const cleanedData = beizhu2.replace(/\r?\n|\r/g, '').replace(/\s/g, '').trim();
        
        // 🆕 再次验证清理后的数据
        if (cleanedData && cleanedData.length > 10) { // 假设base64数据至少10个字符
            let mimeType = 'image/jpeg';
            if (cleanedData.startsWith('iVBORw0KGgo')) {
                mimeType = 'image/png';
            }
            const logoImage = `data:${mimeType};base64,${cleanedData}`;
            
            this.setData({
                logoImage: logoImage
            });
            console.log('beizhu2图片已设置，使用返回的图片');
            return; // 🆕 提前返回
        }
    }
    
    // 🆕 所有其他情况都使用默认图片
    this.setData({
        logoImage: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/companyLogo.png"
    });
    console.log('beizhu2无效，使用默认图片');
},
  
  /**
   * 处理beizhu3（文本数据）
   */
  processBeizhu3: function(beizhu3) {
    if (beizhu3 && beizhu3.trim() !== '') {
      // 更新页面标题为返回的内容
      this.setData({
        pageTitle: beizhu3.trim()
      });
      console.log('beizhu3文本已设置:', beizhu3.trim());
    } else {
      // 没有内容时保留默认文本
      this.setData({
        pageTitle: "欢迎使用云合一体化系统"
      });
      console.log('beizhu3无内容，使用默认文本');
    }
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

  goyh: function(e){
    var _this = this
    wx.navigateTo({
      url:'../../package_yunhe/pages/shouye/shouye'
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