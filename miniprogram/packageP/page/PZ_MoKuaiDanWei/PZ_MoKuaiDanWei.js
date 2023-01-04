const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    isdis: '',
    isdischa: '',
    list: [],
    list2: [],
    list_module_info: [],
    actions1: [],
    actions2: [],
    showWindow1: false,
    cxShow: false,
    tjShow: false,
    xgShow: false,
    xlShow1: false,
    xlShow2: false,
    show: {
      primary: true,
      success: true,
    },
    title: [{
        text: "模块类别",
        width: "200rpx",
        columnName: "type_name",
        type: "digit",
        isupd: true
      },
      {
        text: "名称",
        width: "200rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "效率/时",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "父模块",
        width: "200rpx",
        columnName: "parent",
        type: "text",
        isupd: true
      },
    ],
    moduleName: '',
    modalInput: '',
    empty: "",
    mklb: "",
    mc: "",
    xls: "",
    fmk: "",
    tjShow2: "",
    index_: "",
    fmk_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.panduanquanxian()
    if (_this.data.isdischa == 1) {
      _this.addMK(),
      _this.module_info_show('')
    }
    // wx.showModal({
    //   title: '提示：',
    //   content: '上方右滑可添加模块',
    //   showCancel: false, //是否显示取消按钮
    //   confirmText: "知道了", //默认是“确定”
    //   confirmColor: '#84B9F2', //确定文字的颜色
    //   success: function (res) {},
    //   fail: function (res) {}, //接口调用失败的回调函数
    //   complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    // })
    
  },
  goto_yanshi: function(){
    wx.navigateTo({
      url: "../PC_mp4/PC_mp4?this_url=cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/pakageP_mp4/mokuaidanwei.mp4"
      }) 
  },

  //权限执行判断方法
  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa: 1
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log("department_list1")
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "模块单位") {
        console.log("模块单位没有添加权限")
        console.log(department_list1[i])
        //添加没权限
        if (department_list1[i].add == "否") {
          _this.setData({
            isdis: 2
          });
        } else {
          _this.setData({
            isdis: 1
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
          console.log("否 isdisshan：" + _this.data.isdisshan)
        } else {
          _this.setData({
            isdisshan: 1
          });

          console.log("是 isdisshan：" + _this.data.isdisshan)
        }
        console.log(_this.data.isdis)

      }
    }
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

  bindPickerChange: function(e){
    var _this = this
    console.log(_this.data.xiala[e.detail.value])
    _this.setData({
      moduleName: _this.data.xiala[e.detail.value]
    })
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
        var xiala = []
        for(var i=0; i<list.length; i++){
          xiala.push(list[i].name)
        }
        console.log(res)
        _this.setData({
          list: list,
          xiala:xiala,
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

  onClose(event) {
    var _this = this
    var aa = event.currentTarget.id
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "DELETE from work_detail where id in (select wm.work_id from work_module as wm where wm.module_id in (select mi.id from module_info as mi where mi.type_id='" + event.currentTarget.id + "'));DELETE from work_module where module_id in (select mi.id from module_info as mi where mi.type_id='" + event.currentTarget.id + "');DELETE from module_info where type_id='" + event.currentTarget.id + "';DELETE from module_type where id = '" + event.currentTarget.id + "'"
      },
      success: res => {
        var list = res.result.recordset
        console.log(res)
        _this.setData({
          list: list
        })
        _this.addMK()
        _this.module_info_show('')
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
    _this.addMK()
  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
  onClick2: function (e) {
    var _this = this
    _this.addMK()
    let column = e.currentTarget.dataset.column
    var list = _this.data.list
    if (column == "mklb" || column == 'moduleName') {
      _this.setData({
        xlShow1: true,
        actions1: list
      })
    } else if (column == "fmk") {
      let user = app.globalData.gongsi;
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "select id,name from module_info where company='" + user + "'"
        },
        success: res => {
          var list2 = res.result.recordset
          console.log(res)
          _this.setData({
            xlShow2: true,
            actions2: list2,
            empty: ""
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
    }
  },
  onClick1: function () {
    var _this = this
    _this.setData({
      showWindow1: true
    })
  },
  save1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    var moduleName = _this.data.moduleName
    if (moduleName == "") {
      wx.showToast({
        title: '输入不能为空！',
        icon: 'none'
      })
    } else {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "select count(name) as nameCount from module_type where company='" + user + "' and name='" + moduleName + "'"
        },
        success: res => {
          if (res.result.recordsets[0][0].nameCount == 0) {
            wx.cloud.callFunction({
              name: 'sqlServer_PC',
              data: {
                query: "insert module_type(name,company) values('" + moduleName + "','" + app.globalData.gongsi + "')"
              },
              success: res => {
                var list = res.result.recordset
                console.log(res)
                _this.setData({
                  list: list,
                  empty: ""
                })
                _this.addMK()
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
              title: '该工序名已存在！',
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
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
    }
    _this.addMK()
  },
  save2: function () {
    var _this = this
    if (_this.data.type_id != "" && _this.data.mklb != "" && _this.data.mc != "") {
      let user = app.globalData.gongsi;
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "insert module_info(type_id,name,num,parent_id,company) values('" + _this.data.type_id + "','" + _this.data.mc + "','" + _this.data.xls + "','" + _this.data.fmk_id + "','" + app.globalData.gongsi + "')"
        },
        success: res => {
          var list2 = res.result.recordset
          console.log(res)
          _this.setData({
            mklb: "",
            mc: "",
            xls: "",
            fmk: "",
            tjShow: false
          })
          _this.module_info_show('')
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
        title: '模块类别、名称不能为空！',
        icon: 'none'
      })
    }
  },
  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      moduleName:'',
    })
  },
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true
    })
  },
  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      cxShow: false,
      xgShow: false,
      empty: "",
      mklb: "",
      mc: "",
      xls: "",
      fmk: ""
    })
  },
  chaxun: function (e) {
    var _this = this
    var moduleName = _this.data.moduleName
    _this.module_info_show(moduleName)
    var _this = this
    _this.setData({
      cxShow: false,
      empty: "",
      moduleName: ""
    })
  },
  select1: function (e) {
    var _this = this
    _this.setData({
      xlShow1: false
    })
    if (e.type == 'select') {
      _this.setData({
        mklb: e.detail.name,
        moduleName:e.detail.name,
        type_id: e.detail.id,
      })
    }
  },
  select2: function (e) {
    var _this = this
    _this.setData({
      xlShow2: false
    })
    if (e.type == 'select') {
      _this.setData({
        fmk: e.detail.name,
        fmk_id: e.detail.id
      })
    }
  },
  clickView: function (e) {
    var _this = this
    var index_ = e.currentTarget.dataset.index;
    
    _this.setData({
      index_: index_,
      xgShow: true,
      mklb: _this.data.list_module_info[index_].type_name,
      mc: _this.data.list_module_info[index_].name,
      xls: _this.data.list_module_info[index_].num,
      fmk: _this.data.list_module_info[index_].parent,
      type_id:undefined
    })
  },
  del: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "delete from work_detail where id in (select wm.work_id from work_module as wm where wm.module_id='" + _this.data.list_module_info[_this.data.index_].id + "');delete from work_module where module_id='" + _this.data.list_module_info[_this.data.index_].id + "';delete from module_info where id ='" + _this.data.list_module_info[_this.data.index_].id + "'"
      },
      success: res => {
        var list2 = res.result.recordset
        console.log(res)
        _this.setData({
          mklb: "",
          mc: "",
          xls: "",
          fmk: "",
          xgShow: false
        })
        _this.module_info_show('')
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
  upd: function () {
    var _this = this
    var sql = ""
    if (_this.data.type_id == undefined ){
      sql="update module_info set name='" + _this.data.mc + "',num='" + _this.data.xls + "',parent_id='" + _this.data.fmk_id + "' where id ='" + _this.data.list_module_info[_this.data.index_].id + "'"
    }else{
      sql = "update module_info set type_id='" + _this.data.type_id + "',name='" + _this.data.mc + "',num='" + _this.data.xls + "',parent_id='" + _this.data.fmk_id + "' where id ='" + _this.data.list_module_info[_this.data.index_].id + "'"
    }

    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: sql
      },
      success: res => {
        var list2 = res.result.recordset
        console.log(res)
        _this.setData({
          mklb: "",
          mc: "",
          xls: "",
          fmk: "",
          xgShow: false
        })
        _this.module_info_show('')
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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