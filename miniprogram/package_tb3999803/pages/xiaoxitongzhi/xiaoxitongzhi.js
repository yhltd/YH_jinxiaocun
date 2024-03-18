Page({

  /**
   * 页面的初始数据
   */
  cxShow: false,
  data: {
    list: [],
    title: [{
      text: "订单号",
      width: "300rpx",
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
      width: "300rpx",
      columnName: "zdyh",
      type: "text",
      isupd: true
    }, {
      text: "材料名称",
      width: "300rpx",
      columnName: "ddje",
      type: "text",
      isupd: true
    }, {
      text: "工序",
      width: "300rpx",
      columnName: "gx",
      type: "text",
      isupd: true
    }, {
      text: "完成状态",
      width: "300rpx",
      columnName: "wczt",
      type: "text",
      isupd: true
    }, {
      text: "数量",
      width: "300rpx",
      columnName: "sl",
      type: "text",
      isupd: true
    }, {
      text: "日期",
      width: "300rpx",
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
    sel_type_list:['显示最后报工信息','显示全部报工信息']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo: userInfo,
    })
    var where_sql = ""
    if(userInfo.quanxian == '工序员'){
      if(userInfo.peiliao == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '配料'"
        }else{
          where_sql = where_sql + " or gx = '配料"
        }
      }
      if(userInfo.kailiao == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '开料'"
        }else{
          where_sql = where_sql + " or gx = '开料"
        }
      }
      if(userInfo.fengbian == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '封边'"
        }else{
          where_sql = where_sql + " or gx = '封边"
        }
      }
      if(userInfo.paikong == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '排孔'"
        }else{
          where_sql = where_sql + " or gx = '排孔"
        }
      }
      if(userInfo.xiantiao == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '线条'"
        }else{
          where_sql = where_sql + " or gx = '线条"
        }
      }
      if(userInfo.fumo == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '覆膜'"
        }else{
          where_sql = where_sql + " or gx = '覆膜"
        }
      }
      if(userInfo.shougong == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '手工'"
        }else{
          where_sql = where_sql + " or gx = '手工"
        }
      }
      if(userInfo.wujin == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '五金'"
        }else{
          where_sql = where_sql + " or gx = '五金"
        }
      }
      if(userInfo.baozhuang == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '包装'"
        }else{
          where_sql = where_sql + " or gx = '包装"
        }
      }
      if(userInfo.ruku == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '入库'"
        }else{
          where_sql = where_sql + " or gx = '入库"
        }
      }
      if(userInfo.chuku == '是'){
        if(where_sql == ''){
          where_sql = " where (gx = '出库'"
        }else{
          where_sql = where_sql + " or gx = '出库"
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
    var e = ['','','','','','','','1900-01-01','2100-12-31','显示最后报工信息']
    _this.tableShow(e)
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
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
    if(e[9] == '显示全部报工信息'){
      sql = "select * from xiaoxiguanli "
    }else{
      sql = "select * from (select max(id) as max_id from xiaoxiguanli group by ddh,khmc,zdyh,ddje) as quchong left join xiaoxiguanli on max_id = id "
    }

    var userInfo = _this.data.userInfo
    var where_sql = _this.data.where_sql
    if(where_sql == ""){
      where_sql = " where ddh like '%" + e[0] + "%' and khmc like '%" + e[1] + "%' and zdyh like '%" + e[2] + "%' and ddje like '%" + e[3] + "%' and gx like '%" + e[4] + "%' and wczt like '%" + e[5] + "%' and bgry like '%" + e[6] + "%' and convert(date,rq) >= convert(date,'" + e[7] + "') and convert(date,rq) <= convert(date,'" + e[8] + "')"
    }else{
      where_sql = where_sql + " and ddh like '%" + e[0] + "%' and khmc like '%" + e[1] + "%' and zdyh like '%" + e[2] + "%' and ddje like '%" + e[3] + "%' and gx like '%" + e[4] + "%' and wczt like '%" + e[5] + "%' and bgry like '%" + e[6] + "%' and convert(date,rq) >= convert(date,'" + e[7] + "') and convert(date,rq) <= convert(date,'" + e[8] + "')"
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
        _this.setData({
          list: list,
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
      sel_type: '显示最后报工信息',
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
    var e = [_this.data.ddh,_this.data.khmc,_this.data.zdyh,_this.data.ddje,_this.data.gx,_this.data.wczt,_this.data.bgry,start_date,stop_date,_this.data.sel_type]
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