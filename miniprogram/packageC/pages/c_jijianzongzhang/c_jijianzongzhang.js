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

    countPage : 20, //每一页显示的数据数据数量
    pageCount : 0, //总页数
    pageNum : 1, //当前页 

    list : [

    ],
    titil : [
      {text:"序号",width:"100rpx"},
      {text:"科目",width:"250rpx"},
      {text:"应收",width:"170rpx"},
      {text:"实收",width:"170rpx"},
      {text:"未收",width:"170rpx"},
      {text:"应付",width:"170rpx"},
      {text:"实付 ",width:"170rpx"},
      {text:"未付",width:"170rpx"},
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
    var sql = "select * from (select row_number() over(order by a.accounting desc) as ROW_ID,a.id,a.accounting,ISNULL(sum(d.receivable), 0) as receivable,ISNULL(sum(d.receipts), 0) as receipts,ISNULL(sum(d.receivable-d.receipts), 0) as notget1,ISNULL(sum(d.cope), 0) as cope,ISNULL(sum(d.payment), 0) as payment,ISNULL(sum(d.cope-d.payment), 0) as notget2 from SimpleAccounting as a LEFT JOIN SimpleData as d on a.accounting = d.accounting where a.company = '"+userInfo.company+"' GROUP BY a.accounting,a.company,a.id) as a where  a.ROW_ID > "+(pageNum-1)*countPage+" and a.ROW_ID < "+(pageNum*countPage+1)
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from (select row_number() over(order by a.accounting desc) as ROW_ID,a.id,a.accounting,ISNULL(sum(d.receivable), 0) as receivable,ISNULL(sum(d.receipts), 0) as receipts,ISNULL(sum(d.receivable-d.receipts), 0) as notget1,ISNULL(sum(d.cope), 0) as cope,ISNULL(sum(d.payment), 0) as payment,ISNULL(sum(d.cope-d.payment), 0) as notget2 from SimpleAccounting as a LEFT JOIN SimpleData as d on a.accounting = d.accounting where a.company = '"+userInfo.company+"' GROUP BY a.accounting,a.company,a.id) as a where  a.ROW_ID > "+(pageNum-1)*countPage+" and a.ROW_ID < "+(pageNum*countPage+1)
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

    var sql = "update SimpleAccounting set ["+column+"] = '"+new_value_input+"' where id = '"+id+"'"

    console.log(sql)

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
    var value = e.detail.value
    var id = e.currentTarget.dataset.id
    var accounting = e.currentTarget.dataset.accounting
    var checkItems = _this.data.checkItems;
    if(value!=""){
      checkItems.push({id:id,accounting:accounting})
    }else{
      for(let i=0;i<checkItems.length;i++){
        if(checkItems[i].id==id){
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
        title: '请选择科目',
        icon : 'none'
      })
      return;
    }

    wx.showModal({
      title : '提示',
      content : '将极简台账中该科目的项目一并删除？',
      cancelColor: '#009688',
      confirmColor : '#DD5044',
      success : res => {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
            mask : 'true'
          })
          var sql = "delete from SimpleData where accounting in ("
          for(var i=0;i<checkItems.length;i++){
            if(i==checkItems.length-1){
              sql += "'"+checkItems[i].accounting+"','') and company = '"+_this.data.userInfo.company+"';"
              break;
            }
            sql += "'"+checkItems[i].accounting+"',"
          }
          sql += "delete from SimpleAccounting where id in ("
          for(var j=0;j<checkItems.length;j++){
            if(j==checkItems.length-1){
              sql += "'"+checkItems[j].id+"','') and company = '"+_this.data.userInfo.company+"';"
              break;
            }
            sql += "'"+checkItems[j].id+"',"
          }
          console.log(sql)
          wx.cloud.callFunction({
            name : 'sqlServer_cw',
            data : {
              query : sql
            },
            success : res =>{
              if(checkItems.length==1 && checkItems[0]==""){
                updSpace.del("SimpleData",1)
                updSpace.del("SimpleAccounting",1)
              }else{
                updSpace.del("SimpleData",checkItems.length-1)
                updSpace.del("SimpleAccounting",checkItems.length-1)
              }
              
              wx.hideLoading({
                success: (res)=>{
                  _this.init();
                },
                complete: (res) => {
                  wx.showToast({
                    title: '删除成功',
                    icon : 'success'
                  })
                },
              })
              _this.setData({
                checkItems : []
              })
            },
            err : res =>{
              console.log("错误："+res)
            },
            fail : res=>{
              console.log("请求失败！"+res)
            }
          })
        }
      }
    })
  },

  backDelete : function(){
    this.setData({
      isDelete : false
    })
  },

  insert : function(){
    var _this = this;
    if(_this.data.zeng){
      _this.hidView(_this,"moreDo")
    wx.showModal({
      title : '提示',
      content : '添加一行？',
      cancelColor : '#282B33',
      confirmColor : '#009688',
      success : res => {
        if(res.confirm){
          if(!updSpace.insert("SimpleAccounting")){
            wx.showModal({
              title : '警告',
              content : '数据库已满，请将数据备份后删除部分数据',
              showCancel : false,
              confirmColor : '#009688',
            })
            return;
          }
      
          var sql = "insert into SimpleAccounting(company,accounting) values('"+_this.data.userInfo.company+"','')"
          wx.cloud.callFunction({
            name : "sqlServer_cw",
            data : {
              query: sql
            },
            success : res=>{
              wx.showToast({
                title: "添加成功",
                icon : "success",
                complete : res=> {
                  _this.init();
                }
              })
              
            },
            err : res =>{
              wx.showToast({
                title: "错误",
                icon : "none"
              })
            }
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
        if (list.jjzz_delete != "是"){
          shan = false
        }
        if (list.jjzz_update != "是"){
          gai = false
        }
        if (list.jjzz_add != "是"){
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