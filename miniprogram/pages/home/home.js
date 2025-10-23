// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id : 0,
    isBannerHidden: true,
    showXuanTu: true,
    list: [{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/rili.png",
        text: "考勤表",
        lianjie: "../../packageA/pages/1kaoqin/kaoqin",
        index: 1,
        hid : true
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/renyuanxinxiguanli.png",
        text: "人员信息管理",
        index: 2,
        hid : true,
        lianjie: "../../packageA/pages/1renyuanxinxiguanli/renyuanxinxiguanli",
      },{

        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/baopan.png",
        text: "报盘",
        index: 3,
        hid : true,
        lianjie: "../../packageA/pages/1baopan/baopan"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/shezhi.png",
        text: "配置表",
        index: 4,
        hid : true,
        lianjie: "../../packageA/pages/1peizhi/index",
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzimingxi.png",
        text: "工资明细",
        index: 5,
        hid : true,
        lianjie: "../../packageA/pages/1gongzimingxi/gongzimingxi",
      },{

        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/baoshui.png",
        text: "报税",
        index: 6,
        hid : true,
        lianjie: "../../packageA/pages/1baoshui/index"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/kaoqinjilu.png",
        text: "考勤记录",
        index: 7,
        hid : true,
        lianjie: "../../packageA/pages/1kaoqinjilu/kaoqinjilu",
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/bumenhuizong.png",
        text: "部门汇总",
        index: 8,
        hid : true,
        lianjie: "../../packageA/pages/1bumenhuizong/index",
      },{

        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/shebao.png",
        text: "社保",
        index: 9,
        hid : true,
        lianjie: "../../packageA/pages/1shebaohuizong/index"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gerenxinxi.png",
        text: "个人信息",
        index: 10,
        hid : true,
        lianjie: "../../packageA/pages/1renyuanjibenxinxi/index",
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gerensuodeshui.png",
        text: "个人所得税",
        index: 11,
        hid : true,
        lianjie: "../../packageA/pages/1gerensuodeshui/gerensuodeshui"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "工资条",
        index: 12,
        hid : true,
        lianjie: "../../packageA/pages/1gongzitiao/gongzitiao"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "个人中心",
        index: 14,
        hid : true,
        lianjie: "../../packageA/pages/gerenzhongxin/gerenzhongxin"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "生日提醒",
        index: 13,
        hid : true,
        lianjie: "../../packageA/pages/1shengri_tixing/shengri_tixing"
      }
    ]
  },
  submit: function(e) {
    console.log('跳转')
    var that = this
    console.log("人事数据1",that.data.userInfo)
    var index = e.currentTarget.dataset.index;
    if(!that.data.list[index].hid){
      return;
    }
    var id = that.data.id;
    var view_id = e.currentTarget.dataset.view_id;
    var old_view_id = e.currentTarget.dataset.view_id;
    var gongsi = app.globalData.gongsi;
    var companyArr = gongsi.split("_")
    wx.showToast({
      title:'页面跳转中',
      icon:'none'
    })

    if(view_id == 13){
      view_id = 2
      old_view_id = 13
    }

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select [add],del,upd,sel from gongzi_renyuanManager where R_id = '"+id+"' and view_id = '"+view_id+"'"
      },
      success: res => {
        var access = [0,0,0,0];
        console.log("人事数据2",index)
        if(res.result.recordset.length!=0){
          var access  = res.result.recordset[0];
        }
        if(old_view_id == 13){
          wx.navigateTo({
            url: that.data.list[12].lianjie + '?access=' + JSON.stringify(access) +"&companyName="+companyArr[0] + '&userInfo=' + JSON.stringify(that.data.userInfo) ,
          })
        }else if(index == 9){
          wx.navigateTo({
            url: that.data.list[index].lianjie + '?access=' + JSON.stringify(access) +"&companyName="+gongsi + '&userInfo=' + JSON.stringify(that.data.userInfo) ,
          })
        }else{
          wx.navigateTo({
            url: that.data.list[index].lianjie + '?access=' + JSON.stringify(access) +"&companyName="+companyArr[0] + '&userInfo=' + JSON.stringify(that.data.userInfo) ,
          })
        }
        console.log("人事数据3",JSON.stringify(that.data.userInfo))
        console.log("人事数据4",that.data.list[index].lianjie + '?access=' + JSON.stringify(access) +"&companyName="+companyArr[0] + '&userInfo=' + JSON.stringify(that.data.userInfo))
      }
    })




    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;

    var userInfo = JSON.parse(options.userInfo)
    console.log("人事数据1",userInfo)
    _this.setData({
      userInfo:userInfo,
    })

    wx.setNavigationBarTitle({
      title: '人资管理系统'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })

    this.queryUserPermissions()
    var id = options.id;
    if(id == undefined){
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
                    var sql = "select id from gongzi_renyuan where wechart_user = '" + _this.data.wxOpenId + "'"
                    console.log(sql)
                    wx.cloud.callFunction({
                      name: 'sqlServer_117',
                      data:{
                        query : sql
                      },
                      success(res){
                        console.log(res)
                        var list = res.result.recordset
                        console.log(list)
                        if(list.length > 0){
                          _this.setData({
                            id: list[0].id
                          })
                          _this.getLooks(_this,_this.data.id)
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
      _this.setData({
        id
      })
    }


  },

  getLooks : function(_this,id){
    wx.showLoading({
      title:"获取权限信息",
      mask:"true"
    })
    var sql = "select ren.look,[view].viewName from gongzi_renyuanManager as ren,gongzi_viewNames as [view] where ren.R_id = '"+id+"' and ren.view_id = [view].id";
    console.log(sql)
    var looks = [];
    wx.cloud.callFunction({ 
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        looks = res.result.recordset;
        var list = _this.data.list
        list:
        for(var i=0;i<list.length;i++){
          for(var j=0;j<looks.length;j++){
            if(list[i].text==looks[j].viewName){
              _this.setData({
                ["list["+i+"].hid"] : looks[j].look > 0
              })
              continue list
            }
          }
          if(i != 12){
            _this.setData({
              ["list["+i+"].hid"] : false
            })
          }
        }
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this;

    _this.getLooks(_this,_this.data.id)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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
        query: "SELECT tptop1,tptop2,tptop3,tptop4,tptop5,tptop6,topgao,xuankuan,xuangao,textbox,beizhu1  FROM yh_notice.dbo.product_pushnews WHERE gsname='上海恒晨人力资源有限公司' AND  xtname='云合人事管理系统' AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))"
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
