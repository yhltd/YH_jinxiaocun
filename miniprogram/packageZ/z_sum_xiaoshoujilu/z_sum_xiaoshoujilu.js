const getExcel = require('../util/print')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    title: [
      {text:"序号",width:"100rpx",type:"text",columnName:"row_id",isupd:false},
      {text:"订单号",width:"300rpx",type:"text",columnName:"order_id",isupd:true},
      {text:"方向",width:"200rpx",type:"digit",columnName:"direction",isupd:false},
      {text:"合计金额",width:"250rpx",type:"text",columnName:"sum_price",isupd:false},
      {text:"合计折后金额",width:"250rpx",type:"text",columnName:"sum_endPrice",isupd:false},
      {text:"数量",width:"200rpx",type:"text",columnName:"sum_num",isupd:false},
      {text:"销售员",width:"200rpx",type:"digit",columnName:"userName",isupd:false},
      {text:"时间",width:"350rpx",type:"digit",columnName:"time",isupd:false},
    ],
    list : [],
    
    sumPrice : 0,
    sumEndPrice : 0,
    sumNum : 0,

    moreDo_hid : true,
    mask_hid : true,


    selectList : {
      sql_day : "",
      sql_month : "",
      sql_select : ""
    },
  },

  init : function(is){
    var _this = this;

    wx.showLoading({
      title: '加载中',
    })
    var sql = "select row_number() over(order by time desc) as row_id,order_id,round(sum(w.price*s.num),2) as sum_price,round(sum((case discount when 0 then 1 else discount end)*w.price*s.num),2) as sum_endPrice,round(sum(s.num),2) as sum_num,userName,(case direction when 1 then '入库' else '出库' end) as direction,CONVERT(varchar(100), s.[time], 20) as [time],0 as isHid from zeng_stock as s,zeng_wares as w where s.productCode = w.code GROUP BY order_id,userName,direction,time having 1=1"+_this.getSql()+" order by time desc"
    wx.cloud.callFunction({
      name : "sqlServer_117",
      data : {
        query : sql
      },
      success : res=> {
        var list = res.result.recordset;
        
        _this.setData({
          list
        })
        _this.getSum();
      },
      complete: res=> {
        wx.hideLoading({
          success: (res) => {},
        })
      }

    })
  },

  refresh : function(){
    var _this = this;
    _this.setData({
      selectList : {
        sql_day : "",
        sql_month : "",
        sql_select : ""
      },
    })
    _this.init();
  },

  getSum : function(){
    var _this = this;
    var list = _this.data.list;
    var sumPrice = 0;
    var sumEndPrice = 0;
    var sumNum = 0;
    for(let i=0;i<list.length;i++){
      if(list[i].direction=='入库'){
        sumNum += list[i].sum_num
      }else{
        sumPrice += list[i].sum_price
        sumEndPrice += list[i].sum_endPrice
      }
    }

    _this.setData({
      sumPrice : Math.floor(sumPrice * 100) / 100,
      sumEndPrice : Math.floor(sumEndPrice * 100) / 100,
      sumNum : Math.floor(sumNum * 100) / 100,
    })
  },

  getSql : function(){
    var _this = this;
    var selectList = _this.data.selectList;
    var sql = "";
    if(selectList.sql_day!=""){
      sql += selectList.sql_day
    }
    if(selectList.sql_month!=""){
      sql += selectList.sql_month
    }
    if(selectList.sql_select!=""){
      sql += selectList.sql_select
    }
    return sql
  },


  clickView : function(e){
    var　_this = this;
    var isupd = e.currentTarget.dataset.isupd
    if(!isupd){
      return
    }
    var order_id = e.currentTarget.dataset.order_id
    wx.navigateTo({
      url: '../../packageZ/z_xiaoshoujilu/z_xiaoshoujilu?order_id='+order_id,
    })
  },

  moreDo_show : function(){
    var _this = this;
    _this.setData({
      moreDo_hid : false,
      mask_hid : false,
    })
  },

  sum_day : function(){
    var _this = this;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1?"0" + (parseInt(date.getMonth())+1):(parseInt(date.getMonth())+1);
    var day = date.getDate()<10?"0"+ date.getDate():date.getDate();
    var time = year+"-" + month + "-" + day;
    _this.setData({
      ["selectList.sql_month"] : "",
      ["selectList.sql_day"] : " and day(time) = '"+day+"' and month(time) = '"+month+"' and year(time) = '"+year+"'"
    })
    _this.hid_view()
    _this.init();
  },

  sum_month : function(){
    var _this = this;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    _this.setData({
      ["selectList.sql_day"] : "",
      ["selectList.sql_month"] : " and month(time) = '"+month+"' and year(time) = '"+year+"'"
    })
    _this.hid_view()
    _this.init();
  },

  hid_view : function(){
    var _this = this;
    _this.setData({
      dataset_input : [],
      moreDo_hid : true,
      mask_hid : true,
    })
  },
  
  delete : function(e){
    var _this = this;
    var order_id = e.currentTarget.dataset.order_id;
    wx.showModal({
      title : '提示',
      content : '确认删除吗？',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title : '加载中',
            mask : 'true'
          })
          wx.cloud.callFunction({
            name : "sqlServer_117",
            data : {
              query : "delete from zeng_stock where order_id = '"+order_id+"'"
            },
            success : res=> {
              wx.hideLoading({
                complete: (res) => {
                  _this.init();
                },
              })
            },
          })
        } else if (res.cancel) {
          return
        }
      }
    })
  },

  print : function(){
    var _this = this;
    getExcel.print(_this.data.title,_this.data.list,'订单汇总')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

    var _this  = this;
    _this.init();
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