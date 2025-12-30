import * as echarts from '../../../packageC/components/ec-canvas/echarts'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    ec: {
      lazyLoad: true
    },
    // 卡片数据
    totalProfit: 0,
    totalCost: 0,
    totalProfitRate: 0,
    currentDate: '',
    showChart: true,
    chartData: [],
    chartOptions: null
  },

  /**
   * 切换图表/卡片显示
   */
  toggleChart: function() {
    var _this = this;
    var showChart = !_this.data.showChart;
    
    _this.setData({
      showChart: showChart
    }, function() {
      // setData回调完成后执行
      if (showChart && _this.data.chartOptions) {
        // 切换到图表时，重新加载图表
        setTimeout(() => {
          _this.reloadChart();
        }, 100);
      }
    });
  },

  /**
   * 重新加载图表
   */
  reloadChart: function() {
    var _this = this;
    if (_this.data.chartOptions) {
      console.log('重新加载图表...');
      _this.updChart(_this.data.chartOptions);
      
      // 重新调整图表尺寸
      setTimeout(() => {
        _this.resizeChart();
      }, 300);
    }
  },

  /**
   * 查询科目利润和成本函数
   */
  getAccountingProfitCost: function() {
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.showLoading({
      title: '加载中',
      mask: 'true'
    })

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "SELECT accounting, SUM(receipts - payment) as profit, SUM(payment) as cost FROM SimpleData WHERE company = '" + userInfo.company + "' GROUP BY accounting ORDER BY accounting"
      },
      success: res => {
        var data = res.result.recordset
        
        if (!data || data.length === 0) {
          wx.hideLoading()
          wx.showToast({
            title: '暂无数据',
            icon: 'none'
          })
          return
        }
        
        console.log('查询到的原始数据:', data); // 查看数据结构
        
        // 保存原始数据到data中
        _this.setData({
          chartData: data
        });
        
        // 使用和图表完全相同的数据处理逻辑
        var accountingNames = []
        var profitData = []
        var costData = []
        
        // 计算卡片数据：总利润和总成本
        var totalProfit = 0
        var totalCost = 0
        
        for (var i = 0; i < data.length; i++) {
          // 这里和图表数据处理逻辑完全一样
          accountingNames.push(data[i].accounting || '未命名科目')
          
          // 直接从查询结果中获取 profit 和 cost 字段
          var profit = data[i].profit || 0
          var cost = data[i].cost || 0
          
          profitData.push(profit)
          costData.push(cost)
          
          // 累加计算卡片数据
          totalProfit += profit
          totalCost += cost
        }
        
        console.log(`计算的总利润: ${totalProfit}, 总成本: ${totalCost}`); // 调试
        
        // 计算整体利润率（卡片数据）
        var totalProfitRate = 0
        if (totalCost === 0) {
          if (totalProfit > 0) {
            totalProfitRate = 999 // 表示无限大
          } else if (totalProfit < 0) {
            totalProfitRate = -999 // 表示无限小
          } else {
            totalProfitRate = 0
          }
        } else {
          totalProfitRate = parseFloat(((totalProfit / totalCost) * 100).toFixed(2))
        }
        
        console.log(`计算的利润率: ${totalProfitRate}%`); // 调试
        
        // 图表数据：计算成本利润率（利润/成本）
        var profitRateData = []
        for (var i = 0; i < profitData.length; i++) {
          var profit = profitData[i] || 0
          var cost = costData[i] || 0
          if (cost === 0) {
            if (profit > 0) {
              profitRateData.push(999)
            } else if (profit < 0) {
              profitRateData.push(-999)
            } else {
              profitRateData.push(0)
            }
          } else {
            profitRateData.push(((profit / cost) * 100).toFixed(2))
          }
        }
        
        var options = {
          title: {
            text: '科目利润成本统计',
            left: 'center',
            textStyle: {
              fontSize: 16
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            formatter: function(params) {
              var result = params[0].name + '<br/>'
              for (var i = 0; i < params.length; i++) {
                var value = params[i].value
                var seriesName = params[i].seriesName
                
                if (seriesName === '成本利润率') {
                  if (value >= 999) {
                    result += seriesName + ': ∞%<br/>'
                  } else if (value <= -999) {
                    result += seriesName + ': -∞%<br/>'
                  } else {
                    result += seriesName + ': ' + value + '%<br/>'
                  }
                } else {
                  result += seriesName + ': ' + value.toLocaleString() + '元<br/>'
                }
              }
              return result
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              bottom: '5%',
              height: 20,
              borderColor: '#ccc',
              fillerColor: 'rgba(0, 100, 200, 0.2)',
              handleStyle: {
                color: '#003399'
              },
              start: 0,
              end: data.length > 8 ? 100 * 8 / data.length : 100
            }
          ],
          xAxis: [{
            type: "category",
            data: accountingNames,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 45,
              fontSize: 10,
              margin: 15
            }
          }],
          yAxis: [
            {
              type: "value",
              name: '金额',
              position: 'left',
              splitNumber: 8,
              axisLabel: {
                formatter: function(value) {
                  return value.toLocaleString()
                }
              }
            },
            {
              type: "value",
              name: '成本利润率(%)',
              position: 'right',
              splitNumber: 8,
              min: function(value) {
                var minVal = value.min;
                return minVal < 0 ? Math.floor(minVal * 1.2) : 0;
              },
              max: function(value) {
                var maxVal = value.max;
                return maxVal > 0 ? Math.ceil(maxVal * 1.2) : 10;
              },
              axisLabel: {
                formatter: '{value}%'
              }
            }
          ],
          series: [
            {
              name: "利润",
              type: "bar",
              yAxisIndex: 0,
              label: {
                show: true,
                position: "top",
                formatter: function(params) {
                  return params.value.toLocaleString()
                },
                fontSize: 10
              },
              itemStyle: {
                color: "#00CC99"
              },
              data: profitData
            }, 
            {
              name: "成本",
              type: "bar",
              yAxisIndex: 0,
              label: {
                show: true,
                position: "top",
                formatter: function(params) {
                  return params.value.toLocaleString()
                },
                fontSize: 10
              },
              itemStyle: {
                color: "#003399"
              },
              data: costData
            },
            {
              name: "成本利润率",
              type: "line",
              yAxisIndex: 1,
              symbol: 'circle',
              symbolSize: 6,
              lineStyle: {
                width: 3,
                type: 'solid'
              },
              itemStyle: {
                color: "#FF6B6B"
              },
              label: {
                show: true,
                position: 'top',
                formatter: function(params) {
                  var value = params.value;
                  if (value >= 999) return '∞%';
                  if (value <= -999) return '-∞%';
                  return value + '%';
                },
                fontSize: 10
              },
              data: profitRateData
            }
          ]
        }

        // 保存图表配置和卡片数据
        _this.setData({
          chartOptions: options,
          totalProfit: totalProfit,
          totalCost: totalCost,
          totalProfitRate: totalProfitRate,
          currentDate: _this.formatDate(new Date())
        }, function() {
          console.log('卡片数据已更新:', {
            totalProfit: _this.data.totalProfit,
            totalCost: _this.data.totalCost,
            totalProfitRate: _this.data.totalProfitRate
          });
          
          // 只有当显示图表时才初始化图表
          if (_this.data.showChart) {
            _this.updChart(options);
          }
        });
        
        wx.hideLoading();
      },
      fail: err => {
        console.error('查询失败:', err)
        wx.hideLoading()
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 格式化日期
   */
  formatDate: function(date) {
    var year = date.getFullYear()
    var month = (date.getMonth() + 1).toString().padStart(2, '0')
    var day = date.getDate().toString().padStart(2, '0')
    var hours = date.getHours().toString().padStart(2, '0')
    var minutes = date.getMinutes().toString().padStart(2, '0')
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
  },

  /**
   * 更新图表
   */
  updChart: function(options) {
    console.log('开始更新图表...')
    
    const chartComponent = this.selectComponent('#mychart-dom-bar')
    if (!chartComponent) {
      console.error('找不到图表组件')
      wx.showToast({
        title: '图表组件加载失败',
        icon: 'none'
      })
      return
    }

    console.log('找到图表组件，开始初始化...')
    
    // 延迟确保DOM渲染完成
    setTimeout(() => {
      chartComponent.init((canvas, width, height) => {
        console.log('图表容器尺寸:', width, 'x', height)
        
        if (width === 0 || height === 0) {
          console.error('图表容器尺寸为0')
          wx.showToast({
            title: '图表容器尺寸异常',
            icon: 'none'
          })
          return null
        }

        try {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          })
          
          console.log('设置图表选项...')
          barChart.setOption(options, true)
          
          // 确保图表渲染完成
          setTimeout(() => {
            barChart.resize()
          }, 100)
          
          return barChart
        } catch (error) {
          console.error('图表初始化错误:', error)
          wx.showToast({
            title: '图表初始化失败',
            icon: 'none'
          })
          return null
        }
      })
    }, 300)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    
    // 添加空值检查
    if (options && options.userInfo) {
      try {
        var userInfo = JSON.parse(options.userInfo);
        _this.setData({
          userInfo: userInfo
        });
        console.log('用户信息:', userInfo);
        
        // 延迟加载图表，确保DOM渲染完成
        setTimeout(() => {
          _this.getAccountingProfitCost();
        }, 500);
        
      } catch (error) {
        console.error('JSON解析失败:', error);
        wx.showToast({
          title: '用户信息格式错误',
          icon: 'none'
        });
      }
    } else {
      console.error('未获取到用户信息');
      wx.showToast({
        title: '用户信息缺失',
        icon: 'none'
      });
    }
  },

  /**
   * 重新调整图表尺寸
   */
  resizeChart: function() {
    const chartComponent = this.selectComponent('#mychart-dom-bar')
    if (chartComponent && chartComponent.chart) {
      chartComponent.chart.resize()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 页面显示时，如果显示图表，重新调整尺寸
    if (this.data.showChart && this.data.chartOptions) {
      setTimeout(() => {
        this.resizeChart();
      }, 300);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
});