import * as echarts from '../ec-canvas/echarts'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',

    ec : {
      lazyLoad : true
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      gongsi:options.gongsi
    })
    var sql="select top 1 (select count(A) from baitaoquanxian where A ='') as a,(select count(A) from baitaoquanxian where A !='') as b from baitaoquanxian ; select top 1 (select count(B) from baitaoquanxian where B ='') as a,(select count(B) from baitaoquanxian where B !='') as b from baitaoquanxian ; select top 1 (select count(C) from baitaoquanxian where C ='') as a,(select count(C) from baitaoquanxian where C !='') as b from baitaoquanxian ; select top 1 (select count(D) from baitaoquanxian where D ='') as a,(select count(D) from baitaoquanxian where D !='') as b from baitaoquanxian"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success: res => {
        console.log(res)
        var accounting = res.result.recordsets
        var options = {
          title : {
            text: '工作台列使用情况',
            show : true
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
            data: ["A","B","C","D"],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: "value",
            splitNumber : "8"
          }],
          series: [{
            name: "使用",
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
            name: "未使用",
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
          options.series[0].data.push(accounting[i][0].b)
          options.series[1].data.push(accounting[i][0].a)
        }
        
        console.log(options)
         that.updChart(options)
        wx.hideLoading({
          success: (res) => {},
        })
      },

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