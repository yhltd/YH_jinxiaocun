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
        text: "客户名称",
        width: "250rpx",
        columnName: "customer_name",
        type: "text",
        isupd: true
      },
      {
        text: "订单状态",
        width: "250rpx",
        columnName: "wancheng",
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
        text: "开料",
        width: "250rpx",
        columnName: "kailiao",
        type: "text",
        isupd: true
      },
      {
        text: "铣孔",
        width: "250rpx",
        columnName: "shunxu",
        type: "text",
        isupd: true
      },
      {
        text: "组装",
        width: "250rpx",
        columnName: "zuzhuang",
        type: "text",
        isupd: true
      },
      {
        text: "包装",
        width: "250rpx",
        columnName: "baozhuang",
        type: "text",
        isupd: true
      },
      {
        text: "订单号",
        width: "250rpx",
        columnName: "customer_number",
        type: "text",
        isupd: true
      },
      {
        text: "安装地址",
        width: "250rpx",
        columnName: "install_address",
        type: "text",
        isupd: true
      },
      {
        text: "联系电话",
        width: "250rpx",
        columnName: "phone",
        type: "text",
        isupd: true
      },
      {
        text: "送货地址",
        width: "250rpx",
        columnName: "shipping_address",
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
        text: "完成时间",
        width: "250rpx",
        columnName: "shendan",
        type: "text",
        isupd: true
      },
    ],
    title2: [
      {
        text: "下单日期",
        width: "250rpx",
        columnName: "insert_date",
        type: "text",
        isupd: true
      },
      {
        text: "客户名称",
        width: "250rpx",
        columnName: "customer_name",
        type: "text",
        isupd: true
      },
      {
        text: "订单状态",
        width: "250rpx",
        columnName: "wancheng",
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
        text: "开料",
        width: "250rpx",
        columnName: "kailiao",
        type: "text",
        isupd: true
      },
      {
        text: "铣孔",
        width: "250rpx",
        columnName: "shunxu",
        type: "text",
        isupd: true
      },
      {
        text: "组装",
        width: "250rpx",
        columnName: "zuzhuang",
        type: "text",
        isupd: true
      },
      {
        text: "包装",
        width: "250rpx",
        columnName: "baozhuang",
        type: "text",
        isupd: true
      },
      {
        text: "订单号",
        width: "250rpx",
        columnName: "customer_number",
        type: "text",
        isupd: true
      },
      {
        text: "安装地址",
        width: "250rpx",
        columnName: "install_address",
        type: "text",
        isupd: true
      },
      {
        text: "联系电话",
        width: "250rpx",
        columnName: "phone",
        type: "text",
        isupd: true
      },
      {
        text: "送货地址",
        width: "250rpx",
        columnName: "shipping_address",
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
        text: "完成时间",
        width: "250rpx",
        columnName: "shendan",
        type: "text",
        isupd: true
      },
    ],
    wancheng_list: ['未审验', '已审验','优先处理','推迟处理','完成'],
    wancheng: '',
    order_number: '',
    start_date: '',
    stop_date: '',
    customer_name:'',
    install_address:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var title = _this.data.title
    if(userInfo.power != '客户'){
      var title = _this.data.title2
    }
    _this.setData({
      userInfo: userInfo,
      title,
    })
    var e = ['','', '1900-01-01', '2100-12-31', '', '']
    _this.tableShow(e)

  },

  out_put4:function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list_out;
    if(list.length == 0){
      wx.showToast({
        title: '无可导出数据，请查询后再试！',
        icon: 'none'
      })
      return;
    }
    console.log(list)
    var title_put = [
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
      text: "客户名称",
      width: "250rpx",
      columnName: "customer_name",
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
      text: "加工状态",
      width: "250rpx",
      columnName: "jiagong",
      type: "text",
      isupd: true
    },
    {
      text: "完成时间",
      width: "250rpx",
      columnName: "shendan",
      type: "text",
      isupd: true
    }]
    console.log(title_put)
    var cloudList = {
      name : '铝材开料表',
      items : [],
      header : []
    }
    for(let i=0;i<title_put.length;i++){
      cloudList.header.push({
        item:title_put[i].text,
        type:title_put[i].type,
        width:parseInt(title_put[i].width.split("r")[0]),
        columnName:title_put[i].columnName
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
        var this_name = new Date().getTime() + ".xlsx"
        var fileId = res.result.fileID
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获得临时路径",res.tempFilePath)
            wx.getFileSystemManager().saveFile({
              tempFilePath: res.tempFilePath,
              filePath : wx.env.USER_DATA_PATH + "/" + getTime() + ".xlsx",
              success : res=> {
                let path_downLoad = res.savedFilePath
                console.log("下载完成",res)
                delCloudFile(fileId)
                wx.openDocument({
                  filePath: path_downLoad,
                  fileType : 'xlsx',
                  showMenu : true,
                  success : res=> {
                    wx.hideLoading({
                      success: (res) => {},
                    })
                    console.log("用户打开文件")
                  }
                })
              },
              fail: res=>{
                console.log(res)
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

  bindPickerChange: function (e) {
    var _this = this
    var column_name = e.target.dataset.column_name
    var list_name = e.target.dataset.list_name
    console.log(_this.data[list_name][e.detail.value])
    _this.setData({
      [column_name]: _this.data[list_name][e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    if (_this.data.userInfo.power == '客户') {
      sql = "select insert_date,customer_name,case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end as wancheng,order_number,kailiao,shunxu,zuzhuang,baozhuang,customer_number,install_address,phone,shipping_address,pinyin,shendan,case case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end when '优先处理' then '1' when '已审验' then '2' when '推迟处理' then '3' when '完成' then '4' else shunxu end as paixu from lvkuang_xiadan where customer_number like '%" + e[0] + "%' and customer_name like '%" + e[1] + "%' and insert_date >= '" + e[2] + "' and insert_date <= '" + e[3] + "' and customer_name ='" + _this.data.userInfo.name + "' and install_address like '%" + e[5] + "%' and case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end like '%" + e[4] + "%' group by insert_date,customer_name,wancheng,order_number,kailiao,shunxu,zuzhuang,baozhuang,customer_number,install_address,phone,shipping_address,pinyin,shendan order by paixu;select insert_date,order_number,customer_name,isnull(num,'') as num,height,width,'正在加工' as jiagong,'' as shendan from lvkuang_xiadan where customer_number like '%" + e[0] + "%' and insert_date >= '" + e[2] + "' and insert_date <= '" + e[3] + "' and customer_name ='" + _this.data.userInfo.name + "' and install_address like '%" + e[5] + "%' and case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end like '%" + e[4] + "%' and height != ''"
    } else{
      sql = "select insert_date,customer_name,case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end as wancheng,order_number,kailiao,shunxu,zuzhuang,baozhuang,customer_number,install_address,phone,shipping_address,pinyin,shendan,case case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end when '优先处理' then '1' when '已审验' then '2' when '推迟处理' then '3' when '完成' then '4' else shunxu end as paixu from lvkuang_xiadan where customer_number like '%" + e[0] + "%' and customer_name like '%" + e[1] + "%' and insert_date >= '" + e[2] + "' and insert_date <= '" + e[3] + "' and install_address like '%" + e[5] + "%' and case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end like '%" + e[4] + "%' group by insert_date,customer_name,wancheng,order_number,kailiao,shunxu,zuzhuang,baozhuang,customer_number,install_address,phone,shipping_address,pinyin,shendan order by paixu;select insert_date,order_number,customer_name,isnull(num,'') as num,height,width,'正在加工' as jiagong,'' as shendan from lvkuang_xiadan where customer_number like '%" + e[0] + "%' and customer_name like '%" + e[1] + "%' and insert_date >= '" + e[2] + "' and insert_date <= '" + e[3] + "' and install_address like '%" + e[5] + "%' and case when isnull(wancheng,'未审验') = '' then '未审验' else isnull(wancheng,'未审验') end like '%" + e[4] + "%' and height != ''"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordsets[0]
        console.log(list)
        console.log(res.result.recordsets[1])
        _this.setData({
          list: list,
          list_out: res.result.recordsets[1]
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

  upd1:function(e){
    var _this = this
    var sql = "update lvkuang_xiadan set " + _this.data.this_column + "='" + _this.data.this_value + "' where order_number='" + _this.data.order_number + "'"
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
        var e = ['','', '1900-01-01', '2100-12-31', '', '']
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

  clickView: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var order_number = _this.data.list[index].order_number
    console.log(order_number)
    console.log(index)
    console.log(column)
    if (column == "kailiao" || column == "shunxu" || column == "zuzhuang" || column == "baozhuang") {
      if (_this.data.userInfo.power == '管理员' || _this.data.userInfo.power == '操作员') {
        if(_this.data.userInfo.power == '操作员' && _this.data.list[e.currentTarget.dataset.index].wancheng == '完成'){
          wx.showToast({
            title: '此单已完成，不允许修改！',
            icon: 'none'
          })
          return;
        }
        _this.setData({
          order_number: _this.data.list[e.currentTarget.dataset.index].order_number,
          this_column: column,
          this_value:_this.data.list[e.currentTarget.dataset.index][column],
          xgShow2: true,
        })
      } else {
        wx.showToast({
          title: '无修改权限！',
          icon: 'none'
        })
        return;
      }
    } else if (column == "wancheng") {
      if (_this.data.userInfo.power == '管理员' || _this.data.userInfo.power == '操作员') {
        
      } else {
        wx.showToast({
          title: '无完成订单权限！',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        order_number: _this.data.list[index].order_number,
        this_column: column,
        xgShow: true,
        yes_click: '完成',
        no_click: '未完成',
      })
    }else {
      wx.showModal({
        title: '提示',
        content: '确认查看此条订单的明细信息？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../lvkuang_biaodan/lvkuang_biaodan?userInfo=' + JSON.stringify(_this.data.userInfo) + '&order_number=' + JSON.stringify(order_number)
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '已取消！',
              icon: 'none'
            })
            return;
          }
        }
      })
    }
  },

  click_01: function () {
    var _this = this
    var sql = "update lvkuang_xiadan set " + _this.data.this_column + "='已审验' where order_number='" + _this.data.order_number + "'"
    
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
        var e = ['','', '1900-01-01', '2100-12-31', '', '']
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

  click_02: function () {
    var _this = this
    var sql = "update lvkuang_xiadan set " + _this.data.this_column + "='未审验' where order_number='" + _this.data.order_number + "'"
    
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
        var e = ['','', '1900-01-01', '2100-12-31', '', '']
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

  click_03: function () {
    var _this = this
    var sql = "update lvkuang_xiadan set " + _this.data.this_column + "='优先处理' where order_number='" + _this.data.order_number + "'"
    
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
        var e = ['','', '1900-01-01', '2100-12-31', '', '']
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

  click_04: function () {
    var _this = this
    var sql = "update lvkuang_xiadan set " + _this.data.this_column + "='推迟处理' where order_number='" + _this.data.order_number + "'"
    
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
        var e = ['','', '1900-01-01', '2100-12-31', '', '']
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

  click_05: function () {
    var _this = this
    var sql = "update lvkuang_xiadan set " + _this.data.this_column + "='完成',shendan=convert(date,GETDATE()) where order_number='" + _this.data.order_number + "'"
    
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
        var e = ['','', '1900-01-01', '2100-12-31', '', '']
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
      id: '',
      username: '',
      password: '',
      pinyin: '',
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


  del1: function (e) {
    var _this = this
    var order_number = _this.data.list[e.currentTarget.dataset.index].order_number
    console.log(order_number)
    if (_this.data.userInfo.power == '管理员') {

    } else {
      wx.showToast({
        title: '非管理员账号，无删除订单权限！',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确认删除此条订单？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlserver_huaqun',
            data: {
              query: "delete from lvkuang_xiadan where order_number='" + order_number + "';delete from boli_xiadan where order_number='" + order_number + "'"
            },
            
            success: res => {
              _this.qxShow()
              var e = ['','', '1900-01-01', '2100-12-31', '', '']
              _this.tableShow(e)
              wx.showToast({
                title: '删除成功！',
                icon: 'none'
              })
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
        } else if (res.cancel) {

        }
      }
    })
  },

  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      order_number: "",
      start_date: "",
      stop_date: "",
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },



  sel1: function () {
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if (start_date == '') {
      start_date = '1900-01-01'
    }
    if (stop_date == '') {
      stop_date = '2100-12-31'
    }
    var e = [_this.data.order_number,_this.data.customer_name, start_date, stop_date, _this.data.wancheng,_this.data.install_address]
    _this.tableShow(e)
    _this.qxShow()
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

function getTime(){
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth()+1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth()+1);
  var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
  return year+"-"+month+"-"+day
}

function delCloudFile(fileId){
  var fileIds = [];
  fileIds.push(fileId);
  wx.cloud.deleteFile({
    fileList: fileIds,
    success: res => {
      console.log(res.fileList);
    },
    fail : console.error
  })
}