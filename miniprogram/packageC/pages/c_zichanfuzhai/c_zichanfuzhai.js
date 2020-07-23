// miniprogram/packageC/pages/c_zichanfuzhai/c_zicanfuzhai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initHidView : true,
    userInfo : "",


    list : [
      {
        class : 1,
        className : "资产类",
        arr :[]
      },{
        class : 2,
        className : "负债类",
        arr :[]
      },{
        class : 3,
        className : "权益类",
        arr :[]
      }
    ],
    titil : [
      {text:"序号",width:"100rpx"},
      {text:"科目名称",width:"400rpx"},
      {text:"年初余额",width:"250rpx"},
      {text:"年初余额",width:"250rpx"},
    ],

    class_id : 2,
    class_name : "负债类",
    class_id_new : 2,

    animationData_moreDo_view : [],

    sumItem : [
      {
        text : "年初余额合计",
        sum : 0
      },{
        text : "年末余额合计",
        sum : 0
      }
    ],
    animationData_sum : []
  },

  init : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;
    var class_id = _this.data.class_id;


    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select left(a.code,1) as class,ROW_NUMBER() over(order by a.id) as ROW_ID,id,name,[load],isnull((SELECT SUM(money) FROM VoucherSummary WHERE VoucherSummary.code = a.code),0) as money,borrowed from Accounting as a where LEFT(a.code,1) = "+class_id+" and company = '"+userInfo.company+"'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          ["list["+(class_id-1)+"].arr"] : _this.handle(list),
          class_name : _this.data.list[class_id-1].className
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

  handle : function(list){
    for(var i=0;i<list.length;i++){
      //累加项目金额
      list[i].money += list[i].load+list[i].borrowed
    }
    return list
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
      class_id_new : index+1
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
    if(_this.data.list[class_id_new-1].arr==""){
      _this.init();
    }
  },
  backClass : function(){
    var _this = this;
    _this.setData({
      class_id_new : _this.data.class_id
    })
    _this.hidView(_this,"updClass");
  },



  showSum : function(){
    var _this = this;
    var index = _this.data.class_id-1;

    if(index<2){
      var arr = _this.data.list[index].arr;
      var sum_load = 0;
      var sum_borrowed = 0;
      for(var i=0;i<arr.length;i++){
        sum_load += arr[i].load
        sum_borrowed += arr[i].money
      }
      _this.setData({
        ["sumItem[0].sum"] : sum_load,
        ["sumItem[1].sum"] : sum_borrowed
      })
    }else{
      var arr = _this.data.list[index].arr;
      var sum_load1 = 0;
      var sum_borrowed1 = 0;
      var sum_load2 = 0;
      var sum_borrowed2 = 0;
      for(var i=0;i<arr.length;i++){
        sum_load1 += arr[i].load
        sum_borrowed1 += arr[i].money
      }
      var arr2 = _this.data.list[1].arr;
      for(var j=0;j<arr2.length;j++){
        sum_load2 += arr2[j].load
        sum_borrowed2 += arr2[j].money
      }

      _this.setData({
        ["sumItem[0].sum"] : "本类合计："+sum_load1+"负债和权益合计："+(parseInt(sum_load1)+parseInt(sum_load2)),
        ["sumItem[1].sum"] : "本类合计："+sum_borrowed1+"负债和权益合计："+(parseInt(sum_borrowed1)+parseInt(sum_borrowed2)),
      })
    }
    
    _this.showView(_this,"sum")
  },

  choice_sum : function(){
    var _this = this;
    _this.hidView(_this,"sum")
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    _this.init();
    _this.hid_view()
  },


  showView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    _this.setData({
      initHidView : false
    })

    wx.nextTick(()=>{
      switch(type){
        case "moreDo":
          animation.translateX(0).step()
          _this.setData({
            animationData_moreDo_view : animation.export(),
            hid_view : true
          })
          break;
        case "updClass":
          animation.translateY(0).step()
          _this.setData({
            animationData_updClass : animation.export(),
            hid_view : true
          })
          break;
        case "sum":
          animation.translateY(0).step()
          _this.setData({
            animationData_sum : animation.export(),
            hid_view : true
          })
          break;
      }
    })
    
    
  },
  hidView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    
    switch(type){
      case "moreDo":
        animation.translateX(-300).step()
        _this.setData({
          animationData_moreDo_view : animation.export(),
          hid_view : false
        })
        break;
      case "updClass":
        animation.translateY(300).step()
        _this.setData({
          animationData_updClass : animation.export(),
          hid_view : false
        })
        break;
      case "sum":
        animation.translateY(400).step()
        _this.setData({
          animationData_sum : animation.export(),
          hid_view : false
        })
        break;
    }
  },
  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    _this.hidView(_this,"updClass")
    _this.hidView(_this,"sum")
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