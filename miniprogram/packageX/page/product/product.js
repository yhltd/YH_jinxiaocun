Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    tingyong_list:['是','否'],
    input_type: 'text',
    updatePicker: true,
    updateInput: false,
    newdata:"",
    list: [],
    list2: [],
    product_name:"",
    type: "",
    ckr: "",
    company: "",
    uname: "",
    sheetqx1:[],
    sheetqx2:[],
    empty: "",
    shows: false,
    type: [],
    indexs: 0,
    tempImage1: "",
    tempImage2: "",
    tempImage3: "",
    tempEditImage: "",
    isImageField: false, 
    isDeletingImage: false,  

    // 新增文件上传相关数据
    showUploadModal: false,
    showFileViewModal: false,
    selectedFiles: [],
    currentRecordId: 0,
    currentRecordName: '',
    fileName: '',
    uploading: false,
    uploadProgress: 0,
    currentFileList: [],
    currentFileName: '',
    
    currentImageField: '',
    currentImageIndex: 0,
    
    // 新增图片URL字段
    tempImageUrl1: '',
    tempImageUrl2: '',
    tempImageUrl3: '',
    tempEditImageUrl: '',
    
    getDate: function () {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1);
      var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
      return year + "-" + month + "-" + day
    },

    title: [{ text: "序号", width: "100rpx", columnName: "rownum", type: "digit",isupd: true},
            { text: "商品编码", width: "300rpx", columnName: "product_bianhao", type: "text",isupd: true},
            { text: "商品类别",width: "200rpx",columnName: "type",type: "text",isupd: true},
            { text: "商品名称", width: "200rpx", columnName: "product_name", type: "text", isupd: true},
            { text: "单位", width: "200rpx", columnName: "unit", type: "text", isupd: true},
            { text: "单价", width: "250rpx", columnName: "price", type: "text", isupd: true},
            { text: "成本", width: "250rpx", columnName: "chengben", type: "text", isupd: true},
            { text: "商品规格", width: "200rpx", columnName: "specifications", type: "text", isupd: true },
            { text: "保存方式", width: "300rpx", columnName: "practice", type: "text", isupd: true },
            { text: "详情", width: "300rpx", columnName: "xiangqing", type: "text", isupd: true},
            { text: "图片1", width: "200rpx", columnName: "photo", type: "text", isupd: true},
            { text: "图片2", width: "200rpx", columnName: "photo1", type: "text", isupd: true },
            { text: "图片3", width: "200rpx", columnName: "photo2", type: "text", isupd: true },
            { text: "是否停用", width: "200rpx", columnName: "tingyong", type: "text", isupd: true},
            ],

    title2: [{ text: "商品编码", width: "100rpx", columnName: "product_bianhao", type: "digit", isupd: true },
              { text: "商品类别", width: "250rpx", columnName: "type", type: "text", isupd: true },
              { text: "商品名称", width: "200rpx", columnName: "product_name", type: "text", isupd: true },
              { text: "单位", width: "400rpx", columnName: "unit", type: "text", isupd: true },
              { text: "单价", width: "200rpx", columnName: "price", type: "number", isupd: true },
              { text: "成本", width: "200rpx", columnName: "chengben", type: "number", isupd: true },
              { text: "商品规格", width: "200rpx", columnName: "specifications", type: "text", isupd: true },
              { text: "保存方式", width: "200rpx", columnName: "practice", type: "text", isupd: true },
              { text: "详情", width: "300rpx", columnName: "xiangqing", type: "text", isupd: true},
              { text: "图片1", width: "200rpx", columnName: "photo", type: "text", isupd: true},
              { text: "图片2", width: "200rpx", columnName: "photo1", type: "text", isupd: true },
              { text: "图片3", width: "200rpx", columnName: "photo2", type: "text", isupd: true },
              { text: "是否停用", width: "200rpx", columnName: "tingyong", type: "text", isupd: true }
              
              ],
    input_hid: true,
    frmStudfind: true,
    mask_hid: true,
    addTable: true,
    handle: true,
    details:true,
    addTable2: true,
    input_hid2: true,
    handle2: true,
    handle3:true,
  },

  // ========== 空间检查方法 ==========
  /**
   * 检查空间是否充足
   * @param {string} companyName 公司名
   * @param {number} fileSizeKB 要上传的文件大小(KB)
   * @returns {Promise} 返回检查结果
   */
  checkTotalSpace: function(companyName, fileSizeKB) {
    return new Promise((resolve, reject) => {
      // 从 app 获取空间信息（如果 app 有 globalData，请根据实际情况调整）
      var dbSizeKB = getApp().globalData?.dbSpace || 0;
      var limitKB = getApp().globalData?.mark4 || 0;
      
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
      
      // 构建动态路径：/mendian/ + 公司名
      var path = "/mendian/" + companyName + "/";
      
      // 获取文件夹大小
      wx.request({
        url: "https://yhocn.cn:9097/file/getFolderSize",
        method: 'GET',
        data: { path: path },
        success: (folderRes) => {
          var folderSizeKB = 0;
          
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
          
          var totalUsedKB = dbSizeKB + folderSizeKB;
          limitKB = parseFloat(limitKB);
          
          var fileSizeKB_num = parseFloat(fileSizeKB) || 0;
          var estimatedTotalKB = totalUsedKB + fileSizeKB_num;
          
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

  // ========== 新增：选择并上传图片（带空间检查和500MB限制）==========
  chooseAndUploadImage: function(imageKey, imageIndex) {
    const _this = this;
    
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePath = res.tempFilePaths[0];
        
        // 获取文件信息，检查文件大小
        wx.getFileInfo({
          filePath: tempFilePath,
          success: (fileInfo) => {
            const fileSizeMB = fileInfo.size / 1024 / 1024;
            const fileSizeKB = fileInfo.size / 1024;
            const maxSizeMB = 500; // 500MB限制
            
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
            
            _this.setData({ uploading: true });
            
            // 获取公司名
            const companyName = _this.data.company;
            if (!companyName) {
              wx.hideLoading();
              wx.showToast({
                title: '公司名称不存在',
                icon: 'none'
              });
              _this.setData({ uploading: false });
              return;
            }
            
            // 先检查空间
            _this.checkTotalSpace(companyName, fileSizeKB).then((spaceInfo) => {
              wx.hideLoading();
              
              if (!spaceInfo.canUpload) {
                wx.showToast({
                  title: spaceInfo.message || '空间不足，无法上传',
                  icon: 'none',
                  duration: 3000
                });
                _this.setData({ uploading: false });
                return;
              }
              
              const confirmMsg = `确定上传图片吗？\n文件大小：${fileSizeMB.toFixed(2)}MB\n当前空间使用率：${spaceInfo.usagePercent.toFixed(2)}%\n预计上传后使用率：${spaceInfo.estimatedPercent.toFixed(2)}%`;
              
              wx.showModal({
                title: '确认上传',
                content: confirmMsg,
                success: (modalRes) => {
                  if (modalRes.confirm) {
                    _this.uploadImageToServer(tempFilePath, fileInfo, companyName, imageKey);
                  } else {
                    _this.setData({ uploading: false });
                  }
                },
                fail: () => {
                  _this.setData({ uploading: false });
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
                    const companyName = _this.data.company;
                    _this.uploadImageToServer(tempFilePath, fileInfo, companyName, imageKey);
                  } else {
                    _this.setData({ uploading: false });
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
            _this.setData({ uploading: false });
          }
        });
      },
      fail: function(err) {
        console.log('选择图片失败', err);
      }
    });
  },
  
  /**
   * 上传图片到服务器
   */
  uploadImageToServer: function(tempFilePath, fileInfo, companyName, imageKey) {
    var _this = this;
    
    wx.showLoading({
      title: '上传中...',
      mask: true
    });
    
    // 构建动态路径：/mendian/ + 公司名 + /
    const dynamicPath = "/mendian/" + companyName + "/";
    
    // 生成文件名
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const fileExtension = tempFilePath.split('.').pop() || 'jpg';
    const fileName = `${timestamp}_${random}.${fileExtension}`;
    
    // 上传新文件
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
            var fileUrl = "http://yhocn.cn:9088/mendian/" + companyName + "/" + fileName;
            
            _this.setData({ 
              [imageKey]: fileUrl,
              uploading: false
            });
            
            wx.showToast({ 
              title: '上传成功', 
              icon: 'success' 
            });
            
            console.log('图片URL:', fileUrl);
          } else {
            wx.showToast({ 
              title: resData.msg || '上传失败', 
              icon: 'none' 
            });
            _this.setData({ uploading: false });
          }
        } catch (e) {
          console.error('解析响应失败:', e);
          wx.showToast({ 
            title: '上传失败', 
            icon: 'none' 
          });
          _this.setData({ uploading: false });
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
        _this.setData({ uploading: false });
      }
    });
  },
  
  // 编辑时选择图片（带空间检查和500MB限制）
  chooseImageForEdit: function() {
    var _this = this;
    
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const tempFilePath = res.tempFilePaths[0];
        
        // 获取文件信息，检查文件大小
        wx.getFileInfo({
          filePath: tempFilePath,
          success: (fileInfo) => {
            const fileSizeMB = fileInfo.size / 1024 / 1024;
            const fileSizeKB = fileInfo.size / 1024;
            const maxSizeMB = 500;
            
            console.log('文件大小:', fileSizeMB.toFixed(2), 'MB');
            
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
            
            // 获取当前旧图片URL
            const oldImageUrl = _this.data.dataset_input.value;
            const companyName = _this.data.company;
            
            if (!companyName) {
              wx.hideLoading();
              wx.showToast({
                title: '公司名称不存在',
                icon: 'none'
              });
              return;
            }
            
            // 先检查空间
            _this.checkTotalSpace(companyName, fileSizeKB).then((spaceInfo) => {
              wx.hideLoading();
              
              if (!spaceInfo.canUpload) {
                wx.showToast({
                  title: spaceInfo.message || '空间不足，无法上传',
                  icon: 'none',
                  duration: 3000
                });
                return;
              }
              
              const confirmMsg = `确定上传图片吗？\n文件大小：${fileSizeMB.toFixed(2)}MB\n当前空间使用率：${spaceInfo.usagePercent.toFixed(2)}%\n预计上传后使用率：${spaceInfo.estimatedPercent.toFixed(2)}%`;
              
              wx.showModal({
                title: '确认上传',
                content: confirmMsg,
                success: (modalRes) => {
                  if (modalRes.confirm) {
                    _this.uploadEditImageToServer(tempFilePath, fileInfo, companyName, oldImageUrl);
                  }
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
                    const companyName = _this.data.company;
                    _this.uploadEditImageToServer(tempFilePath, fileInfo, companyName, oldImageUrl);
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
          }
        });
      },
      fail: function(err) {
        console.log('选择图片失败', err);
      }
    });
  },
  
  /**
   * 上传编辑图片到服务器
   */
  uploadEditImageToServer: function(tempFilePath, fileInfo, companyName, oldImageUrl) {
    var _this = this;
    
    wx.showLoading({
      title: '上传中...',
      mask: true
    });
    
    // 构建动态路径
    const dynamicPath = "/mendian/" + companyName + "/";
    
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
                console.log('旧图片删除结果:', delRes.data);
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
              var fileUrl = "http://yhocn.cn:9088/mendian/" + companyName + "/" + fileName;
              
              _this.setData({
                tempEditImageUrl: fileUrl
              });
              
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              });
            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              });
            }
          } catch (e) {
            console.error('解析响应失败:', e);
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            });
          }
        },
        fail: function(err) {
          wx.hideLoading();
          console.error('上传失败:', err);
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          });
        }
      });
    });
  },
  
  // 单独删除图片（不替换，只删除）
  deleteImageOnly: function() {
    var _this = this;
    var dataset = _this.data.dataset_input;
    var index = dataset.index;
    var id = _this.data.list[index].id;
    var column = dataset.column;
    var oldImageUrl = dataset.value;
    var companyName = _this.data.company;
    
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
          
          _this.setData({ isDeletingImage: true });
          
          const dynamicPath = "/mendian/" + companyName + "/";
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
                console.log('图片删除结果:', delRes.data);
                
                var sql = "update product set " + column + " = '' where id = '" + id + "';"
                
                wx.cloud.callFunction({
                  name: 'sqlserver_xinyongka',
                  data: {
                    sql: sql
                  },
                  success: res => {
                    wx.hideLoading();
                    wx.showToast({
                      title: "图片删除成功",
                      icon: "success"
                    });
                    
                    _this.setData({
                      ["list[" + index + "]." + column]: '',
                      input_hid: true,
                      mask_hid: true,
                      isDeletingImage: false,
                      tempEditImageUrl: ''
                    });
                    
                    _this.hid_view();
                  },
                  fail: err => {
                    wx.hideLoading();
                    console.error('数据库更新失败:', err);
                    wx.showToast({
                      title: "删除失败",
                      icon: "none"
                    });
                    _this.setData({ isDeletingImage: false });
                  }
                });
              },
              fail: (err) => {
                wx.hideLoading();
                console.error('删除文件失败:', err);
                wx.showToast({
                  title: '文件删除失败',
                  icon: 'none'
                });
                _this.setData({ isDeletingImage: false });
              }
            });
          } else {
            wx.hideLoading();
            wx.showToast({
              title: '无效的图片地址',
              icon: 'none'
            });
            _this.setData({ isDeletingImage: false });
          }
        }
      }
    });
  },
  
  chooseImage1: function() { this.chooseAndUploadImage('tempImageUrl1', 1); },
  chooseImage2: function() { this.chooseAndUploadImage('tempImageUrl2', 2); },
  chooseImage3: function() { this.chooseAndUploadImage('tempImageUrl3', 3); },

  // ========== 以下为原有代码，保持不变 ==========
  
  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var window_tingyong = _this.data.tingyong_list[e.detail.value]
    console.log(window_tingyong)
    _this.setData({
      window_tingyong: _this.data.tingyong_list[e.detail.value]
    })
  },

  clickView: function(e) {
    var _this = this;
    var dataset_input = e.currentTarget.dataset;
    console.log(dataset_input)
    
    if (!dataset_input.isupd) {
      return;
    }
    
    const isImageField = dataset_input.column === 'photo' || 
                        dataset_input.column === 'photo1' || 
                        dataset_input.column === 'photo2';
    
    if (isImageField) {
      _this.setData({
        dataset_input,
        input_hid: false,
        mask_hid: false,
        input_type: 'image',
        tempEditImageUrl: '',
        currentImageField: dataset_input.column,
        currentImageIndex: dataset_input.index
      });
    } else if (dataset_input.column == "rownum") {
      _this.setData({
        dataset_input,
        handle: false,
        mask_hid: false,
      });
    } else {
      _this.setData({
        dataset_input,
        input_hid: false,
        mask_hid: false,
        updatePicker: dataset_input.input_type !== 'date',
        input_type: dataset_input.input_type
      });
    }
  },
  
  clickView2: function (e) {
    var _this = this;
    var dataset_input = e.currentTarget.dataset;
    
    if (!dataset_input.isupd) {
      return;
    }
    
    const isImageField = dataset_input.column === 'photo' || 
                        dataset_input.column === 'photo1' || 
                        dataset_input.column === 'photo2';
    
    if (dataset_input.column == "did") {
      _this.setData({
        dataset_input,
        input_hid2: true,
        handle2: false,
        mask_hid: false,
      })
    } else {
      if (_this.data.sheetqx2.Upd == "1") {
        _this.setData({
          dataset_input,
          updatePicker: dataset_input.input_type === 'date',
          input_hid2: false,
          handle2: true,
          mask_hid: false,
          tempEditImage: ""
        })
      } else {
        wx.showToast({
          title: '无权限',
          icon: 'none',
        })
      }
    }
  },
  
  xq_qx: function () {
    var _this = this;
    _this.setData({
      input_hid2: true,
      handle2: true,
      tempEditImage: ""
    })
  },

  gengduo_show:function(){
    var _this = this;
    _this.setData({
      mask_hid:false,
      handle3:false
    })
  },

  xiangqing: function(e) {
    var _this = this;
    if(_this.data.sheetqx2.Sel=="1"){
    _this.setData({
      details: false,
      mask_hid: false,
      handle:true
    })
    _this.init2()
    }else{
      wx.showToast({
        title: '无权限',
        icon: 'none',
      })
    }
  },

  sanchu: function() {
    var _this = this;
    var id = _this.data.list[_this.data.dataset_input.index].id;
    var item = _this.data.list[_this.data.dataset_input.index];
    
    wx.showModal({
      title: "提示",
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
            mask: true
          });
          
          const imageFields = ['photo', 'photo1', 'photo2'];
          const deletePromises = [];
          
          imageFields.forEach(field => {
            const imageUrl = item[field];
            if (imageUrl && imageUrl.includes('yhocn.cn:9088')) {
              const fileNameMatch = imageUrl.match(/\/([^/]+)$/);
              if (fileNameMatch && fileNameMatch[1]) {
                const fileName = fileNameMatch[1].split('.')[0];
                
                const promise = new Promise((resolve) => {
                  wx.request({
                    url: 'https://yhocn.cn:9097/file/delete',
                    method: 'POST',
                    data: {
                      order_number: fileName,
                      path: '/mendian/'
                    },
                    complete: resolve
                  });
                });
                deletePromises.push(promise);
              }
            }
          });
          
          Promise.all(deletePromises).finally(() => {
            var sql = "delete from product where id = '" + id + "';";
            wx.cloud.callFunction({
              name: 'sqlserver_xinyongka',
              data: {
                sql: sql
              },
              success: res => {
                wx.hideLoading();
                wx.showToast({
                  title: "删除成功",
                  icon: "success"
                });
                _this.setData({
                  handle: true,
                  mask_hid: true
                });
                _this.init();
              },
              fail: err => {
                wx.hideLoading();
                console.error('删除失败:', err);
                wx.showToast({
                  title: "删除失败",
                  icon: "none"
                });
              }
            });
          });
        }
      }
    });
  },

  sanchu2: function () {
    var _this = this;
    if (_this.data.sheetqx1.Del == "1") {
    var did = _this.data.list2[_this.data.dataset_input.index].did;
    wx.showModal({
      title: "提示",
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          var sql = "delete from day_trading where did = '" + did + "'";
          wx.cloud.callFunction({
            name: 'sqlserver_xinyongka',
            data: {
              sql: sql
            },
            success: res => {
              wx.showToast({
                title: "删除成功",
                icon: "none"

              })
              _this.hid_view()
            },
            err: res => {
              wx.showToast({
                title: "错误",
                icon: "none"
              })
            }
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
    } else {
      wx.showToast({
        title: '无权限',
        icon: 'none',
      })
    }
  },

  changed: function (e) {
    var _this = this;
    var dataset = _this.data.dataset_input;
    var index = dataset.index;
    var id = _this.data.list[index].id
    var column = dataset.column;
    
    const isImageField = column === 'photo' || column === 'photo1' || column === 'photo2';
    
    var new_value;
    
    if (isImageField) {
      new_value = _this.data.tempEditImageUrl || dataset.value;
    } else {
      new_value = e.detail.value.new;
      
      if (!new_value) {
        new_value = dataset.value;
      }
    }
    
    if (!dataset.isupd) {
      return;
    }
    
    wx.showLoading({
      title: '保存中...',
      mask: true
    });
    
    var sql = "update product set " + column + " = '" + new_value + "' where id = '" + id + "';"
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: "修改成功",
          icon: "success"
        });
        
        _this.setData({
          ["list[" + index + "]." + column]: new_value,
          tempEditImageUrl: "",
          input_hid: true,
          mask_hid: true,
          isDeletingImage: false
        });
        
        _this.hid_view();
      },
      fail: err => {
        wx.hideLoading();
        console.error('修改失败:', err);
        wx.showToast({
          title: "修改失败",
          icon: "none"
        });
        _this.setData({ isDeletingImage: false });
      }
    });
  },
 
  changed2: function (e) {
    var _this = this;
    var dataset = _this.data.dataset_input;
    var column = dataset.column;
    var index = dataset.index;
    
    const isImageField = column === 'photo' || column === 'photo1' || column === 'photo2' || column === 'photo3';
    
    var new_value;
    
    if (isImageField) {
      new_value = _this.data.tempEditImage ? _this.data.tempEditImage.replace('data:image/jpeg;base64,', '') : '';
    } else {
      new_value = e.detail.value.new;
    }
    
    if (!dataset.isupd) {
      return;
    }
    
    if (new_value !== "" && new_value !== undefined) {
      var sql = "update day_trading set " + column + " = '" + new_value + "' where did = '" + _this.data.list2[index].did + "';"
      
      wx.cloud.callFunction({
        name: 'sqlserver_xinyongka',
        data: {
          sql: sql
        },
        success: res => {
          wx.showToast({
            title: "修改成功",
            icon: "success"
          })
          _this.setData({
            input_hid2: true,
            mask_hid: true,
            ["list2[" + index + "]." + column]: isImageField ? new_value : new_value,
            tempEditImage: ""
          })
        },
        fail: res => {
          wx.showToast({
            title: "修改失败",
            icon: "none"
          })
        }
      })
    } else {
      wx.showToast({
        title: "不能为空！",
        icon: "none"
      })
    }
  },
  
  onImageError: function(e) {
    console.log('图片加载失败:', e);
    wx.showToast({
      title: '图片加载失败',
      icon: 'none'
    });
  },
  
  choiceDate: function(e){
    this.setData({
      [e.currentTarget.dataset.column_name]: e.detail.value
    })
  },

  inquire: function() {
    var _this = this;
    _this.setData({
      frmStudfind: false,
      mask_hid: false,
    })
  },

  entering: function() {
    var _this = this;
    _this.setData({
      addTable: false,
      mask_hid: false,
    })
  },

  luru: function () {
    var _this = this;
    _this.setData({
      addTable2: false,
      mask_hid: false,
    })
  },

  inquire_QX: function() {
    var _this = this;
    _this.hid_view();
  },

  hid_view: function() {
    var _this = this;
    _this.setData({
      input_hid: true,
      frmStudfind: true,
      mask_hid: true,
      addTable: true,
      handle: true,
      details: true,
      addTable2: true,
      input_hid2: true,
      handle2: true,
      handle3: true,
      tempImageUrl1: "",
      tempImageUrl2: "",
      tempImageUrl3: "",
      tempEditImageUrl: "",
      currentImageField: "",
      currentImageIndex: 0,
      empty: "",
      zdr: "",
      hkr: ""
    });
  },

  save: function(e) {
    var _this = this;
    _this.setData({
      product_name: e.detail.value.product_name,
      type: e.detail.value.type,
    })
    _this.init();
    _this.setData({
      frmStudfind: true,
      mask_hid: true,
      empty:"",
      zdr:"",
      hkr:""
    })
  },

  add: function(e) {
    var _this = this;
    
    if (e.detail.value.product_bianhao !="" && e.detail.value.type != "" && e.detail.value.product_name != "" && e.detail.value.unit != "" && e.detail.value.price != "" && e.detail.value.chengben != "" && e.detail.value.specifications != "" && e.detail.value.practice != "" && e.detail.value.tingyong != "" ){
      
      let sql = "insert into product(company,product_bianhao,type,product_name,unit,price,chengben,specifications,practice,xiangqing,photo,photo1,photo2,tingyong) values('" + _this.data.company + "','" +
        e.detail.value.product_bianhao + "','" + e.detail.value.type + "','" + e.detail.value.product_name + "','" +
        e.detail.value.unit + "','" + e.detail.value.price + "','" + e.detail.value.chengben + "','" + 
        e.detail.value.specifications + "','" + e.detail.value.practice + "','" + 
        (e.detail.value.xiangqing || '') + "','" + 
        (_this.data.tempImageUrl1 || '') + "','" +
        (_this.data.tempImageUrl2 || '') + "','" +
        (_this.data.tempImageUrl3 || '') + "','" +
        e.detail.value.tingyong + "')"
      
      console.log('执行的SQL:', sql)
      
      wx.cloud.callFunction({
        name: 'sqlserver_xinyongka',
        data: {
          sql: sql
        },
        success: res => {
          console.log('云函数完整返回:', res);
          
          if (res.result && (res.result.affectedRows > 0 || res.result.insertId > 0)) {
            wx.showToast({
              title: "添加成功！",
              icon: "success",
              duration: 2000
            });
            
            setTimeout(() => {
              _this.init();
              _this.setData({
                addTable: true,
                mask_hid: true,
                empty: "",
                tempImageUrl1: "",
                tempImageUrl2: "",
                tempImageUrl3: "",
                window_tingyong: ""
              });
            }, 1500);
            
          } else {
            wx.showToast({
              title: "添加失败，未影响数据行",
              icon: "none"
            });
          }
        },
        error: res => {
          console.log('error:', res);
          wx.showToast({
            title: "添加失败",
            icon: "none"
          });
        },
        fail: err => {
          console.log('fail:', err);
          wx.showToast({
            title: "网络错误",
            icon: "none"
          });
        }
      });
    } else {
      wx.showToast({
        title: "前六项不能为空！",
        icon: "none"
      });
    }
  },
  
  inquire_QX: function() {
    var _this = this;
    _this.setData({
      tempImageUrl1: "",
      tempImageUrl2: "",
      tempImageUrl3: ""
    })
    _this.hid_view();
  },

  add2: function (e) {
    if (e.detail.value.yhje != "" && e.detail.value.sh != "" && e.detail.value.ske != "" && e.detail.value.fl != "" && e.detail.value.dzje != "" && e.detail.value.jcsxf != "" && e.detail.value.qtsxf != "" ){
    var _this = this;
    var id = _this.data.list[_this.data.dataset_input.index].id;
    var now_time = _this.data.getDate();
    let sql = "insert into day_trading(id,date_time,repayment,commercial_tenant,swipe,rate,arrival_amount,basics_service_charge,other_service_charge,gongsi) values('" + id + "','" +
      now_time + "','" + e.detail.value.yhje + "','" + e.detail.value.sh + "','" +
      e.detail.value.ske + "','" + e.detail.value.fl + "','" +
      e.detail.value.dzje + "','" + e.detail.value.jcsxf + "','" + e.detail.value.qtsxf + "','" + _this.data.gongsi + "')"
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        wx.showToast({
          title: "添加成功！",
          icon: "none"
        })
      },
      error: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
    _this.hid_view();
    _this.setData({
      addTable2: true,
      mask_hid: true,
      empty:"",
      zdr:"",
      hkr:""
    })
    }else{
      wx.showToast({
        title: "必填项不能为空！",
        icon: "none"
      })
    }
  },

  init: function() {
    var _this = this;
    let sql = "select * from product where product_name like '%" + _this.data.product_name + "%' and type like '%" + _this.data.type + "%' and company='"+ _this.data.company +"'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        console.log("select-success", res)
        
        const processedList = res.result.map(item => {
          return {
            ...item
          };
        });
  
        _this.setData({
          list: processedList,
          product_name: "",
          type: "",
        })
      },
      fail: res=> {
        console.log("select-fail",res)
      }
    })
  },
  
  init2: function () {
    var _this = this;
    var id = _this.data.list[_this.data.dataset_input.index].id;
    let sql = "select * from day_trading right join customer on customer.id = day_trading.id where customer.id='" + id + "' and day_trading.gongsi='" + _this.data.gongsi +"'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        console.log("select-success", res)
        _this.setData({
          list2: res.result,
          skr: "",
          fkr: "",
          ckr: "",
        })
      },
      fail: res => {
        console.log("select-fail", res)
      }
    })
  },

  onLoad: function(options) {
    var _this = this;
    var userInfo = JSON.parse(options.userInfo)
     _this.setData({
       company: userInfo.company,
       uname: userInfo.uname,
     })
    console.log(userInfo)
    _this.init();
  },

  choice_checkBox: function(e) {
    var _this = this;
    var value = e.detail.value
    var index = e.currentTarget.dataset.index;
    var checkItems = _this.data.checkItems;
    if (value != "") {
      checkItems.push(index)
    } else {
      for (let i = 0; i < checkItems.length; i++) {
        if (checkItems[i] == index) {
          checkItems.splice(i, 1)
        }
      }
    }
    _this.setData({
      checkItems
    })
  },

  use_book:function(){
    wx.showModal({
      title: '使用说明',
      content: '1.点击查询按钮，输入条件点击确定即可查询。\n2.点击录入按钮，输入内容点击确定即可录入。\n3.点击序号，在弹出的窗口点击删除按钮即可删除。',
      showCancel: false,
      confirmText: "知道了",
      confirmColor: '#84B9F2',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  getExcel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title2

    var cloudList = {
      name: '商品设置',
      items: [],
      header: [],
    }

    for (let i = 0; i < title.length; i++) {
      cloudList.header.push({
        item: title[i].text,
        type: title[i].type,
        width: parseInt(title[i].width.split("r")[0]) / 6,
        columnName: title[i].columnName
      })
    }
    cloudList.items = list
    for (let j = 0; j < list.length; j++) {
      list[j].photo=""
    }
    console.log(cloudList)

    wx.cloud.callFunction({
      name: 'getExcel',
      data: {
        list: cloudList
      },
      success: function (res) {
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu: 'true',
              fileType: 'xlsx',
              success: res => {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  
  chooseImage: function(imageKey) {
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePath = res.tempFilePaths[0];
        
        wx.getFileInfo({
          filePath: tempFilePath,
          success: fileInfo => {
            console.log('原图大小:', fileInfo.size);
            
            if (fileInfo.size > 2 * 1024 * 1024) {
              wx.showToast({ 
                title: '图片需小于2MB', 
                icon: 'none' 
              });
              return;
            }
            
            if (fileInfo.size < 500 * 1024) {
              _this.convertToBase64(tempFilePath, imageKey);
            } else {
              _this.compressImage(tempFilePath, imageKey);
            }
          },
          fail: err => {
            console.error('获取文件信息失败:', err);
            _this.convertToBase64(tempFilePath, imageKey);
          }
        });
      }
    });
  },

  convertToBase64: function(filePath, imageKey) {
    const _this = this;
    wx.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: 'base64',
      success: res => {
        const base64Data = res.data;
        console.log('base64数据长度:', base64Data.length);
        
        _this.setData({ 
          [imageKey]: 'data:image/jpeg;base64,' + base64Data 
        });
        wx.showToast({ 
          title: '图片选择成功', 
          icon: 'success' 
        });
      },
      fail: err => {
        console.error('转换为base64失败:', err);
        wx.showToast({ 
          title: '图片处理失败', 
          icon: 'none' 
        });
      }
    });
  },

  compressImage: function(filePath, imageKey) {
    const _this = this;
    wx.compressImage({
      src: filePath,
      quality: 60,
      success: compressRes => {
        console.log('压缩成功:', compressRes.tempFilePath);
        
        wx.getFileInfo({
          filePath: compressRes.tempFilePath,
          success: fileInfo => {
            console.log('压缩后大小:', fileInfo.size);
            _this.convertToBase64(compressRes.tempFilePath, imageKey);
          },
          fail: () => {
            _this.convertToBase64(compressRes.tempFilePath, imageKey);
          }
        });
      },
      fail: err => {
        console.error('压缩失败:', err);
        _this.convertToBase64(filePath, imageKey);
      }
    });
  }
})