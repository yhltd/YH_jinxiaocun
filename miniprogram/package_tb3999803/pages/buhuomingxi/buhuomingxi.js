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
      width: "150rpx",
      columnName: "xm",
      type: "text",
      isupd: true
    }, {
      text: "大类",
      width: "180rpx",
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
      width: "180rpx",
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
      width: "180rpx",
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
      columnName: "mccl",
      type: "text",
      isupd: true
    },
  ],
    id: '',
    xm: '',
    dl: '',
    mcsl: '',
    jd: '',
    fqrq: '',
    mccl: '',
  },

  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo) 
    _this.setData({
      userInfo: userInfo,
    })
    var e = ['','','','','']
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
    var userInfo = _this.data.userInfo
    // sql = "select * from buhuoxialiao where mccl like '%" + e[0] + "%' or xm = '补货' or xm = '补板' or xm = '配件' or xm = '返厂'"
    // if(e[0] =="" && e[1] == "" && e[2] == "" && e[3] =="" && e[4]== ""){
      if(userInfo.quanxian=='工序员'){
        sql = "select id, xm,dl,mcsl,jd,fqrq,dh,khmc,zdyh,mccl from baogongmingxi  where  jlbh='1' and (xm='补货' or xm='配件' or xm='返厂') and jd is not null and jd != ' ' and (xm like '%" + e[0] + "%' and xm !='少料') and khmc like '%" + e[1] + "%' and zdyh like '%" + e[2] + "%' and mccl like '%" + e[3] + "%' and jd like '%" + e[4] + "%'  order by riqipx desc"
      }else if(userInfo.quanxian=='客户'){
        console.log(111)
        sql = "select id, xm,dl,mcsl,jd,fqrq,dh,khmc,zdyh,mccl from  baogongmingxi  where jlbh='1' and khmc = '" + userInfo.name + "' and (xm like '%" + e[0] + "%' and xm !='少料') and zdyh like '%" + e[2] + "%' and mccl like '%" + e[3] + "%' and jd like '%" + e[4] + "%'  order by riqipx desc"

      }else{
      sql = "select id, xm,dl,mcsl,jd,fqrq,dh,khmc,zdyh,mccl from baogongmingxi  where jlbh='1' and (xm like '%" + e[0] + "%' and xm !='少料') and khmc like '%" + e[1] + "%' and zdyh like '%" + e[2] + "%' and mccl like '%" + e[3] + "%' and jd like '%" + e[4] + "%' order by riqipx desc "
      }
      console.log(sql)
    // }else{
    // sql = "select xm,dl,mcsl,jd,fqrq,dh,khmc,zdyh,mccl from baogongmingxi where xm like '%" + e[0] + "%' and khmc like '%" + e[1] + "%' and zdyh like '%" + e[2] + "%' and mccl like '%" + e[3] + "%' and jd like '%" + e[4] + "%'"}

    // sql = "select * from baogongmingxi where xm like '%" + e[0] + "%'"
  
    // var userInfo = _this.data.userInfo
    // if (userInfo.quanxian == '客户') {
    //   if(e[0]==""&&e[1]==""&&e[2]==""&&e[3]==""&&e[4]==""){
    //     sql ="select xm,dl,mcsl,jd,fqrq,dh,khmc,zdyh,mccl from baogongmingxi where khmc = '" + userInfo.name + "'"
    //   }else{
    //   sql= "select xm,dl,mcsl,jd,fqrq,dh,khmc,zdyh,mccl from baogongmingxi where khmc = '" + userInfo.name + "' and xm like '%" + e[0] + "%' and zdyh like '%" + e[2] + "%' and mccl like '%" + e[3] + "%' and jd like '%" + e[4] + "%'"
    //   }
    // }
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        var max_page = Math.ceil(list.length * 1 / 50)
        var list_new = []
        for(var i=0; i<49; i++){
          if(i < list.length){
            list_new.push(list[i])
          }
        }
        _this.setData({
          this_page:1,
          list_all: list,
          list: list_new,
          max_page
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

  page_down_click:function(){
    var _this = this
    var this_page = _this.data.this_page
    var max_page = _this.data.max_page

    this_page = this_page - 1
    if(this_page < 1){
      wx.showToast({
        title: '已经是第一页',
        icon: 'none'
      })
      return;
    }
    var list_all = _this.data.list_all
    var list = []
    for(var i=50*this_page - 50; i<50*this_page-1; i++){
      if(i < list_all.length){
        list.push(list_all[i])
      }
    }
    _this.setData({
      list:list,
      this_page:this_page,
    })
  },

  page_up_click:function(){
    var _this = this
    var this_page = _this.data.this_page
    var max_page = _this.data.max_page

    this_page = this_page + 1
    if(this_page > max_page){
      wx.showToast({
        title: '已经是最后一页',
        icon: 'none'
      })
      return;
    }
    var list_all = _this.data.list_all
    var list = []
    for(var i=50*this_page - 50; i<50*this_page-1; i++){
      if(i < list_all.length){
        list.push(list_all[i])
      }
    }
    _this.setData({
      list:list,
      this_page:this_page,
    })
    
  },

  upd1: function () {
    var _this = this
      // 获取当前日期
  const currentDate = new Date();
  // 格式化日期为 "yyyy-MM-dd" 格式
  const formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
  // 将格式化后的日期设置为 input 元素的值
  _this.setData({
    fqrq:formattedDate
  })
  
  
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: "update baogongmingxi set xm='" + _this.data.xm + "',dl='" + _this.data.dl + "',mcsl='" + _this.data.mcsl + "',jd='" + _this.data.jd + "',mccl='" + _this.data.mccl + "',fqrq='" + _this.data.fqrq + "' where id=" + _this.data.id
      },
     
      success: res => {
        _this.setData({
          id: '',
          xm: '',
          dl: '',
          mcsl: '',
          jd: '',
          mccl: '',
          fqrq:''
        })
        _this.qxShow()
        var e = ['','','','','']
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
      mccl: _this.data.list[e.currentTarget.dataset.index].mccl,
      fqrq: _this.data.list[e.currentTarget.dataset.index].fqrq,
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
              query: "delete from baogongmingxi where id='" + _this.data.id + "'"
            },
            success: res => {
              console.log(res)
              _this.setData({
                id: '',
                xm: '',
                dl: '',
                mcsl: '',
                jd: '',
                mccl: '',
              })
              _this.qxShow()
              var e = ['','','','','']
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

  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  
  inquire: function () {
  var _this = this
  // 获取当前日期
  const currentDate = new Date();
  // 格式化日期为 "yyyy-MM-dd" 格式
  const formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
  // 将格式化后的日期设置为 input 元素的值


 



  _this.setData({
    tjShow: true,
    id: '',
    xm: '',
    dl: '',
    mcsl: '',
    jd: '',
    fqrq: formattedDate,
    dh: dh,
    khmc: '',
    zdyh: '',
    mccl: '',
  
  })
},

// add1: function () {
//   var _this = this

//   if (_this.data.khmc == '') {
//     wx.showToast({
//       title: '请输入客户名称！',
//       icon: 'none',
//       duration: 3000
//     })
//     return;
//   }

//   if (_this.data.zdyh == '') {
//     wx.showToast({
//       title: '请输入终端用户！',
//       icon: 'none',
//       duration: 3000
//     })
//     return;
//   }

//   if (_this.data.xm == '') {
//     wx.showToast({
//       title: '请选择项目！',
//       icon: 'none',
//       duration: 3000
//     })
//     return;
//   }

//   if (_this.data.dl == '') {
//     wx.showToast({
//       title: '请选择大类！',
//       icon: 'none',
//       duration: 3000
//     })
//     return;
//   }

//   if (_this.data.mcsl == '') {
//     wx.showToast({
//       title: '请输入名称数量！',
//       icon: 'none',
//       duration: 3000
//     })
//     return;
//   }

//   if (_this.data.jd == '') {
//     wx.showToast({
//       title: '请选择进度！',
//       icon: 'none',
//       duration: 3000
//     })
//     return;
//   }

//   if (_this.data.dh == '') {
//     wx.showToast({
//       title: '请输入单号！',
//       icon: 'none',
//       duration: 3000
//     })
//     return;
//   }

//   if (_this.data.khmc == '') {
//     wx.showToast({
//       title: '请输入客户名称！',
//       icon: 'none',
//       duration: 3000
//     })
//     return;
//   }

//   if (_this.data.zdyh == '') {
//     wx.showToast({
//       title: '请输入终端用户！',
//       icon: 'none',
//       duration: 3000
//     })
//     return;
//   }

//   if (_this.data.mccl == '') {
//     wx.showToast({
//       title: '请输入材料名称！',
//       icon: 'none',
//       duration: 3000
//     })
//     return;
//   }

//   var sql = ""
//   var userInfo = _this.data.userInfo
//   var date = new Date();
//   sql="insert into buhuoxialiao(xm,dl,mcsl,jd,fqrq,dh,khmc,zdyh,mccl) values('" + _this.data.xm + "','" + _this.data.dl + "','" + _this.data.mcsl + "','" + _this.data.jd + "','" + _this.date.fqrq + "','" + _this.data.dh + "','" + _this.data.khmc + "','" + _this.data.zdyh + "','" + _this.data.mccl + "')"
//   if (userInfo.quanxian == '客户') {
//     sql="insert into dianmiandingdan(xm,dl,mcsl,jd,fqrq,dh,khmc,zdyh,clms) values('" + _this.data.xm + "','" + _this.data.dl + "','" + _this.data.mcsl + "','" + _this.data.jd + "','" + _this.date.fqrq + "','" + _this.data.dh + "','" + userInfo.khmc + "','" + userInfo.zdyh + "','" + _this.data.mccl + "')"
//     }
//   wx.cloud.callFunction({
//     name: 'sqlServer_tb3999803',
//     data: {
//       query: sql
//     },
//     success: res => {
//       console.log(res)
//       _this.setData({
//         id: '',
//         khmc: '',
//         zdyh: '',
//         jd: '',
//         bz: '',
//         xmfz: '',
//         lxfs: '',
//         ddsx: '',
//         ddh: '',
//       })
//       var e = ['','']
//       _this.qxShow()
//       _this.tableShow(e)
//       wx.showToast({
//         title: '添加成功！',
//         icon: 'none'
//       })
//     },
//     err: res => {
//       console.log("错误!")
//     },
//     fail: res => {
//       wx.showToast({
//         title: '请求失败！',
//         icon: 'none'
//       })
//       console.log("请求失败！")
//     }
//   })
// },

// ----------------------20240822 xt

// goto_buhuo: function(e){
//   var _this = this

//   var index1 = e.currentTarget.dataset.index
//   var jd = _this.data.list[index1].jd
//   console.log(jd)
//   if (jd=='缺料'){
//   wx.showModal({
//     title: "提示",
//     content: '是否跳转至补货下料单？',
//     cancelColor: '#282B33',
//     confirmColor: '#BC4A4A',
//     success: res => {
//       if (res.confirm) { 
//         var index = e.currentTarget.dataset.index
//         var khmc = _this.data.list[index].khmc
//         var dh = _this.data.list[index].dh
//         var zdyh = _this.data.list[index].zdyh
//         var mccl = _this.data.list[index].mccl
//         console.log(dh)
//         wx.navigateTo({
//           url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&dh='+ dh +'&khmc='+khmc +'&zdyh='+zdyh +'&mccl='+mccl,
         
//         })
//       } else if (res.cancel) {
//         console.log('用户点击取消')
//       }
//     }
//   })
// }
// },

// ------------------------------------

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
      xm:"",
      khmc: "",
      zdyh:"",
      mccl:"",
      jd: "",
    })
  },

  sel1: function () {
    var _this = this
    // var e = [_this.data.mccl]
    var e = [_this.data.xm,_this.data.khmc,_this.data.zdyh,_this.data.mccl,_this.data.jd,]
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
    // var _this = this
    // var e = ['','','','','']
    // _this.tableShow(e)
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