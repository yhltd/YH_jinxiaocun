// package_ruilida/page/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xlShow2: false,
    cxShow: false,
    name:'',
    type: '',
    enable: '',
    list_check: [
      {
        name:'对应店铺',
        columnName: "dianpu",
        type: "text",
        width: "250rpx",
      },{
        name:'单据类型',
        columnName: 'danju_leixing',
        type: "text",
        width: "250rpx",
      },{
        name:'单据编号',
        columnName: 'danju_bianhao',
        type: "text",
        width: "250rpx",
      },{
        name:'记账单号',
        columnName: 'shouzhi_bianhao',
        type: "text",
        width: "250rpx",
      },{
        name:'记账日期',
        columnName: 'shouzhi_riqi',
        type: "text",
        width: "250rpx",
      },{
        name:'记账人',
        columnName: 'jizhangren',
        type: "text",
        width: "250rpx",
      },{
        name:'记账分类',
        columnName: 'jizhang_type',
        type: "text",
        width: "250rpx",
      },{
        name:'记账账户',
        columnName: 'jizhang_zhanghu',
        type: "text",
        width: "250rpx",
      },{
        name:'记账金额',
        columnName: 'jizhang_jine',
        type: "text",
        width: "250rpx",
      },{
        name:'可抵税额',
        columnName: 'kedi_shuie',
        type: "text",
        width: "250rpx",
      },{
        name:'摘要',
        columnName: 'zhaiyao',
        type: "text",
        width: "250rpx",
      }
    ],
    all_result: ['对应店铺', '单据类型', '单据编号' ,'记账单号','记账日期','记账人','记账分类','记账账户','记账金额','可抵税额','摘要'],
    result: ['对应店铺', '单据类型', '单据编号' ,'记账单号','记账日期','记账人','记账分类','记账账户','记账金额','可抵税额','摘要'],
    gongneng_list:[
      {
        name:'查询'
      },{
        name:'刷新'
      },{
        name:'导出Excel'
      }
    ],
    quanxuan_value: true,
    start_date: '',
    stop_date: '',
    dianpu: '',
    jizhangren: '',
    jizhang_zhanghu: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var shouzhi_type = options.shouzhi_type
    var tiaojian = options.tiaojian
    if(tiaojian != undefined){
      tiaojian = JSON.parse(tiaojian)
    }
    _this.setData({
      userInfo,
      shouzhi_type,
      tiaojian
    })
    var sql = "select * from peizhi where type ='店铺';select * from userInfo;select * from peizhi where type ='收款账户';"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var dianpu_list = res.result.recordsets[0]
        var jizhangren_list = res.result.recordsets[1]
        var jizhang_zhanghu_list = res.result.recordsets[2]
        _this.setData({
          dianpu_list,
          jizhangren_list,
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
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  sel1:function(){
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == ''){
      start_date = '1900-01-01'
    }
    if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    var e = [start_date,stop_date,_this.data.dianpu,_this.data.jizhangren,_this.data.jizhang_zhanghu]
    _this.qxShow()
    _this.tableShow(e)
  },

  tableShow: function (e) { 
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.shouru_sel != '查看个人' && userInfo.power_mingxi.shouru_sel != '查看全部' && _this.data.shouzhi_type == '收入记录'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    if(userInfo.power_mingxi.zhichu_sel != '查看个人' && userInfo.power_mingxi.zhichu_sel != '查看全部' && _this.data.shouzhi_type == '支出记录'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    var sql = ""
    if(userInfo.power_mingxi.shouru_sel == '查看个人' && _this.data.shouzhi_type == '收入记录'){
      sql = "select * from shouzhi_mingxi where shouzhi_riqi >= '" + e[0] + "' and shouzhi_riqi <= '" + e[1] + "' and dianpu like '%" + e[2] + "%' and jizhangren like '%" + e[3] + "%' and jizhang_zhanghu like '%" + e[4] + "%' and shouzhi_type ='" + _this.data.shouzhi_type.replace("记录","") + "' and jizhangren ='" + userInfo.name + "'"
    }
    if(userInfo.power_mingxi.shouru_sel == '查看全部' && _this.data.shouzhi_type == '收入记录'){
      sql = "select * from shouzhi_mingxi where shouzhi_riqi >= '" + e[0] + "' and shouzhi_riqi <= '" + e[1] + "' and dianpu like '%" + e[2] + "%' and jizhangren like '%" + e[3] + "%' and jizhang_zhanghu like '%" + e[4] + "%' and shouzhi_type ='" + _this.data.shouzhi_type.replace("记录","") + "'"
    }
    if(userInfo.power_mingxi.zhichu_sel == '查看个人' && _this.data.shouzhi_type == '支出记录'){
      sql = "select * from shouzhi_mingxi where shouzhi_riqi >= '" + e[0] + "' and shouzhi_riqi <= '" + e[1] + "' and dianpu like '%" + e[2] + "%' and jizhangren like '%" + e[3] + "%' and jizhang_zhanghu like '%" + e[4] + "%' and shouzhi_type ='" + _this.data.shouzhi_type.replace("记录","") + "' and jizhangren ='" + userInfo.name + "'"
    }
    if(userInfo.power_mingxi.zhichu_sel == '查看全部' && _this.data.shouzhi_type == '支出记录'){
      sql = "select * from shouzhi_mingxi where shouzhi_riqi >= '" + e[0] + "' and shouzhi_riqi <= '" + e[1] + "' and dianpu like '%" + e[2] + "%' and jizhangren like '%" + e[3] + "%' and jizhang_zhanghu like '%" + e[4] + "%' and shouzhi_type ='" + _this.data.shouzhi_type.replace("记录","") + "'"
    }
    sql = sql + ";select * from shouzhi_mingxi_item"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      }, 
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var list_item = res.result.recordsets[1]
        var zongji = 0
        for(var i=0; i< list.length; i++){
          zongji = zongji + (list[i].jizhang_jine * 1)
          for(var j=list_item.length-1; j>=0; j--){
            if(list[i].id == list_item[j].shouzhi_id){
              if(list[i].item == undefined){
                var this_item = []
                this_item.push(list_item[j])
                list_item.splice(j,1)
                list[i].item = this_item
              }else{
                var this_item = list[i].item
                this_item.push(list_item[j])
                list_item.splice(j,1)
                list[i].item = this_item
              }
            }
          }
        }
        zongji = Math.round(zongji * 100) / 100
        console.log(list)
        console.log(list_item)
        _this.setData({
          list: list,
          num: list.length,
          zongji
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

  tianjia: function(){
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.shouru_add != '是' && _this.data.shouzhi_type == '收入记录'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    if(userInfo.power_mingxi.zhichu_add != '是' && _this.data.shouzhi_type == '支出记录'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../caigou_fukuanAdd/caigou_fukuanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&shouzhi_type=" + _this.data.shouzhi_type,
    })
  },

  click_view:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var id = _this.data.list[index].id
    var shoufu_type = _this.data.list[index].shoufu_type
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.shouru_upd != '是' && _this.data.shouzhi_type == '收入记录'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    if(userInfo.power_mingxi.zhichu_upd != '是' && _this.data.shouzhi_type == '支出记录'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    if(shoufu_type == '收订金'){
      wx.navigateTo({
        url: '../caigou_fukuanAdd/caigou_fukuanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + "&shouzhi_type=" + _this.data.shouzhi_type + "&xiaoshou_id=0",
      })
    }else if(shoufu_type == '收欠款'){
      wx.navigateTo({
        url: '../caigou_fukuanAdd/caigou_fukuanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + "&shouzhi_type=" + _this.data.shouzhi_type + "&chuku_id=0",
      })
    }else if(shoufu_type == '付订金'){
      wx.navigateTo({
        url: '../caigou_fukuanAdd/caigou_fukuanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + "&shouzhi_type=" + _this.data.shouzhi_type + "&caigou_id=0",
      })
    }else if(shoufu_type == '付欠款'){
      wx.navigateTo({
        url: '../caigou_fukuanAdd/caigou_fukuanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + "&shouzhi_type=" + _this.data.shouzhi_type + "&ruku_id=0",
      })
    }else{
      wx.navigateTo({
        url: '../caigou_fukuanAdd/caigou_fukuanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + "&shouzhi_type=" + _this.data.shouzhi_type,
      })
    }

  },

  del1:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var id = _this.data.list[index].id
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.shouru_del != '是' && _this.data.shouzhi_type == '收入记录'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    if(userInfo.power_mingxi.zhichu_del != '是' && _this.data.shouzhi_type == '支出记录'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确认删除此条信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var sql = "delete from shouzhi_mingxi where id=" + id + ";delete from shouzhi_mingxi_item where shouzhi_id ='" + id + "'"
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              wx.showToast({
                title: '删除成功',
                icon: 'none'
              })
              _this.sel1()
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
          dayin_show: true,
        })
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
          dianpu:'',
          jizhangren:'',
          jizhang_zhanghu:'',
        })
        _this.sel1()
      }else{
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
    if(_this.data.result.length == 0){
      wx.showToast({
        title: '请选择导出信息',
        icon: 'none'
      })
      return;
    }
    var this_column = []
    var result = _this.data.result
    for(var j=0; j<_this.data.list_check.length; j++){
      for(var i=0; i<result.length; i++){
        if(_this.data.list_check[j].name == result[i]){
          this_column.push(_this.data.list_check[j])
          continue;
        }
      }
    }
    console.log(this_column)
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
    var title_put = this_column
    console.log(title_put)
    var cloudList = {
      name : '收支记录',
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
    for(var i=0; i<list.length; i++){
      item.push({
        dianpu: list[i].dianpu,
        danju_leixing: list[i].danju_leixing,
        danju_bianhao: list[i].danju_bianhao,
        shouzhi_bianhao: list[i].shouzhi_bianhao,
        shouzhi_riqi: list[i].shouzhi_riqi,
        jizhangren: list[i].jizhangren,
        jizhang_type: list[i].jizhang_type,
        jizhang_zhanghu: list[i].jizhang_zhanghu,
        jizhang_jine: list[i].jizhang_jine,
        kedi_shuie: list[i].kedi_shuie,
        zhaiyao: list[i].zhaiyao,
      })
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
    console.log(_this.data.shouzhi_type)
    wx.setNavigationBarTitle({title: _this.data.shouzhi_type});
    var tiaojian = _this.data.tiaojian
    if(tiaojian != undefined){
      _this.setData(tiaojian)
      _this.setData({
        tiaojian:undefined
      })
    }else{
      _this.setData({
        start_date:'',
        stop_date:'',
        dianpu:'',
        jizhangren:'',
        jizhang_zhanghu:'',
      })
    }
    _this.sel1()
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