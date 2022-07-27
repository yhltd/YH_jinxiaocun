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
      {text:"日期",width:"300rpx",type:"text",columnName:"insert_date"},
      {text:"客户",width:"300rpx",type:"text",columnName:"kehu"},
      {text:"科目",width:"300rpx",type:"text",columnName:"accounting"},
      {text:"项目",width:"300rpx",type:"text",columnName:"project"},
      {text:"应收",width:"200rpx",type:"number",columnName:"receivable"},
      {text:"实收",width:"200rpx",type:"number",columnName:"receipts"},
      {text:"未收",width:"200rpx",type:"number",columnName:"weishou"},
    ],
    leixing_list:['年','月','日'],
    animationData_choice : []
  },

  get_list:function(list){
    console.log(list)
    var _this = this
    var ret_list = []
    var list1 = list[0]
    var list2 = list[1]
    console.log(list1)
    console.log(list2)
    var heji1 = 0
    var heji2 = 0
    var heji3 = 0
    if (list2.length == 0){
      ret_list.push({
        kehu: _this.data.kehu,
        project:"上期合计",
        receivable:0,
        receipts:0,
        weishou:0
      })
    }else{
      ret_list.push({
        kehu: list2[0].kehu,
        project:"上期合计",
        receivable:list2[0].receivable,
        receipts:list2[0].receipts,
        weishou:list2[0].weishou
      })
      heji1 = heji1 + list2[0].receivable * 1
      heji2 = heji2 + list2[0].receipts * 1
      heji3 = heji3 + list2[0].weishou * 1
    }
    for(var i=0; i<list1.length; i++){
      console.log(list1[i].insert_date)
      ret_list.push({
        insert_date:list1[i].insert_date,
        kehu:list1[i].kehu,
        accounting:list1[i].accounting,
        project:list1[i].project,
        receivable:list1[i].receivable,
        receipts:list1[i].receipts,
        weishou:list1[i].weishou,
      })
      heji1 = heji1 + list1[0].receivable * 1
      heji2 = heji2 + list1[0].receipts * 1
      heji3 = heji3 + list1[0].weishou * 1
    }

    ret_list.push({
      kehu: _this.data.kehu,
      project:"结余合计",
      receivable:heji1,
      receipts:heji2,
      weishou:heji3,
    })
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
        query: "select a.id,a.company,convert(varchar(20),a.insert_date,120) as insert_date,a.project,a.kehu,a.receivable,a.receipts,a.cope,a.payment,a.receivable-a.receipts as weishou,a.accounting,a.zhaiyao from (select row_number() over(order by id) as rownum,* from SimpleData where company = '"+ userInfo.company +"' and kehu = '" + form.kehu + "' and (receivable-receipts)<>0 and convert(varchar(20),insert_date,120)>='"+ form.start_date +"' and convert(varchar(20),insert_date,120)<='"+ form.stop_date +"') as a;select 0 as id,'' as company,null as insert_date,'' as project,b.kehu,b.receivable,b.receipts,b.weishou,'' as accounting,'' as zhaiyao from (select kehu,sum(receivable) as receivable,sum(receipts) as receipts,sum(receivable)-sum(receipts) as weishou from SimpleData where company = '"+ userInfo.company +"' and kehu = '" + form.kehu + "' and convert(varchar(20),insert_date,120)<'"+ form.start_date +"' group by kehu) as b;"
      },
      success: res => {
        var list = res.result.recordsets
        console.log("select a.id,a.company,convert(varchar(20),a.insert_date,120) as insert_date,a.project,a.kehu,a.receivable,a.receipts,a.cope,a.payment,a.receivable-a.receipts as weishou,a.accounting,a.zhaiyao from (select row_number() over(order by id) as rownum,* from SimpleData where company = '"+ userInfo.company +"' and kehu = '" + form.kehu + "' and (receivable-receipts)<>0 and convert(varchar(20),insert_date,120)>='"+ form.start_date +"' and convert(varchar(20),insert_date,120)<='"+ form.stop_date +"') as a;select 0 as id,'' as company,null as insert_date,'' as project,b.kehu,b.receivable,b.receipts,b.weishou,'' as accounting,'' as zhaiyao from (select kehu,sum(receivable) as receivable,sum(receipts) as receipts,sum(receivable)-sum(receipts) as weishou from SimpleData where company = '"+ userInfo.company +"' and kehu = '" + form.kehu + "' and convert(varchar(20),insert_date,120)<'"+ form.start_date +"' group by kehu) as b;")
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

