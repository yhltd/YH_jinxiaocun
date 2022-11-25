// package_huaqun/page/ddxiadan/ddxiadan.js

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
    header_list:{
      customer_name:'',
      insert_date:'',
      order_number:'',
      pinyin:'',
      shipping_address:'',
      phone:'',
      shipping_type:'',
      install_address:'',
      customer_number:'',
    },
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
    },
    list: [],
    title: [{
        text: "房间",
        width: "275rpx",
        columnName: "fj",
        type: "text",
        isupd: true
      },
      {
        text: "柜号",
        width: "275rpx",
        columnName: "gh",
        type: "text",
        isupd: true
      },
      {
        text: "灯带长度mm",
        width: "275rpx",
        columnName: "ddcd",
        type: "text",
        isupd: true
      },
      {
        text: "数量(支）",
        width: "275rpx",
        columnName: "sl",
        type: "text",
        isupd: true
      },{
        text: "出线端口",
        width: "275rpx",
        columnName: "cxdk",
        type: "text",
        isupd: true
      },{
        text: "铝型材",
        width: "225rpx",
        columnName: "lcb",
        type: "text",
        isupd: true
      },{
        text: "铝材颜色",
        width: "275rpx",
        columnName: "lcys",
        type: "text",
        isupd: true
      },{
        text: "光源",
        width: "275rpx",
        columnName: "gy",
        type: "text",
        isupd: true
      },{
        text: "电源",
        width: "275rpx",
        columnName: "dy",
        type: "text",
        isupd: true
      },{
        text: "开关",
        width: "275rpx",
        columnName: "kg",
        type: "text",
        isupd: true
      },{
        text: "配件",
        width: "275rpx",
        columnName: "pj",
        type: "text",
        isupd: true
      },{
        text: "功率W",
        width: "275rpx",
        columnName: "gl",
        type: "text",
        isupd: true
      },{
        text: "备注",
        width: "275rpx",
        columnName: "bz",
        type: "text",
        isupd: true
      },{
        text: "单价",
        width: "275rpx",
        columnName: "dj",
        type: "text",
        isupd: true
      },{
        text: "金额",
        width: "275rpx",
        columnName: "je",
        type: "text",
        isupd: true
      },
    ],
    
    list:[],
    ddxh_list_dj:[],
    khmc: "",
    xdrq: "",
    djbh: "",
    shouhuo: "",
    lxdh: "",
    shfs: "",
    azdz: "",
    shfs: "",
    ddh:"",
    column_input : "",
    empty:'',
    xiala_panduan:0,
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var this_date = getNowDate()
    if (userInfo.power == '客户'){
      _this.setData({
        userInfo:userInfo,
        khmc:userInfo.name, 
      })
    }
    _this.setData({
      xdrq:this_date,
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
        var shfs = []
        var fk=['未付款','已付款']
        var hd = ['未通过','已通过']
        console.log('aaaaa',list)
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
          if(list[i].shfs != '' && list[i].shfs != null && list[i].shfs != undefined){
            shfs.push(list[i].shfs)
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
          shfs_list:shfs,
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
        query: "select * from userInfo"
      },
      success: res => {
        var list = res.result.recordset
        var khmc = []
        console.log(list)
        for(var i=0; i<list.length; i++){
          if(list[i].power == '客户'){
            khmc.push(list[i].name)
          }
        }
        _this.setData({
          name_list:khmc,
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

    var bianhao_left = getBianHao()
    console.log(bianhao_left)

    var sql = "select djbh from lightbelt where djbh like '" + bianhao_left + "%'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var bianhao_list = res.result.recordset
        var new_bianhao = "001" 
        for(var i=0; i<bianhao_list.length; i++){
          if(bianhao_list[i].djbh != '' && bianhao_list[i].djbh != null && bianhao_list[i].djbh != undefined){
            var this_bianhao = bianhao_list[i].djbh.slice(10)
            console.log(this_bianhao)
            if(this_bianhao >= new_bianhao){
              new_bianhao = (this_bianhao * 1 + 1).toString()
              if(new_bianhao.length == 1){
                new_bianhao = "00" + new_bianhao.toString()
              }else if(new_bianhao.length == 2){
                new_bianhao = "0" + new_bianhao.toString()
              }
              console.log(new_bianhao)
            }
          }
        }
        new_bianhao = bianhao_left.toString() + new_bianhao.toString()
        var header_list = _this.data.header_list
        header_list.djbh = new_bianhao
        _this.setData({
          header_list
        })
      },
      err: res => {
        wx.showToast({
          title: '读取下拉列表错误！',
          icon: 'none'
        })
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

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var khmc = _this.data.name_list[e.detail.value]
    console.log(khmc)
    _this.setData({
      khmc: khmc,
    })
  },

  bindPickerChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var shfs = _this.data.shfs_list[e.detail.value]
    console.log(shfs)
    _this.setData({
      shfs: shfs,
    })
  },

  tableShow: function (e) {
    var _this = this
    console.log('eeeeee',e)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select id,isnull(khmc,'') as khmc,isnull(xdrq,'') as xdrq,isnull(djbh,'') as djbh,isnull(shouhuo,'') as shouhuo,isnull(lxdh,'') as lxdh,isnull(shfs,'') as shfs,isnull(azdz,'') as azdz,isnull(ddh,'') as ddh,isnull(fj,'') as fj,isnull(gh,'') as gh,isnull(ddcd,'') as ddcd,isnull(sl,'') as sl,isnull(cxdk,'') as cxdk,isnull(lcb,'') as lcb,isnull(lcys,'') as lcys ,isnull(gy,'') as gy ,isnull(dy,'') as dy,isnull(kg,'') as kg,isnull(pj,'') as pj,isnull(gl,'') as gl,isnull(bz,'') as bz,isnull(dj,'') as dj,isnull(je,'') as je  from lightbelt where khmc like '%" + e[0] + "%' and ddh like '%" + e[1] + "%'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list: list,
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
    var index = e.currentTarget.dataset.index
    var this_value = e.currentTarget.dataset.value
    
    if(this_column == "dj" || this_column == "je" || this_column == "gl"){
      return;
    }

    if(( this_column == "ddcd" || this_column == "sl" || this_column == "cxdk" || this_column == "lcb" || this_column == "lcys" || this_column == "gy") && (_this.data.list[index].dy != "" || _this.data.list[index].kg != "" || _this.data.list[index].pj != "")){
      wx.showToast({
        title: '此行已选择电源、开关或配件，不允许填写其他信息！',
        icon: 'none'
      })
      return;
    }

    if((this_column == "dy" || this_column == "kg" || this_column == "pj") && (_this.data.list[index].ddcd != "" || _this.data.list[index].sl != "" || _this.data.list[index].cxdk != "" || _this.data.list[index].lcb != "" || _this.data.list[index].lcys != "" || _this.data.list[index].gy != "")){
      wx.showToast({
        title: '此行已填写其他信息，不允许选择电源、开关或配件！',
        icon: 'none'
      })
      return;
    }

    if((this_column == "dy") && ( _this.data.list[index].kg != "" || _this.data.list[index].pj != "") ){
      wx.showToast({
        title: '此行已选择电源、开关或配件，不允许选择其他信息！',
        icon: 'none'
      })
      return;
    }

    if((this_column == "kg") && ( _this.data.list[index].dy != "" || _this.data.list[index].pj != "") ){
      wx.showToast({
        title: '此行已选择电源、开关或配件，不允许选择其他信息！',
        icon: 'none'
      })
      return;
    }

    if((this_column == "pj") && ( _this.data.list[index].dy != "" || _this.data.list[index].kg != "") ){
      wx.showToast({
        title: '此行已选择电源、开关或配件，不允许选择其他信息！',
        icon: 'none'
      })
      return;
    }

    console.log(e.currentTarget.dataset.column)
    console.log(e.currentTarget.dataset.value)
    console.log(e.currentTarget.dataset.index)
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

    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      xiala_panduan:panduan,
      this_index:e.currentTarget.dataset.index,
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
    var list = _this.data.list
    list[_this.data.this_index][_this.data.this_column] = _this.data.this_value
    var list1 = _this.data.ddxh_list_dj
    console.log(_this.data.this_index)
    console.log(_this.data.this_column)
    var danjia = 0
    var gonglv = 0
    for(var i=0; i<list.length; i++){
      if(list[i].lcb != '' && list[i].ddcd != ''){
        for(var j=0; j<list1.length; j++){
          if(list[i].lcb == list1[j].ddxh && list[i].ddcd > 400){
            danjia = parseFloat(list1[j].mmdj) + Math.ceil(((list[i].ddcd-400)/100) * list1[j].zjdj)
            list[i].dj = danjia
            if(list[i].sl != ''){
              var shuliang = parseFloat(list[i].sl)
              list[i].je = (danjia * shuliang).toFixed(2)
            }
            gonglv = gonglv + Math.ceil(list[i].ddcd * 0.015)
            list[i].gl = gonglv
            break;
          }else{
            danjia = parseFloat(list1[j].mmdj)
            list[i].dj = danjia
            if(list[i].sl != ''){
              var shuliang = parseFloat(list[i].sl)
              list[i].je = (danjia * shuliang).toFixed(2)
            }
            gonglv = gonglv + Math.ceil(list[i].ddcd * 0.015)
            list[i].gl = gonglv
            break;
          }
        }
      }
      if(i != 0){
        if(list[i].fj == list[i-1].fj && list[i].gh == list[i-1].gh){

        }else{
          gonglv = 0
        }
      }
      
    }

    _this.setData({
      list:list,
    })
    _this.qxShow()
  },

  add1: function(){
    var _this = this
    
    if (_this.data.khmc != '' && _this.data.xdrq != '' && _this.data.header_list.djbh != '' && _this.data.shouhuo != '' && _this.data.lxdh != '' && _this.data.shfs != '' && _this.data.azdz != ''){
      if(_this.data.list.length == 0){
        wx.showToast({
          title: '未填写订单内容！',
          icon: 'none'
        })
        return;
      }
      console.log(_this.data.khmc)
      var sql1 = "insert into lightbelt(khmc,xdrq,djbh,shouhuo,lxdh,shfs,azdz,ddh,fj,gh,ddcd,sl,cxdk,lcb,lcys,gy,dy,kg,pj,gl,bz,dj,je) values"
      var sql2 = ""
      for(var i=0; i< _this.data.list.length; i++){
        if(sql2 == ""){
          sql2 = "('" + _this.data.khmc + "','"+ _this.data.xdrq +"','" + _this.data.header_list.djbh +"','" + _this.data.shouhuo +"','"+ _this.data.lxdh +"','"+  _this.data.shfs +"','"+  _this.data.azdz +"','"+  _this.data.ddh +"','"+  _this.data.list[i].fj +"','"+  _this.data.list[i].gh +"','"+  _this.data.list[i].ddcd +"','"+  _this.data.list[i].sl +"','"+  _this.data.list[i].cxdk +"','"+  _this.data.list[i].lcb +"','"+  _this.data.list[i].lcys +"','"+  _this.data.list[i].gy +"','"+  _this.data.list[i].dy +"','"+  _this.data.list[i].kg +"','"+  _this.data.list[i].pj +"','"+  _this.data.list[i].gl +"','"+  _this.data.list[i].bz +"','"+  _this.data.list[i].dj +"','"+  _this.data.list[i].je +"')"
        }else{
          sql2 = sql2 + ",('" + _this.data.khmc + "','"+ _this.data.xdrq +"','" + _this.data.header_list.djbh +"','" + _this.data.shouhuo +"','"+ _this.data.lxdh +"','"+  _this.data.shfs +"','"+  _this.data.azdz +"','"+  _this.data.ddh +"','"+  _this.data.list[i].fj +"','"+  _this.data.list[i].gh +"','"+  _this.data.list[i].ddcd +"','"+  _this.data.list[i].sl +"','"+  _this.data.list[i].cxdk +"','"+  _this.data.list[i].lcb +"','"+  _this.data.list[i].lcys +"','"+  _this.data.list[i].gy +"','"+  _this.data.list[i].dy +"','"+  _this.data.list[i].kg +"','"+  _this.data.list[i].pj +"','"+  _this.data.list[i].gl +"','"+  _this.data.list[i].bz +"','"+  _this.data.list[i].dj +"','"+  _this.data.list[i].je +"')"
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
          wx.showToast({
            title: '添加成功！',
            icon: 'none'
          })
          
          var common_Interval = setInterval(()=>
          {
            wx.navigateBack({ 
              delta: 1
            });
            clearInterval(common_Interval);
          }, 2000)

          
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
        title: '基础信息填写不全！',
        icon: 'none'
      })
    }
    
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },


  upd1:function(){
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "update lightbelt set khmc = '"+ _this.data.khmc +"',xdrq = '"+ _this.data.xdrq +"',djbh = '"+ _this.data.djbh +"',shouhuo = '"+ _this.data.shouhuo +"',lxdh = '"+ _this.data.lxdh +"',shfs = '"+ _this.data.shfs +"',azdz = '"+ _this.data.azdz +"',ddh = '"+ _this.data.ddh +"', " + _this.data.this_column + "='" + _this.data.this_value + "' where  id=" + _this.data.id 
      },
      success: res => {
        
        _this.setData({
          id:'',
          this_column:'',
          this_value:'',
          
        })
        _this.qxShow()
        var e = [_this.data.khmc,_this.data.ddh]
        _this.tableShow(e)
        
        console.log('sadsadsadsa',_this.data.khmc)
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

  tab_del:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    wx.showModal({
      title: '提示',
      content: '确认删除此行数据？',
      success (res) {
        if (res.confirm) {
          var list = _this.data.list
          list.splice(e.currentTarget.dataset.index,1)
          _this.setData({
            list:list
          })
          console.log(list)
        } else if (res.cancel) {

        }
      }
    })
  },

  del1:function(e){
    var _this = this
    console.log('aaa',_this.data.list[e.currentTarget.dataset.index].id)

    wx.showModal({
      title: '提示',
      content: '确认删除此行数据？',
      success (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlserver_huaqun',
            data: {
              query: "delete from lightbelt where id=" + _this.data.list[e.currentTarget.dataset.index].id
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
              var e = [_this.data.khmc,_this.data.ddh]
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

        }
      }
    })
  },

  selCD: function () {
    var _this = this
    var list = _this.data.list
    list.push({
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
      list
    })
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      
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


function getBianHao() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = "DD"+ year.toString() + month.toString() + day.toString() ;
  return currentdate;
 }

 function getNowDate() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }