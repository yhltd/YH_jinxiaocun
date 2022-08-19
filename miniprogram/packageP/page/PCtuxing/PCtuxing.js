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
    var _this = this
    var listJiQi = JSON.parse(options.listJiQi)
    var listDingDan = JSON.parse(options.listDingDan)
    var this_list_dingdan = []
    for(var i=0; i< listDingDan.length; i++){
      this_list_dingdan.push({
        name: listDingDan[i].order_id
      })
    }
    _this.setData({
      listJiQi:listJiQi,
      danhao_list:this_list_dingdan
    })
  },

  entering:function(){

    var _this = this
    var start_date = _this.data.xdrq
    var stop_date = _this.data.jieshuriqi
    if(start_date == ''){
      start_date = "1900-01-01"
    }
    if(stop_date == ''){
      stop_date = "2100-12-31"
    }
    var dingdanhao = _this.data.ddh
    var mokuai = _this.data.ddmk
    if(dingdanhao == ''){
      wx.showToast({
        title: '未选择订单号',
        icon: 'none'
      })
      return;
    }

    if(mokuai == ''){
      wx.showToast({
        title: '未填写订单模块',
        icon: 'none'
      })
      return;
    }

    var pie_data = []
    var xvalue = []
    var yvalue = []
    for(var i=0; i<_this.data.listJiQi.length; i++){
      if(_this.data.listJiQi[i].order_id == dingdanhao && _this.data.listJiQi[i].name == mokuai){
        var this_list = _this.data.listJiQi[i].list
        for(var j=0; j< this_list.length; j++){
          if(this_list[j].riqi >= start_date && this_list[j].riqi <= stop_date){
            pie_data.push({
              value:this_list[j].shuliang,
              name:this_list[j].riqi,
            })
            xvalue.push(this_list[j].riqi)
            yvalue.push(this_list[j].shuliang)
          }
        }
      }
    }
    console.log(pie_data)
    console.log(_this.data.listJiQi)

    _this.setData({
      pie_data:pie_data,
      xvalue:xvalue,
      yvalue:yvalue
    })
    _this.pie_refresh()
    


  },

  pie_refresh: function(){
    var _this = this
    var options = getBarOption(_this.data.pie_data)
    _this.updChart(options)
  },

  category_refresh: function(){
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