// miniprogram/packageX/page/Turnover/Turnover.js
var wxCharts = require("../../../utils/wxcharts.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageWidth:0,
    userInfo: [],
    input_type: 'text',
    list: [],
    list1:[],
    list2:[],
    riqi1: "",
    riqi2: "",
    empty: "",
    gongsi: "",
    uname: "",
    getDate: function () {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1);
      var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
      return year + "-" + month + "-" + day
    },
  //   title: [
  //           { text: "会员总数", width: "200rpx", columnName: "hyzs", type: "date", isupd: true },
  //           { text: "下单会员人数", width: "180rpx", columnName: "xdhyrs", type: "number", isupd: true },
  //           { text: "订单总数", width: "250rpx", columnName: "ddzs", type: "number", isupd: true },
  //           { text: "消费金额", width: "180rpx", columnName: "xfje", type: "number", isupd: true },
  //           { text: "实收金额", width: "180rpx", columnName: "ssje", type: "number", isupd: true },
  //           { text: "优惠金额", width: "180rpx", columnName: "yhje", type: "number", isupd: true },
      
  //     ],
  //   input_hid: true,
  //   frmStudfind: true,
  //   mask_hid: true,
  //   handle3 : true,
  // },
  title: [
    { text: "会员总数", width: "200rpx", columnName: "hyzs", type: "date", isupd: true },
    { text: "下单会员人数", width: "230rpx", columnName: "xdhyrs", type: "number", isupd: true },
    { text: "订单总数", width: "200rpx", columnName: "ddzs", type: "number", isupd: true },
    { text: "消费金额", width: "180rpx", columnName: "xfje", type: "number", isupd: true },
    { text: "实收金额", width: "180rpx", columnName: "ssje", type: "number", isupd: true },
    { text: "优惠金额", width: "180rpx", columnName: "yhje", type: "number", isupd: true },

],
input_hid: true,
frmStudfind: true,
mask_hid: true,
handle3 : true,
},


  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
  },

  init: function () {
    var _this = this;
    if (_this.data.riqi1==""){
      _this.setData({
        riqi1:"1900/1/1"
      })
    }
    if (_this.data.riqi2 == "") {
      _this.setData({
        riqi2:"2300/12/31"
      })
    }
    let sql = "select round(sum(ifnull(heji.xfje,0)),2) as xfje,round(sum(ifnull(heji.ssje,0)),2) as ssje,round(sum(ifnull(heji.yhje,0)),2) as yhje from orders as ord left join(select ddid,company,sum(convert(dj,float) * convert(gs,float)) as xfje,sum(convert(zhdj,float) * convert(gs,float)) as ssje,round(sum(convert(dj,float) * convert(gs,float)) - sum(convert(zhdj,float) * convert(gs,float)),2) as yhje from orders_details group by ddid) as heji on ord.ddh = heji.ddid and ord.company = heji.company where ord.company = '" + _this.data.company + "' and riqi >='" + _this.data.riqi1 + "' and riqi <= '" + _this.data.riqi2 + "'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        console.log("select-success", res)
        var list1 = res.result
        let sql2 = "select count(*) as huiyuan_sum from member_info where company = '"+ _this.data.company +"' union all select count(*) as xiadan_sum from(select hyzh from orders where company = '"+ _this.data.company +"' and hyzh != '' and riqi >='" + _this.data.riqi1 + "' and riqi <= '" +  _this.data.riqi2 + "' group by hyzh) as xdhy union all select count(*) as dingdan_sum from orders where company = '"+ _this.data.company +"' and riqi >='" + _this.data.riqi1 + "' and riqi <= '" +  _this.data.riqi2 + "'"
        console.log(sql2)
        wx.cloud.callFunction({
          name: 'sqlserver_xinyongka',
          data: {
            sql: sql2
          },
          success: res => {
            console.log("select-success", res)
            var list2 = res.result
            var list = []
            // list.push({
            //   hyzs:list2[0].huiyuan_sum,
            //   xdhyrs:list2[1].huiyuan_sum,
            //   ddzs:list2[2].huiyuan_sum,
            //   xfje:list1[0].xfje,
            //   ssje:list1[0].ssje,
            //   yhje:list1[0].yhje
            // })
            //-----------------新0130
             // 修复判断逻辑，处理null值
  if (list2 && list2.length >= 3) {
    var hyzs = parseInt(list2[0].huiyuan_sum) || 0;
    var xdhyrs = parseInt(list2[1].huiyuan_sum) || 0;
    var ddzs = parseInt(list2[2].huiyuan_sum) || 0;
    
    // 处理可能的null值 - 这里需要访问 list1
    var xfje = (list1 && list1[0] && list1[0].xfje !== null) ? parseFloat(list1[0].xfje) : 0;
    var ssje = (list1 && list1[0] && list1[0].ssje !== null) ? parseFloat(list1[0].ssje) : 0;
    var yhje = (list1 && list1[0] && list1[0].yhje !== null) ? parseFloat(list1[0].yhje) : 0;
    
    // 只有当有数据时才显示
    if (hyzs > 0 || xdhyrs > 0 || ddzs > 0 || xfje > 0 || ssje > 0 || yhje > 0) {
      list.push({
        hyzs: hyzs,
        xdhyrs: xdhyrs,
        ddzs: ddzs,
        xfje: xfje,
        ssje: ssje,
        yhje: yhje
      })
    }
  }
            _this.setData({
              list: list,
              skr: "",
              fkr: "",
              ckr: "",
            })

            // new wxCharts({
            //   canvasId: 'columnCanvas',
            //   type: 'column',
            //   categories: ['消费金额', '实收金额', '优惠金额'],
            //   series: [{
            //       name: '点单收入情况汇总',
            //       data: [list[0].xfje, list[0].ssje, list[0].yhje]
            //   }],
            //   yAxis: {
            //       format: function (val) {
            //           return val;
            //       },
            //   },
            //   width: 400,
            //   height: 200
            // });
            if (list.length > 0 && list[0].xfje >= 0 && list[0].ssje >= 0 && list[0].yhje >= 0) {
              try {
                new wxCharts({
                  canvasId: 'columnCanvas',
                  type: 'column',
                  categories: ['消费金额', '实收金额', '优惠金额'],
                  series: [{
                    name: '点单收入情况汇总',
                    data: [list[0].xfje, list[0].ssje, list[0].yhje]
                  }],
                  yAxis: {
                    format: function (val) {
                      return val;
                    },
                  },
                  width: 400,
                  height: 200
                });
              } catch (error) {
                console.log("图表生成失败:", error);
              }
            }
          },
          fail: res => {
            console.log("select-fail", res)
          }
        })
      },
      fail: res => {
        console.log("select-fail", res)
      }
    })
  },




  entering: function () {
    var _this = this;
    _this.setData({
      riqi1:"1900-01-01",
      riqi2: "2300-12-31",
    }, function() {
      // 添加回调函数，确保init在setData完成后执行
      _this.init();
    });
  },



  inquire_QX: function () {
    var _this = this;
    _this.setData({
      frmStudfind: true,
      mask_hid: true,
      handle3 : true,
    })
  },




  save: function (e) {
    var _this = this;
      // 获取表单值
  var riqi1 = e.detail.value.riqi1;
  var riqi2 = e.detail.value.riqi2;
  
  // 检查日期是否合法
  if (riqi1 && riqi2) {
    var startDate = new Date(riqi1);
    var endDate = new Date(riqi2);
    
    if (startDate > endDate) {
      wx.showToast({
        title: '起始日期不能大于结束日期',
        icon: 'none',
        duration: 2000
      });
      return; // 停止执行
    }}
    _this.setData({
      riqi1: e.detail.value.riqi1,
      riqi2: e.detail.value.riqi2,
    },
    function() {
      // 在setData完成后调用init
      _this.init();
      
      // 关闭查询窗口
      _this.setData({
        frmStudfind: true,
        mask_hid: true,
      });
    });
  },

  inquire: function () {
    var _this = this;
    _this.setData({
      riqi1: "",
      riqi2: "",
      frmStudfind: false,
      mask_hid: false,
    })
  },

  use_book:function(){
    wx.showModal({
      title: '使用说明',
      content: '1.点击查询按钮，输入条件点击确定即可查询。\n2.点击全部按钮，页面显示所有数据。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  gengduo_show:function(){
    var _this = this;
    _this.setData({
      mask_hid:false,
      handle3:false
    })
  },

  getExcel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title
    var cloudList = {
      name: '统计报表',
      items: [],
      header: []
    }

    for (let i = 0; i < title.length; i++) {
      cloudList.header.push({
        item: title[i].text,
        type: title[i].type,
        width: parseInt(title[i].width.split("r")[0]) / 6,
        columnName: title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name: 'getExcel',
      data: {
        list: cloudList
      },
      success: function (res) {
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu: 'true',
              fileType: 'xlsx',
              success: res => {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      company: userInfo.gongsi,
      uname: userInfo.uname,
    })
    _this.entering();
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

  },
  //---------新0130
  generateChart: function(data) {
    var _this = this;
    
    // 确保数据是数字
    var xfje = parseFloat(data.xfje) || 0;
    var ssje = parseFloat(data.ssje) || 0;
    var yhje = parseFloat(data.yhje) || 0;
    
    // 只有在有数据时才生成图表
    if (xfje > 0 || ssje > 0 || yhje > 0) {
      try {
        new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          categories: ['消费金额', '实收金额', '优惠金额'],
          series: [{
            name: '点单收入情况汇总',
            data: [xfje, ssje, yhje]
          }],
          yAxis: {
            format: function (val) {
              return val.toFixed(2);
            },
          },
          width: 400,
          height: 200
        });
      } catch (error) {
        console.log("图表生成失败:", error);
      }
    }
  }
})