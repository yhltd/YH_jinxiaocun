// miniprogram/packageC/pages/c_zichanfuzhai/c_zicanfuzhai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initHidView : true,
    userInfo : "",


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
      }
    ],
    titil : [
      {text:"科目名称",width:"400rpx",columnName: "name"},
      {text:"年初余额",width:"250rpx",columnName: "start_year"},
      {text:"年末余额",width:"250rpx",columnName: "end_year"},
    ],

    class_id : 1,
    class_name : "资产类",
    class_id_new : 1,

    animationData_moreDo_view : [],


    sum_start1 : 0,
    sum_end1 : 0,
    sum_start2 : 0,
    sum_end2 : 0,
    chaxun_hidden:true,
  },


  init : function(callback){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;
    var class_id = _this.data.class_id
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from (select a.name,left(a.code,1) as class,v.company,(CASE "+class_id+" WHEN 1 THEN sum(load-borrowed) ELSE sum(borrowed-load) END) as start_year,(CASE "+class_id+" WHEN 1 THEN sum([load]-borrowed+ISNULL(v.money, 0)) ELSE sum(borrowed-[load]+ISNULL(v.money, 0)) END) as end_year from Accounting as a left join VoucherSummary as v on a.code = v.code WHERE left(a.code,1) = "+class_id+" and a.company = '"+userInfo.company+"' GROUP BY a.code,a.name,v.company) as a where a.company = '"+userInfo.company+"' or a.company is null"

      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          ["list["+(class_id-1)+"].arr"] : list,
          class_name : _this.data.list[class_id-1].className
        })
        wx.hideLoading()
        _this.getSum()
        if(callback != undefined){
          callback();
        }
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

  getSum : function(){
    wx.showLoading({
      title: '加载中',
      mask : 'true'
    })
    var _this = this;
    var class_id = _this.data.class_id
    var userInfo = _this.data.userInfo

    var sql = "select sum(a.start_year) as sum_start,sum(a.end_year) as sum_end from (select v.company,(CASE "+class_id+" WHEN 1 THEN sum(load-borrowed) ELSE sum(borrowed-load) END) as start_year,(CASE "+class_id+" WHEN 1 THEN sum([load]-borrowed+ISNULL(v.money, 0)) ELSE sum(borrowed-[load]+ISNULL(v.money, 0)) END) as end_year from Accounting as a left join VoucherSummary as v on a.code = v.code WHERE left(a.code,1) = "+class_id+" and a.company = '"+userInfo.company+"' GROUP BY a.code,a.name,v.company) as a where a.company = '"+userInfo.company+"' or a.company is null;"
    if(class_id==3){
      sql += "select sum(a.start_year) as sum_start,sum(a.end_year) as sum_end from (select v.company,(CASE 2 WHEN 1 THEN sum(load-borrowed) ELSE sum(borrowed-load) END) as start_year,(CASE 2 WHEN 1 THEN sum([load]-borrowed+ISNULL(v.money, 0)) ELSE sum(borrowed-[load]+ISNULL(v.money, 0)) END) as end_year from Accounting as a left join VoucherSummary as v on a.code = v.code WHERE left(a.code,1) = 2 and a.company = '"+userInfo.company+"' GROUP BY a.code,a.name,v.company) as a where a.company = '"+userInfo.company+"' or a.company is null;"
    }

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        if(class_id<3){
          var list = res.result.recordset
          _this.setData({
            sum_start1 : list[0].sum_start,
            sum_end1 : list[0].sum_end,
          })
        }else{
          var list = res.result.recordsets
          _this.setData({
            sum_start1 : list[0][0].sum_start,
            sum_end1 : list[0][0].sum_end,
            sum_start2 : list[1][0].sum_start+list[0][0].sum_start,
            sum_end2 : list[1][0].sum_end+list[0][0].sum_end,
          })
        }
        wx.hideLoading({
          complete: (res) => {},
        })
      },
      err: res => {
        console.log("错误!")
      },
    })
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

  reInit: function(){
    var _this = this;
    _this.init(function(){
      wx.showToast({
        title: '计算成功',
        icon: 'none'
      })
      _this.hidView(_this,"moreDo")
    })
  },







  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    _this.init();
    _this.hid_view()
  },


  showView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    _this.setData({
      initHidView : false
    })

    setTimeout(function(){
      switch(type){
        case "moreDo":
          animation.translateX(0).step()
          _this.setData({
            animationData_moreDo_view : animation.export(),
            hid_view : true
          })
          break;
        case "updClass":
          animation.translateY(0).step()
          _this.setData({
            animationData_updClass : animation.export(),
            hid_view : true
          })
          break;
        case "sum":
          animation.translateY(0).step()
          _this.setData({
            animationData_sum : animation.export(),
            hid_view : true
          })
          break;
      }
    },100)
    
    
  },
  hidView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    
    switch(type){
      case "moreDo":
        animation.translateX(-300).step()
        _this.setData({
          animationData_moreDo_view : animation.export(),
          hid_view : false
        })
        break;
      case "updClass":
        animation.translateY(300).step()
        _this.setData({
          animationData_updClass : animation.export(),
          hid_view : false
        })
        break;
      case "sum":
        animation.translateY(400).step()
        _this.setData({
          animationData_sum : animation.export(),
          hid_view : false
        })
        break;
    }
  },
  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    _this.hidView(_this,"updClass")
    _this.hidView(_this,"sum")
  },

  use_book: function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    wx.showModal({
      title: '使用说明',
      content: '1.点击更多操作按钮，在弹出的窗口中点击第一个按钮，在下方滚动条选择类别点击确定按钮即可按类别查询。\n2.点击更多操作按钮，在弹出的窗口中点击导出excel按钮即可将页面显示的数据导出。\n3.点击更多操作按钮，在弹出的窗口中点击重新计算按钮，可重新计算数据下方的合计金额。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  getExcel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var class_id = _this.data.class_id
    var list = _this.data.list[class_id-1].arr
    var title = _this.data.titil
    console.log(_this.data.list)
    console.log(list)
    console.log(title)
    var cloudList = {
      name: '资产负债',
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
        var fileid =  res.result.fileID
        console.log(fileid)
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            console.log("获取临时路径")
            delCloudFile(fileid)
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
                delCloudFile(fileid)
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

  chaxun_show:function(){
    var _this = this
    _this.setData({
      chaxun_hidden:false,
      start_date:"",
      stop_date:"",
    })
  },

  chaxun_quxiao:function(){
    var _this = this
    _this.setData({
      chaxun_hidden:true
    })
  },

  showChoiceMonth1 : function(e){
    var _this = this;
    _this.setData({
      start_date: e.detail.value
    })
  },
  showChoiceMonth2 : function(e){
    var _this = this;
    _this.setData({
      stop_date: e.detail.value
    })
  },

  select:function(e){
    var _this = this
    console.log(e.detail.value)
    var start_date = e.detail.value.start_date
    var stop_date = e.detail.value.stop_date
    if(start_date > stop_date){
      wx.showToast({
        title: '开始日期不能大于结束日期',
        icon:'none',
        duration: 2000//持续的时间
      })
      return
    }
    var start_nian = start_date.split('-')
    start_nian = start_nian[0]
    var stop_nian = stop_date.split('-')
    stop_nian = stop_nian[0]
    console.log(start_nian)
    console.log(stop_nian)
    if(start_nian != stop_nian){
      wx.showToast({
        title: '不允许跨年查询',
        icon:'none',
        duration: 2000//持续的时间
      })
      return
    }
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var userInfo = _this.data.userInfo;
    var class_id = _this.data.class_id
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from (select a.name,left(a.code,1) as class,v.company,(CASE "+class_id+" WHEN 1 THEN sum(load-borrowed) ELSE sum(borrowed-load) END) as start_year,(CASE "+class_id+" WHEN 1 THEN sum([load]-borrowed+ISNULL(v.money, 0)) ELSE sum(borrowed-[load]+ISNULL(v.money, 0)) END) as end_year from Accounting as a left join VoucherSummary as v on a.code = v.code WHERE left(a.code,1) = "+class_id+" and a.company = '"+userInfo.company+"' and v.voucherDate >= convert(date,'" + start_date + "-01') and v.voucherDate <= convert(date,'"+ stop_date +"-31') GROUP BY a.code,a.name,v.company) as a where a.company = '"+userInfo.company+"' or a.company is null"
      },
      success: res => {
        var list = res.result.recordset
        var nianchu = 0
        var nianmo = 0
        console.log(list)
        if(list != undefined){
          if(list.length != 0){
            for(var i=0;i<list.length;i++){
              nianchu = nianchu + list[i].start_year
              nianmo = nianmo + list[i].end_year
            }
          }
        }
        _this.setData({
          ["list["+(class_id-1)+"].arr"] : list,
          class_name : _this.data.list[class_id-1].className,
          sum_start1:nianchu,
          sum_end1:nianmo
        })
        wx.hideLoading()
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

    
    _this.chaxun_quxiao()
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

function delCloudFile(fileId){
  wx.cloud.callFunction({
    name:'detExcel',
    data:{
      fileID : fileId
    },
    success(res){
      console.log('删除日志',res)
    },
    
  })
}