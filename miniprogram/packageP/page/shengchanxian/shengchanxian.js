// packageP/page/shengchanxian/shengchanxian.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      // 表格标题配置
  title: [
    { 
      text: "", 
      width: "600rpx",  // 留出空间给操作按钮
      columnName: "operations",
      type: "text", 
      isupd: false 
    }
  ],
  
  // 表格列标题配置
  tableTitle: [
    { 
      text: "序号", 
      width: "150rpx", 
      columnName: "rownum",
      type: "digit", 
      isupd: false 
    },
    { 
      text: "生产线名称", 
      width: "250rpx", 
      columnName: "mingcheng",
      type: "text", 
      isupd: true 
    },
    { 
      text: "工序", 
      width: "250rpx", 
      columnName: "gongxu",
      type: "text", 
      isupd: true 
    },
    { 
      text: "效率", 
      width: "200rpx", 
      columnName: "xiaolv",
      type: "text", 
      isupd: true 
    }
  ],
    list: [],
    loading: false,
    
    // 查询条件
    gongxu: '',
    mingcheng: '',
    xiaolv: '',
    
    // 模态框相关
    tjShow: false,    // 新增弹窗显示
    xgShow: false,    // 修改弹窗显示
    cxShow: false,    // 查询弹窗显示
    addWindow1: false, // 输入框弹窗
    wlxgShow: false,  // 物料修改显示
    wltjShow: false,  // 物料添加显示
    delWindow1: false, // 删除确认弹窗
    
    // 表单数据
    formData: {
      gongxu: '',
      mingcheng: '',
      xiaolv: ''
    },
    currentId: '',  // 当前编辑的ID
    empty: '',      // 临时输入值
    index: '',      // 当前编辑的索引
    
    // 权限控制
    isdis: 1,       // 添加权限
    isdischa: 1,    // 查询权限
    isdisgai: 1,    // 修改权限
    isdisshan: 1,   // 删除权限
    handle: true    // 是否允许操作
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = options.userInfo ? JSON.parse(options.userInfo) : null
    
    _this.setData({
      userInfo: userInfo
    })
    
    // 判断权限
    _this.panduanquanxian()
    
    // 如果有查询权限，加载数据
    if (_this.data.isdischa == 1) {
      var e = ['', '', '']
      _this.tableShow(e)
    }
  },

  /**
   * 判断权限
   */
  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa: 1,
      isdisgai: 1,
      isdisshan: 1
    })
    
    // 读取缓存
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    
    console.log("生产线权限判断:")
    console.log(paibanbiao_renyuan_bumen1)
    
    for (let i = 0; i < department_list1.length; i++) {
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "生产线") {
        console.log("找到生产线权限配置:", department_list1[i])
        
        // 添加权限
        if (department_list1[i].add == "否") {
          _this.setData({ isdis: 2 })
        } else {
          _this.setData({ isdis: 1 })
        }
        
        // 修改权限
        if (department_list1[i].upd == "否") {
          _this.setData({ isdisgai: 2 })
        } else {
          _this.setData({ isdisgai: 1 })
        }
        
        // 删除权限
        if (department_list1[i].del == "否") {
          _this.setData({ isdisshan: 2 })
        } else {
          _this.setData({ isdisshan: 1 })
        }
        
        // 查询权限
        if (department_list1[i].sel == "否") {
          _this.setData({ isdischa: 2 })
        } else {
          _this.setData({ isdischa: 1 })
        }
        
        break
      }
    }
    
    console.log("生产线权限结果:", {
      isdis: _this.data.isdis,
      isdisgai: _this.data.isdisgai,
      isdisshan: _this.data.isdisshan,
      isdischa: _this.data.isdischa
    })
  },

  /**
   * 显示生产线表格数据
   */
  tableShow: function (e) {
    var _this = this
    let user = app.globalData.gongsi || wx.getStorageSync('company')
    
    wx.showLoading({
      title: '加载中...',
    })
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select id,mingcheng,gongxu,xiaolv from shengchanxian where gongsi='" + user + "' and gongxu like '%" + e[0] + "%' and mingcheng like '%" + e[1] + "%' and xiaolv like '%" + e[2] + "%' order by id desc"
      },
      success: res => {
        wx.hideLoading()
        if (res.result && res.result.recordset) {
          var list = res.result.recordset
          _this.setData({
            list: list,
            loading: false
          })
        } else {
          _this.setData({
            list: [],
            loading: false
          })
        }
      },
      err: res => {
        wx.hideLoading()
        console.log("错误!", res)
        wx.showToast({
          title: '查询失败！',
          icon: 'none'
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！", res)
      }
    })
  },

  /**
   * 输入框事件处理
   */
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  /**
   * 表单字段输入
   */
  onFormInput: function (e) {
    var _this = this
    let field = e.currentTarget.dataset.field
    let value = e.detail.value
    
    _this.setData({
      [`formData.${field}`]: value
    })
  },

  /**
   * 关闭所有弹窗
   */
  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      wlxgShow: false,
      wltjShow: false,
      addWindow1: false,
      delWindow1: false,
      formData: {
        gongxu: '',
        mingcheng: '',
        xiaolv: ''
      },
      currentId: '',
      gongxu: '',
      mingcheng: '',
      xiaolv: ''
    })
  },

  /**
   * 显示新增弹窗
   */
  inquire: function () {
    var _this = this
    _this.setData({
      cxShow: true
    })
  },

  /**
   * 显示新增生产线弹窗
   */
  addMK: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      formData: {
        gongxu: '',
        mingcheng: '',
        xiaolv: ''
      }
    })
  },

  /**
   * 新增生产线
   */
  add1: function () {
    var _this = this
    let user = app.globalData.gongsi || wx.getStorageSync('company')
    
    if (_this.data.formData.mingcheng == "" || _this.data.formData.gongxu == "") {
      wx.showToast({
        title: '生产线名称和工序不能为空！',
        icon: 'none',
        duration: 3000
      })
      return
    }
    
    wx.showLoading({
      title: '添加中...',
    })
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select count(id) as nameCount from shengchanxian where gongsi='" + user + "' and mingcheng='" + _this.data.formData.mingcheng + "'"
      },
      success: res => {
        if (res.result.recordsets[0][0].nameCount == 0) {
          wx.cloud.callFunction({
            name: 'sqlServer_PC',
            data: {
              query: "insert into shengchanxian(mingcheng,gongxu,xiaolv,gongsi) output inserted.ID values('" + _this.data.formData.mingcheng + "','" + _this.data.formData.gongxu + "','" + _this.data.formData.xiaolv + "','" + user + "')"
            },
            success: res => {
              wx.hideLoading()
              wx.showToast({
                title: '添加成功！',
                icon: 'success',
                duration: 2000
              })
              _this.qxShow()
              var e = ['', '', '']
              _this.tableShow(e)
            },
            err: res => {
              wx.hideLoading()
              console.log("错误!", res)
              wx.showToast({
                title: '添加失败！',
                icon: 'none'
              })
            },
            fail: res => {
              wx.hideLoading()
              wx.showToast({
                title: '请求失败！',
                icon: 'none',
                duration: 3000
              })
            }
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '该生产线名称已存在！',
            icon: 'none'
          })
        }
      },
      err: res => {
        wx.hideLoading()
        console.log("错误!", res)
        wx.showToast({
          title: '查询失败！',
          icon: 'none'
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },

  /**
   * 点击表格行
   */
  clickView: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.index
    var item = _this.data.list[index]
    
    _this.setData({
      formData: {
        mingcheng: item.mingcheng || '',
        gongxu: item.gongxu || '',
        xiaolv: item.xiaolv || ''
      },
      currentId: item.id,
      handle: false
    })
  },

  /**
   * 显示修改弹窗
   */
  xgDingDan: function () {
    var _this = this
    _this.setData({
      xgShow: true
    })
  },

  /**
   * 修改生产线
   */
  upd1: function () {
    var _this = this
    let user = app.globalData.gongsi || wx.getStorageSync('company')
    
    if (_this.data.formData.mingcheng == "" || _this.data.formData.gongxu == "") {
      wx.showToast({
        title: '生产线名称和工序不能为空！',
        icon: 'none',
        duration: 3000
      })
      return
    }
    
    wx.showLoading({
      title: '修改中...',
    })
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "update shengchanxian set mingcheng='" + _this.data.formData.mingcheng + "',gongxu='" + _this.data.formData.gongxu + "',xiaolv='" + _this.data.formData.xiaolv + "' where id='" + _this.data.currentId + "' and gongsi='" + user + "'"
      },
      success: res => {
        wx.hideLoading()
        wx.showToast({
          title: '修改成功！',
          icon: 'success',
          duration: 2000
        })
        _this.qxShow()
        _this.setData({
          handle: true
        })
        var e = ['', '', '']
        _this.tableShow(e)
      },
      err: res => {
        wx.hideLoading()
        console.log("错误!", res)
        wx.showToast({
          title: '修改失败！',
          icon: 'none'
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },

  /**
   * 删除生产线
   */
  del1: function () {
    var _this = this
    let user = app.globalData.gongsi || wx.getStorageSync('company')
    
    wx.showLoading({
      title: '删除中...',
    })
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "delete from shengchanxian where id='" + _this.data.currentId + "' and gongsi='" + user + "'"
      },
      success: res => {
        wx.hideLoading()
        wx.showToast({
          title: '删除成功！',
          icon: 'success',
          duration: 2000
        })
        _this.qxShow()
        _this.setData({
          handle: true
        })
        var e = ['', '', '']
        _this.tableShow(e)
      },
      err: res => {
        wx.hideLoading()
        console.log("错误!", res)
        wx.showToast({
          title: '删除失败！',
          icon: 'none'
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },

  /**
   * 查询生产线
   */
  sel1: function () {
    var _this = this
    var e = [_this.data.gongxu, _this.data.mingcheng, _this.data.xiaolv]
    _this.tableShow(e)
    _this.qxShow()
    
    setTimeout(() => {
      wx.showToast({
        title: '查询成功！',
        icon: 'success',
        duration: 2000
      })
    }, 500)
  },

  /**
   * 显示删除确认弹窗
   */
  showDelConfirm: function () {
    var _this = this
    _this.setData({
      delWindow1: true
    })
  },

  /**
   * 确认删除
   */
  sure1: function () {
    var _this = this
    _this.del1()
    _this.setData({
      delWindow1: false
    })
  },

  /**
   * 隐藏视图（重置状态）
   */
  hid_view: function () {
    var _this = this
    _this.setData({
      handle: true
    })
  },

  /**
   * 返回上一页
   */
  goBack: function () {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 页面显示时刷新数据
    var _this = this
    var e = ['', '', '']
    if (_this.data.isdischa == 1) {
      _this.tableShow(e)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '生产线管理',
      path: '/packageP/page/shengchanxian/shengchanxian'
    }
  }
})