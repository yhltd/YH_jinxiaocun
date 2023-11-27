// package_ruilida/page/userInfoAdd/userInfoAdd.js
var areaList = require("../../components/data_area.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_show: false,
    ssqShow: false,
    xlShow2: false,
    caigou_body: {
      id:'',
      bianhao:'',
      riqi:'',
      gongyingshang:'',
      dianpu:'',
      jinxiang_shuilv:'',
      beizhu:'',
      shenhe:'',
      shenhe_zhuangtai:'审核中',
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
        lishi_zuidi:'',
        caigou_danjia:'',
        jiashui_xiaoji:'',
        jiaohuo_riqi:'',
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
    var sql = "select * from gongyingshang;select * from peizhi where type = '店铺';select * from (select p.id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item.id as item_id,product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,convert(float,caigou_price) as caigou_price,jinxiang,xiaoxiang,enable,1 as isselect from product as p left join product_item as item on p.id = item.product_id where enable = '是' ) as pro left join (select shangpin_bianma,min(convert(float,caigou_danjia)) as zuidijia from caigou_dingdan_item group by shangpin_bianma) as price on pro.bianhao = price.shangpin_bianma;select * from userInfo;select * from peizhi_shuilv;"
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
        var peizhi_shuilv = res.result.recordsets[4][0]
        var fujia_shuilv = 1
        if(peizhi_shuilv.zhuangtai == '是'){
          fujia_shuilv = fujia_shuilv + (peizhi_shuilv.shuilv / 100)
        }
        console.log(fujia_shuilv)
        for(var i=0; i<product_list.length; i++){
          var jinxiang = product_list[i].jinxiang / 100
          var xiaoxiang = product_list[i].xiaoxiang / 100
          var pifa_bili = product_list[i].pifa_bili / 100
          var lingshou_bili = product_list[i].lingshou_bili / 100
          var dakehu_bili = product_list[i].dakehu_bili / 100
          var caigou_price = product_list[i].caigou_price * 1
          product_list[i].lingshou_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * lingshou_bili)) * 100) / 100
          product_list[i].pifa_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * pifa_bili)) * 100 ) / 100
          product_list[i].dakehu_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * dakehu_bili)) * 100) / 100
        }
        for(var i=0; i<product_list.length; i++){
          if(product_list[i].zuidijia != null){
            product_list[i].caigou_danjia = product_list[i].zuidijia
          }
        }
        _this.setData({
          gongyingshang_list,
          dianpu_list,
          product_list,
          shenhe_list
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
      var sql = "select * from caigou_dingdan where id=" + id + ";select * from caigou_dingdan_item where caigou_id = '" + id + "'"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var caigou_body = res.result.recordsets[0][0]
          var lianxi_list = res.result.recordsets[1]
          _this.setData({
            id,
            caigou_body,
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
      var sql = "select convert(float,SUBSTRING(isnull(max(bianhao),'CG000000'),3,6)) + 1 as bianhao from caigou_dingdan;select * from peizhi where type = '店铺';"
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
          this_bianhao = "CG" + this_bianhao
          console.log(this_bianhao)
          var caigou_body = _this.data.caigou_body
          caigou_body.bianhao = this_bianhao
          caigou_body.riqi = getNowDate()
          caigou_body.shenhe = _this.data.userInfo.shenpi
          var dianpu_list = res.result.recordsets[1]
          if(_this.data.userInfo.dianpu != ''){
            for(var i=0; i<dianpu_list.length; i++){
              if(dianpu_list[i].id == _this.data.userInfo.dianpu){
                caigou_body.dianpu = dianpu_list[i].name
                break;
              }
            }
          }
          _this.setData({
            caigou_body
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
    lianxi_list[product_index].lishi_zuidi = product_list[index].caigou_danjia 
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
      product_show:false
    })
  },

  choiceDate: function (e) {
    var _this = this
    //e.preventDefault(); 
    var column_name = e.target.dataset.column_name
    if(column_name == 'riqi'){
      var caigou_body = _this.data.caigou_body
      caigou_body.riqi = e.detail.value
      _this.setData({
        caigou_body
      })
    }else if(column_name == 'jiaohuo_riqi'){
      var index = e.target.dataset.index
      var lianxi_list = _this.data.lianxi_list
      lianxi_list[index].jiaohuo_riqi = e.detail.value
      _this.setData({
        lianxi_list
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
            lishi_zuidi:'',
            caigou_danjia:'',
            jiashui_xiaoji:'',
            jiaohuo_riqi:'',
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
    var caigou_body = _this.data.caigou_body
    var lianxi_list = _this.data.lianxi_list
    console.log(caigou_body)
    console.log(lianxi_list)
    if(caigou_body.gongyingshang == ''){
      wx.showToast({
        title: '请选择供应商',
        icon: 'none'
      })
      return;
    }
    if(caigou_body.dianpu == ''){
      wx.showToast({
        title: '请选择店铺',
        icon: 'none'
      })
      return;
    }
    if(caigou_body.shenhe == ''){
      wx.showToast({
        title: '请选择审核人',
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
    if(caigou_body.id == ''){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into caigou_dingdan(bianhao,riqi,gongyingshang,dianpu,jinxiang_shuilv,beizhu,shenhe,shenhe_zhuangtai) output inserted.id values('" + caigou_body.bianhao + "','" + caigou_body.riqi + "','" + caigou_body.gongyingshang + "','" + caigou_body.dianpu + "','" + caigou_body.jinxiang_shuilv + "','" + caigou_body.beizhu + "','" + caigou_body.shenhe + "','审核中')"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          caigou_body.id = new_id
          _this.setData({
            caigou_body
          })
          var sql = "insert into caigou_dingdan_item(shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,lishi_zuidi,caigou_danjia,jiashui_xiaoji,jiaohuo_riqi,beizhu,caigou_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].lishi_zuidi + "','" + lianxi_list[i].caigou_danjia + "','" + lianxi_list[i].jiashui_xiaoji + "','" + lianxi_list[i].jiaohuo_riqi +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].lishi_zuidi + "','" + lianxi_list[i].caigou_danjia + "','" + lianxi_list[i].jiashui_xiaoji + "','" + lianxi_list[i].jiaohuo_riqi +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
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
      console.log(caigou_body)
      wx.showLoading({
        title:'保存中'
      })
      if(caigou_body.shenhe_zhuangtai == '审核未通过'){
        caigou_body.shenhe_zhuangtai = "审核中"
      }
      var sql = "update caigou_dingdan set bianhao='" + caigou_body.bianhao + "',riqi='" + caigou_body.riqi + "',gongyingshang='" + caigou_body.gongyingshang + "',dianpu='" + caigou_body.dianpu + "',jinxiang_shuilv='" + caigou_body.jinxiang_shuilv + "',beizhu='" + caigou_body.beizhu + "',shenhe='" + caigou_body.shenhe + "',shenhe_zhuangtai='" + caigou_body.shenhe_zhuangtai + "' where id=" + caigou_body.id
      console.log(caigou_body)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = caigou_body.id
          var sql = "delete from caigou_dingdan_item where caigou_id='" + new_id + "';insert into caigou_dingdan_item(shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,lishi_zuidi,caigou_danjia,jiashui_xiaoji,jiaohuo_riqi,beizhu,caigou_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].lishi_zuidi + "','" + lianxi_list[i].caigou_danjia + "','" + lianxi_list[i].jiashui_xiaoji + "','" + lianxi_list[i].jiaohuo_riqi + "','" + lianxi_list[i].beizhu + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].lishi_zuidi + "','" + lianxi_list[i].caigou_danjia + "','" + lianxi_list[i].jiashui_xiaoji + "','" + lianxi_list[i].jiaohuo_riqi + "','" + lianxi_list[i].beizhu + "','" + new_id + "')"
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
    console.log(_this.data.caigou_body)
    console.log(_this.data.lianxi_list)
    if(index == undefined){
      var caigou_body = _this.data.caigou_body
      caigou_body[column] = new_value
      _this.setData({
        caigou_body
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
      var caigou_body = _this.data.caigou_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        caigou_body[click_column] = new_val
        _this.setData({
          xlShow2: false,
          caigou_body,
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

  file_goto:function(){
    var _this = this
    var type = "采购订单"
    var id = _this.data.caigou_body.id
    console.log(id)
    console.log(type)
    wx.navigateTo({
      url: '../fileUpload/fileUpload?userInfo=' + JSON.stringify(_this.data.userInfo) + "&type=" + type + "&id=" + id,
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