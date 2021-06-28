// import * as echarts from '../../../ec-canvas/echarts'
import * as echarts from '../ec-canvasnew/echarts'

const app = getApp();
// var Chart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    list2: [],
    list3: [],
    listDingDan: [],
    listJiQi: [],
    listXiuXiri: [],
    listGongZuoShiJian: [],
    listMeiTianShiJian: [],
    tubiaox: [],
    tubiaoy: [],
    accounting: [],
    animationData_moreDo_view: [],
    gongsi: '',
    yin: true,
    dat: true,
    xdrq: "",
    jieshuriqi: "",
    ddh: "",
    lineChart: '',
    ec: {
      lazyLoad: true
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var _this = this
    let user = app.globalData.gongsi;
    if (options != undefined) {
      that.setData({
        gongsi: options.gongsi
      })
    }
    console.log(that.lineChart)
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select week,morning_start,morning_end,noon_start,noon_end,night_start,night_end from  time_config Where company='" + user + "' order by week"
      },
      success: res => {
        console.log(res)
        var accounting = res.result.recordsets
        console.log(_this.lineChart)
        //按钮试验为了进入折线图方法
        // var lineChart = "line"
        if (_this.lineChart == "line") {
          console.log("line chart")
          _this.zhexian_use()

        } else {
          if (_this.data.list3.length > 0) {
            console.log("onLoadaccounting122332")
            accounting = _this.data.list3;
          }

          {
            var options = {
              title: {
                text: '工作台列使用情况',
                show: true
              },
              tooltip: {
                trigger: "axis",
                show: true,
                axisPointer: {
                  type: "shadow"
                }
              },
              grid: {},
              xAxis: [{
                type: "category",
                data: ["A", "B", "C", "D"],
                axisTick: {
                  alignWithLabel: true
                }
              }],
              yAxis: [{
                type: "value",
                splitNumber: "8"
              }],
              series: [{
                name: "使用",
                type: "bar",
                label: {
                  show: "true",
                  position: "top"
                },
                itemStyle: {
                  color: "#00CC99"
                },
                data: []
              }, {
                name: "未使用",
                type: "bar",
                label: {
                  show: "true",
                  position: "top"
                },
                itemStyle: {
                  color: "#003399"
                },
                data: []
              }]
            }
            var startdate = _this.data.xdrq
            var enddate = _this.data.jieshuriqi
            var orderno = _this.data.ddh
            var order_model = _this.data.ddmk
            console.log("123123123")
            console.log(startdate)
            console.log(enddate)
            console.log(orderno)
            console.log(order_model)

            for (let i = 0; i < accounting.length; i++) {
              if (startdate >= accounting[i].riqi && enddate <= accounting[i].riqi) {
                console.log("123123")
                console.log(accounting[i].riqi);
                options.series[0].data.push(accounting[i].riqi)
                options.xAxis[0].data.push(accounting[i].riqi)
                options.series[0].data.push(accounting[i].shuliang)
              }
            }

            for (let i = 0; i < accounting.length; i++) {
              console.log(accounting[i].riqi);
              options.series[0].data.push(accounting[i].riqi)
              options.xAxis[0].data.push(accounting[i].riqi)
              options.series[0].data.push(accounting[i].shuliang)

            }

            console.log(options)
            that.updChart(options)
          }
          wx.hideLoading({
            success: (res) => {},
          })
        }
      },

    })
  },
  updChart: function (options) {
    this.selectComponent('#mychart-dom-bar').init((canvas, width, height) => {
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(options, true);
      return barChart;
    });
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
  clearlpmg: function (e) {
    var _this = this
    this.setData({
      xdrq: '',
      jieshuriqi: '',
      ddmk: '',
      ddh: ''
    })
  },
  entering: function (e) {
    var _this = this
    var startdate = _this.data.xdrq
    var enddate = _this.data.jieshuriqi
    var orderno = _this.data.ddh
    var order_model = _this.data.ddmk
    console.log("startdate" + startdate + "enddate" + enddate + "orderno" + orderno + "order_model" + order_model)
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        // query: "select week,morning_start,morning_end,noon_start,noon_end,night_start,night_end from  time_config Where company='" + user + "' order by week"
        query: "select week,morning_start,morning_end,noon_start,noon_end,night_start,night_end from  time_config Where company='" + user + "' order by week"
      },
      success: res => {
        var list = res.result.recordset
        var listMeiTianShiJian = []
        var x = 0
        for (var i = 0; i < list.length; i++) {
          if (list[i].morning_end != null && list[i].morning_end != "" && list[i].morning_start != null && list[i].morning_start != "" && list[i].noon_end != null && list[i].noon_end != "" && list[i].noon_start != null && list[i].noon_start != "" && list[i].night_end != null && list[i].night_end != "" && list[i].night_start != null && list[i].night_start != "") {
            var morning_end = new Date("2021-01-01 " + list[i].morning_end + ':00')
            var morning_start = new Date("2021-01-01 " + list[i].morning_start + ':00')
            var noon_end = new Date("2021-01-01 " + list[i].noon_end + ':00')
            var noon_start = new Date("2021-01-01 " + list[i].noon_start + ':00')
            var night_end = new Date("2021-01-01 " + list[i].night_end + ':00')
            var night_start = new Date("2021-01-01 " + list[i].night_start + ':00')
            var time1 = (morning_end.getMinutes() - morning_start.getMinutes()) + (morning_end.getHours() - morning_start.getHours()) * 60
            var time2 = (noon_end.getMinutes() - noon_start.getMinutes()) + (noon_end.getHours() - noon_start.getHours()) * 60
            var time3 = (night_end.getMinutes() - night_start.getMinutes()) + (night_end.getHours() - night_start.getHours()) * 60
            listMeiTianShiJian[list[i].week] = (time1 + time2 + time3) / 60
          } else {
            if (list[i].week != "6" && list[i].week != "6") {
              x = x + 1
            }
          }
        }
        //new 
        var list1 = res.result.recordset
        _this.setData({
          list2: list,
          listGongZuoShiJian: list,
          listMeiTianShiJian: listMeiTianShiJian
        })
        // console.log("this.data1")
        // console.log(this.data)
        // console.log(list);
        // console.log(listMeiTianShiJian);
        // console.log("this.data2")
        if (x > 0) {
          wx.showToast({
            title: '请补全每日工作时间！',
            icon: 'none'
          })
        } else {
          var e = ""
          _this.selListDingDan(e, function () {
            _this.selListJiQi(e, function () {
              _this.selListXiuXiri(e, function () {
                _this.chongsuan()
              })
            })
          })
        }

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
    _this.setData({
      // cxShow: true

    })
  },
  selListDingDan: function (e, callback) {
    var _this = this
    let user = app.globalData.gongsi;
    var startdate = _this.data.xdrq;
    var enddate = _this.data.jieshuriqi;
    var orderno = _this.data.ddh;
    var order_model = _this.data.ddmk;
    //PC_PC.js原始sql语句
    //query: "select oi.order_id,wd.work_num,wd.row_num,CONVERT(varchar(100), wd.work_start_date, 20) as work_start_date,(select id from order_info where order_info.order_id=oi.order_id) as id,('订单号:'+oi.order_id +'编号:'+ cast(wd.row_num as varchar)+'插单:'+ cast(wd.is_insert as varchar)) as name from work_detail as wd left join order_info as oi on wd.order_id = oi.id where oi.order_id like '%" + e + "%' and wd.company='" + user + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_PC',

      data: {
        query: "select oi.order_id,wd.work_num,wd.row_num,CONVERT(varchar(100), wd.work_start_date, 20) as work_start_date,(select id from order_info where order_info.order_id=oi.order_id) as id,('订单号:'+oi.order_id +'编号:'+ cast(wd.row_num as varchar)+'插单:'+ cast(wd.is_insert as varchar)) as name from work_detail as wd left join order_info as oi on wd.order_id = oi.id where oi.order_id like '%" + orderno + "%' and wd.company='" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          listDingDan: list
        })
        if (callback != undefined) callback();
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },
  selListJiQi: function (e, callback) {
    var _this = this
    let user = app.globalData.gongsi;
    console.log(user)
    console.log("select oi.order_id,mi.name,mi.num,wd.work_num,wd.row_num,CONVERT(varchar(100), wd.work_start_date, 20) as work_start_date from work_detail as wd left join order_info as oi on wd.order_id = oi.id left join work_module as wm on wd.id = wm.work_id left join module_info as mi on wm.module_id = mi.id where oi.order_id like '%" + e + "%' and wd.company='" + user + "' and (select count(id) from work_module where work_id=wd.id)>0 and mi.num>0 group by oi.order_id,mi.name,mi.num,wd.work_num,wd.work_start_date,wd.row_num,wd.is_insert order by wd.row_num,wd.is_insert,wd.work_start_date asc")
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select oi.order_id,mi.name,mi.num,wd.work_num,wd.row_num,CONVERT(varchar(100), wd.work_start_date, 20) as work_start_date from work_detail as wd left join order_info as oi on wd.order_id = oi.id left join work_module as wm on wd.id = wm.work_id left join module_info as mi on wm.module_id = mi.id where oi.order_id like '%" + e + "%' and wd.company='" + user + "' and (select count(id) from work_module where work_id=wd.id)>0 and mi.num>0 group by oi.order_id,mi.name,mi.num,wd.work_num,wd.work_start_date,wd.row_num,wd.is_insert order by wd.row_num,wd.is_insert,wd.work_start_date asc"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          listJiQi: list,
          list: list
        })
        console.log("mmkk")
        if (callback != undefined) callback();
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },
  selListXiuXiri: function (e, callback) {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select CONVERT(varchar(100), day_or_reset, 23) as day_or_reset from  holiday_config Where company='" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        var listXiuXiri = []
        for (var i = 0; i < list.length; i++) {
          listXiuXiri[list[i].day_or_reset] = 0
        }
        _this.setData({
          listXiuXiri: listXiuXiri
        })
        if (callback != undefined) callback();
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },
  chongsuan: function () {
    var _this = this
    for (var i = 0; i < _this.data.listDingDan.length; i++) {
      var num = _this.data.listDingDan[i].work_num
      var x = 0
      var date = new Date(_this.data.listDingDan[i].work_start_date)
      do {
        for (var j = 0; j < _this.data.listJiQi.length; j++) {
          if (_this.data.listDingDan[i].order_id == _this.data.listJiQi[j].order_id && _this.data.listDingDan[i].work_start_date == _this.data.listJiQi[j].work_start_date) {
            var e = [date, j]
            let workNum = _this.jinrikegongzuoshuliang(e)
            var list = _this.data.listJiQi
            var Y = date.getFullYear() + '-'
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())


            var list2 = []
            if (_this.data.listJiQi[j]['list'] == undefined) {
              _this.data.listJiQi[j]['list']
            } else {
              list2 = _this.data.listJiQi[j]['list']
            }
            if (num >= 0) {
              list2[Y + M + D] = num - workNum >= 0 ? workNum : num
              num = num - workNum
              list[j]['list'] = list2
              _this.setData({
                listJiQi: list
              })
            }
            x = x + 1
          }
        }
        date = new Date(Y + M + D + " 00:00:00")
        date = new Date(date.setDate(date.getDate() + 1));
        var jixu
        if (num > 0) {
          jixu = true
        } else {
          jixu = false
        }
        if (x == 0) {
          jixu = false
        }
      } while (jixu)
    }
    // console.log(list)
    console.log("11kd2")
    let riqi2 = _this.data.riqi;
    let jiqi = _this.data.listJiQi;
    let list3 = [];
    for (let i = 0; i < jiqi.length; i++) {
      console.log("item" + jiqi.length)
      for (let item in jiqi[i].list) {

        list3.push({
          riqi: item,
          order_id: jiqi[i].order_id,
          name: jiqi[i].name,
          num: jiqi[i].num,
          shuliang: jiqi[i].list[item],
        })
        //}      
      }
    }
    _this.setData({
      list3: list3,
    })
    console.log(list3)
    ///
    // for (let item in list[index].list){
    //   console.log("item.list");
    //   console.log(item.list);
    //   list3.push({
    //     riqi: item,
    //     shuliang: list[index].list[item]
    //   }),
    //   console.log("list3")
    //   console.log(list3)
    // }
    //
    var tubiaox = [];
    var tubiaoy = [];
    for (let i = 0; i < list3.length; i++) {
      if (list3[i].order_id == "dl100012") {
        console.log("riqi" + list3[i].riqi)
        console.log("shuliang" + list3[i].shuliang)
        // _this.data.tubiaox.push(list3[i].riqi)
        // _this.data.tubiaoy.series[0].data.push(list3[i].shuliang)
        tubiaox.push(list3[i].riqi)
        tubiaoy.push(list3[i].shuliang)
        // options.series[0].data.push(accounting[i][0].night_end)
        // options.series[1].data.push(accounting[i][0].noon_start)
      }
    }
    var options = [];

    _this.setData({
      tubiaox: tubiaox,
      tubiaoy: tubiaoy,

    })
    _this.onLoad()

    // _this.show_onLoad(options)
  },

  show_onLoad: function (options) {
    var that = this
    var _this = this
    console.log("show_onLoad ")
    let user = app.globalData.gongsi;
    // if(options!=undefined){
    //   that.setData({
    //     gongsi:options.gongsi
    //   })
    // }  

    // wx.cloud.callFunction({
    // name: 'sqlServer_PC',
    // data: {
    //   query: "select week,morning_start,morning_end,noon_start,noon_end,night_start,night_end from  time_config Where company='" + user +"' order by week"
    // },
    // success: res => 
    // {
    // console.log(res)
    // var accounting = res.result.recordsets
    if (_this.data.tubiaox.length > 0) {
      var options = {
        title: {
          text: '工作台列使用情况',
          show: true
        },
        tooltip: {
          trigger: "axis",
          show: true,
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {},
        xAxis: [{
          type: "category",
          data: _this.data.tubiaox,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: "value",
          splitNumber: "8"
        }],
        series: [{
            name: "使用",
            type: "line",
            label: {
              show: "true",
              position: "top"
            },
            itemStyle: {
              color: "#00CC99"
            },
            data: _this.data.tubiaoy
          }
          // ,{
          //   name: "未使用",
          //   type: "bar",
          //   label : {
          //     show : "true",
          //     position : "top"
          //   },
          //   itemStyle : {
          //     color : "#003399"
          //   },
          //   data: []
          // }
        ]
      }

      // console.log(accounting);
      console.log("_this.data.list3.length " + _this.data.list3.length)
      for (let i = 0; i < _this.data.list3.length; i++) {
        // if (_this.data.list3[i].order_id=="dl100012"){
        console.log("riqi" + _this.data.list3[i].riqi)
        console.log("shuliang" + _this.data.list3[i].shuliang)
        // _this.data.tubiaox.push(list3[i].riqi)
        // _this.data.tubiaoy.series[0].data.push(list3[i].shuliang)
        // tubiaox.push(list3[i].riqi)
        // tubiaoy.push(list3[i].shuliang)
        // options.xAxis.data.push(_this.data.list3[i].riqi)
        // options.series[0].data.push(_this.data.list3[i].shuliang)

        // options.series[0].data.push(50)
        // options.series[0].data[i].value=(1000)
        // }
      }
      for (let i = 0; i < 5; i++) {
        options.series[0].data.push(i)
        // options.series[1].data.push(i)
      }
      // for(let i=0;i<accounting.length;i++){
      //   options.series[0].data.push(accounting[i][0].night_end)
      //   options.series[1].data.push(accounting[i][0].noon_start)
      // }        
      console.log(options)
      that.updChart(options)
    }
    console.log("show_onLoad end")
    //   wx.hideLoading({
    //     success: (res) => {},
    //   })
    // // },

    // })
  },
  selListshe: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select week,morning_start,morning_end,noon_start,noon_end,night_start,night_end from  time_config Where company='" + user + "' order by week"
      },
      success: res => {
        var list = res.result.recordset
        var listMeiTianShiJian = []
        var x = 0
        for (var i = 0; i < list.length; i++) {
          if (list[i].morning_end != null && list[i].morning_end != "" && list[i].morning_start != null && list[i].morning_start != "" && list[i].noon_end != null && list[i].noon_end != "" && list[i].noon_start != null && list[i].noon_start != "" && list[i].night_end != null && list[i].night_end != "" && list[i].night_start != null && list[i].night_start != "") {
            var morning_end = new Date("2021-01-01 " + list[i].morning_end + ':00')
            var morning_start = new Date("2021-01-01 " + list[i].morning_start + ':00')
            var noon_end = new Date("2021-01-01 " + list[i].noon_end + ':00')
            var noon_start = new Date("2021-01-01 " + list[i].noon_start + ':00')
            var night_end = new Date("2021-01-01 " + list[i].night_end + ':00')
            var night_start = new Date("2021-01-01 " + list[i].night_start + ':00')
            var time1 = (morning_end.getMinutes() - morning_start.getMinutes()) + (morning_end.getHours() - morning_start.getHours()) * 60
            var time2 = (noon_end.getMinutes() - noon_start.getMinutes()) + (noon_end.getHours() - noon_start.getHours()) * 60
            var time3 = (night_end.getMinutes() - night_start.getMinutes()) + (night_end.getHours() - night_start.getHours()) * 60
            listMeiTianShiJian[list[i].week] = (time1 + time2 + time3) / 60
          } else {
            if (list[i].week != "6" && list[i].week != "6") {
              x = x + 1
            }
          }
        }
        _this.setData({
          listGongZuoShiJian: list,
          listMeiTianShiJian: listMeiTianShiJian
        })
        if (x > 0) {
          wx.showToast({
            title: '请补全每日工作时间！',
            icon: 'none'
          })
        } else {
          _this.selListDingDan(e, function () {
            _this.selListJiQi(e, function () {
              _this.selListXiuXiri(e, function () {
                _this.chongsuan()
              })
            })
          })
        }
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },
  jinrikegongzuoshuliang: function (e) {
    var _this = this
    var num = 0
    var date = new Date(e[0])
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    var date2 = Y + M + D
    if (_this.data.listXiuXiri[date2] == undefined) {

      if (date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0) {
        var week = date.getDay()
        if (week == 0) {
          week = 7
        }
        num = _this.data.listJiQi[e[1]].num * _this.data.listMeiTianShiJian[week]
      } else {
        var week = date.getDay()
        if (week == 0) {
          week = 7
        }
        var time1 = new Date(date2 + " " + _this.data.listGongZuoShiJian[week - 1].night_start)
        var time2 = new Date(date2 + " " + _this.data.listGongZuoShiJian[week - 1].noon_start)
        var time3 = new Date(date2 + " " + _this.data.listGongZuoShiJian[week - 1].morning_start)
        var riqi1 = new Date(date2 + " " + _this.data.listGongZuoShiJian[week - 1].night_end)
        var riqi2 = new Date(date2 + " " + _this.data.listGongZuoShiJian[week - 1].noon_end)
        var riqi3 = new Date(date2 + " " + _this.data.listGongZuoShiJian[week - 1].morning_end)
        var hours = 0
        if (time1 < date) {
          hours = (riqi1.getMinutes() - date.getMinutes()) / 60 + riqi1.getHours() - date.getHours()
        } else if (time2 < date) {
          hours = (riqi2.getMinutes() - date.getMinutes()) / 60 + riqi2.getHours() - date.getHours()
        } else if (time3 < date) {
          hours = (riqi3.getMinutes() - date.getMinutes()) / 60 + riqi3.getHours() - date.getHours()
        }
        num = _this.data.listJiQi[e[1]].num * hours
      }
      if (Number.isNaN(num) || num == undefined || num == null) {
        num = 0
      }
      return num
    } else {
      num = 0
    }
    if (Number.isNaN(num) || num == undefined || num == null) {
      num = 0
    }
    return num
  },
  // 柱状图
  zhu: function () {
    var that = this
    that.onLoad()
  },
  // 饼显示
  bi: function () {
    var that = this
    if (that.data.dat) {
      that.setData({
        yin: false,
      })
    } else {
      that.setData({
        yin: true,
      })
    }
    that.data.dat = !that.data.dat
  },
  //折线图
  zhexian: function () {
    var that = this
    if (that.data.dat) {
      that.setData({
        yin: false,
      })
    } else {
      that.setData({
        yin: true,
      })
    }
    that.data.dat = !that.data.dat
  },
  //折线图使用
  zhexian_use() {
    console.log("zhexian_use")
    var that = this
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select week,morning_start,morning_end,noon_start,noon_end,night_start,night_end from  time_config Where company='" + user + "' order by week"
      },
      success: res => {
        console.log(res)
        var accounting = res.result.recordsets

        // var options = {
        //   title: {
        //     text: "排产折线图",
        //     textStyle: {
        //       color: '#FFFFFF', //颜色
        //       fontStyle: 'normal', //风格
        //       fontWeight: 'normal', //粗细
        //       fontFamily: 'Microsoft yahei', //字体
        //       fontSize: 20, //大小
        //       align: 'center' //水平对齐
        //     },
        //     //textAlign: 'center'
        //   },
        //   tooltip: {
        //     trigger: "axis",
        //     axisPointer: {
        //       type: "shadow"
        //     }
        //   },
        //   xAxis: {
        //     nameTextStyle: {
        //       fontSize: 15,
        //       color: '#FFFFFF', //颜色
        //     },
        //     name: '日期',
        //     type: 'category',
        //     data: ["1", "2", "3"],
        //     axisLine: {
        //       lineStyle: {
        //         color: '#FFFFFF',
        //         width: 4, //这里是为了突出显示加上的
        //       }
        //     },
        //   },
        //   yAxis: {
        //     nameTextStyle: {
        //       fontSize: 15,
        //       color: '#FFFFFF', //颜色
        //     },
        //     name: '数量',
        //     type: 'value',
        //     axisLine: {
        //       lineStyle: {
        //         color: '#FFFFFF',
        //         width: 4, //这里是为了突出显示加上的
        //       }
        //     },
        //   },
        //   series: [{
        //     //symbol: 'circle',//折线点设置为实心点        
        //     symbolSize: 4, //折线点的大小
        //     type: 'line', //折线图
        //     data: ["1", "2", "3"],
        //     itemStyle: {
        //       normal: {
        //         color: "#5078DB", //折线点的颜色
        //         lineStyle: {
        //           color: "#F4422C" //折线的颜色
        //         }
        //       }
        //     },
        //   }],

        // }
        // console.log("dsfdfdd"),
        //   console.log(that.data.list3)
        // // for (let i = 0; i < that.data.list3.length; i++) {
        // //   //console.log(accounting[i].riqi);
        // //   options.xAxis[0].data.push( that.data.list3[i].riqi)
        // //   options.series[0].data.push( that.data.list3[i].shuliang)
        // // }
        // if (that.data.list3.length > 0) {
        //   // accounting = _this.data.list3;
        //   for (let i = 0; i < _this.data.list3.length; i++) {
        //     // options.series[0].data[i].value = ("5")
        //     // options.xAxis[0].data.push("4")
        //     console.log("2332rds")
        //     options.series[0].data.push("3")

        //   }
        // }
        if (_this.data.list3.length > 0) {
          console.log("accounting122332")
          accounting = _this.data.list3;
        }
        // if(_this.data.tubiaox.length>0)
        {
          var options = {
            // title: {
            //   text: '工作台列使用情况',
            //   show: true
            // },
            title: {
              text: "排产折线图",
              textStyle: {
                color: '#FFFFFF', //颜色
                fontStyle: 'normal', //风格
                fontWeight: 'normal', //粗细
                fontFamily: 'Microsoft yahei', //字体
                fontSize: 20, //大小
                align: 'center' //水平对齐
              },
            },
            // tooltip: {
            //   trigger: "axis",
            //   show: true,
            //   axisPointer: {
            //     type: "shadow"
            //   }
            // },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            grid: {},
            // xAxis: [{
            //   type: "category",
            //   data: ["A", "B", "C", "D"],
            //   axisTick: {
            //     alignWithLabel: true
            //   }
            // }],
            xAxis: {
              // nameTextStyle: {
              //   fontSize: 15,
              //   color: '#FFFFFF', //颜色
              // },
              // name: '日期',
              type: 'category',
              data: ["A", "B", "C", "D"],
              // axisLine: {
              //   lineStyle: {
              //     color: '#FFFFFF',
              //     width: 4, //这里是为了突出显示加上的
              //   }
              // },
            },
            // yAxis: [{
            //   type: "value",
            //   splitNumber: "8"
            // }],
            yAxis: {
              // nameTextStyle: {
              //   fontSize: 15,
              //   color: '#FFFFFF', //颜色
              // },
              // name: '数量',
              type: 'value',
              // axisLine: {
              //   lineStyle: {
              //     color: '#FFFFFF',
              //     width: 4, //这里是为了突出显示加上的
              //   }
              // },
            },
            // series: [{
            //   name: "使用",
            //   type: "bar",
            //   label: {
            //     show: "true",
            //     position: "top"
            //   },
            //   itemStyle: {
            //     color: "#00CC99"
            //   },
            //   data: []
            // }, {
            //   name: "未使用",
            //   type: "bar",
            //   label: {
            //     show: "true",
            //     position: "top"
            //   },
            //   itemStyle: {
            //     color: "#003399"
            //   },
            //   data: []
            // }]
            series: [{
              //symbol: 'circle',//折线点设置为实心点        
              // symbolSize: 4, //折线点的大小
              type: 'line', //折线图
              data: [],
              // itemStyle: {
              //   normal: {
              //     color: "#5078DB", //折线点的颜色
              //     lineStyle: {
              //       color: "#F4422C" //折线的颜色
              //     }
              //   }
              // },
            }],
          }
          console.log("accounting");
          console.log(accounting);
          for (let i = 0; i < accounting.length; i++) {
            // console.log(accounting[i].riqi);
            // options.series[0].data.push(accounting[i].riqi)
            //options.xAxis.data.push(accounting[i].riqi)

            //options.series[1].data.push(5)
            // options.series[0].data.push(accounting[i][0].night_end)
            // options.series[1].data.push(accounting[i][0].noon_start)

            // options.xAxis[0].data.push(accounting[i].riqi)
            // options.series[0].data.push(accounting[i].shuliang)
          }
          console.log(options)
          // myChart.setOption(option);
          that.updChart(options)
        }
        wx.hideLoading({
          success: (res) => {},
        })

        //newedsds
        console.log(options)
        console.log("23223333333333")
        that.updChart(options)
        wx.hideLoading({
          success: (res) => {},
        })
      },
    })
    that.setData({
      yin: true,
      Chart: null
    })
    // _this.users()
  },
  //折线图
  // 使用
  zhexian_users1() {
    var _this = this
    console.log("zhexian_users1")
    // var lidn="line"
    //   _this.setData({
    //     lineChart:lidn
    //   })
    //   console.log(_this.lineChart)
    _this.onLoad()

  },
  zhexian_users() {
    var that = this
    that.init_lineCharts()
    var sql = "select top 1 (select count(A) from baitaoquanxian where A !='') as b from baitaoquanxian ; select top 1 (select count(B) from baitaoquanxian where B !='') as b from baitaoquanxian ; select top 1 (select count(C) from baitaoquanxian where C !='') as b from baitaoquanxian ; select top 1 (select count(D) from baitaoquanxian where D !='') as b from baitaoquanxian"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var accounting = res.result.recordsets
        // var options = {
        //   title: {
        //     text: '工作台列使用情况',
        //     show: true,
        //     left: 'center',
        //     top: '20%'
        //   },
        //   // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
        //   tooltip: {
        //     show: true,
        //     trigger: "item",
        //     formatter: '{a} {b} : {c} ({d}%)'
        //   },
        //   legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: ['A', 'B', 'C', 'D']
        //   },
        //   series: [{
        //     name: "使用",
        //     type: 'pie',
        //     radius: '55%',
        //     center: ['50%', '60%'],
        //     data: [{
        //         value: '',
        //         name: 'A'
        //       },
        //       {
        //         value: '',
        //         name: 'B'
        //       },
        //       {
        //         value: '',
        //         name: 'C'
        //       },
        //       {
        //         value: '',
        //         name: 'D'
        //       },
        //     ],
        //     emphasis: {
        //       itemStyle: {
        //         shadowBlur: 10,
        //         shadowOffsetX: 0,
        //         shadowColor: 'rgba(0, 0, 0, 0.5)'
        //       }
        //     }
        //   }]
        // }

        for (let i = 0; i < accounting.length; i++) {
          console.log(accounting[i][0].b)
          //options.series[0].data[i].value = (accounting[i][0].b)
        }
        console.log(options)
        that.updChart(options)
        wx.hideLoading({
          success: (res) => {},
        })
      },
    })
    that.setData({
      yin: true
    })
  },
  // 使用
  users() {
    var that = this
    var sql = "select top 1 (select count(A) from baitaoquanxian where A !='') as b from baitaoquanxian ; select top 1 (select count(B) from baitaoquanxian where B !='') as b from baitaoquanxian ; select top 1 (select count(C) from baitaoquanxian where C !='') as b from baitaoquanxian ; select top 1 (select count(D) from baitaoquanxian where D !='') as b from baitaoquanxian"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var accounting = res.result.recordsets
        var options = {
          title: {
            text: '工作台列使用情况',
            show: true,
            left: 'center',
            top: '20%'
          },
          // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          tooltip: {
            show: true,
            trigger: "item",
            formatter: '{a} {b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['A', 'B', 'C', 'D']
          },
          series: [{
            name: "使用",
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                value: '',
                name: 'A'
              },
              {
                value: '',
                name: 'B'
              },
              {
                value: '',
                name: 'C'
              },
              {
                value: '',
                name: 'D'
              },
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
        if (that.data.list3.length > 0) {
          accounting = that.data.list3;
        }
        for (let i = 0; i < accounting.length; i++) {
          console.log(accounting[i].shuliang)

          if (accounting[i].shuliang > 0) {
            options.series[0].data.push(accounting[i].shuliang, accounting[i].riqi)
          }
        }
        console.log(options)
        that.updChart(options)
        wx.hideLoading({
          success: (res) => {},
        })
      },
    })
    that.setData({
      yin: true
    })
  },
  // 未使用
  nuser() {
    var that = this
    var sql = "select top 1 (select count(A) from baitaoquanxian where A ='') as a from baitaoquanxian ; select top 1 (select count(B) from baitaoquanxian where B ='') as a from baitaoquanxian ; select top 1 (select count(C) from baitaoquanxian where C ='') as a from baitaoquanxian ; select top 1 (select count(D) from baitaoquanxian where D ='') as a from baitaoquanxian"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var accounting = res.result.recordsets
        var options = {
          title: {
            text: '工作台列未使用情况',
            show: true,
            left: 'center',
            top: '20%'
          },
          // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          tooltip: {
            show: true,
            trigger: "item",
            formatter: '{a} {b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['A', 'B', 'C', 'D']
          },
          series: [{
            name: "未使用",
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                value: '',
                name: 'A'
              },
              {
                value: '',
                name: 'B'
              },
              {
                value: '',
                name: 'C'
              },
              {
                value: '',
                name: 'D'
              },
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


        for (let i = 0; i < accounting.length; i++) {
          options.series[0].data[i].value = (accounting[i][0].a)
        }

        console.log(options)
        that.updChart(options)
        wx.hideLoading({
          success: (res) => {},
        })
      },
    })
    that.setData({
      yin: true
    })
  }

})