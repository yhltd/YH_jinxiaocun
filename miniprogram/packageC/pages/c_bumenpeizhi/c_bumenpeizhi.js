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
    hid_chaxun : true,
    countPage : 20, //每一页显示的数据数据数量
    pageCount : 0, //总页数
    pageNum : 1, //当前页 
    cxShow: false,
    list : [],
    titil : [
      {text:"序号",width:"100rpx"},
      {text:"部门",width:"249rpx"},
      {text:"制表人",width:"400rpx"},
    ],

    dataset_input : [],
    animationData_input :[],


    animationData_moreDo_view : [],
    shan:"",
    gai:"",
    zeng:"",
    chaxun_hidden:true,
    bumenmingcheng:"",
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
    if(_this.data.gai){
      var dataset = e.currentTarget.dataset
      _this.setData({
        dataset_input : dataset
      })
  
      _this.showView(_this,"input");
    }else{
      wx.showToast({
        title: '无修改权限',
        icon: "none",
        duration: 1000
      })
    }

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
    if(_this.data.zeng){
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
    }else{
      wx.showToast({
        title: '无新增权限',
        icon: "none",
        duration: 1000
      })
    }

  },

  delete : function(e){
    var _this = this;
    var id = e.currentTarget.dataset.id
    var index  = e.currentTarget.dataset.index
    if(_this.data.shan){
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
    }else{
      wx.showToast({
        title: '无删除权限',
        icon: "none",
        duration: 1000
      })
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
        case "select":
          animation.translateY(0).step()
          _this.setData({
            animationData_select_view : animation.export()
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
      case "select":
        animation.translateY(500).step()
        _this.setData({
          animationData_select_view : animation.export()
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
        if (list.bmsz_delete != "是"){
          shan = false
        }
        if (list.bmsz_update != "是"){
          gai = false
        }
        if (list.bmsz_add != "是"){
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

  bumen_select:function(){
    var _this = this
    _this.hidView(_this,"moreDo")
    _this.setData({
      chaxun_hidden:false,
      bumenmingcheng:""
    })
  },

  select:function(e){
    var _this = this
    console.log(e.detail.value.bumenmingcheng)
    var bumenmingcheng = e.detail.value.bumenmingcheng
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var userInfo = _this.data.userInfo;
    var pageNum = _this.data.pageNum;
    var countPage = _this.data.countPage;

    _this.getPageCount();

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from (select *,row_number() over(order by id) as ROW_ID from Department where company = '"+userInfo.company+"' and department like '%" + bumenmingcheng + "%') as a where a.ROW_ID > "+(pageNum-1)*countPage+" and a.ROW_ID < "+(pageNum*countPage+1)
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
    _this.chaxun_quxiao()
  },

  chaxun_quxiao:function(){
    var _this = this
    _this.setData({
      chaxun_hidden:true
    })
  },

  use_book:function(){
    var _this = this
    _this.hidView(_this,"moreDo");
    wx.showModal({
      title: '使用说明',
      content: '1.点击更多操作后点击添加一行按钮，即可添加一条空数据。\n2.点击更多操作后点击部门查询按钮，在弹出的窗口输入条件点击确定按钮后即可查询。\n3.长按已有数据的序号，在弹出的窗口中点击确定即可删除。\n4.点击已有数据的对应位置，在弹出的窗口中输入信息点击确定按钮即可修改。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
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

  },
  /**
 * 刷新按钮点击事件 - 显示全部信息
 */
refreshAll: function() {
  var _this = this;
  
  // 重置查询条件
  _this.setData({
    bumenmingcheng: "",
    pageNum: 1, // 重置到第一页
    chaxun_hidden: true // 隐藏查询窗口
  });
  
  // 关闭所有打开的视图
  _this.hid_view();
  
  // 显示加载提示
  wx.showLoading({
    title: '刷新中',
    mask: true
  });
  
  // 调用初始化方法显示全部数据
  _this.init();
  
  wx.showToast({
    title: '已显示全部信息',
    icon: 'success',
    duration: 1500
  });
},
})