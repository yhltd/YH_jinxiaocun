// package_ruilida/page/productSelect/productSelect.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    this_type:'客户欠款',
    product_show:false,
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
    const systemInfo = wx.getSystemInfoSync();
    var scoll_height = systemInfo.windowHeight * 0.85
    _this.setData({
      scoll_height
    })
    console.log(systemInfo) 
  },

  tableShow:function(){
    var _this = this
    var sql = "select * from kehu_qichu;select * from gongyingshang_qichu;select * from product_qichu"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var customer_list = res.result.recordsets[0]
        var gongyingshang_list = res.result.recordsets[1]
        var kucun_list = res.result.recordsets[2]
        
        _this.setData({
          customer_list,
          gongyingshang_list,
          kucun_list
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

  tianjia:function(){
    var _this = this
    var this_type = _this.data.this_type
    if(this_type == '客户欠款'){
      wx.navigateTo({
        url: '../qichu_kehuAdd/qichu_kehuAdd?userInfo=' + JSON.stringify(_this.data.userInfo),
      })
    }else if(this_type == '供应商欠款'){
      wx.navigateTo({
        url: '../qichu_gongyingshangAdd/qichu_gongyingshangAdd?userInfo=' + JSON.stringify(_this.data.userInfo),
      })
    }else if(this_type == '库存'){
      wx.navigateTo({
        url: '../qichu_kucunAdd/qichu_kucunAdd?userInfo=' + JSON.stringify(_this.data.userInfo),
      })
    }
  },

  kehu_upd:function(e){
    var _this = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    var id = _this.data.customer_list[index].id
    wx.navigateTo({
      url: '../qichu_kehuAdd/qichu_kehuAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
    })
  },

  gongyingshang_upd:function(e){
    var _this = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    var id = _this.data.gongyingshang_list[index].id
    wx.navigateTo({
      url: '../qichu_gongyingshangAdd/qichu_gongyingshangAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
    })
  },

  kucun_upd:function(e){
    var _this = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    var id = _this.data.kucun_list[index].id
    wx.navigateTo({
      url: '../qichu_kucunAdd/qichu_kucunAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
    })
  },

  onChange:function(e){
    var _this = this
    console.log(e)
    var this_type = e.detail.title
    var this_index = e.detail.index
    _this.setData({
      this_type,
      active:this_index
    })
  },

  danxuan_zengpin(e){
    var _this = this
    var pro_list = _this.data.pro_list
    var index = e.currentTarget.dataset.index
    if(pro_list[index].checked == false){
      pro_list[index].checked = true
    }else{
      pro_list[index].checked = false
    }
    _this.setData({
      pro_list
    })
  },

  save:function(){
    var _this = this
    var this_list = _this.data.pro_list
    var save_list = []
    for(var i=0; i<this_list.length; i++){
      if(this_list[i].num > 0){
        save_list.push(this_list[i])
      }
    }
    if(save_list.length == 0){
      wx.showToast({
        title: '未选择商品',
        icon:'none'
      })
      return;
    }
    app.globalData.ruili_pro = save_list
    _this.back()
  },

  back:function(){
    var _this = this
    wx.navigateBack({
      delta: 1
    })
  },

  list_select:function(){
    var _this = this
    _this.setData({
      product_show:true
    })
  },

  qxShow:function(){
    var _this = this
    _this.setData({
      product_show:false
    })
  },

  kehu_del:function(e){
    var _this = this 
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确认删除此信息?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var index = e.currentTarget.dataset.index
          var id = _this.data.customer_list[index].id
          var sql = "delete from kehu_qichu where id=" + id
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              wx.showToast({
                title: '已删除！',
                icon: 'none',
                duration: 3000
              })
              _this.tableShow()
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  gongyingshang_del:function(e){
    var _this = this 
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确认删除此信息?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var index = e.currentTarget.dataset.index
          var id = _this.data.gongyingshang_list[index].id
          var sql = "delete from gongyingshang_qichu where id=" + id
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              wx.showToast({
                title: '已删除！',
                icon: 'none',
                duration: 3000
              })
              _this.tableShow()
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  kucun_del:function(e){
    var _this = this 
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确认删除此信息?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var index = e.currentTarget.dataset.index
          var id = _this.data.kucun_list[index].id
          var sql = "delete from product_qichu where id=" + id
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              wx.showToast({
                title: '已删除！',
                icon: 'none',
                duration: 3000
              })
              _this.tableShow()
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  changeStepper:function(e){
    var _this = this
    console.log(e)
    var pro_list = _this.data.pro_list
    var yixuan_list = _this.data.yixuan_list
    if(yixuan_list[pro_list[e.currentTarget.dataset.index].bianhao] == undefined || yixuan_list[pro_list[e.currentTarget.dataset.index].bianhao] == ""){
      pro_list[e.currentTarget.dataset.index].num = e.detail
      _this.setData({
        pro_list
      })
    }else{
      pro_list[e.currentTarget.dataset.index].num = 0
      _this.setData({
        pro_list
      })
      wx.showToast({
        title: '已有此商品，请勿重复选择',
        icon:'none'
      })
      return;
    }
  },

  inputChange:function(e){
    var _this = this
    console.log(e)
    var text = e.detail
    console.log(_this.data.pro_list)
    var list = _this.data.pro_list
    for(var i=0; i<list.length; i++){
      if(text!= ''){
        if(list[i].name.indexOf(text) != -1){
          list[i].isselect = 1
        }else{
          list[i].isselect = 0
        }
      }else{
        list[i].isselect = 1
      }
    }
    console.log(list)
    _this.setData({
      pro_list: list
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
    var _this = this
    _this.tableShow()
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