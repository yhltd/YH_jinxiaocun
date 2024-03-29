// -// miniprogram/pages/frmadminform/frmadminform.js

var util = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: 'lock',
        value: '锁定'
      },
      {
        name: 'unlock',
        value: '正常',
        checked: 'true'
      },

    ],
    itemsyesno: [{
        name: 'lock',
        value: '是'
      },
      {
        name: 'unlock',
        value: '否',
        checked: 'true'
      },

    ],
    AdminIS: 'false',
    Btype: '正常',
    jigoudaima: null,
    gongsi: null,
    Createdate_i: "",
    companyName: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var time = util.formatTime(new Date());
    this.setData({
      Createdate_i: time,
      companyName : app.globalData.gongsi
    });
    console.log(that.data.Createdate_i)
    console.log("公司名称："+that.data.companyName)
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

  },
  //事件处理函数
  searchBox: function(e) {
    // wx.showToast({
    //   title: 'jj' ,
    //   icon: 'success',
    //   duration: 2000
    // }) 
    const that = this;
    var gongsi, uname, pass, pass2, AdminIS, Btype, Createdate, jigoudaima,AdminIS,Btype;
    uname = e.detail.value.username,
      pass = e.detail.value.pwd,
      pass2 = e.detail.value.pwd2,
      gongsi = e.detail.value.gongsi,
      AdminIS = that.data.AdminIS
      Btype = that.data.Btype
      // jigoudaima = e.detail.value.jigoudaima
    if (pass2 != pass) {
      wx.showToast({
        title: '两次密码不一致，请修改',
        // icon: 'success',
        duration: 2000
      })
      return
    }
    if (uname == "" || pass == "") {
      wx.showToast({
        title: '数据不能为空！',
        // icon: 'success',
        duration: 2000
      })
      return
    }
    if (AdminIS == "") {
      wx.showToast({
        title: '请选择该账号是否为管理员',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (Btype == "") {
      wx.showToast({
        title: '请选择该账号状态',
        icon: 'none',
        duration: 2000
      })
      return
    }
    //保存密码
    var time = util.formatTime(new Date());

    const db = wx.cloud.database();


    console.log(that.data.Btype)
    // db.collection("Yh_JinXiaoCun_user").add({
    //   data: {
    //     gongsi:gongsi,
    //     name: uname,
    //     password: pass,
    //     AdminIS: that.data.AdminIS,
    //     Btype: that.data.Btype,
    //     jigoudaima: jigoudaima,
    //     Createdate: time
    //   },
    // });
    // wx.showToast({
    //   title: '创建成功，请返回',
    //   icon: 'success',
    //   duration: 3000
    // })

    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "insert into yh_jinxiaocun_user (gongsi,_id,name,password,AdminIS,Btype,Createdate)VALUES('" + gongsi + "','"+ uname +"','" + uname + "','" + pass + "','" + that.data.AdminIS + "','" + that.data.Btype + "','" + time + "')"
      },
      success(res) {
        console.log("成功")
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 3000
        },wx.navigateBack({
          delta: 1
        }))
      },
      fail(res) {
        console.log("失败", res)
      }
    });

  },

  btcanel: function() {
    wx.navigateBack({

    })
  },

  radioChange(e) {
    var that = this;
    console.log('2radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
        Btype: e.detail.value
      },
      console.log(this.data.Btype)
    );
  },
  AdminISradioChange(e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    var this_ = this
    console.log(e.detail.value)
    if (e.detail.value=='lock'){
      this.setData({
        AdminIS: 'true'
      });
    }else{
      this.setData({
        AdminIS: 'false'
      });
    }
    
    console.log(this_.data.AdminIS)
  }
})