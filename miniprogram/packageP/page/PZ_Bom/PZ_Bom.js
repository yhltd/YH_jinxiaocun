const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  tjShow:false,
  xgShow: false,
  cxShow: false,
  data: {
    list:[],
    title: [{ text: "物料编码", width: "200rpx", columnName: "code", type: "digit", isupd: true },
            { text: "物料名称", width: "200rpx", columnName: "name", type: "text", isupd: true },
            { text: "类别", width: "200rpx", columnName: "type", type: "text", isupd: true },
            { text: "规格", width: "200rpx", columnName: "norms", type: "text", isupd: true },
            { text: "描述", width: "400rpx", columnName: "comment", type: "date", isupd: true },
            { text: "大小", width: "200rpx", columnName: "size", type: "text", isupd: true },
            { text: "单位", width: "200rpx", columnName: "unit", type: "date", isupd: true },
            { text: "使用数量", width: "200rpx", columnName: "count", type: "date", isupd: false }
          ],
    code:"",  
    name:"",
    type:"",
    wlbm: "",
    wlmc: "",
    lb: "",
    gg: "",
    dx: "",
    dw: "",
    ms: "",
    id:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var _this=this
    var e= ['', '', '']
    _this.tableShow(e)
  },
  tableShow:function(e){
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select id,code,name,[type],norms,comment,[size],[unit],isnull((select sum(use_num) from order_bom where bom_id=bom_info.id),0) as [count] from bom_info where company='" + user + "' and code like '%" + e[0] + "%' and name like '%" + e[1] + "%' and [type] like '%" + e[2] +"%'"
      },
      success: res => {
          var list = res.result.recordset
          _this.setData({
            list: list
          })
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
  qxShow:function(){
    var _this=this
    _this.setData({
      tjShow:false,
      xgShow: false,
      cxShow:false,
      code: "",
      name: "",
      type: "",
      wlbm: "",
      wlmc: "",
      lb: "",
      gg: "",
      dx: "",
      dw: "",
      ms: "",
      id: "",
    })
  },
  inquire:function(){
    var _this = this
    _this.setData({
      tjShow: true
    })
  },
  add1:function(){
    var _this=this
    let user = app.globalData.gongsi;
    if (_this.data.wlbm != "" && _this.data.wlmc != "" && _this.data.lb !=""){
      // wx.cloud.callFunction({
      //   name: 'sqlServer_PC',
      //   data: {
      //     query: "select * from bom_info where code ='" + _this.data.wlbm + "' or name ='" + _this.data.wlmc +"'"
      //   },
      //   success: res => {
      //     if (res.result.recordset.length=0){


      // ------------------------------------
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "insert into bom_info(code,name,norms,comment,[unit],[size],[type],company) values('" + _this.data.wlbm + "','" + _this.data.wlmc + "','" + _this.data.gg + "','" + _this.data.ms + "','" + _this.data.dw + "','" + _this.data.dx + "','" + _this.data.lb + "','" + user +"')"
      },
      success: res => {
        _this.setData({
          code: "",
          name: "",
          norms: "",
          wlbm: "",
          wlmc: "",
          lb: "",
          gg: "",
          dx: "",
          dw: "",
          ms: "",
        })
        _this.qxShow()
        var e = ['', '', '']
        _this.tableShow(e)
        wx.showToast({
          title: '添加成功！',
          icon: 'none'
        })
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    }) 
          
    // ------------------------------------
          // },
    }else{
      wx.showToast({
        title: '物料编码、物料名称、类别不能为空！',
        icon: 'none'
      })
    
  }
  },
  clickView:function(e){
    var _this = this
    _this.setData({
      wlbm: _this.data.list[e.currentTarget.dataset.index].code, 
      wlmc: _this.data.list[e.currentTarget.dataset.index].name,
      lb: _this.data.list[e.currentTarget.dataset.index].type,
      gg: _this.data.list[e.currentTarget.dataset.index].norms,
      dx: _this.data.list[e.currentTarget.dataset.index].size,
      dw: _this.data.list[e.currentTarget.dataset.index].unit,
      ms: _this.data.list[e.currentTarget.dataset.index].comment,
      id: _this.data.list[e.currentTarget.dataset.index].id,
      xgShow:true,
    })
  },
  upd1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.wlbm != "" && _this.data.wlmc != "" && _this.data.lb !="") {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "update bom_info set code='" + _this.data.wlbm + "',name='" + _this.data.wlmc + "',norms='" + _this.data.gg + "',comment='" + _this.data.ms + "',[unit]='" + _this.data.dw + "',[size]='" + _this.data.dx + "',[type]='" + _this.data.lb + "' where  company='" + user + "' and id='" + _this.data.id +"'"
        },
        success: res => {
          _this.setData({
            code: "",
            name: "",
            norms: "",
            wlbm: "",
            wlmc: "",
            lb: "",
            gg: "",
            dx: "",
            dw: "",
            ms: "",
          })
          _this.qxShow()
          var e = ['', '', '']
          _this.tableShow(e)
          wx.showToast({
            title: '修改成功！',
            icon: 'none'
          })
          wx.hideLoading({

          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
    } else {
      wx.showToast({
        title: '物料编码、物料名称、类别不能为空！',
        icon: 'none'
      })
    }
  },
  del1:function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "delete from bom_info where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            code: "",
            name: "",
            norms: "",
            wlbm: "",
            wlmc: "",
            lb: "",
            gg: "",
            dx: "",
            dw: "",
            ms: "",
          })
          _this.qxShow()
          var e = ['', '', '']
          _this.tableShow(e)
          wx.showToast({
            title: '删除成功！',
            icon: 'none'
          })
          wx.hideLoading({

          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
  },
  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
    })
  },
  sel1:function(){
    var _this = this
    var e = [_this.data.code, _this.data.name, _this.data.type]
    _this.tableShow(e)
    _this.qxShow()
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