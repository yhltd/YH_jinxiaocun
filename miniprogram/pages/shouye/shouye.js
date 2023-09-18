var app = getApp()
Page({
  data: {
    list: [
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/rukuguanli.png",
        text: "入库",
        lianjie: "../time/time",
        index: 0
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/chuku.png",
        text: "出库",
        index: 1,
        lianjie: "../remittance/remittance",
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/qichukucun.png",
        text: "期初数",
        index: 2,
        lianjie: "../procurement/procurement",
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/shoufamingxi.png",
        text: "明细",
        index: 3,
        lianjie: "../Tosell/Tosell",

      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/jinxiaocun.png",
        text: "进销存",
        index: 4,
        lianjie: "../kucun/kucun",
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gys.png",

        text: "进货方资料",
        index: 5,
        lianjie: "../Location/Location",
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/kehu.png",
        text: "客户资料",
        index: 6,
        lianjie: "../contract/contract",
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/shangpinguanli.png",
        text: "基础资料",
        index: 7,
        lianjie: "../collection/collection"
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/biji.png",
        text: "笔记",
        index: 8,
        lianjie: "../biji/biji"
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/shangpin_jinchu.png",
        text: "商品进出查询",
        index: 9,
        lianjie: "../shangpin_jinchu/shangpin_jinchu"
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/kehu_chuhuo.png",
        text: "客户/供应商查询",
        index: 10,
        lianjie: "../kehu_chuhuo/kehu_chuhuo"
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/danju_dayin.png",
        text: "单据打印",
        index: 11,
        lianjie: "../../packageJ/page/out_in_print/out_in_print"
      },
      // {
        
      //   url: "../../images/anQun_03.jpg",
      //   text: "统计报表",
      //   index: 8,
      //   lianjie: "../dayin/dayin"
      // },
      // {
      //   url: "../../images/hao_03.jpg",
      //   text: "破损数量查询",
      //   index: 8,
      //   lianjie: "../broken/broken"
      // },
      // {
      //   url: "../../images/appa_10.jpg",
      //   text: "抽样数量查询",
      //   index: 9,
      //   lianjie: "../sampling/sampling"
      // }
    ]
  },
  remove: function (e) {
    var that = this
    var idx = e.currentTarget.dataset.index;
    console.log(that.data.list[idx].lianjie + '?index=' + idx)
      wx.navigateTo({
        url: that.data.list[idx].lianjie + '?index=' + idx,
      })

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var _this = this
    if(app.globalData.finduser == ''){
      wx.login({
        success: (res) => {
            console.log(res);
            _this.setData({
                wxCode: res.code,
            })
            // ====== 【获取OpenId】
            let m_code = _this.data.wxCode; // 获取code
            let m_AppId = app.globalData.this_id1 + app.globalData.this_id2 + app.globalData.this_id3 ; // appid
            let m_mi =  app.globalData.sec_dd1 + app.globalData.sec_dd2 + app.globalData.sec_dd3; // 小程序密钥
            console.log("m_code:" + m_code);
            let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + m_AppId + "&secret=" + m_mi + "&js_code=" + m_code + "&grant_type=authorization_code";
            wx.request({
                url: url,
                success: (res) => {
                    console.log(res);
                    _this.setData({
                        wxOpenId: res.data.openid
                    })
                    //获取到你的openid
                    console.log("====openID=======");
                    console.log(_this.data.wxOpenId);
                    var sql = "select * from yh_jinxiaocun_user where wechart_user = '" + _this.data.wxOpenId + "'"
                    console.log(sql)
                    wx.cloud.callFunction({
                      name: 'sqlConnection',
                      data:{
                        sql : sql
                      },
                      success(res){
                        console.log(res)
                        var list = res.result
                        console.log(list)
                        if(list.length > 0){
                          var listAll = []
                          listAll.push(res.result)
                          var gongsi = listAll[0][0].gongsi
                          var finduser = listAll[0][0].name
                          var passwod = listAll[0][0].password
                
                          var adminis = listAll[0][0].AdminIS
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
                        }else{
                          wx.showToast({
                            title: '未绑定账号信息',
                            icon:"none"
                          })
                        }
                      }
                    })
                }
            })
        }
    })
    }
  },
  onShow: function () {
    // if (app.globalData.gongsi == null || app.globalData.finduser == null) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '用户未登录！',
    //   })
    //   wx.navigateTo({
    //     url: '../login/login'
    //   })
    // }
    console.log(wx.getStorageSync("JianYan"))
    if (wx.getStorageSync("JianYan") == 1) {
      wx.showModal({
        title: '提示',
        content: '暂无权限',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../logs/logs',
            })
          }
        }
      })
    }
  },
  onReady: function () {
    wx.removeStorage({
      key: 'optiontime',
      success: function (res) {

      }
    })
    // 
    wx.removeStorage({
      key: 'optiontime1',
      success: function (res) {

      }
    })
    // 
    wx.removeStorage({
      key: 'optiontime2',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime3',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime4',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime5',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime6',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime7',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'optiontime8',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num',
      success: function (res) {

      }
    })
    // 
    wx.removeStorage({
      key: 'num0',
      success: function (res) {

      }
    })
    // 
    wx.removeStorage({
      key: 'num1',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num2',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num3',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num4',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num5',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num6',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num7',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'num8',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'numq',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'allsleect',
      success: function (res) {

      }
    })
    //

    wx.removeStorage({
      key: 'numt',
      success: function (res) {

      }
    })
    //
    wx.removeStorage({
      key: 'allsleect1',
      success: function (res) {

      }
    })
   
  },
})