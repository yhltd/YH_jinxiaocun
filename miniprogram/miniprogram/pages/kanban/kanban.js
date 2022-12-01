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
  xlShow4: false,
  xlShow1: false,
  data: {
    list: [],
    title: [
      {
        text: "类型",
        width: "200rpx",
        columnName: "type",
        type: "text",
        isupd: true
      },
      {
        text: "日期",
        width: "200rpx",
        columnName: "riqi",
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
        text: "业务员",
        width: "200rpx",
        columnName: "salesman",
        type: "text",
        isupd: true
      },
      // {
      //   text: "状态",
      //   width: "200rpx",
      //   columnName: "state",
      //   type: "text",
      //   isupd: true
      // },
      {
        text: "发货状态",
        width: "200rpx",
        columnName: "fahuo",
        type: "text",
        isupd: true
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var userPower = JSON.parse(options.userPower)
    _this.setData({
      userInfo:userInfo,
      userPower:userPower
    })
    _this.tableShow()
    _this.tableShow2()
  },

  tableShow: function () {
    var _this = this
    var this_date = getNowDate()
    var sql="select '入库' as type,riqi,staff,state from ruku where state = '审核中' group by riqi,staff,state;select '销售' as type,s.riqi,customer,salesman,sale_state from sale as s left join customerInfo as c on s.customer_id = c.id where sale_state = '审核中' group by s.riqi,customer,salesman,sale_state;select '出库' as type,s.riqi,isnull(customer,'') as customer,isnull(salesman,'') as salesman,fahuo from sale as s left join customerInfo as c on s.customer_id = c.id where sale_state = '审核中' and fahuo = '未发货' group by s.riqi,customer,salesman,fahuo;select sum(convert(float,xiaoji)) as jine from sale where sale_state = '审核中' and fahuo = '未发货' and type = '销售' and riqi = '" + this_date + "';select sum(convert(float,f_jine)) as jine from payment as p left join customerInfo as c on p.customer_id = c.id where p.riqi ='" + this_date + "';"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query : sql
      },
      success: res => {
        console.log(sql)
        console.log(res)
        var list1 = res.result.recordsets[0]
        var list2 = res.result.recordsets[1]
        var list3 = res.result.recordsets[2]
        var g_xiaoshou = res.result.recordsets[3][0].jine
        var g_shoukuan = res.result.recordsets[4][0].jine
        if(g_xiaoshou == undefined){
          g_xiaoshou = 0
        }
        if(g_shoukuan == undefined){
          g_shoukuan = 0
        }
        
        var this_list = []
        for(var i=0; i<list1.length; i++){
          this_list.push({
            type:list1[i].type,
            customer:'',
            riqi:list1[i].riqi,
            salesman:list1[i].staff,
            state:list1[i].state,
          })
        }

        for(var i=0; i<list2.length; i++){
          this_list.push({
            type:list2[i].type,
            customer:list2[i].customer,
            riqi:list2[i].riqi,
            salesman:list2[i].salesman,
            state:list2[i].sale_state,
          })
        }

        for(var i=0; i<list3.length; i++){
          this_list.push({
            type:list3[i].type,
            customer:list3[i].customer,
            riqi:list3[i].riqi,
            salesman:list3[i].salesman,
            fahuo:list3[i].fahuo,
          })
        }

        console.log(this_list)
        _this.setData({
          list: this_list,
          g_xiaoshou,
          g_shoukuan
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

  tableShow2: function () {
    var _this = this
    var this_date = getNowDate()
    var year = this_date.split("-")[0] * 1
    var month = this_date.split("-")[1] * 1
    var stop_day = getDays(year,month)
    var year = this_date.split("-")[0]
    var month = this_date.split("-")[1]
    var start_date = year + "-" + month + "-" + "01"
    var stop_date = year + "-" + month + "-" + stop_day
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query : "select '入库' as type,riqi,staff,state from ruku where state = '审核中' and staff ='" + _this.data.userInfo.name + "' group by riqi,staff,state;select '销售' as type,s.riqi,customer,salesman,sale_state from sale as s left join customerInfo as c on s.customer_id = c.id where sale_state = '审核中' and salesman ='" + _this.data.userInfo.name + "' group by s.riqi,customer,salesman,sale_state;select '出库' as type,s.riqi,isnull(customer,'') as customer,isnull(salesman,'') as salesman,fahuo from sale as s left join customerInfo as c on s.customer_id = c.id where fahuo = '未发货' and salesman ='" + _this.data.userInfo.name + "' group by s.riqi,customer,salesman,fahuo;select sum(convert(float,xiaoji)) as jine from sale as s left join customerInfo as c on s.customer_id = c.id where sale_state = '审核通过' and fahuo = '未发货' and type = '销售' and s.riqi >= '" + start_date + "' and s.riqi <= '" + stop_date + "' and c.salesman = '" + _this.data.userInfo.name + "';select sum(convert(float,f_jine)) as jine from payment as p left join customerInfo as c on p.customer_id = c.id where p.riqi >='" + start_date + "' and p.riqi <='" + stop_date + "' and c.salesman = '" + _this.data.userInfo.name + "';"
      },
      success: res => {
        console.log(res)
        var list1 = res.result.recordsets[0]
        var list2 = res.result.recordsets[1]
        var list3 = res.result.recordsets[2]
        var q_xiaoshou = res.result.recordsets[3][0].jine
        var q_shoukuan = res.result.recordsets[4][0].jine
        if(q_xiaoshou == undefined){
          q_xiaoshou = 0
        }
        if(q_shoukuan == undefined){
          q_shoukuan = 0
        }
        
        var this_list = []
        for(var i=0; i<list1.length; i++){
          this_list.push({
            type:list1[i].type,
            customer:'',
            riqi:list1[i].riqi,
            salesman:list1[i].staff,
            state:list1[i].state,
          })
        }

        for(var i=0; i<list2.length; i++){
          this_list.push({
            type:list2[i].type,
            customer:list2[i].customer,
            riqi:list2[i].riqi,
            salesman:list2[i].salesman,
            state:list2[i].sale_state,
          })
        }

        for(var i=0; i<list3.length; i++){
          this_list.push({
            type:list3[i].type,
            customer:list3[i].customer,
            riqi:list3[i].riqi,
            salesman:list3[i].salesman,
            fahuo:list3[i].fahuo,
          })
        }

        console.log(this_list)
        _this.setData({
          list2: this_list,
          q_xiaoshou,
          q_shoukuan
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

  clickView1:function(e){
    var _this = this
      var type = _this.data.list[e.currentTarget.dataset.index].type
      var customer = _this.data.list[e.currentTarget.dataset.index].customer
      var riqi = _this.data.list[e.currentTarget.dataset.index].riqi
      var salesman = _this.data.list[e.currentTarget.dataset.index].salesman
      var state = _this.data.list[e.currentTarget.dataset.index].state
      var tiaojian = [type,customer,riqi,salesman,state]

      console.log(type)

      wx.showModal({
        title: '',
        content: '是否要跳转到对应页面？',
        success:res=>{
         if (res.confirm) {
          var quanxian = ""
          if(type == '入库'){
            for(var i=0; i<_this.data.userPower.length; i++){
              if("入库" == _this.data.userPower[i].view_name){
                quanxian={
                  zeng:_this.data.userPower[i].zeng,
                  shan:_this.data.userPower[i].shan,
                  gai:_this.data.userPower[i].gai,
                  cha:_this.data.userPower[i].cha
                }
              }
            }
            wx.navigateTo({
              url: "../ruku/ruku" + "?userInfo="+JSON.stringify(_this.data.userInfo) + "&userPower=" + JSON.stringify(quanxian)+ "&tiaojian=" + JSON.stringify(tiaojian)
            })
          }else if(type == '销售'){
            for(var i=0; i<_this.data.userPower.length; i++){
              if("销售" == _this.data.userPower[i].view_name){
                quanxian={
                  zeng:_this.data.userPower[i].zeng,
                  shan:_this.data.userPower[i].shan,
                  gai:_this.data.userPower[i].gai,
                  cha:_this.data.userPower[i].cha
                }
              }
            }
            wx.navigateTo({
              url: "../sale/sale" + "?userInfo="+JSON.stringify(_this.data.userInfo) + "&userPower=" + JSON.stringify(quanxian)+ "&tiaojian=" + JSON.stringify(tiaojian)
            })
          }else if(type == '出库'){
            for(var i=0; i<_this.data.userPower.length; i++){
              if("出库" == _this.data.userPower[i].view_name){
                quanxian={
                  zeng:_this.data.userPower[i].zeng,
                  shan:_this.data.userPower[i].shan,
                  gai:_this.data.userPower[i].gai,
                  cha:_this.data.userPower[i].cha
                }
              }
            }
            wx.navigateTo({
              url: "../chuku/chuku" + "?userInfo="+JSON.stringify(_this.data.userInfo) + "&userPower=" + JSON.stringify(quanxian)+ "&tiaojian=" + JSON.stringify(tiaojian)
            })
          }
         } else if (res.cancel) {
          return;
         }
        }
      })
      
  },

  clickView2:function(e){
    var type = _this.data.list2[e.currentTarget.dataset.index].type
      var customer = _this.data.list2[e.currentTarget.dataset.index].customer
      var riqi = _this.data.list2[e.currentTarget.dataset.index].riqi
      var salesman = _this.data.list2[e.currentTarget.dataset.index].salesman
      var state = _this.data.list2[e.currentTarget.dataset.index].state
      var tiaojian = [type,customer,riqi,salesman,state]
      for(var i=0; i<tiaojian.length; i++){
        if(tiaojian[i] == undefined){
          tiaojian[i] = ''
        }
      }
      wx.showModal({
        title: '',
        content: '是否要跳转到对应页面？',
        success:res=>{
         if (res.confirm) {
          var quanxian = ""
          if(type == '入库'){
            for(var i=0; i<_this.data.userPower.length; i++){
              if("入库" == _this.data.userPower[i].view_name){
                quanxian={
                  zeng:_this.data.userPower[i].zeng,
                  shan:_this.data.userPower[i].shan,
                  gai:_this.data.userPower[i].gai,
                  cha:_this.data.userPower[i].cha
                }
              }
            }
            wx.navigateTo({
              url: "../ruku/ruku" + "?userInfo="+JSON.stringify(_this.data.userInfo) + "&userPower=" + JSON.stringify(quanxian) + "&tiaojian=" + JSON.stringify(tiaojian)
            })
          }else if(type == '销售'){
            for(var i=0; i<_this.data.userPower.length; i++){
              if("销售" == _this.data.userPower[i].view_name){
                quanxian={
                  zeng:_this.data.userPower[i].zeng,
                  shan:_this.data.userPower[i].shan,
                  gai:_this.data.userPower[i].gai,
                  cha:_this.data.userPower[i].cha
                }
              }
            }
            wx.navigateTo({
              url: "../sale/sale" + "?userInfo="+JSON.stringify(_this.data.userInfo) + "&userPower=" + JSON.stringify(quanxian)+ "&tiaojian=" + JSON.stringify(tiaojian)
            })
          }else if(type == '出库'){
            for(var i=0; i<_this.data.userPower.length; i++){
              if("出库" == _this.data.userPower[i].view_name){
                quanxian={
                  zeng:_this.data.userPower[i].zeng,
                  shan:_this.data.userPower[i].shan,
                  gai:_this.data.userPower[i].gai,
                  cha:_this.data.userPower[i].cha
                }
              }
            }
            wx.navigateTo({
              url: "../chuku/chuku" + "?userInfo="+JSON.stringify(_this.data.userInfo) + "&userPower=" + JSON.stringify(quanxian)+ "&tiaojian=" + JSON.stringify(tiaojian)
            })
          }
         } else if (res.cancel) {
          return;
         }
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


 function getDays(year, month) {
  let days = [31,28,31,30,31,30,31,31,30,31,30,31] 
 if ( (year % 4 ===0) && (year % 100 !==0 || year % 400 ===0) ) {
       days[1] = 29
 }
　　return days[month]  
}