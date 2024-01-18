// package_ruilida/page/userInfoAdd/userInfoAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xlShow2: false,
    id:'',
    name:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var type = options.type
    _this.setData({
      userInfo,
      type
    })
    var id = options.id
    if(id != null && id != undefined){
      var sql = "select * from peizhi where id=" + id
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
    if(_this.data.name == ''){
      wx.showToast({
        title: _this.data.type + '不能为空',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title:'保存中'
    })
    var sql = ""
    if(_this.data.id == ''){
      sql = "select * from peizhi where name='" + _this.data.name + "' and type='" + _this.data.type + "'"
    }else{
      sql = "select * from peizhi where name='" + _this.data.name + "' and type='" + _this.data.type + "' and id !=" + _this.data.id
    }
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res.result.recordset)
        var list = res.result.recordset
        if(list.length > 0){
          wx.showToast({
            title: '已有相同的配置项！',
            icon: 'none',
            duration: 3000
          })
          wx.hideLoading()
          return;
        }
        var sql = ""
        if(_this.data.id != ''){
          sql = "update peizhi set name='" + _this.data.name + "' where id=" + _this.data.id
        }else{
          sql = "insert into peizhi(name,type) values('" + _this.data.name + "','" +  _this.data.type + "')"
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

  moren:function(){
    var _this = this
    var id = _this.data.userInfo.id
    var new_value = _this.data.id
    var sql = ""
    if(_this.data.type == '仓库'){
      sql = "update userInfo set cangku = '" + new_value + "' where id=" + id
    }else if(_this.data.type == '店铺'){
      sql = "update userInfo set dianpu = '" + new_value + "' where id=" + id
    }else if(_this.data.type == '核算单位'){
      sql = "update userInfo set hesuan_danwei = '" + new_value + "' where id=" + id
    }else if(_this.data.type == '收款账户'){
      sql = "update userInfo set shoukuan_zhanghu = '" + new_value + "' where id=" + id
    }else if(_this.data.type == '质保等级'){
      sql = "update userInfo set zhibao_dengji = '" + new_value + "' where id=" + id
    }
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '已设置为默认',
          icon: 'none',
          duration: 3000
        })
      },
      err: res => {
        wx.showToast({
          title: '错误！',
          icon: 'none',
          duration: 3000
        })
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
    wx.setNavigationBarTitle({title: _this.data.type});
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