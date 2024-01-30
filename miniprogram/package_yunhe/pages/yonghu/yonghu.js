// var app = getApp();
// Page({
//   data: {
   
//     language:"",
//     nickName: "",
//     avatarUrl:"",
//     gender:"",
//     province:"",
//     city:"",
//     country:"" 
//   },
// shouquan:function(){
//   wx.navigateTo({
//     url: '/pages/shouquan/shouquan',
//   })
// },

//   onload: function () { 
//     if (!wx.cloud) {
//       wx.redirectTo({
//         url: '../chooseLib/chooseLib',
//       })
//       return
//     }

//     // 获取用户信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               this.setData({
//                 avatarUrl: res.userInfo.avatarUrl,
//                 userInfo: res.userInfo
//               })
//             }
//           })
//         }
//       }
//     })
//   },
    
//   onGetUserInfo: function (e) {
//     if (!this.logged && e.detail.userInfo) {
//       this.setData({
//         logged: true,
//         avatarUrl: e.detail.userInfo.avatarUrl,
//         userInfo: e.detail.userInfo
//       })
//     }
//   },


//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onShow:function() {
//     var that=this;
//     this.setData({
//       language: app.globalData.language,
//       nickName: app.globalData.nickName,
//       avatarUrl: app.globalData.avatarUrl,
//       gender: app.globalData.gender,
//       province:  app.globalData.province,
//       city:app.globalData.city,
//       country:app.globalData.country,
      
//     })
  
//   }
// ,
  


//   onReachBottom: function () {
//   },
//   xinjianyonghu: function () {
//     const db = wx.cloud.database();
//     db.collection('todos').doc('XCCC3N7E7L4w38Y9').get({
//       success(res) {
//         console.log(res.data)
//         wx.showToast({
//           title: '' + res.data.ziduan1,
//           icon: 'success',
//           duration: 2000
//         }) 
//       }
//     })
//   },
//   xieru: function () {
//     const db = wx.cloud.database();

    // db.collection('todos').add({
//       data: {
//         age: 100
//       },
//       success: res => {
//         // 在返回结果中会包含新创建的记录的 _id
//         this.setData({
//           counterId: res._id,
//           age: 1
//         })
//         wx.showToast({
//           title: '新增记录成功',
//         })
//         console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
//       },

//     })
//   },
//   updatecase: function () {
//     const db = wx.cloud.database();
//     db.collection('todos').doc('XCLo95T75u22xUVG').update({
//       data: {
//         agee: "650",

//       },
//       success: res => {
//         console.log(res);
//         console.log(app.globalData.nickName)
//         wx.showToast({
//           title: '修改成功',
//         })
//       },
//     })
//   },
//   de: function () {
//     const db = wx.cloud.database();
//     db.collection('todos').doc('XBso-XffS3SWICHW').remove({
      
//       success: res => {
//         console.log(res);

//         wx.showToast({
//           title: '删除成功',
//         })
//       },
//     })


//   },
//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   },
//   xinjian:function(){
//     const db = wx.cloud.database();

//     db.collection('shoucang').add({
//       data: {
//         age: 100
//       },
//       success: res => {
//         // 在返回结果中会包含新创建的记录的 _id
//         this.setData({
//           counterId: res._id,
//           age: 1
//         })

//       }
//   })
//   }
// })


var app = getApp()
Page({
  data: {
    
    showView: true,
    text: '\n',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
   
    orderItems: [
      {
        typeId: 0,
        name: '待付款',
        url: '../daifukuang/daifukuang',
        imageurl: '../images/personal_pay.png',
      },
      {
        typeId: 1,
        name: '发货中',
        url: '../fahuozhong/fahuozhong',
        imageurl: '../images/personal_receipt.png',
      },
      {
        typeId: 2,
        name: '代收货',
        url: '../daishouhuo/daishouhuo',
        imageurl: '../images/personal_comment.png'
      },
      {
        typeId: 3,
        name: '待评价',
        url: '../daipingjia/daipingjia',
        imageurl: '../images/personal_service.png'
      }
    ],
  },
  //事件处理函数
  onLoad() {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })

          wx.getUserInfo({
            success(res) {
              const userInfo = res.userInfo
              app.globalData.language = userInfo.language
              app.globalData.nickName = userInfo.nickName
              app.globalData.avatarUrl = userInfo.avatarUrl
              app.globalData.gender = userInfo.gender // 性别 0：未知、1：男、2：女
              app.globalData.openid = userInfo.openid
              app.globalData.province = userInfo.province
              app.globalData.city = userInfo.city
              app.globalData.country = userInfo.country
              app.globalData.userInfo = userInfo;

              if (app.globalData.gender = 1) {
                app.globalData.gender = '男'
              } else if (app.globalData.gender = 2) {
                app.globalData.gender = '女'
              } else {
                app.globalData.gender = ''
              }

            }
          })

        }
      }
    })
  },
 

// onLoad: function () {
//     var that = this;
//     // 查看是否授权
//     wx.getSetting({
//       success: function (res) {
//         if (res.authSetting['scope.userInfo']) {
//           wx.getUserInfo({
//             success: function (res) {
//               //用户已经授权过
//               wx.redirectTo({
//                 url: '../yonghu/yonghu'
//               })
//             }
//           });
//         }
//       }
//     })
//   },
  // xieru: function () {
//     const db = wx.cloud.database();

//     db.collection('todos').add({
//       data: {
//         age: 100
//       },
//       success: res => {
//         // 在返回结果中会包含新创建的记录的 _id
//         this.setData({
//           counterId: res._id,
//           age: 1
//         })
//         wx.showToast({
//           title: '新增记录成功',
//         })
//         console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
//       },
  // bindGetUserInfo: function (e) {
  //   if (e.detail.userInfo) {
  //      wx.authorize({
  //       scope: 'scope.record',
  //       success() {
  //         // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
  //         // wx.startRecord()
  //         wx.login() 
  //         const db = wx.cloud.database();

    
  //       }
  //     })
  //   } else {
  //     //用户按了拒绝按钮
  //     wx.showModal({
  //       title: '提示',
  //       content: '拒绝授权将无法进入',
  //       showCancel: false,
  //       confirmText: '返回授权',
  //       success: function (res) {
  //         if (res.confirm) {
  //           console.log('用户点击了“返回授权”')
  //         }
  //       }
  //     })
  //   }
  // },
// getSession:function(){
// var that=this;
// wx.login({
//   success:function(res){
//     if(res.code){
//       wx.request({
//         url:this.webUrl+'/',
//       data:{
//         code:res.code
//       },
//       success:function(res){
//         wx.setStorageSync("sessionID",res.sessionID);
//       },
//       fail:function(errMsg){
//         console.log(errMsg);
//       }
//       })
//     }else{
//       console.log('shibai',+res.errMsg);
//     }
//   }
// })
// },

onChange: function (event) {
  if (event.detail == 0) {
    wx.redirectTo({
      url: '../shouye/shouye'
    })
  } else if (event.detail == 1) {
    wx.redirectTo({
      url: '../xinxi/xinxi'
    })
  }else if (event.detail == 2) {
    wx.redirectTo({
      url: '../chanpin/chanpin'
    })
  }else if (event.detail == 3) {
    wx.redirectTo({
      url: '../yonghu/yonghu'
    })
  }
},

  onGotUserInfo(res) {
    var that = this;
    console.log(res.detail.errMsg)
    console.log(res.detail.userInfo)
    console.log(res.detail.rawData)
    var requestUrl = wx.getStorageSync("url")
    this.setData({
      login_name: res.detail.userInfo.nickName,
      gender: res.detail.userInfo.gender,
       showView: (!that.data.showView)
        })
    wx.request({
      url: requestUrl,
      data: {
        code: res.code
      },
      success: function (res) {
        let ret = res.data;
        if (ret.status == 200) {
          // 添加到全局数据的header中
          app.globalData.header.Cookie = 'JSESSIONID=' + ret.data.sessionid;
        }
      }
    })
 
  //   var that=this;
  //   let info = res;
  //   console.log(info);
  //   if (info.detail.userInfo) {
  //     console.log("点击了同意授权");
  //     wx.login({
  //       success: function (res) {
  //         if (res.code) {
  //           wx.request({
  //             url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.appid + '&secret=' + that.secret + '&js_code=' + res.code + '&grant_type=authorization_code',
             
  //             data: {
  //               code: res.code,
  //               nickName: info.detail.userInfo.nickName,
  //               city: info.detail.userInfo.city,
  //               province: info.detail.userInfo.province,
  //               avatarUrl: info.detail.userInfo.avatarUrl,
              
  //             },
             
  //             header: {
  //               'content-type': 'application/json' // 默认值
  //             },
  //             success: function (res) {
  //               var userinfo = {};
  //               userinfo['id'] = res.data.id;
  //               userinfo['nickName'] = info.detail.userInfo.nickName;
  //               userinfo['avatarUrl'] = info.detail.userInfo.avatarUrl;
  //               wx.setStorageSync('userinfo', userinfo) 
  //               that.setData({
  //                 login_name: info.detail.userInfo.nickName,
  //                 // gender: info.detail.userInfo.gender,
  //                 showView: (!that.data.showView),

  //               })
                

  //             }
  //           })
            
  //         } else {
  //           console.log("授权失败");
  //         }
  //       },
  //     })

  //   } else {
  //     console.log("点击了拒绝授权");
  //   }

  
 }
  

})