const updSpace = require('../util/updSpace')
const getExcel = require('../util/print')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],


    title: [
      {text:"序号",width:"100rpx",type:"text",columnName:"row_id",isupd:false},
      {text:"商品代码",width:"250rpx",type:"text",columnName:"code",isupd:false},
      {text:"商品名称",width:"250rpx",type:"text",columnName:"name",isupd:true},
      {text:"商品单价",width:"200rpx",type:"digit",columnName:"price",isupd:true},
      {text:"库存数量",width:"200rpx",type:"number",columnName:"num",isupd:true},
      {text:"类型",width:"250rpx",type:"text",columnName:"type",isupd:true},
      {text:"用料",width:"250rpx",type:"text",columnName:"cloth",isupd:true},
      {text:"规格",width:"250rpx",type:"text",columnName:"norms",isupd:true},
      {text:"备用字段1",width:"250rpx",type:"text",columnName:"mark1",isupd:true},
      {text:"备用字段2",width:"250rpx",type:"text",columnName:"mark2",isupd:true},
      {text:"备用字段3",width:"250rpx",type:"text",columnName:"mark3",isupd:true},
      {text:"备用字段4",width:"250rpx",type:"text",columnName:"mark4",isupd:true},
      {text:"备用字段5",width:"250rpx",type:"text",columnName:"mark5",isupd:true},
    ],
    list : [],
    input_hid : true,
    mask_hid : true,
    startPrice : 0,
    endPrice : 0,
    empty : "",
  },
  
  init : function(){
    var _this = this;
    wx.showLoading({
      title: '加载中',
    })
    var sql = "select *,row_number() over(order by id) as row_id,0 as isHid from zeng_wares";
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
      },
      complete: res=> {
        wx.hideLoading({
          success: (res) => {},
        })
      }

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
    var index = dataset.index;
    
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

    var sql = "update zeng_wares set "+column+" = '"+new_value+"' where id = '"+id+"';"
    if(column=='num'){
      var order_id = _this.getOrder_id();
      var direction = new_value>value?1:0
      var num = new_value>value?new_value-value:value-new_value
      sql += "insert into zeng_stock(productCode,discount,direction,userName,num,time,comment,payType,order_id) values('"+_this.data.list[index].code+"','0','"+direction+"','"+_this.data.userInfo.userName+"','"+num+"',CONVERT(varchar,GETDATE(),120),'老板修改库存','','"+order_id+"');"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name : "sqlServer_117",
      data : {
        query: sql
      },
      success : res=>{
        wx.showToast({
          title: "修改成功",
          icon : "none"
        })
        
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

  //获取订单号
  getOrder_id : function(){
    var _this = this;
    var id = _this.data.userInfo.id
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();
    var milliSecond = myDate.getMilliseconds();

    
    var time = myDate.getTime().toString()

    var random = Math.round(Math.random()*99);
    
    
    var order_id = year+month+day+hour+minute+second+milliSecond+id+time.substring(time.length-8)+random

    return order_id
  },

  delete : function(e){
    var _this = this;
    var id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title : "提示",
      content : '确认删除吗？',
      success : res=> {
        if (res.confirm) {
          var sql = "delete from zeng_wares where id = '"+id+"'";

          wx.cloud.callFunction({
            name : "sqlServer_117",
            data : {
              query: sql
            },
            success : res=>{
              wx.showToast({
                title: "删除成功",
                icon : "none"
              })
              updSpace.del("zeng_wares",1)
              _this.init()
            },
            err : res =>{
              wx.showToast({
                title: "错误",
                icon : "none"
              })
            }
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
  },

  input_Price : function(e){
    var _this = this;
    var column = e.currentTarget.dataset.column
    var value = e.detail.value==""?0:parseInt(e.detail.value)

    if(column=="startPrice"){
      _this.setData({
        startPrice : value
      })
    }else{
      _this.setData({
        endPrice : value
      })
    }

    var list = _this.data.list;
    var startPrice = _this.data.startPrice
    var endPrice = _this.data.endPrice
    for(let i=0;i<list.length;i++){
      if(startPrice==0 && endPrice==0){
        _this.setData({
          ["list["+i+"].isHid"] : 0
        })
      }else if(startPrice!=0 && endPrice!=0){
        if(list[i].price>= startPrice && list[i].price <= endPrice){
          _this.setData({
            ["list["+i+"].isHid"] : 0
          })
        }else{
          _this.setData({
            ["list["+i+"].isHid"] : 1
          })
        }
      }else if(startPrice==0 && endPrice!=0){
        if(list[i].price <= endPrice){
          _this.setData({
            ["list["+i+"].isHid"] : 0
          })
        }else{
          _this.setData({
            ["list["+i+"].isHid"] : 1
          })
        }
      }else if(startPrice!=0 && endPrice==0){
        if(list[i].price >= startPrice){
          _this.setData({
            ["list["+i+"].isHid"] : 0
          })
        }else{
          _this.setData({
            ["list["+i+"].isHid"] : 1
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
      select_list : {
        startPrice : "",
        endPrice : ""
      },
      empty : ""
    })
  },

  print : function(){
    var _this = this;
    getExcel.print(_this.data.title,_this.data.list,'库存')
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      userInfo : JSON.parse(options.userInfo) 
      
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