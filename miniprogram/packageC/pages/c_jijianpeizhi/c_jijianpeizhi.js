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
    this_quanxian:"",
    list : [
      {
        dbName : "ROW_ID",
        dbTable : "",
        width:"102rpx",
        arr : []
      },{
        dbTable : "AccountingPeizhi",
        dbName : "accounting",
        width:"402rpx",
        arr : []
      },{
        dbTable : "KehuPeizhi",
        dbName : "kehu",
        width:"402rpx",
        arr : []
      },{
        dbTable : "InvoicePeizhi",
        dbName : "invoice_type",
        width:"402rpx",
        arr : []
      }
    ],
    titil : [
      {text:"序号",width:"100rpx"},
      {text:"科目",width:"400rpx"},
      {text:"客户/供应商/往来单位",width:"400rpx"},
      {text:"发票种类",width:"400rpx"},
    ],

    dataset_input : [],
    animationData_input : [],

    startTime : 0,
    endTime : 0,
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


    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from AccountingPeizhi where company = '"+userInfo.company+"';select * from KehuPeizhi where company = '"+userInfo.company+"';select * from InvoicePeizhi where company = '"+userInfo.company+"'"
      },
      success: res => {
        console.log(res.result.recordsets)
        var this_list = _this.handle(res.result.recordsets)
        console.log(this_list)
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
    if(_this.data.gai){
      _this.setData({
        dataset_input : dataset,
      })
      _this.showView(_this,"input");
    }else{
      wx.showToast({
        title: '无修改权限',
        icon: "none",
        duration: 1000
      })
    }
    
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
    console.log(_this.data.zeng)
    if(_this.data.zeng){
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
    }else{
      wx.showToast({
        title: '无新增权限',
        icon: "none",
        duration: 1000
      })
    }
    
  },

  delete : function(e){
    var _this = this;
    if(_this.data.shan){
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
    }else{
      wx.showToast({
        title: '无删除权限',
        icon: "none",
        duration: 1000
      })
    }

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
        if (list.kzxm_delete != "是"){
          shan = false
        }
        if (list.kzxm_update != "是"){
          gai = false
        }
        if (list.kzxm_add != "是"){
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

  use_book:function(){
    wx.showModal({
      title: '使用说明',
      content: '1.点击每列的标题，可在对应列添加一行空数据。\n2.点击表格上的已有数据，可弹出修改窗口。\n3.长按表格上已有数据，可弹出删除对话框。\n4.点击下方同步数据按钮，可刷新表格上的数据。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
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