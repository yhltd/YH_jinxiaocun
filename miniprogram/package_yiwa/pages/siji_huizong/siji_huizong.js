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
    riqi:'',
    select_customer:[],
    customer_arr:[],
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
    if (options.aa != undefined){
      var aa = JSON.parse(options.aa)
      console.log(aa.riqi)
      console.log(aa.customer_id)
      var bb=[]
      var this_str = aa.customer_id.split(",")
      _this.setData({
        userInfo,
        riqi:getNowDate(),
        aa:aa,
        bb:bb,
        select_customer:this_str,
        riqi:aa.riqi
      })
      console.log(this_str)
      _this.tableShow()
      _this.add2()
    }else{
      _this.setData({
        userInfo,
        riqi:getNowDate(),
      })
      _this.tableShow()
    }

  },

  tableShow: function () {
    var _this = this
    var sql = ""
    if(_this.data.userInfo.power == '管理员'){
      sql = "select * from userInfo where power ='客户'"
    }else if(_this.data.userInfo.power == '司机'){
      sql = "select * from userInfo where power ='客户' and driver ='" + _this.data.userInfo.id + "'"
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
    _this.setData({
      select_customer: e.detail.value
    })
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

  choiceDate: function (e) {
    //e.preventDefault(); 
    var _this = this
    _this.setData({ 
      [e.target.dataset.column_name]:e.detail.value 
    })
    console.log(e.detail.value)
  },

  refresh:function(){
    var _this = this
    var select_customer = []
    var kehu_list = _this.data.kehu_list
    for(var i=0; i<kehu_list.length; i++){
      if(kehu_list[i].id != '' && kehu_list[i].id != null && kehu_list[i].id != undefined){
        select_customer.push(kehu_list[i].id.toString())
      }
    }
    console.log(select_customer)
    _this.setData({
      select_customer:select_customer,
      xzkhShow:true,
    })
  },

  add2:function(){
    var _this = this
    var select_customer = _this.data.select_customer
    if(select_customer.length == 0){
      wx.showToast({
        title: '请至少选择一个客户！',
        icon: 'none'
      })
      return;
    }

    var sql_head = 'select de.id,de.Customer_id,name,Documentnumber,riqi,NameofProduct,unit,Theunitprice,number from Detailsoforder as de left join (select id,name from userInfo) as us on us.id = de.Customer_id'
    var sql_foot = ""
    for(var i=0; i<select_customer.length; i++){
      if(select_customer[i] != '' && select_customer[i] != null && select_customer[i] != undefined){
        if(sql_foot == ''){
          sql_foot = " where (Customer_id = " + select_customer[i]
        }else{
          sql_foot = sql_foot + " or Customer_id = " + select_customer[i]
        }
      }
    }
    if(sql_foot != ''){
      sql_foot = sql_foot + ")"
      var sql = sql_head + sql_foot + " and riqi = '" + _this.data.riqi + "' order by NameofProduct;"
      var sql2 = "select NameofProduct from Detailsoforder " + sql_foot + " and riqi = '" + _this.data.riqi + "' group by NameofProduct order by NameofProduct;"
      var sql3 = "select Customer_id,name from Detailsoforder as de left join (select id,name from userInfo) as us on us.id = de.Customer_id " + sql_foot + " and riqi = '" + _this.data.riqi + "' group by Customer_id,name order by name;"
      console.log(sql) 
      console.log(sql2)
      console.log(sql3)
      wx.cloud.callFunction({
        name: 'sqlserver_yiwa',
        data: {
          query: sql + sql2 + sql3
        },
        success: res => {
          console.log(res)
          console.log(res.result.recordsets)
          //查询产品list、订单list、客户list
          var product_list = res.result.recordsets[1]
          var order_list = res.result.recordsets[0]
          var customer_list = res.result.recordsets[2]
          if(order_list.length == 0){
            wx.showToast({
              title: '未读取到订单信息！',
              icon: 'none'
            })
            return;
          }
          var list = []
          var list_item = {
            NameofProduct:'',
            sum:'',
          }
          var title = [
            {
              text: "产品名称",
              width: "250rpx",
              columnName: "NameofProduct",
              type: "text",
              isupd: true
            },
          ]

          //根据客户list拼接title
          for(var i=0; i<customer_list.length; i++){
            if(customer_list[i].name != ''){
              title.push({
                text: customer_list[i].name,
                width: "300rpx",
                columnName: customer_list[i].name,
                type: "text",
                isupd: true
              })
            }
            list_item[customer_list[i].name] = ''
          }

          //根据产品list拼出存放数据的list
          for(var i=0; i<product_list.length; i++){
            if(product_list[i].NameofProduct != ''){
              var this_item = list_item
              this_item.NameofProduct = product_list[i].NameofProduct
              console.log(this_item)
              list.push(JSON.parse(JSON.stringify(this_item)))  //必须转成json后再转回对象，否则数组中所有对象相同
            }
          }
          console.log(list)

          //循环订单，计算单价*数量
          for(var i=0; i<order_list.length; i++){
            for(var j=0; j<list.length; j++){
              if(order_list[i].NameofProduct == list[j].NameofProduct){
                if(list[j][order_list[i].name] == ""){
                  list[j][order_list[i].name] = order_list[i].number
                }else{
                  list[j][order_list[i].name] = list[j][order_list[i].name] * 1 + order_list[i].number * 1
                }
              }
            }
          }
          console.log(list)
          for(var i=0; i<list.length; i++){
            let tempArr = Object.keys(list[i])
            console.log(tempArr)
            var sum = 0
            for(var j=0; j<tempArr.length; j++){
              if(tempArr[j] != "NameofProduct" && tempArr[j] != "sum"){
                console.log(list[i][tempArr[j]])
                if(list[i][tempArr[j]] != '' && list[i][tempArr[j]] != null && list[i][tempArr[j]] != undefined){
                  sum = sum + list[i][tempArr[j]] * 1
                }
              }
            }
            list[i].sum = sum
          }
          console.log(list)
          let tempArr = Object.keys(list[0])
          var sum_row = {
            NameofProduct:'合计：' 
          }
          console.log(list)
          for(var i=0; i<tempArr.length; i++){
            var sum = 0
            if(tempArr[i] != "NameofProduct" && tempArr[i] != "sum"){
              for(var j=0; j<list.length; j++){
                if(list[j][tempArr[i]] != '' && list[j][tempArr[i]] != null && list[j][tempArr[i]] != undefined){
                  sum = sum + list[j][tempArr[i]] * 1
                }
              }
              sum_row[tempArr[i]] = sum
            }
          }
          var sum = 0
          for(var i=0; i<list.length; i++){
            if(list[i].sum != ''){
              sum = sum + list[i].sum * 1
            }
          }
          sum_row.sum = sum
          list.push(sum_row)
          console.log(list)

          title.push({
            text: "合计",
            width: "250rpx",
            columnName: "sum",
            type: "text",
            isupd: true
          })
          var riqi = _this.data.riqi
          _this.setData({
            title,
            list,
            customer_arr:select_customer,
            refresh_riqi:riqi,
          })

          _this.qxShow()
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

  },

  insert:function(e){
    var _this = this
    console.log('新增单据')
    console.log(e)
    var sql = "insert into driver_order(riqi,customer_id,driver_id,maker) values('" + e[0] + "','" + e[1] + "','" + e[2] + "','" + e[3] + "')"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '保存成功！',
          icon: 'none',
          duration: 3000
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

  save:function(){
    var _this = this
    if(_this.data.customer_arr.length == 0){
      wx.showToast({
        title: '未生成报货汇总单，请生成后再试！',
        icon: 'none'
      })
      return;
    }
    var customer_arr = _this.data.customer_arr
    var id_list = ""
    var riqi = _this.data.refresh_riqi
    var driver_id = ""
    var maker = _this.data.userInfo.id
    for(var i=0; i<customer_arr.length; i++){
      if(customer_arr[i] != ''){
        if(id_list == ""){
          id_list = customer_arr[i]
        }else{
          id_list = id_list + "," + customer_arr[i]
        }
      }
    }
    if(_this.data.userInfo.power == '司机'){
      driver_id = _this.data.userInfo.id
    }
    var insert_arr = [riqi,id_list,driver_id,maker]
    var sql = "select * from driver_order where riqi='" + riqi + "' and driver_id = '" + driver_id + "' and maker = '" + maker + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        if(list.length > 0){
          wx.showModal({
            title: '提示',
            content: '已有相同单据，确认覆盖？',
            success (res) {
              if (res.confirm){
                var sql = "delete from driver_order where id=" + list[0].id
                wx.cloud.callFunction({
                  name: 'sqlserver_yiwa',
                  data: {
                    query: sql
                  },
                  success: res => {
                    console.log("已删除原有单据!")
                    console.log(res)
                    _this.insert(insert_arr)
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
              } else if (res.cancel){
                wx.showToast({
                  title: '已取消！',
                  icon: 'none'
                })
                return;
              }
            }
          })
        }else{
          _this.insert(insert_arr)
        }
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

  out_put:function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    if(list.length == 0){
      wx.showToast({
        title: '无可导出数据，请查询后再试！',
        icon: 'none'
      })
      return;
    }
    var title = _this.data.title
    var cloudList = {
      name : '司机报货汇总单',
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


 
