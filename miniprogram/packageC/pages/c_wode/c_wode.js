const updSpace = require('../../util/updSpace')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    bianhao:"",
    this_name:"",
    gongsi:""
  },

  go1:function(){
    var _this = this
    var sql = "select * from quanxian where bianhao ='" + _this.data.bianhao + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset[0]
        _this.setData({
          this_quanxian:list[0]
        })

          console.log(list)
          if(list.bmsz_select == '是'){
            wx.navigateTo({
              url: '../../pages/c_bumenpeizhi/c_bumenpeizhi' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        
      },
      err: res => {
        console.log("错误!")
      }
    })

  },

  go2:function(){
    var _this = this
    var sql = "select * from quanxian where bianhao ='" + _this.data.bianhao + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset[0]
        _this.setData({
          this_quanxian:list[0]
        })
          console.log(list)
          if(list.zhgl_select == '是'){
            wx.navigateTo({
              url: '../../pages/c_zhanghaoguanli/c_zhanghaoguanli' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        
      },
      err: res => {
        console.log("错误!")
      }
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var user = JSON.parse(options.userInfo)
    console.log("财务公司数据", user)
    this.queryUserPermissions()
    // 设置用户信息
    _this.setData({
      userInfo: JSON.parse(options.userInfo),
      this_name: user.name,
      bianhao: user.bianhao,
      user: user,
      // 初始化欢迎语
      welcomeText: "欢迎使用云合未来财务系统"
    })
    
    // 生成动态欢迎语
    _this.generateWelcomeText(user)
  },
  
  /**
   * 生成动态欢迎语
   */
  generateWelcomeText: function(user) {
    var _this = this
    
    // 从user中获取公司名称
    if (user && user.company && user.company.trim() !== "") {
      var companyName = user.company.trim()
      
      // 如果包含下划线，取第一部分
      if (companyName.includes('_')) {
        companyName = companyName.split('_')[0]
      }
      
      // 取前四位，不足四位取全部
      var firstFourChars = companyName.length >= 4 ? 
                          companyName.substring(0, 4) : 
                          companyName
      
      // 拼接欢迎语
      var welcomeText = "欢迎使用" + firstFourChars + "财务系统"
      
      console.log('公司名称:', companyName)
      console.log('前四位:', firstFourChars)
      console.log('欢迎语:', welcomeText)
      
      // 更新到页面数据
      _this.setData({
        welcomeText: welcomeText,
        companyFirstFour: firstFourChars
      })
      
    } else {
      console.log('company字段为空或不存在，使用默认欢迎语')
      // 保持默认欢迎语
    }
  },

  go3:function(){
    wx.reLaunch({
      url: '../../../pages/login/login',
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

  },
  queryUserPermissions: function() {
    var that = this;
    
    // 统一在函数内部获取缓存数据
    wx.getStorage({
      key: 'gongsi',
      success: function(gongsiRes) {
        wx.getStorage({
          key: 'system',
          success: function(systemRes) {
            let companyName = gongsiRes.data;
            let systemName = systemRes.data;
            const userInfo = that.data.userInfo;
            console.log('想要获取公司名称:', companyName);
            console.log('获取系统名称:', systemName);
            that.setData({
              gongsi: companyName,
              system: systemName,
              jizhu_panduan: true
            });
            
            // 使用分段获取方法
            that.queryUserAvatarInChunks(companyName, userInfo.name, userInfo.pwd);
          },
          fail: systemErr => {
            console.error("获取system缓存失败:", systemErr);
            that.setDefaultAvatar();
          }
        })
      },
      fail: gongsiErr => {
        console.error("获取gongsi缓存失败:", gongsiErr);
        that.setDefaultAvatar();
      }
    })
  },
  
  // 分段获取大base64数据的主方法
  queryUserAvatarInChunks: function(companyName, userName, password) {
    var that = this;
    
    console.log('=== 分段获取头像数据 ===');
    console.log('查询参数:', { companyName, userName, password });
    
    // 显示加载状态
    wx.showLoading({
      title: '加载头像中...',
      mask: true
    });
    
    // 第一步：获取头像数据长度
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "SELECT LEN(touxiang) as data_length FROM Account WHERE company = '" + companyName + "' AND name = '" + userName + "' AND pwd ='" + password + "'"
      },
      success: res => {
        console.log('数据长度查询结果:', res);
        
        if (res.result && res.result.recordset && res.result.recordset.length > 0) {
          const dataLength = res.result.recordset[0].data_length;
          console.log('头像数据长度:', dataLength);
          
          if (dataLength > 0) {
            if (dataLength > 500000) { // 如果超过500KB，分段获取
              console.log('头像数据较大，启用分段获取');
              that.getAvatarByChunks(companyName, userName, password, dataLength);
            } else {
              // 直接获取完整数据
              console.log('头像数据较小，直接获取');
              that.queryUserAvatarDirectly(companyName, userName, password);
            }
          } else {
            console.log('头像数据长度为0，使用默认头像');
            that.setDefaultAvatar();
          }
        } else {
          console.log('未找到用户数据');
          that.setDefaultAvatar();
        }
      },
      fail: err => {
        console.error('数据长度查询失败:', err);
        that.setDefaultAvatar();
      }
    });
  },
  
  // 分段获取头像数据
  getAvatarByChunks: function(companyName, userName, password, totalLength) {
    var that = this;
    const CHUNK_SIZE = 200000; // 每段200KB
    let allChunks = [];
    let currentChunk = 0;
    let totalChunks = Math.ceil(totalLength / CHUNK_SIZE);
    
    console.log(`开始分段获取，总长度: ${totalLength}, 分 ${totalChunks} 段`);
    
    function getNextChunk() {
      const start = currentChunk * CHUNK_SIZE;
      const chunkSize = Math.min(CHUNK_SIZE, totalLength - start);
      
      console.log(`获取第 ${currentChunk + 1}/${totalChunks} 段, 位置: ${start}-${start + chunkSize}`);
      
      wx.cloud.callFunction({
        name: 'sqlServer_cw',
        data: {
          query: `SELECT SUBSTRING(touxiang, ${start + 1}, ${chunkSize}) as chunk FROM Account WHERE company = '${companyName}' AND name = '${userName}' AND pwd ='${password}'`
        },
        success: res => {
          if (res.result && res.result.recordset && res.result.recordset.length > 0) {
            const chunk = res.result.recordset[0].chunk;
            if (chunk) {
              allChunks.push(chunk);
              console.log(`第${currentChunk + 1}段获取成功，长度:`, chunk.length);
              
              currentChunk++;
              
              if (currentChunk < totalChunks) {
                // 继续获取下一段
                setTimeout(getNextChunk, 100);
              } else {
                // 所有数据获取完成
                console.log('所有分段获取完成');
                wx.hideLoading();
                that.combineAndProcessAvatar(allChunks, totalLength);
              }
            } else {
              console.error(`第${currentChunk + 1}段数据为空`);
              that.setDefaultAvatar();
            }
          } else {
            console.error(`第${currentChunk + 1}段获取失败，返回数据为空`);
            that.setDefaultAvatar();
          }
        },
        fail: err => {
          console.error(`获取第${currentChunk + 1}段数据失败:`, err);
          wx.hideLoading();
          that.setDefaultAvatar();
        }
      });
    }
    
    // 开始获取第一段
    getNextChunk();
  },
  
  // 直接获取完整头像数据（用于小数据）
  queryUserAvatarDirectly: function(companyName, userName, password) {
    var that = this;
    
    console.log('直接获取完整头像数据');
    
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "SELECT touxiang FROM Account WHERE company = '" + companyName + "' AND name = '" + userName + "' AND pwd ='" + password + "'"
      },
      success: res => {
        wx.hideLoading();
        console.log('直接获取头像结果:', res);
        
        if (res.result && res.result.recordset && res.result.recordset.length > 0) {
          const touxiangRawData = res.result.recordset[0].touxiang;
          that.processAvatarData(touxiangRawData);
        } else {
          console.log('直接获取未找到头像数据');
          that.setDefaultAvatar();
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('直接获取头像失败:', err);
        that.setDefaultAvatar();
      }
    });
  },
  
  // 合并并处理分段数据
  combineAndProcessAvatar: function(chunks, expectedLength) {
    var that = this;
    
    console.log('开始合并分段数据');
    
    try {
      const fullData = chunks.join('');
      console.log('合并后数据总长度:', fullData.length, '期望长度:', expectedLength);
      
      // 验证数据完整性
      if (fullData.length === expectedLength) {
        console.log('数据完整性验证通过');
        that.processAvatarData(fullData);
      } else {
        console.error(`数据不完整，期望: ${expectedLength}, 实际: ${fullData.length}`);
        // 即使不完整也尝试处理
        that.processAvatarData(fullData);
      }
    } catch (error) {
      console.error('合并数据时发生错误:', error);
      that.setDefaultAvatar();
    }
  },
  
  // 处理头像数据
  processAvatarData: function(touxiangRawData) {
    var that = this;
    
    console.log('处理头像数据，原始数据长度:', touxiangRawData ? touxiangRawData.length : 'null');
    
    if (!touxiangRawData || touxiangRawData.trim() === '') {
      console.log('头像数据为空');
      that.setDefaultAvatar();
      return;
    }
    
    try {
      // 清理数据
      const cleanedData = touxiangRawData
        .replace(/\r?\n|\r/g, '')
        .replace(/\s/g, '')
        .trim();
      
      console.log('清理后数据长度:', cleanedData.length);
      
      // 确定图片格式
      let mimeType = 'image/jpeg';
      if (cleanedData.startsWith('iVBORw0KGgo')) {
        mimeType = 'image/png';
        console.log('头像检测为PNG格式');
      } else if (cleanedData.startsWith('/9j/')) {
        mimeType = 'image/jpeg';
        console.log('头像检测为JPEG格式');
      }
      
      // 生成 base64 URL
      const avatarImageSrc = `data:${mimeType};base64,${cleanedData}`;
      console.log('头像处理完成，准备更新页面');
      
      // 更新页面数据
      that.setData({ 
        avatarImageSrc: avatarImageSrc
      });
      
      wx.showToast({
        title: '头像加载成功',
        icon: 'success',
        duration: 1500
      });
      
    } catch (error) {
      console.error('处理头像数据时发生错误:', error);
      that.setDefaultAvatar();
    }
  },
  
  // 设置默认头像
  setDefaultAvatar: function() {
    var that = this;
    
    console.log('设置默认头像');
    
    that.setData({ 
      avatarImageSrc: 'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/touxiang.png'
    });
    
    wx.hideLoading();
  },
  
  // 头像点击事件
  changeAvatar: function() {
    const that = this;
    console.log('头像点击事件触发');
    
    wx.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      itemColor: "#000000",
      success(res) {
        if (!res.cancel) {
          if (res.tapIndex === 0) {
            that.chooseWxImage('camera');
          } else if (res.tapIndex === 1) {
            that.chooseWxImage('album');
          }
        }
      },
      fail(err) {
        console.log('显示操作菜单失败:', err);
      }
    });
  },
  
  // 处理图片选择
  chooseWxImage: function(sourceType) {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: [sourceType],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0];
        console.log('选择的图片临时路径:', tempFilePaths);
        
        wx.showLoading({
          title: '处理图片中...',
          mask: true
        });
        
        // 先更新本地显示
        that.setData({
          avatarImageSrc: tempFilePaths
        });
        
        // 转换为base64并上传
        that.convertImageToBase64(tempFilePaths);
      },
      fail(err) {
        console.log('选择图片失败:', err);
        wx.showToast({
          title: '选择图片失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 将图片转换为base64
  convertImageToBase64: function(tempFilePath) {
    const that = this;
    
    wx.getFileSystemManager().readFile({
      filePath: tempFilePath,
      encoding: 'base64',
      success(res) {
        console.log('图片转换为base64成功，数据长度:', res.data.length);
        
        const cleanedBase64 = res.data
          .replace(/\r?\n|\r/g, '')
          .replace(/\s/g, '')
          .trim();
        
        console.log('清理后base64长度:', cleanedBase64.length);
        
        // 检查图片大小
        that.checkImageSize(cleanedBase64, function(processedBase64) {
          // 上传到数据库
          that.uploadAvatarToDatabase(processedBase64);
        });
      },
      fail(err) {
        console.error('图片转换base64失败:', err);
        wx.hideLoading();
        wx.showToast({
          title: '图片处理失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 上传头像到数据库
  uploadAvatarToDatabase: function(base64Image) {
    const that = this;
    
    // 获取用户信息
    const companyName = this.data.gongsi;
    const userInfo = this.data.userInfo;
    
    if (!companyName || !userInfo || !userInfo.name || !userInfo.pwd) {
      console.error('用户信息不完整，无法上传头像');
      wx.hideLoading();
      wx.showToast({
        title: '用户信息缺失',
        icon: 'none'
      });
      return;
    }
    
    console.log('开始上传头像到数据库，参数:', {
      companyName,
      userName: userInfo.name,
      base64Length: base64Image.length
    });
    
    // 构建更新SQL - 适配Account表结构
    const sql = `UPDATE Account SET touxiang = '${base64Image}' WHERE company = '${companyName}' AND name = '${userInfo.name}' AND pwd = '${userInfo.pwd}'`;
    
    console.log('执行SQL:', sql);
    
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        wx.hideLoading();
        console.log('头像上传到数据库成功:', res);
        
        if (res.result) {
          // 判断更新是否成功
          if (res.result.rowsAffected && res.result.rowsAffected[0] > 0) {
            wx.showToast({
              title: '头像更新成功',
              icon: 'success',
              duration: 2000
            });
            
            // 更新本地显示的base64 URL
            const mimeType = that.detectImageType(base64Image);
            const avatarImageSrc = `data:${mimeType};base64,${base64Image}`;
            that.setData({
              avatarImageSrc: avatarImageSrc
            });
            
            console.log('头像更新完成，影响行数:', res.result.rowsAffected[0]);
          } else {
            wx.showToast({
              title: '更新失败，用户不存在',
              icon: 'none',
              duration: 2000
            });
          }
        } else {
          wx.showToast({
            title: '更新失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('头像上传到数据库失败:', err);
        
        // 错误处理
        if (err.errMsg && err.errMsg.includes('exceeded')) {
          wx.showModal({
            title: '图片太大',
            content: '选择的图片太大，请选择较小的图片重试',
            showCancel: false
          });
        } else if (err.errMsg && err.errMsg.includes('connection')) {
          wx.showToast({
            title: '数据库连接失败',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '上传失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  },
  
  // 检测图片类型
  detectImageType: function(base64Data) {
    if (base64Data.startsWith('iVBORw0KGgo')) {
      return 'image/png';
    } else if (base64Data.startsWith('/9j/')) {
      return 'image/jpeg';
    } else if (base64Data.startsWith('R0lGODlh')) {
      return 'image/gif';
    } else {
      return 'image/jpeg';
    }
  },
  
  // 图片大小检查
  checkImageSize: function(base64Image, callback) {
    const maxSize = 800000; // 800KB限制
    
    if (base64Image.length <= maxSize) {
      callback(base64Image);
      return;
    }
    
    console.log('图片过大，原大小:', base64Image.length);
    
    wx.showModal({
      title: '图片太大',
      content: '图片尺寸较大，可能会影响加载速度，建议选择较小的图片',
      success: (res) => {
        if (res.confirm) {
          callback(base64Image);
        } else {
          wx.hideLoading();
          // 恢复默认头像
          this.setData({
            avatarImageSrc: 'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/touxiang.png'
          });
        }
      }
    });
  }
  
})