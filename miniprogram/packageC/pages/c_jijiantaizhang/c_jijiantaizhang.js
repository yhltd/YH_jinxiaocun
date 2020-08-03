const updSpace = require('../../util/updSpace')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initHidView : true,
    hid_view : false,
    empty : "",
    userInfo : "",

    countPage : 20, //每一页显示的数据数据数量
    pageCount : 0, //总页数
    pageNum : 1, //当前页 


    list : [],
    titil : [
      {text:"序号",width:"100rpx"},
      {text:"项目",width:"250rpx"},
      {text:"应收",width:"170rpx"},
      {text:"实收",width:"170rpx"},
      {text:"未收",width:"170rpx"},
      {text:"应付",width:"170rpx"},
      {text:"实付 ",width:"170rpx"},
      {text:"未付",width:"170rpx"},
      {text:"科目",width:"250rpx"},
    ],

    value_input : "",
    index_input : "",
    column_input : "",
    message_input : "",
    upd_db_id : "",
    input_type : "",
    animationData_input : [],

    isDelete : false,
    checkItems : []
  },

  init : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;
    var pageNum = _this.data.pageNum;
    var countPage = _this.data.countPage;

    _this.getPageCount();

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select *,(a.receivable-a.receipts) as notget1,(a.cope-a.payment) as notget2 from (select *,row_number() over(order by id) as ROW_ID from SimpleData where company = '"+_this.data.userInfo.company+"') as a where  a.ROW_ID > "+(pageNum-1)*countPage+" and a.ROW_ID < "+(pageNum*countPage+1)
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list : list,
        })
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail : res=>{
        wx.showToast({
          title: '请求失败！',
          icon : 'none'
        })
        console.log("请求失败！")
      }
    })
  },

  getPageCount : function(){
    var _this = this;
    var userInfo = _this.data.userInfo

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select count(*) as pageCount from SimpleData where company = '"+_this.data.userInfo.company+"'"
      },
      success: res => {


        var list = res.result.recordset
        var countPage = _this.data.countPage;
        var pageCount = Math.ceil(list[0].pageCount/countPage);
        _this.setData({
          pageCount
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail : res=>{
        wx.showToast({
          title: '请求失败！',
          icon : 'none'
        })
        console.log("请求失败！")
      }
    })
  },
  switchpage : function(e){
    var _this = this;
    var index= e.currentTarget.dataset.index;
    var pageNum = _this.data.pageNum;
    var pageCount = _this.data.pageCount;

    if(index=="-1"){
      pageNum--;
      if(pageNum<1){
        wx.showToast({
          title: "已经是第一页",
          icon : "none"
        })
      }else{
        _this.setData({
          pageNum
        })
        _this.init();
      }
    }else{
      pageNum++;
      if(pageNum>pageCount){
        wx.showToast({
          title: "已经是最后一页",
          icon : "none"
        })
      }else{
        _this.setData({
          pageNum
        })
        _this.init();
      }
    }
  },

  clickView : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var upd_db_id = e.currentTarget.dataset.id
    var column = e.currentTarget.dataset.column;
    var message = e.currentTarget.dataset.message
    var value = e.currentTarget.dataset.value;
    var input_type = e.currentTarget.dataset.input_type;
    _this.setData({
      value_input : value,
      index_input : index,
      column_input : column,
      message_input : message,
      upd_db_id,
      input_type
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
    var id = _this.data.upd_db_id
   
    _this.hidView(_this,"input")
    _this.setData({
      ["list["+index+"]."+column] : new_value_input,
      empty : ""
    })

    wx.cloud.callFunction({
      name : "sqlServer_cw",
      data : {
        query: "update SimpleData set ["+column+"] = '"+new_value_input+"' where id = '"+id+"'"
      },
      success : res=>{
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

  moreDo: function(){
    var _this = this;
    _this.showView(_this,"moreDo")
  },
  bindDelete : function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    _this.setData({
      isDelete : true
    })
  },

  choice_checkBox_delete : function(e){
    var _this = this;
    var id = e.currentTarget.dataset.id
    var value = e.detail.value
    var checkItems = _this.data.checkItems;
    if(value!=""){
      checkItems.push(id)
    }else{
      for(let i=0;i<checkItems.length;i++){
        if(checkItems[i]==id){
          checkItems.splice(i,1)
        }
      }
    }
    _this.setData({
      checkItems
    })
  },
  
  delete : function(){
    
    var _this = this;
    var checkItems = _this.data.checkItems
    if(checkItems==""){
      wx.showToast({
        title: '请选择项目',
        icon :'none'
      })
      return
    }

    wx.showModal({
      title : '提示',
      content : '确定删除吗？',
      cancelColor: '#009688',
      confirmColor : '#DD5044',
      success : res => {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
            mask : 'true'
          })
          var sql = "delete from SimpleData where id in ("
          for(var i=0;i<checkItems.length;i++){
            if(i==checkItems.length-1){
              sql += checkItems[i]+")"
              break;
            }
            sql += checkItems[i]+","
          }
          wx.cloud.callFunction({
            name : 'sqlServer_cw',
            data : {
              query : sql
            },
            success : res =>{
              wx.hideLoading({
                success: (res)=>{
                  _this.init();
                },
                complete: (res) => {
                  wx.showToast({
                    title: '删除成功',
                    icon : 'success'
                  })
                  updSpace.del("SimpleData",checkItems.length)
                },
              })
            },
            err : res =>{
              console.log("错误："+res)
            },
          })
        }
      }
    })
  },

  backDelete : function(){
    this.setData({
      checkItems : [],
      isDelete : false
    })
  },

  insert : function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    wx.showModal({
      title : '提示',
      content : '即将跳转到新增页面',
      cancelColor : '#282B33',
      confirmColor : '#009688',
      success : res => {
        if(res.confirm){
          var userInfo = _this.data.userInfo
          wx.navigateTo({
            url: '../../pages/c_jijiantaizhang_insert/c_jijiantaizhang_insert?userInfo='+JSON.stringify(userInfo),
          })
        }else if(res.cancel){
          return;
        }
      }
    })
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
    _this.init()
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