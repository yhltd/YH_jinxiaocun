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
    kaipiao_body: {
      id:'',
      xiaoshou_bianhao:'',
      shoupiao_danwei:'',
      shibiehao:'',
      kaipiao_dizhi:'',
      kaipiao_dianhua:'',
      kaipiao_yinhang:'',
      kaipiao_zhanghao:'',
      kaipiao_riqi:'',
      kaipiao_jine:'',
      kaipiao_shuie:'',
      jiashui_heji:'',
      beizhu:'',
      kaipiao_danwei:'',
      xinxi_tuisong:'',
      kaipiao_zhuangtai:'待开票',
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
    var kaipiao_list = options.kaipiao_list
    if(kaipiao_list != undefined){
      kaipiao_list = JSON.parse(kaipiao_list)
    }
    var kehu_name = options.kehu_name
    _this.setData({
      kaipiao_list,
      kehu_name
    })
    var sql = "select * from customer;select * from peizhi where type = '核算单位';select * from userInfo;"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var kehu_list = res.result.recordsets[0]
        console.log(kehu_list)
        if(kehu_name != undefined){
          for(var i=0; i<kehu_list.length; i++){
            if(kehu_name == kehu_list[i].name){ 
              kaipiao_body = _this.data.kaipiao_body
              kaipiao_body.shoupiao_danwei = kehu_list[i].name
              kaipiao_body.shibiehao = kehu_list[i].shibiehao
              kaipiao_body.kaipiao_dizhi = kehu_list[i].kaipiao_dizhi
              kaipiao_body.kaipiao_dianhua = kehu_list[i].kaipiao_dianhua
              kaipiao_body.kaipiao_yinhang = kehu_list[i].kaipiao_yinhang
              kaipiao_body.kaipiao_zhanghao = kehu_list[i].kaipiao_zhanghao
              _this.setData({
                kaipiao_body
              })
              console.log('成功')
              break;
            }
          }
        }
        var shoupiao_danwei_list = res.result.recordsets[0]
        var kaipiao_danwei_list = res.result.recordsets[1]
        var xinxi_tuisong_list = res.result.recordsets[2]
        _this.setData({
          kehu_list,
          kaipiao_danwei_list,
          shoupiao_danwei_list,
          xinxi_tuisong_list 
        })

        if(id != null && id != undefined && id != ''){
          var sql = "select * from xiaoshou_kaipiao where id=" + id
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              var kaipiao_body = res.result.recordset[0]
              _this.setData({
                id,
                kaipiao_body,
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
          var kaipiao_body = _this.data.kaipiao_body
          kaipiao_body.xinxi_tuisong = _this.data.userInfo.shenpi
          kaipiao_body.kaipiao_riqi = getNowDate()
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
                    kaipiao_body.kaipiao_danwei = hesuan_list[i].name
                    break;
                  }
                }
              }
              _this.setData({
                kaipiao_body
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

  caigou_click:function(){
    var _this = this
    var sql = "select id,riqi,bianhao,kehu,isnull(jiashui_heji,0) as jiashui_heji,isnull(kaipiao_jine,0) as kaipiao_jine,isnull(jiashui_heji,0) - isnull(kaipiao_jine,0) as weikai,1 as isselect from (select id,riqi,bianhao,kehu,money.jiashui_heji from xiaoshou_dingdan as xiaoshou left join (select xiaoshou_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_heji from xiaoshou_dingdan_item group by xiaoshou_id) as money on xiaoshou.id = money.xiaoshou_id) as xiaoshoudan left join (select xiaoshou_bianhao,sum(convert(float,isnull(jiashui_heji,0))) as kaipiao_jine from xiaoshou_kaipiao GROUP BY xiaoshou_bianhao) as kaipiao on xiaoshoudan.bianhao = kaipiao.xiaoshou_bianhao where isnull(jiashui_heji,0) - isnull(kaipiao_jine,0) > 0"
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
          kehu: '',
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
    var kehu = _this.data.kehu
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
      if(kehu != ''){
        if(caigou_list[i].kehu.indexOf(kehu) == -1){
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
    var kaipiao_body = _this.data.kaipiao_body
    var kehu_list = _this.data.kehu_list
    kaipiao_body.xiaoshou_bianhao = caigou_list.bianhao
    kaipiao_body.shoupiao_danwei = caigou_list.kehu
    for(var i=0; i<kehu_list.length; i++){
      if(kehu_list[i].name == caigou_list.kehu){
        kaipiao_body.shibiehao = kehu_list[i].shibiehao
        kaipiao_body.kaipiao_dizhi = kehu_list[i].kaipiao_dizhi
        kaipiao_body.kaipiao_dianhua = kehu_list[i].kaipiao_dianhua
        kaipiao_body.kaipiao_yinhang = kehu_list[i].kaipiao_yinhang
        kaipiao_body.kaipiao_zhanghao = kehu_list[i].kaipiao_zhanghao
        break;
      }
    }
    _this.setData({
      kaipiao_body,
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
    var kaipiao_body = _this.data.kaipiao_body
    kaipiao_body[column_name] = e.detail.value
    console.log(e.detail.value)
    console.log(column_name)
    _this.setData({
      kaipiao_body
    })

  },

  save:function(){
    var _this = this
    var kaipiao_body = _this.data.kaipiao_body
    var lianxi_list = _this.data.lianxi_list
    console.log(kaipiao_body)
    console.log(lianxi_list)
    if(kaipiao_body.shoupiao_danwei == ''){
      wx.showToast({
        title: '请选择收票单位',
        icon: 'none'
      })
      return;
    }
    if(kaipiao_body.dianpu == ''){
      wx.showToast({
        title: '请选择开票单位',
        icon: 'none'
      })
      return;
    }
    if(kaipiao_body.kaipiao_riqi == ''){
      wx.showToast({
        title: '请选择开票日期',
        icon: 'none'
      })
      return;
    }
    if(kaipiao_body.kaipiao_jine == '' && _this.data.kehu_name == undefined){
      wx.showToast({
        title: '请填写开票金额',
        icon: 'none'
      })
      return;
    }
    if(kaipiao_body.xinxi_tuisong == ''){
      wx.showToast({
        title: '请选择信息推送',
        icon: 'none'
      })
      return;
    }
    if(kaipiao_body.id == '' && _this.data.kehu_name == undefined){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into xiaoshou_kaipiao(xiaoshou_bianhao,shoupiao_danwei,shibiehao,kaipiao_dizhi,kaipiao_dianhua,kaipiao_yinhang,kaipiao_zhanghao,kaipiao_riqi,kaipiao_jine,kaipiao_shuie,jiashui_heji,beizhu,kaipiao_danwei,xinxi_tuisong,kaipiao_zhuangtai) output inserted.id values('" + kaipiao_body.xiaoshou_bianhao + "','" + kaipiao_body.shoupiao_danwei + "','" + kaipiao_body.shibiehao + "','" + kaipiao_body.kaipiao_dizhi + "','" + kaipiao_body.kaipiao_dianhua + "','" + kaipiao_body.kaipiao_yinhang + "','" + kaipiao_body.kaipiao_zhanghao + "','" + kaipiao_body.kaipiao_riqi + "','" + kaipiao_body.kaipiao_jine + "','" + kaipiao_body.kaipiao_shuie + "','" + kaipiao_body.jiashui_heji + "','" + kaipiao_body.beizhu + "','" + kaipiao_body.kaipiao_danwei + "','" + kaipiao_body.xinxi_tuisong + "','" + kaipiao_body.kaipiao_zhuangtai + "')"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          kaipiao_body.id = new_id
          _this.setData({
            kaipiao_body
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
    }else if(kaipiao_body.id == '' && _this.data.kehu_name != undefined){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into xiaoshou_kaipiao(xiaoshou_bianhao,shoupiao_danwei,shibiehao,kaipiao_dizhi,kaipiao_dianhua,kaipiao_yinhang,kaipiao_zhanghao,kaipiao_riqi,kaipiao_jine,kaipiao_shuie,jiashui_heji,beizhu,kaipiao_danwei,xinxi_tuisong,kaipiao_zhuangtai) output inserted.id values "
      var sql2 = ""
      var this_list = _this.data.kaipiao_list
      console.log(this_list)
      for(var i=0; i<this_list.length; i++){
        if(sql2 == ""){
          sql2 = "('" + this_list[i].bianhao + "','" + kaipiao_body.shoupiao_danwei + "','" + kaipiao_body.shibiehao + "','" + kaipiao_body.kaipiao_dizhi + "','" + kaipiao_body.kaipiao_dianhua + "','" + kaipiao_body.kaipiao_yinhang + "','" + kaipiao_body.kaipiao_zhanghao + "','" + kaipiao_body.kaipiao_riqi + "','" + this_list[i].this_kai + "','" + "','" + this_list[i].this_kai + "','" + kaipiao_body.beizhu + "','" + kaipiao_body.kaipiao_danwei + "','" + kaipiao_body.xinxi_tuisong + "','" + kaipiao_body.kaipiao_zhuangtai + "')"
        }else{
          sql2 = slq2 + ",('" + this_list[i].bianhao + "','" + kaipiao_body.shoupiao_danwei + "','" + kaipiao_body.shibiehao + "','" + kaipiao_body.kaipiao_dizhi + "','" + kaipiao_body.kaipiao_dianhua + "','" + kaipiao_body.kaipiao_yinhang + "','" + kaipiao_body.kaipiao_zhanghao + "','" + kaipiao_body.kaipiao_riqi + "','" + this_list[i].this_kai + "','" + "','" + this_list[i].jiashui_heji + "','" + kaipiao_body.beizhu + "','" + kaipiao_body.kaipiao_danwei + "','" + kaipiao_body.xinxi_tuisong + "','" + kaipiao_body.kaipiao_zhuangtai + "')"
        }
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
      }
    }else{
      console.log(kaipiao_body)
      wx.showLoading({
        title:'保存中'
      })
      var sql = "update xiaoshou_kaipiao set xiaoshou_bianhao='" + kaipiao_body.xiaoshou_bianhao + "',shoupiao_danwei='" + kaipiao_body.shoupiao_danwei + "',shibiehao='" + kaipiao_body.shibiehao + "',kaipiao_dizhi='" + kaipiao_body.kaipiao_dizhi + "',kaipiao_dianhua='" + kaipiao_body.kaipiao_dianhua + "',kaipiao_yinhang='" + kaipiao_body.kaipiao_yinhang + "',kaipiao_zhanghao='" + kaipiao_body.kaipiao_zhanghao + "',kaipiao_riqi='" + kaipiao_body.kaipiao_riqi + "',kaipiao_jine='" + kaipiao_body.kaipiao_jine + "',kaipiao_shuie='" + kaipiao_body.kaipiao_shuie + "',jiashui_heji='" + kaipiao_body.jiashui_heji  + "',beizhu='" + kaipiao_body.beizhu + "',kaipiao_danwei='" + kaipiao_body.kaipiao_danwei + "',xinxi_tuisong='" + kaipiao_body.xinxi_tuisong + "',kaipiao_zhuangtai='" + kaipiao_body.kaipiao_zhuangtai + "' where id=" + kaipiao_body.id
      console.log(kaipiao_body)
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
    console.log(_this.data.kaipiao_body)
    console.log(_this.data.lianxi_list)
    var kaipiao_body = _this.data.kaipiao_body
    kaipiao_body[column] = new_value
    if(kaipiao_body.kaipiao_jine != '' || kaipiao_body.kaipiao_shuie != ''){
      var kaipiao_jine = kaipiao_body.kaipiao_jine
      var kaipiao_shuie = kaipiao_body.kaipiao_shuie
      if(kaipiao_jine == ''){
        kaipiao_jine = 0
      }
      if(kaipiao_shuie == ''){
        kaipiao_shuie = 0
      }
      kaipiao_body.jiashui_heji = (kaipiao_jine*1) + (kaipiao_shuie * 1)
    }
    _this.setData({
      kaipiao_body
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
      var kaipiao_body = _this.data.kaipiao_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        kaipiao_body[click_column] = new_val
        if(click_column == 'shoupiao_danwei'){
          kaipiao_body.shibiehao = e.detail.shibiehao
          kaipiao_body.kaipiao_dizhi = e.detail.kaipiao_dizhi
          kaipiao_body.kaipiao_dianhua = e.detail.kaipiao_dianhua
          kaipiao_body.kaipiao_yinhang = e.detail.kaipiao_yinhang
          kaipiao_body.kaipiao_zhanghao = e.detail.kaipiao_zhanghao
        }
        _this.setData({
          xlShow2: false,
          kaipiao_body,
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
    var type = "销售开票"
    var id = _this.data.kaipiao_body.id
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