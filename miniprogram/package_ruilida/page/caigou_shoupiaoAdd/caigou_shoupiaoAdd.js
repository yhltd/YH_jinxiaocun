// package_ruilida/page/userInfoAdd/userInfoAdd.js
var areaList = require("../../components/data_area.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minDate: new Date(2000, 1, 1).getTime(),
    maxDate: new Date(2099, 12, 31).getTime(),
    currentDate: new Date().getTime(),
    caigou_show: false,
    product_show: false,
    ssqShow: false,
    xlShow2: false,
    shoupiao_body: {
      id:'',
      caigou_bianhao:'',
      shoupiao_danwei:'',
      kaipiao_danwei:'',
      kaipiao_riqi:'',
      kaipiao_jine:'0.00',
      kaipiao_shuie:'0.00',
      jiashui_heji:'0.00',
      beizhu:'',
      xinxi_tuisong:'',
      shoupiao_zhuangtai:'待收票',
    },
    type:'',
    name:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    console.log(areaList.list)
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo,
      areaList: areaList.list
    })
    var id = options.id
    var shoupiao_list = options.shoupiao_list
    if(shoupiao_list != undefined){
      shoupiao_list = JSON.parse(shoupiao_list)
      var shoupiao_body = _this.data.shoupiao_body
      var jiashui_heji = 0
      for(var i=0; i<shoupiao_list.length; i++){
        jiashui_heji = jiashui_heji + (shoupiao_list[i].this_kai * 1)
      }
      shoupiao_body.kaipiao_jine = (jiashui_heji * 1).toFixed(2)
      shoupiao_body.kaipiao_shuie = 0.00
      shoupiao_body.jiashui_heji = (jiashui_heji * 1).toFixed(2)
      _this.setData({
        shoupiao_body
      })
    }
    console.log('shoupiao_list')
    console.log(shoupiao_list)
    var gongyingshang_name = options.gongyingshang_name
    _this.setData({
      shoupiao_list,
      gongyingshang_name
    })
    var sql = "select * from gongyingshang;select * from peizhi where type = '核算单位';select * from userInfo;"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var gongyingshang_list = res.result.recordsets[0]
        console.log(gongyingshang_list)
        if(gongyingshang_name != undefined){
          for(var i=0; i<gongyingshang_list.length; i++){
            if(gongyingshang_name == gongyingshang_list[i].name){ 
              shoupiao_body = _this.data.shoupiao_body
              shoupiao_body.kaipiao_danwei = gongyingshang_list[i].name
              _this.setData({
                shoupiao_body
              })
              console.log('成功')
              break;
            }
          }
        }
        var kaipiao_danwei_list = res.result.recordsets[0]
        var shoupiao_danwei_list = res.result.recordsets[1]
        var xinxi_tuisong_list = res.result.recordsets[2]
        _this.setData({
          gongyingshang_list,
          kaipiao_danwei_list,
          shoupiao_danwei_list,
          xinxi_tuisong_list
        })

        if(id != null && id != undefined && id != ''){
          var sql = "select * from caigou_shoupiao where id=" + id
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              var shoupiao_body = res.result.recordset[0]
              _this.setData({
                id,
                shoupiao_body,
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
        }else{
          var shoupiao_body = _this.data.shoupiao_body
          shoupiao_body.xinxi_tuisong = _this.data.userInfo.shenpi
          shoupiao_body.kaipiao_riqi = getNowDate()
          var sql = "select * from peizhi where type='核算单位'"
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              var hesuan_list = res.result.recordset
              console.log(hesuan_list)
              if(_this.data.userInfo.hesuan_danwei != ''){
                for(var i=0; i<hesuan_list.length; i++){
                  if(hesuan_list[i].id == _this.data.userInfo.hesuan_danwei){
                    shoupiao_body.shoupiao_danwei = hesuan_list[i].name
                    break;
                  }
                }
              }
              _this.setData({
                shoupiao_body
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
  },

  jiage_head_refresh(e){
    var _this = this
    console.log(e)
    var new_val = e.detail.value * 1
    var list = _this.data.shoupiao_body
    var column = e.currentTarget.dataset.column
    list[column] = new_val.toFixed(2)
    _this.setData({
      shoupiao_body:list
    })
  },

  caigou_click:function(){
    var _this = this
    var sql = "select id,bianhao,riqi,gongyingshang,dianpu,cangku,beizhu,caigou_id,ruku_danwei,yewuyuan,jiashui_xiaoji as jiashui_heji,ruku_id,isnull(caigou_bianhao,'') as xiaoshou_bianhao,isnull(jiashui_heji,0) as shoupiao_jine,jiashui_xiaoji-isnull(jiashui_heji,0) as weikai,jiashui_xiaoji-isnull(jiashui_heji,0) as this_kai,1 as isselect from (select * from caigou_ruku as ruku left join (select sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji,ruku_id from caigou_ruku_item group by ruku_id) as item on ruku.id = item.ruku_id) as ruku left join (select caigou_bianhao,sum(convert(float,isnull(jiashui_heji,0))) as jiashui_heji from caigou_shoupiao group by caigou_bianhao) as shoupiao on ruku.bianhao = shoupiao.caigou_bianhao where jiashui_xiaoji-isnull(jiashui_heji,0) > 0"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          caigou_list: list,
          caigou_show: true,
          start_date: '',
          stop_date: '',
          gongyingshang: '',
        })
      },
      err: res => {
        wx.showToast({
          title: '错误！',
          icon: 'none',
          duration: 3000
        })
        console.log("错误!")
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  sel_caigou:function(){
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    var gongyingshang = _this.data.gongyingshang
    var caigou_list = _this.data.caigou_list
    if(start_date == ''){
      start_date = "1900-01-01"
    }
    if(stop_date == ''){
      stop_date = "2100-12-31"
    }
    for(var i=0; i<caigou_list.length; i++){
      var panduan = true
      if(!(caigou_list[i].riqi >= start_date && caigou_list[i].riqi <= stop_date)){
        panduan = false
      }
      if(gongyingshang != ''){
        if(caigou_list[i].gongyingshang.indexOf(gongyingshang) == -1){
          panduan = false
        }
      }
      if(panduan){
        caigou_list[i].isselect = 1
      }else{
        caigou_list[i].isselect = 0
      }
    }
    console.log(caigou_list)
    _this.setData({
      caigou_list
    })
  },

  caigou_select:function(e){
    var _this = this
    console.log(e)
    var this_index = e.currentTarget.dataset.index
    var caigou_list = _this.data.caigou_list[this_index]
    var shoupiao_body = _this.data.shoupiao_body
    shoupiao_body.caigou_bianhao = caigou_list.bianhao
    shoupiao_body.kaipiao_danwei = caigou_list.gongyingshang
    _this.setData({
      shoupiao_body,
    })
    _this.qxShow()
  },

  qxShow:function(){
    var _this = this
    _this.setData({
      xlShow2:false,
      ssqShow:false,
      product_show:false,
      caigou_show:false
    })
  },

  choiceDate: function (e) {
    var _this = this
    //e.preventDefault(); 
    var column_name = e.target.dataset.column_name
    var shoupiao_body = _this.data.shoupiao_body
    shoupiao_body[column_name] = e.detail.value
    console.log(e.detail.value)
    console.log(column_name)
    _this.setData({
      shoupiao_body
    })

  },

  save:function(){
    var _this = this
    var shoupiao_body = _this.data.shoupiao_body
    var lianxi_list = _this.data.lianxi_list
    console.log(shoupiao_body)
    console.log(lianxi_list)
    if(shoupiao_body.shoupiao_danwei == ''){
      wx.showToast({
        title: '请选择收票单位',
        icon: 'none'
      })
      return;
    }
    if(shoupiao_body.dianpu == ''){
      wx.showToast({
        title: '请选择开票单位',
        icon: 'none'
      })
      return;
    }
    if(shoupiao_body.kaipiao_riqi == ''){
      wx.showToast({
        title: '请选择开票日期',
        icon: 'none'
      })
      return;
    }
    if(shoupiao_body.kaipiao_jine == '' && _this.data.gongyingshang_name == undefined){
      wx.showToast({
        title: '请填写开票金额',
        icon: 'none'
      })
      return;
    }
    if(shoupiao_body.xinxi_tuisong == ''){
      wx.showToast({
        title: '请选择信息推送',
        icon: 'none'
      })
      return;
    }
    if(shoupiao_body.id == '' && _this.data.gongyingshang_name == undefined){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into caigou_shoupiao(caigou_bianhao,shoupiao_danwei,kaipiao_danwei,kaipiao_riqi,kaipiao_jine,kaipiao_shuie,jiashui_heji,beizhu,xinxi_tuisong,shoupiao_zhuangtai) output inserted.id values('" + shoupiao_body.caigou_bianhao + "','" + shoupiao_body.shoupiao_danwei + "','" + shoupiao_body.kaipiao_danwei + "','" + shoupiao_body.kaipiao_riqi + "','" + shoupiao_body.kaipiao_jine + "','" + shoupiao_body.kaipiao_shuie + "','" + shoupiao_body.jiashui_heji + "','" + shoupiao_body.beizhu + "','" + shoupiao_body.xinxi_tuisong + "','" + shoupiao_body.shoupiao_zhuangtai + "')"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          shoupiao_body.id = new_id
          _this.setData({
            shoupiao_body
          })
          wx.hideLoading()
          wx.showToast({
            title: '保存成功',
            icon: 'none'
          })
          setTimeout(function () {
            _this.back()
          }, 2000)
        },
        err: res => {
          wx.hideLoading()
          wx.showToast({
            title: '错误!',
            icon: 'none',
            duration: 3000
          })
          console.log("错误!")
        },
        fail: res => {
          wx.hideLoading()
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })
    }else if(shoupiao_body.id == '' && _this.data.gongyingshang_name != undefined){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into caigou_shoupiao(caigou_bianhao,shoupiao_danwei,kaipiao_danwei,kaipiao_riqi,kaipiao_jine,kaipiao_shuie,jiashui_heji,beizhu,xinxi_tuisong,shoupiao_zhuangtai) output inserted.id values "
      var sql2 = ""
      var this_list = _this.data.shoupiao_list
      console.log(this_list)
      for(var i=0; i<this_list.length; i++){
        if(sql2 == ""){
          sql2 = "('" + this_list[i].bianhao + "','" + shoupiao_body.shoupiao_danwei + "','" + shoupiao_body.kaipiao_danwei + "','" + shoupiao_body.kaipiao_riqi + "','" + this_list[i].this_kai + "','" + "','" + this_list[i].this_kai + "','" + shoupiao_body.beizhu + "','" + shoupiao_body.xinxi_tuisong + "','" + shoupiao_body.shoupiao_zhuangtai + "')"
        }else{
          sql2 = sql2 + ",('" + this_list[i].bianhao + "','" + shoupiao_body.shoupiao_danwei + "','" + shoupiao_body.kaipiao_danwei + "','" + shoupiao_body.kaipiao_riqi + "','" + this_list[i].this_kai + "','" + "','" + this_list[i].this_kai + "','" + shoupiao_body.beizhu + "','" + shoupiao_body.xinxi_tuisong + "','" + shoupiao_body.shoupiao_zhuangtai + "')"
        }
      }
      console.log(sql + sql2)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql + sql2
        },
        success: res => {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '保存成功',
            icon: 'none'
          })
          setTimeout(function () {
            _this.back()
          }, 2000)
        },
        err: res => {
          wx.hideLoading()
          wx.showToast({
            title: '错误!',
            icon: 'none',
            duration: 3000
          })
          console.log("错误!")
        },
        fail: res => {
          wx.hideLoading()
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })
    }else{
      console.log(shoupiao_body)
      wx.showLoading({
        title:'保存中'
      })

      var sql = "update caigou_shoupiao set caigou_bianhao='" + shoupiao_body.caigou_bianhao + "',shoupiao_danwei='" + shoupiao_body.shoupiao_danwei + "',kaipiao_danwei='" + shoupiao_body.kaipiao_danwei + "',kaipiao_riqi='" + shoupiao_body.kaipiao_riqi + "',kaipiao_jine='" + shoupiao_body.kaipiao_jine + "',kaipiao_shuie='" + shoupiao_body.kaipiao_shuie + "',jiashui_heji='" + shoupiao_body.jiashui_heji + "',beizhu='" + shoupiao_body.beizhu + "',xinxi_tuisong='" + shoupiao_body.xinxi_tuisong + "',shoupiao_zhuangtai='" + shoupiao_body.shoupiao_zhuangtai + "' where id=" + shoupiao_body.id
      console.log(shoupiao_body)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '保存成功',
            icon: 'none'
          })
          setTimeout(function () {
            _this.back()
          }, 2000)
        },
        err: res => {
          wx.hideLoading()
          wx.showToast({
            title: '错误!',
            icon: 'none',
            duration: 3000
          })
          console.log("错误!")
        },
        fail: res => {
          wx.hideLoading()
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 3000
          })
          console.log("请求失败！")
        }
      })
    }
  },

  onInput_text(e){
    var _this = this
    var new_value = e.detail.value
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    _this.setData({
      [column]: new_value
    })
  },

  onInput(e){
    console.log(e)
    var _this = this
    var new_value = e.detail
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    console.log(index)
    console.log(column)
    console.log(_this.data.shoupiao_body)
    console.log(_this.data.lianxi_list)
    var shoupiao_body = _this.data.shoupiao_body
    shoupiao_body[column] = new_value
    if(_this.data.gongyingshang_name != undefined){
      var kaipiao_jine = shoupiao_body.kaipiao_jine
      var kaipiao_shuie = shoupiao_body.kaipiao_shuie
      var jiashui_heji = shoupiao_body.jiashui_heji
      if(column == 'kaipiao_jine'){ 
        if((kaipiao_jine * 1) <= jiashui_heji){
          shoupiao_body.kaipiao_shuie = (jiashui_heji - (kaipiao_jine * 1)).toFixed(2)
        }else{
          shoupiao_body.kaipiao_shuie = 0.00
          shoupiao_body.kaipiao_jine = (jiashui_heji * 1).toFixed(2)
        }
      }else if(column == 'kaipiao_shuie'){
        if((kaipiao_shuie * 1) <= jiashui_heji){
          shoupiao_body.kaipiao_jine = (jiashui_heji - (kaipiao_shuie * 1)).toFixed(2)
        }else{
          shoupiao_body.kaipiao_shuie = (jiashui_heji * 1).toFixed(2)
          shoupiao_body.kaipiao_jine = 0.00
        }
      }
    }else{
      if(shoupiao_body.kaipiao_jine != '' || shoupiao_body.kaipiao_shuie != ''){
        var kaipiao_jine = shoupiao_body.kaipiao_jine
        var kaipiao_shuie = shoupiao_body.kaipiao_shuie
        if(kaipiao_jine == ''){
          kaipiao_jine = 0
        }
        if(kaipiao_shuie == ''){
          kaipiao_shuie = 0
        }
        shoupiao_body.jiashui_heji = ((kaipiao_jine*1) + (kaipiao_shuie * 1)).toFixed(2)
      }
    }

    _this.setData({
      shoupiao_body
    })
  },

  back:function(){
    var _this = this
    wx.navigateBack({
      delta: 1
    })
  },

  xiala_show: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    console.log('下标：', e.currentTarget.dataset.index)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    var index = e.currentTarget.dataset.index
    _this.setData({
      list_xiala: list,
      click_column:column,
      click_index: index
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
      var click_index = _this.data.click_index
      var shoupiao_body = _this.data.shoupiao_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        shoupiao_body[click_column] = new_val
        _this.setData({
          xlShow2: false,
          shoupiao_body,
        })
      }else if(click_index == 'cx'){
        _this.setData({
          xlShow2: false,
          [click_column]: new_val,
        })
      }else{
        lianxi_list[click_index][click_column] = new_val
        _this.setData({
          xlShow2: false,
          lianxi_list,
        })
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },

  qxShow22: function () {
    var _this = this
    _this.setData({
      rqxzShow2: false,
    })
  },

  selRIQI2: function (e) {
    var _this = this
    console.log(e)
    var this_column = e.currentTarget.dataset.column
    _this.setData({
      rqxzShow2: true,
      click_column: this_column
    })
  },

  onInputDate(event) {
    var _this = this
    _this.setData({
      currentDate: event.detail,
    });
  },

  onInput22: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())

    var riqi = Y + M + D
    var this_column = _this.data.click_column
    _this.setData({
      [this_column]: riqi
    });
    _this.qxShow22()
  },

  file_goto:function(){
    var _this = this
    var type = "采购收票"
    var id = _this.data.shoupiao_body.id
    console.log(id)
    console.log(type)
    wx.navigateTo({
      url: '../fileUpload/fileUpload?userInfo=' + JSON.stringify(_this.data.userInfo) + "&type=" + type + "&id=" + id,
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

function PrefixInteger(num, n) {
  return (Array(n).join(0) + num).slice(-n);
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