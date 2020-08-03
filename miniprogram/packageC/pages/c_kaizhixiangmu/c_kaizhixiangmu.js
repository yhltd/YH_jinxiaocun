const updSpace = require('../../util/updSpace')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initHidView : true,
    hid_view : false,
    empty : "",
    userInfo : [],
    
    list : [
      {
        dbName : "ROW_ID",
        dbTable : "",
        width:"101rpx",
        arr : []
      },{
        dbName : "financingExpenditure",
        dbTable : "FinancingExpenditure",
        width:"401rpx",
        arr : []
      },{
        dbName : "financingIncome",
        dbTable : "FinancingIncome",
        width:"401rpx",
        arr : []
      },{
        dbName : "investmentExpenditure",
        dbTable : "InvestmentExpenditure",
        width:"401rpx",
        arr : []
      },{
        dbName : "investmentIncome",
        dbTable : "InvestmentIncome",
        width:"401rpx",
        arr : []
      },{
        dbName : "managementExpenditure",
        dbTable : "ManagementExpenditure",
        width:"401rpx",
        arr : []
      },{
        dbName : "managementIncome",
        dbTable : "ManagementIncome",
        width:"401rpx",
        arr : []
      },{
        dbName : "word",
        dbTable : "VoucherWord",
        width:"201rpx",
        arr : []
      },
    ],
    titil : [
      {text:"序号",width:"100rpx"},
      {text:"经营收入",width:"400rpx"},
      {text:"经营支出",width:"400rpx"},
      {text:"筹资收入",width:"400rpx"},
      {text:"筹资支出",width:"400rpx"},
      {text:"投资收入",width:"400rpx"},
      {text:"投资支出 ",width:"400rpx"},
      {text:"凭证字",width:"200rpx"}
    ],

    dataset_input : [],
    animationData_input : [],

    startTime : 0,
    endTime : 0
  },

  init : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;


    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from FinancingExpenditure where company = '"+userInfo.company+"';select * from FinancingIncome where company = '"+userInfo.company+"';select * from InvestmentExpenditure where company = '"+userInfo.company+"';select * from InvestmentIncome where company = '"+userInfo.company+"';select * from ManagementExpenditure where company = '"+userInfo.company+"';select * from ManagementIncome where company = '"+userInfo.company+"';select * from VoucherWord where company = '"+userInfo.company+"'"
      },
      success: res => {
        _this.setData({
          list : _this.handle(res.result.recordsets)
        })
        wx.hideLoading({
          success: (res) => {},
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
    var _this = this;
    var newList = _this.data.list
    var length = 0
    var index = 0
    for(var i=0;i<list.length;i++){
      
      newList[i+1].arr = list[i]

      if(list[i].length>length){
        length = list[i].length
        index = i
      }
    }
    var data_list = []
    for(var x=0;x<list[index].length;x++){
      data_list.push({"id":x+1,"ROW_ID":x+1})
    }
    newList[0].arr = data_list

    return newList
  },

  clickView : function(e){
    var _this = this;
    var dataset = e.currentTarget.dataset

    if(typeof(dataset.value)=="number" || _this.data.endTime - _this.data.startTime >= 350){
      return;
    }
    _this.setData({
      dataset_input : dataset,
    })
    _this.showView(_this,"input");
  },

  bindTouchStart: function(e) {//触碰开始
    var _this = this
    _this.startTime = e.timeStamp;
    _this.setData({
      startTime: e.timeStamp
    })
  },
  bindTouchEnd: function(e) {//触碰结束
    var _this = this
    _this.setData({
      endTime: e.timeStamp
    })
  },


  save: function(e){
    var _this = this;
    var dataset = _this.data.dataset_input;

    var itemIndex = dataset.itemindex;
    var index = dataset.index;
    var id = dataset.id;
    var dbName = dataset.dbname;
    var dbTable = dataset.dbtable;
    var value = dataset.value;

    var new_value = e.detail.value.new
    if(new_value==""){
      new_value = value
    }


    _this.hidView(_this,"input")
    _this.setData({
      ["list["+itemIndex+"].arr["+index+"]."+dbName] : new_value
    })

    var sql = "update "+dbTable+" set "+dbName+" = '"+new_value+"' where id = '"+id+"'"
    wx.cloud.callFunction({
      name : "sqlServer_cw",
      data : {
        query: sql
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

  insert : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title : _this.data.titil[index].text,
      content : '添加一行？',
      cancelColor : '#282B33',
      confirmColor : '#009688',
      success : res => {
        if (res.confirm) {
          
          wx.showLoading({
            title: '加载中',
            mask : 'true'
          })
          var sql = ""
          var list = _this.data.list;
          if(!updSpace.insert(list[index].dbTable)){
            wx.showModal({
              title : '警告',
              content : '数据库已满，请将数据备份后删除部分数据',
              showCancel : false,
              confirmColor : '#009688',
            })
            return
          }

          wx.cloud.callFunction({
            name : "sqlServer_cw",
            data : {
              query: "insert into "+list[index].dbTable+"(["+list[index].dbName+"],company) values('','"+_this.data.userInfo.company+"');"
            },
            success : res=>{
              wx.hideLoading({
                success: (res) => {},
              })
              _this.init();
            },
            err : res =>{
              wx.showToast({
                title: "错误",
                icon : "none"
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  delete : function(e){
    var _this = this;
    var dataset = e.currentTarget.dataset
    if(typeof(dataset.value)=="number"){
      return;
    }

    wx.showModal({
      title : _this.data.titil[dataset.itemindex].text+":"+dataset.value,
      content : '确定删除么？',
      cancelColor : '#282B33',
      confirmColor : '#BC4A4A',
      success : res=>{
        if (res.confirm) {
          var sql = "delete from "+dataset.dbtable+" where id = '"+dataset.id+"'"

          var arr = _this.data.list[dataset.itemindex].arr
          arr.splice(dataset.index,1)
          _this.setData({
            ["list["+dataset.itemindex+"].arr"] : arr
          })
          wx.cloud.callFunction({
            name : "sqlServer_cw",
            data : {
              query: sql
            },
            success : res=>{
              wx.showToast({
                title: "删除成功",
                icon : "none"
              })
              _this.arrangeList()
              updSpace.del(dataset.dbtable,1)
            },
            err : res =>{
              wx.showToast({
                title: "错误",
                icon : "none"
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  arrangeList : function(){
    var _this = this;
    var list = _this.data.list
    var maxLength = 0;
    for(let i=1;i<list.length;i++){
      if(maxLength<list[i].arr.length){
        maxLength = list[i].arr.length
      }
    }

    var RowList = list[0].arr
    if(RowList.length>maxLength){
      RowList.splice(-1,1)
    }else if(RowList.length<maxLength){
      RowList.push({"id":RowList.length+1,"ROW_ID":RowList.length+1})
    }
    _this.setData({
      ["list[0].arr"] : RowList
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
    _this.hid_view()
    wx.showModal({
      title :'提示',
      content : "添加：点击表头；删除：长按单元格；修改：点击单元格",
      showCancel: false,
      confirmColor : "#009688",
      confirmText : '我知道了',
      success : res=> {
        if (res.confirm) {
          _this.init()
        }
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

    setTimeout(function(){
      switch(type){
        case "input":
          animation.translateX(0).step()
          _this.setData({
            animationData_input : animation.export()
          })
          break;
      }
    },100)
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
          dataset_input : [],
          empty : ""
        })
        break;
    }
  },
  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"input")
  },
  moreDo: function(){
    var _this = this;
    _this.showView(_this,"moreDo")
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