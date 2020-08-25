const getExcel = require('../util/print')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : {},

    title: [
      {text:"序号",width:"100rpx",type:"text",columnName:"row_id",isupd:false},
      {text:"商品代码",width:"250rpx",type:"text",columnName:"productCode",isupd:false},
      {text:"单价",width:"250rpx",type:"text",columnName:"price",isupd:false},
      {text:"折扣",width:"200rpx",type:"digit",columnName:"discount",isupd:false},
      {text:"折后单价",width:"250rpx",type:"text",columnName:"endDiscountPrice",isupd:false},
      {text:"数量",width:"250rpx",type:"number",columnName:"num",isupd:false},
      {text:"支付方式",width:"250rpx",type:"text",columnName:"payType",isupd:true},
      {text:"备注",width:"400rpx",type:"text",columnName:"comment",isupd:true}
    ],

    list : [],

    dataset_input: [],
    input_hid : true,
    mask_hid : true,
    empty : "",

    code : "",
    payType : "",

    order_id : "",
    direction : "",
    userName : "",
    time : "",
    sum_price : 0,
    endDiscountPrice : 0
  },

  init : function(){
    var _this = this;
    var sql = " select s.id,row_number() over(order by s.id) as row_id,s.order_id,s.productCode,w.price,Round((w.price*(case s.discount when 0 then 1 else s.discount end)),2) as endDiscountPrice,case s.direction when 1 then '无' else CAST(s.discount*10 as varchar)+'折' end as discount,s.direction,s.userName,s.num,CONVERT(varchar(100), s.[time], 20) as [time],s.payType,s.comment,0 as isHid from zeng_stock as s,zeng_wares as w where s.productCode = w.code and s.order_id = '"+_this.data.order_id+"'"

    wx.showLoading({
      title: '加载中',
    })
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
        _this.getBottom();
      },
      complete: res=> {
        wx.hideLoading({
          success: (res) => {},
        })
      }

    })
  },

  getBottom : function(){
    var _this = this;

    var list = _this.data.list;
    var sum_price = 0;
    var sum_endDiscountPrice = 0;
    for(var i=0;i<list.length;i++){
      sum_price+=list[i].price*list[i].num
      sum_endDiscountPrice+=list[i].endDiscountPrice*list[i].num
    }

    _this.setData({
      direction : list[0].direction==1?"入库":"出库",
      userName : list[0].userName,
      time : list[0].time,
      sum_price : Math.floor(sum_price*100)/100,
      sum_endDiscountPrice : Math.floor(sum_endDiscountPrice*100)/100
    })
  },

  clickView : function(e){
    var _this = this;
    var dataset_input = e.currentTarget.dataset;
    if(!dataset_input.isupd){
      return;
    }

    _this.setData({
      dataset_input,
      input_hid : false,
      mask_hid : false
    })
  },
  save: function(e){
    var _this = this;
    var dataset = _this.data.dataset_input;

    var id = dataset.id;
    var column = dataset.column;
    var value = dataset.value;

    var new_value = e.detail.value.new
    if(new_value=="" && new_value != 0){
      new_value = value
      wx.showToast({
        title: "未修改",
        icon : "none"
      })
      return;
    }
    _this.hid_view()

    wx.cloud.callFunction({
      name : "sqlServer_117",
      data : {
        query: "update zeng_stock set "+column+" = '"+new_value+"' where id = '"+id+"'"
      },
      success : res=>{
        wx.showToast({
          title: "修改成功",
          icon : "none"
        })
        var index = dataset.index;
        _this.setData({
          ["list["+index+"]."+column] : new_value
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


  input_sel : function(e){
    var _this = this;
    var column = e.currentTarget.dataset.column
    var value = e.detail.value==""?"":e.detail.value

    if(column=="code"){
      _this.setData({
        code : value
      })
    }else{
      _this.setData({
        payType : value
      })
    }

    var list = _this.data.list;
    var code = _this.data.code.toString()
    var payType = _this.data.payType.toString()
    for(let i=0;i<list.length;i++){
      if(code=="" && payType==""){  
        _this.setData({
          ["list["+i+"].isHid"] : 0
        })
      }
      if(code!="" && payType==""){
        if(list[i].productCode.indexOf(code)==-1){
          _this.setData({
            ["list["+i+"].isHid"] : 1
          })
        }else{
          _this.setData({
            ["list["+i+"].isHid"] : 0
          })
        }
      }
      if(code=="" && payType!=""){
        if(list[i].payType.indexOf(payType)==-1){
          _this.setData({
            ["list["+i+"].isHid"] : 1
          })
        }else{
          _this.setData({
            ["list["+i+"].isHid"] : 0
          })
        }
      }
      if(code!="" && payType!=""){
        if(list[i].productCode.indexOf(code)==-1 || list[i].payType.indexOf(payType)==-1){
          _this.setData({
            ["list["+i+"].isHid"] : 1
          })
        }else{
          _this.setData({
            ["list["+i+"].isHid"] : 0
          })
        }
      }
    }
  },

  hid_view : function(){
    var _this = this;
    _this.setData({
      dataset_input : [],
      input_hid : true,
      mask_hid : true,
      empty : ""
    })
  },

  delete : function(e){
    var _this = this;
    var id = e.currentTarget.dataset.id;
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
              query : "delete from zeng_stock where id = '"+id+"'"
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
    getExcel.print(_this.data.title,_this.data.list,'订单详情：'+_this.data.order_id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      order_id : options.order_id,
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
    var _this = this;
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