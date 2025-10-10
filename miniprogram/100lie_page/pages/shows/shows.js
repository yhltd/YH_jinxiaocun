// 100lie_page/pages/shows/shows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBannerHidden: true,
    showXuanTu: true,
    swiperImg: [
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/fenquan-lunbotu2.jpg",
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/lunbo-shouye1.jpg",
      "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/lunbo-shouye2.jpg"
  ],
  swiperIndex:0,//轮播图索引
  bgColor:[
      "linear-gradient(145deg, #477ead 0%, #cccccc 100%)",
      "linear-gradient(145deg, #dedede 0%, #142638 100%)",
      "linear-gradient(145deg, #679a5a 0%, #b5d6b9 100%);"
  ],// linear-gradient 渐变色需要四个颜色属性
    gongsi:'',
    name:'',
    user:'',
    showList: [{
      text: "工作台",
      url: '../work_bench/work_bench'
    },
    {
      text: "工作台权限设置",
      url: '../companyfix/companyfix'
    },
    {
      text: "部门权限设置",
      url: '../management/management'
    },
    {
      text: "公司数据分析",
      url: "../company_chart/company_chart"
    },
  ]
  },
  getSwiperIndex(e){
    let currentIndex = e.detail.current
    this.setData({
        swiperIndex:currentIndex
    })
},

  onLoad: function (options) {
    this.queryUserPermissions()
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo,
    })
  },

onChange: function (event) {
  var _this = this;
  if (event.detail == 0) {
    wx.redirectTo({
      url: '../shows/shows?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  } else if (event.detail == 1) {
    wx.redirectTo({
      url: '../shows2/shows2?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  } else if (event.detail == 2) {
    wx.redirectTo({
      url: '../shows3/shows3?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  } else if (event.detail == 3) {
    wx.redirectTo({
      url: '../loginpeople/loginpeople?userInfo='+JSON.stringify(_this.data.userInfo)
    })
  }
}, 

go: function (e) {
  var _this = this;
  var index = e.currentTarget.dataset.index;
  var url = _this.data.showList[index].url
  if(url != ''){
    wx.navigateTo({
      url: url + "?userInfo="+JSON.stringify(_this.data.userInfo)
    })
  }
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
      query: "SELECT tptop1,tptop2,tptop3,tptop4,tptop5,tptop6,topgao,xuankuan,xuangao,textbox,beizhu1  FROM yh_notice.dbo.product_pushnews WHERE gsname='广州安振企业管理有限公司' AND  xtname='分权编辑系统' AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))"
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