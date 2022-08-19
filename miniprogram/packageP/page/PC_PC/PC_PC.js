const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  //新增代码
  delWindow1: false,
  //结束
  data: {
    paichan_leixing: "排产类型1",
    dingDanHao: "",
    index: "",
    ddh: "",
    ssmk: "",
    pcsl: "",
    xdrq: "",
    sfcd: "",
    wcrq: "",
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
        width: "350rpx",
        columnName: "order_id",
        type: "digit",
        isupd: true
      },
      {
        text: "生产数量",
        width: "350rpx",
        columnName: "shengchanshuliang",
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
    pltjShow: false,
    xzddShow: false,
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
    listdd: [],
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
    console.log(_this.data.list)
    //_this.addMK()
    //_this.
    //_this.module_info_show(_this.e)


    //   //结束
  },
  leixing_refresh: function(){
    var _this = this
    var this_leixing = _this.data.paichan_leixing
    if(this_leixing == '排产类型1'){
      _this.setData({
        paichan_leixing: '排产类型2'
      })
    }else{
      _this.setData({
        paichan_leixing: '排产类型1'
      })
    }
    _this.selListGongZuoShiJian('')
    wx.showToast({
      title: '排产类型已变更',
      icon: 'none'
    })
    
  },


  goto_yanshi: function(){
    wx.navigateTo({
      url: "../PC_mp4/PC_mp4?this_url=cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/pakageP_mp4/mokuaidanwei.mp4"
      }) 
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


    for (let i = 0; i < department_list1.length; i++) {

      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "排产") {

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
        } else {
          _this.setData({
            isdisshan: 1
          });

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
        if(num < 0){
          num = 0
        }
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
        let list3 = _this.data.listJiQi[index].list;
        console.log(list3)
        // for (let item in list[index].list) {
        //   console.log(item);
        //   list3.push({
        //       riqi: item,
        //       shuliang: list[index].list[item]
        //     }),
        //     console.log(list3)
        // }
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
      pltjShow: false,
      tjShow2: false,
      xlShow1: false,
      xzmkShow: false
    })
  },
  qxShow2: function () {
    var _this = this
    _this.setData({
      xzmkShow: false,
      rqxzShow: false,
      xzddShow: false,
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
    _this.selListGongZuoShiJian('')
    _this.setData({
      cxShow: true
    })
  },
  sel1: function () {
    var _this = this
    console.log(_this)
    var e = _this.data.dingDanHao
    console.log(_this.data.dingDanHao)
    if(e == ''){
      _this.qxShow()
      return;
    }
    var this_list = _this.data.listJiQi
    console.log(this_list)
    var new_list = []
    for(var i=0; i<this_list.length; i++){
      var this_order = this_list[i].order_id
      if(this_order.indexOf(e) != -1){
        new_list.push({
          list: this_list[i].list,
          name: this_list[i].name,
          order_id: this_list[i].order_id,
          name: this_list[i].name,
          num: this_list[i].num,
          row_num: this_list[i].row_num,
          work_num: this_list[i].work_num,
          work_start_date: this_list[i].work_start_date,
        })
      }
    }
    _this.setData({
      listJiQi: new_list,
      list: new_list,
    })
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
      for (let j=0; j<jiqi[i].list.length; j++) {
        // console.log(123);
        // console.log(item);
        // console.log(jiqi[i].list[item]);
        if (jiqi[i].list[j].riqi == riqi2) {
          list3.push({
            riqi: jiqi[i].list[j].riqi,
            order_id: jiqi[i].order_id,
            name: jiqi[i].name,
            num: jiqi[i].num,
            shuliang: jiqi[i].list[j].shuliang,
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
    let list5 = [];
    if(riqi2 == ""){
      riqi2 = "1900-01-01"
    }
    if(riqi3 == ""){
      riqi3 = "2200-12-31"
    }
    console.log(riqi2)
    console.log(riqi3)
    console.log(jiqi)
    var danhao1 = []
    for(let i=0; i<jiqi.length; i++){
      danhao1.push(jiqi[i].order_id)
    }

    var danhao = []

    for(let i = 0; i < danhao1.length; i++){
      if(danhao.indexOf(danhao1[i]) == -1){
        danhao.push(danhao1[i])
      }
    }
    console.log(danhao)

    for(let i=0;i<danhao.length;i++){
      var rownum = 0
      for(let j=0;j<jiqi.length;j++){
        if(danhao[i] == jiqi[j].order_id){
          for(var k=0; k<jiqi[j].list.length; k++){
            if(jiqi[j].list[k].riqi >= riqi2 && jiqi[j].list[k].riqi <= riqi3){
              rownum = rownum + jiqi[j].list[k].shuliang * 1
            }
          }
        }
      }
      list5.push({
        order_id:danhao[i],
        shengchanshuliang:rownum
      })
    }



    console.log(list5);
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

  add_piliang: function () {
    var _this = this
    _this.setData({
      pltjShow: true,
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
  onCheckboxChange2: function (e) {
    var _this = this
    var countries = ""
    for (var i = 0; i < e.detail.value.length; i++) {
      for (var j = 0; j < _this.data.actions2.length; j++) {
        if (e.detail.value[i] == _this.data.actions2[j].id) {
          countries = countries + " " + _this.data.actions2[j].name
        }
      }
    }
    _this.setData({
      countries,
      listdd: e.detail.value
    })
    console.log(e.detail.value)
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
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select oi.id,oi.code,oi.product_name,oi.norms,oi.set_date,oi.company,oi.order_id as name,oi.set_num-sum(isnull(wd.work_num, 0)) as set_num from order_info as oi left join work_detail as wd on oi.id = wd.order_id where oi.company ='" + user + "' group by oi.id,oi.code,oi.product_name,oi.norms,oi.set_date,oi.company,oi.order_id,oi.set_num having oi.set_num-sum(isnull(wd.work_num, 0)) > 0"
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
  selplDDH: function () {
    var _this = this
    _this.setData({
      xzddShow: true
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
      xlShow5: true
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
  add_dd: function () {
    var _this = this
    _this.setData({
      ddh: _this.data.countries,
      xzddShow: false,
    })
  },
  select5: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow5: false,
        ssmk: e.detail.name,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow5: false,
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
    if (_this.data.ddh != "" && _this.data.ssmk != "" && _this.data.pcsl != "" && _this.data.xdrq != "" && _this.data.sfcd != ""  && _this.data.wcrq != "" && _this.data.list4 != undefined && _this.data.list4.length > 0) {
      if (parseInt(_this.data.addNum) >= parseInt(_this.data.pcsl)) {
        _this.selListGongZuoShiJian('')
        console.log(_this.data.listJiQi)
        var listjiqi = _this.data.listJiQi
        console.log(_this.data.list4)
        console.log(_this.data.ssmkXZ)
        console.log(_this.data.listDingDan)
        for(var i=0; i<_this.data.list4.length; i++){
          for(var k=0; k<_this.data.ssmkXZ.length; k++){
            if(_this.data.list4[i] * 1 == _this.data.ssmkXZ[k].id * 1){
              listjiqi.push({
                order_id: _this.data.ddh,
                name: _this.data.ssmkXZ[k].name,
                num: _this.data.ssmkXZ[k].num,
                row_num: '',
                work_num: _this.data.pcsl,
                work_start_date:_this.data.xdrq,
              })
            }
          }
        }
        if(_this.data.sfcd == '否'){
          var dingdan = _this.data.listDingDan
          dingdan.push({
            name:'',
            id:'',
            order_id:_this.data.ddh,
            row_num:'',
            work_num:_this.data.pcsl,
            work_start_date:_this.data.xdrq,
          })
        }else{
          var dingdan = []
          for(var i=0; i<_this.data.listDingDan.length; i++){
            if(_this.data.addCDIde == _this.data.listDingDan[i].id){
              dingdan.push({
                name:'',
                id:'',
                order_id:_this.data.ddh,
                row_num:'',
                work_num:_this.data.pcsl,
                work_start_date:_this.data.xdrq,
              })
            }
            dingdan.push({
              name:_this.data.listDingDan[i].name,
              id:_this.data.listDingDan[i].id,
              order_id:_this.data.listDingDan[i].order_id,
              row_num:_this.data.listDingDan[i].row_num,
              work_num:_this.data.listDingDan[i].work_num,
              work_start_date:_this.data.listDingDan[i].work_start_date,
            })
          }
        }
        console.log(listjiqi)
        console.log(dingdan)
        _this.setData({
          listJiQi: listjiqi,
          listDingDan:dingdan
        })

        _this.chongsuan()
        console.log(_this.data.listJiQi)
        var panduan = true
        for(var i=0; i<_this.data.listJiQi.length; i++){
          if(_this.data.listJiQi[i].order_id == _this.data.ddh && _this.data.listJiQi[i].work_start_date == _this.data.xdrq && _this.data.listJiQi[i].list != undefined && _this.data.listJiQi[i].list != []){
            var this_list = _this.data.listJiQi[i].list
            if(this_list[this_list.length - 1].riqi > _this.data.wcrq){
              panduan = false
            }
          }
        }

        if(panduan == false){
          wx.showModal({
            title: '提示',
            content: '无法在预计完成日期前完成，是否继续？',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                _this.qxShow()
                return;
              }
            }
          })
        }
        
        var sfcd = ""
        var addCDId = ""
        if (_this.data.sfcd == "是") {
          sfcd = 1
          addCDId = _this.data.addCDIde
        } else {
          sfcd = 0
          addCDId = 0
        }
        console.log(_this.data.addCDIde)
        
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

  add_piliang_dingdan: function () {
    var _this = this
    let user = app.globalData.gongsi;
    var sfcd = 0
    var addCDId = 0
    if (_this.data.ddh != "" && _this.data.ssmk != "" && _this.data.xdrq != "" && _this.data.list4 != undefined && _this.data.list4.length > 0 && _this.data.listdd != undefined && _this.data.listdd.length > 0) {
        
        console.log(_this.data.list4)
        console.log(_this.data.listdd)
        var dingdan_list = []
        for(var i=0; i<_this.data.listdd.length; i++){
          for(var j=0; j<_this.data.actions2.length; j++){
            if(_this.data.listdd[i] * 1 == _this.data.actions2[j].id){
              dingdan_list.push({
                addId: _this.data.actions2[j].id,
                pcsl: _this.data.actions2[j].set_num,
                xdrq: _this.data.xdrq,
                sfcd: sfcd,
                addCDId: addCDId,
                user: user
              })
            }
          }
        }
        
        for(var dd=0; dd<dingdan_list.length; dd++){
          wx.cloud.callFunction({
            name: 'sqlServer_PC',
            data: {
              query: "insert into work_detail(order_id,work_num,work_start_date,is_insert,row_num,company) output inserted.ID values('" + dingdan_list[dd].addId + "','" + dingdan_list[dd].pcsl + "','" + dingdan_list[dd].xdrq + "','" + dingdan_list[dd].sfcd + "','" + dingdan_list[dd].addCDId + "','" + dingdan_list[dd].user + "')"
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
        }

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
        
    } else {
      wx.showToast({
        title: '必填项不能为空！',
        icon: 'none'
      })
    }
  },

  onInput3: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
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

  onChar: function () {
    var that = this
    console.log(that.data.list6)
    wx.navigateTo({
      url: '../PCtuxing/PCtuxing?listJiQi=' +JSON.stringify(that.data.listJiQi) + '&listDingDan=' + JSON.stringify(that.data.listDingDan)
    })
    that.setData({
      more: true,
      mask_up: true,
    })
  },
  
  set_gongshi:function(){
      wx.showToast({
        title: '日生产数=当日可工作小时数*生产模块效率',
        icon: 'none',
        duration:3000,
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