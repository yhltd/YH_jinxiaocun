// // pages/goumai/goumai.js
// var app = getApp();
// Page({
//   data: {
//      id:""
//   },
//   onLoad: function () {
//     var that = this;
//     var id = wx.getStorageSync('id');//wx.getStorageSync(key)，获取本地缓存
//     const db = wx.cloud.database();
//     db.collection('todos').doc(id).get({
//       success(res) {
//         that.setData({ 
//           all: res.data
//           })
//            console.log(that.data)
//       }
//     })
//     console.log(that.data)
//     that.setData({
//       id: id
//     }) 
   
//   },
//  zhifu: function(){
//     var self = this;
//     wx.request({
//       url: 'https://www.hgdqdev.cn/api/wxpay/unifiedorder',
//       data: {
//         openid: self.data.openid   // 这里正常项目不会只有openid一个参数
//       },
//       success: function(res){
//         if(res.data.status == 100){
//           var payModel = res.data;
//           wx.requestPayment({
//             'timeStamp': payModel.timestamp,
//             'nonceStr': payModel.nonceStr,
//             'package': payModel.package,
//             'signType': 'MD5',
//             'paySign': payModel.paySign,
//             'success': function (res) {
//               wx.showToast({
//                 title: '支付成功',
//                 icon: 'success',
//                 duration: 2000
//               })
//             },
//             'fail': function (res) {
//             }
//           })
//         }
//       },
//       fail: function(){

//       }
//     })
//   }

// })
Page({
  data: {
    txtOrderCode: ''
  },
  pay: function () {
    var ordercode = this.data.txtOrderCode;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://www.yourdomain.com/pay',
            data: {
              code: res.code,//要去换取openid的登录凭证
              ordercode: ordercode
            },
            method: 'GET',
            success: function (res) {
              console.log(res.data)
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: 'MD5',
                paySign: res.data.paySign,
                success: function (res) {
                  // success
                  console.log(res);
                },
                fail: function (res) {
                  // fail
                  console.log(res);
                },
                complete: function (res) {
                  // complete
                  console.log(res);
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getOrderCode: function (event) {
    this.setData({
      txtOrderCode: event.detail.value
    });
  }
})