// miniprogram/packageX/page/UserInfo/UserInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    input_type: 'text',
    list: [],
    uname: "",
    name:"",
    empty: "",
    gongsi:"",
    uname:"",
    sheetqx5: [],
    view_id:"",
    id:"",
    getDate: function () {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1);
      var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
      return year + "-" + month + "-" + day
    },
    title: [{ text: "序号", width: "100rpx", columnName: "rownum", type: "digit", isupd: true },
    { text: "职位", width: "200rpx", columnName: "position", type: "text", isupd: true },
    { text: "员工", width: "300rpx", columnName: "uname", type: "text", isupd: true },
    { text: "账号", width: "250rpx", columnName: "account", type: "text", isupd: true },
    { text: "密码", width: "250rpx", columnName: "password", type: "text", isupd: true },
    ],
    views: [
      {
        image_url: "../../../images/rili.png",
        index: 1,
        text: "客户信息",
        function: [0, 1, 2, 3]
      }, {
        image_url: "../../../images/renyuanxinxiguanli.png",
        index: 2,
        text: "日交易记录",
        function: [-1, -1, -1, 3]
      }, {
        image_url: "../../../images/baopan.png",
        index: 3,
        text: "月交易记录",
        function: [-1, -1, -1, 3]
      }, {
        image_url: "../../../images/shezhi.png",
        index: 4,
        text: "统计交易金额",
        function: [-1, -1, -1, 3]
      }, {
        image_url: "../../../images/gerenxinxi.png",
        index: 5,
        text: "员工信息",
        function: [0, 1, 2, 3]
      }
    ],
    input_hid: true,
    frmStudfind: true,
    mask_hid: true,
    addTable: true,
    handle: true,
    details: true,
    quanxian: true,
    mask:true,
    show: []
  },


  clickView: function (e) {
    var _this = this;
    var dataset_input = e.currentTarget.dataset;
    if (!dataset_input.isupd) {
      return;
    }
    if (dataset_input.column == "rownum") {
      _this.setData({
        dataset_input,
        handle: false,
        mask_hid: false,
      })
    } else {
      if (_this.data.sheetqx5.Upd == "1" ){
      _this.setData({
        dataset_input,
        input_hid: false,
        mask_hid: false,
        input_type: e.currentTarget.dataset.input_type
      })
      }else{
        wx.showToast({
          title: '无权限',
          icon: 'none',
        })
      }
    }
  },


  choice_left_item: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    })
    console.log(e)
    var _this = this;
    var view_index = e.currentTarget.dataset.view_index;
    var id = _this.data.list[_this.data.dataset_input.index].id;
    _this.setData({
      view_id: view_index,
      id:id,
    })
    var show = _this.data.show;
    for (var i = 0; i < show.length; i++) {
      if (view_index == show[i].view_id) {
        wx.hideLoading({
          complete: (res) => { },
        })
        return;
      }
    }

    //查询该用户对该表的权限
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: "select `Add`,Del,Upd,Sel from management where Uid = '" + id + "' and `Table` = '" + view_index + "'"
      },
      success: res => {
        console.log("aaaa",res)

        if (res.result.length != 0) {
          var list = res.result;
          var arr = [];
          arr.push(list[0].Add)
          arr.push(list[0].Del)
          arr.push(list[0].Upd)
          arr.push(list[0].Sel)

          _this.setRightArea(arr, "update", arr, false);
          wx.hideLoading({
            complete: (res) => { },
          })
        } else {
          wx.showModal({
            title: _this.data.views[view_index - 1].text,
            content: "该用户对该表未设置规则,是否使用默认规则",
            cancelText: "取消",
            confirmText: "确定",
            confirmColor: "#84B9F2",
            success: function (res) {
              if (res.confirm) {
                _this.setRightArea([0, 0, 0, 0, 1], "insert", [], true);
              }
              if (res.cancel) {
                _this.setRightArea([0, 0, 0, 0, 1], "insert", [0, 0, 0, 0, 1], false);
              }
            }
          })
          wx.hideLoading({
            complete: (res) => { },
          })

        }
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  //渲染右侧页面
  setRightArea: function (arr, caozuo, old_is, isDefault) {
    var _this = this;
    var show = _this.data.show;
    var view_id = _this.data.view_id;
    var view = _this.data.views[view_id - 1]

    if (isDefault) {
      var newShow = { view_id: view_id, is: [], caozuo: caozuo, isUpd: true, old_is: old_is, isDefault: isDefault }
    } else {
      var newShow = { view_id: view_id, is: [], caozuo: caozuo, isUpd: false, old_is: old_is, isDefault: isDefault }
    }

    for (var j = 0; j < view.function.length; j++) {
      var isShow = true;
      if (view.function[j] == -1) {
        isShow = false;
      }
      var newis = {
        isShow: isShow,
        text: _this.getText(view.function[j], view_id),
        is: arr[j]
      }
      newShow.is.push(newis);
    }
    show.push(newShow)

    _this.setData({
      show
    })
  },

  getText: function (i, view_id) {
    switch (i) {
      case 0:
        return "新增"
      case 1:
        return "删除"
      case 2:
        return "修改"
      case 3:
        return "查询"
      case 4:
        if (view_id == 12) {
          return "查看&查询该表"
        }
        return "查看该表"
    }
  },

  choice_right_item: function (e) {
    var _this = this;
    var view_id = _this.data.view_id
    var index = e.currentTarget.dataset.index
    var is = e.currentTarget.dataset.is;

    var show = _this.data.show;
    for (var i = 0; i < show.length; i++) {
      if (show[i].view_id == view_id) {
        var newIs = is == 1 ? 0 : 1
        _this.setData({
          ["show[" + i + "].isUpd"]: true,
          ["show[" + i + "].is[" + index + "].is"]: newIs
        })
        var newIsArr = _this.data.show[i].is;
        var oldIs = show[i].old_is
        //只有是insert操作并且是选择了默认规则才能跳过比对
        if (show[i].caozuo == "insert" && show[i].isDefault) {
          return
        }
        if (_this.setIsUpd(newIsArr, oldIs)) {
          _this.setData({
            ["show[" + i + "].isUpd"]: false
          })
        }

        return;
      }
    }
  },






  setIsUpd: function (newarr, oldarr) {
    var num = 0
    for (var i = 0; i < newarr.length; i++) {
      if (newarr[i].is == oldarr[i]) {
        num++
      }
    }
    return false
  },




  sanchu: function () {
    var _this = this;
    if(_this.data.sheetqx5.Del=="1"){
    var id = _this.data.list[_this.data.dataset_input.index].id;
    wx.showModal({
      title: "提示",
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          var sql = "delete from users where id = '" + id + "'";

          wx.cloud.callFunction({
            name: 'sqlserver_xinyongka',
            data: {
              sql: sql
            },
            success: res => {
              wx.showToast({
                title: "删除成功",
                icon: "none"

              })
              _this.setData({
                handle:true,
                mask_hid:true
              })
              _this.init()
            },
            err: res => {
              wx.showToast({
                title: "错误",
                icon: "none"
              })
            }
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
    }else{
      wx.showToast({
        title: '无权限',
        icon: 'none',
      })
    }
  },

  

  changed: function (e) {
    var _this = this;
    var dataset = _this.data.dataset_input;
    var id = dataset.id;
    var column = dataset.column;
    var value = dataset.value;
    var index = dataset.index;
    var new_value = e.detail.value.new;
    if (!dataset.isupd) {
      return;
    }
    if (new_value != "" ) {
    var sql = "update users set " + column + " = '" + new_value + "' where id = '" + _this.data.list[index].id + "';"
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        wx.showToast({
          title: "修改成功",
          icon: "none"
        })
        _this.setData({
          input_hid: false,
          mask_hid: false,
          input_type: e.currentTarget.dataset.input_type,
          ["list[" + index + "]." + column]: new_value
        })
        _this.hid_view()
      },
      err: res => {
        wx.showToast({
          title: "错误",
          icon: "none"
        })
      }
    })
    } else {
      wx.showToast({
        title: "不能为空！",
        icon: "none"
      })
    }
  },









  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
  },

  inquire: function () {
    var _this = this;
    _this.setData({
      frmStudfind: false,
      mask_hid: false,
    })
  },






  ryqx: function () {
    var _this = this;
    if(_this.data.sheetqx5.Upd=="1"){
    _this.setData({
      quanxian: false,
    })
  }else{
      wx.showToast({
        title: '无权限',
        icon: 'none',
      })
  }
  },


  entering: function () {
    var _this = this;
    if(_this.data.sheetqx5.Add=="1"){
    _this.setData({
      addTable: false,
      mask_hid: false,
    })
    }else{
      wx.showToast({
        title: '无权限',
        icon: 'none',
      })
    }
  },

  inquire_QX: function () {
    var _this = this;
    _this.hid_view();
  },


  hid_view: function () {
    var _this = this;
    _this.setData({
      input_hid: true,
      frmStudfind: true,
      mask_hid: true,
      addTable: true,
      handle: true,
      details: true,
      addTable2: true,
      input_hid2: true,
      handle2: true,
      quanxian: true,
      empty: "",
      show: [],
      view_id: ''
    })
  },

  save: function (e) {
    var _this = this;
    _this.setData({
      name: e.detail.value.name,
    })
    _this.init();
    _this.setData({
      frmStudfind: true,
      mask_hid: true,
    })
  },






  qxsave: function () {
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    })
    var _this = this;
    var show = _this.data.show;
    if (show.length == 0) {
      wx.hideLoading({
        complete: (res) => {
          wx.navigateBack({
            delta: 2,
            complete: (res) => { },
          })
        },
      })
    }
    var id = _this.data.id;

    var sql = "";
    for (var i = 0; i < show.length; i++) {
      if (show[i].isUpd) {
        if (show[i].caozuo == "update") {
          sql = "update management set `add` = " + show[i].is[0].is + ",del = " + show[i].is[1].is + ",upd = " + show[i].is[2].is + ",sel = " + show[i].is[3].is + " where Uid=" + id + " and `Table` = " + show[i].view_id + ";"
          wx.cloud.callFunction ({
            name: 'sqlserver_xinyongka',
            data: {
              sql: sql
            },
            success: res => {
              console.log("success->", res)
            },
            fail: res => {
              console.log("fail->", res)
            },
            complete: res => {
              wx.hideLoading();
            }
          })
        }
      }
    }

    _this.inquire_QX();
  },







  add: function (e) {
    var _this = this;
    let sql1 = "select count(id) as count from users where company='" + _this.data.gongsi + "' and account='" + e.detail.value.zh +"'"
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql1
      },
      success: res => {
        if (res.result[0].count<=0){
          if (e.detail.value.zw != "" && e.detail.value.yg != "" && e.detail.value.zh != "" && e.detail.value.mm != "") {
            let sql = "insert into users(position,uname,account, password,company) values('" + e.detail.value.zw + "','" + e.detail.value.yg + "','" + e.detail.value.zh + "','" + e.detail.value.mm + "','" + _this.data.gongsi + "');"
            wx.cloud.callFunction({
              name: 'sqlserver_xinyongka',
              data: {
                sql: sql
              },
              success: res => {
                _this.setData({
                  id: res.result.insertId
                })
                _this.addquanxian();
                // wx.showToast({
                //   title: "添加成功！",
                //   icon: "none"
                // })
              },
              error: res => {
                console.log(res)
              },
              fail: res => {
                console.log(res)
              }
            })
            _this.setData({
              addTable: true,
              mask_hid: true,
            })
          }else{
            wx.showToast({
                  title: "所有填写项不能为空！",
                  icon: "none"
                })
          }
        }else{
          wx.showToast({
            title: "该账号已存在！",
            icon: "none"
          })
        }
      }
    })
    
  },

  addquanxian: function (e) {
    var _this = this;
    let sql = "insert into management(Uid,`Add`,Del,Upd, Sel,`Table`) values('" + _this.data.id + "','1','1','1','1','1'),('" + _this.data.id + "','1','1','1','1','2'),('" + _this.data.id + "','1','1','1','1','3'),('" + _this.data.id + "','1','1','1','1','4'),('" + _this.data.id + "','0','0','0','0','5');"
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
         wx.showToast({
           title: "添加成功！",
           icon: "none"
        })
      },
      error: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
    _this.init();
    _this.setData({
      addTable: true,
      mask_hid: true,
    })
  },
  



  init: function () {
    var _this = this;
    var name = _this.data.name.split("'").join("").trim();
    let sql = "select * from users  where uname like '%" + name + "%' and company='"+ _this.data.gongsi +"'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        console.log("select-success", res)
        _this.setData({
          list: res.result,
          name: "",
        })
      },
      fail: res => {
        console.log("select-fail", res)
      }
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var userInfo = JSON.parse(options.userInfo)
    var sheetqx5 = JSON.parse(options.sheetqx5)
    _this.setData({
      gongsi: userInfo.gongsi,
      uname: userInfo.uname,
      sheetqx5: sheetqx5,
    })
    _this.init();
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