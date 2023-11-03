// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    title: [
      {
        name: "月份",
        text: "月份",
        width: "250rpx",
        columnName: "month",
        type: "text",
        isupd: true
      },
      {
        name: "收入",
        text: "收入",
        width: "250rpx",
        columnName: "shouru",
        type: "text",
        isupd: true
      },
      {
        name: "支出",
        text: "支出",
        width: "250rpx",
        columnName: "zhichu",
        type: "text",
        isupd: true
      },
      {
        name: "净收入",
        text: "净收入",
        width: "250rpx",
        columnName: "jingshouru",
        type: "text",
        isupd: true
      },
    ],

    xlShow2: false,
    cxShow: false,
    name:'',
    type: '',
    enable: '',
    list_check: [
      {
        name:'订单编号',
        columnName: "bianhao",
        type: "text",
        width: "250rpx",
      },{
        name:'日期',
        columnName: 'riqi',
        type: "text",
        width: "250rpx",
      },{
        name:'交货日期',
        columnName: 'jiaohuo_riqi',
        type: "text",
        width: "250rpx",
      },{
        name:'供应商',
        columnName: 'gongyingshang',
        type: "text",
        width: "250rpx",
      },{
        name:'店铺',
        columnName: 'dianpu',
        type: "text",
        width: "250rpx",
      },{
        name:'商品编号',
        columnName: 'shangpin_bianhao',
        type: "text",
        width: "250rpx",
      },{
        name:'商品名称',
        columnName: 'name',
        type: "text",
        width: "250rpx",
      },{
        name:'规格',
        columnName: 'guige',
        type: "text",
        width: "250rpx",
      },{
        name:'单位',
        columnName: 'danwei',
        type: "text",
        width: "250rpx",
      },{
        name:'数量',
        columnName: 'shuliang',
        type: "text",
        width: "250rpx",
      },{
        name:'单价',
        columnName: 'caigou_danjia',
        type: "text",
        width: "250rpx",
      },{
        name:'金额',
        columnName: 'jiashui_xiaoji',
        type: "text",
        width: "250rpx",
      },{
        name:'行备注',
        columnName: 'beizhu',
        type: "text",
        width: "250rpx",
      },{
        name:'备注',
        columnName: 'beizhu2',
        type: "text",
        width: "250rpx",
      }
    ],
    all_result: ['订单编号', '日期', '交货日期' ,'供应商','店铺','商品编号','商品名称','规格','单位','数量','单价','金额','行备注','备注'],
    result: ['订单编号', '日期', '交货日期' ,'供应商','店铺','商品编号','商品名称','规格','单位','数量','单价','金额','行备注','备注'],
    gongneng_list:[
      {
        name:'查询'
      },{
        name:'导出Excel'
      }
    ],
    quanxuan_value: true,

    this_date:'',
    this_type:'',
    this_type_list:[
      {
        name:'按月'
      },
      {
        name:'按日'
      }
    ]
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
    _this.setData({
      userInfo:userInfo
    })

    var e = [getTimeYear()]
    _this.tableShow(e)
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

  tableShow: function (e) {
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.yuedu_tongji_sel != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    var sql = "select shouzhi_riqi,shouzhi_type,isnull(sum(money),0) as money from (select SUBSTRING(shouzhi_riqi,1,7) as shouzhi_riqi,shouzhi_type,round(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0)),2) as money from shouzhi_mingxi) as shouzhi where shouzhi_riqi >= '" + e[0] + "-01' and shouzhi_riqi <= '" + e[0] + "-12' group by shouzhi_riqi,shouzhi_type"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var type_list = [
          { month:'1' },
          { month:'2' },
          { month:'3' },
          { month:'4' },
          { month:'5' },
          { month:'6' },
          { month:'7' },
          { month:'8' },
          { month:'9' },
          { month:'10' },
          { month:'11' },
          { month:'12' },
        ]
        var money_list = res.result.recordset
        console.log(money_list)
        for(var i=0; i<money_list.length; i++){
          var this_month = money_list[i].shouzhi_riqi.split("-")[1] * 1
          console.log(this_month)
          if(money_list[i].shouzhi_type == '收入'){
            type_list[this_month -1].shouru = money_list[i].money
          }else if(money_list[i].shouzhi_type == '支出'){
            type_list[this_month -1].zhichu = money_list[i].money
          }
        }
        for(var i=0; i<type_list.length; i++){
          if(type_list[i].shouru == undefined){
            type_list[i].shouru = 0
          }
          if(type_list[i].zhichu == undefined){
            type_list[i].zhichu = 0
          }
          type_list[i].jingshouru = type_list[i].shouru - type_list[i].zhichu
        }
        console.log(type_list)
        _this.setData({
          list: type_list,
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
    var this_date = _this.data.this_date
    if(this_date == ''){
      wx.showToast({
        title: '请选择时间',
        icon: 'none'
      })
      return;
    }
    var e = [this_date]
    _this.qxShow()
    _this.tableShow(e)
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
      name : '月度收支统计',
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
