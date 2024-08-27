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
    shuxing_type: ['整体订单','全屋整装','整体代工','整体贴牌','整体批货','挂靠代工','单项代工','单项批货'],
    index:0,
    list: [],
    title: [{
      text: "客户名称",
      width: "350rpx",
      columnName: "customerName",
      type: "text",
      isupd: true
    },{
      text: "终端用户",
      width: "350rpx",
      columnName: "user",
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
      columnName: "beizhu1",
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
      columnName: "shuxing",
      type: "text",
      isupd: true
    }, {
      text: "订单号",
      width: "350rpx",
      columnName: "productionNO",
      type: "text",
      isupd: true
    },
  ],
  id: '',
  customerName: '',
  user: '',
  jd: '',
  beizhu1: '',
  xmfz: '',
  lxfs: '',
  shuxing:'',
  productionNO:''
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
    console.log(e),
  this.setData({
    index:e.detail.value
  })
  if(this.data.index==6){
    wx.showToast({
      title: '该订单下单至工厂拆单处，请检查文件并传送！',
      icon: 'none'
    })
  }
  if(this.data.index==7){
    wx.showToast({
      title: '请核对原料数量及材料，便利正常生产！',
      icon: 'none'
    })
  }
    _this.setData({
      [e.target.dataset.column_name]: _this.data.jd_type[e.detail.value]
    })
  },
  bindPickerChange3: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.shuxing_type[e.detail.value]
    })
  },
      
  choiceDate: function (e) {
    _this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    var userInfo = _this.data.userInfo
    if(userInfo.quanxian=="客户"){
      sql = "select customerName,[user],jd,beizhu1,xmfz,lxfs,shuxing,productionNO,id from madeOrder where customerName='"+userInfo.name+"'and beizhu1 like'%"+e[1]+"%' and lxfs like '%"+e[2]+"%'"
    }else{
      sql = "select customerName,[user],jd,beizhu1,xmfz,lxfs,shuxing,productionNO,id from madeOrder where customerName like'%"+e[0]+"%' and beizhu1 like'%"+e[1]+"%' and lxfs like '%"+e[2]+"%'"
    }
    
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        var max_page = Math.ceil(list.length * 1 / 50)
        var list_new = []
        for(var i=0; i<49; i++){
          if(i < list.length){
            list_new.push(list[i])
          }
        }
        _this.setData({
          this_page:1,
          list_all: list,
          list: list_new,
          max_page
        })
      
        console.log(list)
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

  page_down_click:function(){
    var _this = this
    var this_page = _this.data.this_page
    var max_page = _this.data.max_page

    this_page = this_page - 1
    if(this_page < 1){
      wx.showToast({
        title: '已经是第一页',
        icon: 'none'
      })
      return;
    }
    var list_all = _this.data.list_all
    var list = []
    for(var i=50*this_page - 50; i<50*this_page-1; i++){
      if(i < list_all.length){
        list.push(list_all[i])
      }
    }
    _this.setData({
      list:list,
      this_page:this_page,
    })
  },

  page_up_click:function(){
    var _this = this
    var this_page = _this.data.this_page
    var max_page = _this.data.max_page

    this_page = this_page + 1
    if(this_page > max_page){
      wx.showToast({
        title: '已经是最后一页',
        icon: 'none'
      })
      return;
    }
    var list_all = _this.data.list_all
    var list = []
    for(var i=50*this_page - 50; i<50*this_page-1; i++){
      if(i < list_all.length){
        list.push(list_all[i])
      }
    }
    _this.setData({
      list:list,
      this_page:this_page,
    })
    
  },
PikerChange(e){
  console.log(e),
  this.setData({
    index:e.detail.value
  })
  if(this.data.index==6){
    wx.showToast({
      title: '该订单下单至工厂拆单处，请检查文件并传送！',
      icon: 'none'
    })
  }
},

  upd1: function () {
    var _this = this
      var sql = ""
      var userInfo = _this.data.userInfo
      
      if (userInfo.quanxian == '客户') {
        console.log(123)
        sql="update madeOrder set customerName='" + userInfo.name + "',[user]='" + _this.data.user + "',jd='" + _this.data.jd + "',beizhu1='" + _this.data.beizhu1 + "',xmfz='" + _this.data.xmfz + "',lxfs='" + _this.data.lxfs + "',shuxing='" + _this.data.shuxing + "' where id=" + _this.data.id
        }else{
          console.log(321)
          sql= "update madeOrder set customerName='" + _this.data.customerName + "',[user]='" + _this.data.user + "',jd='" + _this.data.jd + "',beizhu1='" + _this.data.beizhu1 + "',xmfz='" + _this.data.xmfz + "',lxfs='" + _this.data.lxfs + "',shuxing='" + _this.data.shuxing + "' where id=" + _this.data.id
        }
        console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',

      data: {
        // query: "update dianmiandingdan set khmc='" + _this.data.khmc + "',zdyh='" + _this.data.zdyh + "',jd='" + _this.data.jd + "',bz='" + _this.data.bz + "',xmfz='" + _this.data.xmfz + "',lxfs='" + _this.data.lxfs + "' where id=" + _this.data.id
        query: sql
      },
      success: res => {
        _this.setData({
          id: '',
          customerName: '',
          user: '',
          jd: '',
          beizhu1: '',
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
      customerName: _this.data.list[e.currentTarget.dataset.index].customerName,
      user: _this.data.list[e.currentTarget.dataset.index].user,
      jd: _this.data.list[e.currentTarget.dataset.index].jd,
      beizhu1: _this.data.list[e.currentTarget.dataset.index].beizhu1,
      xmfz: _this.data.list[e.currentTarget.dataset.index].xmfz,
      lxfs: _this.data.list[e.currentTarget.dataset.index].lxfs,
      shuxing: _this.data.list[e.currentTarget.dataset.index].shuxing,
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
              query: "delete from madeOrder where id='" + _this.data.id + "'"
            },
            success: res => {
              console.log(res)
              _this.setData({
                id: '',
                customerName: '',
                user: '',
                jd: '',
                beizhu1: '',
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
          var customerName = _this.data.list[index].customerName
          var productionNO = _this.data.list[index].productionNO
          var user = _this.data.list[index].user
          console.log(productionNO)
          wx.navigateTo({
            url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&ddh='+ productionNO +'&khmc='+customerName +'&zdyh='+user+'&dmdd='+1,
           
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
      customerName: '',
      user: '',
      jd: '',
      beizhu1: '',
      xmfz: '',
      lxfs: '',
      shuxing: '',
      productionNO: '',
    })
    if(userInfo.quanxian == '客户'){
      _this.setData({
        customerName: userInfo.name,
        panduan_khmc:true,
      })
    }
  },


  add1: function(){
    var _this = this
    var sql=""
    var userInfo = _this.data.userInfo
    if (_this.data.customerName == '') {
      wx.showToast({
        title: '请输入客户名称！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if (_this.data.user == '') {
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
    if (_this.data.beizhu1 == '') {
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
    if (_this.data.shuxing == '') {
      wx.showToast({
        title: '请输入订单属性！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.productionNO == '') {
      wx.showToast({
        title: '请输入订单号！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (userInfo.quanxian == '客户') {
      console.log(khkh)
      }else{
        console.log("ggggg")
        sql="insert into madeOrder(customerName,[user],jd,beizhu1,xmfz,lxfs,shuxing,productionNO) values('" + _this.data.customerName + "','" + _this.data.user + "','" + _this.data.jd + "','" + _this.data.beizhu1 + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.shuxing + "','" + _this.data.productionNO + "')"
      }
      
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlServer_tb3999803',
        data: {
          query: sql
        },
        success: res => {
          _this.qxShow()
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


  add2: function () {
    var _this = this

    if (_this.data.customerName == '') {
      wx.showToast({
        title: '请输入客户名称！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if (_this.data.user == '') {
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
    if (_this.data.beizhu1 == '') {
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
    if (_this.data.shuxing == '') {
      wx.showToast({
        title: '请输入订单属性！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.productionNO == '') {
      wx.showToast({
        title: '请输入订单号！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    var sql = ""
    var userInfo = _this.data.userInfo
   
    if (userInfo.quanxian == '客户') {
      console.log(khkh)
      sql="insert into madeOrder(customerName,user,jd,beizhu1,xmfz,lxfs,shuxing,productionNO) values('" + userInfo.name + "','" + _this.data.user + "','" + _this.data.jd + "','" + _this.data.beizhu1 + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.shuxing + "','" + _this.data.productionNO + "')"
      }else{
        sql="insert into madeOrder(customerName,user,jd,beizhu1,xmfz,lxfs,shuxing,productionNO) values('" + _this.data.customerName + "','" + _this.data.user + "','" + _this.data.jd + "','" + _this.data.beizhu1 + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.shuxing + "','" + _this.data.productionNO + "')"
      }
      console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        // _this.setData({
        //   id: '',
        //   customerName: '',
        //   user: '',
        //   jd: '',
        //   beizhu1: '',
        //   xmfz: '',
        //   lxfs: '',
        //   shuxing: '',
        //   productionNO: '',
        // })
        // var e = ['', '','']
        // _this.qxShow()
        // _this.tableShow(e)
        wx.showToast({
          title: '添加成功1！',
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
      customerName: "",
      beizhu1: "",
      lxfs: "",
    })
  },

  sel1: function () {
    var _this = this
    var e = [_this.data.customerName,_this.data.beizhu1, _this.data.lxfs]
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
    // var _this = this
    // var e = ['', '','']
    // _this.tableShow(e)
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