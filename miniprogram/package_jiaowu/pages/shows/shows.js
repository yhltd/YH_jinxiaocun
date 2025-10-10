// miniprogram/packageP/page/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBannerHidden: true,
    showXuanTu: true,
    swiperImg: [
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/jiaowu-lunbo2.jpg",
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/jiaowu-lunbo3.jpg",
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/jiaowu-lunbo1.jpg"
  ],
  swiperIndex:0,//轮播图索引
  bgColor:[
      "linear-gradient(145deg, #477ead 0%, #cccccc 100%)",
      "linear-gradient(145deg, #f3f3f3 0%, #dc7b28 100%)",
      "linear-gradient(145deg, #679a5a 0%, #b5d6b9 100%);"
  ],
    list: [],
    isdis:'',
    handle:true,
    renyuan_list: [],
    active: 0,
    showList: [
      {
        text: "设置",
        url: "../shezhi/shezhi"
      },
      {
        text: "学生信息",
        url: "../xueshengxinxi/xueshengxinxi"
      },
      {
        text: "教师信息",
        url: "../jiaoshixinxi/jiaoshixinxi"
      },
      
      {
        text: "课时统计",
        url: "../keshi/keshi"
      },
      
      {
        text: "教师课时统计",
        url: "../jiaoshikeshitongji/jiaoshikeshitongji"
      },

      {
        text: "个人中心",
        url: "../gerenzhongxin/gerenzhongxin"
      },
      
      
      // {
      //   text: "工作时间",
      //   url: "../PZ_GongZuoShiJian/PZ_GongZuoShiJian"
      // },
      // {
      //   text: "BOM",
      //   url: "../PZ_Bom/PZ_Bom"
      // },
      // {
      //   text: "账号管理",
      //   url: "../ZhangHaoGuanLi/ZhangHaoGuanLi"
      // },
      // {
      //   text: "数据空间",
      //   url: ""
      // },
    ]
  },
  getSwiperIndex(e){
    let currentIndex = e.detail.current
    this.setData({
        swiperIndex:currentIndex
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryUserPermissions()
    var _this = this
    var userInfo = options.userInfo
    if(userInfo == undefined){
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
                    var sql = "select * from teacher where wechart_user = '" + _this.data.wxOpenId + "'"
                    console.log(sql)
                    wx.cloud.callFunction({
                      name: 'sql_jiaowu',
                      data:{
                        sql : sql
                      },
                      success(res){
                        console.log(res)
                        var list = res.result
                        console.log(list)
                        if(list.length > 0){
                          _this.setData({
                            userInfo: list[0],
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
    }else{
      var userInfo = JSON.parse(options.userInfo)
      _this.setData({
        userInfo:userInfo
      })
      console.log("培训机构1",userInfo)
    }

  },

  hid_view: function () {
    var _this = this
    _this.setData({
      handle: true
    })
  },

  onChange: function (event) {
    var _this = this;
    console.log("教务数据",_this.data.userInfo)
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../shows/shows?userInfo='+JSON.stringify(_this.data.userInfo)
        
      })
    }else if (event.detail == 1) {
      wx.redirectTo({
        url: '../jine/jine?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } 
    // else if (event.detail == 1) {
    //   wx.redirectTo({
    //     url: '../DingDan/DingDan'
    //   })
    // } else if (event.detail == 2) {
    //   wx.redirectTo({
    //     url: '../PaiChan/PaiChan'
    //   })
    // } else if (event.detail == 3) {
    //   wx.redirectTo({
    //     url: '../HuiZong/HuiZong'
    //   })
    // }
  },

  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var text = _this.data.showList[index].text
    
    if(url != ''){
      wx.navigateTo({
        url: url + "?userInfo=" + JSON.stringify(_this.data.userInfo)
        
      })
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

    wx.stopPullDownRefresh();
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
        query: "SELECT tptop1,tptop2,tptop3,tptop4,tptop5,tptop6,topgao,xuankuan,xuangao,textbox,beizhu1  FROM yh_notice.dbo.product_pushnews WHERE gsname='重庆旭森教育科技有限公司' AND  xtname='教务管理系统' AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))"
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