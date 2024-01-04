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
    var dayin_peizhi = _this.data.dayin_peizhi
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

    if(dayin_peizhi.P1 == '是'){
      ctx.fillText('客户：' + order1.khmc, 0, 40)
    }
    ctx.setTextAlign('left')
    if(dayin_peizhi.P2 == '是'){
      ctx.fillText('日期：' + order1.xdrq, 100, 40)
    }
    ctx.setTextAlign('left')
    if(dayin_peizhi.P3 == '是'){
      ctx.fillText( order1.djbh, 240, 40)
    }
    ctx.setTextAlign('left')
    if(dayin_peizhi.P4 == '是'){
      ctx.fillText('安装地址：' + order1.azdz, 0, 60)
    }
    ctx.fillText('安装地址：' + order1.azdz, 0, 60)

    var this_height = 80
    var danju_height = 240
    var this_column = 1
    var lvxingcai =""
    for(var i=0; i<order2.length; i++){
      ctx.setTextAlign('left')
      if(order2[i].fj == '房间柜号' && dayin_peizhi.P5 == '是'){
        this_column = 1
        ctx.fillText(order2[i].gh, 0, this_height)
        this_height = this_height + 20
        danju_height = danju_height + 60
      }else if(order2[i].fj == '铝型材' && dayin_peizhi.P6 == '是'){
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
        danju_height = danju_height + 60
      }else if(dayin_peizhi.P7 == '是'){
        if(this_column == 1){
          ctx.fillText(order2[i].gh, 0, this_height)
          ctx.fillText(order2[i].sl, 140, this_height)
          this_column = this_column + 1
        }else{
          ctx.fillText(order2[i].gh, 200, this_height)
          ctx.fillText(order2[i].sl, 320, this_height)
          this_column = 1
          this_height = this_height + 20
          danju_height = danju_height + 60
        }
      }
    }
    danju_height = danju_height + 60
    var canvasWidth = _this.data.width_user
    var canvasHeight = _this.data.height_user
    _this.setData({
      danju_height
    })
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
    var _this = this;
    if (!_this.data.isConn) {
      wx.showToast({
        title: '蓝牙未连接',
        icon: 'none'
      })
      return;
    }
    var canvasWidth = that.data.canvasWidth
    var canvasHeight = that.data.canvasHeight    
    var order1 = _this.data.order1
    var order2 = _this.data.order2
    var dayin_peizhi = _this.data.dayin_peizhi
    var command = tsc.jpPrinter.createNew()
    command.setCls()//清除缓冲区，防止下一个没生效
    command.setSize(105, _this.data.danju_height / 10)//设置标签大小，单位mm.具体参数请用尺子量一下
    command.setGap(0)//设置两个标签之间的间隙，单位mm.具体参数请用尺子量一下
    command.setCls()//清除缓冲区
    command.setText(280, 20, "TSS24.BF2", 0, 3, 3, "天龙五金灯控系统")//绘制文字
    if(dayin_peizhi.P1 == '是'){
      command.setText(10, 120, "TSS24.BF2", 0, 2, 2, '客户：' + order1.khmc)//绘制文字
    }

    if(dayin_peizhi.P2 == '是'){
      command.setText(400, 120, "TSS24.BF2", 0, 2, 2, '日期：' + order1.xdrq)//绘制文字
    }

    if(dayin_peizhi.P3 == '是'){
      command.setText(850, 120, "TSS24.BF2", 0, 2, 2, order1.djbh)//绘制文字
    }

    if(dayin_peizhi.P4 == '是'){
      command.setText(10,180, "TSS24.BF2", 0, 2, 2, '安装地址：' + order1.azdz)//绘制文字
    }

    var this_height = 240
    var this_column = 1
    var lvxingcai =""
    for(var i=0; i<order2.length; i++){
      if(order2[i].fj == '房间柜号' && dayin_peizhi.P5 == '是'){
        this_column = 1
        command.setText(10,this_height, "TSS24.BF2", 0, 2, 2, order2[i].gh)//绘制文字
        this_height = this_height + 60
      }else if(order2[i].fj == '铝型材'  && dayin_peizhi.P6 == '是'){
        this_column = 1
        lvxingcai = order2[i].gh +"  "+ order2[i].lcys +"  "+ order2[i].gy +"  "+ order2[i].ddcd+"  "+ order2[i].sl 
        console.log(lvxingcai)
        command.setText(10,this_height, "TSS24.BF2", 0, 2, 2, lvxingcai)//绘制文字
        this_height = this_height + 60
      }else if(dayin_peizhi.P7 == '是'){
        if(this_column == 1){
          command.setText(10,this_height, "TSS24.BF2", 0, 2, 2, order2[i].gh)//绘制文字
          command.setText(550,this_height, "TSS24.BF2", 0, 2, 2, order2[i].sl)//绘制文字
          this_column = this_column + 1
        }else{
          command.setText(700,this_height, "TSS24.BF2", 0, 2, 2, order2[i].gh)//绘制文字
          command.setText(1100,this_height, "TSS24.BF2", 0, 2, 2, order2[i].sl)//绘制文字
          this_column = 1
          this_height = this_height + 60
        }
      }
    }
    this_height = this_height + 60
    
    command.setPagePrint()//执行打印指令
    that.setData({
      isLabelSend: true
    })
    that.prepareSend(command.getData())
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
    var dayin_peizhi = JSON.parse(options.dayin_peizhi)
    console.log(order1)
    console.log(order2)
    _this.setData({
      order1,
      order2,
      dayin_peizhi
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
