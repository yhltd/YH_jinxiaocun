Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],
    initHidView : false,
    hid_view : false,
    empty : "",

    accounting : "选择科目",

    getAccountingItems : [
      {
        text : "科目名称",
        list : []
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })
    _this.getAccountingItems()
  },



  reset : function(){
    var _this = this;
    _this.setData({
      empty : "",
      accounting : '选择科目',
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

    if(_this.data.accounting != "选择科目"){
      if(result==""){
        var sql = "insert into SimpleData(accounting,project,receivable,receipts,cope,payment,company) values('"+_this.data.accounting+"','"+form.project+"','"+form.receivable+"','"+form.receipts+"','"+form.cope+"','"+form.payment+"','"+_this.data.userInfo.company+"')"


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
    }else{
      wx.showToast({
        title: '请选择科目代码',
        icon : 'none'
      })
    }
  },

  checkFrom : function(form){
    var formValidation = require("../../../components/utils/formValidation.js")
    var rules = [{
      name: "project",
      rule: ["required"],
      msg: ["请输入项目名称"]
    },{
      name: "receivable",
      rule: ["required","isNum"], 
      msg: ["请输入应收","请输入正确的应收"]
    },{
      name: "receipts",
      rule: ["required","isNum"], 
      msg: ["请输入实收","请输入正确的实收"]
    },{
      name: "cope",
      rule: ["required","isNum"], 
      msg: ["请输入应付","请输入正确的应付"]
    },{
      name: "payment",
      rule: ["required","isNum"], 
      msg: ["请输入实付","请输入正确的实付"]
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

  changeClass : function(e){
    var _this = this;
    var itemsIndex = e.detail.currentItemId;
    var itemIndex = e.detail.current;
    var class_id = _this.data.getAccountingItems[itemsIndex].list[itemIndex].className

    _this.setData({
      accounting : class_id
    })
    console.log(_this.data.getCodeItem)
  },

  getAccountingItems : function(){
    var _this = this;
    var sql = "select accounting from SimpleAccounting where company = '"+_this.data.userInfo.company+"'"

    wx.cloud.callFunction({
      name : 'sqlServer_cw',
      data : {
        query : sql
      },
      success : res => {
        var getAccountingItems = _this.data.getAccountingItems
        for(let i=1;i<=res.result.recordset.length;i++){
          getAccountingItems[0].list.push({class:i,className:res.result.recordset[i-1].accounting})
        }
        console.log(getAccountingItems)
        _this.setData({
          getAccountingItems
        })
      }
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

  showView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    _this.setData({
      initHidView : false,
      hid_view : true
    })

    wx.nextTick(()=>{
      switch(type){
        case "getCode":
          animation.translateX(0).step()
          _this.setData({
            animationData_getCode : animation.export()
          })
          break;
        case "getParentCode":
          animation.translateX(0).step()
          _this.setData({
            animationData_getParentCode : animation.export()
          })
          break;
      }
    })
  },

  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"getCode")
    _this.hidView(_this,"getParentCode")
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