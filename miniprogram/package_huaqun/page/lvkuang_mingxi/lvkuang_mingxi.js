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
        text: "客户名称",
        width: "250rpx",
        columnName: "customer_name",
        type: "text",
        isupd: true
      },
      {
        text: "下单日期",
        width: "250rpx",
        columnName: "insert_date",
        type: "text",
        isupd: true
      },
      {
        text: "单据编号",
        width: "250rpx",
        columnName: "order_number",
        type: "text",
        isupd: true
      },
      {
        text: "简码",
        width: "250rpx",
        columnName: "pinyin",
        type: "text",
        isupd: true
      },
      {
        text: "送货地址",
        width: "250rpx",
        columnName: "shipping_address",
        type: "text",
        isupd: true
      },
      {
        text: "联系电话",
        width: "250rpx",
        columnName: "phone",
        type: "text",
        isupd: true
      },
      {
        text: "送货方式",
        width: "250rpx",
        columnName: "shipping_type",
        type: "text",
        isupd: true
      },
      {
        text: "安装地址",
        width: "250rpx",
        columnName: "install_address",
        type: "text",
        isupd: true
      },
      {
        text: "订单号",
        width: "250rpx",
        columnName: "customer_number",
        type: "text",
        isupd: true
      },
      {
        text: "付款状态",
        width: "250rpx",
        columnName: "pay",
        type: "text",
        isupd: true
      },
      {
        text: "审单",
        width: "250rpx",
        columnName: "shendan",
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
        text: "组装",
        width: "250rpx",
        columnName: "zuzhuang",
        type: "text",
        isupd: true
      },
      {
        text: "玻璃加工",
        width: "250rpx",
        columnName: "boli_jiagong",
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
    ],
    title2: [{
        text: "处理顺序",
        width: "250rpx",
        columnName: "shunxu",
        type: "text",
        isupd: true
      }, {
        text: "客户名称",
        width: "250rpx",
        columnName: "customer_name",
        type: "text",
        isupd: true
      },
      {
        text: "下单日期",
        width: "250rpx",
        columnName: "insert_date",
        type: "text",
        isupd: true
      },
      {
        text: "单据编号",
        width: "250rpx",
        columnName: "order_number",
        type: "text",
        isupd: true
      },
      {
        text: "简码",
        width: "250rpx",
        columnName: "pinyin",
        type: "text",
        isupd: true
      },
      {
        text: "送货地址",
        width: "250rpx",
        columnName: "shipping_address",
        type: "text",
        isupd: true
      },
      {
        text: "联系电话",
        width: "250rpx",
        columnName: "phone",
        type: "text",
        isupd: true
      },
      {
        text: "送货方式",
        width: "250rpx",
        columnName: "shipping_type",
        type: "text",
        isupd: true
      },
      {
        text: "安装地址",
        width: "250rpx",
        columnName: "install_address",
        type: "text",
        isupd: true
      },
      {
        text: "订单号",
        width: "250rpx",
        columnName: "customer_number",
        type: "text",
        isupd: true
      },
      {
        text: "付款状态",
        width: "250rpx",
        columnName: "pay",
        type: "text",
        isupd: true
      },
      {
        text: "审单",
        width: "250rpx",
        columnName: "shendan",
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
        text: "组装",
        width: "250rpx",
        columnName: "zuzhuang",
        type: "text",
        isupd: true
      },
      {
        text: "玻璃加工",
        width: "250rpx",
        columnName: "boli_jiagong",
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
    ],
    wancheng_list: ['未完成', '已完成'],
    wancheng: '未完成',
    order_number: '',
    start_date: '',
    stop_date: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var title = _this.data.title
    if(userInfo.power != '客户'){
      var title = _this.data.title2
    }
    _this.setData({
      userInfo: userInfo,
      title,
    })
    var e = ['','', '1900-01-01', '2100-12-31', _this.data.wancheng]
    _this.tableShow(e)
  },

  bindPickerChange: function (e) {
    var _this = this
    var column_name = e.target.dataset.column_name
    var list_name = e.target.dataset.list_name
    console.log(_this.data[list_name][e.detail.value])
    _this.setData({
      [column_name]: _this.data[list_name][e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    if (_this.data.userInfo.power == '客户') {
      sql = "select customer_name,insert_date,dd.order_number,pinyin,shipping_address,phone,shipping_type,install_address,customer_number,pay,shendan,kailiao,zuzhuang,baozhuang,boli.shengchan,boli.row,'' as boli_jiagong from (select customer_name,insert_date,order_number,pinyin,shipping_address,phone,shipping_type,install_address,customer_number,pay,shendan,kailiao,zuzhuang,baozhuang from lvkuang_xiadan where order_number like '%" + e[0] + "%' and customer_name like '%" + e[1] + "%' and insert_date >= '" + e[2] + "' and insert_date <= '" + e[3] + "' and customer_name ='" + _this.data.userInfo.name + "' group by customer_name,insert_date,order_number,pinyin,shipping_address,phone,shipping_type,install_address,customer_number,shendan,kailiao,zuzhuang,baozhuang,pay ) as dd left join (select order_number,sum(case shengchan when '完成' then 1 else 0 end) as shengchan,count(id) as row from boli_xiadan group by order_number) as boli on boli.order_number = dd.order_number"
    } else if (_this.data.userInfo.power == '管理员' || _this.data.userInfo.shendan == '是') {
      sql = "select shunxu,customer_name,insert_date,dd.order_number,pinyin,shipping_address,phone,shipping_type,install_address,customer_number,pay,shendan,kailiao,zuzhuang,baozhuang,boli.shengchan,boli.row,'' as boli_jiagong from (select case shunxu when '' then '1' else shunxu end as shunxu, customer_name,insert_date,order_number,pinyin,shipping_address,phone,shipping_type,install_address,customer_number,pay,shendan,kailiao,zuzhuang,baozhuang from lvkuang_xiadan where order_number like '%" + e[0] + "%' and customer_name like '%" + e[1] + "%' and insert_date >= '" + e[2] + "' and insert_date <= '" + e[3] + "' group by shunxu,customer_name,insert_date,order_number,pinyin,shipping_address,phone,shipping_type,install_address,customer_number,shendan,kailiao,zuzhuang,baozhuang,pay ) as dd left join (select order_number,sum(case shengchan when '完成' then 1 else 0 end) as shengchan,count(id) as row from boli_xiadan group by order_number) as boli on boli.order_number = dd.order_number "
    } else {
      sql = "select shunxu,customer_name,insert_date,dd.order_number,pinyin,shipping_address,phone,shipping_type,install_address,customer_number,pay,shendan,kailiao,zuzhuang,baozhuang,boli.shengchan,boli.row,'' as boli_jiagong from (select case shunxu when '' then '1' else shunxu end as shunxu,customer_name,insert_date,order_number,pinyin,shipping_address,phone,shipping_type,install_address,customer_number,pay,shendan,kailiao,zuzhuang,baozhuang from lvkuang_xiadan where order_number like '%" + e[0] + "%' and customer_name like '%" + e[1] + "%' and insert_date >= '" + e[2] + "' and insert_date <= '" + e[3] + "' and shendan = '通过' group by shunxu,customer_name,insert_date,order_number,pinyin,shipping_address,phone,shipping_type,install_address,customer_number,shendan,kailiao,zuzhuang,baozhuang,pay ) as dd left join (select order_number,sum(case shengchan when '完成' then 1 else 0 end) as shengchan,count(id) as row from boli_xiadan group by order_number) as boli on boli.order_number = dd.order_number"
    }

    if (_this.data.userInfo.power != '客户') {
      if (e[4] == '未完成') {
        sql = sql + " where (shendan != '通过' or kailiao != '完成' or zuzhuang != '完成' or baozhuang != '完成' or shengchan != row) ORDER BY shunxu,insert_date DESC"
      } else if (e[4] == '已完成') {
        sql = sql + " where (shendan = '通过' and kailiao = '完成' and zuzhuang = '完成' and baozhuang = '完成' and shengchan = row) ORDER BY shunxu,insert_date DESC"
      }
    }

    console.log(sql)

    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        for (var i = 0; i < list.length; i++) {
          if (list[i].row == null && list[i].shengchan == null) {
            list[i].boli_jiagong = '完成'
          } else if (list[i].row > list[i].shengchan && list[i].shengchan > 0) {
            list[i].boli_jiagong = '部分完成'
          } else if (list[i].row > list[i].shengchan && list[i].shengchan == 0) {
            list[i].boli_jiagong = '未完成'
          } else if (list[i].row == list[i].shengchan) {
            list[i].boli_jiagong = '完成'
          }
          if(list[i].shunxu == '0'){
            list[i].shunxu = '优先处理'
          }else if(list[i].shunxu == '1'){
            list[i].shunxu = ''
          }else if(list[i].shunxu == '2'){
            list[i].shunxu = '推迟处理'
          }
        }
        _this.setData({
          list: list
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

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
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
    var order_number = _this.data.list[e.currentTarget.dataset.index].order_number
    console.log(index)
    console.log(column)
    if (column == "shendan") {
      if (_this.data.userInfo.power == '管理员' || (_this.data.userInfo.power == '操作员' && _this.data.userInfo.shendan == '是')) {

      } else {
        wx.showToast({
          title: '无审核权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        order_number: _this.data.list[e.currentTarget.dataset.index].order_number,
        this_column: column,
        xgShow: true,
        yes_click: '通过',
        no_click: '拒绝',
      })
    } else if (column == "pay") {
      if (_this.data.userInfo.power == '管理员' || (_this.data.userInfo.power == '操作员' && _this.data.userInfo.pay == '是')) {

      } else {
        wx.showToast({
          title: '无付款权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        order_number: _this.data.list[e.currentTarget.dataset.index].order_number,
        this_column: column,
        xgShow: true,
        yes_click: '已付款',
        no_click: '未付款',
      })
    } else if (column == "kailiao") {
      if (_this.data.userInfo.power == '管理员' || (_this.data.userInfo.power == '操作员' && _this.data.userInfo.kailiao == '是')) {

      } else {
        wx.showToast({
          title: '无开料权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        order_number: _this.data.list[e.currentTarget.dataset.index].order_number,
        this_column: column,
        xgShow: true,
        yes_click: '完成',
        no_click: '未完成',
      })
    } else if (column == "zuzhuang") {
      if (_this.data.userInfo.power == '管理员' || (_this.data.userInfo.power == '操作员' && _this.data.userInfo.zuzhuang == '是')) {

      } else {
        wx.showToast({
          title: '无组装权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        order_number: _this.data.list[e.currentTarget.dataset.index].order_number,
        this_column: column,
        xgShow: true,
        yes_click: '完成',
        no_click: '未完成',
      })
    } else if (column == "baozhuang") {
      if (_this.data.userInfo.power == '管理员' || (_this.data.userInfo.power == '操作员' && _this.data.userInfo.baozhuang == '是')) {

      } else {
        wx.showToast({
          title: '无包装权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        order_number: _this.data.list[e.currentTarget.dataset.index].order_number,
        this_column: column,
        xgShow: true,
        yes_click: '完成',
        no_click: '未完成',
      })
    } else if (column == "shunxu") {
      if (_this.data.userInfo.power == '管理员') {

      } else {
        wx.showToast({
          title: '无设置处理顺序权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        order_number: _this.data.list[e.currentTarget.dataset.index].order_number,
        this_column: column,
        xgShow: true,
        yes_click: '优先处理',
        no_click: '推迟处理',
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '确认查看此条订单的明细信息？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../lvkuang_biaodan/lvkuang_biaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&order_number=' + JSON.stringify(order_number)
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

  yes_click: function () {
    var _this = this
    if(_this.data.this_column == 'shunxu'){
      _this.setData({
        yes_click:0
      })
    }
    var sql = "update lvkuang_xiadan set " + _this.data.this_column + "='" + _this.data.yes_click + "' where order_number='" + _this.data.order_number + "'"
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
        var e = ['','', '1900-01-01', '2100-12-31', _this.data.wancheng]
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

  clear_yesno:function(){
    var _this = this
    if(_this.data.this_column == 'shunxu'){
      var sql = "update lvkuang_xiadan set " + _this.data.this_column + "='' where order_number='" + _this.data.order_number + "'"
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
        var e = ['','', '1900-01-01', '2100-12-31',_this.data.wancheng]
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
      _this.setData({
        no_click:2
      })
    }
    var sql = "update lvkuang_xiadan set " + _this.data.this_column + "='" + _this.data.no_click + "' where order_number='" + _this.data.order_number + "'"
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
        var e = ['','', '1900-01-01', '2100-12-31', _this.data.wancheng]
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

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id: '',
      username: '',
      password: '',
      pinyin: '',
      name: '',
      power: '',
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


  del1: function (e) {
    var _this = this
    var order_number = _this.data.list[e.currentTarget.dataset.index].order_number
    console.log(order_number)
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
              query: "delete from lvkuang_mingxi where order_number='" + order_number + "';delete from boli_xiadan where order_number='" + order_number + "'"
            },
            success: res => {
              _this.qxShow()
              var e = ['', '','1900-01-01', '2100-12-31', _this.data.wancheng]
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

  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      order_number: "",
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
    var e = [_this.data.order_number,_this.data.customer_name, start_date, stop_date, _this.data.wancheng]
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