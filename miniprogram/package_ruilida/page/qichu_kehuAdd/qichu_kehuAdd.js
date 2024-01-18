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
      kehu:'',
      qiankuan:'',
      dingjin:'',
    },
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
    if(id != null && id != undefined){
      var sql = "select * from kehu_qichu where id=" + id
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var xiaoshou_body = res.result.recordsets[0][0]
          _this.setData({
            id,
            xiaoshou_body,
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
    xiaoshou_body.bianhao = kehu_list[index].bianhao
    xiaoshou_body.name = kehu_list[index].name
    _this.setData({
      xiaoshou_body
    })
    _this.qxShow()
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



  get_peizhi:function(){
    var _this = this
    wx.showLoading({
      title:'加载中'
    })
    var sql = "select *,1 as isselect from customer;"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var kehu_list = res.result.recordsets[0]
        _this.setData({
          kehu_list,
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
    var xiaoshou_body = _this.data.xiaoshou_body
    if(xiaoshou_body.name == ''){
      wx.showToast({
        title: '请选择客户',
        icon: 'none'
      })
      return;
    }
    if(xiaoshou_body.qiankuan == '' && xiaoshou_body.dingjin == ''){
      wx.showToast({
        title: '请输入欠款或定金',
        icon: 'none'
      })
      return;
    }
    if(xiaoshou_body.id == ''){
      wx.showLoading({
        title:'保存中'
      })

      var sql = "insert into kehu_qichu(bianhao,name,qiankuan,dingjin) output inserted.id values('" + xiaoshou_body.bianhao + "','" + xiaoshou_body.name + "','" + xiaoshou_body.qiankuan + "','" + xiaoshou_body.dingjin + "')"
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
    }else{
      console.log(xiaoshou_body)
      wx.showLoading({
        title:'保存中'
      })
      var sql = "update kehu_qichu set bianhao='" + xiaoshou_body.bianhao + "',name='" + xiaoshou_body.name + "',qiankuan='" + xiaoshou_body.qiankuan + "',dingjin='" + xiaoshou_body.dingjin + "' where id=" + xiaoshou_body.id
      console.log(xiaoshou_body)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = xiaoshou_body.id
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