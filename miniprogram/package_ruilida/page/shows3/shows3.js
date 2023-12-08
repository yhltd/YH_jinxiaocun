// package_ruilida/page/shows/shows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:[
      {
        text:'转账',
        url: '../zhuanzhang/zhuanzhang',
        icon: "../../image/zhuanzhang.png"
      },
      {
        text:'库存',
        url: '../kucun/kucun',
        icon: "../../image/kucun.png"
      },
      {
        text:'账户余额',
        url: '../zhanghu_yue/zhanghu_yue',
        icon: "../../image/zhanghuyue.png"
      },
      {
        text:'收入分类统计',
        url: '../shouru_fenlei/shouru_fenlei',
        icon: "../../image/shourufenleitongji.png"
      },
      {
        text:'支出分类统计',
        url: '../zhichu_fenlei/zhichu_fenlei',
        icon: "../../image/zhichufenleitongji.png"
      },
      {
        text:'月度收支统计',
        url: '../yuedu_shouzhi/yuedu_shouzhi',
        icon: "../../image/yuedushouzhitongji.png"
      },
      {
        text:'仪表盘',
        url: '../yibiaopan/yibiaopan',
        icon: "../../image/yuedushouzhitongji.png"
      },
    ],
    this_date:'',
    shenhe_list:[
      {num:0},
      {num:0},
      {num:0},
      {num:0},
      {num:0},
    ],
    pass_list:[
      {num:0},
      {num:0},
      {num:0},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var this_date = getNowDate()
    _this.setData({
      userInfo,
      this_date
    }) 
  },

  go:function(e){
    var _this = this
    var index = e.target.dataset.index
    console.log(index)
    var url = _this.data.title[index].url
    if(_this.data.title[index].text == '支出记录'){
      wx.navigateTo({
        url: url + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&shouzhi_type=支出记录",
      })
    }else{
      wx.navigateTo({
        url: url + '?userInfo=' + JSON.stringify(_this.data.userInfo),
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
    wx.showLoading({
      title:'请稍候'
    })
    var _this = this
    var id = _this.data.userInfo.id
    console.log(id)
    var sql = "select * from userInfo where id=" + id + ";select * from userPower;"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var userInfo = res.result.recordsets[0][0]
        var userPower = res.result.recordsets[1]
        for(var i=0; i<userPower.length; i++){
          if(userInfo.power == userPower[i].name){
            userInfo.power_mingxi = userPower[i]
            break;
          }
        }

        var sql = "select '销售报价' as title,count(*) as num from xiaoshou_baojia where shenhe = '"+ userInfo.name +"' and shenhe_zhuangtai = '审核中' union select '销售订单' as title,count(*) as num from xiaoshou_dingdan where shenhe = '"+ userInfo.name +"' and shenhe_zhuangtai = '审核中' union select '采购订单' as title,count(*) as num from caigou_dingdan where shenhe = '"+ userInfo.name +"' and shenhe_zhuangtai = '审核中' union select '销售开票' as title,count(*) as num from xiaoshou_kaipiao where xinxi_tuisong = '"+ userInfo.name +"' and kaipiao_zhuangtai = '待开票' union select '采购收票' as title,count(*) as num from caigou_shoupiao where xinxi_tuisong = '"+ userInfo.name +"' and shoupiao_zhuangtai = '待收票';"
        sql = sql + "select '销售报价' as title,count(*) as num from xiaoshou_baojia where yewuyuan = '"+ userInfo.name +"' and shenhe_zhuangtai = '审核未通过' union select '销售订单' as title,count(*) as num from xiaoshou_dingdan where yewuyuan = '"+ userInfo.name +"' and shenhe_zhuangtai = '审核未通过' union select '采购订单' as title,count(*) as num from caigou_dingdan where gongyingshang = '"+ userInfo.name +"' and shenhe_zhuangtai = '审核未通过'"
        wx.cloud.callFunction({
          name: 'sqlserver_ruilida',
          data: {
            query: sql
          },
          success: res => {
            console.log(res)
            var shenhe_list = res.result.recordsets[0]
            var pass_list = res.result.recordsets[1]
            _this.setData({
              shenhe_list,
              pass_list
            })
            wx.hideLoading()
          },
          err: res => {
            wx.hideLoading()
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
        console.log(userInfo)
        _this.setData({
          userInfo
        })
        wx.hideLoading()
      },
      err: res => {
        wx.hideLoading()
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


  onChange: function (event) {
    var _this = this;
    console.log(_this.data.userInfo.power)
    if (event.detail == 4) {
      wx.redirectTo({
        url: '../shows/shows?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 3) {
      wx.redirectTo({
        url: '../shows3/shows3?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: '../shows1/shows1?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: '../shows2/shows2?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    }else if (event.detail == 0) {
      wx.redirectTo({
        url: '../shows4/shows4?userInfo='+JSON.stringify(_this.data.userInfo)
      })
    }
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
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }