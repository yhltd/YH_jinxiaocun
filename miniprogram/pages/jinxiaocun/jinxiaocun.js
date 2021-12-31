// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden1: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    console.log(finduser)
    console.log(gongsi)
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select *,(ifnull(jq_cpsl,0)+ifnull(mx_ruku_cpsl,0)-ifnull(mx_chuku_cpsl,0)) as jc_sl,(ifnull(jq_price,0)+ifnull(mx_ruku_price,0)-ifnull(mx_chuku_price,0)) as jc_price from (select jj.mark1,jj.sp_dm,jj.name,jj.lei_bie,sum(jq.cpsl) as jq_cpsl,sum(jq.cpsl*jq.cpsj) as jq_price,mx_ruku.cpsl as mx_ruku_cpsl,mx_ruku.cp_price as mx_ruku_price,mx_chuku.cpsl as mx_chuku_cpsl,mx_chuku.cp_price as mx_chuku_price from yh_jinxiaocun_jichuziliao as jj left join yh_jinxiaocun_qichushu as jq on jj.sp_dm = jq.cpid and jq.gs_name = '" + gongsi + "' left join (select jm.sp_dm,sum(jm.cpsl) as cpsl,sum(jm.cpsl*jm.cpsj) as cp_price from yh_jinxiaocun_mingxi as jm where jm.gs_name = '" + gongsi + "' and jm.mxtype = '入库'  group by jm.sp_dm) as mx_ruku on mx_ruku.sp_dm = jj.sp_dm left join (select jm.sp_dm,sum(jm.cpsl) as cpsl,sum(jm.cpsl*jm.cpsj) as cp_price from yh_jinxiaocun_mingxi as jm where jm.gs_name = '" + gongsi + "' and jm.mxtype = '出库'  group by jm.sp_dm ) as mx_chuku on mx_chuku.sp_dm = jj.sp_dm where jj.gs_name = '" + gongsi + "' GROUP BY jj.sp_dm,jj.name,jj.lei_bie) as jxc "
      },
      success(res) {
        var all = []
        all = res.result;
        var szary = []
        var inserti = 0
        console.log(all)
        for(var i = 0; i < all.length; i++){
          szary.push({
            mark1:all[i].mark1,
            name:all[i].name,
            sp_dm:all[i].sp_dm,
            cplb:all[i].lei_bie,
            cpsl:all[i].jc_sl,
            cpsj:all[i].jc_price,
            qcsl:all[i].jq_cpsl,
            rksl:all[i].mx_ruku_cpsl,
            cksl:all[i].mx_chuku_cpsl,
          })
        }

        that.setData({
          szzhi: szary
        })
      },
      fail(res) {
        console.log("失败", res)
      }
    });
    // db.collection("Yh_JinXiaoCun_mingxi").where({
    //   finduser: finduser,
    //   gongsi: gongsi
    // }).get({
    //   success: res => {

    //     var all=[]


    //     // for(var i=0;i<=res.data.length;i++){
    //     //   var x="0"

    //     //   if(i!=0){
    //     //   for (var j = 0; j <= all.length; j++){
    //     //     console.log(i)
    //     //     console.log(j)
    //     //     console.log(res.data[i].cpname)
    //     //     console.log(all[j].cpname)
    //     //     if (all[j].cpname =res.data[i].cpname) {
    //     //       console.log("x")
    //     //        all[j].cpsl = all[j].cpsl + res.data[i].cpsl
    //     //        all[j].cpjj = all[j].cpjj + res.data[i].cpjj
    //     //        all[j].cpsj = all[j].cpsj + res.data[i].cpsj
    //     //        x="1"
    //     //      }

    //     //   }
    //     //   }

    //     //   if(x="0"){
    //     //     console.log("all")
    //     //   all.push(res.data[i])
    //     //   console.log(all)
    //     //   }
    //     // }
    //   //  console.log(all)
    //     that.setData({
    //       szzhi: res.data
    //     })
    //   }
    // })
  },

  xixi: function(e) {
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    console.log("xixi:", e)
    wx.showToast({
      title: '正在搜索',
      icon: 'loading',
      duration: 1000
    })
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    console.log(finduser)
    console.log(gongsi)
    console.log(e)
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select *,(ifnull(jq_cpsl,0)+ifnull(mx_ruku_cpsl,0)-ifnull(mx_chuku_cpsl,0)) as jc_sl,(ifnull(jq_price,0)+ifnull(mx_ruku_price,0)-ifnull(mx_chuku_price,0)) as jc_price from (select jj.mark1,jj.sp_dm,jj.name,jj.lei_bie,sum(jq.cpsl) as jq_cpsl,sum(jq.cpsl*jq.cpsj) as jq_price,mx_ruku.cpsl as mx_ruku_cpsl,mx_ruku.cp_price as mx_ruku_price,mx_chuku.cpsl as mx_chuku_cpsl,mx_chuku.cp_price as mx_chuku_price from yh_jinxiaocun_jichuziliao as jj left join yh_jinxiaocun_qichushu as jq on jj.sp_dm = jq.cpid and jq.gs_name = '" + gongsi + "' left join (select jm.sp_dm,sum(jm.cpsl) as cpsl,sum(jm.cpsl*jm.cpsj) as cp_price from yh_jinxiaocun_mingxi as jm where jm.gs_name = '" + gongsi + "' and jm.mxtype = '入库'  group by jm.sp_dm) as mx_ruku on mx_ruku.sp_dm = jj.sp_dm left join (select jm.sp_dm,sum(jm.cpsl) as cpsl,sum(jm.cpsl*jm.cpsj) as cp_price from yh_jinxiaocun_mingxi as jm where jm.gs_name = '" + gongsi + "' and jm.mxtype = '出库'  group by jm.sp_dm ) as mx_chuku on mx_chuku.sp_dm = jj.sp_dm where jj.gs_name = '" + gongsi + "' GROUP BY jj.sp_dm,jj.name,jj.lei_bie) as jxc where sp_dm like '%" + e.detail.value + "%'"
      },
      success(res) {
        var all = []
        all = res.result;
        var szary = []
        var inserti = 0
        console.log(all)
        for(var i = 0; i < all.length; i++){
          szary.push({
            mark1:all[i].mark1,
            name:all[i].name,
            sp_dm:all[i].sp_dm,
            cplb:all[i].lei_bie,
            cpsl:all[i].jc_sl,
            cpsj:all[i].jc_price
          })
        }

        that.setData({
          szzhi: szary
        })
      },
      fail(res) {
        console.log("失败", res)
      }
    });
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
      content: '1.点击搜索框可查询各商品进销存数据。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

})