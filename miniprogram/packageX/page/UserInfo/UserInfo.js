// miniprogram/packageX/page/UserInfo/UserInfo.js
const app = getApp();
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
    { text: "绑定微信", width: "250rpx", columnName: "wechart_user2", type: "text", isupd: true },
    ],
    views: [
      {
        image_url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/rili.png",
        index: 1,
        text: "客户信息",
        function: [0, 1, 2, 3]
      }, {
        image_url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/renyuanxinxiguanli.png",
        index: 2,
        text: "日交易记录",
        function: [-1, -1, -1, 3]
      }, {
        image_url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/baopan.png",
        index: 3,
        text: "月交易记录",
        function: [-1, -1, -1, 3]
      }, {
        image_url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/shezhi.png",
        index: 4,
        text: "统计交易金额",
        function: [-1, -1, -1, 3]
      }, {
        image_url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gerenxinxi.png",
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
    handle3:true,
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
    }else if(dataset_input.column == "wechart_user2"){
      var list = _this.data.list
      var index = e.currentTarget.dataset.index
      wx.showModal({
        title: '提示',
        content: '是否使用当前微信绑定此账号？',
        success: function(res) {
          if (res.confirm) {
            var this_id = wx.getStorageSync('openid')
            console.log(this_id)
            wx.login({
              success: (res) => {
                  console.log(res);
                  _this.setData({
                      wxCode: res.code,
                  })
                  let m_code = _this.data.wxCode; // 获取code
                  let m_AppId = app.globalData.this_id1 + app.globalData.this_id2 + app.globalData.this_id3 ;
                  let m_mi =  app.globalData.sec_dd1 + app.globalData.sec_dd2 + app.globalData.sec_dd3;
                  console.log("m_code:" + m_code);
                  let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + m_AppId + "&secret=" + m_mi + "&js_code=" + m_code + "&grant_type=authorization_code";
                  wx.request({
                      url: url,
                      success: (res) => {
                          console.log(res);
                          _this.setData({
                              wxOpenId: res.data.openid
                          })
                          //获取到你的openid
                          console.log("====openID=======");
                          console.log(_this.data.wxOpenId);
                          var sql = "update users set wechart_user = '" + _this.data.wxOpenId + "' where id=" +  list[index].id
                          console.log(sql)
                          wx.cloud.callFunction({
                            name: 'sqlserver_xinyongka',
                            data:{
                              sql : sql
                            },
                            success(res){
                              console.log(res)
                              wx.showToast({
                                title: '绑定成功',
                                icon:"none"
                              })
                              _this.init();
                            }
                          })
                      }
                  })
              }
          })
          }
        }
      })
    }
     else {
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

  jiebang:function(e){
    var _this = this
    var list = _this.data.list
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '是否解除此账号的微信绑定？',
      success: function(res) {
        if (res.confirm) {
          var sql = "update users set wechart_user = '' where id=" +  list[index].id 
          console.log(sql)
          wx.cloud.callFunction({
            name: 'sqlserver_xinyongka',
            data:{
              sql : sql
            },
            success(res){
              console.log(res)
              wx.showToast({
                title: '解绑成功',
                icon:"none"
              })
              _this.init()
            }
          })
        }
      }
    })
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
      var userNum = app.globalData.userNum
      console.log(userNum)
      if(userNum != undefined && userNum != null){
        if(userNum != ""){
          var sql = "select count(id) as id from users where company = '" + _this.data.gongsi + "'"
          wx.cloud.callFunction({
            name: 'sqlserver_xinyongka',
            data: {
              sql: sql
            },
            success: res => {
              if(res.result[0].id * 1 >= userNum * 1){
                wx.showToast({
                  title: '已有账号数量过多，请删除无用账号后再试！',
                  icon: 'none'
                })
              }else{
                _this.setData({
                  addTable: false,
                  mask_hid: false,
                })
              }
            },
            error: res => {
              console.log(res)
            },
            fail: res => {
              console.log(res)
            }
          })
        }else{
          _this.setData({
            addTable: false,
            mask_hid: false,
          })
        }
      }else{
        _this.setData({
          addTable: false,
          mask_hid: false,
        })
      }
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
      handle3:true,
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
    let sql = "select *,case when ifnull(wechart_user,'') = '' then '未绑定' else '已绑定' end as wechart_user2 from users  where uname like '%" + name + "%' and company='"+ _this.data.gongsi +"'"
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

  use_book:function(){
    wx.showModal({
      title: '使用说明',
      content: '1.点击查询按钮，输入条件点击确定即可查询。\n2.点击录入按钮，输入对应信息后点击确定按钮即可添加信息。\n3.点击已有数据的序号，在弹出的窗口中点击删除按钮即可删除。\n4.点击已有数据的序号，在弹出的窗口中点击权限按钮，选择对应页面配置权限后点击保存按钮即可修改权限。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  gengduo_show:function(){
    var _this = this;
    _this.setData({
      mask_hid:false,
      handle3:false
    })
  },

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