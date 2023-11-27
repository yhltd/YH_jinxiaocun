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
    var list = _this.data.list
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
    ctx.setFontSize(25)
    ctx.setTextAlign('left')
    ctx.fillText(list.title, 130, 20)
    ctx.setFontSize(18)
    ctx.setTextAlign('left')
    ctx.fillText('编号：' + list.bianhao, 0, 55)
    ctx.setTextAlign('left')
    ctx.fillText('日期：' + list.riqi, 0, 80)
    ctx.setTextAlign('left')
    ctx.fillText(list.kegong + "：" + list.kegong_val, 0, 105)
    ctx.moveTo(0, 115)   //起始点
    ctx.lineTo(370, 115)     //连接到的坐标点
    ctx.stroke()  
    var this_height = 135
    
    ctx.setTextAlign('left')
    ctx.fillText('商品', 10, this_height)
    ctx.fillText('数量', 200, this_height)
    ctx.fillText('单价', 260, this_height)
    ctx.fillText('金额', 320, this_height)
    this_height = this_height + 30
    for(var i=0; i<list.product.length; i++){
      ctx.setTextAlign('left')
      ctx.fillText(list.product[i].name, 0, this_height)
      ctx.fillText(list.product[i].num, 200, this_height)
      ctx.fillText(list.product[i].price, 260, this_height)
      ctx.fillText(list.product[i].money, 320, this_height)
      this_height = this_height + 25
    }
    this_height = this_height - 10
    ctx.moveTo(0, this_height)   //起始点
    ctx.lineTo(370, this_height)     //连接到的坐标点
    ctx.stroke()  
    this_height = this_height + 25
    ctx.setTextAlign('left')
    ctx.fillText('数量合计：' + list.num_sum, 0, this_height)
    this_height = this_height + 25
    ctx.setTextAlign('left')
    ctx.fillText('金额合计：' + list.money_sum, 0, this_height)
    ctx.draw()
    wx.showToast({
      title: '此页用于显示打印格式，请以打印的实际单据为准',
      icon: 'none',
      duration: 3000
    })
    console.log(this_height)
  },

  getUserInfo: function (height) {
    var _this = this;
    var length = height
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

  //打印按钮click事件
  save2: function () {
    var _this = this;
    if (!_this.data.isConn) {
      wx.showToast({
        title: '蓝牙未连接',
        icon: 'none'
      })
      return;
    } else {
      _this.printTo1()
    }
  },

  printTo1 : function(){
    var _this = this;
    var list = _this.data.list
    wx.showLoading({
      title: '正在写入...',
    })

    let printUtil = new PrintUtil(1000, 1);
    var height = 20
    printUtil.setFontWidthAndHeight(1, 1);
    printUtil.printlnText(4, 260, height, list.title );
    height = height + 40
    printUtil.printlnText(4, 15, height, '编号：' + list.bianhao);
    height = height + 40
    printUtil.printlnText(4, 15, height, '日期：' + list.riqi);
    height = height + 40
    printUtil.printlnText(4, 15, height, list.kegong + '：' + list.kegong_val);
    height = height + 30
    printUtil.printBox(0, height, 700, height);
    height = height + 10
    printUtil.printlnText(4, 30, height, '商品' );
    printUtil.printlnText(4, 350, height, '数量' );
    printUtil.printlnText(4, 420, height, '单价' );
    printUtil.printlnText(4, 510, height, '金额' );
    height = height + 50
    for(var i=0; i<list.product.length; i++){
      printUtil.printlnText(4, 15, height, list.product[i].name );
      printUtil.printlnText(4, 350, height, list.product[i].num );
      printUtil.printlnText(4, 420, height, list.product[i].price );
      printUtil.printlnText(4, 510, height, list.product[i].money );
      height = height + 40
    }
    height = height - 10
    printUtil.printBox(0, height, 700, height);
    height = height + 20
    printUtil.printlnText(4, 15, height, '数量合计：' + list.num_sum);
    height = height + 40
    printUtil.printlnText(4, 15, height, '金额合计：' + list.num_sum);
    height = height + 40

    printUtil = new PrintUtil(height, 1);
    height = 20
    printUtil.setFontWidthAndHeight(1, 1);
    printUtil.printlnText(4, 260, height, list.title );
    height = height + 40
    printUtil.printlnText(4, 15, height, '编号：' + list.bianhao);
    height = height + 40
    printUtil.printlnText(4, 15, height, '日期：' + list.riqi);
    height = height + 40
    printUtil.printlnText(4, 15, height, list.kegong + '：' + list.kegong_val);
    height = height + 30
    printUtil.printBox(0, height, 700, height);
    height = height + 10
    printUtil.printlnText(4, 30, height, '商品' );
    printUtil.printlnText(4, 350, height, '数量' );
    printUtil.printlnText(4, 420, height, '单价' );
    printUtil.printlnText(4, 510, height, '金额' );
    height = height + 50
    for(var i=0; i<list.product.length; i++){
      printUtil.printlnText(4, 15, height, list.product[i].name );
      printUtil.printlnText(4, 350, height, list.product[i].num );
      printUtil.printlnText(4, 420, height, list.product[i].price );
      printUtil.printlnText(4, 510, height, list.product[i].money );
      height = height + 40
    }
    height = height - 10
    printUtil.printBox(0, height, 700, height);
    height = height + 20
    printUtil.printlnText(4, 15, height, '数量合计：' + list.num_sum);
    height = height + 40
    printUtil.printlnText(4, 15, height, '金额合计：' + list.num_sum);
    height = height + 40

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

  printTo : function(){
    var _this = this;
    wx.showToast({
      title: '正在打印',
      icon : "none",
      duration : 2000
    })
    var width = _this.data.width_user
    var height = _this.data.height_user
    console.log(height)
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

  getWidth : function(width){
    width = Math.ceil(width)
    while(true){
      if(width%8 == 0){
        width-=8
        return {
          width,
          lineWidth : width / 8
        }
      }
      width++
    }
  },

  //4合1
  convert4to1 : function(res){
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

  printInfo: function(device, arr, callback) {
		let tthis = this;
		if (arr.length > 0) {
			tthis.sendStr(device, arr[0], function(success) {
				arr.shift();
				tthis.printInfo(device, arr, callback);
			}, function(error) {
				console.log(error);
			});
		} else {
			callback ? callback() : '';
		}
  },
  
  	//发送数据
	sendStr: function(device, bufferstr, success, fail) {
		console.log('sendStr', device);
		wx.writeBLECharacteristicValue({
			deviceId: device.deviceId,
			serviceId: device.serviceId,
			characteristicId: device.characteristicId,
			value: bufferstr,
			success: function(res) {
				success(res);
				console.log('sendStr', bufferstr)
			},
			failed: function(res) {
				fail(res)
				console.log("数据发送失败:" + JSON.stringify(res))
			},
		})
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
    var list = JSON.parse(options.list)
    console.log(list)
    _this.setData({
      list,
    })
    var height = 230 + (list.product.length * 25)
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