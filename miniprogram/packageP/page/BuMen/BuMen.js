// miniprogram/packageP/page/BuMen/BuMen.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  xzShow: false,
  tjShow: false,
  data: {
    list: [],
    list2: [],
    title: [{
        text: "部门名称",
        width: "200rpx",
        columnName: "department_name",
        type: "digit",
        isupd: true
      },
      {
        text: "页面名称",
        width: "300rpx",
        columnName: "view_name",
        type: "text",
        isupd: true
      },
      {
        text: "添加",
        width: "200rpx",
        columnName: "add",
        type: "text",
        isupd: true
      },
      {
        text: "删除",
        width: "200rpx",
        columnName: "del",
        type: "text",
        isupd: true
      },
      {
        text: "修改",
        width: "200rpx",
        columnName: "upd",
        type: "date",
        isupd: true
      },
      {
        text: "查询",
        width: "200rpx",
        columnName: "sel",
        type: "text",
        isupd: true
      }
    ],
    id: "",
    department_name: "",
    add: "",
    del: "",
    upd: "",
    sel: "",
    view_name: "",
    company: "",
    did: "",
    dname: "",
    isdis: '',
    isdischa: '',
    isdisgai:'',
    isdisshan:'',
    vname: "",
    dcompany: "",
    sw1: "",
    bumen: "",
    rqxzShow3: false,
    yemian_name:[{
      name:"模块单位"
    },{
      name:"工作时间及休息日"
    },{
      name:"BOM"
    },{
      name:"订单"
    },{
      name:"排产"
    },{
      name:"排产核对"
    },{
      name:"汇总"
    },{
      name:"部门"
    },{
      name:"人员信息"
    },{
      name:"排班"
    },{
      name:"排班明细"
    },{
      name:"账号管理"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.panduanquanxian()
    if (_this.data.isdischa == 1) {
      _this.tableShow()
      _this.setData({

      })
      var _this = this
      var e = ['', '', '']
      _this.tableShow(e)
      // _this.panduanquanxian()
    }
    //_this.addMK()
    //_this.
    //_this.module_info_show(_this.e)


    //结束
  },

  //新增代码
  //判断权限
  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa: 1,
      isdisgai: 1,
      isdisshan: 1
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log("department_list1")
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "部门") {
        console.log("部门没有添加权限")
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
        //修改没权限
        if (department_list1[i].upd == "否") {
          _this.setData({
            isdisgai: 2
          });
        } else {
          _this.setData({
            isdisgai: 1
          });

        }
        //删除没权限
        if (department_list1[i].del == "否") {
          _this.setData({
            isdisshan: 2
          });
        } else {
          _this.setData({
            isdisshan: 1
          });

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
  // addMK: function () {
  //   var _this = this
  //   let user = app.globalData.gongsi;
  //   wx.cloud.callFunction({
  //     name: 'sqlServer_PC',
  //     data: {
  //       query: "select name,id from module_type where company = '" + user + "'"
  //     },
  //     success: res => {
  //       var list = res.result.recordset
  //       console.log(res)
  //       _this.setData({
  //         list: list
  //       })
  //       wx.hideLoading({

  //       })
  //     },
  //     err: res => {
  //       console.log("错误!")
  //     },
  //     fail: res => {
  //       wx.showToast({
  //         title: '请求失败！',
  //         icon: 'none'
  //       })
  //       console.log("请求失败！")
  //     }
  //   })
  // },

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
  //初始数据
  tableShow: function () {
    var _this = this
    let user = app.globalData.gongsi;
    let bumen = app.globalData;
    console.log(bumen)
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select * from department where company='" + user + "' order by department_name"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list: list
        })
        // console.log(list)
        wx.hideLoading({

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
  //部门主页面点击事件
  clickView: function (e) {
    var _this = this

    _this.setData({
      did: _this.data.list[e.currentTarget.dataset.index].id,
      dname: _this.data.list[e.currentTarget.dataset.index].department_name,
      dadd: _this.data.list[e.currentTarget.dataset.index].add,
      ddel: _this.data.list[e.currentTarget.dataset.index].del,
      dupd: _this.data.list[e.currentTarget.dataset.index].upd,
      dsel: _this.data.list[e.currentTarget.dataset.index].sel,
      vname: _this.data.list[e.currentTarget.dataset.index].view_name,
      dcompany: _this.data.list[e.currentTarget.dataset.index].company,
      xzShow: true,
    })
    console.log(_this.data.did)
  },
  // 取消
  qxShow: function () {
    var _this = this
    _this.setData({
      xzShow: false,
      tjShow: false,
    })
  },
  // 修改事件
  upd1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    console.log(_this.data.dadd)
    if (_this.data.dname != "" && _this.data.vname != "" && _this.data.dcompany != "" && _this.data.did != "") {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "update department set department_name='" + _this.data.dname + "',[add]='" + _this.data.dadd + "',del='" + _this.data.ddel + "',upd='" + _this.data.dupd + "', sel='" + _this.data.dsel + "',view_name='" + _this.data.vname + "',company='" + _this.data.dcompany + "' where id='" + _this.data.did + "'"
        },
        success: res => {
          _this.setData({
            dname: "",
            did: "",
            dadd: "",
            ddel: "",
            dupd: "",
            dsel: "",
            vname: "",
            dcompany: "",
          })
          _this.qxShow()
          _this.tableShow()
          wx.showToast({
            title: '修改成功！',
            icon: 'none',
            duration: 3000
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
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })
    } else {
      wx.showToast({
        title: '部门名称、页面名称不能为空！',
        icon: 'none',
        duration: 3000
      })
    }
  },
  //获取输入的值
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
  //添加事件
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
    })
    _this.wlShow()
  },
  wlShow: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select id,code,name,norms,'' as [count] from bom_info where company='" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list2: list
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
  //添加
  add1: function () {
    var _this = this
    if (_this.data.dname != "" && _this.data.vname != "") {
      let user = app.globalData.gongsi;
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "insert department(department_name,view_name,[add],del,upd,sel,company) values('" + _this.data.dname + "','" + _this.data.vname + "','" + _this.data.dadd + "','" + _this.data.ddel + "','" + _this.data.dupd + "','" + _this.data.dsel + "','" + app.globalData.gongsi + "')"
        },
        success: res => {
          var list2 = res.result.recordset
          console.log(res)
          _this.setData({
            dname: "",
            did: "",
            dadd: "",
            ddel: "",
            dupd: "",
            dsel: "",
            vname: "",
            dcompany: "",
            tjShow: false,
          })
          _this.qxShow()
          _this.tableShow()
          wx.showToast({
            title: '添加成功！',
            icon: 'none',
            duration: 3000
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
    } else {
      wx.showToast({
        title: '部门名称、页面名称不能为空！',
        icon: 'none'
      })
    }
  },
  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true
    })
  },
  // 删除事件
  del: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "delete from department where id ='" + _this.data.did + "'"
      },
      success: res => {
        var list2 = res.result.recordset
        console.log(res)
        _this.setData({
          dname: "",
          did: "",
          dadd: "",
          ddel: "",
          dupd: "",
          dsel: "",
          vname: "",
          dcompany: "",
          tjShow: false
        })
        _this.qxShow()
        _this.tableShow()
        wx.showToast({
          title: '删除成功！',
          icon: 'none',
          duration: 3000
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
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },
  //switch
  switch1Change: function (e) {
    var _this = this
    console.log(e.detail.value)
    if (e.detail.value == true) {
      _this.setData({
        dadd: '是'
      })
    } else {
      _this.setData({
        dadd: '否'
      })
    }
  },
  switch2Change: function (e) {
    var _this = this
    console.log(e.detail.value)
    if (e.detail.value == true) {
      _this.setData({
        ddel: '是'
      })
    } else {
      _this.setData({
        ddel: '否'
      })
    }
  },
  switch3Change: function (e) {
    var _this = this
    console.log(e.detail.value)
    if (e.detail.value == true) {
      _this.setData({
        dupd: '是'
      })
    } else {
      _this.setData({
        dupd: '否'
      })
    }
  },
  switch4Change: function (e) {
    var _this = this
    console.log(e.detail.value)
    if (e.detail.value == true) {
      _this.setData({
        dsel: '是'
      })
    } else {
      _this.setData({
        dsel: '否'
      })
    }
  },

  selYM: function () {
    var _this = this
    _this.setData({
      rqxzShow3: true
    })
  },

  select2: function (e) {
    var _this = this
    _this.setData({
      rqxzShow3: false
    })
    if (e.type == 'select') {
      _this.setData({
        vname: e.detail.name,
      })
    }
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