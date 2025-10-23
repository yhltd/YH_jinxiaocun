// miniprogram/pages/x_home/x_home.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isBannerHidden: true,
    showXuanTu: true,
    swiperImg: [
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/mendian-lunbo1.jpg",
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/mendian-lunbo2.jpg",
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/mendian-lunbo3.jpg"
  ],
  swiperIndex:0,//轮播图索引
  bgColor:[
      "linear-gradient(145deg, #477ead 0%, #cccccc 100%)",
      "linear-gradient(145deg, #f3f3f3 0%, #dc7b28 100%)",
      "linear-gradient(145deg, #c2da77 0%, #b3d289 100%);"
  ],
    gongsi:"aa",
    uname:"aa",
    id:"aa",
    position:"aa",
    zname:"aa",

    sheetqx1:[],
    sheetqx2: [],
    sheetqx3: "",
    sheetqx4: "",
    sheetqx5: [],

    userInfo: [],
    showList: [
      {
        text: "客户信息",
        url: "../../packageX/page/customerInfo/customerInfo"
      }, {
        text: "日交易额",
        url: "../../packageX/page/DailyTurnover/DailyTurnover"
      }, {
        text: "月交易额",
        url: "../../packageX/page/MonthlyTurnover/MonthlyTurnover"
      }, {
        text: "总交易额",
        url: "../../packageX/page/Statistics/Statistics"
      }, {
        text: "员工信息",
        url: "../../packageX/page/UserInfo/UserInfo"
      }, {
        text: "商品设置",
        url: "../../packageX/page/product/product"
      }, {
        text: "会员管理",
        url: "../../packageX/page/member_info/member_info"
      }, {
        text: "会员等级",
        url: "../../packageX/page/membership_level/membership_level"
      }, {
        text: "点单面板",
        url: "../../packageX/page/order_panel/order_panel"
      },{
        text: "订单信息",
        url: "../../packageX/page/orders/orders"
      }, {
        text: "统计报表",
        url: "../../packageX/page/report_form/report_form"
      }, {
        text: "个人中心",
        url: "../../packageX/page/gerenzhongxin/gerenzhongxin"
      }, {
        text: "退出",
        url: 　""
      }
    ]
  },
  getSwiperIndex(e){
    let currentIndex = e.detail.current
    this.setData({
        swiperIndex:currentIndex
    })
},

  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var text = _this.data.showList[index].text
    if (url == "") {
      wx.showModal({
        title: '提示',
        content: '确认退出吗？',
        success(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1,
            })
          } else if (res.cancel) {
            return
          }
        }
      })
    } else {
      if (text == "客户信息") {
        if ( _this.data.sheetqx1.Sel != "1"){
          wx.showToast({
            title: '无权限',
            icon: 'none',
          })
        }else{
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            }) + '&sheetqx1=' + JSON.stringify(_this.data.sheetqx1) + '&sheetqx2=' + JSON.stringify(_this.data.sheetqx2)
          })
        }
      } else if (text == "日交易额"){
        if (_this.data.sheetqx2.Sel != "1") {
          wx.showToast({
            title: '无权限',
            icon: 'none',
          })
        }else{
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            })
          })
        }
      } else if (text == "月交易额") {
        if (_this.data.sheetqx3 != "1") {
          wx.showToast({
            title: '无权限',
            icon: 'none',
          })
        } else {
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            })
          })
        }
      } else if (text == "总交易额") {
        if (_this.data.sheetqx4 != "1") {
          wx.showToast({
            title: '无权限',
            icon: 'none',
          })
        } else {
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            }) 
          })
        }
      } else if (text == "员工信息") {
        if (_this.data.sheetqx5.Sel != "1") {
          wx.showToast({
            title: '无权限',
            icon: 'none',
          })
        } else {
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            }) + '&sheetqx5=' + JSON.stringify(_this.data.sheetqx5)
          })
        }
      }else if (text == "商品设置") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              company: _this.data.gongsi,
              uname: _this.data.uname
            })
          })
        
      }else if (text == "会员管理") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              company: _this.data.gongsi,
              uname: _this.data.uname
            })
          })
        
      }else if (text == "会员等级") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              company: _this.data.gongsi,
              uname: _this.data.uname
            }) 
          })
        
      }else if (text == "点单面板") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            })
          })
        
      }else if (text == "订单信息") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              company: _this.data.gongsi,
              uname: _this.data.uname
            }) 
          })
        
      }else if (text == "个人中心") {
        
        wx.navigateTo({
          url: url + '?userInfo=' + JSON.stringify({
            company: _this.data.gongsi,
            uname: _this.data.uname,
            zname: _this.data.zname,
            position: _this.data.position
          }) 
        })
      
    }else if (text == "统计报表") {
        
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              gongsi: _this.data.gongsi,
              uname: _this.data.uname
            }) 
          })
        
      }
      
    }
  },




  quanxian: function () {
    var _this = this;
    let sql = "SELECT `Add`,Del,Upd,Sel FROM `management` where Uid='"+ _this.data.id +"' ORDER BY `Table` ASC"
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        if (res.result.length ==5) {
        console.log("select-success", res)
          
          _this.setData({
            sheetqx1: res.result[0],
            sheetqx2: res.result[1],
            sheetqx3: res.result[2].Sel,
            sheetqx4: res.result[3].Sel,
            sheetqx5: res.result[4],
          })
        }else{
          wx.navigateBack({
            delta: 1,
          })
        }
      },
      fail: res => {
        console.log("select-fail", res)
      },
      complete: res=>{
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryUserPermissions()
    var _this = this
    // var userInfo = JSON.parse(options.userInfo)
    // console.log("zhuyeneiro",userInfo)
    // _this.setData({
    //   userInfo:userInfo,
    // })
    if(options.company == undefined){
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
                    var sql = "select * from users where wechart_user = '" + _this.data.wxOpenId + "'"
                    console.log(sql)
                    wx.cloud.callFunction({
                      name: 'sqlserver_xinyongka',
                      data:{
                        sql : sql
                      },
                      success(res){
                        console.log(res)
                        var list = res.result
                        console.log("门店首页数据list",list)
                        if(list.length > 0){
                          _this.setData({
                            gongsi: list[0].company,
                            uname: list[0].uname,
                            id: list[0].id,
                            position: list[0].position,
                            zname: list[0].zname,
                          })
                          _this.quanxian()
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
    }else{
      var _this=this
      console.log(options.position)
      console.log(options.zname)
      _this.setData({
        gongsi: options.company,
        uname: options.uname,
        id: options.id,
        position: options.position,
        zname: options.zname,
      })
      _this.quanxian()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
    console.log('=== 开始调用云函数 ===')
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "SELECT tptop1,tptop2,tptop3,tptop4,tptop5,tptop6,topgao,xuankuan,xuangao,textbox,beizhu1  FROM yh_notice.dbo.product_pushnews WHERE gsname='合肥康飞金融有限公司' AND  xtname='云合智慧门店收银系统' AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))"
      },
      success: res => {
        var pushdata = res.result.recordset
        if (pushdata && pushdata.length > 0) {
          const firstItem = pushdata[0]
          const bannerImages = []
          let singleImage = '' 
          if(firstItem.beizhu1 == "隐藏广告"){
            this.hideBanner()
            this.closeXuanTu()
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

          // 更新页面数据
          this.setData({ 
            singleImage: singleImage,      // 单独图片
            bannerImages: bannerImages,    // 轮播图数组
            hasSingleImage: !!singleImage, // 是否有单独图片
            hasBannerImages: bannerImages.length > 0, // 是否有轮播图
            marqueeText: marqueeText,
            xuanTuStyle: `width: ${xuankuan};height: ${xuangao};`,
            topTuStyle: `height: ${topgao};`
          })
          
          // 测试图片加载
          if (singleImage) {
            this.testImageLoad(singleImage, '单独图片')
          }
          if (bannerImages.length > 0) {
            this.testImageLoad(bannerImages[0], '轮播图第一张')
          }
        }
      },
      
    })
  }
})