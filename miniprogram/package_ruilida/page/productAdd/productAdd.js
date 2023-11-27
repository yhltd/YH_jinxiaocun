// package_ruilida/page/userInfoAdd/userInfoAdd.js
var areaList = require("../../components/data_area.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssqShow: false,
    xlShow2: false,
    product_body: {
      id:'',
      name:'',
      type:'',
      danwei:'',
      caizhi:'',
      jishu_biaozhun:'',
      zhibao_dengji:'',
      beizhu:'',
    },
    lianxi_list:[
      {
        id:'',
        product_id:'',
        image:'',
        guige:'',
        bianhao:'',
        lingshou_price:'',
        lingshou_bili:'',
        pifa_price:'',
        pifa_bili:'',
        dakehu_price:'',
        dakehu_bili:'',
        caigou_price:'',
        jinxiang:'',
        xiaoxiang:'',
        enable:'是',
      }
    ],
    enable_list:[
      {name:'是'},
      {name:'否'},
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
    var sql = "select * from peizhi where type = '商品分类';select * from peizhi where type = '质保等级';select * from peizhi_shuilv;"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var type_list = res.result.recordsets[0]
        var zhibao_dengji_list = res.result.recordsets[1]
        var peizhi_shuilv = res.result.recordsets[2][0]
        console.log(peizhi_shuilv)
        _this.setData({
          type_list,
          zhibao_dengji_list,
          peizhi_shuilv
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
      var sql = "select * from product where id=" + id + ";select id,product_id,product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,caigou_price,jinxiang,xiaoxiang,enable from product_item where product_id = '" + id + "'"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var product_body = res.result.recordsets[0][0]
          var lianxi_list = res.result.recordsets[1]
          _this.setData({
            id,
            product_body,
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
      var sql = "select convert(float,SUBSTRING(isnull(max(bianhao),'P0000'),2,4)) + 1 as bianhao from product_item;select * from peizhi_shuilv"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var max_bianhao = res.result.recordsets[0][0].bianhao
          var this_bianhao = PrefixInteger(max_bianhao,4)
          console.log(this_bianhao)
          this_bianhao = "P" + this_bianhao
          console.log(this_bianhao)
          var lianxi_list = _this.data.lianxi_list
          var peizhi_shuilv = res.result.recordsets[1][0]
          lianxi_list[0].bianhao = this_bianhao
          lianxi_list[0].lingshou_bili = peizhi_shuilv.lingshou
          lianxi_list[0].pifa_bili = peizhi_shuilv.pifa
          lianxi_list[0].dakehu_bili = peizhi_shuilv.dakehu
          _this.setData({
            lianxi_list
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
    console.log(_this.data.lianxi_list)
    wx.showModal({
      title: '提示',
      content: '确认增加一条商品信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var list = _this.data.lianxi_list
          if(list.length > 1){
            var this_bianhao = _this.data.lianxi_list[list.length -1].bianhao
            var this_head = this_bianhao.substr(0,6)
            var this_foot = this_bianhao.substr(6,3)
            this_foot = parseInt(this_foot) + 1
            this_bianhao = this_head + PrefixInteger(this_foot,2)
            console.log(this_head)
            console.log(this_foot)
            console.log(this_bianhao)
            list.push({
              id:'',
              product_id:'',
              image:'',
              guige:'',
              bianhao:this_bianhao,
              lingshou_price:'',
              lingshou_bili: _this.data.peizhi_shuilv.lingshou,
              pifa_price:'',
              pifa_bili: _this.data.peizhi_shuilv.pifa,
              dakehu_price:'',
              dakehu_bili: _this.data.peizhi_shuilv.dakehu,
              caigou_price:'',
              jinxiang:'',
              xiaoxiang:'',
              enable:'是',
            })
          }else{
            list.push({
              id:'',
              product_id:'',
              image:'',
              guige:'',
              bianhao:_this.data.lianxi_list[0].bianhao + "-01",
              lingshou_price:'',
              lingshou_bili: _this.data.peizhi_shuilv.lingshou,
              pifa_price:'',
              pifa_bili: _this.data.peizhi_shuilv.pifa,
              dakehu_price:'',
              dakehu_bili: _this.data.peizhi_shuilv.dakehu,
              caigou_price:'',
              jinxiang:'',
              xiaoxiang:'',
              enable:'是',
            })
            console.log(list)
          }
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
      content: '确认删除第'+ (index*1 + 1) +'条商品信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var list = _this.data.lianxi_list
          console.log()
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

  save:function(){
    var _this = this
    var product_body = _this.data.product_body
    var lianxi_list = _this.data.lianxi_list
    console.log(product_body)
    console.log(lianxi_list)
    if(product_body.name == ''){
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none'
      })
      return;
    }
    for(var i=0; i<lianxi_list.length; i++){
      if(lianxi_list[i].lingshou_price == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写零售价格',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].lingshou_bili == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写零售上浮比例',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].pifa_price == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写批发价格',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].pifa_bili == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写批发上浮比例',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].dakehu_price == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写大客户价格',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].dakehu_bili == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写大客户上浮比例',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].caigou_price == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写采购价格',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].jinxiang == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写进项税率',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].xiaoxiang == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写销项税率',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].enable == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写是否启用',
          icon: 'none'
        })
        return;
      }
    }
    if(product_body.id == ''){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into product(name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu) output inserted.id values('" + product_body.name + "','" + product_body.type + "','" + product_body.danwei + "','" + product_body.caizhi + "','" + product_body.jishu_biaozhun + "','" + product_body.zhibao_dengji + "','" + product_body.beizhu + "')"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          product_body.id = new_id
          _this.setData({
            product_body
          })
          var sql = "insert into product_item(product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,caigou_price,jinxiang,xiaoxiang,enable) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + new_id + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].bianhao + "','" + lianxi_list[i].lingshou_price + "','" + lianxi_list[i].lingshou_bili + "','" + lianxi_list[i].pifa_price + "','" + lianxi_list[i].pifa_bili + "','" + lianxi_list[i].dakehu_price + "','" + lianxi_list[i].dakehu_bili + "','" + lianxi_list[i].caigou_price + "','" + lianxi_list[i].jinxiang + "','" + lianxi_list[i].xiaoxiang + "','" + lianxi_list[i].enable + "')"
            }else{
              sql2 = sql2 + ",('" + new_id + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].bianhao + "','" + lianxi_list[i].lingshou_price + "','" + lianxi_list[i].lingshou_bili + "','" + lianxi_list[i].pifa_price + "','" + lianxi_list[i].pifa_bili + "','" + lianxi_list[i].dakehu_price + "','" + lianxi_list[i].dakehu_bili + "','" + lianxi_list[i].caigou_price + "','" + lianxi_list[i].jinxiang + "','" + lianxi_list[i].xiaoxiang + "','" + lianxi_list[i].enable + "')"
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
      var sql = "update product set name='" + product_body.name + "',type='" + product_body.type + "',danwei='" + product_body.danwei + "',caizhi='" + product_body.caizhi + "',jishu_biaozhun='" + product_body.jishu_biaozhun + "',zhibao_dengji='" + product_body.zhibao_dengji + "',beizhu='" + product_body.beizhu + "' where id=" + product_body.id
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = product_body.id
          var sql = "delete from product_item where product_id='" + new_id + "';insert into product_item(product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,caigou_price,jinxiang,xiaoxiang,enable) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + new_id + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].bianhao + "','" + lianxi_list[i].lingshou_price + "','" + lianxi_list[i].lingshou_bili + "','" + lianxi_list[i].pifa_price + "','" + lianxi_list[i].pifa_bili + "','" + lianxi_list[i].dakehu_price + "','" + lianxi_list[i].dakehu_bili + "','" + lianxi_list[i].caigou_price + "','" + lianxi_list[i].jinxiang + "','" + lianxi_list[i].xiaoxiang + "','" + lianxi_list[i].enable + "')"
            }else{
              sql2 = sql2 + ",('" + new_id + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].bianhao + "','" + lianxi_list[i].lingshou_price + "','" + lianxi_list[i].lingshou_bili + "','" + lianxi_list[i].pifa_price + "','" + lianxi_list[i].pifa_bili + "','" + lianxi_list[i].dakehu_price + "','" + lianxi_list[i].dakehu_bili + "','" + lianxi_list[i].caigou_price + "','" + lianxi_list[i].jinxiang + "','" + lianxi_list[i].xiaoxiang + "','" + lianxi_list[i].enable + "')"
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
    console.log(_this.data.product_body)
    console.log(_this.data.lianxi_list)
    if(index == undefined){
      var product_body = _this.data.product_body
      product_body[column] = new_value
      _this.setData({
        product_body
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

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      var click_index = _this.data.click_index
      var product_body = _this.data.product_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        product_body[click_column] = new_val
        _this.setData({
          xlShow2: false,
          product_body,
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