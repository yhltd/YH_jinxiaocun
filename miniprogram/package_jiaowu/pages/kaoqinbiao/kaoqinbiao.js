// packageP/page/PaiChanHeDui/PaiChanHeDui.js
const updSpace = require('../../util/updSpace')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  initHidView : true,
  hid_view : false,
  empty : "",
  userInfo : "",
  this_quanxian:"",
  chaxun_hidden:true,
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  hid_view : false,
  data: {
    list: [],
    title: [
      {text: "姓名",width: "200rpx",columnName: "s_name",type: "text",isupd: true},
      {text: "年",width: "200rpx",columnName: "nian",type: "text",isupd: true},
      {text: "月",width: "200rpx",columnName: "yue",type: "text",isupd: true},
      {text: "一",width: "200rpx",columnName: "ri1",type: "text",isupd: true},
      {text: "二",width: "200rpx",columnName: "ri2",type: "text",isupd: true},
      {text: "三",width: "200rpx",columnName: "ri3",type: "text",isupd: true},
      {text: "四",width: "200rpx",columnName: "ri4",type: "text",isupd: true},
      {text: "五",width: "200rpx",columnName: "ri5",type: "text",isupd: true},
      {text: "六",width: "200rpx",columnName: "ri6",type: "text",isupd: true},
      {text: "七",width: "200rpx",columnName: "ri7",type: "text",isupd: true},
      {text: "八",width: "200rpx",columnName: "ri8",type: "text",isupd: true},
      {text: "九",width: "200rpx",columnName: "ri9",type: "text",isupd: true},
      {text: "十",width: "200rpx",columnName: "ri10",type: "text",isupd: true},
      {text: "十一",width: "200rpx",columnName: "ri11",type: "text",isupd: true},
      {text: "十二",width: "200rpx",columnName: "ri12",type: "text",isupd: true},
      {text: "十三",width: "200rpx",columnName: "ri13",type: "text",isupd: true},
      {text: "十四",width: "200rpx",columnName: "ri14",type: "text",isupd: true},
      {text: "十五",width: "200rpx",columnName: "ri15",type: "text",isupd: true},
      {text: "十六",width: "200rpx",columnName: "ri16",type: "text",isupd: true},
      {text: "十七",width: "200rpx",columnName: "ri17",type: "text",isupd: true},
      {text: "十八",width: "200rpx",columnName: "ri18",type: "text",isupd: true},
      {text: "十九",width: "200rpx",columnName: "ri19",type: "text",isupd: true},
      {text: "二十",width: "200rpx",columnName: "ri20",type: "text",isupd: true},
      {text: "二十一",width: "200rpx",columnName: "ri21",type: "text",isupd: true},
      {text: "二十二",width: "200rpx",columnName: "ri22",type: "text",isupd: true},
      {text: "二十三",width: "200rpx",columnName: "ri23",type: "text",isupd: true},
      {text: "二十四",width: "200rpx",columnName: "ri24",type: "text",isupd: true},
      {text: "二十五",width: "200rpx",columnName: "ri25",type: "text",isupd: true},
      {text: "二十六",width: "200rpx",columnName: "ri26",type: "text",isupd: true},
      {text: "二十七",width: "200rpx",columnName: "ri27",type: "text",isupd: true},
      {text: "二十八",width: "200rpx",columnName: "ri28",type: "text",isupd: true},
      {text: "二十九",width: "200rpx",columnName: "ri29",type: "text",isupd: true},
      {text: "三十",width: "200rpx",columnName: "ri30",type: "text",isupd: true},
      {text: "三十一",width: "200rpx",columnName: "ri31",type: "text",isupd: true},
    ],
   
    xm: "",nian: "",yue: "",yi: "",er: "",san:"",si:"",wu: "",liu: "",qi: "",ba: "",
    jiu: "",shi:"",shiyi:"",shier: "",shisan: "",shisi: "",shiwu: "",shiliu: "",shiqi:"",
    shiba:"",shijiu: "",ershi: "",ershiyi: "",ershier: "",ershisan: "",ershisi:"",ershiwu:"",
    ershiliu: "",ershiqi: "",ershiba:"",ershijiu:"",sanshi:"",sanshiyi:"",
    // 新增代码
    view_list:['1','2','3','4','5','6','7','8','9','10','11','12'],
    view_list1:['出勤','旷工','请假'],
    isdis: '',
    isdischa: '',
    isdisgai: '',
    isdisshan: '',
    
    kehu_list:[],
    zhonglei_list:[],
    xiala_panduan:0,
    
    value_input : "",
    index_input : "",
    column_input : "",
    message_input : "",
    upd_db_id : "",
    input_type : "",
    animationData_input : [],

    isDelete : false,
    checkItems : [],
    zeng:"",
    shan:"",
    gai:"",

    minDate: new Date(1900, 1, 1).getTime(),
    maxDate: new Date(2100, 12, 31).getTime(),
    currentDate: new Date().getTime(),
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },
  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa: 1,
      isdisgai: 1,
      isdisshan: 1
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log("department_list1")
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "排产核对") {
        console.log(department_list1[i])
        //添加没权限
        if (department_list1[i].add == "否") {
          _this.setData({
            isdis: 2
          });
          // console.log("否 isdis："+_this.data.isdis)
        } else {
          _this.setData({
            isdis: 1
          });
          // console.log("是 isdis："+_this.data.isdis)

        }
        //修改没权限
        if (department_list1[i].upd == "否") {
          _this.setData({
            isdisgai: 2
          });
        } else {
          _this.setData({
            isdisgai: 1
          });

        }
        //删除没权限
        if (department_list1[i].del == "否") {
          _this.setData({
            isdisshan: 2
          });
          console.log("否 isdisshan：" + _this.data.isdisshan)
        } else {
          _this.setData({
            isdisshan: 1
          });

          console.log("是 isdisshan：" + _this.data.isdisshan)
        }
        //查询没权限
        if (department_list1[i].sel == "否") {
          _this.setData({
            isdischa: 2
          });
        } else {
          _this.setData({
            isdischa: 1
          });

        }
        console.log(_this.data.isdis)

      }
    }
  },

  tableShow: function (e) {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log('公司名',user)
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select * from kaoqin where company ='"+user+"' and s_name like '%" + e[0] + "%'"
      },
      success: res => {
        console.log(res.result)
        var list = res.result
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
  },
  bindPickerChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      yue:_this.data.view_list[e.detail.value]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    // let user = _this.data.userInfo.Company;
    var userInfo = JSON.parse(options.userInfo)
    
    _this.setData({
      userInfo:userInfo
    })
    this.panduanquanxian()
    var e = ['']
    if (_this.data.isdischa == 1) {
      _this.tableShow(e)
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

  onInput2: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    var riqi = Y + M + D
    console.log(riqi)
    _this.setData({
      rq: riqi,
    })
    _this.qxShow2()
    console.log(_this.data.rq)
  },
  qxShow2: function () {
    var _this = this
    _this.setData({
      rqxzShow1: false,
    })
  },

  selRIQI1: function () {
    var _this = this
    _this.setData({
      rqxzShow1: true,
    })
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      ddh:"",
      mk:"",
      rq:"",
      sl:""
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

  add1: function () {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log(_this.data.xm)
    console.log(_this.data.nian)
    console.log(_this.data.yue)
    console.log(_this.data.yi)
    console.log(_this.data.er)
    console.log(_this.data.san)
    console.log(_this.data.si)
    console.log(_this.data.wu)
    console.log(_this.data.liu)
    console.log(_this.data.qi)
    console.log(_this.data.ba)
    console.log(_this.data.jiu)
    console.log(_this.data.shi)
    console.log(_this.data.shiyi)
    console.log(_this.data.shier)
    console.log(_this.data.shisan)
    console.log(_this.data.shisi)
    console.log(_this.data.shiwu)
    console.log(_this.data.shiliu)
    console.log(_this.data.shiqi)
    console.log(_this.data.shiba)
    console.log(_this.data.shijiu)
    console.log(_this.data.ershi)
    console.log(_this.data.ershiyi)
    console.log(_this.data.ershier)
    console.log(_this.data.ershisan)
    console.log(_this.data.ershisi)
    console.log(_this.data.ershiwu)
    console.log(_this.data.ershiliu)
    console.log(_this.data.ershiqi)
    console.log(_this.data.ershiba)
    console.log(_this.data.ershijiu)
    console.log(_this.data.sanshi)
    console.log(_this.data.sanshiyi)
    if (_this.data.xm != "" && _this.data.nian != ""  && _this.data.yue != "") {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "insert into kaoqin(s_name,nian,yue,ri1,ri2,ri3,ri4,ri5,ri6,ri7,ri8,ri9,ri10,ri11,ri12,ri13,ri14,ri15,ri16,ri17,ri18,ri19,ri20,ri21,ri22,ri23,ri24,ri25,ri26,ri27,ri28,ri29,ri30,ri31,company) values('" + _this.data.xm + "','" + _this.data.nian + "','" + _this.data.yue + "','" + _this.data.yi + "','" + _this.data.er + "','" + _this.data.san +"','" + _this.data.si  +"','" + _this.data.wu + "','" + _this.data.liu + "','" + _this.data.qi + "','" + _this.data.ba + "','" + _this.data.jiu + "','" + _this.data.shi +"','" + _this.data.shiyi  +"','" + _this.data.shier + "','" + _this.data.shisan + "','" + _this.data.shisi + "','" + _this.data.shiwu + "','" + _this.data.shiliu + "','" + _this.data.shiqi +"','" + _this.data.shiba  +"','" + _this.data.shijiu + "','" + _this.data.ershi + "','" + _this.data.ershiyi + "','" + _this.data.ershier + "','" + _this.data.ershisan + "','" + _this.data.ershisi +"','" + _this.data.ershiwu  +"','" + _this.data.ershiliu + "','" + _this.data.ershiqi + "','" + _this.data.ershiba + "','" + _this.data.ershijiu + "','" + _this.data.sanshi + "','" + _this.data.sanshiyi +"','"+user+"')"
        },
        success: res => {
          _this.setData({
           xm: "",nian: "",yue: "",yi: "",er: "",san:"",si:"",wu: "",liu: "",qi: "",ba: "",
            jiu: "",shi:"",shiyi:"",shier: "",shisan: "",shisi: "",shiwu: "",shiliu: "",shiqi:"",
            shiba:"",shijiu: "",ershi: "",ershiyi: "",ershier: "",ershisan: "",ershisi:"",ershiwu:"",
            ershiliu: "",ershiqi: "",ershiba:"",ershijiu:"",sanshi:"",sanshiyi:"",
          })
          _this.qxShow()
          var e = ['']
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
    } else {
      wx.showToast({
        title: '信息输入不全！',
        icon: 'none'
      })
    }
  },

  clickView:function(e){
    var _this = this;
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id, 
    })
    var index = e.currentTarget.dataset.index;
    var upd_db_id = e.currentTarget.dataset.id
    console.log('AAA',e.currentTarget.dataset.id)
    var column = e.currentTarget.dataset.column;
    var message = e.currentTarget.dataset.message
    var value = e.currentTarget.dataset.value;
    var input_type = e.currentTarget.dataset.input_type;
    var panduan = 0
    if(column=="riqi"){
      panduan = 1
    }else if(column == "unit"){
      panduan = 2
    }else if(column == "invoice_type"){
      panduan = 3
    }
    _this.setData({
      value_input : value,
      index_input : index,
      column_input : column,
      message_input : message,
      upd_db_id,
      input_type,
      empty:'',
      xiala_panduan:panduan
    })
     _this.showView(_this,"input");
   },

  save: function(e){
    var _this = this;
    console.log(e)
    var new_value_input = e.detail.value.new
    var class_id = _this.data.class_id
    if(new_value_input==""){
      new_value_input = _this.data.value_input
    }
    
    var index = _this.data.index_input;
    var column = _this.data.column_input;
    var id = _this.data.upd_db_id;
    console.log(new_value_input+"-------"+column+"-------"+_this.data.id )
    _this.hidView(_this,"input")
    _this.setData({
      ["list["+index+"]."+column] : new_value_input,
      empty : ""
    })

    wx.cloud.callFunction({
       name: 'sql_jiaowu',
        data: {
          sql: "update kaoqin set "+column+" = '"+new_value_input+"' where id='"+_this.data.id+"'"
        },
        
        
      success : res=>{
        _this.setData({
          initHidView : false,
        })
        console.log('id',_this.data.id)
        wx.showToast({
          title: "修改成功",
          icon : "none"
        })
      },
      err : res =>{
        wx.showToast({
          title: "错误",
          icon : "none"
        })
      }
    })
  },


  showView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    _this.setData({
      initHidView : false,
      hid_view : true
    })

    wx.nextTick(()=>{
      switch(type){
        case "input":
          animation.translateX(0).step()
          _this.setData({
            animationData_input : animation.export()
          })
          break;
        case "moreDo":
          animation.translateX(0).step()
          _this.setData({
            animationData_moreDo_view : animation.export()
          })
          break;
        case "updClass":
          animation.translateY(0).step()
          _this.setData({
            animationData_updClass : animation.export()
          })
          break;
      }
    })
  },
  hidView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })

    _this.setData({
      hid_view : false
    })
    switch(type){
      case "input":
        animation.translateX(-400).step()
        _this.setData({
          animationData_input : animation.export(),
          value_input : "",
          index_input : "",
          column_input : "",
          message_input : ""
        })
        break;
      case "moreDo":
        animation.translateX(-300).step()
        _this.setData({
          animationData_moreDo_view : animation.export()
        })
        break;
      case "updClass":
        animation.translateY(300).step()
        _this.setData({
          animationData_updClass : animation.export()
        })
        break;
    }
  },
  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"input")
    _this.hidView(_this,"moreDo")
    _this.hidView(_this,"updClass")
  },
  chaxun_show:function(){
    var _this = this
    _this.hid_view()
    _this.setData({
      chaxun_hidden:false,
      xiangmumingcheng:"",
      start_date:"",
      stop_date:"",
    })
  },
  chaxun_quxiao:function(){
    var _this = this
    _this.hid_view()
    _this.setData({
      chaxun_hidden:true
    })
  },
  del1:function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "delete from kaoqin where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            xm: "",nian: "",yue: "",yi: "",er: "",san:"",si:"",wu: "",liu: "",qi: "",ba: "",
            jiu: "",shi:"",shiyi:"",shier: "",shisan: "",shisi: "",shiwu: "",shiliu: "",shiqi:"",
            shiba:"",shijiu: "",ershi: "",ershiyi: "",ershier: "",ershisan: "",ershisi:"",ershiwu:"",
            ershiliu: "",ershiqi: "",ershiba:"",ershijiu:"",sanshi:"",sanshiyi:"",
          })
          _this.qxShow()
          var e = ['']
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
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      xm:"",
    })
  },
  sel1:function(){
    var _this = this
    
    var e = [_this.data.xm]
    _this.tableShow(e)
    _this.qxShow()
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
    var _this = this;
    // _this.init()
    _this.hid_view()
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