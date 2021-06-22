import * as echarts from '../../components/ec-canvas/ec-canvas'
Page({

  /**
   * 页面的初始数据
   */
  yin:true,
  dat:true,
 
  data: {
    list6:"",
    riqi6:"",
    shuliang:"", 
    ec : {
      lazyLoad : true
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
    if(options!=undefined){
      that.setData({
         list6:options.list6
      })
    }
      var options = {
          title : {
            text: '排产图表',
            show : true
          },
          tooltip: {
            trigger: "axis",
            show:true,
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {},
          xAxis: [{
            type: "category",
            data: [list6.riqi6],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: "value",
            splitNumber : "8"
          }],
          series: [{
            name: "",
            type: "bar",
            label : {
              show : "true",
              position : "top"
            },
            itemStyle : {
              color : "#00CC99"
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
  
  // 柱状图
  zhu:function(){
    var that= this
    that.onLoad()
  },
  // 饼显示
  bi:function(){
    var that= this
    if(that.data.dat){
      that.setData({
        yin:false,
      })
    }else{
      that.setData({
        yin:true,
      })
    }
    that.data.dat = !that.data.dat
  },
  // 使用
  users(){
    var that=this
    wx.cloud.callFunction({
      name:'sqlServer_117',
      data:{        
         query : sql        
      },
      success: res => {
        console.log(res)
         var options = {
          title : {
           text: '工作台列使用情况',
            show : true,
            left: 'center',
            top:'20%'
          },
          // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          tooltip: {
            show:true,
            trigger: "item",
            formatter:'{a} {b} : {c} ({d}%)'
          },
         legend:{
          orient: 'vertical',
          left: 'left',
          data: ['A', 'B', 'C', 'D']
         },          
          series: [{
            name: "使用",
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: '', name: 'A'},
              {value: '', name: 'B'},
              {value: '', name: 'C'},
              {value: '', name: 'D'},            
          ],
          emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
          }]
        }
       
        
        for(let i=0;i<accounting.length;i++){
          options.series[0].data[i].value=(accounting[i][0].b)
        
        }
        
        console.log(options)
         that.updChart(options)
        wx.hideLoading({
          success: (res) => {},
        })
      },
    })
    that.setData({
      yin:true
    })
  },
  // 未使用
  nuser(){
    var that=this
    var sql="select top 1 (select count(A) from baitaoquanxian where A ='') as a from baitaoquanxian ; select top 1 (select count(B) from baitaoquanxian where B ='') as a from baitaoquanxian ; select top 1 (select count(C) from baitaoquanxian where C ='') as a from baitaoquanxian ; select top 1 (select count(D) from baitaoquanxian where D ='') as a from baitaoquanxian"
    wx.cloud.callFunction({
      name:'sqlServer_117',
      data:{        
         query : sql        
      },
      success: res => {
        console.log(res)
        var accounting = res.result.recordsets
        var options = {
          title : {
           text: '工作台列未使用情况',
            show : true,
            left: 'center',
            top:'20%'
          },
          // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          tooltip: {
            show:true,
            trigger: "item",
            formatter:'{a} {b} : {c} ({d}%)'
          },
         legend:{
          orient: 'vertical',
          left: 'left',
          data: ['A', 'B', 'C', 'D']
         },          
          series: [{
            name: "未使用",
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: '', name: 'A'},
              {value: '', name: 'B'},
              {value: '', name: 'C'},
              {value: '', name: 'D'},            
          ],
          emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
          }]
        }
       
        
        for(let i=0;i<accounting.length;i++){
          options.series[0].data[i].value=(accounting[i][0].a)
        }
        
        console.log(options)
         that.updChart(options)
        wx.hideLoading({
          success: (res) => {},
        })
      },
    })
    that.setData({
      yin:true
    })
  }
  
})