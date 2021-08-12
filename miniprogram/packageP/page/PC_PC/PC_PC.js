const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  //新增代码
  delWindow1: false,
  //结束
  data: {
    dingDanHao: "",
    index: "",
    ddh: "",
    ssmk: "",
    pcsl: "",
    xdrq: "",
    sfcd: "",
    xdsl: "",

    addId: "",
    addCDIde: "",

    riqi: "",
    riqi2: "",
    riqi3: "",
    riqi4: "",
    riqi5: "",
    riqi6: "",
    shuliang: "",
    shengchanshuliang: "",
    shengyushuliang: "",
    countries: "",
    title: [{
        text: "编号",
        width: "200rpx",
        columnName: "row_num",
        type: "digit",
        isupd: true
      },
      {
        text: "订单号",
        width: "200rpx",
        columnName: "order_id",
        type: "digit",
        isupd: true
      },
      {
        text: "所属模块",
        width: "200rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "效率/时",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "生产数量",
        width: "200rpx",
        columnName: "work_num",
        type: "text",
        isupd: true
      },
      {
        text: "开始生产日期",
        width: "300rpx",
        columnName: "work_start_date",
        type: "date",
        isupd: true
      }
    ],
    title2: [{
        text: "日期",
        width: "400rpx",
        columnName: "riqi",
        type: "digit",
        isupd: true
      },
      {
        text: "数量",
        width: "400rpx",
        columnName: "shuliang",
        type: "text",
        isupd: true
      }
    ],
    title3: [{
        text: "日期",
        width: "200rpx",
        columnName: "riqi",
        type: "digit",
        isupd: true
      },
      {
        text: "订单号",
        width: "200rpx",
        columnName: "order_id",
        type: "digit",
        isupd: true
      },
      {
        text: "所属模块",
        width: "200rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "效率/时",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "数量",
        width: "400rpx",
        columnName: "shuliang",
        type: "text",
        isupd: true
      }
    ],
    title4: [{
        text: "订单号",
        width: "200rpx",
        columnName: "order_id",
        type: "digit",
        isupd: true
      },
      {
        text: "所属模块",
        width: "200rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "已生产数量",
        width: "200rpx",
        columnName: "shengchanshuliang",
        type: "text",
        isupd: true
      },
      {
        text: "未生产数量",
        width: "400rpx",
        columnName: "shengyushuliang",
        type: "text",
        isupd: true
      },
    ],
    shiFouChaDan: true,
    xiangqingShow: false,
    xiangqingShow2: false,
    xiangqingShow3: false,
    cxShow: false,
    delWindow1: false,
    delWindow2: false,
    tjShow: false,
    tjShow2: false,
    xlShow1: false,
    xzmkShow: false,
    xzmkShow2: false,
    rqxzShow: false,
    rqxzShow2: false,
    rqxzShow3: false,
    rqxzShow4: false,
    rqxzShow5: false,
    rqxzShow6: false,
    xlShow4: false,
    actions1: [{
      name: "是"
    }, {
      name: "否"
    }],
    actions2: [],
    actions3: [],
    list: [],
    list2: [],
    list3: [],
    list4: [],
    list5: [],
    list6: [],
    ssmkXZ: [],
    ssmkXZID: {},
    listDingDan: [],
    listJiQi: [],
    listXiuXiri: [],
    listGongZuoShiJian: [],
    listMeiTianShiJian: [],
    animationData_moreDo_view: [],
    minHour: 0,
    maxHour: 60,
    minDate: new Date(2000, 1, 1).getTime(),
    maxDate: new Date(2099, 12, 31).getTime(),
    currentDate: new Date().getTime(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var e = ""
    _this.panduanquanxian()
    if (_this.data.isdischa == 1) {
      _this.selListGongZuoShiJian(e)
      _this.setData({
        shiFouChaDan: true,
      })
      //新增代码
      // var _this = this
      var e = ['', '', '']
      // _this.tableShow(e)
      //  _this.panduanquanxian()
    }
    //_this.addMK()
    //_this.
    //_this.module_info_show(_this.e)


    //   //结束
  },

  //新增代码
  //判断权限
  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa: 1,
      isdisgai: 1,
      isdisshan: 1
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log("department_list1")
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "排产") {
        console.log("排产没有添加权限")
        console.log(department_list1[i])
        //添加没权限
        if (department_list1[i].add == "否") {
          _this.setData({
            isdis: 2
          });
          // console.log("否 isdis："+_this.data.isdis)
        } else {
          _this.setData({
            isdis: 1
          });
          // console.log("是 isdis："+_this.data.isdis)

        }
        //删除没权限
        if (department_list1[i].del == "否") {
          _this.setData({
            isdisshan: 2
          });
          console.log("否 isdisshan：" + _this.data.isdisshan)
        } else {
          _this.setData({
            isdisshan: 1
          });
          console.log("是 isdisshan：" + _this.data.isdisshan)
        }
        //查询没权限
        if (department_list1[i].sel == "否") {
          _this.setData({
            isdischa: 2
          });
        } else {
          _this.setData({
            isdischa: 1
          });

        }
        console.log(_this.data.isdis)

      }
    }
  },
  // addMK: function () {
  //   var _this = this
  //   let user = app.globalData.gongsi;
  //   wx.cloud.callFunction({
  //     name: 'sqlServer_PC',
  //     data: {
  //       query: "select name,id from module_type where company = '" + user + "'"
  //     },
  //     success: res => {
  //       var list = res.result.recordset
  //       console.log(res)
  //       _this.setData({
  //         list: list
  //       })
  //       wx.hideLoading({

  //       })
  //     },
  //     err: res => {
  //       console.log("错误!")
  //     },
  //     fail: res => {
  //       wx.showToast({
  //         title: '请求失败！',
  //         icon: 'none'
  //       })
  //       console.log("请求失败！")
  //     }
  //   })
  // },
  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },


  module_info_show: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select * from(select id,isnull((select name from module_type as t where module_info.type_id=t.id),'') as type_name,isnull(name,'') as name,isnull(cast(num as varchar),'') as num,isnull((select name from module_info as i where module_info.parent_id=i.id),'') as parent from module_info where company = '" + user + "') as p where not p.type_name  is null and p.type_name !='' and p.type_name like '%" + e + "%'"
      },

      success: res => {
        var list_module_info = res.result.recordset
        console.log(res)
        _this.setData({
          list_module_info: list_module_info
        })
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
  clickView: function (e) {
    console.log(e);
    var _this = this
    if (_this.data.isdisshan == 1) {
      _this.setData({
        delWindow1: true,
        index: e.currentTarget.dataset.index,
      })
    }
  },
  // //结束
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
  selListGongZuoShiJian: function (e) {
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
        console.log(list);
        console.log(listMeiTianShiJian);
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
  selListJiQi: function (e, callback) {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select oi.order_id,mi.name,mi.num,wd.work_num,wd.row_num,CONVERT(varchar(100), wd.work_start_date, 20) as work_start_date from work_detail as wd left join order_info as oi on wd.order_id = oi.id left join work_module as wm on wd.id = wm.work_id left join module_info as mi on wm.module_id = mi.id where oi.order_id like '%" + e + "%' and wd.company='" + user + "' and (select count(id) from work_module where work_id=wd.id)>0 and mi.num>0 group by oi.order_id,mi.name,mi.num,wd.work_num,wd.work_start_date,wd.row_num,wd.is_insert order by wd.row_num,wd.is_insert,wd.work_start_date asc"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          listJiQi: list,
          list: list
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
  selListDingDan: function (e, callback) {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select oi.order_id,wd.work_num,wd.row_num,CONVERT(varchar(100), wd.work_start_date, 20) as work_start_date,(select id from order_info where order_info.order_id=oi.order_id) as id,('订单号:'+oi.order_id +'编号:'+ cast(wd.row_num as varchar)+'插单:'+ cast(wd.is_insert as varchar)) as name from work_detail as wd left join order_info as oi on wd.order_id = oi.id where oi.order_id like '%" + e + "%' and wd.company='" + user + "'"
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
  clickView: function (e) {
    console.log(e);
    var _this = this
    if (_this.data.isdisshan == 1) {
      var list = [{
        riqi: "",
        shuliang: ""
      }]
      if (e.currentTarget.dataset.column == "order_id") {
        _this.setData({
          delWindow1: true,
          index: e.currentTarget.dataset.index
        })
      } else {
        let index = e.currentTarget.dataset.index;
        let list = _this.data.listJiQi;
        let list3 = [];

        for (let item in list[index].list) {
          console.log(item);
          list3.push({
              riqi: item,
              shuliang: list[index].list[item]
            }),
            console.log(list3)
        }
        _this.setData({
          xiangqingShow: true,
          list3
        })
      }
    }
  },
  qxShow: function () {
    var _this = this
    _this.setData({
      xiangqingShow: false,
      xiangqingShow2: false,
      xiangqingShow3: false,
      cxShow: false,
      delWindow1: false,
      tjShow: false,
      tjShow2: false,
      xlShow1: false,
      xzmkShow: false
    })
  },
  qxShow2: function () {
    var _this = this
    _this.setData({
      xzmkShow: false,
      rqxzShow: false
    })
  },
  // 查询每日生产计划下拉取消
  qxShow22: function () {
    var _this = this
    _this.setData({
      xzmkShow2: false,
      rqxzShow2: false,
      rqxzShow3: false,
      rqxzShow4: false,
      rqxzShow5: false,
      rqxzShow6: false,
    })
  },
  entering: function (e) {
    var _this = this
    _this.setData({
      cxShow: true
    })
  },
  sel1: function () {
    var _this = this
    console.log(_this)
    var e = _this.data.dingDanHao
    _this.selListGongZuoShiJian(e)
    _this.qxShow()
  },

  // 根据日期查询每日生产计划
  sel2: function (e) {

    var _this = this;
    let riqi2 = _this.data.riqi;
    let jiqi = _this.data.listJiQi;
    let list3 = [];

    // console.log(jiqi)
    // console.log(riqi2);
    // console.log(jiqi[1].name)
    // console.log(jiqi[1].list[riqi2]);
    for (let i = 0; i < jiqi.length; i++) {
      // console.log(12);
      for (let item in jiqi[i].list) {
        // console.log(123);
        // console.log(item);
        // console.log(jiqi[i].list[item]);
        if (item == riqi2) {
          list3.push({
            riqi: item,
            order_id: jiqi[i].order_id,
            name: jiqi[i].name,
            num: jiqi[i].num,
            shuliang: jiqi[i].list[item],
          })
        }
      }
      console.log(list3);
      _this.setData({
        xiangqingShow2: true,
        list3,
        xiangqingShow3: false,
        xiangqingShow: false,
        cxShow: false,
        delWindow1: false,
        tjShow: false,
        tjShow2: false,
        xlShow1: false,
        xzmkShow: false
      })

    }

    // _this.selListGongZuoShiJian2()
    // _this.qxShow22()

    // for (let item in list[index].list){

    //   list3.push({
    //     riqi: item,
    //     shuliang: list[index].list[item]
    //   })
    //   console.log(item);   
    // }   
    // _this.setData({
    //    xiangqingShow2: true,
    //    list3
    //  })

  },
  sel3: function (e) {

    var _this = this;
    let riqi2 = _this.data.riqi2;
    let riqi3 = _this.data.riqi3;
    let jiqi = _this.data.listJiQi;
    let list3 = [];
    // console.log(jiqi)
    // console.log(riqi2);
    // console.log(jiqi[1].name)
    // console.log(jiqi[1].list[riqi2]);
    for (let i = 0; i < jiqi.length; i++) {
      // console.log(12);
      for (let item in jiqi[i].list) {
        // console.log(123);
        // console.log(item);
        // console.log(jiqi[i].list[item]);
        if (item >= riqi2 && item <= riqi3) {
          list3.push({
            order_id: jiqi[i].order_id,
            name: jiqi[i].name,
            shengchanshuliang: jiqi[i].list[item],
            shengyushuliang: 0,
          })
          //  console.log(list3);
        } else {
          list3.push({
            order_id: jiqi[i].order_id,
            name: jiqi[i].name,
            shengchanshuliang: 0,
            shengyushuliang: jiqi[i].list[item],
          })
        }
      }
      let list5 = [];
      list3.forEach(el => {
        const res = list5.findIndex(ol => {
          return el.order_id === ol.order_id, el.name === ol.name;
        });
        if (res !== -1) {
          list5[res].shengyushuliang = parseInt(list5[res].shengyushuliang) + parseInt(el.shengyushuliang);
          list5[res].shengchanshuliang = parseInt(list5[res].shengchanshuliang) + parseInt(el.shengchanshuliang);
        } else {
          list5.push(el);
        }
      });
      console.log(list5);
      // console.log(list3);
      _this.setData({
        xiangqingShow3: true,
        list5,
        xiangqingShow2: false,
        xiangqingShow: false,
        cxShow: false,
        delWindow1: false,
        tjShow: false,
        tjShow2: false,
        xlShow1: false,
        xzmkShow: false
      })
    }
  },
  sure1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "delete from work_detail where order_id=(select top 1 id from order_info where order_id='" + _this.data.listJiQi[_this.data.index].order_id + "' ) and company='" + user + "'"
      },
      success: res => {
        wx.showToast({
          title: '删除成功！',
          icon: 'none'
        })
        _this.selListGongZuoShiJian('')
        _this.qxShow()
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
    _this.qxShow()
  },
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
    })
    _this.selDingDanHao()
    _this.selMoKuai()
  },
  selSFCD: function () {
    var _this = this
    _this.setData({
      xlShow1: true
    })
  },
  select1: function (e) {
    var _this = this
    if (e.type == "select" && e.detail.name == "是") {
      _this.setData({
        shiFouChaDan: false,
        sfcd: e.detail.name
      })
    } else if (e.type == "select" && e.detail.name == "否") {
      _this.setData({
        shiFouChaDan: true,
        sfcd: e.detail.name
      })
    }
    _this.setData({
      xlShow1: false
    })
  },
  selRIQI: function () {
    var _this = this
    _this.setData({
      rqxzShow: true,

    })
  },
  // 查询点击日期时间事件
  selRIQI2: function () {
    var _this = this
    _this.setData({
      rqxzShow2: true,

    })
  },
  selRIQI3: function () {
    var _this = this
    _this.setData({
      rqxzShow3: true,
    })
  },
  selRIQI4: function () {
    var _this = this
    _this.setData({
      rqxzShow4: true,
    })
  },
  selRIQI5: function () {
    var _this = this
    _this.setData({
      rqxzShow5: true,
    })
  },
  selRIQI6: function () {
    var _this = this
    _this.setData({
      rqxzShow6: true,
    })
  },

  onCheckboxChange: function (e) {
    var _this = this
    var countries = ""
    for (var i = 0; i < e.detail.value.length; i++) {
      for (var j = 0; j < _this.data.ssmkXZ.length; j++) {
        if (e.detail.value[i] == _this.data.ssmkXZ[j].id) {
          countries = countries + " " + _this.data.ssmkXZ[j].name
        }
      }
    }
    _this.setData({
      countries,
      list4: e.detail.value
    })
  },
  selSSMK: function () {
    var _this = this
    _this.setData({
      xzmkShow: true
    })
  },
  selSSMK2: function () {
    var _this = this
    _this.setData({
      xzmkShow: true
    })
  },
  selDingDanHao: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select oi.id,oi.code,oi.product_name,oi.norms,oi.set_date,oi.company,oi.order_id as name,oi.set_num-sum(isnull(wd.work_num, 0)) as set_num from order_info as oi left join work_detail as wd on oi.id = wd.order_id group by oi.id,oi.code,oi.product_name,oi.norms,oi.set_date,oi.company,oi.order_id,oi.set_num having oi.set_num-sum(isnull(wd.work_num, 0)) > 0"
      },
      success: res => {
        console.log(res.result.recordset)
        _this.setData({
          actions2: res.result.recordset
        })
        console.log(_this.data.actions2)
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
  selMoKuai: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select mi.*,mt.name as typeName,(select name from module_info as mmi where mmi.id = mi.parent_id) as parentName from module_info as mi left join module_type as mt on mi.type_id = mt.id where mi.company = '" + user + "' and num is not null and num > 0"
      },
      success: res => {
        _this.setData({
          ssmkXZ: res.result.recordset
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
  selDDH: function () {
    var _this = this
    _this.setData({
      xlShow2: true
    })
  },
  selDDH2: function () {
    var _this = this
    _this.setData({
      xlShow2: true
    })
  },
  selDDH3: function () {
    var _this = this
    _this.setData({
      xlShow4: true
    })
  },
  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow2: false,
        ddh: e.detail.name,
        pcsl: e.detail.set_num,
        addId: e.detail.id,
        addNum: e.detail.set_num,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow2: false,
        xzmkShow: false,
        rqxzShow: false,
      })
    }
  },

  select3: function (e) {
    var _this = this
    _this.setData({
      xlShow3: false
    })
  },

  selCD: function () {
    var _this = this
    _this.setData({
      xlShow4: true
    })
  },
  select4: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow4: false,
        xdsl: e.detail.name,
        addCDIde: e.detail.id,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow4: false,
      })
    }
  },
  add2: function () {
    var _this = this
    _this.setData({
      ssmk: _this.data.countries,
      xzmkShow: false,
    })
  },
  select5: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow4: false,
        ssmk: e.detail.name,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow4: false,
      })
    }
  },
  add2: function () {
    var _this = this
    _this.setData({
      ssmk: _this.data.countries,
      xzmkShow: false,
    })
  },
  add22: function () {
    var _this = this
    _this.setData({
      riqi: _this.data.countries,
      xzmkShow2: false,
    })
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onInput2: function (event) {
    var _this = this
    console.log(event)
    var date = new Date(event.detail)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    var HH = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":"
    var MM = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":00"
    var riqi = Y + M + D + " " + HH + MM
    _this.setData({
      xdrq: riqi,
    });
    _this.qxShow2()
  },
  // 查询每天的生产计划日期转化
  onInput22: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())

    var riqi = Y + M + D
    _this.setData({
      riqi: riqi,
    });
    _this.qxShow22()
  },
  // 起始日期获取
  onInput33: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())

    var riqi = Y + M + D
    console.log(riqi)
    _this.setData({
      riqi2: riqi,
    });
    _this.qxShow22()
  },
  onInput4: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    console.log(_this)
    var riqi = Y + M + D
    console.log(riqi)
    console.log(_this.data.riqi2)
    if (riqi < _this.data.riqi2) {
      wx.showToast({
        title: '截止日期不可以小于起始日期！',
        icon: 'none'
      })
    } else {
      _this.setData({
        riqi3: riqi,
      });
      _this.qxShow22()
    }

  },
  onInput5: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    console.log(_this)
    var riqi = Y + M + D
    console.log(riqi)
    console.log(_this.data.riqi2)
    if (riqi < _this.data.riqi2) {
      wx.showToast({
        title: '截止日期不可以小于起始日期！',
        icon: 'none'
      })
    } else {
      _this.setData({
        riqi4: riqi,
      });
      _this.qxShow22()
    }

  },
  onInput6: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    console.log(_this)
    var riqi = Y + M + D
    console.log(riqi)
    console.log(_this.data.riqi2)
    if (riqi < _this.data.riqi2) {
      wx.showToast({
        title: '截止日期不可以小于起始日期！',
        icon: 'none'
      })
    } else {
      _this.setData({
        riqi5: riqi,
      });
      _this.qxShow22()
    }

  },


  add1: function () {
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.ddh != "" && _this.data.ssmk != "" && _this.data.pcsl != "" && _this.data.xdrq != "" && _this.data.sfcd != "" && _this.data.list4 != undefined && _this.data.list4.length > 0) {
      if (parseInt(_this.data.addNum) >= parseInt(_this.data.pcsl)) {
        var sfcd = ""
        var addCDId = ""
        if (_this.data.sfcd == "是") {
          sfcd = 1
          addCDId = _this.data.addCDId
        } else {
          sfcd = 0
          addCDId = 0
        }
        wx.cloud.callFunction({
          name: 'sqlServer_PC',
          data: {
            query: "insert into work_detail(order_id,work_num,work_start_date,is_insert,row_num,company) output inserted.ID values('" + _this.data.addId + "','" + _this.data.pcsl + "','" + _this.data.xdrq + "','" + sfcd + "','" + addCDId + "','" + user + "')"
          },
          success: res => {
            var id = res.result.recordset[0].ID
            var sql = "insert into work_module(work_id,module_id) output inserted.ID values"
            for (var i = 0; i < _this.data.list4.length; i++) {
              sql = sql + "('" + id + "','" + _this.data.list4[i] + "'),"
            }
            sql = sql.substr(0, sql.length - 1)
            wx.cloud.callFunction({
              name: 'sqlServer_PC',
              data: {
                query: sql
              },
              success: res => {

                wx.showToast({
                  title: '添加成功！',
                  icon: 'none'
                })
                _this.setData({
                  ddh: "",
                  ssmk: "",
                  pcsl: "",
                  xdrq: "",
                  sfcd: "",
                  xdsl: "",
                })
                _this.selListGongZuoShiJian('')
                _this.qxShow()
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
            if (sfcd == 0) {
              var maxId = parseInt(id) + 1
              wx.cloud.callFunction({
                name: 'sqlServer_PC',
                data: {
                  query: "update work_detail set row_num='" + maxId + "' where id='" + id + "'"
                },
                success: res => {

                  wx.showToast({
                    title: '添加成功！',
                    icon: 'none'
                  })
                  _this.setData({
                    ddh: "",
                    ssmk: "",
                    pcsl: "",
                    xdrq: "",
                    sfcd: "",
                    xdsl: "",
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
            }
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
      } else {
        wx.showToast({
          title: '排产数量不能大于订单数量！',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '必填项不能为空！',
        icon: 'none'
      })
    }
  },
  // onInput3: function (e) {
  //   var _this = this
  //   let column = e.currentTarget.dataset.column
  //   _this.setData({
  //     [column]: e.detail.value
  //   })
  // },
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
  //  更多操做点击事件
  moreDo: function () {
    var _this = this;
    _this.showView(_this, "moreDo")
    _this.selDingDanHao()
    _this.selMoKuai()
  },
  // 侧面窗口
  showView: function (_this, type) {
    var animation = wx.createAnimation({
      duration: 300
    })
    _this.setData({
      shiFouChaDan: false
    })

    setTimeout(function () {
      switch (type) {
        case "moreDo":
          animation.translateX(0).step()
          _this.setData({
            animationData_moreDo_view: animation.export(),
            hid_view: true
          })
          break;
      }
    }, 100)

  },
  // 侧面窗口背景和动画
  hidView: function (_this, type) {
    var animation = wx.createAnimation({
      duration: 300
    })

    switch (type) {
      case "moreDo":
        animation.translateX(-300).step()
        _this.setData({
          animationData_moreDo_view: animation.export(),
          hid_view: false
        })
        break;
    }
  },
  hid_view: function () {
    var _this = this;
    _this.hidView(_this, "moreDo")

  },
  //图表
  sel4: function (e) {

    var _this = this;
    let riqi4 = _this.data.riqi4;
    let riqi5 = _this.data.riqi5;
    let jiqi = _this.data.listJiQi;
    let list3 = [];
    // console.log(jiqi)
    // console.log(riqi2);
    // console.log(jiqi[1].name)
    // console.log(jiqi[1].list[riqi2]);
    for (let i = 0; i < jiqi.length; i++) {
      for (let item in jiqi[i].list) {
        if (item >= riqi4 && item <= riqi5) {
          list3.push({
            riqi6: item,
            shuliang: jiqi[i].list[item],
          })
        }
      }
    }

    _this.setData({
      xiangqingShow3: true,
      list3,
      xiangqingShow2: false,
      xiangqingShow: false,
      cxShow: false,
      delWindow1: false,
      tjShow: false,
      tjShow2: false,
      xlShow1: false,
      xzmkShow: false
    })

  },
  // getAccounting : function(e){
  //   wx.showLoading({
  //     title : '加载中',
  //     mask : 'true'
  //   })
  //   var _this=this;
  //   let riqi4 = _this.data.riqi4;
  //   let riqi5 = _this.data.riqi5;
  //   let jiqi= _this.data.listJiQi;
  //   let list3=[]; 

  //     for(let i=0;i<jiqi.length;i++){
  //       for(let item in jiqi[i].list){        
  //           if(item>=riqi4&&item<=riqi5){
  //             list3.push({
  //                  riqi6:item,
  //                  shuliang:jiqi[i].list[item],
  //                })
  //            }    
  //       }
  //     }

  //       var accounting = res.result.recordset
  //       var options = {
  //         title : {
  //           show : false
  //         },
  //         tooltip: {
  //           trigger: "axis",
  //           axisPointer: {
  //             type: "shadow"
  //           }
  //         },
  //         grid: {},
  //         xAxis: [{
  //           type: "category",
  //           data: [list3.riqi6],
  //           axisTick: {
  //             alignWithLabel: true
  //           }
  //         }],
  //         yAxis: [{
  //           type: "value",
  //           splitNumber : "8"
  //         }],
  //         series: [{
  //           name: "生产数量",
  //           type: "bar",
  //           label : {
  //             show : "true",
  //             position : "top"
  //           },
  //           itemStyle : {
  //             color : "#00CC99"
  //           },
  //           data: []
  //         },]
  //       }
  //       for(let i=0;i<accounting.length;i++){
  //         options.series[0].data.push(accounting[i].sum_load)
  //         options.series[1].data.push(accounting[i].sum_borrowed)
  //       }
  //       _this.updChart(options)
  //       _this.updOthers(0)
  //       wx.hideLoading({
  //         success: (res) => {},
  //       })

  // },
  // 图形分析
  picture() {
    var _this = this;
    var riqi4 = _this.data.riqi4;
    var riqi5 = _this.data.riqi5;
    var jiqi = _this.data.listJiQi;
    console.log(_this)
    var oid = _this.data.ssmk;
    console.log(oid)
    var dname = _this.data.ddh;
    console.log(dname)
    // console.log(jiqi)
    let list6 = [];
    for (let i = 0; i < jiqi.length; i++) {
      if (jiqi[i].order_id == oid && jiqi[i].name == dname) {
        for (let item in jiqi[i].list) {
          if (item >= riqi4 && item <= riqi5) {
            console.log(1)
            list6.push({
              riqi6: item,
              shuliang: jiqi[i].list[item],
            })
            console.log(item)
            console.log(jiqi[i].list[item])
          }
        }
      }
    }
    _this.setData({
      list6
    })
    _this.onChar();

  },
  onChar: function () {
    var that = this
    console.log(that.data.list6)
    wx.navigateTo({
      url: '../PCtuxing/PCtuxing?list6=' + that.data.list6,
    })
    that.setData({
      more: true,
      mask_up: true,
    })
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
    var _this = this;
    _this.hid_view()
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