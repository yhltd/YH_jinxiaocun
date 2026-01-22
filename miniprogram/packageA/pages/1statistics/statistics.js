// pages/statistics/statistics.js
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    companyName: '',
    dynamicTitles: [],        // 从主页面传递的动态标题
    list: [],                 // 从主页面传递的数据列表
    chartConfigs: [],         // 图表配置列表
    currentChart: null,       // 当前显示的图表
    showChartModal: false,    // 显示图表配置模态框
    editingIndex: -1,         // 编辑的图表索引
    chartTypes: [
      { name: '柱状图', value: 'bar' },
      { name: '折线图', value: 'line' },
      // { name: '饼图', value: 'pie' },
      // { name: '雷达图', value: 'radar' }
    ],
    
    // 图表配置表单数据
    configForm: {
      name: '',              // 图表名称
      type: 'bar',           // 图表类型
      xAxisField: -1,        // X轴字段索引
      yAxisField: -1,        // Y轴字段索引
      yAxisFields: [],       // 多个Y轴字段（用于多条数据线）
      chartTitle: '',        // 图表标题
      showLegend: true,      // 是否显示图例
      showGrid: true,        // 是否显示网格
      colors: ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0'] // 颜色配置
    },
    
    // 当前选择的图表类型索引
    currentTypeIndex: 0,
    
    // 图表数据
    chartData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   var that = this;

  //    // 获取屏幕信息
  // wx.getSystemInfo({
  //   success: function(res) {
  //     that.setData({
  //       screenWidth: res.screenWidth,
  //       screenHeight: res.screenHeight
  //     });
  //   }
  // });
    
  //   // 从页面参数获取公司名称
  //   if (options && options.companyName) {
  //     that.setData({
  //       companyName: options.companyName
  //     });
  //   } else {
  //     // 尝试从全局获取
  //     if (app.globalData.companyName) {
  //       that.setData({
  //         companyName: app.globalData.companyName
  //       });
  //     }
  //   }
    
  //   // 设置页面标题
  //   wx.setNavigationBarTitle({
  //     title: '动态统计图表'
  //   });
    
  //   // 设置导航栏颜色
  //   wx.setNavigationBarColor({
  //     frontColor: '#ffffff',
  //     backgroundColor: '#764ba2',
  //   });
    
  //   // 加载图表配置
  //   that.loadChartConfigs();
    
  //   // 从全局数据获取动态标题和数据列表
  //   if (app.globalData.dynamicTitles && app.globalData.listData) {
  //     that.setData({
  //       dynamicTitles: app.globalData.dynamicTitles,
  //       list: app.globalData.listData
  //     });
  //   }
  // },
  onLoad: function (options) {
    var that = this;
    
    console.log('统计图表页面加载开始');
    
    // 获取屏幕信息
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight
        });
      }
    });
    
    // 优先从页面参数获取公司名称
    var companyName = '';
    if (options && options.companyName) {
      companyName = options.companyName;
      console.log('从页面参数获取公司名称:', companyName);
    } 
    // 然后从全局数据获取
    else if (app.globalData.companyName) {
      companyName = app.globalData.companyName;
      console.log('从全局数据获取公司名称:', companyName);
    }
    
    if (!companyName) {
      wx.showToast({
        title: '公司信息缺失',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }
    
    that.setData({
      companyName: companyName
    });
    
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: '动态统计图表'
    });
    
    // 设置导航栏颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#764ba2',
    });
    
    // 先检查全局数据是否准备好
    if (app.globalData.dynamicTitles && app.globalData.dynamicTitles.length > 0) {
      console.log('从全局数据获取动态标题:', app.globalData.dynamicTitles.length);
      console.log('从全局数据获取列表数据:', app.globalData.listData ? app.globalData.listData.length : 0);
      
      that.setData({
        dynamicTitles: app.globalData.dynamicTitles,
        list: app.globalData.listData || []
      }, function() {
        // 数据设置完成后加载图表配置
        console.log('本地数据设置完成，开始加载图表配置');
        that.loadChartConfigs();
      });
    } else {
      console.log('全局数据未准备好，显示提示');
      wx.showToast({
        title: '数据加载中...',
        icon: 'loading',
        duration: 2000
      });
      
      // 如果没有数据，返回上一页
      setTimeout(() => {
        if (that.data.dynamicTitles.length === 0) {
          wx.showToast({
            title: '数据加载失败，请返回重试',
            icon: 'none'
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      }, 3000);
    }
  },

  /**
 * 动态调整canvas大小
 */
adjustCanvasSize: function(config) {
  var that = this;
  var dynamicTitles = that.data.dynamicTitles;
  var chartData = that.data.chartData;
  
  if (!chartData.xAxisData || chartData.xAxisData.length === 0) {
    return;
  }
  
  // 计算需要的宽度（根据数据条数）
  var dataCount = chartData.xAxisData.length;
  var baseWidth = 80; // 每个数据点的基本宽度
  var canvasWidth = Math.max(600, dataCount * baseWidth);
  var canvasHeight = 500;
  
  // 检查是否需要水平滚动
  var needHorizontalScroll = canvasWidth > that.data.screenWidth;
  
  that.setData({
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    needHorizontalScroll: needHorizontalScroll
  }, function() {
    // 重新绘制图表
    setTimeout(() => {
      that.drawChartByType(config.type, chartData, config);
    }, 100);
  });
},

  /**
 * 阻止事件冒泡
 */
stopPropagation: function(e) {
  // 空函数，仅用于阻止事件冒泡
},

  /**
 * 加载图表配置 - 仅用于初始加载
 */
loadChartConfigs: function() {
  var that = this;
  
  wx.showLoading({
    title: '加载配置中...'
  });
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select * from gongzi_tongjitu where gongsi = '" + that.data.companyName + "' order by id"
    },
    success: res => {
      wx.hideLoading();
      
      var configs = res.result.recordset || [];
      
      // 解析配置字段
      configs.forEach(config => {
        if (config.config_data) {
          try {
            config.config = JSON.parse(config.config_data);
          } catch (e) {
            config.config = {};
          }
        }
      });
      
      that.setData({
        chartConfigs: configs
      });
      
      console.log('初始加载图表配置完成，数量:', configs.length);
      
      // 如果有配置，显示第一个图表
      if (configs.length > 0) {
        // 延迟一下，确保页面渲染完成
        setTimeout(() => {
          that.showChart(0);
        }, 500);
      }
    },
    err: res => {
      wx.hideLoading();
      console.log("加载图表配置错误:", res);
      wx.showToast({
        title: '加载配置失败',
        icon: 'none'
      });
    }
  });
},

  /**
   * 显示图表配置模态框
   */
  showChartModal: function(e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    
    if (index !== undefined && index >= 0) {
      // 编辑模式
      var config = that.data.chartConfigs[index];
      var configData = config.config || {};
      
      // 计算当前图表类型的索引
      var currentTypeIndex = 0;
      for (var i = 0; i < that.data.chartTypes.length; i++) {
        if (that.data.chartTypes[i].value === (configData.type || 'bar')) {
          currentTypeIndex = i;
          break;
        }
      }
      
      that.setData({
        showChartModal: true,
        editingIndex: index,
        currentTypeIndex: currentTypeIndex,
        configForm: {
          name: config.name || '',
          type: configData.type || 'bar',
          xAxisField: configData.xAxisField !== undefined ? configData.xAxisField : -1,
          yAxisField: configData.yAxisField !== undefined ? configData.yAxisField : -1,
          yAxisFields: configData.yAxisFields || [],
          chartTitle: configData.chartTitle || '',
          showLegend: configData.showLegend !== undefined ? configData.showLegend : true,
          showGrid: configData.showGrid !== undefined ? configData.showGrid : true,
          colors: configData.colors || ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0']
        }
      });
    } else {
      // 新增模式
      that.setData({
        showChartModal: true,
        editingIndex: -1,
        currentTypeIndex: 0, // 默认选择第一个（柱状图）
        configForm: {
          name: '',
          type: 'bar',
          xAxisField: -1,
          yAxisField: -1,
          yAxisFields: [],
          chartTitle: '',
          showLegend: true,
          showGrid: true,
          colors: ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0']
        }
      });
    }
  },

  /**
   * 隐藏图表配置模态框
   */
  hideChartModal: function() {
    this.setData({
      showChartModal: false
    });
  },

  /**
   * 图表类型选择变化
   */
  onTypeChange: function(e) {
    console.log('onTypeChange 触发，值:', e.detail.value);
    
    var selectedIndex = parseInt(e.detail.value);
    console.log('selectedIndex:', selectedIndex);
    
    if (selectedIndex >= 0 && selectedIndex < this.data.chartTypes.length) {
      var selectedType = this.data.chartTypes[selectedIndex].value;
      console.log('selectedType:', selectedType);
      
      // 直接更新configForm中的type字段
      this.setData({
        currentTypeIndex: selectedIndex,
        'configForm.type': selectedType
      });
      
      console.log('更新后的configForm.type:', this.data.configForm.type);
    }
  },
  

  /**
   * X轴字段选择变化
   */
  onXAxisChange: function(e) {
    var value = parseInt(e.detail.value);
    var configForm = this.data.configForm;
    configForm.xAxisField = value;
    this.setData({
      configForm: configForm
    });
  },

  /**
   * Y轴字段选择变化（单字段）
   */
  onYAxisChange: function(e) {
    var value = parseInt(e.detail.value);
    var configForm = this.data.configForm;
    configForm.yAxisField = value;
    this.setData({
      configForm: configForm
    });
  },

  /**
   * 添加Y轴字段（多字段）
   */
  addYAxisField: function() {
    var configForm = this.data.configForm;
    configForm.yAxisFields.push(-1);
    this.setData({
      configForm: configForm
    });
  },

  /**
   * 移除Y轴字段（多字段）
   */
  removeYAxisField: function(e) {
    var index = e.currentTarget.dataset.index;
    var configForm = this.data.configForm;
    configForm.yAxisFields.splice(index, 1);
    this.setData({
      configForm: configForm
    });
  },

  /**
   * 多Y轴字段选择变化
   */
  onYAxisFieldsChange: function(e) {
    var index = e.currentTarget.dataset.index;
    var value = parseInt(e.detail.value);
    var configForm = this.data.configForm;
    configForm.yAxisFields[index] = value;
    this.setData({
      configForm: configForm
    });
  },

  /**
   * 输入图表名称
   */
  onNameInput: function(e) {
    var value = e.detail.value;
    var configForm = this.data.configForm;
    configForm.name = value;
    this.setData({
      configForm: configForm
    });
  },

  /**
   * 输入图表标题
   */
  onTitleInput: function(e) {
    var value = e.detail.value;
    var configForm = this.data.configForm;
    configForm.chartTitle = value;
    this.setData({
      configForm: configForm
    });
  },

  /**
   * 切换显示图例
   */
  toggleLegend: function() {
    var configForm = this.data.configForm;
    configForm.showLegend = !configForm.showLegend;
    this.setData({
      configForm: configForm
    });
  },

  /**
   * 切换显示网格
   */
  toggleGrid: function() {
    var configForm = this.data.configForm;
    configForm.showGrid = !configForm.showGrid;
    this.setData({
      configForm: configForm
    });
  },

  /**
   * 保存图表配置
   */
  saveChartConfig: function() {
    var that = this;
    var configForm = that.data.configForm;
    
    // 验证输入
    if (!configForm.name.trim()) {
      wx.showToast({
        title: '请输入图表名称',
        icon: 'none'
      });
      return;
    }
    
    if (configForm.xAxisField < 0) {
      wx.showToast({
        title: '请选择X轴字段',
        icon: 'none'
      });
      return;
    }
    
    // 验证Y轴字段
    var hasYAxisField = false;
    if (configForm.yAxisField >= 0) {
      hasYAxisField = true;
    }
    if (configForm.yAxisFields && configForm.yAxisFields.length > 0) {
      for (var i = 0; i < configForm.yAxisFields.length; i++) {
        if (configForm.yAxisFields[i] >= 0) {
          hasYAxisField = true;
          break;
        }
      }
    }
    
    if (!hasYAxisField) {
      wx.showToast({
        title: '请至少选择一个Y轴字段',
        icon: 'none'
      });
      return;
    }
    
    // 准备配置数据
    var configData = {
      type: configForm.type,
      xAxisField: configForm.xAxisField,
      yAxisField: configForm.yAxisField,
      yAxisFields: configForm.yAxisFields.filter(f => f >= 0),
      chartTitle: configForm.chartTitle,
      showLegend: configForm.showLegend,
      showGrid: configForm.showGrid,
      colors: configForm.colors
    };
    
    var sql;
    if (that.data.editingIndex >= 0) {
      // 更新现有配置
      var configId = that.data.chartConfigs[that.data.editingIndex].id;
      sql = "update gongzi_tongjitu set name = '" + configForm.name + 
            "', config_data = '" + JSON.stringify(configData) + 
            "' where id = " + configId + " and gongsi = '" + that.data.companyName + "'";
    } else {
      // 插入新配置
      sql = "insert into gongzi_tongjitu (gongsi, name, config_data) values ('" + 
            that.data.companyName + "', '" + configForm.name + "', '" + 
            JSON.stringify(configData) + "')";
    }
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: { query: sql },
      success: res => {
        console.log("图表配置保存成功");
        
        // 重新加载配置
        that.loadChartConfigs();
        
        // 关闭模态框
        that.hideChartModal();
        
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
      },
      err: res => {
        console.log("保存图表配置错误:", res);
        wx.showToast({
          title: '保存失败',
          icon: 'error'
        });
      }
    });
  },

  /**
   * 删除图表配置
   */
  deleteChartConfig: function(e) {
    var that = this;
    var configId = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个图表配置吗？',
      success: function(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: "delete from gongzi_tongjitu where id = " + configId + 
                     " and gongsi = '" + that.data.companyName + "'"
            },
            success: res => {
              console.log("图表配置删除成功");
              
              // 更新本地配置列表
              var newConfigs = that.data.chartConfigs.filter(function(item) {
                return item.id != configId;
              });
              
              that.setData({
                chartConfigs: newConfigs,
                currentChart: null
              });
              
              wx.showToast({
                title: '已删除',
                icon: 'success'
              });
            },
            err: res => {
              console.log("删除图表配置错误:", res);
              wx.showToast({
                title: '删除失败',
                icon: 'error'
              });
            }
          });
        }
      }
    });
  },

/**
 * 显示图表 - 从数据库获取最新配置
 */
showChart: function(e) {
  var that = this;
  
  console.log('显示图表，事件对象:', e);
  
  // 从事件对象中获取索引
  var index;
  if (e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.index !== undefined) {
    index = parseInt(e.currentTarget.dataset.index);
    console.log('从dataset获取的索引:', index);
  } else if (typeof e === 'number') {
    // 如果是直接传递的索引（从代码中调用，如初始加载）
    index = e;
    console.log('直接传递的索引:', index);
  } else {
    console.error('无法获取索引，使用默认值0');
    index = 0;
  }
  
  console.log('最终使用的索引:', index);
  
  // 先检查是否有基本数据
  if (!that.data.dynamicTitles || that.data.dynamicTitles.length === 0) {
    wx.showToast({
      title: '请先加载数据',
      icon: 'none'
    });
    return;
  }
  
  // 显示加载提示
  wx.showLoading({
    title: '加载图表中...',
    mask: true
  });
  
  // 从数据库获取最新的图表配置
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select * from gongzi_tongjitu where gongsi = '" + that.data.companyName + "' order by id"
    },
    success: res => {
      wx.hideLoading();
      
      var configs = res.result.recordset || [];
      
      console.log('从数据库获取的配置数量:', configs.length);
      
      if (configs.length === 0) {
        wx.showToast({
          title: '没有图表配置',
          icon: 'none'
        });
        return;
      }
      
      // 检查索引是否有效
      if (isNaN(index) || index < 0 || index >= configs.length) {
        console.warn('索引无效，调整为0。原索引:', index, '配置数量:', configs.length);
        index = 0;
      }
      
      var config = configs[index];
      
      // 检查config是否存在
      if (!config) {
        console.error('config 是 undefined!');
        wx.showToast({
          title: '配置获取失败',
          icon: 'none'
        });
        return;
      }
      
      // 解析配置字段
      if (config.config_data) {
        try {
          config.config = JSON.parse(config.config_data);
        } catch (e) {
          console.error('JSON解析错误:', e);
          config.config = {};
        }
      } else {
        config.config = {};
      }
      
      // 检查配置是否有效
      if (!config.config || Object.keys(config.config).length === 0) {
        console.error('图表配置为空或无效');
        wx.showToast({
          title: '图表配置无效',
          icon: 'none'
        });
        return;
      }
      
      // 更新所有配置的解析结果
      configs.forEach(item => {
        if (item && item.config_data) {
          try {
            item.config = JSON.parse(item.config_data);
          } catch (e) {
            item.config = {};
          }
        }
      });
      
      // 生成图表数据
      var chartData = that.generateChartData(config.config);

      that.adjustCanvasSize(config.config);
      
      console.log('生成的图表数据:', chartData);
      
      // 更新数据
      that.setData({
        chartConfigs: configs,
        currentChart: index,
        chartData: chartData
      }, function() {
        // 绘制图表
        that.drawChartByType(config.config.type, chartData, config.config);
        
        console.log('图表显示完成');
        wx.showToast({
          title: '图表已加载',
          icon: 'success',
          duration: 1000
        });
      });
    },
    err: res => {
      wx.hideLoading();
      console.log("从数据库获取配置错误:", res);
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      });
    }
  });
},
 /**
   * 根据图表类型绘制图表
   */
  drawChartByType: function(chartType, chartData, config) {
    var that = this;
    
    switch(chartType) {
      case 'bar':
        that.drawBarChart(chartData, config);
        break;
      case 'line':
        that.drawLineChart(chartData, config);
        break;
      case 'pie':
        that.drawPieChart(chartData, config);
        break;
      case 'radar':
        that.drawRadarChart(chartData, config);
        break;
      default:
        that.drawBarChart(chartData, config); // 默认柱状图
    }
  },

  /**
   * 绘制柱状图
   */
  drawBarChart: function(chartData, config) {
    var that = this;
    
    // 创建 canvas 上下文
    const ctx = wx.createCanvasContext('chartCanvas');
    const canvasWidth = 300; // canvas宽度
    const canvasHeight = 200; // canvas高度
    const padding = 30; // 内边距
    const chartWidth = canvasWidth - padding * 2;
    const chartHeight = canvasHeight - padding * 2;
    
    if (!chartData.xAxisData || chartData.xAxisData.length === 0) {
      return;
    }
    
    // 清除画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // 绘制背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // 绘制标题
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(config.chartTitle || '柱状图', canvasWidth / 2, 30);
    
    // 计算数据范围和比例
    var data = chartData.seriesData[0] ? chartData.seriesData[0].data : [];
    var maxValue = Math.max(...data, 1);
    var barWidth = chartWidth / data.length * 0.6;
    var scaleY = chartHeight / maxValue;
    
    // 绘制坐标轴
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    
    // Y轴
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.stroke();
    
    // X轴
    ctx.beginPath();
    ctx.moveTo(padding, padding + chartHeight);
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.stroke();
    
    // 绘制数据
    var colors = config.colors || ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0'];
    
    data.forEach((value, index) => {
      var x = padding + (index + 0.2) * (chartWidth / data.length);
      var barHeight = value * scaleY;
      var y = padding + chartHeight - barHeight;
      
      // 绘制柱状图
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // 绘制数值标签
      ctx.fillStyle = '#666666';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(value.toFixed(0), x + barWidth / 2, y - 5);
      
      // 绘制X轴标签
      var label = chartData.xAxisData[index];
      if (label.length > 4) {
        label = label.substring(0, 4) + '...';
      }
      ctx.fillText(label, x + barWidth / 2, padding + chartHeight + 20);
    });
    
    // 绘制Y轴刻度
    for (var i = 0; i <= 5; i++) {
      var yValue = (maxValue / 5) * i;
      var y = padding + chartHeight - (yValue * scaleY);
      
      ctx.strokeStyle = '#f0f0f0';
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
      
      ctx.fillStyle = '#666666';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(yValue.toFixed(0), padding - 5, y + 4);
    }
    
    // 执行绘制
    ctx.draw();
  },

  /**
   * 绘制折线图
   */
  drawLineChart: function(chartData, config) {
    var that = this;
    
    // 创建 canvas 上下文
    const ctx = wx.createCanvasContext('chartCanvas');
    const canvasWidth = 300;
    const canvasHeight = 200;
    const padding = 30;
    const chartWidth = canvasWidth - padding * 2;
    const chartHeight = canvasHeight - padding * 2;
    
    if (!chartData.xAxisData || chartData.xAxisData.length === 0) {
      return;
    }
    
    // 清除画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // 绘制背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // 绘制标题
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(config.chartTitle || '折线图', canvasWidth / 2, 30);
    
    // 计算数据范围和比例
    var data = chartData.seriesData[0] ? chartData.seriesData[0].data : [];
    var maxValue = Math.max(...data, 1);
    var scaleY = chartHeight / maxValue;
    var pointWidth = chartWidth / (data.length - 1);
    
    // 绘制坐标轴
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    
    // Y轴
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.stroke();
    
    // X轴
    ctx.beginPath();
    ctx.moveTo(padding, padding + chartHeight);
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.stroke();
    
    // 绘制折线
    var colors = config.colors || ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0'];
    
    ctx.beginPath();
    data.forEach((value, index) => {
      var x = padding + index * pointWidth;
      var y = padding + chartHeight - (value * scaleY);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制数据点
    data.forEach((value, index) => {
      var x = padding + index * pointWidth;
      var y = padding + chartHeight - (value * scaleY);
      
      // 绘制点
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = colors[0];
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // 绘制数值标签
      ctx.fillStyle = '#666666';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(value.toFixed(0), x, y - 10);
      
      // 绘制X轴标签
      var label = chartData.xAxisData[index];
      if (label.length > 4) {
        label = label.substring(0, 4) + '...';
      }
      ctx.fillText(label, x, padding + chartHeight + 20);
    });
    
    // 绘制Y轴刻度
    for (var i = 0; i <= 5; i++) {
      var yValue = (maxValue / 5) * i;
      var y = padding + chartHeight - (yValue * scaleY);
      
      ctx.strokeStyle = '#f0f0f0';
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
      
      ctx.fillStyle = '#666666';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(yValue.toFixed(0), padding - 5, y + 4);
    }
    
    // 执行绘制
    ctx.draw();
  },

  /**
   * 绘制饼图
   */
  drawPieChart: function(chartData, config) {
    var that = this;
    
    // 创建 canvas 上下文
    const ctx = wx.createCanvasContext('chartCanvas');
    const canvasWidth = 300;
    const canvasHeight = 300;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radius = Math.min(canvasWidth, canvasHeight) * 0.3;
    
    if (!chartData.xAxisData || chartData.xAxisData.length === 0) {
      return;
    }
    
    // 清除画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // 绘制背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // 绘制标题
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(config.chartTitle || '饼图', canvasWidth / 2, 30);
    
    // 计算数据总和
    var data = chartData.seriesData[0] ? chartData.seriesData[0].data : [];
    var total = data.reduce((sum, value) => sum + value, 0);
    if (total === 0) return;
    
    // 绘制饼图
    var colors = config.colors || ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0'];
    var startAngle = 0;
    
    data.forEach((value, index) => {
      var sliceAngle = (value / total) * Math.PI * 2;
      
      // 绘制扇形
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      
      // 绘制百分比标签
      var percent = (value / total * 100).toFixed(1);
      var midAngle = startAngle + sliceAngle / 2;
      var labelRadius = radius * 0.7;
      var labelX = centerX + Math.cos(midAngle) * labelRadius;
      var labelY = centerY + Math.sin(midAngle) * labelRadius;
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(percent + '%', labelX, labelY);
      
      startAngle += sliceAngle;
    });
    
    // 绘制图例
    var legendX = canvasWidth - 150;
    var legendY = 100;
    
    data.forEach((value, index) => {
      var label = chartData.xAxisData[index];
      if (label.length > 6) {
        label = label.substring(0, 6) + '...';
      }
      
      // 绘制颜色方块
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(legendX, legendY + index * 25, 12, 12);
      
      // 绘制标签
      ctx.fillStyle = '#333333';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(label + ' (' + value + ')', legendX + 20, legendY + index * 25 + 9);
    });
    
    // 执行绘制
    ctx.draw();
  },

  /**
   * 绘制雷达图
   */
  drawRadarChart: function(chartData, config) {
    var that = this;
    
    // 创建 canvas 上下文
    const ctx = wx.createCanvasContext('chartCanvas');
    const canvasWidth = 650;
    const canvasHeight = 400;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radarRadius = Math.min(canvasWidth, canvasHeight) * 0.3;
    
    if (!chartData.xAxisData || chartData.xAxisData.length === 0) {
      return;
    }
    
    // 清除画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // 绘制背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // 绘制标题
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(config.chartTitle || '雷达图', canvasWidth / 2, 30);
    
    // 计算数据
    var data = chartData.seriesData[0] ? chartData.seriesData[0].data : [];
    var maxValue = Math.max(...data, 1);
    var count = data.length;
    
    // 绘制雷达网格
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // 绘制多边形
    for (var level = 1; level <= 5; level++) {
      ctx.beginPath();
      var levelRadius = radarRadius * (level / 5);
      
      for (var i = 0; i < count; i++) {
        var angle = (Math.PI * 2 * i / count) - Math.PI / 2;
        var x = centerX + Math.cos(angle) * levelRadius;
        var y = centerY + Math.sin(angle) * levelRadius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }
    
    // 绘制轴线
    for (var i = 0; i < count; i++) {
      var angle = (Math.PI * 2 * i / count) - Math.PI / 2;
      var x = centerX + Math.cos(angle) * radarRadius;
      var y = centerY + Math.sin(angle) * radarRadius;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // 绘制维度标签
      var label = chartData.xAxisData[i];
      if (label.length > 4) {
        label = label.substring(0, 4) + '...';
      }
      
      var labelX = centerX + Math.cos(angle) * (radarRadius + 20);
      var labelY = centerY + Math.sin(angle) * (radarRadius + 20);
      
      ctx.fillStyle = '#666666';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, labelX, labelY);
    }
    
    // 绘制数据多边形
    ctx.beginPath();
    var colors = config.colors || ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0'];
    
    for (var i = 0; i < count; i++) {
      var value = data[i] || 0;
      var angle = (Math.PI * 2 * i / count) - Math.PI / 2;
      var pointRadius = radarRadius * (value / maxValue);
      var x = centerX + Math.cos(angle) * pointRadius;
      var y = centerY + Math.sin(angle) * pointRadius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    
    ctx.fillStyle = colors[0] + '40'; // 添加透明度
    ctx.fill();
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制数据点
    for (var i = 0; i < count; i++) {
      var value = data[i] || 0;
      var angle = (Math.PI * 2 * i / count) - Math.PI / 2;
      var pointRadius = radarRadius * (value / maxValue);
      var x = centerX + Math.cos(angle) * pointRadius;
      var y = centerY + Math.sin(angle) * pointRadius;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = colors[0];
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // 绘制数值标签
      ctx.fillStyle = '#666666';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(value.toFixed(0), x, y - 10);
    }
    
    // 执行绘制
    ctx.draw();
  },

getSafeConfig: function(configs, index) {
  if (!configs || !Array.isArray(configs)) {
    console.error('配置列表无效');
    return null;
  }
  
  if (configs.length === 0) {
    console.error('配置列表为空');
    return null;
  }
  
  // 确保index是数字
  var idx = parseInt(index);
  if (isNaN(idx)) {
    console.error('索引不是数字:', index);
    idx = 0;
  }
  
  // 确保索引在有效范围内
  if (idx < 0 || idx >= configs.length) {
    console.error('索引超出范围:', idx, '配置数量:', configs.length);
    idx = 0;
  }
  
  var config = configs[idx];
  
  if (!config) {
    console.error('配置对象不存在，索引:', idx);
    // 尝试返回第一个配置
    config = configs[0];
    if (!config) {
      return null;
    }
  }
  
  return {
    config: config,
    index: idx
  };
},

  /**
   * 生成图表数据
   */
  generateChartData: function(config) {
    var that = this;
    var data = that.data.list;
    var dynamicTitles = that.data.dynamicTitles;
    
    console.log('生成图表数据，配置:', config);
    console.log('数据条数:', data.length);
    console.log('字段数量:', dynamicTitles.length);
    
    var chartData = {
      xAxisData: [],      // X轴数据
      seriesData: [],     // 系列数据
      seriesNames: [],    // 系列名称
      legendData: []      // 图例数据
    };
    
    // 确保图表类型有效
    var validTypes = ['bar', 'line', 'pie', 'radar'];
    var chartType = validTypes.includes(config.type) ? config.type : 'bar';
    
    // 获取X轴数据
    if (config.xAxisField >= 0 && config.xAxisField < dynamicTitles.length) {
      data.forEach(function(item) {
        var xValue = item['col_' + config.xAxisField] || '';
        if (xValue && xValue.trim() !== '') {
          chartData.xAxisData.push(xValue);
        } else {
          chartData.xAxisData.push('空');
        }
      });
    }
    
    // 获取Y轴数据
    var yAxisFields = [];
    
    // 添加单字段配置
    if (config.yAxisField >= 0 && config.yAxisField < dynamicTitles.length) {
      yAxisFields.push(config.yAxisField);
    }
    
    // 添加多字段配置
    if (config.yAxisFields && config.yAxisFields.length > 0) {
      config.yAxisFields.forEach(function(fieldIndex) {
        if (fieldIndex >= 0 && fieldIndex < dynamicTitles.length) {
          yAxisFields.push(fieldIndex);
        }
      });
    }
    
    // 去重
    yAxisFields = [...new Set(yAxisFields)];
    
    console.log('Y轴字段索引:', yAxisFields);
    
    // 为每个Y轴字段生成数据系列
    yAxisFields.forEach(function(fieldIndex) {
      var fieldName = dynamicTitles[fieldIndex] ? dynamicTitles[fieldIndex].text : '字段' + (fieldIndex + 1);
      var series = {
        name: fieldName,
        type: chartType,  // 使用验证后的类型
        data: []
      };
      
      data.forEach(function(item) {
        var yValue = item['col_' + fieldIndex] || '0';
        // 转换为数字
        var numValue = parseFloat(yValue);
        if (isNaN(numValue)) {
          numValue = 0;
        }
        series.data.push(numValue);
      });
      
      chartData.seriesData.push(series);
      chartData.seriesNames.push(fieldName);
      chartData.legendData.push(fieldName);
    });
    
    console.log('生成的chartData:', {
      xAxisData: chartData.xAxisData,
      seriesNames: chartData.seriesNames,
      seriesDataLength: chartData.seriesData.length
    });
    
    return chartData;
  },

  /**
   * 生成图表配置选项
   */
  generateChartOption: function(chartData, config) {
    var colors = config.colors || ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0'];
    
    // 基础配置
    var option = {
      title: {
        text: config.chartTitle || '动态统计图表',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(50, 50, 50, 0.7)',
        textStyle: {
          color: '#fff'
        }
      },
      legend: {
        show: config.showLegend,
        data: chartData.legendData,
        top: 40,
        textStyle: {
          color: '#666'
        }
      },
      grid: {
        show: config.showGrid,
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: config.showLegend ? '20%' : '15%',
        containLabel: true,
        borderColor: '#f0f0f0',
        backgroundColor: '#fff'
      },
      color: colors,
      xAxis: {
        type: 'category',
        data: chartData.xAxisData,
        axisLabel: {
          color: '#666',
          rotate: config.type === 'bar' ? 0 : 0
        },
        axisLine: {
          lineStyle: {
            color: '#d9d9d9'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#666'
        },
        axisLine: {
          lineStyle: {
            color: '#d9d9d9'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0',
            type: 'dashed'
          }
        }
      },
      series: chartData.seriesData
    };
    
    // 根据图表类型调整配置
    if (config.type === 'pie') {
      // 饼图特殊配置
      option.tooltip = {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      };
      
      option.legend = {
        show: config.showLegend,
        orient: 'vertical',
        left: 'left',
        top: 'middle',
        data: chartData.legendData
      };
      
      option.series = [{
        name: config.chartTitle || '数据分布',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: chartData.xAxisData.map((name, index) => {
          return {
            name: name,
            value: chartData.seriesData[0] ? chartData.seriesData[0].data[index] || 0 : 0
          };
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }];
      
      delete option.xAxis;
      delete option.yAxis;
      delete option.grid;
    } else if (config.type === 'radar') {
      // 雷达图特殊配置
      option.radar = {
        indicator: chartData.xAxisData.map(name => {
          return { name: name, max: Math.max(...chartData.seriesData.map(s => Math.max(...s.data))) || 100 };
        })
      };
      
      option.series = [{
        type: 'radar',
        data: chartData.seriesData.map((series, index) => {
          return {
            value: series.data,
            name: series.name
          };
        })
      }];
      
      delete option.xAxis;
      delete option.yAxis;
      delete option.grid;
    }
    
    return option;
  },

  /**
 * 刷新图表
 */
refreshChart: function() {
  var that = this;
  if (that.data.currentChart !== null) {
    // 直接调用showChart，它会重新从数据库获取
    that.showChart(that.data.currentChart);
  } else {
    wx.showToast({
      title: '请先选择图表',
      icon: 'none'
    });
  }
},

  /**
   * 导出图表为图片
   */
  exportChartImage: function() {
    var that = this;
    if (that.data.currentChart === null) {
      wx.showToast({
        title: '请先选择图表',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '正在生成图片...'
    });
    
    // 使用 canvasToTempFilePath 导出图片
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'chartCanvas',
        success: function(res) {
          // 保存图片到相册
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function() {
              wx.hideLoading();
              wx.showToast({
                title: '图片已保存到相册',
                icon: 'success'
              });
            },
            fail: function(err) {
              wx.hideLoading();
              console.error('保存图片失败:', err);
              wx.showToast({
                title: '保存失败，请检查权限',
                icon: 'none'
              });
            }
          });
        },
        fail: function(err) {
          wx.hideLoading();
          console.error('生成图片失败:', err);
          wx.showToast({
            title: '生成图片失败',
            icon: 'none'
          });
        }
      });
    }, 500);
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
  // 获取图表类型名称的辅助函数
  getChartTypeName: function(type) {
    console.log('getChartTypeName called with:', type); // 调试日志
    
    if (!type) return '';
    
    var chartTypes = this.data.chartTypes;
    for (var i = 0; i < chartTypes.length; i++) {
      if (chartTypes[i].value === type) {
        return chartTypes[i].name;
      }
    }
    return type; // 如果找不到，返回原始值
  },
  /**
 * 获取图表类型在数组中的索引
 */
  getChartTypeIndex: function(type) {
    if (!type) return 0;
    
    var chartTypes = this.data.chartTypes;
    for (var i = 0; i < chartTypes.length; i++) {
      if (chartTypes[i].value === type) {
        return i;
      }
    }
    return 0;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '动态统计图表',
      path: '/pages/1statistics/statistics'
    };
  }
});