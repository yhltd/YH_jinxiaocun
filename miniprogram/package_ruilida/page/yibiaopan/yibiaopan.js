// package_ruilida/page/userInfo/userInfo.js
import * as echarts from '../ec-canvas/echarts'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xlShow2:false,
    kehu_qiankuan_height:70,
    gongyingshang_qiankuan_height:70,
    xiaoshou_tiaojian:'按业务员',
    xiaoshou_tiaojian_list:[
      {name:'按业务员'},
      {name:'按客户'},
      {name:'按商品'},
    ],
    xiaoshou_riqi:'本月',
    xiaoshou_riqi_list:[
      {name:'本月'},
      {name:'本年'},
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo,
    })
  },

  xiala_show: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    _this.setData({
      list_xiala: list,
      click_column:column,
    })
    console.log(list)
    _this.setData({
      xlShow2: true
    })
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      _this.setData({
        [click_column]:new_val
      })
      if(click_column == 'xiaoshou_tiaojian' || click_column == 'xiaoshou_riqi'){
        _this.xiaoshou_dingdan_paihang()
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },

  xiaoshou_dingdan_paihang: function(){
    var _this = this
    var sql = ""
    var type = _this.data.xiaoshou_tiaojian
    var xiaoshou_riqi = _this.data.xiaoshou_riqi
    var start_date = ""
    var stop_date = ""
    if(xiaoshou_riqi == '本月'){
      var firstDayOfMonth = new Date();  
      firstDayOfMonth.setDate(1);  
      start_date = firstDayOfMonth.getFullYear() + '-' + (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + firstDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(start_date)
      // 获取本月最后一天  
      var lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);  
      stop_date = lastDayOfMonth.getFullYear() + '-' + (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0') + '-' + lastDayOfMonth.getDate().toString().padStart(2, '0');
      console.log(stop_date)
    }else if(xiaoshou_riqi == '本年'){
      var firstDayOfMonth = new Date();
      start_date = firstDayOfMonth.getFullYear() + '-01-01'
      stop_date = firstDayOfMonth.getFullYear() + '-12-31'
    }

    if(_this.data.xiaoshou_tiaojian == '按业务员'){
      sql = "select yewuyuan as name,sum(convert(float,isnull(jiashui_heji,0))) as money from xiaoshou_dingdan where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by yewuyuan order by money "
    }else if(_this.data.xiaoshou_tiaojian == '按客户'){
      sql = "select kehu as name,sum(convert(float,isnull(jiashui_heji,0))) as money from xiaoshou_dingdan where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by kehu order by money "
    }else if(_this.data.xiaoshou_tiaojian == '按商品'){
      sql = "select shangpin_mingcheng as name,sum(convert(float,isnull(jiashui_xiaoji,0))) as money from xiaoshou_dingdan left join xiaoshou_dingdan_item on xiaoshou_dingdan.id = xiaoshou_dingdan_item.xiaoshou_id where riqi >= '" + start_date + "' and riqi <= '" + stop_date + "' group by shangpin_mingcheng order by money"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida', 
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var x_list = []
        var y_list = []
        var xiaoshou_dingdan_height = 70 + list.length * 60
        for(var i=0; i<list.length; i++){
          y_list.push(list[i].name)
          x_list.push(list[i].money)
        }
        var option = {
          grid: {
            left: '5%',
            right: '15%',
            top: '20',
            bottom: '20',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick:{
              show:false // 不显示坐标轴刻度线
            },
            axisLine: {
                  show: false, // 不显示坐标轴线
            },
            axisLabel: {
                  show: false, // 不显示坐标轴上的文字
            },
            splitLine:{
                show:false // 不显示网格线
            },
          },
          yAxis: {
            type: 'category',
            data: y_list
          },
          series: [
            {
              name: '金额',
              type: 'bar',
              data: x_list,
              label: {
                show: true,
                position: 'right'
              },
            },
          ]
        };
        _this.setData({
          xiaoshou_dingdan:option,
          xiaoshou_dingdan_height
        })
        console.log(option)
        _this.selectComponent('#xiaoshou_dingdan').init((canvas, width, height) => {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          barChart.setOption(option,true);
          return barChart;
        });
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

  kehu_qiankuan: function(){
    var _this = this
    var sql = "select * from (select kehu,sum(convert(float,isnull(qiankuan,0)) - convert(float,isnull(shoukuan,0))) as qiankuan from (select bianhao,kehu,sum(convert(float,isnull(money,0)) - convert(float,isnull(dingjin_use,0))) as qiankuan from xiaoshou_chuku as chuku left join (select sum(convert(float,isnull(jiashui_xiaoji,0))) as money,chuku_id from xiaoshou_chuku_item group by chuku_id) as item on chuku.id = item.chuku_id group by kehu,bianhao) as qiankuan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0))) + sum(convert(float,isnull(kedi_shuie,0))) as shoukuan from shouzhi_mingxi where danju_leixing = '销售出库' group by danju_bianhao) as shoukuan on qiankuan.bianhao = shoukuan.danju_bianhao group by kehu) as kehu_qiankuan order by qiankuan"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida', 
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var x_list = []
        var y_list = []
        var kehu_qiankuan_height = 70 + list.length * 60
        for(var i=0; i<list.length; i++){
          y_list.push(list[i].kehu)
          x_list.push(list[i].qiankuan)
        }
        var option = {
          grid: {
            left: '5%',
            right: '15%',
            top: '20',
            bottom: '20',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick:{
              show:false // 不显示坐标轴刻度线
            },
            axisLine: {
                  show: false, // 不显示坐标轴线
            },
            axisLabel: {
                  show: false, // 不显示坐标轴上的文字
            },
            splitLine:{
                show:false // 不显示网格线
            },
          },
          yAxis: {
            type: 'category',
            data: y_list
          },
          series: [
            {
              name: '欠款',
              type: 'bar',
              data: x_list,
              label: {
                show: true,
                position: 'right'
              },
            },
          ]
        };
        _this.setData({
          kehu_qiankuan:option,
          kehu_qiankuan_height
        })
        console.log(option)
        _this.selectComponent('#kehu_qiankuan').init((canvas, width, height) => {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          barChart.setOption(option,true);
          return barChart;
        });
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

  gongyingshang_qiankuan: function(){
    var _this = this
    var sql = "select * from (select gongyingshang,sum(convert(float,isnull(qiankuan,0)) - convert(float,isnull(shoukuan,0))) as qiankuan from (select bianhao,gongyingshang,convert(float,isnull(qiankuan,0))-convert(float,isnull(dingjin_use,0)) as qiankuan from caigou_ruku as ruku left join (select ruku_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as qiankuan from caigou_ruku_item group by ruku_id) as item on ruku.id = item.ruku_id) as qiankuan left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0))) + sum(convert(float,isnull(kedi_shuie,0))) as shoukuan from shouzhi_mingxi where danju_leixing = '采购入库' group by danju_bianhao) as fukuan on qiankuan.bianhao = fukuan.danju_bianhao group by gongyingshang) as gongyingshang_qiankuan order by qiankuan"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida', 
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var x_list = []
        var y_list = []
        var gongyingshang_qiankuan_height = 70 + list.length * 60
        for(var i=0; i<list.length; i++){
          y_list.push(list[i].gongyingshang)
          x_list.push(list[i].qiankuan)
        }
        var option = {
          grid: {
            left: '5%',
            right: '15%',
            top: '20',
            bottom: '20',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick:{
              show:false // 不显示坐标轴刻度线
            },
            axisLine: {
                  show: false, // 不显示坐标轴线
            },
            axisLabel: {
                  show: false, // 不显示坐标轴上的文字
            },
            splitLine:{
                show:false // 不显示网格线
            },
          },
          yAxis: {
            type: 'category',
            data: y_list
          },
          series: [
            {
              name: '欠款',
              type: 'bar',
              data: x_list,
              label: {
                show: true,
                position: 'right'
              },
            },
          ]
        };
        _this.setData({
          gongyingshang_qiankuan:option,
          gongyingshang_qiankuan_height
        })
        console.log(option)
        _this.selectComponent('#gongyingshang_qiankuan').init((canvas, width, height) => {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          barChart.setOption(option,true);
          return barChart;
        });
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var _this = this
    _this.kehu_qiankuan()
    _this.gongyingshang_qiankuan()
    _this.xiaoshou_dingdan_paihang()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})