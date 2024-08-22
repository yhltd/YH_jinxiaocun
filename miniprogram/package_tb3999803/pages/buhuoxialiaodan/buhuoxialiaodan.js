// package_tb3999803/pages/buhuoxialiaodan/buhuoxialiaodan.js
Page({

  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  intoShow:false,
  xlShow: false,
  xlShow2: false,
  /**
   * 页面的初始数据
   */
  data: {
    xm_type: ['补板','配件','返厂','外购','整改','少料'],
    dl_type: ['缺大板','缺中板','缺小板','缺条子','灯带板','异形板','拉手板','手工件','弧形板','其他'],
    jd_type: ['已审','已补','入库','缺料'],
    header_list:{
      dh:'',
      khmc:'',
      zdyh:'',
      clmc:'',
    },
    list: [],
    title: [
      {
        text: "序号",
        width: "275rpx",
        width2: "calc(275vmin / 7.5)",
        columnName: "rownum",
        type: "text",
        isupd: true
      },{
        text: "项目",
        width: "275rpx",
        width2: "calc(275vmin / 7.5)",
        columnName: "xm",
        type: "text",
        isupd: true
      },{
        text: "大类",
        width: "275rpx",
        width2: "calc(275vmin / 7.5)",
        columnName: "dl",
        type: "text",
        isupd: true
      }
      ,{
        text: "名称数量",
        width: "275rpx",
        width2: "calc(275vmin / 7.5)",
        columnName: "mcsl",
        type: "text",
        isupd: true
      },{
        text: "进度",
        width: "275rpx",
        width2: "calc(275vmin / 7.5)",
        columnName: "jd",
        type: "text",
        isupd: true
      },{
        text: "发起日期",
        width: "275rpx",
        width2: "calc(275vmin / 7.5)",
        columnName: "fqrq",
        type: "text",
        isupd: true
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    console.log(options.ddh+"    81")
    console.log(options.dh+"    82")
    var header_list = _this.data.header_list
    // header_list.dh = options.ddh
    // ------------------20240822 xt
    if (options.ddh != undefined){
      console.log(options.ddh+"    87")
      header_list.dh = options.ddh
    }
    if(options.dh != undefined){
      console.log(options.dh+"   90")
      header_list.dh = options.dh
    }
    if(options.productionNo != undefined){
      console.log(options.productionNo+"   91")
      header_list.dh = options.productionNo
    }
    // ------------------------------
    header_list.khmc = options.khmc
    // console.log(options.khmc)
    header_list.zdyh = options.zdyh
// ------------------20240822 xt
header_list.clmc = options.clmc
// ------------------------------
    // console.log(options.zdyh)
    // console.log(header_list.dh)
    // console.log(header_list)
    // var dh = options.ddh
    // console.log(dh)
    _this.setData({
      header_list
    })
  },
  add_row: function () {
    var _this = this
    var list = _this.data.list
    var _this = this
    // 获取当前日期
    const currentDate = new Date();
    // 格式化日期为 "yyyy-MM-dd" 格式
    const formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
    // 将格式化后的日期设置为 input 元素的值
    list.push({
      xm:"",
      dl:"",
      mcsl:"",
      jd:"",
      fqrq:formattedDate,
    
    })
    _this.setData({
      list
    })
  },
  clickView1:function(e){
    var _this = this
    var this_column = e.currentTarget.dataset.column
    var index = e.currentTarget.dataset.index
    var this_value = e.currentTarget.dataset.value
    console.log(index)
    console.log(this_column)
    if(this_column == 'xm'){
      console.log("11")
      _this.setData({
        this_column:e.currentTarget.dataset.column,
        this_value:e.currentTarget.dataset.value,
        this_index:e.currentTarget.dataset.index,
        xgShow1:true,
        
      })
  }else if(this_column == 'dl'){
    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      this_index:e.currentTarget.dataset.index,
      xgShow2:true,
    })
    
  }else if(this_column == 'jd'){
    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      this_index:e.currentTarget.dataset.index,
      xgShow3:true,
      
    })
  }else if(this_column == 'fqrq'){
    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      this_index:e.currentTarget.dataset.index,
      xgShow3:false,
      
    })
  }
  else{
    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      this_index:e.currentTarget.dataset.index,
      xgShow:true,
      
    })
  }
  
    // var this_row = e.currentTarget.dataset.index
    // console.log(this_row)
 
    // _this.setData({
    //   this_column:e.currentTarget.dataset.column,
    //   this_value:e.currentTarget.dataset.value,
    //   this_index:e.currentTarget.dataset.index,
    //   // xgShow:true,
      
    // })
    
  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.xm_type[e.detail.value]
    })
  },

  bindPickerChange2: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.dl_type[e.detail.value]
    })
  },

  bindPickerChange3: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.jd_type[e.detail.value]
    })
  },
  upd:function(){
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    
    // var list = _this.data.list.xm
    var list = _this.data.list
    // console.log(_this.data.xm.value)
    list[index][this_column] = this.data.mcsl
    // console.log(list[index * 1])
    console.log(list)
    _this.setData({
      list:list,
      xgShow:false,
    })
  },
  upd1:function(){
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    var this_value = _this.data.xm.value
    // var list = _this.data.list.xm
    var list = _this.data.list
    // console.log(_this.data.xm.value)
    list[index][this_column] = this.data.xm
    // console.log(list[index * 1])
    console.log(list)
    _this.setData({
      list:list,
      xgShow1:false,
    })
  },
  upd2:function(){
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    
    // var list = _this.data.list.xm
    var list = _this.data.list
    // console.log(_this.data.xm.value)
    list[index][this_column] = this.data.dl
    // console.log(list[index * 1])
    console.log(list)
    _this.setData({
      list:list,
      xgShow2:false,
    })
  },
  upd3:function(){
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
   
    // var list = _this.data.list.xm
    var list = _this.data.list
    // console.log(_this.data.xm.value)
    list[index][this_column] = this.data.jd
    // console.log(list[index * 1])
    console.log(list)
    _this.setData({
      list:list,
      xgShow3:false,
    })
  },
  add1: function(){
    var _this = this
      var sql1 = "insert into buhuoxialiao(dh,khmc,zdyh,clmc,xm,dl,mcsl,jd,fqrq) values"
      var sql2 = ""
      for(var i=0; i< _this.data.list.length; i++){
        if(sql2 == ""){
          sql2 = "('" + _this.data.header_list.dh + "','"+ _this.data.header_list.khmc +"','" + _this.data.header_list.zdyh +"','" + _this.data.header_list.clmc +"','"+  _this.data.list[i].xm +"','"+  _this.data.list[i].dl +"','"+  _this.data.list[i].mcsl +"','"+  _this.data.list[i].jd +"','"+  _this.data.list[i].fqrq +"')"
        }else{
          sql2 = sql2 + ",('" + _this.data.header_list.dh + "','"+ _this.data.header_list.khmc +"','" + _this.data.header_list.zdyh +"','" + _this.data.header_list.clmc +"','"+  _this.data.list[i].xm +"','"+  _this.data.list[i].dl +"','"+  _this.data.list[i].mcsl +"','"+  _this.data.list[i].jd +"','"+  _this.data.list[i].fqrq +"')"
        }
      }
      var sql=sql1+sql2
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlServer_tb3999803',
        data: {
          query: sql
        },
        success: res => {
          // _this.qxShow()
          wx.showToast({
            title: '添加成功！',
            icon: 'none'
          })
          
          // var common_Interval = setInterval(()=>
          // {
          //   wx.navigateBack({ 
          //     delta: 1
          //   });
          //   clearInterval(common_Interval);
          // }, 2000)

          
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
    },
    qxShow: function () {
      var _this = this
      _this.setData({
        xgShow: false,
        xgShow1: false,
        xgShow2: false,
        xgShow3:false,
      
      })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})