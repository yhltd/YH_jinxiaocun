const updSpace = require('../util/updSpace')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],

    title: [
      {text:"操作",width:"100rpx",columnName:"row_id"},
      {text:"序号",width:"100rpx",columnName:"row_id"},
      {text:"用户名",width:"250rpx",columnName:"userName"},
      {text:"密码",width:"250rpx",columnName:"password"},
      {text:"所属店铺",width:"200rpx",columnName:"shop"},
      {text:"身份",width:"200rpx",columnName:"power"},
      {text:"二维码",width:"250rpx",columnName:"qrCode_shop"},
    ],
    list : [],


    mask_hid : true,

    userName : "",
    shop : "",

    moreDo_hid : true,

    checkItems : [],

    showImageUrl : "",
    image_hid : true
  },

  init : function(){
    var _this = this;

    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name : "sqlServer_117",
      data : {
        query : "select *,row_number() over(order by power desc) as row_id,0 as isHid from zeng_user order by power desc"
      },
      success : res=> {
        var list = res.result.recordset;
        _this.setData({
          list
        })
      },
      complete: res=> {
        wx.hideLoading({
          success: (res) => {},
        })
      }

    })
  },


  input_sel : function(e){
    var _this = this;
    var column = e.currentTarget.dataset.column
    var value = e.detail.value==""?"":e.detail.value

    if(column=="userName"){
      _this.setData({
        userName : value
      })
    }else{
      _this.setData({
        shop : value
      })
    }

    var list = _this.data.list;
    var userName = _this.data.userName.toString()
    var shop = _this.data.shop.toString()
    for(let i=0;i<list.length;i++){
      if(userName=="" && shop==""){  
        _this.setData({
          ["list["+i+"].isHid"] : 0
        })
      }
      if(userName!="" && shop==""){
        if(list[i].userName.indexOf(userName)==-1){
          _this.setData({
            ["list["+i+"].isHid"] : 1
          })
        }else{
          _this.setData({
            ["list["+i+"].isHid"] : 0
          })
        }
      }
      if(userName=="" && shop!=""){
        if(list[i].shop.indexOf(shop)==-1){
          _this.setData({
            ["list["+i+"].isHid"] : 1
          })
        }else{
          _this.setData({
            ["list["+i+"].isHid"] : 0
          })
        }
      }
      if(userName!="" && shop!=""){
        if(list[i].userName.indexOf(userName)==-1 || list[i].shop.indexOf(shop)==-1){
          _this.setData({
            ["list["+i+"].isHid"] : 1
          })
        }else{
          _this.setData({
            ["list["+i+"].isHid"] : 0
          })
        }
      }
    }
  },

  moreDo_show : function(){
    var _this = this;
    _this.setData({
      moreDo_hid : false,
      mask_hid : false,
    })
  },

  choice_checkBox : function(e){
    var _this = this;
    var value = e.detail.value
    var id = e.currentTarget.dataset.id;
    var checkItems = _this.data.checkItems;
    if(value!=""){
      checkItems.push(id)
    }else{
      for(let i=0;i<checkItems.length;i++){
        if(checkItems[i]==id){
          checkItems.splice(i,1)
        }
      }
    }
    _this.setData({
      checkItems
    })
  },

  newUser : function(){
    wx.showModal({
      title : '提示',
      content : '跳转到新增用户页面',
      success (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../z_yonghuguanli_insert/z_yonghuguanli_insert',
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
  },

  delUser : function(){
    var _this = this;
    var checkItems = _this.data.checkItems;
    _this.hid_view();
    if(checkItems.length==0){
      wx.showToast({
        title: '请选择用户',
        icon : 'none'
      })
      return;
    }
    wx.showModal({
      title : '提示',
      content : '确认删除吗？',
      success (res) {
        if (res.confirm) {
          var sql = "delete from zeng_user where id in ("
          for(let i =0 ;i<checkItems.length;i++){
            if(i == checkItems.length-1){
              sql += "'"+checkItems[i]+"')"
              continue;
            }
            sql += "'"+checkItems[i]+"',"
          }
          wx.cloud.callFunction({
            name : "sqlServer_117",
            data : {
              query : sql
            },
            success : res=> {
              wx.hideLoading({
                complete : res=> {
                  wx.showToast({
                    title: '删除成功',
                    icon : 'success'
                  })
                  updSpace.del("zeng_user",checkItems.length)
                  _this.init();
                }
              })
            }
          })
        } else if (res.cancel) {
          return
        }
      }
    })
  },

  updUser : function(){
    var _this = this
    var checkItems = _this.data.checkItems
    if(checkItems.length>1 || checkItems.length==0){
      wx.showToast({
        title: '请选择一位员工',
        icon : 'none'
      })
      _this.hid_view();
      return;
    }
    wx.showModal({
      title : '提示',
      content : '跳转到修改用户页面',
      success (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../z_yonghuguanli_insert/z_yonghuguanli_insert?id='+_this.data.checkItems[0],
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
  },

  showImage : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index
    var qrCode_shop = _this.data.list[index].qrCode_shop;
    if(qrCode_shop==""){
      wx.showToast({
        title: '该用户未录入二维码',
        icon : 'none'
      })
      return;
    }

    //转码
    var base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(qrCode_shop));
    var base64ImgUrl = "data:image/png;base64," + base64Data;
    _this.setData({
      showImageUrl : base64ImgUrl
    })
    wx.nextTick(function(){
      _this.setData({
        image_hid : false,
        mask_hid : false
      })
    })
  },

  hid_view : function(){
    var _this = this;
    _this.setData({
      moreDo_hid : true,
      image_hid : true,
      mask_hid : true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
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
    var _this = this;
    _this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.hid_view();
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