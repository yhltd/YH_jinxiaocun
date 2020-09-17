var toArrayBuffer = require('to-array-buffer');
var Buffer = require('buffer/').Buffer;
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
    
    // ctx.setTextAlign('center')
    // ctx.setFillStyle('#000000')
    // ctx.setFontSize(20)   
    // ctx.fillText('出库单', width / 2, 35)
    // ctx.setFontSize(13)   
    // ctx.setTextAlign('left')
    // ctx.fillText('单号：'+_this.data.order_id, 0, 75)
    // ctx.setTextAlign('right')
    // ctx.fillText('开单时间：'+_this.getTime(), width, 75)
    // ctx.setTextAlign('left')
    // ctx.fillText('销售员：'+userInfo.userName, 0, 95)
    ctx.setTextAlign('center')
    ctx.setFillStyle('#000000')
    ctx.setFontSize(20)   
    ctx.fillText('test', width / 2, 35)
    ctx.setFontSize(13)   
    ctx.setTextAlign('left')
    ctx.fillText('test'+_this.data.order_id, 0, 75)
    ctx.setTextAlign('right')
    ctx.fillText('test'+_this.getTime(), width, 75)
    ctx.setTextAlign('left')
    ctx.fillText('test'+userInfo.userName, 0, 95)

    ctx.moveTo(0, 115)
    ctx.lineTo((width_all-width)/2+width, 115)

    ctx.setFontSize(16)   
    ctx.setTextAlign('center')
    // ctx.fillText('商品名', width / 2-width / 5*2, 145)
    // ctx.fillText('数量', width / 2-width / 5, 145)
    // ctx.fillText('折扣', width / 2, 145)
    // ctx.fillText('支付方式', width / 2+width / 5, 145)
    // ctx.fillText('备注', width / 2+width / 5*2, 145)
    ctx.fillText('test', width / 2-width / 5*2, 145)
    ctx.fillText('test', width / 2-width / 5, 145)
    ctx.fillText('test', width / 2, 145)
    ctx.fillText('test', width / 2+width / 5, 145)
    ctx.fillText('test', width / 2+width / 5*2, 145)

    ctx.moveTo(0, 165)
    ctx.lineTo((width_all-width)/2+width, 165)

    ctx.setFontSize(14)
    var y = 185;
    // for(let i=0;i<list.length;i++,y+=30){
    //   ctx.fillText(list[i].name, width / 2-width / 5*2, y);
    //   ctx.fillText(list[i].num, width / 2-width / 5, y);
    //   ctx.fillText((list[i].discount*10)+"折", width / 2, y);
    //   ctx.fillText(list[i].payType, width / 2+width / 5, y);
    //   ctx.fillText(list[i].comment, width / 2+width / 5*2, y);
    // }

    ctx.moveTo(0, y-20)
    ctx.lineTo((width_all-width)/2+width, y-20)

    if(comment_order!="" && comment_order!=undefined){
      ctx.setTextAlign('left')
      y+=30
      ctx.setFontSize(15)
      var comment_orders = [];
      //一行的长度
      var columnLength = width/2/15;
      //循环次数
      var num = Math.ceil(comment_order.length/columnLength);
      for(let x=0;x<num;x++,y+=15){
        ctx.fillText(
          comment_order.substring(
            x*columnLength,
            columnLength+x*columnLength
          ), 0, y
        )
      }
      y-=30
    }


    

    //canvas不支持在真机上显示base64图片；保存图片到暂存文件
    var base64 = userInfo.qrCode_shop;
    //去空格
    base64 = base64.replace(/\ +/g, ""); 
    base64 = base64.replace(/[\r\n]/g, "");
   
    //真机是wx:file
    let filePath =  wx.env.USER_DATA_PATH + "/出库单 " + new Date().getTime().toString() + ".png"
    var arrayBuffer = wx.base64ToArrayBuffer(base64)
    _this.setData({
      arrayBuffer
    })
    wx.getFileSystemManager().writeFile({
      filePath : filePath,
      data : arrayBuffer,
      encoding: 'binary',
      success: () => { 
        console.log(filePath)
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

  getUserInfo : function(length){
    var _this = this;
    wx.getSystemInfo({
      success: res=> {
        _this.setData({
          width_user_all : res.windowWidth,
          width_user : res.windowWidth*0.94,
          height_user : length*30+350
        })
      },
    })
  },

  getTime : function(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    var hour = date.getHours();
    var minute = date.getMinutes();

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

  save : function(){
    var _this = this;
    


    // wx.canvasToTempFilePath({
    //   canvasId : 'outCanvas',
    //   success : res=> {
    //     wx.saveImageToPhotosAlbum({
    //       filePath: res.tempFilePath,
    //       success : res=> {
    //         wx.showToast({
    //           title: '保存成功',
    //           icon : 'success'
    //         })
    //       },
    //       fail : res=> {
    //         _this.setSetting()
    //       }
    //     })
    //   },
    //   fail : res=> {
    //     console.log(res)
    //   }
    // })

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

                  // wx.getBLEDeviceServices({
                  //   deviceId : "04:7F:0E:05:B8:DE",
                  //   success : res=> {
                  //     console.log("获取services")
                  //     console.log(res.services )
                  //     for(let i=0;i<res.services.length;i++){
                  //         wx.getBLEDeviceCharacteristics({
                  //           deviceId: "04:7F:0E:05:B8:DE",
                  //           serviceId : res.services[i].uuid,
                  //           success: function (res) {
                  //             console.log('service'+i, res.characteristics);
                  //           },
                  //           fail : res=> {
                  //             console.log("fail:",res)
                  //           }
                  //         })
                  //     }
                  //   }
                  // })

                  _this.printTo()
                },
                fail : res=> {
                  console.log(res)
                  if(res.errCode == 10012){
                    wx.showToast({
                      title: '连接超时',
                      icon : none,
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
  
  printTo : function(){
    var _this = this;
    wx.showToast({
      title: '正在打印',
      icon : 'none'
    })
    var width = _this.data.width_user
    var height = _this.data.height_user
    var line = [29, 118, 48, 0, width/8, 0, height, 0]
    wx.notifyBLECharacteristicValueChange({
      state : true,
      deviceId : "04:7F:0E:05:B8:DE",
      serviceId : "E7810A71-73AE-499D-8C15-FAA9AEF0C3F2",
      characteristicId : "BEF8D6C9-9C21-4C9E-B632-BD58C1009F9F",
      success : res=> {
        wx.canvasGetImageData({
          canvasId : 'outCanvas',
          x : 0,
          y : 0,
          width : width,
          height : height,
          success : res=> {
            console.log("Uint8ClampedArray=>",res.data)
            let arr = _this.convert4to1(res.data);
            let data = _this.convert8to1(arr);
            const cmds = [].concat([27, 97, 1], line, data, [27, 74, 3], [27, 64]);
            const buffer = toArrayBuffer(Buffer.from(cmds, 'gb2312'));
            let arrPrint = [];
            arrPrint.push(_this.sendDirective([0x1B, 0x40]));
            for (let i = 0; i < buffer.byteLength; i = i + 20) {
              arrPrint.push(buffer.slice(i, i + 20));
            }
            _this.printInfo({
              deviceId : "04:7F:0E:05:B8:DE",
              serviceId : "E7810A71-73AE-499D-8C15-FAA9AEF0C3F2",
              characteristicId : "BEF8D6C9-9C21-4C9E-B632-BD58C1009F9F"
            }, arrPrint);
          }
        })
      },
      fail : res=> {
        console.log(res)
        wx.showToast({
          title: res,
          icon : 'none'
        })
      }
    })
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

  sendDirective : function(arr){
    const buffer = new ArrayBuffer(arr.length)
    const dataView = new DataView(buffer)
    for (let i in arr) {
      dataView.setUint8(i, arr[i])
    }
    return buffer;
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
			// complete: function(res) {
			// 	console.log("发送完成:" + JSON.stringify(res))
			// }
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
    _this.getUserInfo(JSON.parse(decodeURIComponent(options.list)).length);
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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