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
  xlShow:false,
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
        text: "手机号",
        width: "300rpx",
        columnName: "phone",
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
        text: "是否上传收款二维码",
        width: "320rpx",
        columnName: "qr_code",
        type: "text",
        isupd: true
      },
      {
        text: "客户地址",
        width: "320rpx",
        columnName: "customer_address",
        type: "text",
        isupd: true
      },
      {
        text: "下单权限",
        width: "320rpx",
        columnName: "fahuoquanxian",
        type: "text",
        isupd: true
      },
    ],
    xiala_list:['是','否'],
    qx_list:['管理员','业务员','报货员','司机','客户'],
    id:'',
    username: '', 
    password: '',
    name:'',
    phone:'',
    power: '',
    salesman: '',
    driver: '',
    qr_code: '',
    customer_address:'',
    fahuoquanxian:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var e = ['']
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        //query: "select u3.id,u3.username,u3.password,u3.name,u3.phone,u3.power,u3.salesman,isnull(u4.name,'')as driver,u3.qr_code from (select u1.id,u1.username,u1.password,u1.name,isnull(u1.power,'')as power,isnull(u1.phone,'')as phone,isnull(u2.name,'')as salesman,isnull(u1.driver,'')as driver,case isnull(u1.qr_code,'') when '' then '否' else '是' end as qr_code from userInfo as u1 left join userInfo as u2 on u1.salesman = u2.id) as u3 left join userInfo as u4 on u3.driver = u4.id where u3.name like '%" + e[0] + "%';select u3.id,u3.username,u3.password,u3.name,u3.power,u3.salesman,isnull(u4.name,'')as driver,u3.qr_code from (select u1.id,u1.username,u1.password,u1.name,isnull(u1.power,'')as power,isnull(u2.name,'')as salesman,isnull(u1.driver,'')as driver,case isnull(u1.qr_code,'') when '' then '否' else '是' end as qr_code from userInfo as u1 left join userInfo as u2 on u1.salesman = u2.id) as u3 left join userInfo as u4 on u3.driver = u4.id"
        query:"select u3.id,u3.username,u3.password,u3.name,u3.phone,u3.power,u3.salesman,isnull(u4.name,'')as driver,u3.qr_code,u3.customer_address,u3.fahuoquanxian from (select u1.id,u1.username,u1.password,u1.name,isnull(u1.power,'')as power,isnull(u1.phone,'')as phone,isnull(u2.name,'')as salesman,isnull(u1.driver,'')as driver,isnull( u1.customer_address, '' ) AS customer_address,isnull( u1.fahuoquanxian, '' ) AS fahuoquanxian,case isnull(u1.qr_code,'') when '' then '否' else '是' end as qr_code from userInfo as u1 left join userInfo as u2 on u1.salesman = u2.id) as u3 left join userInfo as u4 on u3.driver = u4.id where u3.name like '%" + e[0] + "%';select u3.id,u3.username,u3.password,u3.name,u3.power,u3.salesman,isnull(u4.name,'')as driver,u3.qr_code,u3.customer_address,u3.fahuoquanxian from (select u1.id,u1.username,u1.password,u1.name,isnull(u1.power,'')as power,isnull(u2.name,'')as salesman,isnull(u1.driver,'')as driver,isnull( u1.customer_address, '' ) AS customer_address,isnull( u1.fahuoquanxian, '' ) AS fahuoquanxian,case isnull(u1.qr_code,'') when '' then '否' else '是' end as qr_code from userInfo as u1 left join userInfo as u2 on u1.salesman = u2.id) as u3 left join userInfo as u4 on u3.driver = u4.id"
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        console.log(list)
        var renyuan_list = res.result.recordsets[1]
        console.log(renyuan_list)
        var salesman = []
        var driver = []
        for(var i=0; i<renyuan_list.length; i++){
          if(renyuan_list[i].power == '业务员'){
            salesman.push({
              name:renyuan_list[i].name,
              id:renyuan_list[i].id,
            })
          }
          if(renyuan_list[i].power == '司机'){
            driver.push({
              name:renyuan_list[i].name,
              id:renyuan_list[i].id,
            })
          }
        }
        _this.setData({ 
          list: list,
          driver,
          salesman,
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

  },
  bindPickerChange1: function(e){
    var _this = this
    var column = e.currentTarget.dataset.column
    console.log(column)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      [column]:_this.data.xiala_list[e.detail.value]
    })

  },
  onInput1: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    console.log(1)
    console.log(column)
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
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
    var column = e.currentTarget.dataset.column
    if(column == 'username' || column == 'password' || column == 'name' || column == 'phone'){
      _this.setData({
        id: _this.data.list[e.currentTarget.dataset.index].id,
        username: _this.data.list[e.currentTarget.dataset.index].username, 
        password: _this.data.list[e.currentTarget.dataset.index].password,
        name: _this.data.list[e.currentTarget.dataset.index].name,
        phone: _this.data.list[e.currentTarget.dataset.index].phone,
        power: _this.data.list[e.currentTarget.dataset.index].power,
        salesman: _this.data.list[e.currentTarget.dataset.index].salesman,
        driver: _this.data.list[e.currentTarget.dataset.index].driver,
        qr_code: _this.data.list[e.currentTarget.dataset.index].qr_code,
        customer_address: _this.data.list[e.currentTarget.dataset.index].customer_address,
        fahuoquanxian: _this.data.list[e.currentTarget.dataset.index].fahuoquanxian,
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
      phone:'',
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
          // query: "insert into userInfo(username,password,name,power,phone)output inserted.id values('" + _this.data.username + "','" + _this.data.password + "','" + _this.data.name + "','" + _this.data.power + "','" + _this.data.phone + "')"
          query:"insert into userInfo(username,password,name,power,phone,customer_address,fahuoquanxian)output inserted.id values('" + _this.data.username + "','" + _this.data.password + "','" + _this.data.name + "','" + _this.data.power + "','" + _this.data.phone + "','" + _this.data.customer_address +"','" + _this.data.fahuoquanxian + "')"
        },
        success: res => {
          console.log(_this.data.customer_address)
          var Customer_id = res.result.recordset[0].id
          console.log(res.result.recordset[0].id)
          console.log(_this.data.Customer_id)
          var sql1 = "insert into DetailsofProducts(Thedetail_id,Customer_id,NameofProduct,unit,Theunitprice,zhongliang,kuang) values"
          var sql2 = ""
          for(var i = 0; _this.data.peizhi_list.length>i ; i++){
            if(sql2 == ""){
              sql2 = "('" +  _this.data.peizhi_list[i].id + "','"+ Customer_id +"','" + _this.data.peizhi_list[i].NameofProduct +"','" + _this.data.peizhi_list[i].unit +"','"+ _this.data.peizhi_list[i].Theunitprice +"','"+ _this.data.peizhi_list[i].zhongliang +"','"+ _this.data.peizhi_list[i].kuang +"')"
            }else{
              sql2 = sql2 + ",('" +  _this.data.peizhi_list[i].id + "','"+ Customer_id +"','" + _this.data.peizhi_list[i].NameofProduct +"','" + _this.data.peizhi_list[i].unit +"','"+ _this.data.peizhi_list[i].Theunitprice +"','"+ _this.data.peizhi_list[i].zhongliang +"','"+ _this.data.peizhi_list[i].kuang +"')"
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
                phone:'',
                power: '',
                salesman: '',
                driver: '',
                qr_code: '',
                customer_address:'',
                fahuoquanxian:'',
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
            phone:'',
            power: '',
            salesman: '',
            driver: '',
            qr_code: '',
            customer_address:'',
            fahuoquanxian:'',
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
        //query: "update userInfo set username='" + _this.data.username + "',password='" + _this.data.password + "',name='" + _this.data.name + "',phone='" + _this.data.phone + "' where id=" + _this.data.id  
        query: "update userInfo set username='" + _this.data.username + "',password='" + _this.data.password + "',name='" + _this.data.name + "',phone='" + _this.data.phone + "',customer_address='" + _this.data.customer_address + "',fahuoquanxian='" + _this.data.fahuoquanxian+ "' where id=" + _this.data.id  
      },
      success: res => {
        _this.setData({
            id:'',
            username: '', 
            password: '',
            name:'',
            phone:'',
            power: '',
            salesman: '',
            driver: '',
            qr_code: '',
            customer_address:'',
            fahuoquanxian:'',
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
    wx.showModal({
      title: '提示',
      content: '是否删除此条信息？',
      success: function(res) {
        if (res.confirm) {
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
                phone:'',
                power: '',
                salesman: '',
                driver: '',
                qr_code: '',
                customer_address:'',
                fahuoquanxian:'',
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
                phone:'',
                salesman: '',
                driver: '',
                qr_code: '',
                customer_address:'',
                fahuoquanxian:'',
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
        }
      }
    })
 },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      id:'',
      username: '', 
      password: '',
      name:'',
      power: '',
      phone:'',
      salesman: '',
      driver: '',
      qr_code: '',
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
