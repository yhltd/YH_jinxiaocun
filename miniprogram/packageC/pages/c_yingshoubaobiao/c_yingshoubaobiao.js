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
      {text:"往来单位",width:"300rpx",type:"text",columnName:"kehu"},
      {text:"项目",width:"300rpx",type:"text",columnName:"project"},
      {text:"摘要",width:"300rpx",type:"text",columnName:"zhaiyao"},
      {text:"应收",width:"200rpx",type:"number",columnName:"jine1"},
      {text:"往来单位",width:"300rpx",type:"text",columnName:"unit"},
      {text:"发票种类",width:"300rpx",type:"text",columnName:"invoice_type"},
      {text:"发票号",width:"300rpx",type:"text",columnName:"invoice_no"},
      {text:"金额",width:"200rpx",type:"number",columnName:"jine2"},
    ],
    animationData_choice : []
  },

  get_list:function(list){
    console.log(list)
    var _this = this
    var ret_list = []
    var list1 = list[0]
    var list2 = list[1]

    if(list1.length >= list2.length){
      for(var i=0; i<list1.length; i++){
        ret_list.push({
          kehu:list1[i].kehu,
          project:list1[i].project,
          zhaiyao:list1[i].zhaiyao,
          jine1:list1[i].jine1,
          unit:'',
          invoice_type:'',
          invoice_no:'',
          jine2:''
        })
      }
      for(var i=0; i<list2.length; i++){
        ret_list[i].unit = list2[i].unit
        ret_list[i].invoice_type = list2[i].invoice_type
        ret_list[i].invoice_no = list2[i].invoice_no
        ret_list[i].jine2 = list2[i].jine2
      }
    }else{
      for(var i=0; i<list2.length; i++){
        ret_list.push({
          kehu:'',
          project:'',
          zhaiyao:'',
          jine1:'',
          unit:list2[i].unit,
          invoice_type:list2[i].invoice_type,
          invoice_no:list2[i].invoice_no,
          jine2:list2[i].jine2
        })
      }
      for(var i=0; i<list1.length; i++){
        ret_list[i].kehu = list1[i].kehu
        ret_list[i].project = list1[i].project
        ret_list[i].zhaiyao = list1[i].zhaiyao
        ret_list[i].jine1 = list1[i].jine1
      }
    }

    return ret_list
  },

  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.点击左下角查询按钮，输入条件点击确定按钮后即可按条件查询。',
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
    if(form.kehu==''){
      wx.showToast({
        title: '请选择往来单位',
        icon:'none'
      })
      return
    }
    if(form.start_date==''){
      form.start_date='1900-01-01'
    }
    if(form.stop_date==''){
      form.stop_date='2100-12-31'
    }
    var userInfo = _this.data.userInfo;
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select kehu,project,zhaiyao,receivable as jine1 from SimpleData where company='" + userInfo.company + "' and kehu='" + form.kehu + "' and convert(varchar(20),insert_date,120)>='" + form.start_date + "' and convert(varchar(20),insert_date,120)<='" + form.stop_date + "';select unit,invoice_type,invoice_no,jine as jine2 from invoice where company='" + userInfo.company + "' and unit='" + form.kehu + "' and type='销项发票' and riqi>='" + form.start_date + "' and riqi<='" + form.stop_date + "';"
      },
      success: res => {
        var list = res.result.recordsets
        console.log(res.result.recordsets)
        list = _this.get_list(list)
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
    wx.cloud.callFunction({
      name : 'sqlServer_cw',
      data : {
        query : sql
      },
      success : res => {
        var this_list = res.result.recordsets
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

  bindDateChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      start_date: e.detail.value
    })
  },

  bindDateChange3: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      stop_date: e.detail.value
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

