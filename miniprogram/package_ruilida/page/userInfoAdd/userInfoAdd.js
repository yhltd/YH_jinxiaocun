// package_ruilida/page/userInfoAdd/userInfoAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xlShow2: false,
    id:'',
    name:'',
    username:'',
    password:'',
    power:'',
    shenpi:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo
    })
    var id = options.id
    if(id != null && id != undefined){
      var sql = "select * from userInfo where id=" + id
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var list = res.result.recordset[0]
          console.log(list)
          _this.setData({
            id: id,
            name: list.name,
            username: list.username,
            password: list.password,
            power: list.power,
            shenpi: list.shenpi
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
    }
  },

  get_peizhi:function(){
    var _this = this
    wx.showLoading({
      title:'加载中'
    })
    var sql = "select * from userPower;select * from userInfo"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var power_list = res.result.recordsets[0]
        var shenpi_list = res.result.recordsets[1]
        console.log(power_list)
        console.log(shenpi_list)
        _this.setData({
          power_list,
          shenpi_list
        })
        wx.hideLoading()
      },
      err: res => {
        wx.hideLoading()
        console.log("错误!")
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  peizhi_goto:function(e){
    var _this = this
    var this_column = e.target.dataset.column
    console.log(e)
    console.log(this_column)

    wx.showModal({
      title: '提示',
      content: '即将跳转到配置页',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          if(this_column == 'power'){
            wx.navigateTo({
              url: '../userPower/userPower' + '?userInfo=' + JSON.stringify(_this.data.userInfo)
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  save:function(){
    var _this = this
    if(_this.data.name == '' || _this.data.username == '' || _this.data.password == '' || _this.data.power == ''){
      wx.showToast({
        title: '前四项不能为空',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title:'保存中'
    })
    var sql = ""
    if(_this.data.id != ''){
      sql = "update userInfo set name='" + _this.data.name + "',username='" + _this.data.username + "',password='" + _this.data.password + "',power='" + _this.data.power + "',shenpi='" + _this.data.shenpi + "' where id=" + _this.data.id
    }else{
      sql = "insert into userInfo(name,username,password,power,shenpi) values('" + _this.data.name + "','" + _this.data.username + "','" + _this.data.password + "','" + _this.data.power + "','" + _this.data.shenpi + "')"
    }
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 3000
        })
        setTimeout(function () {
          _this.back()
        }, 2000)
      },
      err: res => {
        wx.hideLoading()
        wx.showToast({
          title: '错误！',
          icon: 'none',
          duration: 3000
        })
        console.log("错误!")
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  back:function(){
    var _this = this
    wx.navigateBack({
      delta: 1
    })
  },

  xiala_show: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    _this.setData({
      list_xiala: list,
      click_column:column,
    })
    console.log(list)
    _this.setData({
      xlShow2: true
    })
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      _this.setData({
        xlShow2: false,
        [click_column]:new_val
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var _this = this
    _this.get_peizhi()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})