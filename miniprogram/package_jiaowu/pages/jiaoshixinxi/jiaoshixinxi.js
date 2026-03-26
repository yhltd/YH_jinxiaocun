// packageP/page/PaiChanHeDui/PaiChanHeDui.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  data: {
    list: [],
    title: [{
        text: "教师姓名",
        width: "200rpx",
        columnName: "t_name",
        type: "text",
        isupd: true
      },
      {
        text: "性别",
        width: "200rpx",
        columnName: "sex",
        type: "text",
        isupd: true
      },
      {
        text: "身份证号码",
        width: "200rpx",
        columnName: "id_code",
        type: "text",
        isupd: true
      },
      {
        text: "民族",
        width: "200rpx",
        columnName: "minzu",
        type: "text",
        isupd: true
      },
      {
        text: "生日",
        width: "200rpx",
        columnName: "birthday",
        type: "text",
        isupd: true
      },
      {
        text: "职位",
        width: "200rpx",
        columnName: "post",
        type: "text",
        isupd: true
      },
      {
        text: "学历",
        width: "200rpx",
        columnName: "education",
        type: "text",
        isupd: true
      },
      {
        text: "联系电话",
        width: "200rpx",
        columnName: "phone",
        type: "text",
        isupd: true
      },
      {
        text: "入职日期",
        width: "200rpx",
        columnName: "rz_riqi",
        type: "text",
        isupd: true
      },
      {
        text: "在职状态",
        width: "200rpx",
        columnName: "state",
        type: "text",
        isupd: true
      },
      {
        text: "社保情况",
        width: "200rpx",
        columnName: "shebao",
        type: "text",
        isupd: true
      },
      {
        text: "地址",
        width: "200rpx",
        columnName: "address",
        type: "text",
        isupd: true
      },
      {
        text: "文件",
        width: "200rpx",
        columnName: "wenjian",
        type: "text",
        isupd: false
      }
    ],
    showUploadModal: false,      // 上传弹窗显示状态
    showFileViewModal: false,    // 文件查看弹窗显示状态
    selectedFiles: [],           // 已选择的文件列表
    currentRecordId: 0,          // 当前操作的记录ID
    currentRecordName: '',       // 当前记录的教师姓名
    fileName: '',                // 用户输入的文件名
    uploading: false,            // 上传中状态
    uploadProgress: 0,           // 上传进度
    currentFileList: [],         // 当前查看的文件列表
    currentFileName: '',         // 当前查看的文件名
    jsxm: "",
    xb: "",
    sfzhm: "",
    mz: "",
    sr: "",
    zw: "",
    xl: "",
    lxdh: "",
    rzrq: "",
    zzzt: "",
    sbqk: "",
    dz: "",
    // 新增代码
    isdis: '',
    isdischa: '',
    isdisgai: '',
    isdisshan: '',
    xingbie_list:['男','女'],
    minDate: new Date(1900, 1, 1).getTime(),
    maxDate: new Date(2100, 12, 31).getTime(),
    currentDate: new Date().getTime(),
    state_list:['在职','离职']
  },

  // ========== 新增：空间检查方法 ==========
  /**
   * 检查空间是否充足
   * @param {string} companyName 公司名
   * @param {number} fileSizeKB 要上传的文件大小(KB)
   * @returns {Promise} 返回检查结果
   */
  checkTotalSpace: function(companyName, fileSizeKB) {
    return new Promise((resolve, reject) => {
      // 从 app.globalData 获取空间信息
      var dbSizeKB = app.globalData?.dbSpace || 0;
      var limitKB = app.globalData?.mark4 || 0;
      
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
      
      // 构建动态路径：/jiaowu/ + 公司名
      var path = "/jiaowu/" + companyName + "/";
      
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

  // ========== 修改：显示上传弹窗 ==========
  showUploadModalFunc: function(e) {
    var recordId = e.currentTarget.dataset.id || 0;
    var recordName = e.currentTarget.dataset.name || '';
    
    this.setData({
      showUploadModal: true,
      selectedFiles: [],
      currentRecordId: recordId,
      currentRecordName: recordName,
      fileName: '',
      uploading: false,
      uploadProgress: 0
    });
  },

  // 隐藏上传弹窗
  hideUploadModal: function() {
    this.setData({
      showUploadModal: false,
      uploading: false,
      uploadProgress: 0,
      selectedFiles: [],
      fileName: ''
    });
  },

  // 隐藏文件查看弹窗
  hideFileViewModal: function() {
    this.setData({
      showFileViewModal: false,
      currentFileList: [],
      currentFileName: '',
      currentRecordId: 0
    });
  },

  // 文件名输入监听
  onFileNameInput: function(e) {
    this.setData({
      fileName: e.detail.value
    });
  },

  // 选择文档
  chooseFile: function() {
    var that = this;
    wx.chooseMessageFile({
      count: 9,
      type: 'file',
      extension: ['jpg', 'png', 'jpeg', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'],
      success: function(res) {
        var files = res.tempFiles.map(file => ({
          path: file.path,
          name: file.name,
          size: file.size,
          type: file.type
        }));
        that.setData({ selectedFiles: files });
      }
    });
  },

  // 选择图片
  chooseImage: function() {
    var that = this;
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var files = res.tempFiles.map((file, index) => ({
          path: file.tempFilePath,
          name: `图片_${index + 1}.jpg`,
          size: file.size,
          type: 'image'
        }));
        that.setData({ selectedFiles: files });
      }
    });
  },

  // ========== 修改：上传文件（带空间检查和500MB限制） ==========
  uploadFile: function() {
    var that = this;
    
    if (that.data.selectedFiles.length === 0) {
      wx.showToast({ title: '请选择文件', icon: 'none' });
      return;
    }
    
    if (!that.data.currentRecordId) {
      wx.showToast({ title: '请选择一条记录', icon: 'none' });
      return;
    }
    
    // 先检查每个文件大小是否超过500MB
    const maxSizeMB = 500;
    const oversizedFiles = [];
    let totalSizeKB = 0;
    
    for (let i = 0; i < that.data.selectedFiles.length; i++) {
      const file = that.data.selectedFiles[i];
      const fileSizeMB = file.size / 1024 / 1024;
      totalSizeKB += file.size / 1024;
      
      if (file.size > maxSizeMB * 1024 * 1024) {
        oversizedFiles.push(file.name + " (" + fileSizeMB.toFixed(2) + "MB)");
      }
    }
    
    if (oversizedFiles.length > 0) {
      wx.showToast({
        title: `文件超过${maxSizeMB}MB限制`,
        icon: 'none',
        duration: 3000
      });
      return;
    }
    
    // 获取公司名
    const companyName = that.data.userInfo?.Company || app.globalData?.gongsi;
    
    if (!companyName) {
      wx.showToast({ title: '公司名称不存在', icon: 'none' });
      return;
    }
    
    wx.showLoading({
      title: '检查空间...',
      mask: true
    });
    
    that.setData({ uploading: true });
    
    // 先检查空间
    that.checkTotalSpace(companyName, totalSizeKB).then((spaceInfo) => {
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
      
      const totalSizeMB = totalSizeKB / 1024;
      const confirmMsg = `确定要为 "${that.data.currentRecordName}" 上传 ${that.data.selectedFiles.length} 个文件吗？\n文件总大小：${totalSizeMB.toFixed(2)}MB\n当前空间使用率：${spaceInfo.usagePercent.toFixed(2)}%\n预计上传后使用率：${spaceInfo.estimatedPercent.toFixed(2)}%`;
      
      wx.showModal({
        title: '确认上传',
        content: confirmMsg,
        success: function(res) {
          if (res.confirm) {
            that.startUpload(companyName);
          } else {
            that.setData({ uploading: false });
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
            const companyName = that.data.userInfo?.Company || app.globalData?.gongsi;
            that.startUpload(companyName);
          } else {
            that.setData({ uploading: false });
          }
        }
      });
    });
  },

  // ========== 修改：开始上传（带动态路径） ==========
  startUpload: function(companyName) {
    var that = this;
    var uploadedFiles = [];
    var totalFiles = that.data.selectedFiles.length;
    var completedCount = 0;
    
    that.setData({ uploading: true, uploadProgress: 0 });
    
    var recordId = that.data.currentRecordId;
    var recordName = that.data.currentRecordName || '未知';
    var userFileName = that.data.fileName || '';
    
    // 构建动态路径：/jiaowu/ + 公司名 + /
    const dynamicPath = "/jiaowu/" + companyName + "/";
    
    function uploadNextFile(index) {
      if (index >= totalFiles) {
        that.handleUploadComplete(uploadedFiles);
        return;
      }
      
      var file = that.data.selectedFiles[index];
      var fileExtension = file.name.split('.').pop().toLowerCase();
      
      // 构建文件名
      var finalFileName = '';
      if (userFileName && userFileName.trim() !== '') {
        var baseName = userFileName.trim().replace(/[\\/:*?"<>|]/g, '_');
        if (baseName.includes('.')) baseName = baseName.split('.').slice(0, -1).join('.');
        finalFileName = totalFiles === 1 
          ? `${baseName}.${fileExtension}` 
          : `${baseName}_${index + 1}.${fileExtension}`;
      } else {
        var safeRecordName = recordName.replace(/[\\/:*?"<>|]/g, '_').substring(0, 10);
        finalFileName = totalFiles === 1 
          ? `教师文件_${safeRecordName}.${fileExtension}` 
          : `教师文件_${safeRecordName}_${index + 1}.${fileExtension}`;
      }
      
      that.setData({ uploadProgress: Math.round((index / totalFiles) * 100) });
      
      // 上传文件到服务器
      wx.uploadFile({
        url: 'https://yhocn.cn:9097/file/upload',
        filePath: file.path,
        name: 'file',
        formData: {
          name: finalFileName,
          path: dynamicPath,
          kongjian: '3',
          fileType: fileExtension,
          recordId: recordId,
          recordName: recordName,
          userFileName: userFileName,
          fileSize: file.size.toString()
        },
        header: { 'Content-Type': 'multipart/form-data' },
        timeout: 600000,
        success: function(uploadRes) {
          completedCount++;
          try {
            var resData = JSON.parse(uploadRes.data);
            if (resData.code === 200 || resData.success) {
              var fileUrl = "http://yhocn.cn:9088/jiaowu/" + companyName + "/" + finalFileName;
              uploadedFiles.push({
                name: finalFileName,
                url: fileUrl,
                originalName: file.name,
                userFileName: userFileName,
                size: file.size,
                type: fileExtension
              });
            }
          } catch (e) {
            console.error('解析响应失败:', e);
          }
          setTimeout(() => uploadNextFile(index + 1), 500);
        },
        fail: function(err) {
          completedCount++;
          console.error('上传失败:', err);
          setTimeout(() => uploadNextFile(index + 1), 1000);
        }
      });
    }
    
    uploadNextFile(0);
  },

  // 上传完成处理
  handleUploadComplete: function(uploadedFiles) {
    var that = this;
    
    that.setData({ uploading: false, uploadProgress: 100 });
    
    if (uploadedFiles.length > 0) {
      that.saveFilesToDatabase(uploadedFiles, function() {
        setTimeout(() => {
          that.hideUploadModal();
          wx.showToast({
            title: `上传完成，成功 ${uploadedFiles.length} 个文件`,
            icon: 'success',
            duration: 3000
          });
          // 刷新列表
          var e = [that.data.jsxm || ''];
          that.tableShow(e);
        }, 500);
      });
    } else {
      setTimeout(() => {
        that.hideUploadModal();
        wx.showToast({
          title: '上传失败，请重试',
          icon: 'none',
          duration: 3000
        });
      }, 500);
    }
  },

  // 保存文件信息到数据库
  saveFilesToDatabase: function(files, callback) {
    var that = this;
    var app = getApp();
    
    if (app.globalData.shujuku == 0) {
      // MySQL版本
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "select wenjian from teacherinfo where id = " + that.data.currentRecordId
        },
        success: res => {
          var existingFiles = res.result[0]?.wenjian || '';
          var existingArray = existingFiles ? existingFiles.split(',').map(f => f.trim()) : [];
          var newFileUrls = files.map(file => file.url);
          var allFileUrls = existingArray.concat(newFileUrls);
          var fileUrlsString = allFileUrls.join(',');
          
          wx.cloud.callFunction({
            name: 'sql_jiaowu',
            data: {
              sql: "update teacherinfo set wenjian = '" + fileUrlsString + "' where id = " + that.data.currentRecordId
            },
            success: () => {
              console.log('文件信息保存成功');
              if (callback) callback();
            },
            fail: (err) => {
              console.error('文件信息保存失败:', err);
              if (callback) callback();
            }
          });
        },
        fail: (err) => {
          console.error('查询文件信息失败:', err);
          if (callback) callback();
        }
      });
    } else if (app.globalData.shujuku == 1) {
      // SQL Server版本
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select wenjian from xueshengguanlixitong_excel.dbo.teacherinfo where id = " + that.data.currentRecordId
        },
        success: res => {
          var existingFiles = res.result.recordset[0]?.wenjian || '';
          var existingArray = existingFiles ? existingFiles.split(',').map(f => f.trim()) : [];
          var newFileUrls = files.map(file => file.url);
          var allFileUrls = existingArray.concat(newFileUrls);
          var fileUrlsString = allFileUrls.join(',');
          
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: "update xueshengguanlixitong_excel.dbo.teacherinfo set wenjian = '" + fileUrlsString + "' where id = " + that.data.currentRecordId
            },
            success: () => {
              console.log('文件信息保存成功');
              if (callback) callback();
            },
            fail: (err) => {
              console.error('文件信息保存失败:', err);
              if (callback) callback();
            }
          });
        },
        fail: (err) => {
          console.error('查询文件信息失败:', err);
          if (callback) callback();
        }
      });
    }
  },

  // ========== 修改：查看文件 ==========
  viewFiles: function(e) {
    var that = this;
    var recordId = e.currentTarget.dataset.id;
    var app = getApp();
    
    if (app.globalData.shujuku == 0) {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "select wenjian, t_name from teacherinfo where id = " + recordId
        },
        success: res => {
          if (res.result.length > 0) {
            var record = res.result[0];
            var files = record.wenjian || '';
            var fileList = files ? (files.includes(',') ? files.split(',').map(f => f.trim()) : [files]) : [];
            
            that.setData({
              showFileViewModal: true,
              currentFileList: fileList,
              currentFileName: record.t_name || '',
              currentRecordId: recordId
            });
          }
        }
      });
    } else if (app.globalData.shujuku == 1) {
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select wenjian, t_name from xueshengguanlixitong_excel.dbo.teacherinfo where id = " + recordId
        },
        success: res => {
          if (res.result.recordset.length > 0) {
            var record = res.result.recordset[0];
            var files = record.wenjian || '';
            var fileList = files ? (files.includes(',') ? files.split(',').map(f => f.trim()) : [files]) : [];
            
            that.setData({
              showFileViewModal: true,
              currentFileList: fileList,
              currentFileName: record.t_name || '',
              currentRecordId: recordId
            });
          }
        }
      });
    }
  },

  // ========== 修改：删除文件（带动态路径） ==========
  deleteFile: function(e) {
    var that = this;
    var fileUrl = e.currentTarget.dataset.url;
    var recordId = e.currentTarget.dataset.id;
    var companyName = that.data.userInfo?.Company || app.globalData?.gongsi;
    
    // 从URL中提取文件名
    var fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1).split('.')[0];
    
    if (!companyName) {
      wx.showToast({
        title: '公司名称不存在',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个文件吗？删除后空间将被释放。',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
            mask: true
          });
          
          // 构建动态路径
          const dynamicPath = "/jiaowu/" + companyName + "/";
          
          wx.request({
            url: 'https://yhocn.cn:9097/file/delete',
            method: 'POST',
            data: {
              order_number: fileName,
              path: dynamicPath
            },
            success: function(res) {
              if (res.data.code === 200 || res.data.success) {
                that.removeFileFromDatabase(fileUrl, recordId);
              } else {
                wx.hideLoading();
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                });
              }
            },
            fail: function(err) {
              wx.hideLoading();
              console.error('删除文件失败:', err);
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              });
            }
          });
        }
      }
    });
  },

  // 从数据库移除文件记录
  removeFileFromDatabase: function(fileUrl, recordId) {
    var that = this;
    var app = getApp();
    
    if (app.globalData.shujuku == 0) {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: { sql: "select wenjian from teacherinfo where id = " + recordId },
        success: res => {
          var currentFiles = res.result[0]?.wenjian || '';
          var fileArray = currentFiles.split(',');
          var newFileArray = fileArray.filter(file => file.trim() !== fileUrl.trim());
          var newFiles = newFileArray.join(',');
          
          wx.cloud.callFunction({
            name: 'sql_jiaowu',
            data: { sql: "update teacherinfo set wenjian = '" + newFiles + "' where id = " + recordId },
            success: () => {
              wx.hideLoading();
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
              // 刷新列表
              var e = [that.data.jsxm || ''];
              that.tableShow(e);
              // 刷新查看弹窗
              that.viewFiles({ currentTarget: { dataset: { id: recordId } } });
            },
            fail: (err) => {
              wx.hideLoading();
              console.error('数据库更新失败:', err);
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              });
            }
          });
        }
      });
    } else if (app.globalData.shujuku == 1) {
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: { query: "select wenjian from xueshengguanlixitong_excel.dbo.teacherinfo where id = " + recordId },
        success: res => {
          var currentFiles = res.result.recordset[0]?.wenjian || '';
          var fileArray = currentFiles.split(',');
          var newFileArray = fileArray.filter(file => file.trim() !== fileUrl.trim());
          var newFiles = newFileArray.join(',');
          
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: { query: "update xueshengguanlixitong_excel.dbo.teacherinfo set wenjian = '" + newFiles + "' where id = " + recordId },
            success: () => {
              wx.hideLoading();
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
              // 刷新列表
              var e = [that.data.jsxm || ''];
              that.tableShow(e);
              // 刷新查看弹窗
              that.viewFiles({ currentTarget: { dataset: { id: recordId } } });
            },
            fail: (err) => {
              wx.hideLoading();
              console.error('数据库更新失败:', err);
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              });
            }
          });
        }
      });
    }
  },

  // 预览文件
  previewFile: function(e) {
    var fileUrl = e.currentTarget.dataset.url;
    var fileExtension = fileUrl.split('.').pop().toLowerCase();
    var imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    
    if (imageExtensions.includes(fileExtension)) {
      wx.previewImage({ urls: [fileUrl], current: fileUrl });
    } else {
      wx.setClipboardData({
        data: fileUrl,
        success: () => wx.showToast({ title: '链接已复制', icon: 'success' })
      });
    }
  },

  // ========== 以下为原有代码，保持不变 ==========
  bindPickerChange4: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var xb = _this.data.xingbie_list[e.detail.value]
    console.log(xb)
    _this.setData({
      xb: xb,
    })
  },

  bindPickerChange5: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      zzzt: _this.data.state_list[e.detail.value]
    })
  },

  bindPickerChange6: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      jsxm: _this.data.t_name_list[e.detail.value]
    })
  },

  choiceDate: function (e) {
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  tableShow: function (e) {
    var _this = this
    let user = _this.data.userInfo.Company;

    if(app.globalData.shujuku==0){
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "select * from teacherinfo where company ='"+user+"' and t_name like '%" + e[0] + "%'"
        },
        success: res => {
          var list = res.result
          _this.setData({
            list: list
          })
          console.log(list)
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })
    }else if(app.globalData.shujuku == 1){
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from xueshengguanlixitong_excel.dbo.teacherinfo where company ='" + user + "' and t_name like '%" + e[0] + "%'"
        },
        success: res => {
          var list = res.result.recordset
          _this.setData({
            list: list
          })
          console.log(list)
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo
    })

    if(app.globalData.shujuku==0){
      wx.cloud.callFunction({
        name: 'sql_jiaowu', 
        data: {
          sql: "select teacher from shezhi where Company = '" + userInfo.Company + "'"
        },
        success: res => {
          var list = res.result
          console.log(list[0].teacher)
          var teacker = [] 
          for(var i=0; i<list.length; i++){
            if(list[i].teacher != '' && list[i].teacher != null && list[i].teacher != undefined){
              teacker.push(list[i].teacher)
              console.log(list[i].teacher)
            }
          }
          _this.setData({
            t_name_list:teacker,
          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })

      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "select * from power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='教师信息'"
        },
        success: res => {
          console.log(res.result)
          var list = res.result
          var zeng = 0
          var shan = 0
          var gai = 0
          var cha = 0
          if(list.length > 0){
            zeng = list[0].add
            shan = list[0].del
            gai = list[0].upd
            cha = list[0].sel
          }
          _this.setData({
            quanxian_zeng:zeng,
            quanxian_shan:shan,
            quanxian_gai:gai,
            quanxian_cha:cha,
          })
          if(cha == '√'){
            var e = ['']
            _this.tableShow(e)
          }else{
            wx.showToast({
              title: '无查询权限！',
              icon: 'none',
              duration: 3000
            })
          }
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })
    }else if(app.globalData.shujuku == 1){
      wx.cloud.callFunction({
        name: 'sqlServer_117', 
        data: {
          query: "select teacher from xueshengguanlixitong_excel.dbo.shezhi where Company = '" + userInfo.Company + "'"
        },
        success: res => {
          var list = res.result.recordset
          console.log(list[0].teacher)
          var teacker = [] 
          for(var i=0; i<list.length; i++){
            if(list[i].teacher != '' && list[i].teacher != null && list[i].teacher != undefined){
              teacker.push(list[i].teacher)
              console.log(list[i].teacher)
            }
          }
          _this.setData({
            t_name_list:teacker,
          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })
      
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from xueshengguanlixitong_excel.dbo.power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='教师信息'"
        },
        success: res => {
          console.log(res.result.recordset)
          var list = res.result.recordset
          var zeng = 0
          var shan = 0
          var gai = 0
          var cha = 0
          if(list.length > 0){
            zeng = list[0].add
            shan = list[0].del
            gai = list[0].upd
            cha = list[0].sel
          }
          _this.setData({
            quanxian_zeng:zeng,
            quanxian_shan:shan,
            quanxian_gai:gai,
            quanxian_cha:cha,
          })
          if(cha == '√'){
            var e = ['']
            _this.tableShow(e)
          }else{
            wx.showToast({
              title: '无查询权限！',
              icon: 'none',
              duration: 3000
            })
          }
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })
    }
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  onInput2: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    var riqi = Y + M + D
    console.log(riqi)
    _this.setData({
      rq: riqi,
    })
    _this.qxShow2()
    console.log(_this.data.rq)
  },
  qxShow2: function () {
    var _this = this
    _this.setData({
      rqxzShow1: false,
    })
  },

  selRIQI1: function () {
    var _this = this
    _this.setData({
      rqxzShow1: true,
    })
  },

  inquire: function () {
    var _this = this
    if(_this.data.quanxian_zeng != '√'){
      wx.showToast({
        title: '无新增权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      tjShow: true,
      jsxm: "",
      xb: "",
      sfzhm: "",
      mz: "",
      sr: "",
      zw: "",
      xl: "",
      lxdh: "",
      rzrq: "",
      zzzt: "",
      sbqk: "",
      dz: "",
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime(),
      jsxm: "",
      xb: "",
      sfzhm: "",
      mz: "",
      sr: "",
      zw: "",
      xl: "",
      lxdh: "",
      rzrq: "",
      zzzt: "",
      sbqk: "",
      dz: "",
    })
  },

  add1: function () {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log(_this.data.jsxm)
    console.log(_this.data.xb)
    console.log(_this.data.sfzhm)
    console.log(_this.data.mz)
    console.log(_this.data.sr)
    console.log(_this.data.zw)
    console.log(_this.data.xl)
    console.log(_this.data.lxdh)
    console.log(_this.data.rzrq)
    console.log(_this.data.zzzt)
    console.log(_this.data.sbqk)
    console.log(_this.data.dz)
    if (_this.data.jsxm != "") {

      if(app.globalData.shujuku==0){
        wx.cloud.callFunction({
          name: 'sql_jiaowu',
          data: {
            sql: "insert into teacherinfo(t_name,sex,id_code,minzu,birthday,post,education,phone,rz_riqi,state,shebao,address,company) values('" + _this.data.jsxm + "','" + _this.data.xb + "','" + _this.data.sfzhm + "','" + _this.data.mz + "','" + _this.data.sr + "','" + _this.data.zw + "','" + _this.data.xl + "','" + _this.data.lxdh + "','" + _this.data.rzrq + "','" + _this.data.zzzt + "','" + _this.data.sbqk + "','" + _this.data.dz +  "','"+user+"')"
          },
          success: res => {
            _this.setData({
              jsxm: "",
              xb: "",
              sfzhm: "",
              mz: "",
              sr: "",
              zw: "",
              xl: "",
              lxdh: "",
              rzrq: "",
              zzzt: "",
              sbqk: "",
              dz: "",
            })
            _this.qxShow()
            var e = ['']
            _this.tableShow(e)
            wx.showToast({
              title: '添加成功！',
              icon: 'none'
            })
          },
          err: res => {
            console.log("错误!")
          },
          fail: res => {
            wx.showToast({
              title: '请求失败！',
              icon: 'none'
            })
            console.log("请求失败！")
          }
        })
      }else if(app.globalData.shujuku == 1){
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: "insert into xueshengguanlixitong_excel.dbo.teacherinfo(t_name,sex,id_code,minzu,birthday,post,education,phone,rz_riqi,state,shebao,address,company) values('" + _this.data.jsxm + "','" + _this.data.xb + "','" + _this.data.sfzhm + "','" + _this.data.mz + "','" + _this.data.sr + "','" + _this.data.zw + "','" + _this.data.xl + "','" + _this.data.lxdh + "','" + _this.data.rzrq + "','" + _this.data.zzzt + "','" + _this.data.sbqk + "','" + _this.data.dz + "','" + user + "')"
          },
          success: res => {
            _this.setData({
              jsxm: "",
              xb: "",
              sfzhm: "",
              mz: "",
              sr: "",
              zw: "",
              xl: "",
              lxdh: "",
              rzrq: "",
              zzzt: "",
              sbqk: "",
              dz: "",
            })
            _this.qxShow()
            var e = ['']
            _this.tableShow(e)
            wx.showToast({
              title: '添加成功！',
              icon: 'none'
            })
          },
          err: res => {
            console.log("错误!")
          },
          fail: res => {
            wx.showToast({
              title: '请求失败！',
              icon: 'none'
            })
            console.log("请求失败！")
          }
        })
      }
    } else {
      wx.showToast({
        title: '信息输入不全！',
        icon: 'none'
      })
    }
  },

  clickView: function(e){
    var _this = this
    if(_this.data.quanxian_gai != '√'){
      wx.showToast({
        title: '无修改权限！',
        icon: 'none'
      })
      return;
    }
    
    var item = _this.data.list[e.currentTarget.dataset.index];
    
    // 格式化日期字段
    var birthday = item.birthday ? _this.formatDate(item.birthday) : '';
    var rz_riqi = item.rz_riqi ? _this.formatDate(item.rz_riqi) : '';
    
    _this.setData({
      jsxm: item.t_name, 
      xb: item.sex,
      sfzhm: item.id_code,
      mz: item.minzu,
      sr: birthday,
      zw: item.post,
      xl: item.education, 
      lxdh: item.phone,
      rzrq: rz_riqi,
      zzzt: item.state,
      sbqk: item.shebao,
      dz: item.address,
      id: item.id,
      xgShow: true,
    })
  },
  
  // 添加日期格式化函数
  formatDate: function(dateString) {
    if (!dateString) return '';
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
  },

  upd1:function(){
    var _this = this
    let user = _this.data.userInfo.Company;
    if (_this.data.t_name != "" ) {
      if(app.globalData.shujuku==0){
        wx.cloud.callFunction({
          name: 'sql_jiaowu',
          data: {
            sql: "update teacherinfo set t_name='" + _this.data.jsxm + "',sex='" + _this.data.xb + "',id_code='" + _this.data.sfzhm + "',minzu='" + _this.data.mz + "',birthday='" + _this.data.sr + "',post='" + _this.data.zw + "',education='" + _this.data.xl + "',phone='" + _this.data.lxdh + "',rz_riqi='" + _this.data.rzrq + "',state='" + _this.data.zzzt + "',shebao='" + _this.data.sbqk + "',address='" + _this.data.dz + "' where id='" + _this.data.id +"'"
          },
          success: res => {
            _this.setData({
              jsxm: "",
              xb: "",
              sfzhm: "",
              mz: "",
              sr: "",
              zw: "",
              xl: "",
              lxdh: "",
              rzrq: "",
              zzzt: "",
              sbqk: "",
              dz: "",
            })
            _this.qxShow()
            var e = ['']
            _this.tableShow(e)
            wx.showToast({
              title: '修改成功！',
              icon: 'none'
            })
          },
          err: res => {
            console.log("错误!")
          },
          fail: res => {
            wx.showToast({
              title: '请求失败！',
              icon: 'none'
            })
            console.log("请求失败！")
          }
        })
      }else if(app.globalData.shujuku == 1){
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: "update xueshengguanlixitong_excel.dbo.teacherinfo set t_name='" + _this.data.jsxm + "',sex='" + _this.data.xb + "',id_code='" + _this.data.sfzhm + "',minzu='" + _this.data.mz + "',birthday='" + _this.data.sr + "',post='" + _this.data.zw + "',education='" + _this.data.xl + "',phone='" + _this.data.lxdh + "',rz_riqi='" + _this.data.rzrq + "',state='" + _this.data.zzzt + "',shebao='" + _this.data.sbqk + "',address='" + _this.data.dz + "' where id=" + _this.data.id
          },
          success: res => {
            _this.setData({
              jsxm: "",
              xb: "",
              sfzhm: "",
              mz: "",
              sr: "",
              zw: "",
              xl: "",
              lxdh: "",
              rzrq: "",
              zzzt: "",
              sbqk: "",
              dz: "",
            })
            _this.qxShow()
            var e = ['']
            _this.tableShow(e)
            wx.showToast({
              title: '修改成功！',
              icon: 'none'
            })
          },
          err: res => {
            console.log("错误!")
          },
          fail: res => {
            wx.showToast({
              title: '请求失败！',
              icon: 'none'
            })
            console.log("请求失败！")
          }
        })
      }
    } else {
      wx.showToast({
        title: '信息输入不全！',
        icon: 'none'
      })
    }
  },

  del1:function(){
    var _this = this
    if(_this.data.quanxian_shan != '√'){
      wx.showToast({
        title: '无删除权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(app.globalData.shujuku==0){
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "delete from teacherinfo where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            jsxm: "",
            xb: "",
            sfzhm: "",
            mz: "",
            sr: "",
            zw: "",
            xl: "",
            lxdh: "",
            rzrq: "",
            zzzt: "",
            sbqk: "",
            dz: "",
          })
          _this.qxShow()
          var e = ['']
          _this.tableShow(e)
          wx.showToast({
            title: '删除成功！',
            icon: 'none'
          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
    }else if(app.globalData.shujuku == 1){
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "delete from xueshengguanlixitong_excel.dbo.teacherinfo where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            jsxm: "",
            xb: "",
            sfzhm: "",
            mz: "",
            sr: "",
            zw: "",
            xl: "",
            lxdh: "",
            rzrq: "",
            zzzt: "",
            sbqk: "",
            dz: "",
          })
          _this.qxShow()
          var e = ['']
          _this.tableShow(e)
          wx.showToast({
            title: '删除成功！',
            icon: 'none'
          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
    }
  },

  entering:function(){
    var _this=this
    if(_this.data.quanxian_cha != '√'){
      wx.showToast({
        title: '无查询权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      cxShow:true,
      jsxm:"",
    })
  },

  sel1:function(){
    var _this = this
    if(_this.data.riqi1==''){
      _this.setData({
        riqi1:'1900-01-01'
      })
    }
    if(_this.data.riqi2==''){
      _this.setData({
        riqi2:'2100-12-31'
      })
    }
    var e = [_this.data.jsxm]
    _this.tableShow(e)
    _this.qxShow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})