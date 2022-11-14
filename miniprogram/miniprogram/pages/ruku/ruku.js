// pages/general/general.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  xgShow2: false,
  cxShow: false,
  xlShow4: false,
  xlShow1: false,
  data: {
    list: [],
    update_name:{
      product_date:"产品生产日期",
      validity:"有效期",
      pihao:"批号",
      num:"数量",
      remarks:"备注",
    },
    state_list:['审核中','审核通过','审核未通过'],
    title: [{
        text: "日期",
        width: "200rpx",
        columnName: "riqi",
        type: "text",
        isupd: true
      },
      {
        text: "有效期",
        width: "200rpx",
        columnName: "validity",
        type: "text",
        isupd: true
      },
      {
        text: "仓库",
        width: "200rpx",
        columnName: "warehouse",
        type: "text",
        isupd: true
      },
      {
        text: "入库员",
        width: "200rpx",
        columnName: "staff",
        type: "text",
        isupd: true
      },
      {
        text: "产品生产日期",
        width: "230rpx",
        columnName: "product_date",
        type: "text",
        isupd: true
      },
      {
        text: "产品名称",
        width: "300rpx",
        columnName: "product_name",
        type: "text",
        isupd: true
      },
      {
        text: "品号",
        width: "150rpx",
        columnName: "pinhao",
        type: "text",
        isupd: true
      },
      {
        text: "规格",
        width: "400rpx",
        columnName: "spec",
        type: "text",
        isupd: true
      },
      {
        text: "产品属性",
        width: "200rpx",
        columnName: "attribute",
        type: "text",
        isupd: true
      },
      {
        text: "批号",
        width: "200rpx",
        columnName: "pihao",
        type: "text",
        isupd: true
      },
      {
        text: "数量",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "单位",
        width: "200rpx",
        columnName: "unit",
        type: "text",
        isupd: true
      },
      {
        text: "备注",
        width: "200rpx",
        columnName: "remarks",
        type: "text",
        isupd: true
      },
      {
        text: "审核状态",
        width: "200rpx",
        columnName: "state",
        type: "text",
        isupd: true
      }
    ],

    add_title: [
      {
        text: "产品生产日期",
        width: "230rpx",
        columnName: "product_date",
        type: "text",
        isupd: true
      },
      {
        text: "有效期",
        width: "230rpx",
        columnName: "validity",
        type: "text",
        isupd: true
      },
      {
        text: "数量",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "批号",
        width: "300rpx",
        columnName: "pihao",
        type: "text",
        isupd: true
      },
      {
        text: "产品名称",
        width: "450rpx",
        columnName: "product_name",
        type: "text",
        isupd: true
      },
      {
        text: "规格",
        width: "450rpx",
        columnName: "spec",
        type: "text",
        isupd: true
      },
      {
        text: "产品属性",
        width: "200rpx",
        columnName: "attribute",
        type: "text",
        isupd: true
      },
      {
        text: "单位",
        width: "200rpx",
        columnName: "unit",
        type: "text",
        isupd: true
      },
      {
        text: "备注",
        width: "200rpx",
        columnName: "remarks",
        type: "text",
        isupd: true
      }
  ],

    add_list:[],
    warehouse_list:[],
    id:'',
    warehouse: '', 
    pihao: '',
    listChanPin:[],
    listShenHe:[
      {name:'审核通过'},
      {name:'审核未通过'}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var userPower = JSON.parse(options.userPower)
    var tiaojian = options.tiaojian
    console.log(tiaojian)
    if(tiaojian != undefined){
      tiaojian = JSON.parse(options.tiaojian)
    }
    console.log(userInfo)
    console.log(userPower)
    _this.setData({
      userInfo:userInfo,
      userPower:userPower,
      tiaojian:tiaojian
    })

    var sql = "select '产品:' + product_name + ';规格:' + spec + ';产品属性:' + attribute + ';单位:' + unit  as name,id,product_name,spec,unit,attribute from product"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          listChanPin: list
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

    var sql = "select warehouse from general where warehouse != ''"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var name_list = []
        for(var i=0; i<list.length; i++){
          name_list.push(list[i].warehouse)
        }
        _this.setData({
          warehouse_list: name_list
        })
        console.log(name_list)
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

    var e = ['1900-01-01','2100-12-31','','','']
    _this.tableShow(e)
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  bindPickerChange: function(e){
    var _this = this
    console.log(_this.data.warehouse_list[e.detail.value])
    _this.setData({
      warehouse: _this.data.warehouse_list[e.detail.value]
    })
  },

  bindPickerChange1: function(e){
    var _this = this
    console.log(_this.data.state_list[e.detail.value])
    _this.setData({
      sale_state: _this.data.state_list[e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    var sql = "select rk.id,rk.riqi,rk.warehouse,rk.staff,rk.product_id,rk.pihao,rk.num,rk.remarks,rk.state,rk.validity,pd.product_name,pd.spec,pd.unit,pd.attribute,rk.product_date,pd.pinhao from ruku as rk left join product as pd on rk.product_id = pd.id where CONVERT(date,rk.riqi) >= CONVERT(date,'" + e[0] + "') and CONVERT(date,rk.riqi) <= CONVERT(date,'" + e[1] + "') and pd.product_name like '%" + e[2] + "%' and rk.state like '%" + e[3] + "%' and rk.pihao like '%" + e[4] + "%'"
    if (_this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
      sql = sql + " and rk.staff ='" + _this.data.userInfo.name + "'"
    }
    if(_this.data.tiaojian != undefined){
      sql = "select rk.id,rk.riqi,rk.warehouse,rk.staff,rk.product_id,rk.pihao,rk.num,rk.remarks,rk.state,rk.validity,pd.product_name,pd.spec,pd.unit,pd.attribute,rk.product_date,pd.pinhao from ruku as rk left join product as pd on rk.product_id = pd.id where CONVERT(date,rk.riqi) >= CONVERT(date,'" + _this.data.tiaojian[2] + "') and CONVERT(date,rk.riqi) <= CONVERT(date,'" + _this.data.tiaojian[2] + "') and rk.state = '审核中' and rk.staff ='" + _this.data.tiaojian[3] + "'"
    }
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list,
          tiaojian:undefined
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

  qxShow2: function () {
    var _this = this
    _this.setData({
      xgShow2: false,
    })
  },

  upd2:function(){
    var _this = this
    var add_list = _this.data.add_list
    add_list[_this.data.id][_this.data.this_column] = _this.data.this_value
    _this.setData({
      add_list:add_list
    })
    _this.qxShow2()
  },

  clickView:function(e){
    var _this = this
    if(_this.data.userPower.gai != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(_this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人' && _this.data.userInfo.state_upd != '是' && _this.data.list[e.currentTarget.dataset.index].state == '审核通过'){
      wx.showToast({
        title: '此账号无权限修改审核通过的数据！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      riqi: _this.data.list[e.currentTarget.dataset.index].riqi, 
      validity: _this.data.list[e.currentTarget.dataset.index].validity,
      warehouse: _this.data.list[e.currentTarget.dataset.index].warehouse,
      staff: _this.data.list[e.currentTarget.dataset.index].staff,
      product_id: _this.data.list[e.currentTarget.dataset.index].product_id,
      product_name: _this.data.list[e.currentTarget.dataset.index].product_name,
      spec: _this.data.list[e.currentTarget.dataset.index].spec,
      unit: _this.data.list[e.currentTarget.dataset.index].unit,
      pihao: _this.data.list[e.currentTarget.dataset.index].pihao,
      num: _this.data.list[e.currentTarget.dataset.index].num,
      remarks: _this.data.list[e.currentTarget.dataset.index].remarks,
      attribute: _this.data.list[e.currentTarget.dataset.index].attribute,
      product_date: _this.data.list[e.currentTarget.dataset.index].product_date,
      xgShow:true,
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
          var add_list = _this.data.add_list
          add_list.splice(e.currentTarget.dataset.index,1)
          _this.setData({
            add_list:add_list
          })
          console.log(add_list)
        } else if (res.cancel) {

        }
      }
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
    console.log(_this.data.list[e.currentTarget.dataset.index].id)
    _this.setData({
      id: e.currentTarget.dataset.index,
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      xgShow2:true,
    })
  },

  inquire: function () {
    var _this = this
    if(_this.data.userPower.zeng != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    _this.setData({
      tjShow: true,
      id:'',
      riqi: getNowDate(), 
      validity:'',
      warehouse: '',
      staff:'',
      product_id:'',
      product_name:'',
      spec:'',
      unit:'',
      pihao:'',
      num:'',
      remarks:'',
      add_list:[],
      attribute: '',
      product_date: '',
    })
  },

  add1: function(){
    var _this = this

    if(_this.data.riqi == ''){
      wx.showToast({
        title: '未选择日期！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.warehouse == ''){
      wx.showToast({
        title: '未选择仓库！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.add_list.length == 0){
      wx.showToast({
        title: '未选择产品！',
        icon: 'none'
      })
      return;
    }
    for(var i=0; i<_this.data.add_list.length; i++){
      if(_this.data.add_list[i].num == ''){
        wx.showToast({
          title: '产品列表中第'+ i * 1+1 +'行未填写数量！',
          icon: 'none'
        })
        return;
      }
      if(_this.data.add_list[i].product_date == ''){
        wx.showToast({
          title: '产品列表中第'+ i * 1 +1 +'行未填写产品生产日期！',
          icon: 'none'
        })
        return;
      }
    }
    // if(_this.data.num == ''){
    //   wx.showToast({
    //     title: '未填写数量！',
    //     icon: 'none'
    //   })
    //   return;
    // }
      var sql1 = "insert into ruku(riqi,validity,warehouse,staff,product_id,pihao,num,remarks,product_date,state) values "
      var sql2 = ""
      for(var i=0; i< _this.data.add_list.length; i++){
        if(sql2 == ""){
          sql2 = "('" + _this.data.riqi + "','"+ _this.data.add_list[i].validity+"','" + _this.data.warehouse + "','" + _this.data.userInfo.name + "','" + _this.data.add_list[i].product_id + "','" + _this.data.add_list[i].pihao + "','" + _this.data.add_list[i].num + "','" + _this.data.add_list[i].remarks + "','" + _this.data.add_list[i].product_date + "','审核中')"
        }else{
          sql2 = sql2 + ",('" + _this.data.riqi + "','"+ _this.data.add_list[i].validity+"','" + _this.data.warehouse + "','" + _this.data.userInfo.name + "','" + _this.data.add_list[i].product_id + "','" + _this.data.add_list[i].pihao + "','" + _this.data.add_list[i].num + "','" + _this.data.add_list[i].remarks + "','" + _this.data.add_list[i].product_date + "','审核中')"
        }
      }
      var sql = sql1 + sql2
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: sql
        },
        success: res => {
          _this.setData({
            id:'',
            riqi: '', 
            validity:'',
            warehouse: '',
            staff:'',
            product_id:'',
            product_name:'',
            spec:'',
            unit:'',
            pihao:'',
            num:'',
            remarks:'',
            attribute: '',
            product_date: '',
            add_list:[],
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','','','']
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
    if(_this.data.product_id == ''){
      wx.showToast({
        title: '未选择产品！',
        icon: 'none'
      })
      return;
    }
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "update ruku set riqi='" + _this.data.riqi + "',validity='"+ _this.data.validity+"',warehouse='" + _this.data.warehouse + "',staff='" + _this.data.staff + "',product_id=" + _this.data.product_id + ",pihao='" + _this.data.pihao + "',num='" + _this.data.num + "',remarks='" + _this.data.remarks + "',product_date='" + _this.data.product_date + "',state='审核中' where id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
          id:'',
          riqi: '', 
          validity:'',
          warehouse: '',
          staff:'',
          product_id:'',
          product_name:'',
          spec:'',
          unit:'',
          pihao:'',
          num:'',
          remarks:'',
          attribute: '',
          product_date: '',
        })
        _this.qxShow()
        var e = ['1900-01-01','2100-12-31','','','']
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

  del1:function(){
    var _this = this
    if(_this.data.userPower.shan != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: "delete from ruku where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            riqi: '', 
            validity:'',
            warehouse: '',
            staff:'',
            product_id:'',
            product_name:'',
            spec:'',
            unit:'',
            pihao:'',
            num:'',
            remarks:'',
            attribute: '',
            product_date: '',
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','','','']
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
      start_date:"",
      stop_date:"",
      product_name:"",
      state:'',
      pihao:'',
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == ''){
      start_date = '1900-01-01'
    }
    if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    var e = [start_date,stop_date,_this.data.product_name,_this.data.state,_this.data.pihao]
    _this.tableShow(e)
    _this.qxShow()
  },

  select4: function (e) {
    var _this = this
    if (e.type == "select") {
      if(_this.data.xlShow4_type == "add"){
        var add_list = _this.data.add_list
        add_list.push({
          product_name: e.detail.product_name,
          spec: e.detail.spec,
          unit: e.detail.unit,
          product_id: e.detail.id,
          attribute: e.detail.attribute,
          num:'',
          pihao:'',
          remarks:'',
          product_date:'',
          validity:'',
        })
        _this.setData({
          xlShow4: false,
          add_list:add_list
        })
      }else if(_this.data.xlShow4_type == "upd"){
        _this.setData({
          product_name: e.detail.product_name,
          spec: e.detail.spec,
          unit: e.detail.unit,
          product_id: e.detail.id,
          attribute: e.detail.attribute,
          xlShow4: false,
        })
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow4: false,
      })
    }
  },

  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      var shenhe = e.detail.name
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: "update ruku set state='" + shenhe + "' where id=" + _this.data.id 
        },
        success: res => {
          _this.setData({
            id:'',
            riqi: '', 
            validity:'',
            warehouse: '',
            staff:'',
            product_id:'',
            product_name:'',
            spec:'',
            unit:'',
            pihao:'',
            num:'',
            remarks:'',
            attribute: '',
            product_date: '',
            xlShow1: false,
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','','','']
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
      _this.setData({
        xlShow1: false,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow1: false,
      })
    }
  },

  selCD: function () {
    var _this = this
    _this.setData({
      xlShow4_type:"add",
      xlShow4: true
    })
  },

  selCD2: function () {
    var _this = this
    _this.setData({
      xlShow4_type:"upd",
      xlShow4: true
    })
  },

  selSH: function () {
    var _this = this  
    if(_this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
      wx.showToast({
        title: '此账号无权限审核数据！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      xlShow1: true
    })
  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title
    var cloudList = {
      name : '入库',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:parseInt(title[i].width.split("r")[0])/10,
        columnName:title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu : 'true',
              fileType : 'xlsx',
              success : res=> {
                console.log("打开Excel")
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
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }