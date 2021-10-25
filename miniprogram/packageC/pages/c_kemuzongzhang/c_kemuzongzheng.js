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
      },{
        class : 4,
        className : "成本类",
        arr :[]
      },{
        class : 5,
        className : "损益类",
        arr :[]
      }
    ],
    titil : [
      {text:"序号",width:"100rpx"},
      {text:"科目代码",width:"170rpx"},
      {text:"科目名称",width:"400rpx"},
      {text:"科目等级",width:"180rpx"},
      {text:"科目全称",width:"650rpx"},
      {text:"方向",width:"130rpx"},
      {text:"借贷合计",width:"200rpx"},
      {text:"明细",width:"150rpx"},
      {text:"年初借金",width:"250rpx"},
      {text:"年初贷金",width:"250rpx"},
    ],

    class_id : 1,
    class_name : "",
    class_id_new : 1,

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
    var class_id = _this.data.class_id;
    var pageNum = _this.data.pageNum;
    var countPage = _this.data.countPage;
    _this.getPageCount(class_id);
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select len(code) as grade,*,isnull((SELECT SUM(money) FROM VoucherSummary WHERE VoucherSummary.code = a.code),0) as money,(select top 1 name from Accounting as ac where ac.code = LEFT(a.code,4)) as name1,(select top 1 name from Accounting as ac where ac.code = LEFT(a.code,6)) as name2,(select top 1 name from Accounting as ac where ac.code = LEFT(a.code,8)) as name3 from (select *,ROW_NUMBER() over(order by LEN(code),id) as ROW_ID from (select * from (SELECT *,LEFT(code, 1) AS class from Accounting) as t where t.class = '"+class_id+"') as c )as a where a.company = '"+userInfo.company+"' and a.ROW_ID > "+(pageNum-1)*countPage+" and a.ROW_ID < "+(pageNum*countPage+1)
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          ["list["+(parseInt(class_id)-1)+"].arr"] : _this.handle(list),
          class_name : _this.data.list[parseInt(class_id)-1].className
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
    console.log(list)
    for(var i=0;i<list.length;i++){
      //拼接项目全称
      if(list[i].name1==null){
        list[i].name1 = list[i].name2
      }else if(list[i].name2==null){
        list[i].name2 = list[i].name3
      }
      if(list[i].name1!=list[i].name2){
        list[i].name1 +="-"+list[i].name2
      }
      if(list[i].name2!=list[i].name3){
        list[i].name1 +="-"+list[i].name3
      }
      //处理项目等级
      if(list[i].grade==4){list[i].grade = "I"}
      if(list[i].grade==6){list[i].grade = "II"}
      if(list[i].grade==8){list[i].grade = "III"}
    }
    return list
  },

  getPageCount : function(class_id){
    var _this = this;
    var userInfo = _this.data.userInfo

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select count(*) as pageCount from (SELECT *,LEFT(code, 1) AS class from Accounting as ac) as t where t.class = '"+class_id+"' and t.company = '"+userInfo.company+"'"
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
      ["list["+(class_id-1)+"].arr["+index+"]."+column] : new_value_input,
      empty : ""
    })

    wx.cloud.callFunction({
      name : "sqlServer_cw",
      data : {
        query: "update Accounting set ["+column+"] = '"+new_value_input+"' where id = '"+id+"'"
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

  sortList : function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    _this.init()
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
        title: '请选择科目',
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
          var sql = "delete from Accounting where id in ("
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
                  updSpace.del("Accounting",checkItems.length)
                },
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
      checkItems : [],
      isDelete : false
    })
  },

  balanceCheck : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo
    _this.hidView(_this,"moreDo");

    wx.cloud.callFunction({
      name : 'sqlServer_cw',
      data : {
        query : "select sum([load]) as sum_load,sum(borrowed) as sum_borrowed from Accounting where company = '"+userInfo.company+"'"
      },
      success : res => {
        wx.hideLoading({
          complete: (res) => {},
        })
        var list = res.result.recordset;
        var sum_load = list[0].sum_load
        var sum_borrowed = list[0].sum_borrowed
        if(sum_load == sum_borrowed){
          wx.showToast({
            title: '验证成功',
            icon : 'success'
          })
        }else{
          wx.showModal({
            title : '借贷不平！请检查',
            content : '借方金额：'+sum_load.toString()+';贷方金额:'+sum_borrowed.toString()+';差值：'+(sum_load>sum_borrowed?sum_load-sum_borrowed:sum_borrowed-sum_load).toString(),
            showCancel : false,
            confirmColor : "#009688"
          })
        }
      },
      err : res => {
        console.log("错误:"+res)
      },
      fail : res => {
        console.log("请求失败:"+res)
      }
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
            url: '../../pages/c_kemuzongzhang_insert/c_kemuzongzhang_insert?userInfo='+JSON.stringify(userInfo),
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
        if (list.kmzz_delete != "是"){
          shan = false
        }
        if (list.kmzz_update != "是"){
          gai = false
        }
        if (list.kmzz_add != "是"){
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