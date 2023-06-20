// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: [],
    id: "",
    value0: "",
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
    value7: "",
    // szzhi:[],
    // szZhi:[],
    list: [{
        txet: "订单号",
        index: 0,
        name : 'orderid',
        fun : 'orderid',
        type:'text',
      },
      {
        txet: "商品代码",
        index: 1,
        name : 'sp_dm',
        fun : 'sp_dm',
        type:'text',
      },
      {
        txet: "商品名称",
        index: 2,
        name : 'cpname',
        fun : 'cpname',
        type:'text',
      },
      {
        txet: "商品类别",
        index: 3,
        name : 'cplb',
        fun : 'cplb',
        type:'text',
      },{
        txet: "价格",
        index: 4,
        name : 'cpsj',
        fun : 'cpsj',
        type:'number',
      },{
        txet: "数量",
        index: 5,
        name : 'cpsl',
        fun : 'cpsl',
        type:'number',
      },{
        txet: "明细类型",
        index: 6,
        name : 'mxtype',
        fun : 'mxtype',
        type:'text',
      },{
        txet: "收/进货方",
        index: 6,
        name : 'shou_h',
        fun : 'shou_h',
        type:'text',
      }
      
    ],
    fun : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      fun: options.fun
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
    var that = this
    var gongsi = app.globalData.gongsi
    var fun = that.data.fun;
    var ssql = ""
    if(fun == 'update'){
      ssql = "select * from yh_jinxiaocun_mingxi where gs_name = '" + gongsi + "' and _id ='" + that.data.id + "'"
    }else{
      ssql=""
    }
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: ssql
      },
      success(res) {
        console.log(res.result)
        that.setData({
          all: res.result,
          value0:res.result[0].orderid,
          value1:res.result[0].sp_dm,
          value2:res.result[0].cpname,
          value3:res.result[0].cplb,
          value4:res.result[0].cpsj,
          value5:res.result[0].cpsl,
          value6:res.result[0].mxtype,
          value7:res.result[0].shou_h,
        })
      },
      fail(res) {
        console.log("失败", res)
      }
    });
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


  input: function(e) {
    var id = e.currentTarget.dataset.id
    var value = e.detail.value
    this.setData({
      [`value${id}`]: value
    })
    console.log(id)
    console.log(value)
    console.log([`value${id}`])
  },
  querenxinjian: function() {
    var that = this;
    var id = that.data.id;
    var fun = that.data.fun;
    var gongsi = app.globalData.gongsi
    var value0 = that.data.value0
    var value1 = that.data.value1
    var value2 = that.data.value2
    var value3 = that.data.value3
    var value4 = that.data.value4
    var value5 = that.data.value5
    var value6 = that.data.value6
    var value7 = that.data.value7
    var ssql = ""

    ssql = "update yh_jinxiaocun_mingxi set orderid ='" + value0 + "',`sp_dm` = '" + value1 + "',cpname ='" + value2 + "',cplb ='" + value3 + "',cpsj ='" + value4 + "',cpsl='" + value5 + "',mxtype='" + value6 + "',shou_h='" + value7 + "' where _id =" + id;

    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: ssql
      },
      success(res) {
        console.log("成功", res)
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '修改成功',
          'icon': 'none',
          duration: 3000
        })
        wx.navigateBack({
          // delta: 1 
        })
      },
      fail(res) {
        console.log("失败", res)
      }
    });
  }
})