var toArrayBuffer = require('to-array-buffer');
var Buffer = require('/buffer').Buffer;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    userInfo : [],
    list : [],
    order_id : "",
    systemArray:['入库','出库'],
    out_in_type:'选择单据类型',
    order_array:[],
    order_number:'选择单号',
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
    },

    startTime : 0,
    endTime : 0
  },

  choice_system : function(e){
    var _this = this;
    var type = _this.data.systemArray[e.detail.value];
    var gs_name = app.globalData.gongsi;
    console.log(type)

    if(app.globalData.shujuku==0){
      wx.cloud.callFunction({
        name: 'sqlConnection',
        data: {
          sql: "select DISTINCT orderid from yh_jinxiaocun_mingxi where gs_name = '" + gs_name + "' and mxtype ='" + type + "'"
        },
        success: res => {
          console.log(res.result)
          _this.setData({
            order_array : res.result,
            out_in_type : type,
            order_number: '选择单号',
          })
        }
      })

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select DISTINCT orderid from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_mingxi_mssql where gs_name = '" + gs_name + "' and mxtype ='" + type + "'"
        },
        success: res => {
          console.log(res.result)
          _this.setData({
            order_array : res.result.recordset,
            out_in_type : type,
            order_number: '选择单号',
          })
        }
      })
      
    }

   
  },

  choice_order : function(e){
    var _this = this;
    var order_number = _this.data.order_array[e.detail.value];
    var gs_name = app.globalData.gongsi;
    var type = _this.data.out_in_type
    console.log(order_number.orderid)

    if(app.globalData.shujuku==0){

      wx.cloud.callFunction({
        name: 'sqlConnection',
        data: {
          sql: "select ifnull(orderid,'') as orderid,ifnull(shou_h,'') as shou_h,ifnull(shijian,'') as shijian,ifnull(cpname,'') as cpname,ifnull(sp_dm,'') as sp_dm,ifnull(cplb,'') as cplb,ifnull(cpsl,0) as cpsl,ifnull(cpsj,0) as cpsj,convert(cpsl,float) * convert(cpsj,float) as cpzj from yh_jinxiaocun_mingxi where gs_name = '" + gs_name + "' and mxtype ='" + type + "' and orderid ='" + order_number.orderid + "'"
        },
        success: res => {
          console.log(res.result)
          _this.setData({
            list : res.result,
            order_number: order_number.orderid,
          })
          _this.getUserInfo(res.result)
          _this.setCanvas()
  
        }
      })

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select ISNULL(orderid,'') as orderid,ISNULL(shou_h,'') as shou_h,ISNULL(shijian,'') as shijian,ISNULL(cpname,'') as cpname,ISNULL(sp_dm,'') as sp_dm,ISNULL(cplb,'') as cplb,ISNULL(cpsl,0) as cpsl,ISNULL(cpsj,0) as cpsj,CAST(ISNULL(cpsl,0) AS DECIMAL(18,2)) * CAST(ISNULL(cpsj,0) AS DECIMAL(18,2)) as cpzj from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_mingxi_mssql where gs_name = '" + gs_name + "' and mxtype ='" + type + "' and orderid ='" + order_number.orderid + "'"
        },
        success: res => {
          console.log(res.result.recordset)
          _this.setData({
            list : res.result.recordset,
            order_number: order_number.orderid,
          })
          _this.getUserInfo(res.result.recordset)
          _this.setCanvas()
  
        }
      })
      
    }

    
  },

  set_ble : function(){
    var _this = this;
    var option = _this.data.option
    wx.cloud.callFunction({
      name : 'sqlServer_117',
      data : {
        query : "update zeng_user set deviceId = '" + option.deviceId + "' and serviceId = '"+ option.serviceId +"' and characteristicId = '"+ option.characteristicId +"' where id = '"+_this.data.userInfo.id+"'"
      },
      success : res=> {
        wx.showModal({
          title: '保存蓝牙连接态成功',
          content: JSON.stringify(res),
          success : res=> {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      error: res=> {
        wx.showModal({
          title: '错误！',
          content: JSON.stringify(res),
          success : res=> {
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
  setCanvas : function(comment_order){
    var _this = this;
    var list = _this.data.list
    
    var width_all = _this.data.width_user_all
    var width = _this.data.width_user
    var height = _this.data.height_user
    console.log(width_all)
    console.log(width)
    console.log(height)
    const ctx = wx.createCanvasContext('outCanvas')

    console.log('赋值前')

    ctx.setFillStyle("white")
    ctx.fillRect(0,0,width,height)
    
    ctx.setTextAlign('center')
    ctx.setFillStyle('#000000')
    ctx.setFontSize(21)
    if(_this.data.out_in_type == '入库'){
      ctx.fillText('入库单', width / 2, 35)
    }else{
      ctx.fillText('出库单', width / 2, 35)
    }
    ctx.setFontSize(17)   
    ctx.setTextAlign('left')
    ctx.fillText('订单号：'+list[0].orderid, 0, 75)
    ctx.setTextAlign('right')
    ctx.fillText('供应商：'+list[0].shou_h, width, 75)
    ctx.setTextAlign('left')
    ctx.fillText('时间：'+list[0].shijian, 0, 95)

    ctx.moveTo(0, 115)
    ctx.lineTo((width_all-width)/2+width, 115)

    ctx.setFontSize(16)   
    ctx.setTextAlign('center')
    ctx.fillText('商品名称', width / 2-width / 11*4, 145)
    ctx.fillText('商品代码', width / 2-width / 11*2, 145)
    ctx.fillText('商品类别', width / 2, 145)
    ctx.fillText('数量', width / 2+width / 11*1.5, 145)
    ctx.fillText('单价', width / 2+width / 11*3, 145)
    ctx.fillText('金额', width / 2+width / 11*4.5, 145)
    

    ctx.moveTo(0, 165)
    ctx.lineTo((width_all-width)/2+width, 165)

    ctx.setFontSize(14)
    var y = 185;
    for(let i=0;i<list.length;i++,y+=30){
      ctx.fillText(list[i].cpname, width / 2-width / 11*4, y);
      ctx.fillText(list[i].sp_dm, width / 2-width / 11*2, y);
      ctx.fillText(list[i].cplb, width / 2, y);
      ctx.fillText(list[i].cpsl, width / 2+width / 11*1.5, y);
      ctx.fillText(list[i].cpsj, width / 2+width / 11*3, y)
      ctx.fillText(list[i].cpzj, width / 2+width / 11*4.5, y)
      console.log(list[i].cpname)
    }

    console.log('赋值后')

    ctx.moveTo(0, y-20)
    ctx.lineTo((width_all-width)/2+width, y-20)

    // let h = y
    // ctx.setTextAlign('left')
    // h+=30
    // ctx.setFontSize(16)
    // var comment_orders = [];
    // //一行的长度
    // var columnLength = width/2/15;
    // //循环次数
    // var num = Math.ceil(comment_order.length/columnLength);
    
    // for(let x=0;x<num;x++,h+=15){
    //   ctx.fillText(
    //     comment_order.substring(
    //       x*columnLength,
    //       columnLength+x*columnLength
    //     ), 0, h
    //   )
    // }
    


    

    // //canvas不支持在真机上显示base64图片；保存图片到暂存文件
    // var base64 = userInfo.qrCode_shop;
    var base64 = 'asdasd';
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
        // ctx.drawImage(filePath,width/2+width_all-width,y,150,150)
    
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

   //打印按钮click事件
   save : function(){
    var _this = this;

    if(!_this.data.isConn){
      wx.showToast({
        title : '蓝牙未连接',
        icon : 'none'
      })
      return;
    }else{
      _this.printTo()
    }
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

  getUserInfo : function(list){
    var _this = this;
    var length = list.length*30+350
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

  unlinkFile : function(){
    const ms = wx.getFileSystemManager();
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
        wx.showToast({
          title : "连接成功",
          icon : "success"
        })
        this.setData({
          option : {
            deviceId : app.globalData.z_option_BLE.deviceId,
            serviceId : app.globalData.z_option_BLE.serviceId,
            characteristicId : app.globalData.z_option_BLE.characteristicId
          },
          isConn : true
        })
      }
    })
  },

  //打印按钮click事件
  save : function(){
    var _this = this;

    if(!_this.data.isConn){
      wx.showToast({
        title : '蓝牙未连接',
        icon : 'none'
      })
      return;
    }else{
      _this.printTo()
    }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

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
    if(this.data.isConn){
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