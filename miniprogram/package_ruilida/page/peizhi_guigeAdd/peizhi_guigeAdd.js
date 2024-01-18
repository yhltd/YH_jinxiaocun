// package_ruilida/page/userInfoAdd/userInfoAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xlShow2: false,
    id:'',
    guige:'',
    type:'',
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
      var sql = "select * from peizhi_guige where id=" + id
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
            guige: list.guige,
            type: list.type,
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

  save:function(){
    var _this = this
    if(_this.data.guige == '' || _this.data.type == ''){
      wx.showToast({
        title: '信息填写不全',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title:'保存中'
    })
    var sql = ""
    if(_this.data.id != ''){
      sql = "select * from peizhi_guige where type='" + _this.data.type + "' and id !=" + _this.data.id
    }else{
      sql = "select * from peizhi_guige where type='" + _this.data.type + "'"
    }
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        wx.hideLoading()
        console.log(res.result.recordset)
        var list = res.result.recordset
        if(list.length > 0){
          wx.showToast({
            title: '已有相同名称规格组！',
            icon: 'none',
            duration: 3000
          })
          wx.hideLoading()
          return;
        }
        var sql = ""
        if(_this.data.id != ''){
          sql = "update peizhi_guige set guige='" + _this.data.guige + "',type='" + _this.data.type + "' where id=" + _this.data.id
        }else{
          sql = "insert into peizhi_guige(guige,type) values('" + _this.data.guige + "','" + _this.data.type + "')"
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
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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