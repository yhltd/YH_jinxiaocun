var app = getApp()
Page({
  data: {
    imageUrl: app.globalData.imageInfopath2,
    items: [
      {
        name: "公司简介",
        src: app.globalData.imageInfopath2 + 'gongsi.png',
        url: "../gongsijieshao/gongsijieshao",
      },
      {
        name: "案例详情",
        src: app.globalData.imageInfopath2 + 'xihuan.jpg',
        url: "../anlixiangqing/anlixiangqing",
      },
      {
        name: "行业热门",
        src: app.globalData.imageInfopath2 + 'tag.png',
        url: "../hangyeremen/hangyeremen",
      },
      {
        name: "加入我们",
        src: app.globalData.imageInfopath2 + 'telephone.png',
        url: "../jiaruwomen/jiaruwomen",
      }
    ]

    ,
    anlizhanshi: {
      pageone: [
        {
          name: "单片机硬件开发",
          src: app.globalData.imageInfopath2 + 'wangzhan.png',
          url: "../chanpin1/chanpin1?id=XDgk2nkPDdDCJ3QH"
          
        },
        {       
          name: "软件开发",
          src: app.globalData.imageInfopath2 + 'ruanjian.png',
          url: "../chanpin1/chanpin1?id=XCBDTnffS3SWOCjG"
        },
        {
          name: "网站建设",
          src: app.globalData.imageInfopath2 + 'wangzhan.png',
          url: "../chanpin1/chanpin1?id=XCCC13ffS3SWOXSZ"
        },
        {
          name: "小程序",
          src: app.globalData.imageInfopath2 + 'xiaochengxu.png',
          url: "../chanpin1/chanpin1?id=XCCC2sDR1TiNEP9l"
        },
        {
          name: "手机APP",
          src: app.globalData.imageInfopath2 + 'shouji.png',
          url: "../chanpin1/chanpin1?id=XCCC3N7E7L4w38Y9"
        }
      ]
    },
    all:[
      {
        path: app.globalData.imageInfopath2 + '11.png',
      },
      {
        path: app.globalData.imageInfopath2 + '22.png',
      }
    ],
    all3: [
      {
        path: app.globalData.imageInfopath2 + 'xiaochengxuzixun.png',
      },
      {
        path: app.globalData.imageInfopath2 + 'weixinxiaochengxu.jpg',
      }
    ]
  }
  ,
  compare: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },

  onLoad: function () {
    var that = this;
    var imagepath1 = app.globalData.imageInfopath2 + ""
    console.log(imagepath1)
    that.setData({
      imageUrl: imagepath1
    })
  },

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
 
  onShow:function(){
    var that = this;
    var all = [];
    var all1 = [];
    var all2 = [];
    var all3 = [];
    const db = wx.cloud.database();
    db.collection('tupian1').get({
      success(res) { 
       console.log(res)
        all.push(res.data)
        for(var i=0; i<res.data.length; i++){
          res.data[i].path = app.globalData.imageInfopath2 + res.data[i].path
        }
        // all[0].sort(that.compare("Sort_index"));//排序
        that.setData({
          all: res.data
        },
        )
      }
    })
    db.collection('tupian2').get({
      success(res) {
        all1.push(res.data)
        // all[0].sort(that.compare("Sort_index"));//排序
        that.setData({
          all1: all1[0]
        },
        )
      }
    })
    db.collection('tupian3').get({
      success(res) {

        all2.push(res.data)
       
        // all[0].sort(that.compare("Sort_index"));//排序
        that.setData({
          all2: all2[0]
        },

        )
      }
    })
    db.collection('tupian4').get({
      success(res) {
        
        all3.push(res.data)
        
        // all[0].sort(that.compare("Sort_index"));//排序
        that.setData({
          all3: all3[0]
        },

        )
      }
    })
    db.collection('tupian5').get({
      success(res) {
        // all4.push(res.data)
        console.log(res.data)
        // all[0].sort(that.compare("Sort_index"));//排序
        that.setData({
          all4: res.data
        },
        )
      }
    })
  }
  


})