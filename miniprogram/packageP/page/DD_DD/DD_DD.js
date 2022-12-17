const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  tjShow: false,
  xgShow: false,
  cxShow: false,
  addWindow1: false,
  cdShow: true,
  handle: true,
  wlxgShow: false,
  wltjShow: false,
  delWindow1: false,
  data: {
    list: [],
    list2: [],
    title: [{
        text: "订单号",
        width: "200rpx",
        columnName: "order_id",
        type: "digit",
        isupd: true
      },
      {
        text: "产品编码",
        width: "200rpx",
        columnName: "code",
        type: "text",
        isupd: true
      },
      {
        text: "产品名称",
        width: "200rpx",
        columnName: "product_name",
        type: "text",
        isupd: true
      },
      {
        text: "规格",
        width: "200rpx",
        columnName: "norms",
        type: "text",
        isupd: true
      },
      {
        text: "下单日期",
        width: "200rpx",
        columnName: "set_date",
        type: "date",
        isupd: true
      },
      {
        text: "下单数量",
        width: "200rpx",
        columnName: "set_num",
        type: "text",
        isupd: true
      }
    ],
    title2: [{
        text: "物料编码",
        width: "200rpx",
        columnName: "code",
        type: "digit",
        isupd: false
      },
      {
        text: "物料名称",
        width: "200rpx",
        columnName: "name",
        type: "text",
        isupd: false
      },
      {
        text: "描述",
        width: "400rpx",
        columnName: "norms",
        type: "text",
        isupd: false
      },
      {
        text: "数量",
        width: "200rpx",
        columnName: "count",
        type: "digit",
        isupd: true
      }
    ],
    product_name: "",
    order_id: "",
    ddh: "",
    cpbm: "",
    cpmc: "",
    gg: "",
    xdrq: "",
    xdsl: "",
    code_id: "",
    empty: "",
    index: "",
    cd: "",
    row_num: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var e = ['', '', '']
    _this.panduanquanxian()
    _this.setData({
      handle: true,
    })
    //新增
    if (_this.data.isdischa == 1) {
      _this.tableShow(e)       
      var _this = this
      var e = ['', '', '']
      _this.tableShow(e)
    }
    // _this.panduanquanxian()
  },

  goto_yanshi: function(){
    wx.navigateTo({
      url: "../PC_mp4/PC_mp4?this_url=cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/pakageP_mp4/dingdan.mp4"
      }) 
  },

  get_line: function(){
    wx.navigateTo({
      url: "../PC_Line/PC_Line"
    })
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
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "订单") {
        console.log("订单没有添加权限")
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
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select id,order_id,code,product_name,norms,CONVERT(varchar(100), set_date, 23) as set_date,set_num from order_info where company='" + user + "' and order_id like '%" + e[0] + "%' and product_name like '%" + e[1] + "%'"
      },
      success: res => {
        var list = res.result.recordset
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
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      wlxgShow: false,
      wltjShow: false,
      product_name: "",
      order_id: "",
      ddh: "",
      cpbm: "",
      cpmc: "",
      gg: "",
      xdrq: "",
      xdsl: "",
      sfcd: ""
    })
  },
  qxShow2: function () {
    var _this = this
    _this.setData({
      wltjShow: false,
    })
  },
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      cdShow: true,
      cd: ""
    })
    _this.wlShow()
  },
  add1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    var x = 0
    for (var i = 0; i < (_this.data.list2.length); i++) {
      if (_this.data.list2[i].count != "" && _this.data.list2[i].count != 0) {
        x = x + 1
      }
    }
    if (x > 0) {
      if (_this.data.ddh != "" && _this.data.cpbm != "" && _this.data.cpmc != "" && _this.data.xdrq != "" && _this.data.xdsl != "") {
        wx.cloud.callFunction({
          name: 'sqlServer_PC',
          data: {
            query: "select count(order_id) as nameCount from order_info where company='" + user + "' and order_id='" + _this.data.ddh + "'"
          },
          success: res => {
            if (res.result.recordsets[0][0].nameCount == 0) {
              wx.cloud.callFunction({
                name: 'sqlServer_PC',
                data: {
                  query: "insert into order_info(order_id,code,product_name,norms, set_date,set_num,company) output inserted.ID values('" + _this.data.ddh + "','" + _this.data.cpbm + "','" + _this.data.cpmc + "','" + _this.data.gg + "','" + _this.data.xdrq + "','" + _this.data.xdsl + "','" + user + "')"
                },
                success: res => {
                  var id = res.result.recordset[0].ID
                  _this.setData({
                    product_name: "",
                    order_id: "",
                    ddh: "",
                    cpbm: "",
                    cpmc: "",
                    gg: "",
                    xdrq: "",
                    xdsl: "",
                    sfcd: "",
                  })
                  var y = 0
                  var sql = "insert into order_bom(order_id,bom_id,use_num) values"
                  for (var i = 0; i < (_this.data.list2.length); i++) {
                    if (_this.data.list2[i].count != "" && _this.data.list2[i].count != 0) {
                      sql = sql + "('" + id + "','" + _this.data.list2[i].id + "','" + _this.data.list2[i].count + "'),"
                      y = y + 1
                    }
                  }
                  if (y > 0) {
                    sql = sql.substr(0, sql.length - 1)
                    wx.cloud.callFunction({
                      name: 'sqlServer_PC',
                      data: {
                        query: sql
                      },
                      success: res => {
                        wx.showToast({
                          title: '添加成功！',
                          icon: 'none',
                          duration: 3000
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
                  }
                  _this.qxShow()
                  var e = ['', '', '']
                  _this.tableShow(e)
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
                title: '该单号已存在！',
                icon: 'none'
              })
            }
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
          title: '物料编码、物料名称、类别不能为空！',
          icon: 'none',
          duration: 3000
        })
      }
    } else {
      wx.showToast({
        title: '物料不能为空！',
        icon: 'none'
      })
    }
  },
  clickView: function (e) {
    var _this = this
    _this.setData({
      ddh: _this.data.list[e.currentTarget.dataset.index].order_id,
      cpbm: _this.data.list[e.currentTarget.dataset.index].code,
      cpmc: _this.data.list[e.currentTarget.dataset.index].product_name,
      gg: _this.data.list[e.currentTarget.dataset.index].norms,
      xdrq: _this.data.list[e.currentTarget.dataset.index].set_date,
      xdsl: _this.data.list[e.currentTarget.dataset.index].set_num,
      sfcd: _this.data.list[e.currentTarget.dataset.index].is_insert,
      id: _this.data.list[e.currentTarget.dataset.index].id,
      handle: false,
    })
  },
  upd1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.ddh != "" && _this.data.cpbm != "" && _this.data.cpmc != "" && _this.data.xdrq != "" && _this.data.xdsl != "") {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "update order_info set order_id='" + _this.data.ddh + "',code='" + _this.data.cpbm + "',product_name='" + _this.data.cpmc + "',norms='" + _this.data.gg + "', set_date='" + _this.data.xdrq + "',set_num='" + _this.data.xdsl + "' where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            product_name: "",
            order_id: "",
            ddh: "",
            cpbm: "",
            cpmc: "",
            gg: "",
            xdrq: "",
            xdsl: "",
          })
          _this.qxShow()
          _this.setData({
            handle: true
          })
          var e = ['', '', '']
          _this.tableShow(e)
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
        title: '物料编码、物料名称、类别不能为空！',
        icon: 'none',
        duration: 3000
      })
    }
  },
  del1: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "delete from order_info where id='" + _this.data.id + "';delete from order_bom where order_id='" + _this.data.id + "'"
      },
      success: res => {
        _this.setData({
          product_name: "",
          order_id: "",
          ddh: "",
          cpbm: "",
          cpmc: "",
          gg: "",
          xdrq: "",
          xdsl: "",
          sfcd: "",
        })
        _this.qxShow()
        var e = ['', '', '']
        _this.tableShow(e)
        wx.showToast({
          title: '删除成功！',
          icon: 'none'
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
  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
    })
  },
  sel1: function () {
    var _this = this
    var e = [_this.data.order_id, _this.data.product_name]
    _this.tableShow(e)
    _this.qxShow()
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
  clickView2: function (e) {
    var _this = this
    var column = e.currentTarget.dataset.column
    var index = e.currentTarget.dataset.index
    var code_id = _this.data.list2[index].id
    var empty = _this.data.list2[index].count

    if ("count" == column) {
      _this.setData({
        code_id: code_id,
        addWindow1: true,
        empty: empty,
        index: index
      })
    }
  },
  onInput2: function (e) {
    var _this = this
    let empty = e.detail.value
    _this.setData({
      empty: empty
    })
  },
  sure2: function () {
    var _this = this
    var list = _this.data.list2
    list[_this.data.index].count = _this.data.empty
    _this.setData({
      list2: list
    })
  },
  choiceDate: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
  },
  hid_view: function () {
    var _this = this
    _this.setData({
      handle: true
    })
  },
  xgDingDan: function () {
    var _this = this
    _this.setData({
      xgShow: true
    })
  },
  xgWuLiao: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select b.id,i.code,i.name,i.norms,b.use_num as count from bom_info as i ,order_bom as b where b.bom_id=i.id and order_id='" + _this.data.id + "'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list2: list,
          wlxgShow: true
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
  clickView3: function (e) {
    var _this = this
    var column = e.currentTarget.dataset.column
    var index = e.currentTarget.dataset.index
    var code_id = _this.data.list2[index].id
    var empty = _this.data.list2[index].count

    if ("count" == column) {
      _this.setData({
        code_id: code_id,
        addWindow1: true,
        empty: empty,
        index: index
      })
    } else {
      _this.setData({
        code_id: code_id,
        delWindow1: true,
        empty: empty,
        index: index,
      })
    }
  },
  upd2: function () {
    var _this = this
    var x = 0
    var sql = ""
    let user = app.globalData.gongsi;
    for (var i = 0; i < _this.data.list2.length; i++) {
      if (_this.data.list2[i].count != "" && _this.data.list2[i].count != 0) {
        sql = sql + "update order_bom set use_num='" + _this.data.list2[i].count + "' where id='" + _this.data.list2[i].id + "'"
      } else {
        x = x + 1
      }
    }
    if (x > 0) {
      wx.showToast({
        title: '物料数量不能修改为空！',
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: sql
        },
        success: res => {
          _this.setData({
            order_id: "",
            ddh: "",
            cpbm: "",
            cpmc: "",
            gg: "",
            xdrq: "",
            xdsl: "",
          })
          _this.qxShow()
          _this.setData({
            handle: true
          })
          var e = ['', '', '']
          _this.tableShow(e)
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
    }
  },
  add2: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select id,code,name,norms,'' as [count] from bom_info where company = '" + user + "' and id not in (select bom_id from order_bom where order_id = '" + _this.data.id + "' )"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list2: list,
          wltjShow: true
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
  wltj: function () {
    var _this = this
    let user = app.globalData.gongsi;
    var y = 0
    var sql = "insert into order_bom(order_id,bom_id,use_num) values"
    for (var i = 0; i < (_this.data.list2.length); i++) {
      if (_this.data.list2[i].count != "" && _this.data.list2[i].count != 0) {
        sql = sql + "('" + _this.data.id + "','" + _this.data.list2[i].id + "','" + _this.data.list2[i].count + "'),"
        y = y + 1
      }
    }
    if (y > 0) {
      sql = sql.substr(0, sql.length - 1)
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: sql
        },
        success: res => {
          _this.setData({
            wltjShow: false,
          })
          _this.xgWuLiao()
          wx.showToast({
            title: '添加成功！',
            icon: 'none',
            duration: 3000
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
    }
  },
  sure1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "delete from order_bom where id='" + this.data.list2[_this.data.index].id + "'"
      },
      success: res => {
        _this.setData({
          dedelWindow1lId: false
        })
        _this.xgWuLiao()
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
  // 生成Excel
  getExcel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title
    var cloudList = {
      name: '排产订单',
      items: [],
      header: []
    }

    for (let i = 0; i < title.length; i++) {
      cloudList.header.push({
        item: title[i].text,
        type: title[i].type,
        width: parseInt(title[i].width.split("r")[0]) / 6,
        columnName: title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name: 'getExcel',
      data: {
        list: cloudList
      },
      success: function (res) {
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu: 'true',
              fileType: 'xlsx',
              success: res => {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail: res => {
        console.log(res)
      }
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