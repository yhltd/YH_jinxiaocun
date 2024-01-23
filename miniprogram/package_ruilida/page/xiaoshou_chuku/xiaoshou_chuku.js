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
        name:'入库编号',
        columnName: "bianhao",
        type: "text",
        width: "250rpx",
      },{
        name:'日期',
        columnName: 'riqi',
        type: "text",
        width: "250rpx",
      },{
        name:'销售单号',
        columnName: 'xiaoshou_id',
        type: "text",
        width: "250rpx",
      },{
        name:'客户',
        columnName: 'kehu',
        type: "text",
        width: "250rpx",
      },{
        name:'店铺',
        columnName: 'dianpu',
        type: "text",
        width: "250rpx",
      },{
        name:'仓库',
        columnName: 'cangku',
        type: "text",
        width: "250rpx",
      },{
        name:'备注',
        columnName: 'beizhu',
        type: "text",
        width: "250rpx",
      },{
        name:'商品编号',
        columnName: 'shangpin_bianma',
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
        name:'材质',
        columnName: 'caizhi',
        type: "text",
        width: "250rpx",
      },{
        name:'技术标准',
        columnName: 'jishu_biaozhun',
        type: "text",
        width: "250rpx",
      },{
        name:'质保等级',
        columnName: 'zhibao_dengji',
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
        name:'销售单价',
        columnName: 'xiaoshou_danjia',
        type: "text",
        width: "250rpx",
      },{
        name:'价税小计',
        columnName: 'jiashui_xiaoji',
        type: "text",
        width: "250rpx",
      },{
        name:'行备注',
        columnName: 'beizhu2',
        type: "text",
        width: "250rpx",
      }
    ],
    all_result: ['入库编号','日期','销售单号','客户','店铺','仓库','备注','商品编号','商品名称','规格','材质','技术标准','质保等级','单位','数量','销售单价','价税小计','行备注'],
    result: ['入库编号','日期','销售单号','客户','店铺','仓库','备注','商品编号','商品名称','规格','材质','技术标准','质保等级','单位','数量','销售单价','价税小计','行备注'],
    gongneng_list:[
      {
        name:'查询'
      },{
        name:'刷新'
      },{
        name:'导出Excel'
      }
    ],
    caozuo_click_list:[
      {name:'修改'},
      {name:'详情'},
      {name:'打印设置'},
      {name:'打印'},
    ],
    quanxuan_value: true,
    start_date: '',
    stop_date: '',
    customer: '',
    tiaozhuan_list:[
      {name:'生成收款单'},
      {name:'生成开票'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var tiaojian = options.tiaojian
    var customer_name = options.customer_name
    if(tiaojian != undefined){
      tiaojian = JSON.parse(tiaojian)
    }
    _this.setData({
      userInfo,
      tiaojian,
      customer_name
    })
    var sql = "select * from product_item"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        var pic_list = {}
        for(var i=0; i<list.length; i++){
          if(list[i].bianhao != ''){
            pic_list[list[i].bianhao] = list[i].image
          }
        }
        _this.setData({
          pic_list
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
    var e = [start_date,stop_date,_this.data.customer]
    _this.qxShow()
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.xiaoshou_chuku_sel != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    var sql = "select * from xiaoshou_chuku where riqi >= '" + e[0] + "' and riqi <= '" + e[1] + "' and kehu like '%" + e[2] + "%';select * from xiaoshou_chuku_item;select * from customer"
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
        var customer_list = res.result.recordsets[2]
        var zongji = 0
        for(var i=list.length-1; i >=0; i--){
          var heji = 0
          for(var j=list_item.length-1; j>=0; j--){
            if(list[i].id == list_item[j].chuku_id){
              if(list[i].item == undefined){
                var this_item = []
                heji = heji + (list_item[j].jiashui_xiaoji * 1)
                zongji = zongji + (list_item[j].jiashui_xiaoji * 1)
                this_item.push(list_item[j])
                list_item.splice(j,1)
                list[i].item = this_item
              }else{
                var this_item = list[i].item
                heji = heji + (list_item[j].jiashui_xiaoji * 1)
                zongji = zongji + (list_item[j].jiashui_xiaoji * 1)
                this_item.push(list_item[j])
                list_item.splice(j,1)
                list[i].item = this_item
              }
            }
          }
          list[i].heji = heji
        }
        zongji = Math.round(zongji * 100) / 100
        console.log(list)
        console.log(list_item)
        _this.setData({
          list: list,
          list_item: list_item,
          num: list.length,
          customer_list,
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
    if(userInfo.power_mingxi.xiaoshou_chuku_add != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../xiaoshou_chukuAdd/xiaoshou_chukuAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  click_view:function(e){
    var _this = this
    var index = e.currentTarget.dataset.index
    var id = _this.data.list[index].id
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.xiaoshou_chuku_sel != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../xiaoshou_chuku_xiangqing/xiaoshou_chuku_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
    })
    // console.log(e.currentTarget.dataset.index)
    // var index = e.currentTarget.dataset.index
    // var id = _this.data.list[index].id

    // _this.setData({
    //   caozuo_index:index,
    //   caozuo_id:id,
    //   xlShow4:true
    // })
  },

  select4: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var id = _this.data.caozuo_id
      if(new_val == '修改'){
        _this.setData({
          xlShow4:false,
        })
        var userInfo = _this.data.userInfo
        if(userInfo.power_mingxi.xiaoshou_chuku_upd != '是'){
          wx.showToast({
            title: '当前账号无权限',
            icon: 'none'
          })
          return;
        }
        wx.navigateTo({
          url: '../xiaoshou_chukuAdd/xiaoshou_chukuAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
        })
      }else if(new_val == '打印'){
        _this.setData({
          xlShow4:false,
        })
        var index = _this.data.caozuo_index
        var list = _this.data.list[index]
        var product_list = _this.data.list[index].item
        console.log(list)
        console.log(product_list)
        var print_list = {
          title:'销售出库单',
          bianhao: list.bianhao,
          riqi: list.riqi,
          kegong: '客户',
          kegong_val: list.kehu
        }
        var product = []
        var num_sum = 0
        var money_sum = 0
        for(var i=0; i<product_list.length; i++){
          var product_item = {
            name:product_list[i].name,
            num:product_list[i].shuliang,
            price:product_list[i].xiaoshou_danjia,
            money:product_list[i].jiashui_xiaoji,
          }
          num_sum = Math.round(((num_sum * 1) + (product_list[i].shuliang * 1)) * 100) / 100
          money_sum = Math.round(((money_sum * 1) + (product_list[i].jiashui_xiaoji * 1)) * 100) / 100
          product.push(product_item)
        }
        print_list.num_sum = num_sum
        print_list.money_sum = money_sum
        print_list.product = product
        console.log(print_list)
        wx.navigateTo({
          url: '../print_danju/print_danju' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&list=" + JSON.stringify(print_list),
        })
      }else if(new_val == '打印设置'){
        _this.setData({
          xlShow4:false,
        })
        wx.navigateTo({
          url: '../print_danju_peizhi/print_danju_peizhi' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=3",
        })
      }
      else if(new_val == '详情'){
        _this.setData({
          xlShow4:false,
        })
        var userInfo = _this.data.userInfo
        if(userInfo.power_mingxi.xiaoshou_chuku_sel != '是'){
          wx.showToast({
            title: '当前账号无权限',
            icon: 'none'
          })
          return;
        }
        wx.navigateTo({
          url: '../xiaoshou_chuku_xiangqing/xiaoshou_chuku_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
        })
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow4:false,
      })
    }
  },

  del1:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var id = _this.data.list[index].id
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.xiaoshou_chuku_del != '是'){
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
          var sql = "delete from xiaoshou_chuku where id=" + id + ";delete from xiaoshou_chuku_item where chuku_id ='" + id + "'"
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
    var index = e.currentTarget.dataset.index
    _this.setData({
      list_xiala: list,
      click_column:column,
      click_index:index,
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
          customer:'',
        })
        _this.sel1()
      }else if(click_column == 'tiaozhuan' && new_val == '生成收款单'){
        _this.setData({
          xlShow2: false,
        })
        var id = _this.data.list[_this.data.click_index].id
        wx.navigateTo({
          url: '../xiaoshou_chuku_xiangqing/xiaoshou_chuku_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + '&type=生成收款单',
        })
      }else if(click_column == 'tiaozhuan' && new_val == '生成开票'){
        _this.setData({
          xlShow2: false,
        })
        var id = _this.data.list[_this.data.click_index].id
        wx.navigateTo({
          url: '../xiaoshou_chuku_xiangqing/xiaoshou_chuku_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + '&type=生成开票',
        })
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
      name : '销售出库',
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
      for(var j=0; j<list[i].item.length; j++){
        item.push({
          bianhao: list[i].bianhao,
          riqi: list[i].riqi,
          xiaoshou_id: list[i].xiaoshou_id,
          kehu: list[i].kehu,
          dianpu: list[i].dianpu,
          cangku: list[i].cangku,
          beizhu: list[i].beizhu,
          shangpin_bianma: list[i].item[j].shangpin_bianma,
          name: list[i].item[j].name,
          guige: list[i].item[j].guige,
          caizhi: list[i].item[j].caizhi,
          jishu_biaozhun: list[i].item[j].jishu_biaozhun,
          zhibao_dengji: list[i].item[j].zhibao_dengji,
          danwei: list[i].item[j].danwei,
          shuliang: list[i].item[j].shuliang,
          xiaoshou_danjia: list[i].item[j].xiaoshou_danjia,
          jiashui_xiaoji: list[i].item[j].jiashui_xiaoji,
          beizhu2: list[i].item[j].beizhu,
        })
      }
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
    var customer_name = _this.data.customer_name
    if(tiaojian != undefined){
      _this.setData(tiaojian)
      _this.setData({
        tiaojian:undefined
      })
    }else if(customer_name != '' && customer_name != undefined){
      _this.setData({
        start_date:'',
        stop_date:'',
        customer:customer_name,
      })
    }else{
      _this.setData({
        start_date:'',
        stop_date:'',
        customer:'',
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