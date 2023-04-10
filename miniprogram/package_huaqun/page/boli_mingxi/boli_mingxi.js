// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  xgShow2: false,
  cxShow: false,
  data: {
    list: [],
    title: [
      {
        text: "下单日期",
        width: "250rpx",
        columnName: "insert_date",
        type: "text",
        isupd: true
      },
      {
        text: "单据编号",
        width: "250rpx",
        columnName: "order_number",
        type: "text",
        isupd: true
      },
      {
        text: "简码",
        width: "250rpx",
        columnName: "pinyin",
        type: "text",
        isupd: true
      },
      {
        text: "所属供应商",
        width: "250rpx",
        columnName: "gongyingshang",
        type: "text",
        isupd: true
      },
      {
        text: "玻璃颜色",
        width: "250rpx",
        columnName: "boli_yanse",
        type: "text",
        isupd: true
      },
      {
        text: "玻璃深加工",
        width: "250rpx",
        columnName: "boli_shenjiagong",
        type: "text",
        isupd: true
      },
      {
        text: "数量",
        width: "250rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "高度",
        width: "250rpx",
        columnName: "height",
        type: "text",
        isupd: true
      },
      {
        text: "宽度",
        width: "250rpx",
        columnName: "width",
        type: "text",
        isupd: true
      },
      {
        text: "孔位说明备注信息",
        width: "300rpx",
        columnName: "beizhu",
        type: "text",
        isupd: true
      },
      {
        text: "审单",
        width: "250rpx",
        columnName: "shendan",
        type: "text",
        isupd: true
      },
      {
        text: "生产状态",
        width: "250rpx",
        columnName: "shengchan",
        type: "text",
        isupd: true
      },
      {
        text: "开拉手孔位数据说明",
        width: "1500rpx",
        columnName: "shuoming1",
        type: "text",
        isupd: true
      },
      {
        text: "开锁孔数据说明",
        width: "1500rpx",
        columnName: "shuoming2",
        type: "text",
        isupd: true
      },
    ],
    shengchan_list:['已完成','未完成'],
    pinyin:'',
  },

  bindPickerChange: function (e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      shengchan: _this.data.shengchan_list[e.detail.value]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo
    })
    var e = ['','']
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    var sql = ''
    if(_this.data.userInfo.power == '管理员'){
      sql = "select id,insert_date,boli.order_number,pinyin,gongyingshang,boli_yanse,boli_shenjiagong,num,height,width,shengchan,beizhu,shendan,shuoming1,shuoming2 from boli_xiadan as boli left join (select order_number,shendan,insert_date from lvkuang_xiadan group by order_number,shendan,insert_date) as lvkuang on boli.order_number = lvkuang.order_number where pinyin like '%" + e[0] + "%' and isnull(shengchan,'') like '%" + e[1]+"%'"
    }else if(_this.data.userInfo.power=='玻璃厂'){
      sql = "select id,insert_date,boli.order_number,pinyin,gongyingshang,boli_yanse,boli_shenjiagong,num,height,width,shengchan,beizhu,shendan,shuoming1,shuoming2 from boli_xiadan as boli left join (select order_number,shendan,insert_date from lvkuang_xiadan group by order_number,shendan,insert_date) as lvkuang on boli.order_number = lvkuang.order_number where gongyingshang = '" + _this.data.userInfo.name + "' and pinyin like '%" + e[0] + "%' and isnull(shengchan,'') like '%" + e[1] + "%' and shendan = '通过'"
    }else{
      sql = "select id,insert_date,boli.order_number,pinyin,gongyingshang,boli_yanse,boli_shenjiagong,num,height,width,shengchan,beizhu,shendan,shuoming1,shuoming2 from boli_xiadan as boli left join (select order_number,shendan,insert_date from lvkuang_xiadan group by order_number,shendan,insert_date) as lvkuang on boli.order_number = lvkuang.order_number where pinyin like '%" + e[0] + "%' and isnull(shengchan,'') like '%" + e[1] + "%' and shendan = '通过'"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      xgShow2: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  clickView:function(e){
    var _this = this
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var order_number = _this.data.list[e.currentTarget.dataset.index].order_number
    console.log(index)
    console.log(column)
    if(column == "shengchan"){
      if(_this.data.userInfo.power == '管理员' || _this.data.userInfo.power == '玻璃厂'){

      }else{
        wx.showToast({
          title: '非管理员或玻璃厂账号，无生产权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        id: _this.data.list[e.currentTarget.dataset.index].id,
        this_column: column,
        xgShow:true,
        yes_click: '已完成',
        no_click: '未完成',
      })
    }else if(column == "beizhu" || column == "shuoming1" || column == "shuoming2" ){
      if(_this.data.userInfo.power == '管理员' || _this.data.userInfo.power == '玻璃厂'){

      }else{
        wx.showToast({
          title: '非管理员或玻璃厂账号，无修改权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        id: _this.data.list[e.currentTarget.dataset.index].id,
        this_column:e.currentTarget.dataset.column,
        this_value:e.currentTarget.dataset.value,
        xgShow2:true,
      })
    }

  },

  yes_click:function(){
    var _this = this
    var sql = "update boli_xiadan set " + _this.data.this_column + "='" + _this.data.yes_click + "' where id="+ _this.data.id
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '完成！',
          icon: 'none',
          duration: 3000
        })
        var e = ['','']
        _this.tableShow(e)
        _this.qxShow()
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  no_click:function(){
    var _this = this
    var sql = "update boli_xiadan set " + _this.data.this_column + "='" + _this.data.no_click + "' where id="+ _this.data.id
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '完成！',
          icon: 'none',
          duration: 3000
        })
        var e = ['','']
        _this.tableShow(e)
        _this.qxShow()
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      username: '', 
      password: '',
      pinyin:'',
      name: '',
      power: '',
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  back:function(){
    wx.navigateBack({ 
      delta: 1
    });
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      customer:"",
      leibie:"",
      area:"",
      shengchan:""
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.pinyin,_this.data.shengchan]
    _this.tableShow(e)
    _this.qxShow()
  },

  upd1:function(){
    var _this = this
    var id = _this.data.id
    var this_column = _this.data.this_column
    var this_value = _this.data.this_value
    var sql = "update boli_xiadan set " + this_column + "='" + this_value + "' where id=" + id
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '完成！',
          icon: 'none',
          duration: 3000
        })
        var e = ['','']
        _this.tableShow(e)
        _this.qxShow()
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
    _this.setData({
      xgShow2:false,
    })
  },


  out_put:function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    if(list.length == 0){
      wx.showToast({
        title: '无可导出数据，请查询后再试！',
        icon: 'none'
      })
      return;
    }

    var title = _this.data.title
    var cloudList = {
      name : '玻璃下单明细',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:parseInt(title[i].width.split("r")[0]),
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
