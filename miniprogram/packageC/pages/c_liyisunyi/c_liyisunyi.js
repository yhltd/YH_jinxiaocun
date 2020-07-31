// packageC/pages/c_kemuzongzhang/c_kemuzongzheng.js
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


    list : [
      {
        class : 0,
        className : "支出",
        arr :[]
      },{
        class : 1,
        className : "收入",
        arr :[]
      }
    ],
    monthSum :0,
    yearSum :0,
    titil : [
      {text:"序号",width:"100rpx"},
      {text:"科目名称",width:"400rpx"},
      {text:"本月数",width:"400rpx"},
      {text:"本年数",width:"400rpx"},
    ],

    class_id : 0,
    class_name : "",
    class_id_new : 0,

  },

  init : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;
    var class_id = _this.data.class_id;
    var pageNum = _this.data.pageNum;
    var countPage = _this.data.countPage;

    var sql = "select * from (select name,y.sum_month,y.sum_year,a.direction,row_number() over(order by name) as ROW_ID from Accounting as a,(SELECT code,(SELECT sum(money) FROM VoucherSummary WHERE MONTH(voucherDate) = MONTH(GETDATE()) AND code = y.code) AS sum_month,(SELECT sum(money) FROM VoucherSummary WHERE YEAR(voucherDate) = YEAR(GETDATE()) AND code = y.code) AS sum_year FROM VoucherSummary AS y WHERE company = '"+userInfo.company+"' and YEAR(voucherDate) = YEAR(GETDATE()) GROUP BY y.code) as y where a.code = y.code and a.company = '"+userInfo.company+"' and a.direction = "+class_id+") as t where t.ROW_ID > "+(pageNum-1)*countPage+" and t.ROW_ID < "+(pageNum*countPage+1)

    _this.getPageCount(sql);
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        var monthSum = 0
        var yearSum = 0
        for(let i=0;i<list.length;i++){
          monthSum+=parseInt(list[i].sum_month)
          yearSum+=parseInt(list[i].sum_year)
        }
        _this.setData({
          ["list["+class_id+"].arr"] : list,
          class_name : _this.data.list[class_id].className,
          monthSum,
          yearSum
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

  getPageCount : function(sql){
    var _this = this;
    var userInfo = _this.data.userInfo

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select count(*) as pageCount from ("+sql+") as a"
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


  showView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    _this.setData({
      initHidView : false,
      hid_view : true
    })

    setTimeout(() => {  
      switch(type){
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
    }, 100)
    
  },
  hidView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })

    _this.setData({
      hid_view : false
    })
    switch(type){
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
    _this.hidView(_this,"moreDo")
    _this.hidView(_this,"updClass")
  },

  moreDo: function(){
    var _this = this;
    _this.showView(_this,"moreDo")
  },

  updClass_moroDo: function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    _this.showView(_this,"updClass")
  },
  changeClass : function(e){
    var _this = this;
    var index = e.detail.current;

    _this.setData({
      class_id_new : index
    })
  },
  updClass : function(){
    var _this = this;
    var class_id_new = _this.data.class_id_new;
    _this.setData({
      pageNum : 1,
      class_id : class_id_new
    })
    _this.hidView(_this,"updClass")
    var arr = _this.data.list[class_id_new].arr
    if(arr!=""){
      var monthSum = 0;
      var yearSum = 0
      for(let i=0;i<arr.length;i++){
        monthSum+=parseInt(arr[i].sum_month)
        yearSum+=parseInt(arr[i].sum_year)
      }
      _this.setData({
        monthSum,
        yearSum
      })
    }
    _this.init();
  },
  backClass : function(){
    var _this = this;
    _this.setData({
      class_id_new : _this.data.class_id
    })
    _this.hidView(_this,"updClass");
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