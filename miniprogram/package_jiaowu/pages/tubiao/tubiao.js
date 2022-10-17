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
    let user = userInfo.Company;
    _this.setData({
      userInfo:userInfo
    })
    
    var e = ['1900-01-01', '2100-12-31']
    if (_this.data.isdischa == 1) {
      _this.tableShow(e)
    }

    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select sum(money) as aa from income where Company='" + user + "'"
      },
      success: res => {
        var list = res.result
        var a=[]
        for(var i=0; i<res.result.length; i++){
          a = list[i].aa.split(":")[1]
        }
        
        _this.setData({
          ljsr:list
        })
        console.log(a)
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select sum(paid) from income where  Company='" + user + "'"
      },
      success: res => {
        var list = res.result
        _this.setData({
          ljzc:list
        })
        console.log(res.result)
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select sum(money) from income where  Company='" + user + "'and msort='学费'"
      },
      success: res => {
        var list = res.result
        _this.setData({
          xfsr:list
        })
        console.log(res.result)
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select sum(money)-sum(paid) from income where  Company='" + user + "'"
      },
      success: res => {
        var list = res.result
        _this.setData({
          ljjy:list
        })
        console.log(res.result)
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  entering:function(){

  },

  

  category_refresh: function(){
    var _this = this
    // var a= _this.data.ljsr
    // var b= _this.data.ljzc
    // var c= _this.data.xfsr
    // var d= _this.data.ljjy
    var options = {
      xAxis: {
        type: 'category',
        data: ['累计收入','累计支出','学费收入','累计结余',]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: ['1111','111','111','1111',],
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

