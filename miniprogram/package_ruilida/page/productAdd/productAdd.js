// package_ruilida/page/userInfoAdd/userInfoAdd.js
var areaList = require("../../components/data_area.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssqShow: false,
    xlShow2: false,
    xgShow2: false,
    moreShow: false,
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
    kongjian: 10,
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
    if(id != null && id != undefined){
      var sql = "select * from product where id=" + id + ";select id,product_id,product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,caigou_price,jinxiang,xiaoxiang,enable,image from product_item where product_id = '" + id + "'"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var product_body = res.result.recordsets[0][0]
          var lianxi_list = res.result.recordsets[1]
          var this_bianhao = lianxi_list[0].bianhao
          _this.setData({
            id,
            product_body,
            this_bianhao
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
      var sql = "select isnull(max(bianhao),'P0000') as bianhao from product_item;select * from peizhi_shuilv"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var max_bianhao = res.result.recordsets[0][0].bianhao
          max_bianhao = max_bianhao.split("-")[0]
          var max_bianhao_foot = getEndingNumber(max_bianhao)
          var max_bianhao_head = max_bianhao.substring(0,max_bianhao.length - max_bianhao_foot.length)
          console.log(max_bianhao)
          console.log(max_bianhao_foot)
          console.log(max_bianhao_head)
          var this_num = max_bianhao_foot * 1 + 1
          console.log(this_num)
          var this_bianhao = max_bianhao_head + PrefixInteger(this_num,max_bianhao_foot.length)
          console.log(this_bianhao)
          var lianxi_list = _this.data.lianxi_list
          var peizhi_shuilv = res.result.recordsets[1][0]
          lianxi_list[0].bianhao = this_bianhao
          lianxi_list[0].lingshou_bili = peizhi_shuilv.lingshou
          lianxi_list[0].pifa_bili = peizhi_shuilv.pifa
          lianxi_list[0].dakehu_bili = peizhi_shuilv.dakehu
          _this.setData({
            lianxi_list,
            this_bianhao
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

  danwei_select:function(e){
    var _this = this
    console.log(e)
    var danwei_list = _this.data.danwei_list
    for(var i=0; i< danwei_list.length; i++){
      danwei_list[i].isselect = 1
    }
    console.log(danwei_list)
    _this.setData({
      danwei_show: true,
      danwei_list,
      type:'',
      name:'',
    })
  },

  danwei_click:function(e){
    var _this = this
    var index = e.currentTarget.dataset.index
    var danwei_list = _this.data.danwei_list
    var product_body = _this.data.product_body
    console.log(danwei_list[index])
    product_body.danwei = danwei_list[index].name
    _this.setData({
      product_body
    })
    _this.qxShow()
  },

  sel_danwei:function(){
    var _this = this
    var danwei_list = _this.data.danwei_list
    var name = _this.data.name
    for(var i=0; i<danwei_list.length; i++){
      if(name == ''){
        danwei_list[i].isselect = 1
      }else if(name != ''){
        if(danwei_list[i].name.indexOf(name) != -1){
          danwei_list[i].isselect = 1
        }else{
          danwei_list[i].isselect = 0
        }
      }
    }
    _this.setData({
      danwei_list
    })
  },

  get_peizhi:function(){
    wx.showLoading({
      title:'加载中'
    })
    var _this = this
    var sql = "select * from peizhi where type = '商品分类';select * from peizhi where type = '质保等级';select * from peizhi_shuilv;select type,guige from peizhi_guige;select * from peizhi where type = '商品单位';select * from peizhi where type = '增值税率';"
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
        var peizhi_guige = res.result.recordsets[3]
        var danwei_list = res.result.recordsets[4]
        var jinxiang_list = res.result.recordsets[5]
        for(var i=0; i<peizhi_guige.length; i++){
          peizhi_guige[i].guige = peizhi_guige[i].guige.split('\n')
          peizhi_guige[i].click_guige = []
        }
        console.log(peizhi_guige)
        console.log(peizhi_shuilv)
        _this.setData({
          type_list,
          zhibao_dengji_list,
          peizhi_shuilv,
          peizhi_guige,
          all_peizhi_guige:peizhi_guige,
          danwei_list,
          jinxiang_list
        })
        wx.hideLoading()
      },
      err: res => {
        wx.hideLoading()
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

  bianhao_get:function(e){
    var _this = this
    var index = e.target.dataset.index
    wx.scanCode({
      success (res) {
        console.log(res)
        console.log(res.result)
        var lianxi_list = _this.data.lianxi_list
        lianxi_list[index].bianhao = res.result
        _this.setData({
          lianxi_list
        })
      }
    })
  },

  add_more_lianxiren:function(){
    var _this = this
    var all_peizhi_guige = _this.data.all_peizhi_guige
    for(var i=0;i < all_peizhi_guige.length; i++){
      all_peizhi_guige[i].click_guige = []
    }
    _this.setData({
      all_peizhi_guige,
      moreShow:true
    })
  },

  quanxuan_clean:function(e){
    var _this = this
    console.log(e)
    var index = e.target.dataset.index
    var all_peizhi_guige = _this.data.all_peizhi_guige
    all_peizhi_guige[index].click_guige = []
    _this.setData({
      all_peizhi_guige
    })
  },

  quanxuan_add:function(e){
    var _this = this
    console.log(e)
    var index = e.target.dataset.index
    var all_peizhi_guige = _this.data.all_peizhi_guige
    all_peizhi_guige[index].click_guige = []
    for(var i=0; i<all_peizhi_guige[index].guige.length; i++){
      all_peizhi_guige[index].click_guige.push(all_peizhi_guige[index].guige[i])
    }
    _this.setData({
      all_peizhi_guige
    })
  },

  noop() {
    console.log('noop')
  },

  toggle2(event) {
    console.log('toggle')
    console.log(event)
    const index = event.target.dataset.index;
    const first_index = event.target.dataset.first_index;
    console.log(index)
    console.log(first_index)
    const checkbox = this.selectComponent(`.checkboxes-${first_index}-${index}`);
    checkbox.toggle();
  },

  onChange2(event) {
    var _this = this
    console.log('onChange')
    console.log(event)
    console.log(event.currentTarget.dataset.index)
    var index = event.currentTarget.dataset.index
    var all_peizhi_guige = _this.data.all_peizhi_guige
    all_peizhi_guige[index].click_guige = event.detail
    _this.setData({
      all_peizhi_guige 
    });
  },

  onClose:function(){
    var _this = this
    _this.setData({
      moreShow:false
    })
  },

  qxShow:function(){
    var _this = this
    _this.setData({
      xlShow2:false,
      ssqShow:false,
      xgShow2: false,
      danwei_show:false,
    })
  },

  imgClick: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    _this.setData({
      this_index:e.currentTarget.dataset.index,
      xgShow2:true,
    })
  },

  imgdown: function(e){
    var _this = this
    var url = _this.data.lianxi_list[_this.data.this_index].image;   // base64
    if(url.indexOf("http") != -1){
      wx.previewImage({
        current: url, // 图片的地址url
        urls: [url] // 预览的地址url
      })
    }else{
      wx.showToast({
        title: '预览失败，请检查图片是否已保存',
        icon: 'none'
      })
    }
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
        wx.compressImage({
          src: res.tempFiles[0].tempFilePath, // 图片路径
          quality: 50, // 压缩质量
          success: function(res) {
            console.log(res.tempFilePath)
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePath, //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: res => { //成功的回调
                console.log('data:image/png;base64,' + res.data)
                var size = res.data.length / 1048576
                console.log(size)
                if(size > 3){
                  wx.showToast({
                    title: '图片转化后超过3M，不允许上传！',
                    icon: 'none'
                  })
                  return;
                }
                var list = _this.data.lianxi_list
                list[_this.data.this_index].image = 'data:image/png;base64,' + res.data
                _this.setData({
                  lianxi_list:list
                })
                _this.qxShow()
                console.log(list)
              }
            })
          },
          fail: function(res) {
            console.log(res)
          },
        })
      }
    })
  },
  
  peizhi_goto:function(e){
    var _this = this
    var this_column = e.target.dataset.column
    console.log(this_column)
    wx.showModal({
      title: '提示',
      content: '即将跳转到配置页',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          if(this_column == 'type'){
            wx.navigateTo({
              url: '../peizhi/peizhi' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + '&type=商品分类',
            })
          }else if(this_column == 'danwei'){
            wx.navigateTo({
              url: '../peizhi/peizhi' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + '&type=商品单位',
            })
          }else if(this_column == 'zhibao_dengji'){
            wx.navigateTo({
              url: '../peizhi/peizhi' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + '&type=质保等级',
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
          var this_bianhao = _this.data.this_bianhao
          var this_num = list.length
          this_bianhao = this_bianhao + "-" + PrefixInteger(this_num,2)
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
          _this.setData({
            lianxi_list: list
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  guige_add:function(){
    var _this = this
    console.log(_this.data.lianxi_list)
    console.log('用户点击确定')
    var list = _this.data.lianxi_list
    var all_peizhi_guige = _this.data.all_peizhi_guige
    console.log(all_peizhi_guige)
    for(var i=0; i<all_peizhi_guige.length; i++){
      if(all_peizhi_guige[i].click_guige.length > 0){
        for(var j=0; j<all_peizhi_guige[i].click_guige.length; j++){
          var this_bianhao = _this.data.this_bianhao
          var this_num = list.length
          this_bianhao = this_bianhao + "-" + PrefixInteger(this_num,2)
          var panduan = true
          for(var k=0; k<list.length; k++){
            if(list[k].guige == ''){
              list[k].guige = all_peizhi_guige[i].click_guige[j]
              panduan = false
            }
          }
          if(panduan){
            list.push({
              id:'',
              product_id:'',
              image:'',
              guige:all_peizhi_guige[i].click_guige[j],
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
          }
        }
      }
    }
    _this.setData({
      lianxi_list: list,
      moreShow:false
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
    if(product_body.danwei == ''){
      wx.showToast({
        title: '请输入商品单位',
        icon: 'none'
      })
      return;
    }
    if(product_body.danwei == ''){
      wx.showToast({
        title: '请输入商品单位',
        icon: 'none'
      })
      return;
    }
    for(var i=0; i<lianxi_list.length; i++){
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
      if(lianxi_list[i].enable == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写是否启用',
          icon: 'none'
        })
        return;
      }
    }

    var sql = ""
    if(product_body.id == ''){
      sql = "select product_item.id,product_id,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,beizhu from product left join product_item on product.id = product_item.product_id where name = '" + product_body.name + "' and caizhi = '" + product_body.caizhi + "' and jishu_biaozhun = '" + product_body.jishu_biaozhun + "' and zhibao_dengji = '" + product_body.zhibao_dengji + "' and beizhu = '" + product_body.beizhu + "'"
      var sql2 = ""
      for(var i=0; i<lianxi_list.length; i++){
        if(sql2 == ""){
          sql2 = " and(guige='" + lianxi_list[i].guige + "'"
        }else{
          sql2 = sql2 + " or guige='" + lianxi_list[i].guige + "'"
        }
      }
      if(sql2 != ''){
        sql2 = sql2 + ")"
      }
      sql = sql + sql2
    }else{
      sql = "select product_item.id,product_id,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,beizhu from product left join product_item on product.id = product_item.product_id where name = '" + product_body.name + "' and caizhi = '" + product_body.caizhi + "' and jishu_biaozhun = '" + product_body.jishu_biaozhun + "' and zhibao_dengji = '" + product_body.zhibao_dengji + "' and beizhu = '" + product_body.beizhu + "' and product_id != '" + product_body.id + "'"
      var sql2 = ""
      for(var i=0; i<lianxi_list.length; i++){
        if(sql2 == ""){
          sql2 = " and(guige='" + lianxi_list[i].guige + "'"
        }else{
          sql2 = sql2 + " or guige='" + lianxi_list[i].guige + "'"
        }
      }
      if(sql2 != ''){
        sql2 = sql2 + ")"
      }
      sql = sql + sql2
    }

    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        wx.hideLoading()
        console.log(res.result.recordset)
        var list = res.result.recordset
        if(list.length > 0){
          wx.showToast({
            title: '已有 ' +  list[0].guige + ' 相同规格商品！',
            icon: 'none',
            duration: 3000
          })
          return;
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
              var sql = "insert into product_item(product_id,guige,bianhao,caigou_price,jinxiang,enable,image) values "
              var sql2 = ""
              for(var i=0; i<lianxi_list.length; i++){
                if(sql2 == ""){
                  sql2 = "('" + new_id + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].bianhao + "','" + lianxi_list[i].caigou_price + "','" + lianxi_list[i].jinxiang + "','" + lianxi_list[i].enable +  "','http://yhocn.cn:9088/ruilida/" + lianxi_list[i].bianhao + ".jpg" + "')"
                }else{
                  sql2 = sql2 + ",('" + new_id + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].bianhao + "','" + lianxi_list[i].caigou_price + "','" + lianxi_list[i].jinxiang + "','" + lianxi_list[i].enable +  "','http://yhocn.cn:9088/ruilida/" + lianxi_list[i].bianhao + ".jpg" + "')"
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
                  console.log(lianxi_list)
                  for(var i=0; i<lianxi_list.length; i++){
                    if(lianxi_list[i].image.indexOf("base64") != -1){
                      var fsm = wx.getFileSystemManager();
                      var buffer = wx.base64ToArrayBuffer(lianxi_list[i].image.split(',')[1]);
                      const fileName = wx.env.USER_DATA_PATH + '/'+ lianxi_list[i].bianhao +'.jpg';
                      fsm.writeFileSync(fileName, buffer, 'binary');
                      console.log(fileName);
                       wx.uploadFile({
                        url: 'http://yhocn.cn:9087/file/upload',
                        header: { "Content-Type": "multipart/form-data" },
                        filePath: fileName,
                        name: 'file',
                        formData:{
                        name: lianxi_list[i].bianhao +'.jpg',
                        path: '/ruilida/',
                        kongjian: _this.data.kongjian,
                        },
                        success(res){
                          console.log(res.data);
                          if(res.data.indexOf("存储空间不足") != -1){
                            wx.showToast({
                              title: '存储空间不足！',
                              icon: 'none'
                            })
                          }
                        }
                      })
                    }
                  }
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
              var sql = "delete from product_item where product_id='" + new_id + "';insert into product_item(product_id,guige,bianhao,caigou_price,jinxiang,enable,image) values "
              var sql2 = ""
              for(var i=0; i<lianxi_list.length; i++){
                if(sql2 == ""){
                  sql2 = "('" + new_id + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].bianhao + "','" + lianxi_list[i].caigou_price + "','" + lianxi_list[i].jinxiang + "','" + lianxi_list[i].enable + "','http://yhocn.cn:9088/ruilida/" + lianxi_list[i].bianhao + ".jpg" + "')"
                }else{
                  sql2 = sql2 + ",('" + new_id + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].bianhao + "','" + lianxi_list[i].caigou_price + "','" + lianxi_list[i].jinxiang + "','" + lianxi_list[i].enable + "','http://yhocn.cn:9088/ruilida/" + lianxi_list[i].bianhao + ".jpg" + "')"
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
                  for(var i=0; i<lianxi_list.length; i++){
                    if(lianxi_list[i].image.indexOf("base64") != -1){
                      var fsm = wx.getFileSystemManager();
                      var buffer = wx.base64ToArrayBuffer(lianxi_list[i].image.split(',')[1]);
                      const fileName = wx.env.USER_DATA_PATH + '/'+ lianxi_list[i].bianhao +'.jpg';
                      fsm.writeFileSync(fileName, buffer, 'binary');
                      console.log(fileName);
                       wx.uploadFile({
                        url: 'http://yhocn.cn:9087/file/upload',
                        header: { "Content-Type": "multipart/form-data" },
                        filePath: fileName,
                        name: 'file',
                        formData:{
                        name: lianxi_list[i].bianhao +'.jpg',
                        path: '/ruilida/',
                        kongjian: _this.data.kongjian,
                        },
                        success(res){
                          console.log(res.data);
                          if(res.data.indexOf("存储空间不足") != -1){
                            wx.showToast({
                              title: '存储空间不足！',
                              icon: 'none'
                            })
                          }
                        }
                      })
                    }
                  }
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

  onInput_text(e){
    console.log(e)
    var _this = this
    var new_value = e.detail.value
    var column = e.currentTarget.dataset.column
    _this.setData({
      [column]:new_value
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

  guige_goto(){
    var _this = this
    _this.setData({
      moreShow:false
    })
    wx.navigateTo({
      url: '../peizhi_guige/peizhi_guige' + '?userInfo=' + JSON.stringify(_this.data.userInfo),
    })
    
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

function getEndingNumber(str) {
  var regex = /\d+$/;
  var match = str.match(regex);
  if (match) {
    return match[0];
  } else {
    return null;
  }
}