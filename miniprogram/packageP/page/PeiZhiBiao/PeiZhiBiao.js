// miniprogram/packageP/page/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isdis:'',
    handle:true,
    renyuan_list: [],
    active: 0,
    isBannerHidden: true,
    showXuanTu: true,
    showList: [{
        text: "模块",
        url: "../PZ_MoKuaiDanWei/PZ_MoKuaiDanWei"
      },
      {
        text: "工作时间",
        url: "../PZ_GongZuoShiJian/PZ_GongZuoShiJian"
      },
      {
        text: "BOM",
        url: "../PZ_Bom/PZ_Bom"
      },
      {
        text: "账号管理",
        url: "../ZhangHaoGuanLi/ZhangHaoGuanLi"
      },
      {
        text: "数据空间",
        url: ""
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo,
    })

    this.queryUserPermissions()
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
                    var sql = "select * from user_info where wechart_user = '" + _this.data.wxOpenId + "'"
                    console.log(sql)
                    wx.cloud.callFunction({
                      name: 'sqlServer_PC',
                      data:{
                        query : sql
                      },
                      success(res){
                        console.log(res)
                        var list = res.result.recordset
                        console.log(list)
                        if(list.length > 0){
                          app.globalData.gongsi = list[0].company
                          app.globalData.finduser = list[0].user_code
                          _this.refresh()
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
      _this.refresh()
    }
  },

  refresh:function(){
    var _this = this
    _this.tableShow()
    _this.renyuanbumen()
    _this.getSpace()

    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "exec sp_spaceused 'bom_info';exec sp_spaceused 'department';exec sp_spaceused 'holiday_config';exec sp_spaceused 'module_info';exec sp_spaceused 'module_type';exec sp_spaceused 'order_check';exec sp_spaceused 'order_info';exec sp_spaceused 'paibanbiao_detail';exec sp_spaceused 'paibanbiao_info';exec sp_spaceused 'paibanbiao_renyuan';exec sp_spaceused 'time_config';exec sp_spaceused 'user_info';exec sp_spaceused 'user_info1';exec sp_spaceused 'user_info';exec sp_spaceused 'work_detail';exec sp_spaceused 'work_detail1';exec sp_spaceused 'work_detail2';"
      },
      success: res => {
        var list = res.result.recordsets
        console.log(res.result)
        var list_space = []

        for(let i=0;i<list.length;i++){
          list_space.push({name:list[i][0].name,size:Math.ceil(list[i][0].reserved.split(" ")[0]/list[i][0].rows)})
        }
        app.globalData.spaceList_pc.list_table = list_space
        _this.getPro(list)
      },
      err: res => {
        console.log("错误!")
      },
    })
  },

  hid_view: function () {
    var _this = this
    _this.setData({
      handle: true
    })
  },

  getPro : function(list){
    var _this = this;
    let company = app.globalData.gongsi;

    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion  from bom_info;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from department;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from holiday_config;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from module_info;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from module_type;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from order_check;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from order_info;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from paibanbiao_detail;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case remarks1 when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from paibanbiao_info;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from paibanbiao_renyuan;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from time_config;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from user_info;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from user_info1;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from user_info;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from work_detail;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from user_info;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from work_detail1;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from user_info;select case convert(float,count(id)) when 0 then 0 else convert(float,count(case company when '"+company+"' then 1 else null end))/convert(float,count(id)) end as proportion from work_detail2;"
      },
      success: res => {
        console.log(res)
        var lists = res.result.recordsets
        var useSpase = 0
        for(let i=0;i<list.length;i++){
          useSpase += parseInt(list[i][0].reserved.split("K")[0])*Math.ceil(lists[i][0].proportion)
        }
        app.globalData.spaceList_pc.usedSpace = useSpase
        console.log("判断数据空间")
        if(app.globalData.spaceList_pc.allSpace == app.globalData.spaceList_pc.usedSpace){
          wx.showToast({
            title: '数据空间不足！',
            icon: 'none'
          })
          wx.reLaunch({
            url: '../../../pages/login/login',
          })
          
        }
      },
      err: res => {
        console.log("错误!")
      },
    })
  },

  getSpace : function(){
    var _this = this;
    let company = app.globalData.gongsi;
    var mark4 = 0;
    wx.cloud.callFunction({
      name : 'sqlServer_system',
      data : {
        query : "SELECT mark4 from control_soft_time where name = '"+company+"' and soft_name = '排产'"
      },
      success : res=> {
        app.globalData.spaceList_pc.allSpace = res.result.recordset[0].mark4*1024
      }
    })
  },

  //获取权限
  tableShow: function () {
    var _this = this
    let user = app.globalData.gongsi;
    let bumen = app.globalData;
    console.log(bumen)
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select * from department where company='" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list: list
        })
        // console.log(list)
        //将集合存入缓存中
        wx.setStorageSync('department_list', list)
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },
  renyuanbumen: function () {
    var _this = this
    let user = app.globalData.finduser;
    let bumen = app.globalData;
    console.log("user " + "select * from user_info where staff_name='" + user + "'")
    console.log(bumen)
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select * from user_info where user_code='" + user + "' and company = '" + app.globalData.gongsi + "' "
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          renyuan_list: list
        })
        //
        console.log("list")
        console.log(list)
        console.log("list end")
        console.log(list[0].department_name)
        wx.setStorageSync('paibanbiao_renyuan_list', list)
        wx.setStorageSync('paibanbiao_renyuan_bumen', list[0].department_name)
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },
  panduanquanxian: function () {
    var _this=this
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log("department_list1")
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name+"ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1) {
        console.log("isdis")
        _this.setData({
          isdis: 1,
        });
        console.log(_this.data.isdis)

      }
    }
  },

  onChange: function (event) {
    var _this = this;
    if (event.detail == 0) {
      wx.redirectTo({
        url: '../PeiZhiBiao/PeiZhiBiao?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../DingDan/DingDan?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: '../PaiChan/PaiChan?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 3) {
      wx.redirectTo({
        url: '../HuiZong/HuiZong?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 4) {
      wx.redirectTo({
        url: '../paichan_grzx/paichan_grzx?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    }
  },
  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var text = _this.data.showList[index].text
    if(url != ''){
      wx.navigateTo({
        url: url
      })
    }else{
      if(app.globalData.spaceList_pc.list_table=="" || app.globalData.spaceList_pc.usedSpace==0 || app.globalData.allSpace == 0){
        wx.showToast({
          title: '正在加载',
          icon : 'none'
        })
        return
      }
      var usedSpace = app.globalData.spaceList_pc.usedSpace
      var allSpace = app.globalData.spaceList_pc.allSpace
      console.log(usedSpace + "  " + allSpace)
      _this.setData({
        usedSpace:Math.ceil(usedSpace/allSpace*100),
        allSpace:Math.floor((allSpace-usedSpace)/1024),
        handle:false
      })
      // wx.showModal({
      //   title : '已用空间：'+Math.ceil(usedSpace/allSpace*100)+'%',
      //   content : '剩余空间：'+Math.floor((allSpace-usedSpace)/1024)+'MB',
      //   showCancel : false,
      //   cancelColor	: '#009688'
      // })
      return;
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
                query: "SELECT tptop1,tptop2,tptop3,tptop4,tptop5,tptop6,topgao,xuankuan,xuangao,textbox,beizhu1  FROM yh_notice.dbo.product_pushnews WHERE gsname='" + companyName + "' AND  xtname='云合排产管理系统' AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))"
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