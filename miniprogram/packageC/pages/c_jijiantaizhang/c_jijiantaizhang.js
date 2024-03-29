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
    this_quanxian:"",
    chaxun_hidden:true,

    countPage : 20, //每一页显示的数据数据数量
    pageCount : 0, //总页数
    pageNum : 1, //当前页 


    list : [],
    titil : [
      {text:"序号",width:"100rpx"},
      {text:"日期",width:"250rpx"},
      {text:"客户",width:"250rpx"},
      {text:"项目",width:"250rpx"},
      {text:"应收",width:"170rpx"},
      {text:"实收",width:"170rpx"},
      {text:"未收",width:"170rpx"},
      {text:"应付",width:"170rpx"},
      {text:"实付 ",width:"170rpx"},
      {text:"未付",width:"170rpx"},
      {text:"科目",width:"250rpx"},
      {text:"摘要",width:"250rpx"},
    ],

    value_input : "",
    index_input : "",
    column_input : "",
    message_input : "",
    upd_db_id : "",
    input_type : "",
    animationData_input : [],

    isDelete : false,
    checkItems : [],
    zeng:"",
    shan:"",
    gai:""
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
        query: "select id,kehu,zhaiyao,company,project,receivable,receipts,cope,payment,accounting,isnull(convert(VARCHAR,CONVERT(date,insert_date)),'') as insert_date,ROW_ID,(a.receivable-a.receipts) as notget1,(a.cope-a.payment) as notget2 from (select *,row_number() over(order by id) as ROW_ID from SimpleData where company = '"+_this.data.userInfo.company+"') as a where  a.ROW_ID > "+(pageNum-1)*countPage+" and a.ROW_ID < "+(pageNum*countPage+1)
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
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
    if(_this.data.gai){
      _this.showView(_this,"input");
    }else{
      wx.showToast({
        title: '无修改权限',
        icon: "none",
        duration: 1000
      })
    }
    
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
    if(_this.data.shan){
      _this.hidView(_this,"moreDo")
      _this.setData({
        isDelete : true
      })
    }else{
      wx.showToast({
        title: '无删除权限',
        icon: "none",
        duration: 1000
      })
    }
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
    if(_this.data.zeng){
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
    }else{
      wx.showToast({
        title: '无新增权限',
        icon: "none",
        duration: 1000
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var user = JSON.parse(options.userInfo)
    var bianhao = user.bianhao
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from quanxian where bianhao ='" + bianhao + "'"
      },
      success: res => {
        var list = res.result.recordset[0]
        console.log(list)
        var shan = true
        var gai = true
        var zeng = true
        if (list.jjtz_delete != "是"){
          shan = false
        }
        if (list.jjtz_update != "是"){
          gai = false
        }
        if (list.jjtz_add != "是"){
          zeng = false
        }
        _this.setData({
          shan:shan,
          gai:gai,
          zeng:zeng
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
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })
  },

  use_book:function(){
    var _this = this
    _this.hidView(_this,"moreDo");
    wx.showModal({
      title: '使用说明',
      content: '1.点击更多操作后在弹出的窗口中点击删除项目按钮，选中想要删除的数据后点击右下角删除按钮即可删除。\n2.点击更多操作后点击新增项目按钮，在弹出的页面中录入信息点击确定按钮即可添加。\n3.点击页面已有数据的对应列，可弹出修改窗口，录入数据点击确定按钮后即可修改对应位置。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  showChoiceMonth1 : function(e){
    var _this = this;
    _this.setData({
      start_date: e.detail.value
    })
  },
  showChoiceMonth2 : function(e){
    var _this = this;
    _this.setData({
      stop_date: e.detail.value
    })
  },

  chaxun_show:function(){
    var _this = this
    _this.hid_view()
    _this.setData({
      chaxun_hidden:false,
      xiangmumingcheng:"",
      start_date:"",
      stop_date:"",
    })
  },

  chaxun_quxiao:function(){
    var _this = this
    _this.hid_view()
    _this.setData({
      chaxun_hidden:true
    })
  },

  select:function(e){
    var _this = this
    console.log(e.detail.value)
    var start_date = e.detail.value.start_date
    var stop_date = e.detail.value.stop_date
    var xiangmumingcheng = e.detail.value.xiangmumingcheng
    if(start_date == ''){
      start_date = "1900-01-01"
    }
    if(stop_date == ''){
      stop_date = "2100-12-31"
    }
    if(start_date > stop_date){
      wx.showToast({
        title: '开始日期不能大于结束日期',
        icon:'none',
        duration: 2000//持续的时间
      })
      return
    }

    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var userInfo = _this.data.userInfo;
    var pageNum = _this.data.pageNum;
    var countPage = _this.data.countPage;

    var sql = "select id,kehu,zhaiyao,company,project,receivable,receipts,cope,payment,accounting,isnull(convert(VARCHAR,CONVERT(date,insert_date)),'') as insert_date,ROW_ID,(a.receivable-a.receipts) as notget1,(a.cope-a.payment) as notget2 from (select *,row_number() over(order by id) as ROW_ID from SimpleData where company = '"+_this.data.userInfo.company+"') as a where  a.ROW_ID > "+(pageNum-1)*countPage+" and a.ROW_ID < "+(pageNum*countPage+1) + " and project like '%" + xiangmumingcheng + "%' and insert_date >= '" + start_date + " 00:00:00.000' and insert_date <= '" + stop_date + " 23:59:59.000';"

    console.log(sql)

   

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
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
    _this.chaxun_quxiao()
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