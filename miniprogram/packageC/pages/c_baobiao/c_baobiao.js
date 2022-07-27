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
      {text:"摘要",width:"300rpx",type:"text",columnName:"zhaiyao1"},
      {text:"客户/供应商",width:"300rpx",type:"text",columnName:"kehu1"},
      {text:"未收",width:"200rpx",type:"text",columnName:"jine1"},
      {text:"摘要",width:"300rpx",type:"text",columnName:"zhaiyao2"},
      {text:"客户/供应商",width:"300rpx",type:"text",columnName:"kehu2"},
      {text:"未付",width:"200rpx",type:"text",columnName:"jine2"},
    ],
    leixing_list:['年','月','日'],
    animationData_choice : []
  },


  init : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;

    const formatData = date => {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      return [year + '-' + month + '-' + day,year,month,day]
      // return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }

    var nowDate = formatData(new Date())
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select a.id,a.zhaiyao,a.kehu,a.receivable,'' as project,'' as company,0.0 as receipts,0.0 as cope,0.0 as payment,'' as accounting, insert_date from (select id,zhaiyao,kehu,(convert(Decimal,receivable)-convert(Decimal,receipts)) as receivable,insert_date from SimpleData where company ='" + userInfo.company + "' and (convert(Decimal,receivable)-convert(Decimal,receipts))<>0 and insert_date>= '"+ nowDate[1] +"-01-01' and insert_date<= '"+ nowDate[1] +"-12-31') as a;select a.id,a.zhaiyao,a.kehu,a.cope,'' as project,'' as company,0.0 as receipts,0.0 as receivable,0.0 as payment,'' as accounting,insert_date from (select id,zhaiyao,kehu,(convert(Decimal,cope)-convert(Decimal,payment)) as cope,insert_date from SimpleData where company ='" + userInfo.company + "' and (convert(Decimal,cope)-convert(Decimal,payment))<>0 and insert_date>= '"+ nowDate[1] +"-01-01' and insert_date<= '"+ nowDate[1] +"-12-31') as a;"
      },
      success: res => {
        var list = res.result.recordsets
        console.log(list)
        list = _this.get_list(list)
        console.log(list)
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

  get_list:function(list){
    console.log(list)
    var ret_list = []
    var list1 = list[0]
    var list2 = list[1]
    console.log(list1)
    console.log(list2)
    var heji1 = 0
    var heji2 = 0
    if(list1.length >= list2.length){
      for(var i=0;i<list1.length;i++){
        ret_list.push({
          zhaiyao1:list1[i].zhaiyao,
          kehu1:list1[i].kehu,
          jine1:list1[i].receivable,
          zhaiyao2:'',
          kehu2:'',
          jine2:'',
        })
        heji1 = heji1 + list1[i].receivable * 1
      }
      for(var i=0;i<list2.length;i++){
        console.log(list2[i].zhaiyao)
        ret_list[i].zhaiyao2=list2[i].zhaiyao
        ret_list[i].kehu2=list2[i].kehu
        ret_list[i].jine2=list2[i].cope
        heji2 = heji2 + list2[i].cope * 1
      }
    }else{
      for(var i=0;i<list2.length;i++){
        ret_list.push({
          zhaiyao2:list2[i].zhaiyao,
          kehu2:list2[i].kehu,
          jine2:list2[i].cope,
          zhaiyao1:'',
          kehu1:'',
          jine1:''
        })
        heji2 = heji2 + list2[i].cope * 1
      }
      for(var i=0;i<list1.lenght;i++){
        ret_list[i].zhaiyao1=list1[i].zhaiyao
        ret_list[i].kehu1=list1[i].kehu
        ret_list[i].jine1=list1[i].receivable
        heji1 = heji1 + list1[i].receivable * 1
      }
    }

    ret_list.push({
      zhaiyao1:"合计",
      zhaiyao2:"合计",
      kehu1:'',
      kehu2:'',
      jine1:heji1,
      jine2:heji2,
    })
    return ret_list
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
    if(form.leixing==''){
      wx.showToast({
        title: '请输入报表类型',
        icon:'none'
      })
      return
    }
    if(form.shijian==''){
      wx.showToast({
        title: '请输入时间',
        icon:'none'
      })
      return
    }
    var userInfo = _this.data.userInfo;
    var leixing = form.leixing
    var shijian = form.shijian
    if(leixing=='年'){
      var this_arr = shijian.split('-')
      shijian = this_arr[0] + "-"
    }else if(leixing=='月'){
      var this_arr = shijian.split('-')
      shijian = this_arr[0] + "-" + this_arr[1]
    }else if(leixing =='日'){
      var this_arr = shijian.split('-')
      shijian = this_arr[0] + "-" + this_arr[1] + "-" + this_arr[2]
    }
    console.log(shijian)
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select a.id,a.zhaiyao,a.kehu,a.receivable,'' as project,'' as company,0.0 as receipts,0.0 as cope,0.0 as payment,'' as accounting, insert_date from (select id,zhaiyao,kehu,(convert(Decimal,receivable)-convert(Decimal,receipts)) as receivable,insert_date from SimpleData where company ='" + userInfo.company + "' and (convert(Decimal,receivable)-convert(Decimal,receipts))<>0 and convert(varchar(20),insert_date,120) like '%" + shijian + "%') as a;select a.id,a.zhaiyao,a.kehu,a.cope,'' as project,'' as company,0.0 as receipts,0.0 as receivable,0.0 as payment,'' as accounting,insert_date from (select id,zhaiyao,kehu,(convert(Decimal,cope)-convert(Decimal,payment)) as cope,insert_date from SimpleData where company ='" + userInfo.company + "' and (convert(Decimal,cope)-convert(Decimal,payment))<>0 and convert(varchar(20),insert_date,120) like '%" + shijian + "%') as a;"
      },
      success: res => {
        var list = res.result.recordsets
        console.log("select a.id,a.zhaiyao,a.kehu,a.receivable,'' as project,'' as company,0.0 as receipts,0.0 as cope,0.0 as payment,'' as accounting, insert_date from (select id,zhaiyao,kehu,(convert(Decimal,receivable)-convert(Decimal,receipts)) as receivable,insert_date from SimpleData where company ='" + userInfo.company + "' and (convert(Decimal,receivable)-convert(Decimal,receipts))<>0 and convert(varchar(20),insert_date,120) like '%" + shijian + "%') as a;select a.id,a.zhaiyao,a.kehu,a.cope,'' as project,'' as company,0.0 as receipts,0.0 as receivable,0.0 as payment,'' as accounting,insert_date from (select id,zhaiyao,kehu,(convert(Decimal,cope)-convert(Decimal,payment)) as cope,insert_date from SimpleData where company ='" + userInfo.company + "' and (convert(Decimal,cope)-convert(Decimal,payment))<>0 and convert(varchar(20),insert_date,120) like '%" + shijian + "%') as a;")
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
      leixing: _this.data.leixing_list[e.detail.value]
    })
  },

  bindDateChange: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      shijian: e.detail.value
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