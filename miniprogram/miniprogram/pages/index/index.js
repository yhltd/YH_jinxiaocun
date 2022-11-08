// index.js
// const app = getApp()

Page({
  data: {
  },

  onLoad: function () {
    // var _this=this
    // var sql = "select * from userInfo"
    // wx.cloud.callFunction({
    //   name: 'sqlserver_zhejiang',
    //   data:{
    //     query : sql
    //   },
    //   success(res){
    //     var list = res.result.recordset
    //     console.log(list)
    //   }
    // })
  },

  formLogin : function(e){
    console.log(e.detail.value)
    var username = e.detail.value.inputName
    var password = e.detail.value.inputPwd
    if(username == ''){
      wx.showToast({
        title: '未输入用户名',
        icon:'none',
      })
      return;
    }
    if(password == ''){
      wx.showToast({
        title: '未输入密码',
        icon:'none',
      })
      return;
    }

    var sql = "select * from userInfo where username ='" + username + "' and password = '" + password + "'"
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
          return;
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
              wx.navigateTo({
                url: '../peizhi/peizhi?userInfo='+JSON.stringify(user_list) + "&userPower=" + JSON.stringify(list)
              })
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
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
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
    
  },



  
});
