const util = require("../utils/util");
const PrintUtil = require('../utils/printutil')
const app = getApp();
var tsc = require("../utils/tsc.js");
var encode = require("../utils/encoding.js");
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    qr_code:'',
    gongsi: '',
    userInfo: [],
    list: [],
    order_id: "",
    systemArray: ['入库', '出库'],
    out_in_type: '选择单据类型',
    order_array: [],
    order_number: '选择单号',
    width_user_all: 100,
    width_user: 100,
    height_user: 100,
    currentPrint: 1,
    printerNum: 1,
    oneTimeData: 0,
    looptime: 0,
    mask_hid: true,
    updComment_hid: true,
    imageSrc:'../../images/wechat.jpg',
    errMsgs: {
      "10003": "连接失败，重开蓝牙试试~",
      "10012": "连接超时，重开蓝牙试试~",
      "10009": "手机版本不支持",
      "10004": "设备不支持",
      "10005": "设备不支持"
    },

    isConn: false,
    blueList: [],
    option: {
      deviceId: "",
      serviceId: "",
      characteristicId: ""
    },

    startTime: 0,
    endTime: 0
  },

  setCanvas: function (comment_order) {
    var _this = this;
    var order1 = _this.data.order1
    var order2 = _this.data.order2
    var width_all = _this.data.width_user_all
    var width = _this.data.width_user
    var height = _this.data.height_user
    // console.log(order2)
    console.log(width_all)
    console.log(width)
    console.log(height)
    const ctx = wx.createCanvasContext('outCanvas')

    console.log('赋值前')

    ctx.setFillStyle("white")
    ctx.fillRect(0, 0, width, height)

    ctx.setTextAlign('center')
    ctx.setFillStyle('#000000')

    ctx.setFontSize(12)
    ctx.setTextAlign('left')
    ctx.fillText('天龙五金灯控系统', 120, 20)
    ctx.setTextAlign('left')
    ctx.fillText('客户：' + order1.khmc, 0, 40)
    ctx.setTextAlign('left')
    ctx.fillText('日期：' + order1.xdrq, 100, 40)
    ctx.setTextAlign('left')
    ctx.fillText( order1.djbh, 240, 40)
    ctx.setTextAlign('left')
    ctx.fillText('安装地址：' + order1.azdz, 0, 60)

    var this_height = 80
    var this_column = 1
    var lvxingcai =""
    for(var i=0; i<order2.length; i++){
      ctx.setTextAlign('left')
      if(order2[i].fj == '房间柜号'){
        this_column = 1
        ctx.fillText(order2[i].gh, 0, this_height)
        this_height = this_height + 20
      }else if(order2[i].fj == '铝型材'){
        this_column = 1
        lvxingcai = order2[i].gh +"  "+ order2[i].lcys +"  "+ order2[i].gy +"  "+ order2[i].ddcd+"  "+ order2[i].sl 
        console.log(lvxingcai)
        ctx.fillText(lvxingcai, 0, this_height)
        console.log(lvxingcai.length)
        // ctx.fillText(order2[i].gh, 0, this_height)
       
        // ctx.fillText(order2[i].lcys, 140, this_height)
        // ctx.fillText(order2[i].gy, 200, this_height)
        // ctx.fillText(order2[i].ddcd, 280, this_height)
        // ctx.fillText(order2[i].sl, 320, this_height)
        this_height = this_height + 20
      }else{
        if(this_column == 1){
          ctx.fillText(order2[i].gh, 0, this_height)
          ctx.fillText(order2[i].sl, 140, this_height)
          this_column = this_column + 1
        }else{
          ctx.fillText(order2[i].gh, 200, this_height)
          ctx.fillText(order2[i].sl, 320, this_height)
          this_column = 1
          this_height = this_height + 20
        }
      }
    }
    var canvasWidth = _this.data.width_user
    var canvasHeight = _this.data.height_user
    ctx.draw(false,()=>{
      wx.canvasToTempFilePath({
        canvasId: 'outCanvas',
        fileType:'jpg',
        width:canvasWidth,
        height:canvasHeight,
        destWidth:canvasWidth,
        destHeight:canvasHeight,
        success: function (res) {
          // res.tempFilePath 包含生成的图片文件路径
          console.log(res.tempFilePath);
        }
      })
    })
  },



  getUserInfo: function () {
    var _this = this;
    var length = 300
    wx.getSystemInfo({
      success: res => {
        _this.setData({
          width_user_all: res.windowWidth,
          width_user: res.windowWidth * 0.98,
          height_user: length
        })
        console.log("宽")
        console.log(_this.data.width_user)
        console.log("高")
        console.log(_this.data.height_user)
      },
    })
  },

  getTime: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

    return year + "-" + month + "-" + day + " " + hour + ":" + minute
  },

  updComment_show: function () {
    var _this = this;
    _this.setData({
      mask_hid: false,
      updComment_hid: false
    })
  },

  hid_view: function () {
    this.setData({
      mask_hid: true,
      updComment_hid: true
    })
  },

  updComment: function (e) {
    var _this = this;
    _this.hid_view()
    var value = e.detail.value.comment_order
    _this.setCanvas(value)
  },




  //初始化蓝牙适配器
  openBluetoothAdapter: function () {
    var _this = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log("初始化蓝牙适配器状态");
        console.log(res);
        wx.startBluetoothDevicesDiscovery({
          powerLevel: "medium",
          success: res => {
            console.log("开始搜索=>", res)
            wx.onBluetoothDeviceFound(res => {
              console.log(res)
              var blueList = _this.data.blueList;
              if (blueList.length != 0) {
                for (let i = 0; i < res.devices.length; i++) {
                  if (res.devices[i].name != "") {
                    for (let j = 0; j < blueList.length; j++) {
                      if (res.devices[i].deviceId != blueList[j].deviceId) {
                        blueList.push(res.devices[i])
                      }
                    }
                  }
                }
              } else {
                for (let i = 0; i < res.devices.length; i++) {
                  if (res.devices[i].name != "") {
                    blueList.push(res.devices[i])
                  }
                }
              }
              _this.setData({
                blueList
              })
              console.log(blueList)
            })
          }
        })
      },
      fail: res => {
        if (res.errCode != undefined) {
          if (res.errCode == 10001) {
            wx.showToast({
              title: '本机蓝牙未打开',
              duration: 2000,
              icon: 'none'
            })
          }
        }
        if (res.state != undefined) {
          if (res.state == 4) {
            wx.showToast({
              title: '本机蓝牙未打开',
              duration: 2000,
              icon: 'none'
            })
          }
        }
      }
    })
  },

  choiceBlue: function (e) {
    var _this = this;
    console.log(e.currentTarget.dataset.serviceid)
    console.log(e.currentTarget.dataset.deviceid)
    console.log(e.currentTarget.dataset.serviceid)
    var deviceId = e.currentTarget.dataset.deviceid;
    var serviceId = e.currentTarget.dataset.serviceid
    wx.showToast({
      title: '正在连接',
      icon: 'none',
      duration: 2000
    })
    wx.createBLEConnection({
      deviceId,
      timeout: 10000,
      success: res => {
        console.log("连接蓝牙低功耗设备=>" + res)
        wx.stopBluetoothDevicesDiscovery({
          success: res => {
            console.log("停止搜索=>", res)
          },
          complete: res => {
            setTimeout(function () {
              _this.getOptions(deviceId, serviceId)
            }, 1000)
          }
        })
      },
      fail: res => {
        console.log(res)
        if (res.errCode == -1) {
          setTimeout(function () {
            _this.getOptions(deviceId, serviceId)
          }, 500)
        }
        wx.showToast({
          title: errMsgs[res.errCode],
          icon: "none",
          duration: 2000
        })
      }
    })
  },

  getOptions: function (deviceId, serviceId) {
    var _this = this;
    console.log(deviceId)
    console.log(serviceId)
    wx.getBLEDeviceServices({
      deviceId,
      success: res => {
        console.log("获取蓝牙低功耗设备所有服务=>" + res)
        var this_list = res.services
        console.log(this_list)
        // for(var i=0; i<this_list.length; i++){
        if (this_list[0].isPrimary) {
          var sId = this_list[0].uuid
          wx.getBLEDeviceCharacteristics({
            deviceId,
            serviceId: sId,
            success: res => {
              console.log(res)
              for (let i = 0; i < res.characteristics.length; i++) {
                if (res.characteristics[i].properties.write) {
                  _this.setData({
                    option: {
                      deviceId,
                      serviceId: sId,
                      characteristicId: res.characteristics[i].uuid
                    },
                    isConn: true,
                    blueList: []
                  })
                  return;
                }
              }
              wx.showToast({
                title: _this.data.errMsgs[10004],
                icon: 'none',
                duration: 2000
              })
            },
            fail: res => {
              console.log(res)
            }
          })
        }
        // }
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  //打印按钮click事件
  save: function () {
    var _this = this;
    if (!_this.data.isConn) {
      wx.showToast({
        title: '蓝牙未连接',
        icon: 'none'
      })
      return;
    } else {
      _this.printTo()
    }
  },

  labelTest: function () { //标签测试
    var that = this;
    var _this = this
    var canvasWidth = that.data.canvasWidth
    var canvasHeight = that.data.canvasHeight    
    var order1 = _this.data.order1
    var order2 = _this.data.order2
    var command = tsc.jpPrinter.createNew()
    command.setCls()//清除缓冲区，防止下一个没生效
    command.setSize(80, 30)//设置标签大小，单位mm.具体参数请用尺子量一下
    command.setGap(0)//设置两个标签之间的间隙，单位mm.具体参数请用尺子量一下
    command.setCls()//清除缓冲区
    // command.setBox(10, 10, 464, 230, 5)//绘制一个边框
    // command.setBar(10, 75, 455, 5);//绘制一条黑线
    command.setText(150, 20, "TSS24.BF2", 0, 3, 3, "天龙五金灯控系统")//绘制文字
    command.setText(10, 50, "TSS24.BF2", 0, 2, 2, '客户：' + order1.khmc)//绘制文字
    command.setText(180, 50, "TSS24.BF2", 0, 2, 2, '日期：' + order1.xdrq)//绘制文字
    command.setText(360, 50, "TSS24.BF2", 0, 2, 2, order1.djbh)//绘制文字
    command.setText(10, 70, "TSS24.BF2", 0, 2, 2, '安装地址：' + order1.azdz)//绘制文字
    // command.setText(340, 20, "TSS24.BF2", 0, 2, 2, "8 元")//绘制文字
    // command.setText(360, 40, "TSS24.BF2", 0, 1, 1, ".8")//绘制文字
    // command.setText(50, 100, "TSS24.BF2", 0, 1, 1, "单位：______")//绘制文字
    // command.setText(140, 90, "TSS24.BF2", 0, 1, 1, "包")//绘制文字
    // command.setText(50, 140, "TSS24.BF2", 0, 1, 1, "重量：______")//绘制文字
    // command.setText(140, 130, "TSS24.BF2", 0, 1, 1, "500g")//绘制文字
    // command.setText(50, 170, "TSS24.BF2", 0, 1, 1, "条码:")//绘制文字
    // command.setBarCode(120, 170, "128", 48, 0, 0, 2, 2, "12345678")//绘制code128条码
    // command.setBar(300, 80, 5, 150);//绘制一条黑线
    // command.setQrcode(320, 90, "L", 5, "A", "http://www.howbest.cn/cn/")//绘制一个二维码
    command.setPagePrint()//执行打印指令
    that.setData({
      isLabelSend: true
    })
    that.prepareSend(command.getData())
  },

  printPhoto: function () {//打印bitmap，图片内容不建议太大，小程序限制传输的字节数为20byte
    var that = this;
    var canvasWidth = that.data.width_user
    var canvasHeight = that.data.height_user
    console.log("宽")
    console.log(canvasWidth)
    console.log("高")
    console.log(canvasHeight)
    var command = tsc.jpPrinter.createNew()
    command.setCls()
    command.setSize(30, 30)
    command.setGap(0)
    command.setCls()
    wx.canvasGetImageData({
      canvasId: 'outCanvas',
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      success: function (res) {
        console.log("pic:")
        console.log(res)
        console.log("获取画布数据成功")
        command.setBitmap(0, 0, 0, res)
        command.setPrint(1)
        that.prepareSend(command.getData())//发送数据
      },
      complete: function (res) {
        console.log("finish")
      },
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '获取画布数据失败',
          icon: 'none',
        })
      }
    })
  },

  printJPGPhoto: function () {
    var that = this;
    var canvasWidth = that.data.width_user
    var canvasHeight = that.data.height_user
    //抖动处理JPG图片
    const cfg = {
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
    }
    wx.canvasGetImageData({
      canvasId: 'outCanvas',
      ...cfg,
      success: (res) => {
        //const data = convertToGrayscale(res.data)
        const data = convertToMonoImage(res.width, res.height, res.data, true);
        wx.canvasPutImageData({
          canvasId: 'outCanvas',
          data,
          ...cfg,
          success: (res) => {
            console.log(res)
            console.log('deal graphic width: ' + cfg.width)
            console.log('deal graphic width: ' + cfg.height)
            that.printerJPG();
          },
          fail: (err) => {
            console.error(err)
          }
        })
      },
      fail: (err) => {
        console.error(err)
      }
    })
  },
  printerJPG: function () {
    var that = this;
    var canvasWidth = that.data.width_user
    var canvasHeight = that.data.height_user
    var command = tsc.jpPrinter.createNew()
    command.setCls()
    command.setSize(30, 30)
    command.setGap(0)
    command.setCls()
    wx.canvasGetImageData({
      canvasId: 'outCanvas',
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      success: function (res) {
        console.log("获取画布数据成功")
        command.setBitmap(60, 0, 1, res)
        command.setPrint(1)
        that.prepareSend(command.getData())//发送数据
      },
      complete: function (res) {
        console.log("finish")
      },
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '获取画布数据失败',
          icon: 'none',
        })
      }
    })
  },

  prepareSend: function (buff) { //准备发送，根据每次发送字节数来处理分包数量
    //console.log(buff)
    var that = this
    var time = that.data.oneTimeData
    var looptime = parseInt(buff.length / time);
    var lastData = parseInt(buff.length % time);
    //console.log(looptime + "---" + lastData)
    that.setData({
      looptime: looptime + 1,
      lastData: lastData,
      currentTime: 1,
    })
    that.Send(buff)
  },

  Send: function (buff) { //分包发送
    var that = this
    var _this = this
    var currentTime = that.data.currentTime
    var loopTime = that.data.looptime
    var lastData = that.data.lastData
    var onTimeData = that.data.oneTimeData
    var printNum = that.data.printerNum
    var currentPrint = that.data.currentPrint
    var buf
    var dataView
    if (currentTime < loopTime) {
      buf = new ArrayBuffer(onTimeData)
      dataView = new DataView(buf)
      for (var i = 0; i < onTimeData; ++i) {
        dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
      }
    } else {
      buf = new ArrayBuffer(lastData)
      dataView = new DataView(buf)
      for (var i = 0; i < lastData; ++i) {
        dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
      }
    }
    //console.log("第" + currentTime + "次发送数据大小为：" + buf.byteLength)
    console.log(_this.data.option.deviceId)
    console.log(_this.data.option.serviceId)
    console.log(_this.data.option.characteristicId)
    console.log(buf)
    wx.writeBLECharacteristicValue({
      deviceId: _this.data.option.deviceId,
      serviceId: _this.data.option.serviceId,
      characteristicId: _this.data.option.characteristicId,
      value: buf,
      success: function (res) {
        if (currentPrint == printNum) {
          wx.showToast({
            title: '已打印第' + currentPrint + '张成功',
          })
        }
        //console.log(res)
      },
      fail: function (e) {
        wx.showToast({
          title: '打印第' + currentPrint + '张失败',
          icon: 'none',
        })

        //console.log(e)
      },
      complete: function () {
        currentTime++
        if (currentTime <= loopTime) {
          that.setData({
            currentTime: currentTime
          })
          that.Send(buff)
        } else {
          // wx.showToast({
          //   title: '已打印第' + currentPrint + '张',
          // })`
          if (currentPrint == printNum) {
            that.setData({
              looptime: 0,
              lastData: 0,
              currentTime: 1,
              isLabelSend: false,
              currentPrint: 1
            })
          } else {
            currentPrint++
            that.setData({
              currentPrint: currentPrint,
              currentTime: 1,
            })
            that.Send(buff)
          }
        }
      }
    })
  },

  printTo : function(){
    var _this = this;
    var order1 = _this.data.order1
    var order2 = _this.data.order2
    wx.showLoading({
      title: '正在写入...',
    })

    let printUtil = new PrintUtil(1000, 1);
    var height = 20
    printUtil.setFontWidthAndHeight(1, 1);
    printUtil.printlnText(4, 200, height, '天龙五金灯控系统' );
    height = height + 40
    printUtil.printlnText(4, 15, height, '客户：' + order1.khmc);
    height = height
    printUtil.printlnText(4, 200, height, '日期：' + order1.xdrq);
    height = height
    printUtil.printlnText(4, 420, height,  order1.djbh);
    height = height + 40
    printUtil.printlnText(4, 15, height, '安装地址：' + order1.azdz);
    height = height + 40

    var this_column = 1
    var lxingcai=""
    for(var i=0; i<order2.length; i++){
      if(order2[i].fj == '房间柜号'){
        this_column = 1
        printUtil.printlnText(4, 15, height, order2[i].gh);
        height = height + 40
      }else if(order2[i].fj == '铝型材'){
        this_column = 1
        lxingcai = order2[i].gh +"  " + order2[i].lcys + "  " +order2[i].gy+"  "+ order2[i].ddcd +"  "+order2[i].sl
        printUtil.printlnText(4, 15, height, lxingcai);
        console.log(lxingcai.length)
        if(lxingcai.length > 40){
          height = height + 10
        }
        // printUtil.printlnText(4, 0, height, order2[i].gh);
        // printUtil.printlnText(4, 280, height, order2[i].lcys);
        // printUtil.printlnText(4, 380, height, order2[i].gy);
        // printUtil.printlnText(4, 530, height, order2[i].ddcd);
        // printUtil.printlnText(4, 580, height, order2[i].sl);
        height = height + 40
      }else{
        if(this_column == 1){
          printUtil.printlnText(4, 15, height, order2[i].gh);
          printUtil.printlnText(4, 250, height, order2[i].sl);
          this_column = this_column + 1
        }else{
          printUtil.printlnText(4, 350, height, order2[i].gh);
          printUtil.printlnText(4, 560, height, order2[i].sl);
          this_column = 1
          height = height + 40
        }
      }
    }

    printUtil = new PrintUtil(height, 1);
    var height = 20
    printUtil.setFontWidthAndHeight(1, 1);
    printUtil.printlnText(4, 200, height, '天龙五金灯控系统' );
    height = height + 40
    printUtil.printlnText(4, 15, height, '客户：' + order1.khmc);
    height = height
    printUtil.printlnText(4, 200, height, '日期：' + order1.xdrq);
    height = height
    printUtil.printlnText(4, 420, height,  order1.djbh);
    height = height + 40
    printUtil.printlnText(4, 15, height, '安装地址：' + order1.azdz);
    height = height + 40

    var this_column = 1
    var lxingcai =""
    for(var i=0; i<order2.length; i++){
      if(order2[i].fj == '房间柜号'){
        this_column = 1
        printUtil.printlnText(4, 15, height, order2[i].gh);
        height = height + 40
      }else if(order2[i].fj == '铝型材'){
        this_column = 1
        lxingcai = order2[i].gh +"  " + order2[i].lcys + "  " +order2[i].gy+"  "+ order2[i].ddcd +"  "+order2[i].sl
        printUtil.printlnText(4, 15, height, lxingcai);
        if(lxingcai.length > 40){
          height = height + 10
        }
        // printUtil.printlnText(4, 0, height, order2[i].gh);
        // printUtil.printlnText(4, 280, height, order2[i].lcys);
        // printUtil.printlnText(4, 380, height, order2[i].gy);
        // printUtil.printlnText(4, 530, height, order2[i].ddcd);
        // printUtil.printlnText(4, 580, height, order2[i].sl);
        height = height + 40
      }else{
        if(this_column == 1){
          printUtil.printlnText(4, 15, height, order2[i].gh);
          printUtil.printlnText(4, 250, height, order2[i].sl);
          this_column = this_column + 1
        }else{
          printUtil.printlnText(4, 350, height, order2[i].gh);
          printUtil.printlnText(4, 560, height, order2[i].sl);
          this_column = 1
          height = height + 40
        }
      }
    }

    let buffer = printUtil.getData();
    const maxChunk = 20;
    const delay = 20;
    for (let c = 0; c < buffer.length; c++) {
      for (let i = 0, j = 0, length = buffer[c].byteLength; i < length; i += maxChunk, j++) {
        let subPackage = buffer[c].slice(i, i + maxChunk <= length ? (i + maxChunk) : length);
        console.log(subPackage)
        setTimeout(this._writeBLECharacteristicValue, delay, subPackage);
      }
    }
    wx.hideLoading();
  },

  _writeBLECharacteristicValue(buffer) {
    var _this = this
    var option = _this.data.option
    wx.writeBLECharacteristicValue({
      deviceId: option.deviceId,
      serviceId: option.serviceId,
      characteristicId: option.characteristicId,
      value: buffer,
      success(res) {
        console.log('writeBLECharacteristicValue success', res)
      },
      fail(res) {
        console.log('writeBLECharacteristicValue fail', res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var order1 = JSON.parse(options.order1)
    var order2 = JSON.parse(options.order2)
    console.log(order1)
    console.log(order2)
    _this.setData({
      order1,
      order2
    })
    var height = 300
    _this.getUserInfo(height)
    _this.setCanvas()
    // _this.initPhoto()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var list = []
    var numList = []
    var j = 0
    for (var i = 20; i < 200; i += 10) {
      list[j] = i;
      j++
    }
    for (var i = 1; i < 10; i++) {
      numList[i - 1] = i
    }
    this.setData({
      buffSize: list,
      oneTimeData: list[0],
      printNum: numList,
      printerNum: numList[0]
    })
  },

  initPhoto: function () {//初始化画布数据
    //创建一个png格式
    var that = this
    const ctx_out = wx.createCanvasContext('outCanvas', this);
    var png = that.data.imageSrc;
    wx.getImageInfo({
      src: png,
      success(res) {
        console.log(res)
        that.setData({
          canvasWidth: res.width,
          canvasHeight: res.height,
        });
        console.log("画布宽度" + res.width, "画布高度" + res.height);
        // ctx_out.setFillStyle('#ffffff')
        // ctx_out.setStrokeStyle('rgba(1,1,1,0)')
        // ctx_out.fill()
        //ctx_out.drawImage(png, 0, 0, res.width, res.height);
        ctx_out.drawImage(png, 0, 0);
        ctx_out.draw();
      }
    })
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
    wx.closeBluetoothAdapter({
      success: res => {
        console.log("关闭蓝牙模块")
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.stopBluetoothDevicesDiscovery({
      success: res => {
        console.log("停止搜索=>", res)
      }
    })
    wx.closeBluetoothAdapter({
      success: res => {
        console.log("关闭蓝牙模块")
      }
    })
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

// 彩色图转成单色图
function convertToMonoImage(width, height, data, shake) {
  let g = 0
  let e = 0

  for (let i = 0; i < data.length; i += 4) {
    data[i] = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11);
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let dataOffset = (width * y + x) * 4;
      g = data[dataOffset];
      if (g >= 150) {  // 灰色转黑白的阈值, 可以调整打印效果
        e = g - 255;
        setPixel(data, dataOffset, 255);
      } else {
        e = g;
        setPixel(data, dataOffset, 0);
      }

      if (!shake)
        continue;

      if (x < width - 1 && y < height - 1) {
        //右边像素处理
        data[(width * y + x + 1) * 4] += 7 * e / 16;
        //下
        data[(width * (y + 1) + x) * 4] += 5 * e / 16;
        //右下
        data[(width * (y + 1) + x + 1) * 4] += e / 16;
        //左下
        if (x > 0) {
          data[(width * (y + 1) + x - 1) * 4] += 3 * e / 16;
        }
      } else if (x == width - 1 && y < height - 1) {
        //下方像素处理
        data[(width * (y + 1) + x) * 4] += 5 * e / 16;
      } else if (x < width - 1 && y == height - 1) {
        //右边像素处理
        data[(width * y + x + 1) * 4] += 7 * e / 16;
      }
    }
  }
  return data
}

function setPixel(data, offset, value) {
  data[offset] = value;
  data[offset + 1] = value;
  data[offset + 2] = value;
}
