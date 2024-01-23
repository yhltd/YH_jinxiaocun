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
    chuku_body: {
      id:'',
      bianhao:'',
      riqi:'',
      xiaoshou_id:'',
      kehu:'',
      dianpu:'',
      cangku:'',
      beizhu:'',
      chuku_danwei:'',
      yewuyuan:'',
    },
    lianxi_list:[
      {
        id:'',
        shangpin_bianma:'',
        name:'',
        guige:'',
        caizhi:'',
        jishu_biaozhun:'',
        zhibao_dengji:'',
        danwei:'',
        shuliang:'0.0000',
        xiaoshou_danjia:'0.00',
        jiashui_xiaoji:'0.00',
        beizhu:'',
      }
    ],
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
    var chuku_body = _this.data.chuku_body
    chuku_body.yewuyuan = userInfo.name
    _this.setData({
      chuku_body,
      userInfo,
      areaList: areaList.list
    })
    var id = options.id
    var xiaoshou_id = options.xiaoshou_id
    var sql = "select * from customer;select * from peizhi where type = '店铺';select id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item_id,product_id,guige,bianhao,caigou_price,jinxiang,enable,isselect,isnull(shangpin_bianhao,'') as shangpin_bianhao,isnull(zuigaojia,'') as zuigaojia from (select p.id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item.id as item_id,product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,convert(float,caigou_price) as caigou_price,jinxiang,xiaoxiang,enable,1 as isselect from product as p left join product_item as item on p.id = item.product_id where enable = '是' ) as pro left join (select shangpin_bianhao,max(convert(float,baojia_danjia)) as zuigaojia from xiaoshou_dingdan_item group by shangpin_bianhao) as price on pro.bianhao = price.shangpin_bianhao;select * from userInfo;select * from peizhi where type = '仓库';select * from peizhi_shuilv;select * from peizhi where type = '核算单位';"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var kehu_list = res.result.recordsets[0]
        var dianpu_list = res.result.recordsets[1]
        var product_list = res.result.recordsets[2]
        var shenhe_list = res.result.recordsets[3]
        var yewuyuan_list = res.result.recordsets[3]
        var cangku_list = res.result.recordsets[4]
        var peizhi_shuilv = res.result.recordsets[5][0]
        var chuku_danwei_list = res.result.recordsets[6]
        var fujia_shuilv = 1
        if(peizhi_shuilv.zhuangtai == '是'){
          fujia_shuilv = fujia_shuilv + (peizhi_shuilv.shuilv / 100)
        }
        console.log(fujia_shuilv)
        for(var i=0; i<product_list.length; i++){
          var jinxiang = product_list[i].jinxiang / 100
          var xiaoxiang = product_list[i].xiaoxiang / 100
          var pifa_bili = product_list[i].pifa_bili / 100
          var lingshou_bili = product_list[i].lingshou_bili / 100
          var dakehu_bili = product_list[i].dakehu_bili / 100
          var caigou_price = product_list[i].caigou_price * 1
          product_list[i].lingshou_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * lingshou_bili)) * 100) / 100
          product_list[i].pifa_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * pifa_bili)) * 100 ) / 100
          product_list[i].dakehu_price = Math.round((caigou_price * (1 + xiaoxiang * fujia_shuilv)) / ((1+jinxiang) * (1-(1+xiaoxiang*fujia_shuilv) * dakehu_bili)) * 100) / 100
        }

        var jiage_dengji_list=[
          {name:'零售价格'},
          {name:'批发价格'},
          {name:'大客户价格'},
        ]
        if(peizhi_shuilv.dakehu_zhuangtai != '是'){
          jiage_dengji_list.splice(2,1)
        }
        if(peizhi_shuilv.pifa_zhuangtai != '是'){
          jiage_dengji_list.splice(1,1)
        }
        if(peizhi_shuilv.lingshou_zhuangtai != '是'){
          jiage_dengji_list.splice(0,1)
        } 
        console.log(peizhi_shuilv)
        console.log(fujia_shuilv)

        var kehu_jiage = {}
        for(var i=0; i<kehu_list.length; i++){
          kehu_jiage[kehu_list[i].name] = kehu_list[i].jiage_dengji
        }
        _this.setData({
          peizhi_shuilv,
          kehu_list,
          dianpu_list,
          product_list,
          shenhe_list,
          cangku_list,
          chuku_danwei_list,
          yewuyuan_list,
          fujia_shuilv,
          jiage_dengji_list,
          kehu_jiage
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
      var sql = "select * from xiaoshou_chuku where id=" + id + ";select * from xiaoshou_chuku_item where chuku_id = '" + id + "'"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var chuku_body = res.result.recordsets[0][0]
          var lianxi_list = res.result.recordsets[1]
          _this.setData({
            id,
            chuku_body,
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
    }else if(id == undefined && xiaoshou_id == undefined){
      var sql = "select convert(float,SUBSTRING(isnull(max(bianhao),'CK000000'),3,6)) + 1 as bianhao from xiaoshou_chuku;select * from peizhi where type = '店铺';;select * from peizhi where type = '仓库';"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var max_bianhao = res.result.recordsets[0][0].bianhao
          var this_bianhao = PrefixInteger(max_bianhao,6)
          console.log(this_bianhao)
          this_bianhao = "CK" + this_bianhao
          console.log(this_bianhao)
          var chuku_body = _this.data.chuku_body
          chuku_body.bianhao = this_bianhao
          chuku_body.riqi = getNowDate()
          var dianpu_list = res.result.recordsets[1]
          if(_this.data.userInfo.dianpu != ''){
            for(var i=0; i<dianpu_list.length; i++){
              if(dianpu_list[i].id == _this.data.userInfo.dianpu){
                chuku_body.dianpu = dianpu_list[i].name
                break;
              }
            }
          }
          var cangku_list = res.result.recordsets[2]
          if(_this.data.userInfo.cangku != ''){
            for(var i=0; i<cangku_list.length; i++){
              if(cangku_list[i].id == _this.data.userInfo.cangku){
                chuku_body.cangku = cangku_list[i].name
                break;
              }
            }
          }
          _this.setData({
            chuku_body
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
    }else if(xiaoshou_id != undefined){
      console.log(xiaoshou_id)
      var sql = "select *,1 as isselect from xiaoshou_dingdan where id=" + xiaoshou_id + ";select dingdan.shangpin_bianhao,dingdan.shangpin_mingcheng,dingdan.guige,dingdan.caizhi,dingdan.jishu_biaozhun,dingdan.zhibao_dengji,dingdan.danwei,dingdan.shuliang,dingdan.baojia_danjia,dingdan.jiashui_xiaoji,dingdan.bianhao,isnull(chuku.shuliang,0) as chuku_shuliang,convert(float,isnull(dingdan.shuliang,0)) - convert(float,isnull(chuku.shuliang,0)) as weichu_shuliang,'' as beizhu from(select shangpin_bianhao,shangpin_mingcheng,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,baojia_danjia,jiashui_xiaoji,bianhao from xiaoshou_dingdan_item as item left join xiaoshou_dingdan as dingdan on item.xiaoshou_id = dingdan.id where xiaoshou_id = " + xiaoshou_id + ") as dingdan left join (select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(convert(float,isnull(shuliang,0))) as shuliang,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji,xiaoshou_id from xiaoshou_chuku_item as item left join xiaoshou_chuku as chuku on item.chuku_id = chuku.id group by shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,xiaoshou_id) as chuku on dingdan.bianhao = chuku.xiaoshou_id and dingdan.shangpin_bianhao = chuku.shangpin_bianma and dingdan.shangpin_mingcheng = chuku.name and dingdan.guige = chuku.guige and dingdan.caizhi = chuku.caizhi and dingdan.jishu_biaozhun = chuku.jishu_biaozhun and dingdan.zhibao_dengji = chuku.zhibao_dengji and dingdan.danwei = chuku.danwei where convert(float,isnull(dingdan.shuliang,0)) - convert(float,isnull(chuku.shuliang,0)) > 0;"
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          var list = res.result.recordsets[0]
          var list_item = res.result.recordsets[1]
          var chuku_body = _this.data.chuku_body
          chuku_body.xiaoshou_id = list[0].bianhao
          chuku_body.kehu = list[0].kehu
          chuku_body.dianpu = list[0].dianpu
          chuku_body.chuku_danwei = list[0].xiaoshou_danwei
          var lianxi_list = list_item
          console.log(lianxi_list)
          for(var i=0; i<lianxi_list.length; i++){
            lianxi_list[i].shangpin_bianma = lianxi_list[i].shangpin_bianhao
            lianxi_list[i].name = lianxi_list[i].shangpin_mingcheng
            lianxi_list[i].xiaoshou_danjia = (lianxi_list[i].baojia_danjia * 1).toFixed(2)
            lianxi_list[i].shuliang = (lianxi_list[i].weichu_shuliang * 1).toFixed(4)
            lianxi_list[i].jiashui_xiaoji = (lianxi_list[i].xiaoshou_danjia * lianxi_list[i].weichu_shuliang).toFixed(2)
          }
          console.log(lianxi_list)
          _this.setData({
            chuku_body,
            lianxi_list,
          })
          console.log(lianxi_list)
          console.log(chuku_body)

          var sql = "select convert(float,SUBSTRING(isnull(max(bianhao),'CK000000'),3,6)) + 1 as bianhao from xiaoshou_chuku;select * from peizhi where type = '店铺';;select * from peizhi where type = '仓库';"
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              var max_bianhao = res.result.recordsets[0][0].bianhao
              var this_bianhao = PrefixInteger(max_bianhao,6)
              console.log(this_bianhao)
              this_bianhao = "CK" + this_bianhao
              console.log(this_bianhao)
              var chuku_body = _this.data.chuku_body
              chuku_body.bianhao = this_bianhao
              chuku_body.riqi = getNowDate()
              // var dianpu_list = res.result.recordsets[1]
              // if(_this.data.userInfo.dianpu != ''){
              //   for(var i=0; i<dianpu_list.length; i++){
              //     if(dianpu_list[i].id == _this.data.userInfo.dianpu){
              //       chuku_body.dianpu = dianpu_list[i].name
              //       break;
              //     }
              //   }
              // }
              var cangku_list = res.result.recordsets[2]
              if(_this.data.userInfo.cangku != ''){
                for(var i=0; i<cangku_list.length; i++){
                  if(cangku_list[i].id == _this.data.userInfo.cangku){
                    chuku_body.cangku = cangku_list[i].name
                    break;
                  }
                }
              }
              _this.setData({
                chuku_body
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
    }
  },

  caigou_click:function(){
    var _this = this
    var sql = "select *,1 as isselect from xiaoshou_dingdan;select dingdan.shangpin_bianhao,dingdan.shangpin_mingcheng,dingdan.guige,dingdan.caizhi,dingdan.jishu_biaozhun,dingdan.zhibao_dengji,dingdan.danwei,dingdan.shuliang,dingdan.baojia_danjia,dingdan.jiashui_xiaoji,dingdan.bianhao,isnull(chuku.shuliang,0) as chuku_shuliang,convert(float,isnull(dingdan.shuliang,0)) - convert(float,isnull(chuku.shuliang,0)) as weichu_shuliang,'' as beizhu from(select shangpin_bianhao,shangpin_mingcheng,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,baojia_danjia,jiashui_xiaoji,bianhao from xiaoshou_dingdan_item as item left join xiaoshou_dingdan as dingdan on item.xiaoshou_id = dingdan.id) as dingdan left join (select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(convert(float,isnull(shuliang,0))) as shuliang,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji,xiaoshou_id from xiaoshou_chuku_item as item left join xiaoshou_chuku as chuku on item.chuku_id = chuku.id group by shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,xiaoshou_id) as chuku on dingdan.bianhao = chuku.xiaoshou_id and dingdan.shangpin_bianhao = chuku.shangpin_bianma and dingdan.shangpin_mingcheng = chuku.name and dingdan.guige = chuku.guige and dingdan.caizhi = chuku.caizhi and dingdan.jishu_biaozhun = chuku.jishu_biaozhun and dingdan.zhibao_dengji = chuku.zhibao_dengji and dingdan.danwei = chuku.danwei where convert(float,isnull(dingdan.shuliang,0)) - convert(float,isnull(chuku.shuliang,0)) > 0;"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordsets[0]
        var list_item = res.result.recordsets[1]
        for(var i=list.length-1; i >=0; i--){
          for(var j=list_item.length-1; j>=0; j--){
            if(list[i].bianhao == list_item[j].bianhao){
              if(list[i].item == undefined){
                var this_item = []
                this_item.push(list_item[j])
                list_item.splice(j,1)
                list[i].item = this_item
              }else{
                var this_item = list[i].item
                this_item.push(list_item[j])
                list_item.splice(j,1)
                list[i].item = this_item
              }
            }
          }
        }
        for(var i=list.length-1; i>=0; i--){
          if(list[i].item == undefined){
            list.splice(i,1)
          }
        }
        console.log(list)
        console.log(list_item)
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
    _this.setData({
      caigou_show: true
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
    _this.setData({
      caigou_list
    })
  },

  caigou_select:function(e){
    var _this = this
    console.log(e)
    var this_index = e.currentTarget.dataset.index
    var caigou_list = _this.data.caigou_list[this_index]
    var chuku_body = _this.data.chuku_body
    chuku_body.xiaoshou_id = caigou_list.bianhao
    chuku_body.kehu = caigou_list.kehu
    chuku_body.dianpu = caigou_list.dianpu
    chuku_body.chuku_danwei = caigou_list.xiaoshou_danwei
    var lianxi_list = caigou_list.item
    console.log(caigou_list.item)
    for(var i=0; i<lianxi_list.length; i++){
      lianxi_list[i].shangpin_bianma = lianxi_list[i].shangpin_bianhao
      lianxi_list[i].name = lianxi_list[i].shangpin_mingcheng
      lianxi_list[i].xiaoshou_danjia = (lianxi_list[i].baojia_danjia * 1).toFixed(2)
      lianxi_list[i].shuliang = (lianxi_list[i].weichu_shuliang * 1).toFixed(4)
      lianxi_list[i].jiashui_xiaoji = (lianxi_list[i].xiaoshou_danjia * lianxi_list[i].weichu_shuliang).toFixed(2)
    }
    console.log(lianxi_list)
    _this.setData({
      chuku_body,
      lianxi_list,
    })
    _this.qxShow()
  },

  product_select:function(e){
    var _this = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    console.log(index)
    var product_list = _this.data.product_list
    var peizhi_shuilv = _this.data.peizhi_shuilv
    var bianhao = _this.data.chuku_body.xiaoshou_id
    if(bianhao == ''){
      wx.showToast({
        title: '请先选择销售单',
        icon:'none'
      })
      return;
    }
    var sql = "select dingdan.shangpin_bianhao,dingdan.shangpin_mingcheng,dingdan.guige,dingdan.caizhi,dingdan.jishu_biaozhun,dingdan.zhibao_dengji,dingdan.danwei,dingdan.shuliang,dingdan.baojia_danjia,dingdan.jiashui_xiaoji,dingdan.bianhao,isnull(chuku.shuliang,0) as chuku_shuliang,convert(float,isnull(dingdan.shuliang,0)) - convert(float,isnull(chuku.shuliang,0)) as weichu_shuliang,'' as beizhu from(select shangpin_bianhao,shangpin_mingcheng,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,baojia_danjia,jiashui_xiaoji,bianhao from xiaoshou_dingdan_item as item left join xiaoshou_dingdan as dingdan on item.xiaoshou_id = dingdan.id) as dingdan left join (select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(convert(float,isnull(shuliang,0))) as shuliang,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji,xiaoshou_id from xiaoshou_chuku_item as item left join xiaoshou_chuku as chuku on item.chuku_id = chuku.id group by shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,xiaoshou_id) as chuku on dingdan.bianhao = chuku.xiaoshou_id and dingdan.shangpin_bianhao = chuku.shangpin_bianma and dingdan.shangpin_mingcheng = chuku.name and dingdan.guige = chuku.guige and dingdan.caizhi = chuku.caizhi and dingdan.jishu_biaozhun = chuku.jishu_biaozhun and dingdan.zhibao_dengji = chuku.zhibao_dengji and dingdan.danwei = chuku.danwei where bianhao='" + bianhao + "';"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res.result.recordsets[0])
        var product_list = res.result.recordsets[0]
        if(product_list.length == 0){
          wx.showToast({
            title: '此销售订单已全部出库',
            icon:'none'
          })
          return;
        }
        for(var i=0; i< product_list.length; i++){
          product_list[i].isselect = 1
        }
        _this.setData({
          product_index: index,
          product_show: true,
          product_list,
          type:'',
          name:'',
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
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  sel_product:function(){
    var _this = this
    var product_list = _this.data.product_list
    var name = _this.data.name
    for(var i=0; i<product_list.length; i++){
      if(name == ''){
        product_list[i].isselect = 1
      }else if(name != ''){
        if(product_list[i].shangpin_mingcheng.indexOf(name) != -1){
          product_list[i].isselect = 1
        }else{
          product_list[i].isselect = 0
        }
      }
    }
    _this.setData({
      product_list
    })
  },

  product_click:function(e){
    var _this = this
    var index = e.currentTarget.dataset.index
    var product_index = _this.data.product_index
    var lianxi_list = _this.data.lianxi_list
    var product_list = _this.data.product_list
    var chuku_body = _this.data.chuku_body
    var chuku_kehu = chuku_body.kehu
    var kehu_jiage = _this.data.kehu_jiage

    lianxi_list[product_index].shangpin_bianma = product_list[index].shangpin_bianhao
    lianxi_list[product_index].name = product_list[index].shangpin_mingcheng
    lianxi_list[product_index].guige = product_list[index].guige
    lianxi_list[product_index].caizhi = product_list[index].caizhi
    lianxi_list[product_index].jishu_biaozhun = product_list[index].jishu_biaozhun
    lianxi_list[product_index].zhibao_dengji = product_list[index].zhibao_dengji
    lianxi_list[product_index].danwei = product_list[index].danwei
    lianxi_list[product_index].shuliang = (product_list[index].weichu_shuliang * 1).toFixed(4)
    lianxi_list[product_index].xiaoshou_danjia = (product_list[index].baojia_danjia * 1).toFixed(2)
    if(lianxi_list[product_index].xiaoshou_danjia != '' && lianxi_list[product_index].shuliang != ''){
      lianxi_list[product_index].jiashui_xiaoji = (Math.round(lianxi_list[product_index].xiaoshou_danjia * lianxi_list[product_index].shuliang * 100) / 100).toFixed(2)
    }
    _this.setData({
      lianxi_list
    })
    _this.qxShow()
    console.log(index)
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
    if(column_name == 'riqi'){
      var chuku_body = _this.data.chuku_body
      chuku_body.riqi = e.detail.value
      _this.setData({
        chuku_body
      })
    }
    console.log(e.detail.value)
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
          list.push({
            id:'',
            shangpin_bianma:'',
            name:'',
            guige:'',
            caizhi:'',
            jishu_biaozhun:'',
            zhibao_dengji:'',
            danwei:'',
            shuliang:'0.0000',
            xiaoshou_danjia:'0.00',
            jiashui_xiaoji:'0.00',
            beizhu:'',
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
    var chuku_body = _this.data.chuku_body
    var lianxi_list = _this.data.lianxi_list
    console.log(chuku_body)
    console.log(lianxi_list)
    if(chuku_body.kehu == ''){
      wx.showToast({
        title: '请选择客户',
        icon: 'none'
      })
      return;
    }
    if(chuku_body.dianpu == ''){
      wx.showToast({
        title: '请选择店铺',
        icon: 'none'
      })
      return;
    }
    if(chuku_body.cangku == ''){
      wx.showToast({
        title: '请选择仓库',
        icon: 'none'
      })
      return;
    }
    if(chuku_body.yewuyuan == ''){
      wx.showToast({
        title: '请选择业务员',
        icon: 'none'
      })
      return;
    }
    for(var i=0; i<lianxi_list.length; i++){
      if(lianxi_list[i].shangpin_bianma == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未选择商品',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].shuliang == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写数量',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].xiaoshou_danjia == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条商品未填写单价',
          icon: 'none'
        })
        return;
      }
    }
    if(chuku_body.id == ''){
      wx.showLoading({
        title:'保存中'
      })
      var sql = "insert into xiaoshou_chuku(bianhao,riqi,xiaoshou_id,kehu,dianpu,cangku,beizhu,chuku_danwei,yewuyuan) output inserted.id values('" + chuku_body.bianhao + "','" + chuku_body.riqi + "','" + chuku_body.xiaoshou_id + "','" + chuku_body.kehu + "','" + chuku_body.dianpu + "','" + chuku_body.cangku + "','" + chuku_body.beizhu + "','" + chuku_body.chuku_danwei + "','" + chuku_body.yewuyuan + "')"
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          chuku_body.id = new_id
          _this.setData({
            chuku_body
          })
          var sql = "insert into xiaoshou_chuku_item(shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,xiaoshou_danjia,jiashui_xiaoji,beizhu,chuku_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].xiaoshou_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].xiaoshou_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
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
      console.log(chuku_body)
      wx.showLoading({
        title:'保存中'
      })
      var sql = "update xiaoshou_chuku set bianhao='" + chuku_body.bianhao + "',riqi='" + chuku_body.riqi + "',xiaoshou_id='" + chuku_body.xiaoshou_id + "',kehu='" + chuku_body.kehu + "',dianpu='" + chuku_body.dianpu + "',cangku='" + chuku_body.cangku + "',beizhu='" + chuku_body.beizhu + "' where id=" + chuku_body.id
      console.log(chuku_body)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = chuku_body.id
          var sql = "delete from xiaoshou_chuku_item where chuku_id='" + new_id + "';insert into xiaoshou_chuku_item(shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,xiaoshou_danjia,jiashui_xiaoji,beizhu,chuku_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].xiaoshou_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].shangpin_bianma + "','" + lianxi_list[i].name + "','" + lianxi_list[i].guige + "','" + lianxi_list[i].caizhi + "','" + lianxi_list[i].jishu_biaozhun + "','" + lianxi_list[i].zhibao_dengji + "','" + lianxi_list[i].danwei + "','" + lianxi_list[i].shuliang + "','" + lianxi_list[i].xiaoshou_danjia + "','" + lianxi_list[i].jiashui_xiaoji +  "','"  + lianxi_list[i].beizhu + "','" + new_id + "')"
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
    console.log(_this.data.chuku_body)
    console.log(_this.data.lianxi_list)
    if(index == undefined){
      var chuku_body = _this.data.chuku_body
      chuku_body[column] = new_value
      _this.setData({
        chuku_body
      })
    }else{
      var lianxi_list = _this.data.lianxi_list
      lianxi_list[index][column] = new_value
      if(lianxi_list[index].xiaoshou_danjia != '' && lianxi_list[index].shuliang != '' && column != 'jiashui_xiaoji'){
        lianxi_list[index].jiashui_xiaoji = (Math.round(lianxi_list[index].xiaoshou_danjia * lianxi_list[index].shuliang * 100) / 100).toFixed(2)
      }else if(lianxi_list[index].jiashui_xiaoji != '' && lianxi_list[index].shuliang != '' && column == 'jiashui_xiaoji'){
        lianxi_list[index].xiaoshou_danjia = (Math.round(lianxi_list[index].jiashui_xiaoji / lianxi_list[index].shuliang * 100) / 100).toFixed(2)
      }
      _this.setData({
        lianxi_list
      })
    }
  },

  shuliang_refresh(e){
    var _this = this
    console.log(e)
    var new_val = e.detail.value * 1
    var list = _this.data.lianxi_list
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    list[index][column] = new_val.toFixed(4)
    _this.setData({
      lianxi_list:list
    })
  },

  jiage_refresh(e){
    var _this = this
    console.log(e)
    var new_val = e.detail.value * 1
    var list = _this.data.lianxi_list
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    list[index][column] = new_val.toFixed(2)
    _this.setData({
      lianxi_list:list
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
      var chuku_body = _this.data.chuku_body
      var lianxi_list = _this.data.lianxi_list
      if(click_index == undefined){
        chuku_body[click_column] = new_val
        _this.setData({
          xlShow2: false,
          chuku_body,
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