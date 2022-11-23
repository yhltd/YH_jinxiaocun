// package_huaqun/page/ddchakanxiangqing/ddchakanxiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  data: {
    update_name:{
      fj:"房间",
      gh:"柜号",
      ddcd:"灯带长度mm",
      sl:"数量(支）",
      cxdk:"出线端口",
      lcb:"铝型材",
      lcys:"铝材颜色",
      gy:"光源",
      dy:"电源",
      kg:"开关",
      pj:"配件",
      gl:"功率W",
      bz:"备注",
      dj:"单价",
      je:"金额",
    },
    list: [],
    title: [{
        text: "客户名称",
        width: "250rpx",
        columnName: "khmc",
        type: "text",
        isupd: true
      },
      {
        text: "下单日期",
        width: "250rpx",
        columnName: "xdrq",
        type: "text",
        isupd: true
      },
      {
        text: "单据编号",
        width: "250rpx",
        columnName: "djbh",
        type: "text",
        isupd: true
      },
      {
        text: "送货地址",
        width: "250rpx",
        columnName: "shouhuo",
        type: "text",
        isupd: true
      },
      {
        text: "联系电话",
        width: "250rpx",
        columnName: "lxdh",
        type: "text",
        isupd: true
      },
      {
        text: "送货方式",
        width: "250rpx",
        columnName: "shfs",
        type: "text",
        isupd: true
      },
      {
        text: "安装地址",
        width: "250rpx",
        columnName: "azdz",
        type: "text",
        isupd: true
      },
      {
        text: "订单号",
        width: "250rpx",
        columnName: "ddh",
        type: "text",
        isupd: true
      },
    ],
    list2: [],
    title2: [{
      text: "房间",
      width: "250rpx",
      columnName: "fj",
      type: "text",
      isupd: true
    },
    {
      text: "柜号",
      width: "250rpx",
      columnName: "gh",
      type: "text",
      isupd: true
    },
    {
      text: "灯带长度mm",
      width: "250rpx",
      columnName: "ddcd",
      type: "text",
      isupd: true
    },
    {
      text: "数量(支）",
      width: "250rpx",
      columnName: "sl",
      type: "text",
      isupd: true
    },
    {
      text: "出线端口",
      width: "250rpx",
      columnName: "cxdk",
      type: "text",
      isupd: true
    },
    {
      text: "铝型材",
      width: "250rpx",
      columnName: "lcb",
      type: "text",
      isupd: true
    },
    {
      text: "铝材颜色",
      width: "250rpx",
      columnName: "lcys",
      type: "text",
      isupd: true
    },
    {
      text: "光源",
      width: "250rpx",
      columnName: "gy",
      type: "text",
      isupd: true
    },
    {
      text: "电源",
      width: "250rpx",
      columnName: "dy",
      type: "text",
      isupd: true
    },
    {
      text: "开关",
      width: "250rpx",
      columnName: "kg",
      type: "text",
      isupd: true
    },
    {
      text: "配件",
      width: "250rpx",
      columnName: "pj",
      type: "text",
      isupd: true
    },
    {
      text: "功率W",
      width: "250rpx",
      columnName: "gl",
      type: "text",
      isupd: true
    },
    {
      text: "备注",
      width: "250rpx",
      columnName: "bz",
      type: "text",
      isupd: true
    },
    {
      text: "单价",
      width: "250rpx",
      columnName: "dj",
      type: "text",
      isupd: true
    },
    {
      text: "金额",
      width: "250rpx",
      columnName: "je",
      type: "text",
      isupd: true
    },
  ],
  fj: "",
  gh: "",
  ddcd: "",
  sl: "",
  cxdk: "",
  lcb: "",
  lcys: "",
  gy:"",
  dy: "",
  kg: "",
  pj: "",
  gl: "",
  bz: "",
  dj: "",
  je: "",
  ddxh:"",
  column_input : "",
  empty:'',
   xiala_panduan:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var djbh = JSON.parse(options.djbh)
    _this.setData({
      djbh:djbh
    })
    console.log(djbh)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select distinct djbh,xdrq,ddh,shouhuo,lxdh,shfs,azdz,khmc from lightbelt where djbh = '"+ djbh +"' "
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list
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
    
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select id,isnull(fj,'')as fj,isnull(gh,'')as gh,isnull(ddcd,'')as ddcd,isnull(sl,'')as sl,isnull(cxdk,'')as cxdk,isnull(lcb,'')as lcb,isnull(lcys,'')as lcys,isnull(gy,'')as gy,isnull(dy,'')as dy,isnull(kg,'')as kg,isnull(pj,'') as pj,isnull(gl,'')as gl,isnull(bz,'')as bz,isnull(dj,'')as dj,isnull(je,'')as je from lightbelt where djbh = '"+ djbh +"'"
      },
      success: res => {
        var list2 = res.result.recordset
        console.log(list2)
        _this.setData({
          list2: list2
        })
        console.log('aaa',list2)
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

    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select id,isnull(cxdk,'') as cxdk,isnull(lxc,'') as lxc,isnull(lcys,'') as lcys,isnull(gy,'') as gy,isnull(dy,'') as dy,isnull(kg,'') as kg,isnull(pj,'') as pj,isnull(shfs,'') as shfs,isnull(blsjg,'') as blsjg,isnull(blys,'') as blys,isnull(lsxh,'') as lsxh,isnull(lsw,'') as lsw,isnull(kjlk,'') as kjlk,isnull(jlkw,'') as jlkw from dropdowntable"
      },
      success: res => {
        var list = res.result.recordset
        var cxdk = []
        var lcb = []
        var lcys = []
        var gy = []
        var dy = []
        var kg = []
        var pj = []
        console.log(list)
        for(var i=0; i<list.length; i++){
          if(list[i].cxdk != '' && list[i].cxdk != null && list[i].cxdk != undefined){
            cxdk.push(list[i].cxdk)
          }else if(list[i].lcb != '' && list[i].lcb != null && list[i].lcb != undefined){
            lcb.push(cxdk[i].lcb)
          }
          if(list[i].lcys != '' && list[i].lcys != null && list[i].lcys != undefined){
            lcys.push(list[i].lcys)
          }
          if(list[i].gy != '' && list[i].gy != null && list[i].gy != undefined){
            gy.push(list[i].gy)
          }
          if(list[i].dy != '' && list[i].dy != null && list[i].dy != undefined){
            dy.push(list[i].dy)
          }
          if(list[i].kg != '' && list[i].kg != null && list[i].kg != undefined){
            kg.push(list[i].kg)
          }
          if(list[i].pj != '' && list[i].pj != null && list[i].pj != undefined){
            pj.push(list[i].pj)
          }
        }
        _this.setData({
          cxdk_list:cxdk,
          lcb_list:lcb,
          lcys_list:lcys,
          gy_list:gy,
          dy_list:dy,
          kg_list:kg,
          pj_list:pj,
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

    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select * from otherconfigurations"
      },
      success: res => {
        var list = res.result.recordset
        var ddxh = []
        console.log(list)
        for(var i=0; i<list.length; i++){
          if(list[i].ddxh != '' && list[i].ddxh != null && list[i].ddxh != undefined){
            ddxh.push(list[i].ddxh)
          }
        }
        _this.setData({
          ddxh_list:ddxh,
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



  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select distinct djbh,xdrq,ddh,shouhuo,lxdh,shfs,azdz,khmc from lightbelt where djbh = '"+ _this.data.djbh +"' "
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list
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
    
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select id,isnull(fj,'')as fj,isnull(gh,'')as gh,isnull(ddcd,'')as ddcd,isnull(sl,'')as sl,isnull(cxdk,'')as cxdk,isnull(lcb,'')as lcb,isnull(lcys,'')as lcys,isnull(gy,'')as gy,isnull(dy,'')as dy,isnull(kg,'')as kg,isnull(pj,'') as pj,isnull(gl,'')as gl,isnull(bz,'')as bz,isnull(dj,'')as dj,isnull(je,'')as je from lightbelt where djbh = '"+ djbh +"'"
      },
      success: res => {
        var list2 = res.result.recordset
        console.log(list2)
        _this.setData({
          list2: list2
        })
        console.log('aaa',list2)
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
  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  clickView1:function(e){
    var _this = this
    var this_column = e.currentTarget.dataset.column
    var panduan = 0
    if(this_column == "cxdk"){
      panduan = 1
    }else if(this_column == "lcb"){
      panduan = 2
    }else if(this_column == "lcys"){
      panduan = 3
    }else if(this_column == "gy"){
      panduan = 4
    }else if(this_column == "dy"){
      panduan = 5
    }else if(this_column == "kg"){
      panduan = 6
    }else if(this_column == "pj"){
      panduan = 7
    }else{
      panduan = 0
    }
    _this.setData({
      fj: _this.data.list[e.currentTarget.dataset.index].fj, 
      gh: _this.data.list[e.currentTarget.dataset.index].gh,
      ddcd: _this.data.list[e.currentTarget.dataset.index].ddcd,
      sl: _this.data.list[e.currentTarget.dataset.index].sl,
      cxdk: _this.data.list[e.currentTarget.dataset.index].cxdk,
      lcb: _this.data.list[e.currentTarget.dataset.index].lcb,
      lcys: _this.data.list[e.currentTarget.dataset.index].lcys,
      gy: _this.data.list[e.currentTarget.dataset.index].gy,
      kg: _this.data.list[e.currentTarget.dataset.index].kg,
      pj: _this.data.list[e.currentTarget.dataset.index].pj,
      gl: _this.data.list[e.currentTarget.dataset.index].gl,
      bz: _this.data.list[e.currentTarget.dataset.index].bz,
      dj: _this.data.list[e.currentTarget.dataset.index].dj,
      je: _this.data.list[e.currentTarget.dataset.index].je,
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      this_index:e.currentTarget.dataset.index,
      xiala_panduan:panduan,
      xgShow:true,
    })
  },

  bindPickerChange: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if(_this.data.xiala_panduan==1){
      _this.setData({
        this_value: _this.data.cxdk_list[e.detail.value]
      })
    }
    if(_this.data.xiala_panduan==2){
      this.setData({
        this_value: _this.data.ddxh_list[e.detail.value]
      })
    }
    if(_this.data.xiala_panduan==3){
      _this.setData({
        this_value: _this.data.lcys_list[e.detail.value]
      })
    }
    if(_this.data.xiala_panduan==4){
      _this.setData({
        this_value: _this.data.gy_list[e.detail.value]
      })
    }
    if(_this.data.xiala_panduan==5){
      _this.setData({
        this_value: _this.data.dy_list[e.detail.value]
      })
    }
    if(_this.data.xiala_panduan==6){
      _this.setData({
        this_value: _this.data.kg_list[e.detail.value]
      })
    }
    if(_this.data.xiala_panduan==7){
      _this.setData({
        this_value: _this.data.pj_list[e.detail.value]
      })
    }
    
  },

  upd2:function(){
    var _this = this
    var list2= _this.data.list2
    list2[_this.data.this_index][_this.data.this_column] = _this.data.this_value
    _this.setData({
      list2:list2
    })

    // if(_this.data.this_column=='ddcd' && list2[_this.data.this_index][_this.data.this_column] !=""){
    //   je = 
    // }

    _this.qxShow()
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },
  
  add1: function(){
    var _this = this
    var sql1 = "insert into lightbelt(khmc,xdrq,djbh,shouhuo,lxdh,shfs,azdz,ddh,fj,gh,ddcd,sl,cxdk,lcb,lcys,gy,dy,kg,pj,gl,bz,dj,je) values"
    var sql2 = ""
    for(var i=0; i< _this.data.list2.length; i++){
      if(sql2 == ""){
        sql2 = "('" + _this.data.list[0].khmc + "','"+ _this.data.list[0].xdrq +"','" + _this.data.list[0].djbh +"','" + _this.data.list[0].shouhuo +"','"+ _this.data.list[0].lxdh +"','"+  _this.data.list[0].shfs +"','"+  _this.data.list[0].azdz +"','"+  _this.data.list[0].ddh +"','"+  _this.data.list2[i].fj +"','"+  _this.data.list2[i].gh +"','"+  _this.data.list2[i].ddcd +"','"+  _this.data.list2[i].sl +"','"+  _this.data.list2[i].cxdk +"','"+  _this.data.list2[i].lcb +"','"+  _this.data.list2[i].lcys +"','"+  _this.data.list2[i].gy +"','"+  _this.data.list2[i].dy +"','"+  _this.data.list2[i].kg +"','"+  _this.data.list2[i].pj +"','"+  _this.data.list2[i].gl +"','"+  _this.data.list2[i].bz +"','"+  _this.data.list2[i].dj +"','"+  _this.data.list2[i].je +"')"
      }else{
        sql2 = sql2 + ",('" + _this.data.list[0].khmc + "','"+ _this.data.list[0].xdrq +"','" + _this.data.list[0].djbh +"','" + _this.data.list[0].shouhuo +"','"+ _this.data.list[0].lxdh +"','"+  _this.data.list[0].shfs +"','"+  _this.data.list[0].azdz +"','"+  _this.data.list[0].ddh +"','"+  _this.data.list2[i].fj +"','"+  _this.data.list2[i].gh +"','"+  _this.data.list2[i].ddcd +"','"+  _this.data.list2[i].sl +"','"+  _this.data.list2[i].cxdk +"','"+  _this.data.list2[i].lcb +"','"+  _this.data.list2[i].lcys +"','"+  _this.data.list2[i].gy +"','"+  _this.data.list2[i].dy +"','"+  _this.data.list2[i].kg +"','"+  _this.data.list2[i].pj +"','"+  _this.data.list2[i].gl +"','"+  _this.data.list2[i].bz +"','"+  _this.data.list2[i].dj +"','"+  _this.data.list2[i].je +"')"
      }
    }
    var sql = sql1 + sql2
    console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: sql
        },
        success: res => {
          _this.setData({
            id:'',
            cxdk:'', 
            lxc: '',
            lcys: '',
            gy: '',
            dy: '',
            kg: '',
            pj: '',
            shfs:'', 
            blsjg: '',
            blys: '',
            lsxh: '',
            lsw: '',
            kjlk: '',
            jlkw: '',
          })
          _this.qxShow()
          _this.onLoad(options)
          
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

  del1:function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "delete from lightbelt where khmc='"+ _this.data.list2[0].id +"'"
        },
        success: res => {
          _this.setData({
            id:'',
            khmc: '', 
            xdrq: '',
            djbh: '',
            shouhuo: '',
            lxdh: '',
            shfs: '',
            azdz: '',
            ddh: '',
          })
          _this.qxShow()
          _this.onLoad(options)
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
  },

  selCD: function () {
    var _this = this
    var list2 = _this.data.list2
    list2.push({
      fj:"",
      gh:"",
      ddcd:"",
      sl:"",
      cxdk:"",
      lcb:"",
      lcys:"",
      gy:"",
      dy:"",
      kg:"",
      pj:"",
      gl:"",
      bz:"",
      dj:"",
      je:"",
    })
    _this.setData({
      list2
    })
  },
  

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  cha1:function(){
    var _this=this
    wx.navigateTo({
      url: "../ddchakanxiangqing/ddchakanxiangqing?userInfo="+JSON.stringify(_this.data.userInfo)
    })
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.khmc,_this.data.ddh]
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

