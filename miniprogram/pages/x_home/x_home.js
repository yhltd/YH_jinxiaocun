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
            position: _this.data.position,
            password:_this.data.password,
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
        password:options.password,
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
                AND xtname='云合智慧门店收银系统' 
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
                AND xtname='云合智慧门店收银系统' 
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
                AND xtname='云合智慧门店收银系统' 
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