Page({
  // closeDropdown(){
  //   qxShow: function () {
  //     var _this = this
  //     _this.setData({
  //       cxShow: false,
  //       ddh: '',
  //       khmc: '',
  //       zdyh: '',
  //       ddje: '',
  //       gx: '',
  //       wczt: '',
  //       bgry: '',
  //       start_date: '',
  //       stop_date: '',
  //     })
  //   }
  // },

  /**
   * 页面的初始数据
   */
  cxShow: false,
  panduan:"0",
  data: {
    list: [],
    title: [{
      text: "订单号",
      width: "200rpx",
      columnName: "ddh",
      type: "text",
      isupd: true
    }, {
      text: "客户名称",
      width: "300rpx",
      columnName: "khmc",
      type: "text",
      isupd: true
    }, {
      text: "终端用户",
      width: "400rpx",
      columnName: "zdyh",
      type: "text",
      isupd: true
    }, {
      text: "材料名称",
      width: "270rpx",
      columnName: "ddje",
      type: "text",
      isupd: true
    }, {
      text: "工序",
      width: "150rpx",
      columnName: "gx",
      type: "text",
      isupd: true
    }, {
      text: "完成状态",
      width: "180rpx",
      columnName: "wczt",
      type: "text",
      isupd: true
    }, {
      text: "总包数",
      width: "150rpx",
      columnName: "sl",
      type: "text",
      isupd: true
    }, {
      text: "日期",
      width: "200rpx",
      columnName: "rq",
      type: "text",
      isupd: true
    }],
    id: '',
    ddh: '',
    khmc: '',
    zdyh: '',
    ddje: '',
    gx: '',
    wczt: '',
    bgry: '',
    start_date: '',
    stop_date: '',
    where_sql : "",
    gongxu_list: ['配料','开料','封边','排孔','线条','覆膜','手工','五金','包装','入库','出库'],
    sel_type_list:['最新进度消息','全部消息']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.panduan)
    console.log(11)
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo: userInfo,
    })
    var panduan="0"
    if(options.panduan=="1"){
    panduan=options.panduan}
    console.log(options.panduan +"hang 999")
    if(panduan=="0")
    {
    var where_sql = ""
    if(userInfo.quanxian == '工序员'){
      if(userInfo.peiliao == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '配料'"
        }else{
          where_sql = where_sql + " or gx = '配料'"
        }
      }
      if(userInfo.kailiao == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '开料'"
        }else{
          where_sql = where_sql + " or gx = '开料'"
        }
      }
      if(userInfo.fengbian == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '封边'"
        }else{
          where_sql = where_sql + " or gx = '封边'"
        }
      }
      if(userInfo.paikong == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '排孔'"
        }else{
          where_sql = where_sql + " or gx = '排孔'"
        }
      }
      if(userInfo.xiantiao == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '线条'"
        }else{
          where_sql = where_sql + " or gx = '线条'"
        }
      }
      if(userInfo.fumo == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '覆膜'"
        }else{
          where_sql = where_sql + " or gx = '覆膜'"
        }
      }
      if(userInfo.shougong == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '手工'"
        }else{
          where_sql = where_sql + " or gx = '手工'"
        }
      }
      if(userInfo.wujin == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '五金'"
        }else{
          where_sql = where_sql + " or gx = '五金'"
        }
      }
      if(userInfo.baozhuang == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '包装'"
        }else{
          where_sql = where_sql + " or gx = '包装'"
        }
      }
      if(userInfo.ruku == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '入库'"
        }else{
          where_sql = where_sql + " or gx = '入库'"
        }
      }
      if(userInfo.chuku == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '出库'"
        }else{
          where_sql = where_sql + " or gx = '出库'"
        }
      }
      if (where_sql != ''){
        where_sql = where_sql + ")"
      }
    }else if(userInfo.quanxian == '客户'){
      where_sql = " where khmc = '" + userInfo.name + "'"
    }
    _this.setData({
      where_sql
    })
    var e = ['','','','','','','','1900-01-01','2100-12-31','最新进度消息']
    _this.tableShow(e)
    var sql = 'select * from user_info'
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql 
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var list2 = []
        for(var item = 0;item < list.length; item++){
          list2.push(list[item].name)
        }
        _this.setData({
          list2:list2
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
    })}
    if(panduan=="1"){
      console.log("hang 99033")
    // var _this = this
      _this.setData({
        panduan: "1",
         ddh:options.productionNO,
      })
      
      _this.sel1()
    }
    
    // else
  //   {
  //   var djbh=options.productionNO;
  //   sql = "select * from xiaoxiguanli where ddh='"+djbh+"'"
  //   console.log(options.productionNO)
  //   wx.cloud.callFunction({
  //     name: 'sqlServer_tb3999803',
  //     data: {
  //       query: sql
  //     },
  //     success: res => {
  //       console.log(res)
  //       var list = res.result.recordsets[0]
  //       console.log(list)
  //       var max_page = Math.ceil(list.length * 1 / 50)
  //       var list_new = []
  //       for(var i=0; i<49; i++){
  //         if(i < list.length){
  //           list_new.push(list[i])
  //         }
  //       }
  //       _this.setData({
  //         this_page:1,
  //         list_all: list,
  //         list: list_new,
  //         max_page
  //       })
        
  //     },
  //     err: res => {
  //       console.log("错误!")
  //     },
  //     fail: res => {
  //       wx.showToast({
  //         title: '请求失败！',
  //         icon: 'none',
  //         duration: 3000
  //       })
  //       console.log("请求失败！")
  //     },
  //   })
  //   _this.setData({
  //     djbh,
  //   })
  //   panduan="0"
  // }
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },
  bindPickerChange3: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]:_this.data.list2[e.detail.value]
    })
  },
  bindPickerChange: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.gongxu_list[e.detail.value]
    })
  },

  bindPickerChange2: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.sel_type_list[e.detail.value]
    })
  },

  choiceDate: function (e) {
    var _this = this
    console.log(e)
    _this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
  },

 

  tableShow: function (e) {
    var _this = this
    var sql = ""
    console.log(e)
    console.log(e[9]+"hang 328")
    if(e[9] == '全部消息'){
      sql = "select * from xiaoxiguanli "
    }else{
      sql = "select * from (select max(id) as max_id from xiaoxiguanli group by ddh,khmc,zdyh,ddje) as quchong left join xiaoxiguanli on max_id = id  "
    }
    var userInfo = _this.data.userInfo
    var where_sql = _this.data.where_sql
    if(where_sql == ""){
      where_sql = "where ddh like '%" + e[0] + "%' and khmc like '%" + e[1] + "%' and zdyh like '%" + e[2] + "%' and ddje like '%" + e[3] + "%' and gx like '%" + e[4] + "%' and wczt like '%" + e[5] + "%' and bgry like '%" + e[6] + "%' and convert(date,rq) >= convert(date,'" + e[7] + "') and convert(date,rq) <= convert(date,'" + e[8] + "') order by id desc"
    }else{
      where_sql = where_sql + " and ddh like '%" + e[0] + "%' and khmc like '%" + e[1] + "%' and zdyh like '%" + e[2] + "%' and ddje like '%" + e[3] + "%' and gx like '%" + e[4] + "%' and wczt like '%" + e[5] + "%' and bgry like '%" + e[6] + "%' and convert(date,rq) >= convert(date,'" + e[7] + "') and convert(date,rq) <= convert(date,'" + e[8] + "') order by id desc"
    }
    console.log(sql + where_sql)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql + where_sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        console.log(list)
        var max_page = Math.ceil(list.length * 1 / 50)
        var list_new = []
        for(var i=0; i<49; i++){
          if(i < list.length){
            list_new.push(list[i])
          }
        }
        _this.setData({
          this_page:1,
          list_all: list,
          list: list_new,
          max_page
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
    })
  },

  page_down_click:function(){
    var _this = this
    var this_page = _this.data.this_page
    var max_page = _this.data.max_page

    this_page = this_page - 1
    if(this_page < 1){
      wx.showToast({
        title: '已经是第一页',
        icon: 'none'
      })
      return;
    }
    var list_all = _this.data.list_all
    var list = []
    for(var i=50*this_page - 50; i<50*this_page-1; i++){
      if(i < list_all.length){
        list.push(list_all[i])
      }
    }
    _this.setData({
      list:list,
      this_page:this_page,
    })
  },

  page_up_click:function(){
    var _this = this
    var this_page = _this.data.this_page
    var max_page = _this.data.max_page

    this_page = this_page + 1
    if(this_page > max_page){
      wx.showToast({
        title: '已经是最后一页',
        icon: 'none'
      })
      return;
    }
    var list_all = _this.data.list_all
    var list = []
    for(var i=50*this_page - 50; i<50*this_page-1; i++){
      if(i < list_all.length){
        list.push(list_all[i])
      }
    }
    _this.setData({
      list:list,
      this_page:this_page,
    })
    
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      cxShow: false,
      ddh: '',
      khmc: '',
      zdyh: '',
      ddje: '',
      gx: '',
      wczt: '',
      bgry: '',
      start_date: '',
      stop_date: '',
    })
  },

  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      sel_type: '最新进度消息',
      ddh:_this.djbh
      // id: '',
      // ddh: '',
      // khmc: '',
      // zdyh: '',
      // ddje: '',
      // gx: '',
      // wczt: '',
      // bgry: '',
      // start_date: '',
      // stop_date: '',
    })
  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title
    var cloudList = {
      name : '消息通知',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:'text',
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

  sel1: function () {
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == ''){
      start_date = "1900-01-01"
    }
    if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    var e
    console.log(_this.data.panduan +"hang 538")
    if (_this.data.panduan =="1")
    {
      console.log( _this.data.ddh+ "hang 541")
      

      var _this = this
      let column 
      _this.setData({
        panduan: "0",
        [column]:  _this.data.ddh,
        sel_type: '最新进度消息',
      })
      e = [_this.data.ddh,_this.data.khmc,_this.data.zdyh,_this.data.ddje,_this.data.gx,_this.data.wczt,_this.data.bgry,start_date,stop_date,_this.data.sel_type]

        // _this.setData({
        //   currentDate: e.detail,
        
        // })

    }
    else
    {
     e = [_this.data.ddh,_this.data.khmc,_this.data.zdyh,_this.data.ddje,_this.data.gx,_this.data.wczt,_this.data.bgry,start_date,stop_date,_this.data.sel_type]
    }
    _this.tableShow(e)
    _this.qxShow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})

function dateStrChangeTimeTamp(dateStr){
  dateStr = dateStr.substring(0,19);
  dateStr = dateStr.replace(/-/g,'/');
  var timeTamp = new Date(dateStr).getTime();
  document.write(timesTamp);
}

// function getNowDate() {
//   var date = new Date();
//   var sign1 = "/";
//   var sign2 = ":";
//   var year = date.getFullYear() // 年
//   var month = date.getMonth() + 1; // 月
//   var day  = date.getDate(); // 日
//   var hour = date.getHours(); // 时
//   var minutes = date.getMinutes(); // 分
//   var seconds = date.getSeconds() //秒
//   var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
//   var week = weekArr[date.getDay()];
//   var currentdate = "" + year  + month  + day +  hour + minutes + seconds;
//   return currentdate;
//  }