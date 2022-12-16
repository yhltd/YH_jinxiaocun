// pages/time/time.js
var app = getApp()

var szzhi = [] //
var szsl = []
var szje = []
var khname
var cpxinxi = []
var slxinxi = []
var jgxinxi = []
var pd = 0



Page({

  /**
   * 页面的初始数据
   */

  data: {
    szzhi: [],
    szjg: [],
    szsl: [],
    rkSum: 0,
    rkck: "确认下单",
    hideen1: true,
    hideen2: false,
    pd: 0,
    sjkj: "",
    ddh: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    if (userInfo.power == '客户') {
      _this.setData({
        userInfo: userInfo,
        Customer_id: userInfo.name,
        idd: userInfo.id,
      })
    }

    var bianhao_left = getBianHao()
    var riqi = getNowDate()

    console.log(bianhao_left)

    var sql = "select Documentnumber from Detailsoforder where Documentnumber like '" + bianhao_left + "%'"
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        var bianhao_list = res.result.recordset
        var new_bianhao = "001"
        for (var i = 0; i < bianhao_list.length; i++) {
          if (bianhao_list[i].Documentnumber != '' && bianhao_list[i].Documentnumber != null && bianhao_list[i].Documentnumber != undefined) {
            var this_bianhao = bianhao_list[i].Documentnumber.slice(10)
            console.log(this_bianhao)
            if (this_bianhao >= new_bianhao) {
              new_bianhao = (this_bianhao * 1 + 1).toString()
              if (new_bianhao.length == 1) {
                new_bianhao = "00" + new_bianhao.toString()
              } else if (new_bianhao.length == 2) {
                new_bianhao = "0" + new_bianhao.toString()
              }
              console.log(new_bianhao)
            }
          }
        }
        new_bianhao = bianhao_left.toString() + new_bianhao.toString()
        _this.setData({
          Documentnumber: new_bianhao,
          riqi: riqi
        })
      },
      err: res => {
        wx.showToast({
          title: '读取下拉列表错误！',
          icon: 'none'
        })
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow')
    var _this = this
    var all = wx.getStorageSync("all")
    wx.setStorageSync("all", '')
    var szzhi = _this.data.szzhi
    if (all != '') {
      var zongjia = 0
      for (var i = 0; i < all.length; i++) {
        var panduan = false
        for (var j = 0; j < szzhi.length; j++) {
          if (szzhi[j].NameofProduct == all[i].NameofProduct) {
            panduan = true
            szzhi[j].num = szzhi[j].num * 1 + all[i].num * 1
            break;
          }
        }
        if (panduan == false && all[i].num != '' && all[i].num != undefined && all[i].num != null) {
          szzhi.push(JSON.parse(JSON.stringify(all[i])))
        }
      }
      console.log(szzhi)
      for (var i = 0; i < szzhi.length; i++) {
        zongjia = zongjia + szzhi[i].num * szzhi[i].Theunitprice
      }
      _this.setData({
        szzhi,
        rkSum: zongjia,
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 500
    })
    that.onShow()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  xuanshangpin: function () {
    var _this = this
    wx.setStorageSync('type', '1');
    wx.navigateTo({
      url: '../shangpinxuanze/shangpinxuanze?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
  },

  del:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.id)
    wx.showModal({
      title: '提示',
      content: '确认删除此行数据？',
      success (res) {
        if (res.confirm) {
          var add_list = _this.data.szzhi
          add_list.splice(e.currentTarget.dataset.index,1)
          var zongjia = 0
          console.log(add_list)
          for (var i = 0; i < add_list.length; i++) {
            zongjia = zongjia + add_list[i].num * add_list[i].Theunitprice
          }
          _this.setData({
            szzhi:add_list,
            rkSum: zongjia,
          })
          console.log(add_list)
        } else if (res.cancel) {

        }
      }
    })
  },

  querenRk: function () {
    var _this = this
    var rk_list = _this.data.szzhi
    if(rk_list.length == 0){
      wx.showToast({
        title: '未选择商品',
        icon:'none',
      })
      return;
    }
    var userInfo = _this.data.userInfo
    var sql1 = "insert into Detailsoforder(Customer_id,Documentnumber,riqi,NameofProduct,unit,Theunitprice,number) values "
    var sql2 = ""
    for (var i = 0; i < rk_list.length; i++) {
      if (sql2 == "") {
        sql2 = "('" + userInfo.id + "','" + _this.data.Documentnumber + "','" + _this.data.riqi + "','" + rk_list[i].NameofProduct + "','" + rk_list[i].unit + "','" + rk_list[i].Theunitprice + "','" + rk_list[i].num + "')"
      } else {
        sql2 = sql2 + ",('" + userInfo.id + "','" + _this.data.Documentnumber + "','" + _this.data.riqi + "','" + rk_list[i].NameofProduct + "','" + rk_list[i].unit + "','" + rk_list[i].Theunitprice + "','" + rk_list[i].num + "')"
      }
    }
    var sql = sql1 + sql2
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '下单成功！',
          icon: 'none'
        })
        var common_Interval = setInterval(() => {
          wx.navigateBack({
            delta: 1
          });
          clearInterval(common_Interval);
        }, 2000)
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },
})

function getBianHao() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day = date.getDate(); // 日
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
  var currentdate = year.toString() + month.toString() + day.toString();
  return currentdate;
}

function getNowDate() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day = date.getDate(); // 日
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
  var currentdate = year + sign1 + month + sign1 + day;
  return currentdate;
}