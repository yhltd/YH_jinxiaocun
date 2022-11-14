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
  data: {
    update_name:{
      sale_name:"销售人员姓名",
      test_name:"化验人员姓名",
      express:"快递方式",
      pick:"客户拿货方式",
      pay:"付款方式",
      warehouse:"仓库",
      department:"部门",
      customer_type:"客户类别",
      area:"区域",
      attributes:"产品属性",
      sale_type:"发货类型",
    },
    list: [],
    title: [{
        text: "销售人员姓名",
        width: "275rpx",
        columnName: "sale_name",
        type: "text",
        isupd: true
      },
      {
        text: "化验人员姓名",
        width: "275rpx",
        columnName: "test_name",
        type: "text",
        isupd: true
      },
      {
        text: "快递方式",
        width: "200rpx",
        columnName: "express",
        type: "text",
        isupd: true
      },
      {
        text: "客户拿货方式",
        width: "275rpx",
        columnName: "pick",
        type: "text",
        isupd: true
      },{
        text: "付款方式",
        width: "200rpx",
        columnName: "pay",
        type: "text",
        isupd: true
      },{
        text: "仓库",
        width: "200rpx",
        columnName: "warehouse",
        type: "text",
        isupd: true
      },{
        text: "部门",
        width: "275rpx",
        columnName: "department",
        type: "text",
        isupd: true
      },{
        text: "客户类别",
        width: "275rpx",
        columnName: "customer_type",
        type: "text",
        isupd: true
      },
      {
        text: "区域",
        width: "275rpx",
        columnName: "area",
        type: "text",
        isupd: true
      },
      {
        text: "产品属性",
        width: "275rpx",
        columnName: "attributes",
        type: "text",
        isupd: true
      },
      {
        text: "发货类型",
        width: "275rpx",
        columnName: "sale_type",
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
    console.log(userPower)
    _this.setData({
      userInfo:userInfo,
      userPower:userPower
    })
    _this.tableShow()
  },

  tableShow: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select * from general"
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

  clickView:function(e){
    var _this = this
    if(_this.data.userPower.gai != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    console.log(e.currentTarget.dataset.column)
    console.log(e.currentTarget.dataset.value)
    console.log(_this.data.list[e.currentTarget.dataset.index].id)
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    if(_this.data.userPower.zeng != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    wx.showModal({
      title: '提示',
      content: '确认添加一条数据？',
      success (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlserver_zhejiang',
            data: {
              query: "insert into general(sale_name,test_name,express,pick,pay,warehouse,department,customer_type,area,attributes,sale_type) values('','','','','','','','','','','')"
            },
            success: res => {
              _this.setData({
                id:'',
                sale_name:'', 
                test_name: '',
                express: '',
                pick: '',
                pay: '',
                warehouse: '',
                department: '',
                customer_type: '',
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  add1: function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: "insert into general(sale_name,test_name,express,pick,pay,warehouse,department,customer_type) values('" + _this.data.sale_name + "','" + _this.data.test_name + "','" + _this.data.express + "','" + _this.data.pick + "','" + _this.data.pay + "','" + _this.data.warehouse + "','" + _this.data.department + "','" + _this.data.customer_type +  "')"
        },
        success: res => {
          _this.setData({
            id:'',
            sale_name:'', 
            test_name: '',
            express: '',
            pick: '',
            pay: '',
            warehouse: '',
            department: '',
            customer_type: '',
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
      name: 'sqlserver_zhejiang',
      data: {
        query: "update general set " + _this.data.this_column + "='" + _this.data.this_value + "' where  id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
          id:'',
          this_column:'',
          this_value:'',
        })
        _this.qxShow()
        _this.tableShow()

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

  del1:function(e){
    var _this = this
    console.log(_this.data.list[e.currentTarget.dataset.index].id)
    if(_this.data.userPower.shan != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    wx.showModal({
      title: '提示',
      content: '确认删除此行数据？',
      success (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlserver_zhejiang',
            data: {
              query: "delete from general where id=" + _this.data.list[e.currentTarget.dataset.index].id
            },
            success: res => {
              _this.setData({
                id:'',
                sale_name:'', 
                test_name: '',
                express: '',
                pick: '',
                pay: '',
                warehouse: '',
                department: '',
                customer_type: '',
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
        } else if (res.cancel) {

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