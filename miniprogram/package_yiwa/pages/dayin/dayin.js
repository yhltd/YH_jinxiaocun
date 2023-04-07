var toArrayBuffer = require('to-array-buffer');
var Buffer = require('buffer/').Buffer;
const util = require("../utils/util");
const PrintUtil = require('../utils/printutil')
const app = getApp();
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
    width_user_all: 0,
    width_user: 0,
    height_user: 0,

    mask_hid: true,
    updComment_hid: true,

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

    var head_list = _this.data.head_list
    var list = _this.data.list
    var zhongliang_list = _this.data.zhongliang_list
    var huankuang_list = _this.data.huankuang_list
    var beizhu1 = _this.data.beizhu1
    var beizhu2 = _this.data.beizhu2
    var zongjia = _this.data.zongjia
    var sel_id = _this.data.sel_id
    var sel_riqi = _this.data.sel_riqi

    var width_all = _this.data.width_user_all
    var width = _this.data.width_user
    var height = _this.data.height_user
    console.log(width_all)
    console.log(width)
    console.log(height)
    const ctx = wx.createCanvasContext('outCanvas')

    console.log('赋值前')

    ctx.setFillStyle("white")
    ctx.fillRect(0, 0, width, height)

    ctx.setTextAlign('center')
    ctx.setFillStyle('#000000')
    ctx.setFontSize(21)

    ctx.fillText('莹丰豆制品', width / 2, 35)

    ctx.setFontSize(17)
    ctx.setTextAlign('left')
    ctx.fillText('客户：' + head_list.kehu, 0, 75)
    ctx.setTextAlign('right')
    ctx.fillText('电话：' + head_list.kehu_phone, width, 75)
    ctx.setTextAlign('left')
    ctx.fillText('司机：' + head_list.siji, 0, 95)
    ctx.setTextAlign('right')
    ctx.fillText('电话：' + head_list.siji_phone, width, 95)
    ctx.setTextAlign('left')
    ctx.fillText('业务员：' + head_list.yewuyuan, 0, 115)
    ctx.setTextAlign('right')
    ctx.fillText('电话：' + head_list.yewuyuan_phone, width, 115)
    ctx.setTextAlign('left')
    ctx.fillText('日期：' + sel_riqi, 0, 135)
    ctx.setTextAlign('left')
    ctx.fillText('地址：' + head_list.customer_address, 0, 155)
    console.log(head_list)

    ctx.moveTo(0, 175)
    ctx.lineTo((width_all - width) / 2 + width, 175)

    ctx.setFontSize(16)
    ctx.setTextAlign('center')
    ctx.fillText('产品', width / 2 - width / 11 * 4, 195)
    ctx.fillText('数量', width / 2 - width / 11 * 1.4, 195)
    ctx.fillText('单价', width / 2 + width / 11 * 1.4, 195)
    ctx.fillText('总价', width / 2 + width / 11 * 4, 195)


    ctx.moveTo(0, 210)
    ctx.lineTo((width_all - width) / 2 + width, 210)

    ctx.setFontSize(14)
    var y = 235;
    for (let i = 0; i < list.length; i++, y += 30) {
      ctx.fillText(list[i].NameofProduct, width / 2 - width / 11 * 4, y);
      ctx.fillText(list[i].number, width / 2 - width / 11 * 1.4, y);
      ctx.fillText(list[i].Theunitprice, width / 2 + width / 11 * 1.4, y);
      ctx.fillText(list[i].zongjia, width / 2 + width / 11 * 4, y);
      console.log(list[i].NameofProduct)
    }

    console.log('赋值后')

    ctx.moveTo(0, y - 20)
    ctx.lineTo((width_all - width) / 2 + width, y - 20)

    ctx.fillText(zongjia, width / 2, y)

    y = y + 50



    for (var i = 0; i < zhongliang_list.length; i++) {
      ctx.setFontSize(17)
      ctx.fillText(zhongliang_list[i][1] + '重量', width / 2, y)
      y = y + 13
      ctx.moveTo(0, y)
      ctx.lineTo((width_all - width) / 2 + width, y)
      y = y + 20
      var shunxu = 1
      ctx.setFontSize(14)
      for (var j = 2; j < zhongliang_list[i].length; j++) {
        if (shunxu == 1) {
          ctx.fillText(zhongliang_list[i][j], width / 2 - width / 11 * 4, y);
          shunxu = shunxu + 1
        } else if (shunxu == 2) {
          ctx.fillText(zhongliang_list[i][j], width / 2 - width / 11 * 2, y);
          shunxu = shunxu + 1
        } else if (shunxu == 3) {
          ctx.fillText(zhongliang_list[i][j], width / 2, y);
          shunxu = shunxu + 1
        } else if (shunxu == 4) {
          ctx.fillText(zhongliang_list[i][j], width / 2 + width / 11 * 2, y);
          shunxu = shunxu + 1
        } else if (shunxu == 5) {
          ctx.fillText(zhongliang_list[i][j], width / 2 + width / 11 * 4, y);
          shunxu = 1
          y = y + 20
        }
      }
    }

    y = y + 50
    ctx.setFontSize(16)
    ctx.setTextAlign('center')
    ctx.fillText('产品', width / 2 - width / 11 * 4, y)
    ctx.fillText('总欠', width / 2 - width / 11 * 1.4, y)
    ctx.fillText('出筐', width / 2 + width / 11 * 1.4, y)
    ctx.fillText('回筐', width / 2 + width / 11 * 4, y)
    ctx.moveTo(0, y + 10)
    ctx.lineTo((width_all - width) / 2 + width, y + 10)

    y = y + 30


    for (var i = 0; i < huankuang_list.length; i++) {
      ctx.setFontSize(14)
      ctx.fillText(huankuang_list[i].product_name, width / 2 - width / 11 * 4, y)
      ctx.fillText(huankuang_list[i].zongqian, width / 2 - width / 11 * 1.4, y)
      ctx.fillText(huankuang_list[i].chukuang, width / 2 + width / 11 * 1.4, y)
      ctx.fillText(huankuang_list[i].huikuang, width / 2 + width / 11 * 4, y)
      y = y + 20
    }

    y = y + 20
    ctx.setFontSize(17)
    ctx.fillText('备注1:' + beizhu1, width / 2, y)
    y = y + 30
    ctx.fillText('备注2:' + beizhu2, width / 2, y)
    y = y + 50

    var sql = "select u2.qr_code from userInfo as u1 left join userInfo as u2 on u1.salesman = u2.id where u1.id =" + sel_id
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var qr_code = res.result.recordset[0].qr_code
        if (qr_code == null || qr_code == undefined || qr_code == '') {
          qr_code = ""
        } else {
          qr_code = qr_code
        }
        console.log(qr_code)
        _this.setData({
          qr_code:qr_code
        })
        ctx.stroke()
        ctx.draw()
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

  getUserInfo: function (height) {
    var _this = this;
    var length = height * 30 + 350
    wx.getSystemInfo({
      success: res => {
        _this.setData({
          width_user_all: res.windowWidth,
          width_user: res.windowWidth * 0.98,
          height_user: length
        })
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
        if (this_list[1].isPrimary) {
          var sId = this_list[1].uuid
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

  printTo : function(){
    var _this = this;
    var code = _this.data.qr_code
    var head_list = _this.data.head_list
    var list = _this.data.list
    var zhongliang_list = _this.data.zhongliang_list
    var huankuang_list = _this.data.huankuang_list
    var beizhu1 = _this.data.beizhu1
    var beizhu2 = _this.data.beizhu2
    var zongjia = _this.data.zongjia
    var sel_id = _this.data.sel_id
    var sel_riqi = _this.data.sel_riqi

    wx.showLoading({
      title: '正在写入...',
    })

    let printUtil = new PrintUtil(2000, 1);
    var height = 30

    //加粗字体
    printUtil.setFontWidthAndHeight(2, 2);
    printUtil.printlnText(4, 200, height, '莹丰豆制品');

    height = height + 75

    // //产品框
    // printUtil.printBox(10, 60, 550, height);
    printUtil.setFontWidthAndHeight(1, 1);
    printUtil.printlnText(4, 15, height, '客户：' + head_list.kehu);
    printUtil.printlnText(4, 395, height, '电话：' + head_list.kehu_phone);
    height = height + 40
    printUtil.printlnText(4, 15, height, '司机：' + head_list.siji);
    printUtil.printlnText(4, 395, height, '电话：' + head_list.siji_phone);
    height = height + 40
    printUtil.printlnText(4, 15, height, '业务员：' + head_list.yewuyuan);
    printUtil.printlnText(4, 395, height, '电话：' + head_list.yewuyuan_phone);
    height = height + 40
    printUtil.printlnText(4, 15, height, '日期：' + sel_riqi);
    height = height + 40
    printUtil.printlnText(4, 15, height, '地址：' + head_list.customer_address);

    height = height + 40
    printUtil.printBox(0, height, 700, height);
    height = height + 10

    printUtil.printlnText(4, 30, height, '产品');
    printUtil.printlnText(4, 190, height, '数量');
    printUtil.printlnText(4, 350, height, '单价');
    printUtil.printlnText(4, 500, height, '总价');
    height = height + 40
    printUtil.printBox(0, height, 700, height);
    height = height + 10

    for (let i = 0; i < list.length; i++, height += 40) {
      printUtil.printlnText(4, 30, height, list[i].NameofProduct);
      printUtil.printlnText(4, 190, height, list[i].number);
      printUtil.printlnText(4, 350, height, list[i].Theunitprice);
      printUtil.printlnText(4, 500, height, list[i].zongjia);
    }

    printUtil.printBox(0, height, 700, height);
    height = height + 10
    printUtil.printlnText(4, 430, height, zongjia);
    height = height + 60


    for (var i = 0; i < zhongliang_list.length; i++) {
      printUtil.printlnText(4, 240, height, zhongliang_list[i][1] + '重量');
      height = height + 40
      printUtil.printBox(0, height, 700, height);
      height = height + 10
      var shunxu = 1
      for (var j = 2; j < zhongliang_list[i].length; j++) {
        if (shunxu == 1) {
          printUtil.printlnText(4, 30, height, zhongliang_list[i][j]);
          shunxu = shunxu + 1
        } else if (shunxu == 2) {
          printUtil.printlnText(4, 120, height, zhongliang_list[i][j]);
          shunxu = shunxu + 1
        } else if (shunxu == 3) {
          printUtil.printlnText(4, 250, height, zhongliang_list[i][j]);
          shunxu = shunxu + 1
        } else if (shunxu == 4) {
          printUtil.printlnText(4, 390, height, zhongliang_list[i][j]);
          shunxu = shunxu + 1
        } else if (shunxu == 5) {
          printUtil.printlnText(4, 500, height, zhongliang_list[i][j]);
          shunxu = 1
          height = height + 40
        }
      }
    }

    height = height + 40

    printUtil.printlnText(4, 30, height, '产品');
    printUtil.printlnText(4, 190, height, '总欠');
    printUtil.printlnText(4, 350, height, '出筐');
    printUtil.printlnText(4, 500, height, '回筐');
    height = height + 40
    printUtil.printBox(0, height, 700, height);
    height = height + 10

    for (var i = 0; i < huankuang_list.length; i++) {
      printUtil.printlnText(4, 30, height, huankuang_list[i].product_name);
      printUtil.printlnText(4, 190, height, huankuang_list[i].zongqian);
      printUtil.printlnText(4, 350, height, huankuang_list[i].chukuang);
      printUtil.printlnText(4, 500, height, huankuang_list[i].huikuang);
      height = height + 40
    }

    height = height + 40
    printUtil.printlnText(4, 240, height, '备注1:' + beizhu1);
    height = height + 40
    printUtil.printlnText(4, 240, height, '备注2:' + beizhu2);
    height = height + 80

    //二维码
    printUtil.printQRCode(135, height, 9, code);

    height = height + 500


    //计算出高度后再次执行

    printUtil = new PrintUtil(height, 1);
    var height = 30

    //加粗字体
    printUtil.setFontWidthAndHeight(2, 2);
    printUtil.printlnText(4, 200, height, '莹丰豆制品');

    height = height + 75

    // //产品框
    // printUtil.printBox(10, 60, 550, height);
    printUtil.setFontWidthAndHeight(1, 1);
    printUtil.printlnText(4, 15, height, '客户：' + head_list.kehu);
    printUtil.printlnText(4, 395, height, '电话：' + head_list.kehu_phone);
    height = height + 40
    printUtil.printlnText(4, 15, height, '司机：' + head_list.siji);
    printUtil.printlnText(4, 395, height, '电话：' + head_list.siji_phone);
    height = height + 40
    printUtil.printlnText(4, 15, height, '业务员：' + head_list.yewuyuan);
    printUtil.printlnText(4, 395, height, '电话：' + head_list.yewuyuan_phone);
    height = height + 40
    printUtil.printlnText(4, 15, height, '日期：' + sel_riqi);

    height = height + 40
    printUtil.printBox(0, height, 700, height);
    height = height + 10

    printUtil.printlnText(4, 30, height, '产品');
    printUtil.printlnText(4, 190, height, '数量');
    printUtil.printlnText(4, 350, height, '单价');
    printUtil.printlnText(4, 500, height, '总价');
    height = height + 40
    printUtil.printBox(0, height, 700, height);
    height = height + 10

    for (let i = 0; i < list.length; i++, height += 40) {
      printUtil.printlnText(4, 30, height, list[i].NameofProduct);
      printUtil.printlnText(4, 190, height, list[i].number);
      printUtil.printlnText(4, 350, height, list[i].Theunitprice);
      printUtil.printlnText(4, 500, height, list[i].zongjia);
    }

    printUtil.printBox(0, height, 700, height);
    height = height + 10
    printUtil.printlnText(4, 430, height, zongjia);
    height = height + 60


    for (var i = 0; i < zhongliang_list.length; i++) {
      printUtil.printlnText(4, 240, height, zhongliang_list[i][1] + '重量');
      height = height + 40
      printUtil.printBox(0, height, 700, height);
      height = height + 10
      var shunxu = 1
      for (var j = 2; j < zhongliang_list[i].length; j++) {
        if (shunxu == 1) {
          printUtil.printlnText(4, 30, height, zhongliang_list[i][j]);
          shunxu = shunxu + 1
        } else if (shunxu == 2) {
          printUtil.printlnText(4, 120, height, zhongliang_list[i][j]);
          shunxu = shunxu + 1
        } else if (shunxu == 3) {
          printUtil.printlnText(4, 250, height, zhongliang_list[i][j]);
          shunxu = shunxu + 1
        } else if (shunxu == 4) {
          printUtil.printlnText(4, 390, height, zhongliang_list[i][j]);
          shunxu = shunxu + 1
        } else if (shunxu == 5) {
          printUtil.printlnText(4, 500, height, zhongliang_list[i][j]);
          shunxu = 1
          height = height + 40
        }
      }
    }

    height = height + 40

    printUtil.printlnText(4, 30, height, '产品');
    printUtil.printlnText(4, 190, height, '总欠');
    printUtil.printlnText(4, 350, height, '出筐');
    printUtil.printlnText(4, 500, height, '回筐');
    height = height + 40
    printUtil.printBox(0, height, 700, height);
    height = height + 10

    for (var i = 0; i < huankuang_list.length; i++) {
      printUtil.printlnText(4, 30, height, huankuang_list[i].product_name);
      printUtil.printlnText(4, 190, height, huankuang_list[i].zongqian);
      printUtil.printlnText(4, 350, height, huankuang_list[i].chukuang);
      printUtil.printlnText(4, 500, height, huankuang_list[i].huikuang);
      height = height + 40
    }

    height = height + 40
    printUtil.printlnText(4, 240, height, '备注1:' + beizhu1);
    height = height + 40
    printUtil.printlnText(4, 240, height, '备注2:' + beizhu2);
    height = height + 80

    //二维码
    if(code != '' && code != null){
      printUtil.printQRCode(135, height, 9, code);
    }
    height = height + 500


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
    var head_list = JSON.parse(options.head_list)
    var list = JSON.parse(options.list)
    var zhongliang_list = JSON.parse(options.zhongliang_list)
    var huankuang_list = JSON.parse(options.huankuang_list)
    var beizhu1 = JSON.parse(options.beizhu1)
    var beizhu2 = JSON.parse(options.beizhu2)
    var zongjia = JSON.parse(options.zongjia)
    var sel_id = JSON.parse(options.sel_id)
    var sel_riqi = JSON.parse(options.sel_riqi)
    _this.setData({
      head_list,
      list,
      zhongliang_list,
      huankuang_list,
      beizhu1,
      beizhu2,
      zongjia,
      sel_id,
      sel_riqi,
    })

    var height = 16
    height = height + list.length * 1
    height = height + huankuang_list.length * 1
    for (var i = 0; i < zhongliang_list.length; i++) {
      height = height + Math.ceil((zhongliang_list[i].length - 1) / 5) + 1
    }

    _this.getUserInfo(height)
    _this.setCanvas()

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