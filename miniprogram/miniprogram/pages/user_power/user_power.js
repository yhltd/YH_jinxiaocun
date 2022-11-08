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
    list: [],
    title: [{
        text: "用户名",
        width: "250rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "页面名称",
        width: "250rpx",
        columnName: "view_name",
        type: "text",
        isupd: true
      },
      {
        text: "新增",
        width: "200rpx",
        columnName: "zeng",
        type: "text",
        isupd: true
      },
      {
        text: "删除",
        width: "200rpx",
        columnName: "shan",
        type: "text",
        isupd: true
      },{
        text: "修改",
        width: "200rpx",
        columnName: "gai",
        type: "text",
        isupd: true
      },{
        text: "查询",
        width: "200rpx",
        columnName: "cha",
        type: "text",
        isupd: true
      }
    ],
    power_list:['可操作','无权限'],
    view_list:['常规设置','产品设置','客户信息','化验明细','入库','销售','库存','收付款明细','发票','客户往来款看板','销售额统计','按月统计','审核管理','账号管理','权限管理']
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

    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select id,name from userInfo where name != ''"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        var picker_list = []
        for(var i=0; i<list.length; i++){
          picker_list.push(
            list[i].name
          )
        }
        _this.setData({
          customer_list: list,
          customer_picker_list: picker_list
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

    var e = ['']
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select userPower.id,userInfo.name,userPower.view_name,userPower.zeng,userPower.shan,userPower.gai,userPower.cha from userPower left join userInfo on userPower.user_id = userInfo.id where userInfo.name like '%" +e[0]+ "%'"
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

  bindPickerChange: function(e){
    var _this = this
    console.log(_this.data.power_list[e.detail.value])
    _this.setData({
      [e.target.dataset.column_name]: _this.data.power_list[e.detail.value]
    })
  },

  bindPickerChange2: function(e){
    var _this = this
    console.log(_this.data.customer_list[e.detail.value].name + " " + _this.data.customer_list[e.detail.value].id)
    _this.setData({
      [e.target.dataset.column_name]: _this.data.customer_list[e.detail.value].name,
      user_id: _this.data.customer_list[e.detail.value].id
    })
  },

  bindPickerChange3: function(e){
    var _this = this
    console.log(_this.data.view_list[e.detail.value])
    _this.setData({
      [e.target.dataset.column_name]: _this.data.view_list[e.detail.value]
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

  // clickView:function(e){
  //   var _this = this
  //   if(_this.data.userPower.gai != '可操作' && _this.data.userInfo.power != '管理员'){
  //     wx.showToast({
  //       title: '无权限！',
  //       icon: 'none',
  //       duration: 3000
  //     })
  //     return;
  //   }
  //   _this.setData({
  //     id: _this.data.list[e.currentTarget.dataset.index].id,
  //     user_id:_this.data.list[e.currentTarget.dataset.index].user_id,
  //     view_name:_this.data.list[e.currentTarget.dataset.index].view_name,
  //     name: _this.data.list[e.currentTarget.dataset.index].name, 
  //     zeng: _this.data.list[e.currentTarget.dataset.index].zeng,
  //     shan: _this.data.list[e.currentTarget.dataset.index].shan,
  //     gai: _this.data.list[e.currentTarget.dataset.index].gai,
  //     cha: _this.data.list[e.currentTarget.dataset.index].cha,
  //     xgShow:true,
  //   })
  // },

  clickView:function(e){
    var _this = this
    var this_column = e.currentTarget.dataset.column
    if(this_column != 'zeng' && this_column != 'shan' && this_column != 'gai' && this_column != 'cha' ){
      return;
    }
    if(_this.data.userPower.gai != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核员'){
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
      // sale_name: _this.data.list[e.currentTarget.dataset.index].sale_name, 
      // test_name: _this.data.list[e.currentTarget.dataset.index].test_name,
      // express: _this.data.list[e.currentTarget.dataset.index].express,
      // pick: _this.data.list[e.currentTarget.dataset.index].pick,
      // pay: _this.data.list[e.currentTarget.dataset.index].pay,
      // warehouse: _this.data.list[e.currentTarget.dataset.index].warehouse,
      // department: _this.data.list[e.currentTarget.dataset.index].department,
      // customer_type: _this.data.list[e.currentTarget.dataset.index].customer_type,
      
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    if(_this.data.userPower.zeng != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      tjShow: true,
      id: '',
      user_id:'',
      view_name:'',
      name: '',
      zeng: '',
      shan: '',
      gai: '',
      cha: '',
    })
  },

  add1: function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: "insert into userPower(user_id,view_name,zeng,shan,gai,cha) values('" + _this.data.user_id + "','" + _this.data.view_name + "','" + _this.data.zeng + "','" + _this.data.shan + "','" + _this.data.gai + "','" + _this.data.cha + "')"
        },
        success: res => {
          _this.setData({
            id: '',
            user_id:'',
            view_name:'',
            name: '',
            zeng: '',
            shan: '',
            gai: '',
            cha: '',
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
      name: 'sqlserver_zhejiang',
      data: {
        query: "update userPower set " + _this.data.this_column + "='" + _this.data.this_value + "' where  id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
          id:'',
          this_column:'',
          this_value:'',
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

  // del1:function(){
  //   var _this = this
  //   if(_this.data.userPower.shan != '可操作' && _this.data.userInfo.power != '管理员'){
  //     wx.showToast({
  //       title: '无权限！',
  //       icon: 'none',
  //       duration: 3000
  //     })
  //     return;
  //   }
  //     wx.cloud.callFunction({
  //       name: 'sqlserver_zhejiang',
  //       data: {
  //         query: "delete from userPower where id='" + _this.data.id + "'"
  //       },
  //       success: res => {
  //         _this.setData({
  //           id: '',
  //           username: '',
  //           password:'',
  //           power: '',
  //           name: '',
  //           department: '',
  //         })
  //         _this.qxShow()
  //         var e = ['']
  //         _this.tableShow(e)
  //         wx.showToast({
  //           title: '删除成功！',
  //           icon: 'none'
  //         })
  //       },
  //       err: res => {
  //         console.log("错误!")
  //       },
  //       fail: res => {
  //         wx.showToast({
  //           title: '请求失败！',
  //           icon: 'none'
  //         })
  //         console.log("请求失败！")
  //       }
  //     })
  // },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      name:"",
    })
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