// packageC/pages/c_kemuzongzhang/c_kemuzongzheng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initHidView : true,
    hid_view : false,
    chaxun_hidden:true,
    empty : "",
    userInfo : "",
    start_date:"",
    stop_date:"",

    countPage : 20, //每一页显示的数据数据数量
    pageCount : 0, //总页数
    pageNum : 1, //当前页 


    list : [
      {
        class : 0,
        className : "支出",
        arr :[]
      },{
        class : 1,
        className : "收入",
        arr :[]
      }
    ],
    monthSum :0,
    yearSum :0,
    titil : [
      {text:"序号",width:"100rpx",columnName: "ROW_ID"},
      {text:"科目名称",width:"400rpx",columnName: "name"},
      {text:"本月合计",width:"400rpx",columnName: "sum_month"},
      {text:"本年合计",width:"400rpx",columnName: "sum_year"},
    ],

    class_id : 0,
    class_name : "",
    class_id_new : 0,
    
  },

  init : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;
    var class_id = _this.data.class_id;
    var pageNum = _this.data.pageNum;
    var countPage = _this.data.countPage;

    var sql = "select * from (select name,y.sum_month,y.sum_year,a.direction,row_number() over(order by name) as ROW_ID from Accounting as a,(SELECT code,isnull((SELECT sum(money) FROM VoucherSummary WHERE MONTH(voucherDate) = MONTH(GETDATE()) AND code = y.code),0) AS sum_month,isnull((SELECT sum(money) FROM VoucherSummary WHERE YEAR(voucherDate) = YEAR(GETDATE()) AND code = y.code),0) AS sum_year FROM VoucherSummary AS y WHERE company = '"+userInfo.company+"' and YEAR(voucherDate) = YEAR(GETDATE()) GROUP BY y.code) as y where a.code = y.code and a.company = '"+userInfo.company+"' and a.direction = "+class_id+") as t where t.ROW_ID > "+(pageNum-1)*countPage+" and t.ROW_ID < "+(pageNum*countPage+1)

    
    _this.getPageCount(sql);
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        var monthSum = 0
        var yearSum = 0
        for(let i=0;i<list.length;i++){
          monthSum+=parseInt(list[i].sum_month)
          yearSum+=parseInt(list[i].sum_year)
        }
        _this.setData({
          ["list["+class_id+"].arr"] : list,
          class_name : _this.data.list[class_id].className,
          monthSum,
          yearSum
        })
        wx.hideLoading({

        })
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

  getPageCount : function(sql){
    var _this = this;
    var userInfo = _this.data.userInfo

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select count(*) as pageCount from ("+sql+") as a"
      },
      success: res => {

        var list = res.result.recordset
        var countPage = _this.data.countPage;
        var pageCount = Math.ceil(list[0].pageCount/countPage);
        _this.setData({
          pageCount
        })
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
  switchpage : function(e){
    var _this = this;
    var index= e.currentTarget.dataset.index;
    var pageNum = _this.data.pageNum;
    var pageCount = _this.data.pageCount;

    if(index=="-1"){
      pageNum--;
      if(pageNum<1){
        wx.showToast({
          title: "已经是第一页",
          icon : "none"
        })
      }else{
        _this.setData({
          pageNum
        })
        _this.init();
      }
    }else{
      pageNum++;
      if(pageNum>pageCount){
        wx.showToast({
          title: "已经是最后一页",
          icon : "none"
        })
      }else{
        _this.setData({
          pageNum
        })
        _this.init();
      }
    }
  },


  showView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    _this.setData({
      initHidView : false,
      hid_view : true
    })

    setTimeout(() => {  
      switch(type){
        case "moreDo":
          animation.translateX(0).step()
          _this.setData({
            animationData_moreDo_view : animation.export()
          })
          break;
        case "updClass":
          animation.translateY(0).step()
          _this.setData({
            animationData_updClass : animation.export()
          })
          break;
      }
    }, 100)
    
  },
  hidView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })

    _this.setData({
      hid_view : false
    })
    switch(type){
      case "moreDo":
        animation.translateX(-300).step()
        _this.setData({
          animationData_moreDo_view : animation.export()
        })
        break;
      case "updClass":
        animation.translateY(300).step()
        _this.setData({
          animationData_updClass : animation.export()
        })
        break;
    }
  },
  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    _this.hidView(_this,"updClass")
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
      class_id_new : index
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
    var arr = _this.data.list[class_id_new].arr
    if(arr!=""){
      var monthSum = 0;
      var yearSum = 0
      for(let i=0;i<arr.length;i++){
        monthSum+=parseInt(arr[i].sum_month)
        yearSum+=parseInt(arr[i].sum_year)
      }
      _this.setData({
        monthSum,
        yearSum
      })
    }
    _this.init();
  },
  backClass : function(){
    var _this = this;
    _this.setData({
      class_id_new : _this.data.class_id
    })
    _this.hidView(_this,"updClass");
  },

  use_book: function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    wx.showModal({
      title: '使用说明',
      content: '1.点击更多操作按钮，在弹出的窗口中点击第一个按钮，在下方滚动条选择类别点击确定按钮即可按类别查询。\n2.点击更多操作按钮，在弹出的窗口中点击导出excel按钮即可将页面显示的数据导出。',
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
    console.log(_this.data.class_id)
    var class_id = _this.data.class_id
    var list = _this.data.list[class_id].arr
    var title = _this.data.titil
    console.log(list)
    console.log(title)
    var cloudList = {
      name: '利益损益',
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
        var fileid = res.result.fileID
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

  

  //  delCloudFile:function(fileID){
  //   const fileIDs=[];
  //   fileIDs.push(fileID);
  //   //删除云存储中的excel文件
  //   wx.cloud.deleteFile({
  //     fileList: fileIDs,
  //     success: res4 => {
  //       // handle success
  //       console.log(res.fileList);
  //     },
  //     fail: console.error
  //   })
  // },

  chaxun_show:function(){
    var _this = this
    _this.hid_view()
    _this.setData({
      chaxun_hidden:false,
      start_date:"",
      stop_date:"",
    })
  },

  chaxun_quxiao:function(){
    var _this = this
    _this.hid_view()
    _this.setData({
      chaxun_hidden:true
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
    var class_id = _this.data.class_id;
    var pageNum = _this.data.pageNum;
    var countPage = _this.data.countPage;
    var sql = "select * from (select name,y.sum_month,y.sum_year,a.direction,row_number() over(order by name) as ROW_ID from Accounting as a,(SELECT code,isnull((SELECT sum(money) FROM VoucherSummary WHERE voucherDate >= CONVERT(date,'"+ start_date +"'-01) and voucherDate <= CONVERT(date,'" + stop_date + "-31') AND code = y.code),0) AS sum_month,isnull((SELECT sum(money) FROM VoucherSummary WHERE YEAR(voucherDate) = YEAR(CONVERT(date,'" + start_date + "31')) AND code = y.code),0) AS sum_year FROM VoucherSummary AS y WHERE company = '"+userInfo.company+"' and YEAR(voucherDate) = YEAR(CONVERT(date,'" + start_date + "-31')) GROUP BY y.code) as y where a.code = y.code and a.company = '"+userInfo.company+"' and a.direction = "+class_id+") as t where t.ROW_ID > "+(pageNum-1)*countPage+" and t.ROW_ID < "+(pageNum*countPage+1)

    var sql = "select * from (select name,y.sum_month,y.sum_year,a.direction,row_number() over(order by name) as ROW_ID from Accounting as a,(SELECT code,isnull((SELECT sum(money) FROM VoucherSummary WHERE voucherDate >= CONVERT(date,'"+ start_date +"') and voucherDate <= CONVERT(date,'"+ stop_date +"') AND code = y.code),0) AS sum_month,isnull((SELECT sum(money) FROM VoucherSummary WHERE YEAR(voucherDate) = YEAR(CONVERT(date,'"+ start_date +"')) AND code = y.code),0) AS sum_year FROM VoucherSummary AS y WHERE company = '"+userInfo.company+"' and YEAR(voucherDate) = YEAR(CONVERT(date,'"+ start_date +"')) GROUP BY y.code) as y where a.code = y.code and a.company = '"+userInfo.company+"' and a.direction =1) as t where t.ROW_ID > "+(pageNum-1)*countPage+" and t.ROW_ID < "+(pageNum*countPage+1)
    console.log(sql)
    
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(res.result.recordset)
        console.log(list)
        var monthSum = 0
        var yearSum = 0
        if(list != undefined){
          if(list.length > 0) {
            for(let i=0;i<list.length;i++){
              monthSum+=parseInt(list[i].sum_month)
              yearSum+=parseInt(list[i].sum_year)
            }
          }
        }
        _this.setData({
          ["list["+class_id+"].arr"] : list,
          class_name : _this.data.list[class_id].className,
          monthSum,
          yearSum
        })
        wx.hideLoading({

        })
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    _this.init()
    _this.hid_view()
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