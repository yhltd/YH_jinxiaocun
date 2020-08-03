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
      {text:"部门",width:"249rpx"},
      {text:"制表人",width:"400rpx"},
    ],

    dataset_input : [],
    animationData_input :[],


    animationData_moreDo_view : []
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
        query: "select * from (select *,row_number() over(order by id) as ROW_ID from Department where company = '"+userInfo.company+"') as a where a.ROW_ID > "+(pageNum-1)*countPage+" and a.ROW_ID < "+(pageNum*countPage+1)
      },
      success: res => {
        var list = res.result.recordset
        console.log(res)
        _this.setData({
          list
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
        query: "select count(*) as pageCount from Department where company = '"+userInfo.company+"'"
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
    var dataset = e.currentTarget.dataset
    _this.setData({
      dataset_input : dataset
    })

    _this.showView(_this,"input");
  },

  save: function(e){
    var _this = this;
    var dataset = _this.data.dataset_input
    
    var index = dataset.index
    var id = dataset.id;
    var column = dataset.column;
    var value = dataset.value;

    var newValue = e.detail.value.new
    if(newValue==""){
      newValue = value
    }

   
    _this.hidView(_this,"input")
    _this.setData({
      ["list["+index+"]."+column] : newValue,
      dataset_input : [],
      empty : ""
    })

    wx.cloud.callFunction({
      name : "sqlServer_cw",
      data : {
        query: "update Department set ["+column+"] = '"+newValue+"' where id = '"+id+"'"
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

  insert : function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    if(!updSpace.insert("Department")){
      wx.showModal({
        title : '警告',
        content : '数据库已满，请将数据备份后删除部分数据',
        showCancel : false,
        confirmColor : '#009688',
      })
      return;
    }

    wx.cloud.callFunction({
      name : "sqlServer_cw",
      data : {
        query: "insert into Department(department,man,company) values('','','"+_this.data.userInfo.company+"')"
      },
      success : res=>{

        _this.init()
      },
      err : res =>{
        wx.showToast({
          title: "错误",
          icon : "none"
        })
      }
    })
  },

  delete : function(e){
    var _this = this;
    var id = e.currentTarget.dataset.id
    var index  = e.currentTarget.dataset.index

    wx.showModal({
      title : "提示",
      content : '确定删除么？',
      cancelColor : '#282B33',
      confirmColor : '#BC4A4A',
      success : res=>{
        if (res.confirm) {
          var sql = "delete from Department where id = '"+id+"'"
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
              var list = _this.data.list;
              list.splice(index,1)
              updSpace.del("Department",1)
              _this.setData({
                list
              })
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
        case "moreDo":
          animation.translateX(0).step()
          _this.setData({
            animationData_moreDo_view : animation.export()
          })
          break;
      }
    },200)
    
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
          animationData_input : animation.export()
        })
        break;
      case "moreDo":
        animation.translateX(-300).step()
        _this.setData({
          animationData_moreDo_view : animation.export()
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