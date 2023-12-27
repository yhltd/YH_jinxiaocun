// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    title: [
      {
        name: "日期/单据",
        text: "日期/单据",
        width: "300rpx",
        columnName: "type",
        type: "text",
        isupd: true
      },
      {
        name: "订金",
        text: "订金",
        width: "200rpx",
        columnName: "dingjin",
        type: "text",
        isupd: true
      },
      {
        name: "欠款",
        text: "欠款",
        width: "200rpx",
        columnName: "qiankuan",
        type: "text",
        isupd: true
      },
    ],
    xlShow2: false,
    cxShow: false,
    start_date:'',
    stop_date: '',
    gongneng_list:[
      {
        name:'查询'
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
    var customer_name = options.customer_name
    _this.setData({
      userInfo:userInfo,
      customer_name
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
    var customer_name = _this.data.customer_name
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == ''){
      start_date = '1900-01-01'
    }
    if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    var sql = "select 0 as id,'期初' as type,'' as riqi,'' as bianhao,isnull(sum(dingjin),0) as dingjin,isnull(sum(qiankuan),0) as qiankuan from(select xiaoshou_dingdan.id,'销售订单' as type,riqi,bianhao,0 as dingjin,0 as qiankuan from xiaoshou_dingdan left join (select xiaoshou_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as money from xiaoshou_dingdan_item group by xiaoshou_id) as item on xiaoshou_dingdan.id = item.xiaoshou_id where kehu = '"+ customer_name +"' union select xiaoshou_chuku.id,'销售出库' as type,riqi,bianhao,convert(float,isnull(dingjin_use,0)) * -1 as dingjin,money - convert(float,isnull(dingjin_use,0)) as qiankuan from xiaoshou_chuku left join(select chuku_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as money from xiaoshou_chuku_item group by chuku_id) as item on xiaoshou_chuku.id = item.chuku_id where kehu = '"+ customer_name +"' union select shoukuan.id,type,shoukuan.riqi,shoukuan.bianhao,dingjin,money from (select id,shouzhi_bianhao as bianhao,shoufu_type as type,shouzhi_riqi as riqi,danju_bianhao,case when shoufu_type = '收订金' then convert(float,isnull(jizhang_jine,0)) else 0 end as dingjin,case when shoufu_type = '收欠款' then convert(float,isnull(jizhang_jine,0)) * -1 else 0 end as money from shouzhi_mingxi where danju_leixing = '销售订单') as shoukuan left join xiaoshou_dingdan on shoukuan.danju_bianhao = xiaoshou_dingdan.bianhao where kehu = '"+ customer_name +"' union select shoukuan.id,type,shoukuan.riqi,shoukuan.bianhao,dingjin,money from (select id,shouzhi_bianhao as bianhao,shoufu_type as type,shouzhi_riqi as riqi,danju_bianhao,case when shoufu_type = '收订金' then convert(float,isnull(jizhang_jine,0)) else 0 end as dingjin,case when shoufu_type = '收欠款' then convert(float,isnull(jizhang_jine,0)) * -1 else 0 end as money from shouzhi_mingxi where danju_leixing = '销售出库') as shoukuan left join xiaoshou_chuku on shoukuan.danju_bianhao = xiaoshou_chuku.bianhao where kehu = '"+ customer_name +"') as mingxi where riqi < '"+ start_date +"' union select * from(select xiaoshou_dingdan.id,'销售订单' as type,riqi,bianhao,0 as dingjin,0 as qiankuan from xiaoshou_dingdan left join (select xiaoshou_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as money from xiaoshou_dingdan_item group by xiaoshou_id) as item on xiaoshou_dingdan.id = item.xiaoshou_id where kehu = '"+ customer_name +"' union select xiaoshou_chuku.id,'销售出库' as type,riqi,bianhao,convert(float,isnull(dingjin_use,0)) * -1 as dingjin,money - convert(float,isnull(dingjin_use,0)) as qiankuan from xiaoshou_chuku left join(select chuku_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as money from xiaoshou_chuku_item group by chuku_id) as item on xiaoshou_chuku.id = item.chuku_id where kehu = '"+ customer_name +"' union select shoukuan.id,type,shoukuan.riqi,shoukuan.bianhao,dingjin,money from (select id,shouzhi_bianhao as bianhao,shoufu_type as type,shouzhi_riqi as riqi,danju_bianhao,case when shoufu_type = '收订金' then convert(float,isnull(jizhang_jine,0)) else 0 end as dingjin,case when shoufu_type = '收欠款' then convert(float,isnull(jizhang_jine,0)) * -1 else 0 end as money from shouzhi_mingxi where danju_leixing = '销售订单') as shoukuan left join xiaoshou_dingdan on shoukuan.danju_bianhao = xiaoshou_dingdan.bianhao where kehu = '"+ customer_name +"' union select shoukuan.id,type,shoukuan.riqi,shoukuan.bianhao,dingjin,money from (select id,shouzhi_bianhao as bianhao,shoufu_type as type,shouzhi_riqi as riqi,danju_bianhao,case when shoufu_type = '收订金' then convert(float,isnull(jizhang_jine,0)) else 0 end as dingjin,case when shoufu_type = '收欠款' then convert(float,isnull(jizhang_jine,0)) * -1 else 0 end as money from shouzhi_mingxi where danju_leixing = '销售出库') as shoukuan left join xiaoshou_chuku on shoukuan.danju_bianhao = xiaoshou_chuku.bianhao where kehu = '"+ customer_name +"') as mingxi where riqi >= '"+ start_date +"' and riqi <= '"+ stop_date +"' order by riqi"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var add_dingjin = 0
        var del_dingjin = 0
        var yu_dingjin = 0
        var add_qiankuan = 0
        var del_qiankuan = 0
        var yu_qiankuan = 0
        for(var i=0; i<list.length; i++){
          yu_dingjin = yu_dingjin + list[i].dingjin * 1
          yu_qiankuan = yu_qiankuan + list[i].qiankuan * 1
          if(i==0){ 
            list[i].dingjin = '余' + yu_dingjin
            list[i].qiankuan = '余' + yu_qiankuan
          }else{
            if(list[i].type == '销售出库'){
              del_dingjin = del_dingjin + list[i].dingjin * 1
              add_qiankuan = add_qiankuan + list[i].qiankuan * 1
            }else if(list[i].type == '收订金'){
              add_dingjin = add_dingjin + list[i].dingjin * 1
            }else if(list[i].type == '收欠款'){
              del_qiankuan = del_qiankuan + list[i].qiankuan * -1
            } 
            list[i].dingjin = list[i].dingjin + "\n" + '余' + yu_dingjin
            list[i].qiankuan = list[i].qiankuan + "\n" + '余' + yu_qiankuan
          }
        }
        for(var i=1; i<list.length; i++){
          list[i].type =  list[i].riqi + "\n" + list[i].bianhao + " " + list[i].type 
        }
        _this.setData({
          list,
          add_dingjin,
          del_dingjin,
          yu_dingjin,
          add_qiankuan,
          del_qiankuan,
          yu_qiankuan,
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
      name : '销售毛利统计',
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
