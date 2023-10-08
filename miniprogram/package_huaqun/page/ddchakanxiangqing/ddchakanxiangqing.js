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
      fkzt:"付款状态",
      hd:"审单",
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
      {
        text: "付款状态",
        width: "250rpx",
        columnName: "fkzt",
        type: "text",
        isupd: true
      },
      {
        text: "审单",
        width: "250rpx",
        columnName: "hd",
        type: "text",
        isupd: true
      },
    ],
    list2: [],
    ddxh_list_dj:[],
    title2: [{
      text: "项目类别",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "fj",
      type: "text",
      isupd: true
    },
    {
      text: "项目名称",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "gh",
      type: "text",
      isupd: true
    },
    {
      text: "铝材颜色",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "lcys",
      type: "text",
      isupd: true
    },
    {
      text: "灯带长度mm",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "ddcd",
      type: "text",
      isupd: true
    },
    {
      text: "数量(支）",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "sl",
      type: "text",
      isupd: true
    },{
      text: "出线端口左出线",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "cxdk",
      type: "text",
      isupd: true
    },{
      text: "出线端口右出线",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "cxdk_right",
      type: "text",
      isupd: true
    },{
      text: "光源",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "gy",
      type: "text",
      isupd: true
    },{
      text: "功率W",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "gl",
      type: "text",
      isupd: true
    },{
      text: "备注",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "bz",
      type: "text",
      isupd: true
    },{
      text: "单价",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "dj",
      type: "text",
      isupd: true
    },{
      text: "金额",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "je",
      type: "text",
      isupd: true
    },{
      text: "开料尺寸",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "chicun",
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
    var userInfo = JSON.parse(options.userInfo)
     _this.setData({
      djbh:djbh,
      userInfo:userInfo
    })
    console.log(userInfo.power)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select distinct djbh,xdrq,ddh,shouhuo,lxdh,shfs,azdz,khmc,isnull(fkzt,'')as fkzt,isnull(hd,'')as hd from lightbelt where djbh = '"+ djbh +"' "
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
        query: "select id,isnull(fj,'')as fj,isnull(gh,'')as gh,isnull(ddcd,'')as ddcd,isnull(sl,'')as sl,isnull(cxdk,'')as cxdk,isnull(cxdk_right,'')as cxdk_right,isnull(lcb,'')as lcb,isnull(lcys,'')as lcys,isnull(gy,'')as gy,isnull(dy,'')as dy,isnull(kg,'')as kg,isnull(pj,'') as pj,isnull(gl,'')as gl,isnull(bz,'')as bz,isnull(dj,'')as dj,isnull(je,'')as je,isnull(chicun,'')as chicun from lightbelt where djbh = '"+ djbh +"'"
      },
      success: res => {
        var list2 = res.result.recordset
        console.log(list2)
        _this.setData({
          list2: list2
        })
        console.log(list2)
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
        var fk=['未付款','已付款']
        var hd = ['未通过','已通过']
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
          fk_list:fk,
          hd_list:hd,
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
          ddxh_list_dj:list,
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
    let djbh = _this.data.djbh;
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
    }else if(this_column == "fkzt"){
      panduan = 8
    }else if(this_column == "hd"){
      panduan = 9
    }else{
      panduan = 0
    }
    var this_row = e.currentTarget.dataset.index
    console.log(this_row)
    if (_this.data.userInfo.power=='管理员'){
      if((e.currentTarget.dataset.column!='dy' || e.currentTarget.dataset.column!='kg' || e.currentTarget.dataset.column!='pj') && _this.data.list2[this_row].dy == "" && _this.data.list2[this_row].kg == "" && _this.data.list2[this_row].pj == ""){
        _this.setData({
          fj: _this.data.list2[e.currentTarget.dataset.index].fj, 
          gh: _this.data.list2[e.currentTarget.dataset.index].gh,
          ddcd: _this.data.list2[e.currentTarget.dataset.index].ddcd,
          sl: _this.data.list2[e.currentTarget.dataset.index].sl,
          cxdk: _this.data.list2[e.currentTarget.dataset.index].cxdk,
          lcb: _this.data.list2[e.currentTarget.dataset.index].lcb,
          lcys: _this.data.list2[e.currentTarget.dataset.index].lcys,
          gy: _this.data.list2[e.currentTarget.dataset.index].gy,
          kg: _this.data.list2[e.currentTarget.dataset.index].kg,
          pj: _this.data.list2[e.currentTarget.dataset.index].pj,
          gl: _this.data.list2[e.currentTarget.dataset.index].gl,
          bz: _this.data.list2[e.currentTarget.dataset.index].bz,
          dj: _this.data.list2[e.currentTarget.dataset.index].dj,
          je: _this.data.list2[e.currentTarget.dataset.index].je,
          this_column:e.currentTarget.dataset.column,
          this_value:e.currentTarget.dataset.value,
          this_index:e.currentTarget.dataset.index,
          xiala_panduan:panduan,
          xgShow:true,
        })
      }else{
        wx.showToast({
          title: '电源开关备件填有信息！',
          icon: 'none'
        })
      }
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
    }
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
    if(_this.data.xiala_panduan==8){
      _this.setData({
        this_value: _this.data.fk_list[e.detail.value]
      })
    }
    if(_this.data.xiala_panduan==9){
      _this.setData({
        this_value: _this.data.hd_list[e.detail.value]
      })
    }
    
  },

  upd2:function(){
    var _this = this
    var list2= _this.data.list2
    list2[_this.data.this_index][_this.data.this_column] = _this.data.this_value
    
    var list1 = _this.data.ddxh_list_dj
    var dj
    for (var i = 0 ; i < list1.length ; i++){
      if (_this.data.this_column == 'lcb' &&  _this.data.this_value == list1[i].ddxh && list2[_this.data.this_index].ddcd > 400){
        dj = parseFloat(list1[i].mmdj) + parseFloat(((list2[_this.data.this_index].ddcd-400)/100) * list1[i].zjdj)
        list2[_this.data.this_index].dj = dj
        list2[_this.data.this_index].je = list2[_this.data.this_index].sl * list2[_this.data.this_index].dj
        list2[_this.data.this_index].gl = list2[_this.data.this_index].ddcd / 1000 * list2[_this.data.this_index].sl * 15
      }else if (_this.data.this_column == 'lcb' &&  _this.data.this_value == list1[i].ddxh){
        dj = list1[i].mmdj
        list2[_this.data.this_index].dj = dj
        list2[_this.data.this_index].je = list2[_this.data.this_index].sl * list2[_this.data.this_index].dj
        list2[_this.data.this_index].gl = list2[_this.data.this_index].ddcd / 1000 * list2[_this.data.this_index].sl * 15
      }
    }
    _this.setData({
      list2:list2
    })
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
    if (_this.data.userInfo.power=='管理员'){
      // var sql1 = "insert into lightbelt(khmc,xdrq,djbh,shouhuo,lxdh,shfs,azdz,ddh,fj,gh,ddcd,sl,cxdk,lcb,lcys,gy,dy,kg,pj,gl,bz,dj,je) values"
      // var sql2 = ""
      // for(var i=0; i< _this.data.list2.length; i++){
      //   if(sql2 == ""){
      //     sql2 = "('" + _this.data.list[0].khmc + "','"+ _this.data.list[0].xdrq +"','" + _this.data.list[0].djbh +"','" + _this.data.list[0].shouhuo +"','"+ _this.data.list[0].lxdh +"','"+  _this.data.list[0].shfs +"','"+  _this.data.list[0].azdz +"','"+  _this.data.list[0].ddh +"','"+  _this.data.list2[i].fj +"','"+  _this.data.list2[i].gh +"','"+  _this.data.list2[i].ddcd +"','"+  _this.data.list2[i].sl +"','"+  _this.data.list2[i].cxdk +"','"+  _this.data.list2[i].lcb +"','"+  _this.data.list2[i].lcys +"','"+  _this.data.list2[i].gy +"','"+  _this.data.list2[i].dy +"','"+  _this.data.list2[i].kg +"','"+  _this.data.list2[i].pj +"','"+  _this.data.list2[i].gl +"','"+  _this.data.list2[i].bz +"','"+  _this.data.list2[i].dj +"','"+  _this.data.list2[i].je +"')"
      //   }else{
      //     sql2 = sql2 + ",('" + _this.data.list[0].khmc + "','"+ _this.data.list[0].xdrq +"','" + _this.data.list[0].djbh +"','" + _this.data.list[0].shouhuo +"','"+ _this.data.list[0].lxdh +"','"+  _this.data.list[0].shfs +"','"+  _this.data.list[0].azdz +"','"+  _this.data.list[0].ddh +"','"+  _this.data.list2[i].fj +"','"+  _this.data.list2[i].gh +"','"+  _this.data.list2[i].ddcd +"','"+  _this.data.list2[i].sl +"','"+  _this.data.list2[i].cxdk +"','"+  _this.data.list2[i].lcb +"','"+  _this.data.list2[i].lcys +"','"+  _this.data.list2[i].gy +"','"+  _this.data.list2[i].dy +"','"+  _this.data.list2[i].kg +"','"+  _this.data.list2[i].pj +"','"+  _this.data.list2[i].gl +"','"+  _this.data.list2[i].bz +"','"+  _this.data.list2[i].dj +"','"+  _this.data.list2[i].je +"')"
      //   }
      // }
      // var sql = sql1 + sql2
      var i = _this.data.this_index
      console.log(_this.data.list2[i].id)
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "update lightbelt set " + _this.data.this_column + "='" + _this.data.this_value + "' where  id=" + _this.data.list2[i].id
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
          _this.tableShow()
          
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
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
    }
    
  },

  del1:function(){
    var _this = this
    var i = _this.data.this_index
    console.log(_this.data.list2[0].id)
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "delete from lightbelt where id='"+ _this.data.list2[i].id +"'"
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
          _this.tableShow()
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

  out_put:function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list2;
    var list_head = _this.data.list
    var end_list = []
    if(list.length == 0){
      wx.showToast({
        title: '无可导出数据，请查询后再试！',
        icon: 'none'
      })
      return;
    }

    var title = _this.data.title2
    var cloudList = {
      name : '灯带订单详情',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:parseInt(title[i].width.split("r")[0]),
        columnName:title[i].columnName
      })
    }

    var list_item = {
      fj:'客户名称：' + list_head[0].khmc,
      gh:'下单日期：' + list_head[0].xdrq,
      lcys:'单据编号：' + list_head[0].djbh,
      ddcd:'送货地址：' + list_head[0].shouhuo,
      sl:'联系电话：' + list_head[0].lxdh,
      cxdk:'送货方式：' + list_head[0].shfs,
      cxdk_right:'安装地址：' + list_head[0].azdz,
      gy:'订单号：' + list_head[0].ddh,
      gl:'',
      bz:'',
      dj:'',
      je:'',
      chicun:'',
    }

    var list_kong = {
      fj:'',
      gh:'',
      lcys:'',
      ddcd:'',
      sl:'',
      cxdk:'',
      cxdk_right:'',
      gy:'',
      gl:'',
      bz:'',
      dj:'',
      je:'',
      chicun:'',
    }

    for(var i=0; i<list.length; i++){
      end_list.push(list[i])
    }

    end_list.push(list_kong)
    end_list.push(list_item)


    cloudList.items = end_list
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        var fileId = res.result.fileID
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获得临时路径",res.tempFilePath)
            wx.getFileSystemManager().saveFile({
              tempFilePath: res.tempFilePath,
              filePath : wx.env.USER_DATA_PATH + "/" + getTime() + ".xlsx",
              success : res=> {
                let path_downLoad = res.savedFilePath
                console.log("下载完成",res)
                delCloudFile(fileId)
                wx.openDocument({
                  filePath: path_downLoad,
                  fileType : 'xlsx',
                  showMenu : true,
                  success: function(res) {
                    console.log('打开文档成功');
                    wx.hideLoading({
                      success: (res) => {},
                    })
									},
									fail: function(error) {
                    console.log(error)
                    wx.hideLoading({
                      success: (res) => {},
                    })
										wx.showToast({
											icon: 'none',
											title: '打开文件失败'
										});
									},
                })
              },
              fail: res=>{
                console.log(res)
              }
            })
          }
        })
      },
      fail : res=> {
        console.log(res)
      }
    })
  },
  print: function(){
    var _this = this
    var list = _this.list
    var list2 = _this.list2
        wx.navigateTo({
          url: "../dddayin/dddayin?order1=" + JSON.stringify(_this.data.list[0]) +"&order2=" + JSON.stringify(_this.data.list2) 
        })
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

function getTime(){
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth()+1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth()+1);
  var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
  return year+"-"+month+"-"+day
}

function delCloudFile(fileId){
  var fileIds = [];
  fileIds.push(fileId);
  wx.cloud.deleteFile({
    fileList: fileIds,
    success: res => {
      console.log(res.fileList);
    },
    fail : console.error
  })
}

