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
    // szzhi:[],
    // szZhi:[],
    list: [{
        txet: "商品代码",
        index: 0,
        name : 'sp_dm',
        fun : 'sp_dm'
      },
      {
        txet: "商品名称",
        index: 1,
        name : 'name',
        fun : 'name'
      },
      {
        txet: "商品类别",
        index: 2,
        name : 'lei_bie',
        fun : 'lei_bie'
      },
      {
        txet: "单位",
        index: 3,
        name : 'dan_wei',
        fun : 'dan_wei'
      },{
        txet: "备注",
        index: 4,
        name : 'beizhu',
        fun : 'beizhu'
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

    if(app.globalData.shujuku==0){

      if(fun == 'update'){
        ssql = "select * from yh_jinxiaocun_zhengli where gs_name = '" + gongsi + "' and id ='" + this.data.id + "'"
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
            value0:res.result[0].sp_dm,
            value1:res.result[0].name,
            value2:res.result[0].lei_bie,
            value3:res.result[0].dan_wei,
            value4:res.result[0].beizhu,
          })
        },
        fail(res) {
          console.log("失败", res)
        }
      });

    }else if(app.globalData.shujuku == 1){

      if(fun == 'update'){
        ssql = "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_zhengli_mssql where gs_name = '" + gongsi + "' and id ='" + this.data.id + "'"
      }else{
        ssql=""
      }
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: ssql
        },
        success(res) {
          console.log(res.result)
          that.setData({
            all: res.result.recordset,
            value0:res.result.recordset[0].sp_dm,
            value1:res.result.recordset[0].name,
            value2:res.result.recordset[0].lei_bie,
            value3:res.result.recordset[0].dan_wei,
            value4:res.result.recordset[0].beizhu,
          })
        },
        fail(res) {
          console.log("失败", res)
        }
      });
      
    }

    
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
    if(value0 == '' || value1 == '' || value2 == '' || value3 == ''){
      wx.showToast({
        title: '信息填写不全，请检查',
        icon:'none'
      })
      return;
    }

    if(app.globalData.shujuku==0){
      var ssql = ""
    if(fun == 'update'){
      ssql = "update yh_jinxiaocun_zhengli set sp_dm ='" + value0 + "',`name` = '" + value1 + "',lei_bie ='" + value2 + "',dan_wei ='" + value3 + "',beizhu ='" + value4 + "' where id =" + id;
    }else{
      ssql = "insert into yh_jinxiaocun_zhengli(sp_dm,name,lei_bie,dan_wei,beizhu,gs_name) values('"+ value0 + "','"+ value1 + "','" + value2 + "','" + value3 + "','" + value4 + "','" + gongsi +"')"
    }
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

    }else if(app.globalData.shujuku == 1){

      var ssql = ""
    if(fun == 'update'){
      ssql = "update yh_jinxiaocun_excel.dbo.yh_jinxiaocun_zhengli_mssql set sp_dm ='" + value0 + "',[name] = '" + value1 + "',lei_bie ='" + value2 + "',dan_wei ='" + value3 + "',beizhu ='" + value4 + "' where id =" + id;
    }else{
      ssql = "insert into yh_jinxiaocun_excel.dbo.yh_jinxiaocun_zhengli_mssql(sp_dm,name,lei_bie,dan_wei,beizhu,gs_name) values('"+ value0 + "','"+ value1 + "','" + value2 + "','" + value3 + "','" + value4 + "','" + gongsi +"')"
    }
    wx.cloud.callFunction({
      name: "sqlServer_117",
      data: {
        query: ssql
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

    
  }
})