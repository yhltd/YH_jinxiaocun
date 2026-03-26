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

  // ========== 以下为新增/修改的方法 ==========

  /**
   * 检查空间是否充足
   * @param {string} companyName 公司名
   * @param {number} fileSizeKB 要上传的文件大小(KB)
   * @returns {Promise} 返回检查结果
   */
  checkTotalSpace: function(companyName, fileSizeKB) {
    return new Promise((resolve, reject) => {
      // 从 globalData 获取空间信息
      var dbSizeKB = app.globalData.dbSpace || 0; // 已使用数据库空间(KB)
      var limitKB = app.globalData.mark4 || 0; // 最大可用空间(KB)
      
      if (!limitKB || limitKB <= 0) {
        console.warn('未获取到空间限制，跳过空间检查');
        resolve({
          canUpload: true,
          usagePercent: 0,
          totalUsedKB: dbSizeKB,
          limitKB: limitKB
        });
        return;
      }
      
      // 构建动态路径：/jinxiaocun/ + 公司名
      var path = "/jinxiaocun/" + companyName + "/";
      
      // 获取文件夹大小
      wx.request({
        url: "https://yhocn.cn:9097/file/getFolderSize",
        method: 'GET',
        data: { path: path },
        success: (folderRes) => {
          var folderSizeKB = 0;
          
          // 检查文件夹请求结果
          if (folderRes.data && folderRes.data.code === 200) {
            folderSizeKB = folderRes.data.data.sizeBytes / 1024;
            console.log("文件夹大小:", folderSizeKB.toFixed(2), "KB");
          } else if (folderRes.data && folderRes.data.code === 500 && folderRes.data.msg === "文件夹不存在") {
            folderSizeKB = 0;
            console.log("文件夹不存在，大小设为 0 KB");
          } else {
            console.warn("获取文件夹大小失败:", folderRes.data?.msg || "未知错误");
            folderSizeKB = 0;
          }
          
          // 总使用空间（KB）
          var totalUsedKB = dbSizeKB + folderSizeKB;
          limitKB = parseFloat(limitKB);
          
          // 计算上传后的预计使用空间
          var fileSizeKB_num = parseFloat(fileSizeKB) || 0;
          var estimatedTotalKB = totalUsedKB + fileSizeKB_num;
          
          // 使用率
          var usagePercent = (totalUsedKB / limitKB) * 100;
          var estimatedPercent = (estimatedTotalKB / limitKB) * 100;
          
          console.log("数据库大小:", dbSizeKB, "KB");
          console.log("文件夹大小:", folderSizeKB.toFixed(2), "KB");
          console.log("总使用:", totalUsedKB.toFixed(2), "KB", "(", usagePercent.toFixed(2), "%)");
          console.log("文件大小:", fileSizeKB_num.toFixed(2), "KB");
          console.log("预计使用:", estimatedTotalKB.toFixed(2), "KB", "(", estimatedPercent.toFixed(2), "%)");
          console.log("限制:", limitKB, "KB", "(", (limitKB / 1024 / 1024).toFixed(2), "GB)");
          
          var canUpload = true;
          var message = "";
          
          // 空间使用超过110%禁止上传
          if (totalUsedKB >= limitKB * 1.1) {
            canUpload = false;
            message = "空间使用已超110%（" + usagePercent.toFixed(2) + "%），无法上传！";
          } else if (estimatedTotalKB >= limitKB * 1.1) {
            canUpload = false;
            message = "上传后空间使用率将超过110%（" + estimatedPercent.toFixed(2) + "%），无法上传！";
          } else if (totalUsedKB >= limitKB * 0.9) {
            message = "空间使用已超90%（" + usagePercent.toFixed(2) + "%），请注意清理！";
            canUpload = true;
          } else {
            canUpload = true;
          }
          
          resolve({
            canUpload: canUpload,
            message: message,
            usagePercent: usagePercent,
            estimatedPercent: estimatedPercent,
            totalUsedKB: totalUsedKB,
            limitKB: limitKB
          });
        },
        fail: (err) => {
          console.error("获取文件夹大小失败:", err);
          // 网络错误时，允许继续上传（避免因网络问题阻塞业务）
          resolve({
            canUpload: true,
            message: "空间检查失败，请稍后确认空间使用情况",
            usagePercent: 0,
            totalUsedKB: 0,
            limitKB: limitKB
          });
        }
      });
    });
  },
  
  /**
   * 上传图片到服务器
   * @param {string} tempFilePath 临时文件路径
   * @param {object} fileInfo 文件信息
   * @param {string} companyName 公司名
   */
  uploadImageToServer: function(tempFilePath, fileInfo, companyName) {
    var that = this;
    
    wx.showLoading({
      title: '上传中...',
      mask: true
    });
    
    // 获取当前旧图片URL
    const oldImageUrl = that.data.all[0]?.mark1 || '';
    
    // 构建动态路径：/jinxiaocun/ + 公司名 + /
    const dynamicPath = "/jinxiaocun/" + companyName + "/";
    
    // 生成文件名
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const fileExtension = tempFilePath.split('.').pop() || 'jpg';
    const fileName = `${timestamp}_${random}.${fileExtension}`;
    
    // 先删除旧图片（如果有）
    const deleteOldImage = () => {
      return new Promise((resolve) => {
        if (oldImageUrl && oldImageUrl.includes('yhocn.cn:9088')) {
          const fileNameMatch = oldImageUrl.match(/\/([^/]+)$/);
          if (fileNameMatch && fileNameMatch[1]) {
            const oldFileName = fileNameMatch[1].split('.')[0];
            
            wx.request({
              url: 'https://yhocn.cn:9097/file/delete',
              method: 'POST',
              data: {
                order_number: oldFileName,
                path: dynamicPath
              },
              success: (delRes) => {
                resolve();
              },
              fail: (err) => {
                console.error('删除旧图片失败:', err);
                resolve();
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
      wx.uploadFile({
        url: 'https://yhocn.cn:9097/file/upload',
        filePath: tempFilePath,
        name: 'file',
        formData: {
          name: fileName,
          path: dynamicPath,
          kongjian: '3',
          fileType: fileExtension,
          fileSize: fileInfo.size.toString()
        },
        header: { 
          'Content-Type': 'multipart/form-data' 
        },
        timeout: 600000,
        success: function(uploadRes) {
          wx.hideLoading();
          try {
            var resData = JSON.parse(uploadRes.data);
            if (resData.code === 200 || resData.success) {
              var fileUrl = "http://yhocn.cn:9088/jinxiaocun/" + companyName + "/" + fileName;
              
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
                title: resData.msg || '上传失败', 
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
          var errorMsg = '上传失败';
          if (err.errMsg && err.errMsg.includes('timeout')) {
            errorMsg = '上传超时，文件可能过大或网络不稳定';
          } else if (err.errMsg && err.errMsg.includes('fail')) {
            errorMsg = '网络错误，请检查网络连接';
          }
          wx.showToast({ 
            title: errorMsg, 
            icon: 'none',
            duration: 3000
          });
          that.setData({ uploading: false });
        }
      });
    });
  },

  /**
   * 选择并上传图片（带空间检查和500MB限制）
   */
  chooseImage: function(e) {
    var that = this;
    
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePath = res.tempFilePaths[0];
        
        wx.getFileInfo({
          filePath: tempFilePath,
          success: (fileInfo) => {
            const fileSizeMB = fileInfo.size / 1024 / 1024;
            const fileSizeKB = fileInfo.size / 1024;
            const maxSizeMB = 500;
            
            console.log('文件大小:', fileSizeMB.toFixed(2), 'MB');
            
            // 检查单个文件是否超过500MB
            if (fileInfo.size > maxSizeMB * 1024 * 1024) {
              wx.showToast({
                title: `文件超过${maxSizeMB}MB限制`,
                icon: 'none',
                duration: 3000
              });
              return;
            }
            
            wx.showLoading({
              title: '检查空间...',
              mask: true
            });
            
            that.setData({ uploading: true });
            
            const companyName = app.globalData.gongsi;
            if (!companyName) {
              wx.hideLoading();
              wx.showToast({
                title: '公司名称不存在',
                icon: 'none'
              });
              that.setData({ uploading: false });
              return;
            }
            
            that.checkTotalSpace(companyName, fileSizeKB).then((spaceInfo) => {
              wx.hideLoading();
              
              if (!spaceInfo.canUpload) {
                wx.showToast({
                  title: spaceInfo.message || '空间不足，无法上传',
                  icon: 'none',
                  duration: 3000
                });
                that.setData({ uploading: false });
                return;
              }
              
              const confirmMsg = `确定上传图片吗？\n文件大小：${fileSizeMB.toFixed(2)}MB\n当前空间使用率：${spaceInfo.usagePercent.toFixed(2)}%\n预计上传后使用率：${spaceInfo.estimatedPercent.toFixed(2)}%`;
              
              wx.showModal({
                title: '确认上传',
                content: confirmMsg,
                success: (modalRes) => {
                  if (modalRes.confirm) {
                    that.uploadImageToServer(tempFilePath, fileInfo, companyName);
                  } else {
                    that.setData({ uploading: false });
                  }
                },
                fail: () => {
                  that.setData({ uploading: false });
                }
              });
            }).catch((error) => {
              wx.hideLoading();
              console.error('空间检查失败:', error);
              wx.showModal({
                title: '提示',
                content: '空间检查失败，是否继续上传？',
                success: (modalRes) => {
                  if (modalRes.confirm) {
                    const companyName = app.globalData.gongsi;
                    that.uploadImageToServer(tempFilePath, fileInfo, companyName);
                  } else {
                    that.setData({ uploading: false });
                  }
                }
              });
            });
          },
          fail: (err) => {
            wx.hideLoading();
            console.error('获取文件信息失败:', err);
            wx.showToast({
              title: '获取文件信息失败',
              icon: 'none'
            });
            that.setData({ uploading: false });
          }
        });
      },
      fail: function(err) {
        console.log('选择图片失败', err);
      }
    });
  },

  /**
   * 单独删除图片
   */
  deleteImage: function() {
    var that = this;
    var oldImageUrl = that.data.all[0]?.mark1 || '';
    var companyName = app.globalData.gongsi;
    
    if (!oldImageUrl) {
      wx.showToast({
        title: '暂无图片可删除',
        icon: 'none'
      });
      return;
    }
    
    if (!companyName) {
      wx.showToast({
        title: '公司名称不存在',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这张图片吗？删除后空间将被释放。',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
            mask: true
          });
          
          that.setData({ isDeleting: true });
          
          const dynamicPath = "/jinxiaocun/" + companyName + "/";
          const fileNameMatch = oldImageUrl.match(/\/([^/]+)$/);
          
          if (fileNameMatch && fileNameMatch[1]) {
            const fileName = fileNameMatch[1].split('.')[0];
            
            wx.request({
              url: 'https://yhocn.cn:9097/file/delete',
              method: 'POST',
              data: {
                order_number: fileName,
                path: dynamicPath
              },
              success: (delRes) => {
                
                that.setData({
                  tempImageUrl: '',
                  isDeleting: false,
                  ['all[0].mark1']: ''
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
  
  querenxinjian: function() {
    var that = this;
    var id = that.data.id;
    var fun = that.data.fun;
    
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
    
    // 图片字段：优先使用新上传的URL
    if (that.data.tempImageUrl) {
      var bigImg = that.data.tempImageUrl;
    } else {
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