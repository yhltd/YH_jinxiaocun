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
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  entering:function(){
    var _this = this
    var xdrq = _this.data.xdrq
    
    if(xdrq == ''){
      wx.showToast({
        title: '请选择年份后再点击查询',
        icon:'none'
      })
    }

    var sql = "select sum(case when set_date like '" + xdrq + "-01%' then set_num else 0 end) as month1,sum(case when set_date like '" + xdrq + "-02%' then set_num else 0 end) as month2,sum(case when set_date like '" + xdrq + "-03%' then set_num else 0 end) as month3,sum(case when set_date like '" + xdrq + "-04%' then set_num else 0 end) as month4,sum(case when set_date like '" + xdrq + "-05%' then set_num else 0 end) as month5,sum(case when set_date like '" + xdrq + "-06%' then set_num else 0 end) as month6,sum(case when set_date like '" + xdrq + "-07%' then set_num else 0 end) as month7,sum(case when set_date like '" + xdrq + "-08%' then set_num else 0 end) as month8,sum(case when set_date like '" + xdrq + "-09%' then set_num else 0 end) as month9,sum(case when set_date like '" + xdrq + "-10%' then set_num else 0 end) as month10,sum(case when set_date like '" + xdrq + "-11%' then set_num else 0 end) as month11,sum(case when set_date like '" + xdrq + "-12%' then set_num else 0 end) as month12 from order_info where company = '济南顺昌制造有限公司'"

    _this.setData({
      pie_data:pie_data,
      xvalue:xvalue,
      yvalue:yvalue
    })

    _this.line_refresh()
  },

  pie_refresh: function(){
    var _this = this
    var options = getBarOption(_this.data.pie_data)
    _this.updChart(options)
  },



  line_refresh: function(){
    var _this = this
    var options = {
      xAxis: {
        type: 'category',
        data: _this.data.xvalue
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: _this.data.yvalue,
          type: 'line',
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

  selDDH: function () {
    var _this = this
    console.log(_this.data.danhao_list)
    _this.setData({
      xlShow2: true
    })
  },
  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow2: false,
        ddh: e.detail.name,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow2: false,
      })
    }
  },
  choiceDate: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
})


function getBarOption(pie_data) {
  console.log(pie_data)
  return {
    legend: {
      bottom: 10,
      left: 'center'
    },
    series: [{
      type: 'pie',
      radius: ['30', '60%'],
      clockwise: false,
      center: ['50%', '40%'],
      labelLine: {
        smooth: true
      },
      label: {
        formatter: '{b}: {c}'
      },
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      data: pie_data,
      },
    ]
 
}
}