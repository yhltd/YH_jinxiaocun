// 自定义 toArrayBuffer 实现
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

var Promisify = require('../utils/utils.js')
const app = getApp();
import QR from './weapp-qrcode-base64.js'
var wxbarcode = require('../utils/index.js');
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
    ishidden:false,
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
      jishu: 0,
      ishidden:false,
      mask_hid: true
    })
    var list = _this.data.list
    var width = _this.data.width_user
    var height = _this.data.height_user
    
    const ctx = wx.createCanvasContext('outCanvas')
    
    // ✅ 第一步：设置所有基础绘制命令（不调用 draw）
    ctx.setFillStyle('#FFFFFF')
    ctx.fillRect(0,0,width,height)  // 白色背景
    
    ctx.setFillStyle('#000000')  // 黑色文字
    ctx.setFontSize(25)
    
    var y = 10;
    var z = 10;
    
    // 预定义所有文字的绘制命令
    for (let i = 0; i < list.length; i++, y += 150) {
      ctx.fillText(list[i].sp_dm, 100, 440+i*500);
      ctx.fillText(list[i].mingcheng, 100, 490+i*500);
      
      // 生成二维码
      var imgData = QR.drawImg(list[i].sp_dm.replace("订单号：",'').replace("商品代码：",''), {
        typeNumber: 4,
        errorCorrectLevel: 'M',
        size: 500
      })
      
      wxbarcode.barcode('barcode' + i, list[i].sp_dm.replace("订单号：",'').replace("商品代码：",''), 680, 200);
      
      // ✅ 关键修改：将二维码绘制也整合到Promise中
      new Promise((resolve, reject) => {
        const fs = wx.getFileSystemManager();
        var times = new Date().getTime();
        var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
        fs.writeFile({
          filePath: codeimg,
          data: imgData.split(",")[1],
          encoding: 'base64',
          success: () => {
            resolve(codeimg)
          }
        });
      }).then(res => {
        // 在Promise回调中绘制二维码
        ctx.drawImage(res, 100, 10 + z, 380, 380)
        z = z + 500
      })
    }
    
    // ✅ 第二步：等待所有Promise完成，然后一次性draw
    // 这里需要等待所有二维码图片都保存并绘制完成
    setTimeout(function() {
      // ✅ 所有绘制命令设置完成后，统一调用一次 draw
      ctx.draw(true)  // 参数true表示立即绘制
      
      var this_xiabiao = 0
      for(var i=0; i<list.length; i++){
        wx.canvasToTempFilePath({
          canvasId: 'barcode' + i,
          success: function (res) {
            console.log(res.tempFilePath)
            console.log(this_xiabiao)
            list[this_xiabiao].path = res.tempFilePath
            _this.setData({
              list,
              ishidden:true
            })
            console.log(_this.data.list)
            this_xiabiao = this_xiabiao + 1
          }
        })
      }
      
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
            mask_hid: false
          })
        }
      })
    }, 3000);  // 等待足够时间让所有二维码图片都加载完成
  },

  setCanvas_yiwei: function (comment_order) {
    var _this = this;
    _this.setData({
      jishu: 0,
      mask_hid: true
    })
    var list = _this.data.list
    var width = _this.data.width_user
    var height = _this.data.height_user
    
    const ctx = wx.createCanvasContext('outCanvas')
    
    // ✅ 第一步：设置所有绘制命令（不要调用 draw）
    ctx.setFillStyle('#FFFFFF')
    ctx.fillRect(0,0,width,height)  // 1. 白色背景
    
    ctx.setFillStyle('#000000')  // 2. 黑色文字
    ctx.setFontSize(25)
    
    var y = 10;
    var z = 10;
    for (let i = 0; i < list.length; i++, y += 150) {
      ctx.fillText(list[i].sp_dm, 100, 440+i*500);  // 3. 文字
      ctx.fillText(list[i].mingcheng, 100, 490+i*500);
      
      // 4. 图片（确保 list[i].path 已存在）
      if (list[i].path) {
        ctx.drawImage(list[i].path, 100, 10 + z, 380, 380)
      }
      z = z + 500
    }
    
    // ✅ 第二步：等待图片加载完成，然后一次性 draw
    setTimeout(function() {
      ctx.draw(true)  // ✅ 一次性绘制所有内容（参数true表示立即绘制）
      
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
            mask_hid: false
          })
        }
      })
    }, 3000);  // 等待图片可能加载完成
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
      x: 100,
      y: 0,
      width: widths.width,
      height: height,
      success: res => {

        var imageData = res.data
        console.log("Uint8ClampedArray=>", imageData)
        let arr = _this.convert4to1(res.data);
        let data = _this.convert8to1(arr);
        // var feedLines = _this.data.list.length * 8;
        // var heightMM = height / 300 * 25.4;        // 像素 → 毫米
        // var feedLines = Math.ceil(heightMM / 4.233) + 2;

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

        //局中，传入点阵位图，初始化打印机，走纸30行
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

  // ================= 修改开始：修复蓝牙权限问题 =================
  
  //初始化蓝牙适配器 - 修复版本
  openBluetoothAdapter: function () {
    var _this = this;
    console.log('★★★ openBluetoothAdapter 函数被调用了 ★★★');
    
    // 检查开发工具
    wx.getSystemInfo({
      success: sysRes => {
        if (sysRes.platform === 'devtools') {
          wx.showToast({
            title: '开发工具不支持蓝牙调试',
            icon: 'none'
          });
          return;
        }
        
        // 显示加载提示
        wx.showLoading({
          title: '正在检查权限...',
          mask: true
        });
        
        // 关键修复：直接请求位置权限，不检查现有状态
        wx.authorize({
          scope: 'scope.userLocation',
          success: () => {
            console.log('✅ 位置权限授权成功');
            
            // 初始化蓝牙适配器
            _this.initBluetoothAdapter();
          },
          fail: (authErr) => {
            console.log('❌ 位置权限授权失败:', authErr);
            wx.hideLoading();
            
            // 显示权限引导
            _this.showPermissionGuide();
          }
        });
      }
    });
  },
  
  /**
   * 初始化蓝牙适配器（核心函数）
   */
  initBluetoothAdapter: function() {
    var _this = this;
    
    wx.openBluetoothAdapter({
      mode: 'central',
      success: function (res) {
        console.log("✅ 蓝牙适配器初始化成功");
        wx.hideLoading();
        
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
        
        // 开始搜索设备
        _this.startBluetoothDiscovery();
      },
      fail: res => {
        console.log("❌ 蓝牙适配器初始化失败:", res);
        wx.hideLoading();
        
        // 详细的错误处理
        let errorMsg = '蓝牙初始化失败';
        
        if (res.errCode === 10001) {
          errorMsg = '请先打开手机蓝牙';
          _this.showBluetoothGuide();
        } else if (res.errCode === 10000) {
          errorMsg = '未初始化蓝牙适配器';
        } else if (res.errCode === 10005) {
          errorMsg = '系统版本过低，不支持蓝牙功能';
        } else if (res.errCode === 10006) {
          errorMsg = '蓝牙功能被禁用';
        } else if (res.errCode === 10007) {
          errorMsg = '蓝牙服务不可用';
        }
        
        wx.showToast({
          title: errorMsg,
          icon: 'none',
          duration: 3000
        });
      }
    });
  },
  
  /**
   * 开始蓝牙设备搜索
   */
  startBluetoothDiscovery: function() {
    var _this = this;
    
    wx.showLoading({
      title: '正在搜索设备...',
      mask: true
    });
    
    wx.startBluetoothDevicesDiscovery({
      powerLevel: "medium",
      allowDuplicatesKey: false,
      interval: 2000,
      success: res => {
        console.log("✅ 开始搜索蓝牙设备成功");
        wx.hideLoading();
        
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
        console.log('❌ 开始搜索失败:', res);
        wx.hideLoading();
        
        // 处理权限被拒绝的错误
        if (res.errCode === -1 && res.errMsg.includes('location permission')) {
          console.log('蓝牙搜索权限被拒绝，需要修复');
          
          // 显示修复方案
          _this.showPermissionFixGuide();
        } else {
          wx.showToast({
            title: '搜索设备失败',
            icon: 'none'
          });
        }
      }
    });
  },
  
  /**
   * 显示权限引导
   */
  showPermissionGuide: function() {
    wx.getSystemInfo({
      success: (sysInfo) => {
        let guideContent = '';
        let title = '需要位置权限';
        
        if (sysInfo.platform === 'android') {
          guideContent = '扫描蓝牙设备需要位置权限。\n\n请按以下步骤操作：\n' +
            '1. 点击"去设置"\n' +
            '2. 找到"位置信息"权限\n' +
            '3. 选择"使用小程序时允许"\n' +
            '4. 返回小程序重试';
        } else if (sysInfo.platform === 'ios') {
          guideContent = '扫描蓝牙设备需要位置权限。\n\n请按以下步骤操作：\n' +
            '1. 点击"去设置"\n' +
            '2. 找到"位置"权限\n' +
            '3. 选择"使用小程序期间"\n' +
            '4. 返回小程序重试';
        } else {
          guideContent = '扫描蓝牙设备需要位置权限，请授权位置权限。';
        }
        
        wx.showModal({
          title: title,
          content: guideContent,
          confirmText: '去设置',
          cancelText: '取消',
          success: (res) => {
            if (res.confirm) {
              wx.openSetting({
                success: (settingRes) => {
                  console.log('打开设置成功:', settingRes);
                  // 延迟后重新尝试
                  setTimeout(() => {
                    this.openBluetoothAdapter();
                  }, 1000);
                }
              });
            }
          }
        });
      }
    });
  },
  
  /**
   * 显示权限修复指南（针对权限被拒绝的情况）
   */
  showPermissionFixGuide: function() {
    wx.showModal({
      title: '权限问题解决方案',
      content: '检测到位置权限问题，请尝试以下操作：\n\n' +
        '1️⃣ 第一步：\n' +
        '• 点击"修复权限"\n' +
        '• 重新授权位置权限\n\n' +
        '2️⃣ 第二步（如果第一步无效）：\n' +
        '• 完全退出微信\n' +
        '• 重新打开微信\n' +
        '• 返回小程序重试\n\n' +
        '3️⃣ 第三步（如果还是不行）：\n' +
        '• 确保手机蓝牙已开启\n' +
        '• 确保位置服务/GPS已开启',
      confirmText: '修复权限',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 尝试修复权限
          this.fixBluetoothPermission();
        }
      }
    });
  },
  
  /**
   * 修复蓝牙权限
   */
  fixBluetoothPermission: function() {
    var _this = this;
    
    wx.showLoading({
      title: '正在修复权限...',
      mask: true
    });
    
    // 先关闭蓝牙适配器
    wx.closeBluetoothAdapter({
      success: () => {
        console.log('关闭蓝牙适配器成功');
        
        // 延迟后重新打开设置
        setTimeout(() => {
          wx.hideLoading();
          wx.openSetting({
            success: () => {
              // 再次尝试
              setTimeout(() => {
                _this.openBluetoothAdapter();
              }, 1000);
            }
          });
        }, 500);
      },
      fail: (err) => {
        wx.hideLoading();
        console.log('关闭蓝牙适配器失败:', err);
        // 直接重试
        setTimeout(() => {
          _this.openBluetoothAdapter();
        }, 1000);
      }
    });
  },
  
  /**
   * 显示蓝牙开启指南
   */
  showBluetoothGuide: function() {
    wx.showModal({
      title: '开启蓝牙',
      content: '请先开启手机蓝牙功能：\n\n' +
        '1. 下拉通知栏\n' +
        '2. 点击蓝牙图标开启\n' +
        '3. 返回小程序重试\n\n' +
        '如果通知栏没有蓝牙开关：\n' +
        '1. 进入手机"设置"\n' +
        '2. 找到"蓝牙"设置\n' +
        '3. 开启蓝牙功能',
      confirmText: '知道了',
      showCancel: false
    });
  },

  // ================= 以下原有代码保持不变 =================

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
    });
    
    // 先停止搜索
    wx.stopBluetoothDevicesDiscovery({
      success: () => {
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
      deviceId: deviceId,
      timeout: 10000,
      success: res => {
        console.log("蓝牙连接成功", res);
        
        // 连接成功后立即停止搜索
        wx.stopBluetoothDevicesDiscovery({
          success: () => {
            console.log("连接成功后停止搜索");
          }
        });
        
        app.globalData.z_option_BLE.deviceId = deviceId;
        app.globalData.z_option_BLE.serviceId = serviceId;
        
        // 延迟获取服务特征
        setTimeout(function() {
          _this.getOptions(deviceId, serviceId);
        }, 800);
      },
      fail: res => {
        console.log("蓝牙连接失败", res);
        
        // 特殊处理 -1 错误（可能已经连接）
        if (res.errCode == -1) {
          setTimeout(function() {
            _this.getOptions(deviceId, serviceId);
          }, 500);
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
        });
      }
    });
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
              app.globalData.z_option_BLE.characteristicId = targetCharacteristic.uuid;
              app.globalData.z_option_BLE.serviceId = targetServiceId;
              
              _this.setData({
                option: {
                  deviceId,
                  serviceId: targetServiceId,
                  characteristicId: targetCharacteristic.uuid
                },
                isConn: true,
                blueList: []
              });
              
              wx.showToast({
                title: '连接成功',
                icon: 'success',
                duration: 2000
              });
              
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
              });
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
        });
      },
      fail: err => {
        console.log('获取服务失败:', err);
        wx.showToast({
          title: '获取设备服务失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  createOldBLE: function () {
    var _this = this;
    
    // 首先检查蓝牙适配器
    wx.openBluetoothAdapter({
      success: res => {
        console.log('蓝牙适配器已打开，开始连接');
        _this.conBleOld();
      },
      fail: res => {
        console.log('打开蓝牙适配器失败:', res);
        
        if (res.errCode == -1) {
          // 适配器已打开，直接连接
          this.setData({
            option: {
              deviceId: app.globalData.z_option_BLE.deviceId,
              serviceId: app.globalData.z_option_BLE.serviceId,
              characteristicId: app.globalData.z_option_BLE.characteristicId
            },
            isConn: true
          });
        } else {
          wx.showToast({
            title: '蓝牙适配器不可用',
            icon: 'none'
          });
        }
      }
    });
  },

  conBleOld: function () {
    var _this = this;
    
    if (!app.globalData.z_option_BLE.deviceId) {
      wx.showToast({
        title: '无设备连接信息',
        icon: 'none'
      });
      return;
    }
    
    wx.createBLEConnection({
      deviceId: app.globalData.z_option_BLE.deviceId,
      timeout: 10000,
      success: res => {
        console.log("连接成功", res);
        wx.showToast({
          title: "连接成功",
          icon: "success"
        });
        
        _this.setData({
          option: {
            deviceId: app.globalData.z_option_BLE.deviceId,
            serviceId: app.globalData.z_option_BLE.serviceId,
            characteristicId: app.globalData.z_option_BLE.characteristicId
          },
          isConn: true
        });
      },
      fail: res => {
        console.log("连接失败", res);
        wx.showToast({
          title: "连接失败，请重新搜索",
          icon: "none"
        });
        
        // 清除旧的连接信息
        app.globalData.z_option_BLE.deviceId = "";
        app.globalData.z_option_BLE.serviceId = "";
        app.globalData.z_option_BLE.characteristicId = "";
        
        _this.setData({
          isConn: false
        });
      }
    });
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
    let _this = this;
    if (arr.length > 0) {
      _this.sendStr(device, arr[0], function (success) {
        arr.shift();
        _this.printInfo(device, arr, callback);
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

  //发送数据
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
    var _this = this;
    
    // 检查是否有已保存的连接信息
    if (app.globalData.z_option_BLE.deviceId && app.globalData.z_option_BLE.deviceId !== "") {
      console.log('尝试重连之前的蓝牙设备');
      
      // 先显示连接提示
      wx.showToast({
        title: '正在连接设备...',
        icon: 'loading',
        duration: 2000
      });
      
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
        console.log("停止蓝牙搜索");
      }
    });
    
    // 注意：不要在这里关闭蓝牙适配器，因为其他页面可能还在使用
    // 可以在onUnload中关闭
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var _this = this;
    
    // 关闭蓝牙适配器
    wx.closeBluetoothAdapter({
      success: res => {
        console.log("关闭蓝牙适配器成功");
      },
      fail: err => {
        console.log("关闭蓝牙适配器失败:", err);
      }
    });
    
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