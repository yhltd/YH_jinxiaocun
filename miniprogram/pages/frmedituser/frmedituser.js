// -// miniprogram/pages/frmadminform/frmadminform.js
var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
      name: '锁定',
      value: '锁定'
    },
    {
      name: '正常',
      value: '正常',
      checked: 'true'
    },

    ],
    itemsyesno: [{
      name: '是',
      value: '是'
    },
    {
      name: '否',
      value: '否'
      // checked: 'true'
    },

    ],
    listAll: [],
    AdminIS: '',
    Btype: '',
    jigoudaima: '',
    Createdate_i: "",
    editid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // app.editTabBar1(); //底部栏
    var time = util.formatTime(new Date());

    this.setData({
      Createdate_i: time,
      editid: options._id
    });
    //chazhao xinxi 
    const db = wx.cloud.database();
    // var listAll = [];
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi 
    
    db.collection('Yh_JinXiaoCun_user').doc(this.data.editid).get({
      success(res) {
        //  listAll.push(res.data)
        that.setData({
          // listAll: listAll[0]
          listAll: res.data,
          // AdminIS: listAll.AdminIS,
          // Btype: listAll.Btype
        },
          // res.data 包含该记录的数据

          console.log(that.data.listAll)
        )
      }
    })

    // console.log(this.data.editid)
    // console.log(that.data.Createdate_i)
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

  },
  //事件处理函数
  searchBox: function (e) {
    // wx.showToast({
    //   title: 'jj' ,
    //   icon: 'success',
    //   duration: 2000
    // }) 
    const that = this;
    var uname, pass, pass2, AdminIS, Btype, Createdate, jigoudaima;
    uname = e.detail.value.username,
      pass = e.detail.value.pwd,
      pass2 = e.detail.value.pwd2,
    gongsi = e.detail.value.gongsi
      jigoudaima = e.detail.value.jigoudaima
    if (pass2 != pass) {
      wx.showToast({
        title: '两次密码不一致，请修改',
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (uname == "" || pass == "") {
      wx.showToast({
        title: '数据不能为空！',
        icon: 'success',
        duration: 2000
      })
      return
    }
    //保存密码
    var time = util.formatTime(new Date());

    const db = wx.cloud.database();
    db.collection('Yh_JinXiaoCun_user').where({

      name: uname
    })
      .get({
        success(res) {

          db.collection('Yh_JinXiaoCun_user').doc(res.data[0]._id).update({
            // data 传入需要局部更新的数据
            data: {
              name: uname,
              password: pass,
              AdminIS: that.data.AdminIS,
              Btype: that.data.Btype,
              gongsi:gongsi,
              jigoudaima: jigoudaima,
              Createdate: time
            },
            success: res => {
              wx.showToast({
                title: '更新完成',
              })
            },
          })
        }
      }),
      console.log(pass)


  },

  btcanel: function () {
    wx.navigateBack({

    })
  },
  btipdate: function () {
    const db = wx.cloud.database();
    console.log(1)
    db.collection('Yh_JinXiaoCun_user').doc('XJuFPYnnuWjci0CF').update({
      data: {
        AdminIS: 'no',
      },
    })
    console.log(2)
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
    var that = this;
    console.log('1radio发生change事件，携带value值为：', e.detail.value)

    that.setData({
      AdminIS: e.detail.value

    },
      console.log(that.data.AdminIS),
      console.log(e.detail.value)
    );
  }
})