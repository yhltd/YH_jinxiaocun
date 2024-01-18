// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    title_chu: [
      {
        text: "分类",
        width: "250rpx",
        columnName: "jizhang_type",
        type: "text",
        isupd: true
      },
    ],

    xlShow2: false,
    cxShow: false,
    name:'',
    type: '',
    enable: '',
    list_check: [],
    all_result: [],
    result: [],
    gongneng_list:[
      {
        name:'刷新'
      },{
        name:'查询'
      },{
        name:'导出Excel'
      }
    ],
    quanxuan_value: true,

    this_date:'',
    this_type:'',
    jizhang_danwei:'',
    jizhang_zhanghu:'',
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
    var sql = "select * from peizhi where type = '核算单位';select * from peizhi where type = '收款账户';"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        var jizhang_danwei_list = res.result.recordsets[0]
        var jizhang_zhanghu_list = res.result.recordsets[1]
        _this.setData({
          jizhang_danwei_list,
          jizhang_zhanghu_list
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
    var e = ['按日',getTimeMonth(),'','']
    // var e = ['按月',getTimeYear()]
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
    var sql = ''
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.shouru_tongji_sel != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    var this_where = ''
    if(e[2] != ''){
      this_where = this_where + " and jizhang_danwei ='" + e[2] + "' " 
    }
    if(e[3] != ''){
      this_where = this_where + " and jizhang_zhanghu ='" + e[3] + "' " 
    }

    if(e[0] == '按日'){
      sql = "select shouzhi_riqi,jizhang_type,sum(money) as money from (select shouzhi_riqi,jizhang_type,round(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0)),2) as money from shouzhi_mingxi where shouzhi_type = '收入' " + this_where + ") as shouzhi where shouzhi_riqi >= '" + e[1] + "-01' and shouzhi_riqi <= '" + e[1] + "-31' group by shouzhi_riqi,jizhang_type;select jizhang_type from shouzhi_mingxi where shouzhi_riqi >= '" + e[1] + "-01' and shouzhi_riqi <= '" + e[1] + "-31' " + this_where + " and shouzhi_type = '收入' group by jizhang_type"
    }else if(e[0] == '按月'){
      sql = "select shouzhi_riqi,jizhang_type,sum(money) as money from (select SUBSTRING(shouzhi_riqi,1,7) as shouzhi_riqi,jizhang_type,round(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0)),2) as money from shouzhi_mingxi where shouzhi_type = '收入' " + this_where + ") as shouzhi where shouzhi_riqi >= '" + e[1] + "-01' and shouzhi_riqi <= '" + e[1] + "-12' group by shouzhi_riqi,jizhang_type;select jizhang_type from shouzhi_mingxi where SUBSTRING(shouzhi_riqi,1,7) >= '" + e[1] + "-01' and SUBSTRING(shouzhi_riqi,1,7) <= '" + e[1] + "-12' " + this_where + " and shouzhi_type = '收入' group by jizhang_type"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        var type_list = res.result.recordsets[1]
        var money_list = res.result.recordsets[0]
        console.log(type_list)
        console.log(money_list)
        var title = []
        if(e[0] == '按月'){
          title = [
            {
              name: "分类",
              text: "分类",
              width: "250rpx",
              columnName: "jizhang_type",
              type: "text",
              isupd: true
            },
          ]
          console.log(title)
          title.push({
            name: "合计",
            text: "合计",
            width: "170rpx",
            columnName: "sum",
            type: "text",
            isupd: true
          })
          for(var i=1; i<=12; i++){
            title.push({
              name: i + "月",
              text: i + "月",
              width: "170rpx",
              columnName: i,
              type: "text",
              isupd: true
            })
          }
          for(var i=0; i<type_list.length; i++){
            for(var j=money_list.length-1; j>=0; j--){
              if(type_list[i].jizhang_type == money_list[j].jizhang_type){
                var this_column = money_list[j].shouzhi_riqi.split("-")[1] * 1
                console.log(this_column)
                this_column = this_column + ""
                type_list[i][this_column] = money_list[j].money
                if(type_list[i].sum == undefined){
                  type_list[i].sum = money_list[j].money
                }else{
                  type_list[i].sum = (type_list[i].sum * 1) + (money_list[j].money * 1)
                }
                money_list.splice(j,1)
              }
            }
          }
        }else if(e[0] == '按日'){
          title = [
            {
              name: "分类",
              text: "分类",
              width: "250rpx",
              columnName: "jizhang_type",
              type: "text",
              isupd: true
            },
          ]
          console.log(title)
          title.push({
            name: "合计",
            text: "合计",
            width: "170rpx",
            columnName: "sum",
            type: "text",
            isupd: true
          })
          console.log(e[1])
          var this_day = getDays(e[1].split("-")[0] * 1,e[1].split("-")[1] * 1 -1)
          console.log(this_day)
          for(var i=1; i<=this_day; i++){
            title.push({
              text: i + "号",
              name: i + "号",
              width: "170rpx",
              columnName: i,
              type: "text",
              isupd: true
            })
          }
          for(var i=0; i<type_list.length; i++){
            for(var j=money_list.length-1; j>=0; j--){
              if(type_list[i].jizhang_type == money_list[j].jizhang_type){
                var this_column = money_list[j].shouzhi_riqi.split("-")[2] * 1
                console.log(this_column)
                this_column = this_column + ""
                type_list[i][this_column] = money_list[j].money
                if(type_list[i].sum == undefined){
                  type_list[i].sum = money_list[j].money
                }else{
                  type_list[i].sum = (type_list[i].sum * 1) + (money_list[j].money * 1)
                }
                money_list.splice(j,1)
              }
            }
          }
        }
        console.log(title)
        console.log(type_list)
        var heji_row = {jizhang_type:'合计'}
        for(var i=0; i<title.length; i++){
          if(title[i].columnName != 'jizhang_type'){
            for(var j=0; j<type_list.length; j++){
              if(type_list[j][title[i].columnName] != undefined){
                if(heji_row[title[i].columnName] != undefined){
                  heji_row[title[i].columnName] = Math.round((heji_row[title[i].columnName] * 1 + type_list[j][title[i].columnName] * 1) * 100) / 100
                }else{
                  heji_row[title[i].columnName] = Math.round(type_list[j][title[i].columnName] * 1 * 100) / 100
                }
              }
            }
          }
        }
        type_list.push(heji_row)
        _this.setData({
          list: type_list,
          list_check: type_list,
          title,
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
        })
        var e = [_this.data.this_type,_this.data.this_date,'','']
        _this.tableShow(e)
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
    var jizhang_danwei = _this.data.jizhang_danwei
    var jizhang_zhanghu = _this.data.jizhang_zhanghu
    var this_date = _this.data.this_date
    var this_type = _this.data.this_type
    if(this_type == ''){
      wx.showToast({
        title: '请选择汇总类型',
        icon: 'none'
      })
      return;
    }
    if(this_date == ''){
      wx.showToast({
        title: '请选择时间',
        icon: 'none'
      })
      return;
    }
    var e = [this_type,this_date,jizhang_danwei,jizhang_zhanghu]
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
      name : '收入分类统计',
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
