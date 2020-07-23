// pages/gongzitiao/gongzitiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result : [],
    countPage : 100, //每一页显示的数据数据数量
    pageCount : 0, //总页数
    pageNum : 1, //当前页 

    list: [],
    title: [],
    companyName :"",

    options:[
      {
        background_color : "#4876FF",
        text_color : "white",
        items : [],
        text : "请选择",
        selectHid : true,
        columnName : "bumen"
      },
      {
        background_color : "#4876FF",
        text_color : "white",
        items : [],
        text : "请选择",
        selectHid : true,
        columnName : "zhiwu"
      }
    ],

    hidMask : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      companyName : options.companyName,
      result : JSON.parse(options.access)
    })


    _this.getTitle(_this);

    _this.getOptions(_this,0,options.companyName,"bumen");
    _this.getOptions(_this,1,options.companyName,"zhiwu");
  },

  getTitle : function(_this){
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select gongzimingxi from gongzi_title where gongzimingxi is not null"
      },
      success: res => {
        _this.setData({
          title: res.result.recordset.slice(0,53)
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  getList : function(pageNum,countPage,_this,companyName,where){
    var sql= "select * from (select *,ROW_NUMBER() over(order by [id]) ROW_ID from [gongzi_gongzimingxi] where BD = '"+companyName+"') t where t.[id] >("+pageNum+"-1)*"+countPage+" and t.[id]<("+pageNum+"*"+countPage+"+1) "+where
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        _this.setData({
          list: res.result.recordset
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  getOptions : function(_this,index,companyName,columnName){
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select ["+columnName+"] from gongzi_peizhi where gongsi = '"+companyName+"' and ["+columnName+"] != '-' and ["+columnName+"] is not null"
      },
      success: res => {
        var items = res.result.recordset
        var options = [];
        if(columnName=="bumen"){
          for(var i=0;i<items.length;i++){
            options.push(items[i].bumen)
          }
        }else if(columnName=="zhiwu"){
          for(var i=0;i<items.length;i++){
            options.push(items[i].zhiwu)
          }
        }
        _this.setData({
          ["options["+index+"].items"] : options
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },


  selectTap : function(e){
    var _this = this;
    var items_index = e.currentTarget.dataset.items_index
    var selectHid = _this.data.options[items_index].selectHid
    _this.setData({
      ["options["+items_index+"].selectHid"] : selectHid?false:true
    })
  },
  choice : function(e){
    var _this = this;
    var items_index = e.currentTarget.dataset.items_index;
    var items = _this.data.options[items_index];
    var index = e.currentTarget.dataset.item_index;
    var value = items.items[index]
    
    _this.setData({
      ["options["+items_index+"].text"] : value,
      ["options["+items_index+"].selectHid"] : true,
    })
  },

  sel : function(){
    var _this = this;
    var bumen = _this.data.options[0].text
    if(bumen=='请选择'){
      var where = "and D = '"+zhiwu+"'";
    }
    var zhiwu = _this.data.options[1].text
    if(zhiwu=='请选择'){
      var where = "and C = '"+bumen+"'"
    }

    var where = "and C = '"+bumen+"' and D = '"+zhiwu+"'";
    _this.getList(_this.data.pageNum,_this.data.countPage,_this,_this.data.companyName,where);

    _this.setData({
      hidMask : true
    })
  },

  selAgain : function(){
    this.setData({
      hidMask : false
    })
  },

  input:function(e){
    var _this =this;
    var index = e.currentTarget.dataset.index
    var value = e.detail.value

    _this.setData({
      ["options["+index+"].text"] : value
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