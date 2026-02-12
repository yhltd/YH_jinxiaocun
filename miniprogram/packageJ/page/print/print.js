// const toArrayBuffer = function(data) {
//   if (data instanceof ArrayBuffer) {
//     return data;
//   }
//   if (Array.isArray(data)) {
//     // 数字数组 [27, 97, 49] 转为 ArrayBuffer
//     return new Uint8Array(data).buffer;
//   }
//   if (typeof data === 'string') {
//     // 字符串转 ArrayBuffer
//     const encoder = new TextEncoder();
//     return encoder.encode(data).buffer;
//   }
//   return data;
// };

// // 自定义 Buffer 实现
// const Buffer = {
//   from: function(data, encoding) {
//     console.log('Buffer.from 被调用，data类型:', typeof data, 'encoding:', encoding);
    
//     if (Array.isArray(data)) {
//       // 处理打印指令数组 [27, 97, 49, ...]
//       return new Uint8Array(data).buffer;
//     }
    
//     if (typeof data === 'string') {
//       // 简化处理，不真正实现GBK编码
//       const encoder = new TextEncoder();
//       return encoder.encode(data).buffer;
//     }
    
//     return data;
//   }
// };

// const app = getApp();
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     gongsi: '',
//     userInfo: [],
//     list: [],
//     order_id: "",
//     systemArray: ['入库', '出库'],
//     out_in_type: '选择单据类型',
//     order_array: [],
//     order_number: '选择单号',
//     width_user_all: 0,
//     width_user: 0,
//     height_user: 0,

//     mask_hid: true,
//     updComment_hid: true,

//     errMsgs: {
//       "10003": "连接失败，重开蓝牙试试~",
//       "10012": "连接超时，重开蓝牙试试~",
//       "10009": "手机版本不支持",
//       "10004": "设备不支持",
//       "10005": "设备不支持"
//     },

//     isConn: false,
//     blueList: [],
//     option: {
//       deviceId: "",
//       serviceId: "",
//       characteristicId: ""
//     },

//     startTime: 0,
//     endTime: 0
//   },

//   choice_system: function (e) {
//     var _this = this;
//     var type = _this.data.systemArray[e.detail.value];
//     var gs_name = app.globalData.gongsi;
//     console.log(type)
//     wx.cloud.callFunction({
//       name: 'sqlConnection',
//       data: {
//         sql: "select DISTINCT orderid from yh_jinxiaocun_mingxi where gs_name = '" + gs_name + "' and mxtype ='" + type + "'"
//       },
//       success: res => {
//         console.log(res.result)
//         _this.setData({
//           order_array: res.result,
//           out_in_type: type,
//           order_number: '选择单号',
//         })
//       }
//     })
//   },

//   choice_order: function (e) {
//     var _this = this;
//     var order_number = _this.data.order_array[e.detail.value];
//     var gs_name = app.globalData.gongsi;
//     var type = _this.data.out_in_type
//     console.log(order_number.orderid)
//     wx.cloud.callFunction({
//       name: 'sqlConnection',
//       data: {
//         sql: "select ifnull(orderid,'') as orderid,ifnull(shou_h,'') as shou_h,ifnull(shijian,'') as shijian,ifnull(cpname,'') as cpname,ifnull(sp_dm,'') as sp_dm,ifnull(cplb,'') as cplb,ifnull(cpsl,0) as cpsl,ifnull(cpsj,0) as cpsj,convert(cpsl,float) * convert(cpsj,float) as cpzj from yh_jinxiaocun_mingxi where gs_name = '" + gs_name + "' and mxtype ='" + type + "' and orderid ='" + order_number.orderid + "'"
//       },
//       success: res => {
//         console.log(res.result)
//         _this.setData({
//           list: res.result,
//           order_number: order_number.orderid,
//         })
//         _this.getUserInfo(res.result)


//       }
//     })
//   },

//   set_ble: function () {
//     var _this = this;
//     var option = _this.data.option
//     wx.cloud.callFunction({
//       name: 'sqlServer_117',
//       data: {
//         query: "update zeng_user set deviceId = '" + option.deviceId + "' and serviceId = '" + option.serviceId + "' and characteristicId = '" + option.characteristicId + "' where id = '" + _this.data.userInfo.id + "'"
//       },
//       success: res => {
//         wx.showModal({
//           title: '保存蓝牙连接态成功',
//           content: JSON.stringify(res),
//           success: res => {
//             if (res.confirm) {
//               console.log('用户点击确定')
//             } else if (res.cancel) {
//               console.log('用户点击取消')
//             }
//           }
//         })
//       },
//       error: res => {
//         wx.showModal({
//           title: '错误！',
//           content: JSON.stringify(res),
//           success: res => {
//             if (res.confirm) {
//               console.log('用户点击确定')
//             } else if (res.cancel) {
//               console.log('用户点击取消')
//             }
//           }
//         })
//       }
//     })
//   },
//   setCanvas: function (comment_order) {
//     var _this = this;
//     var list = _this.data.list
//     var type = _this.data.type
//     var width_all = _this.data.width_user_all
//     var width = _this.data.width_user
//     var height = _this.data.height_user
//     console.log(width_all)
//     console.log(width)
//     console.log(height)
//     const ctx = wx.createCanvasContext('outCanvas')

//     console.log('赋值前')

//     ctx.setFillStyle("white")
//     ctx.fillRect(0, 0, width, height)

//     ctx.setTextAlign('center')
//     ctx.setFillStyle('#000000')

//     if (type == '客户') {
//       ctx.setFontSize(12)
//       ctx.setTextAlign('center')
//       ctx.fillText('客户名称', width / 2 - width / 11 * 4.5, 35)
//       ctx.fillText('商品代码', width / 2 - width / 11 * 2.8, 35)
//       ctx.fillText('商品类别', width / 2 - width / 11 * 1, 35)
//       ctx.fillText('商品名称', width / 2 + width / 11 * 1, 35)
//       ctx.fillText('数量', width / 2 + width / 11 * 2.8, 35)
//       ctx.fillText('金额', width / 2 + width / 11 * 4.5, 35)

//       ctx.setFontSize(10)
//       var y = 65;
//       for (let i = 0; i < list.length; i++, y += 30) {
//         ctx.fillText(list[i].shou_h, width / 2 - width / 11 * 4.5, y);
//         ctx.fillText(list[i].sp_dm, width / 2 - width / 11 * 2.8, y);
//         ctx.fillText(list[i].cplb, width / 2 - width / 11 * 1, y);
//         ctx.fillText(list[i].cpname, width / 2 + width / 11 * 1, y);
//         ctx.fillText(list[i].ruku_num, width / 2 + width / 11 * 2.8, y)
//         ctx.fillText(list[i].ruku_price, width / 2 + width / 11 * 4.5, y)
//       }
//     }else{
//       ctx.setFontSize(10)
//       ctx.setTextAlign('center')
//       ctx.fillText('商品代码', width / 2 - width / 11 * 4.5, 35)
//       ctx.fillText('商品名称', width / 2 - width / 11 * 2.8, 35)
//       ctx.fillText('类别',    width / 2 - width / 11 * 1.3, 35)
//       ctx.fillText('入库数量', width / 2 , 35)
//       ctx.fillText('入库金额', width / 2 + width / 11 * 1.3, 35)
//       ctx.fillText('出库数量', width / 2 + width / 11 * 2.8, 35)
//       ctx.fillText('出库金额', width / 2 + width / 11 * 4.5, 35)

//       ctx.setFontSize(8)
//       var y = 65;
//       for (let i = 0; i < list.length; i++, y += 30) {
//         ctx.fillText(list[i].sp_dm, width / 2 - width / 11 * 4.5, y);
//         ctx.fillText(list[i].cpname, width / 2 - width / 11 * 2.8, y);
//         ctx.fillText(list[i].cplb, width / 2 - width / 11 * 1.3, y);
//         ctx.fillText(list[i].ruku_num, width / 2, y);
//         ctx.fillText(list[i].ruku_price, width / 2 + width / 11 * 1.3, y)
//         ctx.fillText(list[i].chuku_price, width / 2 + width / 11 * 2.8, y)
//         ctx.fillText(list[i].chuku_price, width / 2 + width / 11 * 4.5, y)
//       }
//     }

//     ctx.stroke()
//     ctx.draw()

//     console.log('赋值后')

//     ctx.moveTo(0, y - 20)
//     ctx.lineTo((width_all - width) / 2 + width, y - 20)
//     var base64 = 'asdasd';
//     //去空格
//     base64 = base64.replace(/\ +/g, "");
//     base64 = base64.replace(/[\r\n]/g, "");

//     //真机是wx:file
//     let filePath = wx.env.USER_DATA_PATH + "/出库单" + new Date().getTime().toString() + ".png"
//     var arrayBuffer = wx.base64ToArrayBuffer(base64)
//     const ms = wx.getFileSystemManager()
//     ms.writeFile({
//       filePath: filePath,
//       data: arrayBuffer,
//       encoding: 'binary',
//       success: () => {
//         // ctx.drawImage(filePath,width/2+width_all-width,y,150,150)

        

//         wx.hideLoading({
//           success: (res) => {},
//         })
//       },
//       fail: res => {
//         console.log("失败", res)
//       },
//     })
//   },

//   //打印按钮click事件
//   save: function () {
//     var _this = this;

//     if (!_this.data.isConn) {
//       wx.showToast({
//         title: '蓝牙未连接',
//         icon: 'none'
//       })
//       return;
//     } else {
//       _this.printTo()
//     }
//   },

//   printTo: function () {
//     var _this = this;
//     wx.showToast({
//       title: '正在打印',
//       icon: "none",
//       duration: 2000
//     })
//     var width = _this.data.width_user
//     var height = _this.data.height_user
//     var widths = _this.getWidth(width)
//     wx.canvasGetImageData({
//       canvasId: 'outCanvas',
//       x: 0,
//       y: 0,
//       width: widths.width,
//       height: height,
//       success: res => {

//         var imageData = res.data
//         console.log("Uint8ClampedArray=>", imageData)
//         let arr = _this.convert4to1(res.data);
//         let data = _this.convert8to1(arr);
//         //局中，传入点阵位图，初始化打印机，走纸30行
//         const cmds = [].concat([27, 97, 49], [29, 118, 48, 0, widths.width / 8 % 256, widths.width / 8 / 256, height % 256, height / 256], data, [27, 64], [27, 100, 30]);
//         const buffer = toArrayBuffer(Buffer.from(cmds, 'gbk'));
//         let arrPrint = [];
//         for (let i = 0; i < buffer.byteLength; i = i + 20) {
//           arrPrint.push(buffer.slice(i, i + 20));
//         }
//         var option = _this.data.option
//         _this.printInfo({
//           ...option
//         }, arrPrint);
//       },
//       fail: res => {
//         console.log(res)
//       }
//     })
//   },

//   getUserInfo: function (list) {
//     var _this = this;
//     var length = list.length * 30 + 350
//     wx.getSystemInfo({
//       success: res => {
//         _this.setData({
//           width_user_all: res.windowWidth,
//           width_user: res.windowWidth * 0.98,
//           height_user: length
//         })
//       },
//     })
//   },

//   getTime: function () {
//     var date = new Date();
//     var year = date.getFullYear();
//     var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
//     var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
//     var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
//     var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

//     return year + "-" + month + "-" + day + " " + hour + ":" + minute
//   },

//   updComment_show: function () {
//     var _this = this;

//     _this.setData({
//       mask_hid: false,
//       updComment_hid: false
//     })
//   },

//   hid_view: function () {
//     this.setData({
//       mask_hid: true,
//       updComment_hid: true
//     })
//   },

//   updComment: function (e) {
//     var _this = this;
//     _this.hid_view()
//     var value = e.detail.value.comment_order

//     _this.setCanvas(value)
//   },

//   unlinkFile: function () {
//     const ms = wx.getFileSystemManager();
//     wx.getFileSystemManager().readdir({ // 获取文件列表
//       dirPath: wx.env.USER_DATA_PATH,
//       success: res => {
//         res.files.forEach(el => {
//           ms.unlink({
//             filePath: wx.env.USER_DATA_PATH + "/" + el,
//             fail: res => {
//               console.log('readdir文件删除失败：', res)
//             }
//           });
//         })
//       }
//     })
//   },



//   //初始化蓝牙适配器
//   openBluetoothAdapter: function () {
//     var _this = this;
//     wx.openBluetoothAdapter({
//       success: function (res) {
//         console.log("初始化蓝牙适配器状态");
//         console.log(res);
//         wx.startBluetoothDevicesDiscovery({
//           powerLevel: "medium",
//           success: res => {
//             console.log("开始搜索=>", res)
//             wx.onBluetoothDeviceFound(res => {
//               console.log(res)
//               var blueList = _this.data.blueList;
//               if (blueList.length != 0) {
//                 for (let i = 0; i < res.devices.length; i++) {
//                   if (res.devices[i].name != "") {
//                     for (let j = 0; j < blueList.length; j++) {
//                       if (res.devices[i].deviceId != blueList[j].deviceId) {
//                         blueList.push(res.devices[i])
//                       }
//                     }
//                   }
//                 }
//               } else {
//                 for (let i = 0; i < res.devices.length; i++) {
//                   if (res.devices[i].name != "") {
//                     blueList.push(res.devices[i])
//                   }
//                 }
//               }
//               _this.setData({
//                 blueList
//               })
//             })
//           }
//         })
//       },
//       fail: res => {
//         if (res.errCode != undefined) {
//           if (res.errCode == 10001) {
//             wx.showToast({
//               title: '本机蓝牙未打开',
//               duration: 2000,
//               icon: 'none'
//             })
//           }
//         }
//         if (res.state != undefined) {
//           if (res.state == 4) {
//             wx.showToast({
//               title: '本机蓝牙未打开',
//               duration: 2000,
//               icon: 'none'
//             })
//           }
//         }
//       }
//     })
//   },

//   choiceBlue: function (e) {
//     var _this = this;
//     var deviceId = e.currentTarget.dataset.deviceid;
//     var serviceId = e.currentTarget.dataset.serviceid
//     wx.showToast({
//       title: '正在连接',
//       icon: 'none',
//       duration: 2000
//     })
//     wx.createBLEConnection({
//       deviceId,
//       timeout: 10000,
//       success: res => {
//         wx.stopBluetoothDevicesDiscovery({
//           success: res => {
//             console.log("停止搜索=>", res)
//           },
//           complete: res => {
//             app.globalData.z_option_BLE.deviceId = deviceId
//             app.globalData.z_option_BLE.serviceId = serviceId

//             setTimeout(function () {
//               _this.getOptions(deviceId, serviceId)
//             }, 500)
//           }
//         })
//       },
//       fail: res => {
//         if (res.errCode == -1) {
//           setTimeout(function () {
//             _this.getOptions(deviceId, serviceId)
//           }, 500)
//         }
//         wx.showToast({
//           title: _this.data.errMsgs[res.errCode],
//           icon: "none",
//           duration: 2000
//         })
//       }
//     })
//   },

//   getOptions: function (deviceId, serviceId) {
//     var _this = this;
//     wx.getBLEDeviceCharacteristics({
//       deviceId,
//       serviceId,
//       success: res => {
//         for (let i = 0; i < res.characteristics.length; i++) {
//           if (res.characteristics[i].properties.write &&
//             res.characteristics[i].properties.notify) {
//             app.globalData.z_option_BLE.characteristicId = res.characteristics[i].uuid
//             _this.setData({
//               option: {
//                 deviceId,
//                 serviceId,
//                 characteristicId: res.characteristics[i].uuid
//               },
//               isConn: true,
//               blueList: []
//             })
//             return;
//           }
//         }
//         wx.showToast({
//           title: _this.data.errMsgs[10004],
//           icon: 'none',
//           duration: 2000
//         })
//       }
//     })
//   },

//   createOldBLE: function () {
//     var _this = this;
//     wx.openBluetoothAdapter({
//       success: res => {
//         _this.conBleOld()
//       },
//       fail: res => {
//         console.log(res)
//         if (res.errCode == -1) {
//           this.setData({
//             option: {
//               deviceId: app.globalData.z_option_BLE.deviceId,
//               serviceId: app.globalData.z_option_BLE.serviceId,
//               characteristicId: app.globalData.z_option_BLE.characteristicId
//             },
//             isConn: true
//           })
//         }
//       }
//     })
//   },

//   conBleOld: function () {
//     wx.createBLEConnection({
//       deviceId: app.globalData.z_option_BLE.deviceId,
//       success: res => {
//         wx.showToast({
//           title: "连接成功",
//           icon: "success"
//         })
//         this.setData({
//           option: {
//             deviceId: app.globalData.z_option_BLE.deviceId,
//             serviceId: app.globalData.z_option_BLE.serviceId,
//             characteristicId: app.globalData.z_option_BLE.characteristicId
//           },
//           isConn: true
//         })
//       }
//     })
//   },

//   //打印按钮click事件
//   save: function () {
//     var _this = this;

//     if (!_this.data.isConn) {
//       wx.showToast({
//         title: '蓝牙未连接',
//         icon: 'none'
//       })
//       return;
//     } else {
//       _this.printTo()
//     }
//   },

//   printTo: function () {
//     var _this = this;
//     wx.showToast({
//       title: '正在打印',
//       icon: "none",
//       duration: 2000
//     })
//     var width = _this.data.width_user
//     var height = _this.data.height_user
//     var widths = _this.getWidth(width)
//     wx.canvasGetImageData({
//       canvasId: 'outCanvas',
//       x: 0,
//       y: 0,
//       width: widths.width,
//       height: height,
//       success: res => {

//         var imageData = res.data
//         console.log("Uint8ClampedArray=>", imageData)
//         let arr = _this.convert4to1(res.data);
//         let data = _this.convert8to1(arr);
//         //局中，传入点阵位图，初始化打印机，走纸30行
//         const cmds = [].concat([27, 97, 49], [29, 118, 48, 0, widths.width / 8 % 256, widths.width / 8 / 256, height % 256, height / 256], data, [27, 64], [27, 100, 30]);
//         const buffer = toArrayBuffer(Buffer.from(cmds, 'gbk'));
//         let arrPrint = [];
//         for (let i = 0; i < buffer.byteLength; i = i + 20) {
//           arrPrint.push(buffer.slice(i, i + 20));
//         }
//         var option = _this.data.option
//         _this.printInfo({
//           ...option
//         }, arrPrint);
//       },
//       fail: res => {
//         console.log(res)
//       }
//     })
//   },

//   getWidth: function (width) {
//     width = Math.ceil(width)
//     while (true) {
//       if (width % 8 == 0) {
//         width -= 8
//         return {
//           width,
//           lineWidth: width / 8
//         }
//       }
//       width++
//     }
//   },

//   //4合1
//   convert4to1: function (res) {
//     let arr = [];
//     for (let i = 0; i < res.length; i++) {
//       if (i % 4 == 0) {
//         let rule = 0.29900 * res[i] + 0.58700 * res[i + 1] + 0.11400 * res[i + 2];
//         if (rule > 200) {
//           res[i] = 0;
//         } else {
//           res[i] = 1;
//         }
//         arr.push(res[i]);
//       }
//     }
//     return arr;
//   },

//   //8合1
//   convert8to1(arr) {
//     let data = [];
//     for (let k = 0; k < arr.length; k += 8) {
//       let temp = arr[k] * 128 + arr[k + 1] * 64 + arr[k + 2] * 32 + arr[k + 3] * 16 + arr[k + 4] * 8 + arr[k + 5] * 4 +
//         arr[k + 6] * 2 + arr[k + 7] * 1

//       data.push(temp);
//     }
//     return data;
//   },

//   printInfo: function (device, arr, callback) {
//     let _this = this;  // 声明为 _this
//     if (arr.length > 0) {
//       _this.sendStr(device, arr[0], function (success) {
//         arr.shift();
//         _this.printInfo(device, arr, callback);  // ✅ 使用 _this
//       }, function (error) {
//         console.log(error);
//       });
//     } else {
//       callback ? callback() : '';
//     }
//   },

//   //发送数据
//   sendStr: function (device, bufferstr, success, fail) {
//     console.log('sendStr', device);
//     wx.writeBLECharacteristicValue({
//       deviceId: device.deviceId,
//       serviceId: device.serviceId,
//       characteristicId: device.characteristicId,
//       value: bufferstr,
//       success: function (res) {
//         success(res);
//         console.log('sendStr', bufferstr)
//       },
//       failed: function (res) {
//         fail(res)
//         console.log("数据发送失败:" + JSON.stringify(res))
//       },
//     })
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     var _this = this
//     var list = JSON.parse(options.list)
//     var type = options.type
//     console.log(list)
//     console.log(type)
//     _this.setData({
//       list,
//       type,
//     })
//     _this.getUserInfo(list)
//     _this.setCanvas()
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//     var _this = this;  // ✅ 添加这行
//     if (app.globalData.z_option_BLE.deviceId != "") {
//       wx.showToast({
//         title: '正在连接',
//         icon: 'none',
//         duration: 2000
//       })
//       _this.createOldBLE();  // ✅ _this 已定义
//     }
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
//     wx.closeBluetoothAdapter({
//       success: res => {
//         console.log("关闭蓝牙模块")
//       }
//     })
//     if (this.data.isConn) {
//       this.set_ble()
//     }
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
//     var _this = this;
//     //删除二维码暂存文件
//     _this.unlinkFile();
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })

const toArrayBuffer = function(data) {
  if (data instanceof ArrayBuffer) {
    return data;
  }
  if (Array.isArray(data)) {
    // 数字数组 [27, 97, 49] 转为 ArrayBuffer
    return new Uint8Array(data).buffer;
  }
  if (typeof data === 'string') {
    // 字符串转 ArrayBuffer
    const encoder = new TextEncoder();
    return encoder.encode(data).buffer;
  }
  return data;
};

// 自定义 Buffer 实现
const Buffer = {
  from: function(data, encoding) {
    console.log('Buffer.from 被调用，data类型:', typeof data, 'encoding:', encoding);
    
    if (Array.isArray(data)) {
      // 处理打印指令数组 [27, 97, 49, ...]
      return new Uint8Array(data).buffer;
    }
    
    if (typeof data === 'string') {
      // 简化处理，不真正实现GBK编码
      const encoder = new TextEncoder();
      return encoder.encode(data).buffer;
    }
    
    return data;
  }
};

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jishu: 0,
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
    ishidden: false,
    mask_hid: true,
    updComment_hid: true,
    this_photo: '',

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

  choice_system: function (e) {
    var _this = this;
    var type = _this.data.systemArray[e.detail.value];
    var gs_name = app.globalData.gongsi;
    console.log(type)
    wx.cloud.callFunction({
      name: 'sqlConnection',
      data: {
        sql: "select DISTINCT orderid from yh_jinxiaocun_mingxi where gs_name = '" + gs_name + "' and mxtype ='" + type + "'"
      },
      success: res => {
        console.log(res.result)
        _this.setData({
          order_array: res.result,
          out_in_type: type,
          order_number: '选择单号',
        })
      }
    })
  },

  choice_order: function (e) {
    var _this = this;
    var order_number = _this.data.order_array[e.detail.value];
    var gs_name = app.globalData.gongsi;
    var type = _this.data.out_in_type
    console.log(order_number.orderid)
    wx.cloud.callFunction({
      name: 'sqlConnection',
      data: {
        sql: "select ifnull(orderid,'') as orderid,ifnull(shou_h,'') as shou_h,ifnull(shijian,'') as shijian,ifnull(cpname,'') as cpname,ifnull(sp_dm,'') as sp_dm,ifnull(cplb,'') as cplb,ifnull(cpsl,0) as cpsl,ifnull(cpsj,0) as cpsj,convert(cpsl,float) * convert(cpsj,float) as cpzj from yh_jinxiaocun_mingxi where gs_name = '" + gs_name + "' and mxtype ='" + type + "' and orderid ='" + order_number.orderid + "'"
      },
      success: res => {
        console.log(res.result)
        _this.setData({
          list: res.result,
          order_number: order_number.orderid,
        })
        _this.getUserInfo(res.result)
        _this.setCanvas()
      }
    })
  },

  set_ble: function () {
    var _this = this;
    var option = _this.data.option
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update zeng_user set deviceId = '" + option.deviceId + "', serviceId = '" + option.serviceId + "', characteristicId = '" + option.characteristicId + "' where id = '" + _this.data.userInfo.id + "'"
      },
      success: res => {
        wx.showModal({
          title: '保存蓝牙连接态成功',
          content: '蓝牙连接信息已保存',
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
    _this.setData({
      jishu: 0,
      ishidden: false,
      mask_hid: true
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
    ctx.clearRect(0, 0, width, height)
    
    // 设置白色背景
    ctx.setFillStyle('#FFFFFF')
    ctx.fillRect(0, 0, width, height)
    
    ctx.setFillStyle('#000000')
    
    if (type == '客户') {
      ctx.setFontSize(12)
      ctx.setTextAlign('center')
      ctx.fillText('客户名称', width / 2 - width / 11 * 4.5, 35)
      ctx.fillText('商品代码', width / 2 - width / 11 * 2.8, 35)
      ctx.fillText('商品类别', width / 2 - width / 11 * 1, 35)
      ctx.fillText('商品名称', width / 2 + width / 11 * 1, 35)
      ctx.fillText('数量', width / 2 + width / 11 * 2.8, 35)
      ctx.fillText('金额', width / 2 + width / 11 * 4.5, 35)

      ctx.setFontSize(10)
      var y = 65;
      for (let i = 0; i < list.length; i++, y += 30) {
        ctx.fillText(list[i].shou_h, width / 2 - width / 11 * 4.5, y);
        ctx.fillText(list[i].sp_dm, width / 2 - width / 11 * 2.8, y);
        ctx.fillText(list[i].cplb, width / 2 - width / 11 * 1, y);
        ctx.fillText(list[i].cpname, width / 2 + width / 11 * 1, y);
        ctx.fillText(list[i].ruku_num, width / 2 + width / 11 * 2.8, y)
        ctx.fillText(list[i].ruku_price, width / 2 + width / 11 * 4.5, y)
      }
    } else {
      ctx.setFontSize(10)
      ctx.setTextAlign('center')
      ctx.fillText('商品代码', width / 2 - width / 11 * 4.5, 35)
      ctx.fillText('商品名称', width / 2 - width / 11 * 2.8, 35)
      ctx.fillText('类别',    width / 2 - width / 11 * 1.3, 35)
      ctx.fillText('入库数量', width / 2 , 35)
      ctx.fillText('入库金额', width / 2 + width / 11 * 1.3, 35)
      ctx.fillText('出库数量', width / 2 + width / 11 * 2.8, 35)
      ctx.fillText('出库金额', width / 2 + width / 11 * 4.5, 35)

      ctx.setFontSize(8)
      var y = 65;
      for (let i = 0; i < list.length; i++, y += 30) {
        ctx.fillText(list[i].sp_dm, width / 2 - width / 11 * 4.5, y);
        ctx.fillText(list[i].cpname, width / 2 - width / 11 * 2.8, y);
        ctx.fillText(list[i].cplb, width / 2 - width / 11 * 1.3, y);
        ctx.fillText(list[i].ruku_num, width / 2, y);
        ctx.fillText(list[i].ruku_price, width / 2 + width / 11 * 1.3, y)
        ctx.fillText(list[i].chuku_num || '', width / 2 + width / 11 * 2.8, y)
        ctx.fillText(list[i].chuku_price || '', width / 2 + width / 11 * 4.5, y)
      }
    }

    ctx.stroke()
    
    setTimeout(function() {
      ctx.draw()
      wx.canvasToTempFilePath({
        x: 0,  
        y: 0,  
        width: _this.data.width_user,  
        height: _this.data.height_user,  
        canvasId: 'outCanvas', 
        success: function (res) {    
          console.log(res.tempFilePath);
          _this.setData({
            this_photo: res.tempFilePath,
            // mask_hid: false
          })
        }
      })
    }, 1000);
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
    _this.setData({
      mask_hid: true
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
        // var heightMM = height / 300 * 25.4;        // 像素 → 毫米
        // var feedLines = Math.ceil(heightMM / 4.233) ;
        var dpi = 300;     
        var inchToMm = 25.4;  
        var lineHeightMm = 4.233; 

        // 第1步：像素 → 英寸
        var heightInch = height / dpi;  

        // 第2步：英寸 → 毫米
        var heightMm = heightInch * inchToMm;  

        // 第3步：毫米 → 行数
        var feedLines = heightMm / lineHeightMm;  

        // 第4步：向上取整 + 边距
        var feedLines = Math.ceil(5.44)

        const cmds = [].concat([27, 97, 49], [29, 118, 48, 0, widths.width / 8 % 256, widths.width / 8 / 256, height % 256, height / 256], data, [27, 64], [27, 100, feedLines]);
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
        _this.setData({
          mask_hid: false
        })
      }
    })
  },

  getUserInfo: function (list) {
    var _this = this;
    var length = list.length * 30 + 150
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

  //初始化蓝牙适配器（增强版）
  openBluetoothAdapter: function () {
    var _this = this;
    console.log('★★★ openBluetoothAdapter 函数被调用了 ★★★');
    
    // 检查蓝牙适配器是否可用
    wx.getSystemInfo({
      success: sysRes => {
        if (sysRes.platform === 'devtools') {
          wx.showToast({
            title: '开发工具不支持蓝牙调试',
            icon: 'none'
          });
          return;
        }
      }
    });
    
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log("初始化蓝牙适配器成功");
        
        // 监听蓝牙适配器状态
        wx.onBluetoothAdapterStateChange(function(res) {
          console.log('蓝牙适配器状态变化:', res);
          if (!res.available) {
            _this.setData({
              isConn: false,
              blueList: []
            });
            wx.showToast({
              title: '蓝牙已关闭',
              icon: 'none'
            });
          }
        });
        
        wx.startBluetoothDevicesDiscovery({
          powerLevel: "medium",
          allowDuplicatesKey: false,
          interval: 2000,
          success: res => {
            console.log("开始搜索=>", res)
            
            // 监听发现新设备
            wx.onBluetoothDeviceFound(res => {
              console.log('发现设备:', res);
              var devices = res.devices;
              var blueList = _this.data.blueList;
              var deviceMap = {};
              
              // 去重处理
              blueList.forEach(device => {
                deviceMap[device.deviceId] = device;
              });
              
              // 添加新发现的设备
              devices.forEach(device => {
                if (device.name && device.name.trim() !== '') {
                  deviceMap[device.deviceId] = device;
                }
              });
              
              // 更新设备列表
              var newBlueList = Object.values(deviceMap);
              _this.setData({
                blueList: newBlueList
              });
            });
            
            // 10秒后自动停止搜索
            setTimeout(() => {
              wx.stopBluetoothDevicesDiscovery({
                success: () => {
                  console.log('自动停止搜索');
                }
              });
            }, 10000);
          },
          fail: res => {
            console.log('开始搜索失败:', res);
            wx.showToast({
              title: '搜索设备失败',
              icon: 'none'
            });
          }
        });
      },
      fail: res => {
        console.log("初始化蓝牙适配器失败:", res);
        
        if (res.errCode != undefined) {
          if (res.errCode == 10001) {
            wx.showToast({
              title: '请先打开手机蓝牙',
              duration: 2000,
              icon: 'none'
            })
            
            // 引导用户打开蓝牙
            wx.showModal({
              title: '提示',
              content: '请打开手机蓝牙功能',
              confirmText: '去打开',
              success: modalRes => {
                if (modalRes.confirm) {
                  wx.openSetting({
                    success: settingRes => {
                      console.log('打开设置结果:', settingRes);
                    }
                  });
                }
              }
            });
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
    var serviceId = e.currentTarget.dataset.serviceid;
    
    // 验证参数
    if (!deviceId) {
      wx.showToast({
        title: '设备ID无效',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    wx.showToast({
      title: '正在连接',
      icon: 'none',
      duration: 2000
    })
    
    // 先停止搜索
    wx.stopBluetoothDevicesDiscovery({
      success: res => {
        console.log("已停止蓝牙搜索");
      },
      fail: (err) => {
        console.log("停止搜索失败:", err);
      }
    });
    
    // 设置连接超时
    setTimeout(() => {
      if (!_this.data.isConn) {
        wx.showToast({
          title: '连接超时，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    }, 10000);
    
    wx.createBLEConnection({
      deviceId,
      timeout: 10000,
      success: res => {
        console.log("蓝牙连接成功", res);
        
        // 连接成功后立即停止搜索
        wx.stopBluetoothDevicesDiscovery({
          success: res => {
            console.log("连接成功后停止搜索")
          }
        })
        
        app.globalData.z_option_BLE.deviceId = deviceId
        app.globalData.z_option_BLE.serviceId = serviceId

        setTimeout(function () {
          _this.getOptions(deviceId, serviceId)
        }, 800)
      },
      fail: res => {
        console.log("蓝牙连接失败", res);
        
        // 特殊处理 -1 错误（可能已经连接）
        if (res.errCode == -1) {
          setTimeout(function () {
            _this.getOptions(deviceId, serviceId)
          }, 500)
          return;
        }
        
        // 处理其他错误
        const errorMessages = _this.data.errMsgs || {};
        const errorCode = res.errCode || 'unknown';
        let errorMsg = errorMessages[errorCode];
        
        if (!errorMsg) {
          switch(errorCode) {
            case 10000:
              errorMsg = '未初始化蓝牙适配器';
              break;
            case 10001:
              errorMsg = '当前蓝牙适配器不可用';
              break;
            case 10003:
              errorMsg = '连接失败，请检查设备';
              break;
            case 10004:
              errorMsg = '设备不支持蓝牙服务';
              break;
            case 10005:
              errorMsg = '设备不支持此操作';
              break;
            default:
              errorMsg = `连接失败 (错误码: ${errorCode})`;
          }
        }
        
        wx.showToast({
          title: errorMsg,
          icon: "none",
          duration: 2000
        })
      }
    })
  },

  getOptions: function (deviceId, serviceId) {
    var _this = this;
    
    // 首先获取设备的所有服务
    wx.getBLEDeviceServices({
      deviceId: deviceId,
      success: servicesRes => {
        console.log('获取服务列表成功:', servicesRes);
        
        let targetServiceId = serviceId;
        
        // 如果没有指定serviceId，尝试寻找打印服务
        if (!targetServiceId && servicesRes.services.length > 0) {
          // 常见打印机的服务UUID
          const printServiceUUIDs = [
            '000018F0-0000-1000-8000-00805F9B34FB', // 常见的打印服务
            '0000AE00-0000-1000-8000-00805F9B34FB', // 另一常见打印服务
            servicesRes.services[0].uuid // 使用第一个服务
          ];
          
          for (let uuid of printServiceUUIDs) {
            const found = servicesRes.services.find(s => s.uuid.toLowerCase() === uuid.toLowerCase());
            if (found) {
              targetServiceId = found.uuid;
              break;
            }
          }
          
          if (!targetServiceId) {
            targetServiceId = servicesRes.services[0].uuid;
          }
        }
        
        // 获取服务的特征
        wx.getBLEDeviceCharacteristics({
          deviceId: deviceId,
          serviceId: targetServiceId,
          success: res => {
            console.log('获取特征列表成功:', res);
            
            let targetCharacteristic = null;
            
            // 寻找可写的特征
            for (let i = 0; i < res.characteristics.length; i++) {
              const char = res.characteristics[i];
              console.log(`特征 ${i}: ${char.uuid}, 属性:`, char.properties);
              
              // 优先选择有write属性的特征
              if (char.properties.write) {
                targetCharacteristic = char;
                break;
              }
            }
            
            // 如果没有找到write，尝试找writeWithoutResponse
            if (!targetCharacteristic) {
              for (let i = 0; i < res.characteristics.length; i++) {
                const char = res.characteristics[i];
                if (char.properties.writeWithoutResponse) {
                  targetCharacteristic = char;
                  break;
                }
              }
            }
            
            if (targetCharacteristic) {
              app.globalData.z_option_BLE.characteristicId = targetCharacteristic.uuid
              app.globalData.z_option_BLE.serviceId = targetServiceId
              
              _this.setData({
                option: {
                  deviceId,
                  serviceId: targetServiceId,
                  characteristicId: targetCharacteristic.uuid
                },
                isConn: true,
                blueList: []
              })
              
              wx.showToast({
                title: '连接成功',
                icon: 'success',
                duration: 2000
              })
              
              // 如果需要通知，开启通知
              if (targetCharacteristic.properties.notify || targetCharacteristic.properties.indicate) {
                wx.notifyBLECharacteristicValueChange({
                  deviceId,
                  serviceId: targetServiceId,
                  characteristicId: targetCharacteristic.uuid,
                  state: true,
                  success: () => {
                    console.log('开启通知成功');
                  }
                });
              }
            } else {
              wx.showToast({
                title: '未找到可用的打印特征',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: err => {
            console.log('获取特征失败:', err);
            wx.showToast({
              title: '获取设备特征失败',
              icon: 'none',
              duration: 2000
            });
          }
        })
      },
      fail: err => {
        console.log('获取服务失败:', err);
        wx.showToast({
          title: '获取设备服务失败',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },

  createOldBLE: function () {
    var _this = this;
    
    // 首先检查蓝牙适配器
    wx.openBluetoothAdapter({
      success: res => {
        console.log('蓝牙适配器已打开，开始连接');
        _this.conBleOld()
      },
      fail: res => {
        console.log(res)
        if (res.errCode == -1) {
          // 适配器已打开，直接连接
          this.setData({
            option: {
              deviceId: app.globalData.z_option_BLE.deviceId,
              serviceId: app.globalData.z_option_BLE.serviceId,
              characteristicId: app.globalData.z_option_BLE.characteristicId
            },
            isConn: true
          })
        } else {
          wx.showToast({
            title: '蓝牙适配器不可用',
            icon: 'none'
          })
        }
      }
    })
  },

  conBleOld: function () {
    var _this = this;
    
    if (!app.globalData.z_option_BLE.deviceId) {
      wx.showToast({
        title: '无设备连接信息',
        icon: 'none'
      })
      return;
    }
    
    wx.createBLEConnection({
      deviceId: app.globalData.z_option_BLE.deviceId,
      timeout: 10000,
      success: res => {
        console.log("连接成功", res)
        wx.showToast({
          title: "连接成功",
          icon: "success"
        })
        _this.setData({
          option: {
            deviceId: app.globalData.z_option_BLE.deviceId,
            serviceId: app.globalData.z_option_BLE.serviceId,
            characteristicId: app.globalData.z_option_BLE.characteristicId
          },
          isConn: true
        })
      },
      fail: res => {
        console.log("连接失败", res)
        wx.showToast({
          title: "连接失败，请重新搜索",
          icon: "none"
        })
        
        // 清除旧的连接信息
        app.globalData.z_option_BLE.deviceId = "";
        app.globalData.z_option_BLE.serviceId = "";
        app.globalData.z_option_BLE.characteristicId = "";
        
        _this.setData({
          isConn: false
        });
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

  //4合1（改进版，提高阈值避免左侧黑条）
  convert4to1: function (res) {
    let arr = [];
    for (let i = 0; i < res.length; i++) {
      if (i % 4 == 0) {
        let rule = 0.29900 * res[i] + 0.58700 * res[i + 1] + 0.11400 * res[i + 2];
        // 提高阈值，避免浅色区域被打印
        if (rule > 240) {  // 从200提高到240
          arr.push(0);
        } else {
          arr.push(1);
        }
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
    let _this = this;  // 声明为 _this
    if (arr.length > 0) {
      _this.sendStr(device, arr[0], function (success) {
        arr.shift();
        _this.printInfo(device, arr, callback);  // ✅ 使用 _this
      }, function (error) {
        console.log(error);
      });
    } else {
      callback ? callback() : '';
    }
    _this.setData({
      mask_hid: false
    })
  },

  //发送数据（增强版）
  sendStr: function (device, bufferstr, success, fail) {
    console.log('sendStr', device);
    
    // 确保数据是ArrayBuffer格式
    let value = bufferstr;
    if (value instanceof Uint8Array) {
      value = value.buffer;
    } else if (Array.isArray(value)) {
      value = new Uint8Array(value).buffer;
    }
    
    wx.writeBLECharacteristicValue({
      deviceId: device.deviceId,
      serviceId: device.serviceId,
      characteristicId: device.characteristicId,
      value: value,
      success: function (res) {
        success(res);
        console.log('sendStr', bufferstr)
      },
      fail: function (res) { // 这里改成fail，不是failed
        console.log("数据发送失败:" + JSON.stringify(res))
        
        // 尝试使用writeWithoutResponse
        if (res.errCode === 10008) { // 操作不支持
          console.log('尝试使用writeWithoutResponse');
          wx.writeBLECharacteristicValue({
            deviceId: device.deviceId,
            serviceId: device.serviceId,
            characteristicId: device.characteristicId,
            value: value,
            writeType: 'writeWithoutResponse',
            success: function(res2) {
              console.log('writeWithoutResponse成功');
              success(res2);
            },
            fail: function(res2) {
              console.log("writeWithoutResponse也失败:", res2);
              fail(res2);
            }
          });
        } else {
          fail(res);
        }
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
    var _this = this;  // ✅ 添加这行
    
    // 检查是否有已保存的连接信息
    if (app.globalData.z_option_BLE.deviceId && app.globalData.z_option_BLE.deviceId !== "") {
      console.log('尝试重连之前的蓝牙设备');
      
      // 先显示连接提示
      wx.showToast({
        title: '正在连接设备...',
        icon: 'loading',
        duration: 2000
      })
      
      // 延迟执行连接，避免太快
      setTimeout(() => {
        _this.createOldBLE();
      }, 1000);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 停止搜索
    wx.stopBluetoothDevicesDiscovery({
      success: res => {
        console.log("停止蓝牙搜索")
      }
    })
    
    // 注意：不要在这里关闭蓝牙适配器，因为其他页面可能还在使用
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var _this = this;
    
    // 关闭蓝牙适配器
    wx.closeBluetoothAdapter({
      success: res => {
        console.log("关闭蓝牙适配器成功")
      },
      fail: err => {
        console.log("关闭蓝牙适配器失败:", err);
      }
    })
    
    //删除二维码暂存文件
    _this.unlinkFile();
    
    // 如果需要，保存蓝牙连接状态
    if (this.data.isConn) {
      this.set_ble()
    }
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