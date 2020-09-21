var toArrayBuffer = require('to-array-buffer');
var Buffer = require('buffer/').Buffer;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userInfo : [],
    list : [],
    order_id : "",


    width_user_all : 0,
    width_user : 0,
    height_user : 0,

    mask_hid : true,
    updComment_hid : true,

    errMsgs : {
      "10003" : "连接失败，重开蓝牙试试~",
      "10012" : "连接超时，重开蓝牙试试~",
      "10009" : "手机版本不支持",
      "10004" : "设备不支持",
      "10005" : "设备不支持"
    },

    isConn : false,
    blueList : [],
    option : {
      deviceId : "",
      serviceId : "",
      characteristicId : ""
    }
  },

  setCanvas : function(comment_order){
    var _this = this;
    var list = _this.data.list
    var userInfo = _this.data.userInfo;

    var width_all = _this.data.width_user_all
    var width = _this.data.width_user
    var height = _this.data.height_user
    const ctx = wx.createCanvasContext('outCanvas')

    ctx.setFillStyle("white")
    ctx.fillRect(0,0,width,height)
    
    ctx.setTextAlign('center')
    ctx.setFillStyle('#000000')
    ctx.setFontSize(20)   
    ctx.fillText('出库单', width / 2, 35)
    ctx.setFontSize(13)   
    ctx.setTextAlign('left')
    ctx.fillText('单号：'+_this.data.order_id, 0, 75)
    ctx.setTextAlign('right')
    ctx.fillText('开单时间：'+_this.getTime(), width, 75)
    ctx.setTextAlign('left')
    ctx.fillText('销售员：'+userInfo.userName, 0, 95)

    ctx.moveTo(0, 115)
    ctx.lineTo((width_all-width)/2+width, 115)

    ctx.setFontSize(16)   
    ctx.setTextAlign('center')
    ctx.fillText('商品名', width / 2-width / 5*2, 145)
    ctx.fillText('数量', width / 2-width / 5, 145)
    ctx.fillText('金额', width / 2, 145)
    ctx.fillText('支付方式', width / 2+width / 5, 145)
    ctx.fillText('备注', width / 2+width / 5*2, 145)
    

    ctx.moveTo(0, 165)
    ctx.lineTo((width_all-width)/2+width, 165)

    ctx.setFontSize(14)
    var y = 185;
    for(let i=0;i<list.length;i++,y+=30){
      let price = list[i].num*list[i].price
      if(list[i].discount!=0){
        price = Math.floor(price*list[i].discount*100)/100+"/"+list[i].discount*10+"折"
      }else{
        price = Math.floor(price*100)/100
      }
      ctx.fillText(list[i].name, width / 2-width / 5*2, y);
      ctx.fillText(list[i].num, width / 2-width / 5, y);
      ctx.fillText(price, width / 2, y);
      ctx.fillText(list[i].payType, width / 2+width / 5, y);
      if(list[i].comment.length>3){
        ctx.fillText(list[i].comment.substr(0,3), width / 2+width / 5*2, y);
        y+=30
        ctx.setTextAlign('left')
        ctx.fillText(list[i].comment.substr(3),  20, y);
        ctx.setTextAlign('center')
      }else{
        ctx.fillText(list[i].comment, width / 2+width / 5*2, y);
      }
    }

    ctx.moveTo(0, y-20)
    ctx.lineTo((width_all-width)/2+width, y-20)

    if(comment_order!="" && comment_order!=undefined){
      let h = y
      ctx.setTextAlign('left')
      h+=30
      ctx.setFontSize(15)
      var comment_orders = [];
      //一行的长度
      var columnLength = width/2/15;
      //循环次数
      var num = Math.ceil(comment_order.length/columnLength);
      
      for(let x=0;x<num;x++,h+=15){
        ctx.fillText(
          comment_order.substring(
            x*columnLength,
            columnLength+x*columnLength
          ), 0, h
        )
      }
    }


    

    //canvas不支持在真机上显示base64图片；保存图片到暂存文件
    var base64 = userInfo.qrCode_shop;
    //去空格
    base64 = base64.replace(/\ +/g, ""); 
    base64 = base64.replace(/[\r\n]/g, "");
   
    //真机是wx:file
    let filePath =  wx.env.USER_DATA_PATH + "/出库单" + new Date().getTime().toString() + ".png"
    var arrayBuffer = wx.base64ToArrayBuffer(base64)
    const ms = wx.getFileSystemManager()
    ms.writeFile({
      filePath : filePath,
      data : arrayBuffer,
      encoding: 'binary',
      success: () => { 
        ctx.drawImage(filePath,width/2+width_all-width,y,150,150)
    
        ctx.stroke()
        ctx.draw()
        
        wx.hideLoading({
          success: (res) => {},
        })
      },
      fail : res=> {
        console.log("失败",res)
      },
    })
  },

  getQRCodeBase64 : function(id){
    var _this = this;
    wx.showLoading({
      title: '加载中',
      mask : 'true'
    })
    wx.cloud.callFunction({
      name : 'sqlServer_117',
      data : {
        query : "select * from zeng_user where id = '"+id+"'"
      },
      success : res=> {
        var userInfo = res.result.recordset[0]
        _this.setData({
          userInfo
        })
        _this.setCanvas()
      }
    })
  },

  getUserInfo : function(list){
    var _this = this;
    var length = list.length*30+350
    for(let i=0;i<list.length;i++){
      if(list[i].comment.length>3){
        length+=30
      }
    }
    wx.getSystemInfo({
      success: res=> {
        _this.setData({
          width_user_all : res.windowWidth,
          width_user : res.windowWidth*0.98,
          height_user : length
        })
      },
    })
  },

  getTime : function(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

    return year+"-"+month+"-"+day+" "+hour+":"+minute
  },

  updComment_show : function(){
    var _this = this;

    _this.setData({
      mask_hid : false,
      updComment_hid : false
    })
  },

  hid_view : function(){
    this.setData({
      mask_hid : true,
      updComment_hid : true
    })
  },

  updComment : function(e){
    var _this = this;
    _this.hid_view()
    var value = e.detail.value.comment_order

    _this.setCanvas(value)
  },

  setSetting : function(){
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '请先授权再保存此图片',
      success(res) {
        if(res.confirm){
          wx.openSetting({
            success : res=> {
              if(res.authSetting['scope.writePhotosAlbum']){
                _this.save();
              }else{
                wx.showToast({
                  title: '未授权，保存失败',
                  icon : 'none',
                  duration : 2000
                })
              }
            }
          })
        }
        if(res.cancel){
          wx.showToast({
            title: '未授权，保存失败',
            icon : 'none',
            duration : 2000
          })
        }
      }
    })
  },

  unlinkFile : function(){
    wx.getFileSystemManager().readdir({  // 获取文件列表
      dirPath: wx.env.USER_DATA_PATH,
      success : res=> {
        res.files.forEach(el => { 
          ms.unlink({
            filePath: wx.env.USER_DATA_PATH + "/" + el,
            fail : res=> {
              console.log('readdir文件删除失败：',res)
            }
          });
        })
      }
    })
  },

  save : function(){
    var _this = this;

    wx.openBluetoothAdapter({
      success: function (res) {
        console.log("初始化蓝牙适配器状态");
        console.log(res);
        wx.getBluetoothAdapterState({
          success: res=> {
            if(res.available){
              console.log("蓝牙适配器可用");
              console.log(res);
              wx.createBLEConnection({
                deviceId: "04:7F:0E:05:B8:DE",
                timeout : 10000,
                success : res=> {
                  console.log("连接成功")
                  wx.showToast({
                    title: '连接成功',
                    icon : 'none'
                  })

                  _this.printTo()
                },
                fail : res=> {
                  console.log(res)
                  if(res.errCode == 10012){
                    wx.showToast({
                      title: '连接超时',
                      icon : 'none',
                      duration : 2000
                    })
                  }
                  if(res.errCode == -1){
                    _this.printTo()
                  }
                }
              })
            }
          },
          fail : res=> {
            console.log(res)
          }
        })
      },
      fail : res=> {
        if(res.errCode!=undefined){
          if(res.errCode==10001){
            wx.showToast({
              title: '本机蓝牙未打开',
              duration : 2000,
              icon : 'none'
            })
          }
        }
        if(res.state!=undefined){
          if(res.state == 4){
            wx.showToast({
              title: '本机蓝牙未打开',
              duration : 2000,
              icon : 'none'
            })
          }
        }
      }
    })
  },

  //初始化蓝牙适配器
  openBluetoothAdapter : function(){
    var _this = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log("初始化蓝牙适配器状态");
        console.log(res);
        wx.startBluetoothDevicesDiscovery({
          powerLevel : "medium",
          success : res=> {
            console.log("开始搜索=>",res)
            wx.onBluetoothDeviceFound(res => {
              console.log(res)
              var blueList = _this.data.blueList;
              if(blueList.length!=0){
                for(let i=0;i<res.devices.length;i++){
                  if(res.devices[i].name!=""){
                    for(let j=0;j<blueList.length;j++){
                      if(res.devices[i].deviceId!=blueList[j].deviceId){
                        blueList.push(res.devices[i])
                      }
                    }
                  }
                }
              }else{
                for(let i=0;i<res.devices.length;i++){
                  if(res.devices[i].name!=""){
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
      fail : res=> {
        if(res.errCode!=undefined){
          if(res.errCode==10001){
            wx.showToast({
              title: '本机蓝牙未打开',
              duration : 2000,
              icon : 'none'
            })
          }
        }
        if(res.state!=undefined){
          if(res.state == 4){
            wx.showToast({
              title: '本机蓝牙未打开',
              duration : 2000,
              icon : 'none'
            })
          }
        }
      }
    })
  },

  choiceBlue : function(e){
    var _this = this;
    var deviceId = e.currentTarget.dataset.deviceid;
    var serviceId = e.currentTarget.dataset.serviceid
    wx.showToast({
      title: '正在连接',
      icon : 'none',
      duration : 2000
    })
    wx.createBLEConnection({
      deviceId,
      timeout : 10000,
      success : res=> {
        wx.stopBluetoothDevicesDiscovery({
          success : res=> {
            console.log("停止搜索=>",res)
          },
          complete : res=> {
            app.globalData.z_option_BLE.deviceId = deviceId
            app.globalData.z_option_BLE.serviceId = serviceId
    
            setTimeout(function(){
              _this.getOptions(deviceId,serviceId)
            },500)
          }
        })
      },
      fail : res=> {
        if(res.errCode==-1){
          setTimeout(function(){
            _this.getOptions(deviceId,serviceId)
          },500)
        }
        wx.showToast({
          title : errMsgs[res.errCode],
          icon : "none",
          duration : 2000
        })
      }
    })
  },

  getOptions : function(deviceId,serviceId){
    var _this = this;
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success : res=> {
        for(let i=0;i<res.characteristics.length;i++){
          if(res.characteristics[i].properties.write &&
            res.characteristics[i].properties.notify){
              app.globalData.z_option_BLE.characteristicId = res.characteristics[i].uuid
              _this.setData({
                option : {
                  deviceId,
                  serviceId,
                  characteristicId : res.characteristics[i].uuid
                },
                isConn : true,
                blueList : []
              })
              return;
            }
        }
        wx.showToast({
          title: _this.data.errMsgs[10004],
          icon : 'none',
          duration : 2000
        })
      }
    })
  },

  createOldBLE : function(){
    var _this = this;
    wx.openBluetoothAdapter({
      success : res=> {
        _this.conBleOld()
      },
      fail : res=> {
        console.log(res)
        if(res.errCode==-1){
          this.setData({
            option : {
              deviceId : app.globalData.z_option_BLE.deviceId,
              serviceId : app.globalData.z_option_BLE.serviceId,
              characteristicId : app.globalData.z_option_BLE.characteristicId
            },
            isConn : true
          })
        }
      }
    })
  },

  conBleOld : function(){
    wx.createBLEConnection({
      deviceId: app.globalData.z_option_BLE.deviceId,
      success : res=> {
        this.setData({
          option : {
            deviceId : app.globalData.z_option_BLE.deviceId,
            serviceId : app.globalData.z_option_BLE.serviceId,
            characteristicId : app.globalData.z_option_BLE.characteristicId
          },
          isConn : true
        })
      },
      fail : res=> {
        if(res.errCode==-1){
          this.setData({
            option : {
              deviceId : app.globalData.z_option_BLE.deviceId,
              serviceId : app.globalData.z_option_BLE.serviceId,
              characteristicId : app.globalData.z_option_BLE.characteristicId
            },
            isConn : true
          })
        }
      }
    })
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
        const cmds = [].concat([27, 97, 49],[29, 118, 48, 0, widths.width/8%256, widths.width/8/256, height%256, height/256], data, [27, 100, 10], [27, 64]);
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


  grayPixle : function(pix) {
    return pix[0] * 0.299 + pix[1] * 0.587 + pix[2] * 0.114;
  },

  //
  overwriteImageData : function(data){
    var _this = this;
    let sendWidth = data.width,
        sendHeight = data.height;
    const threshold = data.threshold || 180;
    let sendImageData = new ArrayBuffer((sendWidth * sendHeight) / 8);
    sendImageData = new Uint8Array(sendImageData);
    let pix = data.imageData;
    const part = [];
    let index = 0;
    for (let i = 0; i < pix.length; i += 32) {
        //横向每8个像素点组成一个字节（8位二进制数）。
        for (let k = 0; k < 8; k++) {
            const grayPixle1 = _this.grayPixle(pix.slice(i + k * 4, i + k * 4 + (4 - 1)));
            //阈值调整
            if (grayPixle1 > threshold) {
                //灰度值大于threshold位   白色 为第k位0不打印
                part[k] = 0;
            } else {
                part[k] = 1;
            }
        }
        let temp = 0;
        for (let a = 0; a < part.length; a++) {
            temp += part[a] * Math.pow(2, part.length - 1 - a);
        }
        sendImageData[index++] = temp;
    }
    return {
      array: Array.from(sendImageData),
      width: sendWidth / 8,
      height: sendHeight,
    };
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
		let tthis = this;
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      list : JSON.parse(decodeURIComponent(options.list)),
      order_id : options.order_id
    })
    _this.getQRCodeBase64(options.user_id);
    _this.getUserInfo(JSON.parse(decodeURIComponent(options.list)));
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
    if(app.globalData.z_option_BLE.deviceId!=""){
      wx.showToast({
        title: '正在连接',
        icon : 'none',
        duration : 2000
      })
      _this.createOldBLE();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.closeBluetoothAdapter({
      success : res=> {
        console.log("关闭蓝牙模块")
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //删除二维码暂存文件
    this.unlinkFile();
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