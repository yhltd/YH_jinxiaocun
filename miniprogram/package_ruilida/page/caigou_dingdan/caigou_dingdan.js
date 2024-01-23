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
    caozuo_click_list:[
      {name:'修改'},
      {name:'详情'},
      {name:'打印设置'},
      {name:'打印'},
    ],
    tiaozhuan_list:[
      {name:'生成入库单'},
      {name:'生成付款单'},
      {name:'生成收票'},
    ],
    quanxuan_value: true,
    start_date: '',
    stop_date: '',
    gongyingshang: '',
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
    var chaxun_gongyingshang = options.gongyingshang
    _this.setData({
      userInfo,
      type,
      chaxun_gongyingshang
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
    var e = [start_date,stop_date,_this.data.gongyingshang,_this.data.shenhe_zhuangtai]
    _this.qxShow()
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.caigou_dingdan_sel != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    var sql = "select * from (select id,caigou3.bianhao,riqi,gongyingshang,dianpu,jinxiang_shuilv,beizhu,shenhe,shenhe_list,shenhe_zhuangtai,isnull(ruku_zhuangtai,'未入库') as ruku_zhuangtai,isnull(shoupiao_zhuangtai,'未收票') as shoupiao_zhuangtai,isnull(fukuan_zhuangtai,'未付款') as fukuan_zhuangtai,caigou_danwei,yewuyuan from (select id,caigou2.bianhao,riqi,gongyingshang,dianpu,jinxiang_shuilv,beizhu,shenhe,shenhe_list,shenhe_zhuangtai,ruku_zhuangtai,shoupiao_zhuangtai,caigou_danwei,yewuyuan from (select id,caigou.bianhao,riqi,gongyingshang,dianpu,jinxiang_shuilv,beizhu,shenhe,shenhe_list,shenhe_zhuangtai,ruku_zhuangtai,caigou_danwei,yewuyuan from caigou_dingdan as caigou left join (select bianhao,case when sum(panduan) = 0 then '未入库' when sum(panduan) < count(bianhao) then '部分入库' when count(bianhao) <= sum(panduan) then '全部入库' end as ruku_zhuangtai from (select bianhao,caigou.shangpin_bianma,isnull(caigou.shuliang,0) as caigou_shuliang,isnull(ruku.shuliang,0) as ruku_shuliang,case when convert(float,isnull(caigou.shuliang,0)) > convert(float,isnull(ruku.shuliang,0)) then 0 else 1 end as panduan from(select bianhao,shangpin_bianma,shuliang from caigou_dingdan_item as item left join caigou_dingdan as dingdan on item.caigou_id = dingdan.id) as caigou left join (select shangpin_bianma,shuliang,ruku_id,caigou_id from caigou_ruku_item as ruku left join (select * from caigou_ruku where isnull(caigou_id,'') != '') as ruku_dan on ruku.ruku_id = ruku_dan.id where isnull(caigou_id,'') != '') as ruku on caigou.bianhao = ruku.caigou_id and caigou.shangpin_bianma = ruku.shangpin_bianma) as ruku group by bianhao) as ruku on caigou.bianhao = ruku.bianhao) as caigou2 left join (select bianhao,case when isnull(shoupiao_money,0) = 0 then '未收票' when isnull(shoupiao_money,0) < isnull(caigou_money,0) then '部分收票' when isnull(shoupiao_money,0) >= isnull(caigou_money,0) then '全部收票' end as shoupiao_zhuangtai from(select bianhao,sum(convert(float,isnull(jiashui_xiaoji,0))) as caigou_money from caigou_dingdan_item as item left join caigou_dingdan as caigou on caigou.id = item.caigou_id group by bianhao) as caigou left join(select caigou_bianhao,sum(convert(float,isnull(kaipiao_jine,0)) + convert(float,isnull(kaipiao_shuie,0))) as shoupiao_money from caigou_shoupiao group by caigou_bianhao) as shoupiao on caigou.bianhao = shoupiao.caigou_bianhao) as shoupiao on caigou2.bianhao = shoupiao.bianhao) as caigou3 left join (select bianhao,isnull(caigou_money,0) as caigou_money,isnull(money,0) as shoufu_money,case when isnull(money,0)  = 0 then '未付款' when isnull(caigou_money,0) > isnull(money,0)  then '部分付款' when isnull(caigou_money,0) <= isnull(money,0) then '全部付款' end as fukuan_zhuangtai from (select bianhao,sum(convert(float,isnull(jiashui_xiaoji,0))) as caigou_money from caigou_dingdan_item as item left join caigou_dingdan as caigou on caigou.id = item.caigou_id group by bianhao) as caigou left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi group by danju_bianhao) as shoufukuan on caigou.bianhao = shoufukuan.danju_bianhao) as fukuan on caigou3.bianhao = fukuan.bianhao) as caigou where riqi >= '" + e[0] + "' and riqi <= '" + e[1] + "' and gongyingshang like '%" + e[2] + "%' and shenhe_zhuangtai like '%" + e[3] + "%';select * from caigou_dingdan_item;select * from gongyingshang"
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
        var gongyingshang_list = res.result.recordsets[2]
        var zongji = 0
        for(var i=list.length-1; i >=0; i--){
          var heji = 0
          for(var j=list_item.length-1; j>=0; j--){
            if(list[i].id == list_item[j].caigou_id){
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
          gongyingshang_list,
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

  shenheShow: function (e) {
    var _this = this
    var userInfo = _this.data.userInfo
    var sql = "select * from (select id,caigou3.bianhao,riqi,gongyingshang,dianpu,jinxiang_shuilv,beizhu,shenhe,shenhe_list,shenhe_zhuangtai,ruku_zhuangtai,shoupiao_zhuangtai,fukuan_zhuangtai,caigou_danwei,yewuyuan from (select id,caigou2.bianhao,riqi,gongyingshang,dianpu,jinxiang_shuilv,beizhu,shenhe,shenhe_list,shenhe_zhuangtai,ruku_zhuangtai,shoupiao_zhuangtai,caigou_danwei,yewuyuan from (select id,caigou.bianhao,riqi,gongyingshang,dianpu,jinxiang_shuilv,beizhu,shenhe,shenhe_list,shenhe_zhuangtai,ruku_zhuangtai,caigou_danwei,yewuyuan from caigou_dingdan as caigou left join (select bianhao,case when sum(panduan) = 0 then '未入库' when sum(panduan) < count(bianhao) then '部分入库' when count(bianhao) <= sum(panduan) then '全部入库' end as ruku_zhuangtai from (select bianhao,caigou.shangpin_bianma,isnull(caigou.shuliang,0) as caigou_shuliang,isnull(ruku.shuliang,0) as ruku_shuliang,case when convert(float,isnull(caigou.shuliang,0)) > convert(float,isnull(ruku.shuliang,0)) then 0 else 1 end as panduan from(select bianhao,shangpin_bianma,shuliang from caigou_dingdan_item as item left join caigou_dingdan as dingdan on item.caigou_id = dingdan.id) as caigou left join (select shangpin_bianma,shuliang,ruku_id,caigou_id from caigou_ruku_item as ruku left join (select * from caigou_ruku where isnull(caigou_id,'') != '') as ruku_dan on ruku.ruku_id = ruku_dan.id where isnull(caigou_id,'') != '') as ruku on caigou.bianhao = ruku.caigou_id and caigou.shangpin_bianma = ruku.shangpin_bianma) as ruku group by bianhao) as ruku on caigou.bianhao = ruku.bianhao) as caigou2 left join (select bianhao,case when isnull(shoupiao_money,0) = 0 then '未收票' when isnull(shoupiao_money,0) < isnull(caigou_money,0) then '部分收票' when isnull(shoupiao_money,0) >= isnull(caigou_money,0) then '全部收票' end as shoupiao_zhuangtai from(select bianhao,sum(convert(float,isnull(jiashui_xiaoji,0))) as caigou_money from caigou_dingdan_item as item left join caigou_dingdan as caigou on caigou.id = item.caigou_id group by bianhao) as caigou left join(select caigou_bianhao,sum(convert(float,isnull(kaipiao_jine,0)) + convert(float,isnull(kaipiao_shuie,0))) as shoupiao_money from caigou_shoupiao group by caigou_bianhao) as shoupiao on caigou.bianhao = shoupiao.caigou_bianhao) as shoupiao on caigou2.bianhao = shoupiao.bianhao) as caigou3 left join (select bianhao,isnull(caigou_money,0) as caigou_money,isnull(money,0) as shoufu_money,case when isnull(money,0)  = 0 then '未付款' when isnull(caigou_money,0) > isnull(money,0)  then '部分付款' when isnull(caigou_money,0) <= isnull(money,0) then '全部付款' end as fukuan_zhuangtai from (select bianhao,sum(convert(float,isnull(jiashui_xiaoji,0))) as caigou_money from caigou_dingdan_item as item left join caigou_dingdan as caigou on caigou.id = item.caigou_id group by bianhao) as caigou left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi group by danju_bianhao) as shoufukuan on caigou.bianhao = shoufukuan.danju_bianhao) as fukuan on caigou3.bianhao = fukuan.bianhao) as caigou where shenhe like '%" + _this.data.userInfo.name + "%' and shenhe_zhuangtai='审核中';select * from caigou_dingdan_item;select * from gongyingshang"
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
        var gongyingshang_list = res.result.recordsets[2]
        // for(var i=list.length-1; i >=0; i--){
        //   for(var j=list_item.length-1; j>=0; j--){
        //     if(list[i].id == list_item[j].caigou_id){
        //       if(list[i].item == undefined){
        //         var this_item = []
        //         this_item.push(list_item[j])
        //         list_item.splice(j,1)
        //         list[i].item = this_item
        //       }else{
        //         var this_item = list[i].item
        //         this_item.push(list_item[j])
        //         list_item.splice(j,1)
        //         list[i].item = this_item
        //       }
        //     }
        //   }
        // }
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
              if(list[i].id == list_item[j].caigou_id){
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
          }else{
            list.splice(i,1)
          }
        }

        console.log(list)
        console.log(list_item)
        zongji = Math.round(zongji * 100) / 100
        _this.setData({
          list: list,
          list_item: list_item,
          num: list.length,
          gongyingshang_list,
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
    if(userInfo.power_mingxi.caigou_dingdan_add != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../caigou_dingdanAdd/caigou_dingdanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  click_view:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var id = _this.data.list[index].id
    var userInfo = _this.data.userInfo
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
      var _this = this
      var index = e.currentTarget.dataset.index
      var id = _this.data.list[index].id
      var userInfo = _this.data.userInfo
      if(userInfo.power_mingxi.caigou_dingdan_sel != '是'){
        wx.showToast({
          title: '当前账号无权限',
          icon: 'none'
        })
        return;
      }
      wx.navigateTo({
        url: '../caigou_dingdan_xiangqing/caigou_dingdan_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
      })
      // _this.setData({
      //   caozuo_index:index,
      //   caozuo_id:id,
      //   xlShow4:true
      // })
    }
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

  select4: function (e) {
    var _this = this
    var userInfo = _this.data.userInfo
    if (e.type == "select") {
        var new_val = e.detail.name
        var id = _this.data.caozuo_id
        if(new_val == '修改'){
          _this.setData({
            xlShow4:false,
          })
          if(userInfo.power_mingxi.caigou_dingdan_upd != '是'){
          wx.showToast({
            title: '当前账号无权限',
            icon: 'none'
          })
          return;
        }
        wx.navigateTo({
          url: '../caigou_dingdanAdd/caigou_dingdanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
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
          title:'采购订单',
          bianhao: list.bianhao,
          riqi: list.riqi,
          kegong: '供应商',
          kegong_val: list.gongyingshang
        }
        var product = []
        var num_sum = 0
        var money_sum = 0
        for(var i=0; i<product_list.length; i++){
          var product_item = {
            name:product_list[i].name,
            num:product_list[i].shuliang,
            price:product_list[i].caigou_danjia,
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
          url: '../print_danju_peizhi/print_danju_peizhi' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=4",
        })
      }
      else if(new_val = '详情'){
        _this.setData({
          xlShow4:false,
        })
        var userInfo = _this.data.userInfo
        if(userInfo.power_mingxi.caigou_dingdan_sel != '是'){
          wx.showToast({
            title: '当前账号无权限',
            icon: 'none'
          })
          return;
        }
        wx.navigateTo({
          url: '../caigou_dingdan_xiangqing/caigou_dingdan_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
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
    if(userInfo.power_mingxi.caigou_dingdan_del != '是'){
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
          var sql = "delete from caigou_dingdan where id=" + id + ";delete from caigou_dingdan_item where caigou_id ='" + id + "'"
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
          gongyingshang:'',
          shenhe_zhuangtai:'',
        })
        _this.sel1()
      }else if(click_column == 'gongneng' && new_val == '查看需要我审核'){
        _this.setData({
          xlShow2: false,
          start_date:'',
          stop_date:'',
          gongyingshang:'',
          shenhe_zhuangtai:'',
        })
        _this.shenheShow()
      }else if(click_column == 'tiaozhuan' && new_val == '生成入库单'){
        _this.setData({
          xlShow2: false,
        })
        var id = _this.data.list[_this.data.click_index].id
        wx.navigateTo({
          url: '../caigou_dingdan_xiangqing/caigou_dingdan_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + '&type=生成入库单',
        })
      }else if(click_column == 'tiaozhuan' && new_val == '生成付款单'){
        _this.setData({
          xlShow2: false,
        })
        var id = _this.data.list[_this.data.click_index].id
        wx.navigateTo({
          url: '../caigou_dingdan_xiangqing/caigou_dingdan_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + '&type=生成付款单',
        })
      }else if(click_column == 'tiaozhuan' && new_val == '生成收票'){
        _this.setData({
          xlShow2: false,
        })
        var id = _this.data.list[_this.data.click_index].id
        wx.navigateTo({
          url: '../caigou_dingdan_xiangqing/caigou_dingdan_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + '&type=生成收票',
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
      var sql = "update caigou_dingdan set shenhe_zhuangtai = '" + e.detail.name + "',shenhe_list = '" + shenhe_list_new + "' where id=" + id
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
      name : '采购订单',
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
          jiaohuo_riqi: list[i].item[j].jiaohuo_riqi,
          gongyingshang: list[i].gongyingshang,
          dianpu: list[i].dianpu,
          shangpin_bianhao: list[i].item[j].shangpin_bianma,
          name: list[i].item[j].name,
          guige: list[i].item[j].guige,
          danwei: list[i].item[j].danwei,
          shuliang: list[i].item[j].shuliang,
          caigou_danjia: list[i].item[j].caigou_danjia,
          jiashui_xiaoji: list[i].item[j].jiashui_xiaoji,
          beizhu: list[i].item[j].beizhu,
          beizhu2: list[i].beizhu,
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
    if(type == undefined){
      if(_this.data.chaxun_gongyingshang != '' && _this.data.chaxun_gongyingshang != undefined){
        var gongyingshang = _this.data.chaxun_gongyingshang
        _this.setData({
          start_date:'',
          stop_date:'',
          gongyingshang:gongyingshang,
          shenhe_zhuangtai:'',
          chaxun_gongyingshang:'',
        })
      }else{
        _this.setData({
          start_date:'',
          stop_date:'',
          gongyingshang:'',
          shenhe_zhuangtai:'',
        })
      }
      _this.sel1()
    }else if(type == '需要我审核'){
      _this.setData({
        xlShow2: false,
        start_date:'',
        stop_date:'',
        gongyingshang:'',
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