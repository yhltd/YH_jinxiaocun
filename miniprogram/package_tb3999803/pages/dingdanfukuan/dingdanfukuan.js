Page({

  /**
   * 页面的初始数据
   */
  cxShow: false,
  xgShow: false,
  data: {
    list: [],
    title: [{
      text: "订单号",
      width: "250rpx",
      columnName: "productionNO",
      type: "text",
      isupd: true
    }, {
      text: "客户名称",
      width: "250rpx",
      columnName: "customerName",
      type: "text",
      isupd: true
    }, {
      text: "终端用户",
      width: "250rpx",
      columnName: "user",
      type: "text",
      isupd: true
    }, {
      text: "订单金额",
      width: "250rpx",
      columnName: "orderMoney",
      type: "text",
      isupd: true
    }, {
      text: "已付款",
      width: "250rpx",
      columnName: "shoukuan",
      type: "text",
      isupd: true
    }, {
      text: "欠款",
      width: "250rpx",
      columnName: "qiankuan",
      type: "text",
      isupd: true
    },
    {
      text: "是否付款",
      width: "250rpx",
      columnName: "shifoufukuan",
      type: "text",
      isupd: true
    }
  ],
    id: '',
    productionNO: '',
    customerName: '',
    user: '',
    orderMoney: '',
    shoukuan: '',
    qiankuan: '',
    shifoufukuan: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo: userInfo,
    })

    var e = ['', '', '']
    _this.tableShow(e)
  },

  bindPickerChange: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.gongxu_list[e.detail.value]
    })
  },

  choiceDate: function (e) {
    var _this = this
    console.log(e)
    _this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    sql = "select id,isnull(productionNO,'') as productionNO,isnull(customerName,'') as customerName,isnull([user],'') as [user],isnull(orderMoney,'') as orderMoney,isnull(dingjin,'') as shoukuan,convert(float,isnull(orderMoney,0)) - convert(float,isnull(dingjin,0)) as qiankuan,isnull(shifoufukuan,'') as shifoufukuan from madeOrder where orderState!='出库' and convert(float,isnull(orderMoney,0)) - convert(float,isnull(dingjin,0)) > 0 and productionNO like '%" + e[0] + "%' and customerName like '%" + e[1] + "%' and [user] like '%" + e[2] + "%'"
    var userInfo = _this.data.userInfo
    if (userInfo.quanxian == '客户') {
      sql = sql + " and customerName like '" + userInfo.name + "'"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        console.log(list)
        _this.setData({
          list: list,
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
      },
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      cxShow: false,
      xgShow: false,
      id: '',
      productionNO: '',
      customerName: '',
      user: '',
      orderMoney: '',
      shoukuan: '',
      qiankuan: '',
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
      id: '',
      productionNO: '',
      customerName: '',
      user: '',
      orderMoney: '',
      shoukuan: '',
      qiankuan: '',
    })
  },

  sel1: function () {
    var _this = this
    var e = [_this.data.productionNO, _this.data.customerName, _this.data.user]
    _this.tableShow(e)
    _this.qxShow()
  },

  clickView: function (e) {
    var _this = this
    console.log(e)
    _this.setData({
      xgShow: true,
      index: e.currentTarget.dataset.index,
      id: _this.data.list[e.currentTarget.dataset.index].id
    })
  },

  click_01: function () {
    var _this = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res)
        console.log(res.tempFiles)
        wx.compressImage({
          src: res.tempFiles[0].tempFilePath, // 图片路径
          quality: 50, // 压缩质量
          success: function (res) {
            console.log(res.tempFilePath)
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePath, //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: res => { //成功的回调
                console.log('data:image/png;base64,' + res.data)
                var sql = "update shoukuanma set pic = '" + res.data + "' where id=1"
                console.log(sql)
                wx.cloud.callFunction({
                  name: 'sqlServer_tb3999803',
                  data: {
                    query: sql
                  },
                  success: res => {
                    console.log(res)
                    wx.showToast({
                      title: '完成！',
                      icon: 'none',
                      duration: 3000
                    })
                    var e = ['', '', '']
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
                _this.qxShow()
              }
            })
          },
          fail: function (res) {
            console.log(res)
          },
        })
      }
    })
  },

  click_02: function () {
    var _this = this
    var sql = "select * from shoukuanma where id=1"
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var base_64 = res.result.recordsets[0][0].pic
        if(base_64 == '' || base_64 == null){
          wx.showToast({
            title: '未读取到已上传的二维码',
            icon: 'none',
          })
        }else{
          _this.base64ImageHandle(base_64)
          var e = ['','','']
          _this.tableShow(e)
          _this.qxShow()
        }
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
    var id = _this.data.id
    var sql = "update madeOrder set shifoufukuan='已付款' where id = " + _this.data.id
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '已设置为付款',
          icon: 'none',
          duration: 3000
        })
        var e = ['','','']
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

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  /** base64图片保存 */

  base64ImageHandle(base64) {

    // 指定图片的临时路径

    const path = `${wx.env.USER_DATA_PATH}/` + getNowDate() + `.png`

    // 获取小程序的文件系统

    const fsm = wx.getFileSystemManager()

    // 把arraybuffer数据写入到临时目录中

    fsm.writeFile({

      filePath: path,

      data: base64.replace(/^data:image\/\w+;base64,/, ''),

      encoding: 'base64',

      success: () => {

        wx.showModal({

          title: '保存图片',

          content: '保存图片到手机相册？',

          confirmColor: '#be3a34',

          success: (result) => {

            if (result.confirm) {

              // 把临时路径下的图片，保存至相册

              wx.saveImageToPhotosAlbum({

                filePath: path,

                success: () => {
                  
                  wx.showToast({
                    title: '保存成功！',
                    icon: 'none',
                    duration: 3000
                  })

                }

              })

            }

          }

        })

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

function getNowDate() {
  var date = new Date();
  var sign1 = "/";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  // if (month >= 1 && month <= 9) {
  //  month = "0" + month;
  // }
  // if (day >= 0 && day <= 9) {
  //  day = "0" + day;
  // }
  // if (hour >= 0 && hour <= 9) {
  //  hour = "0" + hour;
  // }
  // if (minutes >= 0 && minutes <= 9) {
  //  minutes = "0" + minutes;
  // }
  // if (seconds >= 0 && seconds <= 9) {
  //  seconds = "0" + seconds;
  // }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = "" + year  + month  + day +  hour + minutes + seconds;
  return currentdate;
 }