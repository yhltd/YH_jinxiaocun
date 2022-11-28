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
   
    id:'',
    uid:'',
    name:'',
    Customer_id:'',
    Documentnumber: '', 
    riqi: '',
    NameofProduct:'',
    unit: '', 
    Theunitprice: '',
    number:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo,
    })
    var sql
    console.log(userInfo.power=='管理员')
    if (userInfo.power=='管理员'){
      sql ="select DC.id,us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join userInfo as us on us.id = DC.Customer_id "
    }else if (userInfo.power=='客户'){
      sql ="select DC.id,us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join userInfo as us on us.id = DC.Customer_id where DC.Customer_id='"+ userInfo.id +"'"
    }else if (userInfo.power=='业务员'){
      sql ="select DC.id,us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join userInfo as us on us.id = DC.Customer_id where us.salesman = '"+ userInfo.id +"' and us.power='客户'"
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
      return;
    }
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
   
  },



  tableShow: function (e) {
    var _this = this
    let power = _this.data.userInfo.power;
    let id = _this.data.userInfo.id;
    var sql
    if (power=='管理员'){
      sql ="select DC.id,us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join userInfo as us on us.id = DC.Customer_id where us.name like '%" + e[0] + "%' and DC.NameofProduct like '%" + e[1] + "%' "
    }else if (power=='客户'){
      sql ="select DC.id,us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join userInfo as us on us.id = DC.Customer_id where us.name like '%" + e[0] + "%' and DC.NameofProduct like '%" + e[1] + "%' and DC.Customer_id='"+ id +"'"
    }else if (power=='业务员'){
      sql ="select DC.id,us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join userInfo as us on us.id = DC.Customer_id where us.name like '%" + e[0] + "%' and DC.NameofProduct like '%" + e[1] + "%' and DC.Customer_id='"+ id +"' and us.salesman = '"+ id +"' and us.power='客户'"
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
      return;
    }
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
          list: list
        })
        console.log(list)
        _this.qxShow()
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
    let power = _this.data.userInfo.power;
    if (power=='管理员' || power=='业务员'){
      _this.setData({
        id: _this.data.list[e.currentTarget.dataset.index].id,
        uid: _this.data.list[e.currentTarget.dataset.index].uid,
        NameofProduct: _this.data.list[e.currentTarget.dataset.index].NameofProduct, 
        unit: _this.data.list[e.currentTarget.dataset.index].unit,
        Theunitprice: _this.data.list[e.currentTarget.dataset.index].Theunitprice,
        number: _this.data.list[e.currentTarget.dataset.index].number,
        xgShow:true,
      })
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
      return;
    }
    
  },
  
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      uid:'',
      name:'',
      Customer_id:'',
      Documentnumber: '', 
      riqi: '',
      NameofProduct:'',
      unit: '', 
      Theunitprice: '',
      number:'',
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
    let power = _this.data.userInfo.power;
    var sql
    if (power=='管理员' || power=='业务员'){
      sql ="update Detailsoforder set NameofProduct='" + _this.data.NameofProduct + "',unit='" + _this.data.unit + "',Theunitprice='" + _this.data.Theunitprice + "',number='" + _this.data.number + "' where id='" + _this.data.id +"'"
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
        query:sql 
      },
      success: res => {
        _this.setData({
          id:'',
          uid:'',
          name:'',
          Customer_id:'',
          Documentnumber: '', 
          riqi: '',
          NameofProduct:'',
          unit: '', 
          Theunitprice: '',
          number:'',
        })
        _this.qxShow()
        var e = ['','']
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
    let power = _this.data.userInfo.power;
    let id = _this.data.userInfo.id;
    var sql
    if (power=='管理员' || power=='业务员'){
      sql ="delete from Detailsoforder where id='"+ id +"'"
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
      return;
    }
    console.log(sql)
    wx.showModal({
      title: '提示',
      content: '确认删除此条订单？',
      success (res) {
       if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlserver_yiwa',
            data: {
              query: sql
            },
            success: res => {
              _this.setData({
                id:'',
                uid:'',
                name:'',
                Customer_id:'',
                Documentnumber: '', 
                riqi: '',
                NameofProduct:'',
                unit: '', 
                Theunitprice: '',
                number:'',
              })
              _this.qxShow()
              var e = ['','']
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
        } else if (res.cancel) {

        }
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
      [e.target.dataset.NameofProduct]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.name,_this.data.NameofProduct]
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
