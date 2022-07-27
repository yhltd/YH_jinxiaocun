Page({

  /**
   * 页面的初始数据
   */
  data: {
    kehu_list:[],
    zhonglei_list:[],
    userInfo : [],
    initHidView : false,
    hid_view : false,
    empty : "",
    insert_date :"",

    accounting : "选择类型",

    getAccountingItems : [
      {
        text : "发票类型",
        list : [{
          class:1,
          className:'进项发票'
        },{
          class:2,
          className:'销项发票'
        }]
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var userInfo = JSON.parse(options.userInfo)

    var sql = "select invoice_type from InvoicePeizhi where company ='" + userInfo.company + "';select kehu from KehuPeizhi where company ='" + userInfo.company + "';"
    console.log(sql)
    wx.cloud.callFunction({
      name : 'sqlServer_cw',
      data : {
        query : sql
      },
      success : res => {
        var this_list = res.result.recordsets
        console.log(res.result)
        console.log(this_list)
        var kehu_select = res.result.recordsets[1]
        var zhonglei_select = res.result.recordsets[0]
        var kehu = []
        var zhonglei = []
        for(var i=0; i< kehu_select.length; i++){
          kehu.push(
            kehu_select[i].kehu
          )
        }
        for(var i=0; i< zhonglei_select.length; i++){
          zhonglei.push(
            zhonglei_select[i].invoice_type
          )
        }
        _this.setData({
          userInfo : JSON.parse(options.userInfo),
          kehu_list : kehu,
          zhonglei_list : zhonglei
        })
      }
    })

    // _this.getAccountingItems()
  },

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      unit: _this.data.kehu_list[e.detail.value]
    })
  },

  bindPickerChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      invoice_type: _this.data.zhonglei_list[e.detail.value]
    })
  },



  reset : function(){
    var _this = this;
    _this.setData({
      riqi : "",
      zhaiyao : "",
      unit : "",
      invoice_type : "",
      invoice_no : "",
      jine : "",
      remarks : "",
      accounting : '选择类型',
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

    if(_this.data.accounting != "选择类型"){
      if(result==""){
        var sql = "insert into Invoice(type,riqi,zhaiyao,unit,invoice_type,invoice_no,jine,remarks,company) values('"+_this.data.accounting+"','"+form.riqi+"','"+form.zhaiyao+"','"+form.unit+"','"+form.invoice_type+"','"+form.invoice_no+"','"+form.jine+"','"+form.remarks+"','"+_this.data.userInfo.company+"')"


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
    }else{
      wx.showToast({
        title: '请选择发票类型',
        icon : 'none'
      })
    }
  },

  checkFrom : function(form){
    var formValidation = require("../../../components/utils/formValidation.js")
    var rules = [{
      name: "zhaiyao",
      rule: ["required"],
      msg: ["请输入摘要"]
    },{
      name: "riqi",
      rule: ["required"], 
      msg: ["请输入日期"]
    },{
      name: "unit",
      rule: ["required"], 
      msg: ["请输入往来单位"]
    },{
      name: "invoice_type",
      rule: ["required"], 
      msg: ["请输入发票种类"]
    },{
      name: "invoice_no",
      rule: ["required"], 
      msg: ["请输入发票号码"]
    },{
      name: "jine",
      rule: ["required","isNum"], 
      msg: ["请输入金额","请输入正确的金额"]
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
          if(_this.data.accounting == '选择类型'){
            _this.setData({
              accounting: _this.data.getAccountingItems[0].list[0].className
            })
          }
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

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      riqi: e.detail.value
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