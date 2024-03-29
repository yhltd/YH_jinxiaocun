// miniprogram/packageC/pages/c_xianjinliuliang/c_xianjinliuliang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],
    month : 7,
    sum_year : 0,
    sum_month : 0,
    initHidView :false,
    chaxun_hidden:true,
    list : {},
    titil : [
      {text:"客户/供应商",width:"300rpx",type:"text",columnName:"kehu"},
      {text:"项目",width:"300rpx",type:"text",columnName:"project"},
      {text:"应收",width:"200rpx",type:"number",columnName:"yingshou"},
      {text:"实收",width:"200rpx",type:"number",columnName:"shishou"},
      {text:"未收",width:"200rpx",type:"number",columnName:"weishou"},
      {text:"应付",width:"200rpx",type:"number",columnName:"yingfu"},
      {text:"实付",width:"200rpx",type:"number",columnName:"shifu"},
      {text:"未付",width:"200rpx",type:"number",columnName:"weifu"},
    ],

    animationData_choice : []
  },

  


  init : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select kehu,project,sum(receivable) as yingshou,sum(receipts) as shishou, sum(receivable) - sum(receipts) as weishou,sum(cope) as yingfu,sum(payment) as shifu,sum(cope)-sum(payment) as weifu from SimpleData where company ='"+ userInfo.company +"' and kehu like '%%' and project like '%%' group BY kehu,project"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list,
        })
      },
      err: res => {
        console.log("错误!")
      },
      complete: res => {
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },


  showChoiceMonth1 : function(e){
    var _this = this;
    _this.setData({
      start_date: e.detail.value
    })
  },
  showChoiceMonth2 : function(e){
    var _this = this;
    _this.setData({
      stop_date: e.detail.value
    })
  },

  getMonth: function(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() > 8 ? date.getMonth()+1 : '0' + (date.getMonth()+1);
    return year + '-' + month;
  },

  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.点击左下角按钮，输入条件点击确定按钮后即可按条件查询。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  chaxun_show:function(){
    var _this = this
    _this.setData({
      chaxun_hidden:false,
      kehu:"",
      project:"",
    })
  },

  chaxun_quxiao:function(){
    var _this = this
    _this.setData({
      chaxun_hidden:true
    })
  },

  select:function(e){
    var _this = this
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var form = e.detail.value
    var userInfo = _this.data.userInfo;
    console.log("select kehu,project,sum(receivable) as yingshou,sum(receipts) as shishou, sum(receivable) - sum(receipts) as weishou,sum(cope) as yingfu,sum(payment) as shifu,sum(cope)-sum(payment) as weifu from SimpleData where company ='"+ userInfo.company +"' and kehu like '%"+ _this.data.kehu +"%' and project like '%" + form.project + "%' group BY kehu,project")
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select kehu,project,sum(receivable) as yingshou,sum(receipts) as shishou, sum(receivable) - sum(receipts) as weishou,sum(cope) as yingfu,sum(payment) as shifu,sum(cope)-sum(payment) as weifu from SimpleData where company ='"+ userInfo.company +"' and kehu like '%"+ _this.data.kehu +"%' and project like '%" + form.project + "%' group BY kehu,project"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list,
        })
      },
      err: res => {
        console.log("错误!")
      },
      complete: res => {
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
    _this.chaxun_quxiao()
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })

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
          kehu_list : kehu,
          zhonglei_list : zhonglei
        })
      }
    })
  },

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      kehu: _this.data.kehu_list[e.detail.value]
    })
  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = _this.data.titil
    var cloudList = {
      name : '极简总账',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:parseInt(title[i].width.split("r")[0])/10,
        columnName:title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu : 'true',
              fileType : 'xlsx',
              success : res=> {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail : res=> {
        console.log(res)
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
    _this.setData({
      month: _this.getMonth()
    })
    _this.init()
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