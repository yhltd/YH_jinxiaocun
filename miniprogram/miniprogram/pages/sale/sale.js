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
  shShow: false,
  xgShow2: false,
  xgShow3: false,
  cxShow: false,
  xlShow4: false,
  xlShow5: false,
  xlShow1: false,
  data: {
    list: [],
    title: [{
        text: "日期",
        width: "200rpx",
        columnName: "riqi",
        type: "text",
        isupd: true
      },
      {
        text: "客户名称",
        width: "200rpx",
        columnName: "customer",
        type: "text",
        isupd: true
      },
      {
        text: "客户类别",
        width: "200rpx",
        columnName: "leibie",
        type: "text",
        isupd: true
      },
      {
        text: "客户号",
        width: "200rpx",
        columnName: "customer_num",
        type: "text",
        isupd: true
      },
      {
        text: "区域",
        width: "200rpx",
        columnName: "area",
        type: "text",
        isupd: true
      },
      {
        text: "收货人员",
        width: "200rpx",
        columnName: "sh_staff",
        type: "text",
        isupd: true
      },
      {
        text: "业务员",
        width: "200rpx",
        columnName: "salesman",
        type: "text",
        isupd: true
      },
      {
        text: "拿货方式",
        width: "200rpx",
        columnName: "pick",
        type: "text",
        isupd: true
      },
      {
        text: "发货类型",
        width: "300rpx",
        columnName: "sale_type",
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
        text: "单位",
        width: "200rpx",
        columnName: "unit",
        type: "text",
        isupd: true
      },
      {
        text: "销售单价",
        width: "200rpx",
        columnName: "price",
        type: "text",
        isupd: true
      },
      {
        text: "销售数量",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "小计",
        width: "200rpx",
        columnName: "xiaoji",
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
        text: "类型",
        width: "200rpx",
        columnName: "type",
        type: "text",
        isupd: true
      },
      {
        text: "审核状态",
        width: "200rpx",
        columnName: "sale_state",
        type: "text",
        isupd: true
      },
      
      
    ],


    shenhe_title: [
    {
      text: "发出仓库",
      width: "200rpx",
      columnName: "warehouse",
      type: "text",
      isupd: true
    },
    {
      text: "日期",
      width: "200rpx",
      columnName: "riqi",
      type: "text",
      isupd: true
    },
    {
      text: "客户名称",
      width: "200rpx",
      columnName: "customer",
      type: "text",
      isupd: true
    },
    {
      text: "收货人员",
      width: "200rpx",
      columnName: "sh_staff",
      type: "text",
      isupd: true
    },
    // {
    //   text: "快递公司",
    //   width: "300rpx",
    //   columnName: "express",
    //   type: "text",
    //   isupd: true
    // },
    {
      text: "业务员",
      width: "200rpx",
      columnName: "salesman",
      type: "text",
      isupd: true
    },
    {
      text: "拿货方式",
      width: "200rpx",
      columnName: "pick",
      type: "text",
      isupd: true
    },
    // {
    //   text: "物流单号",
    //   width: "200rpx",
    //   columnName: "wuliu_order",
    //   type: "text",
    //   isupd: true
    // },
    {
      text: "发货类型",
      width: "300rpx",
      columnName: "sale_type",
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
      text: "规格",
      width: "400rpx",
      columnName: "spec",
      type: "text",
      isupd: true
    },
    // {
    //   text: "批号",
    //   width: "200rpx",
    //   columnName: "pihao",
    //   type: "text",
    //   isupd: true
    // },
    {
      text: "单位",
      width: "200rpx",
      columnName: "unit",
      type: "text",
      isupd: true
    },
    {
      text: "销售单价",
      width: "200rpx",
      columnName: "price",
      type: "text",
      isupd: true
    },
    {
      text: "销售数量",
      width: "200rpx",
      columnName: "num",
      type: "text",
      isupd: true
    },
    {
      text: "小计",
      width: "200rpx",
      columnName: "xiaoji",
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
      text: "类型",
      width: "200rpx",
      columnName: "type",
      type: "text",
      isupd: true
    },
    {
      text: "审核状态",
      width: "200rpx",
      columnName: "sale_state",
      type: "text",
      isupd: true
    },
  ],

    add_title: [
      {
        text: "发货类型",
        width: "200rpx",
        columnName: "sale_type",
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
        text: "销售单价",
        width: "200rpx",
        columnName: "price",
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
        text: "折扣率",
        width: "200rpx",
        columnName: "discount",
        type: "text",
        isupd: true
      },
      {
        text: "小计",
        width: "200rpx",
        columnName: "xiaoji",
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

  state_list:['审核中','审核通过','审核未通过'],

  update_name:{
    sale_type:"发货类型",
    price:'销售单价',
    num:"数量",
    discount:"折扣率",
    xiaoji:"小计",
    remarks:"备注",
    warehouse:'发出仓库',
  },

    warehouse_list:[],
    id:'',
    warehouse: '', 
    pihao: '',
    sale_state:'',
    sale_type:'',
    listChanPin:[],
    listShenHe:[
      {name:'审核通过'},
      {name:'审核未通过'}
    ],
    type_list:['销售','退货'],
    fahuo_list:['未发货','已发货'],
    kucun_list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var userPower = JSON.parse(options.userPower)
    console.log(userPower)
    var tiaojian = options.tiaojian
    console.log(tiaojian)
    if(tiaojian != undefined){
      tiaojian = JSON.parse(options.tiaojian)
    }
    _this.setData({
      userInfo:userInfo,
      userPower:userPower,
      tiaojian:tiaojian
    })

    var sql = "select '产品:' + product_name + ';规格:' + spec + ';产品属性:' + attribute + ';单位:' + unit + ';单价:' + price  as name,id,product_name,spec,unit,price,attribute from product"
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

    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select id,customer from customerInfo where customer != ''"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        var picker_list = []
        for(var i=0; i<list.length; i++){
          picker_list.push(
            list[i].customer
          )
        }
        _this.setData({
          customer_list: list,
          customer_picker_list: picker_list
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

    var sql = "select express from general where express != ''"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var name_list = []
        for(var i=0; i<list.length; i++){
          name_list.push(list[i].express)
        }
        _this.setData({
          express_list: name_list
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

    var sql = "select pick from general where pick != ''"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var name_list = []
        for(var i=0; i<list.length; i++){
          name_list.push(list[i].pick)
        }
        _this.setData({
          pick_list: name_list
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

    var sql = "select sale_type from general where sale_type != ''"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var name_list = []
        for(var i=0; i<list.length; i++){
          name_list.push(list[i].sale_type)
        }
        _this.setData({
          sale_type_list: name_list
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

    var e = ['1900-01-01','2100-12-31','','','','']
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
      warehouse: _this.data.warehouse_list[e.detail.value],
      this_value: _this.data.warehouse_list[e.detail.value],
    })
  },

  bindPickerChange1: function(e){
    var _this = this
    console.log(_this.data.state_list[e.detail.value])
    _this.setData({
      sale_state: _this.data.state_list[e.detail.value]
    })
  },

  bindPickerChange2: function(e){
    var _this = this
    console.log(_this.data.customer_list[e.detail.value].customer + " " + _this.data.customer_list[e.detail.value].id)
    _this.setData({
      [e.target.dataset.column_name]: _this.data.customer_list[e.detail.value].customer,
      customer_id: _this.data.customer_list[e.detail.value].id
    })
  },

  bindPickerChange3: function(e){
    var _this = this
    console.log(_this.data.express_list[e.detail.value])
    _this.setData({
      express: _this.data.express_list[e.detail.value]
    })
  },

  bindPickerChange4: function(e){
    var _this = this
    console.log(_this.data.pick_list[e.detail.value])
    _this.setData({
      pick: _this.data.pick_list[e.detail.value]
    })
  },

  bindPickerChange5: function(e){
    var _this = this
    console.log(_this.data.type_list[e.detail.value])
    _this.setData({
      type: _this.data.type_list[e.detail.value]
    })
  },

  bindPickerChange6: function(e){
    var _this = this
    console.log(_this.data.fahuo_list[e.detail.value])
    _this.setData({
      fahuo: _this.data.fahuo_list[e.detail.value]
    })
  },

  bindPickerChange7: function(e){
    console.log(e)
    var _this = this
    console.log(_this.data.sale_type_list[e.detail.value])
    _this.setData({
      this_value: _this.data.sale_type_list[e.detail.value],
      sale_type: _this.data.sale_type_list[e.detail.value],
    })
  },

  selSH: function () {
    var _this = this  
    if(_this.data.userInfo.power != '管理员' && _this.data.userInfo.power != '审核人'){
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

  tableShow: function (e) {
    var _this = this
    var sql = ""
    console.log(_this.data.userInfo.power)
    if(_this.data.tiaojian != undefined){
      sql = "select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type,sa.leibie,sa.customer_num,sa.area,p.pinhao,p.attribute from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type,c.leibie,c.customer_num,c.area from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where convert(date,sa.riqi)>=convert(date,'" + _this.data.tiaojian[2] + "') and convert(date,sa.riqi)<=convert(date,'" + _this.data.tiaojian[2] + "') and (customer ='" + _this.data.tiaojian[1] + "') and sale_state = '审核中' and salesman = '" + _this.data.tiaojian[3] + "' order by sa.riqi desc,customer,sale_type"
    }else if(_this.data.userInfo.power == '管理员' || _this.data.userInfo.power == '审核人'){
      sql = "select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type,sa.leibie,sa.customer_num,sa.area,p.pinhao,p.attribute from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type,c.leibie,c.customer_num,c.area from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where convert(date,sa.riqi)>=convert(date,'" + e[0] + "') and convert(date,sa.riqi)<=convert(date,'" + e[1] + "') and (customer like '%" + e[2] + "%' or sa.pinyin like '%" + e[2] + "%') and (product_name like '%" + e[3] + "%' or p.pinyin like '%" + e[3] + "%') and sale_state like '%" + e[4] + "%' and sale_type like '%" + e[5] + "%' order by sa.riqi desc,customer,sale_type"
    }else {
      sql = "select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type,sa.leibie,sa.customer_num,sa.area,p.pinhao,p.attribute from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type,c.leibie,c.customer_num,c.area from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where convert(date,sa.riqi)>=convert(date,'" + e[0] + "') and convert(date,sa.riqi)<=convert(date,'" + e[1] + "') and (customer like '%" + e[2] + "%' or sa.pinyin like '%" + e[2] + "%') and (product_name like '%" + e[3] + "%' or p.pinyin like '%" + e[3] + "%') and sale_state like '%" + e[4] + "%' and sale_type like '%" + e[5] + "%' and salesman = '" + _this.data.userInfo.name + "' order by sa.riqi desc,customer,sale_type"
    }
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
        console.log(sql)
        var xiaojiheji = 0;
        var list = res.result.recordset 
        for(var i=0;i<list.length;i++){
          console.log(list[i])
          console.log(list[i].xiaoji)
          xiaojiheji = xiaojiheji + list[i].xiaoji * 1
        }
        console.log(list)
        _this.setData({
          list: list,
          xiaojiheji:xiaojiheji,
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
      shShow: false,
      currentDate: new Date().getTime(),
      id: '',
      riqi: '',
      customer: '',
      customer_id: '',
      sh_staff: '',
      pick: '',
      wuliu_order: '',
      warehouse: '',
      staff: '',
      product_id: '',
      product_name: '',
      spec: '',
      unit: '',
      price: '',
      discount:'1',
      xiaoji:'',
      pihao: '',
      num: '',
      remarks:'',
      type:'',
      fahuo:'',
      sale_state:'',
      sale_type:'',
    })
  },

  clickView:function(e){
    var _this = this
    if(e.currentTarget.dataset.column != 'sale_state'){
      if(_this.data.userPower.gai != '可操作' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
        wx.showToast({
          title: '无权限！',
          icon: 'none',
          duration: 3000
        })
        return;
      }
      if(_this.data.list[e.currentTarget.dataset.index].sale_state == '审核通过' && _this.data.userInfo.state_upd != '是' && _this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
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
        customer: _this.data.list[e.currentTarget.dataset.index].customer,
        customer_id: _this.data.list[e.currentTarget.dataset.index].customer_id,
        sh_staff: _this.data.list[e.currentTarget.dataset.index].sh_staff,
        express: _this.data.list[e.currentTarget.dataset.index].express,
        pick: _this.data.list[e.currentTarget.dataset.index].pick,
        wuliu_order: _this.data.list[e.currentTarget.dataset.index].wuliu_order,
        warehouse: _this.data.list[e.currentTarget.dataset.index].warehouse,
        staff: _this.data.list[e.currentTarget.dataset.index].staff,
        product_id: _this.data.list[e.currentTarget.dataset.index].product_id,
        product_name: _this.data.list[e.currentTarget.dataset.index].product_name,
        spec: _this.data.list[e.currentTarget.dataset.index].spec,
        unit: _this.data.list[e.currentTarget.dataset.index].unit,
        price: _this.data.list[e.currentTarget.dataset.index].price,
        discount: _this.data.list[e.currentTarget.dataset.index].discount,
        xiaoji: _this.data.list[e.currentTarget.dataset.index].xiaoji,
        pihao: _this.data.list[e.currentTarget.dataset.index].pihao,
        num: _this.data.list[e.currentTarget.dataset.index].num,
        remarks: _this.data.list[e.currentTarget.dataset.index].remarks,
        type:_this.data.list[e.currentTarget.dataset.index].type,
        fahuo:_this.data.list[e.currentTarget.dataset.index].fahuo,
        sale_type:_this.data.list[e.currentTarget.dataset.index].sale_type,
        xgShow:true,
      })
    }else{
      if(_this.data.userInfo.power != '管理员'&& _this.data.userInfo.power != '审核人'){
        wx.showToast({
          title: '非管理员账号无审核权限！',
          icon: 'none',
          duration: 3000
        })
        return;
      }
      if(_this.data.list[e.currentTarget.dataset.index].sale_state != '审核中'){
        wx.showToast({
          title: '此销售信息无需再次审核！',
          icon: 'none',
          duration: 3000
        })
        return;
      }
      var riqi = _this.data.list[e.currentTarget.dataset.index].riqi
      var customer_id = _this.data.list[e.currentTarget.dataset.index].customer_id
      var add_list = []
      var list = _this.data.list
      for(var i=0; i<list.length; i++){
        if(list[i].riqi == riqi && list[i].customer_id == customer_id && list[i].sale_state == '审核中'){
          add_list.push({
            id:list[i].id,
            riqi:list[i].riqi,
            customer:list[i].customer,
            sh_staff:list[i].sh_staff,
            salesman:list[i].salesman,
            pick:list[i].pick,
            sale_type:list[i].sale_type,
            product_name:list[i].product_name,
            product_id:list[i].product_id,
            spec:list[i].spec,
            unit:list[i].unit,
            price:list[i].price,
            num:list[i].num,
            xiaoji:list[i].xiaoji,
            remarks:list[i].remarks,
            type:list[i].type,
            sale_state:list[i].sale_state,
            warehouse:''
          })
        }
      }
      console.log(add_list)
      _this.get_kucun();
      _this.setData({
        add_list:add_list,
        shShow:true
      })
    }

  },

  get_kucun: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query : "select id,warehouse,pihao,product_id,product_name,spec,unit,price,pinyin,r.num from (select product_id,warehouse,pihao,sum(case when state='审核通过' then convert(float,num) else 0 end) as num from ruku group by product_id,warehouse,pihao) as r left join product p on r.product_id=p.id;select id,warehouse,pihao,product_id,product_name,spec,unit,price,pinyin,s.num from (select product_id,warehouse,pihao,sum(case when type='销售' then convert(float,num) else -convert(float,num) end) as num from sale where sale_state = '审核通过' and chuku_state = '审核通过' and fahuo = '已发货' group by product_id,warehouse,pihao ) as s left join product p on s.product_id=p.id;"
      },
      success: res => {
        console.log(res)
        var list1 = res.result.recordsets[0]
        var list2 = res.result.recordsets[1]
        var this_list = []
        for(var i=0; i<list1.length; i++){
          this_list.push({
            warehouse:list1[i].warehouse,
            pihao:list1[i].pihao,
            product_id:list1[i].product_id,
            product_name:list1[i].product_name,
            spec:list1[i].spec,
            unit:list1[i].unit,
            price:list1[i].price,
            pinyin:list1[i].pinyin,
            num:0,
          })
        }

        for(var i=0; i<list2.length; i++){
          this_list.push({
            warehouse:list2[i].warehouse,
            pihao:list2[i].pihao,
            product_id:list2[i].product_id,
            product_name:list2[i].product_name,
            spec:list2[i].spec,
            unit:list2[i].unit,
            price:list2[i].price,
            pinyin:list2[i].pinyin,
            num:0,
          })
        }
        console.log(list1)
        console.log(list2)
        console.log(this_list)

        for (var i = 0; i < this_list.length; i++) {
          for (var j = i + 1; j < this_list.length; j++) {
            if (this_list[i].warehouse == this_list[j].warehouse && this_list[i].product_id == this_list[j].product_id) {
              this_list.splice(j, 1);
              j = j - 1;
            }
          }
        }
        
        for (var i = 0;i<this_list.length;i++) {
          for (var j =0;j<list1.length;j++) {
              if(this_list[i].warehouse == list1[j].warehouse && this_list[i].product_id == list1[j].product_id){
                this_list[i].num = this_list[i].num * 1 + list1[j].num * 1
              }
          }
        }

        console.log(this_list)

        for (var i = 0;i<this_list.length;i++) {
          for (var j =0;j<list2.length;j++) {
              if(this_list[i].warehouse == list2[j].warehouse && this_list[i].product_id == list2[j].product_id){
                this_list[i].num = this_list[i].num * 1 - list2[j].num * 1
              }
          }
        }
        console.log(this_list)
        _this.setData({
          kucun_list: this_list
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
      id: '',
      riqi: getNowDate(), 
      customer: '',
      customer_id: '',
      sh_staff: '',
      pick: '',
      wuliu_order: '',
      warehouse: '',
      staff: '',
      product_id: '',
      product_name: '',
      spec: '',
      unit: '',
      price: '',
      discount:'',
      xiaoji:'',
      pihao: '',
      num: '',
      remarks:'',
      type:'',
      fahuo:'',
      add_list:[],
      sale_state:'',
      sale_type:'',
    })
  },

  add1: function(){
    var _this = this
    if(_this.data.riqi == ''){
      wx.showToast({
        title: '请选择日期！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.customer_id == ''){
      wx.showToast({
        title: '请选择客户！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.sh_staff == ''){
      wx.showToast({
        title: '请填写收货人员！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.add_list.length == 0){
      wx.showToast({
        title: '请选择产品！',
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
      if(_this.data.add_list[i].add_type == ''){
        wx.showToast({
          title: '产品列表中第'+ i * 1+1 +'行未填写发货类型！',
          icon: 'none'
        })
        return;
      }
      if(_this.data.add_list[i].price == ''){
        wx.showToast({
          title: '产品列表中第'+ i * 1+1 +'行未填写销售单价！',
          icon: 'none'
        })
        return;
      }
    }

    var sql1 = "insert into sale(riqi,customer_id,sh_staff,pick,type,sale_type,product_id,price,num,xiaoji,remarks,sale_state,warehouse,express,wuliu_order,pihao,chuku_insert,chuku_state,fahuo) values "
      var sql2 = ""
      for(var i=0; i< _this.data.add_list.length; i++){
        if(sql2 == ""){
          sql2 = "('" + _this.data.riqi + "','" + _this.data.customer_id + "','" + _this.data.sh_staff + "','" + _this.data.pick + "','" + _this.data.type + "','" + _this.data.add_list[i].sale_type + "','" +  _this.data.add_list[i].product_id + "','" + _this.data.add_list[i].price + "','" + _this.data.add_list[i].num + "','" + _this.data.add_list[i].xiaoji + "','" + _this.data.add_list[i].remarks + "','审核中','','','','','','审核中','未发货')"
        }else{
          sql2 = sql2 + ",('" + _this.data.riqi + "','" + _this.data.customer_id + "','" + _this.data.sh_staff + "','" + _this.data.pick + "','" + _this.data.type + "','" + _this.data.add_list[i].sale_type + "','" +  _this.data.add_list[i].product_id + "','" + _this.data.add_list[i].price + "','" + _this.data.add_list[i].num + "','" + _this.data.add_list[i].xiaoji + "','" + _this.data.add_list[i].remarks + "','审核中','','','','','','审核中','未发货')"
        }
      }
      var sql = sql1 + sql2
      console.log(sql)

      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: sql
          // query: "insert into sale(riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,remarks,warehouse,type,express,fahuo,price) values('" + _this.data.riqi + "','" + _this.data.customer_id + "','" + _this.data.sh_staff + "','" + _this.data.pick + "','" + _this.data.wuliu_order + "','" + _this.data.product_id + "','" + _this.data.pihao + "','" + _this.data.num + "','" + _this.data.xiaoji + "','" + _this.data.remarks + "','" + _this.data.warehouse + "','" + _this.data.type + "','" + _this.data.express + "','" + _this.data.fahuo  + "','" + _this.data.price + "')"
        },
        success: res => {
          _this.setData({
            id: '',
            riqi: '',
            customer: '',
            customer_id: '',
            sh_staff: '',
            pick: '',
            wuliu_order: '',
            warehouse: '',
            staff: '',
            product_id: '',
            product_name: '',
            spec: '',
            unit: '',
            price: '',
            discount:'',
            xiaoji:'',
            pihao: '',
            num: '',
            remarks:'',
            type:'',
            fahuo:'',
            sale_state:'',
            sale_type:'',
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','','','','']
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
    if(column == 'num' ||column == 'price'){
      _this.setData({
        xiaoji: (_this.data.num * 1 ) * (_this.data.price * 1 )
      })
    }
  },

  upd1:function(){
    var _this = this
    if(_this.data.customer_id == ''){
      wx.showToast({
        title: '请选择客户！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.product_id == ''){
      wx.showToast({
        title: '请选择产品！',
        icon: 'none'
      })
      return;
    }

    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "update sale set riqi='" + _this.data.riqi + "',customer_id=" + _this.data.customer_id + ",sh_staff='" + _this.data.sh_staff + "',pick='" + _this.data.pick + "',product_id=" + _this.data.product_id + "',num=" + _this.data.num + ",xiaoji='" + _this.data.xiaoji + "',remarks='" + _this.data.remarks + "',type='" + _this.data.type + "',fahuo='" + _this.data.fahuo + "',price='" + _this.data.price + "',sale_state='审核中' where id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
          id: '',
          riqi: '',
          customer: '',
          customer_id: '',
          sh_staff: '',
          pick: '',
          wuliu_order: '',
          warehouse: '',
          staff: '',
          product_id: '',
          product_name: '',
          spec: '',
          unit: '',
          price: '',
          discount:'',
          xiaoji:'',
          pihao: '',
          num: '',
          remarks:'',
          type:'',
          fahuo:'',
          sale_state:'',
          sale_type:'',
        })
        _this.qxShow()
        var e = ['1900-01-01','2100-12-31','','','','']
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
          query: "delete from sale where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id: '',
            riqi: '',
            customer: '',
            customer_id: '',
            sh_staff: '',
            pick: '',
            wuliu_order: '',
            warehouse: '',
            staff: '',
            product_id: '',
            product_name: '',
            spec: '',
            unit: '',
            price: '',
            discount:'',
            xiaoji:'',
            pihao: '',
            num: '',
            remarks:'',
            type:'',
            fahuo:'',
            sale_state:'',
            sale_type:'',
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','','','','']
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
      customer:"",
      sale_state:'',
      sale_type:'',
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
    var e = [start_date,stop_date,_this.data.customer,_this.data.product_name,_this.data.sale_state,_this.data.sale_type]
    _this.tableShow(e)
    _this.qxShow()
  },

  select4: function (e) {
    var _this = this
    if (e.type == "select") {
      if(_this.data.xlShow4_type == "add"){
        var add_list = _this.data.add_list
        add_list.push({
          sale_type:'',
          product_name: e.detail.product_name,
          spec: e.detail.spec,
          unit: e.detail.unit,
          product_id: e.detail.id,
          attribute: e.detail.attribute,
          price:e.detail.price,
          num:'',
          discount:1,
          xiaoji:'',
          remarks:'',
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
          price:e.detail.attribute,
          xlShow4: false,
        })
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow4: false,
      })
    }
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

  clickView2:function(e){
    var _this = this
    var this_column = e.currentTarget.dataset.column
    if(this_column != 'warehouse'){
      return;
    }
    console.log(e.currentTarget.dataset.column)
    console.log(e.currentTarget.dataset.value)
    console.log(_this.data.add_list[e.currentTarget.dataset.index].id)
    console.log(_this.data.add_list[e.currentTarget.dataset.index].product_id)
    console.log(_this.data.add_list[e.currentTarget.dataset.index].num)
    var cangku_list = []
    for(var i=0; i<_this.data.kucun_list.length; i++){
      if(_this.data.kucun_list[i].product_id == _this.data.add_list[e.currentTarget.dataset.index].product_id && _this.data.kucun_list[i].num >= _this.data.add_list[e.currentTarget.dataset.index].num){
        cangku_list.push(_this.data.kucun_list[i].warehouse)
      }
    }
    console.log(cangku_list)
    _this.setData({
      id: e.currentTarget.dataset.index,
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      warehouse_list:cangku_list,
      xgShow3:true,
    })
  },

  qxShow2: function () {
    var _this = this
    _this.setData({
      xgShow2: false,
    })
  },

  qxShow3: function () {
    var _this = this
    _this.setData({
      xgShow3: false,
    })
  },

  upd2:function(){
    var _this = this
    var add_list = _this.data.add_list
    add_list[_this.data.id][_this.data.this_column] = _this.data.this_value
    add_list[_this.data.id].xiaoji = add_list[_this.data.id].price * add_list[_this.data.id].num * add_list[_this.data.id].discount
    _this.setData({
      add_list:add_list
    })
    _this.qxShow2()
  },

  upd3:function(){
    var _this = this
    var add_list = _this.data.add_list
    add_list[_this.data.id][_this.data.this_column] = _this.data.this_value
    _this.setData({
      add_list:add_list
    })
    _this.qxShow3()
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

  select5: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow5: false,
        customer: e.detail.customer,
        customer_id: e.detail.id,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow5: false,
      })
    }
  },

  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      var shenhe = e.detail.name
      var sql = ""
      if(shenhe =='审核通过'){
        for(var i=0; i<_this.data.add_list.length; i++){
          if(_this.data.add_list[i].warehouse == ''){
            wx.showToast({
              title: '列表中第' + (i * 1 + 1) + '行未填写发出仓库！',
              icon: 'none',
              duration: 3000
            })
            return;
          }
        }
        for(var i=0; i<_this.data.add_list.length; i++){
          sql = sql + "update sale set sale_state='" + shenhe + "',warehouse='" + _this.data.add_list[i].warehouse + "' where id=" + _this.data.add_list[i].id + ";"
        }
      }else{
        for(var i=0; i<_this.data.add_list.length; i++){
          sql = sql + "update sale set sale_state='" + shenhe + "' where id=" + _this.data.add_list[i].id + ";"
        }
      }
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: sql
        },
        success: res => {
          _this.setData({
            id: '',
            riqi: '',
            customer: '',
            customer_id: '',
            sh_staff: '',
            pick: '',
            wuliu_order: '',
            warehouse: '',
            staff: '',
            product_id: '',
            product_name: '',
            spec: '',
            unit: '',
            price: '',
            discount: '',
            xiaoji:'',
            pihao: '',
            num: '',
            remarks:'',
            type:'',
            fahuo:'',
            sale_state:'',
            sale_type:'',
            add_list:[],
            xlShow1: false,
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','','','','']
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

  selKH: function () {
    var _this = this
    var sql = "select customer as name,id,customer from customerInfo where customer like '%" + _this.data.customer + "%' or pinyin like'%" + _this.data.customer + "%'"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          listKeHu: list
        })
        console.log(list)
        _this.setData({
          xlShow5: true
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

  selSH: function () {
    var _this = this
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
      name : '销售',
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