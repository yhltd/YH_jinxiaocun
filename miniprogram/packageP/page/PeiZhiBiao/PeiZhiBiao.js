// miniprogram/packageP/page/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isdis:'',
    renyuan_list: [],
    active: 0,
    showList: [{
        text: "模块",
        url: "../PZ_MoKuaiDanWei/PZ_MoKuaiDanWei"
      },
      {
        text: "工作时间",
        url: "../PZ_GongZuoShiJian/PZ_GongZuoShiJian"
      },
      {
        text: "bom",
        url: "../PZ_Bom/PZ_Bom"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.tableShow()
    _this.renyuanbumen()
    // _this.panduanquanxian()

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
        url: '../PeiZhiBiao/PeiZhiBiao'
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../DingDan/DingDan'
      })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: '../PaiChan/PaiChan'
      })
    } else if (event.detail == 3) {
      wx.redirectTo({
        url: '../HuiZong/HuiZong'
      })
    }
  },
  go: function (e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    var text = _this.data.showList[index].text
    wx.navigateTo({
      url: url
    })
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