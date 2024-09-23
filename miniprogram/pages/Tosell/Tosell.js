// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    szzhi: [],
    start_date:'',
    stop_date:'',
    order_number:'',
    page:1,
    title: [{
      text: "订单号",
      width: "200rpx",
      columnName: "orderid",
      type: "text",
      isupd: true
    },
    {
      text: "商品代码",
      width: "200rpx",
      columnName: "sp_dm",
      type: "text",
      isupd: true
    },
    {
      text: "商品名称",
      width: "200rpx",
      columnName: "name",
      type: "text",
      isupd: true
    },
    {
      text: "商品类别",
      width: "200rpx",
      columnName: "lei_bie",
      type: "text",
      isupd: true
    },
    {
      text: "价格",
      width: "230rpx",
      columnName: "cpsj",
      type: "text",
      isupd: true
    },
    {
      text: "数量",
      width: "300rpx",
      columnName: "cpsl",
      type: "text",
      isupd: true
    },
    {
      text: "明细类型",
      width: "150rpx",
      columnName: "mxtype",
      type: "text",
      isupd: true
    },
    {
      text: "时间",
      width: "400rpx",
      columnName: "time2",
      type: "text",
      isupd: true
    },
    {
      text: "收货方",
      width: "200rpx",
      columnName: "shou_h",
      type: "text",
      isupd: true
    },
  ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    var szzhi = null;
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    that.sel1()
  },
  sel11:function(){
    this.setData({
      page:1
    })
    this.sel1()
  },
  sel1:function(){
    var _this = this
    var gongsi = app.globalData.gongsi
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    var order_number = _this.data.order_number
    var page = _this.data.page-1
    if (start_date != ''){
      start_date = start_date + " 00:00:00"
    }else{
      start_date = "1900-01-01 00:00:00"
    }
    if (stop_date != ''){
      stop_date = stop_date + " 23:59:59"
    }else{
      stop_date = "2100-12-31 23:59:59"
    }
    console.log("SELECT *, '' as checkbox, date_format(yh_jinxiaocun_mingxi.shijian, '%Y-%m-%d') as time, date_format(yh_jinxiaocun_mingxi.shijian, '%Y-%m-%d %H:%i:%s') as time2, yh_jinxiaocun_jichuziliao.mark1 as mark1 FROM yh_jinxiaocun_mingxi LEFT JOIN yh_jinxiaocun_jichuziliao ON yh_jinxiaocun_mingxi.cpname =yh_jinxiaocun_jichuziliao.`name`WHERE yh_jinxiaocun_mingxi.gs_name = '" + gongsi + "'AND shijian >= '" + start_date + "'AND shijian <= '" + stop_date + "'AND orderid LIKE '%" + order_number + "%'LIMIT '"+page+"', 5;" )

    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "SELECT *, '' as checkbox, date_format(yh_jinxiaocun_mingxi.shijian, '%Y-%m-%d') as time, date_format(yh_jinxiaocun_mingxi.shijian, '%Y-%m-%d %H:%i:%s') as time2, yh_jinxiaocun_jichuziliao.mark1 as mark1 FROM yh_jinxiaocun_mingxi LEFT JOIN yh_jinxiaocun_jichuziliao ON yh_jinxiaocun_mingxi.cpname =yh_jinxiaocun_jichuziliao.`name`WHERE yh_jinxiaocun_mingxi.gs_name = '" + gongsi + "'AND shijian >= '" + start_date + "'AND shijian <= '" + stop_date + "'AND orderid LIKE '%" + order_number + "%'LIMIT "+page+", 5" 
      },
      success(res) {
        for(var i=0;i<res.result.length;i++){
          if(res.result[i].mark1 != null){
            res.result[i].mark1 = "data:image/jpeg;base64," + res.result[i].mark1.replace(/[\r\n]/g, '')
          }
        }
        console.log(res.result)
        _this.setData({
          szzhi: res.result,
         
          // start_date:'',
          // stop_date:'',
          // order_number:'',
        })
        console.log(_this.data.szzhi)
      },
      fail(res) {
        console.log(res.result)
        console.log("失败", res)

      }
    });
  },
 up:function(){
   var _this=this
   var page = _this.data.page
   page=page-1
   if(page<1){
    wx.showToast({
      title: '已经是第一页',
      icon: 'none'
    })
    return;
   }
   _this.setData({
     page:page
   })
 
   _this.sel1()
 },
 down:function(){
 var _this=this
 var page = _this.data.page
  page=page+1
  if(page<1){
   wx.showToast({
     title: '已经是第一页',
     icon: 'none'
   })
   return;
  }
  _this.setData({
    page:page
  })

  _this.sel1()
},

  print_out:function(){
    var _this = this
    var list = _this.data.szzhi
    var output_list = []
    console.log(list)
    for(var i=0; i<list.length; i++){
      if(list[i].checkbox == true){
        output_list.push({
          sp_dm: "订单号：" + list[i].orderid,
          mingcheng: "时间：" + list[i].time2,
        })
      }
    }
    console.log(output_list)
    if(output_list.length == 0){
      wx.showToast({
        title: '未读取到选中商品',
        icon: 'none',
        duration: 2000
       })
       return;
    }
    wx.navigateTo({
      url: '../../packageJ/page/printQR/printQR?list=' + JSON.stringify(output_list),
    })
  },

  choiceDate: function (e) {
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 500
    })
    that.onLoad()
    that.onShow()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  shanchu: function(e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    var uid = e.currentTarget.dataset.uid;
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "sqlConnection",
            data: {
              sql: "DELETE FROM yh_jinxiaocun_mingxi where _id = '" + uid + "'"
            },
            success: res=> {
              wx.showToast({
                title: '删除成功',
              })
              that.onLoad()
            },
            fail: res=> {
              console.log("失败", res)
            }
          });
        } else if (res.cancel) {

          return false;
        }

      }
    })


  },

  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.头部可根据日期区间和订单号进行出入库明细查询。\n2.长按数据可进行删除。\n3.点击导出按钮可将当前显示的数据导出为excel文档。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  upd: function (e) {
    var _this = this;
    var id = e.target.dataset.id
    console.log(e.currentTarget.dataset)
    console.log(id)
    if(id != undefined){
      var uid = _this.data.szzhi[id]._id
      wx.navigateTo({
        url: '/pages/Tosell_update/Tosell_update?id=' + uid + '&fun=update',
      })
    }else{
      var hang = e.target.dataset.hang
      var all = _this.data.szzhi
      if(all[hang].checkbox == true){
        all[hang].checkbox = ""
      }else{
        all[hang].checkbox = true
      }
      _this.setData({
        szzhi: all
      })
      console.log(_this.data.szzhi)
    }

  },

  xiugai: function(e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    // wx.cloud.callFunction({
    //   name: "sqlConnection",
    //   data: {
    //     sql: "UPdat yh_jinxiaocun_mingxi set  where sp_dm='" + that.data.szzhi[id].sp_dm + "'"
    //   },
    //   success(res) {
    //     // that.setData({
    //     //   szzhi: res.result
    //     // }
    //     // )
    //     console.log
    //     // console.log(that.data.szzhi)
    //   }, fail(res) {
    //     console.log("失败", res)

    //   }
    // });
    // db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).update({
    //   data: {


    //   }
    // })

  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.szzhi;
    var title = _this.data.title
    var cloudList = {
      name : '明细',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:parseInt(title[i].width.split("r")[0])/10,
        columnName:title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu : 'true',
              fileType : 'xlsx',
              success : res=> {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail : res=> {
        console.log(res)
      }
    })
  },
  
})