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
      userInfo,
      riqi:getNowDate()
    })
    _this.tableShow()
  },

  tableShow: function () {
    var _this = this
    var sql = ""
    if(_this.data.userInfo.power == '管理员'){
      sql = "select * from userInfo where power ='客户'"
    }else if(_this.data.userInfo.power == '业务员'){
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

    var sql_head = 'select de.id,de.Customer_id,name,Documentnumber,riqi,NameofProduct,unit,Theunitprice,number,zhongliang_num from Detailsoforder as de left join (select id,name from userInfo) as us on us.id = de.Customer_id'
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
          for(var i=0; i<order_list.length; i++){
            if(order_list[i].zhongliang_num != ''){
              var this_list = order_list[i].zhongliang_num.split(',')
              var this_num = 0
              for(var j=0; j<this_list.length; j++){
                if(this_list[j] != ''){
                  this_num += this_list[j] * 1
                }
              }
              order_list[i].number = this_num
            }
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

          console.log(order_list)
          //循环订单，计算单价*数量
          for(var i=0; i<order_list.length; i++){
            for(var j=0; j<list.length; j++){
              if(order_list[i].NameofProduct == list[j].NameofProduct){
                if(list[j][order_list[i].name] == ""){
                  list[j][order_list[i].name] = order_list[i].Theunitprice + "*" + order_list[i].number
                }else{
                  console.log(order_list[i].name)
                  console.log(list[j][order_list[i].name])
                  var this_str = list[j][order_list[i].name].split("+")
                  var panduan = false
                  for(var k=0; k<this_str.length; k++){
                    var this_price = this_str[k].split("*")[0]
                    if(this_price == order_list[i].Theunitprice){
                      var this_num = this_str[k].split("*")[1] * 1 + order_list[i].number * 1
                      this_str[k] = this_price + "*" + this_num
                      panduan = true
                      break;
                    }
                  }
                  if(panduan){
                    var end_str = ""
                    for(var k=0; k<this_str.length; k++){
                      if(end_str == ''){  
                        end_str = this_str[k]
                      }else{
                        end_str = end_str + "+" + this_str[k]
                      }
                    }
                    list[j][order_list[i].name] = end_str
                  }else{
                    var end_str = list[j][order_list[i].name]
                    end_str = end_str + "+" + order_list[i].Theunitprice + "*" + order_list[i].number
                    list[j][order_list[i].name] = end_str
                  }
                }
              }
            }
          }

          for(var i=0; i<list.length; i++){
            let tempArr = Object.keys(list[i])
            console.log(tempArr)
            var sum = 0
            for(var j=0; j<tempArr.length; j++){
              if(tempArr[j] != "NameofProduct" && tempArr[j] != "sum"){
                console.log(list[i][tempArr[j]])
                var this_arr = list[i][tempArr[j]].split("+")
                for(var k=0; k<this_arr.length; k++){
                  var arr_item = this_arr[k].split("*")
                  if(arr_item[1] != '' && arr_item[1] != null && arr_item[1] != undefined){
                    sum = sum + arr_item[0] * arr_item[1]
                  }
                }
              }
            }
            list[i].sum = sum
          }

          let tempArr = Object.keys(list[0])
          var sum_row = {
            NameofProduct:'合计：' 
          }
          for(var i=0; i<tempArr.length; i++){
            var sum = 0
            if(tempArr[i] != "NameofProduct" && tempArr[i] != "sum"){
              for(var j=0; j<list.length; j++){
                var this_arr = list[j][tempArr[i]].split("+")
                for(var k=0; k<this_arr.length; k++){
                  var arr_item = this_arr[k].split("*")
                  if(arr_item[1] != '' && arr_item[1] != null && arr_item[1] != undefined){
                    sum = sum + arr_item[0] * arr_item[1]
                  }
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

          _this.setData({
            title,
            list
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
      name : '业务员报货汇总单',
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


 
