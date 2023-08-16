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

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
    if(column = "name"){
      var customer_list = _this.data.kehu_list
      var panduan = false
      for(var i=0; i<customer_list.length; i++){
        if(customer_list[i].name == e.detail.value && e.detail.value != ''){
          _this.setData({
            customer_id: customer_list[i].id
          })
          panduan = true

        }
      }
      if(panduan = false){
        _this.setData({
          idd: ''
        })
      }
    }
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
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == ''){
      start_date = '1900-01-01'
    }
    if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    if(_this.data.name == ''){
      wx.showToast({
        title: '未选择客户！',
        icon: 'none'
      })
      return;
    }

    var last_tiaojian = [_this.data.name,start_date,stop_date]
    _this.setData({
      last_tiaojian
    })
    var e = [_this.data.customer_id,start_date,stop_date]
    _this.add2(e)
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
    _this.setData({
      name:'',
      customer_id:'',
      start_date:'',
      stop_date:'',
      cxShow:true,
    })
  },

  sel_xiala:function(e){
    var _this = this
    var column = e.currentTarget.dataset.column
    console.log(column)
    var _this = this
    var sql = ""
    if(_this.data.userInfo.power == '管理员'){
      sql = "select * from userInfo where power ='客户' and name like '%" + _this.data.name + "%'"
    }else if(_this.data.userInfo.power == '业务员'){
      sql = "select * from userInfo where power ='客户' and salesman ='" + _this.data.userInfo.id + "' and name like '%" + _this.data.name + "%'"
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
          xlShow: true,
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

  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_name = e.detail.name
      var new_id = e.detail.id
      console.log(new_name)
      console.log(new_id)
      _this.setData({
        xlShow: false,
        name:new_name,
        customer_id:new_id
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow: false,
      })
    }
  },

  add2:function(e){
    var _this = this
    var select_customer = e[0]
    var start_date = e[1]
    var stop_date = e[2]

    var sql_head = 'select de.id,de.Customer_id,name,Documentnumber,riqi,NameofProduct,unit,Theunitprice,number,zhongliang_num from Detailsoforder as de left join (select id,name from userInfo) as us on us.id = de.Customer_id'
    var sql_foot = " where (Customer_id = '" + select_customer + "')"

    if(sql_foot != ''){
      var sql = sql_head + sql_foot + " and riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' order by riqi,NameofProduct;"
      var sql2 = "select NameofProduct from Detailsoforder " + sql_foot + " and riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by NameofProduct order by NameofProduct;"
      console.log(sql) 
      console.log(sql2)
      wx.cloud.callFunction({
        name: 'sqlserver_yiwa',
        data: {
          query: sql + sql2
        },
        success: res => {
          console.log(res)
          console.log(res.result.recordsets)
          //查询产品list、订单list、客户list
          var product_list = res.result.recordsets[1]
          var order_list = res.result.recordsets[0]
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
              order_list[i].number =  order_list[i].number + "(" + this_num + ")"
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
          var riqi_list = []
          //根据客户list拼接title
          for(var i=0; i<order_list.length; i++){
            if(order_list[i].riqi != '' && riqi_list.indexOf(order_list[i].riqi) == -1){
              title.push({
                text: order_list[i].riqi,
                width: "300rpx",
                columnName: order_list[i].riqi,
                type: "number",
                isupd: true
              })
              riqi_list.push(order_list[i].riqi)
            }
            list_item[order_list[i].riqi] = ''
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

          //循环订单，计算单价*数量
          for(var i=0; i<order_list.length; i++){
            for(var j=0; j<list.length; j++){
              if(order_list[i].NameofProduct == list[j].NameofProduct){
                if(list[j][order_list[i].riqi] == ""){
                  list[j][order_list[i].riqi] = order_list[i].Theunitprice + "*" + order_list[i].number
                }else{
                  console.log(order_list[i].riqi)
                  console.log(list[j][order_list[i].riqi])
                  var this_str = list[j][order_list[i].riqi].split("+")
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
                    list[j][order_list[i].riqi] = end_str
                  }else{
                    var end_str = list[j][order_list[i].riqi]
                    end_str = end_str + "+" + order_list[i].Theunitprice + "*" + order_list[i].number
                    list[j][order_list[i].riqi] = end_str
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
                    if(arr_item[1].indexOf("(") != -1){
                      var this_zhong = arr_item[1].split("(")[1].replace(")","")
                      sum = sum + arr_item[0] * this_zhong * 1
                    }else{
                      sum = sum + arr_item[0] * arr_item[1]
                    }
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
                    if(arr_item[1].indexOf("(") != -1){
                      var this_zhong = arr_item[1].split("(")[1].replace(")","")
                      sum = sum + arr_item[0] * this_zhong * 1
                    }else{
                      sum = sum + arr_item[0] * arr_item[1]
                    }
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
            type: "number",
            isupd: true
          })

          _this.setData({
            title,
            list,
            list_item
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
        width:parseInt(title[i].width.split("r")[0]),
        columnName:title[i].columnName
      })
    }
    var list_item = _this.data.list_item
    list_item.NameofProduct = ''
    list.push(JSON.parse(JSON.stringify(list_item)))
    list_item.NameofProduct = "姓名：" + _this.data.last_tiaojian[0]
    list.push(JSON.parse(JSON.stringify(list_item)))
    list_item.NameofProduct = "日期：" + _this.data.last_tiaojian[1] + "~" + _this.data.last_tiaojian[2]
    list.push(JSON.parse(JSON.stringify(list_item)))
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


 
