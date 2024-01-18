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
      bianhao:'',
      name:'',
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
      areaList: areaList.list,
    })
    var id = options.id
    _this.get_peizhi()
    if(id != null && id != undefined){
      var sql = "select * from gongyingshang_qichu where id=" + id 
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var caigou_body = res.result.recordsets[0][0]
          _this.setData({
            id,
            caigou_body,
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

  gongyingshang_select:function(e){
    var _this = this
    console.log(e)
    var gongyingshang_list = _this.data.gongyingshang_list
    for(var i=0; i< gongyingshang_list.length; i++){
      gongyingshang_list[i].isselect = 1
    }
    console.log(gongyingshang_list)
    _this.setData({
      gongyingshang_show: true,
      gongyingshang_list,
      type:'',
      name:'',
    })
  },

  sel_gongyingshang:function(){
    var _this = this
    var gongyingshang_list = _this.data.gongyingshang_list
    var name = _this.data.name
    for(var i=0; i<gongyingshang_list.length; i++){
      if(name == ''){
        gongyingshang_list[i].isselect = 1
      }else if(name != ''){
        if(gongyingshang_list[i].name.indexOf(name) != -1){
          gongyingshang_list[i].isselect = 1
        }else{
          gongyingshang_list[i].isselect = 0
        }
      }
    }
    _this.setData({
      gongyingshang_list
    })
  },

  gongyingshang_click:function(e){
    var _this = this
    var index = e.currentTarget.dataset.index
    var gongyingshang_list = _this.data.gongyingshang_list
    var caigou_body = _this.data.caigou_body
    caigou_body.name = gongyingshang_list[index].name
    caigou_body.bianhao = gongyingshang_list[index].bianhao
    _this.setData({
      caigou_body
    })
    _this.qxShow()
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
      var caigou_body = _this.data.caigou_body
      caigou_body.riqi = e.detail.value
      _this.setData({
        caigou_body
      })
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

  goto_gongyingshang:function(){
    var _this = this
    _this.qxShow()
    wx.navigateTo({
      url: '../gongyingshang/gongyingshang?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  get_peizhi:function(){
    var _this = this
    wx.showLoading({
      title:'加载中'
    })
    var sql = "select * from gongyingshang"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var gongyingshang_list = res.result.recordsets[0]
        _this.setData({
          gongyingshang_list,
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
    var caigou_body = _this.data.caigou_body
    console.log(caigou_body)
    if(caigou_body.name == ''){
      wx.showToast({
        title: '请选择供应商',
        icon: 'none'
      })
      return;
    }
    if(caigou_body.qiankuan == '' && caigou_body.dingjin == ''){
      wx.showToast({
        title: '请填写欠款或定金',
        icon: 'none'
      })
      return;
    }
    if(caigou_body.id == ''){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into gongyingshang_qichu(bianhao,name,qiankuan,dingjin) output inserted.id values('" + caigou_body.bianhao + "','" + caigou_body.name + "','" + caigou_body.qiankuan + "','" + caigou_body.dingjin + "')"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          caigou_body.id = new_id
          _this.setData({
            caigou_body
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
      console.log(caigou_body)
      wx.showLoading({
        title:'保存中'
      })
      var sql = "update gongyingshang_qichu set bianhao='" + caigou_body.bianhao + "',name='" + caigou_body.name + "',qiankuan='" + caigou_body.qiankuan + "',dingjin='" + caigou_body.dingjin + "' where id=" + caigou_body.id
      console.log(caigou_body)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = caigou_body.id
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
    console.log(_this.data.caigou_body)
    console.log(_this.data.lianxi_list)
    if(index == undefined){
      var caigou_body = _this.data.caigou_body
      caigou_body[column] = new_value
      _this.setData({
        caigou_body
      })
    }else{
      var lianxi_list = _this.data.lianxi_list
      lianxi_list[index][column] = new_value
      if(lianxi_list[index].caigou_danjia != '' && lianxi_list[index].shuliang != ''){
        lianxi_list[index].jiashui_xiaoji = Math.round(lianxi_list[index].caigou_danjia * lianxi_list[index].shuliang * 100) / 100
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
      var caigou_body = _this.data.caigou_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        caigou_body[click_column] = new_val
        _this.setData({
          xlShow2: false,
          caigou_body,
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
    var type = "采购订单"
    var id = _this.data.caigou_body.id
    console.log(id)
    console.log(type)
    wx.navigateTo({
      url: '../fileUpload/fileUpload?userInfo=' + JSON.stringify(_this.data.userInfo) + "&type=" + type + "&id=" + id,
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