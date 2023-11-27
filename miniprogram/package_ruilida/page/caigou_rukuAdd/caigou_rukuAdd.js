// package_ruilida/page/userInfoAdd/userInfoAdd.js
var areaList = require("../../components/data_area.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minDate: new Date(2000, 1, 1).getTime(),
    maxDate: new Date(2099, 12, 31).getTime(),
    currentDate: new Date().getTime(),
    caigou_show: false,
    product_show: false,
    ssqShow: false,
    xlShow2: false,
    ruku_body: {
      id:'',
      bianhao:'',
      riqi:'',
      caigou_id:'',
      gongyingshang:'',
      dianpu:'',
      cangku:'',
      beizhu:'',
    },
    lianxi_list:[
      {
        id:'',
        shangpin_bianma:'',
        name:'',
        guige:'',
        caizhi:'',
        jishu_biaozhun:'',
        zhibao_dengji:'',
        danwei:'',
        shuliang:'',
        caigou_danjia:'',
        jiashui_xiaoji:'',
        beizhu:'',
      }
    ],
    type:'',
    name:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    console.log(areaList.list)
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo,
      areaList: areaList.list
    })
    var id = options.id
    var sql = "select * from gongyingshang;select * from peizhi where type = '店铺';select * from (select p.id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item.id as item_id,product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,convert(float,caigou_price) as caigou_price,jinxiang,xiaoxiang,enable,1 as isselect from product as p left join product_item as item on p.id = item.product_id where enable = '是' ) as pro left join (select shangpin_bianma,min(convert(float,caigou_danjia)) as zuidijia from caigou_dingdan_item group by shangpin_bianma) as price on pro.bianhao = price.shangpin_bianma;select * from userInfo;select * from peizhi where type = '仓库';"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var gongyingshang_list = res.result.recordsets[0]
        var dianpu_list = res.result.recordsets[1]
        var product_list = res.result.recordsets[2]
        var shenhe_list = res.result.recordsets[3]
        var cangku_list = res.result.recordsets[4]
        for(var i=0; i<product_list.length; i++){
          if(product_list[i].zuidijia != null){
            product_list[i].caigou_danjia = product_list[i].zuidijia
          }
        }
        _this.setData({
          gongyingshang_list,
          dianpu_list,
          product_list,
          shenhe_list,
          cangku_list
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
    if(id != null && id != undefined){
      var sql = "select * from caigou_ruku where id=" + id + ";select * from caigou_ruku_item where ruku_id = '" + id + "'"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var ruku_body = res.result.recordsets[0][0]
          var lianxi_list = res.result.recordsets[1]
          _this.setData({
            id,
            ruku_body,
          })
          if(lianxi_list.length != 0){
            _this.setData({
              lianxi_list,
            })
          }
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
    }else{
      var sql = "select convert(float,SUBSTRING(isnull(max(bianhao),'RK000000'),3,6)) + 1 as bianhao from caigou_ruku;select * from peizhi where type = '店铺';select * from peizhi where type = '仓库';"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var max_bianhao = res.result.recordsets[0][0].bianhao
          var this_bianhao = PrefixInteger(max_bianhao,6)
          console.log(this_bianhao)
          this_bianhao = "RK" + this_bianhao
          console.log(this_bianhao)
          var ruku_body = _this.data.ruku_body
          ruku_body.bianhao = this_bianhao
          ruku_body.riqi = getNowDate()
          var dianpu_list = res.result.recordsets[1]
          if(_this.data.userInfo.dianpu != ''){
            for(var i=0; i<dianpu_list.length; i++){
              if(dianpu_list[i].id == _this.data.userInfo.dianpu){
                ruku_body.dianpu = dianpu_list[i].name
                break;
              }
            }
          }
          var cangku_list = res.result.recordsets[2]
          if(_this.data.userInfo.dianpu != ''){
            for(var i=0; i<cangku_list.length; i++){
              if(cangku_list[i].id == _this.data.userInfo.cangku){
                ruku_body.cangku = cangku_list[i].name
                break;
              }
            }
          }
          _this.setData({
            ruku_body
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
    }
  },

  caigou_click:function(){
    var _this = this
    var sql = "select *,1 as isselect from caigou_dingdan;select * from caigou_dingdan_item;"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordsets[0]
        var list_item = res.result.recordsets[1]
        for(var i=list.length-1; i >=0; i--){
          for(var j=list_item.length-1; j>=0; j--){
            if(list[i].id == list_item[j].caigou_id){
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
        console.log(list)
        console.log(list_item)
        _this.setData({
          caigou_list: list,
          caigou_show: true,
          start_date: '',
          stop_date: '',
          gongyingshang: '',
        })
      },
      err: res => {
        wx.showToast({
          title: '错误！',
          icon: 'none',
          duration: 3000
        })
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
    _this.setData({
      caigou_show: true
    })
  },

  sel_caigou:function(){
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    var gongyingshang = _this.data.gongyingshang
    var caigou_list = _this.data.caigou_list
    if(start_date == ''){
      start_date = "1900-01-01"
    }
    if(stop_date == ''){
      stop_date = "2100-12-31"
    }
    for(var i=0; i<caigou_list.length; i++){
      var panduan = true
      if(!(caigou_list[i].riqi >= start_date && caigou_list[i].riqi <= start_date)){
        panduan = false
      }
      if(gongyingshang != ''){
        if(caigou_list[i].gongyingshang.indexOf(gongyingshang) == -1){
          panduan = false
        }
      }
      if(panduan){
        caigou_list[i].isselect = 1
      }else{
        caigou_list[i].isselect = 0
      }
    }
    _this.setData({
      caigou_list
    })
  },

  caigou_select:function(e){
    var _this = this
    console.log(e)
    var this_index = e.currentTarget.dataset.index
    var caigou_list = _this.data.caigou_list[this_index]
    var ruku_body = _this.data.ruku_body
    ruku_body.caigou_id = caigou_list.bianhao
    ruku_body.gongyingshang = caigou_list.gongyingshang
    ruku_body.dianpu = caigou_list.dianpu
    var lianxi_list = caigou_list.item
    _this.setData({
      ruku_body,
      lianxi_list,
    })
    _this.qxShow()
  },

  product_select:function(e){
    var _this = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    console.log(index)
    var product_list = _this.data.product_list
    for(var i=0; i< product_list.length; i++){
      product_list[i].isselect = 1
    }
    _this.setData({
      product_index: index,
      product_show: true,
      product_list,
      type:'',
      name:'',
    })
  },

  sel_product:function(){
    var _this = this
    var product_list = _this.data.product_list
    var type = _this.data.type
    var name = _this.data.name
    for(var i=0; i<product_list.length; i++){
      if(type == '' && name == ''){
        product_list[i].isselect = 1
      }else if(type != '' && name == ''){
        if(product_list[i].type.indexOf(type) != -1){
          product_list[i].isselect = 1
        }else{
          product_list[i].isselect = 0
        }
      }else if(type == '' && name != ''){
        if(product_list[i].name.indexOf(name) != -1){
          product_list[i].isselect = 1
        }else{
          product_list[i].isselect = 0
        }
      }else if(type != '' && name != ''){
        if(product_list[i].type.indexOf(type) != -1 && product_list[i].name.indexOf(name) != -1){
          product_list[i].isselect = 1
        }else{
          product_list[i].isselect = 0
        }
      }
    }
    _this.setData({
      product_list
    })
  },

  product_click:function(e){
    var _this = this
    var index = e.currentTarget.dataset.index
    var product_index = _this.data.product_index
    var lianxi_list = _this.data.lianxi_list
    var product_list = _this.data.product_list
    lianxi_list[product_index].shangpin_bianma = product_list[index].bianhao
    lianxi_list[product_index].name = product_list[index].name
    lianxi_list[product_index].guige = product_list[index].guige
    lianxi_list[product_index].caizhi = product_list[index].caizhi
    lianxi_list[product_index].jishu_biaozhun = product_list[index].jishu_biaozhun
    lianxi_list[product_index].zhibao_dengji = product_list[index].zhibao_dengji
    lianxi_list[product_index].danwei = product_list[index].danwei
    lianxi_list[product_index].caigou_danjia = product_list[index].caigou_danjia
    if(lianxi_list[product_index].caigou_danjia != '' && lianxi_list[product_index].shuliang != ''){
      lianxi_list[product_index].jiashui_xiaoji = Math.round(lianxi_list[product_index].caigou_danjia * lianxi_list[product_index].shuliang * 100) / 100
    }
    _this.setData({
      lianxi_list
    })
    _this.qxShow()
    console.log(index)
  },

  qxShow:function(){
    var _this = this
    _this.setData({
      xlShow2:false,
      ssqShow:false,
      product_show:false,
      caigou_show:false
    })
  },

  choiceDate: function (e) {
    var _this = this
    //e.preventDefault(); 
    var column_name = e.target.dataset.column_name
    if(column_name == 'riqi'){
      var ruku_body = _this.data.ruku_body
      ruku_body.riqi = e.detail.value
      _this.setData({
        ruku_body
      })
    }
    console.log(e.detail.value)
  },

  add_lianxiren:function(){
    var _this = this
    console.log(_this.data.lianxi_list)
    wx.showModal({
      title: '提示',
      content: '确认增加一条商品信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var list = _this.data.lianxi_list
          list.push({
            id:'',
            shangpin_bianma:'',
            name:'',
            guige:'',
            caizhi:'',
            jishu_biaozhun:'',
            zhibao_dengji:'',
            danwei:'',
            shuliang:'',
            caigou_danjia:'',
            jiashui_xiaoji:'',
            beizhu:'',
          })
          _this.setData({
            lianxi_list: list
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  del_lianxiren:function(e){
    var _this = this
    console.log(e)
    var index = e.target.dataset.index
    wx.showModal({
      title: '提示',
      content: '确认删除第'+ (index*1 + 1) +'条商品信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var list = _this.data.lianxi_list
          console.log()
          list.splice(index,1)
          console.log(list)
          _this.setData({
            lianxi_list: list
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  save:function(){
    var _this = this
    var ruku_body = _this.data.ruku_body
    var lianxi_list = _this.data.lianxi_list
    console.log(ruku_body)
    console.log(lianxi_list)
    if(ruku_body.gongyingshang == ''){
      wx.showToast({
        title: '请选择供应商',
        icon: 'none'
      })
      return;
    }
    if(ruku_body.dianpu == ''){
      wx.showToast({
        title: '请选择店铺',
        icon: 'none'
      })
      return;
    }
    if(ruku_body.cangku == ''){
      wx.showToast({
        title: '请选择仓库',
        icon: 'none'
      })
      return;
    }
    for(var i=0; i<lianxi_list.length; i++){
      if(lianxi_list[i].shangpin_bianma == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未选择商品',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].shuliang == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写数量',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].caigou_danjia == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写采购单价',
          icon: 'none'
        })
        return;
      }
    }
    if(ruku_body.id == ''){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into caigou_ruku(bianhao,riqi,caigou_id,gongyingshang,dianpu,cangku,beizhu) output inserted.id values('" + ruku_body.bianhao + "','" + ruku_body.riqi + "','" + ruku_body.caigou_id + "','" + ruku_body.gongyingshang + "','" + ruku_body.dianpu + "','" + ruku_body.cangku + "','" + ruku_body.beizhu + "')"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          ruku_body.id = new_id
          _this.setData({
            ruku_body
          })
          var sql = "insert into caigou_ruku_item(shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,caigou_danjia,jiashui_xiaoji,beizhu,ruku_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].caigou_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].caigou_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
            }
          }
          sql = sql + sql2
          console.log(sql)
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              wx.hideLoading()
              wx.showToast({
                title: '保存成功',
                icon: 'none'
              })
              setTimeout(function () {
                _this.back()
              }, 2000)
            },
            err: res => {
              wx.hideLoading()
              wx.showToast({
                title: '错误！',
                icon: 'none',
                duration: 3000
              })
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
        err: res => {
          wx.hideLoading()
          wx.showToast({
            title: '错误!',
            icon: 'none',
            duration: 3000
          })
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
    }else{
      console.log(ruku_body)
      wx.showLoading({
        title:'保存中'
      })
      var sql = "update caigou_ruku set bianhao='" + ruku_body.bianhao + "',riqi='" + ruku_body.riqi + "',caigou_id='" + ruku_body.caigou_id + "',gongyingshang='" + ruku_body.gongyingshang + "',dianpu='" + ruku_body.dianpu + "',cangku='" + ruku_body.cangku + "',beizhu='" + ruku_body.beizhu + "' where id=" + ruku_body.id
      console.log(ruku_body)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = ruku_body.id
          var sql = "delete from caigou_ruku_item where ruku_id='" + new_id + "';insert into caigou_ruku_item(shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,caigou_danjia,jiashui_xiaoji,beizhu,ruku_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].caigou_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].caigou_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
            }
          }
          sql = sql + sql2
          console.log(sql)
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              wx.hideLoading()
              wx.showToast({
                title: '保存成功',
                icon: 'none'
              })
              setTimeout(function () {
                _this.back()
              }, 2000)
            },
            err: res => {
              wx.hideLoading()
              wx.showToast({
                title: '错误！',
                icon: 'none',
                duration: 3000
              })
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
        err: res => {
          wx.hideLoading()
          wx.showToast({
            title: '错误!',
            icon: 'none',
            duration: 3000
          })
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
    }
    

  },

  onInput_text(e){
    var _this = this
    var new_value = e.detail.value
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    _this.setData({
      [column]: new_value
    })
  },

  onInput(e){
    console.log(e)
    var _this = this
    var new_value = e.detail
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    console.log(index)
    console.log(column)
    console.log(_this.data.ruku_body)
    console.log(_this.data.lianxi_list)
    if(index == undefined){
      var ruku_body = _this.data.ruku_body
      ruku_body[column] = new_value
      _this.setData({
        ruku_body
      })
    }else{
      var lianxi_list = _this.data.lianxi_list
      lianxi_list[index][column] = new_value
      if(lianxi_list[index].caigou_danjia != '' && lianxi_list[index].shuliang != ''){
        lianxi_list[index].jiashui_xiaoji = Math.round(lianxi_list[index].caigou_danjia * lianxi_list[index].shuliang * 100) / 100
      }
      _this.setData({
        lianxi_list
      })
    }
  },

  back:function(){
    var _this = this
    wx.navigateBack({
      delta: 1
    })
  },

  xiala_show: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    console.log('下标：', e.currentTarget.dataset.index)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    var index = e.currentTarget.dataset.index
    _this.setData({
      list_xiala: list,
      click_column:column,
      click_index: index
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
      var click_index = _this.data.click_index
      var ruku_body = _this.data.ruku_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        ruku_body[click_column] = new_val
        _this.setData({
          xlShow2: false,
          ruku_body,
        })
      }else if(click_index == 'cx'){
        _this.setData({
          xlShow2: false,
          [click_column]: new_val,
        })
      }else{
        lianxi_list[click_index][click_column] = new_val
        _this.setData({
          xlShow2: false,
          lianxi_list,
        })
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },

  qxShow22: function () {
    var _this = this
    _this.setData({
      rqxzShow2: false,
    })
  },

  selRIQI2: function (e) {
    var _this = this
    console.log(e)
    var this_column = e.currentTarget.dataset.column
    _this.setData({
      rqxzShow2: true,
      click_column: this_column
    })
  },

  onInputDate(event) {
    var _this = this
    _this.setData({
      currentDate: event.detail,
    });
  },

  onInput22: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())

    var riqi = Y + M + D
    var this_column = _this.data.click_column
    _this.setData({
      [this_column]: riqi
    });
    _this.qxShow22()
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

function PrefixInteger(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

function getNowDate() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }