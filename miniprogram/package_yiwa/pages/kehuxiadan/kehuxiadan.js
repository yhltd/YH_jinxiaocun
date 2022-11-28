// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: true,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  data: {
    list: [],
    title: [{
        text: "客户id",
        width: "250rpx",
        columnName: "Customer_id",
        type: "text",
        isupd: true
      },
      {
        text: "单据编号",
        width: "250rpx",
        columnName: "Documentnumber",
        type: "text",
        isupd: true
      },
      {
        text: "日期",
        width: "250rpx",
        columnName: "riqi",
        type: "text",
        isupd: true
      },
      {
        text: "产品名称",
        width: "250rpx",
        columnName: "NameofProduct",
        type: "text",
        isupd: true
      },
      {
        text: "单位",
        width: "250rpx",
        columnName: "unit",
        type: "text",
        isupd: true
      },
      {
        text: "单价",
        width: "250rpx",
        columnName: "Theunitprice",
        type: "text",
        isupd: true
      },
      {
        text: "数量",
        width: "250rpx",
        columnName: "number",
        type: "text",
        isupd: true
      },
    ],
    add_title: [
      {
        text: "产品名称",
        width: "250rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "单位",
        width: "250rpx",
        columnName: "unit",
        type: "text",
        isupd: true
      },
      {
        text: "单价",
        width: "250rpx",
        columnName: "Theunitprice",
        type: "text",
        isupd: true
      },
      {
        text: "数量",
        width: "250rpx",
        columnName: "number",
        type: "text",
        isupd: true
      },
  ],
    listChanPin:[],
    id:'',
    Customer_id: '', 
    Documentnumber: '',
    riqi:'',
    NameofProduct: '',
    unit: '',
    Theunitprice: '',
    number: '',
    add_list:[],
    idd:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    if (userInfo.power == '客户'){
      _this.setData({
        userInfo:userInfo,
        Customer_id:userInfo.name, 
      })
    }
    _this.setData({
      userInfo:userInfo,
    })
      console.log(userInfo.power)
      if (userInfo.power=='管理员'){
        sql="select id,name from userInfo where power='客户'"
      }else if (userInfo.power=='业务员'){
        sql="select id,name from userInfo where power='客户' and salesman = '"+  userInfo.id +"' "
      }
      
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlserver_yiwa',
        data: {
          query: sql
        },
        success: res => {
          var list = res.result.recordset
          var khmc=[] 
          console.log(list)
          for (var i = 0;list.length>i;i++){
            khmc.push(list[i].name)
          }
          _this.setData({
            list:list,
            khmc:khmc
          })
          _this.qxShow()
          console.log(khmc)
          
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

    var bianhao_left = getBianHao()
    var riqi= getNowDate()
    
    console.log(bianhao_left)

    var sql = "select Documentnumber from Detailsoforder where Documentnumber like '" + bianhao_left + "%'"
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        var bianhao_list = res.result.recordset
        var new_bianhao = "001" 
        for(var i=0; i<bianhao_list.length; i++){
          if(bianhao_list[i].Documentnumber != '' && bianhao_list[i].Documentnumber != null && bianhao_list[i].Documentnumber != undefined){
            var this_bianhao = bianhao_list[i].Documentnumber.slice(10)
            console.log(this_bianhao)
            if(this_bianhao >= new_bianhao){
              new_bianhao = (this_bianhao * 1 + 1).toString()
              if(new_bianhao.length == 1){
                new_bianhao = "00" + new_bianhao.toString()
              }else if(new_bianhao.length == 2){
                new_bianhao = "0" + new_bianhao.toString()
              }
              console.log(new_bianhao)
            }
          }
        }
        new_bianhao = bianhao_left.toString() + new_bianhao.toString()
        _this.setData({
          Documentnumber:new_bianhao,
          riqi:riqi
        })
      },
      err: res => {
        wx.showToast({
          title: '读取下拉列表错误！',
          icon: 'none'
        })
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

    console.log(userInfo.id)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "select DP.id,Thedetail_id,Customer_id,DC.NameofProduct as name,DC.unit,DP.Theunitprice from DetailsofProducts as DP left join DetailedConfiguration as DC on DP.Thedetail_id = DC.id where Customer_id = '"+ userInfo.id +"'"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          listChanPin: list
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
      tjShow: true,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

 

  clickView1:function(e){
    var _this = this
    
    console.log(e.currentTarget.dataset.column)
    console.log(e.currentTarget.dataset.value)
    console.log(_this.data.list[e.currentTarget.dataset.index].id)
    if(e.currentTarget.dataset.column == 'number'){
      _this.setData({
        id: e.currentTarget.dataset.index,
        this_column:e.currentTarget.dataset.column,
        this_value:e.currentTarget.dataset.value,
        xgShow:true,
      })
    }
    
  },

  upd2:function(){
    var _this = this
    var add_list = _this.data.add_list
    add_list[_this.data.id][_this.data.this_column] = _this.data.number
    console.log(_this.data.this_value)
    _this.setData({
      add_list:add_list
    })
    _this.qxShow()
  },

  bindPickerChange: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为',e.detail.value)
    var i = e.detail.value
    console.log(_this.data.list[i].id)
    
    _this.setData({
      Customer_id:_this.data.khmc[e.detail.value],
      idd:_this.data.list[i].id
    })
  },

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为',e.detail.value)

    _this.setData({
      NameofProduct_xl:_this.data.NameofProduct[e.detail.value],
      
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

    if(_this.data.Customer_id == ''){
      wx.showToast({
        title: '客户名称未填写！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.add_list.length == '0'){
      wx.showToast({
        title: '为选择商品！',
        icon: 'none'
      })
      return;
    }
    
    console.log(_this.data.add_list)
    for(var i=0; i<_this.data.add_list.length; i++){
     
      if(_this.data.add_list[i].number == '' || _this.data.add_list[i].number == undefined){
        wx.showToast({
          title: '产品列表中第'+ i * 1+1 +'行未填写数量！',
          icon: 'none'
        })
        return;
      }
    }
    console.log(_this.data.idd)
      var sql1 = "insert into Detailsoforder(Customer_id,Documentnumber,riqi,NameofProduct,unit,Theunitprice,number) values "
      var sql2 = ""
      for(var i=0; i< _this.data.add_list.length; i++){
        if(sql2 == ""){
          sql2 = "('" + _this.data.idd + "','"+ _this.data.Documentnumber +"','"+ _this.data.riqi +"','" + _this.data.add_list[i].name + "','" + _this.data.add_list[i].unit + "','" + _this.data.add_list[i].Theunitprice + "','" + _this.data.add_list[i].number + "')"
        }else{
          sql2 = sql2 + ",('" + _this.data.idd + "','"+ _this.data.Documentnumber +"','"+ _this.data.riqi +"','" + _this.data.add_list[i].name + "','" + _this.data.add_list[i].unit + "','" + _this.data.add_list[i].Theunitprice + "','" + _this.data.add_list[i].number + "')"
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
          
          _this.qxShow()
         
          wx.showToast({
            title: '添加成功！',
            icon: 'none'
          })
          var common_Interval = setInterval(()=>
          {
            wx.navigateBack({ 
              delta: 1
            });
            clearInterval(common_Interval);
          }, 2000)
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

  tab_del:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    wx.showModal({
      title: '提示',
      content: '确认删除此行数据？',
      success (res) {
        if (res.confirm) {
          var add_list = _this.data.add_list
          add_list.splice(e.currentTarget.dataset.index,1)
          _this.setData({
            add_list:add_list
          })
          console.log(add_list)
        } else if (res.cancel) {

        }
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


  selCD: function () {
    var _this = this
    _this.setData({
      xlShow4_type:"add",
      xlShow4: true
    })
  },

  select4: function (e) {
    var _this = this
    if (e.type == "select") {
      if(_this.data.xlShow4_type == "add"){
        _this.data.listChanPin
        var add_list = _this.data.add_list
        for (var i=0;add_list.length>i;i++){
          if(add_list[i].Thedetail_id == e.detail.Thedetail_id){
            wx.showToast({
              title: '列表中已有此产品，无需重复添加！',
              icon: 'none'
            })
            return;
          }
        }
        add_list.push({
          Thedetail_id:e.detail.Thedetail_id,
          name:e.detail.name,
          unit:e.detail.unit,
          Theunitprice:e.detail.Theunitprice,
          number:'',
        })
        _this.setData({
          xlShow4: false,
          add_list:add_list
        })
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow4: false,
      })
    }
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
function getBianHao() {
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
  var currentdate =  year.toString() + month.toString() + day.toString() ;
  return currentdate;
 }
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