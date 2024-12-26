
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    input_type: 'text',
    updatePicker: true,
    updateInput: false,
    newdata:"",
    list: [],
    list2: [],
    jibie:"",
    type: "",
    ckr: "",
    company: "",
    uname: "",
    sheetqx1:[],
    sheetqx2:[],
    empty: "",
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    type: [], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    getDate: function () {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1);
      var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
      return year + "-" + month + "-" + day
    },
    // title: [{ text: "序号", width: "100rpx", columnName: "rownum", type: "digit",isupd: true},
    //         { text: "级别名称", width: "200rpx", columnName: "jibie", type: "text",isupd: true},
    //         { text: "消费额度门槛",width: "200rpx",columnName: "menkan",type: "text",isupd: true},
    //         { text: "折扣比例", width: "200rpx", columnName: "bili", type: "text", isupd: true},
          
    //         ],
    title: [{ text: "序号", width: "100rpx", columnName: "rownum", type: "digit",isupd: true},
            { text: "级别名称", width: "200rpx", columnName: "jibie", type: "text",isupd: true},
            { text: "消费额度门槛",width: "310rpx",columnName: "menkan",type: "text",isupd: true},
            { text: "折扣比例", width: "200rpx", columnName: "bili", type: "text", isupd: true},
            
            ],

            title2: [{ text: "序号", width: "100rpx", columnName: "rownum", type: "digit",isupd: true},
            { text: "级别名称", width: "200rpx", columnName: "jibie", type: "text",isupd: true},
            { text: "消费额度门槛",width: "260rpx",columnName: "menkan",type: "text",isupd: true},
            { text: "折扣比例", width: "200rpx", columnName: "bili", type: "text", isupd: true},
          
            ],
    input_hid: true,
    frmStudfind: true,
    mask_hid: true,
    addTable: true,
    handle: true,
    details:true,
    addTable2: true,
    input_hid2: true,
    handle2: true,
    handle3:true,
  },


  clickView: function(e) {
    var _this = this;
    var dataset_input = e.currentTarget.dataset;
    console.log(dataset_input)
    if (!dataset_input.isupd) {
      return;
    }
    if (dataset_input.input_type=="date") {
      _this.setData({
        updatePicker: false,
        empty: dataset_input.value
      })
    }else{
      _this.setData({
        updatePicker: true,
        updateInput: false,
        empty: dataset_input.value
      })
    }
    if (dataset_input.column =="rownum") {
      _this.setData({
        dataset_input,
        handle: false,
        mask_hid: false,
      })
    }else{
    
    _this.setData({
      dataset_input,
      input_hid: false,
      mask_hid: false,
      input_type: e.currentTarget.dataset.input_type
    })
    }
  },

  clickView2: function (e) {
    var _this = this;
    var dataset_input = e.currentTarget.dataset;
    if (!dataset_input.isupd) {
      return;
    }
    if (dataset_input.column == "did") {
      _this.setData({
        dataset_input,
        input_hid2: true,
        handle2: false,
        mask_hid: false,
      })
    } else {
      if (_this.data.sheetqx2.Upd == "1" && dataset_input.column == "date_time") {
      _this.setData({
        dataset_input,
        updatePicker: false,
        input_hid2: false,
        handle2: true,
        mask_hid: false,
        input_type: e.currentTarget.dataset.input_type
      })
      } else if (_this.data.sheetqx2.Upd == "1" && dataset_input.column != "date_time"){
        _this.setData({
          dataset_input,
          updatePicker: true,
          input_hid2: false,
          handle2: true,
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



  xq_qx: function () {
    var _this = this;
    _this.setData({
      input_hid2: true,
      handle2: true,
    })
  },

  gengduo_show:function(){
    var _this = this;
    _this.setData({
      mask_hid:false,
      handle3:false
    })
  },




  xiangqing: function(e) {
    var _this = this;
    if(_this.data.sheetqx2.Sel=="1"){
    _this.setData({
      details: false,
      mask_hid: false,
      handle:true
    })
    _this.init2()
    }else{
      wx.showToast({
        title: '无权限',
        icon: 'none',
      })
    }
  },

  sanchu:function() {
    var _this = this;
    var id = _this.data.list[_this.data.dataset_input.index].id;
    wx.showModal({
      title: "提示",
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          var sql = "delete from member_jibie where id = '" + id + "';";
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
                handle: true,
                mask_hid: true
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
    if (new_value != "" || column == "jibie"
      || column == "menkan" || column == "bili"){
    var sql = "update member_jibie set " + column + " = '" + new_value + "' where id='" + _this.data.list[index].id + "';"
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
          ["list[" + index + "]." + column]: new_value,
          new: ""
        })
        _this.init();
        _this.hid_view()
      },
      err: res => {
        wx.showToast({
          title: "错误",
          icon: "none"
        })
      }
    })
      }else{
      wx.showToast({
        title: "不能为空！",
        icon: "none"
      })
      }
  },


  choiceDate: function(e){
    //e.preventDefault(); 
    this.setData({
      [e.currentTarget.dataset.column_name]: e.detail.value
    })
  },

  inquire: function() {
    var _this = this;
    _this.setData({
      frmStudfind: false,
      mask_hid: false,
    })
  },


  entering: function() {
    var _this = this;
    _this.setData({
      addTable: false,
      mask_hid: false,
    })
  },


  luru: function () {
    var _this = this;
    _this.setData({
      addTable2: false,
      mask_hid: false,
    })
  },

  inquire_QX: function() {
    var _this = this;
    _this.hid_view();
  },


  hid_view: function() {
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
      handle3:true,
      empty:"",
      zdr:"",
      hkr:""
    })
  },

  save: function(e) {
    var _this = this;
    _this.setData({
      jibie: e.detail.value.jibie,
    })
    _this.init();
    _this.setData({
      frmStudfind: true,
      mask_hid: true,
      empty:"",
      zdr:"",
      hkr:""
    })
  },

  add: function(e) {
    var _this = this;
    //console.log(e.detail.value.skr,)
    //_this.setData({
    // skr: e.detail.value.skr,
    // fkr: e.detail.value.fkr,
    // ckr: e.detail.value.ckr,
    // fkh: e.detail.value.fkh,
    // zdr: e.detail.value.zdr,
    // hkr: e.detail.value.hkr,
    // zje: e.detail.value.zje,
    // ysk: e.detail.value.ysk,
    // yke: e.detail.value.yke,
    // jke: e.detail.value.jke,
    // sxf: e.detail.value.sxf,
    // dhh: e.detail.value.dhh,
    // mm: e.detail.value.mm,
    // yh: e.detail.value.yh
    //})
    if(e.detail.value.bili==""){
      e.detail.value.bili =0
    }
    if (e.detail.value.yhk == "") {
      e.detail.value.yhk = 0
    }
    if (e.detail.value.yke == "") {
      e.detail.value.yke = 0
    }
    if (e.detail.value.jke == "") {
      e.detail.value.jke = 0
    }
    if (e.detail.value.sxf == "") {
      e.detail.value.sxf = 0
    }
    if (e.detail.value.jibie !="" && e.detail.value.menkan != "" && e.detail.value.bili != "" ){
    let sql = "insert into member_jibie(company,jibie,menkan,bili) values('" + _this.data.company + "','" +
      e.detail.value.jibie + "','" + e.detail.value.menkan + "','" + e.detail.value.bili + "')"
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
        _this.init();
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
      empty:"",
      zdr:"",
      hkr:""
    })
    }else{
      wx.showToast({
        title: "前六项不能为空！",
        icon:"none"
      })
    }
  },



  init: function() {
    var _this = this;
    let sql = "select * from member_jibie where jibie like '%" + _this.data.jibie + "%' and company='"+ _this.data.company +"'"
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
          product_name: "",
          type: "",
        })
      },
      fail: res=> {
        console.log("select-fail",res)
      }
    })
  },
    






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var userInfo = JSON.parse(options.userInfo)
     _this.setData({
       company: userInfo.company,
       uname: userInfo.uname,
     })
    console.log(userInfo)
    _this.init();
  },

  choice_checkBox: function(e) {
    var _this = this;
    var value = e.detail.value
    var index = e.currentTarget.dataset.index;
    var checkItems = _this.data.checkItems;
    if (value != "") {
      checkItems.push(index)
    } else {
      for (let i = 0; i < checkItems.length; i++) {
        if (checkItems[i] == index) {
          checkItems.splice(i, 1)
        }
      }
    }
    _this.setData({
      checkItems
    })
  },

  use_book:function(){
    wx.showModal({
      title: '使用说明',
      content: '1.点击查询按钮，输入条件点击确定即可查询。\n2.点击录入按钮，输入内容点击确定即可录入。\n3.点击序号，在弹出的窗口点击删除按钮即可删除。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  get_excel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list2;
    var title = [{ text: "序号", width: "100rpx", columnName: "id", type: "digit", isupd: true },
    { text: "级别名称", width: "250rpx", columnName: "jibie", type: "text", isupd: true },
    { text: "消费额度门槛", width: "260rpx", columnName: "menkan", type: "text", isupd: true },
    { text: "折扣比例", width: "400rpx", columnName: "bili", type: "text", isupd: true },
    
    ]
    var cloudList = {
      name: '会员等级',
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

  getExcel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list;
    var title = [
      { text: "级别名称", width: "200rpx", columnName: "jibie", type: "text",isupd: true},
      { text: "消费额度门槛",width: "400rpx",columnName: "menkan",type: "text",isupd: true},
      { text: "折扣比例", width: "200rpx", columnName: "bili", type: "text", isupd: true},
      
    ]
    var cloudList = {
      name: '会员等级',
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})