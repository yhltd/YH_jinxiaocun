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
  cxShow: false,
  xlShow4: false,
  xlShow1: false,
  xlShow5: false,
  data: {
    list: [],
    title1: [{
        text: "类型",
        width: "200rpx",
        columnName: "type",
        type: "text",
        isupd: true
      },
      {
        text: "往期余额",
        width: "200rpx",
        columnName: "xswqye",
        type: "text",
        isupd: true
      },
      {
        text: "本期购货",
        width: "200rpx",
        columnName: "bqgh",
        type: "text",
        isupd: true
      },
      {
        text: "本期退货",
        width: "200rpx",
        columnName: "bqth",
        type: "text",
        isupd: true
      },
      {
        text: "已付",
        width: "200rpx",
        columnName: "yf",
        type: "text",
        isupd: true
      },
      {
        text: "折扣",
        width: "200rpx",
        columnName: "zhekou",
        type: "text",
        isupd: true
      },
      {
        text: "返款金额",
        width: "200rpx",
        columnName: "fkjine",
        type: "text",
        isupd: true
      },
      {
        text: "余额",
        width: "200rpx",
        columnName: "yue",
        type: "text",
        isupd: true
      }
    ],

    title2: [{
      text: "类型",
      width: "200rpx",
      columnName: "type",
      type: "text",
      isupd: true
    },
    {
      text: "往期余额",
      width: "200rpx",
      columnName: "zswqye",
      type: "text",
      isupd: true
    },
    {
      text: "本期赠送",
      width: "200rpx",
      columnName: "bqzs",
      type: "text",
      isupd: true
    },
    {
      text: "余额",
      width: "200rpx",
      columnName: "yue",
      type: "text",
      isupd: true
    },
    {
      text: "已开票金额",
      width: "200rpx",
      columnName: "kpjine",
      type: "text",
      isupd: true
    }
  ],
    warehouse_list:[],
    id:'',
    warehouse: '', 
    pihao: '',
    listChanPin:[],
    listShenHe:[
      {name:'审核通过'},
      {name:'审核未通过'}
    ],
    type_list:['销售','退货'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo,
      customer:'',
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


  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select isnull(sum(case when type='销售' then convert(float,xiaoji) else 0 end),0) as bqgh,isnull(sum(case when type='退货' then convert(float,xiaoji) else 0 end),0) as bqth from sale where customer_id="+ e[0] +" and sale_state = '审核通过' and chuku_state = '审核通过' and fahuo = '已发货';select isnull(sum(convert(float,f_jine)),0) as yf,isnull(sum(convert(float,discount)),0) zhekou,isnull(sum(convert(float,r_jine)),0) as fkjine,isnull(sum(convert(float,quota)),0) as bqzs from payment where customer_id="+ e[0] +" and state = '审核通过';select isnull(convert(float,ghye),0) as xswqye,isnull(convert(float,zsye),0) as zswqye from customerInfo where id="+ e[0] +";select isnull(sum(convert(float,jine)),0) as kpjine from invoice where customer_id="+ e[0] +" and state = '审核通过';"
      },
      success: res => {
        var list1 = res.result.recordsets[0]
        var list2 = res.result.recordsets[1]
        var list3 = res.result.recordsets[2]
        var list4 = res.result.recordsets[3]
        
        var this_list1=[{
          type:'销售',
          xswqye:list3[0].xswqye,
          bqgh:list1[0].bqgh,
          bqth:list1[0].bqth,
          yf:list2[0].yf,
          zhekou:list2[0].zhekou,
          fkjine:list2[0].fkjine,
          yue:list3[0].xswqye * 1 - list1[0].bqgh * 1 + list1[0].bqth * 1 + list2[0].yf * 1 + list2[0].zhekou * 1 - list2[0].fkjine * 1
        }]

        var this_list2=[{
          type:'赠送',
          zswqye:list3[0].zswqye,
          bqzs:list2[0].bqzs,
          yue:list3[0].zswqye * 1 + list2[0].bqzs * 1,
          kpjine:list4[0].kpjine,
        }]
        console.log(this_list1)
        console.log(this_list2)

        _this.setData({
          list1: this_list1,
          list2: this_list2,
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

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime(),
      id: '',
      riqi: '',
      customer: '',
      customer_id: '',
      sh_staff: '',
      express: '',
      pick: '',
      wuliu_order: '',
      warehouse: '',
      staff: '',
      product_id: '',
      product_name: '',
      spec: '',
      unit: '',
      price: '',
      xiaoji:'',
      pihao: '',
      num: '',
      remarks:'',
      type:'',
    })
  },

  clickView:function(e){
    var _this = this
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
      xiaoji: _this.data.list[e.currentTarget.dataset.index].xiaoji,
      pihao: _this.data.list[e.currentTarget.dataset.index].pihao,
      num: _this.data.list[e.currentTarget.dataset.index].num,
      remarks: _this.data.list[e.currentTarget.dataset.index].remarks,
      type:_this.data.list[e.currentTarget.dataset.index].type,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    var e = ['1900-01-01','2100-12-31','']
    _this.tableShow(e)
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      start_date:"",
      stop_date:"",
      customer_name:"",
    })
  },


  sel1:function(){
    var _this = this
    if(_this.data.customer_id == ''){
      wx.showToast({
        title: '请选择客户！',
        icon: 'none',
        duration: 3000
      })
    }
    var e = [_this.data.customer_id]
    _this.tableShow(e)
    _this.qxShow()
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