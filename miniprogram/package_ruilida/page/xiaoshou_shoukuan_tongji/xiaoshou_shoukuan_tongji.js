// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    title: [
      {
        name: "",
        text: "",
        width: "350rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        name: "金额",
        text: "金额",
        width: "350rpx",
        columnName: "money",
        type: "text",
        isupd: true
      },
    ],
    xlShow2: false,
    cxShow: false,
    start_date:'',
    stop_date: '',
    type: '按业务员',
    type_list : [
      {name:'按业务员'},
      {name:'按客户'},
    ],
    gongneng_list:[
      {
        name:'查询'
      },{
        name:'导出Excel'
      }
    ], 
  },

  bindPickerChange: function (e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      shengchan: _this.data.shengchan_list[e.detail.value]
    })
  },

  bindPickerChange1: function (e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      this_value: _this.data.gongyingshang_list[e.detail.value]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var tiaojian = options.tiaojian
    if(tiaojian != undefined){
      tiaojian = JSON.parse(tiaojian)
    }
    _this.setData({
      userInfo:userInfo,
      tiaojian
    })
  },

  choiceDate: function (e) {
    var _this = this
    //e.preventDefault(); 
    var column_name = e.target.dataset.column_name
    console.log(e.detail.value)
    _this.setData({
      [column_name]: e.detail.value
    })
  },

  tableShow: function () {
    var _this = this
    var userInfo = _this.data.userInfo
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == ''){
      start_date = '1900-01-01'
    }
    if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    var type = _this.data.type
    var sql = ""
    var type_list = [
      {name:'按业务员'},
      {name:'按客户'},
      {name:'按产品'},
    ]
    var title = _this.data.title
    if(type == '按业务员'){
      title[0].name = "业务员"
      title[0].text = "业务员"
      sql = "select name,sum(money) as money from (select yewuyuan as name,convert(float,isnull(dingdan.money,0)) + convert(float,isnull(shoukuan.money,0)) as money from (select dingdan.bianhao,chuku.bianhao as chuku_bianhao,dingdan.kehu,dingdan.yewuyuan,money from (select * from xiaoshou_dingdan as dingdan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where danju_leixing = '销售订单' and shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' group by danju_bianhao) as shoukuan on dingdan.bianhao = shoukuan.danju_bianhao) as dingdan left join xiaoshou_chuku as chuku on dingdan.bianhao = chuku.xiaoshou_id) as dingdan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where danju_leixing = '销售出库' and shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' group by danju_bianhao) as shoukuan on dingdan.chuku_bianhao = shoukuan.danju_bianhao) as shoukuan where money > 0 group by name order by money desc"
    }else if(type == '按客户'){
      title[0].name = "客户"
      title[0].text = "客户"
      sql = "select name,sum(money) as money from (select kehu as name,convert(float,isnull(dingdan.money,0)) + convert(float,isnull(shoukuan.money,0)) as money from (select dingdan.bianhao,chuku.bianhao as chuku_bianhao,dingdan.kehu,dingdan.yewuyuan,money from (select * from xiaoshou_dingdan as dingdan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where danju_leixing = '销售订单' and shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' group by danju_bianhao) as shoukuan on dingdan.bianhao = shoukuan.danju_bianhao) as dingdan left join xiaoshou_chuku as chuku on dingdan.bianhao = chuku.xiaoshou_id) as dingdan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where danju_leixing = '销售出库' and shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' group by danju_bianhao) as shoukuan on dingdan.chuku_bianhao = shoukuan.danju_bianhao) as shoukuan where money > 0 group by name order by money desc"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        for(var i=0; i<list.length; i++){
          list[i].money = Math.round(list[i].money * 100) / 100
        }
        _this.setData({
          list,
          title
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
      }
    })
  },

  xiala_show: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    _this.setData({
      list_xiala: list,
      click_column:column,
    })
    console.log(list)
    _this.setData({
      xlShow2: true
    })
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      if(click_column == 'gongneng' && new_val == '导出Excel'){
        _this.setData({
          xlShow2: false,
        })
        _this.toExcel()
      }else if(click_column == 'gongneng' && new_val == '查询'){
        _this.setData({
          xlShow2: false,
          cxShow: true,
        })
      }else if(click_column == 'gongneng' && new_val == '刷新'){
        _this.setData({
          xlShow2: false,
          start_date:'',
          stop_date:'',
          zhuanru:'',
          zhuanchu:'',
        })
        _this.sel1()
      }else{
        if(click_column == 'this_type'){
          _this.setData({
            this_date: '',
          })
        }
        _this.setData({
          [click_column]: new_val,
          xlShow2: false,
        })
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },
  qxShow:function(){
    var _this = this
    _this.setData({
      xlShow2: false,
      dayin_show: false,
      cxShow: false
    })
  },

  sel1:function(){
    var _this = this
    _this.qxShow()
    _this.tableShow()
  },

  onChange(event) {
    var _this = this
    console.log('onChange')
    console.log(event)
    if(event.detail.length == _this.data.list_check.length){
      _this.setData({
        quanxuan_value: true,
      });
    }else{
      _this.setData({
        quanxuan_value: false,
      });
    }
    _this.setData({
      result: event.detail,
    });
  },

  toggle(event) {
    console.log('toggle')
    console.log(event)
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() {
    console.log('noop')
  },

  quanxuan:function(e){
    var _this = this
    console.log(e)
    var this_val = e.detail
    if(this_val == false){
      _this.setData({
        quanxuan_value: false,
        result:[]
      })
    }else{
      _this.setData({
        quanxuan_value: true,
        result:_this.data.all_result
      })
    }
  },

  toExcel:function(){
    var _this = this
    var list = _this.data.list;
    if(list.length == 0){
      wx.showToast({
        title: '无可导出数据，请查询后再试！',
        icon: 'none'
      })
      return;
    }
    _this.qxShow()
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    console.log(list)
    var title_put = _this.data.title
    console.log(title_put)
    var cloudList = {
      name : '销售收款统计',
      items : [],
      header : []
    }
    for(let i=0;i<title_put.length;i++){
      cloudList.header.push({
        item:title_put[i].name,
        type:title_put[i].type,
        width:parseInt(title_put[i].width.split("r")[0]),
        columnName:title_put[i].columnName
      })
    }
    var item = []
    console.log(list)
    console.log(title_put)
    for(var i=0; i<list.length; i++){
      var this_item = {}
      for(var j=0; j<title_put.length; j++){
        if(list[i][title_put[j].columnName] == undefined){
          this_item[title_put[j].columnName] = ""
        }else{
          this_item[title_put[j].columnName] = list[i][title_put[j].columnName] + ""
        }
      }
      item.push(this_item)
    }
    console.log("导出列表：" + item)
    cloudList.items = item
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        var this_name = new Date().getTime() + ".xlsx"
        var fileId = res.result.fileID
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获得临时路径",res.tempFilePath)
            delCloudFile(fileId)
            wx.openDocument({
              filePath: res.tempFilePath,
              fileType : 'xlsx',
              showMenu : true,
              success : res=> {
                wx.hideLoading({
                  success: (res) => {},
                })
                console.log("用户打开文件")
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
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var _this = this
    var tiaojian = _this.data.tiaojian
    if(tiaojian != undefined){
      _this.setData({
        start_date:tiaojian.start_date,
        stop_date:tiaojian.stop_date,
        tiaojian:undefined
      })
    }
    _this.tableShow()
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

function getTimeMonth(){
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth()+1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth()+1);
  var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
  return year+"-"+month
}

function getTimeYear(){
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth()+1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth()+1);
  var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
  return year
}

function getTime(){
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth()+1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth()+1);
  var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
  return year+"-"+month+"-"+day
}

function getDays(year, month) {
  let days = [31,28,31,30,31,30,31,31,30,31,30,31] 
 if ( (year % 4 ===0) && (year % 100 !==0 || year % 400 ===0) ) {
       days[1] = 29
 }
　　return days[month]  
}

function delCloudFile(fileId){
  var fileIds = [];
  fileIds.push(fileId);
  wx.cloud.deleteFile({
    fileList: fileIds,
    success: res => {
      console.log(res.fileList);
    },
    fail : console.error
  })
}
