const updSpace = require('../util/updSpace')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id : "",
    list : []
  },

  init : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var id = _this.data.id
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select * from zeng_user where id = '"+id+"'"
      },
      success: res => {
        _this.setData({
          list : res.result.recordset[0]
        })
      },
      err: res => {
        console.log("错误!")
      },
      complete : res=> {
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },

  reset : function(){
    var _this = this;
    _this.setData({
      ["list.qrCode_shop"] : ""
    })
  },

  save : function(e){
    var _this = this;
    var form = e.detail.value
    var list = _this.data.list;
    if(list.qrCode_shop=="" || list.qrCode_shop==undefined){
      wx.showToast({
        title: '未上传二维码',
        icon : 'none'
      })
      return;
    }
    if(_this.data.id!="" && !updSpace.insert("zeng_user")){
      wx.showModal({
        title : '警告',
        content : '数据库已满，请将数据备份后删除部分数据',
        showCancel : false,
        confirmColor : '#009688',
      })
      return;
    }

    if(_this.checkForm(form)){
      wx.showLoading({
        title : '验证通过加载中',
        mask : 'true'
      })
      var sql = "insert into zeng_user(userName,password,power,shop,qrCode_shop) values('"+form.userName+"','"+form.password+"','"+form.power+"','"+form.shop+"','"+list.qrCode_shop+"')"
      var msg = "添加成功"

      if(_this.data.id!=""){
        var id = _this.data.id
        sql = "update zeng_user set userName = '"+form.userName+"',password = '"+form.password+"',power = '"+form.power+"',shop = '"+form.shop+"',qrCode_shop = '"+list.qrCode_shop+"' where id = '"+id+"'"
        msg = "修改成功"
      }
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: sql
        },
        success: res => {
          wx.hideLoading({
            complete : res=> {
              wx.showToast({
                title: msg,
                icon : 'success'
              })
            }
          })
        },
        err: res => {
          console.log("错误!")
        },
        complete : res=> {
          wx.hideLoading({

          })
        }
      })
    }
  },

  checkForm : function(form){
    var _this = this;
    var formValidation = require("../../components/utils/formValidation")
    var rules = [{
      name: "userName",
      rule: ["required"],
      msg: ["请输入用户名"]
    },{
      name: "password",
      rule: ["required"], 
      msg: ["请输入密码"]
    },{
      name: "power",
      rule: ["required"], 
      msg: ["请选择身份"]
    },{
      name: "shop",
      rule: ["required"], 
      msg: ["请输入所属店铺"]
    }]
    var msg = formValidation.validation(form,rules)
    if(msg!=""){
      wx.showToast({
        title: msg,
        icon : 'none'
      })
      return false;
    }
    return true;
  },

  choiceImg : function(){
    var _this = this;
    
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        var base64_img = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0],'base64');
        _this.setData({
          ["list.qrCode_shop"] : base64_img
        })
        wx.showToast({
          title: '上传成功',
          icon : 'none'
        })
        // var base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64_img));
        // var base64ImgUrl = "data:image/png;base64," + base64Data;
        // _this.setData({
        //   src : base64ImgUrl
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if(options.id!=undefined){
      _this.setData({
        id : options.id
      })
      _this.init();
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