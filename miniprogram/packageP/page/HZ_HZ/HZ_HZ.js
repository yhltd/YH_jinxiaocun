const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cxShow: false,
    xlShow1: false,
    list: [],
    list2: [],
    actions1: [],

    title: [{
        text: "类别",
        width: "200rpx",
        columnName: "type",
        type: "digit",
        isupd: true
      },
      {
        text: "模块名称",
        width: "200rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "产量/小时",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "父模块",
        width: "200rpx",
        columnName: "parentName",
        type: "text",
        isupd: true
      },
      {
        text: "合计产量",
        width: "200rpx",
        columnName: "workNum",
        type: "date",
        isupd: true
      }
    ],
    title2: [{
        text: "订单号",
        width: "200rpx",
        columnName: "id",
        type: "digit",
        isupd: true
      },
      {
        text: "类别",
        width: "200rpx",
        columnName: "type",
        type: "digit",
        isupd: true
      },
      {
        text: "模块名称",
        width: "200rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "产量/小时",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "父模块",
        width: "200rpx",
        columnName: "parentName",
        type: "text",
        isupd: true
      },
      {
        text: "合计产量",
        width: "200rpx",
        columnName: "workNum",
        type: "date",
        isupd: true
      }
    ],
    oid: "",
    modal: "",
    id: "",
    name: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var e = ""
    _this.panduanquanxian()
    if (_this.data.isdischa == 1) {
      _this.tableShow(e)
      //新增代码 
      var _this = this
      var e = ['', '', '']
      _this.tableShow(e)
      //  _this.panduanquanxian()
    }
  },

  goto_yanshi: function(){
    wx.navigateTo({
      url: "../PC_mp4/PC_mp4?this_url=cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/pakageP_mp4/mokuaidanwei.mp4"
      }) 
  },

  //新增代码
  //判断权限
  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa: 1,
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log("department_list1")
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "汇总") {
        console.log("汇总没有添加权限")
        console.log(department_list1[i])
        //添加没权限
        if (department_list1[i].add == "否") {
          _this.setData({
            isdis: 2
          });
          // console.log("否 isdis："+_this.data.isdis)
        } else {
          _this.setData({
            isdis: 1
          });
          // console.log("是 isdis："+_this.data.isdis)

        }
        //查询没权限
        if (department_list1[i].sel == "否") {
          _this.setData({
            isdischa: 2
          });
        } else {
          _this.setData({
            isdischa: 1
          });

        }
        console.log(_this.data.isdis)

      }
    }
  },
  addMK: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select name,id from module_type where company = '" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        console.log(res)
        _this.setData({
          list: list
        })
        wx.hideLoading({

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

  module_info_show: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select * from(select id,isnull((select name from module_type as t where module_info.type_id=t.id),'') as type_name,isnull(name,'') as name,isnull(cast(num as varchar),'') as num,isnull((select name from module_info as i where module_info.parent_id=i.id),'') as parent from module_info where company = '" + user + "') as p where not p.type_name  is null and p.type_name !='' and p.type_name like '%" + e + "%'"
      },
      success: res => {
        var list_module_info = res.result.recordset
        console.log(res)
        _this.setData({
          list_module_info: list_module_info
        })
        wx.hideLoading({

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

  // //结束
  tableShow: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    var sql = ""
    if (e == "") {
      sql = "select mt.name as type, mi.name as name, mi.num as num, (select name from module_info where id = mi.parent_id) as parentName, sum(wd.work_num) as workNum from work_module as wm left join module_info as mi on wm.module_id = mi.id left join module_type as mt on mi.type_id = mt.id left join work_detail as wd on wm.work_id = wd.id where wd.company = '" + user + "' group by mt.name, mi.name, mi.num, mi.parent_id"
    } else {
      sql = "select mt.name as type,mi.name as name,mi.num as num,(select name from module_info where id = mi.parent_id) as parentName,sum(wd.work_num) as workNum from work_module as wm left join module_info as mi on wm.module_id = mi.id left join module_type as mt on mi.type_id = mt.id left join work_detail as wd on wm.work_id = wd.id where wd.company = '" + user + "' and mi.type_id = '" + e + "' group by mt.name,mi.name,mi.num,mi.parent_id"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list: list
        })
        console.log(list)
        wx.hideLoading({

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
  // 按照订单号查询
  tableShow2: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    var sql = ""
    if (e == "") {
      sql = "select mt.name as type, mi.name as name, mi.num as num, (select name from module_info where id = mi.parent_id) as parentName, sum(wd.work_num) as workNum from work_module as wm left join module_info as mi on wm.module_id = mi.id left join module_type as mt on mi.type_id = mt.id left join work_detail as wd on wm.work_id = wd.id where wd.company = '" + user + "' group by mt.name, mi.name, mi.num, mi.parent_id"
    } else {
      sql = "select mt.name as type,mi.name as name,mi.num as num,(select name from module_info where id = mi.parent_id) as parentName,sum(wd.work_num) as workNum from work_module as wm left join module_info as mi on wm.module_id = mi.id left join module_type as mt on mi.type_id = mt.id left join work_detail as wd on wm.work_id = wd.id left join order_info as o on wd.order_id=o.id where wd.company = '" + user + "' and o.order_id like'%" + e + "%' group by mt.name,mi.name,mi.num,mi.parent_id"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list: list
        })
        console.log(list)
        wx.hideLoading({

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
  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
    })
  },
  qxShow: function () {
    var _this = this
    _this.setData({
      cxShow: false
    })
  },
  cx: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "SELECT id,name FROM module_type where company='" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          actions1: list,
          xlShow1: true,
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
  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow1: false,
        id: e.detail.id,
        modal: e.detail.name,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow1: false,
      })
    }
  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
  onInput2: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value

    })
  },
  sel1: function () {
    var _this = this
    var e = _this.data.id
    _this.tableShow(e)
    _this.setData({
      cxShow: false,
      modal: "",
    })
  },
  // 按照单号查询
  sel2: function () {
    var _this = this
    var e = _this.data.oid
    _this.tableShow2(e)
    _this.setData({
      cxShow: false,
      oid: "",
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})