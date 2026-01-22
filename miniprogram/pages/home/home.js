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
        text: "生日提醒",
        index: 13,
        hid : true,
        lianjie: "../../packageA/pages/1shengri_tixing/shengri_tixing"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "个人中心",
        index: 14,
        hid : true,
        lianjie: "../../packageA/pages/gerenzhongxin/gerenzhongxin"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "工作安排日期",
        index: 15,
        hid : true,
        lianjie: "../../packageA/pages/1gongzuoshijian/gongzuoshijian"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "签到",
        index: 16,
        hid : true,
        lianjie: "../../packageA/pages/1qiandao/qiandao"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "请假审批",
        index: 17,
        hid : true,
        lianjie: "../../packageA/pages/1qingjiashenpi/qingjiashenpi"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "动态工资明细",
        index: 18,
        hid : true,
        lianjie: "../../packageA/pages/1dongtaigzmingxi/dongtaigzmingxi"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "简历管理",
        index: 19,
        hid : true,
        lianjie: "../../packageA/pages/1jianliguanli/jianliguanli"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "简历审批",
        index: 20,
        hid : true,
        lianjie: "../../packageA/pages/1jianlishenpi/jianlishenpi"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "面试管理",
        index: 20,
        hid : true,
        lianjie: "../../packageA/pages/1mianshiguanli/mianshiguanli"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "离职审批",
        index: 21,
        hid : true,
        lianjie: "../../packageA/pages/1lizhishenpi/lizhishenpi"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "离职申请",
        index: 21,
        hid : true,
        lianjie: "../../packageA/pages/1lizhishenqing/lizhishenqing"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "统计图",
        index: 21,
        hid : true,
        lianjie: "../../packageA/pages/1statistics/statistics"
      }
    ]
  },
  submit: function(e) {
    console.log('跳转')
    var that = this
    console.log("人事数据1",that.data.userInfo)
    var index = e.currentTarget.dataset.index;
    console.log("=== 调试信息 ===");
    console.log("index:", index);
    console.log("list[13]:", that.data.list[13]);
    console.log("list[13].hid:", that.data.list[13].hid);
    console.log("!list[13].hid:", !that.data.list[13].hid);
    console.log("hid类型:", typeof that.data.list[13].hid);

    if(!that.data.list[index].hid){
      console.log("222 - 进入if条件，index:", index);
  console.log("111 - 完整对象:", that.data.list[index]);
  console.log("hid具体值:", that.data.list[index].hid);
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
        console.log("looks",looks)
        console.log("looks1",looks.length)
        var list = _this.data.list
        list:
        for(var i=0;i<list.length;i++){
          console.log("执行1",list.length)
          for(var j=0;j<looks.length;j++){
            if(list[i].text==looks[j].viewName){
              _this.setData({
                ["list["+i+"].hid"] : looks[j].look > 0
              })
              continue list
            }
          }
          // if(i != 12){
          //   console.log("执行",["list["+i+"].hid"])
          //   _this.setData({
          //     ["list["+i+"].hid"] : false
          //   })
          // }
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
    var that = this;
    
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
            
            console.log('=== 开始调用云函数（分批获取）===')
            
            // 先获取非图片的基础信息
            that.queryBasicInfo(companyName, systemName);
          }
        })
      }
    })
  },
  
  // 第一步：获取基础信息（不包含图片）
  queryBasicInfo: function(companyName, systemName) {
    var that = this;
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: `SELECT topgao,xuankuan,xuangao,textbox,beizhu1 
                FROM yh_notice.dbo.product_pushnews 
                WHERE gsname='${companyName}' 
                AND xtname='云合人事管理系统' 
                AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) 
                AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))`
      },
      success: res => {
        var pushdata = res.result.recordset;
        if (pushdata && pushdata.length > 0) {
          const firstItem = pushdata[0];
          
          if(firstItem.beizhu1 == "隐藏广告"){
            that.hideBanner();
            that.closeXuanTu();
            return;
          }
  
          let marqueeText = firstItem.textbox || '暂无公告信息';
          let xuankuan = firstItem.xuankuan ? firstItem.xuankuan + 'px' : '300rpx';
          let xuangao = firstItem.xuankuan ? firstItem.xuangao + 'px' : '300rpx';
          let topgao = firstItem.topgao ? firstItem.topgao + 'px' : '200rpx';
  
          // 先设置基础信息
          that.setData({ 
            marqueeText: marqueeText,
            xuanTuStyle: `width: ${xuankuan};height: ${xuangao};`,
            topTuStyle: `height: ${topgao};`
          });
          
          // 第二步：分批获取图片数据
          that.queryImageData(companyName, systemName);
        }
      },
      fail: err => {
        console.error('获取基础信息失败:', err);
      }
    });
  },
  
 // 第二步：逐字段获取图片数据（最保险的方案）
queryImageData: function(companyName, systemName) {
  var that = this;
  
  // 逐个字段获取，确保每次只获取一个图片
  const imageFields = ['tptop1', 'tptop2', 'tptop3', 'tptop4', 'tptop5', 'tptop6'];
  
  let currentIndex = 0;
  let singleImage = '';
  let bannerImages = [];
  
  function fetchNextField() {
    if (currentIndex >= imageFields.length) {
      // 所有图片数据获取完成
      that.setData({ 
        singleImage: singleImage,
        bannerImages: bannerImages,
        hasSingleImage: !!singleImage,
        hasBannerImages: bannerImages.length > 0
      });
      
      if (singleImage) {
        that.testImageLoad(singleImage, '单独图片');
      }
      if (bannerImages.length > 0) {
        that.testImageLoad(bannerImages[0], '轮播图第一张');
      }
      return;
    }
    
    const fieldName = imageFields[currentIndex];
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: `SELECT ${fieldName} 
                FROM yh_notice.dbo.product_pushnews 
                WHERE gsname='${companyName}' 
                AND xtname='云合人事管理系统' 
                AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) 
                AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))`
      },
      success: res => {
        var imageData = res.result.recordset;
        if (imageData && imageData.length > 0) {
          const item = imageData[0];
          const rawData = item[fieldName];
          
          if (rawData && rawData.trim() !== '') {
            // 检查数据大小
            const dataSize = rawData.length;
            const sizeInKB = Math.round(dataSize / 1024);
            console.log(`图片 ${fieldName} 大小: ${sizeInKB}KB`);
            
            // 如果图片太大，跳过并记录警告
            if (sizeInKB > 500) { // 500KB限制
              console.warn(`图片 ${fieldName} 过大(${sizeInKB}KB)，已跳过`);
            } else {
              const cleanedData = rawData
                .replace(/\r?\n|\r/g, '')
                .replace(/\s/g, '')
                .trim();
              
              let mimeType = 'image/jpeg';
              if (cleanedData.startsWith('iVBORw0KGgo')) {
                mimeType = 'image/png';
              } else if (cleanedData.startsWith('/9j/')) {
                mimeType = 'image/jpeg';
              }
              
              const finalUrl = `data:${mimeType};base64,${cleanedData}`;
              
              // tptop1 单独处理，其他作为轮播图
              if (fieldName === 'tptop1') {
                singleImage = finalUrl;
                console.log('单独图片 tptop1 已设置');
              } else {
                bannerImages.push(finalUrl);
                console.log(`轮播图添加 ${fieldName}`);
              }
            }
          }
        }
        
        currentIndex++;
        // 继续获取下一个字段，增加延迟避免请求过快
        setTimeout(fetchNextField, 200);
      },
      fail: err => {
        console.error(`获取图片字段 ${fieldName} 失败:`, err);
        
        // 如果是数据超限错误，尝试使用数据截取方案
        if (err.errMsg && err.errMsg.includes('exceed')) {
          console.log(`图片 ${fieldName} 数据超限，尝试分段获取`);
          that.fetchImageInChunks(companyName, systemName, fieldName, currentIndex);
        } else {
          currentIndex++;
          setTimeout(fetchNextField, 200);
        }
      }
    });
  }
  
  // 开始获取第一个图片字段
  fetchNextField();
},

// 分段获取大图片数据（如果单个字段也超限）
fetchImageInChunks: function(companyName, systemName, fieldName, fieldIndex) {
  var that = this;
  let chunkSize = 8000; // 每次获取8000字符
  let startPos = 0;
  let fullData = '';
  let chunkCount = 0;
  
  function fetchNextChunk() {
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: `SELECT SUBSTRING(${fieldName}, ${startPos + 1}, ${chunkSize}) as data_chunk 
                FROM yh_notice.dbo.product_pushnews 
                WHERE gsname='${companyName}' 
                AND xtname='云合人事管理系统' 
                AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) 
                AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))`
      },
      success: res => {
        chunkCount++;
        var chunkData = res.result.recordset;
        if (chunkData && chunkData.length > 0) {
          const chunk = chunkData[0].data_chunk;
          if (chunk) {
            fullData += chunk;
            console.log(`获取 ${fieldName} 第${chunkCount}段数据，长度: ${chunk.length}`);
            
            // 如果获取的数据长度小于chunkSize，说明是最后一段
            if (chunk.length < chunkSize) {
              processCompleteImage(fullData, fieldName, fieldIndex);
            } else {
              startPos += chunkSize;
              setTimeout(fetchNextChunk, 300);
            }
          } else {
            // 没有更多数据了
            processCompleteImage(fullData, fieldName, fieldIndex);
          }
        } else {
          processCompleteImage(fullData, fieldName, fieldIndex);
        }
      },
      fail: err => {
        console.error(`获取 ${fieldName} 第${chunkCount}段失败:`, err);
        // 即使失败也尝试处理已获取的数据
        processCompleteImage(fullData, fieldName, fieldIndex);
      }
    });
  }
  
  function processCompleteImage(imageData, fieldName, fieldIndex) {
    if (!imageData || imageData.trim() === '') {
      console.log(`图片 ${fieldName} 数据为空`);
      that.continueToNextField(fieldIndex + 1);
      return;
    }
    
    const cleanedData = imageData
      .replace(/\r?\n|\r/g, '')
      .replace(/\s/g, '')
      .trim();
    
    let mimeType = 'image/jpeg';
    if (cleanedData.startsWith('iVBORw0KGgo')) {
      mimeType = 'image/png';
    } else if (cleanedData.startsWith('/9j/')) {
      mimeType = 'image/jpeg';
    }
    
    const finalUrl = `data:${mimeType};base64,${cleanedData}`;
    
    // 更新到对应的数据中
    if (fieldName === 'tptop1') {
      that.singleImage = finalUrl;
      console.log('分段获取的单独图片 tptop1 已设置');
    } else {
      that.bannerImages.push(finalUrl);
      console.log(`分段获取的轮播图添加 ${fieldName}`);
    }
    
    that.continueToNextField(fieldIndex + 1);
  }
  
  // 开始获取第一段数据
  fetchNextChunk();
},

continueToNextField: function(nextIndex) {
  var that = this;
  const imageFields = ['tptop1', 'tptop2', 'tptop3', 'tptop4', 'tptop5', 'tptop6'];
  
  if (nextIndex >= imageFields.length) {
    // 所有字段获取完成，更新界面
    that.setData({ 
      singleImage: that.singleImage,
      bannerImages: that.bannerImages,
      hasSingleImage: !!that.singleImage,
      hasBannerImages: that.bannerImages.length > 0
    });
    
    if (that.singleImage) {
      that.testImageLoad(that.singleImage, '单独图片');
    }
    if (that.bannerImages.length > 0) {
      that.testImageLoad(that.bannerImages[0], '轮播图第一张');
    }
  } else {
    // 继续获取下一个字段
    setTimeout(() => {
      that.queryImageData(companyName, systemName);
    }, 200);
  }
}
})
