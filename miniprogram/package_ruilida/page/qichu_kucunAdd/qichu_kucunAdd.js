// package_ruilida/page/userInfoAdd/userInfoAdd.js
var areaList = require("../../components/data_area.js")
const app = getApp();
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
      dianpu:'',
      cangku:'',
      hesuan_danwei:'',
      caigou_danwei:'',
      dianpu:'',
      yewuyuan:'',
      jinxiang_shuilv:'',
      beizhu:'',
      shenhe:'',
      shenhe_list:'',
      shenhe_zhuangtai:'未提交审核',
    },
    lianxi_list:[
      {
        id:'',
        dianpu:'',
        cangku:'',
        hesuan_danwei:'',
        shangpin_bianma:'',
        name:'',
        guige:'',
        caizhi:'',
        jishu_biaozhun:'',
        zhibao_dengji:'',
        danwei:'',
        shuliang:'',
        lishi_zuidi:'',
        danjia:'',
        jiashui_xiaoji:'',
        jiaohuo_riqi:'',
        beizhu:'',
      }
    ],
    type:'',
    name:'',
    quanxuan_value: false,
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

  bianhao_get:function(e){
    var _this = this
    var index = e.target.dataset.index
    console.log(e)
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
            lianxi_list[index].shangpin_bianma = product_list[i].bianhao
            lianxi_list[index].name = product_list[i].name
            lianxi_list[index].guige = product_list[i].guige 
            lianxi_list[index].caizhi = product_list[i].caizhi
            lianxi_list[index].jishu_biaozhun = product_list[i].jishu_biaozhun
            lianxi_list[index].zhibao_dengji = product_list[i].zhibao_dengji
            lianxi_list[index].danwei = product_list[i].danwei
            lianxi_list[index].lishi_zuidi = product_list[i].zuidijia 
            lianxi_list[index].danjia = (product_list[i].caigou_price * 1).toFixed(2)
            if(lianxi_list[index].danjia != '' && lianxi_list[index].shuliang != ''){
              lianxi_list[index].jiashui_xiaoji = (Math.round(lianxi_list[index].danjia * lianxi_list[index].shuliang * 100) / 100).toFixed(2)
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
    })
    var id = options.id

    _this.get_peizhi()
    if(id != null && id != undefined){
      var sql = "select * from product_qichu where id=" + id
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var lianxi_list = res.result.recordsets[0]
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
    }

    var sql = "select id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item_id,product_id,guige,bianhao,caigou_price,jinxiang,enable,isselect,isnull(shangpin_bianma,'') as shangpin_bianma,isnull(zuidijia,0) as zuidijia from (select p.id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item.id as item_id,product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,convert(float,caigou_price) as caigou_price,jinxiang,xiaoxiang,enable,1 as isselect from product as p left join product_item as item on p.id = item.product_id where enable = '是' ) as pro left join (select shangpin_bianma,min(convert(float,caigou_danjia)) as zuidijia from caigou_dingdan_item group by shangpin_bianma) as price on pro.bianhao = price.shangpin_bianma;"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var product_list = res.result.recordsets[0]
        _this.setData({
          product_list
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

  product_select:function(e){
    var _this = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    console.log(index)
    var product_list = _this.data.product_list
    for(var i=0; i< product_list.length; i++){
      product_list[i].isselect = 1
      product_list[i].checked = false
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

    for(var i=0; i<lianxi_list.length; i++){
      if(product_index != i){ 
        if(lianxi_list[i].shangpin_bianma == product_list[index].bianhao){
          wx.showToast({
            title: '已有此商品，不允许重复选择',
            icon: 'none'
          })
          return;
        }
      }
    }

    lianxi_list[product_index].shangpin_bianma = product_list[index].bianhao
    lianxi_list[product_index].name = product_list[index].name
    lianxi_list[product_index].guige = product_list[index].guige
    lianxi_list[product_index].caizhi = product_list[index].caizhi
    lianxi_list[product_index].jishu_biaozhun = product_list[index].jishu_biaozhun
    lianxi_list[product_index].zhibao_dengji = product_list[index].zhibao_dengji
    lianxi_list[product_index].danwei = product_list[index].danwei
    lianxi_list[product_index].lishi_zuidi = product_list[index].zuidijia 
    lianxi_list[product_index].danjia = (product_list[index].caigou_price * 1).toFixed(2)
    if(product_list[index].checked){
      lianxi_list[product_index].danjia = 0.00
    }
    if(lianxi_list[product_index].danjia != '' && lianxi_list[product_index].shuliang != ''){
      lianxi_list[product_index].jiashui_xiaoji = (Math.round(lianxi_list[product_index].danjia * lianxi_list[product_index].shuliang * 100) / 100).toFixed(2)
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
      gongyingshang_show:false,
      dayin_show: false,
    })
  },

  choiceDate: function (e) {
    var _this = this
    //e.preventDefault(); 
    var column_name = e.target.dataset.column_name
    if(column_name == 'riqi'){
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

  goto_product:function(){
    var _this = this
    _this.qxShow()
    wx.navigateTo({
      url: '../product/product?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  get_peizhi:function(){
    var _this = this
    wx.showLoading({
      title:'加载中'
    })
    var sql = "select * from peizhi where type = '仓库';select * from peizhi where type = '店铺';select id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item_id,product_id,guige,bianhao,caigou_price,jinxiang,enable,isselect,isnull(shangpin_bianma,'') as shangpin_bianma,isnull(zuidijia,0) as zuidijia from (select p.id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item.id as item_id,product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,convert(float,caigou_price) as caigou_price,jinxiang,xiaoxiang,enable,1 as isselect from product as p left join product_item as item on p.id = item.product_id where enable = '是' ) as pro left join (select shangpin_bianma,min(convert(float,caigou_danjia)) as zuidijia from caigou_dingdan_item group by shangpin_bianma) as price on pro.bianhao = price.shangpin_bianma;select * from userInfo;select * from peizhi_shuilv;select * from peizhi where type = '核算单位';select * from peizhi where type = '增值税率';"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var cangku_list = res.result.recordsets[0]
        var dianpu_list = res.result.recordsets[1]
        var product_list = res.result.recordsets[2]
        var shenhe_list = res.result.recordsets[3]
        var list_check = res.result.recordsets[3]
        var all_result = []
        var result = []
        for(var i=0; i<list_check.length; i++){
          all_result.push(list_check[i].name)
        }
        console.log(list_check)
        console.log(all_result)
        console.log(result)
        var yewuyuan_list = res.result.recordsets[3]
        var peizhi_shuilv = res.result.recordsets[4][0]
        var hesuan_danwei_list = res.result.recordsets[5]
        var jinxiang_shuilv_list = res.result.recordsets[6]
        _this.setData({
          cangku_list,
          dianpu_list,
          product_list,
          shenhe_list,
          yewuyuan_list,
          hesuan_danwei_list,
          jinxiang_shuilv_list,
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

  save:function(){
    var _this = this
    var lianxi_list = _this.data.lianxi_list
    console.log(lianxi_list)
    for(var i=0; i<lianxi_list.length; i++){
      if(lianxi_list[i].dianpu == ''){
        wx.showToast({
          title: '未选择店铺',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].cangku == ''){
        wx.showToast({
          title: '未选择仓库',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].hesuan_danwei == ''){
        wx.showToast({
          title: '未选择核算单位',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].shangpin_bianma == ''){
        wx.showToast({
          title: '未选择商品',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].shuliang == ''){
        wx.showToast({
          title: '未填写数量',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].danjia == ''){
        wx.showToast({
          title: '未填写单价',
          icon: 'none'
        })
        return;
      }
    }
    if(lianxi_list[0].id == ''){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into product_qichu(shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,danjia,jiashui_xiaoji,dianpu,cangku,hesuan_danwei) values "
      var sql2 = ""
      for(var i=0; i<lianxi_list.length; i++){
        if(sql2 == ""){
          sql2 = "('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].danjia + "','" + lianxi_list[i].jiashui_xiaoji + "','" + lianxi_list[i].dianpu + "','" + lianxi_list[i].cangku + "','" + lianxi_list[i].hesuan_danwei + "')"
        }else{
          sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].danjia + "','" + lianxi_list[i].jiashui_xiaoji + "','" + lianxi_list[i].dianpu + "','" + lianxi_list[i].cangku + "','" + lianxi_list[i].hesuan_danwei + "')"
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
    }else{
      wx.showLoading({
        title:'保存中'
      })
      var sql = "update product_qichu set shangpin_bianma='" + lianxi_list[0].shangpin_bianma + "',name='" + lianxi_list[0].name + "',guige='" + lianxi_list[0].guige + "',caizhi='" + lianxi_list[0].caizhi + "',jishu_biaozhun='" + lianxi_list[0].jishu_biaozhun + "',zhibao_dengji='" + lianxi_list[0].zhibao_dengji + "',danwei='" + lianxi_list[0].danwei + "',shuliang='" + lianxi_list[0].shuliang + "',danjia='" + lianxi_list[0].danjia + "',jiashui_xiaoji='" + lianxi_list[0].jiashui_xiaoji + "',dianpu='" + lianxi_list[0].dianpu + "',cangku='" + lianxi_list[0].cangku + "',hesuan_danwei='" + lianxi_list[0].hesuan_danwei + "' where id=" + lianxi_list[0].id
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
    console.log(_this.data.lianxi_list)
    if(index == undefined){
    }else{
      var lianxi_list = _this.data.lianxi_list
      lianxi_list[index][column] = new_value 
      if(lianxi_list[index].danjia != '' && lianxi_list[index].shuliang != ''){
        lianxi_list[index].jiashui_xiaoji = (Math.round(lianxi_list[index].danjia * lianxi_list[index].shuliang * 100) / 100).toFixed(2)
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
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
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
    var _this = this
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