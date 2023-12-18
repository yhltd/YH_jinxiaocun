// package_ruilida/page/userInfo/userInfo.js
import * as echarts from '../ec-canvas/echarts'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xlShow2:false,
    kehu_qiankuan_height:70,
    gongyingshang_qiankuan_height:70,
    xiaoshou_dingdan_height:70,
    xiaoshou_shoukuan_height:70,
    xiaoshou_maoli_height:70,
    dingdan_zoushi_height:300,
    shoukuan_zoushi_height:300,
    fukuan_zoushi_height:300,
    xiaoshou_tiaojian:'按业务员',
    xiaoshou_tiaojian_list:[
      {name:'按业务员'},
      {name:'按客户'},
      {name:'按商品'},
    ],
    xiaoshou_riqi:'本月',
    xiaoshou_riqi_list:[
      {name:'本月'},
      {name:'本年'},
    ],

    xiaoshou_shoukuan_tiaojian:'按业务员',
    xiaoshou_shoukuan_riqi:'本月',
    xiaoshou_shoukuan_tiaojian_list:[
      {name:'按业务员'},
      {name:'按客户'},
    ],
    xiaoshou_shoukuan_riqi_list:[
      {name:'本月'},
      {name:'本年'},
    ],

    xiaoshou_maoli_tiaojian:'按业务员',
    xiaoshou_maoli_riqi:'本月',
    xiaoshou_maoli_tiaojian_list:[
      {name:'按业务员'},
      {name:'按客户'},
      {name:'按商品'},
    ],
    xiaoshou_maoli_riqi_list:[
      {name:'本月'},
      {name:'本年'},
    ],

    dingdan_zoushi_riqi:'本月',
    dingdan_zoushi_riqi_list:[
      {name:'本月'},
      {name:'本年'},
    ],

    shoukuan_zoushi_riqi:'本月',
    shoukuan_zoushi_riqi_list:[
      {name:'本月'},
      {name:'本年'},
    ],

    fukuan_zoushi_riqi:'本月',
    fukuan_zoushi_riqi_list:[
      {name:'本月'},
      {name:'本年'},
    ],

    huizong_riqi:'今日',
    huizong_riqi_list:[
      {name:'今日'},
      {name:'本月'},
      {name:'本年'},
    ],

    dingdan:0,
    chuku:0,
    shoukuan:0,
    maoli:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo,
    })
  },

  kehu_qiankuan_goto:function(){
    var _this = this
    wx.navigateTo({
      url: '../../../package_ruilida/page/kehu_qiankuan_tongji/kehu_qiankuan_tongji?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  gongyingshang_qiankuan_goto:function(){
    var _this = this
    wx.navigateTo({
      url: '../../../package_ruilida/page/gongyingshang_qiankuan_tongji/gongyingshang_qiankuan_tongji?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  dingdan_zoushi_goto:function(){
    var _this = this
    wx.navigateTo({
      url: '../xiaoshou_dingdan_zoushi/xiaoshou_dingdan_zoushi?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  shoukuan_zoushi_goto:function(){
    var _this = this
    wx.navigateTo({
      url: '../xiaoshou_shoukuan_zoushi/xiaoshou_shoukuan_zoushi?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  fukuan_zoushi_goto:function(){
    var _this = this
    wx.navigateTo({
      url: '../caigou_fukuan_zoushi/caigou_fukuan_zoushi?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  dingdan_goto:function(){
    var _this = this
    var xiaoshou_riqi = _this.data.huizong_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }else if(xiaoshou_riqi == '今日'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      stop_date = start_date
    }
    var tiaojian = {
        start_date:start_date,
        stop_date:stop_date,
        customer:'',
        shenhe_zhuangtai:'',
      }
    wx.navigateTo({
      url: '../../../package_ruilida/page/xiaoshou_dingdan/xiaoshou_dingdan?userInfo=' + JSON.stringify(_this.data.userInfo) + "&tiaojian=" + JSON.stringify(tiaojian),
    })
  },

  chuku_goto:function(){
    var _this = this
    var xiaoshou_riqi = _this.data.huizong_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }else if(xiaoshou_riqi == '今日'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      stop_date = start_date
    }
    var tiaojian = {
        start_date:start_date,
        stop_date:stop_date,
        customer:'',
      }
    wx.navigateTo({
      url: '../../../package_ruilida/page/xiaoshou_chuku/xiaoshou_chuku?userInfo=' + JSON.stringify(_this.data.userInfo) + "&tiaojian=" + JSON.stringify(tiaojian),
    })
  },

  shoukuan_goto:function(){
    var _this = this
    var xiaoshou_riqi = _this.data.huizong_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }else if(xiaoshou_riqi == '今日'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      stop_date = start_date
    }
    var tiaojian = {
        start_date:start_date,
        stop_date:stop_date,
        dianpu:'',
        jizhangren:'',
        jizhang_zhanghu:'',
      }
      wx.navigateTo({
        url: '../../../package_ruilida/page/caigou_fukuan/caigou_fukuan?userInfo=' + JSON.stringify(_this.data.userInfo) + "&shouzhi_type=收入记录" + "&tiaojian=" + JSON.stringify(tiaojian),
      })
  },

  maoli_goto:function(){
    var _this = this
    var _this = this
    var xiaoshou_riqi = _this.data.huizong_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }else if(xiaoshou_riqi == '今日'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      stop_date = start_date
    }
    var tiaojian = {
      start_date:start_date,
      stop_date:stop_date,
    }
    wx.navigateTo({
      url: '../../../package_ruilida/page/maoli_tongji/maoli_tongji?userInfo=' + JSON.stringify(_this.data.userInfo) + "&tiaojian=" + JSON.stringify(tiaojian),
    })
  },

  maoli_goto2:function(){
    var _this = this
    var _this = this
    var xiaoshou_riqi = _this.data.xiaoshou_maoli_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }
    var tiaojian = {
      start_date:start_date,
      stop_date:stop_date,
    }
    wx.navigateTo({
      url: '../../../package_ruilida/page/maoli_tongji/maoli_tongji?userInfo=' + JSON.stringify(_this.data.userInfo) + "&tiaojian=" + JSON.stringify(tiaojian),
    })
  },

  xiaoshou_dingdan_goto:function(){
    var _this = this
    var _this = this
    var xiaoshou_riqi = _this.data.xiaoshou_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }else if(xiaoshou_riqi == '今日'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      stop_date = start_date
    }
    var tiaojian = {
      start_date:start_date,
      stop_date:stop_date,
    }
    wx.navigateTo({
      url: '../../../package_ruilida/page/xiaoshou_dingdan_tongji/xiaoshou_dingdan_tongji?userInfo=' + JSON.stringify(_this.data.userInfo) + "&tiaojian=" + JSON.stringify(tiaojian),
    })
  },

  xiaoshou_shoukuan_goto:function(){
    var _this = this
    var _this = this
    var xiaoshou_riqi = _this.data.xiaoshou_shoukuan_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }else if(xiaoshou_riqi == '今日'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      stop_date = start_date
    }
    var tiaojian = {
      start_date:start_date,
      stop_date:stop_date,
    }
    wx.navigateTo({
      url: '../../../package_ruilida/page/xiaoshou_shoukuan_tongji/xiaoshou_shoukuan_tongji?userInfo=' + JSON.stringify(_this.data.userInfo) + "&tiaojian=" + JSON.stringify(tiaojian),
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
      _this.setData({
        [click_column]:new_val
      })
      if(click_column == 'xiaoshou_tiaojian' || click_column == 'xiaoshou_riqi'){
        _this.xiaoshou_dingdan_paihang()
      }else if(click_column == 'xiaoshou_shoukuan_tiaojian' || click_column == 'xiaoshou_shoukuan_riqi'){
        _this.xiaoshou_shoukuan_paihang()
      }else if(click_column == 'xiaoshou_maoli_tiaojian' || click_column == 'xiaoshou_maoli_riqi'){
        _this.xiaoshou_maoli_paihang()
      }else if(click_column == 'dingdan_zoushi_riqi'){
        _this.xiaoshou_dingdan_zoushi()
      }else if(click_column == 'shoukuan_zoushi_riqi'){
        _this.xiaoshou_shoukuan_zoushi()
      }else if(click_column == 'fukuan_zoushi_riqi'){
        _this.caigou_fukuan_zoushi()
      }else if(click_column == 'huizong_riqi'){
        _this.top_huizong()
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },

  top_huizong: function(){
    var _this = this
    var sql = ""
    var xiaoshou_riqi = _this.data.huizong_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }else if(xiaoshou_riqi == '今日'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      stop_date = start_date
    }
    sql = "select isnull(sum(convert(float,isnull(jiashui_heji,0))),0) as dingdan from xiaoshou_dingdan where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "';select isnull(sum(convert(float,isnull(jiashui_xiaoji,0))),0) as chuku from xiaoshou_chuku as chuku left join xiaoshou_chuku_item as item on chuku.id = item.chuku_id where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "';select isnull(sum(convert(float,isnull(jizhang_jine,0))) + sum(convert(float,isnull(kedi_shuie,0))),0) as shoukuan from shouzhi_mingxi where (danju_leixing = '销售订单' or danju_leixing = '销售出库') and shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "';select isnull(sum(jiashui_xiaoji - shuliang * caigou_price),0) as maoli from(select riqi,kehu,yewuyuan,shangpin_bianma,convert(float,isnull(shuliang,0)) as shuliang,convert(float,isnull(jiashui_xiaoji,0)) as jiashui_xiaoji,convert(float,isnull(caigou_price,0)) as caigou_price from (select riqi,kehu,yewuyuan,shangpin_bianma,shuliang,jiashui_xiaoji from xiaoshou_chuku as chuku left join xiaoshou_chuku_item as item on chuku.id = item.chuku_id) as dingdan left join product_item on dingdan.shangpin_bianma = product_item.bianhao) as maoli where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' order by sum(jiashui_xiaoji - shuliang * caigou_price);"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida', 
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var dingdan = Math.round(res.result.recordsets[0][0].dingdan * 100) / 100
        var chuku = Math.round(res.result.recordsets[1][0].chuku * 100) / 100
        var shoukuan = Math.round(res.result.recordsets[2][0].shoukuan * 100) / 100
        var maoli = Math.round(res.result.recordsets[3][0].maoli * 100) / 100
        _this.setData({
          dingdan,
          chuku,
          shoukuan,
          maoli
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

  xiaoshou_dingdan_paihang: function(){
    var _this = this
    var sql = ""
    var type = _this.data.xiaoshou_tiaojian
    var xiaoshou_riqi = _this.data.xiaoshou_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }

    if(_this.data.xiaoshou_tiaojian == '按业务员'){
      sql = "select yewuyuan as name,sum(convert(float,isnull(jiashui_heji,0))) as money from xiaoshou_dingdan where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by yewuyuan order by money "
    }else if(_this.data.xiaoshou_tiaojian == '按客户'){
      sql = "select kehu as name,sum(convert(float,isnull(jiashui_heji,0))) as money from xiaoshou_dingdan where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by kehu order by money "
    }else if(_this.data.xiaoshou_tiaojian == '按商品'){
      sql = "select shangpin_mingcheng as name,sum(convert(float,isnull(jiashui_xiaoji,0))) as money from xiaoshou_dingdan left join xiaoshou_dingdan_item on xiaoshou_dingdan.id = xiaoshou_dingdan_item.xiaoshou_id where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by shangpin_mingcheng order by money"
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
        var x_list = []
        var y_list = []
        var xiaoshou_dingdan_height = 70 + list.length * 60
        for(var i=0; i<list.length; i++){
          y_list.push(list[i].name)
          x_list.push(Math.round(list[i].money* 100) / 100)
        }
        var option = {
          grid: {
            left: '5%',
            right: '15%',
            top: '20',
            bottom: '20',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick:{
              show:false // 不显示坐标轴刻度线
            },
            axisLine: {
                  show: false, // 不显示坐标轴线
            },
            axisLabel: {
                  show: false, // 不显示坐标轴上的文字
            },
            splitLine:{
                show:false // 不显示网格线
            },
          },
          yAxis: {
            type: 'category',
            data: y_list
          },
          series: [
            {
              name: '金额',
              type: 'bar',
              data: x_list,
              label: {
                show: true,
                position: 'right'
              },
            },
          ]
        };
        _this.setData({
          xiaoshou_dingdan:option,
          xiaoshou_dingdan_height
        })
        console.log(option)
        _this.selectComponent('#xiaoshou_dingdan').init((canvas, width, height) => {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          barChart.setOption(option,true);
          return barChart;
        });
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

  xiaoshou_shoukuan_paihang: function(){
    var _this = this
    var sql = ""
    var type = _this.data.xiaoshou_shoukuan_tiaojian
    var xiaoshou_riqi = _this.data.xiaoshou_shoukuan_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }

    if(type == '按业务员'){
      sql = "select name,sum(money) as money from (select yewuyuan as name,convert(float,isnull(dingdan.money,0)) + convert(float,isnull(shoukuan.money,0)) as money from (select dingdan.bianhao,chuku.bianhao as chuku_bianhao,dingdan.kehu,dingdan.yewuyuan,money from (select * from xiaoshou_dingdan as dingdan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where danju_leixing = '销售订单' and shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' group by danju_bianhao) as shoukuan on dingdan.bianhao = shoukuan.danju_bianhao) as dingdan left join xiaoshou_chuku as chuku on dingdan.bianhao = chuku.xiaoshou_id) as dingdan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where danju_leixing = '销售出库' and shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' group by danju_bianhao) as shoukuan on dingdan.chuku_bianhao = shoukuan.danju_bianhao) as shoukuan where money > 0 group by name order by money"
    }else if(type == '按客户'){
      sql = "select name,sum(money) as money from (select kehu as name,convert(float,isnull(dingdan.money,0)) + convert(float,isnull(shoukuan.money,0)) as money from (select dingdan.bianhao,chuku.bianhao as chuku_bianhao,dingdan.kehu,dingdan.yewuyuan,money from (select * from xiaoshou_dingdan as dingdan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where danju_leixing = '销售订单' and shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' group by danju_bianhao) as shoukuan on dingdan.bianhao = shoukuan.danju_bianhao) as dingdan left join xiaoshou_chuku as chuku on dingdan.bianhao = chuku.xiaoshou_id) as dingdan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where danju_leixing = '销售出库' and shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' group by danju_bianhao) as shoukuan on dingdan.chuku_bianhao = shoukuan.danju_bianhao) as shoukuan where money > 0 group by name order by money"
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
        var x_list = []
        var y_list = []
        var xiaoshou_shoukuan_height = 70 + list.length * 60
        for(var i=0; i<list.length; i++){
          y_list.push(list[i].name)
          x_list.push(Math.round(list[i].money * 100) / 100)
        }
        var option = {
          grid: {
            left: '5%',
            right: '15%',
            top: '20',
            bottom: '20',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick:{
              show:false // 不显示坐标轴刻度线
            },
            axisLine: {
                  show: false, // 不显示坐标轴线
            },
            axisLabel: {
                  show: false, // 不显示坐标轴上的文字
            },
            splitLine:{
                show:false // 不显示网格线
            },
          },
          yAxis: {
            type: 'category',
            data: y_list
          },
          series: [
            {
              name: '金额',
              type: 'bar',
              data: x_list,
              label: {
                show: true,
                position: 'right'
              },
            },
          ]
        };
        _this.setData({
          xiaoshou_shoukuan:option,
          xiaoshou_shoukuan_height
        })
        console.log(option)
        _this.selectComponent('#xiaoshou_shoukuan').init((canvas, width, height) => {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          barChart.setOption(option,true);
          return barChart;
        });
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

  xiaoshou_maoli_paihang: function(){
    var _this = this
    var sql = ""
    var type = _this.data.xiaoshou_maoli_tiaojian
    var xiaoshou_riqi = _this.data.xiaoshou_maoli_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }

    if(type == '按业务员'){
      sql = "select yewuyuan as name,sum(jiashui_xiaoji) as jiashui_xiaoji,sum(shuliang * caigou_price) as chengben,sum(jiashui_xiaoji - shuliang * caigou_price) as money from(select riqi,kehu,yewuyuan,shangpin_bianma,convert(float,isnull(shuliang,0)) as shuliang,convert(float,isnull(jiashui_xiaoji,0)) as jiashui_xiaoji,convert(float,isnull(caigou_price,0)) as caigou_price from (select riqi,kehu,yewuyuan,shangpin_bianma,shuliang,jiashui_xiaoji from xiaoshou_chuku as chuku left join xiaoshou_chuku_item as item on chuku.id = item.chuku_id) as dingdan left join product_item on dingdan.shangpin_bianma = product_item.bianhao) as maoli where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by yewuyuan order by sum(jiashui_xiaoji - shuliang * caigou_price)"
    }else if(type == '按客户'){
      sql = "select kehu as name,sum(jiashui_xiaoji) as jiashui_xiaoji,sum(shuliang * caigou_price) as chengben,sum(jiashui_xiaoji - shuliang * caigou_price) as money from(select riqi,kehu,yewuyuan,shangpin_bianma,convert(float,isnull(shuliang,0)) as shuliang,convert(float,isnull(jiashui_xiaoji,0)) as jiashui_xiaoji,convert(float,isnull(caigou_price,0)) as caigou_price from (select riqi,kehu,yewuyuan,shangpin_bianma,shuliang,jiashui_xiaoji from xiaoshou_chuku as chuku left join xiaoshou_chuku_item as item on chuku.id = item.chuku_id) as dingdan left join product_item on dingdan.shangpin_bianma = product_item.bianhao) as maoli where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by kehu order by sum(jiashui_xiaoji - shuliang * caigou_price)"
    }else if(type == '按商品'){
      sql = "select name,sum(jiashui_xiaoji) as jiashui_xiaoji,sum(shuliang * caigou_price) as chengben,sum(jiashui_xiaoji - shuliang * caigou_price) as money  from(select riqi,kehu,yewuyuan,shangpin_bianma,name,convert(float,isnull(shuliang,0)) as shuliang,convert(float,isnull(jiashui_xiaoji,0)) as jiashui_xiaoji,convert(float,isnull(caigou_price,0)) as caigou_price from (select riqi,kehu,yewuyuan,shangpin_bianma,name,shuliang,jiashui_xiaoji from xiaoshou_chuku as chuku left join xiaoshou_chuku_item as item on chuku.id = item.chuku_id) as dingdan left join product_item on dingdan.shangpin_bianma = product_item.bianhao) as maoli where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by name order by sum(jiashui_xiaoji - shuliang * caigou_price)"
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
        var x_list = []
        var y_list = []
        var xiaoshou_maoli_height = 70 + list.length * 60
        for(var i=0; i<list.length; i++){
          y_list.push(list[i].name)
          x_list.push(Math.round(list[i].money * 100) / 100)
        }
        var option = {
          grid: {
            left: '5%',
            right: '15%',
            top: '20',
            bottom: '20',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick:{
              show:false // 不显示坐标轴刻度线
            },
            axisLine: {
                  show: false, // 不显示坐标轴线
            },
            axisLabel: {
                  show: false, // 不显示坐标轴上的文字
            },
            splitLine:{
                show:false // 不显示网格线
            },
          },
          yAxis: {
            type: 'category',
            data: y_list
          },
          series: [
            {
              name: '金额',
              type: 'bar',
              data: x_list,
              label: {
                show: true,
                position: 'right'
              },
            },
          ]
        };
        _this.setData({
          xiaoshou_maoli:option,
          xiaoshou_maoli_height
        })
        console.log(option)
        _this.selectComponent('#xiaoshou_maoli').init((canvas, width, height) => {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          barChart.setOption(option,true);
          return barChart;
        });
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

  xiaoshou_dingdan_zoushi: function(){
    var _this = this
    var sql = ""
    var xiaoshou_riqi = _this.data.dingdan_zoushi_riqi
    var start_date = ""
    var stop_date = ""
    var x_list = []
    var y_list = [] 
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
      sql = "select substring(riqi,9,2) as riqi,sum(convert(float,isnull(jiashui_heji,0))) as money from xiaoshou_dingdan where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by SUBSTRING(riqi,9,2)"
      var stop_day = stop_date.split("-")[2] * 1
      for(var i=1; i<=stop_day; i++){
        x_list.push(i + '号')
        y_list.push(0)
      }
      console.log(x_list)
      console.log(y_list)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
      sql = "select SUBSTRING(riqi,6,2) as riqi,sum(convert(float,isnull(jiashui_heji,0))) as money from xiaoshou_dingdan where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by SUBSTRING(riqi,6,2)"
      for(var i=1; i<=12; i++){
        x_list.push(i + '月')
        y_list.push(0)
      }
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
        for(var i=0; i<list.length; i++){
          var index = (list[i].riqi * 1) - 1
          y_list[index] = Math.round(list[i].money * 100) / 100
        }
        var option = {
          grid: {
            left: '5%',
            right: '15%',
            top: '20',
            bottom: '20',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: x_list
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '金额',
              type: 'line',
              data: y_list,
              smooth: true,
              label: {
                show: true,
                position: 'top'
              },
            },
          ]
        };
        _this.setData({
          dingdan_zoushi:option,
        })
        console.log(option)
        _this.selectComponent('#dingdan_zoushi').init((canvas, width, height) => {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          barChart.setOption(option,true);
          return barChart;
        });
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

  xiaoshou_shoukuan_zoushi: function(){
    var _this = this
    var sql = ""
    var xiaoshou_riqi = _this.data.shoukuan_zoushi_riqi
    var start_date = ""
    var stop_date = ""
    var x_list = []
    var y_list = [] 
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
      sql = "select SUBSTRING(shouzhi_riqi,9,2) as riqi,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' and (danju_leixing = '销售订单' or danju_leixing = '销售出库') group by SUBSTRING(shouzhi_riqi,9,2) "
      var stop_day = stop_date.split("-")[2] * 1
      for(var i=1; i<=stop_day; i++){
        x_list.push(i + '号')
        y_list.push(0)
      }
      console.log(x_list)
      console.log(y_list)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
      sql = "select SUBSTRING(shouzhi_riqi,6,2) as riqi,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' and (danju_leixing = '销售订单' or danju_leixing = '销售出库') group by SUBSTRING(shouzhi_riqi,6,2) "
      for(var i=1; i<=12; i++){
        x_list.push(i + '月')
        y_list.push(0)
      }
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
        for(var i=0; i<list.length; i++){
          var index = (list[i].riqi * 1) - 1
          y_list[index] = Math.round(list[i].money * 100) / 100
        }
        var option = {
          grid: {
            left: '5%',
            right: '15%',
            top: '20',
            bottom: '20',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: x_list
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '金额',
              type: 'line',
              data: y_list,
              smooth: true,
              label: {
                show: true,
                position: 'top'
              },
            },
          ]
        };
        _this.setData({
          shoukuan_zoushi:option,
        })
        console.log(option)
        _this.selectComponent('#shoukuan_zoushi').init((canvas, width, height) => {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          barChart.setOption(option,true);
          return barChart;
        });
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

  caigou_fukuan_zoushi: function(){
    var _this = this
    var sql = ""
    var xiaoshou_riqi = _this.data.fukuan_zoushi_riqi
    var start_date = ""
    var stop_date = ""
    var x_list = []
    var y_list = [] 
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
      sql = "select SUBSTRING(shouzhi_riqi,9,2) as riqi,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' and (danju_leixing = '采购订单' or danju_leixing = '采购入库') group by SUBSTRING(shouzhi_riqi,9,2) "
      var stop_day = stop_date.split("-")[2] * 1
      for(var i=1; i<=stop_day; i++){
        x_list.push(i + '号')
        y_list.push(0)
      }
      console.log(x_list)
      console.log(y_list)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
      sql = "select SUBSTRING(shouzhi_riqi,6,2) as riqi,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi where shouzhi_riqi >= '" + start_date + "' and shouzhi_riqi <= '" + stop_date + "' and (danju_leixing = '采购订单' or danju_leixing = '采购入库') group by SUBSTRING(shouzhi_riqi,6,2) "
      for(var i=1; i<=12; i++){
        x_list.push(i + '月')
        y_list.push(0)
      }
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
        for(var i=0; i<list.length; i++){
          var index = (list[i].riqi * 1) - 1
          y_list[index] = Math.round(list[i].money * 100) / 100
        }
        var option = {
          grid: {
            left: '5%',
            right: '15%',
            top: '20',
            bottom: '20',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: x_list
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '金额',
              type: 'line',
              data: y_list,
              smooth: true,
              label: {
                show: true,
                position: 'top'
              },
            },
          ]
        };
        _this.setData({
          fukuan_zoushi:option,
        })
        console.log(option)
        _this.selectComponent('#fukuan_zoushi').init((canvas, width, height) => {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          barChart.setOption(option,true);
          return barChart;
        });
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

  kehu_qiankuan: function(){
    var _this = this
    var sql = "select * from (select kehu,sum(convert(float,isnull(qiankuan,0)) - convert(float,isnull(shoukuan,0))) as qiankuan from (select bianhao,kehu,sum(convert(float,isnull(money,0)) - convert(float,isnull(dingjin_use,0))) as qiankuan from xiaoshou_chuku as chuku left join (select sum(convert(float,isnull(jiashui_xiaoji,0))) as money,chuku_id from xiaoshou_chuku_item group by chuku_id) as item on chuku.id = item.chuku_id group by kehu,bianhao) as qiankuan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0))) + sum(convert(float,isnull(kedi_shuie,0))) as shoukuan from shouzhi_mingxi where danju_leixing = '销售出库' group by danju_bianhao) as shoukuan on qiankuan.bianhao = shoukuan.danju_bianhao group by kehu) as kehu_qiankuan order by qiankuan"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida', 
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var x_list = []
        var y_list = []
        var kehu_qiankuan_height = 70 + list.length * 60
        for(var i=0; i<list.length; i++){
          y_list.push(list[i].kehu)
          x_list.push(Math.round(list[i].qiankuan * 100) / 100)
        }
        var option = {
          grid: {
            left: '5%',
            right: '15%',
            top: '20',
            bottom: '20',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick:{
              show:false // 不显示坐标轴刻度线
            },
            axisLine: {
                  show: false, // 不显示坐标轴线
            },
            axisLabel: {
                  show: false, // 不显示坐标轴上的文字
            },
            splitLine:{
                show:false // 不显示网格线
            },
          },
          yAxis: {
            type: 'category',
            data: y_list
          },
          series: [
            {
              name: '欠款',
              type: 'bar',
              data: x_list,
              label: {
                show: true,
                position: 'right'
              },
            },
          ]
        };
        _this.setData({
          kehu_qiankuan:option,
          kehu_qiankuan_height
        })
        console.log(option)
        _this.selectComponent('#kehu_qiankuan').init((canvas, width, height) => {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          barChart.setOption(option,true);
          return barChart;
        });
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

  gongyingshang_qiankuan: function(){
    var _this = this
    var sql = "select * from (select gongyingshang,sum(convert(float,isnull(qiankuan,0)) - convert(float,isnull(shoukuan,0))) as qiankuan from (select bianhao,gongyingshang,convert(float,isnull(qiankuan,0))-convert(float,isnull(dingjin_use,0)) as qiankuan from caigou_ruku as ruku left join (select ruku_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as qiankuan from caigou_ruku_item group by ruku_id) as item on ruku.id = item.ruku_id) as qiankuan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0))) + sum(convert(float,isnull(kedi_shuie,0))) as shoukuan from shouzhi_mingxi where danju_leixing = '采购入库' group by danju_bianhao) as fukuan on qiankuan.bianhao = fukuan.danju_bianhao group by gongyingshang) as gongyingshang_qiankuan order by qiankuan"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida', 
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var x_list = []
        var y_list = []
        var gongyingshang_qiankuan_height = 70 + list.length * 60
        for(var i=0; i<list.length; i++){
          y_list.push(list[i].gongyingshang)
          x_list.push(Math.round(list[i].qiankuan * 100) / 100)
        }
        var option = {
          grid: {
            left: '5%',
            right: '15%',
            top: '20',
            bottom: '20',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick:{
              show:false // 不显示坐标轴刻度线
            },
            axisLine: {
                  show: false, // 不显示坐标轴线
            },
            axisLabel: {
                  show: false, // 不显示坐标轴上的文字
            },
            splitLine:{
                show:false // 不显示网格线
            },
          },
          yAxis: {
            type: 'category',
            data: y_list
          },
          series: [
            {
              name: '欠款',
              type: 'bar',
              data: x_list,
              label: {
                show: true,
                position: 'right'
              },
            },
          ]
        };
        _this.setData({
          gongyingshang_qiankuan:option,
          gongyingshang_qiankuan_height
        })
        console.log(option)
        _this.selectComponent('#gongyingshang_qiankuan').init((canvas, width, height) => {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          barChart.setOption(option,true);
          return barChart;
        });
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
    _this.kehu_qiankuan()
    _this.gongyingshang_qiankuan()
    _this.xiaoshou_dingdan_paihang()
    _this.xiaoshou_shoukuan_paihang()
    _this.xiaoshou_maoli_paihang()
    _this.xiaoshou_dingdan_zoushi()
    _this.xiaoshou_shoukuan_zoushi()
    _this.caigou_fukuan_zoushi()
    _this.top_huizong()
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