// package_huaqun/page/ddchakan/ddchakan.js
Page({

  /**
   * 页面的初始数据
   */
  xlShow: false,
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  xgShow2: false,
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
    title: [
      {
        text: "下单日期",
        width: "250rpx",
        columnName: "xdrq",
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
        text: "订单状态",
        width: "250rpx",
        columnName: "wancheng",
        type: "text",
        isupd: true
      },
      {
        text: "加工操作员",
        width: "250rpx",
        columnName: "jgczy",
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
        text: "单据编号",
        width: "250rpx",
        columnName: "djbh",
        type: "text",
        isupd: true
      },
      {
        text: "录入员",
        width: "250rpx",
        columnName: "luruyuan",
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
        text: "送货地址",
        width: "250rpx",
        columnName: "shouhuo",
        type: "text",
        isupd: true
      },
      {
        text: "订单总金额",
        width: "250rpx",
        columnName: "sum_money",
        type: "text",
        isupd: true
      },
      {
        text: "完成时间",
        width: "250rpx",
        columnName: "wcsj",
        type: "text",
        isupd: true
      },

    ],
    title2: [
      {
        text: "下单日期",
        width: "250rpx",
        columnName: "xdrq",
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
        text: "订单状态",
        width: "250rpx",
        columnName: "wancheng",
        type: "text",
        isupd: true
      },
      {
        text: "加工操作员",
        width: "250rpx",
        columnName: "jgczy",
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
        text: "单据编号",
        width: "250rpx",
        columnName: "djbh",
        type: "text",
        isupd: true
      },
      {
        text: "录入员",
        width: "250rpx",
        columnName: "luruyuan",
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
        text: "送货地址",
        width: "250rpx",
        columnName: "shouhuo",
        type: "text",
        isupd: true
      },
      {
        text: "订单总金额",
        width: "250rpx",
        columnName: "sum_money",
        type: "text",
        isupd: true
      },
      {
        text: "完成时间",
        width: "250rpx",
        columnName: "wcsj",
        type: "text",
        isupd: true
      },
    ],
    djbh: '',
    azdz :'',
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
    } else {
      title = _this.data.title2
    }
    var e = ['','', '1900-01-01', '2100-12-31','']
    _this.tableShow(e)
    _this.setData({
      title
    })

    var sql = "select * from userInfo where power = '管理员' or power = '操作员'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        _this.setData({
          yewuyuan_list: list,
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

  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    if (_this.data.userInfo.power == '客户') {
      var sql = "select distinct ddh,luruyuan,case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end as wancheng,xdrq,djbh,shouhuo,lxdh,shfs,azdz,khmc,case when isnull(fkzt,'未付款') = '' then '未付款' else isnull(fkzt,'未付款') end as fkzt,isnull(hd,'')as hd,case case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end when '优先处理' then '1' when '已审验' then '2' when '推迟处理' then '3' when '完成' then '4' else shunxu end as shunxu,sum_money,jgczy,wcsj from lightbelt where khmc ='" + _this.data.userInfo.company + "' and ddh like '%" + e[1] + "%' and xdrq >= '" + e[2] + "' and xdrq <= '" + e[3] + "' and isnull(azdz,'') like '%" + e[4] + "%' order by shunxu,djbh DESC"
    } else {
      var sql = "select distinct ddh,luruyuan,case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end as wancheng,xdrq,djbh,shouhuo,lxdh,shfs,azdz,khmc,case when isnull(fkzt,'未付款') = '' then '未付款' else isnull(fkzt,'未付款') end as fkzt,isnull(hd,'')as hd,case case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end when '优先处理' then '1' when '已审验' then '2' when '推迟处理' then '3' when '完成' then '4' else shunxu end as shunxu,sum_money,jgczy,wcsj from lightbelt where khmc like '%" + e[0] + "%' and ddh like '%" + e[1] + "%' and xdrq >= '" + e[2] + "' and xdrq <= '" + e[3] + "' and isnull(azdz,'') like '%" + e[4] + "%' order by shunxu,djbh DESC"
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
        _this.setData({
          start_date:'',
          stop_date:'',
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
      xgShow2: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  upd1:function(e){
    var _this = this
    var sql = "update lightbelt set jgczy='" + _this.data.this_value + "' where djbh='" + _this.data.order_number + "'"
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

  xiala_open:function(){
    var _this = this
    _this.setData({
      xlShow: true
    })
  },

  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      _this.setData({
        xlShow: false,
        this_value:new_val
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow: false,
      })
    }
  },

  clickView: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var order_number = _this.data.list[e.currentTarget.dataset.index].djbh
    console.log(index)
    console.log(column)
    if(column == 'jgczy'){
      if (_this.data.userInfo.power == '管理员' || _this.data.userInfo.power == '操作员') {
        if( _this.data.list[e.currentTarget.dataset.index].wancheng == '完成'){
          wx.showToast({
            title: '此单已完成，不允许修改！',
            icon: 'none'
          })
          return;
        }
        _this.setData({
          order_number: _this.data.list[e.currentTarget.dataset.index].djbh,
          this_column: column,
          this_value:_this.data.list[e.currentTarget.dataset.index].jgczy,
          xgShow2: true,
        })
      } else {
        wx.showToast({
          title: '无修改加工操作员权限！',
          icon: 'none'
        })
        return;
      }
    }
    else if (column == "wancheng") {
      if (_this.data.userInfo.power == '管理员' || _this.data.userInfo.power == '操作员') {
        
      } else {
        wx.showToast({
          title: '无修改订单状态权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        order_number: _this.data.list[e.currentTarget.dataset.index].djbh,
        this_column: column,
        xgShow: true,
        yes_click: '完成',
        no_click: '未完成',
      })
    }else if (column == "khmc") {
      if(_this.data.userInfo.power == '管理员'){
        wx.showModal({
          title: '提示',
          content: '确认修改此条订单的明细信息？',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: "../ddxiadan/ddxiadan?djbh=" + JSON.stringify(order_number) + "&userInfo=" + JSON.stringify(_this.data.userInfo)
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
      }else if(_this.data.userInfo.power == '客户'){
        if(_this.data.list[e.currentTarget.dataset.index].hd == '通过'){
          wx.showToast({
            title: '审核已通过订单不允许修改！',
            icon: 'none'
          })
          return;
        }else{
          wx.showModal({
            title: '提示',
            content: '确认修改此条订单的明细信息？',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: "../ddxiadan/ddxiadan?djbh=" + JSON.stringify(order_number) + "&userInfo=" + JSON.stringify(_this.data.userInfo)
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
      }
    }else {
      wx.showModal({
        title: '提示',
        content: '确认查看此条订单的明细信息？',
        success(res) {
          if (res.confirm) {
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

  click_01: function () {
    var _this = this
    var sql = "update lightbelt set " + _this.data.this_column + "='已审验' where djbh='" + _this.data.order_number + "'"
    
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

  click_02: function () {
    var _this = this
    var sql = "update lightbelt set " + _this.data.this_column + "='未审验' where djbh='" + _this.data.order_number + "'"
    
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

  click_03: function () {
    var _this = this
    var sql = "update lightbelt set " + _this.data.this_column + "='优先处理' where djbh='" + _this.data.order_number + "'"
    
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

  click_04: function () {
    var _this = this
    var sql = "update lightbelt set " + _this.data.this_column + "='推迟处理' where djbh='" + _this.data.order_number + "'"
    
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

  click_05: function () {
    var _this = this
    var sql = "update lightbelt set " + _this.data.this_column + "='完成',wcsj=convert(date,GETDATE()) where djbh='" + _this.data.order_number + "'"
    
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
              var e = ['','', '1900-01-01', '2100-12-31','']
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
    var e = [_this.data.khmc, _this.data.ddh,start_date,stop_date, _this.data.azdz]
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