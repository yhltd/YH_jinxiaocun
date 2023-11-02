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
    xiaoshou_body: {
      id:'',
      bianhao:'',
      riqi:'',
      kehu:'',
      jiage_dengji:'',
      yewuyuan:'',
      shoujianren:'',
      shoujian_phone:'',
      shoujian_dizhi:'',
      dianpu:'',
      xiaoxiang_shuilv:'',
      shenhe:'',
      jiashui_heji:'0', 
      beizhu:'',
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
        baojia_fudong:'100',
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
    var sql = "select * from customer;select * from userInfo;select * from (select p.id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item.id as item_id,product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,convert(float,caigou_price) as caigou_price,jinxiang,xiaoxiang,enable,1 as isselect from product as p left join product_item as item on p.id = item.product_id where enable = '是' ) as pro left join (select shangpin_bianma,min(convert(float,caigou_danjia)) as zuidijia from caigou_dingdan_item group by shangpin_bianma) as price on pro.bianhao = price.shangpin_bianma;select * from peizhi where type = '店铺';"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var kehu_list = res.result.recordsets[0]
        var yewuyuan_list = res.result.recordsets[1]
        var shenhe_list = res.result.recordsets[1]
        var product_list = res.result.recordsets[2]
        var dianpu_list = res.result.recordsets[3]
        _this.setData({
          kehu_list,
          yewuyuan_list,
          shenhe_list,
          product_list,
          dianpu_list
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
      var sql = "select * from xiaoshou_dingdan where id=" + id + ";select * from xiaoshou_dingdan_item where xiaoshou_id = '" + id + "'"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var xiaoshou_body = res.result.recordsets[0][0]
          var lianxi_list = res.result.recordsets[1]
          _this.setData({
            id,
            xiaoshou_body,
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
      var sql = "select convert(float,SUBSTRING(isnull(max(bianhao),'XS000000'),3,6)) + 1 as bianhao from xiaoshou_dingdan"
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
          this_bianhao = "XS" + this_bianhao
          console.log(this_bianhao)
          var xiaoshou_body = _this.data.xiaoshou_body
          xiaoshou_body.riqi = getNowDate()
          xiaoshou_body.yewuyuan = _this.data.userInfo.name
          xiaoshou_body.shenhe = _this.data.userInfo.shenpi
          xiaoshou_body.bianhao = this_bianhao
          _this.setData({
            xiaoshou_body
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
    var xiaoshou_body = _this.data.xiaoshou_body
    xiaoshou_body.caigou_id = caigou_list.bianhao
    xiaoshou_body.gongyingshang = caigou_list.gongyingshang
    xiaoshou_body.dianpu = caigou_list.dianpu
    var lianxi_list = caigou_list.item
    _this.setData({
      xiaoshou_body,
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
    var xiaoshou_body = _this.data.xiaoshou_body
    lianxi_list[product_index].shangpin_bianhao = product_list[index].bianhao
    lianxi_list[product_index].shangpin_mingcheng = product_list[index].name
    lianxi_list[product_index].guige = product_list[index].guige
    lianxi_list[product_index].caizhi = product_list[index].caizhi
    lianxi_list[product_index].jishu_biaozhun = product_list[index].jishu_biaozhun
    lianxi_list[product_index].zhibao_dengji = product_list[index].zhibao_dengji
    lianxi_list[product_index].danwei = product_list[index].danwei

    if(xiaoshou_body.jiage_dengji == '零售价格'){
      lianxi_list[product_index].jianyi_baojia = product_list[index].lingshou_price
      if(lianxi_list[product_index].baojia_fudong == ''){
        lianxi_list[product_index].baojia_fudong = 100
        lianxi_list[product_index].baojia_danjia = product_list[index].lingshou_price
      }else{
        lianxi_list[product_index].baojia_danjia = Math.round((product_list[index].lingshou_price * lianxi_list[product_index].baojia_fudong / 100) * 100) / 100
      }
    }else if(xiaoshou_body.jiage_dengji == '批发价格'){
      lianxi_list[product_index].jianyi_baojia = product_list[index].pifa_price
      if(lianxi_list[product_index].baojia_fudong == ''){
        lianxi_list[product_index].baojia_fudong = 100
        lianxi_list[product_index].baojia_danjia = product_list[index].pifa_price
      }else{
        lianxi_list[product_index].baojia_danjia = Math.round((product_list[index].pifa_price * lianxi_list[product_index].baojia_fudong / 100) * 100) / 100
      }
    }else if(xiaoshou_body.jiage_dengji == '大客户价格'){
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
      product_show:false,
      caigou_show:false
    })
  },

  choiceDate: function (e) {
    var _this = this
    //e.preventDefault(); 
    var column_name = e.target.dataset.column_name
    if(column_name == 'riqi'){
      var xiaoshou_body = _this.data.xiaoshou_body
      xiaoshou_body.riqi = e.detail.value
      _this.setData({
        xiaoshou_body
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
            baojia_fudong:'100',
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
    var xiaoshou_body = _this.data.xiaoshou_body
    var lianxi_list = _this.data.lianxi_list
    console.log(xiaoshou_body)
    console.log(lianxi_list)
    if(xiaoshou_body.kehu == ''){
      wx.showToast({
        title: '请选择客户',
        icon: 'none'
      })
      return;
    }
    if(xiaoshou_body.dianpu == ''){
      wx.showToast({
        title: '请选择店铺',
        icon: 'none'
      })
      return;
    }
    if(xiaoshou_body.shenhe == ''){
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
      if(lianxi_list[i].baojia_danjia == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写单价',
          icon: 'none'
        })
        return;
      }
    }
    if(xiaoshou_body.id == ''){
      wx.showLoading({
        title:'保存中'
      })

      var sql = "insert into xiaoshou_dingdan(bianhao,riqi,kehu,jiage_dengji,yewuyuan,shoujianren,shoujian_phone,shoujian_dizhi,dianpu,xiaoxiang_shuilv,shenhe,jiashui_heji,beizhu,shenhe_zhuangtai) output inserted.id values('" + xiaoshou_body.bianhao + "','" + xiaoshou_body.riqi + "','" + xiaoshou_body.kehu + "','" + xiaoshou_body.jiage_dengji + "','" + xiaoshou_body.yewuyuan + "','" + xiaoshou_body.shoujianren + "','" + xiaoshou_body.shoujian_phone + "','" + xiaoshou_body.shoujian_dizhi + "','" + xiaoshou_body.dianpu + "','" + xiaoshou_body.xiaoxiang_shuilv + "','" + xiaoshou_body.shenhe + "','" + xiaoshou_body.jiashui_heji + "','" + xiaoshou_body.beizhu + "','审核中')"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          xiaoshou_body.id = new_id
          _this.setData({
            xiaoshou_body
          })

          var sql = "insert into xiaoshou_dingdan_item(shangpin_bianhao,shangpin_mingcheng,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,baojia_danjia,jiashui_xiaoji,jianyi_baojia,xuyong_riqi,baojia_fudong,beizhu,xiaoshou_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].jianyi_baojia +  "','"  + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].jianyi_baojia +  "','"  + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
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
      console.log(xiaoshou_body)
      wx.showLoading({
        title:'保存中'
      })
      var sql = "update xiaoshou_dingdan set bianhao='" + xiaoshou_body.bianhao + "',riqi='" + xiaoshou_body.riqi + "',kehu='" + xiaoshou_body.kehu + "',jiage_dengji='" + xiaoshou_body.jiage_dengji + "',yewuyuan='" + xiaoshou_body.yewuyuan + "',shoujianren='" + xiaoshou_body.shoujianren + "',shoujian_phone='" + xiaoshou_body.shoujian_phone + "',shoujian_dizhi='" + xiaoshou_body.shoujian_dizhi + "',dianpu='" + xiaoshou_body.dianpu + "',xiaoxiang_shuilv='" + xiaoshou_body.xiaoxiang_shuilv + "',shenhe='" + xiaoshou_body.shenhe + "',jiashui_heji='" + xiaoshou_body.jiashui_heji + "',beizhu='" + xiaoshou_body.beizhu + "',shenhe_zhuangtai='" + xiaoshou_body.shenhe_zhuangtai + "' where id=" + xiaoshou_body.id
      console.log(xiaoshou_body)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = xiaoshou_body.id
          var sql = "delete from xiaoshou_dingdan_item where xiaoshou_id='" + new_id + "';insert into xiaoshou_dingdan_item(shangpin_bianhao,shangpin_mingcheng,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,baojia_danjia,jiashui_xiaoji,jianyi_baojia,xuyong_riqi,baojia_fudong,beizhu,xiaoshou_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].jianyi_baojia +  "','"  + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].jianyi_baojia +  "','"  + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
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
    console.log(_this.data.xiaoshou_body)
    console.log(_this.data.lianxi_list)
    if(index == undefined){
      var xiaoshou_body = _this.data.xiaoshou_body
      xiaoshou_body[column] = new_value
      _this.setData({
        xiaoshou_body
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
      var xiaoshou_body = _this.data.xiaoshou_body
      var jiashui_heji = 0
      for(var i=0; i<lianxi_list.length; i++){
        jiashui_heji = (jiashui_heji * 1) + (lianxi_list[i].jiashui_xiaoji * 1)
      }
      xiaoshou_body.jiashui_heji = jiashui_heji
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
      var xiaoshou_body = _this.data.xiaoshou_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        xiaoshou_body[click_column] = new_val
        if(click_column == 'kehu'){
          xiaoshou_body.jiage_dengji = e.detail.jiage_dengji
          xiaoshou_body.shoujianren = e.detail.shoujian_name
          xiaoshou_body.shoujian_phone = e.detail.shoujian_phone 
          xiaoshou_body.shoujian_dizhi = e.detail.shoujian_dizhi
        }
        _this.setData({
          xlShow2: false,
          xiaoshou_body,
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