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
        name:'采购订单编号',
        columnName: "caigou_bianhao",
        type: "text",
        width: "250rpx",
      },{
        name:'收票单位',
        columnName: 'shoupiao_danwei',
        type: "text",
        width: "250rpx",
      },{
        name:'开票单位',
        columnName: 'kaipiao_danwei',
        type: "text",
        width: "250rpx",
      },{
        name:'开票日期',
        columnName: 'kaipiao_riqi',
        type: "text",
        width: "250rpx",
      },{
        name:'开票金额',
        columnName: 'kaipiao_jine',
        type: "text",
        width: "250rpx",
      },{
        name:'开票税额',
        columnName: 'kaipiao_shuie',
        type: "text",
        width: "250rpx",
      },{
        name:'价税合计',
        columnName: 'jiashui_heji',
        type: "text",
        width: "250rpx",
      },{
        name:'备注',
        columnName: 'beizhu',
        type: "text",
        width: "250rpx",
      },{
        name:'信息推送',
        columnName: 'xinxi_tuisong',
        type: "text",
        width: "250rpx",
      },{
        name:'收票状态',
        columnName: 'shoupiao_zhuangtai',
        type: "text",
        width: "250rpx",
      }
    ],
    all_result: ['采购订单编号', '收票单位', '开票单位' ,'开票日期','开票金额','开票税额','价税合计','备注','信息推送','收票状态'],
    result: ['采购订单编号', '收票单位', '开票单位' ,'开票日期','开票金额','开票税额','价税合计','备注','信息推送','收票状态'],
    gongneng_list:[
      {
        name:'查询'
      },{
        name:'刷新'
      },{
        name:'导出Excel'
      },{
        name:'查看需要我收票'
      }
    ],
    quanxuan_value: true,
    shoupiao_zhuangtai_list:[
      {name:'待收票'},
      {name:'已收票'},
    ],
    shenhe_click_list:[
      {name:'已收票'},
    ],
    start_date: '',
    stop_date: '',
    kaipiao_danwei: '',
    shoupiao_danwei: '',
    shoupiao_zhuangtai: '',
    sel_type:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var type = options.type
    _this.setData({
      userInfo,
      type
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
    var e = [start_date,stop_date,_this.data.kaipiao_danwei,_this.data.shoupiao_danwei,_this.data.shoupiao_zhuangtai]
    _this.qxShow()
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.caigou_shoupiao_sel != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    var sql = "select * from caigou_shoupiao where kaipiao_riqi >= '" + e[0] + "' and kaipiao_riqi <= '" + e[1] + "' and kaipiao_danwei like '%" + e[2] + "%' and shoupiao_danwei like '%" + e[3] + "%' and shoupiao_zhuangtai like '%" + e[4] + "%';select * from gongyingshang;select * from peizhi where type = '核算单位'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var kaipiao_danwei_list = res.result.recordsets[1]
        var shoupiao_danwei_list = res.result.recordsets[2]
        var zongji = 0
        for(var i=0; i<list.length; i++){
          zongji = zongji + (list[i].jiashui_heji * 1)
        }
        zongji = Math.round(zongji * 100) / 100
        console.log(list)
        _this.setData({
          list: list,
          num: list.length,
          kaipiao_danwei_list,
          shoupiao_danwei_list,
          sel_type:'',
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

  shenheShow: function () {
    var _this = this
    var userInfo = _this.data.userInfo
    var sql = "select * from caigou_shoupiao where xinxi_tuisong='" + _this.data.userInfo.name + "' and shoupiao_zhuangtai = '待收票';select * from gongyingshang;select * from peizhi where type = '核算单位'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var kaipiao_danwei_list = res.result.recordsets[1]
        var shoupiao_danwei_list = res.result.recordsets[2]
        var zongji = 0
        for(var i=0; i<list.length; i++){
          zongji = zongji + (list[i].jiashui_heji * 1)
        }
        zongji = Math.round(zongji * 100) / 100
        console.log(list)
        _this.setData({
          list: list,
          num: list.length,
          kaipiao_danwei_list,
          shoupiao_danwei_list,
          sel_type:'待审核',
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
    if(userInfo.power_mingxi.caigou_shoupiao_add != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../caigou_shoupiaoAdd/caigou_shoupiaoAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  click_view:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var id = _this.data.list[index].id
    if(_this.data.sel_type == '待审核'){
      _this.setData({
        shenhe_id:id,
        xlShow3:true
      })
    }else{
      var userInfo = _this.data.userInfo
      if(userInfo.power_mingxi.caigou_shoupiao_upd != '是'){
        wx.showToast({
          title: '当前账号无权限',
          icon: 'none'
        })
        return;
      }
      wx.navigateTo({
        url: '../caigou_shoupiaoAdd/caigou_shoupiaoAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
      })
    }
  },

  del1:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var id = _this.data.list[index].id
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.caigou_shoupiao_del != '是'){
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
          var sql = "delete from caigou_shoupiao where id=" + id
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
          kaipiao_danwei:'',
          shoupiao_danwei:'',
          shoupiao_zhuangtai:'',
        })
        _this.sel1()
      }else if(click_column == 'gongneng' && new_val == '查看需要我收票'){
        _this.setData({
          xlShow2: false,
          start_date:'',
          stop_date:'',
          kaipiao_danwei:'',
          shoupiao_danwei:'',
          shoupiao_zhuangtai:'',
        })
        _this.shenheShow()
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

  select3: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var id = _this.data.shenhe_id
      var sql = "update caigou_shoupiao set shoupiao_zhuangtai = '" + e.detail.name + "' where id=" + id
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          wx.showToast({
            title: '成功',
            icon: 'none'
          })
          _this.shenheShow()
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
    } else if (e.type == "close") {
      _this.setData({
        xlShow3:false,
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
      name : '采购收票',
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
        caigou_bianhao: list[i].caigou_bianhao,
        shoupiao_danwei: list[i].shoupiao_danwei,
        kaipiao_danwei: list[i].kaipiao_danwei,
        kaipiao_riqi: list[i].kaipiao_riqi,
        kaipiao_jine: list[i].kaipiao_jine,
        kaipiao_shuie: list[i].kaipiao_shuie,
        jiashui_heji: list[i].jiashui_heji,
        beizhu: list[i].beizhu,
        xinxi_tuisong: list[i].xinxi_tuisong,
        shoupiao_zhuangtai: list[i].shoupiao_zhuangtai,
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
    var type = _this.data.type
    if(type == undefined){
      _this.setData({
        start_date:'',
        stop_date:'',
        kaipiao_danwei:'',
        shoupiao_danwei:'',
        shoupiao_zhuangtai:'',
      })
      _this.sel1()
    }else if(type == '需要我收票'){
      _this.setData({
        xlShow2: false,
        start_date:'',
        stop_date:'',
        kaipiao_danwei:'',
        shoupiao_danwei:'',
        shoupiao_zhuangtai:'',
        type:'',
      })
      _this.shenheShow()
    }
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