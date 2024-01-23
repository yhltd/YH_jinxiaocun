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
    baojia_body: {
      id:'',
      bianhao:'',
      riqi:'',
      kehu:'',
      yewuyuan:'',
      dianpu:'',
      xiaoshou_danwei:'',
      xiaoxiang_shuilv:'',
      beizhu:'',
      shenhe:'',
      shenhe_list:'',
      shenhe_zhuangtai:'未提交审核',
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
        zuigaojia:'',
        xuyong_riqi:'',
        baojia_fudong:'',
        beizhu:'',
      }
    ],
    type:'',
    name:'',
    quanxuan_value: false,
    caozuo_click_list:[
      {name:'文件上传'},
      {name:'生成销售订单'},
      {name:'打印设置'},
      {name:'打印'},
    ],
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
    var id = options.id
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
          var heji = 0
          for(var i=0; i<lianxi_list.length; i++){
            heji = (heji * 1) + (lianxi_list[i].jiashui_xiaoji * 1)
          }
          baojia_body.heji = heji
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
    }
  },

  more_show:function(){
    var _this = this
    _this.setData({
      xlShow4:true
    })
  },

  select4: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var id = _this.data.baojia_body.id
      if(new_val == '生成销售订单'){
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
        var list = _this.data.baojia_body
        list.item = _this.data.lianxi_list
        wx.navigateTo({
          url: '../xiaoshou_dingdanAdd/xiaoshou_dingdanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + "&type=" + JSON.stringify(list),
        })
      }else if(new_val == '打印'){
        _this.setData({
          xlShow4:false,
        })
        var list = _this.data.baojia_body
        list.item = _this.data.lianxi_list
        var product_list = _this.data.lianxi_list
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
      }else if(new_val = '文件上传'){
        _this.setData({
          xlShow4:false,
        })
        _this.file_goto()
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow4:false,
      })
    }
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

  qxShow:function(){
    var _this = this
    _this.setData({
      xlShow2:false,
      ssqShow:false,
      product_show:false,
      kehu_show:false,
      dayin_show: false,
      xlShow4:false,
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
    var baojia_body = _this.data.baojia_body
    if(baojia_body.jiage_dengji == ''){
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

  onInput_text(e){
    var _this = this
    var new_value = e.detail.value
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    _this.setData({
      [column]: new_value
    })
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

  file_goto:function(){
    var _this = this
    var type = "销售报价单"
    var id = _this.data.baojia_body.id
    console.log(id)
    console.log(type)
    wx.navigateTo({
      url: '../fileUpload/fileUpload?userInfo=' + JSON.stringify(_this.data.userInfo) + "&type=" + type + "&id=" + id,
    })
  },

  baojia_upd:function(){
    var _this = this
    var id = _this.data.baojia_body.id
    console.log(id)
    wx.navigateTo({
      url: '../xiaoshou_baojiaAdd/xiaoshou_baojiaAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
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