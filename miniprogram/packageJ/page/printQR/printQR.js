var toArrayBuffer = require('to-array-buffer');
var Promisify = require('../utils/utils.js')
var Buffer = require('/buffer').Buffer;
const app = getApp();
import QR from './weapp-qrcode-base64.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jishu:0,
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

  scrollCanvas: function(e) {
    console.log(e);
    var canvasLen = e.detail.scrollLeft;
    this.setData({
        canvasLen: canvasLen
    })
},

  send_code(code,y) {
    var _this = this
    const ctx = wx.createCanvasContext('outCanvas')
    /*code是指图片base64格式数据*/
    //声明文件系统
    const fs = wx.getFileSystemManager();
    //随机定义路径名称
    var times = new Date().getTime();
    var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
    //将base64图片写入
    fs.writeFile({
      filePath: codeimg,
      data: code,
      encoding: 'base64',
      success: () => {
        //写入成功了的话，新的图片路径就能用了
        ctx.drawImage(codeimg, 170, 10 + _this.data.jishu * 150, 130, 130)
        _this.setData({
          jishu: _this.data.jishu + 1
        })
      }
    });
  },

  set_qr: function(){
    var _this = this
    var list = _this.data.list
  },

  setCanvas: function (comment_order) {
    var _this = this;
    _this.setData({
      jishu: 0
    })
    var list = _this.data.list
    var type = _this.data.type
    var width_all = _this.data.width_user_all
    var width = _this.data.width_user
    var height = _this.data.height_user
    console.log(width_all)
    console.log(width)
    console.log(height)
    const ctx = wx.createCanvasContext('outCanvas')
    console.log('赋值前')
    ctx.setFillStyle('#000000')
    ctx.setFontSize(35)
    var y = 10;
    var z = 10;
    for (let i = 0; i < list.length; i++, y += 150) {
      console.log(list[i].sp_dm)
      ctx.fillText(list[i].sp_dm, 50, 440+i*500);
      ctx.fillText(list[i].mingcheng, 50, 490+i*500);
      var imgData = QR.drawImg(list[i].sp_dm, {
        typeNumber: 4,
        errorCorrectLevel: 'M',
        size: 500
      })
      new Promise((resolve, reject) => {	
        console.log('第一步')
        const fs = wx.getFileSystemManager();
        //随机定义路径名称
        var times = new Date().getTime();
        var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
        //将base64图片写入
        fs.writeFile({
          filePath: codeimg,
          data: imgData.split(",")[1],
          encoding: 'base64',
          success: () => {
            //写入成功了的话，新的图片路径就能用了
            resolve(codeimg)	
          }
        });
      }).then(res => {
        console.log(res)
        console.log(z)
        ctx.drawImage(res, 100, 10 + z, 380, 380)
        z = z + 500
      })
    }
    setTimeout(function() {
      ctx.draw()
    }, 3000);
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

  printTo: function () {
    var _this = this;
    wx.showToast({
      title: '正在打印',
      icon: "none",
      duration: 2000
    })
    var width = _this.data.width_user
    var height = _this.data.height_user
    var widths = _this.getWidth(width)
    wx.canvasGetImageData({
      canvasId: 'outCanvas',
      x: 0,
      y: 0,
      width: widths.width,
      height: height,
      success: res => {

        var imageData = res.data
        console.log("Uint8ClampedArray=>", imageData)
        let arr = _this.convert4to1(res.data);
        let data = _this.convert8to1(arr);
        //局中，传入点阵位图，初始化打印机，走纸30行
        const cmds = [].concat([27, 97, 49], [29, 118, 48, 0, widths.width / 8 % 256, widths.width / 8 / 256, height % 256, height / 256], data, [27, 64], [27, 100, 30]);
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
      fail: res => {
        console.log(res)
      }
    })
  },

  getUserInfo: function (list) {
    var _this = this;
    var length = 10 + list.length * 500
    wx.getSystemInfo({
      success: res => {
        _this.setData({
          width_user_all: 600,
          width_user: 600,
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
        wx.stopBluetoothDevicesDiscovery({
          success: res => {
            console.log("停止搜索=>", res)
          },
          complete: res => {
            app.globalData.z_option_BLE.deviceId = deviceId
            app.globalData.z_option_BLE.serviceId = serviceId

            setTimeout(function () {
              _this.getOptions(deviceId, serviceId)
            }, 500)
          }
        })
      },
      fail: res => {
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
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: res => {
        for (let i = 0; i < res.characteristics.length; i++) {
          if (res.characteristics[i].properties.write &&
            res.characteristics[i].properties.notify) {
            app.globalData.z_option_BLE.characteristicId = res.characteristics[i].uuid
            _this.setData({
              option: {
                deviceId,
                serviceId,
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
      }
    })
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

  printTo: function () {
    var _this = this;
    wx.showToast({
      title: '正在打印',
      icon: "none",
      duration: 2000
    })
    var width = _this.data.width_user
    var height = _this.data.height_user
    var widths = _this.getWidth(width)
    wx.canvasGetImageData({
      canvasId: 'outCanvas',
      x: 0,
      y: 0,
      width: widths.width,
      height: height,
      success: res => {

        var imageData = res.data
        console.log("Uint8ClampedArray=>", imageData)
        let arr = _this.convert4to1(res.data);
        let data = _this.convert8to1(arr);
        //局中，传入点阵位图，初始化打印机，走纸30行
        const cmds = [].concat([27, 97, 49], [29, 118, 48, 0, widths.width / 8 % 256, widths.width / 8 / 256, height % 256, height / 256], data, [27, 64], [27, 100, 30]);
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
    var _this = this
    var list = JSON.parse(options.list)
    var type = options.type
    console.log(list)
    console.log(type)
    _this.setData({
      list,
      type,
    })
    _this.getUserInfo(list)
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