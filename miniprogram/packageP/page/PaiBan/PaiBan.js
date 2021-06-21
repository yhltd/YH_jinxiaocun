// miniprogram/packageP/page/PaiBan/PaiBan.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  tableShow:true,
  delWindow1:false,
  tjShow:false,
  rqxzShow1:false,
  rqxzShow2:false,
  rqxzShow3:false,
  data: {
    list:[],
    list2:[],
    listJiQi:[],
    systemArray:[],
    title: 
    [{ text: "创建日期", width: "200rpx", columnName: "riqi", type: "digit", isupd: true },
    { text: "计划名称", width: "200rpx", columnName: "plan_name", type: "text", isupd: true },
    { text: "人数", width: "200rpx", columnName: "renshu", type: "text", isupd: true },
    { text: "部门", width: "200rpx", columnName: "department_name", type: "text", isupd: true },
  ],
  title2: 
    [{ text: "姓名", width: "200rpx", columnName: "sname", type: "digit", isupd: true },
    { text: "电话", width: "200rpx", columnName: "pnumber", type: "text", isupd: true },
    { text: "身份证号", width: "200rpx", columnName: "inumber", type: "text", isupd: true },
    { text: "部门名称", width: "200rpx", columnName: "dname", type: "text", isupd: true },
    { text: "班次", width: "200rpx", columnName: "banci", type: "text", isupd: true },
  ],
  id:"",
  riqi:"",
  renshu:"",
  plan_name:"",
  department_name:"",

  user:"",
  index:"",

  did:"",
  sname:"",
  pnumber:"",
  inumber:"",
  dname:"",
  banci:"",

  riqi1:"",
  riqi2:"",
  fbanci:"",
  zmfz:"",
  lzts:"",
  jhmc:"",
  minDate: new Date(1899, 1, 1).getTime(),
  maxDate: new Date(2030, 12, 31).getTime(),
  currentDate: new Date().getTime(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.tableShow()
    _this.setData({
      
    })
  },
//初始数据
tableShow:function(){
  var _this = this
  let user = app.globalData.gongsi;
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: "select * from paibanbiao_info where remarks1='" + user + "'"
    },
    success: res => {
      var list = res.result.recordset
      _this.setData({
        list: list,
        listJiQi:list
      })
      // console.log(list)
      wx.hideLoading({

      })
    },
    err: res => {
      console.log("错误!")
    },
    fail: res => {
      wx.showToast({
        title: '请求失败！',
        icon: 'none',
        duration: 3000
      })
      console.log("请求失败！")
    }
  })
},
clickView:function(e){
  console.log(e);
   var _this=this
     _this.setData({
       delWindow1: true,
       index: e.currentTarget.dataset.index,
     })  
 },
 sure1:function(){
  var _this = this
  let user = app.globalData.gongsi;
  console.log(_this.data.listJiQi[_this.data.index].id)
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: "delete from paibanbiao_info where id=(select top 1 id from paibanbiao_info where id='" + _this.data.listJiQi[_this.data.index].id + "')and remarks1='" + user + "'"
    },
    success: res => {
      wx.showToast({
        title: '删除成功！',
        icon: 'none'
      })
      _this.tableShow()
      _this.qxShow()
    },
    err: res => {
      console.log("错误!")
    },
    fail: res => {
      wx.showToast({
        title: '请求失败！',
        icon: 'none'
      })
      console.log("请求失败！")
    }
  })
  _this.qxShow()
},
qxShow:function(){
  var _this = this
  _this.setData({
    delWindow1:false,
    rqxzShow1:false,
    rqxzShow2:false,
    rqxzShow3:false,
    tjShow:false,
  })
},
qxShow2:function(){
  var _this = this
  _this.setData({
    delWindow1:false,
    rqxzShow1:false,
    rqxzShow2:false,
    rqxzShow3:false,
  })
},
//日期事件
selRIQI1:function(){
  var _this=this
  _this.setData({
    rqxzShow1:true,
  })
},
selRIQI2:function(){
  var _this=this
  _this.setData({
    rqxzShow2:true,
  })
},
//部门下拉
selBumen:function(){
  // console.log(2)
  var _this = this;
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: "select department_name from paibanbiao_renyuan"
    },
    success: res => {
      
      _this.setData({
        systemArray : res.result.recordset,
        rqxzShow3:true,
      })
    },
    err: res => {
      console.log("错误!"+ res)
    },
  })
},
//修改触发
onInput(event) {
  this.setData({
    currentDate: event.detail,
  });
},
//添加触发
inquire:function(){
  var _this=this
  _this.setData({
    tjShow:true,
  })
  _this.getSystemName()
  
},
onInput2:function(){
  var _this=this
  var date = new Date(_this.data.currentDate)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  console.log(_this)
  var riqi=Y+M+D
  console.log(riqi)
  console.log(_this.data.riqi1)
  if(riqi>_this.data.riqi2&&_this.data.riqi2!=""){
    wx.showToast({
      title: '截止日期不可以小于起始日期！',
      icon: 'none'
    })
  }else{
    _this.setData({
      riqi1: riqi,
    });
    _this.qxShow()
  }
  
},
onInput3:function(){
  var _this=this
  var date = new Date(_this.data.currentDate)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  console.log(_this)
  var riqi=Y+M+D
  console.log(riqi)
  console.log(_this.data.riqi2)
  if(_this.data.riqi1>riqi){
    wx.showToast({
      title: '截止日期不可以小于起始日期！',
      icon: 'none'
    })
  }else{
    _this.setData({
      riqi2: riqi,
    });
    _this.qxShow()
  } 
},
//部门
getSystemName : function(){
  var _this = this;
  wx.cloud.callFunction({
    name: 'sqlServer paibanbiao_renyuan',
    data: {
      query: "select department_name from paibanbiao_renyuan"
    },
    success: res => {
      var list = []
      for(var i=0;i<res.result.recordset.length;i++){
        list.push(res.result.recordset[i].systemName)
      }
      _this.setData({
        systemArray : list
      })
    },
    err: res => {
      console.log("错误!"+ res)
    },
    complete : function(){
      wx.hideLoading({
        success: (res) => {},
      })
    }
  })
},

gongSi : function(e){
  var _this =this;
  _this.setData({
    index : e.detail.value
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