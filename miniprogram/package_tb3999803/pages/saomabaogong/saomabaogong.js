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
  intoShow:false,
  xlShow: false,
  xlShow2: false,
  sum_money:'',
  data: {
    header_list:{
      pdrq:'',
      dh:'',
      khmc:'',
      zdyh:'',
      scbh:'',
      ddzt: '',
      cl: '',
      zbs: '',
      order_number:'',
    },
    update_name:{
      pl:"配料",
      kl:"开料",
      fb:"封边",
      pk:"排孔",
      xt:"线条",
      fm:"覆膜",
      sg:"手工",
      wj:"五金",
      bz:"包装",
      rk:"入库",
      ck:"出库",
      pdts:"派单天数",
    },
    list: [],
    title: [
      {
        text: "来料",
        width: "120rpx",
        width2: "calc(120vmin / 7.5)",
        columnName: "ll",
        type: "text",
        isupd: true
      },
      {
        text: "名称/数量",
        width: "400rpx",
        width2: "calc(400vmin / 7.5)",
        columnName: "mcsl",
        type: "text",
        isupd: true
      },{
        text: "大类",
        width: "0rpx",
        width2: "calc(0vmin / 7.5)",
        columnName: "dl",
        type: "text",
        isupd: true
      },
      {
        text: "配料",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "pl",
        type: "text",
        isupd: true
      },
      {
        text: "开料",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "kl",
        type: "text",
        isupd: true
      },
      {
        text: "封边",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "fb",
        type: "text",
        isupd: true
      },{
        text: "排孔",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "pk",
        type: "text",
        isupd: true
      },{
        text: "线条",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "xt",
        type: "text",
        isupd: true
      },{
        text: "覆膜",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "fm",
        type: "text",
        isupd: true
      },{
        text: "手工",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "sg",
        type: "text",
        isupd: true
      },{
        text: "五金",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "wj",
        type: "text",
        isupd: true
      },{
        text: "包装",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "bz",
        type: "text",
        isupd: true
      },{
        text: "入库",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "rk",
        type: "text",
        isupd: true
      },{
        text: "出库",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "ck",
        type: "text",
        isupd: true
      },{
        text: "派单天数",
        width: "180rpx",
        width2: "calc(180vmin / 7.5)",
        columnName: "pdts",
        type: "text",
        isupd: true
      },{
        text: "材料+名称+备注",
        width: "0rpx",
        width2: "calc(0vmin / 7.5)",
        columnName: "mccl",
        type: "text",
        isupd: true
      },
    ],
    list:[],
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
    click_type: '报工界面',
    xiala_panduan1:[{name:''},{name:'出库'}],
    xiala_panduan2:[{name:''},{name:'完成'},{name:'缺料'},{name:'破损'}],
    dl_type: ['缺柜板','缺门板','缺条子','灯带板','异形板','手工件','弧形板','五金配件','其他'],
    gongxu_arr:['pl','kl','fb','pk','xt','fm','sg','wj','bz','rk','ck']

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var title = _this.data.title
    console.log(userInfo)
    if(userInfo.quanxian == '工序员'){
      if(userInfo.peiliao != '是'){
        title[3].isupd = false
      }
      if(userInfo.kailiao != '是'){
        title[4].isupd = false
      }
      if(userInfo.fengbian != '是'){
        title[5].isupd = false
      }
      if(userInfo.paikong != '是'){
        title[6].isupd = false
      }
      if(userInfo.xiantiao != '是'){
        title[7].isupd = false
      }
      if(userInfo.fumo != '是'){
        title[8].isupd = false
      }
      if(userInfo.shougong != '是'){
        title[9].isupd = false
      }
      if(userInfo.wujin != '是'){
        title[10].isupd = false
      }
      if(userInfo.baozhuang != '是'){
        title[11].isupd = false
      }
      if(userInfo.ruku != '是'){
        title[12].isupd = false
      }
      if(userInfo.chuku != '是'){
        title[13].isupd = false
      }
    }
    var order_number = options.order_number
    if(order_number == undefined){
      order_number = ""
    } 
    var this_date = getNowDate()
    var saoma = options.type
    _this.setData({
      userInfo,
      order_number,
      this_date,
      saoma,
      title
    })
    if(order_number != ''){
      _this.getBaoGong()
    }

  },

  get_ddzt:function(e){
    var _this = this
    var list = _this.data.list
    var gongxu_arr=_this.data.gongxu_arr
    var hang = ''
    var lie = ''
    console.log(list)
    console.log(gongxu_arr)
    var zongbaoshu = 0
    for (var i=0;i<list.length; i++){
      console.log(i)
      if(list[i].rk != ''){
        zongbaoshu = zongbaoshu + (list[i].rk * 1)
      }
      for (var j= gongxu_arr.length - 1; j>=0;j--){
        console.log(j)
        console.log(list[i][gongxu_arr[j]])
        if (list[i][gongxu_arr[j]] != ''){
          if(list[i][gongxu_arr[j]] == '完成'){
            var lie1 = j + 1
              if(lie1 > 11){
                lie1 = 11
              }else{
                lie1 = j + 1
                if(lie == ''){
                  lie = lie1
                }else if (lie1 < lie){
                  lie = lie1
                } 
              }
              break;
          }else if(list[i][gongxu_arr[j]] != ''){
            var lie1 = j
            if(lie == ''){
              lie = lie1
            }else if (lie1 < lie){
              lie = lie1
            }
            break;
          }
        }else if(list[i][gongxu_arr[j]] == '' && j==0){
          lie = 0
          break;
        }
      }
    }
    var gongxumc = ''
    if(lie != ''){
      if(lie == 0){
        gongxumc = '配料'
      }else if(lie == 1){
        gongxumc = '开料'
      }else if(lie == 2){
        gongxumc = '封边'
      }else if(lie == 3){
        gongxumc = '排孔'
      }else if(lie == 4){
        gongxumc = '线条'
      }else if(lie == 5){
        gongxumc = '覆膜'
      }else if(lie == 6){
        gongxumc = '手工'
      }else if(lie == 7){
        gongxumc = '五金'
      }else if(lie == 8){
        gongxumc = '包装'
      }else if(lie == 9){
        gongxumc = '入库'
      }else if(lie == 10){
        gongxumc = '出库'
      }
    }
    console.log(gongxumc)
    if(gongxumc == ''){
      gongxumc = '配料'
    }
    var header_list = _this.data.header_list
    header_list.ddzt = gongxumc
    header_list.cl = _this.data.list.length
    header_list.zbs = zongbaoshu
    _this.setData({
      header_list: header_list,
    })
  },
 
  bianhao_get:function(e){
    var _this = this
    wx.scanCode({
      success (res) {
        var order_number = res.result
        _this.setData({
          order_number
        })
        _this.getBaoGong()
      }
    })
  },

  getBaoGong:function(){
    var _this = this
    var header_list = _this.data.header_list
    if(_this.data.order_number != ''){
      var sql = "select id,pdrq,baogongmingxi.dh,khmc,zdyh,scbh,ll,mcsl,pl,kl,fb,pk,xt,fm,sg,wj,bz,case when rk != '' then rk when ruku is not null then ruku else '' end as rk,ck,plys,klys,fbys,pkys,xtys,fmys,sgys,wjys,bzys,rkys,ckys,bgry,ddzt,cl,zbs,ruku,isnull(dl,'') as dl from baogongmingxi left join (select max(convert(float,bh)) as ruku,dh,clmc from fenjiandabao  where bh != '' group by dh,clmc) as baohao on baogongmingxi.dh = baohao.dh and mcsl = clmc where baogongmingxi.dh = '" + _this.data.order_number + "' and baogongmingxi.jlbh is null;select spareMoney from madeOrder where productionNO='" + _this.data.order_number + "';"
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlServer_tb3999803',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          
          var list = res.result.recordsets[0]
          console.log(list)
          var order_money = ""
          if(res.result.recordsets[1].length >= 1){
            order_money = res.result.recordsets[1][0].spareMoney
          }
          //如果已有报工单，读取此前报工单显示到此页
          if(list.length > 0){
            header_list.pdrq = list[0].pdrq
            header_list.dh = list[0].dh
            header_list.khmc = list[0].khmc
            header_list.zdyh = list[0].zdyh
            header_list.scbh = list[0].scbh
            // header_list.ddzt = list[0].ddzt
            // header_list.cl = list[0].cl
            // header_list.zbs = list[0].zbs
            for(var i=0; i<list.length; i++){
              if(list[i].rk == 0 || list[i].rk == '0'){
                list[i].rk = ''
              }
            } 
            if(list[0].pdrq != ''){
              for(var i=0; i<list.length; i++){
                var paidan_date = list[0].pdrq.replaceAll("/","-")
                var this_date = _this.data.this_date
                list[i].pdts = DateDiff(this_date,paidan_date)
              } 
            }
            var list_old = JSON.stringify(list)
            list_old = JSON.parse(list_old)
            _this.setData({
              header_list,
              list,
              list_old,
              order_money
            })
            var list1 = _this.data.list
            var gongxu_arr = _this.data.gongxu_arr
            // list1[_this.data.this_index][_this.data.this_column] = _this.data.this_value
            // for(var i=0; i<list.length; i++){
            //   if (list[i].pl == "缺料" || list[i].pl == "破损") {
            //     wx.showModal({
            //       title: "提示",
            //       content: '是否为此订单进行补货跳转？',
            //       cancelColor: '#282B33',
            //       confirmColor: '#BC4A4A',
            //       success: res => {
            //         if (res.confirm) { 
            //           var khmc = header_list.khmc
            //           var zdyh = header_list.zdyh
            //           var dh = header_list.dh
            //           var mccl=""
            //           wx.navigateTo({
            //             url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&khmc=' + khmc+'&zdyh=' + zdyh+ '&productionNo=' + dh+'&xmjy='+"1"+'&mccl='+mccl+'&dh=' +dh+'&tz='+"smbg",
            //           })
            //         } else if (res.cancel) {
            //           console.log('用户点击取消')
            //         }
            //       }
            //     })
            //   }
            // }

            _this.get_ddzt()
          //如果没有报工单，读取订单信息生成新单
          }else{
            wx.showModal({
              title: "提示",
              content: '未读取到此单号报工单，是否新建？',
              cancelColor: '#282B33',
              confirmColor: '#BC4A4A',
              success: res => {
                if (res.confirm) {
                  wx.cloud.callFunction({
                    name: 'sqlServer_tb3999803',
                    data: {
                      query: "select paidanDate as pdrq,productionNO as dh,customerName as khmc,[user] as zdyh,spareMoney as scbh,orderMoney from madeOrder where productionNO = '" + _this.data.order_number + "';select pickingNo as ll,pickingName as mcsl,'' as pl,'' as kl,'' as fb,'' as pk,'' as xt,'' as fm,'' as sg,'' as wj,'' as bz,'' as rk,'' as ck,'15189684' as plys,'15189684' as klys,'15189684' as fbys,'15189684' as pkys,'15189684' as xtys,'15189684' as fmys,'15189684' as sgys,'15189684' as wjys,'15189684' as bzys,'15189684' as rkys,'15189684' as ckys from picking where productionNo = '" + _this.data.order_number + "'"
                    }, 
                    success: res => {
                      console.log(res)
                      var header_list = res.result.recordsets[0][0]
                      var order_money = header_list.orderMoney
                      console.log(order_money)
                      var list = res.result.recordsets[1]
                      if(header_list.length < 1){
                        wx.showToast({
                          title: '未读取到订单信息',
                          icon: 'none',
                        })
                        return;
                      }else if(list.length < 1){
                        wx.showToast({
                          title: '未读取到订单中材料信息',
                          icon: 'none',
                        })
                        return;
                      }
                      if(header_list.pdrq != ''){
                        for(var i=0; i<list.length; i++){
                          var paidan_date = header_list.pdrq.replaceAll("/","-")
                          var this_date = _this.data.this_date
                          list[i].pdts = DateDiff(this_date,paidan_date)
                        }
                      }
                      var list_old = JSON.stringify(list)
                      list_old = JSON.parse(list_old)
                      _this.setData({
                        header_list,
                        list,
                        list_old: list_old,
                        order_money
                      })
                      wx.showToast({
                        title: '已创建',
                        icon: 'none',
                      })
                      _this.get_ddzt()
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
          }
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
    }else{
      wx.showToast({
        title: '未读取到单号',
      })
    }
  },

  sel_xiala: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    console.log('index：', e.currentTarget.dataset.index)
    var list = _this.data[_this.data.this_column + "_list"]
    if(_this.data.xiala_panduan == 0){
      return;
    }
    if(_this.data.xiala_panduan == 1){
      list = _this.data.xiala_panduan1
    }else if(_this.data.xiala_panduan == 2){
      list = _this.data.xiala_panduan2
    }
    _this.setData({
      list_xiala: list,
    })
    console.log(list)
    _this.setData({
      xlShow: true
    })
  },

  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      var this_value = e.detail.name
      _this.setData({
        xlShow: false,
        this_value
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow: false,
      })
    }
  },

  bindPickerChange: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.dl_type[e.detail.value]
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      intoShow:false,
      currentDate: new Date().getTime()
    })
  },

  clickView1:function(e){
    var _this = this
    var this_column = e.currentTarget.dataset.column
    var index = e.currentTarget.dataset.index
    var isupd = e.currentTarget.dataset.isupd
    if(isupd == false){
      wx.showToast({
        title: '当前人员无此工序报工权限',
        icon: 'none',
      })
      return;
    }
    var this_value = e.currentTarget.dataset.value
    if(_this.data.click_type == '报工界面'){
      if(this_column == "ll" || this_column == "mcsl" || this_column == "pdts"){
        return;
      }
      console.log(e.currentTarget.dataset.column)
      console.log(e.currentTarget.dataset.value)
      console.log(e.currentTarget.dataset.index)
      var panduan = 0
      var this_type = "text"
      if(this_column == 'rk'){
        this_type = 'digit'
      }
  
      if(this_column == "rk"){
        panduan = 0
      }else if(this_column == "ck"){
        panduan = 1
      }else{
        panduan = 2
      }
  
      var this_row = e.currentTarget.dataset.index
   
      _this.setData({
        this_type,
        this_column:e.currentTarget.dataset.column,
        this_value:e.currentTarget.dataset.value,
        xiala_panduan:panduan,
        this_index:e.currentTarget.dataset.index,
        dl: _this.data.list[e.currentTarget.dataset.index].dl,
        mcsl: _this.data.list[e.currentTarget.dataset.index].mcsl,
        xgShow:true,
      })
    }else{
      var list = _this.data.list
      list[index][this_column + 'ys'] = list[index][this_column + 'ys'] == '16777215' ? '15189684' : '16777215' 
      _this.setData({
        list
      })
    }
    _this.get_ddzt()
  },

  upd2:function(){
    var _this = this
    var list = _this.data.list
    
    var kailiao_list = _this.data.kailiao_list
    var gongxu_arr = _this.data.gongxu_arr
    var header_list = _this.data.header_list
  
    list[_this.data.this_index][_this.data.this_column] = _this.data.this_value
    for(var i=0; i<gongxu_arr.length; i++){
      if(gongxu_arr[i] == _this.data.this_column){
        break;
      }
      if(gongxu_arr[i] == 'rk'){
        continue;
      }
      if(list[_this.data.this_index][gongxu_arr[i]] != '完成' && list[_this.data.this_index][gongxu_arr[i] + "ys"] != '16777215' && _this.data.this_column != gongxu_arr[i]){
        list[_this.data.this_index][gongxu_arr[i]] = '完成'
      }
    }
    // if(list[_this.data.this_index][gongxu_arr[i]]=='缺料'){
    //   wx.showModal({
    //     title: "提示",
    //     content: '是否为此订单进行补货跳转？',
    //     cancelColor: '#282B33',
    //     confirmColor: '#BC4A4A',
    //     success: res => {
    //       if (res.confirm) { 
            
    //         // var order_number = _this.data.list[index].productionNo
    //         // console.log(order_number)
            
    //         var khmc = header_list.khmc
    //         var zdyh = header_list.zdyh
    //         var dh = header_list.dh
    //         console.log("---------------")
    //         var xm=list[_this.data.this_index][gongxu_arr[0]]
    //         var dl=this.data.dl
    //         console.log(xm)
    //         console.log(dl)
    //         var mccl =list[_this.data.this_index].mcsl.split('/')
    //         wx.navigateTo({
    //           url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&khmc=' + khmc+'&zdyh=' + zdyh+ '&productionNo=' + dh+'&xmjy='+"1"+'&mccl='+mccl+'&dh=' +dh+'&tz='+"smbg",
    //         })
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }
    // if(list[_this.data.this_index][gongxu_arr[i]]=='破损'){
    //   wx.showModal({
    //     title: "提示",
    //     content: '是否为此订单进行补货跳转？',
    //     cancelColor: '#282B33',
    //     confirmColor: '#BC4A4A',
    //     success: res => {
    //       if (res.confirm) { 
            
    //         var khmc = header_list.khmc
    //         var zdyh = header_list.zdyh
    //         var dh = header_list.dh
    //         console.log("---------------")
          
    //         var mccl =list[_this.data.this_index].mcsl.split('/')
    //         wx.navigateTo({
    //           url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&khmc=' + khmc+'&zdyh=' + zdyh+ '&productionNo=' + dh+'&xmjy='+"1"+'&mccl='+mccl+'&dh='+dh+'&tz='+"smbg",
    //         })
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }
    console.log("---------------")
    console.log(list[_this.data.this_index][gongxu_arr[i]])
    var index = _this.data.this_index
    var this_column = "mccl"
    var this_column1 = "dl"
    var list = _this.data.list
    list[index][this_column] = _this.data.mcsl
    list[index][this_column1] = _this.data.dl
    _this.setData({
      list:list,
    })
    _this.qxShow()
    _this.get_ddzt()
  },

  type_switch:function(){
    var _this = this
    var click_type = _this.data.click_type
    var userInfo = _this.data.userInfo
    if(userInfo.quanxian == '工序员'){
      wx.showToast({
        title: '工序员不允许使用工序调整',
        icon : 'none'
      })
      return;
    }
    var new_type = click_type == '报工界面'?'工序调整':'报工界面'
    wx.showModal({
      title: "提示",
      content: '当前点击工序列时为'+ click_type +'操作，是否切换为' + new_type + '？',
      cancelColor: '#282B33',
      confirmColor: '#BC4A4A',
      success: res => {
        if (res.confirm) {
          _this.setData({
            click_type: new_type
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  save_baogong:function(){
    var _this = this
    var header_list = _this.data.header_list
    var list = _this.data.list
    var list_old = _this.data.list_old
    var gongxu_arr = _this.data.gongxu_arr
    var lie = 'pl'
    if(list.length < 1){
      wx.showToast({
        title: '未读取到报工单信息',
        icon: 'none',
      })
      return;
    }
    
    var del_sql = "delete from baogongmingxi where dh='" + header_list.dh + "';"
    var ins_sql = "insert into baogongmingxi(pdrq,dh,khmc,zdyh,scbh,ll,mcsl,pl,kl,fb,pk,xt,fm,sg,wj,bz,rk,ck,plys,klys,fbys,pkys,xtys,fmys,sgys,wjys,bzys,rkys,ckys,zbs,dl,xm,mccl,fqrq) values "
    var ins_sql2 = ""
    for(var i=0; i<list.length; i++){
      var xzxm = ""
      if (list[i].pl == "缺料" || list[i].pl == "破损") {
        xzxm = list[i].pl
      } else if(list[i].kl == "缺料" || list[i].kl == "破损") {
        xzxm = list[i].kl
      }else if(list[i].fb == "缺料" || list[i].fb == "破损") {
        xzxm = list[i].fb
      }else if(list[i].pk == "缺料" || list[i].pk == "破损") {
        xzxm = list[i].pk
      }else if(list[i].xt == "缺料" || list[i].xt == "破损") {
        xzxm = list[i].xt
      }else if(list[i].fm == "缺料" || list[i].fm == "破损") {
        xzxm = list[i].fm
      }else if(list[i].sg == "缺料" || list[i].sg == "破损") {
        xzxm = list[i].sg
      }else if(list[i].wj == "缺料" || list[i].wj == "破损") {
        xzxm = list[i].wj
      }else if(list[i].bz == "缺料" || list[i].bz == "破损") {
        xzxm = list[i].bz
      }

      if(ins_sql2 == ''){
        ins_sql2 = "('" + header_list.pdrq + "','" + header_list.dh + "','" + header_list.khmc + "','" + header_list.zdyh + "','" + header_list.scbh + "','" + list[i].ll + "','" + list[i].mcsl + "','" + list[i].pl + "','" + list[i].kl + "','" + list[i].fb + "','" + list[i].pk + "','" + list[i].xt + "','" + list[i].fm + "','" + list[i].sg + "','" + list[i].wj + "','" + list[i].bz + "','" + list[i].rk + "','" + list[i].ck + "','" + list[i].plys + "','" + list[i].klys + "','" + list[i].fbys + "','" + list[i].pkys + "','" + list[i].xtys + "','" + list[i].fmys + "','" + list[i].sgys + "','" + list[i].wjys + "','" + list[i].bzys + "','" + list[i].rkys + "','" + list[i].ckys + "','" + header_list.zbs + "','"+ list[i].dl +"','" + xzxm + "','" + list[i].mccl + "',CONVERT(varchar, GETDATE(), 120))"
      }else{
        ins_sql2 = ins_sql2 + ",('" + header_list.pdrq + "','" + header_list.dh + "','" + header_list.khmc + "','" + header_list.zdyh + "','" + header_list.scbh + "','" + list[i].ll + "','" + list[i].mcsl + "','" + list[i].pl + "','" + list[i].kl + "','" + list[i].fb + "','" + list[i].pk + "','" + list[i].xt + "','" + list[i].fm + "','" + list[i].sg + "','" + list[i].wj + "','" + list[i].bz + "','" + list[i].rk + "','" + list[i].ck + "','" + list[i].plys + "','" + list[i].klys + "','" + list[i].fbys + "','" + list[i].pkys + "','" + list[i].xtys + "','" + list[i].fmys + "','" + list[i].sgys + "','" + list[i].wjys + "','" + list[i].bzys + "','" + list[i].rkys + "','" + list[i].ckys + "','" + header_list.zbs + "','"+ list[i].dl +"','" + xzxm + "','" + list[i].mccl + "',CONVERT(varchar, GETDATE(), 120))"
      }
    }

    var xiaoxi_sql = "insert into xiaoxiguanli(ddh,khmc,zdyh,ddje,gx,wczt,bgry,rq,sl) values "
    var xiaoxi_sql2 = ""
    var this_riqi = getNowDate()
    for(var i=0; i<list.length; i++){
      for(var j=0; j<gongxu_arr.length; j++){
        if(list[i][gongxu_arr[j]] != list_old[i][gongxu_arr[j]]){
          var cailiao = list[i].mcsl.split('/')
          var mingcheng = ''
          var shuliang = ''
          if (cailiao.length >= 2){
            mingcheng = cailiao[0]
            shuliang = cailiao[1]
          }else{
            mingcheng = cailiao[0]
            shuliang = ''
          }
          if(xiaoxi_sql2 == ''){
            xiaoxi_sql2 = "('" + header_list.dh + "','" + header_list.khmc + "','" + header_list.zdyh + "','" + mingcheng + "','" + _this.data.update_name[gongxu_arr[j]] + "','" + list[i][gongxu_arr[j]] + "','" + _this.data.userInfo.name + "','" + this_riqi.replaceAll("-","/")+ "','" +  _this.data.header_list.cl + "')"
          }else{
            xiaoxi_sql2 = xiaoxi_sql2 + ",('" + header_list.dh + "','" + header_list.khmc + "','" + header_list.zdyh + "','" + mingcheng + "','" + _this.data.update_name[gongxu_arr[j]] + "','" + list[i][gongxu_arr[j]] + "','" + _this.data.userInfo.name + "','" + this_riqi.replaceAll("-","/") + "','" +  _this.data.header_list.cl + "')"
          }
        }
      }
    }
    var sql = del_sql + ins_sql + ins_sql2 + ";"
    if(xiaoxi_sql2 != ''){
      sql = sql + xiaoxi_sql + xiaoxi_sql2 + ";"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      }, 
      
      success: res => {
        console.log(_this.data.header_list.dh),
        console.log(res)
        wx.showToast({
          title: '保存成功',
          icon: 'none',
        })
        var order_number = _this.data.header_list.dh
        _this.setData({
          order_number
        })
        console.log(order_number)
        _this.getBaoGong()
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

    _this.ff()

  },

  ff: function() {
    var _this = this
    var header_list = _this.data.header_list
    var list = _this.data.list
    setTimeout(() => {
      for(var i=0; i<list.length; i++){
        if (list[i].pl == "缺料" || list[i].pl == "破损" || list[i].kl == "缺料" || list[i].kl == "破损" || list[i].fb == "缺料" || list[i].fb == "破损" || list[i].pk == "缺料" || list[i].pk == "破损" || list[i].xt == "缺料" || list[i].xt == "破损" || list[i].fm == "缺料" || list[i].fm == "破损" || list[i].sg == "缺料" || list[i].sg == "破损" || list[i].wj == "缺料" || list[i].wj == "破损" || list[i].bz == "缺料" || list[i].bz == "破损") {
          wx.showModal({
            title: "提示",
            content: '是否为此订单进行补货跳转？',
            cancelColor: '#282B33',
            confirmColor: '#BC4A4A',
            success: res => {
              if (res.confirm) { 
                var khmc = header_list.khmc
                var zdyh = header_list.zdyh
                var dh = header_list.dh
                var mccl=""
                wx.navigateTo({
                  url: '../buhuoxialiaodan/buhuoxialiaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&khmc=' + khmc+'&zdyh=' + zdyh+ '&productionNo=' + dh+'&xmjy='+"1"+'&mccl='+mccl+'&dh=' +dh+'&tz='+"smbg",
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    }, 2000);
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  onInput_header: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    var header_list = _this.data.header_list
    header_list[column] = e.detail.value
    _this.setData({
      header_list
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
    var _this = this
    var saoma = _this.data.saoma
    console.log(saoma)
    if (saoma != undefined){
      _this.bianhao_get()
      _this.setData({
        saoma:undefined
      })
    }
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

 function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式  
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split("-")
  oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0] + " 00:00:00") //转换为12-18-2002格式  
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0] + " 00:00:00")
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
  if(oDate1 - oDate2 > 0){
    return iDays
  }else{
    return iDays * -1
  }

}