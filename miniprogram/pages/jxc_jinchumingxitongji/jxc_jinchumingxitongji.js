import * as echarts from '../../pages/components/ec-canvas/echarts'
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hid_view: false,
    userInfo: [],
    ec: {
      lazyLoad: true
    },
    others: [1, 0, 0],
    dangqian: '',
    riqi1: '',
    riqi2: '',
    // 新增滑块配置
    sliderConfig: {
      show: false,
      start: 0,
      end: 100,
      xAxisData: []
    }
  },

  updOthers: function(index) {
    var _this = this;
    for (let i = 0; i < _this.data.others.length; i++) {
      _this.setData({
        ["others[" + i + "]"]: 0
      })
    }
    _this.setData({
      ["others[" + index + "]"]: 1
    })
  },

  date_cha: function() {
    var _this = this;
    var stop_date
    var start_date
    if (_this.data.riqi1 != "") {
      start_date = _this.data.riqi1
      stop_date = _this.data.riqi2
      if (start_date > stop_date) {
        wx.showToast({
          title: '开始时间不能大于结束时间',
          icon: "none",
          duration: 1000
        })
        return
      }
      console.log(_this.data.dangqian)
      if (_this.data.dangqian == "getAccounting") {
        _this.getAccounting()
      } else if (_this.data.dangqian == "getSummary") {
        _this.getSummary()
      } else if (_this.data.dangqian == "getAccountingBalance") {
        _this.getAccountingBalance()
      }
    } else {
      wx.showToast({
        title: '必须输入开始日期',
        icon: "none",
        duration: 1000
      })
    }
  },

  choiceDate: function(e) {
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  // 1. 退货趋势分析（折线图）
  getAccounting: function() {
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;
    var company = userInfo.company || '';
    var gongsi = app.globalData.gongsi || '';

    _this.setData({
      dangqian: "getAccounting"
    })

    // 设置日期范围
    var start_date = _this.data.riqi1 || "1900-01-01";
    var stop_date = _this.data.riqi2 || "2100-12-31";

    // 根据数据库类型执行查询
    if (app.globalData.shujuku == 0) {
      // MySQL数据库
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "SELECT shijian, SUM(cpsl) as total_cpsl " +
            "FROM yh_jinxiaocun_mingxi " +
            "WHERE mxtype IN ('入库', '出库', '调拨入库', '调拨出库', '盘亏出库', '盘盈入库') " +
            "AND shijian >= '" + start_date + "' " +
            "AND shijian <= '" + stop_date + "' " +
            "AND gs_name = '" + gongsi + "' " +
            "GROUP BY shijian " +
            "ORDER BY shijian"
        },
        success: res => {
          _this.processAccountingData(res.result || []);
        },
        err: res => {
          console.log("错误!", res);
          wx.hideLoading();
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    } else if (app.globalData.shujuku == 1) {
      // SQL Server数据库
      wx.cloud.callFunction({
        name: "sqlServer_cw",
        data: {
          query: "SELECT shijian, SUM(cpsl) as total_cpsl " +
            "FROM yh_jinxiaocun_excel.dbo.yh_jinxiaocun_mingxi_mssql " +
            "WHERE mxtype IN ('入库', '出库', '调拨入库', '调拨出库', '盘亏出库', '盘盈入库') " +
            "AND shijian >= '" + start_date + "' " +
            "AND shijian <= '" + stop_date + "' " +
            "AND gs_name = '" + gongsi + "' " +
            "GROUP BY shijian " +
            "ORDER BY shijian"
        },
        success: res => {
          _this.processAccountingData(res.result.recordset || []);
        },
        err: res => {
          console.log("错误!", res);
          wx.hideLoading();
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  },

  // 处理退货趋势分析数据
  processAccountingData: function(data) {
    var _this = this;
    console.log('趋势分析数据:', data);
    console.log('数据长度:', data.length);
  
    // 1. 首先对日期进行标准化和排序
    var sortedData = this.sortAndFormatDateData(data);
    
    // 提取x轴和y轴数据
    var xData = [];
    var yData = [];
  
    for (let i = 0; i < sortedData.length; i++) {
      xData.push(sortedData[i].formattedDate || sortedData[i].shijian);
      yData.push(sortedData[i].total_cpsl || 0);
    }
  
    // 如果没有数据，显示提示
    if (sortedData.length === 0) {
      xData = ['暂无数据'];
      yData = [0];
    }
  
    console.log('处理后的xData:', xData);
    console.log('处理后的yData:', yData);

    // 设置滑块配置
    var sliderStart = 0;
    var sliderEnd = 100;
    
    // 如果数据点超过10个，启用滑块
    if (xData.length > 10) {
      sliderEnd = Math.floor((10 / xData.length) * 100);
    }
    
    _this.setData({
      'sliderConfig.show': xData.length > 10,
      'sliderConfig.start': sliderStart,
      'sliderConfig.end': sliderEnd,
      'sliderConfig.xAxisData': xData
    });
  
    var options = {
      title: {
        text: '退货趋势分析',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: "axis",
        formatter: function(params) {
          var date = params[0].axisValue;
          var value = params[0].data;
          return date + '<br/>退货数量: ' + value;
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: xData.length > 10 ? '25%' : '15%',
        containLabel: true
      },
      xAxis: [{
        type: "category",
        data: xData,
        axisLabel: {
          rotate: 45, // 日期倾斜显示
          interval: 0,
          formatter: function(value) {
            // 简化日期显示，只显示月-日
          
            return value.substring(0, 10).replace(/-/g, '/');
          }
        },
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: "value",
        name: '退货数量',
        splitNumber: 8,
        axisLabel: {
          formatter: '{value}'
        }
      }],
      series: [{
        name: "退货数量",
        type: "line",
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        label: {
          show: true,
          position: "top",
          formatter: '{c}'
        },
        itemStyle: {
          color: "#1890FF"
        },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(24, 144, 255, 0.6)' },
            { offset: 1, color: 'rgba(24, 144, 255, 0.1)' }
          ])
        },
        data: yData
      }],
      // 添加数据区域缩放组件
      dataZoom: xData.length > 10 ? [
        {
          type: 'inside', // 内置型数据区域缩放组件
          xAxisIndex: 0, // 控制第一个x轴
          start: sliderStart, // 起始百分比
          end: sliderEnd, // 结束百分比
          zoomLock: true, // 是否锁定选择区域
          filterMode: 'filter' // 筛选模式
        },
        {
          type: 'slider', // 滑动条型数据区域缩放组件
          xAxisIndex: 0,
          start: sliderStart,
          end: sliderEnd,
          height: 30, // 滑块高度
          bottom: 10, // 距离底部距离
          borderColor: '#ddd',
          fillerColor: 'rgba(24, 144, 255, 0.2)',
          handleStyle: {
            color: '#1890FF'
          },
          brushStyle: {
            color: 'rgba(24, 144, 255, 0.3)'
          }
        }
      ] : []
    };
  
    console.log('ECharts配置:', options);
    
    // 先检查组件是否存在
    var chartComponent = this.selectComponent('#mychart-dom-bar');
    if (!chartComponent) {
      console.error('图表组件未找到！');
      wx.hideLoading();
      wx.showToast({
        title: '图表组件加载失败',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    console.log('找到图表组件:', chartComponent);
    
    _this.updChart(options);
    _this.updOthers(0);
    wx.hideLoading();
  },
  
  // 新增：日期排序和格式化函数
  sortAndFormatDateData: function(data) {
    if (!data || data.length === 0) return [];
    
    // 复制数组以避免修改原数据
    var formattedData = [...data];
    
    // 对日期进行排序
    formattedData.sort(function(a, b) {
      var dateA = this.parseDate(a.shijian);
      var dateB = this.parseDate(b.shijian);
      return dateA - dateB;
    }.bind(this));
    
    // 格式化日期显示
    for (let i = 0; i < formattedData.length; i++) {
      var dateStr = formattedData[i].shijian;
      var date = this.parseDate(dateStr);
      
      // 格式化为 YYYY-MM-DD 格式显示
      var year = date.getFullYear();
      var month = (date.getMonth() + 1).toString().padStart(2, '0');
      var day = date.getDate().toString().padStart(2, '0');
      var hours = date.getHours().toString().padStart(2, '0');
      var minutes = date.getMinutes().toString().padStart(2, '0');
      
      formattedData[i].formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
    }
    
    return formattedData;
  },
  
  // 新增：解析各种日期格式
  parseDate: function(dateStr) {
    if (!dateStr) return new Date();
    
    // 尝试不同的日期格式
    try {
      // 替换中文斜杠为英文斜杠
      dateStr = dateStr.replace(/[／/]/g, '/').replace(/[－-]/g, '-');
      
      // 如果日期包含时间
      if (dateStr.includes(' ')) {
        var parts = dateStr.split(' ');
        var datePart = parts[0];
        var timePart = parts[1];
        
        // 标准化日期部分
        datePart = datePart.replace(/\//g, '-');
        var dateComponents = datePart.split('-');
        
        // 确保日期格式正确
        if (dateComponents.length === 3) {
          var year = parseInt(dateComponents[0]);
          var month = parseInt(dateComponents[1]) - 1;
          var day = parseInt(dateComponents[2]);
          
          // 解析时间部分
          var timeComponents = timePart.split(':');
          var hour = timeComponents.length > 0 ? parseInt(timeComponents[0]) : 0;
          var minute = timeComponents.length > 1 ? parseInt(timeComponents[1]) : 0;
          var second = timeComponents.length > 2 ? parseInt(timeComponents[2]) : 0;
          
          return new Date(year, month, day, hour, minute, second);
        }
      }
      
      // 尝试直接解析
      return new Date(dateStr);
    } catch (e) {
      console.error('解析日期错误:', dateStr, e);
      return new Date();
    }
  },

  // 2. 退货排行对比（柱状图）
  getSummary: function() {
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    });
    var _this = this;
    var userInfo = _this.data.userInfo;
    var company = userInfo.company || '';
    var gongsi = app.globalData.gongsi || '';

    _this.setData({
      dangqian: "getSummary"
    });

    // 设置日期范围
    var start_date = _this.data.riqi1 || "1900-01-01";
    var stop_date = _this.data.riqi2 || "2100-12-31";

    // 根据数据库类型执行查询
    if (app.globalData.shujuku == 0) {
      // MySQL数据库
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "SELECT cpname, SUM(cpsl) as total_cpsl " +
            "FROM yh_jinxiaocun_mingxi " +
            "WHERE mxtype IN ('入库', '出库', '调拨入库', '调拨出库', '盘亏出库', '盘盈入库') " +
            "AND shijian >= '" + start_date + "' " +
            "AND shijian <= '" + stop_date + "' " +
            "AND gs_name = '" + gongsi + "' " +
            "GROUP BY cpname " +
            "ORDER BY total_cpsl DESC"
        },
        success: res => {
          _this.processSummaryData(res.result || []);
        },
        err: res => {
          console.log("错误!", res);
          wx.hideLoading();
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    } else if (app.globalData.shujuku == 1) {
      // SQL Server数据库
      wx.cloud.callFunction({
        name: "sqlServer_cw",
        data: {
          query: "SELECT cpname, SUM(cpsl) as total_cpsl " +
            "FROM yh_jinxiaocun_excel.dbo.yh_jinxiaocun_mingxi_mssql " +
            "WHERE mxtype IN ('入库', '出库', '调拨入库', '调拨出库', '盘亏出库', '盘盈入库') " +
            "AND shijian >= '" + start_date + "' " +
            "AND shijian <= '" + stop_date + "' " +
            "AND gs_name = '" + gongsi + "' " +
            "GROUP BY cpname " +
            "ORDER BY total_cpsl DESC"
        },
        success: res => {
          _this.processSummaryData(res.result.recordset || []);
        },
        err: res => {
          console.log("错误!", res);
          wx.hideLoading();
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  },

  // 处理退货排行对比数据
  processSummaryData: function(data) {
    var _this = this;
    console.log('排行对比数据:', data);

    // 提取x轴和y轴数据
    var xData = [];
    var yData = [];

    for (let i = 0; i < data.length; i++) {
      xData.push(data[i].cpname || '未命名');
      yData.push(data[i].total_cpsl || 0);
    }

    // 如果没有数据，显示提示
    if (data.length === 0) {
      xData = ['暂无数据'];
      yData = [0];
    }

    // 设置滑块配置
    var sliderStart = 0;
    var sliderEnd = 100;
    
    // 如果柱状图数据点超过8个，启用滑块
    if (xData.length > 8) {
      sliderEnd = Math.floor((8 / xData.length) * 100);
    }
    
    _this.setData({
      'sliderConfig.show': xData.length > 8,
      'sliderConfig.start': sliderStart,
      'sliderConfig.end': sliderEnd,
      'sliderConfig.xAxisData': xData
    });

    var options = {
      title: {
        text: '退货排行对比',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: function(params) {
          var name = params[0].axisValue;
          var value = params[0].data;
          return name + '<br/>退货数量: ' + value;
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: xData.length > 8 ? '25%' : '20%',
        containLabel: true
      },
      xAxis: [{
        type: "category",
        data: xData,
        axisLabel: {
          rotate: 45, // 产品名称倾斜显示
          interval: 0
        },
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: "value",
        name: '退货数量',
        splitNumber: 8
      }],
      series: [{
        name: "退货数量",
        type: "bar",
        label: {
          show: true,
          position: "top",
          formatter: '{c}'
        },
        itemStyle: {
          color: function(params) {
            // 使用渐变色
            var colorList = [
              '#1890FF', '#36CBCB', '#FADB14',
              '#F04864', '#975FE4', '#2FC25B'
            ];
            return colorList[params.dataIndex % colorList.length];
          }
        },
        barWidth: '60%',
        data: yData
      }],
      // 添加数据区域缩放组件
      dataZoom: xData.length > 8 ? [
        {
          type: 'inside', // 内置型数据区域缩放组件
          xAxisIndex: 0, // 控制第一个x轴
          start: sliderStart, // 起始百分比
          end: sliderEnd, // 结束百分比
          zoomLock: true, // 是否锁定选择区域
          filterMode: 'filter' // 筛选模式
        },
        {
          type: 'slider', // 滑动条型数据区域缩放组件
          xAxisIndex: 0,
          start: sliderStart,
          end: sliderEnd,
          height: 30, // 滑块高度
          bottom: 10, // 距离底部距离
          borderColor: '#ddd',
          fillerColor: 'rgba(24, 144, 255, 0.2)',
          handleStyle: {
            color: '#1890FF'
          },
          brushStyle: {
            color: 'rgba(24, 144, 255, 0.3)'
          }
        }
      ] : []
    };

    _this.updChart(options);
    _this.updOthers(1);
    wx.hideLoading();
  },

  // 3. 退货分布比例（饼状图）- 不需要滑块
  getAccountingBalance: function() {
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    });
    var _this = this;
    var userInfo = _this.data.userInfo;
    var company = userInfo.company || '';
    var gongsi = app.globalData.gongsi || '';

    _this.setData({
      dangqian: "getAccountingBalance",
      'sliderConfig.show': false // 饼图不需要滑块
    });

    // 设置日期范围
    var start_date = _this.data.riqi1 || "1900-01-01";
    var stop_date = _this.data.riqi2 || "2100-12-31";

    // 根据数据库类型执行查询
    if (app.globalData.shujuku == 0) {
      // MySQL数据库
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "SELECT cplb, SUM(cpsl) as total_cpsl " +
            "FROM yh_jinxiaocun_mingxi " +
            "WHERE mxtype IN ('入库', '出库', '调拨入库', '调拨出库', '盘亏出库', '盘盈入库') " +
            "AND shijian >= '" + start_date + "' " +
            "AND shijian <= '" + stop_date + "' " +
            "AND gs_name = '" + gongsi + "' " +
            "GROUP BY cplb " +
            "ORDER BY total_cpsl DESC"
        },
        success: res => {
          _this.processAccountingBalanceData(res.result || []);
        },
        err: res => {
          console.log("错误!", res);
          wx.hideLoading();
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    } else if (app.globalData.shujuku == 1) {
      // SQL Server数据库
      wx.cloud.callFunction({
        name: "sqlServer_cw",
        data: {
          query: "SELECT cplb, SUM(cpsl) as total_cpsl " +
            "FROM yh_jinxiaocun_excel.dbo.yh_jinxiaocun_mingxi_mssql " +
            "WHERE mxtype IN ('入库', '出库', '调拨入库', '调拨出库', '盘亏出库', '盘盈入库') " +
            "AND shijian >= '" + start_date + "' " +
            "AND shijian <= '" + stop_date + "' " +
            "AND gs_name = '" + gongsi + "' " +
            "GROUP BY cplb " +
            "ORDER BY total_cpsl DESC"
        },
        success: res => {
          _this.processAccountingBalanceData(res.result.recordset || []);
        },
        err: res => {
          console.log("错误!", res);
          wx.hideLoading();
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  },

  // 处理退货分布比例数据
  processAccountingBalanceData: function(data) {
    var _this = this;
    console.log('分布比例数据:', data);

    // 处理饼图数据
    var pieData = [];
    var total = 0;

    for (let i = 0; i < data.length; i++) {
      var value = data[i].total_cpsl || 0;
      var name = data[i].cplb || '其他';
      pieData.push({
        name: name,
        value: value
      });
      total += value;
    }

    // 如果没有数据，显示提示
    if (data.length === 0) {
      pieData = [{
        name: '暂无数据',
        value: 1
      }];
      total = 1;
    }

    var options = {
      title: {
        text: '退货分布比例',
        subtext: '总计: ' + total,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          var percent = ((params.value / total) * 100).toFixed(2);
          return params.name + '<br/>' +
            '数量: ' + params.value + '<br/>' +
            '占比: ' + percent + '%';
        }
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle',
        formatter: function(name) {
          // 在图例中显示百分比
          var item = pieData.find(item => item.name === name);
          if (item) {
            var percent = ((item.value / total) * 100).toFixed(1);
            return name + ' (' + percent + '%)';
          }
          return name;
        }
      },
      series: [{
        name: '退货分布',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          formatter: function(params) {
            var percent = ((params.value / total) * 100).toFixed(1);
            return params.name + '\n' + percent + '%';
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: pieData,
        itemStyle: {
          // 使用渐变色
          color: function(params) {
            var colorList = [
              '#1890FF', '#36CBCB', '#FADB14',
              '#F04864', '#975FE4', '#2FC25B',
              '#13C2C2', '#722ED1', '#EB2F96',
              '#52C41A', '#FA8C16', '#FAAD14'
            ];
            return colorList[params.dataIndex % colorList.length];
          }
        }
      }],
      // 饼图不需要dataZoom
      dataZoom: []
    };

    _this.updChart(options);
    _this.updOthers(2);
    wx.hideLoading();
  },

  updChart: function(options) {
    console.log('开始更新图表，选项:', options);
    
    var chartComponent = this.selectComponent('#mychart-dom-bar');
    if (!chartComponent) {
      console.error('图表组件未找到！');
      return;
    }
    
    console.log('图表组件找到:', chartComponent);
    
    try {
      chartComponent.init((canvas, width, height) => {
        console.log('初始化图表，尺寸:', width, 'x', height);
        
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        
        console.log('ECharts实例创建成功');
        console.log('设置图表选项:', options);
        
        chart.setOption(options, true);
        
        // 添加图表渲染完成事件
        chart.on('finished', function() {
          console.log('图表渲染完成');
        });
        
        return chart;
      });
    } catch (error) {
      console.error('图表初始化失败:', error);
      wx.showToast({
        title: '图表初始化失败',
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 新增：滑块变化事件处理
  onSliderChange: function(e) {
    var _this = this;
    var value = e.detail.value;
    console.log('滑块变化:', value);
    
    _this.setData({
      'sliderConfig.start': value[0],
      'sliderConfig.end': value[1]
    });
    
    // 根据当前显示的图表类型重新加载数据
    var dangqian = _this.data.dangqian;
    if (dangqian === "getAccounting") {
      _this.getAccounting();
    } else if (dangqian === "getSummary") {
      _this.getSummary();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var app = getApp();

    // 从全局数据获取用户信息
    var userInfo = {
      company: app.globalData.gongsi,
    };

    _this.setData({
      userInfo: userInfo,
      riqi1: "",
      riqi2: ""
    });

    // 默认加载退货趋势分析
    _this.getAccounting();
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

  }
});