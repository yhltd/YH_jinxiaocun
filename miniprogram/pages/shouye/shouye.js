var app = getApp()
Page({
  data: {
    isBannerHidden: true,
    showXuanTu: true,
    list: [
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/ruku_1.png",
        text: "入库",
        lianjie: "../time/time",
        index: 0
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/chuku_1.png",
        text: "出库",
        index: 1,
        lianjie: "../remittance/remittance",
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/qichushu_1.png",
        text: "期初数",
        index: 2,
        lianjie: "../procurement/procurement",
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/mingxi_1.png",
        text: "明细",
        index: 3,
        lianjie: "../Tosell/Tosell",

      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/jinxiaocun_1.png",
        text: "进销存",
        index: 4,
        lianjie: "../kucun/kucun",
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/jinhuofang_1.png",

        text: "进货方资料",
        index: 5,
        lianjie: "../Location/Location",
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/kehu_1.png",
        text: "客户资料",
        index: 6,
        lianjie: "../contract/contract",
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/jichuziliao_1.png",
        text: "基础资料",
        index: 7,
        lianjie: "../collection/collection"
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/biji_1.png",
        text: "笔记",
        index: 8,
        lianjie: "../biji/biji"
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/shangpinjinchu_1.png",
        text: "商品进出查询",
        index: 9,
        lianjie: "../shangpin_jinchu/shangpin_jinchu"
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/kehu_gongyingshang_1.png",
        text: "客户/供应商查询",
        index: 10,
        lianjie: "../kehu_chuhuo/kehu_chuhuo"
      },
      {
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/dayin_1.png",
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
    this.queryUserPermissions()
    var _this = this
    if(app.globalData.finduser == ''){
      wx.login({
        success: (res) => {
            console.log(res);
            _this.setData({
                wxCode: res.code,
            })
            let m_code = _this.data.wxCode; // 获取code
            let m_AppId = app.globalData.this_id1 + app.globalData.this_id2 + app.globalData.this_id3 ;
            let m_mi =  app.globalData.sec_dd1 + app.globalData.sec_dd2 + app.globalData.sec_dd3;
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
  hideBanner: function() {
    this.setData({
      isBannerHidden: false
    });
  },
  closeXuanTu: function() {
    this.setData({
      showXuanTu: false
    })
  },
  queryUserPermissions: function() {
    var that = this;
    
    // 统一在函数内部获取缓存数据
    wx.getStorage({
      key: 'gongsi',
      success: function(gongsiRes) {
        wx.getStorage({
          key: 'system',
          success: function(systemRes) {
            let companyName = gongsiRes.data;
            let systemName = systemRes.data;
            
            console.log('想要获取公司名称:', companyName);
            console.log('获取系统名称:', systemName);
            that.setData({
              gongsi: companyName,
              system: systemName,
              jizhu_panduan: true
            });
            
            // 将云函数调用移到缓存获取成功的回调内部
            console.log('=== 开始调用云函数 ===')
            
            wx.cloud.callFunction({
              name: 'sqlServer_117',
              data: {
                // 只将gsname换成动态的companyName，xtname保持原样
                query: "SELECT tptop1,tptop2,tptop3,tptop4,tptop5,tptop6,topgao,xuankuan,xuangao,textbox,beizhu1  FROM yh_notice.dbo.product_pushnews WHERE gsname='" + companyName + "' AND  xtname='云合未来进销存系统' AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))"
              },
              success: res => {
                var pushdata = res.result.recordset
                if (pushdata && pushdata.length > 0) {
                  const firstItem = pushdata[0]
                  const bannerImages = []
                  let singleImage = '' 
                  if(firstItem.beizhu1 == "隐藏广告"){
                    that.hideBanner()
                    that.closeXuanTu()
                    return;
                  }
  
                  let marqueeText = firstItem.textbox || '暂无公告信息'
                  let xuankuan = firstItem.xuankuan ? firstItem.xuankuan + 'px' : '300rpx' 
                  let xuangao = firstItem.xuankuan ? firstItem.xuangao + 'px' : '300rpx' 
                  let topgao = firstItem.topgao ? firstItem.topgao + 'px' : '200rpx'       // 默认高度
                  
                  for (let i = 1; i <= 6; i++) {
                    const fieldName = `tptop${i}`
                    const rawData = firstItem[fieldName]
                    
                    if (rawData && rawData.trim() !== '') {
                      // 清理数据
                      const cleanedData = rawData
                        .replace(/\r?\n|\r/g, '')
                        .replace(/\s/g, '')
                        .trim()
                      
                      // 确定图片格式
                      let mimeType = 'image/jpeg'
                      if (cleanedData.startsWith('iVBORw0KGgo')) {
                        mimeType = 'image/png'
                        console.log(`tptop${i} 检测为PNG格式`)
                      } else if (cleanedData.startsWith('/9j/')) {
                        mimeType = 'image/jpeg'
                        console.log(`tptop${i} 检测为JPEG格式`)
                      }
                      
                      const finalUrl = `data:${mimeType};base64,${cleanedData}`
                      
                      // tptop1 单独处理，其他作为轮播图
                      if (i === 1) {
                        singleImage = finalUrl
                        console.log('单独图片 tptop1 已设置')
                      } else {
                        bannerImages.push(finalUrl)
                        console.log(`轮播图添加 tptop${i}`)
                      }
                    }
                  }
  
                  // 更新页面数据 - 使用that而不是this
                  that.setData({ 
                    singleImage: singleImage,      // 单独图片
                    bannerImages: bannerImages,    // 轮播图数组
                    hasSingleImage: !!singleImage, // 是否有单独图片
                    hasBannerImages: bannerImages.length > 0, // 是否有轮播图
                    marqueeText: marqueeText,
                    xuanTuStyle: `width: ${xuankuan};height: ${xuangao};`,
                    topTuStyle: `height: ${topgao};`
                  })
                  
                  // 测试图片加载 - 使用that而不是this
                  if (singleImage) {
                    that.testImageLoad(singleImage, '单独图片')
                  }
                  if (bannerImages.length > 0) {
                    that.testImageLoad(bannerImages[0], '轮播图第一张')
                  }
                }
              },
              
            })
          }
        })
      }
    })
  }

})