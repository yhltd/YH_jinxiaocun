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
  data: {
    list: [],
    title: [{
        text: "添加日期",
        width: "200rpx",
        columnName: "riqi",
        type: "text",
        isupd: true
      },
      {
        text: "客户号",
        width: "300rpx",
        columnName: "customer_num",
        type: "text",
        isupd: true
      },
      {
        text: "客户类别",
        width: "300rpx",
        columnName: "leibie",
        type: "text",
        isupd: true
      },
      {
        text: "客户",
        width: "300rpx",
        columnName: "customer",
        type: "text",
        isupd: true
      },
      {
        text: "字母代码",
        width: "200rpx",
        columnName: "pinyin",
        type: "text",
        isupd: true
      },
      {
        text: "区域",
        width: "200rpx",
        columnName: "area",
        type: "text",
        isupd: true
      },
      {
        text: "业务员",
        width: "200rpx",
        columnName: "salesman",
        type: "text",
        isupd: true
      },{
        text: "价格",
        width: "600rpx",
        columnName: "price",
        type: "text",
        isupd: true
      },{
        text: "联系电话",
        width: "200rpx",
        columnName: "phone",
        type: "text",
        isupd: true
      },{
        text: "收货地址",
        width: "300rpx",
        columnName: "address",
        type: "text",
        isupd: true
      },{
        text: "往期购货余额",
        width: "250rpx",
        columnName: "ghye",
        type: "text",
        isupd: true
      },{
        text: "往期赠送余额",
        width: "250rpx",
        columnName: "zsye",
        type: "text",
        isupd: true
      },{
        text: "备注",
        width: "200rpx",
        columnName: "remarks",
        type: "text",
        isupd: true
      }
    ],

    id:'',
    riqi: '', 
    customer: '',
    pinyin: '',
    salesman:'',
    price:'',
    phone:'',
    address:'',
    remarks:'',
    ghye:'',
    zsye:'',

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

    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select customer_type from general where customer_type != ''"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        var this_list = []
        for(var i=0; i< list.length; i++){
          if(list[i].customer_type != ''){
            this_list.push(list[i].customer_type)
          }
        }
        _this.setData({
          customer_type_list: this_list
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


    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select area from general where area != ''"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        var this_list = []
        for(var i=0; i< list.length; i++){
          if(list[i].area != ''){
            this_list.push(list[i].area)
          }
        }
        _this.setData({
          area_list: this_list
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

    var e = ['','','']
    _this.tableShow(e)
  },

  bindPickerChange1: function(e){
    var _this = this
    console.log(_this.data.area_list[e.detail.value])
    _this.setData({
      area: _this.data.area_list[e.detail.value]
    })
  },

  bindPickerChange: function(e){
    var _this = this
    console.log(_this.data.customer_type_list[e.detail.value])
    _this.setData({
      leibie: _this.data.customer_type_list[e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    var sql = "select * from customerInfo where (customer like '%" + e[0] + "%' or pinyin like '%" + e[0] + "%') and leibie like '%" + e[1] + "%' and area like '%" + e[2] + "%'"
    if (_this.data.userInfo.power != '管理员' && _this.data.userInfo.power != '审核员'){
      sql = sql + " and salesman ='" + _this.data.userInfo.name + "'"
    }
    console.log(sql)
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

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  clickView:function(e){
    var _this = this
    if(_this.data.userPower.gai != '可操作' && _this.data.userInfo.power != '管理员' && _this.data.userInfo.power != '审核员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      riqi: _this.data.list[e.currentTarget.dataset.index].riqi, 
      customer: _this.data.list[e.currentTarget.dataset.index].customer,
      pinyin: _this.data.list[e.currentTarget.dataset.index].pinyin,
      salesman: _this.data.list[e.currentTarget.dataset.index].salesman,
      price: _this.data.list[e.currentTarget.dataset.index].price,
      phone: _this.data.list[e.currentTarget.dataset.index].phone,
      address: _this.data.list[e.currentTarget.dataset.index].address,
      remarks: _this.data.list[e.currentTarget.dataset.index].remarks,
      ghye: _this.data.list[e.currentTarget.dataset.index].ghye,
      zsye: _this.data.list[e.currentTarget.dataset.index].zsye,
      leibie: _this.data.list[e.currentTarget.dataset.index].leibie,
      customer_num: _this.data.list[e.currentTarget.dataset.index].customer_num,
      area: _this.data.list[e.currentTarget.dataset.index].area,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    if(_this.data.userPower.zeng != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      tjShow: true,
      id:'',
      riqi: getNowDate(),  
      customer: '',
      pinyin: '',
      salesman:'',
      price:'',
      phone:'',
      address:'',
      remarks:'',
      ghye:'',
      zsye:'',
      leibie: '',
      customer_num: '',
      area:'',
    })
  },

  add1: function(){
    var _this = this

    if(_this.data.customer == ''){
      wx.showToast({
        title: '请输入客户名称！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.area == ''){
      wx.showToast({
        title: '请输入区域！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.salesman == ''){
      wx.showToast({
        title: '请输入业务员！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.price == ''){
      wx.showToast({
        title: '请输入价格！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: "insert into customerInfo(riqi,customer,pinyin,salesman,price,phone,address,ghye,zsye,remarks,customer_num,leibie,area) values('" + _this.data.riqi + "','" + _this.data.customer + "','" + _this.data.pinyin + "','" + _this.data.salesman + "','" + _this.data.price + "','" + _this.data.phone + "','" + _this.data.address + "','" + _this.data.ghye + "','" + _this.data.zsye + "','" + _this.data.remarks + "','" + _this.data.customer_num + "','" + _this.data.leibie + "','" + _this.data.area + "')"
        },
        success: res => {
          _this.setData({
            id:'',
            riqi: '', 
            customer: '',
            pinyin: '',
            salesman:'',
            price:'',
            phone:'',
            address:'',
            remarks:'',
            ghye:'',
            zsye:'',
            leibie: '',
            customer_num: '',
            area:'',
          })
          _this.qxShow()
          var e = ['','','']
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
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "update customerInfo set riqi='" + _this.data.riqi + "',customer='" + _this.data.customer + "',pinyin='" + _this.data.pinyin + "',salesman='" + _this.data.salesman + "',price='" + _this.data.price + "',phone='" + _this.data.phone + "',address='" + _this.data.address + "',remarks='" + _this.data.remarks + "',ghye='" + _this.data.ghye + "',zsye='" + _this.data.zsye + "',leibie='" + _this.data.leibie + "',customer_num='" + _this.data.customer_num  + "',area='" + _this.data.area + "' where id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
            id:'',
            riqi: '', 
            customer: '',
            pinyin: '',
            salesman:'',
            price:'',
            phone:'',
            address:'',
            remarks:'',
            ghye:'',
            zsye:'',
            leibie: '',
            customer_num: '',
            area:'',
        })
        _this.qxShow()
        var e = ['','','']
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
    if(_this.data.userPower.shan != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核员'){
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
          query: "delete from customerInfo where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            riqi: '', 
            customer: '',
            pinyin: '',
            salesman:'',
            price:'',
            phone:'',
            address:'',
            remarks:'',
            ghye:'',
            zsye:'',
            leibie: '',
            customer_num: '',
            area:'',
          })
          _this.qxShow()
          var e = ['','','']
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
      leibie:"",
      area:"",
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.customer,_this.data.leibie,_this.data.area]
    _this.tableShow(e)
    _this.qxShow()
  },

  goto_file: function () {
    var _this = this
    if(_this.data.userPower.gai != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var this_id = _this.data.id
    var type = '客户信息'
    wx.navigateTo({
      url: '../file_table/file_table?this_id=' + this_id + '&type=' + type,
    })
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
      name : '客户信息',
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