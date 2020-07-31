import * as echarts from '../../../packageC/components/ec-canvas/echarts'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hid_view : false,
    userInfo : [],

    ec : {
      lazyLoad : true
    },

    others : [1,0,0,0,0,0]
  },


  updOthers : function(index){
    var _this = this;
    for(let i=0;i<_this.data.others.length;i++){
      _this.setData({
        ["others["+i+"]"] : 0
      })
    }
    _this.setData({
      ["others["+index+"]"] : 1
    })
  },

  getAccounting : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select sum(a.load) as sum_load,sum(a.borrowed) as sum_borrowed from(select code,load,borrowed,LEFT(code,1) as class from Accounting where company = '"+_this.data.userInfo.company+"') as a GROUP BY a.class;"
      },
      success: res => {
        var accounting = res.result.recordset
        var options = {
          title : {
            show : false
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {},
          xAxis: [{
            type: "category",
            data: ["资产类","负债类","权益类","成本类","损益类",],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: "value",
            splitNumber : "8"
          }],
          series: [{
            name: "年初借金",
            type: "bar",
            label : {
              show : "true",
              position : "top"
            },
            itemStyle : {
              color : "#00CC99"
            },
            data: []
          },{
            name: "年初贷金",
            type: "bar",
            label : {
              show : "true",
              position : "top"
            },
            itemStyle : {
              color : "#003399"
            },
            data: []
          }]
        }
        for(let i=0;i<accounting.length;i++){
          options.series[0].data.push(accounting[i].sum_load)
          options.series[1].data.push(accounting[i].sum_borrowed)
        }
        _this.updChart(options)
        _this.updOthers(0)
        wx.hideLoading({
          success: (res) => {},
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  getSummary : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select sum(v.money) as [sum],a.direction from VoucherSummary as v,Accounting as a where a.company = '"+userInfo.company+"' and v.company = '"+userInfo.company+"' and a.code = v.code GROUP BY a.direction"
      },
      success: res => {
        var summary = res.result.recordset
        var options = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {},
          xAxis: [{
            type: "value",
            splitNumber : "10"
          }],
          yAxis: [{
            type: "category",
            data: ["金额"],
            axisTick: {
              alignWithLabel: true
            }
          }],
          series: [{
            name: "贷方金额",
            type: "bar",
            label : {
              show : "true",
              position : "right"
            },
            itemStyle : {
              color : "#00CC99"
            },
            data: [summary[1].sum]
          },{
            name: "借方金额",
            type: "bar",
            label : {
              show : "true",
              position : "right"
            },
            itemStyle : {
              color : "#003399"
            },
            data: [summary[0].sum]
          }]
        }
        _this.updChart(options)
        _this.updOthers(1)
        wx.hideLoading({
          success: (res) => {},
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  getAccountingBalance : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "SELECT sum(a.load) +ISNULL(sum(v.money), 0) as sum_load,sum(a.borrowed) as sum_borrowed from Accounting as a LEFT JOIN VoucherSummary as v on v.code = a.code where a.company = '"+userInfo.company+"' GROUP BY left(a.code,1)"
      },
      success: res => {
        var balance = res.result.recordset
        var options = {
          title : {
            show : false
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {},
          xAxis: [{
            type: "category",
            data: ["资产类","负债类","权益类","成本类","损益类"],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: "value",
            splitNumber : "8"
          }],
          series: [{
            name: "贷方",
            type: "bar",
            label : {
              show : "true",
              position : "top"
            },
            itemStyle : {
              color : "#00CC99"
            },
            data: []
          },{
            name: "借方",
            type: "bar",
            label : {
              show : "true",
              position : "top"
            },
            itemStyle : {
              color : "#003399"
            },
            data: []
          }]
        }
        for(var i=0;i<balance.length;i++){
          options.series[0].data.push(balance[i].sum_load)
          options.series[1].data.push(balance[i].sum_borrowed)
        }
        _this.updChart(options)
        _this.updOthers(2)
        wx.hideLoading({
          success: (res) => {},
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  getLiabilities : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select sum(a.start_year) as sum_start,sum(a.end_year) as sum_end from (select v.company,sum(load-borrowed) as start_year,sum([load]-borrowed+ISNULL(v.money, 0)) as end_year from Accounting as a left join VoucherSummary as v on a.code = v.code WHERE left(a.code,1) = 1 and a.company = '"+userInfo.company+"' GROUP BY a.code,a.name,v.company) as a where a.company = '"+userInfo.company+"' or a.company is null;select sum(a.start_year) as sum_start,sum(a.end_year) as sum_end from (select v.company,sum(borrowed-load) as start_year,sum(borrowed-[load]+ISNULL(v.money, 0)) as end_year from Accounting as a left join VoucherSummary as v on a.code = v.code WHERE left(a.code,1) = 2 and a.company = '"+userInfo.company+"' GROUP BY a.code,a.name,v.company) as a where a.company = '"+userInfo.company+"' or a.company is null;select sum(a.start_year) as sum_start,sum(a.end_year) as sum_end from (select v.company,sum(borrowed-load) as start_year,sum(borrowed-[load]+ISNULL(v.money, 0)) as end_year from Accounting as a left join VoucherSummary as v on a.code = v.code WHERE left(a.code,1) = 3 and a.company = '"+userInfo.company+"' GROUP BY a.code,a.name,v.company) as a where a.company = '"+userInfo.company+"' or a.company is null;"
      },
      success: res => {
        var liabilities = res.result.recordsets
        
        var options = {
          title : {
            show : false
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {},
          xAxis: [{
            type: "category",
            data: ["资产类","负债类","权益类"],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: "value",
            splitNumber : "8"
          }],
          series: [{
            name: "年初",
            type: "bar",
            label : {
              show : "true",
              position : "top"
            },
            itemStyle : {
              color : "#00CC99"
            },
            data: []
          },{
            name: "年末",
            type: "bar",
            label : {
              show : "true",
              position : "top"
            },
            itemStyle : {
              color : "#003399"
            },
            data: []
          }]
        }
        for(var i=0;i<liabilities.length;i++){
          options.series[0].data.push(liabilities[i][0].sum_start)
          options.series[1].data.push(liabilities[i][0].sum_end)
        }
        _this.updChart(options)
        _this.updOthers(3)
        wx.hideLoading({
          success: (res) => {},
        })
        
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  getProfit : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select sum(a.sum_month) as sum_month,sum(a.sum_year) as sum_year from (select y.sum_month,y.sum_year,a.direction from Accounting as a,(SELECT code,(SELECT sum(money) FROM VoucherSummary WHERE MONTH(voucherDate) = MONTH(GETDATE()) AND code = y.code) AS sum_month,(SELECT sum(money) FROM VoucherSummary WHERE YEAR(voucherDate) = YEAR(GETDATE()) AND code = y.code) AS sum_year FROM VoucherSummary AS y WHERE company = '"+userInfo.company+"' and YEAR(voucherDate) = YEAR(GETDATE()) GROUP BY y.code) as y where a.code = y.code and a.company = '"+userInfo.company+"' and a.direction in (0,1)) as a GROUP BY a.direction"
      },
      success: res => {
        var profit = res.result.recordset
        
        var options = {
          title : {
            show : false
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {},
          xAxis: [{
            type: "value",
            splitNumber : "8"
          }],
          yAxis: [{
            type: "category",
            data: ["收入合计","支出合计"],
            axisTick: {
              alignWithLabel: true
            }
          }],
          series: [{
            name: "本月",
            type: "bar",
            label : {
              show : "true",
              position : "right"
            },
            itemStyle : {
              color : "#00CC99"
            },
            data: []
          },{
            name: "本年",
            type: "bar",
            label : {
              show : "true",
              position : "right"
            },
            itemStyle : {
              color : "#003399"
            },
            data: []
          }]
        }
        for(var i=0;i<profit.length;i++){
          options.series[0].data.push(profit[i].sum_month)
          options.series[1].data.push(profit[i].sum_year)
        }
        _this.updChart(options)
        _this.updOthers(4)
        wx.hideLoading({
          success: (res) => {},
        })
        
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  getFlow : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select ISNULL(sum(a.money_month), 0) as sum_month,ISNULL(sum(a.money_year), 0) as sum_year from (select expenditure,(select sum(s.money) from VoucherSummary as s where company = '"+userInfo.company+"' and year(voucherDate) = year(getdate()) and month(voucherDate) = month(getdate()) and s.expenditure = v.expenditure) as money_month,(select sum(s.money) from VoucherSummary as s where company = '"+userInfo.company+"' and year(voucherDate) = year(getdate()) and s.expenditure = v.expenditure) as money_year from VoucherSummary as v where company = '"+userInfo.company+"' GROUP BY expenditure) as a where a.expenditure in (select financingExpenditure from FinancingExpenditure) or a.expenditure in (select financingIncome from FinancingIncome);select ISNULL(sum(a.money_month), 0) as sum_month,ISNULL(sum(a.money_year), 0) as sum_year from (select expenditure,(select sum(s.money) from VoucherSummary as s where company = '"+userInfo.company+"' and year(voucherDate) = year(getdate()) and month(voucherDate) = month(getdate()) and s.expenditure = v.expenditure) as money_month,(select sum(s.money) from VoucherSummary as s where company = '"+userInfo.company+"' and year(voucherDate) = year(getdate()) and s.expenditure = v.expenditure) as money_year from VoucherSummary as v where company = '"+userInfo.company+"' GROUP BY expenditure) as a where a.expenditure in (select investmentExpenditure from InvestmentExpenditure) or a.expenditure in (select investmentIncome from InvestmentIncome);select ISNULL(sum(a.money_month), 0) as sum_month,ISNULL(sum(a.money_year), 0) as sum_year from (select expenditure,(select sum(s.money) from VoucherSummary as s where company = '"+userInfo.company+"' and year(voucherDate) = year(getdate()) and month(voucherDate) = month(getdate()) and s.expenditure = v.expenditure) as money_month,(select sum(s.money) from VoucherSummary as s where company = '"+userInfo.company+"' and year(voucherDate) = year(getdate()) and s.expenditure = v.expenditure) as money_year from VoucherSummary as v where company = '"+userInfo.company+"' GROUP BY expenditure) as a where a.expenditure in (select managementExpenditure from ManagementExpenditure) or a.expenditure in (select managementIncome from ManagementIncome);"
      },
      success: res => {
        var flow = res.result.recordsets
        
        var options = {
          title : {
            show : false
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {},
          xAxis: [{
            type: "value",
            splitNumber : "8"
          }],
          yAxis: [{
            type: "category",
            data: ["经营结余","筹资结余","投资结余"],
            axisTick: {
              alignWithLabel: true
            }
          }],
          series: [{
            name: "本月",
            type: "bar",
            label : {
              show : "true",
              position : "right"
            },
            itemStyle : {
              color : "#00CC99"
            },
            data: []
          },{
            name: "本年",
            type: "bar",
            label : {
              show : "true",
              position : "right"
            },
            itemStyle : {
              color : "#003399"
            },
            data: []
          }]
        }
        for(var i=0;i<flow.length;i++){
          options.series[0].data.push(flow[i][0].sum_month)
          options.series[1].data.push(flow[i][0].sum_year)
        }
        _this.updChart(options)
        _this.updOthers(5)
        wx.hideLoading({
          success: (res) => {},
        })
        
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  updChart : function(options){
    this.selectComponent('#mychart-dom-bar').init((canvas, width, height) => {
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(options,true);
      return barChart;
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })
    _this.getAccounting()
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