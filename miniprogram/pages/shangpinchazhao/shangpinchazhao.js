// pages/Tosell/Tosell.js
import QR from '../utils/weapp-qrcode-base64.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: [],
    id: "",
    tempImageUrl: '', // 临时存储图片URL
    uploading: false, // 上传状态
    isDeleting: false, // 是否正在删除图片
    // szzhi:[],
    // szZhi:[],
    list: [{
        txet: "商品代码",
        index: 0,
        name : 'sp_dm',
        fun : 'cpid'
      },
      {
        txet: "商品名称",
        index: 1,
        name : 'name',
        fun : 'cpname'
      },
      {
        txet: "单位",
        index: 2,
        name : 'dan_wei'
      },
      {
        txet: "类别",
        index: 4,
        name : 'lei_bie',
        fun : 'cplb'
      },{
        txet: "数量",
        index: 5,
        fun : 'cpsl'
      },{
        txet: "金额",
        index: 6,
        fun : 'cpsj'
      },{
        txet: "仓库",
        index: 7,
        fun : 'cangku'
      },
      
    ],
    fun : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options._id,
      fun: options.fun
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function() {
  //   var that = this
  //   var gongsi = app.globalData.gongsi
  //   var fun = that.data.fun;
  //   var ssql = ""

  //   if(app.globalData.shujuku==0){

  //     if(fun == 'qichu'){
  //       ssql = "select * from yh_jinxiaocun_qichushu where gs_name = '" + gongsi + "' and _id ='" + this.data.id + "'"
  //     }else{
  //       ssql = "select * from yh_jinxiaocun_jichuziliao where gs_name = '" + gongsi + "' and id ='" + this.data.id + "'"
  //     }
  //     wx.cloud.callFunction({
  //       name: "sqlConnection",
  //       data: {
  //         sql: ssql
  //       },
  //       success(res) {
  //         console.log(res.result)
  //         for(var i=0; i<res.result.length; i++){
  //           console.log(res.result[i].cpid)
  //           if(fun=='qichu'){
  //           var imgData = QR.drawImg(res.result[i].cpid, {
  //             typeNumber: 4,
  //             errorCorrectLevel: 'M',
  //             size: 500
  //           })
  //           res.result[i].qrcode = imgData
  //         }else{
  //           var imgData = QR.drawImg(res.result[i].sp_dm, {
  //             typeNumber: 4,
  //             errorCorrectLevel: 'M',
  //             size: 500
  //           })
  //           res.result[i].qrcode = imgData 
  //         }
  //         }
  //         that.setData({
  //           all: res.result
  //         })
  //       },
  //       fail(res) {
  //         console.log("失败", res)
  //       }
  //     });

  //   }else if(app.globalData.shujuku == 1){

  //     if(fun == 'qichu'){
  //       ssql = "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_qichushu_mssql where gs_name = '" + gongsi + "' and _id ='" + this.data.id + "'"
  //     }else{
  //       ssql = "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jichuziliao_mssql where gs_name = '" + gongsi + "' and id ='" + this.data.id + "'"
  //     }
  //     wx.cloud.callFunction({
  //       name: "sqlServer_117",
  //       data: {
  //         query: ssql
  //       },
  //       success(res) {
  //         console.log(res.result.recordset)
  //         for(var i=0; i<res.result.recordset.length; i++){
  //           console.log(res.result.recordset[i].cpid)
  //           if(fun=='qichu'){
  //           var imgData = QR.drawImg(res.result.recordset[i].cpid, {
  //             typeNumber: 4,
  //             errorCorrectLevel: 'M',
  //             size: 500
  //           })
  //           res.result.recordset[i].qrcode = imgData
  //         }else{
  //           var imgData = QR.drawImg(res.result.recordset[i].sp_dm, {
  //             typeNumber: 4,
  //             errorCorrectLevel: 'M',
  //             size: 500
  //           })
  //           res.result.recordset[i].qrcode = imgData 
  //         }
  //         }
  //         that.setData({
  //           all: res.result.recordset
  //         })
  //       },
  //       fail(res) {
  //         console.log("失败", res)
  //       }
  //     });
      
  //   }

   
  // },
  onShow: function() {
    var that = this
    var gongsi = app.globalData.gongsi
    var fun = that.data.fun;
    var ssql = ""
  
    if(app.globalData.shujuku==0){
      // MySQL版本
      if(fun == 'qichu'){
        ssql = "select * from yh_jinxiaocun_qichushu where gs_name = '" + gongsi + "' and _id ='" + this.data.id + "'"
      }else{
        ssql = "select * from yh_jinxiaocun_jichuziliao where gs_name = '" + gongsi + "' and id ='" + this.data.id + "'"
      }
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: ssql
        },
        success(res) {
          console.log(res.result)
          for(var i=0; i<res.result.length; i++){
            console.log(res.result[i].cpid)
            if(fun=='qichu'){
              var imgData = QR.drawImg(res.result[i].cpid, {
                typeNumber: 4,
                errorCorrectLevel: 'M',
                size: 500
              })
              res.result[i].qrcode = imgData
            }else{
              var imgData = QR.drawImg(res.result[i].sp_dm, {
                typeNumber: 4,
                errorCorrectLevel: 'M',
                size: 500
              })
              res.result[i].qrcode = imgData 
            }
          }
          that.setData({
            all: res.result
          })
        },
        fail(res) {
          console.log("失败", res)
        }
      });
  
    }else if(app.globalData.shujuku == 1){
      // SQL Server版本
      if(fun == 'qichu'){
        ssql = "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_qichushu_mssql where gs_name = '" + gongsi + "' and _id ='" + this.data.id + "'"
      }else{
        ssql = "select * from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jichuziliao_mssql where gs_name = '" + gongsi + "' and id ='" + this.data.id + "'"
      }
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: ssql
        },
        success(res) {
          console.log(res.result.recordset)
          for(var i=0; i<res.result.recordset.length; i++){
            console.log(res.result.recordset[i].cpid)
            if(fun=='qichu'){
              var imgData = QR.drawImg(res.result.recordset[i].cpid, {
                typeNumber: 4,
                errorCorrectLevel: 'M',
                size: 500
              })
              res.result.recordset[i].qrcode = imgData
            }else{
              var imgData = QR.drawImg(res.result.recordset[i].sp_dm, {
                typeNumber: 4,
                errorCorrectLevel: 'M',
                size: 500
              })
              res.result.recordset[i].qrcode = imgData 
            }
          }
          that.setData({
            all: res.result.recordset
          })
        },
        fail(res) {
          console.log("失败", res)
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },








  // chooseImage: function(e) {
  //   let that = this;
  //   wx.chooseImage({
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function(res) {
  //       wx.showLoading({
  //         title: '上传中',
  //       });
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       let filePath = res.tempFilePaths[0];
  //       const name = Math.random() * 1000000;
  //       const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]

  //       wx.cloud.uploadFile({
  //         cloudPath: "tupian/" + cloudPath, //云存储图片名字

  //         filePath, //临时路径

  //         success: res => {
  //           console.log('[上传图片] 成功：', res)
  //           that.setData({
  //             bigImg: res.fileID, //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
  //           }, wx.showToast({
  //             title: '图片选择成功',
  //             'icon': 'none',
  //             duration: 3000
  //           }));
  //           let fileID = res.fileID;
  //           //把图片存到users集合表

  //           console.log(name1)

  //         },
  //         fail: e => {
  //           console.error('[上传图片] 失败：', e)
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       });
  //     }

  //   })
  // },

  // chooseImage: function(e) {
  //   var that = this
  //   wx.chooseImage({
  //     success: res => {
  //     wx.getFileSystemManager().readFile({
  //       filePath: res.tempFilePaths[0], //选择图片返回的相对路径
  //       encoding: 'base64', //编码格式
  //       success: res => { //成功的回调
  //       console.log('data:image/png;base64,' + res.data)
  //       that.setData({
  //         bigImg: res.data, //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
  //       }, wx.showToast({
  //         title: '图片选择成功',
  //         'icon': 'none',
  //         duration: 3000
  //       }))
  //       }
  //     })
  //     }
  //   })
  // },
  // 修改 chooseImage 方法，使用文件服务器上传
// 修改 chooseImage 方法，添加上传前删除旧图片
chooseImage: function(e) {
  var that = this;
  
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: res => {
      const tempFilePath = res.tempFilePaths[0];
      
      wx.showLoading({
        title: '处理中...',
        mask: true
      });
      
      that.setData({ uploading: true });
      
      // 获取当前旧图片URL
      const oldImageUrl = that.data.all[0]?.mark1 || '';
      
      // 先删除旧图片（如果有）
      const deleteOldImage = () => {
        return new Promise((resolve) => {
          if (oldImageUrl && oldImageUrl.includes('yhocn.cn:9088')) {
            // 从URL中提取文件名
            const fileNameMatch = oldImageUrl.match(/\/([^/]+)$/);
            if (fileNameMatch && fileNameMatch[1]) {
              const oldFileName = fileNameMatch[1].split('.')[0];
              
              wx.request({
                url: 'https://yhocn.cn:9097/file/delete',
                method: 'POST',
                data: {
                  order_number: oldFileName,
                  path: '/jinxiaocun/'
                },
                success: (delRes) => {
                  console.log('旧图片删除结果:', delRes.data);
                  resolve();
                },
                fail: (err) => {
                  console.error('删除旧图片失败:', err);
                  resolve(); // 即使删除失败也继续上传
                }
              });
            } else {
              resolve();
            }
          } else {
            resolve();
          }
        });
      };
      
      // 删除旧图片后上传新图片
      deleteOldImage().then(() => {
        // 生成文件名
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        const fileExtension = tempFilePath.split('.').pop() || 'jpg';
        const fileName = `${timestamp}_${random}.${fileExtension}`;
        
        // 上传新文件
        wx.uploadFile({
          url: 'https://yhocn.cn:9097/file/upload',
          filePath: tempFilePath,
          name: 'file',
          formData: {
            name: fileName,
            path: '/jinxiaocun/',
            kongjian: '3',
            fileType: fileExtension
          },
          header: { 'Content-Type': 'multipart/form-data' },
          success: function(uploadRes) {
            wx.hideLoading();
            try {
              var resData = JSON.parse(uploadRes.data);
              if (resData.code === 200 || resData.success) {
                var fileUrl = "http://yhocn.cn:9088/jinxiaocun/" + fileName;
                
                that.setData({ 
                  tempImageUrl: fileUrl,
                  uploading: false
                });
                
                wx.showToast({ 
                  title: '图片上传成功', 
                  icon: 'success' 
                });
                
                console.log('图片URL:', fileUrl);
              } else {
                wx.showToast({ 
                  title: '上传失败', 
                  icon: 'none' 
                });
                that.setData({ uploading: false });
              }
            } catch (e) {
              console.error('解析响应失败:', e);
              wx.showToast({ 
                title: '上传失败', 
                icon: 'none' 
              });
              that.setData({ uploading: false });
            }
          },
          fail: function(err) {
            wx.hideLoading();
            console.error('上传失败:', err);
            wx.showToast({ 
              title: '上传失败', 
              icon: 'none' 
            });
            that.setData({ uploading: false });
          }
        });
      });
    },
    fail: function(err) {
      console.log('选择图片失败', err);
    }
  });
},

// 单独删除图片
deleteImage: function() {
  var that = this;
  var oldImageUrl = that.data.all[0]?.mark1 || '';
  
  if (!oldImageUrl) {
    wx.showToast({
      title: '暂无图片可删除',
      icon: 'none'
    });
    return;
  }
  
  wx.showModal({
    title: '确认删除',
    content: '确定要删除这张图片吗？',
    success: function(res) {
      if (res.confirm) {
        wx.showLoading({
          title: '删除中...',
          mask: true
        });
        
        that.setData({ isDeleting: true });
        
        // 从URL中提取文件名
        const fileNameMatch = oldImageUrl.match(/\/([^/]+)$/);
        if (fileNameMatch && fileNameMatch[1]) {
          const fileName = fileNameMatch[1].split('.')[0];
          
          // 删除文件服务器上的图片
          wx.request({
            url: 'https://yhocn.cn:9097/file/delete',
            method: 'POST',
            data: {
              order_number: fileName,
              path: '/jinxiaocun/'
            },
            success: (delRes) => {
              console.log('图片删除结果:', delRes.data);
              
              // 更新本地数据，将图片字段置为空
              that.setData({
                tempImageUrl: '', // 清空临时图片
                isDeleting: false,
                ['all[0].mark1']: '' // 更新当前显示
              });
              
              wx.hideLoading();
              wx.showToast({
                title: '图片删除成功',
                icon: 'success'
              });
            },
            fail: (err) => {
              wx.hideLoading();
              console.error('删除图片失败:', err);
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              });
              that.setData({ isDeleting: false });
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '无效的图片地址',
            icon: 'none'
          });
          that.setData({ isDeleting: false });
        }
      }
    }
  });
},

  input: function(e) {
    var id = e.currentTarget.dataset.id
    var value = e.detail.value
    this.setData({
      [`value${id}`]: value
    })
    console.log(id)
    console.log(value)
    console.log([`value${id}`])
  },
  // querenxinjian: function() {
  //   var that = this;
  //   var id = that.data.id;
  //   var fun = that.data.fun;
  //   if (that.data.value0 == undefined) {
  //     var value0 = that.data.all[0].sp_dm
  //     if(fun == 'qichu'){
  //       value0 = that.data.all[0].cpid
  //     }
  //   } else {
  //     var value0 = that.data.value0
  //   }
  //   if (that.data.value1 == undefined) {
  //     var value1 = that.data.all[0].name
  //     if(fun == 'qichu'){
  //       value1 = that.data.all[0].cpname
  //     }
  //   } else {
  //     var value1 = that.data.value1
  //   }
  //   if (that.data.value2 == undefined) {
  //     var value2 = that.data.all[0].dan_wei
  //   } else {
  //     var value2 = that.data.value2
  //   }
  //   if (that.data.value4 == undefined) {
  //     var value4 = that.data.all[0].lei_bie
  //     if(fun == 'qichu'){
  //       value4 = that.data.all[0].cplb
  //     }
  //   } else {
  //     var value4 = that.data.value4
  //   }
  //   if (that.data.bigImg == undefined) {
  //     var bigImg = that.data.all[0].mark1
  //   } else {
  //     var bigImg = that.data.bigImg
  //   }

  //   if (that.data.value5 == undefined) {
  //     var value5 = that.data.all[0].cpsl
  //   }else{
  //     var value5 = that.data.value5
  //   }

  //   if (that.data.value6 == undefined) {
  //     var value6 = that.data.all[0].cpsj
  //   }else{
  //     var value6 = that.data.value6
  //   }
  //   if (that.data.value7 == undefined) {
  //     var value7 = that.data.all[0].cangku
  //   }else{
  //     var value7 = that.data.value7
  //   }
    
  //   var gongsi = app.globalData.gongsi;
  //   var ssql = "";


  //   if(app.globalData.shujuku==0){

  //     if(fun == 'qichu'){
  //       ssql = "update yh_jinxiaocun_qichushu set cpid ='" + value0 + "',`cpname` = '" + value1 + "',cplb ='" + value4 + "',cpsl ='" + value5 + "',cpsj ='" + value6 + "',cangku ='" + value7 + "',gs_name='" + gongsi + "',mark1 = '"+bigImg+"' where _id =" + id;
  //     }else{
  //       ssql = "update yh_jinxiaocun_jichuziliao set sp_dm ='" + value0 + "',`name` = '" + value1 + "',lei_bie ='" + value4 + "',dan_wei = '" + value2 + "',gs_name='" + gongsi + "',mark1='" + bigImg + "' where id =" + id
  //     }
  //     const db = wx.cloud.database();
  //     wx.cloud.callFunction({
  //       name: "sqlConnection",
  //       data: {
  //         sql: ssql
  //       },
  //       success(res) {
  //         console.log("成功", res)
  //         // 在返回结果中会包含新创建的记录的 _id
  //         wx.showToast({
  //           title: '修改成功',
  //           'icon': 'none',
  //           duration: 3000
  //         })
  //         wx.navigateBack({
  //           // delta: 1 
  //         })
  //       },
  //       fail(res) {
  //         console.log("失败", res)
  //       }
  //     });

  //   }else if(app.globalData.shujuku == 1){

  //     if(fun == 'qichu'){
  //       ssql = "update yh_jinxiaocun_excel.dbo.yh_jinxiaocun_qichushu_mssql set cpid ='" + value0 + "',cpname = '" + value1 + "',cplb ='" + value4 + "',cpsl ='" + value5 + "',cpsj ='" + value6 + "',cangku ='" + value7 + "',gs_name='" + gongsi + "',mark1 = '"+bigImg+"' where _id =" + id;
  //     }else{
  //       ssql = "update yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jichuziliao_mssql set sp_dm ='" + value0 + "',[name] = '" + value1 + "',lei_bie ='" + value4 + "',dan_wei = '" + value2 + "',gs_name='" + gongsi + "',mark1='" + bigImg + "' where id =" + id
  //     }
  //     const db = wx.cloud.database();
  //     wx.cloud.callFunction({
  //       name: "sqlServer_117",
  //       data: {
  //         query: ssql
  //       },
  //       success(res) {
  //         console.log("成功", res)
  //         // 在返回结果中会包含新创建的记录的 _id
  //         wx.showToast({
  //           title: '修改成功',
  //           'icon': 'none',
  //           duration: 3000
  //         })
  //         wx.navigateBack({
  //           // delta: 1 
  //         })
  //       },
  //       fail(res) {
  //         console.log("失败", res)
  //       }
  //     });
      
  //   }
    
    
  // }

  querenxinjian: function() {
    var that = this;
    var id = that.data.id;
    var fun = that.data.fun;
    
    // 获取各字段值
    if (that.data.value0 == undefined) {
      var value0 = that.data.all[0].sp_dm
      if(fun == 'qichu'){
        value0 = that.data.all[0].cpid
      }
    } else {
      var value0 = that.data.value0
    }
    
    if (that.data.value1 == undefined) {
      var value1 = that.data.all[0].name
      if(fun == 'qichu'){
        value1 = that.data.all[0].cpname
      }
    } else {
      var value1 = that.data.value1
    }
    
    if (that.data.value2 == undefined) {
      var value2 = that.data.all[0].dan_wei
    } else {
      var value2 = that.data.value2
    }
    
    if (that.data.value4 == undefined) {
      var value4 = that.data.all[0].lei_bie
      if(fun == 'qichu'){
        value4 = that.data.all[0].cplb
      }
    } else {
      var value4 = that.data.value4
    }
    
    // 图片字段：优先使用新上传的URL，如果没有则使用当前显示的URL，如果当前显示也为空则保存空字符串
    if (that.data.tempImageUrl) {
      var bigImg = that.data.tempImageUrl;
    } else {
      // 如果图片已被删除，all[0].mark1 可能已经被清空
      var bigImg = that.data.all[0]?.mark1 || '';
    }
  
    if (that.data.value5 == undefined) {
      var value5 = that.data.all[0].cpsl
    }else{
      var value5 = that.data.value5
    }
  
    if (that.data.value6 == undefined) {
      var value6 = that.data.all[0].cpsj
    }else{
      var value6 = that.data.value6
    }
    
    if (that.data.value7 == undefined) {
      var value7 = that.data.all[0].cangku
    }else{
      var value7 = that.data.value7
    }
    
    var gongsi = app.globalData.gongsi;
    var ssql = "";
  
    if(app.globalData.shujuku==0){
      // MySQL版本
      if(fun == 'qichu'){
        ssql = "update yh_jinxiaocun_qichushu set cpid ='" + value0 + "',`cpname` = '" + value1 + "',cplb ='" + value4 + "',cpsl ='" + value5 + "',cpsj ='" + value6 + "',cangku ='" + value7 + "',gs_name='" + gongsi + "',mark1 = '"+bigImg+"' where _id =" + id;
      }else{
        ssql = "update yh_jinxiaocun_jichuziliao set sp_dm ='" + value0 + "',`name` = '" + value1 + "',lei_bie ='" + value4 + "',dan_wei = '" + value2 + "',gs_name='" + gongsi + "',mark1='" + bigImg + "' where id =" + id
      }
      
      wx.showLoading({
        title: '保存中...',
        mask: true
      });
      
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: ssql
        },
        success(res) {
          wx.hideLoading();
          console.log("成功", res)
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500);
        },
        fail(res) {
          wx.hideLoading();
          console.log("失败", res)
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        }
      });
  
    }else if(app.globalData.shujuku == 1){
      // SQL Server版本
      if(fun == 'qichu'){
        ssql = "update yh_jinxiaocun_excel.dbo.yh_jinxiaocun_qichushu_mssql set cpid ='" + value0 + "',cpname = '" + value1 + "',cplb ='" + value4 + "',cpsl ='" + value5 + "',cpsj ='" + value6 + "',cangku ='" + value7 + "',gs_name='" + gongsi + "',mark1 = '"+bigImg+"' where _id =" + id;
      }else{
        ssql = "update yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jichuziliao_mssql set sp_dm ='" + value0 + "',[name] = '" + value1 + "',lei_bie ='" + value4 + "',dan_wei = '" + value2 + "',gs_name='" + gongsi + "',mark1='" + bigImg + "' where id =" + id
      }
      
      wx.showLoading({
        title: '保存中...',
        mask: true
      });
      
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: ssql
        },
        success(res) {
          wx.hideLoading();
          console.log("成功", res)
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500);
        },
        fail(res) {
          wx.hideLoading();
          console.log("失败", res)
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        }
      });
    }
  },
})