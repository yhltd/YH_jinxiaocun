
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
    skr:"",
    fkr: "",
    ckr: "",
    gongsi: "",
    uname: "",
    sheetqx1:[],
    sheetqx2:[],
    empty: "",
    getDate: function () {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1);
      var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
      return year + "-" + month + "-" + day
    },
    title: [{ text: "序号", width: "100rpx", columnName: "rownum", type: "digit",isupd: true},
            { text: "收卡人", width: "200rpx", columnName: "recipient", type: "text",isupd: true},
            { text: "付款人",width: "300rpx",columnName: "cardholder",type: "text",isupd: true},
            { text: "持卡人", width: "250rpx", columnName: "drawee", type: "text", isupd: true},
            { text: "发卡行", width: "250rpx", columnName: "issuing_bank", type: "text", isupd: true},
            { text: "账单日", width: "200rpx", columnName: "bill_day", type: "date", isupd: true},
            { text: "还款日", width: "250rpx", columnName: "repayment_date", type: "date", isupd: true},
      { text: "总金额", width: "250rpx", columnName: "total", type: "digit", isupd: true},
      { text: "应还款", width: "250rpx", columnName: "repayable", type: "digit", isupd: true},
      { text: "剩余金额", width: "250rpx", columnName: "balance", type: "digit", isupd: true},
      { text: "借款金额", width: "250rpx", columnName: "loan", type: "digit", isupd: true},
      { text: "手续费", width: "250rpx", columnName: "service_charge", type: "digit", isupd: true},
      { text: "电话号", width: "250rpx", columnName: "telephone", type: "digit", isupd: true},
            { text: "密码", width: "250rpx", columnName: "password", isupd: true},
            { text: "员工", width: "250rpx", columnName: "staff", isupd: true},
            ],

    title2: [{ text: "编号", width: "100rpx", columnName: "did", type: "digit", isupd: true },
              { text: "日期", width: "200rpx", columnName: "date_time", type: "text", isupd: true },
              { text: "已还款", width: "300rpx", columnName: "repayment", type: "text", isupd: true },
              { text: "商户", width: "250rpx", columnName: "commercial_tenant", type: "text", isupd: true },
              { text: "刷卡额", width: "250rpx", columnName: "swipe", type: "text", isupd: true },
              { text: "费率", width: "200rpx", columnName: "rate", type: "date", isupd: true },
              { text: "到账金额", width: "250rpx", columnName: "arrival_amount", type: "date", isupd: true },
      { text: "基础手续费", width: "250rpx", columnName: "basics_service_charge", type: "digit", isupd: true },
      { text: "其他手续费", width: "250rpx", columnName: "other_service_charge", type: "digit", isupd: true },
              
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
  },


  clickView: function(e) {
    var _this = this;
    var dataset_input = e.currentTarget.dataset;
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
      if (_this.data.sheetqx1.Upd == "1") {
    _this.setData({
      dataset_input,
      input_hid: false,
      mask_hid: false,
      input_type: e.currentTarget.dataset.input_type
    })
      } else {
        wx.showToast({
          title: '无权限',
          icon: 'none',
        })
      }
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
    if (_this.data.sheetqx1.Del == "1") {
    var id = _this.data.list[_this.data.dataset_input.index].id;
    wx.showModal({
      title: "提示",
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          var sql = "delete from customer where id = '" + id + "';";
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
          var sql = "delete from day_trading where id = '" + id + "'";
          wx.cloud.callFunction({
            name: 'sqlserver_xinyongka',
            data: {
              sql: sql
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

  sanchu2: function () {
    var _this = this;
    if (_this.data.sheetqx1.Del == "1") {
    var did = _this.data.list2[_this.data.dataset_input.index].did;
    wx.showModal({
      title: "提示",
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          var sql = "delete from day_trading where did = '" + did + "'";
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
              _this.hid_view()
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
    } else {
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
    if (new_value != "" || column == "telephone"
      || column == "password" || column == "staff"){
    var sql = "update customer set " + column + " = '" + new_value + "' where id = '" + _this.data.list[index].id + "';"
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





  changed2: function (e) {
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
    if (new_value!=""){
    var sql = "update day_trading set " + column + " = '" + new_value + "' where did = '" + _this.data.list2[index].did + "';"
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
          ["list2[" + index + "]." + column]: new_value
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
    if(_this.data.sheetqx1.Add=="1"){
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


  luru: function () {
    var _this = this;
   if( _this.data.sheetqx2.Add=="1"){
    _this.setData({
      addTable2: false,
      mask_hid: false,
    })
   }else{
     wx.showToast({
       title: '无权限',
       icon: 'none',
     })
   }
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
      empty:"",
      zdr:"",
      hkr:""
    })
  },

  save: function(e) {
    var _this = this;
    _this.setData({
      skr: e.detail.value.skr,
      fkr: e.detail.value.fkr,
      ckr: e.detail.value.ckr
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
    if(e.detail.value.zje==""){
      e.detail.value.zje =0
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
    if (e.detail.value.skr !="" && e.detail.value.fkr != "" && e.detail.value.ckr != "" && e.detail.value.fkh != "" && e.detail.value.zdr != "" && e.detail.value.hkr != "" && e.detail.value.zje != "" && e.detail.value.yhk != "" && e.detail.value.yke != "" && e.detail.value.jke != "" && e.detail.value.sxf !=""){
    let sql = "insert into customer(recipient, cardholder, drawee, issuing_bank, bill_day, repayment_date, total, repayable, balance, loan, service_charge, telephone, password, staff,gongsi) values('" + e.detail.value.skr + "','" +
      e.detail.value.fkr + "','" + e.detail.value.ckr + "','" + e.detail.value.fkh + "','" +
      e.detail.value.zdr + "','" + e.detail.value.hkr + "'," +
      parseInt(e.detail.value.zje) + "," + parseInt(e.detail.value.yhk) + "," + parseInt(e.detail.value.yke) + "," +
      parseInt(e.detail.value.jke) + "," + parseInt(e.detail.value.sxf) + ",'" + e.detail.value.dhh + "','" + e.detail.value.mm + "','" + e.detail.value.yg + "','" + _this.data.gongsi + "')"
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


  add2: function (e) {
    if (e.detail.value.yhje != "" && e.detail.value.sh != "" && e.detail.value.ske != "" && e.detail.value.fl != "" && e.detail.value.dzje != "" && e.detail.value.jcsxf != "" && e.detail.value.qtsxf != "" ){
    var _this = this;
    var id = _this.data.list[_this.data.dataset_input.index].id;
    var now_time = _this.data.getDate();
    let sql = "insert into day_trading(id,date_time,repayment,commercial_tenant,swipe,rate,arrival_amount,basics_service_charge,other_service_charge,gongsi) values('" + id + "','" +
      now_time + "','" + e.detail.value.yhje + "','" + e.detail.value.sh + "','" +
      e.detail.value.ske + "','" + e.detail.value.fl + "','" +
      e.detail.value.dzje + "','" + e.detail.value.jcsxf + "','" + e.detail.value.qtsxf + "','" + _this.data.gongsi + "')"
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
    _this.hid_view();
    _this.setData({
      addTable2: true,
      mask_hid: true,
      empty:"",
      zdr:"",
      hkr:""
    })
    }else{
      wx.showToast({
        title: "必填项不能为空！",
        icon: "none"
      })
    }
  },



  init: function() {
    var _this = this;
    var skr = _this.data.skr.split("'").join("").trim();
    var fkr = _this.data.fkr.split("'").join("").trim();
    var ckr = _this.data.ckr.split("'").join("").trim();
    let sql = "select * from customer  where recipient like '%" + skr + "%' and cardholder like '%" + fkr + "%' and drawee like '%" + ckr + "%' and gongsi='"+ _this.data.gongsi +"'"
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
          skr: "",
          fkr: "",
          ckr: "",
        })
      },
      fail: res=> {
        console.log("select-fail",res)
      }
    })
  },
    init2: function () {
      var _this = this;
      var id = _this.data.list[_this.data.dataset_input.index].id;
      let sql = "select * from day_trading right join customer on customer.id = day_trading.id where customer.id='" + id + "' and day_trading.gongsi='" + _this.data.gongsi +"'"
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlserver_xinyongka',
        data: {
          sql: sql
        },
        success: res => {
          console.log("select-success", res)
          _this.setData({
            list2: res.result,
            skr: "",
            fkr: "",
            ckr: "",
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
  onLoad: function(options) {
    var _this = this;
    var userInfo = JSON.parse(options.userInfo)
    var sheetqx1 = JSON.parse(options.sheetqx1)
    var sheetqx2 = JSON.parse(options.sheetqx2)
     _this.setData({
       gongsi: userInfo.gongsi,
       uname: userInfo.uname,
       sheetqx1: sheetqx1,
       sheetqx2: sheetqx2,
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