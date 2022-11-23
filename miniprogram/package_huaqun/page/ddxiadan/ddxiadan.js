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
    var riqi = getNowDate()
    var bianhao = "DD" + riqi
    console.log(bianhao)
    if (userInfo.power == '客户' ){
      _this.setData({
        userInfo:userInfo,
        khmc:userInfo.name
      })
    }
    
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

    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select djbh from lightbelt where djbh like '%"+  bianhao +"%' GROUP BY djbh "
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        var bianhao = "001"
        var aa 
        
        for(var i=0; i<list.length; i++){
          console.log(list[i].substr(list[i].length-3,list[i].length))
        
          if(aa>=bianhao){
            bianhao = bianhao+1
            console.log('biaohao',bianhao)
          }
          console.log('biaohao',aa)
        }
        _this.setData({
          
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
        console.log(ddxh_list)
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
    
    if(this_column == 'product_name' || this_column == 'spec' || this_column == 'unit' || this_column == 'attribute'){
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
    }else{
      panduan = 0
    }
    var riqi = getNowDate()
    var djbh
    console.log(riqi)
    if(e.currentTarget.dataset.column=='lcb'){
      djbh = "DD" + riqi + "001"
    }
    // console.log(djbh.substr(djbh.length-3,djbh.length))
    
    
    
    if((e.currentTarget.dataset.column=='dy'||e.currentTarget.dataset.column=='kg'||e.currentTarget.dataset.column=='pj')&&e.currentTarget.dataset.value==''){
      _this.setData({
        this_column:e.currentTarget.dataset.column,
        this_value:e.currentTarget.dataset.value,
        xiala_panduan:panduan,
        this_index:e.currentTarget.dataset.index,
        djbh:djbh,
        xgShow:true,
    })
    }else{
      wx.showToast({
        title: '此处不能填写！',
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
        this_value: _this.data.cxdk_list[e.detail.value]
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
    var list = _this.data.list
    list[_this.data.this_index][_this.data.this_column] = _this.data.this_value
    _this.setData({
      list:list
    })
    _this.qxShow()
  },

  add1: function(){
    //console.log(djbh.substr(djbh.length-3,djbh.length))
    if (_this.data.khmc!=''&&_this.data.xdrq!=''&&_this.data.djbh!=''&&_this.data.shouhuo!=''&&_this.data.lxdh!=''&&_this.data.shfs!=''&&_this.data.azdz!=''&&_this.data.ddh!=''){
      var _this = this
      var sql1 = "insert into lightbelt(khmc,xdrq,djbh,shouhuo,lxdh,shfs,azdz,ddh,fj,gh,ddcd,sl,cxdk,lcb,lcys,gy,dy,kg,pj,gl,bz,dj,je) values"
      var sql2 = ""
      for(var i=0; i< _this.data.list.length; i++){
        if(sql2 == ""){
          sql2 = "('" + _this.data.khmc + "','"+ _this.data.xdrq +"','" + _this.data.djbh +"','" + _this.data.shouhuo +"','"+ _this.data.lxdh +"','"+  _this.data.shfs +"','"+  _this.data.azdz +"','"+  _this.data.ddh +"','"+  _this.data.list[i].fj +"','"+  _this.data.list[i].gh +"','"+  _this.data.list[i].ddcd +"','"+  _this.data.list[i].sl +"','"+  _this.data.list[i].cxdk +"','"+  _this.data.list[i].lcb +"','"+  _this.data.list[i].lcys +"','"+  _this.data.list[i].gy +"','"+  _this.data.list[i].dy +"','"+  _this.data.list[i].kg +"','"+  _this.data.list[i].pj +"','"+  _this.data.list[i].gl +"','"+  _this.data.list[i].bz +"','"+  _this.data.list[i].dj +"','"+  _this.data.list[i].je +"')"
        }else{
          sql2 = sql2 + ",('" + _this.data.khmc + "','"+ _this.data.xdrq +"','" + _this.data.djbh +"','" + _this.data.shouhuo +"','"+ _this.data.lxdh +"','"+  _this.data.shfs +"','"+  _this.data.azdz +"','"+  _this.data.ddh +"','"+  _this.data.list[i].fj +"','"+  _this.data.list[i].gh +"','"+  _this.data.list[i].ddcd +"','"+  _this.data.list[i].sl +"','"+  _this.data.list[i].cxdk +"','"+  _this.data.list[i].lcb +"','"+  _this.data.list[i].lcys +"','"+  _this.data.list[i].gy +"','"+  _this.data.list[i].dy +"','"+  _this.data.list[i].kg +"','"+  _this.data.list[i].pj +"','"+  _this.data.list[i].gl +"','"+  _this.data.list[i].bz +"','"+  _this.data.list[i].dj +"','"+  _this.data.list[i].je +"')"
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
  var currentdate = year.toString() + month.toString() + day.toString() ;
  return currentdate;
 }
 