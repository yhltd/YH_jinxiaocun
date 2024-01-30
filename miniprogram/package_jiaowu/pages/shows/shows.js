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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  }
})