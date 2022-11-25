// package_huaqun/page/zhguanli/zhguanli.js
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
        text: "用户名",
        width: "250rpx",
        columnName: "username",
        type: "text",
        isupd: true
      },
      {
        text: "密码",
        width: "250rpx",
        columnName: "password",
        type: "text",
        isupd: true
      },
      {
        text: "姓名",
        width: "250rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "权限",
        width: "250rpx",
        columnName: "power",
        type: "text",
        isupd: true
      },
      {
        text: "所属业务员",
        width: "250rpx",
        columnName: "salesman",
        type: "text",
        isupd: true
      },
      {
        text: "所属司机",
        width: "250rpx",
        columnName: "driver",
        type: "text",
        isupd: true
      },
      {
        text: "业务员二维码",
        width: "250rpx",
        columnName: "qr_code",
        type: "text",
        isupd: true
      },
    ],
    qx_list:['管理员','业务员','司机','客户'],
    id:'',
    username: '', 
    password: '',
    name:'',
    power: '',
    salesman: '',
    driver: '',
    qr_code: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "select id,username,password,name,isnull(power,'')as power,isnull(salesman,'')as salesman,isnull(driver,'')as driver ,isnull(qr_code,'')as qr_code from userInfo"
      },
      success: res => {
        var list = res.result.recordset
        var power_ywy = []
        var power_ywy_picker = []
        var power_sj = []
        var power_sj_picker = []
        console.log(list)
        for(var i=0; i<list.length; i++){
          if(list[i].power == '业务员'){
            power_ywy.push({
              name:list[i].name,
              id:list[i].id
            })
            power_ywy_picker.push(list[i].name)
          }else if(list[i].power == '司机'){
            power_sj.push({
              name:list[i].name,
              id:list[i].id
            })
            power_sj_picker.push(list[i].name)
          }
        }
        _this.setData({
          power_ywy:power_ywy,
          power_ywy_picker:power_ywy_picker,
          power_sj:power_sj,
          power_sj_picker:power_sj_picker,
        })
        console.log(power_ywy)
        console.log(power_sj)
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
      name: 'sqlserver_yiwa',
      data: {
        query: "select * from DetailedConfiguration"
      },
      success: res => {
        console.log(res)
        var peizhi_list=res.result.recordset
        console.log(peizhi_list)
        _this.setData({
          peizhi_list: peizhi_list
        })
        console.log(peizhi_list)
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


    var e = ['']
    _this.tableShow(e)
  },



  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "select id,username,password,name,isnull(power,'')as power,isnull(salesman,'')as salesman,isnull(driver,'')as driver ,isnull(qr_code,'')as qr_code from userInfo where name like '%" + e[0] + "%' "
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
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      username: _this.data.list[e.currentTarget.dataset.index].username, 
      password: _this.data.list[e.currentTarget.dataset.index].password,
      name: _this.data.list[e.currentTarget.dataset.index].name,
      power: _this.data.list[e.currentTarget.dataset.index].power,
      salesman: _this.data.list[e.currentTarget.dataset.index].salesman,
      driver: _this.data.list[e.currentTarget.dataset.index].driver,
      qr_code: _this.data.list[e.currentTarget.dataset.index].qr_code,
      xgShow:true,
    })
  },
  bindPickerChange: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      power:_this.data.qx_list[e.detail.value]
    })
  },
  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      salesman:_this.data.power_ywy_picker[e.detail.value]
    })
  },
  bindPickerChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      driver:_this.data.power_sj_picker[e.detail.value]
    })
  },
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      username: '', 
      password: '',
      name:'',
      power: '',
      salesman: '',
      driver: '',
      qr_code: '',
    })
  },
  add1: function(){
    var _this = this

    if(_this.data.username == ''){
      wx.showToast({
        title: '请输用户名！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.password == ''){
      wx.showToast({
        title: '请输密码！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.name == ''){
      wx.showToast({
        title: '请输姓名！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

      wx.cloud.callFunction({
        name: 'sqlserver_yiwa',
        data: {
          query: "insert into userInfo(username,password,name,power)output inserted.id values('" + _this.data.username + "','" + _this.data.password + "','" + _this.data.name + "','" + _this.data.power + "')"
        },
        success: res => {
          var Customer_id = res.result.recordset[0].id
          console.log(res.result.recordset[0].id)
          console.log(_this.data.Customer_id)
      var sql1 = "insert into DetailsofProducts(Thedetail_id,Customer_id,NameofProduct,unit,Theunitprice) values"
      var sql2 = ""
      for(var i = 0; _this.data.peizhi_list.length>i ; i++){
        if(sql2 == ""){
          sql2 = "('" +  _this.data.peizhi_list[i].id + "','"+ Customer_id +"','" + _this.data.peizhi_list[i].NameofProduct +"','" + _this.data.peizhi_list[i].unit +"','"+ _this.data.peizhi_list[i].Theunitprice +"')"
        }else{
          sql2 = sql2 + ",('" +  _this.data.peizhi_list[i].id + "','"+ Customer_id +"','" + _this.data.peizhi_list[i].NameofProduct +"','" + _this.data.peizhi_list[i].unit +"','"+ _this.data.peizhi_list[i].Theunitprice +"')"
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
          _this.setData({
            id:'',
            username: '', 
            password: '',
            name:'',
            power: '',
            salesman: '',
            driver: '',
            qr_code: '',
          })
          _this.qxShow()
          var e = ['']
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
          _this.setData({
            id:'',
            username: '', 
            password: '',
            name:'',
            power: '',
            salesman: '',
            driver: '',
            qr_code: '',
            list:Customer_id,
          })
          _this.qxShow()
          var e = ['']
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
      name: 'sqlserver_yiwa',
      data: {
        query: "update userInfo set username='" + _this.data.username + "',password='" + _this.data.password + "',name='" + _this.data.name + "',power='" + _this.data.power + "',salesman='" + _this.data.salesman + "',driver='" + _this.data.driver + "' where id=" + _this.data.id  
      },
      success: res => {
        _this.setData({
            id:'',
            username: '', 
            password: '',
            name:'',
            power: '',
            salesman: '',
            driver: '',
            qr_code: '',
        })
        _this.qxShow()
        var e = ['']
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
      wx.cloud.callFunction({
        name: 'sqlserver_yiwa',
        data: {
          query: "delete from userInfo where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            username: '', 
            password: '',
            name:'',
            power: '',
            salesman: '',
            driver: '',
            qr_code: '',
          })
          _this.qxShow()
          var e = ['']
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

      wx.cloud.callFunction({
        name: 'sqlserver_yiwa',
        data: {
          query: "delete from DetailsofProducts where Customer_id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            username: '', 
            password: '',
            name:'',
            power: '',
            salesman: '',
            driver: '',
            qr_code: '',
          })
          _this.qxShow()
          var e = ['']
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
    var e = [_this.data.name]
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
