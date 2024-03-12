// package_huaqun/page/zhguanli/zhguanli.js
// const chooseLocation = requirePlugin('chooseLocation');
// var QQMapWX = require("../utils/qqmap-wx-jssdk");
// var qqmapsdk = new QQMapWX({
//   key: 'KKRBZ-TBCW3-TXD37-OWJED-QYFPF-VYFCL'
// });
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
    quanxian_type: ['管理员', '工序员'],
    quanxian_list: ['是', '否'],
    list: [],
    title: [{
        text: "姓名",
        width: "250rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
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
        text: "权限",
        width: "250rpx",
        columnName: "quanxian",
        type: "text",
        isupd: true
      },
      {
        text: "是否允许编辑产品信息",
        width: "380rpx",
        columnName: "bianjichanpinxinxi",
        type: "text",
        isupd: true
      },
      {
        text: "配料",
        width: "250rpx",
        columnName: "peiliao",
        type: "text",
        isupd: true
      },
      {
        text: "开料",
        width: "250rpx",
        columnName: "kailiao",
        type: "text",
        isupd: true
      },
      {
        text: "封边",
        width: "250rpx",
        columnName: "fengbian",
        type: "text",
        isupd: true
      },
      {
        text: "排孔",
        width: "300rpx",
        columnName: "paikong",
        type: "text",
        isupd: true
      },
      {
        text: "线条",
        width: "250rpx",
        columnName: "xiantiao",
        type: "text",
        isupd: true
      },
      {
        text: "覆膜",
        width: "250rpx",
        columnName: "fumo",
        type: "text",
        isupd: true
      },
      {
        text: "手工",
        width: "250rpx",
        columnName: "shougong",
        type: "text",
        isupd: true
      },
      {
        text: "五金",
        width: "250rpx",
        columnName: "wujin",
        type: "text",
        isupd: true
      },
      {
        text: "包装",
        width: "250rpx",
        columnName: "baozhuang",
        type: "text",
        isupd: true
      },
      {
        text: "入库",
        width: "250rpx",
        columnName: "ruku",
        type: "text",
        isupd: true
      },
      {
        text: "出库",
        width: "250rpx",
        columnName: "chuku",
        type: "text",
        isupd: true
      },
    ],
    id: '',
    name: '',
    username: '',
    password: '',
    quanxian: '',
    bianjichanpinxinxi: '',
    peiliao: '',
    kailiao: '',
    fengbian: '',
    paikong: '',
    xiantiao: '',
    fumo: '',
    shougong: '',
    wujin: '',
    baozhuang: '',
    ruku: '',
    chuku: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var e = ['', '']
    _this.tableShow(e)
  },

  header_xiala: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    var list2 = []
    console.log(list)
    for (var i = 0; i < list.length; i++) {
      var name = list[i].name
      console.log(name.indexOf(_this.data.quanxian))
    }
    console.log(list2)
    _this.setData({
      list_xiala: list2,
      click_column: column,
    })
    console.log(list)
    _this.setData({
      xlShow2: true
    })
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      _this.setData({
        xlShow2: false,
        [click_column]: new_val
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow2: false,
      })
    }
  },

  bindPickerChange1: function (e) {
    var _this = this
    console.log(e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column_name
    console.log(_this.data.quanxian_list[e.detail.value])
    _this.setData({
      [column]: _this.data.quanxian_list[e.detail.value]
    })
  },

  bindPickerChange2: function (e) {
    var _this = this
    console.log(e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column_name
    console.log(_this.data.quanxian_type[e.detail.value])
    _this.setData({
      [column]: _this.data.quanxian_type[e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: "select * from user_info where name like '%" + e[0] + "%' and quanxian like '%" + e[1] + "%' "
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

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id: '',
      name: '',
      username: '',
      password: '',
      quanxian: '',
      bianjichanpinxinxi: '',
      peiliao: '',
      kailiao: '',
      fengbian: '',
      paikong: '',
      xiantiao: '',
      fumo: '',
      shougong: '',
      wujin: '',
      baozhuang: '',
      ruku: '',
      chuku: '',
    })
  },
  add1: function () {
    var _this = this

    if (_this.data.name == '') {
      wx.showToast({
        title: '请输姓名！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if (_this.data.username == '') {
      wx.showToast({
        title: '请输账号！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if (_this.data.password == '') {
      wx.showToast({
        title: '请输密码！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.quanxian == '') {
      wx.showToast({
        title: '请输权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: "insert into user_Info(name,username,password,quanxian,bianjichanpinxinxi,peiliao,kailiao,fengbian,paikong,xiantiao,fumo,shougong,wujin,baozhuang,ruku,chuku) values('" + _this.data.name + "','" + _this.data.username + "','" + _this.data.password + "','" + _this.data.quanxian + "','" + _this.data.bianjichanpinxinxi + "','" + _this.data.peiliao + "','" + _this.data.kailiao + "','" + _this.data.fengbian + "','" + _this.data.paikong + "','" + _this.data.xiantiao + "','" + _this.data.fumo + "','" + _this.data.shougong + "','" + _this.data.wujin + "','" + _this.data.baozhuang + "','" + _this.data.ruku + "','" + _this.data.chuku + "')"
      },
      success: res => {
        console.log(res)
        _this.setData({
          id: '',
          name: '',
          username: '',
          password: '',
          quanxian: '',
          bianjichanpinxinxi: '',
          peiliao: '',
          kailiao: '',
          fengbian: '',
          paikong: '',
          xiantiao: '',
          fumo: '',
          shougong: '',
          wujin: '',
          baozhuang: '',
          ruku: '',
          chuku: '',
          // quyu:'',
        })
        _this.qxShow()
        var e = ['', '']
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

  upd1: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: "update user_info set name='" + _this.data.name + "',username='" + _this.data.username + "',password='" + _this.data.password + "',quanxian='" + _this.data.quanxian + "',bianjichanpinxinxi='" + _this.data.bianjichanpinxinxi + "',peiliao='" + _this.data.peiliao + "',kailiao='" + _this.data.kailiao + "',fengbian='" + _this.data.fengbian + "',paikong='" + _this.data.paikong + "',xiantiao='" + _this.data.xiantiao + "',fumo='" + _this.data.fumo + "',shougong='" + _this.data.shougong + "',wujin='" + _this.data.wujin + "',baozhuang='" + _this.data.baozhuang + "',ruku='" + _this.data.ruku + "',chuku='" + _this.data.chuku + "' where id=" + _this.data.id
      },
      success: res => {
        _this.setData({
          id: '',
          name: '',
          username: '',
          password: '',
          quanxian: '',
          bianjichanpinxinxi: '',
          peiliao: '',
          kailiao: '',
          fengbian: '',
          paikong: '',
          xiantiao: '',
          fumo: '',
          shougong: '',
          wujin: '',
          baozhuang: '',
          ruku: '',
          chuku: '',
        })
        _this.qxShow()
        var e = ['', '']
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

  clickView: function (e) {
    var _this = this
    console.log(e)
    var column = e.currentTarget.dataset.column
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      name: _this.data.list[e.currentTarget.dataset.index].name,
      username: _this.data.list[e.currentTarget.dataset.index].username,
      password: _this.data.list[e.currentTarget.dataset.index].password,
      quanxian: _this.data.list[e.currentTarget.dataset.index].quanxian,
      bianjichanpinxinxi: _this.data.list[e.currentTarget.dataset.index].bianjichanpinxinxi,
      peiliao: _this.data.list[e.currentTarget.dataset.index].peiliao,
      kailiao: _this.data.list[e.currentTarget.dataset.index].kailiao,
      fengbian: _this.data.list[e.currentTarget.dataset.index].fengbian,
      paikong: _this.data.list[e.currentTarget.dataset.index].paikong,
      xiantiao: _this.data.list[e.currentTarget.dataset.index].xiantiao,
      fumo: _this.data.list[e.currentTarget.dataset.index].fumo,
      shougong: _this.data.list[e.currentTarget.dataset.index].shougong,
      wujin: _this.data.list[e.currentTarget.dataset.index].wujin,
      baozhuang: _this.data.list[e.currentTarget.dataset.index].baozhuang,
      ruku: _this.data.list[e.currentTarget.dataset.index].ruku,
      chuku: _this.data.list[e.currentTarget.dataset.index].chuku,
      xgShow: true,
    })
  },

  del1: function () {
    var _this = this
    wx.showModal({
      title: "提示",
      content: '确定删除？',
      cancelColor: '#282B33',
      confirmColor: '#BC4A4A',
      success: res => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlServer_tb3999803',
            data: {
              query: "delete from userInfo where id='" + _this.data.id + "'"
            },
            success: res => {
              _this.setData({
                id: '',
                name: '',
                username: '',
                password: '',
                quanxian: '',
                bianjichanpinxinxi: '',
                peiliao: '',
                kailiao: '',
                fengbian: '',
                paikong: '',
                xiantiao: '',
                fumo: '',
                shougong: '',
                wujin: '',
                baozhuang: '',
                ruku: '',
                chuku: '',
              })
              _this.qxShow()
              var e = ['', '']
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
          console.log('用户点击取消')
        }
      }
    })
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      name: "",
      quanxian: "",
    })
  },

  sel1: function () {
    var _this = this
    var e = [_this.data.name, _this.data.quanxian]
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
    var _this = this
    var e = ['', '']
    _this.tableShow(e)
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