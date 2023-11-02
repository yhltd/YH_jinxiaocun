// package_ruilida/page/userInfoAdd/userInfoAdd.js
var areaList = require("../../components/data_area.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssqShow: false,
    xlShow2: false,
    customer_body: {
      id:'',
      bianhao:'',
      name:'',
      type:'',
      shangji_danwei:'',
      kehu_dengji:'',
      jiage_dengji:'',
      suozai_diqu:'',
      dizhi:'',
      beizhu:'',
      yewuyuan:'',
      shoujian_name:'',
      shoujian_phone:'',
      shoujian_dizhi:'',
      kaipiao_danwei:'',
      shibiehao:'',
      kaipiao_dizhi:'',
      kaipiao_dianhua:'',
      kaipiao_yinhang:'',
      kaipiao_zhanghao:'',
    },
    lianxi_list:[
      {
        id:'',
        customer_id:'',
        name:'',
        department:'',
        zhiwu:'',
        phone:'',
        address:'',
        type:'主联系人',
      }
    ],
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
    var sql = "select * from peizhi where type = '客户分类';select * from customer;select * from peizhi where type = '客户等级';select * from peizhi where type = '价格等级';select * from userInfo"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var type_list = res.result.recordsets[0]
        var shangji_danwei_list = res.result.recordsets[1]
        var kehu_dengji_list = res.result.recordsets[2]
        var jiage_dengji_list = res.result.recordsets[3]
        var yewuyuan_list = res.result.recordsets[4]
        _this.setData({
          type_list,
          shangji_danwei_list,
          kehu_dengji_list,
          jiage_dengji_list,
          yewuyuan_list,
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
    if(id != null && id != undefined){
      var sql = "select * from customer where id=" + id + ";select * from customer_item where customer_id = '" + id + "'"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var customer_body = res.result.recordsets[0][0]
          var lianxi_list = res.result.recordsets[1]
          _this.setData({
            id,
            customer_body,
          })
          if(lianxi_list.length != 0){
            _this.setData({
              lianxi_list,
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
    }else{
      var sql = "select convert(float,SUBSTRING(isnull(max(bianhao),'KH000000'),3,8)) + 1 as bianhao from customer"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var max_bianhao = res.result.recordset[0].bianhao
          var this_bianhao = PrefixInteger(max_bianhao,6)
          console.log(this_bianhao)
          this_bianhao = "KH" + this_bianhao
          console.log(this_bianhao)
          var customer_body = _this.data.customer_body
          customer_body.bianhao = this_bianhao
          customer_body.yewuyuan = _this.data.userInfo.name
          _this.setData({
            customer_body
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

  qxShow:function(){
    var _this = this
    _this.setData({
      xlShow2:false,
      ssqShow:false
    })
  },

  add_lianxiren:function(){
    var _this = this
    wx.showModal({
      title: '提示',
      content: '确认增加一条联系人信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var list = _this.data.lianxi_list
          list.push({
            id:'',
            customer_id:'',
            name:'',
            department:'',
            zhiwu:'',
            phone:'',
            address:'',
            type:'联系人',
          })
          console.log(list)
          _this.setData({
            lianxi_list: list
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  del_lianxiren:function(e){
    var _this = this
    console.log(e)
    var index = e.target.dataset.index
    wx.showModal({
      title: '提示',
      content: '确认删除第'+ (index*1 + 1) +'条联系人信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var list = _this.data.lianxi_list
          list.splice(index,1)
          console.log(list)
          _this.setData({
            lianxi_list: list
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  copy_lianxiren:function(){
    var _this = this
    wx.showModal({
      title: '提示',
      content: '确认将主联系人复制到收件信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var lianxi_list = _this.data.lianxi_list
          var customer_body = _this.data.customer_body
          var panduan = false
          for(var i=0; i<lianxi_list.length; i++){
            if(lianxi_list[i].type == '主联系人'){
              customer_body.shoujian_name = lianxi_list[i].name
              customer_body.shoujian_phone = lianxi_list[i].phone
              customer_body.shoujian_dizhi = lianxi_list[i].address
              panduan = true
              break;
            }
          }
          if(panduan){
            _this.setData({
              customer_body
            })
            wx.showToast({
              title: '复制成功!',
              icon: 'none'
            })
          }else{
            wx.showToast({
              title: '未读取到主联系人信息!',
              icon: 'none'
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  save:function(){
    var _this = this
    var customer_body = _this.data.customer_body
    var lianxi_list = _this.data.lianxi_list
    console.log(customer_body)
    console.log(lianxi_list)
    if(customer_body.name == ''){
      wx.showToast({
        title: '请输入客户名称',
        icon: 'none'
      })
      return;
    }
    if(customer_body.id == ''){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into customer(bianhao,name,type,shangji_danwei,kehu_dengji,jiage_dengji,suozai_diqu,dizhi,beizhu,yewuyuan,shoujian_name,shoujian_phone,shoujian_dizhi,kaipiao_danwei,shibiehao,kaipiao_dizhi,kaipiao_dianhua,kaipiao_yinhang,kaipiao_zhanghao) output inserted.id values('" + customer_body.bianhao + "','" + customer_body.name + "','" + customer_body.type + "','" + customer_body.shangji_danwei + "','" + customer_body.kehu_dengji + "','" + customer_body.jiage_dengji + "','" + customer_body.suozai_diqu + "','" + customer_body.dizhi + "','" + customer_body.beizhu + "','" + customer_body.yewuyuan + "','" + customer_body.shoujian_name + "','" + customer_body.shoujian_phone + "','" + customer_body.shoujian_dizhi + "','" + customer_body.kaipiao_danwei + "','" + customer_body.shibiehao + "','" + customer_body.kaipiao_dizhi + "','" + customer_body.kaipiao_dianhua + "','" + customer_body.kaipiao_yinhang + "','" + customer_body.kaipiao_zhanghao + "')"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          customer_body.id = new_id
          _this.setData({
            customer_body
          })
          var sql = "insert into customer_item(name,department,zhiwu,phone,address,type,customer_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].name + "','" + lianxi_list[i].department + "','" + lianxi_list[i].zhiwu + "','" + lianxi_list[i].phone + "','" + lianxi_list[i].address + "','" + lianxi_list[i].type + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].name + "','" + lianxi_list[i].department + "','" + lianxi_list[i].zhiwu + "','" + lianxi_list[i].phone + "','" + lianxi_list[i].address + "','" + lianxi_list[i].type + "','" + new_id + "')"
            }
          }
          sql = sql + sql2
          console.log(sql)
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
      wx.showLoading({
        title:'保存中'
      })
      var sql = "update customer set bianhao='" + customer_body.bianhao + "',name='" + customer_body.name + "',type='" + customer_body.type + "',shangji_danwei='" + customer_body.shangji_danwei + "',kehu_dengji='" + customer_body.kehu_dengji + "',jiage_dengji='" + customer_body.jiage_dengji + "',suozai_diqu='" + customer_body.suozai_diqu + "',dizhi='" + customer_body.dizhi + "',beizhu='" + customer_body.beizhu + "',yewuyuan='" + customer_body.yewuyuan + "',shoujian_name='" + customer_body.shoujian_name + "',shoujian_phone='" + customer_body.shoujian_phone + "',shoujian_dizhi='" + customer_body.shoujian_dizhi + "',kaipiao_danwei='" + customer_body.kaipiao_danwei + "',shibiehao='" + customer_body.shibiehao + "',kaipiao_dizhi='" + customer_body.kaipiao_dizhi + "',kaipiao_dianhua='" + customer_body.kaipiao_dianhua + "',kaipiao_yinhang='" + customer_body.kaipiao_yinhang + "',kaipiao_zhanghao='" + customer_body.kaipiao_zhanghao + "' where id=" + customer_body.id
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = customer_body.id
          var sql = "delete from customer_item where customer_id='" + new_id + "';insert into customer_item(name,department,zhiwu,phone,address,type,customer_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].name + "','" + lianxi_list[i].department + "','" + lianxi_list[i].zhiwu + "','" + lianxi_list[i].phone + "','" + lianxi_list[i].address + "','" + lianxi_list[i].type + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].name + "','" + lianxi_list[i].department + "','" + lianxi_list[i].zhiwu + "','" + lianxi_list[i].phone + "','" + lianxi_list[i].address + "','" + lianxi_list[i].type + "','" + new_id + "')"
            }
          }
          sql = sql + sql2
          console.log(sql)
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

  onInput(e){
    console.log(e)
    var _this = this
    var new_value = e.detail
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    console.log(index)
    console.log(column)
    console.log(_this.data.customer_body)
    console.log(_this.data.lianxi_list)
    if(index == undefined){
      var customer_body = _this.data.customer_body
      customer_body[column] = new_value
      _this.setData({
        customer_body
      })
    }else{
      var lianxi_list = _this.data.lianxi_list
      lianxi_list[index][column] = new_value
      _this.setData({
        lianxi_list
      })
    }
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

  ssq_show: function (e) {
    var _this = this
    _this.setData({
      ssqShow: true
    })
  },
  area_select:function(e){
    var _this = this
    console.log(e)
    var customer_body = _this.data.customer_body
    var new_val = ""
    if(e.detail.values[0].name == e.detail.values[1].name){
      new_val = e.detail.values[0].name + "-" + e.detail.values[2].name
    }else{
      new_val = e.detail.values[0].name + "-" + e.detail.values[1].name + "-" + e.detail.values[2].name
    }
    customer_body.suozai_diqu = new_val
    _this.setData({
      customer_body,
      ssqShow: false
    })
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      var click_index = _this.data.click_index
      var customer_body = _this.data.customer_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        customer_body[click_column] = new_val
        _this.setData({
          xlShow2: false,
          customer_body,
        })
      }else{
        if(new_val == '主联系人'){
          for(var i=0; i<lianxi_list.length; i++){
            lianxi_list[i].type = '联系人'
          }
        }
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


  file_goto:function(){
    var _this = this
    var type = "客户"
    var id = _this.data.customer_body.id
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