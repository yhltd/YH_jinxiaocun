// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden1: true,
    start_date:'',
    stop_date:'',
    product_number:'',
    title: [{
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
      columnName: "cplb",
      type: "text",
      isupd: true
    },
    {
      text: "期初数量",
      width: "200rpx",
      columnName: "qcsl",
      type: "number",
      isupd: true
    },
    {
      text: "期初金额",
      width: "230rpx",
      columnName: "qcje",
      type: "number",
      isupd: true
    },
    {
      text: "进货数量",
      width: "300rpx",
      columnName: "rksl",
      type: "number",
      isupd: true
    },
    {
      text: "进货金额",
      width: "150rpx",
      columnName: "rkje",
      type: "number",
      isupd: true
    },
    {
      text: "出库数量",
      width: "400rpx",
      columnName: "cksl",
      type: "number",
      isupd: true
    },
    {
      text: "出库金额",
      width: "200rpx",
      columnName: "ckje",
      type: "number",
      isupd: true
    },
    {
      text: "结存",
      width: "200rpx",
      columnName: "cpsl",
      type: "number",
      isupd: true
    },
    {
      text: "结存金额",
      width: "200rpx",
      columnName: "cpsj",
      type: "number",
      isupd: true
    },
    {
      text: "边缘存量",
      width: "200rpx",
      columnName: "bianyuan",
      type: "number",
      isupd: true
    },
  ],
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
    that.sel1();
    // wx.cloud.callFunction({
    //   name: "sqlConnection",
    //   data: {
    //     sql: "select *,(ifnull(jq_cpsl,0)+ifnull(mx_ruku_cpsl,0)-ifnull(mx_chuku_cpsl,0)) as jc_sl,(ifnull(jq_price,0)+ifnull(mx_ruku_price,0)-ifnull(mx_chuku_price,0)) as jc_price from (select jj.mark1,jj.sp_dm,jj.name,jj.lei_bie,ifnull(sum(jq.cpsl),0) as jq_cpsl,ifnull(sum(jq.cpsl*jq.cpsj),0) as jq_price,ifnull(mx_ruku.cpsl,0) as mx_ruku_cpsl,ifnull(mx_ruku.cp_price,0) as mx_ruku_price,ifnull(mx_chuku.cpsl,0) as mx_chuku_cpsl,ifnull(mx_chuku.cp_price,0) as mx_chuku_price from yh_jinxiaocun_jichuziliao as jj left join yh_jinxiaocun_qichushu as jq on jj.sp_dm = jq.cpid and jq.gs_name = '" + gongsi + "' left join (select jm.sp_dm,sum(jm.cpsl) as cpsl,sum(jm.cpsl*jm.cpsj) as cp_price from yh_jinxiaocun_mingxi as jm where jm.gs_name = '" + gongsi + "' and jm.mxtype = '入库'  group by jm.sp_dm) as mx_ruku on mx_ruku.sp_dm = jj.sp_dm left join (select jm.sp_dm,sum(jm.cpsl) as cpsl,sum(jm.cpsl*jm.cpsj) as cp_price from yh_jinxiaocun_mingxi as jm where jm.gs_name = '" + gongsi + "' and jm.mxtype = '出库'  group by jm.sp_dm ) as mx_chuku on mx_chuku.sp_dm = jj.sp_dm where jj.gs_name = '" + gongsi + "' GROUP BY jj.sp_dm,jj.name,jj.lei_bie) as jxc "
    //   },
    //   success(res) {
    //     var all = []
    //     for(var i=0;i<res.result.length;i++){
    //       res.result[i].mark1 = "data:image/jpeg;base64," + res.result[i].mark1.replace(/[\r\n]/g, '')
    //     }
    //     all = res.result;
    //     var szary = []
    //     var inserti = 0
    //     console.log(all)
    //     for(var i = 0; i < all.length; i++){
    //       szary.push({
    //         mark1:all[i].mark1,
    //         name:all[i].name,
    //         sp_dm:all[i].sp_dm,
    //         cplb:all[i].lei_bie,
    //         cpsl:all[i].jc_sl,
    //         cpsj:all[i].jc_price,
    //         qcsl:all[i].jq_cpsl,
    //         rksl:all[i].mx_ruku_cpsl,
    //         cksl:all[i].mx_chuku_cpsl,
    //       })
    //     }

    //     that.setData({
    //       szzhi: szary
    //     })
    //   },
    //   fail(res) {
    //     console.log("失败", res)
    //   }
    // });

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

  sel1: function(e) {
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    wx.showToast({
      title: '正在搜索',
      icon: 'loading',
      duration: 1000
    })
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    var start_date = that.data.start_date
    var stop_date = that.data.stop_date
    var product_number = that.data.product_number
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

    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select cpid,cpname,cplb,qcsl,qcje,rksl,rkje,cksl,ckje,jcsl,jcje,ifnull(bian_yuan.bianyuan,'') as bianyuan,mark1 from (select ifnull(link_rk.cpid,'') as cpid,ifnull(link_rk.cpname,'') as cpname,ifnull(link_rk.cplb,'') as cplb,ifnull(link_rk.cpsl,0) as qcsl,ifnull(link_rk.cpje,0) as qcje,ifnull(link_rk.rksl,0) as rksl,ifnull(link_rk.rkje,0) as rkje,ifnull(ck.cksl,0) as cksl,ifnull(ck.ckje,0) as ckje,ifnull(cpsl,0)+ifnull(rksl,0)-ifnull(cksl,0) as jcsl,ifnull(cpje,0)+ifnull(rkje,0)-ifnull(ckje,0) as jcje from (select link_qc.cpid,link_qc.cpname,link_qc.cplb,link_qc.cpsl,link_qc.cpje,rk.rksl,rk.rkje from(select cp.cpid,cp.cpname,cp.cplb,qc.cpsl,qc.cpje from(select cpid,cpname,cplb from yh_jinxiaocun_qichushu where gs_name = '"+ gongsi +"' union select sp_dm,cpname,cplb from  yh_jinxiaocun_mingxi where gs_name = '"+ gongsi +"') as cp left join (select cpid,cplb,cpname,sum(cpsl) as cpsl,sum(cpsj*cpsl) as cpje from yh_jinxiaocun_qichushu where gs_name = '"+ gongsi +"' GROUP BY cpid,cpname,cplb) as qc on cp.cpid = qc.cpid and cp.cpname = qc.cpname and cp.cplb = qc.cplb) as link_qc left join (select sp_dm,cpname,cplb,sum(cpsl) as rksl,sum(cpsl*cpsj) as rkje from yh_jinxiaocun_mingxi where mxtype = '入库' and gs_name = '"+ gongsi +"' and shijian between '" + start_date + "' and '" + stop_date + "' group by sp_dm,cpname,cplb) as rk on rk.sp_dm = link_qc.cpid and rk.cpname = link_qc.cpname  and rk.cplb = link_qc.cplb) as link_rk left join (select sp_dm,cpname,cplb,sum(cpsl) as cksl,sum(cpsl*cpsj) as ckje from yh_jinxiaocun_mingxi where mxtype = '出库' and gs_name = '"+ gongsi +"' and shijian between '" + start_date + "' and '" + stop_date + "' group by sp_dm,cpname,cplb) as ck on ck.sp_dm = link_rk.cpid and ck.cpname = link_rk.cpname and ck.cplb = link_rk.cplb) as jxc left join(select sp_dm,lei_bie,`name`,bianyuan,mark1 from yh_jinxiaocun_jichuziliao where gs_name = '"+ gongsi +"') as bian_yuan on jxc.cpid = bian_yuan.sp_dm and jxc.cpname = bian_yuan.`name` and jxc.cplb = bian_yuan.lei_bie  where cpid like '%" + product_number + "%'"
      },
      success(res) {
        for(var i=0;i<res.result.length;i++){
          if(res.result[i].mark1 != null){
            res.result[i].mark1 = "data:image/jpeg;base64," + res.result[i].mark1.replace(/[\r\n]/g, '')
          }
        }
        var all = []
        all = res.result;
        var szary = []
        var inserti = 0
        console.log(all)
        for(var i = 0; i < all.length; i++){
          szary.push({
            mark1:all[i].mark1,
            name:all[i].cpname,
            sp_dm:all[i].cpid,
            cplb:all[i].cplb,
            cpsl:all[i].jcsl,
            cpsj:all[i].jcje,
            qcsl:all[i].qcsl,
            qcje:all[i].qcje,
            rksl:all[i].rksl,
            rkje:all[i].rkje,
            cksl:all[i].cksl,
            ckje:all[i].ckje,
            bianyuan:all[i].bianyuan,
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
      content: '1.点击查询按钮可查询各商品进销存数据。\n2.点击导出按钮可将当前页面的信息导出为excel文档',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.szzhi;
    console.log(list)
    var title = _this.data.title
    var cloudList = {
      name : '进销存',
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