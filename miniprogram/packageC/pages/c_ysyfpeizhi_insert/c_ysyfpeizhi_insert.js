Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],
    initHidView : false,
    hid_view : false,
    empty : "",
    ysyf_list: [],  // 添加这个数组
    ysyf: "",       // 当前选中的值
    index: 0        // 当前选中的索引

    // accounting : "选择科目",

    // getAccountingItems : [
    //   {
    //     text : "科目名称",
    //     list : []
    //   }
    // ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      userInfo : JSON.parse(options.userInfo),
      ysyf_list: ["应收", "应付"]  // 添加这两个选项
    })
    var userInfo = JSON.parse(options.userInfo)
  },

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      ysyf: _this.data.ysyf_list[e.detail.value]
    })
  },


  reset : function(){
    var _this = this;
    _this.setData({
      empty : "",
    })
  },

  save : function(e){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    
    var form = e.detail.value;
    var result = _this.checkFrom(form)

      if(result==""){
        var sql = "insert into ysyfpeizhi(ysyf,xiangmumingcheng,ysyfkemu,jine,company) values('"+form.ysyf+"','"+form.xiangmumingcheng+"','"+form.ysyfkemu+"','"+form.jine+"','"+_this.data.userInfo.company+"')"


        wx.cloud.callFunction({
          name : 'sqlServer_cw',
          data : {
            query : sql
          },
          success : res => {
            wx.hideLoading({
              complete: (res) => {
                wx.showToast({
                  title: '保存成功',
                  icon : 'success',
                  complete: res => { 
                    if(e.detail.target.dataset.type == 'submitAndReset'){
                      _this.reset();
                    }
                  }
                })
              },
            })
          }
        })
      }else{
        wx.showToast({
          title: result,
          icon : 'none'
        })
      }
   
  },

  checkFrom : function(form){
    var formValidation = require("../../../components/utils/formValidation.js")
    var rules = [{
      name: "ysyf",
      rule: ["required"],
      msg: ["请输入应收/应付"]
    },{
      name: "xiangmumingcheng",
      rule: ["required"], 
      msg: ["请输入项目名称"]
    },{
      name: "ysyfkemu",
      rule: ["required"], 
      msg: ["请输入类别"]
    },{
      name: "jine",
      rule: ["required"], 
      msg: ["请输入金额"]
    }]
    return formValidation.validation(form,rules)
  },










  /**
   * 
   * 验证项目代码
   */

  showGetCode : function(){
    var _this = this;
    _this.showView(_this,"getCode")
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
    _this.hid_view();
  },

  //动画效果
  
  hidView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })

    switch(type){
      case "getCode":
        animation.translateY(-300).step()
        _this.setData({
          animationData_getCode : animation.export(),
          hid_view : false
        })
        break;
      case "getParentCode":
        animation.translateY(-300).step()
        _this.setData({
          animationData_getParentCode : animation.export()
        })
        break;
    }
  },



  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"getCode")
    _this.hidView(_this,"getParentCode")
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      shijian: e.detail.value
    })
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