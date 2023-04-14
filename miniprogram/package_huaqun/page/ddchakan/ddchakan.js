// package_huaqun/page/ddchakan/ddchakan.js
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
    update_name: {
      khmc: "客户名称",
      xdrq: "下单日期",
      djbh: "单据编号",
      shouhuo: "送货地址",
      lxdh: "联系电话",
      shfs: "送货方式",
      azdz: "安装地址",
      ddh: "订单号",
      fkzt: "付款状态",
      hd: "审单",
    },
    list: [],
    title: [{
        text: "客户名称",
        width: "250rpx",
        columnName: "khmc",
        type: "text",
        isupd: true
      },
      {
        text: "下单日期",
        width: "250rpx",
        columnName: "xdrq",
        type: "text",
        isupd: true
      },
      {
        text: "单据编号",
        width: "250rpx",
        columnName: "djbh",
        type: "text",
        isupd: true
      },
      {
        text: "送货地址",
        width: "250rpx",
        columnName: "shouhuo",
        type: "text",
        isupd: true
      },
      {
        text: "联系电话",
        width: "250rpx",
        columnName: "lxdh",
        type: "text",
        isupd: true
      },
      {
        text: "送货方式",
        width: "250rpx",
        columnName: "shfs",
        type: "text",
        isupd: true
      },
      {
        text: "安装地址",
        width: "250rpx",
        columnName: "azdz",
        type: "text",
        isupd: true
      },
      {
        text: "订单号",
        width: "250rpx",
        columnName: "ddh",
        type: "text",
        isupd: true
      },
      {
        text: "付款状态",
        width: "250rpx",
        columnName: "fkzt",
        type: "text",
        isupd: true
      },
      {
        text: "审单",
        width: "250rpx",
        columnName: "hd",
        type: "text",
        isupd: true
      },
    ],
    title2: [{
        text: "处理顺序",
        width: "250rpx",
        columnName: "shunxu",
        type: "text",
        isupd: true
      },
      {
        text: "客户名称",
        width: "250rpx",
        columnName: "khmc",
        type: "text",
        isupd: true
      },
      {
        text: "下单日期",
        width: "250rpx",
        columnName: "xdrq",
        type: "text",
        isupd: true
      },
      {
        text: "单据编号",
        width: "250rpx",
        columnName: "djbh",
        type: "text",
        isupd: true
      },
      {
        text: "送货地址",
        width: "250rpx",
        columnName: "shouhuo",
        type: "text",
        isupd: true
      },
      {
        text: "联系电话",
        width: "250rpx",
        columnName: "lxdh",
        type: "text",
        isupd: true
      },
      {
        text: "送货方式",
        width: "250rpx",
        columnName: "shfs",
        type: "text",
        isupd: true
      },
      {
        text: "安装地址",
        width: "250rpx",
        columnName: "azdz",
        type: "text",
        isupd: true
      },
      {
        text: "订单号",
        width: "250rpx",
        columnName: "ddh",
        type: "text",
        isupd: true
      },
      {
        text: "付款状态",
        width: "250rpx",
        columnName: "fkzt",
        type: "text",
        isupd: true
      },
      {
        text: "审单",
        width: "250rpx",
        columnName: "hd",
        type: "text",
        isupd: true
      },
    ],
    fkzt_list: ['未付款', '已付款'],
    hd_list: ['通过', '未通过'],
    djbh: '',
    fkzt :'',
    xiala_panduan: '',
    kehu_panduan: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo: userInfo
    })
    var title = _this.data.title
    console.log(userInfo.name)
    if (userInfo.power == '客户') {
      _this.setData({
        kehu_panduan: true
      })
      var sql = "select distinct ddh,xdrq,djbh,shouhuo,lxdh,shfs,azdz,khmc,case when isnull(fkzt,'未付款') = '' then '未付款' else isnull(fkzt,'未付款') end as fkzt,isnull(hd,'')as hd,case shunxu when '' then '1' else shunxu end as shunxu from lightbelt where khmc ='" + userInfo.name + "' order by shunxu,xdrq DESC "
    } else {
      var sql = "select distinct ddh,xdrq,djbh,shouhuo,lxdh,shfs,azdz,khmc,case when isnull(fkzt,'未付款') = '' then '未付款' else isnull(fkzt,'未付款') end as fkzt,isnull(hd,'')as hd,case shunxu when '' then '1' else shunxu end as shunxu from lightbelt order by shunxu,xdrq DESC"
      title = _this.data.title2
    }

    console.log(sql)
    _this.setData({
      title
    })
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        for (var i = 0; i < list.length; i++) {
          if (list[i].shunxu == '0') {
            list[i].shunxu = '优先处理'
          } else if (list[i].shunxu == '1') {
            list[i].shunxu = ''
          } else if (list[i].shunxu == '2') {
            list[i].shunxu = '推迟处理'
          }
        }
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

  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    if (_this.data.userInfo.power == '客户') {
      var sql = "select distinct ddh,xdrq,djbh,shouhuo,lxdh,shfs,azdz,khmc,case when isnull(fkzt,'未付款') = '' then '未付款' else isnull(fkzt,'未付款') end as fkzt,isnull(hd,'')as hd,case shunxu when '' then '1' else shunxu end as shunxu from lightbelt where khmc ='" + userInfo.name + "' and ddh like '%" + e[1] + "%' and xdrq >= '" + e[2] + "' and xdrq <= '" + e[3] + "' and case when isnull(fkzt,'未付款') = '' then '未付款' else isnull(fkzt,'未付款') end like '% " + e[4] + " %' order by shunxu,xdrq DESC"
    } else {
      var sql = "select distinct ddh,xdrq,djbh,shouhuo,lxdh,shfs,azdz,khmc,case when isnull(fkzt,'未付款') = '' then '未付款' else isnull(fkzt,'未付款') end as fkzt,isnull(hd,'')as hd,case shunxu when '' then '1' else shunxu end as shunxu from lightbelt where khmc like '%" + e[0] + "%' and khmc like '%" + e[0] + "%' and ddh like '%" + e[1] + "%' and xdrq >= '" + e[2] + "' and xdrq <= '" + e[3] + "' and case when isnull(fkzt,'未付款') = '' then '未付款' else isnull(fkzt,'未付款') end like '%" + e[4] + "%' order by shunxu,xdrq DESC"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        for (var i = 0; i < list.length; i++) {
          if (list[i].shunxu == '0') {
            list[i].shunxu = '优先处理'
          } else if (list[i].shunxu == '1') {
            list[i].shunxu = ''
          } else if (list[i].shunxu == '2') {
            list[i].shunxu = '推迟处理'
          }
        }
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

  clickView: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var order_number = _this.data.list[e.currentTarget.dataset.index].djbh
    console.log(index)
    console.log(column)
    if (column == "hd") {
      if (_this.data.userInfo.power == '管理员' || (_this.data.userInfo.power == '操作员' && _this.data.userInfo.shendan == '是')) {

      } else {
        wx.showToast({
          title: '无审核权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        order_number: _this.data.list[e.currentTarget.dataset.index].djbh,
        this_column: column,
        xgShow: true,
        yes_click: '通过',
        no_click: '拒绝',
      })
    } else if (column == "fkzt") {
      if (_this.data.userInfo.power == '管理员' || (_this.data.userInfo.power == '操作员' && _this.data.userInfo.pay == '是')) {

      } else {
        wx.showToast({
          title: '无付款权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        order_number: _this.data.list[e.currentTarget.dataset.index].djbh,
        this_column: column,
        xgShow: true,
        yes_click: '已付款',
        no_click: '未付款',
      })
    } else if (column == "shunxu") {
      if (_this.data.userInfo.power == '管理员') {

      } else {
        wx.showToast({
          title: '无排序权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        order_number: _this.data.list[e.currentTarget.dataset.index].djbh,
        this_column: column,
        xgShow: true,
        yes_click: '优先处理',
        no_click: '推迟处理',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确认查看此条订单的明细信息？',
        success(res) {
          if (res.confirm) {
            // wx.navigateTo({
            //   url: '../lvkuang_biaodan/lvkuang_biaodan?userInfo='+JSON.stringify(_this.data.userInfo) + '&order_number='+JSON.stringify(order_number)
            // })
            wx.navigateTo({
              url: "../ddchakanxiangqing/ddchakanxiangqing?djbh=" + JSON.stringify(order_number) + "&userInfo=" + JSON.stringify(_this.data.userInfo)
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '已取消！',
              icon: 'none'
            })
            return;
          }
        }
      })
    }

  },

  bindPickerChange: function (e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      fkzt: _this.data.fkzt_list[e.detail.value]
    })
  },
  bindPickerChange2: function (e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var shfs = _this.data.shfs_list[e.detail.value]
    console.log(shfs)
    _this.setData({
      shfs: shfs,
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

  clear_yesno:function(){
    var _this = this
    if(_this.data.this_column == 'shunxu'){
      var sql = "update lightbelt set " + _this.data.this_column + "='' where djbh='" + _this.data.order_number + "'"
    }
    
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '完成！',
          icon: 'none',
          duration: 3000
        })
        var e = ['','', '1900-01-01', '2100-12-31','']
        _this.tableShow(e)
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

  yes_click: function () {
    var _this = this
    if(_this.data.this_column == 'shunxu'){
      var sql = "update lightbelt set " + _this.data.this_column + "='0' where djbh='" + _this.data.order_number + "'"
    }else{
      var sql = "update lightbelt set " + _this.data.this_column + "='" + _this.data.yes_click + "' where djbh='" + _this.data.order_number + "'"
    }
    
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '完成！',
          icon: 'none',
          duration: 3000
        })
        var e = ['','', '1900-01-01', '2100-12-31','']
        // var e = ['', '',start_date,stop_date,'']
        _this.tableShow(e)
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

  no_click: function () {
    var _this = this
    if(_this.data.this_column == 'shunxu'){
      var sql = "update lightbelt set " + _this.data.this_column + "='2' where djbh='" + _this.data.order_number + "'"
    }else{
      var sql = "update lightbelt set " + _this.data.this_column + "='" + _this.data.no_click + "' where djbh='" + _this.data.order_number + "'"
    }
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '完成！',
          icon: 'none',
          duration: 3000
        })
        var e = ['', '']
        _this.tableShow(e)
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

  del1: function (e) {
    var _this = this
    var djbh = _this.data.list[e.currentTarget.dataset.index].djbh
    if (_this.data.userInfo.power == '管理员') {

    } else {
      wx.showToast({
        title: '非管理员账号，无删除订单权限！',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确认删除此条订单？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlserver_huaqun',
            data: {
              query: "delete from lightbelt where djbh='" + djbh + "';"
            },
            success: res => {
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

        }
      }
    })
  },

  entering: function () {
    var _this = this
    var khmc = ""
    if (_this.data.userInfo.power == '客户') {
      khmc = _this.data.userInfo.name
    }
    _this.setData({
      cxShow: true,
      khmc: khmc,
      ddh: "",
      start_date: "",
      stop_date: "",
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  cha1: function () {
    var _this = this
    wx.navigateTo({
      url: "../ddchakanxiangqing/ddchakanxiangqing?djbh=" + JSON.stringify(_this.data.djbh) + "&userInfo=" + JSON.stringify(_this.data.userInfo)
    })
    _this.qxShow()
  },

  sel1: function () {
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if (start_date == '') {
      start_date = '1900-01-01'
    }
    if (stop_date == '') {
      stop_date = '2100-12-31'
    }
    var e = [_this.data.khmc, _this.data.ddh,start_date,stop_date, _this.data.fkzt]
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