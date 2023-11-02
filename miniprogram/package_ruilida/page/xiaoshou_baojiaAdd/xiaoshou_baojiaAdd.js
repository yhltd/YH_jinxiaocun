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
    baojia_body: {
      id:'',
      bianhao:'',
      riqi:'',
      kehu:'',
      yewuyuan:'',
      dianpu:'',
      xiaoxiang_shuilv:'',
      beizhu:'',
      shenhe:'',
      jiage_dengji:'',
    },
    lianxi_list:[
      {
        id:'',
        shangpin_bianhao:'',
        shangpin_mingcheng:'',
        guige:'',
        caizhi:'',
        jishu_biaozhun:'',
        zhibao_dengji:'',
        danwei:'',
        shuliang:'',
        baojia_danjia:'',
        jiashui_xiaoji:'',
        jianyi_baojia:'',
        xuyong_riqi:'',
        baojia_fudong:'',
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
    var sql = "select * from customer;select * from (select p.id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item.id as item_id,product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,convert(float,caigou_price) as caigou_price,jinxiang,xiaoxiang,enable,1 as isselect from product as p left join product_item as item on p.id = item.product_id where enable = '是' ) as pro left join (select shangpin_bianma,min(convert(float,caigou_danjia)) as zuidijia from caigou_dingdan_item group by shangpin_bianma) as price on pro.bianhao = price.shangpin_bianma;select * from peizhi where type = '店铺';select * from userInfo;"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var kehu_list = res.result.recordsets[0]
        var product_list = res.result.recordsets[1]
        var dianpu_list = res.result.recordsets[2]
        var shenhe_list = res.result.recordsets[3]
        var yewuyuan_list = res.result.recordsets[3]
        for(var i=0; i<product_list.length; i++){
          if(product_list[i].zuidijia != null){
            product_list[i].caigou_danjia = product_list[i].zuidijia
          }
        }
        _this.setData({
          kehu_list,
          product_list,
          dianpu_list,
          shenhe_list,
          yewuyuan_list
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
      var sql = "select * from xiaoshou_baojia where id=" + id + ";select * from xiaoshou_baojia_item where baojia_id = '" + id + "'"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var baojia_body = res.result.recordsets[0][0]
          var lianxi_list = res.result.recordsets[1]
          _this.setData({
            id,
            baojia_body,
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
      var sql = "select convert(float,SUBSTRING(isnull(max(bianhao),'BJ000000'),3,6)) + 1 as bianhao from xiaoshou_baojia"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var max_bianhao = res.result.recordset[0].bianhao
          var this_bianhao = PrefixInteger(max_bianhao,6)
          console.log(this_bianhao)
          this_bianhao = "BJ" + this_bianhao
          console.log(this_bianhao)
          var baojia_body = _this.data.baojia_body
          baojia_body.bianhao = this_bianhao
          baojia_body.riqi = getNowDate()
          baojia_body.yewuyuan = _this.data.userInfo.name
          baojia_body.shenhe = _this.data.userInfo.shenpi
          _this.setData({
            baojia_body
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
    var jiage_dengji = _this.data.baojia_body.jiage_dengji
    if(jiage_dengji == '' || jiage_dengji == null || jiage_dengji == undefined){
      wx.showToast({
        title: '未读取到客户价格等级，请选择客户后再试',
        icon: 'none'
      })
      return;
    }
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
    var baojia_body = _this.data.baojia_body
    lianxi_list[product_index].shangpin_bianhao = product_list[index].bianhao
    lianxi_list[product_index].shangpin_mingcheng = product_list[index].name
    lianxi_list[product_index].guige = product_list[index].guige
    lianxi_list[product_index].caizhi = product_list[index].caizhi
    lianxi_list[product_index].jishu_biaozhun = product_list[index].jishu_biaozhun
    lianxi_list[product_index].zhibao_dengji = product_list[index].zhibao_dengji
    lianxi_list[product_index].danwei = product_list[index].danwei

    if(baojia_body.jiage_dengji == '零售价格'){
      lianxi_list[product_index].jianyi_baojia = product_list[index].lingshou_price
      if(lianxi_list[product_index].baojia_fudong == ''){
        lianxi_list[product_index].baojia_fudong = 100
        lianxi_list[product_index].baojia_danjia = product_list[index].lingshou_price
      }else{
        lianxi_list[product_index].baojia_danjia = Math.round((product_list[index].lingshou_price * lianxi_list[product_index].baojia_fudong / 100) * 100) / 100
      }
    }else if(baojia_body.jiage_dengji == '批发价格'){
      lianxi_list[product_index].jianyi_baojia = product_list[index].pifa_price
      if(lianxi_list[product_index].baojia_fudong == ''){
        lianxi_list[product_index].baojia_fudong = 100
        lianxi_list[product_index].baojia_danjia = product_list[index].pifa_price
      }else{
        lianxi_list[product_index].baojia_danjia = Math.round((product_list[index].pifa_price * lianxi_list[product_index].baojia_fudong / 100) * 100) / 100
      }
    }else if(baojia_body.jiage_dengji == '大客户价格'){
      lianxi_list[product_index].jianyi_baojia = product_list[index].dakehu_price
      if(lianxi_list[product_index].baojia_fudong == ''){
        lianxi_list[product_index].baojia_fudong = 100
        lianxi_list[product_index].baojia_danjia = product_list[index].dakehu_price
      }else{
        lianxi_list[product_index].baojia_danjia = Math.round((product_list[index].dakehu_price * lianxi_list[product_index].baojia_fudong / 100) * 100) / 100
      }
    }
    
    if(lianxi_list[product_index].baojia_danjia != '' && lianxi_list[product_index].shuliang != ''){
      lianxi_list[product_index].jiashui_xiaoji = Math.round(lianxi_list[product_index].baojia_danjia * lianxi_list[product_index].shuliang * 100) / 100
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
      var baojia_body = _this.data.baojia_body
      baojia_body.riqi = e.detail.value
      _this.setData({
        baojia_body
      })
    }else if(column_name == 'xuyong_riqi'){
      var index = e.target.dataset.index
      var lianxi_list = _this.data.lianxi_list
      lianxi_list[index].xuyong_riqi = e.detail.value
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
            shangpin_bianhao:'',
            shangpin_mingcheng:'',
            guige:'',
            caizhi:'',
            jishu_biaozhun:'',
            zhibao_dengji:'',
            danwei:'',
            shuliang:'',
            baojia_danjia:'',
            jiashui_xiaoji:'',
            jianyi_baojia:'',
            xuyong_riqi:'',
            baojia_fudong:'',
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
    var baojia_body = _this.data.baojia_body
    var lianxi_list = _this.data.lianxi_list
    console.log(baojia_body)
    console.log(lianxi_list)
    if(baojia_body.riqi == ''){
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      })
      return;
    }
    if(baojia_body.kehu == ''){
      wx.showToast({
        title: '请选择客户',
        icon: 'none'
      })
      return;
    }
    if(baojia_body.yewuyuan == ''){
      wx.showToast({
        title: '请选择业务员',
        icon: 'none'
      })
      return;
    }
    if(baojia_body.dianpu == ''){
      wx.showToast({
        title: '请选择店铺',
        icon: 'none'
      })
      return;
    }
    if(baojia_body.shenheren == ''){
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
    if(baojia_body.id == ''){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into xiaoshou_baojia(bianhao,riqi,kehu,yewuyuan,dianpu,xiaoxiang_shuilv,beizhu,shenhe,jiage_dengji,shenhe_zhuangtai) output inserted.id values('" + baojia_body.bianhao + "','" + baojia_body.riqi + "','" + baojia_body.kehu + "','" + baojia_body.yewuyuan + "','" + baojia_body.dianpu + "','" + baojia_body.xiaoxiang_shuilv + "','" + baojia_body.beizhu + "','" + baojia_body.shenhe + "','" + baojia_body.jiage_dengji + "','审核中')"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          baojia_body.id = new_id
          _this.setData({
            baojia_body
          })

          var sql = "insert into xiaoshou_baojia_item(shangpin_bianhao,shangpin_mingcheng,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,baojia_danjia,jiashui_xiaoji,jianyi_baojia,xuyong_riqi,baojia_fudong,beizhu,baojia_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji + "','" + lianxi_list[i].jianyi_baojia + "','" + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji + "','" + lianxi_list[i].jianyi_baojia + "','" + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
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
      console.log(baojia_body)
      wx.showLoading({
        title:'保存中'
      })
      if(baojia_body.shenhe_zhuangtai == '审核未通过'){
        baojia_body.shenhe_zhuangtai = "审核中"
      }
      var sql = "update xiaoshou_baojia set bianhao='" + baojia_body.bianhao + "',riqi='" + baojia_body.riqi + "',kehu='" + baojia_body.kehu + "',yewuyuan='" + baojia_body.yewuyuan + "',dianpu='" + baojia_body.dianpu + "',xiaoxiang_shuilv='" + baojia_body.xiaoxiang_shuilv + "',beizhu='" + baojia_body.beizhu + "',shenhe='" + baojia_body.shenhe + "',jiage_dengji='" + baojia_body.jiage_dengji + "',shenhe_zhuangtai='" + baojia_body.shenhe_zhuangtai + "' where id=" + baojia_body.id
      console.log(baojia_body)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = baojia_body.id
          var sql = "delete from xiaoshou_baojia_item where baojia_id='" + new_id + "';insert into xiaoshou_baojia_item(shangpin_bianhao,shangpin_mingcheng,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,baojia_danjia,jiashui_xiaoji,jianyi_baojia,xuyong_riqi,baojia_fudong,beizhu,baojia_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji + "','" + lianxi_list[i].jianyi_baojia + "','" + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji + "','" + lianxi_list[i].jianyi_baojia + "','" + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
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
    console.log(_this.data.baojia_body)
    console.log(_this.data.lianxi_list)
    if(index == undefined){
      var baojia_body = _this.data.baojia_body
      baojia_body[column] = new_value
      _this.setData({
        baojia_body
      })
    }else{
      var lianxi_list = _this.data.lianxi_list
      lianxi_list[index][column] = new_value
      if(column == 'baojia_fudong'){
        lianxi_list[index].baojia_danjia = Math.round(lianxi_list[index].jianyi_baojia * lianxi_list[index].baojia_fudong / 100 * 100) / 100
      }
      if(column == 'baojia_danjia'){
        lianxi_list[index].baojia_fudong = Math.round(lianxi_list[index].baojia_danjia / lianxi_list[index].jianyi_baojia * 100 * 100) / 100
      }
      lianxi_list[index].jiashui_xiaoji = Math.round(lianxi_list[index].shuliang * lianxi_list[index].baojia_danjia * 100) / 100
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
      var baojia_body = _this.data.baojia_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        baojia_body[click_column] = new_val
        if(click_column == 'kehu'){
          baojia_body.jiage_dengji = e.detail.jiage_dengji
        }
        _this.setData({
          xlShow2: false,
          baojia_body,
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