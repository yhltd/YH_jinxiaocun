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
        name:'报价单号',
        columnName: "bianhao",
        type: "text",
        width: "250rpx",
      },{
        name:'日期',
        columnName: 'riqi',
        type: "text",
        width: "250rpx",
      },{
        name:'客户',
        columnName: 'kehu',
        type: "text",
        width: "250rpx",
      },{
        name:'业务员',
        columnName: 'yewuyuan',
        type: "text",
        width: "250rpx",
      },{
        name:'店铺',
        columnName: 'dianpu',
        type: "text",
        width: "250rpx",
      },{
        name:'销项税率',
        columnName: 'xiaoxiang_shuilv',
        type: "text",
        width: "250rpx",
      },{
        name:'备注',
        columnName: 'beizhu',
        type: "text",
        width: "250rpx",
      },{
        name:'审核',
        columnName: 'shenhe',
        type: "text",
        width: "250rpx",
      },{
        name:'价格等级',
        columnName: 'jiage_dengji',
        type: "text",
        width: "250rpx",
      },{
        name:'审核状态',
        columnName: 'shenhe_zhuangtai',
        type: "text",
        width: "250rpx",
      },{
        name:'商品编号',
        columnName: 'shangpin_bianhao',
        type: "text",
        width: "250rpx",
      },{
        name:'商品名称',
        columnName: 'shangpin_mingcheng',
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
        name:'报价单价',
        columnName: 'baojia_danjia',
        type: "text",
        width: "250rpx",
      },{
        name:'价税小计',
        columnName: 'jiashui_xiaoji',
        type: "text",
        width: "250rpx",
      },{
        name:'建议报价',
        columnName: 'jianyi_baojia',
        type: "text",
        width: "250rpx",
      },{
        name:'需用日期',
        columnName: 'xuyong_riqi',
        type: "text",
        width: "250rpx",
      },{
        name:'报价浮动',
        columnName: 'baojia_fudong',
        type: "text",
        width: "250rpx",
      },{
        name:'行备注',
        columnName: 'beizhu2',
        type: "text",
        width: "250rpx",
      }
    ],
    all_result: ['报价单号', '日期', '客户' ,'业务员','店铺','销项税率','备注','审核','价格等级','审核状态','商品编号','商品名称','规格','材质','技术标准','质保等级','单位','数量','报价单价','报价单价','价税小计','建议报价','需用日期','报价浮动','行备注'],
    result: ['报价单号', '日期', '客户' ,'业务员','店铺','销项税率','备注','审核','价格等级','审核状态','商品编号','商品名称','规格','材质','技术标准','质保等级','单位','数量','报价单价','报价单价','价税小计','建议报价','需用日期','报价浮动','行备注'],
    gongneng_list:[
      {
        name:'查询'
      },{
        name:'刷新'
      },{
        name:'导出Excel'
      },{
        name:'查看需要我审核'
      }
    ],
    shenhe_zhuangtai_list:[
      {name:'审核中'},
      {name:'审核通过'},
      {name:'审核未通过'},
    ],
    shenhe_click_list:[
      {name:'审核通过'},
      {name:'审核未通过'},
    ],
    tiaozhuan_list:[
      {name:'生成销售订单'},
      {name:'编辑'},
      {name:'删除'},
    ],
    quanxuan_value: true,
    start_date: '',
    stop_date: '',
    customer: '',
    shenhe_zhuangtai:'',
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

  choiceDate: function (e) {
    var _this = this
    //e.preventDefault(); 
    var column_name = e.target.dataset.column_name
    console.log(e.detail.value)
    _this.setData({
      [column_name]: e.detail.value
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
    var e = [start_date,stop_date,_this.data.customer,_this.data.shenhe_zhuangtai]
    _this.qxShow()
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    var userInfo = _this.data.userInfo
    var sql = ""
    if(userInfo.power_mingxi.xiaoshou_baojia_sel != '查看个人' && userInfo.power_mingxi.xiaoshou_baojia_sel != '查看全部'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    if(userInfo.power_mingxi.xiaoshou_baojia_sel != '查看个人'){
      sql = "select * from xiaoshou_baojia where riqi >= '" + e[0] + "' and riqi <= '" + e[1] + "' and kehu like '%" + e[2] + "%' and yewuyuan='" + userInfo.name + "';select * from xiaoshou_baojia_item;select * from customer"
    }else if(userInfo.power_mingxi.xiaoshou_baojia_sel != '查看全部'){
      sql = "select * from xiaoshou_baojia where riqi >= '" + e[0] + "' and riqi <= '" + e[1] + "' and kehu like '%" + e[2] + "%';select * from xiaoshou_baojia_item;select * from customer"
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
        var list_item = res.result.recordsets[1]
        var customer_list = res.result.recordsets[2]
        var zongji = 0
        for(var i=list.length-1; i >=0; i--){ 
          var heji = 0
          for(var j=list_item.length-1; j>=0; j--){
            if(list[i].id == list_item[j].baojia_id){
              if(list[i].item == undefined){
                var this_item = []
                list_item[j].jiashui_xiaoji = list_item[j].jiashui_xiaoji * 1
                heji = heji + list_item[j].jiashui_xiaoji
                zongji = zongji + list_item[j].jiashui_xiaoji
                this_item.push(list_item[j])
                list_item.splice(j,1)
                list[i].item = this_item
              }else{
                var this_item = list[i].item
                list_item[j].jiashui_xiaoji = list_item[j].jiashui_xiaoji * 1
                heji = heji + list_item[j].jiashui_xiaoji
                zongji = zongji + list_item[j].jiashui_xiaoji
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
    wx.showLoading({
      title: '请稍候',
      mask : 'true'
    })
    var _this = this
    var userInfo = _this.data.userInfo
    var sql = "select * from xiaoshou_baojia where shenhe like '%" + _this.data.userInfo.name + "%' and shenhe_zhuangtai = '审核中';select * from xiaoshou_baojia_item;select * from customer"
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
          var shenhe_list = list[i].shenhe_list.split(",")
          var shenhe = list[i].shenhe.split(",")
          var panduan = false
          for(var j=0; j<shenhe.length; j++){
            if(shenhe[j] == userInfo.name && shenhe_list[j] != '审核通过'){
              panduan = true
              break;
            }
          }
          if(panduan){
            var heji = 0
            for(var j=list_item.length-1; j>=0; j--){
              if(list[i].id == list_item[j].baojia_id){
                if(list[i].item == undefined){
                  var this_item = []
                  list_item[j].jiashui_xiaoji = list_item[j].jiashui_xiaoji * 1
                  heji = heji + list_item[j].jiashui_xiaoji
                  zongji = zongji + list_item[j].jiashui_xiaoji
                  this_item.push(list_item[j])
                  list_item.splice(j,1)
                  list[i].item = this_item
                }else{
                  var this_item = list[i].item
                  list_item[j].jiashui_xiaoji = list_item[j].jiashui_xiaoji * 1
                  heji = heji + list_item[j].jiashui_xiaoji
                  zongji = zongji + list_item[j].jiashui_xiaoji
                  this_item.push(list_item[j])
                  list_item.splice(j,1)
                  list[i].item = this_item
                }
              }
            }
            list[i].heji = heji
          }else{
            list.splice(i,1)
          }
        }
        zongji = Math.round(zongji * 100) / 100
        console.log(list)
        console.log(list_item)
        _this.setData({
          list: list,
          list_item: list_item,
          num: list.length,
          customer_list,
          sel_type:'待审核',
          zongji
        })
        wx.hideLoading()
      },
      err: res => {
        wx.hideLoading()
        console.log("错误!")
      },
      fail: res => {
        wx.hideLoading()
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
    if(userInfo.power_mingxi.xiaoshou_baojia_add != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../xiaoshou_baojiaAdd/xiaoshou_baojiaAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  click_view:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var id = _this.data.list[index].id
    var shenhe = _this.data.list[index].shenhe
    var shenhe_zhuangtai = _this.data.list[index].shenhe_zhuangtai
    var shenhe_list = _this.data.list[index].shenhe_list
    if(_this.data.sel_type == '待审核'){
      _this.setData({
        shenhe_id:id,
        shenhe:shenhe,
        shenhe_zhuangtai:shenhe_zhuangtai,
        shenhe_list:shenhe_list,
        xlShow3:true
      })
    }else{
      var userInfo = _this.data.userInfo
      if(userInfo.power_mingxi.xiaoshou_baojia_upd != '是'){
        wx.showToast({
          title: '当前账号无权限',
          icon: 'none'
        })
        return;
      }
      wx.navigateTo({
        url: '../xiaoshou_baojia_xiangqing/xiaoshou_baojia_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
      })
      // _this.setData({
      //   caozuo_index:index,
      //   caozuo_id:id,
      //   xlShow4:true
      // })
    }
  },

  del1:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var id = _this.data.list[index].id
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.xiaoshou_baojia_del != '是'){
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
          var sql = "delete from xiaoshou_baojia where id=" + id + ";delete from xiaoshou_baojia_item where baojia_id ='" + id + "'"
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
      var index = _this.data.click_index
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
          shenhe_zhuangtai:'',
        })
        _this.sel1()
      }else if(click_column == 'gongneng' && new_val == '查看需要我审核'){
        _this.setData({
          xlShow2: false,
          start_date:'',
          stop_date:'',
          customer:'',
          shenhe_zhuangtai:'',
        })
        _this.shenheShow()
      }else if(click_column == 'tiaozhuan' && new_val == '生成销售订单'){
        _this.setData({
          xlShow2:false,
        })
        var userInfo = _this.data.userInfo
        if(userInfo.power_mingxi.xiaoshou_dingdan_add != '是'){
          wx.showToast({
            title: '当前账号无权限',
            icon: 'none'
          })
          return;
        }
        wx.navigateTo({
          url: '../xiaoshou_dingdanAdd/xiaoshou_dingdanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + _this.data.list[index].id + "&type=" + JSON.stringify(_this.data.list[index]),
        })
      }else if(click_column == 'tiaozhuan' && new_val == '编辑'){
        _this.setData({
          xlShow2:false,
        })
        var userInfo = _this.data.userInfo
        if(userInfo.power_mingxi.xiaoshou_dingdan_upd != '是'){
          wx.showToast({
            title: '当前账号无权限',
            icon: 'none'
          })
          return;
        }
        wx.navigateTo({
          url: '../xiaoshou_baojiaAdd/xiaoshou_baojiaAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" +_this.data.list[index].id,
        })
      }else if(click_column == 'tiaozhuan' && new_val == '删除'){
        _this.setData({
          xlShow2:false,
        })
        var userInfo = _this.data.userInfo
        if(userInfo.power_mingxi.xiaoshou_dingdan_upd != '是'){
          wx.showToast({
            title: '当前账号无权限',
            icon: 'none'
          })
          return;
        }
        wx.navigateTo({
          url: '../xiaoshou_baojiaAdd/xiaoshou_baojiaAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" +_this.data.list[index].id,
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

  select3: function (e) {
    var _this = this
    if (e.type == "select") { 
      var new_val = e.detail.name
      var name = _this.data.userInfo.name
      var shenhe = _this.data.shenhe.split(",")
      var shenhe_list = _this.data.shenhe_list.split(",")
      var shenhe_zhuangtai = _this.data.shenhe_zhuangtai
      var id = _this.data.shenhe_id
      var panduan = true
      for(var i=0; i<shenhe.length; i++){
        if(shenhe[i] == name){
          shenhe_list[i] = new_val
        }
        if(shenhe_list[i] != '审核通过'){
          panduan = false
        }
      }
      var shenhe_list_new = ""
      var shenhe_zhuangtai_new = shenhe_zhuangtai
      if(panduan){
        shenhe_zhuangtai_new = "审核通过"
      }
      for(var i=0; i<shenhe_list.length; i++){
        if(shenhe_list_new == ""){
          shenhe_list_new = shenhe_list[i]
        }else{
          shenhe_list_new = shenhe_list_new + "," + shenhe_list[i]
        }
      }
      var sql = "update xiaoshou_baojia set shenhe_zhuangtai = '" + shenhe_zhuangtai_new + "',shenhe_list = '" + shenhe_list_new + "' where id=" + id
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          wx.showToast({
            title: '审核成功',
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
        if(userInfo.power_mingxi.xiaoshou_baojia_upd != '是'){
          wx.showToast({
            title: '当前账号无权限',
            icon: 'none'
          })
          return;
        }
        wx.navigateTo({
          url: '../xiaoshou_baojia_xiangqing/xiaoshou_baojia_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
        })
      }else if(new_val == '生成销售订单'){
        _this.setData({
          xlShow4:false,
        })
        var userInfo = _this.data.userInfo
        if(userInfo.power_mingxi.xiaoshou_dingdan_add != '是'){
          wx.showToast({
            title: '当前账号无权限',
            icon: 'none'
          })
          return;
        }
        var index = _this.data.caozuo_index
        wx.navigateTo({
          url: '../xiaoshou_dingdanAdd/xiaoshou_dingdanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + "&type=" + JSON.stringify(_this.data.list[index]),
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
        console.log()
        var print_list = {
          title:'销售报价单',
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
            name:product_list[i].shangpin_mingcheng,
            num:product_list[i].shuliang,
            price:product_list[i].baojia_danjia,
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
          url: '../print_danju_peizhi/print_danju_peizhi' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=1",
        })
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow4:false,
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
      name : '销售报价',
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
          kehu: list[i].kehu,
          yewuyuan: list[i].yewuyuan,
          dianpu: list[i].dianpu,
          xiaoxiang_shuilv: list[i].xiaoxiang_shuilv,
          beizhu: list[i].beizhu,
          shenhe: list[i].shenhe,
          jiage_dengji: list[i].jiage_dengji,
          shenhe_zhuangtai: list[i].shenhe_zhuangtai,
          shangpin_bianhao: list[i].item[j].shangpin_bianhao,
          shangpin_mingcheng: list[i].item[j].shangpin_mingcheng,
          guige: list[i].item[j].guige,
          caizhi: list[i].item[j].caizhi,
          jishu_biaozhun: list[i].item[j].jishu_biaozhun,
          zhibao_dengji: list[i].item[j].zhibao_dengji,
          danwei: list[i].item[j].danwei,
          shuliang: list[i].item[j].shuliang,
          baojia_danjia: list[i].item[j].baojia_danjia,
          jiashui_xiaoji: list[i].item[j].jiashui_xiaoji,
          jianyi_baojia: list[i].item[j].jianyi_baojia,
          xuyong_riqi: list[i].item[j].xuyong_riqi,
          baojia_fudong: list[i].item[j].baojia_fudong,
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
    var type = _this.data.type
    console.log("type:" + type)
    if(type == undefined){
      _this.setData({
        start_date:'',
        stop_date:'',
        customer:'',
        shenhe_zhuangtai:'',
      })
      _this.sel1()
    }else if(type == '需要我审核'){
      _this.setData({
        xlShow2: false,
        start_date:'',
        stop_date:'',
        customer:'',
        shenhe_zhuangtai:'',
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