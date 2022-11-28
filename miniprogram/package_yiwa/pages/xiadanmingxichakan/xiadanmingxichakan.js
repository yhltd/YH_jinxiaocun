// package_huaqun/page/ddchakanxiangqing/ddchakanxiangqing.js
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
    update_name:{
      NameofProduct:"产品名称",
      unit:"单位",
      Theunitprice:"单价",
      number:"数量",
    },
    list: [],
    title: [{
      text: "客户姓名",
      width: "250rpx",
      columnName: "name",
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
    ],
    list2: [],
    ddxh_list_dj:[],
    title2: [{
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
  id:'',
  Customer_id:'',
  Documentnumber:'',
  riqi:'',
  NameofProduct:'',
  unit:'',
  Theunitprice:'',
  number:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var Documentnumber = JSON.parse(options.Documentnumber)
    var userInfo = JSON.parse(options.userInfo)
     _this.setData({
      Documentnumber:Documentnumber,
      userInfo:userInfo
    })
    var sql
    console.log(userInfo.power=='管理员')
    if (userInfo.power=='管理员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"' group by Documentnumber,name,us.id,riqi,Customer_id "
    }else if (userInfo.power=='客户'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"' and us.id = '"+ userInfo.id +"' and us.power='客户' group by Documentnumber,name,us.id,riqi,Customer_id "
    }else if (userInfo.power=='业务员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"' and us.id us.salesman = '"+ userInfo.id +"' and us.power='客户' group by Documentnumber,name,us.id,riqi,Customer_id"
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
      return;
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list:list,
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
    
    var sql=''
    console.log(userInfo.power=='管理员')
    if (userInfo.power=='管理员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"'"
    }else if (userInfo.power=='客户'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"' and us.id = '"+ userInfo.id +"' and us.power='客户'"
    }else if (userInfo.power=='业务员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"' and us.id us.salesman = '"+ userInfo.id +"' and us.power='客户'"
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
      return;
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list2:list,
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
    let djbh = _this.data.djbh;
    
    _this.setData({
      djbh:djbh
    })
    console.log(djbh)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select distinct djbh,xdrq,ddh,shouhuo,lxdh,shfs,azdz,khmc from lightbelt where djbh = '"+ djbh +"' "
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

  clickView1:function(e){
    var _this = this
    var this_row = e.currentTarget.dataset.index
    if (_this.data.userInfo.power=='管理员' || _this.data.userInfo.power=='业务员'){
      _this.setData({
        xgShow:true,
        
      })
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
    }
  },

  
  upd2:function(){
    var _this = this
    var list2= _this.data.list2
    list2[_this.data.this_index][_this.data.this_column] = _this.data.this_value
    
    var list1 = _this.data.ddxh_list_dj
    var dj
    for (var i = 0 ; i < list1.length ; i++){
      if (_this.data.this_column == 'lcb' &&  _this.data.this_value == list1[i].ddxh && list2[_this.data.this_index].ddcd > 400){
        dj = parseFloat(list1[i].mmdj) + parseFloat(((list2[_this.data.this_index].ddcd-400)/100) * list1[i].zjdj)
        list2[_this.data.this_index].dj = dj
        list2[_this.data.this_index].je = list2[_this.data.this_index].sl * list2[_this.data.this_index].dj
        list2[_this.data.this_index].gl = list2[_this.data.this_index].ddcd / 1000 * list2[_this.data.this_index].sl * 15
      }else if (_this.data.this_column == 'lcb' &&  _this.data.this_value == list1[i].ddxh){
        dj = list1[i].mmdj
        list2[_this.data.this_index].dj = dj
        list2[_this.data.this_index].je = list2[_this.data.this_index].sl * list2[_this.data.this_index].dj
        list2[_this.data.this_index].gl = list2[_this.data.this_index].ddcd / 1000 * list2[_this.data.this_index].sl * 15
      }
    }
    _this.setData({
      list2:list2
    })
    _this.qxShow()
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },
  
  add1: function(){
    var _this = this
    if (_this.data.userInfo.power=='管理员'){
      var i = _this.data.this_index
      console.log(_this.data.list2[i].id)
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "update lightbelt set " + _this.data.this_column + "='" + _this.data.this_value + "' where  id=" + _this.data.list2[i].id
        },
        success: res => {
          _this.setData({
            id:'',
            Customer_id:'',
            Documentnumber:'',
            riqi:'',
            NameofProduct:'',
            unit:'',
            Theunitprice:'',
            number:'',
          })
          _this.qxShow()
          _this.tableShow()
          
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
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
    }
    
  },

  del1:function(){
    var _this = this
    var i = _this.data.this_index
    console.log(_this.data.list2[0].id)
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "delete from lightbelt where id='"+ _this.data.list2[i].id +"'"
        },
        success: res => {
          _this.setData({
            id:'',
            Customer_id:'',
            Documentnumber:'',
            riqi:'',
            NameofProduct:'',
            unit:'',
            Theunitprice:'',
            number:'',
          })
          _this.qxShow()
          _this.tableShow()
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

  selCD: function () {
    var _this = this
    var list2 = _this.data.list2
    list2.push({
      id:'',
      Customer_id:'',
      Documentnumber:'',
      riqi:'',
      NameofProduct:'',
      unit:'',
      Theunitprice:'',
      number:'',
    })
    _this.setData({
      list2
    })
  },
  

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  cha1:function(){
    var _this=this
    wx.navigateTo({
      url: "../ddchakanxiangqing/ddchakanxiangqing?userInfo="+JSON.stringify(_this.data.userInfo)
    })
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.khmc,_this.data.ddh]
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

