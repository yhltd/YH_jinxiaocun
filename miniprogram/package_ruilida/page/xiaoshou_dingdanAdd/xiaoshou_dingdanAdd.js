// package_ruilida/page/userInfoAdd/userInfoAdd.js
var areaList = require("../../components/data_area.js")
const app = getApp();
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
      xiaoshou_danwei:'',
      xiaoxiang_shuilv:'',
      shenhe:'',
      shenhe_list:'',
      shenhe_zhuangtai:'未提交审核',
      shenhe_list:'审核中',
      jiashui_heji:'0.00', 
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
        shuliang:'0.0000',
        baojia_danjia:'0.00',
        jiashui_xiaoji:'0.00',
        jianyi_baojia:'0.00',
        zuigaojia:'0.00',
        xuyong_riqi:'', 
        baojia_fudong:'100.00',
        beizhu:'',
      }
    ],
    type:'',
    name:'',
    quanxuan_value: false,
  },

  shuliang_refresh(e){
    var _this = this
    console.log(e)
    var new_val = e.detail.value * 1
    var list = _this.data.lianxi_list
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    list[index][column] = new_val.toFixed(4)
    _this.setData({
      lianxi_list:list
    })
  },

  jiage_refresh(e){
    var _this = this
    console.log(e)
    var new_val = e.detail.value * 1
    var list = _this.data.lianxi_list
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    list[index][column] = new_val.toFixed(2)
    _this.setData({
      lianxi_list:list
    })
  },

  jiage_head_refresh(e){
    var _this = this
    console.log(e)
    var new_val = e.detail.value * 1
    var list = _this.data.xiaoshou_body
    var column = e.currentTarget.dataset.column
    list[column] = new_val.toFixed(2)
    _this.setData({
      xiaoshou_body:list
    })
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

  shenhe_sure:function(){
    var _this = this
    var result = _this.data.result
    console.log(result)
    if(result.length == 0){
      wx.showToast({
        title: '请选择审核人',
        icon:'none',
      })
      return;
    }
    var shenhe_str = ""
    var zhuangtai_str = ""
    var xiaoshou_body = _this.data.xiaoshou_body
    for(var i=0; i<result.length; i++){
      if(shenhe_str == ""){
        shenhe_str = result[i]
        zhuangtai_str = "审核中"
      }else{
        shenhe_str = shenhe_str + "," + result[i]
        zhuangtai_str = zhuangtai_str + "," + "审核中"
      }
    }
    xiaoshou_body.shenhe = shenhe_str
    xiaoshou_body.zhuangtai_str = zhuangtai_str
    console.log(xiaoshou_body)
    _this.setData({
      xiaoshou_body
    })
    _this.qxShow()
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
    var type = options.type
    if(id != null && id != undefined && type == undefined){
      var sql = "select * from xiaoshou_dingdan where id=" + id + ";select * from xiaoshou_dingdan_item where xiaoshou_id = '" + id + "';"
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
    }else if(id != null && id != undefined && type != undefined){
      type = JSON.parse(type)
      console.log(type)
      var sql = "select convert(float,SUBSTRING(isnull(max(bianhao),'XS000000'),3,6)) + 1 as bianhao from xiaoshou_dingdan;select * from customer where name = '" + type.kehu + "'"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var max_bianhao = res.result.recordsets[0][0].bianhao
          var kehu_list = res.result.recordsets[1]
          var this_bianhao = PrefixInteger(max_bianhao,6)
          console.log(this_bianhao)
          this_bianhao = "XS" + this_bianhao
          console.log(this_bianhao)
          var xiaoshou_body = _this.data.xiaoshou_body
          if(kehu_list.length > 0){
            xiaoshou_body.shoujianren = kehu_list[0].shoujian_name
            xiaoshou_body.shoujian_phone = kehu_list[0].shoujian_phone
            xiaoshou_body.shoujian_dizhi = kehu_list[0].shoujian_dizhi
          }
          xiaoshou_body.riqi = getNowDate()
          xiaoshou_body.yewuyuan = _this.data.userInfo.name
          xiaoshou_body.shenhe = _this.data.userInfo.shenpi
          xiaoshou_body.bianhao = this_bianhao
          xiaoshou_body.kehu = type.kehu
          xiaoshou_body.jiage_dengji = type.jiage_dengji
          xiaoshou_body.dianpu = type.dianpu
          xiaoshou_body.xiaoxiang_shuilv = type.xiaoxiang_shuilv
          xiaoshou_body.beizhu = type.beizhu
          xiaoshou_body.xiaoshou_danwei = type.xiaoshou_danwei
          var product_list = []
          var jiashui_heji = 0.00
          for(var i=0; i<type.item.length; i++){
            var this_item = {
              shangpin_bianhao:type.item[i].shangpin_bianhao,
              shangpin_mingcheng:type.item[i].shangpin_mingcheng,
              guige:type.item[i].guige,
              caizhi:type.item[i].caizhi,
              jishu_biaozhun:type.item[i].jishu_biaozhun,
              zhibao_dengji:type.item[i].zhibao_dengji,
              danwei:type.item[i].danwei,
              shuliang:(type.item[i].shuliang * 1).toFixed(4),
              baojia_danjia:(type.item[i].baojia_danjia * 1).toFixed(2),
              jiashui_xiaoji:(type.item[i].jiashui_xiaoji * 1).toFixed(2),
              jianyi_baojia:(type.item[i].jianyi_baojia * 1).toFixed(2),
              xuyong_riqi:type.item[i].xuyong_riqi,
              baojia_fudong:(type.item[i].baojia_fudong * 1).toFixed(2),
              beizhu:type.item[i].beizhu,
            }
            jiashui_heji = (jiashui_heji * 1) + (type.item[i].jiashui_xiaoji * 1)
            product_list.push(this_item)
          }
          xiaoshou_body.jiashui_heji = (jiashui_heji * 1).toFixed(2)
          _this.setData({
            xiaoshou_body,
            lianxi_list: product_list
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
    }else if(id == undefined){
      var sql = "select convert(float,SUBSTRING(isnull(max(bianhao),'XS000000'),3,6)) + 1 as bianhao from xiaoshou_dingdan"
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

  danxuan_zengpin(e){
    var _this = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    var list = _this.data.product_list
    if(list[index].checked == false){
      list[index].checked = true
    }else{
      list[index].checked = false
    }
    _this.setData({
      product_list:list
    })
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
      if(!(caigou_list[i].riqi >= start_date && caigou_list[i].riqi <= stop_date)){
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
    var peizhi_shuilv = _this.data.peizhi_shuilv
    var fujia_shuilv = 1
    if(peizhi_shuilv.zhuangtai == '是'){
      fujia_shuilv = fujia_shuilv + (peizhi_shuilv.shuilv / 100)
    }
    for(var i=0; i<product_list.length; i++){
      var jinxiang = product_list[i].jinxiang / 100
      var xiaoxiang = _this.data.xiaoshou_body.xiaoxiang_shuilv / 100
      if(xiaoxiang == ''){
        xiaoxiang = 0
      }
      var pifa_bili = peizhi_shuilv.pifa / 100
      var lingshou_bili = peizhi_shuilv.lingshou / 100
      var dakehu_bili = peizhi_shuilv.dakehu / 100
      var caigou_price = product_list[i].caigou_price * 1
      product_list[i].lingshou_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * lingshou_bili)) * 100) / 100
      product_list[i].pifa_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * pifa_bili)) * 100 ) / 100
      product_list[i].dakehu_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * dakehu_bili)) * 100) / 100
    }

    for(var i=0; i< product_list.length; i++){
      product_list[i].isselect = 1
      product_list[i].checked = false
    }
    console.log(product_list)
    _this.setData({
      product_index: index,
      product_show: true,
      product_list,
      type:'',
      name:'',
    })
  },

  kehu_select:function(e){
    var _this = this
    console.log(e)
    var kehu_list = _this.data.kehu_list
    for(var i=0; i< kehu_list.length; i++){
      kehu_list[i].isselect = 1
    }
    console.log(kehu_list)
    _this.setData({
      kehu_show: true,
      kehu_list,
      type:'',
      name:'',
    })
  },

  product_refresh:function(){
    var _this = this
    var product_list = _this.data.product_list
    var peizhi_shuilv = _this.data.peizhi_shuilv
    var fujia_shuilv = 1
    if(peizhi_shuilv.zhuangtai == '是'){
      fujia_shuilv = fujia_shuilv + (peizhi_shuilv.shuilv / 100)
    }
    for(var i=0; i<product_list.length; i++){
      var jinxiang = product_list[i].jinxiang / 100
      var xiaoxiang = _this.data.xiaoshou_body.xiaoxiang_shuilv
      if(xiaoxiang == ''){
        xiaoxiang = 0
      }
      var pifa_bili = peizhi_shuilv.pifa / 100
      var lingshou_bili = peizhi_shuilv.lingshou / 100
      var dakehu_bili = peizhi_shuilv.dakehu / 100
      var caigou_price = product_list[i].caigou_price * 1
      product_list[i].lingshou_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * lingshou_bili)) * 100) / 100
      product_list[i].pifa_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * pifa_bili)) * 100 ) / 100
      product_list[i].dakehu_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * dakehu_bili)) * 100) / 100
    }

    for(var i=0; i< product_list.length; i++){
      product_list[i].isselect = 1
    }
    console.log(product_list)
    _this.setData({
      product_list,
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

  sel_kehu:function(){
    var _this = this
    var kehu_list = _this.data.kehu_list
    var name = _this.data.name
    for(var i=0; i<kehu_list.length; i++){
      if(name == ''){
        kehu_list[i].isselect = 1
      }else if(name != ''){
        if(kehu_list[i].name.indexOf(name) != -1){
          kehu_list[i].isselect = 1
        }else{
          kehu_list[i].isselect = 0
        }
      }
    }
    _this.setData({
      kehu_list
    })
  },

  kehu_click:function(e){
    var _this = this
    var index = e.currentTarget.dataset.index
    var kehu_list = _this.data.kehu_list
    var xiaoshou_body = _this.data.xiaoshou_body
    console.log(kehu_list[index])
    xiaoshou_body.kehu = kehu_list[index].name
    xiaoshou_body.jiage_dengji = kehu_list[index].jiage_dengji
    xiaoshou_body.shoujianren = kehu_list[index].shoujian_name
    xiaoshou_body.shoujian_phone = kehu_list[index].shoujian_phone
    xiaoshou_body.shoujian_dizhi = kehu_list[index].shoujian_dizhi
    _this.setData({
      xiaoshou_body
    })
    _this.qxShow()
  },

  product_click:function(e){
    var _this = this
    var index = e.currentTarget.dataset.index
    var product_index = _this.data.product_index
    var lianxi_list = _this.data.lianxi_list
    var product_list = _this.data.product_list
    var xiaoshou_body = _this.data.xiaoshou_body

    for(var i=0; i<lianxi_list.length; i++){
      if(i != product_index){
        if(lianxi_list[i].shangpin_bianhao == product_list[index].bianhao){
          wx.showToast({
            title: '已有此商品，不允许重复选择',
            icon: 'none'
          })
          return;
        }
      }
    }

    lianxi_list[product_index].shangpin_bianhao = product_list[index].bianhao
    lianxi_list[product_index].shangpin_mingcheng = product_list[index].name
    lianxi_list[product_index].guige = product_list[index].guige
    lianxi_list[product_index].caizhi = product_list[index].caizhi
    lianxi_list[product_index].jishu_biaozhun = product_list[index].jishu_biaozhun
    lianxi_list[product_index].zhibao_dengji = product_list[index].zhibao_dengji
    lianxi_list[product_index].danwei = product_list[index].danwei
    lianxi_list[product_index].zuigaojia = (product_list[index].zuigaojia * 1).toFixed(2)

    if(xiaoshou_body.jiage_dengji == '零售价格'){
      lianxi_list[product_index].jianyi_baojia = (product_list[index].lingshou_price * 1).toFixed(2)
      if(lianxi_list[product_index].baojia_fudong == ''){
        lianxi_list[product_index].baojia_fudong = '100.00'
        lianxi_list[product_index].baojia_danjia = (product_list[index].lingshou_price * 1).toFixed(2)
      }else{
        lianxi_list[product_index].baojia_danjia = (Math.round((product_list[index].lingshou_price * lianxi_list[product_index].baojia_fudong / 100) * 100) / 100).toFixed(2)
      }
    }else if(xiaoshou_body.jiage_dengji == '批发价格'){
      lianxi_list[product_index].jianyi_baojia = (product_list[index].pifa_price * 1).toFixed(2)
      if(lianxi_list[product_index].baojia_fudong == ''){
        lianxi_list[product_index].baojia_fudong = '100.00'
        lianxi_list[product_index].baojia_danjia = (product_list[index].pifa_price * 1).toFixed(2)
      }else{
        lianxi_list[product_index].baojia_danjia = (Math.round((product_list[index].pifa_price * lianxi_list[product_index].baojia_fudong / 100) * 100) / 100).toFixed(2)
      }
    }else if(xiaoshou_body.jiage_dengji == '大客户价格'){
      lianxi_list[product_index].jianyi_baojia = (product_list[index].dakehu_price * 1).toFixed(2)
      if(lianxi_list[product_index].baojia_fudong == ''){
        lianxi_list[product_index].baojia_fudong = '100.00'
        lianxi_list[product_index].baojia_danjia = (product_list[index].dakehu_price * 1).toFixed(2)
      }else{
        lianxi_list[product_index].baojia_danjia = (Math.round((product_list[index].dakehu_price * lianxi_list[product_index].baojia_fudong / 100) * 100) / 100).toFixed(2)
      }
    }
    if(product_list[index].checked){
      lianxi_list[product_index].baojia_danjia = 0.00
    }
    if(lianxi_list[product_index].baojia_danjia != '' && lianxi_list[product_index].shuliang != ''){
      lianxi_list[product_index].jiashui_xiaoji = (Math.round(lianxi_list[product_index].baojia_danjia * lianxi_list[product_index].shuliang * 100) / 100).toFixed(2)
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
      kehu_show:false,
      caigou_show:false,
      dayin_show: false,
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
            shuliang:'0.0000',
            baojia_danjia:'0.00',
            jiashui_xiaoji:'0.00',
            jianyi_baojia:'0.00',
            zuigaojia:'0.00',
            xuyong_riqi:'', 
            baojia_fudong:'100.00',
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

  bianhao_get:function(e){
    var _this = this
    var index = e.target.dataset.index
    console.log(e)
    var xiaoshou_body = _this.data.xiaoshou_body
    if(xiaoshou_body.jiage_dengji == ''){
      wx.showToast({
        title: '请选择客户价格等级',
        icon:'none'
      })
      return;
    }
    _this.product_refresh()
    wx.scanCode({
      success (res) {
        console.log(res)
        console.log(res.result)
        var lianxi_list = _this.data.lianxi_list
        var this_bianhao = res.result
        var product_list = _this.data.product_list
        console.log(product_list)
        var panduan = false
        for(var i=0; i<product_list.length; i++){
          if(product_list[i].bianhao == res.result){
            lianxi_list[index].shangpin_bianhao = product_list[i].bianhao
            lianxi_list[index].shangpin_mingcheng = product_list[i].name
            lianxi_list[index].guige = product_list[i].guige
            lianxi_list[index].caizhi = product_list[i].caizhi
            lianxi_list[index].jishu_biaozhun = product_list[i].jishu_biaozhun
            lianxi_list[index].zhibao_dengji = product_list[i].zhibao_dengji
            lianxi_list[index].danwei = product_list[i].danwei
            lianxi_list[index].zuigaojia = (product_list[i].zuigaojia * 1).toFixed(2)

            if(xiaoshou_body.jiage_dengji == '零售价格'){
              lianxi_list[index].jianyi_baojia = (product_list[i].lingshou_price * 1).toFixed(2)
              if(lianxi_list[index].baojia_fudong == ''){
                lianxi_list[index].baojia_fudong = '100.00'
                lianxi_list[index].baojia_danjia = (product_list[i].lingshou_price * 1).toFixed(2)
              }else{
                lianxi_list[index].baojia_danjia = (Math.round((product_list[i].lingshou_price * lianxi_list[index].baojia_fudong / 100) * 100) / 100).toFixed(2)
              }
            }else if(xiaoshou_body.jiage_dengji == '批发价格'){
              lianxi_list[index].jianyi_baojia = (product_list[i].pifa_price * 1).toFixed(2)
              if(lianxi_list[index].baojia_fudong == ''){
                lianxi_list[index].baojia_fudong = '100.00'
                lianxi_list[index].baojia_danjia = (product_list[i].pifa_price * 1).toFixed(2)
              }else{
                lianxi_list[index].baojia_danjia = (Math.round((product_list[i].pifa_price * lianxi_list[index].baojia_fudong / 100) * 100) / 100).toFixed(2)
              }
            }else if(xiaoshou_body.jiage_dengji == '大客户价格'){
              lianxi_list[index].jianyi_baojia = (product_list[i].dakehu_price * 1).toFixed(2)
              if(lianxi_list[index].baojia_fudong == ''){
                lianxi_list[index].baojia_fudong = '100.00'
                lianxi_list[index].baojia_danjia = (product_list[i].dakehu_price * 1).toFixed(2)
              }else{
                lianxi_list[index].baojia_danjia = (Math.round((product_list[i].dakehu_price * lianxi_list[index].baojia_fudong / 100) * 100) / 100).toFixed(2)
              }
            }
            
            if(lianxi_list[index].baojia_danjia != '' && lianxi_list[index].shuliang != ''){
              lianxi_list[index].jiashui_xiaoji = (Math.round(lianxi_list[index].baojia_danjia * lianxi_list[index].shuliang * 100) / 100).toFixed(2)
            }
            panduan = true
            break;
          }
        }
        if(panduan){
          _this.setData({
            lianxi_list
          })
        }else{
          wx.showToast({
            title: '未读取到此编号信息',
            icon:'none'
          })
        }
      }
    })
  },

  goto_add:function(){
    var _this = this
    var yixuan_list = {}
    var lianxi_list = _this.data.lianxi_list
    for(var i=0; i<lianxi_list.length; i++){
      if(lianxi_list[i].shangpin_bianhao != ''){
        yixuan_list[lianxi_list[i].shangpin_bianhao] = 1
      }
    }
    var xiaoshou_body = _this.data.xiaoshou_body
    if(xiaoshou_body.jiage_dengji == ''){
      wx.showToast({
        title: '请选择客户价格等级',
        icon:'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../productSelect/productSelect?userInfo=' + JSON.stringify(_this.data.userInfo) + "&yixuan=" + JSON.stringify(yixuan_list)
    })
  },

  add_back:function(){
    var _this = this
    var pro_sel = app.globalData.ruili_pro
    console.log(pro_sel)
    var peizhi_shuilv = _this.data.peizhi_shuilv
    var fujia_shuilv = 1
    if(peizhi_shuilv != undefined){
      wx.showLoading({
        title:'加载中'
      })
      if(peizhi_shuilv.zhuangtai == '是'){
        fujia_shuilv = fujia_shuilv + (peizhi_shuilv.shuilv / 100)
      }
      if(pro_sel.length > 0){
        var list = _this.data.lianxi_list
        for(var i=0; i<pro_sel.length; i++){
          var jinxiang = pro_sel[i].jinxiang / 100
          var xiaoxiang = _this.data.xiaoshou_body.xiaoxiang_shuilv / 100
          if(xiaoxiang == ''){
            xiaoxiang = 0
          }
          var pifa_bili = peizhi_shuilv.pifa / 100
          var lingshou_bili = peizhi_shuilv.lingshou / 100
          var dakehu_bili = peizhi_shuilv.dakehu / 100
          var caigou_price = pro_sel[i].caigou_price * 1
          pro_sel[i].lingshou_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * lingshou_bili)) * 100) / 100
          pro_sel[i].pifa_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * pifa_bili)) * 100 ) / 100
          pro_sel[i].dakehu_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * dakehu_bili)) * 100) / 100
          
          var xiaoshou_body = _this.data.xiaoshou_body
          var jianyi_baojia = ""
          var baojia_fudong = ""
          var baojia_danjia = ""
          var jiashui_xiaoji = ""
          if(xiaoshou_body.jiage_dengji == '零售价格'){
            jianyi_baojia = (pro_sel[i].lingshou_price * 1).toFixed(2)
            if(baojia_fudong == ''){
              baojia_fudong = '100.00'
              baojia_danjia = (pro_sel[i].lingshou_price * 1).toFixed(2)
            }else{
              baojia_danjia = (Math.round((pro_sel[i].lingshou_price * baojia_fudong / 100) * 100) / 100).toFixed(2)
            }
          }else if(xiaoshou_body.jiage_dengji == '批发价格'){
            jianyi_baojia = (pro_sel[i].pifa_price * 1).toFixed(2)
            if(baojia_fudong == ''){
              baojia_fudong = '100.00'
              baojia_danjia = (pro_sel[i].pifa_price * 1).toFixed(2)
            }else{
              baojia_danjia = (Math.round((pro_sel[i].pifa_price * baojia_fudong / 100) * 100) / 100).toFixed(2)
            }
          }else if(xiaoshou_body.jiage_dengji == '大客户价格'){
            jianyi_baojia = (pro_sel[i].dakehu_price * 1).toFixed(2)
            if(baojia_fudong == ''){
              baojia_fudong = '100.00'
              baojia_danjia = (pro_sel[i].dakehu_price * 1).toFixed(2)
            }else{
              baojia_danjia = (Math.round((pro_sel[i].dakehu_price * baojia_fudong / 100) * 100) / 100).toFixed(2)
            }
          }
          if(pro_sel[i].checked){
            baojia_danjia = 0.00
          }
          if(baojia_danjia != '' && pro_sel[i].num != ''){
            jiashui_xiaoji = (Math.round(baojia_danjia * pro_sel[i].num * 100) / 100).toFixed(2)
          }

          if(list[0].shangpin_bianhao == ""){
            list[0] = {
              id:'',
              shangpin_bianhao:pro_sel[i].bianhao,
              shangpin_mingcheng:pro_sel[i].name,
              guige:pro_sel[i].guige,
              caizhi:pro_sel[i].caizhi,
              jishu_biaozhun:pro_sel[i].jishu_biaozhun,
              zhibao_dengji:pro_sel[i].zhibao_dengji,
              danwei:pro_sel[i].danwei,
              shuliang:(pro_sel[i].num).toFixed(4),
              baojia_danjia:(baojia_danjia * 1).toFixed(2),
              jiashui_xiaoji:(jiashui_xiaoji * 1).toFixed(2),
              jianyi_baojia:(jianyi_baojia * 1).toFixed(2),
              zuigaojia:(pro_sel[i].zuigaojia * 1).toFixed(2),
              xuyong_riqi:'',
              baojia_fudong:(baojia_fudong * 1).toFixed(2),
              beizhu:'',
            }
          }else{
            list.push(
              {
                id:'',
                shangpin_bianhao:pro_sel[i].bianhao,
                shangpin_mingcheng:pro_sel[i].name,
                guige:pro_sel[i].guige,
                caizhi:pro_sel[i].caizhi,
                jishu_biaozhun:pro_sel[i].jishu_biaozhun,
                zhibao_dengji:pro_sel[i].zhibao_dengji,
                danwei:pro_sel[i].danwei,
                shuliang:(pro_sel[i].num * 1).toFixed(4),
                baojia_danjia:(baojia_danjia * 1).toFixed(2),
                jiashui_xiaoji:(jiashui_xiaoji * 1).toFixed(2),
                jianyi_baojia:(jianyi_baojia * 1).toFixed(2),
                zuigaojia:(pro_sel[i].zuigaojia * 1).toFixed(2),
                xuyong_riqi:'',
                baojia_fudong:(baojia_fudong * 1).toFixed(2),
                beizhu:'',
              }
            )
          }
        }
        console.log(list)
        _this.setData({
          lianxi_list:list
        })
      }
      app.globalData.ruili_pro = []
      wx.hideLoading()
    }
  },

  get_peizhi:function(){
    var _this = this
    wx.showLoading({
      title:'加载中'
    })
    var sql = "select *,1 as isselect from customer;select * from userInfo;select id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item_id,product_id,guige,bianhao,caigou_price,jinxiang,enable,isselect,isnull(shangpin_bianhao,'') as shangpin_bianhao,isnull(zuigaojia,'') as zuigaojia from (select p.id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item.id as item_id,product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,convert(float,caigou_price) as caigou_price,jinxiang,xiaoxiang,enable,1 as isselect from product as p left join product_item as item on p.id = item.product_id where enable = '是' ) as pro left join (select shangpin_bianhao,max(convert(float,baojia_danjia)) as zuigaojia from xiaoshou_dingdan_item group by shangpin_bianhao) as price on pro.bianhao = price.shangpin_bianhao;select * from peizhi where type = '店铺';select * from peizhi_shuilv;select * from peizhi where type = '增值税率';select * from peizhi where type = '核算单位';"
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
        var list_check = res.result.recordsets[1]
        var all_result = []
        var result = []
        for(var i=0; i<list_check.length; i++){
          all_result.push(list_check[i].name)
        }
        console.log(list_check)
        console.log(all_result)
        console.log(result)
        var product_list = res.result.recordsets[2]
        var dianpu_list = res.result.recordsets[3]
        var peizhi_shuilv = res.result.recordsets[4][0]
        console.log(peizhi_shuilv)
        var xiaoxiang_shuilv_list = res.result.recordsets[5]
        var xiaoshou_danwei_list = res.result.recordsets[6]
        var fujia_shuilv = 1
        if(peizhi_shuilv.zhuangtai == '是'){
          fujia_shuilv = fujia_shuilv + (peizhi_shuilv.shuilv / 100)
        }
        var jiage_dengji_list=[
          {name:'零售价格'},
          {name:'批发价格'},
          {name:'大客户价格'},
        ]
        if(peizhi_shuilv.dakehu_zhuangtai != '是'){
          jiage_dengji_list.splice(2,1)
        }
        if(peizhi_shuilv.pifa_zhuangtai != '是'){
          jiage_dengji_list.splice(1,1)
        }
        if(peizhi_shuilv.lingshou_zhuangtai != '是'){
          jiage_dengji_list.splice(0,1)
        } 
        console.log(peizhi_shuilv)
        console.log(fujia_shuilv)
        _this.setData({
          peizhi_shuilv,
          kehu_list,
          yewuyuan_list,
          shenhe_list,
          product_list,
          dianpu_list,
          xiaoxiang_shuilv_list,
          fujia_shuilv,
          jiage_dengji_list,
          xiaoshou_danwei_list,
          list_check,
          all_result,
          result
        })
        wx.hideLoading()
      },
      err: res => {
        console.log("错误!")
        wx.hideLoading()
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
        wx.hideLoading()
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

  save_shenhe:function(){
    var _this = this
    var xiaoshou_body = _this.data.xiaoshou_body
    xiaoshou_body.shenhe_zhuangtai = '审核中'
    _this.setData({
      xiaoshou_body
    })
    _this.save()
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
    if(xiaoshou_body.jiage_dengji == ''){
      wx.showToast({
        title: '请选择客户价格等级',
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
    if(xiaoshou_body.xiaoxiang_shuilv == ''){
      wx.showToast({
        title: '请选择销项税率',
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

      var sql = "insert into xiaoshou_dingdan(bianhao,riqi,kehu,jiage_dengji,yewuyuan,shoujianren,shoujian_phone,shoujian_dizhi,dianpu,xiaoxiang_shuilv,shenhe,jiashui_heji,beizhu,shenhe_zhuangtai,xiaoshou_danwei,shenhe_list) output inserted.id values('" + xiaoshou_body.bianhao + "','" + xiaoshou_body.riqi + "','" + xiaoshou_body.kehu + "','" + xiaoshou_body.jiage_dengji + "','" + xiaoshou_body.yewuyuan + "','" + xiaoshou_body.shoujianren + "','" + xiaoshou_body.shoujian_phone + "','" + xiaoshou_body.shoujian_dizhi + "','" + xiaoshou_body.dianpu + "','" + xiaoshou_body.xiaoxiang_shuilv + "','" + xiaoshou_body.shenhe + "','" + xiaoshou_body.jiashui_heji + "','" + xiaoshou_body.beizhu + "','审核中','" + xiaoshou_body.xiaoshou_danwei + "','" + xiaoshou_body.shenhe_list + "')"
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

          var sql = "insert into xiaoshou_dingdan_item(shangpin_bianhao,shangpin_mingcheng,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,baojia_danjia,jiashui_xiaoji,jianyi_baojia,xuyong_riqi,baojia_fudong,beizhu,xiaoshou_id,zuigaojia) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].jianyi_baojia +  "','"  + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id +  "','"  + lianxi_list[i].zuigaojia + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].jianyi_baojia +  "','"  + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id +  "','"  + lianxi_list[i].zuigaojia + "')"
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
      if(xiaoshou_body.shenhe_zhuangtai == '审核未通过'){
        xiaoshou_body.shenhe_zhuangtai = "审核中"
      }
      var sql = "update xiaoshou_dingdan set bianhao='" + xiaoshou_body.bianhao + "',riqi='" + xiaoshou_body.riqi + "',kehu='" + xiaoshou_body.kehu + "',jiage_dengji='" + xiaoshou_body.jiage_dengji + "',yewuyuan='" + xiaoshou_body.yewuyuan + "',shoujianren='" + xiaoshou_body.shoujianren + "',shoujian_phone='" + xiaoshou_body.shoujian_phone + "',shoujian_dizhi='" + xiaoshou_body.shoujian_dizhi + "',dianpu='" + xiaoshou_body.dianpu + "',xiaoxiang_shuilv='" + xiaoshou_body.xiaoxiang_shuilv + "',shenhe='" + xiaoshou_body.shenhe + "',jiashui_heji='" + xiaoshou_body.jiashui_heji + "',beizhu='" + xiaoshou_body.beizhu + "',shenhe_zhuangtai='" + xiaoshou_body.shenhe_zhuangtai + "',xiaoshou_danwei='" + xiaoshou_body.xiaoshou_danwei + "',shenhe_list='" + xiaoshou_body.shenhe_list + "' where id=" + xiaoshou_body.id
      console.log(xiaoshou_body)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = xiaoshou_body.id
          var sql = "delete from xiaoshou_dingdan_item where xiaoshou_id='" + new_id + "';insert into xiaoshou_dingdan_item(shangpin_bianhao,shangpin_mingcheng,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,baojia_danjia,jiashui_xiaoji,jianyi_baojia,xuyong_riqi,baojia_fudong,beizhu,xiaoshou_id,zuigaojia) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].jianyi_baojia +  "','"  + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id +  "','"  + lianxi_list[i].zuigaojia + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianhao + "','" + lianxi_list[i].shangpin_mingcheng + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].baojia_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].jianyi_baojia +  "','"  + lianxi_list[i].xuyong_riqi +  "','"  + lianxi_list[i].baojia_fudong +  "','"  + lianxi_list[i].beizhu + "','" + new_id +  "','"  + lianxi_list[i].zuigaojia + "')"
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
        lianxi_list[index].baojia_danjia = (Math.round(lianxi_list[index].jianyi_baojia * lianxi_list[index].baojia_fudong / 100 * 100) / 100).toFixed(2)
      }
      if(column == 'baojia_danjia'){
        lianxi_list[index].baojia_fudong = Math.round(lianxi_list[index].baojia_danjia / lianxi_list[index].jianyi_baojia * 100 * 100) / 100
      }
      lianxi_list[index].jiashui_xiaoji = (Math.round(lianxi_list[index].shuliang * lianxi_list[index].baojia_danjia * 100) / 100).toFixed(2)
      var xiaoshou_body = _this.data.xiaoshou_body
      var jiashui_heji = 0.00
      for(var i=0; i<lianxi_list.length; i++){
        jiashui_heji = (jiashui_heji * 1) + (lianxi_list[i].jiashui_xiaoji * 1)
      }
      xiaoshou_body.jiashui_heji = (jiashui_heji * 1).toFixed(2)
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
    if(column == 'shenhe'){
      _this.setData({
        dayin_show: true,
      })
    }else{
      _this.setData({
        list_xiala: list,
        click_column:column,
        click_index: index,
        xlShow2: true
      })
    }
    console.log(list)
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

  file_goto:function(){
    var _this = this
    var type = "销售订单"
    var id = _this.data.xiaoshou_body.id
    console.log(id)
    console.log(type)
    wx.navigateTo({
      url: '../fileUpload/fileUpload?userInfo=' + JSON.stringify(_this.data.userInfo) + "&type=" + type + "&id=" + id,
    })
  },

  goto_product:function(){
    var _this = this
    _this.qxShow()
    wx.navigateTo({
      url: '../product/product?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  goto_kehu:function(){
    var _this = this
    _this.qxShow()
    wx.navigateTo({
      url: '../customer/customer?userInfo=' + JSON.stringify(_this.data.userInfo),
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
    _this.add_back()
    _this.get_peizhi()
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