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
    quanxian_body: {
      id:'',
      name :'', zhanghaoguanli_add :'', zhanghaoguanli_del :'', zhanghaoguanli_upd :'', zhanghaoguanli_sel :'', quanxian_add :'', quanxian_del :'', quanxian_upd :'', quanxian_sel :'', kehu_add :'', kehu_del :'', kehu_upd :'', kehu_sel :'', gongyingshang_add :'', gongyingshang_del :'', gongyingshang_upd :'', gongyingshang_sel :'', shangpin_add :'', shangpin_del :'', shangpin_upd :'', shangpin_sel :'', fujiashui_upd :'', peizhi_add :'', peizhi_del :'', peizhi_upd :'', peizhi_sel :'', xiaoshou_baojia_add :'', xiaoshou_baojia_del :'', xiaoshou_baojia_upd :'', xiaoshou_baojia_sel :'', xiaoshou_dingdan_add :'', xiaoshou_dingdan_del :'', xiaoshou_dingdan_upd :'', xiaoshou_dingdan_sel :'', xiaoshou_chuku_add :'', xiaoshou_chuku_del :'', xiaoshou_chuku_upd :'', xiaoshou_chuku_sel :'', xiaoshou_kaipiao_add :'', xiaoshou_kaipiao_del :'', xiaoshou_kaipiao_upd :'', xiaoshou_kaipiao_sel :'', shouru_add :'', shouru_del :'', shouru_upd :'', shouru_sel :'', caigou_dingdan_add :'', caigou_dingdan_del :'', caigou_dingdan_upd :'', caigou_dingdan_sel :'', caigou_ruku_add :'', caigou_ruku_del :'', caigou_ruku_upd :'', caigou_ruku_sel :'', caigou_shoupiao_add :'', caigou_shoupiao_del :'', caigou_shoupiao_upd :'', caigou_shoupiao_sel :'', zhichu_add :'', zhichu_del :'', zhichu_upd :'', zhichu_sel :'', zhuanzhang_add :'', zhuanzhang_del :'', zhuanzhang_upd :'', zhuanzhang_sel :'', kucun_sel :'', zhanghu_yue_sel :'', shouru_tongji_sel :'', zhichu_tongji_sel :'', yuedu_tongji_sel :'', fujiashui_sel :'', 
    },
    type:'',
    name:'',
    chakan_list:[
      {name:'查看个人'},
      {name:'查看全部'},
      {name:'否'},
    ],
    quanxian_list:[
      {name:'是'},
      {name:'否'},
    ]
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
    if(id != null && id != undefined){
      var sql = "select * from userPower where id=" + id
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var quanxian_body = res.result.recordset[0]
          _this.setData({
            id,
            quanxian_body,
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

  qxShow:function(){
    var _this = this
    _this.setData({
      xlShow2:false,
      ssqShow:false,
      product_show:false
    })
  },

  save:function(){
    var _this = this
    var quanxian_body = _this.data.quanxian_body
    console.log(quanxian_body)
    if(quanxian_body.name == ''){
      wx.showToast({
        title: '请填写权限名',
        icon: 'none'
      })
      return;
    }
    if(quanxian_body.id == ''){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into userPower(name, zhanghaoguanli_add, zhanghaoguanli_del, zhanghaoguanli_upd, zhanghaoguanli_sel, quanxian_add, quanxian_del, quanxian_upd, quanxian_sel, kehu_add, kehu_del, kehu_upd, kehu_sel, gongyingshang_add, gongyingshang_del, gongyingshang_upd, gongyingshang_sel, shangpin_add, shangpin_del, shangpin_upd, shangpin_sel, fujiashui_upd, peizhi_add, peizhi_del, peizhi_upd, peizhi_sel, xiaoshou_baojia_add, xiaoshou_baojia_del, xiaoshou_baojia_upd, xiaoshou_baojia_sel, xiaoshou_dingdan_add, xiaoshou_dingdan_del, xiaoshou_dingdan_upd, xiaoshou_dingdan_sel, xiaoshou_chuku_add, xiaoshou_chuku_del, xiaoshou_chuku_upd, xiaoshou_chuku_sel, xiaoshou_kaipiao_add, xiaoshou_kaipiao_del, xiaoshou_kaipiao_upd, xiaoshou_kaipiao_sel, shouru_add, shouru_del, shouru_upd, shouru_sel, caigou_dingdan_add, caigou_dingdan_del, caigou_dingdan_upd, caigou_dingdan_sel, caigou_ruku_add, caigou_ruku_del, caigou_ruku_upd, caigou_ruku_sel, caigou_shoupiao_add, caigou_shoupiao_del, caigou_shoupiao_upd, caigou_shoupiao_sel, zhichu_add, zhichu_del, zhichu_upd, zhichu_sel, zhuanzhang_add, zhuanzhang_del, zhuanzhang_upd, zhuanzhang_sel, kucun_sel, zhanghu_yue_sel, shouru_tongji_sel, zhichu_tongji_sel, yuedu_tongji_sel, fujiashui_sel) output inserted.id values('" + quanxian_body.name + "','" + quanxian_body.zhanghaoguanli_add + "','" + quanxian_body.zhanghaoguanli_del + "','" + quanxian_body.zhanghaoguanli_upd + "','" + quanxian_body.zhanghaoguanli_sel + "','" + quanxian_body.quanxian_add + "','" + quanxian_body.quanxian_del + "','" + quanxian_body.quanxian_upd + "','" + quanxian_body.quanxian_sel + "','" + quanxian_body.kehu_add + "','" + quanxian_body.kehu_del + "','" + quanxian_body.kehu_upd + "','" + quanxian_body.kehu_sel + "','" + quanxian_body.gongyingshang_add + "','" + quanxian_body.gongyingshang_del + "','" + quanxian_body.gongyingshang_upd + "','" + quanxian_body.gongyingshang_sel + "','" + quanxian_body.shangpin_add + "','" + quanxian_body.shangpin_del + "','" + quanxian_body.shangpin_upd + "','" + quanxian_body.shangpin_sel + "','" + quanxian_body.fujiashui_upd + "','" + quanxian_body.peizhi_add + "','" + quanxian_body.peizhi_del + "','" + quanxian_body.peizhi_upd + "','" + quanxian_body.peizhi_sel + "','" + quanxian_body.xiaoshou_baojia_add + "','" + quanxian_body.xiaoshou_baojia_del + "','" + quanxian_body.xiaoshou_baojia_upd + "','" + quanxian_body.xiaoshou_baojia_sel + "','" + quanxian_body.xiaoshou_dingdan_add + "','" + quanxian_body.xiaoshou_dingdan_del + "','" + quanxian_body.xiaoshou_dingdan_upd + "','" + quanxian_body.xiaoshou_dingdan_sel + "','" + quanxian_body.xiaoshou_chuku_add + "','" + quanxian_body.xiaoshou_chuku_del + "','" + quanxian_body.xiaoshou_chuku_upd + "','" + quanxian_body.xiaoshou_chuku_sel + "','" + quanxian_body.xiaoshou_kaipiao_add + "','" + quanxian_body.xiaoshou_kaipiao_del + "','" + quanxian_body.xiaoshou_kaipiao_upd + "','" + quanxian_body.xiaoshou_kaipiao_sel + "','" + quanxian_body.shouru_add + "','" + quanxian_body.shouru_del + "','" + quanxian_body.shouru_upd + "','" + quanxian_body.shouru_sel + "','" + quanxian_body.caigou_dingdan_add + "','" + quanxian_body.caigou_dingdan_del + "','" + quanxian_body.caigou_dingdan_upd + "','" + quanxian_body.caigou_dingdan_sel + "','" + quanxian_body.caigou_ruku_add + "','" + quanxian_body.caigou_ruku_del + "','" + quanxian_body.caigou_ruku_upd + "','" + quanxian_body.caigou_ruku_sel + "','" + quanxian_body.caigou_shoupiao_add + "','" + quanxian_body.caigou_shoupiao_del + "','" + quanxian_body.caigou_shoupiao_upd + "','" + quanxian_body.caigou_shoupiao_sel + "','" + quanxian_body.zhichu_add + "','" + quanxian_body.zhichu_del + "','" + quanxian_body.zhichu_upd + "','" + quanxian_body.zhichu_sel + "','" + quanxian_body.zhuanzhang_add + "','" + quanxian_body.zhuanzhang_del + "','" + quanxian_body.zhuanzhang_upd + "','" + quanxian_body.zhuanzhang_sel + "','" + quanxian_body.kucun_sel + "','" + quanxian_body.zhanghu_yue_sel + "','" + quanxian_body.shouru_tongji_sel + "','" + quanxian_body.zhichu_tongji_sel + "','" + quanxian_body.yuedu_tongji_sel + "','" + quanxian_body.fujiashui_sel + "')"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          quanxian_body.id = new_id
          _this.setData({
            quanxian_body
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
      console.log(quanxian_body)
      wx.showLoading({
        title:'保存中'
      })
      var sql = "update userPower set name='" + quanxian_body.name + "',zhanghaoguanli_add='" + quanxian_body.zhanghaoguanli_add + "',zhanghaoguanli_del='" + quanxian_body.zhanghaoguanli_del + "',zhanghaoguanli_upd='" + quanxian_body.zhanghaoguanli_upd + "',zhanghaoguanli_sel='" + quanxian_body.zhanghaoguanli_sel + "',quanxian_add='" + quanxian_body.quanxian_add + "',quanxian_del='" + quanxian_body.quanxian_del + "',quanxian_upd='" + quanxian_body.quanxian_upd + "',quanxian_sel='" + quanxian_body.quanxian_sel + "',kehu_add='" + quanxian_body.kehu_add + "',kehu_del='" + quanxian_body.kehu_del + "',kehu_upd='" + quanxian_body.kehu_upd + "',kehu_sel='" + quanxian_body.kehu_sel + "',gongyingshang_add='" + quanxian_body.gongyingshang_add + "',gongyingshang_del='" + quanxian_body.gongyingshang_del + "',gongyingshang_upd='" + quanxian_body.gongyingshang_upd + "',gongyingshang_sel='" + quanxian_body.gongyingshang_sel + "',shangpin_add='" + quanxian_body.shangpin_add + "',shangpin_del='" + quanxian_body.shangpin_del + "',shangpin_upd='" + quanxian_body.shangpin_upd + "',shangpin_sel='" + quanxian_body.shangpin_sel + "',fujiashui_upd='" + quanxian_body.fujiashui_upd + "',peizhi_add='" + quanxian_body.peizhi_add + "',peizhi_del='" + quanxian_body.peizhi_del + "',peizhi_upd='" + quanxian_body.peizhi_upd + "',peizhi_sel='" + quanxian_body.peizhi_sel + "',xiaoshou_baojia_add='" + quanxian_body.xiaoshou_baojia_add + "',xiaoshou_baojia_del='" + quanxian_body.xiaoshou_baojia_del + "',xiaoshou_baojia_upd='" + quanxian_body.xiaoshou_baojia_upd + "',xiaoshou_baojia_sel='" + quanxian_body.xiaoshou_baojia_sel + "',xiaoshou_dingdan_add='" + quanxian_body.xiaoshou_dingdan_add + "',xiaoshou_dingdan_del='" + quanxian_body.xiaoshou_dingdan_del + "',xiaoshou_dingdan_upd='" + quanxian_body.xiaoshou_dingdan_upd + "',xiaoshou_dingdan_sel='" + quanxian_body.xiaoshou_dingdan_sel + "',xiaoshou_chuku_add='" + quanxian_body.xiaoshou_chuku_add + "',xiaoshou_chuku_del='" + quanxian_body.xiaoshou_chuku_del + "',xiaoshou_chuku_upd='" + quanxian_body.xiaoshou_chuku_upd + "',xiaoshou_chuku_sel='" + quanxian_body.xiaoshou_chuku_sel + "',xiaoshou_kaipiao_add='" + quanxian_body.xiaoshou_kaipiao_add + "',xiaoshou_kaipiao_del='" + quanxian_body.xiaoshou_kaipiao_del + "',xiaoshou_kaipiao_upd='" + quanxian_body.xiaoshou_kaipiao_upd + "',xiaoshou_kaipiao_sel='" + quanxian_body.xiaoshou_kaipiao_sel + "',shouru_add='" + quanxian_body.shouru_add + "',shouru_del='" + quanxian_body.shouru_del + "',shouru_upd='" + quanxian_body.shouru_upd + "',shouru_sel='" + quanxian_body.shouru_sel + "',caigou_dingdan_add='" + quanxian_body.caigou_dingdan_add + "',caigou_dingdan_del='" + quanxian_body.caigou_dingdan_del + "',caigou_dingdan_upd='" + quanxian_body.caigou_dingdan_upd + "',caigou_dingdan_sel='" + quanxian_body.caigou_dingdan_sel + "',caigou_ruku_add='" + quanxian_body.caigou_ruku_add + "',caigou_ruku_del='" + quanxian_body.caigou_ruku_del + "',caigou_ruku_upd='" + quanxian_body.caigou_ruku_upd + "',caigou_ruku_sel='" + quanxian_body.caigou_ruku_sel + "',caigou_shoupiao_add='" + quanxian_body.caigou_shoupiao_add + "',caigou_shoupiao_del='" + quanxian_body.caigou_shoupiao_del + "',caigou_shoupiao_upd='" + quanxian_body.caigou_shoupiao_upd + "',caigou_shoupiao_sel='" + quanxian_body.caigou_shoupiao_sel + "',zhichu_add='" + quanxian_body.zhichu_add + "',zhichu_del='" + quanxian_body.zhichu_del + "',zhichu_upd='" + quanxian_body.zhichu_upd + "',zhichu_sel='" + quanxian_body.zhichu_sel + "',zhuanzhang_add='" + quanxian_body.zhuanzhang_add + "',zhuanzhang_del='" + quanxian_body.zhuanzhang_del + "',zhuanzhang_upd='" + quanxian_body.zhuanzhang_upd + "',zhuanzhang_sel='" + quanxian_body.zhuanzhang_sel + "',kucun_sel='" + quanxian_body.kucun_sel + "',zhanghu_yue_sel='" + quanxian_body.zhanghu_yue_sel + "',shouru_tongji_sel='" + quanxian_body.shouru_tongji_sel + "',zhichu_tongji_sel='" + quanxian_body.zhichu_tongji_sel + "',yuedu_tongji_sel='" + quanxian_body.yuedu_tongji_sel + "',fujiashui_sel='" + quanxian_body.fujiashui_sel + "' where id=" + quanxian_body.id
      console.log(quanxian_body)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = quanxian_body.id
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
    console.log(_this.data.quanxian_body)
    console.log(_this.data.lianxi_list)
    if(index == undefined){
      var quanxian_body = _this.data.quanxian_body
      quanxian_body[column] = new_value
      _this.setData({
        quanxian_body
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
    var list = _this.data.quanxian_list
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

  chakan_show: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    console.log('下标：', e.currentTarget.dataset.index)
    var column = e.currentTarget.dataset.column
    var list = _this.data.chakan_list
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
      var quanxian_body = _this.data.quanxian_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        quanxian_body[click_column] = new_val
        _this.setData({
          xlShow2: false,
          quanxian_body,
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