// package_huaqun_erqi/page/peisong/peisong.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  xgShow2: false,
  cxShow: false,
  xlShow: false,
  rqxzShow2: false,
  data: {
    minDate: new Date(2000, 1, 1).getTime(),
    maxDate: new Date(2099, 12, 31).getTime(),
    currentDate: new Date().getTime(),
    onload_panduan:'',
    header_list:{
      insert_date:'',
      order_number:'',
    },
    list:[
      {
        order_number: '',
        insert_date: '',
        customer_name: '',
        customer_name_renyuan: '',
        customer_name_riqi: '',
        customer_need_text: '',
        customer_need_text_renyuan: '',
        customer_need_text_riqi: '',
        customer_need_img1: '',
        customer_need_img1_renyuan: '',
        customer_need_img1_riqi: '',
        customer_need_img2: '',
        customer_need_img2_renyuan: '',
        customer_need_img2_riqi: '',
        customer_need_img3: '',
        customer_need_img3_renyuan: '',
        customer_need_img3_riqi: '',
        songhuo_address: '',
        songhuo_address_renyuan: '',
        songhuo_address_riqi: '',
        anzhuang_address: '',
        anzhuang_address_renyuan: '',
        anzhuang_address_riqi: '',
        phone: '',
        phone_renyuan: '',
        phone_riqi: '',
        customer_order: '',
        customer_order_renyuan: '',
        customer_order_riqi: '',
        songhuo_danhao: '',
        songhuo_danhao_renyuan: '',
        songhuo_danhao_riqi: '',
        peihuo_img1: '',
        peihuo_img1_renyuan: '',
        peihuo_img1_riqi: '',
        peihuo_img2: '',
        peihuo_img2_renyuan: '',
        peihuo_img2_riqi: '',
        peihuo_img3: '',
        peihuo_img3_renyuan: '',
        peihuo_img3_riqi: '',
        peihuo_img4: '',
        peihuo_img4_renyuan: '',
        peihuo_img4_riqi: '',
        peihuo_img5: '',
        peihuo_img5_renyuan: '',
        peihuo_img5_riqi: '',
        peisong_img1: '',
        peisong_img1_renyuan: '',
        peisong_img1_riqi: '',
        peisong_img2: '',
        peisong_img2_renyuan: '',
        peisong_img2_riqi: '',
        peisong_img3: '',
        peisong_img3_renyuan: '',
        peisong_img3_riqi: '',
        wancheng: '',
        wancheng_renyuan: '',
        wancheng_riqi: '',
        beizhu: '',
        beizhu_renyuan: '',
        beizhu_riqi: '',
        kucun_text: '',
        kucun_text_renyuan: '',
        kucun_text_riqi: '',
        kucun_img1: '',
        kucun_img1_renyuan: '',
        kucun_img1_riqi: '',
        kucun_img2: '',
        kucun_img2_renyuan: '',
        kucun_img2_riqi: '',
        kucun_img3: '',
        kucun_img3_renyuan: '',
        kucun_img3_riqi: '',
      }
    ],
    this_img: '',
    this_column: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    console.log(options)
    console.log(options.order_number)
    var userInfo = JSON.parse(options.userInfo)
    var onload_panduan = ""
    if(options.order_number == undefined){
      onload_panduan = "new"
    }else{
      onload_panduan = "old"
    }
    _this.setData({
      userInfo,
      onload_panduan
    })
    if(options.order_number == undefined){
      var bianhao_left = getBianHao()
      var sql = "select order_number from erqi_peisongdan where order_number like '" + bianhao_left + "%'"
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: sql
        },
        success: res => {
          var bianhao_list = res.result.recordset
          var new_bianhao = "001" 
          for(var i=0; i<bianhao_list.length; i++){
            if(bianhao_list[i].order_number != '' && bianhao_list[i].order_number != null && bianhao_list[i].order_number != undefined){
              var this_bianhao = bianhao_list[i].order_number.slice(10)
              console.log(this_bianhao)
              if(this_bianhao >= new_bianhao){
                new_bianhao = (this_bianhao * 1 + 1).toString()
                if(new_bianhao.length == 1){
                  new_bianhao = "00" + new_bianhao.toString()
                }else if(new_bianhao.length == 2){
                  new_bianhao = "0" + new_bianhao.toString()
                }
                console.log(new_bianhao)
              }
            }
          }
          new_bianhao = bianhao_left.toString() + new_bianhao.toString()
          var list = _this.data.list
          list[0].order_number = new_bianhao
          list[0].insert_date = getNowDate()
          console.log(list)
          _this.setData({
            list
          })
        },
        err: res => {
          wx.showToast({
            title: '读取下拉列表错误！',
            icon: 'none'
          })
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
    }else{

    }
  },

  save: function(e){
    var _this = this
    var list = _this.data.list
    if(list[0].customer_name == ""){
      wx.showToast({
        title: '未填写客户名称！',
        icon: 'none'
      })
      return;
    }
    if(list[0].id == "" || list[0].id == undefined){
      var sql = "insert into erqi_peisongdan(order_number,insert_date,customer_name,customer_name_renyuan,customer_name_riqi,customer_need_text,customer_need_text_renyuan,customer_need_text_riqi,customer_need_img1,customer_need_img1_renyuan,customer_need_img1_riqi,customer_need_img2,customer_need_img2_renyuan,customer_need_img2_riqi,customer_need_img3,customer_need_img3_renyuan,customer_need_img3_riqi,songhuo_address,songhuo_address_renyuan,songhuo_address_riqi,anzhuang_address,anzhuang_address_renyuan,anzhuang_address_riqi,phone,phone_renyuan,phone_riqi,customer_order,customer_order_renyuan,customer_order_riqi,songhuo_danhao,songhuo_danhao_renyuan,songhuo_danhao_riqi,peihuo_img1,peihuo_img1_renyuan,peihuo_img1_riqi,peihuo_img2,peihuo_img2_renyuan,peihuo_img2_riqi,peihuo_img3,peihuo_img3_renyuan,peihuo_img3_riqi,peihuo_img4,peihuo_img4_renyuan,peihuo_img4_riqi,peihuo_img5,peihuo_img5_renyuan,peihuo_img5_riqi,peisong_img1,peisong_img1_renyuan,peisong_img1_riqi,peisong_img2,peisong_img2_renyuan,peisong_img2_riqi,peisong_img3,peisong_img3_renyuan,peisong_img3_riqi,wancheng,wancheng_renyuan,wancheng_riqi,beizhu,beizhu_renyuan,beizhu_riqi,kucun_text,kucun_text_renyuan,kucun_text_riqi,kucun_img1,kucun_img1_renyuan,kucun_img1_riqi,kucun_img2,kucun_img2_renyuan,kucun_img2_riqi,kucun_img3,kucun_img3_renyuan,kucun_img3_riqi) output inserted.id values('" + list[0].order_number + "','" + list[0].insert_date + "','" + list[0].customer_name + "','" + list[0].customer_name_renyuan + "','" + list[0].customer_name_riqi + "','" + list[0].customer_need_text + "','" + list[0].customer_need_text_renyuan + "','" + list[0].customer_need_text_riqi + "','" + list[0].customer_need_img1 + "','" + list[0].customer_need_img1_renyuan + "','" + list[0].customer_need_img1_riqi + "','" + list[0].customer_need_img2 + "','" + list[0].customer_need_img2_renyuan + "','" + list[0].customer_need_img2_riqi + "','" + list[0].customer_need_img3 + "','" + list[0].customer_need_img3_renyuan + "','" + list[0].customer_need_img3_riqi + "','" + list[0].songhuo_address + "','" + list[0].songhuo_address_renyuan + "','" + list[0].songhuo_address_riqi + "','" + list[0].anzhuang_address + "','" + list[0].anzhuang_address_renyuan + "','" + list[0].anzhuang_address_riqi + "','" + list[0].phone + "','" + list[0].phone_renyuan + "','" + list[0].phone_riqi + "','" + list[0].customer_order + "','" + list[0].customer_order_renyuan + "','" + list[0].customer_order_riqi + "','" + list[0].songhuo_danhao + "','" + list[0].songhuo_danhao_renyuan + "','" + list[0].songhuo_danhao_riqi + "','" + list[0].peihuo_img1 + "','" + list[0].peihuo_img1_renyuan + "','" + list[0].peihuo_img1_riqi + "','" + list[0].peihuo_img2 + "','" + list[0].peihuo_img2_renyuan + "','" + list[0].peihuo_img2_riqi + "','" + list[0].peihuo_img3 + "','" + list[0].peihuo_img3_renyuan + "','" + list[0].peihuo_img3_riqi + "','" + list[0].peihuo_img4 + "','" + list[0].peihuo_img4_renyuan + "','" + list[0].peihuo_img4_riqi + "','" + list[0].peihuo_img5 + "','" + list[0].peihuo_img5_renyuan + "','" + list[0].peihuo_img5_riqi + "','" + list[0].peisong_img1 + "','" + list[0].peisong_img1_renyuan + "','" + list[0].peisong_img1_riqi + "','" + list[0].peisong_img2 + "','" + list[0].peisong_img2_renyuan + "','" + list[0].peisong_img2_riqi + "','" + list[0].peisong_img3 + "','" + list[0].peisong_img3_renyuan + "','" + list[0].peisong_img3_riqi + "','" + list[0].wancheng + "','" + list[0].wancheng_renyuan + "','" + list[0].wancheng_riqi + "','" + list[0].beizhu + "','" + list[0].beizhu_renyuan + "','" + list[0].beizhu_riqi + "','" + list[0].kucun_text + "','" + list[0].kucun_text_renyuan + "','" + list[0].kucun_text_riqi + "','" + list[0].kucun_img1 + "','" + list[0].kucun_img1_renyuan + "','" + list[0].kucun_img1_riqi + "','" + list[0].kucun_img2 + "','" + list[0].kucun_img2_renyuan + "','" + list[0].kucun_img2_riqi + "','" + list[0].kucun_img3 + "','" + list[0].kucun_img3_renyuan + "','" + list[0].kucun_img3_riqi + "')"
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          wx.showToast({
            title: '保存成功！',
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
    }else{
      
    }
  },

  imgClick: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    console.log(e.currentTarget.dataset.value)
    var column = e.currentTarget.dataset.column
    if(column == 'songhuo_danhao' || column == 'peihuo_img1' || column == 'peihuo_img2' || column == 'peihuo_img3' || column == 'peihuo_img4' || column == 'peihuo_img5' || column == 'peisong_img1' || column == 'peisong_img2' || column == 'peisong_img3' || column == 'wancheng' || column == 'beizhu'){
      if(_this.data.userInfo.power == '客户'){
        wx.showToast({
          title: '客户不允许编辑此处！',
          icon: 'none'
        })
        return;
      }
    }
    console.log(e.currentTarget.dataset.column)
    console.log(_this.data.list[0][e.currentTarget.dataset.column]) 
    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:_this.data.list[0][e.currentTarget.dataset.column],
      xgShow2:true,
    })
  },

  imgdown: function(e){
    var _this = this
    var base64data = _this.data.this_value;   // base64
    const fsm = wx.getFileSystemManager();
    const FILE_BASE_NAME = 'tmp_base64src' + getNowTime(); //自定义文件名
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if (!format) {
      return (new Error('ERROR_BASE64SRC_PARSE'));
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
    const buffer = wx.base64ToArrayBuffer(bodyData);
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success(r) {
        console.log(r,'r')
        console.log(filePath,'filePath')
        wx.saveImageToPhotosAlbum({
          filePath:filePath,
          success(res) {
            wx.showToast({
              title: '保存成功，请到手机相册查看',
              icon: 'none'
            })
            console.log(res)
          },
          fail: function(err) {
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            })
            console.log('保存失败', err);
          }
        })
      },
      fail() {
        return (new Error('ERROR_BASE64SRC_WRITE'));
      },
    });
  },

  imgload: function(e){
    var _this = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res)
        console.log(res.tempFiles)
        wx.getFileSystemManager().readFile({
          filePath: res.tempFiles[0].tempFilePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)
            var list = _this.data.list
            list[0][_this.data.this_column] = 'data:image/png;base64,' + res.data
            list[0][_this.data.this_column + "_renyuan"] = _this.data.userInfo.name
            list[0][_this.data.this_column + "_riqi"] = getNowDate()
            _this.setData({
              list
            })
            _this.qxShow()
            console.log(list)
          }
        })
      }
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  clickView:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    console.log(e.currentTarget.dataset.value)
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    if(column == 'songhuo_danhao' || column == 'peihuo_img1' || column == 'peihuo_img2' || column == 'peihuo_img3' || column == 'peihuo_img4' || column == 'peihuo_img5' || column == 'peisong_img1' || column == 'peisong_img2' || column == 'peisong_img3' || column == 'wancheng' || column == 'beizhu'){
      if(_this.data.userInfo.power == '客户'){
        wx.showToast({
          title: '客户不允许编辑此处！',
          icon: 'none'
        })
        return;
      }
    }
    console.log(index)
    console.log(column)
    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      this_index:e.currentTarget.dataset.index,
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    var this_value = _this.data.this_value
    var list = _this.data.list
    list[index][this_column] = this_value
    var userInfo = _this.data.userInfo
    list[index][this_column + '_renyuan'] = userInfo.name
    list[index][this_column + '_riqi'] = getNowDate()
    if(this_column == 'customer_name' && this_value != '' && list[index]['wancheng'] == ''){
      list[index]['wancheng'] = "配货作业中"
      list[index]['wancheng_renyuan'] = userInfo.name
      list[index]['wancheng_riqi'] = getNowDate()
    }
    console.log(list[index * 1])
    _this.setData({
      list:list,
      xgShow:false,
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      xgShow2: false,
      cxShow: false,
    })
  },

  selRIQI2: function () {
    var _this = this
    _this.setData({
      rqxzShow2: true,
    })
  },

  onInput22: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())

    var riqi = Y + M + D
    var header_list = _this.data.header_list
    header_list.insert_date = riqi
    _this.setData({
      header_list
    });
    _this.qxShow22()
  },

  qxShow22: function () {
    var _this = this
    _this.setData({
      rqxzShow2: false,
    })
  },

  onInputDate(event) {
    var _this = this
    _this.setData({
      currentDate: event.detail,
    });
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

function getBianHao() {
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
  var currentdate = "PS"+ year.toString() + month.toString() + day.toString() ;
  return currentdate;
 }

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

 function getNowTime() {
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
  var currentdate = year + month + day + hour + minutes + seconds
  return currentdate;
 }