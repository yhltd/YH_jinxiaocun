// package_ruilida/page/userInfoAdd/userInfoAdd.js
var areaList = require("../../components/data_area.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssqShow: false,
    xlShow2: false,
    gongying_body: {
      id:'',
      bianhao:'',
      name:'',
      gongyingshang_dengji:'',
      suozai_diqu:'',
      dizhi:'',
      beizhu:'',
      caigouyuan:'',
      jianzuo_kehu:'',
      zhuyao_yewu:'',
      shenpi:'',
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
        gongyingshang_id:'',
        name:'',
        department:'',
        zhiwu:'',
        phone:'',
        address:'',
        type:'主联系人',
      }
    ],
    jianzuo_kehu_list:[
      {name:'是'},
      {name:'否'},
    ],
    type_list:[
      {name:'联系人'},
      {name:'主联系人'},
    ]
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
    if(id != null && id != undefined){
      var sql = "select * from gongyingshang where id=" + id + ";select * from gongyingshang_item where gongyingshang_id = '" + id + "'"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var gongying_body = res.result.recordsets[0][0]
          var lianxi_list = res.result.recordsets[1]
          _this.setData({
            id,
            gongying_body,
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
      var sql = "select convert(float,SUBSTRING(isnull(max(bianhao),'GYS000000'),4,9)) + 1 as bianhao from gongyingshang"
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
          this_bianhao = "GYS" + this_bianhao
          console.log(this_bianhao)
          var gongying_body = _this.data.gongying_body
          gongying_body.bianhao = this_bianhao
          gongying_body.caigouyuan = _this.data.userInfo.name
          _this.setData({
            gongying_body
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

  get_peizhi:function(){
    var _this = this
    var sql = "select * from peizhi where type = '供应商等级';select * from userInfo"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var gongyingshang_dengji_list = res.result.recordsets[0]
        var caigouyuan_list = res.result.recordsets[1]
        console.log(gongyingshang_dengji_list)
        console.log(caigouyuan_list)
        _this.setData({
          gongyingshang_dengji_list,
          caigouyuan_list
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

  peizhi_goto:function(e){
    var _this = this
    var this_column = e.target.dataset.column
    console.log(e)
    console.log(this_column)
    wx.showModal({
      title: '提示',
      content: '即将跳转到配置页',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          if(this_column == 'gongyingshang_dengji'){
            wx.navigateTo({
              url: '../peizhi/peizhi' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&type=供应商等级"
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
            gongyingshang_id:'',
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
          var gongying_body = _this.data.gongying_body
          var panduan = false
          for(var i=0; i<lianxi_list.length; i++){
            if(lianxi_list[i].type == '主联系人'){
              gongying_body.shoujian_name = lianxi_list[i].name
              gongying_body.shoujian_phone = lianxi_list[i].phone
              gongying_body.shoujian_dizhi = lianxi_list[i].address
              panduan = true
              break;
            }
          }
          if(panduan){
            _this.setData({
              gongying_body
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
    var gongying_body = _this.data.gongying_body
    var lianxi_list = _this.data.lianxi_list
    console.log(gongying_body)
    console.log(lianxi_list)
    if(gongying_body.name == ''){
      wx.showToast({
        title: '请输入供应商名称',
        icon: 'none'
      })
      return;
    }
    if(gongying_body.gongyingshang_dengji == ''){
      wx.showToast({
        title: '请输入供应商等级',
        icon: 'none'
      })
      return;
    }
    if(gongying_body.caigouyuan == ''){
      wx.showToast({
        title: '请输入采购员',
        icon: 'none'
      })
      return;
    }
    if(gongying_body.kaipiao_danwei == ''){
      wx.showToast({
        title: '请输入开票单位名称',
        icon: 'none'
      })
      return;
    }
    if(gongying_body.shibiehao == ''){
      wx.showToast({
        title: '请输入纳税人识别号',
        icon: 'none'
      })
      return;
    }
    if(gongying_body.kaipiao_yinhang == ''){
      wx.showToast({
        title: '请输入开票开户银行',
        icon: 'none'
      })
      return;
    }
    if(gongying_body.kaipiao_zhanghao == ''){
      wx.showToast({
        title: '请输入开票银行账号',
        icon: 'none'
      })
      return;
    }
    for(var i=0; i<lianxi_list.length; i++){
      if(lianxi_list[i].name == ''){
        wx.showToast({
          title: '第' + (i+1) + "个联系人信息未填写姓名",
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].phone == ''){
        wx.showToast({
          title: '第' + (i+1) + "个联系人信息未填写电话",
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].type == ''){
        wx.showToast({
          title: '第' + (i+1) + "个联系人信息未选择联系人类型",
          icon: 'none'
        })
        return;
      }
    }
    var sql = ""
    if(gongying_body.id == ''){
      sql = "select * from gongyingshang where name = '" + gongying_body.name + "'"
    }else{
      sql = "select * from gongyingshang where name = '" + gongying_body.name + "' and id !=" + gongying_body.id
    }
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        if(list.length > 0){
          wx.showToast({
            title: '已有相同供应商名称！',
            icon: 'none',
            duration: 3000
          })
          return;
        }
        if(gongying_body.id == ''){
          wx.showLoading({
            title:'保存中'
          })
          var sql = "insert into gongyingshang(bianhao,name,gongyingshang_dengji,suozai_diqu,dizhi,beizhu,caigouyuan,jianzuo_kehu,zhuyao_yewu,shoujian_name,shoujian_phone,shoujian_dizhi,kaipiao_danwei,shibiehao,kaipiao_dizhi,kaipiao_dianhua,kaipiao_yinhang,kaipiao_zhanghao) output inserted.id values('" + gongying_body.bianhao + "','" + gongying_body.name + "','" + gongying_body.gongyingshang_dengji + "','" + gongying_body.suozai_diqu + "','" + gongying_body.dizhi + "','" + gongying_body.beizhu + "','" + gongying_body.caigouyuan + "','" + gongying_body.jianzuo_kehu + "','" + gongying_body.zhuyao_yewu + "','" + gongying_body.shoujian_name + "','" + gongying_body.shoujian_phone + "','" + gongying_body.shoujian_dizhi + "','" + gongying_body.kaipiao_danwei + "','" + gongying_body.shibiehao + "','" + gongying_body.kaipiao_dizhi + "','" + gongying_body.kaipiao_dianhua + "','" + gongying_body.kaipiao_yinhang + "','" + gongying_body.kaipiao_zhanghao + "')"
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              var new_id = res.result.recordset[0].id
              gongying_body.id = new_id
              _this.setData({
                gongying_body
              })
              var sql = "insert into gongyingshang_item(name,department,zhiwu,phone,address,type,gongyingshang_id) values "
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
          var sql = "update gongyingshang set bianhao='" + gongying_body.bianhao + "',name='" + gongying_body.name + "',gongyingshang_dengji='" + gongying_body.gongyingshang_dengji + "',suozai_diqu='" + gongying_body.suozai_diqu + "',dizhi='" + gongying_body.dizhi + "',beizhu='" + gongying_body.beizhu + "',caigouyuan='" + gongying_body.caigouyuan + "',jianzuo_kehu='" + gongying_body.jianzuo_kehu + "',zhuyao_yewu='" + gongying_body.zhuyao_yewu + "',shoujian_name='" + gongying_body.shoujian_name + "',shoujian_phone='" + gongying_body.shoujian_phone + "',shoujian_dizhi='" + gongying_body.shoujian_dizhi + "',kaipiao_danwei='" + gongying_body.kaipiao_danwei + "',shibiehao='" + gongying_body.shibiehao + "',kaipiao_dizhi='" + gongying_body.kaipiao_dizhi + "',kaipiao_dianhua='" + gongying_body.kaipiao_dianhua + "',kaipiao_yinhang='" + gongying_body.kaipiao_yinhang + "',kaipiao_zhanghao='" + gongying_body.kaipiao_zhanghao + "' where id=" + gongying_body.id
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              var new_id = gongying_body.id
              var sql = "delete from gongyingshang_item where gongyingshang_id='" + new_id + "';insert into gongyingshang_item(name,department,zhiwu,phone,address,type,gongyingshang_id) values "
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

  onInput(e){
    console.log(e)
    var _this = this
    var new_value = e.detail
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    console.log(index)
    console.log(column)
    console.log(_this.data.gongying_body)
    console.log(_this.data.lianxi_list)
    if(index == undefined){
      var gongying_body = _this.data.gongying_body
      gongying_body[column] = new_value
      _this.setData({
        gongying_body
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
    var gongying_body = _this.data.gongying_body
    var new_val = ""
    if(e.detail.values[0].name == e.detail.values[1].name){
      new_val = e.detail.values[0].name + "-" + e.detail.values[2].name
    }else{
      new_val = e.detail.values[0].name + "-" + e.detail.values[1].name + "-" + e.detail.values[2].name
    }
    gongying_body.suozai_diqu = new_val
    _this.setData({
      gongying_body,
      ssqShow: false
    })
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      var click_index = _this.data.click_index
      var gongying_body = _this.data.gongying_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        gongying_body[click_column] = new_val
        _this.setData({
          xlShow2: false,
          gongying_body,
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
    var type = "供应商"
    var id = _this.data.gongying_body.id
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
    var _this = this
    _this.get_peizhi()
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