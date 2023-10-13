// import * as echarts from '../../../ec-canvas/echarts'
import * as echarts from '../../components/ec-canvas/echarts'

const app = getApp();
// var Chart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pie_data:[],

    listJiQi:[],
    gongsi: '',
    xlShow2:false,
    xdrq: "",
    jieshuriqi: "",
    ddh: "",
    lineChart: '',
    ddmk:'',
    ec: {
      lazyLoad: true
    },
    ljsr:"",
    ljzc:"",
    xfsr:"",
    ljjy:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var huizong_list = JSON.parse(options.huizong_list)
    _this.setData({
      userInfo:userInfo,
      huizong_list:huizong_list,
    })
    
    var options = {
      grid:{
        containLabel:true
      },
      xAxis: {
        type: 'category',
        data: ['累计收入','累计支出','学费收入','累计结余',]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: huizong_list,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
        }
      ]
    }
    var options = 
    _this.updChart(options)

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
})

