var app = getApp();
Page({
  data: {
  
      shoucangtai: "1"
  
  },
  onLoad: function (options) {
    app.editTabBar1(); //底部栏

    var that = this;
    var id = options.id;
    that.setData({
      id:id
    })
    console.log(id)
    const db = wx.cloud.database();
    db.collection('todos').doc(id).get({
      success(res) {
        that.setData({
          all: res.data
        })
      }
    })
  },
  jiaru: function () {
    var that=this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // console.log("当前时间戳为：" + timestamp);
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    var shijian = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    var outTradeNo = "";  //订单号
    for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
    {
      outTradeNo += Math.floor(Math.random() * 10);
    }
    outTradeNo = new Date().getTime() + outTradeNo;  //时间戳，用来生成订单号。

    var obj = wx.getStorageSync("openid")
    var idd = that.data.id;
    var openid=obj.openid;
    
    console.log(openid)
    console.log(idd)
            const db = wx.cloud.database();
             db.collection('shoucang').where({
              _openid: openid,
               id:idd
              })
          .get({
            success: res => {
              // res.data 是包含以上定义的两条记录的数组
              console.log(res.data)
              wx.showToast({
                title: '收藏成功',
              })
              if(res.data==""){
                db.collection('shoucang').add({
                  data: {
                    id: idd,
                    zhuangtai:1,
                    outTradeNo: outTradeNo,
                    shijian:shijian
                  },
                  success: res => {
                    wx.showToast({
                      title: '收藏成功',
                    })
                  }
                })
              }
            },
             }) 
      }
})
