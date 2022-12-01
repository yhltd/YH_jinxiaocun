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
    title: [{
        text: "客户",
        width: "300rpx",
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
        text: "往期余额",
        width: "400rpx",
        columnName: "ghye",
        type: "text",
        isupd: true
      },
      {
        text: "本期购货",
        width: "200rpx",
        columnName: "xs",
        type: "text",
        isupd: true
      },
      {
        text: "本期退货",
        width: "200rpx",
        columnName: "th",
        type: "text",
        isupd: true
      },
      {
        text: "返款金额",
        width: "200rpx",
        columnName: "fankuan",
        type: "text",
        isupd: true
      },
      {
        text: "付款金额",
        width: "200rpx",
        columnName: "fukuan",
        type: "text",
        isupd: true
      },
      {
        text: "折扣金额",
        width: "200rpx",
        columnName: "zhekou",
        type: "text",
        isupd: true
      },
      {
        text: "余额",
        width: "200rpx",
        columnName: "ye",
        type: "text",
        isupd: true
      },
      {
        text: "往期赠送余额",
        width: "200rpx",
        columnName: "zsye",
        type: "text",
        isupd: true
      },
      {
        text: "赠送金额",
        width: "200rpx",
        columnName: "zengsong",
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
      userInfo:userInfo
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

    var date = new Date(); 
    var year = date.getFullYear();
    console.log(year)
    var e = [year,'']
    _this.tableShow(e)
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  bindPickerChange2: function(e){
    var _this = this
    console.log(_this.data.customer_list[e.detail.value].customer + " " + _this.data.customer_list[e.detail.value].id)
    _this.setData({
      [e.target.dataset.column_name]: _this.data.customer_list[e.detail.value].customer,
      customer_id: _this.data.customer_list[e.detail.value].id
    })
  },


  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select xs.id,customer,leibie,area,customer_num,isnull(xs,0) as xs,isnull(th,0) as th,isnull(fankuan,0) as fankuan,isnull(fukuan,0) as fukuan,isnull(zhekou,0) as zhekou,isnull(zengsong,0) as zengsong from (select id,customer,leibie,area,customer_num,pinyin,xs,th from (select customer_id,sum(case when type='销售' then convert(float,xiaoji) else 0 end) as xs,sum(case when type='退货' then convert(float,xiaoji) else 0 end) as th from sale where convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') and sale_state = '审核通过' and fahuo = '已发货' group by customer_id) as s right join customerInfo as c on s.customer_id=c.id) xs left join (select customer_id,sum(convert(float,r_jine)) fankuan,sum(convert(float,f_jine)) fukuan,sum(convert(float,discount)) zhekou,sum(convert(float,quota)) zengsong from payment where convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') and state = '审核通过' group by customer_id) p on xs.id=p.customer_id where customer like '%"+ e[1] +"%' or pinyin like '%"+ e[1] +"%' ORDER BY xs ;select id,isnull(ghye,0) as ghye,isnull(zsye,0) as zsye from customerInfo;"
      },
      success: res => {
        var list1 = res.result.recordsets[0]
        var list2 = res.result.recordsets[1]
        var list3 = []
        for(var i=0; i<list1.length; i++){
          for(var j=0; j<list2.length; j++){
            if(list1[i].id == list2[j].id){
              list3.push({
                id:list1[i].id,
                customer:list1[i].customer,
                leibie:list1[i].leibie,
                area:list1[i].area,
                customer_num:list1[i].customer_num,
                xs:list1[i].xs,
                th:list1[i].th,
                fankuan:list1[i].fankuan,
                fukuan:list1[i].fukuan,
                zhekou:list1[i].zhekou,
                zengsong:list1[i].zengsong,
                ghye:list2[i].ghye,
                zsye:list2[i].zsye,
                ye:list2[i].ghye * 1 - list1[i].xs * 1 + list1[i].th * 1 + list1[i].fukuan * 1 + list1[i].zhekou * 1 - list1[i].fankuan * 1
              })
            }
          }
        }
        console.log(list3)
        var swap = ""
        for(var i = 0; i<list3.length-1;i++) {
            for(var j = 0; j<list3.length - 1 - i; j++) {
                if(list3[j].ye * 1 < list3[j + 1].ye * 1) {
                    swap = list3[j + 1]
                    list3[j] = list3[j + 1]
                    list3[j + 1] = swap
                }
            }
        }
        var list4 = []
        for(var i = list3.length - 1; i>= 0 ; i--){
          list4.push(list3[i])
        }
        console.log(list4)
        _this.setData({
          list: list4
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
      year:"",
      customer:"",
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
    var year = _this.data.year
    if(year == '' || year == undefined){
      var date = new Date(); 
      year = date.getFullYear();
    }
    var e = [year,_this.data.customer]
    _this.tableShow(e)
    _this.qxShow()
  },

  inquire: function () {
    var _this = this
    var date = new Date(); 
    var year = date.getFullYear();
    var e = [year,'']
    _this.tableShow(e)
  },

  select4: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow4: false,
        product_name: e.detail.product_name,
        spec: e.detail.spec,
        unit: e.detail.unit,
        price:e.detail.price,
        product_id: e.detail.id,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow4: false,
      })
    }
  },

  selCD: function () {
    var _this = this
    _this.setData({
      xlShow4: true
    })
  },

  selSH: function () {
    var _this = this
    _this.setData({
      xlShow1: true
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