// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  xzkhShow:false,
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  xlShow:false,
  data: {
    list: [],
    title: [{
        text: "产品名称",
        width: "250rpx",
        columnName: "NameofProduct",
        type: "text",
        isupd: true
      },
      {
        text: "合计",
        width: "250rpx",
        columnName: "sum",
        type: "text",
        isupd: true
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo
    })
    _this.tableShow()
  },

  tableShow: function () {
    var _this = this
    var sql = ""
    if(_this.data.userInfo.power == '管理员'){
      sql = "select * from userInfo where power ='客户'"
    }else if(_this.data.userInfo.power == '客户'){
      sql = "select * from userInfo where power ='客户' and salesman ='" + _this.data.userInfo.id + "'"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        _this.setData({ 
          kehu_list: list,
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

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      xzkhShow:false,
      currentDate: new Date().getTime()
    })
  },

  clickView:function(e){
    var _this = this
    var column = e.currentTarget.dataset.column
    if(column == 'username' || column == 'password' || column == 'name'){
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
    }else if(column == 'salesman' && _this.data.list[e.currentTarget.dataset.index].power == '客户'){
      var list = _this.data.salesman
      _this.setData({
        id: _this.data.list[e.currentTarget.dataset.index].id,
        column:column,
        list_xiala:list,
        xlShow:true,
      })
    }else if(column == 'driver' && _this.data.list[e.currentTarget.dataset.index].power == '客户'){
      var list = _this.data.driver
      _this.setData({
        id: _this.data.list[e.currentTarget.dataset.index].id,
        column:column,
        list_xiala:list,
        xlShow:true,
      })
    }
  },

  select1: function (e){
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.id
      var click_column = _this.data.column
      var sql = "update userInfo set "+ click_column + "='" + new_val + "' where id=" + _this.data.id
      wx.cloud.callFunction({
        name: 'sqlserver_yiwa',
        data: {
          query: sql
        },
        success: res => {
          var e = ['']
          _this.tableShow(e)
          wx.showToast({
            title: '修改成功！',
            icon: 'none',
            duration: 3000
          })
          _this.setData({
            xlShow: false,
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
    } else if (e.type == "close") {
      _this.setData({
        xlShow: false,
      })
    }
  },

  onCheckboxChange: function (e) {
    var _this = this
    var countries = ""
    console.log(e.detail.value)
    for (var i = 0; i < e.detail.value.length; i++) {
      for (var j = 0; j < _this.data.kehu_list.length; j++) {
        if (e.detail.value[i] == _this.data.kehu_list[j].id) {
          countries = countries + " " + _this.data.kehu_list[j].name
        }
      }
    }
    console.log(countries)
    // _this.setData({
    //   countries,
    //   list4: e.detail.value
    // })
  },

  bindPickerChange: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      power:_this.data.qx_list[e.detail.value]
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
    if(_this.data.power == ''){
      wx.showToast({
        title: '请输权限！',
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
        query: "update userInfo set username='" + _this.data.username + "',password='" + _this.data.password + "',name='" + _this.data.name + "',power='" + _this.data.power + "' where id=" + _this.data.id  
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

  refresh:function(){
    var _this = this
    _this.setData({
      xzkhShow:true,
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
