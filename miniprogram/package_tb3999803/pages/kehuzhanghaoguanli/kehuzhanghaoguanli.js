// package_tb3999803/pages/kehuzhanghaoguanli/kehuzhanghaoguanli.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  tjShow: false,
  xgShow: false,
  cxShow: false,
  data: {
    khpower_type: ['管理员', '店员'],
    list: [],
    title: [{
      text: "区域",
      width: "250rpx",
      columnName: "district",
      type: "text",
      isupd: true
    },{
      text: "客户名称",
      width: "250rpx",
      columnName: "customerName",
      type: "text",
      isupd: true
    },{
      text: "地址",
      width: "250rpx",
      columnName: "address",
      type: "text",
      isupd: true
    },{
      text: "负责人",
      width: "250rpx",
      columnName: "principal",
      type: "text",
      isupd: true
    },{
      text: "账号",
      width: "250rpx",
      columnName: "zhanghao",
      type: "text",
      isupd: true
    },{
      text: "密码",
      width: "250rpx",
      columnName: "mima",
      type: "text",
      isupd: true
    },{
      text: "备注",
      width: "250rpx",
      columnName: "remarks",
      type: "text",
      isupd: true
    },{
      text: "权限",
      width: "250rpx",
      columnName: "khpower",
      type: "text",
      isupd: true
    },
  ],
    id: '',
    district: '',
    customerName: '',
    address: '',
    principal: '',
    zhanghao: '',
    mima: '',
    remarks: '',
    khpower: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo: userInfo,
    })
    _this.tableShow()
  },

  // header_xiala: function () {
  //   var _this = this
  //   console.log('列名：', e.currentTarget.dataset.column)
  //   var column = e.currentTarget.dataset.column
  //   var list = _this.data[column + "_list"]
  //   var list2 = []
  //   console.log(list)
  //   for (var i = 0; i < list.length; i++) {
  //     var name = list[i].name
  //     console.log(name.indexOf(_this.data.khpower))
  //   }
  //   console.log(list2)
  //   _this.setData({
  //     list_xiala: list2,
  //     click_column: column,
  //   })
  //   console.log(list)
  //   _this.setData({
  //     xlShow2: true
  //   })
  // },

  bindPickerChange1: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.khpower_type[e.detail.value]
    })
  },

  choiceDate: function (e) {
    _this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  tableShow: function () {
    var _this = this
    var sql = ""
    sql = "select * from customerInformation"
    var userInfo = _this.data.userInfo
    if (userInfo.quanxian == '客户') {
      sql = sql + " where customerName = '" + userInfo.name + "'"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        console.log(sql)
        var list = res.result.recordsets[0]
        console.log(list)
        _this.setData({
          list: list,
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
      },
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
    })
  },

  inquire: function () {
    var _this = this
    
    _this.setData({
      tjShow: true,
      id: '',
      district: '',
      customerName: '',
      address: '',
      principal: '',
      zhanghao: '',
      mima: '',
      remarks: '',
      khpower: '',
    })
  },

  add1: function () {
    var _this = this

    if (_this.data.district == '') {
      wx.showToast({
        title: '请输区域！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if (_this.data.customerName == '') {
      wx.showToast({
        title: '请输名称！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if (_this.data.address == '') {
      wx.showToast({
        title: '请输地址！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.principal == '') {
      wx.showToast({
        title: '请输负责人！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.zhanghao == '') {
      wx.showToast({
        title: '请输账号！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.mima == '') {
      wx.showToast({
        title: '请输密码！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.remarks == '') {
      wx.showToast({
        title: '请输备注！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.khpower == '') {
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
        query: "SELECT * FROM customerInformation WHERE zhanghao = '" + _this.data.zhanghao + "'"
      },
      success: res => {
        if (res.result.recordsets[0].length > 0) {
          // 如果查询结果不为空，说明账号已存在
          wx.showToast({
            title: '账号已存在！',
            icon: 'none',
            duration: 3000
          });
        } else {
          // 如果查询结果为空，说明账号不存在，可以继续插入操作
          wx.cloud.callFunction({
            name: 'sqlServer_tb3999803',
            data: {
              query: "insert into customerInformation(district,customerName,address,principal,zhanghao,mima,remarks,khpower) values('" + _this.data.district + "','" + _this.data.customerName + "','" + _this.data.address + "','" + _this.data.principal + "','" + _this.data.zhanghao + "','" + _this.data.mima + "','" + _this.data.remarks + "','" + _this.data.khpower + "')"
            },
            success: res => {
              console.log(res);
              _this.setData({
                id: '',
                district: '',
                customerName: '',
                address: '',
                principal: '',
                zhanghao: '',
                mima: '',
                remarks: '',
                khpower: '',
              });
              _this.qxShow();
              _this.tableShow();
              wx.showToast({
                title: '添加成功！',
                icon: 'none'
              });
            },
            err: res => {
              console.log("错误！");
            },
            fail: res => {
              wx.showToast({
                title: '请求失败！',
                icon: 'none'
              });
              console.log("请求失败！");
            }
          });
        }
      },
      fail: res => {
        console.log("查询失败！");
      }
    });
  },
//     wx.cloud.callFunction({
//       name: 'sqlServer_tb3999803',
//       data: {
//         query: "SELECT * FROM customerInformation WHERE zhanghao = '" + _this.data.zhanghao + "'"
//       },
//       success: res => {
//         if (res.result.recordsets[0].length > 0) {
//           // 如果查询结果不为空，说明账号已存在
//           wx.showToast({
//             title: '账号已存在！',
//             icon: 'none',
//             duration: 3000
//           });
//         }else{
//     wx.cloud.callFunction({
//       name: 'sqlServer_tb3999803',
//       data: {
//         query: "insert into customerInformation(district,customerName,address,principal,zhanghao,mima,remarks,khpower) values('" + _this.data.district + "','" + _this.data.customerName + "','" + _this.data.address + "','" + _this.data.principal + "','" + _this.data.zhanghao + "','" + _this.data.mima + "','" + _this.data.remarks + "','" + _this.data.khpower + "')"
//       },
//       success: res => {
//         console.log(res)
//         _this.setData({
//           id: '',
//           district: '',
//           customerName: '',
//           address: '',
//           principal: '',
//           zhanghao: '',
//           mima: '',
//           remarks: '',
//           khpower: '',
//         })
//         _this.qxShow()
//         _this.tableShow()
//         wx.showToast({
//           title: '添加成功！',
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
//   }
// },fail: res => {
//   console.log("查询失败！");
// }
// },

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
        query: "update customerInformation set district='" + _this.data.district + "',customerName='" + _this.data.customerName + "',address='" + _this.data.address + "',principal='" + _this.data.principal + "',zhanghao='" + _this.data.zhanghao + "',mima='" + _this.data.mima + "',remarks='" + _this.data.remarks + "',khpower='" + _this.data.khpower + "' where id=" + _this.data.id
      },
      success: res => {
        _this.setData({
          id: '',
          district: '',
          customerName: '',
          address: '',
          principal: '',
          zhanghao: '',
          mima: '',
          remarks: '',
          khpower: '',
        })
        _this.qxShow()
        _this.tableShow()

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
      district: _this.data.list[e.currentTarget.dataset.index].district,
      customerName: _this.data.list[e.currentTarget.dataset.index].customerName,
      address: _this.data.list[e.currentTarget.dataset.index].address,
      principal: _this.data.list[e.currentTarget.dataset.index].principal,
      zhanghao: _this.data.list[e.currentTarget.dataset.index].zhanghao,
      mima: _this.data.list[e.currentTarget.dataset.index].mima,
      remarks: _this.data.list[e.currentTarget.dataset.index].remarks,
      khpower: _this.data.list[e.currentTarget.dataset.index].khpower,
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
              query: "delete from customerInformation where id='" + _this.data.id + "'"
            },
            success: res => {
              console.log(res)
              _this.setData({
                id: '',
                district: '',
                customerName: '',
                address: '',
                principal: '',
                zhanghao: '',
                mima: '',
                remarks: '',
                khpower: '',
              })
              _this.qxShow()
              // var e = ['']
              _this.tableShow()
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

  // entering: function () {
  //   var _this = this
  //   _this.setData({
  //     cxShow: true,
  //     name: "",
  //     quanxian: "",
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // var _this = this
    // _this.tableShow()
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