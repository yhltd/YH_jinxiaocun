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

    baojia_tou_list:[
      {
        name:'报价单号',
        columnName: "bianhao",
        type: "text",
        width: "250rpx",
      },{
        name:'日期',
        columnName: 'riqi',
        type: "text",
        width: "250rpx",
      },{
        name:'客户',
        columnName: 'kehu',
        type: "text",
        width: "250rpx",
      },{
        name:'业务员',
        columnName: 'yewuyuan',
        type: "text",
        width: "250rpx",
      },{
        name:'店铺',
        columnName: 'dianpu',
        type: "text",
        width: "250rpx",
      },{
        name:'销项税率',
        columnName: 'xiaoxiang_shuilv',
        type: "text",
        width: "250rpx",
      },{
        name:'备注',
        columnName: 'beizhu',
        type: "text",
        width: "250rpx",
      },{
        name:'审核',
        columnName: 'shenhe',
        type: "text",
        width: "250rpx",
      },{
        name:'价格等级',
        columnName: 'jiage_dengji',
        type: "text",
        width: "250rpx",
      }
    ],

    baojia_body_list:[
      {
        name:'商品编号',
        columnName: 'shangpin_bianhao',
        type: "text",
        width: "250rpx",
      },{
        name:'商品名称',
        columnName: 'shangpin_mingcheng',
        type: "text",
        width: "250rpx",
      },{
        name:'规格',
        columnName: 'guige',
        type: "text",
        width: "250rpx",
      },{
        name:'材质',
        columnName: 'caizhi',
        type: "text",
        width: "250rpx",
      },{
        name:'技术标准',
        columnName: 'jishu_biaozhun',
        type: "text",
        width: "250rpx",
      },{
        name:'质保等级',
        columnName: 'zhibao_dengji',
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
        name:'报价单价',
        columnName: 'baojia_danjia',
        type: "text",
        width: "250rpx",
      },{
        name:'价税小计',
        columnName: 'jiashui_xiaoji',
        type: "text",
        width: "250rpx",
      },{
        name:'建议报价',
        columnName: 'jianyi_baojia',
        type: "text",
        width: "250rpx",
      },{
        name:'需用日期',
        columnName: 'xuyong_riqi',
        type: "text",
        width: "250rpx",
      },{
        name:'报价浮动',
        columnName: 'baojia_fudong',
        type: "text",
        width: "250rpx",
      }
    ],

    foot_list:[
      {name:'数量合计'},
      {name:'金额合计'},
    ],

    xiaoshou_tou_list:[
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
        name:'客户',
        columnName: 'kehu',
        type: "text",
        width: "250rpx",
      },{
        name:'客户价格等级',
        columnName: 'jiage_dengji',
        type: "text",
        width: "250rpx",
      },{
        name:'业务员',
        columnName: 'yewuyuan',
        type: "text",
        width: "250rpx",
      },{
        name:'收件人姓名',
        columnName: 'shoujianren',
        type: "text",
        width: "250rpx",
      },{
        name:'收件人手机',
        columnName: 'shoujian_phone',
        type: "text",
        width: "250rpx",
      },{
        name:'收件人地址',
        columnName: 'shoujian_dizhi',
        type: "text",
        width: "250rpx",
      },{
        name:'店铺',
        columnName: 'dianpu',
        type: "text",
        width: "250rpx",
      },{
        name:'销项税率',
        columnName: 'xiaoxiang_shuilv',
        type: "text",
        width: "250rpx",
      },{
        name:'备注',
        columnName: 'beizhu',
        type: "text",
        width: "250rpx",
      }
    ],

    xiaoshou_body_list:[
      {
        name:'商品编号',
        columnName: 'shangpin_bianhao',
        type: "text",
        width: "250rpx",
      },{
        name:'商品名称',
        columnName: 'shangpin_mingcheng',
        type: "text",
        width: "250rpx",
      },{
        name:'规格',
        columnName: 'guige',
        type: "text",
        width: "250rpx",
      },{
        name:'材质',
        columnName: 'caizhi',
        type: "text",
        width: "250rpx",
      },{
        name:'技术标准',
        columnName: 'jishu_biaozhun',
        type: "text",
        width: "250rpx",
      },{
        name:'质保等级',
        columnName: 'zhibao_dengji',
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
        columnName: 'baojia_danjia',
        type: "text",
        width: "250rpx",
      },{
        name:'价税小计',
        columnName: 'jiashui_xiaoji',
        type: "text",
        width: "250rpx",
      },{
        name:'建议报价',
        columnName: 'jianyi_baojia',
        type: "text",
        width: "250rpx",
      },{
        name:'需用日期',
        columnName: 'xuyong_riqi',
        type: "text",
        width: "250rpx",
      },{
        name:'报价浮动',
        columnName: 'baojia_fudong',
        type: "text",
        width: "250rpx",
      }
    ],

    chuku_tou_list:[
      {
        name:'入库编号',
        columnName: "bianhao",
        type: "text",
        width: "250rpx",
      },{
        name:'日期',
        columnName: 'riqi',
        type: "text",
        width: "250rpx",
      },{
        name:'销售单号',
        columnName: 'xiaoshou_id',
        type: "text",
        width: "250rpx",
      },{
        name:'客户',
        columnName: 'kehu',
        type: "text",
        width: "250rpx",
      },{
        name:'店铺',
        columnName: 'dianpu',
        type: "text",
        width: "250rpx",
      },{
        name:'仓库',
        columnName: 'cangku',
        type: "text",
        width: "250rpx",
      },{
        name:'备注',
        columnName: 'beizhu',
        type: "text",
        width: "250rpx",
      }
    ],

    chuku_body_list:[
      {
        name:'商品编号',
        columnName: 'shangpin_bianma',
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
        name:'材质',
        columnName: 'caizhi',
        type: "text",
        width: "250rpx",
      },{
        name:'技术标准',
        columnName: 'jishu_biaozhun',
        type: "text",
        width: "250rpx",
      },{
        name:'质保等级',
        columnName: 'zhibao_dengji',
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
        name:'销售单价',
        columnName: 'xiaoshou_danjia',
        type: "text",
        width: "250rpx",
      },{
        name:'价税小计',
        columnName: 'jiashui_xiaoji',
        type: "text",
        width: "250rpx",
      }
    ],

    caigou_tou_list:[
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
      }
    ],

    caigou_body_list:[
      {
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

    ruku_tou_list:[
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
        name:'仓库',
        columnName: 'cangku',
        type: "text",
        width: "250rpx",
      }
    ],

    ruku_body_list:[
      {
        name:'商品编号',
        columnName: 'shangpin_bianma',
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
        name:'材质',
        columnName: 'caizhi',
        type: "text",
        width: "250rpx",
      },{
        name:'技术标准',
        columnName: 'jishu_biaozhun',
        type: "text",
        width: "250rpx",
      },{
        name:'质保等级',
        columnName: 'zhibao_dengji',
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
      }
    ],

    peizhi_dayin_body: {
      id:'',
      tou1:'',
      tou1_b:'',
      tou2:'',
      tou2_b:'',
      tou3:'',
      tou3_b:'',
      body1:'',
      body1_b:'',
      body2:'',
      body2_b:'',
      body3:'',
      body3_b:'',
      body4:'',
      body4_b:'',
      foot1:'',
      foot1_b:'',
      foot2:'',
      foot2_b:'',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    console.log(areaList.list)
    var userInfo = JSON.parse(options.userInfo)
    var id = options.id
    _this.setData({
      id:id,
      userInfo,
      areaList: areaList.list
    })
    var userInfo = _this.data.userInfo
    var sql = "select * from peizhi_dayin where id=" + id
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var peizhi_dayin_body = res.result.recordset[0]
        _this.setData({
          peizhi_dayin_body,
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
    var peizhi_dayin_body = _this.data.peizhi_dayin_body
    peizhi_dayin_body[column_name] = e.detail.value
    console.log(e.detail.value)
    console.log(column_name)
    _this.setData({
      peizhi_dayin_body
    })

  },

  save:function(){
    var _this = this
    var userInfo = _this.data.userInfo
    var peizhi_dayin_body = _this.data.peizhi_dayin_body
    wx.showLoading({
      title:'保存中'
    })
    var sql = "update peizhi_dayin set tou1='" + peizhi_dayin_body.tou1 + "',tou1_b='" + peizhi_dayin_body.tou1_b + "',tou2='" + peizhi_dayin_body.tou2 + "',tou2_b='" + peizhi_dayin_body.tou2_b + "',tou3='" + peizhi_dayin_body.tou3 + "',tou3_b='" + peizhi_dayin_body.tou3_b + "',body1='" + peizhi_dayin_body.body1 + "',body1_b='" + peizhi_dayin_body.body1_b + "',body2='" + peizhi_dayin_body.body2 + "',body2_b='" + peizhi_dayin_body.body2_b + "',body3='" + peizhi_dayin_body.body3 + "',body3_b='" + peizhi_dayin_body.body3_b + "',body4='" + peizhi_dayin_body.body4 + "',body4_b='" + peizhi_dayin_body.body4_b + "',foot1='" + peizhi_dayin_body.foot1 + "',foot1_b='" + peizhi_dayin_body.foot1_b + "',foot2='" + peizhi_dayin_body.foot2 + "',foot2_b='" + peizhi_dayin_body.foot2_b + "' where id=" + peizhi_dayin_body.id
    console.log(peizhi_dayin_body) 
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
    console.log(_this.data.peizhi_dayin_body)
    console.log(_this.data.lianxi_list)
    var peizhi_dayin_body = _this.data.peizhi_dayin_body
    peizhi_dayin_body[column] = new_value
    _this.setData({
      peizhi_dayin_body
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
    var list = []
    if(_this.data.peizhi_dayin_body.id == 1){
      if(column == 'tou1_b' || column == 'tou2_b' || column == 'tou3_b'){
        list = _this.data.baojia_tou_list
      }else if(column == 'body1_b' || column == 'body2_b' || column == 'body3_b' || column == 'body4_b' ){
        list = _this.data.baojia_body_list
      }else if(column == 'foot1_b' || column == 'foot2_b' || column == 'foot3_b'){
        list = _this.data.foot_list
      }
    }else if(_this.data.peizhi_dayin_body.id == 2){
      if(column == 'tou1_b' || column == 'tou2_b' || column == 'tou3_b'){
        list = _this.data.xiaoshou_tou_list
      }else if(column == 'body1_b' || column == 'body2_b' || column == 'body3_b' || column == 'body4_b' ){
        list = _this.data.xiaoshou_body_list
      }else if(column == 'foot1_b' || column == 'foot2_b' || column == 'foot3_b'){
        list = _this.data.foot_list
      }
    }else if(_this.data.peizhi_dayin_body.id == 3){
      if(column == 'tou1_b' || column == 'tou2_b' || column == 'tou3_b'){
        list = _this.data.chuku_tou_list
      }else if(column == 'body1_b' || column == 'body2_b' || column == 'body3_b' || column == 'body4_b' ){
        list = _this.data.chuku_body_list
      }else if(column == 'foot1_b' || column == 'foot2_b' || column == 'foot3_b'){
        list = _this.data.foot_list
      }
    }else if(_this.data.peizhi_dayin_body.id == 4){
      if(column == 'tou1_b' || column == 'tou2_b' || column == 'tou3_b'){
        list = _this.data.caigou_tou_list
      }else if(column == 'body1_b' || column == 'body2_b' || column == 'body3_b' || column == 'body4_b' ){
        list = _this.data.caigou_body_list
      }else if(column == 'foot1_b' || column == 'foot2_b' || column == 'foot3_b'){
        list = _this.data.foot_list
      }
    }else if(_this.data.peizhi_dayin_body.id == 5){
      if(column == 'tou1_b' || column == 'tou2_b' || column == 'tou3_b'){
        list = _this.data.ruku_tou_list
      }else if(column == 'body1_b' || column == 'body2_b' || column == 'body3_b' || column == 'body4_b' ){
        list = _this.data.ruku_body_list
      }else if(column == 'foot1_b' || column == 'foot2_b' || column == 'foot3_b'){
        list = _this.data.foot_list
      }
    }
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
      var peizhi_dayin_body = _this.data.peizhi_dayin_body
      peizhi_dayin_body[click_column] = new_val
      _this.setData({
        xlShow2: false,
        peizhi_dayin_body,
      })
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