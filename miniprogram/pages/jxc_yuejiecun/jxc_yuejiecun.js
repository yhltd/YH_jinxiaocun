// pages/jxc_yuejiecun/jxc_yuejiecun.js
// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    hidden1: true,
    wareHouse:'',
     start_date :'',
     stop_date :'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    var that = this
    var sql = "select cangku from yh_jinxiaocun_mingxi where gs_name ='" + app.globalData.gongsi + "' group by cangku"
    console.log(sql)
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: { 
        sql: sql
      },
      success(res) {
        var product_list = ['']
        for(var i=0; i<res.result.length; i++){
          product_list.push(res.result[i].cangku)
        }
        that.setData({
          product_list: product_list
        })
      },
      fail(res) {
        console.log("失败", res)
      }
    });
  },
  choiceDate: function (e) {
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  bindPickerChange: function(e){
    var _this = this
    console.log(_this.data.product_list[e.detail.value])
    _this.setData({
     wareHouse: _this.data.product_list[e.detail.value]
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
  onShow: function(options) {
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    that.sel1()
  },

  sel1: function() {
    var _this = this
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    wx.showToast({
      title: '正在搜索',
      icon: 'loading',
      duration: 1000
    })
    var gongsi = app.globalData.gongsi
    var wareHouse = _this.data.wareHouse
    var start_date = this.data.start_date
    var stop_date = this.data.stop_date
    if (start_date != ''){
      start_date = start_date 
    }else{
      start_date = "1900-01"
    }
    if (stop_date != ''){
      stop_date = stop_date 
    }else{
      stop_date = "2100-12"
    }
 var sql = "SELECT temp.cangku, temp.month, temp.ruku_num, temp.ruku_price, temp.chuku_num, temp.chuku_price, (COALESCE(qc.qcsl, 0) + temp.cumulative_ruku_num - temp.cumulative_chuku_num) as kucun_num, (COALESCE(qc.qcje, 0) + temp.cumulative_ruku_price - temp.cumulative_chuku_price) as kucun_price FROM (SELECT t1.cangku, DATE_FORMAT(t1.shijian, '%Y-%m') as month, SUM(CASE WHEN t1.mxtype = '入库' OR t1.mxtype = '调拨入库' OR t1.mxtype = '盘盈入库' THEN t1.cpsl ELSE 0 END) as ruku_num, SUM(CASE WHEN t1.mxtype = '入库' OR t1.mxtype = '调拨入库' OR t1.mxtype = '盘盈入库' THEN t1.cpsl*t1.cpsj ELSE 0 END) as ruku_price, SUM(CASE WHEN t1.mxtype = '出库' OR t1.mxtype = '调拨出库' OR t1.mxtype = '盘亏出库' THEN t1.cpsl ELSE 0 END) as chuku_num, SUM(CASE WHEN t1.mxtype = '出库' OR t1.mxtype = '调拨出库' OR t1.mxtype = '盘亏出库' THEN t1.cpsl*t1.cpsj ELSE 0 END) as chuku_price, (SELECT IFNULL(SUM(t2.cpsl), 0) FROM yh_jinxiaocun_mingxi as t2 WHERE t2.gs_name = '" + gongsi + "' AND (t2.cangku = t1.cangku OR (t2.cangku IS NULL AND t1.cangku IS NULL)) AND (t2.mxtype = '入库' OR t2.mxtype = '调拨入库' OR t2.mxtype = '盘盈入库') AND DATE_FORMAT(t2.shijian, '%Y-%m') <= DATE_FORMAT(t1.shijian, '%Y-%m')" + (wareHouse ? " AND (t2.cangku = '" + wareHouse + "' OR (t2.cangku IS NULL AND '" + wareHouse + "' IS NULL))" : "") + ") as cumulative_ruku_num, (SELECT IFNULL(SUM(t2.cpsl*t2.cpsj), 0) FROM yh_jinxiaocun_mingxi as t2 WHERE t2.gs_name = '" + gongsi + "' AND (t2.cangku = t1.cangku OR (t2.cangku IS NULL AND t1.cangku IS NULL)) AND (t2.mxtype = '入库' OR t2.mxtype = '调拨入库' OR t2.mxtype = '盘盈入库') AND DATE_FORMAT(t2.shijian, '%Y-%m') <= DATE_FORMAT(t1.shijian, '%Y-%m')" + (wareHouse ? " AND (t2.cangku = '" + wareHouse + "' OR (t2.cangku IS NULL AND '" + wareHouse + "' IS NULL))" : "") + ") as cumulative_ruku_price, (SELECT IFNULL(SUM(t2.cpsl), 0) FROM yh_jinxiaocun_mingxi as t2 WHERE t2.gs_name = '" + gongsi + "' AND (t2.cangku = t1.cangku OR (t2.cangku IS NULL AND t1.cangku IS NULL)) AND (t2.mxtype = '出库' OR t2.mxtype = '调拨出库' OR t2.mxtype = '盘亏出库') AND DATE_FORMAT(t2.shijian, '%Y-%m') <= DATE_FORMAT(t1.shijian, '%Y-%m')" + (wareHouse ? " AND (t2.cangku = '" + wareHouse + "' OR (t2.cangku IS NULL AND '" + wareHouse + "' IS NULL))" : "") + ") as cumulative_chuku_num, (SELECT IFNULL(SUM(t2.cpsl*t2.cpsj), 0) FROM yh_jinxiaocun_mingxi as t2 WHERE t2.gs_name = '" + gongsi + "' AND (t2.cangku = t1.cangku OR (t2.cangku IS NULL AND t1.cangku IS NULL)) AND (t2.mxtype = '出库' OR t2.mxtype = '调拨出库' OR t2.mxtype = '盘亏出库') AND DATE_FORMAT(t2.shijian, '%Y-%m') <= DATE_FORMAT(t1.shijian, '%Y-%m')" + (wareHouse ? " AND (t2.cangku = '" + wareHouse + "' OR (t2.cangku IS NULL AND '" + wareHouse + "' IS NULL))" : "") + ") as cumulative_chuku_price FROM yh_jinxiaocun_mingxi as t1 WHERE t1.gs_name = '" + gongsi + "'" + (wareHouse ? " AND (t1.cangku = '" + wareHouse + "' OR (t1.cangku IS NULL AND '" + wareHouse + "' IS NULL))" : "") + " GROUP BY t1.cangku, DATE_FORMAT(t1.shijian, '%Y-%m')) as temp LEFT JOIN (SELECT cangku, SUM(cpsl) as qcsl, SUM(cpsl*cpsj) as qcje FROM yh_jinxiaocun_qichushu WHERE gs_name = '" + gongsi + "'" + (wareHouse ? " AND (cangku = '" + wareHouse + "' OR (cangku IS NULL AND '" + wareHouse + "' IS NULL))" : "") + " GROUP BY cangku) as qc ON (temp.cangku = qc.cangku OR (temp.cangku IS NULL AND qc.cangku IS NULL)) WHERE temp.month BETWEEN '" + start_date + "' AND '" + stop_date + "' ORDER BY temp.cangku, temp.month"
   wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: sql
      },
      success(res) {
        that.setData({
          szzhi: res.result
        })
        console.log("成功", res.result)
      },
      fail(res) {
        console.log("失败", res)
      }
    });
  },

  goto_print: function(){
    var _this = this 
    var list = _this.data.szzhi
    console.log(list)
    wx.navigateTo({
      url: "../../packageJ/page/print/print?list=" + JSON.stringify(list) + "&type=商品",
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    console.log(id)
    console.log(that.data.szzhi)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "sqlConnection",
            data: {
              sql: "DELETE * FROM yh_jinxiaocun_mingxi  where sp_dm='" + that.data.szzhi[id].sp_dm + "'"
            },
            success(res) {
              // that.setData({
              //   szzhi: res.result
              // }
              // )
              console.log
              // console.log(that.data.szzhi)
            },
            fail(res) {
              console.log("失败", res)

            }
          });
          // db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).remove({
          //   success: console.log,
          //   fail: console.error,

          // })
          that.onShow()
        } else if (res.cancel) {

          return false;
        }

      }
    })


  },
  xiugai: function(e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    console.log(id)
    that.setData({
      hidden1: !that.data.hidden1,
      szzh: that.data.szzhi[id],
      cpsj: that.data.szzhi[id].cpsj,
      cpjj: that.data.szzhi[id].cpjj,
      cplb: that.data.szzhi[id].cplb,
      mxtype: that.data.szzhi[id].mxtype,
      cpsl: that.data.szzhi[id].cpsl,
      cpjg: that.data.szzhi[id].cpjg,
    })
    // db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).update({
    //   data:{


    //   }
    // })

  },
  cpsj: function(e) {
    var cpsj = e.detail.value
    console.log(cpsj)
    this.setData({
      cpsj: cpsj
    })
  },
  cpjj: function(e) {
    var cpjj = e.detail.value
    console.log(cpjj)
    this.setData({
      cpjj: cpjj
    })
  },
  cplb: function(e) {
    var cplb = e.detail.value
    console.log(cplb)
    this.setData({
      cplb: cplb
    })
  },
  mxtype: function(e) {
    var mxtype = e.detail.value
    console.log(mxtype)
    this.setData({
      mxtype: mxtype
    })
  },
  cpsl: function(e) {
    var cpsl = e.detail.value
    console.log(cpsl)
    this.setData({
      cpsl: cpsl
    })
  },
  cpjg: function(e) {
    var cpjg = e.detail.value
    console.log(cpjg)
    this.setData({
      cpjg: cpjg
    })
  },
  tjjg: function() {
    var that = this
    var cpsj = that.data.cpsj
    var cpjj = that.data.cpjj
    var cplb = that.data.cplb
    var mxtype = that.data.mxtype
    var cpsl = that.data.cpsl
    var cpjg = that.data.cpjg
    const db = wx.cloud.database()

    db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzh._id).update({
      data: {
        cpsj: cpsj,
        cpjj: cpjj,
        cplb: cplb,
        mxtype: mxtype,
        cpsl: cpsl,
        cpjg: cpjg,


      },
      success: res => {
        wx.showToast({

          title: '修改成功！',

        })

      }

    })
    that.setData({
      hidden1: true,

      cpsljg: ""
    })

    that.onLoad()


  },
  spClose: function() {
    this.setData({
      hidden1: true,

      cpsljg: ""
    })
  },

  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.点击搜索框可按商品名汇总。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

})
