// package_huaqun/page/zhguanli/zhguanli.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  data: {
    quanxian_type:['管理员','操作员','客户'],
    list: [],
    title: [
      {
        text: "日期",
        width: "250rpx",
        columnName: "insert_date",
        type: "text",
        isupd: true
      },{
        text: "客户名称",
        width: "250rpx",
        columnName: "customer_name",
        type: "text",
        isupd: true
      },
      {
        text: "送货员",
        width: "250rpx",
        columnName: "songhuoyuan",
        type: "text",
        isupd: true
      },
      {
        text: "配送情况",
        width: "250rpx",
        columnName: "wancheng",
        type: "text",
        isupd: true
      },
      {
        text: "金额",
        width: "250rpx",
        columnName: "money",
        type: "text",
        isupd: true
      },
      {
        text: "收款情况",
        width: "250rpx",
        columnName: "shoukuan",
        type: "text",
        isupd: true
      },
      {
        text: "配送区域",
        width: "250rpx",
        columnName: "quyu",
        type: "text",
        isupd: true
      },
      {
        text: "安装地址",
        width: "250rpx",
        columnName: "anzhuang_address",
        type: "text",
        isupd: true
      },
      {
        text: "客户订单号",
        width: "250rpx",
        columnName: "customer_order",
        type: "text",
        isupd: true
      },
      {
        text: "送货单号",
        width: "250rpx",
        columnName: "songhuo_danhao",
        type: "text",
        isupd: true,
        
      },
      {
        text: "单号",
        width: "250rpx",
        columnName: "order_number",
        type: "text",
        isupd: true,
      },
      {
        text: "商品库存信息",
        width: "250rpx",
        columnName: "kucun",
        type: "text",
        isupd: true
      },
    ],
    wancheng_list :['优先处理','配货作业中','配货完成','正在配送','完成','未完成-缺货','未完成-配错货'],
    kucun_list: ['安排处理','处理当中','处理完成'],
    quyu:'',
    songhuoyuan:'',
    all_quyu_list:[],
    all_quyu_index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    if(userInfo.power == '客户'){
      var title = _this.data.title
      title.length = title.length - 1
      _this.setData({
        title
      })
    }
    console.log(userInfo)
    _this.setData({
      userInfo
    })
    var sql = "select isnull(quyu,'') as name from dropdowntable where isnull(quyu,'') != ''"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        var list2 = [
          {name:'全部'}
        ]
        for(var i=0; i<list.length; i++){
          list2.push(list[i])
        }
        _this.setData({
          quyu_list: list,
          all_quyu_list: list2
        })
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
    var sql = "select name from userInfo where power = '管理员' or power = '操作员'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var list2 = [
          {name:''}
        ]
        for(var i=0; i<list.length; i++){
          list2.push(list[i])
        }
        console.log(list2)
        _this.setData({
          songhuoyuan_list: list2
        })
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

    var e = ['1900-01-01','2100-12-31','','','','','','','']
    _this.tableShow(e)
  },

  header_xiala: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    var list2 = []
    console.log(list)
    if(column == 'quyu'){
      for(var i=0; i< list.length; i++){
        var name = list[i].name
        console.log(name.indexOf(_this.data.quyu))
        if(name.indexOf(_this.data.quyu) > -1){
          list2.push({name:name})
        }
      }
      console.log(list2)
      _this.setData({
        list_xiala: list2,
        click_column:column,
      })
      console.log(list)
      _this.setData({
        xlShow2: true
      })
    }else{
      _this.setData({
        list_xiala: list,
        click_column:column,
      })
      console.log(list)
      _this.setData({
        xlShow2: true
      })
    }
    
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      _this.setData({
        xlShow2: false,
        [click_column]:new_val
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },

  bindPickerChange: function(e){
    var _this = this 
    console.log(e)
    console.log(e.target.dataset.column_name)
    var column = e.target.dataset.column_name
    console.log(_this.data[column + '_list'][e.detail.value])
    _this.setData({
      [column]: _this.data[column + '_list'][e.detail.value]
    })
  },

  goto: function(e) {
    var _this = this
    var order_number = _this.data.order_number
    console.log(order_number)
    wx.navigateTo({
      url: "../peisong/peisong?userInfo=" + JSON.stringify(_this.data.userInfo) + "&order_number=" + order_number
    })
  },

  tableShow: function (e) {
    var _this = this
    var sql = "select id,songhuoyuan,money,shoukuan,insert_date,customer_name,wancheng,quyu,anzhuang_address,customer_order,songhuo_danhao,order_number,case isnull(wancheng,'') when '优先处理' then 1 when '' then 2 when '配货作业中' then 3 when '配货完成' then 4 when '未完成-配错货' then 5 when '未完成-缺货' then 6 when '完成' then 7  end as shunxu,case when kucun != '' then kucun when kucun_text != '' then '安排处理' else '' end as kucun,customer_need_text from erqi_peisongdan where insert_date >= '" + e[0] + "' and insert_date <= '" + e[1] + "' and customer_name like '%" + e[2] + "%' and anzhuang_address like '%" + e[3] + "%' and customer_order like '%" + e[4] + "%' and songhuo_danhao like '%" + e[5] + "%' and order_number like '%" + e[6] + "%' "
    // var sql = "select id,insert_date,customer_name,wancheng,quyu,anzhuang_address,customer_order,songhuo_danhao,order_number,case isnull(wancheng,'') when '优先处理' then 1 when '' then 2 when '配货作业中' then 3 when '配货完成' then 4 when '未完成-配错货' then 5 when '未完成-缺货' then 6 when '完成' then 7  end as shunxu "
    
    if(e[7] != ''){
      sql = sql + " and wancheng ='" + e[7] + "'"
    }
    if(e[8] != ''){
      sql = sql + " and case when kucun != '' then kucun when kucun_text != '' then '安排处理' else '' end as kucun = '" + e[8] + "'"
    }
    if(_this.data.userInfo.power == '客户'){
      sql = sql + " and customer_name ='" + _this.data.userInfo.company + "'"
    }
    sql = sql + " order by shunxu,id " 
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list,
          all_quyu_index:0
        })
        console.log(list)
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

  sel_quyu:function(){
    var _this = this
    var this_index = _this.data.all_quyu_index + 1
    if(this_index >= _this.data.all_quyu_list.length){
      this_index = 0
    }
    var sql = ""
    if(_this.data.all_quyu_list[this_index].name != '全部'){
      sql = "select id,songhuoyuan,money,shoukuan,insert_date,customer_name,wancheng,quyu,anzhuang_address,customer_order,songhuo_danhao,order_number,case isnull(wancheng,'') when '优先处理' then 1 when '' then 2 when '配货作业中' then 3 when '配货完成' then 4 when '未完成-配错货' then 5 when '未完成-缺货' then 6 when '完成' then 7  end as shunxu,case when kucun != '' then kucun when kucun_text != '' then '安排处理' else '' end as kucun,customer_need_text from erqi_peisongdan where quyu = '" + _this.data.all_quyu_list[this_index].name + "'"
      if(_this.data.userInfo.power == '客户'){
        sql = sql + " and customer_name ='" + _this.data.userInfo.company + "'"
      }
    }else{
      sql = "select id,songhuoyuan,money,shoukuan,insert_date,customer_name,wancheng,quyu,anzhuang_address,customer_order,songhuo_danhao,order_number,case isnull(wancheng,'') when '优先处理' then 1 when '' then 2 when '配货作业中' then 3 when '配货完成' then 4 when '未完成-配错货' then 5 when '未完成-缺货' then 6 when '完成' then 7  end as shunxu,case when kucun != '' then kucun when kucun_text != '' then '安排处理' else '' end as kucun,customer_need_text from erqi_peisongdan"
      if(_this.data.userInfo.power == '客户'){
        sql = sql + " where customer_name ='" + _this.data.userInfo.company + "'"
      }
    }
    sql = sql + " order by shunxu,id " 
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list,
          all_quyu_index:this_index
        })
        console.log(list)
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

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  clickView:function(e){
    var _this = this
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      order_number: _this.data.list[e.currentTarget.dataset.index].order_number,
      wancheng: _this.data.list[e.currentTarget.dataset.index].wancheng, 
      quyu: _this.data.list[e.currentTarget.dataset.index].quyu,
      kucun: _this.data.list[e.currentTarget.dataset.index].kucun,
      songhuoyuan: _this.data.list[e.currentTarget.dataset.index].songhuoyuan,
      xgShow:true,
    })
  },

  print: function(){
    var _this = this
    var danhao = _this.data.order_number
    console.log(danhao)
    var sql = "select customer_name,order_number,customer_order,customer_need_text,customer_need_text1,customer_need_text2,songhuo_address,anzhuang_address from erqi_peisongdan where order_number='" + danhao + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        list[0].date = getNowDate()
        wx.navigateTo({
          url: "../dayin/dayin?order=" + JSON.stringify(list[0])
        })
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

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  upd1:function(){
    var _this = this
    if(_this.data.userInfo.power != '管理员' && _this.data.userInfo.power != '操作员'){
      wx.showToast({
        title: '非操作员不允许修改！',
        icon: 'none'
      })
      return;
    }
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "update erqi_peisongdan set wancheng='" + _this.data.wancheng + "',quyu='" + _this.data.quyu + "',kucun='" + _this.data.kucun + "',songhuoyuan='" + _this.data.songhuoyuan + "' where id=" + _this.data.id  
      },
      success: res => {
        console.log(res)
        _this.setData({
            id:'',
            wancheng: '', 
            quyu: '',
            kucun: '',
            songhuoyuan:'',
            order_number: '',
        })
        _this.qxShow()
        var e = ['1900-01-01','2100-12-31','','','','','','','']
         _this.tableShow(e)

        wx.showToast({
          title: '修改成功！',
          icon: 'none'
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

  del1:function(){
    var _this = this
    wx.request({
      url: 'http://yhocn.cn:9087/file/delete', //仅为示例，并非真实的接口地址
      data: {
        order_number: _this.data.order_number,
        path: '/huaqun_erqi/',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    })
    if(_this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '非管理员不允许删除！',
        icon: 'none'
      })
      return;
    }
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "delete from erqi_peisongdan where id='" + _this.data.id + "'"
      },
      success: res => {
        _this.setData({
          id:'',
          wancheng: '', 
          quyu: '',
          kucun: '',
          order_number: '',
      })
        _this.qxShow()
        var e = ['1900-01-01','2100-12-31','','','','','','','']
        _this.tableShow(e)
        wx.showToast({
          title: '删除成功！',
          icon: 'none'
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
  // del1:function(){
  //   var _this = this
  //   if(_this.data.userInfo.power != '管理员'){
  //     wx.showToast({
  //       title: '非管理员不允许删除！',
  //       icon: 'none'
  //     })
  //     return;
  //   }
  //   wx.cloud.callFunction({
  //     name: 'sqlserver_huaqun',
  //     data: {
  //       query: "delete from erqi_peisongdan where id='" + _this.data.id + "'"
  //     },
  //     success: res => {
  //       wx.cloud.deleteFile({
  //         fileList: [
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-01.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-02.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-03.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-04.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-05.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-06.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-07.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-08.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-09.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-10.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-11.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-12.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-13.jpg',
  //           'cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/huaqun_img_linshi/' + _this.data.order_number + '-14.jpg',
  //         ],
  //           success: res => {
  //             // handle success
  //             console.log(res.fileList)
  //           },
  //           fail: console.error
  //       })
  //       _this.setData({
  //         id:'',
  //         wancheng: '', 
  //         quyu: '',
  //         kucun: '',
  //         order_number: '',
  //     })
  //       _this.qxShow()
  //       var e = ['1900-01-01','2100-12-31','','','','','','','']
  //       _this.tableShow(e)
  //       wx.showToast({
  //         title: '删除成功！',
  //         icon: 'none'
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

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      start_date:"",
      stop_date:"",
      customer_name:'',
      wancheng:'',
      quyu:'',
      anzhuang_address:'',
      customer_order:'',
      songhuo_danhao:'',
      order_number:'',
      kucun:'',
    })
  },

  choiceDate: function (e) {
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == ''){
      start_date = '1900-01-01'
    }
    if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    var e = [start_date, stop_date, _this.data.customer_name, _this.data.wancheng, _this.data.quyu, _this.data.anzhuang_address, _this.data.customer_order, _this.data.songhuo_danhao, _this.data.order_number, _this.data.kucun]
    _this.tableShow(e)
    _this.qxShow()
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

function getNowDate() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }
