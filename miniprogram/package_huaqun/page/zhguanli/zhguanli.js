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
        text: "账号",
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
        text: "姓名",
        width: "250rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "权限",
        width: "250rpx",
        columnName: "power",
        type: "text",
        isupd: true
      },
    ],

    id:'',
    username: '', 
    password: '',
    name: '',
    power: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var e = ['','']
    _this.tableShow(e)
  },



  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select * from userInfo where name like '%" + e[0] + "%' and  power like '%" + e[1] + "%'"
      },
      success: res => {
        console.log(res)
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
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      username: _this.data.list[e.currentTarget.dataset.index].username, 
      password: _this.data.list[e.currentTarget.dataset.index].password,
      name: _this.data.list[e.currentTarget.dataset.index].name,
      power: _this.data.list[e.currentTarget.dataset.index].power,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      username: '', 
      password: '',
      name: '',
      power: '',
    })
  },
  add1: function(){
    var _this = this

    if(_this.data.username == ''){
      wx.showToast({
        title: '请输账号！',
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

    

      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "insert into userInfo(username,password,name,power) values('" + _this.data.username + "','" + _this.data.password + "','" + _this.data.name + "','" + _this.data.power + "')"
        },
        success: res => {
          _this.setData({
            id:'',
            username: '', 
            password: '',
            name: '',
            power: '',
            
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
      name: 'sqlserver_huaqun',
      data: {
        query: "update userInfo set username='" + _this.data.username + "',password='" + _this.data.password + "',name='" + _this.data.name + "',power='" + _this.data.power + "' where id=" + _this.data.id  
      },
      success: res => {
        _this.setData({
            id:'',
            username: '', 
            password: '',
            name: '',
            power: '',
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
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "delete from userInfo where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            username: '', 
            password: '',
            name: '',
            power: '',
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
    var e = [_this.data.name,_this.data.power]
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
