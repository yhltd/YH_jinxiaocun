// package_tb3999803/pages/dianmiandingdan/dianmiandingdan.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  tjShow: false,
  xgShow: false,
  cxShow: false,
  data: {
    jd_type: ['意向', '初算','预约量尺','改方案','算报价','定稿','拆单上传','进料','送货','安装','补货','暂停','验收','完工'],
    list: [],
    title: [{
      text: "客户名称",
      width: "350rpx",
      columnName: "khmc",
      type: "text",
      isupd: true
    },{
      text: "终端用户",
      width: "350rpx",
      columnName: "zdyh",
      type: "text",
      isupd: true
    }, {
      text: "进度",
      width: "270rpx",
      columnName: "jd",
      type: "text",
      isupd: true
    }, {
      text: "备注",
      width: "400rpx",
      columnName: "bz",
      type: "text",
      isupd: true
    }, {
      text: "项目负责",
      width: "270rpx",
      columnName: "xmfz",
      type: "text",
      isupd: true
    }, {
      text: "联系方式",
      width: "300rpx",
      columnName: "lxfs",
      type: "text",
      isupd: true
    }, {
      text: "订单属性",
      width: "230rpx",
      columnName: "ddsx",
      type: "text",
      isupd: true
    }, {
      text: "订单号",
      width: "350rpx",
      columnName: "ddh",
      type: "text",
      isupd: true
    },
  ],
  id: '',
  khmc: '',
  zdyh: '',
  jd: '',
  bz: '',
  xmfz: '',
  lxfs: '',
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
    var e = ['','','']
    _this.tableShow(e)
  },

  bindPickerChange2: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.jd_type[e.detail.value]
    })
  },
      
  // choiceDate: function (e) {
  //   _this.setData({
  //     [e.target.dataset.column_name]: e.detail.value
  //   })
  //   console.log(e.detail.value)
  // },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    sql = "select * from dianmiandingdan where khmc like '%" + e[0] + "%' and bz like '%" + e[1] + "%' and lxfs like '%" + e[2] + "%'"
    var userInfo = _this.data.userInfo
    if (userInfo.quanxian == '客户') {
      // sql = sql + " where khmc like '" + userInfo.name + "'"
      sql = "select * from dianmiandingdan where khmc like '" + userInfo.name + "' and bz like '%" + e[1] + "%' and lxfs like '%" + e[2] + "%'"
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
        var list = res.result.recordset
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

  upd1: function () {
    var _this = this
      var sql = ""
      var userInfo = _this.data.userInfo
      sql= "update dianmiandingdan set khmc='" + _this.data.khmc + "',zdyh='" + _this.data.zdyh + "',jd='" + _this.data.jd + "',bz='" + _this.data.bz + "',xmfz='" + _this.data.xmfz + "',lxfs='" + _this.data.lxfs + "' where id=" + _this.data.id
      if (userInfo.quanxian == '客户') {
        sql="update dianmiandingdan set khmc='" + userInfo.name + "',zdyh='" + _this.data.zdyh + "',jd='" + _this.data.jd + "',bz='" + _this.data.bz + "',xmfz='" + _this.data.xmfz + "',lxfs='" + _this.data.lxfs + "' where id=" + _this.data.id
        }
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',

      data: {
        // query: "update dianmiandingdan set khmc='" + _this.data.khmc + "',zdyh='" + _this.data.zdyh + "',jd='" + _this.data.jd + "',bz='" + _this.data.bz + "',xmfz='" + _this.data.xmfz + "',lxfs='" + _this.data.lxfs + "' where id=" + _this.data.id
        query: sql
      },
      success: res => {
        _this.setData({
          id: '',
          khmc: '',
          zdyh: '',
          jd: '',
          bz: '',
          xmfz: '',
          lxfs: '',
        })
        _this.qxShow()
        var e = ['','','']
        _this.tableShow(e)

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
      khmc: _this.data.list[e.currentTarget.dataset.index].khmc,
      zdyh: _this.data.list[e.currentTarget.dataset.index].zdyh,
      jd: _this.data.list[e.currentTarget.dataset.index].jd,
      bz: _this.data.list[e.currentTarget.dataset.index].bz,
      xmfz: _this.data.list[e.currentTarget.dataset.index].xmfz,
      lxfs: _this.data.list[e.currentTarget.dataset.index].lxfs,
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
              query: "delete from dianmiandingdan where id='" + _this.data.id + "'"
            },
            success: res => {
              console.log(res)
              _this.setData({
                id: '',
                khmc: '',
                zdyh: '',
                jd: '',
                bz: '',
                xmfz: '',
                lxfs: '',
              })
              _this.qxShow()
              var e = ['','','']
              _this.tableShow(e)
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
    
  goto_buhuo: function(e){
    var _this = this

    var index1 = e.currentTarget.dataset.index
    var jd = _this.data.list[index1].jd
    console.log(jd)
    if (jd=='补货'){
    wx.showModal({
      title: "提示",
      content: '是否跳转至补货下料单？',
      cancelColor: '#282B33',
      confirmColor: '#BC4A4A',
      success: res => {
        if (res.confirm) { 
          var index = e.currentTarget.dataset.index
          var khmc = _this.data.list[index].khmc
          var ddh = _this.data.list[index].ddh
          var zdyh = _this.data.list[index].zdyh
          console.log(ddh)
          wx.navigateTo({
            url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&ddh='+ ddh +'&khmc='+khmc +'&zdyh='+zdyh,
           
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      cxShow: false,
      xgShow: false,
    })
  },

  inquire: function () {
    var _this = this
    var userInfo = _this.data.userInfo
    _this.setData({
      tjShow: true,
      id: '',
      khmc: '',
      zdyh: '',
      jd: '',
      bz: '',
      xmfz: '',
      lxfs: '',
      ddsx: '',
      ddh: '',
    })
    if(userInfo.quanxian == '客户'){
      _this.setData({
        khmc: userInfo.name,
        panduan_khmc:true,
      })
    }
  },

  add1: function () {
    var _this = this

    if (_this.data.khmc == '') {
      wx.showToast({
        title: '请输入客户名称！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if (_this.data.zdyh == '') {
      wx.showToast({
        title: '请输入终端用户！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if (_this.data.jd == '') {
      wx.showToast({
        title: '请选择进度！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.bz == '') {
      wx.showToast({
        title: '请输入备注！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.xmfz == '') {
      wx.showToast({
        title: '请输入项目负责！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.lxfs == '') {
      wx.showToast({
        title: '请输入联系方式！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.ddsx == '') {
      wx.showToast({
        title: '请输入订单属性！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.ddh == '') {
      wx.showToast({
        title: '请输入订单号！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    var sql = ""
    var userInfo = _this.data.userInfo
    sql="insert into dianmiandingdan(khmc,zdyh,jd,bz,xmfz,lxfs,ddsx,ddh) values('" + _this.data.khmc + "','" + _this.data.zdyh + "','" + _this.data.jd + "','" + _this.data.bz + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.ddsx + "','" + _this.data.ddh + "')"
    if (userInfo.quanxian == '客户') {
      sql="insert into dianmiandingdan(khmc,zdyh,jd,bz,xmfz,lxfs,ddsx,ddh) values('" + userInfo.name + "','" + _this.data.zdyh + "','" + _this.data.jd + "','" + _this.data.bz + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.ddsx + "','" + _this.data.ddh + "')"
      }
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        // query: "insert into dianmiandingdan(khmc,zdyh,jd,bz,xmfz,lxfs,ddsx,ddh) values('" + _this.data.khmc + "','" + _this.data.zdyh + "','" + _this.data.jd + "','" + _this.data.bz + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.ddsx + "','" + _this.data.ddh + "')"
        query: sql
      },
      success: res => {
        console.log(res)
        _this.setData({
          id: '',
          khmc: '',
          zdyh: '',
          jd: '',
          bz: '',
          xmfz: '',
          lxfs: '',
          ddsx: '',
          ddh: '',
        })
        var e = ['', '','']
        _this.qxShow()
        _this.tableShow(e)
        wx.showToast({
          title: '添加成功！',
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

  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      khmc: "",
      bz: "",
      lxfs: "",
    })
  },

  sel1: function () {
    var _this = this
    var e = [_this.data.khmc,_this.data.bz, _this.data.lxfs]
    _this.tableShow(e)
    _this.qxShow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var _this = this
    var e = ['', '','']
    _this.tableShow(e)
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