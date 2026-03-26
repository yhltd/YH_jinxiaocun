var wxCharts = require('../../../utils/wxcharts');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  tjShow: false,
  xgShow: false,
  cxShow: false,
  addWindow1: false,
  cdShow: true,
  handle: true,
  wlxgShow: false,
  wltjShow: false,
  delWindow1: false,
  showUploadModal: false,      // 上传弹窗显示状态
  showFileViewModal: false,    // 文件查看弹窗显示状态
  selectedFiles: [],           // 已选择的文件列表
  currentRecordId: 0,          // 当前操作的记录ID
  currentRecordName: '',       // 当前记录的名称
  fileName: '',                // 用户输入的文件名
  uploading: false,            // 上传中状态
  uploadProgress: 0,           // 上传进度
  currentFileList: [],         // 当前查看的文件列表
  data: {
    list: [],
    list2: [],
    title: [{
        text: "订单号",
        width: "200rpx",
        columnName: "order_id",
        type: "digit",
        isupd: true
      },
      {
        text: "产品编码",
        width: "200rpx",
        columnName: "code",
        type: "text",
        isupd: true
      },
      {
        text: "产品名称",
        width: "200rpx",
        columnName: "product_name",
        type: "text",
        isupd: true
      },
      {
        text: "规格",
        width: "200rpx",
        columnName: "norms",
        type: "text",
        isupd: true
      },
      {
        text: "下单日期",
        width: "200rpx",
        columnName: "set_date",
        type: "date",
        isupd: true
      },
      {
        text: "下单数量",
        width: "200rpx",
        columnName: "set_num",
        type: "text",
        isupd: true
      },
      {
        text: "文件",
        width: "200rpx",
        columnName: "wenjian",
        type: "file",
        isupd: false
      }
    ],
    title2: [{
        text: "物料编码",
        width: "200rpx",
        columnName: "code",
        type: "digit",
        isupd: false
      },
      {
        text: "物料名称",
        width: "200rpx",
        columnName: "name",
        type: "text",
        isupd: false
      },
      {
        text: "描述",
        width: "400rpx",
        columnName: "norms",
        type: "text",
        isupd: false
      },
      {
        text: "数量",
        width: "200rpx",
        columnName: "count",
        type: "digit",
        isupd: true
      }
    ],
    title3: [{
      text: "工序名称",
      width: "200rpx",
      columnName: "process_name",
      type: "text",
      isupd: false
    },
    {
      text: "效率/时",
      width: "200rpx",
      columnName: "efficiency",
      type: "digit",
      isupd: false
    },
    {
      text: "预估工时",
      width: "200rpx",
      columnName: "estimated_time",
      type: "digit",
      isupd: true
    }
  ],
  
  // 工序列表数据
  list3: [],
  
  // 其他新增字段
  code_id2: "",
  empty2: "",
  index2: "",
  addWindow2: false,
    product_name: "",
    order_id: "",
    ddh: "",
    cpbm: "",
    cpmc: "",
    gg: "",
    xdrq: "",
    xdsl: "",
    code_id: "",
    empty: "",
    index: "",
    cd: "",
    row_num: "",
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
      
      // 构建动态路径：/paichan/ + 公司名
      var path = "/paichan/" + companyName + "/";
      
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

  // ========== 修改：显示上传模态框 ==========
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
      wx.showToast({ title: '请先选择一条记录', icon: 'none' });
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
    const companyName = app.globalData?.gongsi || '';
    
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
      const confirmMsg = `确定为 "${that.data.currentRecordName}" 上传 ${that.data.selectedFiles.length} 个文件吗？\n文件总大小：${totalSizeMB.toFixed(2)}MB\n当前空间使用率：${spaceInfo.usagePercent.toFixed(2)}%\n预计上传后使用率：${spaceInfo.estimatedPercent.toFixed(2)}%`;
      
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
            const companyName = app.globalData?.gongsi || '';
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
    
    that.setData({ uploading: true, uploadProgress: 0 });
    
    var recordId = that.data.currentRecordId;
    var recordName = that.data.currentRecordName || '未知';
    var userFileName = that.data.fileName || '';
    
    // 构建动态路径：/paichan/ + 公司名 + /
    const dynamicPath = "/paichan/" + companyName + "/";
    
    function uploadNextFile(index) {
      if (index >= totalFiles) {
        that.handleUploadComplete(uploadedFiles);
        return;
      }
      
      var file = that.data.selectedFiles[index];
      var fileExtension = file.name.split('.').pop().toLowerCase();
      
      // 构建文件名
      var timestamp = new Date().getTime();
      var finalFileName = '';
      if (userFileName && userFileName.trim() !== '') {
        var baseName = userFileName.trim().replace(/[\\/:*?"<>|]/g, '_');
        finalFileName = totalFiles === 1 
          ? `${baseName}_${timestamp}.${fileExtension}` 
          : `${baseName}_${index + 1}_${timestamp}.${fileExtension}`;
      } else {
        var safeRecordName = recordName.replace(/[\\/:*?"<>|]/g, '_').substring(0, 10);
        finalFileName = totalFiles === 1 
          ? `${safeRecordName}_${timestamp}.${fileExtension}` 
          : `${safeRecordName}_${index + 1}_${timestamp}.${fileExtension}`;
      }
      
      that.setData({ uploadProgress: Math.round((index / totalFiles) * 100) });
      
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
          fileSize: file.size.toString()
        },
        header: { 'Content-Type': 'multipart/form-data' },
        timeout: 600000,
        success: function(uploadRes) {
          try {
            var resData = JSON.parse(uploadRes.data);
            if (resData.code === 200 || resData.success) {
              var fileUrl = "http://yhocn.cn:9088/paichan/" + companyName + "/" + finalFileName;
              uploadedFiles.push({
                name: finalFileName,
                url: fileUrl,
                originalName: file.name,
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
      that.saveFilesToDatabase(uploadedFiles);
    }
    
    setTimeout(() => {
      that.hideUploadModal();
      wx.showToast({
        title: `上传完成，成功 ${uploadedFiles.length} 个文件`,
        icon: 'success',
        duration: 3000
      });
      // 刷新列表
      var e = ['', '', ''];
      that.tableShow(e);
    }, 1000);
  },

  // 保存文件到数据库
  saveFilesToDatabase: function(files) {
    var that = this;
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select wenjian from order_info where id = " + that.data.currentRecordId
      },
      success: res => {
        var existingFiles = '';
        if (res.result.recordset && res.result.recordset.length > 0) {
          existingFiles = res.result.recordset[0]?.wenjian || '';
        }
        
        // 处理现有文件
        var existingArray = [];
        if (existingFiles) {
          if (existingFiles.includes(',')) {
            existingArray = existingFiles.split(',').map(f => f.trim()).filter(f => f);
          } else {
            existingArray = [existingFiles.trim()];
          }
        }
        
        // 新文件URL
        var newFileUrls = files.map(file => file.url);
        
        // 合并去重
        var allFileUrls = [...new Set([...existingArray, ...newFileUrls])];
        var fileUrlsString = allFileUrls.join(',');
        
        // 更新数据库
        wx.cloud.callFunction({
          name: 'sqlServer_PC',
          data: {
            query: "update order_info set wenjian = '" + fileUrlsString.replace(/'/g, "''") + "' where id = " + that.data.currentRecordId
          },
          success: () => {
            console.log('文件记录更新成功');
            var e = ['', '', ''];
            that.tableShow(e);
          },
          fail: err => {
            console.error('更新文件记录失败:', err);
            wx.showToast({
              title: '更新文件记录失败',
              icon: 'none'
            });
          }
        });
      },
      fail: err => {
        console.error('查询现有文件失败:', err);
      }
    });
  },

  // ========== 修改：查看文件 ==========
  viewFiles: function(e) {
    var that = this;
    var recordId = e.currentTarget.dataset.id;
    var recordName = e.currentTarget.dataset.name || '';
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select wenjian from order_info where id = " + recordId
      },
      success: res => {
        if (res.result.recordset && res.result.recordset.length > 0) {
          var record = res.result.recordset[0];
          var files = record.wenjian || '';
          // 处理文件列表
          var fileList = [];
          if (files) {
            if (files.includes(',')) {
              fileList = files.split(',').map(f => f.trim()).filter(f => f);
            } else {
              fileList = [files.trim()];
            }
          }
          
          that.setData({
            showFileViewModal: true,
            currentFileList: fileList,
            currentFileName: recordName,
            currentRecordId: recordId
          });
        }
      },
      fail: err => {
        console.error('查询文件失败:', err);
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        });
      }
    });
  },

  // ========== 修改：删除文件（带动态路径） ==========
  deleteFile: function(e) {
    var that = this;
    var fileUrl = e.currentTarget.dataset.url;
    var recordId = e.currentTarget.dataset.id;
    var companyName = app.globalData?.gongsi || '';
    
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
          const dynamicPath = "/paichan/" + companyName + "/";
          
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
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: { 
        query: "select wenjian from order_info where id = " + recordId 
      },
      success: res => {
        if (!res.result.recordset || res.result.recordset.length === 0) {
          wx.hideLoading();
          return;
        }
        
        var currentFiles = res.result.recordset[0]?.wenjian || '';
        var fileArray = [];
        if (currentFiles) {
          if (currentFiles.includes(',')) {
            fileArray = currentFiles.split(',').map(f => f.trim()).filter(f => f);
          } else {
            fileArray = [currentFiles.trim()];
          }
        }
        
        // 移除要删除的文件
        var newFileArray = fileArray.filter(file => file.trim() !== fileUrl.trim());
        var newFiles = newFileArray.join(',');
        
        wx.cloud.callFunction({
          name: 'sqlServer_PC',
          data: { 
            query: "update order_info set wenjian = '" + newFiles.replace(/'/g, "''") + "' where id = " + recordId 
          },
          success: () => {
            wx.hideLoading();
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            });
            var e = ['', '', ''];
            that.tableShow(e);
            
            // 重新加载文件列表
            that.viewFiles({ currentTarget: { dataset: { id: recordId, name: that.data.currentFileName } } });
          },
          fail: err => {
            wx.hideLoading();
            console.error('更新文件记录失败:', err);
            wx.showToast({
              title: '删除失败',
              icon: 'none'
            });
          }
        });
      }
    });
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

  // 隐藏上传模态框
  hideUploadModal: function() {
    this.setData({
      showUploadModal: false,
      uploading: false,
      uploadProgress: 0,
      selectedFiles: [],
      fileName: ''
    });
  },

  // 隐藏文件查看模态框
  hideFileViewModal: function() {
    this.setData({
      showFileViewModal: false,
      currentFileList: [],
      currentFileName: '',
      currentRecordId: 0
    });
  },

  // ========== 以下为原有代码，保持不变 ==========
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var e = ['', '', '']
    _this.panduanquanxian()
    _this.setData({
      handle: true,
    })
    //新增
    if (_this.data.isdischa == 1) {
      _this.tableShow(e)       
      var _this = this
      var e = ['', '', '']
      _this.tableShow(e)
    }
    // _this.panduanquanxian()
  },

  goto_yanshi: function(){
    wx.navigateTo({
      url: "../PC_mp4/PC_mp4?this_url=cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/pakageP_mp4/dingdan.mp4"
      }) 
  },

  get_line: function(){
    wx.navigateTo({
      url: "../PC_Line/PC_Line"
    })
  },
  
  //新增代码
  //判断权限
  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa: 1,
      isdisgai: 1,
      isdisshan: 1
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log("department_list1")
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "订单") {
        console.log("订单没有添加权限")
        console.log(department_list1[i])
        //添加没权限
        if (department_list1[i].add == "否") {
          _this.setData({
            isdis: 2
          });
          // console.log("否 isdis："+_this.data.isdis)
        } else {
          _this.setData({
            isdis: 1
          });
          // console.log("是 isdis："+_this.data.isdis)

        }
        //修改没权限
        if (department_list1[i].upd == "否") {
          _this.setData({
            isdisgai: 2
          });
        } else {
          _this.setData({
            isdisgai: 1
          });

        }
        //删除没权限
        if (department_list1[i].del == "否") {
          _this.setData({
            isdisshan: 2
          });
        } else {
          _this.setData({
            isdisshan: 1
          });

        }
        //查询没权限
        if (department_list1[i].sel == "否") {
          _this.setData({
            isdischa: 2
          });
        } else {
          _this.setData({
            isdischa: 1
          });

        }
        console.log(_this.data.isdis)

      }
    }
  },
  addMK: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select name,id from module_type where company = '" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        console.log(res)
        _this.setData({
          list: list
        })
        wx.hideLoading({

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
  },

  module_info_show: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select * from(select id,isnull((select name from module_type as t where module_info.type_id=t.id),'') as type_name,isnull(name,'') as name,isnull(cast(num as varchar),'') as num,isnull((select name from module_info as i where module_info.parent_id=i.id),'') as parent from module_info where company = '" + user + "') as p where not p.type_name  is null and p.type_name !='' and p.type_name like '%" + e + "%'"
      },
      success: res => {
        var list_module_info = res.result.recordset
        console.log(res)
        _this.setData({
          list_module_info: list_module_info
        })
        wx.hideLoading({

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
  },

 
  tableShow: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select id,order_id,code,product_name,norms,CONVERT(varchar(100), set_date, 23) as set_date,set_num,wenjian from order_info where company='" + user + "' and order_id like '%" + e[0] + "%' and product_name like '%" + e[1] + "%'"
      },
      success: res => {
        var list = res.result.recordset
        console.log("返回数据",list)
        _this.setData({
          list: list
        })
        wx.hideLoading({

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
  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      wlxgShow: false,
      wltjShow: false,
      product_name: "",
      order_id: "",
      ddh: "",
      cpbm: "",
      cpmc: "",
      gg: "",
      xdrq: "",
      xdsl: "",
      sfcd: "",
      list3: [] // 清空工序列表
    })
  },
  qxShow2: function () {
    var _this = this
    _this.setData({
      wltjShow: false,
    })
  },
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      cdShow: true,
      cd: ""
    })
    _this.wlShow()
    _this.loadProcessData()
  },
  //---新0203
  add1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    var x = 0
    for (var i = 0; i < (_this.data.list2.length); i++) {
      if (_this.data.list2[i].count != "" && _this.data.list2[i].count != 0) {
        x = x + 1
      }
    }
    if (x > 0) {
      if (_this.data.ddh != "" && _this.data.cpbm != "" && _this.data.cpmc != "" && _this.data.xdrq != "" && _this.data.xdsl != "") {
        wx.cloud.callFunction({
          name: 'sqlServer_PC',
          data: {
            query: "select count(order_id) as nameCount from order_info where company='" + user + "' and order_id='" + _this.data.ddh + "'"
          },
          success: res => {
            if (res.result.recordsets[0][0].nameCount == 0) {
              wx.cloud.callFunction({
                name: 'sqlServer_PC',
                data: {
                  query: "insert into order_info(order_id,code,product_name,norms, set_date,set_num,company) output inserted.ID values('" + _this.data.ddh + "','" + _this.data.cpbm + "','" + _this.data.cpmc + "','" + _this.data.gg + "','" + _this.data.xdrq + "','" + _this.data.xdsl + "','" + user + "')"
                },
                success: res => {
                  var id = res.result.recordset[0].ID
                  _this.setData({
                    product_name: "",
                    order_id: "",
                    ddh: "",
                    cpbm: "",
                    cpmc: "",
                    gg: "",
                    xdrq: "",
                    xdsl: "",
                    sfcd: "",
                  })
                  
                  // 1. 保存物料信息
                  var y = 0
                  var sql = "insert into order_bom(order_id,bom_id,use_num) values"
                  for (var i = 0; i < (_this.data.list2.length); i++) {
                    if (_this.data.list2[i].count != "" && _this.data.list2[i].count != 0) {
                      sql = sql + "('" + id + "','" + _this.data.list2[i].id + "','" + _this.data.list2[i].count + "'),"
                      y = y + 1
                    }
                  }
                  
                  // 2. 保存工序信息
                  var z = 0
                  var processSql = "insert into order_gongxu(order_id,module_id,module_num) values"
                  for (var j = 0; j < (_this.data.list3.length); j++) {
                    if (_this.data.list3[j].estimated_time && _this.data.list3[j].estimated_time != "") {
                      // 根据工序名称查找module_info表中的parent_id作为module_id
                      var processName = _this.data.list3[j].process_name
                      var estimatedTime = _this.data.list3[j].estimated_time
                      
                      // 这里需要先查询module_info表获取id
                      // 由于云函数限制，我们可以分批处理
                      processSql = processSql + "('" + id + "',(select top 1 parent_id from module_info where name='" + processName + "' and company='" + user + "'),'" + estimatedTime + "'),"
                      z = z + 1
                    }
                  }
                  
                  // 执行物料保存
                  if (y > 0) {
                    sql = sql.substr(0, sql.length - 1)
                    wx.cloud.callFunction({
                      name: 'sqlServer_PC',
                      data: {
                        query: sql
                      },
                      success: res => {
                        // 物料保存成功后保存工序
                        if (z > 0) {
                          processSql = processSql.substr(0, processSql.length - 1)
                          wx.cloud.callFunction({
                            name: 'sqlServer_PC',
                            data: {
                              query: processSql
                            },
                            success: res => {
                              wx.showToast({
                                title: '添加成功！',
                                icon: 'none',
                                duration: 3000
                              })
                            },
                            err: res => {
                              console.log("工序保存错误!")
                            },
                            fail: res => {
                              wx.showToast({
                                title: '工序保存失败！',
                                icon: 'none',
                                duration: 3000
                              })
                            }
                          })
                        } else {
                          wx.showToast({
                            title: '添加成功！',
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
                  
                  _this.qxShow()
                  var e = ['', '', '']
                  _this.tableShow(e)
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
            } else {
              wx.showToast({
                title: '该单号已存在！',
                icon: 'none'
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
      } else {
        wx.showToast({
          title: '物料编码、物料名称、类别不能为空！',
          icon: 'none',
          duration: 3000
        })
      }
    } else {
      wx.showToast({
        title: '表格中物料的数量不能为空！',
        icon: 'none'
      })
    }
  },

  clickView: function (e) {
    var _this = this
    _this.setData({
      ddh: _this.data.list[e.currentTarget.dataset.index].order_id,
      cpbm: _this.data.list[e.currentTarget.dataset.index].code,
      cpmc: _this.data.list[e.currentTarget.dataset.index].product_name,
      gg: _this.data.list[e.currentTarget.dataset.index].norms,
      xdrq: _this.data.list[e.currentTarget.dataset.index].set_date,
      xdsl: _this.data.list[e.currentTarget.dataset.index].set_num,
      sfcd: _this.data.list[e.currentTarget.dataset.index].is_insert,
      id: _this.data.list[e.currentTarget.dataset.index].id,
      handle: false,
    })
  },
  upd1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.ddh != "" && _this.data.cpbm != "" && _this.data.cpmc != "" && _this.data.xdrq != "" && _this.data.xdsl != "") {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "update order_info set order_id='" + _this.data.ddh + "',code='" + _this.data.cpbm + "',product_name='" + _this.data.cpmc + "',norms='" + _this.data.gg + "', set_date='" + _this.data.xdrq + "',set_num='" + _this.data.xdsl + "' where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            product_name: "",
            order_id: "",
            ddh: "",
            cpbm: "",
            cpmc: "",
            gg: "",
            xdrq: "",
            xdsl: "",
          })
          _this.qxShow()
          _this.setData({
            handle: true
          })
          var e = ['', '', '']
          _this.tableShow(e)
          wx.showToast({
            title: '修改成功！',
            icon: 'none',
            duration: 3000
          })
          wx.hideLoading({

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
    } else {
      wx.showToast({
        title: '物料编码、物料名称、类别不能为空！',
        icon: 'none',
        duration: 3000
      })
    }
  },
  //----新0203
  del1: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        // 同时删除订单、物料和工序信息
        query: "delete from order_info where id='" + _this.data.id + "';delete from order_bom where order_id='" + _this.data.id + "';delete from order_gongxu where order_id='" + _this.data.id + "'"
      },
      success: res => {
        _this.setData({
          product_name: "",
          order_id: "",
          ddh: "",
          cpbm: "",
          cpmc: "",
          gg: "",
          xdrq: "",
          xdsl: "",
          sfcd: "",
        })
        _this.qxShow()
        var e = ['', '', '']
        _this.tableShow(e)
        wx.showToast({
          title: '删除成功！',
          icon: 'none'
        })
        wx.hideLoading({
  
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
  },
  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
    })
  },
  sel1: function () {
    var _this = this
    var e = [_this.data.order_id, _this.data.product_name]
    _this.tableShow(e)
    _this.qxShow()
    setTimeout(() => {
      wx.showToast({
        title: '查询成功！',
        icon: 'none',
        duration: 2000
      })
    }, 500)
  },

  wlShow: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select id,code,name,norms,'' as [count] from bom_info where company='" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list2: list
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
  },
  clickView2: function (e) {
    var _this = this
    var column = e.currentTarget.dataset.column
    var index = e.currentTarget.dataset.index
    var code_id = _this.data.list2[index].id
    var empty = _this.data.list2[index].count

    if ("count" == column) {
      _this.setData({
        code_id: code_id,
        addWindow1: true,
        empty: empty,
        index: index
      })
    }
  },
  onInput2: function (e) {
    var _this = this
    let empty = e.detail.value
    _this.setData({
      empty: empty
    })
  },
  sure2: function () {
    var _this = this
    var list = _this.data.list2
    list[_this.data.index].count = _this.data.empty
    _this.setData({
      list2: list
    })
  },
  choiceDate: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
  },
  hid_view: function () {
    var _this = this
    _this.setData({
      handle: true
    })
  },
  xgDingDan: function () {
    var _this = this
    _this.setData({
      xgShow: true
    })
  },
  //----新0203
  xgWuLiao: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select b.id,i.code,i.name,i.norms,b.use_num as count from bom_info as i ,order_bom as b where b.bom_id=i.id and order_id='" + _this.data.id + "'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list2: list,
          wlxgShow: true
        })
        
        // 同时加载工序信息
        _this.loadOrderProcessData()
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
  },
  
  // 添加加载订单工序数据的方法
  loadOrderProcessData: function() {
    var _this = this
    let user = app.globalData.gongsi;
    
    // 查询订单关联的工序信息
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select m.name as process_name, m.num as efficiency, g.module_num as estimated_time, g.id as gongxu_id from order_gongxu g inner join module_info m on g.module_id = m.parent_id where g.order_id='" + _this.data.id + "' and m.company='" + user + "'"
      },
      success: res => {
        var processList = res.result.recordset
        _this.setData({
          list3: processList
        })
      },
      err: res => {
        console.log("工序查询错误!")
      }
    })
  },
  clickView3: function (e) {
    var _this = this
    var column = e.currentTarget.dataset.column
    var index = e.currentTarget.dataset.index
    var code_id = _this.data.list2[index].id
    var empty = _this.data.list2[index].count

    if ("count" == column) {
      _this.setData({
        code_id: code_id,
        addWindow1: true,
        empty: empty,
        index: index
      })
    } else {
      _this.setData({
        code_id: code_id,
        delWindow1: true,
        empty: empty,
        index: index,
      })
    }
  },
  upd2: function () {
    var _this = this
    var x = 0
    var sql = ""
    let user = app.globalData.gongsi;
    
    // 1. 更新物料信息
    for (var i = 0; i < _this.data.list2.length; i++) {
      if (_this.data.list2[i].count != "" && _this.data.list2[i].count != 0) {
        sql = sql + "update order_bom set use_num='" + _this.data.list2[i].count + "' where id='" + _this.data.list2[i].id + "';"
      } else {
        x = x + 1
      }
    }
    
    // 2. 更新工序信息
    for (var j = 0; j < _this.data.list3.length; j++) {
      if (_this.data.list3[j].estimated_time && _this.data.list3[j].estimated_time != "") {
        sql = sql + "update order_gongxu set module_num='" + _this.data.list3[j].estimated_time + "' where id='" + (_this.data.list3[j].gongxu_id || '') + "';"
      }
    }
    
    if (x > 0) {
      wx.showToast({
        title: '物料数量不能修改为空！',
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: sql
        },
        success: res => {
          _this.setData({
            order_id: "",
            ddh: "",
            cpbm: "",
            cpmc: "",
            gg: "",
            xdrq: "",
            xdsl: "",
          })
          _this.qxShow()
          _this.setData({
            handle: true
          })
          var e = ['', '', '']
          _this.tableShow(e)
          wx.showToast({
            title: '修改成功！',
            icon: 'none',
            duration: 3000
          })
          wx.hideLoading({
  
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
  //---新0203
  add2: function () {
    var _this = this
    let user = app.globalData.gongsi;
    
    // 先加载可添加的物料
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select id,code,name,norms,'' as [count] from bom_info where company = '" + user + "' and id not in (select bom_id from order_bom where order_id = '" + _this.data.id + "' )"
      },
      success: res => {
        var list = res.result.recordset
        
        // 同时加载可添加工序
        wx.cloud.callFunction({
          name: 'sqlServer_PC',
          data: {
            query: "select m.name as process_name, m.num as efficiency, m.parent_id as module_id, '' as estimated_time from module_info m where m.company='" + user + "' and m.parent_id not in (select module_id from order_gongxu where order_id='" + _this.data.id + "')"
          },
          success: res2 => {
            _this.setData({
              list2: list,
              list3: res2.result.recordset,
              wltjShow: true
            })
          }
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
  },

  //----新0203
  wltj: function () {
    var _this = this
    let user = app.globalData.gongsi;
    var y = 0
    var z = 0
    var sql = ""
    
    // 添加物料
    for (var i = 0; i < (_this.data.list2.length); i++) {
      if (_this.data.list2[i].count != "" && _this.data.list2[i].count != 0) {
        sql = sql + "insert into order_bom(order_id,bom_id,use_num) values('" + _this.data.id + "','" + _this.data.list2[i].id + "','" + _this.data.list2[i].count + "');"
        y = y + 1
      }
    }
    
    // 添加工序
    for (var j = 0; j < (_this.data.list3.length); j++) {
      if (_this.data.list3[j].estimated_time && _this.data.list3[j].estimated_time != "") {
        sql = sql + "insert into order_gongxu(order_id,module_id,module_num) values('" + _this.data.id + "','" + _this.data.list3[j].module_id + "','" + _this.data.list3[j].estimated_time + "');"
        z = z + 1
      }
    }
    
    if (y > 0 || z > 0) {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: sql
        },
        success: res => {
          _this.setData({
            wltjShow: false,
          })
          _this.xgWuLiao()
          wx.showToast({
            title: '添加成功！',
            icon: 'none',
            duration: 3000
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

  sure1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "delete from order_bom where id='" + this.data.list2[_this.data.index].id + "'"
      },
      success: res => {
        _this.setData({
          dedelWindow1lId: false
        })
        _this.xgWuLiao()
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
  },
  // 生成Excel
  getExcel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title
    var cloudList = {
      name: '排产订单',
      items: [],
      header: []
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
//----新0202
loadProcessData: function() {
  var _this = this
  let user = app.globalData.gongsi;
  
  // 从模块单位表中获取工序数据，同时获取parent_id作为module_id
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: "select name as process_name, num as efficiency, parent_id as module_id, '' as estimated_time from module_info where company='" + user + "'"
    },
    success: res => {
      var list = res.result.recordset
      _this.setData({
        list3: list
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
},

// 添加工序点击事件
clickViewProcess: function(e) {
  var _this = this
  var column = e.currentTarget.dataset.column
  var index = e.currentTarget.dataset.index
  
  // 只有预估工时可以编辑
  if ("estimated_time" == column) {
    var empty = _this.data.list3[index].estimated_time || ""
    _this.setData({
      code_id2: _this.data.list3[index].id,
      addWindow2: true,
      empty2: empty,
      index2: index
    })
  }
},

// 添加工序输入处理
onInputProcess: function(e) {
  var _this = this
  let empty = e.detail.value
  _this.setData({
    empty2: empty
  })
},

// 确认添加工序
sureProcess: function() {
  var _this = this
  var list = _this.data.list3
  list[_this.data.index2].estimated_time = _this.data.empty2
  _this.setData({
    list3: list,
    addWindow2: false
  })
},

// 关闭工序弹窗
onCloseProcess: function() {
  var _this = this
  _this.setData({
    addWindow2: false
  })
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