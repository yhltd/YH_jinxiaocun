// apply.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      bumen: '',          // 部门
      xingming: '',       // 姓名
      tijiaoriqi: '',     // 提交日期（自动生成）
      shenqingyuanyin: '', // 申请原因
      shenpijieguo: '待审批', // 审批结果（默认值）
      shenpiyuanyin: ''   // 审批原因（领导填写）
    },
    companyName: '',      // 公司名称
    isSubmitting: false,  // 是否正在提交
    validationErrors: {},  // 表单验证错误信息

    showHistory: false,      // 是否显示历史记录
  historyList: [],        // 历史记录列表
  loadingHistory: false,  // 加载历史记录中
  currentPage: 0,         // 当前页码
  pageSize: 10,           // 每页数量
  hasMore: true           // 是否有更多数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    // 获取公司名称（从页面参数）
    if (options && options.companyName) {
      that.setData({
        companyName: options.companyName
      });
      console.log('公司名称:', that.data.companyName);
    } else {
      // 如果没有传递公司名称，尝试从全局数据或本地存储获取
      const app = getApp();
      if (app && app.globalData.companyName) {
        that.setData({
          companyName: app.globalData.companyName
        });
      } else {
        wx.getStorage({
          key: 'companyName',
          success: function(res) {
            that.setData({
              companyName: res.data
            });
          },
          fail: function() {
            // 如果都没有获取到，使用默认值或提示用户
            wx.showToast({
              title: '请先选择公司',
              icon: 'none'
            });
            setTimeout(() => {
              wx.navigateBack();
            }, 1500);
          }
        });
      }
    }
    
    // 初始化表单数据，设置提交日期
    this.initFormData();
    
    // 注释掉自动加载历史记录，改为用户点击按钮时加载
    // this.loadHistoryData();
    
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: '离职申请'
    });
    
    // 设置导航栏颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#764ba2',
    });
  },
  /**
 * 加载历史记录数据
 */
loadHistoryData: function() {
  var that = this;
  const { companyName, currentPage, pageSize, historyList, formData } = this.data;
  
  // 再次验证部门和姓名（双重保险）
  const bumen = formData.bumen ? formData.bumen.trim() : '';
  const xingming = formData.xingming ? formData.xingming.trim() : '';
  
  if (!bumen || !xingming) {
    wx.showToast({
      title: '部门和姓名为必填项',
      icon: 'none',
      duration: 2000
    });
    that.setData({ loadingHistory: false });
    return;
  }
  
  if (!companyName) {
    wx.showToast({
      title: '请先选择公司',
      icon: 'none'
    });
    that.setData({ loadingHistory: false });
    return;
  }
  
  that.setData({
    loadingHistory: true
  });
  
  // 构建SQL查询语句（使用姓名和部门精确匹配）
  const sql = `
    SELECT * FROM (
      SELECT *, ROW_NUMBER() OVER (ORDER BY tijiaoriqi DESC, id DESC) AS RowNum 
      FROM gongzi_lizhishenpi 
      WHERE gongsi = '${companyName}'
        AND bumen = '${bumen.replace(/'/g, "''")}'
        AND xingming = '${xingming.replace(/'/g, "''")}'
    ) AS temp 
    WHERE RowNum > ${currentPage * pageSize} 
      AND RowNum <= ${(currentPage + 1) * pageSize}
  `;
  
  console.log('查询SQL:', sql);
  console.log('查询条件 - 公司:', companyName, '部门:', bumen, '姓名:', xingming);
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: { query: sql },
    success: function(res) {
      console.log('查询结果:', res);
      
      let newList = [];
      
      // 根据返回数据结构调整
      if (res.result && res.result.recordset) {
        newList = res.result.recordset;
      } else if (Array.isArray(res.result)) {
        newList = res.result;
      } else if (res.result) {
        // 尝试解析结果
        try {
          newList = JSON.parse(res.result);
        } catch(e) {
          newList = [];
        }
      }
      
      const allList = historyList.concat(newList);
      
      that.setData({
        historyList: allList,
        loadingHistory: false,
        hasMore: newList.length >= pageSize,
        currentPage: currentPage + 1
      });
      
      if (newList.length > 0) {
        wx.showToast({
          title: `找到${newList.length}条记录`,
          icon: 'success',
          duration: 1000
        });
      } else if (currentPage === 0) {
        // 如果是第一次查询且没有结果
        wx.showToast({
          title: '未找到相关记录',
          icon: 'none',
          duration: 1500
        });
      }
    },
    fail: function(err) {
      console.error('加载失败:', err);
      that.setData({ loadingHistory: false });
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      });
    }
  });
},
/**
 * 切换显示/隐藏历史记录
 */
toggleHistory: function() {
  const showHistory = !this.data.showHistory;
  const { formData } = this.data;
  const bumen = formData.bumen ? formData.bumen.trim() : '';
  const xingming = formData.xingming ? formData.xingming.trim() : '';
  
  // 验证部门和姓名是否都有值
  if (showHistory && (!bumen || !xingming)) {
    wx.showToast({
      title: '请先填写部门和姓名',
      icon: 'none',
      duration: 2000
    });
    return; // 直接结束，不执行后续代码
  }
  
  this.setData({ showHistory });
  
  if (showHistory && this.data.historyList.length === 0) {
    // 重置分页参数
    this.setData({
      currentPage: 0,
      historyList: [],
      hasMore: true
    });
    this.loadHistoryData();
  }
},

/**
 * 加载更多历史记录
 */
loadMoreHistory: function() {
  // 再次验证部门和姓名
  const { formData, loadingHistory, hasMore } = this.data;
  const bumen = formData.bumen ? formData.bumen.trim() : '';
  const xingming = formData.xingming ? formData.xingming.trim() : '';
  
  if (!bumen || !xingming) {
    wx.showToast({
      title: '部门和姓名为必填项',
      icon: 'none',
      duration: 2000
    });
    return;
  }
  
  if (loadingHistory || !hasMore) return;
  this.loadHistoryData();
},

/**
 * 查看详细记录
 */
viewDetail: function(e) {
  const index = e.currentTarget.dataset.index;
  const item = this.data.historyList[index];
  const { formData } = this.data;
  
  wx.showModal({
    title: `${formData.bumen} - ${formData.xingming}`,
    content: `
部门：${item.bumen}
姓名：${item.xingming}
提交日期：${item.tijiaoriqi}
申请原因：${item.shenqingyuanyin}
审批结果：${item.shenpijieguo}
审批原因：${item.shenpiyuanyin || '无'}
    `,
    showCancel: true,
    confirmText: '确定',
    cancelText: '关闭',
    confirmColor: '#764ba2'
  });
},

  /**
   * 初始化表单数据
   */
  initFormData: function() {
    // 获取当前日期，格式为 YYYY-MM-DD
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');
    var todayStr = year + '-' + month + '-' + day;
    
    this.setData({
      'formData.tijiaoriqi': todayStr,
      'formData.shenpijieguo': '待审批'
    });
  },

  /**
   * 输入框内容变化
   */
  onInputChange: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    // 更新表单数据
    this.setData({
      [`formData.${field}`]: value
    });
    
    // 清除该字段的错误信息
    if (this.data.validationErrors[field]) {
      this.setData({
        [`validationErrors.${field}`]: ''
      });
    }
  },

  /**
   * 表单验证
   */
  validateForm: function() {
    const errors = {};
    const formData = this.data.formData;
    
    // 验证部门
    if (!formData.bumen || formData.bumen.trim() === '') {
      errors.bumen = '请输入部门名称';
    } else if (formData.bumen.trim().length < 2) {
      errors.bumen = '部门名称至少2个字符';
    }
    
    // 验证姓名
    if (!formData.xingming || formData.xingming.trim() === '') {
      errors.xingming = '请输入姓名';
    } else if (formData.xingming.trim().length < 2) {
      errors.xingming = '姓名至少2个字符';
    }
    
    // 验证申请原因
    if (!formData.shenqingyuanyin || formData.shenqingyuanyin.trim() === '') {
      errors.shenqingyuanyin = '请输入申请原因';
    }
    
    // 更新错误信息
    this.setData({
      validationErrors: errors
    });
    
    // 返回验证结果
    return Object.keys(errors).length === 0;
  },

  /**
   * 提交表单
   */
  submitForm: function(e) {
    var that = this;
    
    // 验证表单
    if (!this.validateForm()) {
      wx.showToast({
        title: '请完善表单信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 防止重复提交
    if (that.data.isSubmitting) {
      return;
    }
    
    that.setData({
      isSubmitting: true
    });
    
    // 显示加载提示
    wx.showLoading({
      title: '正在提交...',
      mask: true
    });
    
    // 准备提交数据
    const formData = that.data.formData;
    const companyName = that.data.companyName;
    
    // 构建SQL插入语句
    const sql = `
      INSERT INTO gongzi_lizhishenpi 
      (gongsi, bumen, xingming, tijiaoriqi, shenqingyuanyin, shenpijieguo, shenpiyuanyin) 
      VALUES (
        '${companyName}',
        '${formData.bumen.replace(/'/g, "''")}',
        '${formData.xingming.replace(/'/g, "''")}',
        '${formData.tijiaoriqi}',
        '${formData.shenqingyuanyin.replace(/'/g, "''")}',
        '${formData.shenpijieguo}',
        '${formData.shenpiyuanyin.replace(/'/g, "''")}'
      )
    `;
    
    console.log('提交SQL:', sql);
    
    // 调用云函数提交数据
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: function(res) {
        wx.hideLoading();
        
        console.log('提交成功:', res);
        
        // 提交成功后重置表单
        that.resetForm();
        
        // 显示成功提示
        wx.showModal({
          title: '提交成功',
          content: '您的离职申请已成功提交！\n请等待上级领导审批。',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#764ba2',
          success: function(res) {
            if (res.confirm) {
              // 可以跳转到列表页面或留在当前页面
              // 示例：返回上一页
              wx.navigateBack();
            }
          }
        });
      },
      fail: function(err) {
        wx.hideLoading();
        console.error('提交失败:', err);
        
        that.setData({
          isSubmitting: false
        });
        
        wx.showModal({
          title: '提交失败',
          content: '网络错误，请稍后重试。\n错误信息：' + (err.errMsg || '未知错误'),
          showCancel: false,
          confirmText: '确定'
        });
      },
      complete: function() {
        that.setData({
          isSubmitting: false
        });
      }
    });
  },

  /**
   * 重置表单
   */
  resetForm: function() {
    var that = this;
    
    wx.showModal({
      title: '确认重置',
      content: '确定要重置表单吗？所有填写的内容将被清空。',
      confirmText: '确定',
      cancelText: '取消',
      confirmColor: '#764ba2',
      success: function(res) {
        if (res.confirm) {
          // 清空表单数据，但保留自动生成的日期
          that.initFormData();
          that.setData({
            'formData.bumen': '',
            'formData.xingming': '',
            'formData.shenqingyuanyin': '',
            'formData.shenpiyuanyin': '',
            validationErrors: {}
          });
          
          wx.showToast({
            title: '表单已重置',
            icon: 'success',
            duration: 1500
          });
        }
      }
    });
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
    return {
      title: '离职申请表',
      path: '/pages/apply/apply'
    };
  }
});