// miniprogram/packageP/page/PaiBan/PaiBan.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  tableShow:true,
  delWindow1:false,
  tjShow:false,
  rqxzShow1:false,
  rqxzShow2:false,
  rqxzShow3:false,
  bcShow:false,
  handle:true,
  onOff:true,
  xgShow:false,
  data: {
    SQLlist:[],
    PaiBanlist:[],
    list:[],
    list2:[],
    listJiQi:[],
    listBUMEN:[],
    listRenYuan:[],
    listfbc:[
      {name:"1"},
      {name:"2"},
      {name:"3"},
      {name:"4"}
    ],
    title: 
    [{ text: "创建日期", width: "200rpx", columnName: "riqi", type: "digit", isupd: true },
    { text: "计划名称", width: "200rpx", columnName: "plan_name", type: "text", isupd: true },
    { text: "人数", width: "200rpx", columnName: "renshu", type: "text", isupd: true },
    { text: "部门", width: "200rpx", columnName: "department_name", type: "text", isupd: true },
  ],
  title2: 
    [ { text: "姓名", width: "200rpx", columnName: "staff_name", type: "digit", isupd: true },
    { text: "电话", width: "200rpx", columnName: "phone_number", type: "text", isupd: true },
    { text: "身份证号", width: "200rpx", columnName: "id_number", type: "text", isupd: true },
    { text: "部门名称", width: "200rpx", columnName: "department_name", type: "text", isupd: true },
    { text: "班次", width: "200rpx", columnName: "banci", type: "text", isupd: true },
  ],
  id:"",
  riqi:"",
  renshu:"",
  plan_name:"",
  department_name:"",

  user:"",
  index:"",

  did:"",
  sname:"",
  pnumber:"",
  inumber:"",
  dname:"",
  banci:"",

  riqi1:"",
  riqi2:"",
  fbanci:"",
  zmfz:"",
  lzts:"",
  jhmc:"",
  minDate: new Date(1899, 1, 1).getTime(),
  maxDate: new Date(2030, 12, 31).getTime(),
  currentDate: new Date().getTime(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.tableShow()
    _this.getSystemName()
    console.log(_this.data.listBUMEN)
    _this.setData({
      handle: true,
      onOff:true
    })
  },
//初始数据
tableShow:function(){
  var _this = this
  let user = app.globalData.gongsi;
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: "select * from paibanbiao_info where remarks1='" + user + "'"
    },
    success: res => {
      var list = res.result.recordset
      _this.setData({
        list: list,
        listJiQi:list
      })
      // console.log(list)
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

clickView:function(e){
  console.log(e);
   var _this=this
     _this.setData({
      riqi: _this.data.list[e.currentTarget.dataset.index].riqi,
      plan_name: _this.data.list[e.currentTarget.dataset.index].plan_name,
      renshu: _this.data.list[e.currentTarget.dataset.index].renshu,
      department_name: _this.data.list[e.currentTarget.dataset.index].department_name,
      id: _this.data.list[e.currentTarget.dataset.index].id,
       handle:false,
       index: e.currentTarget.dataset.index,
     })  
     console.log(_this.data.index)
 },

 scPaiBan:function(){
   var _this = this
   _this.setData({
    delWindow1:true
   })
 },
 hid_view:function(){
   var _this = this
   _this.setData({
     handle:true
   })
 },

 xgPaiBan:function(){
   var _this = this
   _this.setData({
    xgShow:true
   })
 },


 sure1:function(){
  var _this = this
  let user = app.globalData.gongsi;
  console.log(_this.data.listJiQi[_this.data.index].id)
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: "delete from paibanbiao_info where id=(select top 1 id from paibanbiao_info where id='" + _this.data.listJiQi[_this.data.index].id + "')and remarks1='" + user + "'"
    },
    success: res => {
      wx.showToast({
        title: '删除成功！',
        icon: 'none'
      })
      _this.tableShow()
      _this.qxShow()
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
  _this.qxShow()
  
},
qxShow:function(){
  var _this = this
  _this.setData({
    delWindow1:false,
    rqxzShow1:false,
    rqxzShow2:false,
    rqxzShow3:false,
    tjShow:false,
    handle:true,
    xgShow:false,
    riqi: "",
    plan_name: "",
    renshu: "",
    department_name: "",
    id: "",
  })
},
qxShow2:function(){
  var _this = this
  _this.setData({
    delWindow1:false,
    rqxzShow1:false,
    rqxzShow2:false,
    rqxzShow3:false,
  })
},
//日期事件
selRIQI1:function(){
  var _this=this
  _this.setData({
    rqxzShow1:true,
  })
},
selRIQI2:function(){
  var _this=this
  _this.setData({
    rqxzShow2:true,
  })
},

selBM:function(){
  var _this = this
  _this.setData({
    rqxzShow3: true
  })
},

selFBC:function(){
  var _this = this
  _this.setData({
    bcShow: true
  })
},

select2: function (e) {
  var _this = this
  _this.setData({
    rqxzShow3: false
  })
  if (e.type == 'select') {
    var bmname = e.detail.name
    var _this = this
  let user = app.globalData.gongsi;
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: "select * from paibanbiao_renyuan where company='" + user + "' and department_name ='"+ bmname + "'"
    },
    success: res => {
      var list = res.result.recordset
      var list2 = []
      for(var i = 0 ; i < list.length;i++){
        list2.push({
          id:list[i].id,
          panduan : false
        })
      }
      _this.setData({
        list2: list,
        listRenYuan:list2
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
    _this.setData({
      dname: e.detail.name,
    })

  }
},

select3: function (e) {
  var _this = this
  _this.setData({
    bcShow: false
  })
  if (e.type == 'select') {
    _this.setData({
      fbanci: e.detail.name,
    })
  }
},

//修改触发
onInput: function (e) {
  var _this = this
  let column = e.currentTarget.dataset.column
  _this.setData({
    currentDate: e.detail,
    [column]: e.detail.value
  })
},
//添加触发
inquire:function(){
  var _this=this
  _this.setData({
    list2:[],
    tjShow:true,
  })
},
onInput2:function(){
  var _this=this
  var date = new Date(_this.data.currentDate)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  console.log(_this)
  var riqi=Y+M+D
  console.log(riqi)
  console.log(_this.data.riqi1)
  if(riqi>_this.data.riqi2&&_this.data.riqi2!=""){
    wx.showToast({
      title: '截止日期不可以小于起始日期！',
      icon: 'none'
    })
  }else{
    _this.setData({
      riqi1: riqi,
    });
    _this.qxShow2()
  }
  
},
onInput3:function(){
  var _this=this
  var date = new Date(_this.data.currentDate)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  console.log(_this)
  var riqi=Y+M+D
  console.log(riqi)
  console.log(_this.data.riqi2)
  if(_this.data.riqi1>riqi){
    wx.showToast({
      title: '截止日期不可以小于起始日期！',
      icon: 'none'
    })
  }else{
    _this.setData({
      riqi2: riqi,
    });
    _this.qxShow2()
  } 
},
//部门
getSystemName:function(){
  var _this = this;
  let user = app.globalData.gongsi;
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: "select distinct department_name as name from paibanbiao_renyuan where company='" + user + "'"
    },
    success: res => {
      var list = res.result.recordset
      _this.setData({
        listBUMEN: list
      })
    },
    err: res => {
      console.log("错误!"+ res)
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

gongSi : function(e){
  var _this =this;
  _this.setData({
    index : e.detail.value
  })
},

RenYuanChange:function(e){
  var _this = this
  var id = e.currentTarget.dataset.id
  var value = e.detail.value
  var list = _this.data.listRenYuan
  for(let i = 0; i < list.length ; i++){
    if(list[i].id == id){
      if(value == ""){
        list[i].panduan = false
      }else{
        list[i].panduan = true
      }
    }
  }
  _this.setData({
    listRenYuan : list
  })
},

upd1: function () {
  var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "update paibanbiao_info set riqi='" + _this.data.riqi + "',plan_name='" + _this.data.plan_name + "',renshu='" + _this.data.renshu + "',department_name='" + _this.data.department_name +"' where id='" + _this.data.id +"'"
      },
      success: res => {
        _this.setData({
          riqi: "",
          plan_name: "",
          renshu: "",
          department_name: "",
          id: "",
        })
        _this.qxShow()
        _this.tableShow()
        wx.showToast({
          title: '修改成功！',
          icon: 'none',
          duration: 3000
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

add1:function(){
  var _this = this
  var user = app.globalData.gongsi;
  _this.setData({
    onOff:false,
    SQLlist:[],
    PaiBanlist:[]
  })
  /*判断填写信息*/
  if (_this.data.riqi1 == "" ||_this.data.riqi2 == "" ||_this.data.dname == "" ||_this.data.fbanci == "" ||_this.data.zmfz == "" ||_this.data.lzts == "" ||_this.data.jhmc == ""){
    wx.showToast({
      title: '信息填写不全！',
      icon: 'none'
    })
    _this.setData({
      onOff:true,
    })
  }else{
    var list_RenYuan = []
    var list2 = _this.data.list2
    var listRenYuan = _this.data.listRenYuan
    for(var i=0;i<listRenYuan.length;i++){
      if(listRenYuan[i].panduan==true){
        for(var j=0;j<list2.length;j++){
          if(listRenYuan[i].id == list2[j].id){
            list_RenYuan.push({
              staff_name:list2[j].staff_name,
              phone_number:list2[j].phone_number,
              id_number:list2[j].id_number,
              department_name:list2[j].department_name,
              banci:list2[j].banci
            })
          }
        }
      }
    }
    /*判断人员选择*/
    if(list_RenYuan != ""){
      /*开始日期和结束日期*/
      var start_date = _this.data.riqi1
      var stop_date = _this.data.riqi2
      var rq = start_date.split("-")
      start_date = new Date(rq[0],rq[1]-1,rq[2])
      rq = stop_date.split("-")
      stop_date = new Date(rq[0],rq[1]-1,rq[2])
      /*其他信息*/
      var bumen_name = _this.data.dname
      var fbanci = _this.data.fbanci
      var zhoumo_fenzu = _this.data.zmfz
      var lunhuan_day = _this.data.lzts
      var jihua_name = _this.data.jhmc
      var myDate = new Date()
      var yy = myDate.getFullYear()
      var mm = myDate.getMonth() + 1
      var dd = myDate.getDate()
      var ss = myDate.getSeconds()
      if(mm<10){
        mm = "0" + mm
      }
      if (dd<10){
        dd = "0" + dd
      }
      if (ss<10){
        ss = "0" + ss
      }
      var paibanbiao_id = yy + mm + dd + ss
      /*计算时间差*/
      var paiban_day = Math.floor((stop_date - start_date) / 1000 / 60 / 60 / 24)

      var isnext_banci = false
      var dangqianpaidaorenci = 0
      var xunhuanjitian = 0
      var forindex = 0
      var isnew_time = false
      var bencijialejigeren = 0
      var index_xunhuanday28 = 0
      var startDate_weeki = start_date.getDay()
      var isrunnew_week1 = true
      var panduan_jian = 0
      var start_date2 = start_date
      if (startDate_weeki !=1){
        panduan_jian = startDate_weeki - 1
      }
      console.log(panduan_jian)

      /*循环总天数*/
      for (var i = 0 ; i <= paiban_day ; i++){
        /*排班时间*/
        var start_date = _this.data.riqi1
        var paiban_date = ""
        var rq = start_date.split("-")
        paiban_date = new Date(rq[0],rq[1]-1, parseInt(rq[2],10) + parseInt(i,10))

        /*判断当月1号星期，如果不是星期一，使用下面变量*/
        if (start_date2.getMonth() < paiban_date.getMonth()){
          startDate_weeki = paiban_date.getDay()
          panduan_jian = paiban_date.getDay() - 1
          start_date2 = paiban_date
          console.log(panduan_jian)
          console.log(startDate_weeki)
          isrunnew_week1 = true
        }
        /*结束*/

        var indexi = 0
        var weeki = paiban_date.getDay()
        xunhuanjitian++
        if (lunhuan_day > 0 ){
          var exitfor = 0
          
          /*四人循环*/
          for(j=0;j<list_RenYuan.length;j++){
            var temp_staff_name = list_RenYuan[j].staff_name
            var temp_phone_number = list_RenYuan[j].phone_number
            var temp_id_number = list_RenYuan[j].id_number
            var temp_department_name = list_RenYuan[j].department_name
            var temp_banci = list_RenYuan[j].banci
            var temp_d = i

            var yy = paiban_date.getFullYear()
            var mm = paiban_date.getMonth()+1
            var dd = paiban_date.getDate()
            if(mm<10){
              mm = "0" + mm
            }
            if (dd<10){
              dd = "0" + dd
            }
            var temp_date = yy + "-" + mm + "-" + dd
            var temp_company = user
            var paibanlist = []
                paibanlist.push({
                  temp_staff_name:temp_staff_name,
                  temp_phone_number:temp_phone_number,
                  temp_id_number:temp_id_number,
                  temp_department_name:temp_department_name,
                  temp_banci:temp_banci,
                  temp_d:temp_d,
                  temp_date:temp_date,
                  temp_company:temp_company,
                  weeki:weeki,
                  fbanci:fbanci,
                  zhoumo_fenzu:zhoumo_fenzu,
                  i:i,
                  indexi:indexi,
                  lunhuan_day:lunhuan_day,
                  jihua_name:jihua_name,
                  dangqianpaidaorenci:dangqianpaidaorenci,
                  paibanbiao_id:paibanbiao_id,
                  paiban_banci:"无"
                })
            /*隔天轮换*/
            if(forindex == 0){
              if (dangqianpaidaorenci < (list_RenYuan.length / fbanci) || (isnew_time == true &&  exitfor < dangqianpaidaorenci)){
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.diyizhou_panban_lunhuanzhi()
                paibanlist = _this.data.PaiBanlist
                if (isnew_time == false)
                {
                    dangqianpaidaorenci++;
                    bencijialejigeren++;
                }
              }
              exitfor++
              if ((isnew_time == false && dangqianpaidaorenci == (list_RenYuan.length / fbanci)) || exitfor == (list_RenYuan.length / fbanci)){
                if (list_RenYuan.length == exitfor){
                  isnew_time = true;
                }
                indexi++;
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.panbansql_add()
                continue;
              }

            }

            if(forindex == 1){
              if (dangqianpaidaorenci <= exitfor || (isnew_time == true && dangqianpaidaorenci - bencijialejigeren <= exitfor)){
                
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.diyizhou_panban_lunhuanzhi()
                paibanlist = _this.data.PaiBanlist
                if (isnew_time == false)
                {
                    dangqianpaidaorenci++
                    bencijialejigeren++
                }
              }
              exitfor++
              if ((isnew_time == false && dangqianpaidaorenci == (list_RenYuan.length / fbanci * 2)) || exitfor == (list_RenYuan.length / fbanci * 2)){
                isnew_time = true
                indexi++
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.panbansql_add()
                break
              }
            }
            if(forindex == 2){
              if (dangqianpaidaorenci <= exitfor || (isnew_time == true && dangqianpaidaorenci - bencijialejigeren <= exitfor)){
                
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.diyizhou_panban_lunhuanzhi()
                paibanlist = _this.data.PaiBanlist
                if (isnew_time == false)
                {
                    dangqianpaidaorenci++;
                    bencijialejigeren++;
                }
              }
              exitfor++
              if ((isnew_time == false && dangqianpaidaorenci == (list_RenYuan.length / fbanci * 3)) || exitfor == (list_RenYuan.length / fbanci * 3)){
                isnew_time = true
                indexi++
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.panbansql_add()
                break
              }
            }
            indexi++
            _this.setData({
              PaiBanlist:paibanlist
            })
            _this.panbansql_add()
          }
          if (xunhuanjitian == lunhuan_day)
          {
              isnew_time = false
              isnext_banci = true
              forindex++
              bencijialejigeren = 0
              xunhuanjitian = 0
              if (dangqianpaidaorenci == list_RenYuan.length)//如果本轮人数循环完毕则循环下一个周期重新当第一天排班
              {
                  dangqianpaidaorenci = 0
                  forindex = 0
              }
          }
        }
        else{
          /*按周轮换*/
          if (i % 28 == 0){
            index_xunhuanday28 = 0
          }
          for(j=0;j<list_RenYuan.length;j++){
            var temp_staff_name = list_RenYuan[j].staff_name
            var temp_phone_number = list_RenYuan[j].phone_number
            var temp_id_number = list_RenYuan[j].id_number
            var temp_department_name = list_RenYuan[j].department_name
            var temp_banci = list_RenYuan[j].banci
            var temp_d = i

            var yy = paiban_date.getFullYear()
            var mm = paiban_date.getMonth() + 1
            var dd = paiban_date.getDate()
            if(mm<10){
              mm = "0" + mm
            }
            if (dd<10){
              dd = "0" + dd
            }
            var temp_date = yy + "-" + mm + "-" + dd
            var temp_company = user
            var paibanlist = []
            paibanlist.push({
              temp_staff_name:temp_staff_name,
              temp_phone_number:temp_phone_number,
              temp_id_number:temp_id_number,
              temp_department_name:temp_department_name,
              temp_banci:temp_banci,
              temp_d:temp_d,
              temp_date:temp_date,
              temp_company:temp_company,
              weeki:weeki,
              fbanci:fbanci,
              zhoumo_fenzu:zhoumo_fenzu,
              i:i,
              indexi:indexi,
              lunhuan_day:lunhuan_day,
              jihua_name:jihua_name,
              dangqianpaidaorenci:dangqianpaidaorenci,
              paibanbiao_id:paibanbiao_id,
              paiban_banci:"无",
              renyuan_count:listRenYuan.length
            })

            if(startDate_weeki != 1){
              /*第一周*/
              if (index_xunhuanday28 <= (6 - panduan_jian) && isrunnew_week1 == true){
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.diyizhou_panban()
                paibanlist = _this.data.PaiBanlist
              }
              if (index_xunhuanday28 == (6 - panduan_jian) && indexi >= (list_RenYuan.length - 1) && isrunnew_week1 == true){
                isrunnew_week1 = false
                index_xunhuanday28 = 0
                indexi++
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.panbansql_add()
                break
              }
              /*判断不是第一周*/
              if (isrunnew_week1 == false){
                /*第一周*/
                if (index_xunhuanday28 <= 6 - panduan_jian){
                  _this.setData({
                    PaiBanlist:paibanlist
                  })
                  _this.dierzhou_panban()
                  // _this.diyizhou_panban()
                  paibanlist = _this.data.PaiBanlist
                }
                /*第二周*/
                else if (index_xunhuanday28 <= 13 - panduan_jian && index_xunhuanday28 > 6 - panduan_jian){
                  _this.setData({
                    PaiBanlist:paibanlist
                  })
                  _this.diyizhou_panban()
                  // _this.dierzhou_panban()
                  paibanlist = _this.data.PaiBanlist
                }
                /*第三周*/
                else if (index_xunhuanday28 <= 20 - panduan_jian && index_xunhuanday28 > 13 - panduan_jian){
                  _this.setData({
                    PaiBanlist:paibanlist
                  })
                  _this.dierzhou_panban()
                  // _this.diyizhou_panban()
                  paibanlist = _this.data.PaiBanlist
                }
                /*第四周*/
                else if (index_xunhuanday28 <= 27 - panduan_jian && index_xunhuanday28 > 20 - panduan_jian){
                  _this.setData({
                    PaiBanlist:paibanlist
                  })
                  _this.diyizhou_panban()
                  // _this.dierzhou_panban()
                  paibanlist = _this.data.PaiBanlist
                }
              }
            }
            else{
              if (index_xunhuanday28 <= 6){
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.diyizhou_panban()
                paibanlist = _this.data.PaiBanlist
              }
              else if (index_xunhuanday28 <= 13 && index_xunhuanday28 > 6){
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.dierzhou_panban()
                paibanlist = _this.data.PaiBanlist
              }
              else if (index_xunhuanday28 <= 20 && index_xunhuanday28 > 13){
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.diyizhou_panban()
                paibanlist = _this.data.PaiBanlist
              }
              else if (index_xunhuanday28 <= 27 && index_xunhuanday28 > 20){
                _this.setData({
                  PaiBanlist:paibanlist
                })
                _this.dierzhou_panban()
                paibanlist = _this.data.PaiBanlist
              }
            }
            indexi++
            _this.setData({
              PaiBanlist:paibanlist
            })
            _this.panbansql_add()
          }
          index_xunhuanday28++
        }
      }
      /*添加排班计划sql*/
      var riqi = new Date()
      var yy = riqi.getFullYear()
      var mm = riqi.getMonth() + 1
      var dd = riqi.getDate()
      if (mm < 10){
        mm = "0" + mm
      }
      if (dd < 10){
        dd = "0" + dd
      }
      riqi = yy + "-" + mm + "-" + dd
      var pbsql = "insert into paibanbiao_info (riqi,renshu,plan_name,department_name,remarks1,remarks2) values ('" + riqi + "','" + list_RenYuan.length + "','" + jihua_name + "','" + bumen_name + "','" + user + "','" + paibanbiao_id + "');"
      _this.data.SQLlist.push({
        sql:pbsql
      })
      pbsql = ""
      var list = _this.data.SQLlist
      for (i=0;i<list.length;i++){
        pbsql = pbsql + list[i].sql
      }
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: pbsql
        },
        success: res => {
          _this.setData({
            onOff:true,
            riqi: "",
            plan_name: "",
            renshu: "",
            department_name: "",
            id: "",
          })
          _this.qxShow()
          _this.tableShow()
          wx.showToast({
            title: '排班成功！',
            icon: 'none',
            duration: 3000
          })
        },
        err: res => {
          console.log("错误!")
          _this.setData({
            onOff:true,
          })
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
          _this.setData({
            onOff:true,
          })
        }
      })
    }else{
      wx.showToast({
        title: '未选中员工！',
        icon: 'none'
      })
      _this.setData({
        onOff:true,
      })
    }
  }
},

diyizhou_panban_lunhuanzhi:function(){
  var _this = this
  var list = _this.data.PaiBanlist
  if(list[0].weeki == 6 || list[0].weeki == 0){
    if (list[0].weeki == 6){
      list[0].paiban_banci = "wirite day"
    }
    else{
      if (list[0].zhoumo_fenzu == 1 && list[0].fbanci == 1){
        list[0].paiban_banci = "black day"
      }
      else{
        list[0].paiban_banci = "wirite day"
      }
    }
  }
  else{
    list[0].paiban_banci = "wirite day"
  }
  _this.setData({
    PaiBanlist:list
  })
},

diyizhou_panban:function(){
  var _this = this
  var list = _this.data.PaiBanlist
  if(list[0].weeki == 6 || list[0].weeki == 0){
    if (list[0].weeki == 6){
      if (list[0].indexi < (list[0].renyuan_count / list[0].fbanci / list[0].zhoumo_fenzu)){

        list[0].paiban_banci = "wirite day"
      }
      if (list[0].indexi >= (list[0].renyuan_count / list[0].fbanci) && list[0].indexi < (list[0].renyuan_count / list[0].fbanci / list[0].zhoumo_fenzu + list[0].renyuan_count / list[0].fbanci)){

        list[0].paiban_banci = "black day"
      }
    }
    else{
      if (list[0].zhoumo_fenzu == 1 && list[0].fbanci == 1){

        list[0].paiban_banci = "black day"
      }
      else{
        if (list[0].indexi >= (list[0].renyuan_count / list[0].fbanci / list[0].zhoumo_fenzu) && list[0].indexi < (list[0].renyuan_count / list[0].fbanci)){

          list[0].paiban_banci = "black day"
        }
        if (list[0].indexi >= (list[0].renyuan_count / list[0].fbanci / list[0].zhoumo_fenzu + list[0].renyuan_count / list[0].fbanci) && list[0].indexi < (list[0].renyuan_count)){

          list[0].paiban_banci = "wirite day"
        }
      }
    }
  }
  else{
    if (list[0].indexi < list[0].renyuan_count / list[0].fbanci){

      list[0].paiban_banci = "wirite day"
    }
    else if (list[0].indexi >= list[0].renyuan_count / list[0].fbanci){

      list[0].paiban_banci = "black day"
    }
  }
  _this.setData({
    PaiBanlist:list
  })
},

dierzhou_panban:function(){
  var _this = this
  var list = _this.data.PaiBanlist
  if(list[0].weeki == 6 || list[0].weeki == 0){
    if (list[0].weeki == 6){
      if (list[0].indexi < (list[0].renyuan_count / list[0].fbanci / list[0].zhoumo_fenzu)){

        list[0].paiban_banci = "black day"
      }
      if (list[0].indexi >= (list[0].renyuan_count / list[0].fbanci) && list[0].indexi < (list[0].renyuan_count / list[0].fbanci / list[0].zhoumo_fenzu + list[0].renyuan_count / list[0].fbanci)){

        list[0].paiban_banci = "wirite day"
      }
    }
    else{
      if (list[0].zhoumo_fenzu == 1 && list[0].fbanci == 1){

        list[0].paiban_banci = "black day"
      }
      else{
        if (list[0].indexi >= (list[0].renyuan_count / list[0].fbanci / list[0].zhoumo_fenzu) && list[0].indexi < (list[0].renyuan_count / list[0].fbanci)){

          list[0].paiban_banci = "wirite day"
        }
        if (list[0].indexi >= (list[0].renyuan_count / list[0].fbanci / list[0].zhoumo_fenzu + list[0].renyuan_count / list[0].fbanci) && list[0].indexi < (list[0].renyuan_count)){

          list[0].paiban_banci = "black day"
        }
      }
    }
  }
  else{
    if (list[0].indexi < list[0].renyuan_count / list[0].fbanci){

      list[0].paiban_banci = "black day"
    }
    else if (list[0].indexi >= list[0].renyuan_count / list[0].fbanci){

      list[0].paiban_banci = "wirite day"
    }
  }
  _this.setData({
    PaiBanlist:list
  })
},

panbansql_add:function(){
  var _this = this
  var list = _this.data.PaiBanlist
  var sql = ""
      sql = "insert into paibanbiao_detail (staff_name,phone_number,banci,department_name,id_number,company,b,c,d,e) values ('" + list[0].temp_staff_name + "','" + list[0].temp_phone_number + "','" + list[0].temp_banci + "','" + list[0].temp_department_name + "','" + list[0].temp_id_number + "','" + list[0].temp_company + "','" + list[0].paiban_banci + "','" + list[0].temp_date + "','" + list[0].i + "','" + list[0].paibanbiao_id + "');"

  var sqllist = _this.data.SQLlist
  sqllist.push({
    sql:sql
  })
  _this.setData({
    SQLlist:sqllist
  })
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

  }
})