const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cxShow: false,
    xlShow1: false,
    list: [],
    list2: [],
    actions1: [],
    riqi1:'',
    riqi2:'',
    title: [{
        text: "类别",
        width: "200rpx",
        columnName: "type",
        type: "digit",
        isupd: true
      },
      {
        text: "模块名称",
        width: "200rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "产量/小时",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "父模块",
        width: "200rpx",
        columnName: "parentName",
        type: "text",
        isupd: true
      },
      {
        text: "合计产量",
        width: "200rpx",
        columnName: "workNum",
        type: "date",
        isupd: true
      }
    ],
    title2: [{
        text: "订单号",
        width: "200rpx",
        columnName: "id",
        type: "digit",
        isupd: true
      },
      {
        text: "类别",
        width: "200rpx",
        columnName: "type",
        type: "digit",
        isupd: true
      },
      {
        text: "模块名称",
        width: "200rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "产量/小时",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "父模块",
        width: "200rpx",
        columnName: "parentName",
        type: "text",
        isupd: true
      },
      {
        text: "合计产量",
        width: "200rpx",
        columnName: "workNum",
        type: "date",
        isupd: true
      }
    ],
    oid: "",
    modal: "",
    id: "",
    name: "",
    paichan_leixing:'排产类型2',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var e = ""
    _this.panduanquanxian()
    if (_this.data.isdischa == 1) {
      // _this.selListGongZuoShiJian('')
      // console.log(_this.data.listJiQi)
      _this.selListGongZuoShiJian('')
      console.log(_this.data.listJiQi)
      //新增代码 
      var _this = this
      var e = ['','']
      _this.tableShow(e)
      //  _this.panduanquanxian()
    }
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  arr1:function (array) {
    var arr = []; //一个新的数组存放去重后的结果
    for (var i = 0; i < array.length; i++) {
        if (arr.indexOf(array[i]) == -1) { //indexof()方法判断在数组中的位置，若不存在，返回-1
            arr.push(array[i]);
        }
    }
    return arr;
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
        query: "select oi.order_id,mi.name,mi.num,wd.work_num,wd.row_num,CONVERT(varchar(100), wd.work_start_date, 20) as work_start_date,'' as list from work_detail as wd left join order_info as oi on wd.order_id = oi.id left join work_module as wm on wd.id = wm.work_id left join module_info as mi on wm.module_id = mi.id where oi.order_id like '%" + e + "%' and wd.company='" + user + "' and (select count(id) from work_module where work_id=wd.id)>0 and mi.num>0 group by oi.order_id,mi.name,mi.num,wd.work_num,wd.work_start_date,wd.row_num,wd.is_insert order by wd.row_num,wd.is_insert,wd.work_start_date asc"
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
        query: "select oi.order_id,wd.work_num,wd.row_num,CONVERT(varchar(100), wd.work_start_date, 20) as work_start_date,(select top 1 id from order_info where order_info.order_id=oi.order_id) as id,('订单号:'+oi.order_id +'编号:'+ cast(wd.row_num as varchar)+'插单:'+ cast(wd.is_insert as varchar)) as name from work_detail as wd left join order_info as oi on wd.order_id = oi.id where oi.order_id like '%" + e + "%' and wd.company='" + user + "'"
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

  chongsuan: function () {
    var _this = this
    console.log(_this.data.listDingDan)
    console.log(_this.data.listJiQi)

    var this_dingdan = ""
    for(var i=0; i<_this.data.listJiQi.length; i++){
      if(this_dingdan == ""){
        this_dingdan = _this.data.listJiQi[i].order_id + "," + _this.data.listJiQi[i].work_start_date
      }else{
        this_dingdan = this_dingdan + "`" + _this.data.listJiQi[i].order_id + "," + _this.data.listJiQi[i].work_start_date
      }
    }
    //订单去重，用于循环取同一订单同时生产的模块
    this_dingdan = this_dingdan.split("`")
    this_dingdan = _this.arr1(this_dingdan)

    //模块去重，用于记录模块结束工作时间和当日剩余时长
    var this_mokuai = ""
    for(var i=0; i<_this.data.listJiQi.length; i++){
      if(this_mokuai == ""){
        this_mokuai = _this.data.listJiQi[i].name 
      }else{
        this_mokuai = this_mokuai + "`" + _this.data.listJiQi[i].name
      }
    }
    this_mokuai = this_mokuai.split("`")
    this_mokuai = _this.arr1(this_mokuai)
    var mokuai_list = []
    for(var i=0; i<this_mokuai.length; i++){
      mokuai_list.push({
        name:this_mokuai[i],
        stop_date:'',
        user_hour:''
      })
    }
    //循环订单
    for(var i=0; i<this_dingdan.length; i++){
      var this_dingdan_jiqi = []
      //循环机器，取相同订单号的机器
      for(var j=0; j<_this.data.listJiQi.length; j++){
        if(this_dingdan[i] == _this.data.listJiQi[j].order_id + "," + _this.data.listJiQi[j].work_start_date){
          var this_jiqi = _this.data.listJiQi[j]
          this_dingdan_jiqi.push({
            list:_this.data.listJiQi[j].list,
            name:_this.data.listJiQi[j].name,
            num:_this.data.listJiQi[j].num,
            order_id:_this.data.listJiQi[j].order_id,
            row_num:_this.data.listJiQi[j].row_num,
            work_num:_this.data.listJiQi[j].work_num,
            work_start_date:_this.data.listJiQi[j].work_start_date,
            work_hour_sum:'',
            list_jiqi_num : j
          })
        }
      }
      //如果没有机器，跳过此条订单
      if(this_dingdan_jiqi.length == 0){
        continue;
      }
      //订单总生产数量
      var zong_shengchan_num = this_dingdan_jiqi[0].work_num
      //订单开始时间
      var dingdan_start_date_chuo = new Date(this_dingdan_jiqi[0].work_start_date)
      var dingdan_start_date = this_dingdan_jiqi[0].work_start_date
      dingdan_start_date = dingdan_start_date.split(" ")[0]
      //当日生产数量
      
      if(_this.data.paichan_leixing == '排产类型1'){
        do{
          var day_num = 0
          var day_num_list = []
            //循环判断每日每个模块应生产数量
          for(var j=0; j<this_dingdan_jiqi.length; j++){
            for(var k=0; k<mokuai_list.length; k++){
              //判断模块停止生产时间
              if(this_dingdan_jiqi[j].name == mokuai_list[k].name){
                if(mokuai_list[k].stop_date == "" || mokuai_list[k].stop_date <= dingdan_start_date){
                  var week = dingdan_start_date_chuo.getDay()
                  if (week == 0) {
                    week = 7
                  }
                  //如果模块停止时间和订单开始时间相同
                  if(mokuai_list[k].stop_date == dingdan_start_date){
                    day_num = day_num + (_this.data.listMeiTianShiJian[week] - mokuai_list[k].user_hour) * this_dingdan_jiqi[j].num
                    var today_num = (_this.data.listMeiTianShiJian[week] - mokuai_list[k].user_hour) * this_dingdan_jiqi[j].num
                    var today_hour = (_this.data.listMeiTianShiJian[week] - mokuai_list[k].user_hour)
                  }else if(mokuai_list[k].stop_date < dingdan_start_date){
                    day_num = day_num + (_this.data.listMeiTianShiJian[week]) * this_dingdan_jiqi[j].num
                    var today_num = (_this.data.listMeiTianShiJian[week]) * this_dingdan_jiqi[j].num
                    var today_hour = (_this.data.listMeiTianShiJian[week])
                  }else{
                    day_num = day_num + 0
                    var today_num = 0
                    var today_hour = 0
                  }
                  if(today_hour < 0 ){
                    today_hour = 0
                    today_num = 0
                  }
                  day_num_list.push({
                    name: mokuai_list[k].name,
                    today_num: today_num,
                    today_hour: today_hour,
                    hour_num: this_dingdan_jiqi[j].num,
                    this_shengchan_hour:'',
                    this_shengchan_num:'',
                    this_date:dingdan_start_date,
                  })
                }
              }
            }
          }
          for(var j=0; j<day_num_list.length; j++){
            if(day_num_list[j].today_num >= zong_shengchan_num){
              console.log('当日此'+ day_num_list[j].name +'模块可完成生产')
              var shijian = zong_shengchan_num / day_num_list[j].hour_num
              day_num_list[j].this_shengchan_hour = shijian
              day_num_list[j].this_shengchan_num = zong_shengchan_num
              zong_shengchan_num = 0 
              break;
            }else{
              var shijian = day_num_list[j].today_hour
              day_num_list[j].this_shengchan_hour = shijian
              var today_num = day_num_list[j].today_num
              day_num_list[j].this_shengchan_num = today_num
              zong_shengchan_num = zong_shengchan_num - today_num
            }
          }
          for(var j=0; j<day_num_list.length; j++){
            if(day_num_list[j].this_shengchan_hour != '' && day_num_list[j].this_shengchan_hour != 0){
              if(this_dingdan_jiqi[j].list == undefined || this_dingdan_jiqi[j].list == ''){
                var shengchan_list = []
              }else{
                var shengchan_list = this_dingdan_jiqi[j]['list']
              }
              shengchan_list.push({
                riqi:day_num_list[j].this_date, 
                shuliang:day_num_list[j].this_shengchan_num
              })
  
              this_dingdan_jiqi[j]['list'] = shengchan_list
              for(var k=0; k<mokuai_list.length; k++){
                if(day_num_list[j].name == mokuai_list[k].name && day_num_list[j].this_shengchan_hour != '' &&  day_num_list[j].this_shengchan_hour != 0){
                  if(day_num_list[j].this_date == mokuai_list[k].stop_date && day_num_list[j].this_shengchan_hour * 1 < _this.data.listMeiTianShiJian[week] * 1){
                    mokuai_list[k].stop_date = day_num_list[j].this_date
                    mokuai_list[k].user_hour =  mokuai_list[k].user_hour * 1 + day_num_list[j].this_shengchan_hour * 1 
                    break;
                  }else{
                    mokuai_list[k].stop_date = day_num_list[j].this_date
                    mokuai_list[k].user_hour = day_num_list[j].this_shengchan_hour * 1
                    break;
                  }
                  
                }
              }
            }
          }
  
          var dingdan_start_date_chuo = new Date(dingdan_start_date_chuo.setDate(dingdan_start_date_chuo.getDate() + 1));
          var Y = dingdan_start_date_chuo.getFullYear() + '-'
          var M = (dingdan_start_date_chuo.getMonth() + 1 < 10 ? '0' + (dingdan_start_date_chuo.getMonth() + 1) : dingdan_start_date_chuo.getMonth() + 1) + '-'
          var D = (dingdan_start_date_chuo.getDate() < 10 ? '0' + dingdan_start_date_chuo.getDate() : dingdan_start_date_chuo.getDate())
          var dingdan_start_date = Y + M + D
  
        }while(zong_shengchan_num > 0)
      }else{

        
        var hour_num_sum = 0
        var work_num = this_dingdan_jiqi[0].work_num
        for(var j=0; j<this_dingdan_jiqi.length; j++){
          hour_num_sum = hour_num_sum + this_dingdan_jiqi[j].num
        }
        var jiqi_hour_num = work_num / hour_num_sum
        for(var j=0; j<this_dingdan_jiqi.length; j++){
          this_dingdan_jiqi[j].work_hour_sum = jiqi_hour_num
        }

        do{
          var day_num_list = []
          for(var j=0; j<this_dingdan_jiqi.length; j++){
            for(var k=0; k<mokuai_list.length; k++){
              //判断模块停止生产时间
              if(this_dingdan_jiqi[j].name == mokuai_list[k].name){
                if(mokuai_list[k].stop_date == "" || mokuai_list[k].stop_date <= dingdan_start_date){
                  var week = dingdan_start_date_chuo.getDay()
                  if (week == 0) {
                    week = 7
                  }
                  //如果模块停止时间和订单开始时间相同
                  if(mokuai_list[k].stop_date == dingdan_start_date){
                    day_num = day_num + (_this.data.listMeiTianShiJian[week] - mokuai_list[k].user_hour) * this_dingdan_jiqi[j].num
                    var today_num = (_this.data.listMeiTianShiJian[week] - mokuai_list[k].user_hour) * this_dingdan_jiqi[j].num
                    var today_hour = (_this.data.listMeiTianShiJian[week] - mokuai_list[k].user_hour)
                    if(today_hour > this_dingdan_jiqi[j].work_hour_sum * 1){
                      today_hour = this_dingdan_jiqi[j].work_hour_sum * 1
                      today_num = today_hour * this_dingdan_jiqi[j].num
                    }
                  }else if(mokuai_list[k].stop_date < dingdan_start_date){
                    day_num = day_num + (_this.data.listMeiTianShiJian[week]) * this_dingdan_jiqi[j].num
                    var today_num = (_this.data.listMeiTianShiJian[week]) * this_dingdan_jiqi[j].num
                    var today_hour = (_this.data.listMeiTianShiJian[week])
                    if(today_hour > this_dingdan_jiqi[j].work_hour_sum * 1){
                      today_hour = this_dingdan_jiqi[j].work_hour_sum * 1
                      today_num = today_hour * this_dingdan_jiqi[j].num
                    }
                  }else{
                    day_num = day_num + 0
                    var today_num = 0
                    var today_hour = 0
                  }
                  if(today_hour < 0 ){
                    today_hour = 0
                    today_num = 0
                  }
                  today_num = today_num.toFixed(1)
                  day_num_list.push({
                    name: mokuai_list[k].name,
                    today_num: today_num,
                    today_hour: today_hour,
                    hour_num: this_dingdan_jiqi[j].num,
                    this_shengchan_hour:'',
                    this_shengchan_num:'',
                    this_date:dingdan_start_date,
                  })
                }
              }
            }
          }
          for(var j=0; j<day_num_list.length; j++){
            for(var k=0; k<this_dingdan_jiqi.length; k++){
              if(day_num_list[j].name == this_dingdan_jiqi[k].name){
                if(day_num_list[j].today_hour > this_dingdan_jiqi[k].work_hour_sum && this_dingdan_jiqi[k].work_hour_sum > 0){
                  day_num_list[j].this_shengchan_hour = this_dingdan_jiqi[k].work_hour_sum * 1
                  day_num_list[j].this_shengchan_num = this_dingdan_jiqi[k].work_hour_sum * day_num_list[k].hour_num
                  this_dingdan_jiqi[k].work_hour_sum = 0
                }else{
                  day_num_list[j].this_shengchan_hour = day_num_list[j].today_hour * 1
                  day_num_list[j].this_shengchan_num = day_num_list[j].today_hour * day_num_list[k].hour_num
                  this_dingdan_jiqi[k].work_hour_sum = this_dingdan_jiqi[k].work_hour_sum - day_num_list[j].today_hour * 1
                }
                day_num_list[j].this_shengchan_num = day_num_list[j].this_shengchan_num.toFixed(1)
              }
            }
          }
          for(var j=0; j<day_num_list.length; j++){
            if(day_num_list[j].this_shengchan_hour != '' && day_num_list[j].this_shengchan_hour != 0){
              if(this_dingdan_jiqi[j].list == undefined || this_dingdan_jiqi[j].list == ''){
                var shengchan_list = []
              }else{
                var shengchan_list = this_dingdan_jiqi[j]['list']
              }
              shengchan_list.push({
                riqi:day_num_list[j].this_date, 
                shuliang:day_num_list[j].this_shengchan_num
              })
  
              this_dingdan_jiqi[j]['list'] = shengchan_list
              for(var k=0; k<mokuai_list.length; k++){
                if(day_num_list[j].name == mokuai_list[k].name && day_num_list[j].this_shengchan_hour != '' &&  day_num_list[j].this_shengchan_hour != 0){
                  if(day_num_list[j].this_date == mokuai_list[k].stop_date && day_num_list[j].this_shengchan_hour * 1 < _this.data.listMeiTianShiJian[week] * 1){
                    mokuai_list[k].stop_date = day_num_list[j].this_date
                    mokuai_list[k].user_hour =  mokuai_list[k].user_hour * 1 + day_num_list[j].this_shengchan_hour * 1 
                    break;
                  }else{
                    mokuai_list[k].stop_date = day_num_list[j].this_date
                    mokuai_list[k].user_hour = day_num_list[j].this_shengchan_hour * 1
                    break;
                  }
                  
                }
              }
            }
          }
  
          var dingdan_start_date_chuo = new Date(dingdan_start_date_chuo.setDate(dingdan_start_date_chuo.getDate() + 1));
          var Y = dingdan_start_date_chuo.getFullYear() + '-'
          var M = (dingdan_start_date_chuo.getMonth() + 1 < 10 ? '0' + (dingdan_start_date_chuo.getMonth() + 1) : dingdan_start_date_chuo.getMonth() + 1) + '-'
          var D = (dingdan_start_date_chuo.getDate() < 10 ? '0' + dingdan_start_date_chuo.getDate() : dingdan_start_date_chuo.getDate())
          var dingdan_start_date = Y + M + D
  
          var hour_panduan = 0
          for(var j=0; j<this_dingdan_jiqi.length; j++){
            if(this_dingdan_jiqi[j].work_hour_sum > 0){
              hour_panduan = hour_panduan + this_dingdan_jiqi[j].work_hour_sum * 1
            }
          }
        }while(hour_panduan > 0)

      }
      for(var j=0; j<_this.data.listJiQi.length; j++){
        for(var k=0; k<this_dingdan_jiqi.length; k++){
          if(_this.data.listJiQi[j].order_id == this_dingdan_jiqi[k].order_id && _this.data.listJiQi[j].work_start_date == this_dingdan_jiqi[k].work_start_date && _this.data.listJiQi[j].name == this_dingdan_jiqi[k].name){
            _this.data.listJiQi[j].list = this_dingdan_jiqi[k].list
          }
        }
      }

    }
    console.log(_this.data.listJiQi)
    _this.setData({
      mokuai_list
    })
    console.log(_this.data.mokuai_list)
    
    _this.tableShow(['',''])

  },


  goto_yanshi: function(){
    wx.navigateTo({
      url: "../PC_mp4/PC_mp4?this_url=cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/pakageP_mp4/huizong.mp4"
      }) 
  },

  //新增代码
  //判断权限
  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa: 1,
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log("department_list1")
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "汇总") {
        console.log("汇总没有添加权限")
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
  addMK: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select name,id from module_type where company = '" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        console.log(res)
        _this.setData({
          list: list
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

  // //结束
  tableShow: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    var sql = ""
    if (e[0] == "") {
      sql = "select mt.name as type,mi.name as name,mi.num as num,isnull((select name from module_info where id = mi.parent_id),'') as parentName,sum(wd.work_num) as workNum from work_module as wm left join module_info as mi on wm.module_id = mi.id left join module_type as mt on mi.type_id = mt.id left join work_detail as wd on wm.work_id = wd.id left join order_info as o on wd.order_id=o.id where wd.company = '" + user + "' and isnull(mt.name,'') != '' and o.order_id like'%" + e[1] + "%' group by mt.name, mi.name, mi.num, mi.parent_id"
    } else {
      sql = "select mt.name as type,mi.name as name,mi.num as num,isnull((select name from module_info where id = mi.parent_id),'') as parentName,sum(wd.work_num) as workNum from work_module as wm left join module_info as mi on wm.module_id = mi.id left join module_type as mt on mi.type_id = mt.id left join work_detail as wd on wm.work_id = wd.id left join order_info as o on wd.order_id=o.id where wd.company = '" + user + "' and isnull(mt.name,'') != '' and mi.type_id = '" + e[0] + "' and o.order_id like'%" + e[1] + "%' group by mt.name,mi.name,mi.num,mi.parent_id"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var riqi1 = _this.data.riqi1
        var riqi2 = _this.data.riqi2
        console.log(_this.data.listJiQi)
        console.log(list)
        if(riqi1 == ''){
          riqi1 = '1900-01-01'
        }
        if(riqi2 == ''){
          riqi2 = '2100-12-31'
        }
        if(e == true){
          for(var i=0; i<list.length; i++){
            list[i].workNum = 0
          }
          for(var i=0; i<list.length; i++){
            for(var j=0; j<_this.data.listJiQi.length; j++){
              if(_this.data.listJiQi[j].name == list[i].name){
                var this_list = _this.data.listJiQi[j].list
                if(this_list != undefined){
                  for(var k=0; k<this_list.length; k++){
                    if(this_list[k].riqi >= riqi1 && this_list[k].riqi <= riqi2){
                      list[i].workNum = list[i].workNum * 1 + this_list[k].shuliang * 1
                    }
                  }
                }
              }
            }
          }
        }
        
        _this.setData({
          list_mk: list
        })
        console.log(list)
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
  // 按照订单号查询
  tableShow2: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    var sql = ""
    if (e == "") {
      sql = "select mt.name as type,mi.name as name,mi.num as num,(select name from module_info where id = mi.parent_id) as parentName,sum(wd.work_num) as workNum from work_module as wm left join module_info as mi on wm.module_id = mi.id left join module_type as mt on mi.type_id = mt.id left join work_detail as wd on wm.work_id = wd.id left join order_info as o on wd.order_id=o.id where wd.company = '" + user + "' and o.order_id like'%" + e + "%' group by mt.name, mi.name, mi.num, mi.parent_id"
    } else {
      sql = "select mt.name as type,mi.name as name,mi.num as num,(select name from module_info where id = mi.parent_id) as parentName,sum(wd.work_num) as workNum from work_module as wm left join module_info as mi on wm.module_id = mi.id left join module_type as mt on mi.type_id = mt.id left join work_detail as wd on wm.work_id = wd.id left join order_info as o on wd.order_id=o.id where wd.company = '" + user + "' and o.order_id like'%" + e + "%' group by mt.name,mi.name,mi.num,mi.parent_id"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list_mk: list
        })
        console.log(list)
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
  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      riqi1:'',
      riqi2:'',
      id:'',
      oid:'',
    })
  },
  qxShow: function () {
    var _this = this
    _this.setData({
      cxShow: false
    })
  },
  cx: function () {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "SELECT id,name FROM module_type where company='" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          actions1: list,
          xlShow1: true,
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
  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow1: false,
        id: e.detail.id,
        modal: e.detail.name,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow1: false,
      })
    }
  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
  onInput2: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
  sel1: function () {
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == ''){
      start_date = '1900-01-01'
    }if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    var e = [_this.data.id,_this.data.oid]
    _this.tableShow(e)
    _this.setData({
      cxShow: false,
      modal: "",
    })
    wx.showToast({
      title: '查询成功！',
      icon: 'none',
      duration: 3000
    })
  },
  // 按照单号查询
  sel2: function () {
    var _this = this
    var e = _this.data.oid
    console.log(_this.data.oid)
    _this.tableShow2(e)
    _this.setData({
      cxShow: false,
      oid: "",
    })
  },

  sel3: function () {
    var _this = this
    var riqi1 = _this.data.riqi1
    var riqi2 = _this.data.riqi2
    console.log(riqi1 + "  " + riqi2)
    _this.tableShow(true)

    _this.setData({
      cxShow: false,
      riqi1: "",
      riqi2:"",
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