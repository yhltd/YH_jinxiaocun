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
    state_upd_list:['','是'],
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
        text: "权限",
        width: "200rpx",
        columnName: "power",
        type: "text",
        isupd: true
      },
      {
        text: "姓名",
        width: "200rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },{
        text: "部门",
        width: "300rpx",
        columnName: "department",
        type: "text",
        isupd: true
      },{
        text: "能否修改审核通过数据",
        width: "400rpx",
        columnName: "state_upd",
        type: "text",
        isupd: true
      },{
        text: "能否查看销售单价金额",
        width: "400rpx",
        columnName: "money_sel",
        type: "text",
        isupd: true
      }
    ],
    power_list:['管理员','审核人','其他']
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

    var sql = "select department from general where department != ''"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var name_list = []
        for(var i=0; i<list.length; i++){
          name_list.push(list[i].department)
        }
        _this.setData({
          department_list: name_list
        })
        console.log(name_list)
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

    var e = ['','']
    _this.tableShow(e)
  },

  bindPickerChange2: function(e){
    var _this = this
    console.log(_this.data.department_list[e.detail.value])
    _this.setData({
      department: _this.data.department_list[e.detail.value]
    })
  },

  bindPickerChange1: function(e){
    var _this = this
    console.log(_this.data.state_upd_list[e.detail.value])
    _this.setData({
      state_upd: _this.data.state_upd_list[e.detail.value]
    })
  },

  bindPickerChange2: function(e){
    var _this = this
    console.log(_this.data.state_upd_list[e.detail.value])
    _this.setData({
      money_sel: _this.data.state_upd_list[e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select * from userInfo where name like '%" + e[0] + "%' and department like '%" + e[1] + "%'"
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
      power: _this.data.power_list[e.detail.value]
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
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      username: _this.data.list[e.currentTarget.dataset.index].username, 
      password: _this.data.list[e.currentTarget.dataset.index].password,
      power: _this.data.list[e.currentTarget.dataset.index].power,
      name: _this.data.list[e.currentTarget.dataset.index].name,
      department: _this.data.list[e.currentTarget.dataset.index].department,
      state_upd: _this.data.list[e.currentTarget.dataset.index].state_upd,
      money_sel: _this.data.list[e.currentTarget.dataset.index].money_sel,
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
    _this.setData({
      tjShow: true,
      id: '',
      username: '',
      password:'',
      power: '',
      name: '',
      department: '',
      state_upd: '',
      money_sel: '',
    })
  },

  add1: function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: "insert into userInfo(username,password,power,name,department,state_upd,money_sel) OUTPUT Inserted.id values('" + _this.data.username + "','" + _this.data.password + "','" + _this.data.power + "','" + _this.data.name + "','" + _this.data.department + "','" + _this.data.state_upd + "','" + _this.data.money_sel + "');"
        },
        success: res => {
          console.log(res)
          wx.cloud.callFunction({
            name: 'sqlserver_zhejiang',
            data: {
              query: "insert into userPower(user_id,view_name,zeng,shan,gai,cha) OUTPUT Inserted.id values('" + res.result.recordset[0].id + "','常规设置','','','',''),('" + res.result.recordset[0].id + "','产品设置','','','',''),('" + res.result.recordset[0].id + "','客户信息','','','',''),('" + res.result.recordset[0].id + "','化验明细','','','',''),('" + res.result.recordset[0].id + "','入库','','','',''),('" + res.result.recordset[0].id + "','销售','','','',''),('" + res.result.recordset[0].id + "','库存','','','',''),('" + res.result.recordset[0].id + "','收付款明细','','','',''),('" + res.result.recordset[0].id + "','发票','','','',''),('" + res.result.recordset[0].id + "','客户往来款看板','','','',''),('" + res.result.recordset[0].id + "','销售额统计','','','',''),('" + res.result.recordset[0].id + "','按月统计','','','',''),('" + res.result.recordset[0].id + "','审核管理','','','',''),('" + res.result.recordset[0].id + "','账号管理','','','',''),('" + res.result.recordset[0].id + "','权限管理','','','',''),('" + res.result.recordset[0].id + "','出库','','','',''),('" + res.result.recordset[0].id + "','看板','','','','')"
            },
            success: res => {
              console.log(res)
              _this.setData({
                id: '',
                username: '',
                password:'',
                power: '',
                name: '',
                department: '',
                state_upd: '',
                money_sel: '',
              })
              _this.qxShow()
              var e = ['','']
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
        query: "update userInfo set username='" + _this.data.username + "',password='" + _this.data.password + "',power='" + _this.data.power + "',name='" + _this.data.name + "',department='" + _this.data.department + "',state_upd='" + _this.data.state_upd + "',money_sel='" + _this.data.money_sel + "' where id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
          id: '',
          username: '',
          password:'',
          power: '',
          name: '',
          department: '',
          state_upd: '',
          money_sel: '',
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
    if(_this.data.userPower.shan != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: "delete from userInfo where id='" + _this.data.id + "';delete from userPower where user_id='" + _this.data.id + "';"
        },
        success: res => {
          _this.setData({
            id: '',
            username: '',
            password:'',
            power: '',
            name: '',
            department: '',
            state_upd: '',
            money_sel: '',
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
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      name:"",
      department:"",
    })
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.name,_this.data.department]
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