// package_ruilida/page/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kaipiao_show:false,
    caozuo_click_list:[
      {name:'文件上传'},
      {name:'打印设置'},
      {name:'打印'},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var id = options.id
    var type = options.type
    const systemInfo = wx.getSystemInfoSync();
    var scoll_height = systemInfo.windowHeight * 0.63
    _this.setData({
      userInfo,
      id,
      type,
      scoll_height
    })
    var sql = "select * from product_item"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        var pic_list = {}
        for(var i=0; i<list.length; i++){
          if(list[i].bianhao != ''){
            pic_list[list[i].bianhao] = list[i].image
          }
        }
        _this.setData({
          pic_list
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
      [column]: e.detail.value
    })
  },

  change_kaipiao:function(e){
    var _this = this
    console.log(e)
    var this_val = e.detail * 1
    var index = e.currentTarget.dataset.index
    var xukai_list = _this.data.xukai_list
    var max_val = _this.data.xukai_list[index].weikai * 1
    if(this_val >= max_val){
      xukai_list[index].this_kai = max_val
    }else{
      xukai_list[index].this_kai = e.detail
    }
    _this.setData({
      xukai_list
    })
  },

  change_kaipiao2:function(e){
    var _this = this
    console.log(e)
    var this_val = e.detail * 1
    var index = e.currentTarget.dataset.index
    var xukai_list = _this.data.xukai_list
    var max_val = _this.data.xukai_list[index].weikai * 1
    if(this_val >= max_val){
      xukai_list[index].this_kai = 0
    }else{
      xukai_list[index].this_kai = max_val - this_val
    }
    _this.setData({
      xukai_list
    })
  },

  del1:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    var id = _this.data.id
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.xiaoshou_dingdan_del != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确认删除此条信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var sql = "delete from xiaoshou_dingdan where id=" + id + ";delete from xiaoshou_dingdan_item where xiaoshou_id ='" + id + "'"
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              wx.showToast({
                title: '删除成功',
                icon: 'none'
              })
              setTimeout(function () {
                _this.back()
              }, 2000)
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  goto_upd:function(){
    var _this = this
    var userInfo = _this.data.userInfo
    var id = _this.data.id
    if(userInfo.power_mingxi.xiaoshou_dingdan_upd != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../xiaoshou_dingdanAdd/xiaoshou_dingdanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
    })
  },

  xiala_show:function(){
    var _this = this
    _this.setData({
      xlShow4:true
    })
  },


  select4: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var id = _this.data.id
      if(new_val == '打印'){
        _this.setData({
          xlShow4:false,
        })
        var index = _this.data.caozuo_index
        var list = _this.data.list[0]
        var product_list = _this.data.list[0].item
        console.log(list)
        console.log(product_list)
        console.log()
        var print_list = {
          title:'销售订单',
          bianhao: list.bianhao,
          riqi: list.riqi,
          kegong: '客户',
          kegong_val: list.kehu
        }
        var product = []
        var num_sum = 0
        var money_sum = 0
        for(var i=0; i<product_list.length; i++){
          var product_item = {
            name:product_list[i].shangpin_mingcheng,
            num:product_list[i].shuliang,
            price:product_list[i].baojia_danjia,
            money:product_list[i].jiashui_xiaoji,
          }
          num_sum = Math.round(((num_sum * 1) + (product_list[i].shuliang * 1)) * 100) / 100
          money_sum = Math.round(((money_sum * 1) + (product_list[i].jiashui_xiaoji * 1)) * 100) / 100
          product.push(product_item)
        }
        print_list.num_sum = num_sum
        print_list.money_sum = money_sum
        print_list.product = product
        console.log(print_list)
        wx.navigateTo({
          url: '../print_danju/print_danju' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&list=" + JSON.stringify(print_list),
        })
      }else if(new_val == '打印设置'){
        _this.setData({
          xlShow4:false,
        })
        wx.navigateTo({
          url: '../print_danju_peizhi/print_danju_peizhi' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=2",
        })
      }else if(new_val == '文件上传'){
        _this.setData({
          xlShow4:false,
        })
        _this.file_goto()
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow4:false,
      })
    }
  },

  file_goto:function(){
    var _this = this
    var type = "销售订单"
    var id = _this.data.list.id
    console.log(id)
    console.log(type)
    wx.navigateTo({
      url: '../fileUpload/fileUpload?userInfo=' + JSON.stringify(_this.data.userInfo) + "&type=" + type + "&id=" + id,
    })
  },


  onChange:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var list = _this.data.xukai_list
    console.log(list)
    if(list[index].checked == false){
      list[index].checked = true
    }else{
      list[index].checked = false
    }
    _this.setData({
      xukai_list:list
    })
  },

  kaipiao_next:function(){
    var _this = this
    var benci_list = []
    for(var i=0; i<_this.data.xukai_list.length; i++){
      if(_this.data.xukai_list[i].this_kai * 1 > 0 && _this.data.xukai_list[i].checked){
        benci_list.push(_this.data.xukai_list[i])
      }
    }
    console.log(benci_list)
    if(benci_list.length > 0){
      _this.kaipiao_close()
      wx.navigateTo({
        url: '../xiaoshou_kaipiaoAdd/xiaoshou_kaipiaoAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + '&kaipiao_list=' + JSON.stringify(benci_list) + "&kehu_name=" + _this.data.list[0].kehu,
      })
    }else{
      wx.showToast({
        title: '未读取到已选中的填写金额的开票信息',
        icon:'none'
      })
    }
  },

  caigou_add:function(){
    var _this = this
    var product_list = _this.data.list[0].item
    console.log(product_list)
    var userInfo = _this.data.userInfo
    var list = _this.data.list
    if(list[0].shenhe_zhuangtai != '审核通过'){
      wx.showToast({
        title: '审核未通过不允许继续操作！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    wx.navigateTo({
      url: '../caigou_dingdanAdd/caigou_dingdanAdd?userInfo=' + JSON.stringify(userInfo) + '&product_list=' + JSON.stringify(product_list) + '&xiaoshou_id=' + _this.data.list[0].bianhao,
    })
  },

  tableShow: function (e) {
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.xiaoshou_dingdan_sel != '查看个人' && userInfo.power_mingxi.xiaoshou_dingdan_sel != '查看全部'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    var id = _this.data.id
    var sql = "select * from(select id,xiaoshou3.bianhao,riqi,kehu,yewuyuan,shoujianren,shoujian_phone,shoujian_dizhi,dianpu,xiaoxiang_shuilv,beizhu,jiashui_heji,jiage_dengji,shenhe,shenhe_zhuangtai,isnull(chuku_zhuangtai,'未出库') as chuku_zhuangtai,isnull(kaipiao_zhuangtai,'未开票') as kaipiao_zhuangtai,isnull(shoukuan_zhuangtai,'未收款') as shoukuan_zhuangtai,xiaoshou_danwei,shenhe_list from(select id,xiaoshou2.bianhao,riqi,kehu,yewuyuan,shoujianren,shoujian_phone,shoujian_dizhi,dianpu,xiaoxiang_shuilv,beizhu,jiashui_heji,jiage_dengji,shenhe,shenhe_zhuangtai,chuku_zhuangtai,kaipiao_zhuangtai,xiaoshou_danwei,shenhe_list from (select id,xiaoshou.bianhao,riqi,kehu,yewuyuan,shoujianren,shoujian_phone,shoujian_dizhi,dianpu,xiaoxiang_shuilv,beizhu,jiashui_heji,jiage_dengji,shenhe,shenhe_zhuangtai,chuku_zhuangtai,xiaoshou_danwei,shenhe_list from xiaoshou_dingdan as xiaoshou left join (select bianhao,case when sum(panduan) = 0 then '未出库' when sum(panduan) < count(bianhao) then '部分出库' when count(bianhao) <= sum(panduan) then '全部出库' end as chuku_zhuangtai from (select bianhao,xiaoshou.shangpin_bianhao,isnull(xiaoshou.shuliang,0) as xiaoshou_shuliang,isnull(chuku.shuliang,0) as chuku_shuliang,case when convert(float,isnull(xiaoshou.shuliang,0)) > convert(float,isnull(chuku.shuliang,0)) then 0 else 1 end as panduan from (select bianhao,shangpin_bianhao,shuliang from xiaoshou_dingdan_item as item left join xiaoshou_dingdan as dingdan on item.xiaoshou_id = dingdan.id ) as xiaoshou left join (select shangpin_bianma,sum(convert(float,isnull(shuliang,0))) as shuliang,xiaoshou_id from xiaoshou_chuku_item as chuku left join (select * from xiaoshou_chuku where isnull(xiaoshou_id,'') != '') as chuku_dan on chuku.chuku_id = chuku_dan.id where isnull(xiaoshou_id,'') != '' group by shangpin_bianma,xiaoshou_id) as chuku on xiaoshou.bianhao = chuku.xiaoshou_id and xiaoshou.shangpin_bianhao = chuku.shangpin_bianma) as chuku group by bianhao) as chuku on xiaoshou.bianhao = chuku.bianhao) as xiaoshou2 left join (select bianhao,case when isnull(kaipiao_money,0) = 0 then '未开票' when isnull(kaipiao_money,0) < isnull(xiaoshou_money,0) then '部分开票' when isnull(kaipiao_money,0) >= isnull(xiaoshou_money,0) then '全部开票' end as kaipiao_zhuangtai from (select xiaoshou_id as bianhao,sum(convert(float,isnull(xiaoshou_money,0))) as xiaoshou_money,sum(convert(float,isnull(kaipiao_money,0))) as kaipiao_money from (select bianhao,xiaoshou_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as xiaoshou_money from xiaoshou_chuku_item as item left join xiaoshou_chuku as xiaoshou on xiaoshou.id = item.chuku_id group by bianhao,xiaoshou_id) as xiaoshou left join (select xiaoshou_bianhao,sum(convert(float,isnull(kaipiao_jine,0)) + convert(float,isnull(kaipiao_shuie,0))) as kaipiao_money from xiaoshou_kaipiao group by xiaoshou_bianhao) as kaipiao on xiaoshou.bianhao = kaipiao.xiaoshou_bianhao group by xiaoshou_id) as kaipiao) as kaipiao on xiaoshou2.bianhao = kaipiao.bianhao) as xiaoshou3 left join(select bianhao,isnull(xiaoshou_money,0) as xiaoshou_money,isnull(money,0) as shoufu_money,case when isnull(money,0)  = 0 then '未收款' when isnull(xiaoshou_money,0) > isnull(money,0)  then '部分收款' when isnull(xiaoshou_money,0) <= isnull(money,0) then '全部收款' end as shoukuan_zhuangtai from(select bianhao,sum(convert(float,isnull(jiashui_xiaoji,0))) as xiaoshou_money from xiaoshou_dingdan_item as item left join xiaoshou_dingdan as xiaoshou on xiaoshou.id = item.xiaoshou_id group by bianhao) as xiaoshou left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi group by danju_bianhao) as shoufukuan on xiaoshou.bianhao = shoufukuan.danju_bianhao) as shoukuan on xiaoshou3.bianhao = shoukuan.bianhao) as xiaoshou where id = " + _this.data.id
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        console.log(list)
        _this.setData({
          list: list,
        })
        var sql = "select dingdan.id,dingdan.shangpin_bianhao,dingdan.shangpin_mingcheng,dingdan.guige,dingdan.caizhi,dingdan.jishu_biaozhun,dingdan.zhibao_dengji,dingdan.danwei,dingdan.shuliang,isnull(chuku.shuliang,0) as chuku_shuliang,isnull(dingdan.shuliang,0)-isnull(chuku.shuliang,0) as weichu_shuliang,dingdan.baojia_danjia,dingdan.jiashui_xiaoji from(select * from xiaoshou_dingdan_item where xiaoshou_id = "+ id +") as dingdan left join (select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(convert(float,isnull(shuliang,0))) as shuliang,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from (select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,xiaoshou_danjia,jiashui_xiaoji from xiaoshou_chuku left join xiaoshou_chuku_item on xiaoshou_chuku.id = xiaoshou_chuku_item.chuku_id where xiaoshou_id = '" + list[0].bianhao + "') as chuku group by shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei) as chuku on dingdan.shangpin_bianhao = chuku.shangpin_bianma;"

        console.log(sql) 

        sql = sql + "select id,riqi,jiashui_xiaoji from xiaoshou_chuku as chuku left join (select chuku_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from xiaoshou_chuku_item group by chuku_id) as item on chuku.id = item.chuku_id where xiaoshou_id = '" + list[0].bianhao + "';"

        sql = sql + "select id,shouzhi_riqi,convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0)) as money from shouzhi_mingxi where danju_leixing = '销售订单' and danju_bianhao = '" + list[0].bianhao + "' union select shouzhi_mingxi.id,shouzhi_riqi,convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0)) as money from shouzhi_mingxi left join xiaoshou_chuku on shouzhi_mingxi.danju_bianhao = xiaoshou_chuku.bianhao where danju_leixing = '销售出库' and xiaoshou_id = '" + list[0].bianhao + "' order by shouzhi_riqi;"

        sql = sql + "select xiaoshou_kaipiao.id,kaipiao_riqi,jiashui_heji from xiaoshou_chuku left join xiaoshou_kaipiao on xiaoshou_chuku.bianhao = xiaoshou_kaipiao.xiaoshou_bianhao where isnull(xiaoshou_kaipiao.id,'') != '' and xiaoshou_id = '" + list[0].bianhao + "';"

        sql = sql + "select id,riqi,isnull(jiashui_xiaoji,0) as jiashui_xiaoji from caigou_dingdan as dingdan left join (select caigou_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from caigou_dingdan_item group by caigou_id) as item on dingdan.id = item.caigou_id where xiaoshou_id = '" + list[0].bianhao + "'"
        wx.cloud.callFunction({
          name: 'sqlserver_ruilida',
          data: {
            query: sql
          },
          success: res => {
            console.log(res)
            var product_list = res.result.recordsets[0]
            var chuku_list = res.result.recordsets[1]
            var heji = 0
            for(var i=0; i<product_list.length; i++){
              heji = heji + (product_list[i].jiashui_xiaoji * 1)
            }
            heji = Math.round(heji * 100) / 100
            var chuku_heji = 0
            for(var i=0; i<chuku_list.length; i++){
              chuku_list[i].jiashui_xiaoji = Math.round(chuku_list[i].jiashui_xiaoji * 100) / 100
              chuku_heji = chuku_heji + chuku_list[i].jiashui_xiaoji
            }

            var shoukuan_list = res.result.recordsets[2]
            var shoukuan_heji = 0
            for(var i=0; i<shoukuan_list.length; i++){
              shoukuan_list[i].money = Math.round(shoukuan_list[i].money * 100) / 100
              shoukuan_heji = shoukuan_heji + shoukuan_list[i].money
            }

            var kaipiao_list = res.result.recordsets[3]
            var kaipiao_heji = 0
            for(var i=0; i<kaipiao_list.length; i++){
              kaipiao_list[i].jiashui_heji = Math.round(kaipiao_list[i].jiashui_heji * 100) / 100
              kaipiao_heji = kaipiao_heji + kaipiao_list[i].jiashui_heji
            }

            var caigou_list = res.result.recordsets[4]
            var caigou_heji = 0
            for(var i=0; i<caigou_list.length; i++){
              caigou_list[i].jiashui_xiaoji = Math.round(caigou_list[i].jiashui_xiaoji * 100) / 100
              caigou_heji = caigou_heji + caigou_list[i].jiashui_xiaoji
            }

            console.log(product_list)
            console.log(chuku_list)
            console.log(shoukuan_list)
            console.log(kaipiao_list)
            console.log(caigou_list)
            var list = _this.data.list
            list[0].item = product_list
            _this.setData({
              list,
              chuku_list,
              shoukuan_list,
              kaipiao_list,
              caigou_list,
              p_heji:heji,
              chuku_heji,
              shoukuan_heji,
              kaipiao_heji,
              caigou_heji
            }) 
            var type = _this.data.type
            if(type == '生成出库单'){
              _this.setData({
                type:''
              })
              _this.chuku_add()
            }else if(type == '生成收款单'){
              _this.setData({
                type:''
              })
              _this.shoukuan_add()
            }else if(type == '生成开票'){
              _this.setData({
                type:''
              })
              _this.kaipiao_add()
            }else if(type == '生成采购单'){
              _this.setData({
                type:''
              })
              _this.caigou_add()
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

  chuku_add:function(){
    var _this = this
    var id = _this.data.id
    var pro_list = _this.data.list[0].item
    var list = _this.data.list
    if(list[0].shenhe_zhuangtai != '审核通过'){
      wx.showToast({
        title: '审核未通过不允许继续操作！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    console.log(pro_list)
    var add_list = []
    for(var i=0; i<pro_list.length; i++){
      if(pro_list[i].weichu_shuliang > 0){
        add_list.push(pro_list[i])
      }
    }
    if(add_list.length > 0){
      wx.navigateTo({
        url: '../xiaoshou_chukuAdd/xiaoshou_chukuAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + '&xiaoshou_id=' + id,
      })
    }else{
      wx.showToast({
        title: '订单中商品已全部出库',
        icon:'none'
      })
    }
  },

  goto_chuku_xiangqing(e){
    var _this = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    var id = _this.data.chuku_list[index].id
    wx.navigateTo({
      url: '../xiaoshou_chuku_xiangqing/xiaoshou_chuku_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
    })
  },

  goto_shoukuan_xiangqing(e){
    var _this = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    console.log(_this.data.shoukuan_list)
    var id = _this.data.shoukuan_list[index].id
    wx.navigateTo({ 
      url: '../caigou_fukuanAdd/caigou_fukuanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + "&shouzhi_type=收入记录",
    })
  },

  goto_kaipiao_xiangqing(e){
    var _this = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    console.log(_this.data.kaipiao_list)
    var id = _this.data.kaipiao_list[index].id
    wx.navigateTo({ 
      url: '../xiaoshou_kaipiaoAdd/xiaoshou_kaipiaoAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
    })
  },

  goto_caigou_xiangqing(e){
    var _this = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    console.log(_this.data.caigou_list)
    var id = _this.data.caigou_list[index].id
    wx.navigateTo({
      url: '../caigou_dingdan_xiangqing/caigou_dingdan_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
    })
  },

  shoukuan_add:function(){
    var _this = this
    var id = _this.data.id
    var type = '收订金'
    var list = _this.data.list
    if(list[0].shenhe_zhuangtai != '审核通过'){
      wx.showToast({
        title: '审核未通过不允许继续操作！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var sql = "select isnull(sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))),0) as dingjin from shouzhi_mingxi where danju_bianhao = '" + _this.data.list[0].bianhao + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var dingjin = res.result.recordsets[0][0].dingjin
        console.log(dingjin)
        if(dingjin >= _this.data.p_heji){
          wx.showToast({
            title: '此订单订金与订单价税合计相同',
            icon:'none'
          })
          return;
        }
        var yukuan = Math.round((_this.data.p_heji - dingjin) * 100) / 100
        wx.navigateTo({
          url: '../caigou_fukuanAdd/caigou_fukuanAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + '&xiaoshou_id=' + id + '&shouzhi_type=收入记录' + "&shoufu_type=收订金&yukuan=" + yukuan,
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

  kaipiao_add:function(){
    var _this = this
    var id = _this.data.id
    var bianhao = _this.data.list[0].bianhao
    var list = _this.data.list
    if(list[0].shenhe_zhuangtai != '审核通过'){
      wx.showToast({
        title: '审核未通过不允许继续操作！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var sql = "select id,bianhao,riqi,kehu,dianpu,cangku,beizhu,xiaoshou_id,chuku_danwei,yewuyuan,jiashui_xiaoji,chuku_id,isnull(xiaoshou_bianhao,'') as xiaoshou_bianhao,isnull(jiashui_heji,0) as jiashui_heji,jiashui_xiaoji-isnull(jiashui_heji,0) as weikai,jiashui_xiaoji-isnull(jiashui_heji,0) as this_kai,'false' as checked from (select * from xiaoshou_chuku as chuku left join (select sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji,chuku_id from xiaoshou_chuku_item group by chuku_id) as item on chuku.id = item.chuku_id) as chuku left join (select xiaoshou_bianhao,sum(convert(float,isnull(jiashui_heji,0))) as jiashui_heji from xiaoshou_kaipiao group by xiaoshou_bianhao) as kaipiao on chuku.bianhao = kaipiao.xiaoshou_bianhao where jiashui_xiaoji-isnull(jiashui_heji,0) > 0 and xiaoshou_id = '" + bianhao + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        var xukai_list = res.result.recordsets[0]
        for(var i=0; i<xukai_list.length; i++){
          xukai_list[i].jiashui_xiaoji = Math.round(xukai_list[i].jiashui_xiaoji * 100) / 100
          xukai_list[i].weikai = Math.round(xukai_list[i].weikai * 100) / 100
          xukai_list[i].this_kai = Math.round(xukai_list[i].this_kai * 100) / 100
          xukai_list[i].checked = false
        } 
        console.log(xukai_list)
        if(xukai_list.length > 0){
          _this.setData({
            xukai_list,
            kaipiao_show:true,
          })
        }else{
          wx.showToast({
            title: '此订单下所有出库单已全部开票',
            icon: 'none'
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

  back:function(){
    var _this = this
    wx.navigateBack({
      delta: 1
    })
  },

  kaipiao_close:function(){
    var _this = this
    _this.setData({ 
      kaipiao_show:false
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
    _this.tableShow()
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

function delCloudFile(fileId){
  var fileIds = [];
  fileIds.push(fileId);
  wx.cloud.deleteFile({
    fileList: fileIds,
    success: res => {
      console.log(res.fileList);
    },
    fail : console.error
  })
}