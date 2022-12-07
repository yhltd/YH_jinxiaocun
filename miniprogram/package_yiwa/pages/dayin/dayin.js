// import {
//   printImage,
//   sendDataToDevice,
//   overwriteImageData,
//   printQR,
//   printCommand,
// } from '../../wx-weapp-tool/bluetoolth';

// import GBK from '../../wx-weapp-tool/libs/gbk.min';

// import getBluetoothPageConfig from '../../wx-weapp-tool/bluetoothConnectionTemplate/index';
// const bluetoothConfig = getBluetoothPageConfig();

// var toArrayBuffer = require('to-array-buffer');
// var Buffer = require('/buffer').Buffer;
// const app = getApp();
var toArrayBuffer = require('to-array-buffer');
var Buffer = require('buffer/').Buffer;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  set_ble: function () {
    var _this = this;
    var option = _this.data.option
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update zeng_user set deviceId = '" + option.deviceId + "' and serviceId = '" + option.serviceId + "' and characteristicId = '" + option.characteristicId + "' where id = '" + _this.data.userInfo.id + "'"
      },
      success: res => {
        wx.showModal({
          title: '保存蓝牙连接态成功',
          content: JSON.stringify(res),
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      error: res => {
        wx.showModal({
          title: '错误！',
          content: JSON.stringify(res),
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
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


    ctx.moveTo(0, 135)
    ctx.lineTo((width_all - width) / 2 + width, 135)

    ctx.setFontSize(16)
    ctx.setTextAlign('center')
    ctx.fillText('产品', width / 2 - width / 11 * 4, 155)
    ctx.fillText('数量', width / 2 - width / 11 * 1.4, 155)
    ctx.fillText('单价', width / 2 + width / 11 * 1.4, 155)
    ctx.fillText('总价', width / 2 + width / 11 * 4, 155)


    ctx.moveTo(0, 170)
    ctx.lineTo((width_all - width) / 2 + width, 170)

    ctx.setFontSize(14)
    var y = 185;
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
          qr_code = "asdasd"
        } else {
          qr_code = qr_code
        }
        console.log(qr_code)
        // //canvas不支持在真机上显示base64图片；保存图片到暂存文件
        // var base64 = userInfo.qrCode_shop;
        var base64 = qr_code;
        //去空格
        // base64 = base64.replace(/\ +/g, ""); 
        // base64 = base64.replace(/[\r\n]/g, "");

        //真机是wx:file
        let filePath = wx.env.USER_DATA_PATH + "/test" + new Date().getTime().toString() + ".png"
        console.log(filePath)
        var arrayBuffer = wx.base64ToArrayBuffer(base64)
        const ms = wx.getFileSystemManager()
        ms.writeFile({
          filePath: filePath,
          data: arrayBuffer,
          encoding: 'binary',
          success: (res) => {
            console.log(res)
            // ctx.drawImage(filePath, width / 11 + width_all - width, y, width * 0.8, width * 0.8 * 1.3)
            ctx.stroke()
            ctx.draw()

            wx.hideLoading({
              success: (res) => {},
            })
          },
          fail: res => {
            console.log("失败", res)
          },
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

  // printTo : function(){
  //   var _this = this;
  //   wx.showToast({
  //     title: '正在打印',
  //     icon : "none",
  //     duration : 2000
  //   })
  //   var width = _this.data.width_user
  //   var height = _this.data.height_user
  //   var widths = _this.getWidth(width)
  //   wx.canvasGetImageData({
  //     canvasId : 'outCanvas',
  //     x : 0,
  //     y : 0,
  //     width : widths.width,
  //     height : height,
  //     success : res=> {

  //       var imageData = res.data
  //       console.log("Uint8ClampedArray=>",imageData)
  //       let arr = _this.convert4to1(res.data);
  //       let data = _this.convert8to1(arr);
  //       //局中，传入点阵位图，初始化打印机，走纸30行
  //       const cmds = [].concat([27, 97, 49],[29, 118, 48, 0, widths.width/8%256, widths.width/8/256, height%256, height/256], data, [27, 64],[27, 100, 30]);
  //       const buffer = toArrayBuffer(Buffer.from(cmds, 'gbk'));
  //       let arrPrint = [];
  //       for (let i = 0; i < buffer.byteLength; i = i + 20) {
  //         arrPrint.push(buffer.slice(i, i + 20));
  //       }
  //       var option = _this.data.option
  //       _this.printInfo({
  //         ...option
  //       }, arrPrint);
  //     },
  //     fail : res=> {
  //       console.log(res)
  //     }
  //   })
  // },

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

  unlinkFile: function () {
    const ms = wx.getFileSystemManager();
    wx.getFileSystemManager().readdir({ // 获取文件列表
      dirPath: wx.env.USER_DATA_PATH,
      success: res => {
        res.files.forEach(el => {
          ms.unlink({
            filePath: wx.env.USER_DATA_PATH + "/" + el,
            fail: res => {
              console.log('readdir文件删除失败：', res)
            }
          });
        })
      }
    })
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
            app.globalData.z_option_BLE.deviceId = deviceId
            app.globalData.z_option_BLE.serviceId = serviceId

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
                  app.globalData.z_option_BLE.characteristicId = res.characteristics[i].uuid
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

    // wx.getBLEDeviceCharacteristics({
    //   deviceId,
    //   serviceId,
    //   success : res=> {
    //     console.log(res)
    //     for(let i=0;i<res.characteristics.length;i++){
    //       if(res.characteristics[i].properties.write &&
    //         res.characteristics[i].properties.notify){
    //           app.globalData.z_option_BLE.characteristicId = res.characteristics[i].uuid
    //           _this.setData({
    //             option : {
    //               deviceId,
    //               serviceId,
    //               characteristicId : res.characteristics[i].uuid
    //             },
    //             isConn : true,
    //             blueList : []
    //           })
    //           return;
    //         }
    //     }
    //     wx.showToast({
    //       title: _this.data.errMsgs[10004],
    //       icon : 'none',
    //       duration : 2000
    //     })
    //   },
    //   fail : res=> {
    //     console.log(res)
    //   }
    // })
  },

  createOldBLE: function () {
    var _this = this;
    wx.openBluetoothAdapter({
      success: res => {
        _this.conBleOld()
      },
      fail: res => {
        console.log(res)
        if (res.errCode == -1) {
          this.setData({
            option: {
              deviceId: app.globalData.z_option_BLE.deviceId,
              serviceId: app.globalData.z_option_BLE.serviceId,
              characteristicId: app.globalData.z_option_BLE.characteristicId
            },
            isConn: true
          })
        }
      }
    })
  },

  conBleOld: function () {
    wx.createBLEConnection({
      deviceId: app.globalData.z_option_BLE.deviceId,
      success: res => {
        wx.showToast({
          title: "连接成功",
          icon: "success"
        })
        this.setData({
          option: {
            deviceId: app.globalData.z_option_BLE.deviceId,
            serviceId: app.globalData.z_option_BLE.serviceId,
            characteristicId: app.globalData.z_option_BLE.characteristicId
          },
          isConn: true
        })
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

  //---------------------------原有打印方法

  // printTo : function(){
  //   var _this = this;
  //   wx.showToast({
  //     title: '正在打印',
  //     icon : "none",
  //     duration : 2000
  //   })
  //   var width = _this.data.width_user
  //   var height = _this.data.height_user
  //   var widths = _this.getWidth(width)
  //   wx.canvasGetImageData({
  //     canvasId : 'outCanvas',
  //     x : 0,
  //     y : 0,
  //     width : widths.width,
  //     height : height,
  //     success : res=> {
  //       var imageData = res.data
  //       console.log("Uint8ClampedArray=>",imageData)
  //       let arr = _this.convert4to1(res.data);
  //       let data = _this.convert8to1(arr);
  //       data = overwriteImageData(res)
  //       //局中，传入点阵位图，初始化打印机，走纸30行
  //       const cmds = [].concat([27, 97, 49],[29, 118, 48, 0, widths.width/8%256, widths.width/8/256, height%256, height/256], data, [27, 64],[27, 100, 30]);
  //       const buffer = toArrayBuffer(Buffer.from(cmds, 'Unicode'));
  //       let arrPrint = [];
  //       for (let i = 0; i < buffer.byteLength; i = i + 20) {
  //         arrPrint.push(buffer.slice(i, i + 20));
  //       }
  //       var option = _this.data.option
  //       _this.printInfo({
  //         ...option
  //       }, arrPrint);
  //     },
  //     fail : res=> {
  //       console.log(res)
  //     }
  //   })
  // },

  //---------------------------原有打印方法
  printTo : function(){
    var _this = this;
    wx.showToast({
      title: '正在打印',
      icon : "none",
      duration : 2000
    })
    var width = _this.data.width_user
    var height = _this.data.height_user
    var widths = _this.getWidth(width)
    wx.canvasGetImageData({
      canvasId : 'outCanvas',
      x : 0,
      y : 0,
      width : widths.width,
      height : height,
      success : res=> {

        var imageData = res.data
        console.log("Uint8ClampedArray=>",imageData)
        let arr = _this.convert4to1(res.data);
        let data = _this.convert8to1(arr);
        //局中，传入点阵位图，初始化打印机，走纸30行
        const cmds = [].concat([27, 97, 49],[29, 118, 48, 0, widths.width/8%256, widths.width/8/256, height%256, height/256], data, [27, 64],[27, 100, 30]);
        // const buffer = toArrayBuffer(Buffer.from(cmds, 'Uint8'));
        const buffer = toArrayBuffer(Buffer.from(cmds, 'gbk'));
        let arrPrint = [];
        for (let i = 0; i < buffer.byteLength; i = i + 20) {
          arrPrint.push(buffer.slice(i, i + 20));
        }
        var option = _this.data.option
        _this.printInfo({
          ...option
        }, arrPrint);
      },
      fail : res=> {
        console.log(res)
      }
    })
  },
 


  printTo_bak: function () {
    var _this = this;
    wx.showToast({
      title: '正在打印',
      icon: "none",
      duration: 2000
    })
    var width = _this.data.width_user
    var height = _this.data.height_user
    var widths = _this.getWidth(width)
    var destWidth = 80
    var bili = widths.width / 80
    var destHeight = height / bili

    // wx.canvasToTempFilePath({
    //   x: 0,
    //   y: 0,
    //   width: widths.width,
    //   height: height,
    //   destWidth: destWidth,
    //   destHeight: destHeight,
    //   canvasId: 'outCanvas',
    //   success(res) {
    //     console.log(res.tempFilePath)
    //     var this_pictrue = res.tempFilePath
    //     wx.getFileSystemManager().readFile({
    //       filePath: this_pictrue, //选择图片返回的相对路径
    //       encoding: 'base64', //编码格式
    //       success: res => { //成功的回调
    //         console.log('data:image/png;base64,' + res.data)
    //         var this_base64 = res.data
    //         var arrPrint = wx.base64ToArrayBuffer(this_base64)
    //         var option = _this.data.option
    //         _this.printInfo({
    //           ...option
    //         }, arrPrint);
    //       }
    //     })
    //   }
    // })


    wx.canvasGetImageData({
      canvasId: 'outCanvas',
      x: 0,
      y: 0,
      width: widths.width,
      height: height,
      success: res => {
        const pix = res.data;
        const opt = {
          deviceId,
          ...this.character,
          onProgress: (percentage) => {
            console.log('percentage', percentage);
            this.setData({
              percentage,
            });
          },
          lasterSuccess: () => {
            console.log('laster success');
            this.setData({
              printing: false,
              percentage: 0,
            });
            wx.showModal({
              title: '提示',
              content: '数据已发送完，请检查打印的内容是否正常',
              showCancel: false,
              confirmText: '好的',
            });
          },
        };
        this.setData({
          printing: true,
        });
        //打印图片
        printImage(
          opt,
          overwriteImageData({
            threshold: threshold[0],
            imageData: pix,
            width: canvasWidth,
            height: canvasHeight,
          }),
        );

      },
      fail: res => {
        console.log(res)
      }
    })
  },


  getWidth: function (width) {
    width = Math.ceil(width)
    while (true) {
      if (width % 8 == 0) {
        width -= 8
        return {
          width,
          lineWidth: width / 8
        }
      }
      width++
    }
  },

  //4合1
  convert4to1: function (res) {
    let arr = [];
    for (let i = 0; i < res.length; i++) {
      if (i % 4 == 0) {
        let rule = 0.29900 * res[i] + 0.58700 * res[i + 1] + 0.11400 * res[i + 2];
        if (rule > 200) {
          res[i] = 0;
        } else {
          res[i] = 1;
        }
        arr.push(res[i]);
      }
    }
    return arr;
  },

  //8合1
  convert8to1(arr) {
    let data = [];
    for (let k = 0; k < arr.length; k += 8) {
      let temp = arr[k] * 128 + arr[k + 1] * 64 + arr[k + 2] * 32 + arr[k + 3] * 16 + arr[k + 4] * 8 + arr[k + 5] * 4 +
        arr[k + 6] * 2 + arr[k + 7] * 1

      data.push(temp);
    }
    return data;
  },

  printInfo: function (device, arr, callback) {
    let tthis = this;
    if (arr.length > 0) {
      tthis.sendStr(device, arr[0], function (success) {
        arr.shift();
        tthis.printInfo(device, arr, callback);
      }, function (error) {
        console.log(error);
      });
    } else {
      callback ? callback() : '';
    }
  },

  //发送数据
  sendStr: function (device, bufferstr, success, fail) {
    console.log('sendStr', device);
    wx.writeBLECharacteristicValue({
      deviceId: device.deviceId,
      serviceId: device.serviceId,
      characteristicId: device.characteristicId,
      value: bufferstr,
      success: function (res) {
        success(res);
        console.log('sendStr', bufferstr)
      },
      failed: function (res) {
        fail(res)
        console.log("数据发送失败:" + JSON.stringify(res))
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
    if (app.globalData.z_option_BLE.deviceId != "") {
      wx.showToast({
        title: '正在连接',
        icon: 'none',
        duration: 2000
      })
      _this.createOldBLE();
    }
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
    if (this.data.isConn) {
      this.set_ble()
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var _this = this;
    //删除二维码暂存文件
    _this.unlinkFile();
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


// function grayPixle(pix) {
//   return pix[0] * 0.299 + pix[1] * 0.587 + pix[2] * 0.114;
// }
// /**
// * overwriteImageData
// * @param {object} data
// * {
//           width,//图片宽度
//           height,//图片高度
//           imageData,//Uint8ClampedArray
//           threshold,//阈值
//   }
// */
// function overwriteImageData(data) {
//   let sendWidth = data.width,
//       sendHeight = data.height;
//   const threshold = data.threshold || 180;
//   let sendImageData = new ArrayBuffer((sendWidth * sendHeight) / 8);
//   sendImageData = new Uint8Array(sendImageData);
//   let pix = data.data;
//   const part = [];
//   let index = 0;
//   for (let i = 0; i < pix.length; i += 32) {
//       //横向每8个像素点组成一个字节（8位二进制数）。
//       for (let k = 0; k < 8; k++) {
//           const grayPixle1 = grayPixle(pix.slice(i + k * 4, i + k * 4 + (4 - 1)));
//           //阈值调整
//           if (grayPixle1 > threshold) {
//               //灰度值大于threshold位   白色 为第k位0不打印
//               part[k] = 0;
//           } else {
//               part[k] = 1;
//           }
//       }
//       let temp = 0;
//       for (let a = 0; a < part.length; a++) {
//           temp += part[a] * Math.pow(2, part.length - 1 - a);
//       }
//       //开始不明白以下算法什么意思，了解了字节才知道，一个字节是8位的二进制数，part这个数组存的0和1就是二进制的0和1，传输到打印的位图数据的一个字节是0-255之间的十进制数，以下是用权相加法转十进制数，理解了这个就用上面的for循环替代了
//       // const temp =
//       //     part[0] * 128 +
//       //     part[1] * 64 +
//       //     part[2] * 32 +
//       //     part[3] * 16 +
//       //     part[4] * 8 +
//       //     part[5] * 4 +
//       //     part[6] * 2 +
//       //     part[7] * 1;
//       sendImageData[index++] = temp;
//   }
//   // return {
//   //     array: Array.from(sendImageData),
//   //     width: sendWidth / 8,
//   //     height: sendHeight,
//   // };
//   return Array.from(sendImageData);
// }