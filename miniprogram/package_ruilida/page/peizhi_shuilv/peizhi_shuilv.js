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
    shuilv_body: {
      id:'',
      shuilv:'',
      zhuangtai:'',
    },
    zhuangtai_list:[
      {name:'是'},
      {name:'否'}
    ],
    lingshou_zhuangtai_list:[
      {name:'是'},
      {name:'否'}
    ],
    pifa_zhuangtai_list:[
      {name:'是'},
      {name:'否'}
    ],
    dakehu_zhuangtai_list:[
      {name:'是'},
      {name:'否'}
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
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.fujiashui_sel != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    var sql = "select * from peizhi_shuilv"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var shuilv_body = res.result.recordset[0]
        _this.setData({
          shuilv_body,
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
    var shuilv_body = _this.data.shuilv_body
    shuilv_body[column_name] = e.detail.value
    console.log(e.detail.value)
    console.log(column_name)
    _this.setData({
      shuilv_body
    })

  },

  save:function(){
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.fujiashui_upd != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    var shuilv_body = _this.data.shuilv_body
    var lianxi_list = _this.data.lianxi_list
    console.log(shuilv_body)
    console.log(lianxi_list)
    if(shuilv_body.shuilv == '' && shuilv_body.zhuangtai == '是'){
      wx.showToast({
        title: '请填写税率',
        icon: 'none'
      })
      return;
    }
    if(shuilv_body.zhuangtai == ''){
      wx.showToast({
        title: '请选择是否启用',
        icon: 'none'
      })
      return;
    }
    console.log(shuilv_body)
    wx.showLoading({
      title:'保存中'
    })
    var sql = "update peizhi_shuilv set shuilv='" + shuilv_body.shuilv + "',zhuangtai='" + shuilv_body.zhuangtai + "',lingshou='" + shuilv_body.lingshou + "',pifa='" + shuilv_body.pifa + "',dakehu='" + shuilv_body.dakehu + "',lingshou_zhuangtai='" + shuilv_body.lingshou_zhuangtai + "',pifa_zhuangtai='" + shuilv_body.pifa_zhuangtai + "',dakehu_zhuangtai='" + shuilv_body.dakehu_zhuangtai + "',kaipiao_edu='" + shuilv_body.kaipiao_edu + "' where id=" + shuilv_body.id
    console.log(shuilv_body)
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
    console.log(_this.data.shuilv_body)
    console.log(_this.data.lianxi_list)
    var shuilv_body = _this.data.shuilv_body
    shuilv_body[column] = new_value
    _this.setData({
      shuilv_body
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
      var shuilv_body = _this.data.shuilv_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        shuilv_body[click_column] = new_val
        if(click_column == 'shoupiao_danwei'){
          shuilv_body.shibiehao = e.detail.shibiehao
          shuilv_body.kaipiao_dizhi = e.detail.kaipiao_dizhi
          shuilv_body.kaipiao_dianhua = e.detail.kaipiao_dianhua
          shuilv_body.kaipiao_yinhang = e.detail.kaipiao_yinhang
          shuilv_body.kaipiao_zhanghao = e.detail.kaipiao_zhanghao
        }
        _this.setData({
          xlShow2: false,
          shuilv_body,
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