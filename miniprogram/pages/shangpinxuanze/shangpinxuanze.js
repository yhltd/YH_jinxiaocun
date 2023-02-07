// pages/shangpinxuanze/shangpinxuanze.js
var jg
var sl
var dtid
var cpid
var cpjg = []
var cpsl = []
var szZhi = []
var zongjia
var all = []
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jghide: "none",
    sl: [],
    jg: [],
    backhidden: true,
    rkck: "选择商品",
    fun : "",
    dms : [],
    dm : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      rkSum: 0,
      sl: [],
      jg: [],
      fun : options.fun
    })
    all = []
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select *,0 as isSelect,IFNULL((select sum(CASE mxtype WHEN '入库' THEN cpsl ELSE (cpsl*-1) END) as cpsl from yh_jinxiaocun_mingxi where cpname = j.name and gs_name = '"+gongsi+"'),0) as allSL from yh_jinxiaocun_jichuziliao as j where zh_name = '" + finduser + "' and gs_name = '"+gongsi+"'"
      },
      success(res) {
        console.log("成功", res)
        console.log(res.result)
        for(var i=0;i<res.result.length;i++){
          res.result[i].mark1 = "data:image/jpeg;base64," + res.result[i].mark1.replace(/[\r\n]/g, '')
        }
        that.setData({
          all: res.result,
        })
        szZhi = res.result
      },
      fail(res) {
        console.log("失败", res)

      }
    });
  },

  select : function(e){
    var _this = this;
    var all = _this.data.all;
    for(let i = 0;i<all.length;i++){
      if(all[i].name.indexOf(e.detail.value)==-1){
        _this.setData({
          ["all["+i+"].isSelect"] : 1
        })
      }else{
        _this.setData({
          ["all["+i+"].isSelect"] : 0
        })
      }

    }
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
    

    cpsl = []
    cpjg = []
    var that = this
    that.setData({
      rkSum: 0,
      sl: [],
      jg: []
    })
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    var name = app.globalData.value1
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select *,0 as isSelect,IFNULL((select sum(CASE mxtype WHEN '入库' THEN cpsl ELSE (cpsl*-1) END) as cpsl from yh_jinxiaocun_mingxi where cpname = j.name and gs_name = '"+gongsi+"'),0) as allSL from yh_jinxiaocun_jichuziliao as j where zh_name = '" + finduser + "' and gs_name = '"+gongsi+"'"
      },
      success(res) {
        for(var i=0;i<res.result.length;i++){
          res.result[i].mark1 = "data:image/jpeg;base64," + res.result[i].mark1.replace(/[\r\n]/g, '')
        }
        that.setData({
          all: res.result,
        })
        console.log(wx.getStorageSync('sz'))
        if(wx.getStorageSync('sz') != undefined){
          let sz = JSON.parse(wx.getStorageSync('sz'));
          for(let i=0;i<res.result.length;i++){
            if(sz[res.result[i].id] != undefined){
              that.setData({
                ["all["+i+"].allSL"]: res.result[i].allSL - parseInt(sz[res.result[i].id])
              })
            }
            
          }
        }
        szZhi = res.result
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
    var that = this
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 500
    })
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
  jiahao1: function() {
    wx.navigateTo({
      jghide: true,
      jghide: "none",

      url: '/pages/xinjianshangpin/xinjianshangpin'

    })
  },

  zhu: function() {
    wx.showModal({
      title: '提示',
      content: '此表是根据明细表合计来查询的',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          console.log('用户点击确定')
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },

  srJg: function(e) {
    var that = this
    dtid = e.currentTarget.dataset.id
    if(that.data.fun=='qichu'){
      var dm = e.currentTarget.dataset.dm
      that.setData({
        dm
      })
    }
    that.setData({
      jghide: "flex",
      cpid: dtid,
      cpsl: cpsl,
      cpjg: cpjg,
      backhidden: false
    })
  },
  spClose: function(e) {

    var that = this
    that.setData({
      jghide: true,
      jghide: "none",
      backhidden: true

    })

  },
  cunsl: function(e) {
    sl = e.detail.value
  },
  cunjg: function(e) {
    jg = e.detail.value
  },
  tjjg: function(e) {
    var that = this
    that.setData({
      jghide: true,
      jghide: "none",
      backhidden: true
    })
    zongjia = that.data.rkSum
    if (sl != null && jg != null) {
      cpsl[dtid] = sl
      cpjg[dtid] = jg
      zongjia = 0
      for(let idx=0;idx < cpsl.length ;idx++){
        if(cpsl[idx] != '' && cpsl[idx] != undefined && cpjg[idx] != '' && cpjg[idx] != undefined){
          zongjia += parseInt(cpsl[idx]) * parseInt(cpjg[idx])
        }
      }
    }


    for (var i = 0; i < cpsl.length; i++) {
      if (cpjg[i] == null) {
        cpjg[i] = ""
        cpsl[i] = ""
      }
    }
    that.setData({
      jghide: "none",
      cpid: dtid,
      sl: cpsl,
      jg: cpjg,
      rkSum: zongjia
    })
    if(that.data.fun=='qichu'){
      var dms = that.data.dms;
      var dm = that.data.dm;
      if(dms.length==0){
        dms.push(dm);
      }else{
        for(let i=0;i<dms.length;i++){
          if(dms[i] == dm){
            continue;
          }else{
            dms.push(dm)
          }
        }
      }
      that.setData({
        dms
      })
    }
  },
  querenRk: function() {
    var _this = this;
    var sli = 0
    var sl = []
    var jg = []
    var zhi = []
    var type = wx.getStorageSync('type');
    if(_this.data.fun!='qichu' ){
      for (var i = 0; i < cpsl.length; i++) {
        if (cpsl[i] != null && cpsl[i] != "") {
          if(type != "1"){
            if(cpsl[i] > szZhi[i].allSL){
              wx.showToast({
                title: '商品出库数量大于总数量',
                icon : 'none'
              })
              return;
            }
          }
          sl[sli] = cpsl[i]
          jg[sli] = cpjg[i]
          zhi[sli] = szZhi[i]
          sli = sli + 1
        }
      }
      if (zhi == null) {
        wx.showToast({
          title: '数量或价格不能为空',
          icon: "none",
          duration: 2000
        })
      } else {
        wx.setStorageSync('rkall', zhi);
        wx.setStorageSync('szsl', sl);
        wx.setStorageSync('szje', jg);
        wx.setStorageSync('cpsum', zongjia);
        cpjg = []
        cpsl = []
        //返回上一页
        wx.navigateBack();
      }
    }else{
      var _this = this;
      var ssql = "";
      var dms = _this.data.dms
      for(let i=0;i<szZhi.length;i++){
        for(let j=0;j<dms.length;j++){
          if(szZhi[i].sp_dm==dms[j]){
            ssql +="INSERT yh_jinxiaocun_qichushu (cpid,cplb,cpname,cpsj,cpsl,zh_name,gs_name,shijian,mark1)values('" + szZhi[i].sp_dm + "','" + szZhi[i].lei_bie + "','" + szZhi[i].name + "','" + cpjg[i] + "','" + cpsl[i] + "','" + app.globalData.finduser + "','" + app.globalData.gongsi + "','" + new Date()+"','"+szZhi[i].mark1+"');"
            break;
          }
        }
      }
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: ssql
        },
        success(res) {
          console.log(res)
          wx.showToast({
            title: '期初数录入成功',
            icon : 'success',
            complete : res=> {
              wx.navigateBack({
                delta: 0,
              })
            }
          })
        }, fail(res) {
          
        }
      });
    }
  }
})