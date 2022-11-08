// pages/general/general.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  xlShow5: false,
  data: {
    list: [],
    title: [{
        text: "日期",
        width: "275rpx",
        columnName: "riqi",
        type: "text",
        isupd: true
      },
      {
        text: "客户名称",
        width: "600rpx",
        columnName: "customer",
        type: "text",
        isupd: true
      },
      {
        text: "客户类别",
        width: "200rpx",
        columnName: "leibie",
        type: "text",
        isupd: true
      },{
        text: "客户号",
        width: "200rpx",
        columnName: "customer_num",
        type: "text",
        isupd: true
      },{
        text: "区域",
        width: "200rpx",
        columnName: "area",
        type: "text",
        isupd: true
      },
      {
        text: "付款金额",
        width: "200rpx",
        columnName: "f_jine",
        type: "text",
        isupd: true
      },
      {
        text: "折扣金额",
        width: "200rpx",
        columnName: "discount",
        type: "text",
        isupd: true
      },{
        text: "返款金额",
        width: "200rpx",
        columnName: "r_jine",
        type: "text",
        isupd: true
      },{
        text: "赠送额度",
        width: "200rpx",
        columnName: "quota",
        type: "text",
        isupd: true
      },{
        text: "付款方式",
        width: "200rpx",
        columnName: "pay",
        type: "text",
        isupd: true
      },{
        text: "备注",
        width: "200rpx",
        columnName: "remarks",
        type: "text",
        isupd: true
      },{
        text: "审核状态",
        width: "200rpx",
        columnName: "state",
        type: "text",
        isupd: true
      },
    ],
    customer_list:[],
    customer_picker_list:[],
    customer_id:'',
    pay_list:[],

    add_list:[],
    warehouse_list:[],
    id:'',
    warehouse: '', 
    pihao: '',
    listChanPin:[],
    listShenHe:[
      {name:'审核通过'},
      {name:'审核未通过'}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var userPower = JSON.parse(options.userPower)
    console.log(userPower)
    _this.setData({
      userInfo:userInfo,
      userPower:userPower
    })
    console.log(userInfo)
    var e = ['1900-01-01','2100-12-31','']
    _this.tableShow(e)

    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select id,customer from customerInfo where customer != ''"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        var picker_list = []
        for(var i=0; i<list.length; i++){
          picker_list.push(
            list[i].customer
          )
        }
        _this.setData({
          customer_list: list,
          customer_picker_list: picker_list
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

    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select pay from general where pay != ''"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        var picker_list = []
        for(var i=0; i<list.length; i++){
          picker_list.push(
            list[i].pay
          )
        }
        _this.setData({
          pay_list: picker_list,
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

  tableShow: function (e) {
    var _this = this
    var sql = "select fukuan.id,fukuan.customer_id,kehu.customer,fukuan.pay,fukuan.quota,fukuan.r_jine,fukuan.f_jine,fukuan.discount,fukuan.remarks,fukuan.riqi,fukuan.state,kehu.salesman,kehu.leibie,kehu.customer_num,kehu.area from payment as fukuan left join (select id,customer,salesman,leibie,customer_num,area from customerInfo)as kehu on fukuan.customer_id = kehu.id where convert(date,fukuan.riqi) >= convert(date,'"+ e[0] +"') and convert(date,fukuan.riqi) <= convert(date,'"+ e[1] +"') and kehu.customer like '%"+ e[2] +"%' order by fukuan.riqi desc"
    if(_this.data.userInfo.power != '管理员'){
      sql = "select fukuan.id,fukuan.customer_id,kehu.customer,fukuan.pay,fukuan.quota,fukuan.r_jine,fukuan.f_jine,fukuan.discount,fukuan.remarks,fukuan.riqi,fukuan.state,kehu.salesman,kehu.leibie,kehu.customer_num,kehu.area from payment as fukuan left join (select id,customer,salesman,leibie,customer_num,area from customerInfo)as kehu on fukuan.customer_id = kehu.id where convert(date,fukuan.riqi) >= convert(date,'"+ e[0] +"') and convert(date,fukuan.riqi) <= convert(date,'"+ e[1] +"') and kehu.customer like '%"+ e[2] +"%' and kehu.salesman ='" + _this.data.userInfo.name + "' order by fukuan.riqi desc"
    }
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
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
      }
    })
  },

  bindPickerChange: function(e){
    var _this = this
    console.log(_this.data.customer_list[e.detail.value].customer + " " + _this.data.customer_list[e.detail.value].id)
    _this.setData({
      [e.target.dataset.column_name]: _this.data.customer_list[e.detail.value].customer,
      customer_id: _this.data.customer_list[e.detail.value].id
    })
  },

  bindPickerChange2: function(e){
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.pay_list[e.detail.value],
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
    })
  },

  clickView:function(e){
    var _this = this
    if(_this.data.userPower.gai != '可操作' && _this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      customer_id: _this.data.list[e.currentTarget.dataset.index].customer_id,
      riqi: _this.data.list[e.currentTarget.dataset.index].riqi, 
      customer: _this.data.list[e.currentTarget.dataset.index].customer,
      f_jine: _this.data.list[e.currentTarget.dataset.index].f_jine,
      discount: _this.data.list[e.currentTarget.dataset.index].discount,
      r_jine: _this.data.list[e.currentTarget.dataset.index].r_jine,
      quota: _this.data.list[e.currentTarget.dataset.index].quota,
      pay: _this.data.list[e.currentTarget.dataset.index].pay,
      remarks: _this.data.list[e.currentTarget.dataset.index].remarks,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    if(_this.data.userPower.zeng != '可操作' && _this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      tjShow: true,
      id: '',
      riqi: getNowDate(),
      customer: '',
      customer_id: '',
      f_jine: '',
      discount: '',
      r_jine: '',
      quota: '',
      pay: '',
      remarks: '',
    })
  },

  add1: function(){
    var _this = this
    var _this = this
    if(_this.data.riqi == '' || _this.data.riqi == undefined){
      wx.showToast({
        title: '未填写日期！',
        icon: 'none'
      })
    }
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "insert into payment(riqi,customer_id,f_jine,discount,r_jine,quota,pay,remarks,state) values('" + _this.data.riqi + "','" + _this.data.customer_id + "','" + _this.data.f_jine + "','" + _this.data.discount + "','" + _this.data.r_jine + "','" + _this.data.quota + "','" + _this.data.pay + "','" + _this.data.remarks + "','审核中')"
      },
      success: res => {
        _this.setData({
          id: '',
          riqi: '', 
          customer: '',
          customer_id: '',
          f_jine: '',
          discount: '',
          r_jine: '',
          quota: '',
          pay: '',
          remarks: '',
        })
        _this.qxShow()
        var e = ['1900-01-01','2100-12-31','']
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
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },
  upd1:function(){
    var _this = this
    var _this = this
    if(_this.data.riqi == '' || _this.data.riqi == undefined){
      wx.showToast({
        title: '未填写日期！',
        icon: 'none'
      })
    }
    if(_this.data.customer_id == '' || _this.data.customer_id == undefined){
      wx.showToast({
        title: '未填写客户名称！',
        icon: 'none'
      })
    }
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "update payment set riqi='" + _this.data.riqi + "',customer_id='" + _this.data.customer_id + "',f_jine='" + _this.data.f_jine + "',discount='" + _this.data.discount + "',r_jine='" + _this.data.r_jine + "',quota='" + _this.data.quota + "',pay='" + _this.data.pay + "',remarks='" + _this.data.remarks + "' where id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
          id: '',
          riqi: '', 
          customer: '',
          customer_id: '',
          f_jine: '',
          discount: '',
          r_jine: '',
          quota: '',
          pay: '',
          remarks: '',
        })
        _this.qxShow()
        var e = ['1900-01-01','2100-12-31','']
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

  del1:function(){
    var _this = this
    if(_this.data.userPower.shan != '可操作' && _this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: "delete from payment where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id: '',
            riqi: '', 
            customer: '',
            customer_id: '',
            f_jine: '',
            discount: '',
            r_jine: '',
            quota: '',
            pay: '',
            remarks: '',
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','']
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
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      customer:"",
      start_date:"",
      stop_date:"",
    })
  },

  sel1:function(){
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == '' || start_date == undefined){
      start_date = '1900-01-01'
    }
    if(stop_date == '' || stop_date == undefined){
      stop_date = '2100-12-31'
    }

    var e = [start_date,stop_date,_this.data.customer]
    _this.tableShow(e)
    _this.qxShow()
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  goto_file: function () {
    var _this = this
    if(_this.data.userPower.gai != '可操作' && _this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var this_id = _this.data.id
    var type = '收付款明细'
    wx.navigateTo({
      url: '../file_table/file_table?this_id=' + this_id + '&type=' + type,
    })
  },

  selKH: function () {
    var _this = this
    var sql = "select customer as name,id,customer from customerInfo where customer like '%" + _this.data.customer + "%' or pinyin like'%" + _this.data.customer + "%'"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          listKeHu: list
        })
        console.log(list)
        _this.setData({
          xlShow5: true
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
  selSH: function () {
    var _this = this  
    if(_this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '此账号无权限审核数据！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      xlShow1: true
    })
  },
  select5: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow5: false,
        customer: e.detail.customer,
        customer_id: e.detail.id,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow5: false,
      })
    }
  },
  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      var shenhe = e.detail.name
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: "update payment set state='" + shenhe + "' where id=" + _this.data.id 
        },
        success: res => {
          _this.setData({
            id: '',
            riqi: '', 
            customer: '',
            customer_id: '',
            f_jine: '',
            discount: '',
            r_jine: '',
            quota: '',
            pay: '',
            remarks: '',
            xlShow1: false,
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','']
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
      _this.setData({
        xlShow1: false,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow1: false,
      })
    }
  },


  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title
    var cloudList = {
      name : '收付款明细',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:parseInt(title[i].width.split("r")[0])/10,
        columnName:title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu : 'true',
              fileType : 'xlsx',
              success : res=> {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail : res=> {
        console.log(res)
      }
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

 