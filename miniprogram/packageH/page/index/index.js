const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    user_name:'',
    id:'',
    company:'',
    full_name:'',
    active:'1',
    userInfo: [],
    showList: [
      {
        text: "个人中心",
        url: "../contract_my/contract_my"
      },
       {
        text: "合同管理",
        url: "../contract_manage/contract_manage"
      }, {
        text: "账户中心",
        url: "../contract_personnel/contract_personnel"
      }, 
      // {
      //   text: "印章管理",
      //   url: "../contract_personnel_pitcure/contract_personnel_pitcure"
      // }, 
      {
        text: "退出",
        url: 　""
      }
    ]
  },
  go: function (e) {
    var _this = this;
    console.log(_this.data.user_name)
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
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
          wx.navigateTo({
            url: url + '?userInfo=' + JSON.stringify({
              user_name : _this.data.user_name,
              id : _this.data.id,
              company : _this.data.company,
              full_name : _this.data.full_name,
            })
          })
      }
  },

  go_to:function(){
    var _this = this
    wx.navigateTo({
      url: "../contract_wode/contract_wode" + '?userInfo=' + JSON.stringify({
        user_name : _this.data.user_name,
        id : _this.data.id,
        company : _this.data.company,
        full_name : _this.data.full_name,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = JSON.parse(options.userInfo)
    console.log(userInfo)
    var _this=this
    _this.setData({
      user_name : userInfo.user_name,
      id : userInfo.id,
      company : userInfo.company,
      full_name : userInfo.full_name,
      power:userInfo.power
    })
    var show_list = []
    if(userInfo.power == '管理员'){
      show_list = [
        {
          text: "个人中心",
          url: "../contract_my/contract_my"
        },
         {
          text: "合同管理",
          url: "../contract_manage/contract_manage"
        }, {
          text: "账户中心",
          url: "../contract_personnel/contract_personnel"
        }, 
        // {
        //   text: "印章管理",
        //   url: "../contract_personnel_pitcure/contract_personnel_pitcure"
        // }, 
        {
          text: "退出",
          url: 　""
        }
      ]
    }else{
      show_list = [
        {
          text: "个人中心",
          url: "../contract_my/contract_my"
        },
        //  {
        //   text: "合同管理",
        //   url: "../contract_manage/contract_manage"
        // }, {
        //   text: "账户中心",
        //   url: "../contract_personnel/contract_personnel"
        // }, 
        // {
        //   text: "印章管理",
        //   url: "../contract_personnel_pitcure/contract_personnel_pitcure"
        // }, 
        {
          text: "退出",
          url: 　""
        }
      ]
    }

    _this.setData({
      showList : show_list,
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