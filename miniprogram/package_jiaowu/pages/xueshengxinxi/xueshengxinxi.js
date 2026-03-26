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
      text: "学生姓名",
      width: "200rpx",
      columnName: "RealName",
      type: "text",
      isupd: true
    },
    {
      text: "性别",
      width: "200rpx",
      columnName: "Sex",
      type: "text",
      isupd: true
    },
    {
      text: "报名日期",
      width: "200rpx",
      columnName: "rgdate",
      type: "text",
      isupd: true
    },
    {
      text: "培训课程",
      width: "200rpx",
      columnName: "Course",
      type: "text",
      isupd: true
    },
    {
      text: "责任教师",
      width: "200rpx",
      columnName: "Teacher",
      type: "text",
      isupd: true
    },
    {
      text: "班级",
      width: "200rpx",
      columnName: "Classnum",
      type: "text",
      isupd: true
    },
    {
      text: "电话",
      width: "200rpx",
      columnName: "phone",
      type: "text",
      isupd: true
    },
    {
      text: "学费",
      width: "200rpx",
      columnName: "Fee",
      type: "text",
      isupd: true
    },
    {
      text: "已缴费",
      width: "200rpx",
      columnName: "mall",
      type: "text",
      isupd: true
    },
    {
      text: "未交费",
      width: "200rpx",
      columnName: "Nocost",
      type: "text",
      isupd: true
    },
    {
      text: "已上课时",
      width: "200rpx",
      columnName: "nall",
      type: "text",
      isupd: true
    },
    {
      text: "剩余课时",
      width: "200rpx",
      columnName: "Nohour",
      type: "text",
      isupd: true
    },
    {
      text: "总课时",
      width: "200rpx",
      columnName: "Allhour",
      type: "text",
      isupd: true
    },
    {
      text: "状态",
      width: "200rpx",
      columnName: "Type",
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
    currentRecordName: '',       // 当前记录的学生姓名
    fileName: '',                // 用户输入的文件名
    uploading: false,            // 上传中状态
    uploadProgress: 0,           // 上传进度
    currentFileList: [],         // 当前查看的文件列表
    currentFileName: '',         // 当前查看的文件名
    xingbie_list:['男','女'],
    xsxm: "",
    xb: "",
    bmrq: "",
    pxkc: "",
    zrjs: "",
    bj:"",
    dh:"",    
    xf:"",
    zks:"",
    zt:"",
    ckpx:"",
    riqi1:'',
    riqi2:'',
    
    // 新增代码
    quanxian_zeng:0,
    quanxian_shan:0,
    quanxian_gai:0,
    quanxian_cha:0,
    minDate: new Date(1900, 1, 1).getTime(),
    maxDate: new Date(2100, 12, 31).getTime(),
    currentDate: new Date().getTime(),
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
        title: `文件超过${maxSizeMB}MB限制：\n${oversizedFiles.join('\n')}`,
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
      const confirmMsg = `确定上传 ${that.data.selectedFiles.length} 个文件吗？\n文件总大小：${totalSizeMB.toFixed(2)}MB\n当前空间使用率：${spaceInfo.usagePercent.toFixed(2)}%\n预计上传后使用率：${spaceInfo.estimatedPercent.toFixed(2)}%`;
      
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
          ? `文件_${safeRecordName}.${fileExtension}` 
          : `文件_${safeRecordName}_${index + 1}.${fileExtension}`;
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
          var e = [that.data.xsxm || '', that.data.zrjs || '', that.data.ckpx || '', that.data.riqi1 || '1900-01-01', that.data.riqi2 || '2100-12-31'];
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

  // 保存文件信息到数据库（保持不变）
  saveFilesToDatabase: function(files, callback) {
    var that = this;
    var app = getApp();
    var companyName = that.data.userInfo?.Company || app.globalData?.gongsi;
    
    if (app.globalData.shujuku == 0) {
      // MySQL版本
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "select wenjian from student where ID = " + that.data.currentRecordId
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
              sql: "update student set wenjian = '" + fileUrlsString + "' where ID = " + that.data.currentRecordId
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
          query: "select wenjian from xueshengguanlixitong_excel.dbo.student where ID = " + that.data.currentRecordId
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
              query: "update xueshengguanlixitong_excel.dbo.student set wenjian = '" + fileUrlsString + "' where ID = " + that.data.currentRecordId
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

  // 从数据库移除文件记录（保持不变）
  removeFileFromDatabase: function(fileUrl, recordId) {
    var that = this;
    var app = getApp();
    
    if (app.globalData.shujuku == 0) {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: { sql: "select wenjian from student where ID = " + recordId },
        success: res => {
          var currentFiles = res.result[0]?.wenjian || '';
          var fileArray = currentFiles.split(',');
          var newFileArray = fileArray.filter(file => file.trim() !== fileUrl.trim());
          var newFiles = newFileArray.join(',');
          
          wx.cloud.callFunction({
            name: 'sql_jiaowu',
            data: { sql: "update student set wenjian = '" + newFiles + "' where ID = " + recordId },
            success: () => {
              wx.hideLoading();
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
              // 刷新列表
              var e = [that.data.xsxm || '', that.data.zrjs || '', that.data.ckpx || '', that.data.riqi1 || '1900-01-01', that.data.riqi2 || '2100-12-31'];
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
        data: { query: "select wenjian from xueshengguanlixitong_excel.dbo.student where ID = " + recordId },
        success: res => {
          var currentFiles = res.result.recordset[0]?.wenjian || '';
          var fileArray = currentFiles.split(',');
          var newFileArray = fileArray.filter(file => file.trim() !== fileUrl.trim());
          var newFiles = newFileArray.join(',');
          
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: { query: "update xueshengguanlixitong_excel.dbo.student set wenjian = '" + newFiles + "' where ID = " + recordId },
            success: () => {
              wx.hideLoading();
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
              // 刷新列表
              var e = [that.data.xsxm || '', that.data.zrjs || '', that.data.ckpx || '', that.data.riqi1 || '1900-01-01', that.data.riqi2 || '2100-12-31'];
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

  // 预览文件（保持不变）
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
  choiceDate: function (e) {
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  tableShow: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    let company = _this.data.userInfo.Company;

    if(app.globalData.shujuku==0){

      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "select ID,RealName,Sex,rgdate,Course,Teacher,Classnum,phone,Fee," +
             "(select SUM(case when Company ='" + company + "' and realname=student.realname then paid+money else 0 end) from payment ) mall ," +
             "ifnull(ifnull(Fee,0) -ifnull((select SUM(case when Company ='" + company + "' and realname=student.realname then paid+money else 0 end) from payment ),0),0) as Nocost," +
             "(select SUM(case when Company='" + company + "' and student_name=student.realname and course=student.Course then keshi else 0 end ) from keshi_detail ) nall," +
             "ifnull(Allhour,0) - ifnull((select SUM(case when Company='" + company + "' and student_name=student.realname and course=student.Course then keshi else 0 end ) from keshi_detail ),0) as Nohour," +
             "Allhour,Type,wenjian " +
             "FROM student " +
             "WHERE student.Company = '" + company + "' " +  
             "AND RealName LIKE '%" + e[0] + "%' " +
             "AND Teacher LIKE '%" + e[1] + "%' " +
             "AND Course LIKE '%" + e[2] + "%' " +
             "AND rgdate >= '" + e[3] + "' " +
             "AND rgdate <= '" + e[4] + "'"
      },
        success: res => {
          console.log(res.result)
          var list = res.result
          for(var i=0; i<list.length; i++){
            list[i].rgdate = list[i].rgdate.split("T")[0]
          }
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
      var sql = `
      SELECT 
          s.ID,
          s.RealName,
          s.Sex,
          s.rgdate,
          s.Course,
          s.Teacher,
          s.Classnum,
          s.phone,
          s.Fee,
          ISNULL(p.total_paid, 0) as mall,
          ISNULL(s.Fee, 0) - ISNULL(p.total_paid, 0) as Nocost,
          ISNULL(k.used_keshi, 0) as nall,
          ISNULL(s.Allhour, 0) - ISNULL(k.used_keshi, 0) as Nohour,
          s.Allhour,
          s.Type,
          s.wenjian
      FROM xueshengguanlixitong_excel.dbo.student s
      LEFT JOIN (
          SELECT 
              realname,
              SUM(CASE WHEN Company = '${company}' THEN paid + money ELSE 0 END) as total_paid
          FROM xueshengguanlixitong_excel.dbo.payment 
          GROUP BY realname
      ) p ON s.RealName = p.realname
      LEFT JOIN (
          SELECT 
              student_name,
              course,
              SUM(CASE WHEN Company = '${company}' THEN keshi ELSE 0 END) as used_keshi
          FROM xueshengguanlixitong_excel.dbo.keshi_detail 
          GROUP BY student_name, course
      ) k ON s.RealName = k.student_name AND s.Course = k.course
      WHERE s.Company = '${company}' 
          AND s.RealName LIKE '%${e[0]}%' 
          AND s.Teacher LIKE '%${e[1]}%' 
          AND s.Course LIKE '%${e[2]}%' 
          AND s.rgdate >= '${e[3]}' 
          AND s.rgdate <= '${e[4]}'
      `;

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: sql
        },
        success: res => {
          console.log(res.result.recordset)
          var list = res.result.recordset
          for(var i=0; i<list.length; i++){
            list[i].rgdate = list[i].rgdate.split("T")[0]
          }
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

  // 查看文件（保持不变）
  viewFiles: function(e) {
    var that = this;
    var recordId = e.currentTarget.dataset.id;
    var app = getApp();
    
    if (app.globalData.shujuku == 0) {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "select wenjian, RealName from student where ID = " + recordId
        },
        success: res => {
          if (res.result.length > 0) {
            var record = res.result[0];
            var files = record.wenjian || '';
            var fileList = files ? (files.includes(',') ? files.split(',').map(f => f.trim()) : [files]) : [];
            
            that.setData({
              showFileViewModal: true,
              currentFileList: fileList,
              currentFileName: record.RealName || '',
              currentRecordId: recordId
            });
          }
        }
      });
    } else if (app.globalData.shujuku == 1) {
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select wenjian, RealName from xueshengguanlixitong_excel.dbo.student where ID = " + recordId
        },
        success: res => {
          if (res.result.recordset.length > 0) {
            var record = res.result.recordset[0];
            var files = record.wenjian || '';
            var fileList = files ? (files.includes(',') ? files.split(',').map(f => f.trim()) : [files]) : [];
            
            that.setData({
              showFileViewModal: true,
              currentFileList: fileList,
              currentFileName: record.RealName || '',
              currentRecordId: recordId
            });
          }
        }
      });
    }
  },

  getExcel : function(){ 
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = [{
      text: "学生姓名",
      width: "200rpx",
      columnName: "RealName",
      type: "text",
      isupd: true
    },
    {
      text: "性别",
      width: "200rpx",
      columnName: "Sex",
      type: "text",
      isupd: true
    },
    {
      text: "报名日期",
      width: "200rpx",
      columnName: "rgdate",
      type: "text",
      isupd: true
    },
    {
      text: "培训课程",
      width: "200rpx",
      columnName: "Course",
      type: "text",
      isupd: true
    },
    {
      text: "责任教师",
      width: "200rpx",
      columnName: "Teacher",
      type: "text",
      isupd: true
    },
    {
      text: "班级",
      width: "200rpx",
      columnName: "Classnum",
      type: "text",
      isupd: true
    },
    {
      text: "电话",
      width: "200rpx",
      columnName: "phone",
      type: "text",
      isupd: true
    },
    {
      text: "学费",
      width: "200rpx",
      columnName: "Fee",
      type: "number",
      isupd: true
    },
    {
      text: "已缴费",
      width: "200rpx",
      columnName: "mall",
      type: "text",
      isupd: true
    },
    {
      text: "未交费",
      width: "200rpx",
      columnName: "Nocost",
      type: "text",
      isupd: true
    },
    {
      text: "已上课时",
      width: "200rpx",
      columnName: "nall",
      type: "text",
      isupd: true
    },
    {
      text: "剩余课时",
      width: "200rpx",
      columnName: "Nohour",
      type: "text",
      isupd: true
    },
    {
      text: "总课时",
      width: "200rpx",
      columnName: "Allhour",
      type: "number",
      isupd: true
    },
    {
      text: "状态",
      width: "200rpx",
      columnName: "Type",
      type: "text",
      isupd: true
    },
  
    ]
    var cloudList = {
      name : '学生信息',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:parseInt(title[i].width.split("r")[0])/10,
        columnName:title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu : 'true',
              fileType : 'xlsx',
              success : res=> {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail : res=> {
        console.log(res)
      }
    })
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
          sql: "select * from power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='学生信息'"
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
            var e = ['','', '','1900-01-01','2100-12-31']
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

      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "select * from shezhi where Company = '" + userInfo.Company + "'"
        },
        success: res => {
          console.log(res.result)
          var list = res.result
          var kecheng = []
          var jiaoshi = []
          var zhuangtai = []
          for(var i=0; i<list.length; i++){
            if(list[i].course != '' && list[i].course != null && list[i].course != undefined){
              kecheng.push(list[i].course)
            }
            if(list[i].teacher != '' && list[i].teacher != null && list[i].teacher != undefined){
              jiaoshi.push(list[i].teacher)
            }
            if(list[i].type != '' && list[i].type != null && list[i].type != undefined){
              zhuangtai.push(list[i].type)
            }
          }
          _this.setData({
            kecheng_list: kecheng,
            jiaoshi_list : jiaoshi,
            zhuangtai_list : zhuangtai
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

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from xueshengguanlixitong_excel.dbo.power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='学生信息'"
        },
        success: res => {
          console.log("✅ 完整返回结果:", res);
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
            var e = ['','', '','1900-01-01','2100-12-31']
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


      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from xueshengguanlixitong_excel.dbo.shezhi where Company = '" + userInfo.Company + "'"
        },
        success: res => {
          console.log("✅ 完整返回结果:", res);
          console.log(res.result.recordset)
          var list = res.result.recordset
          var kecheng = []
          var jiaoshi = []
          var zhuangtai = []
          for(var i=0; i<list.length; i++){
            if(list[i].course != '' && list[i].course != null && list[i].course != undefined){
              kecheng.push(list[i].course)
            }
            if(list[i].teacher != '' && list[i].teacher != null && list[i].teacher != undefined){
              jiaoshi.push(list[i].teacher)
            }
            if(list[i].type != '' && list[i].type != null && list[i].type != undefined){
              zhuangtai.push(list[i].type)
            }
          }
          _this.setData({
            kecheng_list: kecheng,
            jiaoshi_list : jiaoshi,
            zhuangtai_list : zhuangtai
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
      
    }
  },

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var pxkc = _this.data.kecheng_list[e.detail.value]
    console.log(pxkc)
    _this.setData({
      pxkc: pxkc,
    })
  },

  bindPickerChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var zrjs = _this.data.jiaoshi_list[e.detail.value]
    console.log(zrjs)
    _this.setData({
      zrjs: zrjs,
    })
  },

  bindPickerChange3: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var zt = _this.data.zhuangtai_list[e.detail.value]
    console.log(zt)
    _this.setData({
      zt: zt,
    })
  },

  bindPickerChange4: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var xb = _this.data.xingbie_list[e.detail.value]
    console.log(xb)
    _this.setData({
      xb: xb,
    })
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
      xsxm: "",
      xb: "",
      bmrq: "",
      pxkc: "",
      zrjs: "",
      bj:"",
      dh:"",    
      xf:"",
      yjf:"",
      wjf:"",
      ysks:"",
      syks:"",
      zks:"",
      zt:"",
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime(),
      xsxm: "",
      xb: "",
      bmrq: "",
      pxkc: "",
      zrjs: "",
      bj:"",
      dh:"",    
      xf:"",
      yjf:"",
      wjf:"",
      ysks:"",
      syks:"",
      zks:"",
      zt:"",
    })
  },

  add1: function () {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log(_this.data.xsxm)
    console.log(_this.data.xb)
    console.log(_this.data.bmrq)
    console.log(_this.data.pxkc)
    console.log(_this.data.zrjs)
    console.log(_this.data.bj)
    console.log(_this.data.dh)
    console.log(_this.data.xf)
    console.log(_this.data.yjf)
    console.log(_this.data.wjf)
    console.log(_this.data.ysks)
    console.log(_this.data.syks)
    console.log(_this.data.zks)
    console.log(_this.data.zt)
    if (_this.data.xsxm != "" && _this.data.zrjs != "" && _this.data.pxkc != "" && _this.data.bmrq != "") {


      if(app.globalData.shujuku==0){
        wx.cloud.callFunction({
          name: 'sql_jiaowu',
          data: {
            sql: "insert into student(RealName,Sex,rgdate,Course,Teacher,Classnum,phone,Fee,Allhour,Type,Company)values('" + _this.data.xsxm + "','" + _this.data.xb + "','" + _this.data.bmrq + "','" + _this.data.pxkc + "','" + _this.data.zrjs + "','" + _this.data.bj + "','" + _this.data.dh + "','" + _this.data.xf + "','" + _this.data.zks + "','" + _this.data.zt + "','"+user+"')"
          },
          success: res => {
            _this.setData({
              xsxm: "",
              xb: "",
              bmrq: "",
              pxkc: "",
              zrjs: "",
              bj:"",
              dh:"",    
              xf:"",
              yjf:"",
              wjf:"",
              ysks:"",
              syks:"",
              zks:"",
              zt:"",
            })
            _this.qxShow()
            var e = ['','', '','1900-01-01','2100-12-31']
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
            query: "insert into xueshengguanlixitong_excel.dbo.student(RealName,Sex,rgdate,Course,Teacher,Classnum,phone,Fee,Allhour,Type,Company) values('" + _this.data.xsxm + "','" + _this.data.xb + "','" + _this.data.bmrq + "','" + _this.data.pxkc + "','" + _this.data.zrjs + "','" + _this.data.bj + "','" + _this.data.dh + "','" + _this.data.xf + "','" + _this.data.zks + "','" + _this.data.zt + "','" + user + "')"
          },
          success: res => {
            _this.setData({
              xsxm: "",
              xb: "",
              bmrq: "",
              pxkc: "",
              zrjs: "",
              bj:"",
              dh:"",    
              xf:"",
              yjf:"",
              wjf:"",
              ysks:"",
              syks:"",
              zks:"",
              zt:"",
            })
            _this.qxShow()
            var e = ['','', '','1900-01-01','2100-12-31']
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

  clickView:function(e){
    var _this = this
    if(_this.data.quanxian_gai != '√'){
      wx.showToast({
        title: '无修改权限！',
        icon: 'none'
      })
      return;
    }
    console.log(_this.data.list[e.currentTarget.dataset.index].ID)
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].ID,
      xsxm: _this.data.list[e.currentTarget.dataset.index].RealName, 
      xb: _this.data.list[e.currentTarget.dataset.index].Sex, 
      bmrq: _this.data.list[e.currentTarget.dataset.index].rgdate, 
      pxkc: _this.data.list[e.currentTarget.dataset.index].Course, 
      zrjs: _this.data.list[e.currentTarget.dataset.index].Teacher, 
      bj:_this.data.list[e.currentTarget.dataset.index].Classnum, 
      dh:_this.data.list[e.currentTarget.dataset.index].phone, 
      xf:_this.data.list[e.currentTarget.dataset.index].Fee, 
      yjf:_this.data.list[e.currentTarget.dataset.index].mall, 
      wjf:_this.data.list[e.currentTarget.dataset.index].Nocost, 
      ysks:_this.data.list[e.currentTarget.dataset.index].nall, 
      syks:_this.data.list[e.currentTarget.dataset.index].Nohour, 
      zks:_this.data.list[e.currentTarget.dataset.index].Allhour, 
      zt:_this.data.list[e.currentTarget.dataset.index].Type, 
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.xsxm != "" && _this.data.zrjs != "" && _this.data.pxkc != "" && _this.data.bmrq != "") {

      if(app.globalData.shujuku==0){

        wx.cloud.callFunction({
          name: 'sql_jiaowu',
          data: {
            sql: "update student set RealName='" + _this.data.xsxm + "',Sex='" + _this.data.xb + "',rgdate='" + _this.data.bmrq + "',Course='" + _this.data.pxkc + "',Teacher='" + _this.data.zrjs + "',Classnum='" + _this.data.bj + "',phone='" + _this.data.dh + "',Fee='" + _this.data.xf + "',Allhour='" + _this.data.zks + "',Type='" + _this.data.zt + "'  where ID='" + _this.data.id + "'"
          },
          success: res => {
            _this.setData({
              xsxm: "",
              xb: "",
              bmrq: "",
              pxkc: "",
              zrjs: "",
              bj:"",
              dh:"",    
              xf:"",
              yjf:"",
              wjf:"",
              ysks:"",
              syks:"",
              zks:"",
              zt:"",
            })
            _this.qxShow()
            var e = ['','', '','1900-01-01','2100-12-31']
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
            query: "update xueshengguanlixitong_excel.dbo.student set RealName='" + _this.data.xsxm + "',Sex='" + _this.data.xb + "',rgdate='" + _this.data.bmrq + "',Course='" + _this.data.pxkc + "',Teacher='" + _this.data.zrjs + "',Classnum='" + _this.data.bj + "',phone='" + _this.data.dh + "',Fee='" + _this.data.xf + "',Allhour='" + _this.data.zks + "',Type='" + _this.data.zt + "' where ID=" + _this.data.id
          },
          success: res => {
            _this.setData({
              xsxm: "",
              xb: "",
              bmrq: "",
              pxkc: "",
              zrjs: "",
              bj:"",
              dh:"",    
              xf:"",
              yjf:"",
              wjf:"",
              ysks:"",
              syks:"",
              zks:"",
              zt:"",
            })
            _this.qxShow()
            var e = ['','', '','1900-01-01','2100-12-31']
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
          sql: "delete from student where ID='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            xsxm: "",
            xb: "",
            bmrq: "",
            pxkc: "",
            zrjs: "",
            bj:"",
            dh:"",    
            xf:"",
            yjf:"",
            wjf:"",
            ysks:"",
            syks:"",
            zks:"",
            zt:"",
          })
          _this.qxShow()
          var e = ['','', '','1900-01-01','2100-12-31']
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
          query: "delete from xueshengguanlixitong_excel.dbo.student where ID='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            xsxm: "",
            xb: "",
            bmrq: "",
            pxkc: "",
            zrjs: "",
            bj:"",
            dh:"",    
            xf:"",
            yjf:"",
            wjf:"",
            ysks:"",
            syks:"",
            zks:"",
            zt:"",
          })
          _this.qxShow()
          var e = ['','', '','1900-01-01','2100-12-31']
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
      xsxm:"",
      zrjs:"",
      ckpx:"",
      riqi1:'',
      riqi2:'',
    })
  },
  sel1:function(){
    var _this = this
    var riqi1 = _this.data.riqi1
    var riqi2 = _this.data.riqi2
    if(riqi1 == ''){
      riqi1 = "1900-01-01"
    }
    if(riqi2 == ''){
      riqi2 = "2100-12-31"
    }

    if(_this.data.riqi1 > _this.data.riqi2){
      wx.showToast({
        title: '开始日期不能大于结束日期',
        icon:'none',
        duration: 2000//持续的时间
      })
      return;
    }

    var e = [_this.data.xsxm,_this.data.zrjs,_this.data.ckpx,riqi1,riqi2]
    _this.tableShow(e)
    _this.qxShow()
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