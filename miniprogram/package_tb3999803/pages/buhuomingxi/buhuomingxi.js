// package_tb3999803/pages/buhuomingxi/buhuomingxi.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  tjShow: false,
  xgShow: false,
  cxShow: false,
  data: {
    xm_type: ['补板','配件','返厂','外购','整改','少料'],
    dl_type: ['缺大板','缺中板','缺小板','缺条子','灯带板','异形板','拉手板','手工件','弧形板','其他'],
    jd_type: ['已审','已补','入库','缺料'],
    list: [],
    title: [{
      text: "项目",
      width: "230rpx",
      columnName: "xm",
      type: "text",
      isupd: true
    }, {
      text: "大类",
      width: "300rpx",
      columnName: "dl",
      type: "text",
      isupd: true
    }, {
      text: "名称数量",
      width: "450rpx",
      columnName: "mcsl",
      type: "text",
      isupd: true
    }, {
      text: "进度",
      width: "270rpx",
      columnName: "jd",
      type: "text",
      isupd: true
    }, {
      text: "发起日期",
      width: "180rpx",
      columnName: "fqrq",
      type: "text",
      isupd: true
    }, {
      text: "单号",
      width: "300rpx",
      columnName: "dh",
      type: "text",
      isupd: true
    }, {
      text: "客户名称",
      width: "270rpx",
      columnName: "khmc",
      type: "text",
      isupd: true
    }, {
      text: "终端用户",
      width: "270rpx",
      columnName: "zdyh",
      type: "text",
      isupd: true
    }, {
      text: "材料名称",
      width: "350rpx",
      columnName: "clmc",
      type: "text",
      isupd: true
    },
  ],
    id: '',
    xm: '',
    dl: '',
    mcsl: '',
    jd: '',
    clmc: '',
  },

  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo: userInfo,
    })
    var e = ['','']
    _this.tableShow(e)
  },

  bindPickerChange: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.jd_type[e.detail.value]
    })
  },

  bindPickerChange1: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.xm_type[e.detail.value]
    })
  },

  bindPickerChange2: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.dl_type[e.detail.value]
    })
  },

  bindPickerChange3: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.jd_type[e.detail.value]
    })
  },

  choiceDate: function (e) {
    _this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    // sql = "select * from buhuoxialiao where clmc like '%" + e[0] + "%' or xm = '补货' or xm = '补板' or xm = '配件' or xm = '返厂'"
    sql = "select * from buhuoxialiao where jd like '%" + e[0] + "%' and khmc like '%" + e[1] + "%' or xm = '补货' and xm = '补板' and xm = '配件' and xm = '返厂'"
    var userInfo = _this.data.userInfo
    if (userInfo.quanxian == '客户') {
      // sql = sql + " khmc = '" + userInfo.name + "'"
      sql= "select * from buhuoxialiao where khmc = '" + userInfo.name + "' and jd like '%" + e[0] + "%'"
    }
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list
        })
        console.log(list)
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
      },
    })
  },

  upd1: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: "update buhuoxialiao set xm='" + _this.data.xm + "',dl='" + _this.data.dl + "',mcsl='" + _this.data.mcsl + "',jd='" + _this.data.jd + "',clmc='" + _this.data.clmc + "' where id=" + _this.data.id
      },
      success: res => {
        _this.setData({
          id: '',
          xm: '',
          dl: '',
          mcsl: '',
          jd: '',
          clmc: '',
        })
        _this.qxShow()
        var e = ['','']
        _this.tableShow(e)

        wx.showToast({
          title: '修改成功！',
          icon: 'none'
        })
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

  clickView: function (e) {
    var _this = this
    console.log(e)
    var column = e.currentTarget.dataset.column
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      xm: _this.data.list[e.currentTarget.dataset.index].xm,
      dl: _this.data.list[e.currentTarget.dataset.index].dl,
      mcsl: _this.data.list[e.currentTarget.dataset.index].mcsl,
      jd: _this.data.list[e.currentTarget.dataset.index].jd,
      clmc: _this.data.list[e.currentTarget.dataset.index].clmc,
      xgShow: true,
    })
  },

  del1: function () {
    var _this = this
    wx.showModal({
      title: "提示",
      content: '确定删除？',
      cancelColor: '#282B33',
      confirmColor: '#BC4A4A',
      success: res => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlServer_tb3999803',
            data: {
              query: "delete from buhuoxialiao where id='" + _this.data.id + "'"
            },
            success: res => {
              console.log(res)
              _this.setData({
                id: '',
                xm: '',
                dl: '',
                mcsl: '',
                jd: '',
                clmc: '',
              })
              _this.qxShow()
              var e = ['','']
              _this.tableShow(e)
              wx.showToast({
                title: '删除成功！',
                icon: 'none'
              })
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      cxShow: false,
      xgShow: false,
    })
  },

  // back: function () {
  //   wx.navigateBack({
  //     delta: 1
  //   });
  // },

  
  inquire: function () {
  var _this = this
  _this.setData({
    tjShow: true,
    id: '',
    xm: '',
    dl: '',
    mcsl: '',
    jd: '',
    fqrq: '',
    dh: '',
    khmc: '',
    zdyh: '',
    clmc: '',
  })
},

add1: function () {
  var _this = this

  if (_this.data.khmc == '') {
    wx.showToast({
      title: '请输入客户名称！',
      icon: 'none',
      duration: 3000
    })
    return;
  }

  if (_this.data.zdyh == '') {
    wx.showToast({
      title: '请输入终端用户！',
      icon: 'none',
      duration: 3000
    })
    return;
  }

  if (_this.data.xm == '') {
    wx.showToast({
      title: '请选择项目！',
      icon: 'none',
      duration: 3000
    })
    return;
  }

  if (_this.data.dl == '') {
    wx.showToast({
      title: '请选择大类！',
      icon: 'none',
      duration: 3000
    })
    return;
  }

  if (_this.data.mcsl == '') {
    wx.showToast({
      title: '请输入名称数量！',
      icon: 'none',
      duration: 3000
    })
    return;
  }

  if (_this.data.jd == '') {
    wx.showToast({
      title: '请选择进度！',
      icon: 'none',
      duration: 3000
    })
    return;
  }

  if (_this.data.dh == '') {
    wx.showToast({
      title: '请输入单号！',
      icon: 'none',
      duration: 3000
    })
    return;
  }

  if (_this.data.khmc == '') {
    wx.showToast({
      title: '请输入客户名称！',
      icon: 'none',
      duration: 3000
    })
    return;
  }

  if (_this.data.zdyh == '') {
    wx.showToast({
      title: '请输入终端用户！',
      icon: 'none',
      duration: 3000
    })
    return;
  }

  if (_this.data.clmc == '') {
    wx.showToast({
      title: '请输入材料名称！',
      icon: 'none',
      duration: 3000
    })
    return;
  }

  var sql = ""
  var userInfo = _this.data.userInfo
  var date = new Date();
  sql="insert into buhuoxialiao(xm,dl,mcsl,jd,fqrq,dh,khmc,zdyh,clmc) values('" + _this.data.xm + "','" + _this.data.dl + "','" + _this.data.mcsl + "','" + _this.data.jd + "','" + _this.date.fqrq + "','" + _this.data.dh + "','" + _this.data.khmc + "','" + _this.data.zdyh + "','" + _this.data.clmc + "')"
  if (userInfo.quanxian == '客户') {
    sql="insert into dianmiandingdan(xm,dl,mcsl,jd,fqrq,dh,khmc,zdyh,clms) values('" + _this.data.xm + "','" + _this.data.dl + "','" + _this.data.mcsl + "','" + _this.data.jd + "','" + _this.date.fqrq + "','" + _this.data.dh + "','" + userInfo.khmc + "','" + userInfo.zdyh + "','" + _this.data.clmc + "')"
    }
  wx.cloud.callFunction({
    name: 'sqlServer_tb3999803',
    data: {
      query: sql
    },
    success: res => {
      console.log(res)
      _this.setData({
        id: '',
        khmc: '',
        zdyh: '',
        jd: '',
        bz: '',
        xmfz: '',
        lxfs: '',
        ddsx: '',
        ddh: '',
      })
      var e = ['','']
      _this.qxShow()
      _this.tableShow(e)
      wx.showToast({
        title: '添加成功！',
        icon: 'none'
      })
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

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      khmc: "",
      // zdyh: "",
      // clmc: "",
      jd: "",
    })
  },

  sel1: function () {
    var _this = this
    // var e = [_this.data.clmc]
    var e = [_this.data.jd,_this.data.khmc]
    _this.tableShow(e)
    _this.qxShow()
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
    var e = ['','']
    _this.tableShow(e)
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

// function getNowDate() {
//   var date = new Date();
//   var sign1 = "/";
//   var sign2 = ":";
//   var year = date.getFullYear() // 年
//   var month = date.getMonth() + 1; // 月
//   var day  = date.getDate(); // 日
//   var hour = date.getHours(); // 时
//   var minutes = date.getMinutes(); // 分
//   var seconds = date.getSeconds() //秒
//   var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
//   var week = weekArr[date.getDay()];
//   // 给一位数数据前面加 “0”
//   // if (month >= 1 && month <= 9) {
//   //  month = "0" + month;
//   // }
//   // if (day >= 0 && day <= 9) {
//   //  day = "0" + day;
//   // }
//   // if (hour >= 0 && hour <= 9) {
//   //  hour = "0" + hour;
//   // }
//   // if (minutes >= 0 && minutes <= 9) {
//   //  minutes = "0" + minutes;
//   // }
//   // if (seconds >= 0 && seconds <= 9) {
//   //  seconds = "0" + seconds;
//   // }
//   // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
//   var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
//   return currentdate;
//  }

//ios端字符串转时间戳，字符串必须以yyyy/m/d hh:mm:ss格式放入时间戳
// function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式  
//   var aDate, oDate1, oDate2, iDays
//   aDate = sDate1.split("-")
//   oDate1 = new Date(aDate[0] + '/' + aDate[1] + '/' + aDate[2] + " 00:00:00") //转换为12-18-2002格式  
//   aDate = sDate2.split("-")
//   oDate2 = new Date(aDate[0] + '/' + aDate[1] + '/' + aDate[2] + " 00:00:00")
//   iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
//   if(oDate1 - oDate2 > 0){
//     return iDays
//   }else{
//     return iDays * -1
//   }
// }