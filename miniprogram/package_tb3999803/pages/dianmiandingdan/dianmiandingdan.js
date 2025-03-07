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
    danhaohidden:false,
    jd_type: ['共享'],
    bz_type: ['意向', '初算','量尺','改方案','算报价','定稿','付款','进料','送货','安装','补货','暂停','验收','尾款','完工'],
    xmfa_type: ['效果图全屋','施工图全屋','效果图代工','施工图代工','效果图单项','施工图单项','全屋整装','工装','其他单项'],
    // ddsx_type: ['整体订单','全屋整装','整体代工','整体贴牌','整体批货','挂靠代工','单项代工','单项批货'],
    index:0,
    list: [],
    title: [{
      text: "客户名称",
      width: "170rpx",
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
      text: "共享",
      width: "100rpx",
      columnName: "jd",
      type: "text",
      isupd: true
    }, {
      text: "进度",
      width: "200rpx",
      columnName: "bz",
      type: "text",
      isupd: true
    }, {
      text: "下单注意事项",
      width: "400rpx",
      columnName: "zysx",
      type: "text",
      isupd: true
    },{
      text: "项目负责人",
      width: "270rpx",
      columnName: "xmfz",
      type: "text",
      isupd: true
    }, 
    {
      text: "项目联系方式",
      width: "300rpx",
      columnName: "lxfs",
      type: "text",
      isupd: true
    }, 
    {
      text: "项目方案",
      width: "300rpx",
      columnName: "xmfa",
      type: "text",
      isupd: true
    }, 
    {
      text: "项目工程量",
      width: "300rpx",
      columnName: "xmgcl",
      type: "text",
      isupd: true
    }, 
    {
      text: "项目简要要求",
      width: "300rpx",
      columnName: "xmjyyq",
      type: "text",
      isupd: true
    }, 
    // {
    //   text: "订单属性",
    //   width: "150rpx",
    //   columnName: "ddsx",
    //   type: "text",
    //   isupd: true
    // }, 
    {
      text: "订单号",
      width: "180rpx",
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
  zysx: '',
  xmfz: '',
  lxfs: '',
  xmfa: '',
  xmgcl: '',
  xmjyyq: '',
  // ddsx:'',
  ddh:''
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
    if(userInfo.quanxian=="客户"){
      _this.setData({
        danhaohidden: true,
      })
    }
    var e = ['','共享']
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
  // bindPickerChange3: function (e) {
  //   var _this = this
  //   _this.setData({
  //     [e.target.dataset.column_name]: _this.data.ddsx_type[e.detail.value]
  //   })
  // },
  bindPickerChange3: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.bz_type[e.detail.value]
    })
  },

  bindPickerChange5: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.xmfa_type[e.detail.value]
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
    // if(userInfo.quanxian=="客户"){
    //   sql = "select khmc,zdyh,jd,bz,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddsx,ddh,id from new_dianmiandingdan where khmc='"+userInfo.name+"'and isnull(bz,'') like'%"+e[1]+"%' and isnull(lxfs,'') like '%"+e[2]+"%' order by CASE WHEN ddh ='' THEN 0 ELSE 1 END,ddh desc"
    // }else{
    //   sql = "select khmc,zdyh,jd,bz,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddsx,ddh,id from new_dianmiandingdan where khmc like'%"+e[0]+"%' and isnull(bz,'') like'%"+e[1]+"%' and isnull(lxfs,'') like '%"+e[2]+"%' order by CASE WHEN ddh = '' THEN 0 ELSE 1 END, ddh desc"
    // }
    if(userInfo.quanxian=="客户"){
      sql = "select khmc,zdyh,jd,bz,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddh,zysx,id from new_dianmiandingdan where khmc='"+userInfo.name+"'and zdyh like'%"+e[0]+"%' and isnull(jd,'') like'%"+e[1]+"%' order by CASE WHEN ddh ='' THEN 0 ELSE 1 END,ddh desc"
    }else{
      sql = "select khmc,zdyh,jd,bz,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddh,zysx,id from new_dianmiandingdan where zdyh like'%"+e[0]+"%' and isnull(jd,'') like'%"+e[1]+"%' order by CASE WHEN ddh = '' THEN 0 ELSE 1 END, ddh desc"
    }
    
    console.log(sql)
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

  xialiao: function (e) {
    var _this = this
    wx.showModal({
      title: "提示",
      content: '是否查看此订单的补货下料单？',
      cancelColor: '#282B33',
      confirmColor: '#BC4A4A',
      success: res => {
        if (res.confirm) { 
    var ddh = _this.data.ddh
    var khmc = _this.data.khmc
    var zdyh = _this.data.zdyh
    console.log(ddh)
    wx.navigateTo({
      url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&dh=' + ddh+'&tz='+"dmdd"+'&khmc='+khmc+'&zdyh='+zdyh,
    })
  } else if (res.cancel) {
    console.log('用户点击取消')
  }
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
      
      // if (userInfo.quanxian == '客户') {
      //   console.log(123)
      //   sql="update new_dianmiandingdan set khmc='" + userInfo.name + "',zdyh='" + _this.data.zdyh + "',jd='" + _this.data.jd + "',bz='" + _this.data.bz + "',xmfz='" + _this.data.xmfz + "',lxfs='" + _this.data.lxfs + "',xmfa='" + _this.data.xmfa + "',xmgcl='" + _this.data.xmgcl + "',xmjyyq='" + _this.data.xmjyyq + "',ddsx='" + _this.data.ddsx + "',paixu1='" + _this.data.ddh + "' where id=" + _this.data.id+""
      //   }else{
      //     console.log(321)
      //     sql= "update new_dianmiandingdan set khmc='" + _this.data.khmc + "',zdyh='" + _this.data.zdyh + "',jd='" + _this.data.jd + "',bz='" + _this.data.bz + "',xmfz='" + _this.data.xmfz + "',lxfs='" + _this.data.lxfs + "',xmfa='" + _this.data.xmfa + "',xmgcl='" + _this.data.xmgcl + "',xmjyyq='" + _this.data.xmjyyq + "',ddsx='" + _this.data.ddsx + "' ,ddh='" + _this.data.ddh + "',paixu1='" + _this.data.ddh + "'where id=" + _this.data.id+""
      //   }

      if (userInfo.quanxian == '客户') {
        console.log(123)
        sql="update new_dianmiandingdan set zdyh='" + _this.data.zdyh + "',jd='" + _this.data.jd + "',bz='" + _this.data.bz + "',zysx='" + _this.data.zysx + "',xmfz='" + _this.data.xmfz + "',lxfs='" + _this.data.lxfs + "',xmfa='" + _this.data.xmfa + "',xmgcl='" + _this.data.xmgcl + "',xmjyyq='" + _this.data.xmjyyq + "' where id=" + _this.data.id+""
        }else{
          console.log(321)
          sql= "update new_dianmiandingdan set zdyh='" + _this.data.zdyh + "',jd='" + _this.data.jd + "',bz='" + _this.data.bz + "',zysx='" + _this.data.zysx + "',xmfz='" + _this.data.xmfz + "',lxfs='" + _this.data.lxfs + "',xmfa='" + _this.data.xmfa + "',xmgcl='" + _this.data.xmgcl + "',xmjyyq='" + _this.data.xmjyyq + "',paixu1='" + _this.data.ddh + "' where id=" + _this.data.id+""
        }
        console.log(sql)
        // wx.cloud.callFunction({
        //   name: 'sqlServer_tb3999803',
        //   data: {
        //     query: sql
        //   },
        // })
        if(_this.data.bz=="补货"){
          wx.showModal({
            title: "提示",
            content: '是否跳转至补货下料单？',
            cancelColor: '#282B33',
            confirmColor: '#BC4A4A',
            success: res => {
              if (res.confirm) { d
                var khmc = _this.data.khmc
                var ddh = _this.data.ddh
                var zdyh = _this.data.zdyh
                console.log(ddh)
                console.log(zdyh)
                console.log(khmc)
                wx.navigateTo({
                  url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&dh='+ ddh +'&khmc='+khmc +'&zdyh='+zdyh+'&dmdd='+1+'&tz='+"dmdd"
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
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
        console.log("123")
        _this.qxShow()
        var e = ['','共享']
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

//   xialiao: function (e) {
//     var _this = this
//     wx.showModal({
//       title: "提示",
//       content: '是否查看此订单的补货下料单？',
//       cancelColor: '#282B33',
//       confirmColor: '#BC4A4A',
//       success: res => {
//         if (res.confirm) { 
//     var dh = _this.data.dh
//     console.log(dh)
//     wx.navigateTo({
//       url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&dh=' + dh,
//     })
//   } else if (res.cancel) {
//     console.log('用户点击取消')
//   }
// }
// })
//   },
  
 
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
      zysx: _this.data.list[e.currentTarget.dataset.index].zysx,
      xmfz: _this.data.list[e.currentTarget.dataset.index].xmfz,
      lxfs: _this.data.list[e.currentTarget.dataset.index].lxfs,
      xmfa: _this.data.list[e.currentTarget.dataset.index].xmfa,
      xmgcl: _this.data.list[e.currentTarget.dataset.index].xmgcl,
      xmjyyq: _this.data.list[e.currentTarget.dataset.index].xmjyyq,


      // ddsx: _this.data.list[e.currentTarget.dataset.index].ddsx,
      ddh: _this.data.list[e.currentTarget.dataset.index].ddh,
      xgShow: true,
    })
  },

  del1: function () {
    var _this = this
    if(_this.data.ddh!=""){
      wx.showToast({
        title: '该订单不能删除！',
        icon: 'none'
      })
    }else{
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
              query: "delete from new_dianmiandingdan where id='" + _this.data.id + "'"
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
    })}
  },
    
  goto_buhuo: function(e){
    var _this = this

    var index1 = e.currentTarget.dataset.index
    var bz = _this.data.list[index1].bz
    // console.log(jd)
    if (bz=='补货'){
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
            url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&ddh='+ ddh +'&khmc='+khmc +'&zdyh='+zdyh+'&dmdd='+1+'&tz='+"dmdd",
           
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
    if(userInfo.quanxian=="客户"){
        _this.setData({
          danhaohidden:true
        })
    }
    _this.setData({
      tjShow: true,
      id: '',
      khmc: '',
      zdyh: '',
      jd: '',
      bz: '',
      zysx: '',
      xmfz: '',
      lxfs: '',
      xmfa: '',
      xmgcl: '',
      xmjyyq: '',
      // ddsx: '',
      ddh: '',
    })
    if(userInfo.quanxian == '客户'){
      _this.setData({
        khmc: userInfo.name,
        panduan_khmc:true,
      })
    }
  },


  add1: function(){
    var _this = this
    var sql=""
    var userInfo = _this.data.userInfo
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
    if (_this.data.zysx == '') {
      wx.showToast({
        title: '请输入注意事项！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.xmfz == '') {
      wx.showToast({
        title: '请输入项目负责人！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.lxfs == '') {
      wx.showToast({
        title: '请输入项目联系方式！',
        icon: 'none',
        duration: 3000
      })
      return;
    }


    if (_this.data.xmfa == '') {
      wx.showToast({
        title: '请输入项目方案！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.xmgcl == '') {
      wx.showToast({
        title: '请输入项目工程量！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.xmjyyq == '') {
      wx.showToast({
        title: '请输入项目简要要求！',
        icon: 'none',
        duration: 3000
      })
      return;
    }


    // if (_this.data.ddsx == '') {
    //   wx.showToast({
    //     title: '请输入订单属性！',
    //     icon: 'none',
    //     duration: 3000
    //   })
    //   return;
    // }
    if(userInfo.quanxian!="客户"){
      if (_this.data.ddh == '') {
        wx.showToast({
          title: '请输入订单号！',
          icon: 'none',
          duration: 3000
        })
        return;
      }
    }
    
    // if (userInfo.quanxian == '客户') {
    //   sql="insert into new_dianmiandingdan(khmc,zdyh,jd,bz,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddsx,ddh,paixu1) values('" + userInfo.name + "','" + _this.data.zdyh + "','" + _this.data.jd + "','" + _this.data.bz + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.xmfa + "','" + _this.data.xmgcl + "','" + _this.data.xmjyyq + "','" + _this.data.ddsx + "','" + _this.data.ddh + "','" + _this.data.ddh + "')"
    //   }else{
    //     sql="insert into new_dianmiandingdan(khmc,zdyh,jd,bz,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddsx,ddh,paixu1) values('" + _this.data.khmc + "','" + _this.data.zdyh + "','" + _this.data.jd + "','" + _this.data.bz + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.xmfa + "','" + _this.data.xmgcl + "','" + _this.data.xmjyyq + "','" + _this.data.ddsx + "','" + _this.data.ddh + "','" + _this.data.ddh + "')"
    //   }
    if (userInfo.quanxian == '客户') {
      sql="insert into new_dianmiandingdan(khmc,zdyh,jd,bz,zysx,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddh,paixu1) values('" + userInfo.name + "','" + _this.data.zdyh + "','" + _this.data.jd + "','" + _this.data.bz + "','" + _this.data.zysx + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.xmfa + "','" + _this.data.xmgcl + "','" + _this.data.xmjyyq + "','" + _this.data.ddh + "','" + _this.data.ddh + "')"
      }else{
        sql="insert into new_dianmiandingdan(khmc,zdyh,jd,bz,zysx,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddh,paixu1) values('" + _this.data.khmc + "','" + _this.data.zdyh + "','" + _this.data.jd + "','" + _this.data.bz + "','" + _this.data.zysx + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.xmfa + "','" + _this.data.xmgcl + "','" + _this.data.xmjyyq + "','" + _this.data.ddh + "','" + _this.data.ddh + "')"
      }
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlServer_tb3999803',
        data: {
          query: sql
        },
        success: res => {
          var e=['','','']
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


  add2: function () {
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
        title: '请选择共享！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.bz == '') {
      wx.showToast({
        title: '请选择进度！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.zysx == '') {
      wx.showToast({
        title: '请输入注意事项！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.xmfz == '') {
      wx.showToast({
        title: '请输入项目负责人！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.lxfs == '') {
      wx.showToast({
        title: '请输入项目联系方式！',
        icon: 'none',
        duration: 3000
      })
      return;
    }


    if (_this.data.xmfa == '') {
      wx.showToast({
        title: '请输入项目方案！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.xmgcl == '') {
      wx.showToast({
        title: '请输入项目工程量！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_this.data.xmjyyq == '') {
      wx.showToast({
        title: '请输入项目简要要求！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    // if (_this.data.ddsx == '') {
    //   wx.showToast({
    //     title: '请输入订单属性！',
    //     icon: 'none',
    //     duration: 3000
    //   })
    //   return;
    // }
    if(userInfo.quanxian!="客户"){
      if (_this.data.ddh == '') {
        wx.showToast({
          title: '请输入订单号！',
          icon: 'none',
          duration: 3000
        })
        return;
      }
    }

    var sql = ""
    var userInfo = _this.data.userInfo
    console.log(userInfo)
    // if (userInfo.quanxian == '客户') {
    //   sql="insert into new_dianmiandingdan(khmc,zdyh,jd,bz,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddsx,ddh) values('" + userInfo.name + "','" + _this.data.zdyh + "','" + _this.data.jd + "','" + _this.data.bz + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.xmfa + "','" + _this.data.xmgcl + "','" + _this.data.xmjyyq + "','" + _this.data.ddsx + "','" + _this.data.ddh + "')"
    //   }else{
    //     sql="insert into new_dianmiandingdan(khmc,zdyh,jd,bz,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddsx,ddh) values('" + _this.data.khmc + "','" + _this.data.zdyh + "','" + _this.data.jd + "','" + _this.data.bz + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.xmfa + "','" + _this.data.xmgcl + "','" + _this.data.xmjyyq + "','" + _this.data.ddsx + "','" + _this.data.ddh + "')"
    //   }
    if (userInfo.quanxian == '客户') {
      sql="insert into new_dianmiandingdan(khmc,zdyh,jd,bz,zysx,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddh) values('" + userInfo.name + "','" + _this.data.zdyh + "','" + _this.data.jd + "','" + _this.data.bz + "','" + _this.data.zysx + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.xmfa + "','" + _this.data.xmgcl + "','" + _this.data.xmjyyq + "','" + _this.data.ddh + "')"
      }else{
        sql="insert into new_dianmiandingdan(khmc,zdyh,jd,bz,zysx,xmfz,lxfs,xmfa,xmgcl,xmjyyq,ddh) values('" + _this.data.khmc + "','" + _this.data.zdyh + "','" + _this.data.jd + "','" + _this.data.bz + "','" + _this.data.zysx + "','" + _this.data.xmfz + "','" + _this.data.lxfs + "','" + _this.data.xmfa + "','" + _this.data.xmgcl + "','" + _this.data.xmjyyq + "','" + _this.data.ddh + "')"
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
        //   khmc: '',
        //   zdyh: '',
        //   jd: '',
        //   bz: '',
        //   xmfz: '',
        //   lxfs: '',
        //   ddsx: '',
        //   ddh: '',
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

  // entering: function () {
  //   var _this = this
  //   _this.setData({
  //     cxShow: true,
  //     khmc: "",
  //     bz: "",
  //     lxfs: "",
  //   })
  // },
  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      zdyh: "",
      jd: "",
    })
  },

  // sel1: function () {
  //   var _this = this
  //   var e = [_this.data.khmc,_this.data.bz, _this.data.lxfs]
  //   _this.tableShow(e)
  //   _this.qxShow()
  // },

  sel1: function () {
    var _this = this
    var e = [_this.data.zdyh,_this.data.jd]
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