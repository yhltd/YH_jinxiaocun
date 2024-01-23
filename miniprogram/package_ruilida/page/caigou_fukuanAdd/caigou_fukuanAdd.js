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
    xiaoshou_show: false,
    product_show: false,
    ssqShow: false,
    xlShow2: false,
    shouzhi_body: {
      id:'',
      dianpu:'',
      danju_leixing:'',
      danju_bianhao:'',
      danju_bianhao:'',
      shouzhi_riqi:'',
      jizhangren:'',
      jizhang_type:'',
      jizhang_zhanghu:'',
      jizhang_jine:'',
      kedi_shuie:'',
      zhaiyao:'',
      jizhang_danwei:'',
    },
    lianxi_list:[
      {
        id:'',
        mingxi_type:'',
        yongtu:'',
        jizhang_jine:'',
        kedi_shuie:'',
      }
    ],
    danju_leixing_list:[
      {name: '采购订单'},
      {name: '采购入库'},
      {name: '日常开支'},
      {name: '销售订单'},
      {name: '销售出库'},
    ],
    type:'',
    name:'',
    hexiao_danju_list:[
      {name:'重选'},
      {name:'查看'}
    ],
    kehu:'',
    gongyingshang:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    console.log(areaList.list)
    var userInfo = JSON.parse(options.userInfo)
    var shouzhi_type = options.shouzhi_type
    var danju_leixing_list = [
      {name: '采购订单'},
      {name: '采购入库'},
      {name: '日常开支'},
      {name: '销售订单'},
      {name: '销售出库'},
    ]
    if(shouzhi_type == '支出记录'){
      danju_leixing_list = [
        {name: '采购订单'},
        {name: '采购入库'},
        {name: '日常开支'},
      ]
    }else if(shouzhi_type == '收入记录'){
      danju_leixing_list = [
        {name: '销售订单'},
        {name: '销售出库'},
        {name: '日常开支'},
      ]
    }
    _this.setData({
      userInfo,
      areaList: areaList.list,
      shouzhi_type,
      danju_leixing_list,
    })
    var id = options.id
    var xiaoshou_id = options.xiaoshou_id
    var chuku_id = options.chuku_id
    var caigou_id = options.caigou_id
    var ruku_id = options.ruku_id
    var shoufu_type = options.shoufu_type
    _this.setData({
      xiaoshou_id,
      chuku_id,
      caigou_id, 
      ruku_id,
      id
    })
    var sql = "select * from peizhi where type = '店铺';select * from userInfo;select * from peizhi where type = '记账分类';select * from peizhi where type = '收款账户';select * from peizhi where type = '记账明细类型';select * from gongyingshang;select * from customer;select * from peizhi where type = '核算单位';select * from jizhang_mingxi where id=4"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var dianpu_list = res.result.recordsets[0]
        var jizhangren_list = res.result.recordsets[1]
        var jizhang_type_list = res.result.recordsets[2]
        var jizhang_zhanghu_list = res.result.recordsets[3]
        var mingxi_type_list = res.result.recordsets[4]
        var gongyingshang_list = res.result.recordsets[5]
        var kehu_list = res.result.recordsets[6]
        var jizhang_danwei_list = res.result.recordsets[7]
        var shoufu_type = res.result.recordsets[8][0]
        var shoufu_type_arr = shoufu_type.jizhang_mingxi.split("\n")
        var shoufu_type_list = []
        for(var i=0; i<shoufu_type_arr.length; i++){
          shoufu_type_list.push({name:shoufu_type_arr[i]})
        }
        _this.setData({
          dianpu_list,
          jizhangren_list,
          jizhang_type_list,
          jizhang_zhanghu_list,
          mingxi_type_list,
          gongyingshang_list,
          kehu_list,
          jizhang_danwei_list,
          shoufu_type_list
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
      var sql = "select * from shouzhi_mingxi where id=" + id + ";select * from shouzhi_mingxi_item where shouzhi_id = '" + id + "'"
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var shouzhi_body = res.result.recordsets[0][0]
          var lianxi_list = res.result.recordsets[1]
          _this.setData({
            id,
            shouzhi_body,
          })
          _this.setData({
            lianxi_list,
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
      var sql = "select convert(float,SUBSTRING(isnull(max(shouzhi_bianhao),'SZ000000'),3,6)) + 1 as bianhao from shouzhi_mingxi;select * from peizhi where type = '店铺';select * from peizhi where type = '核算单位'"
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
          this_bianhao = "SZ" + this_bianhao
          console.log(this_bianhao)
          var shouzhi_body = _this.data.shouzhi_body
          shouzhi_body.shouzhi_bianhao = this_bianhao
          shouzhi_body.shouzhi_riqi = getNowDate()
          var dianpu_list = res.result.recordsets[1]
          var hesuan_danwei_list = res.result.recordsets[2]
          if(_this.data.userInfo.dianpu != ''){
            for(var i=0; i<dianpu_list.length; i++){
              if(dianpu_list[i].id == _this.data.userInfo.dianpu){
                shouzhi_body.dianpu = dianpu_list[i].name
                break;
              }
            }
          }
          if(_this.data.userInfo.hesuan_danwei != ''){
            for(var i=0; i<hesuan_danwei_list.length; i++){
              if(hesuan_danwei_list[i].id == _this.data.userInfo.hesuan_danwei){
                shouzhi_body.jizhang_danwei = hesuan_danwei_list[i].name
                break;
              }
            }
          }
          shouzhi_body.jizhangren = _this.data.userInfo.name
          _this.setData({
            shouzhi_body
          })

          var xiaoshou_id = options.xiaoshou_id
          var chuku_id = options.chuku_id
          var caigou_id = options.caigou_id
          var ruku_id = options.ruku_id
          var shoufu_type = options.shoufu_type
          var yukuan = options.yukuan
          shouzhi_body.shoufu_type = shoufu_type
          
          //销售id不为空，说明从销售订单详情跳转，收订金
          if(xiaoshou_id != undefined){ 
            shouzhi_body.danju_leixing = '销售订单'
            var sql = "select * from xiaoshou_dingdan where id=" + xiaoshou_id
            wx.cloud.callFunction({
              name: 'sqlserver_ruilida',
              data: {
                query: sql
              },
              success: res => {
                console.log(res)
                var bianhao = res.result.recordsets[0][0].bianhao
                shouzhi_body.danju_bianhao = bianhao
                shouzhi_body.dianpu = res.result.recordsets[0][0].dianpu
                shouzhi_body.jizhang_danwei = res.result.recordsets[0][0].xiaoshou_danwei
                shouzhi_body.jizhang_type = "销售收入"
                shouzhi_body.shoufu_type = "收订金"
                _this.setData({
                  shouzhi_body,
                  xiaoshou_id,
                  yukuan,
                  lianxi_list:[],
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
          }else if(chuku_id != undefined){
            shouzhi_body.danju_leixing = '销售出库'
            console.log(chuku_id)
            var sql = "select id,bianhao,riqi,kehu,dianpu,chuku_danwei,jiashui_xiaoji,isnull(yifu,0) as yifu,round(isnull(jiashui_xiaoji,0)-isnull(yifu,0),2) as weifu,0 as fukuan,1 as isselect from (select id,bianhao,riqi,kehu,dianpu,chuku_danwei,jiashui_xiaoji from xiaoshou_chuku as chuku left join(select chuku_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from xiaoshou_chuku_item group by chuku_id) as chuku_money on chuku.id = chuku_money.chuku_id ) as chuku_dingdan left join(select danju_leixing,danju_bianhao,sum(convert(float,isnull(jizhang_jine,0))) + sum(convert(float,isnull(kedi_shuie,0))) as yifu from shouzhi_mingxi group by danju_leixing,danju_bianhao) as fukuan on chuku_dingdan.bianhao = fukuan.danju_bianhao where id=" + chuku_id
            wx.cloud.callFunction({
              name: 'sqlserver_ruilida',
              data: {
                query: sql
              },
              success: res => {
                console.log(res)
                var bianhao = res.result.recordsets[0][0].bianhao
                shouzhi_body.danju_bianhao = res.result.recordsets[0][0].bianhao
                shouzhi_body.dianpu = res.result.recordsets[0][0].dianpu
                shouzhi_body.jizhang_danwei = res.result.recordsets[0][0].chuku_danwei
                shouzhi_body.jizhang_type = "销售收入"
                shouzhi_body.shoufu_type = "收欠款"
                res.result.recordsets[0][0].fukuan = res.result.recordsets[0][0].weifu
                var lianxi_list2 = [res.result.recordsets[0][0]]
                var p_shoukuan = res.result.recordsets[0][0].fukuan
                shouzhi_body.jizhang_jine = (res.result.recordsets[0][0].fukuan * 1).toFixed(2)
                console.log(lianxi_list2)
                _this.setData({
                  shouzhi_body,
                  chuku_id,
                  yukuan,
                  lianxi_list:[],
                  lianxi_list2,
                  p_shoukuan
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
          }else if(caigou_id != undefined){ 
            shouzhi_body.danju_leixing = '采购订单'
            var sql = "select * from caigou_dingdan where id=" + caigou_id
            wx.cloud.callFunction({
              name: 'sqlserver_ruilida',
              data: {
                query: sql
              },
              success: res => {
                console.log(res)
                var bianhao = res.result.recordsets[0][0].bianhao
                shouzhi_body.danju_bianhao = bianhao
                shouzhi_body.dianpu = res.result.recordsets[0][0].dianpu
                shouzhi_body.jizhang_danwei = res.result.recordsets[0][0].caigou_danwei
                shouzhi_body.jizhang_type = "采购支出"
                shouzhi_body.shoufu_type = "付订金"
                _this.setData({
                  shouzhi_body,
                  caigou_id,
                  yukuan,
                  lianxi_list:[],
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
          }else if(ruku_id != undefined){
            shouzhi_body.danju_leixing = '采购入库'
            console.log(ruku_id)
            var sql = "select id,bianhao,riqi,gongyingshang,dianpu,ruku_danwei,jiashui_xiaoji,isnull(yifu,0) as yifu,round(isnull(jiashui_xiaoji,0)-isnull(yifu,0),2) as weifu,1 as isselect from (select id,bianhao,riqi,gongyingshang,dianpu,ruku_danwei,jiashui_xiaoji from caigou_ruku as ruku left join(select ruku_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from caigou_ruku_item group by ruku_id) as ruku_money on ruku.id = ruku_money.ruku_id) as ruku_dingdan left join(select danju_leixing,danju_bianhao,sum(convert(float,isnull(jizhang_jine,0))) + sum(convert(float,isnull(kedi_shuie,0))) as yifu from shouzhi_mingxi group by danju_leixing,danju_bianhao) as fukuan on ruku_dingdan.bianhao = fukuan.danju_bianhao where round(isnull(jiashui_xiaoji,0)-isnull(yifu,0),2) > 0 and id=" + ruku_id
            wx.cloud.callFunction({
              name: 'sqlserver_ruilida',
              data: {
                query: sql
              },
              success: res => {
                console.log(res)
                var bianhao = res.result.recordsets[0][0].bianhao
                shouzhi_body.danju_bianhao = bianhao 
                shouzhi_body.dianpu = res.result.recordsets[0][0].dianpu
                shouzhi_body.jizhang_danwei = res.result.recordsets[0][0].ruku_danwei
                shouzhi_body.jizhang_type = "采购支出"
                shouzhi_body.shoufu_type = "付欠款"
                res.result.recordsets[0][0].fukuan = res.result.recordsets[0][0].weifu
                var lianxi_list2 = [res.result.recordsets[0][0]]
                var p_shoukuan = res.result.recordsets[0][0].fukuan
                shouzhi_body.jizhang_jine = (res.result.recordsets[0][0].fukuan * 1).toFixed(2)
                console.log(lianxi_list2)
                _this.setData({
                  shouzhi_body,
                  ruku_id,
                  yukuan,
                  lianxi_list:[],
                  lianxi_list2,
                  p_shoukuan
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
            shouzhi_body.danju_leixing = '日常开支'
            shouzhi_body.jizhang_type = '日常开支'
            _this.setData({
              shouzhi_body
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
    }
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

  jiage_head_refresh(e){
    var _this = this
    console.log(e)
    var new_val = e.detail.value * 1
    var list = _this.data.shouzhi_body
    var column = e.currentTarget.dataset.column
    list[column] = new_val.toFixed(2)
    _this.setData({
      shouzhi_body:list
    })
  },

  danju_click:function(){
    var _this = this
    var shouzhi_body = _this.data.shouzhi_body 
    var danju_leixing = shouzhi_body.danju_leixing
    var dianpu = shouzhi_body.dianpu
    var jizhang_danwei = shouzhi_body.jizhang_danwei
    if(danju_leixing == ''){
      wx.showToast({
        title: '请先选择单据类型',
        icon: 'none'
      })
      return;
    }
    if(danju_leixing == '日常开支'){
      wx.showToast({
        title: '日常开支无需选择单据',
        icon: 'none'
      })
    }
    if(dianpu == ''){
      wx.showToast({
        title: '请先选择店铺',
        icon: 'none'
      })
      return;
    }
    if(jizhang_danwei == ''){
      wx.showToast({
        title: '请先选择记账单位',
        icon: 'none'
      })
      return;
    }
    // if(_this.data.xiaoshou_id != undefined || _this.data.chuku_id != undefined || _this.data.caigou_id != undefined || _this.data.ruku_id != undefined){
    //   return;
    // }
    if(danju_leixing == '采购订单'){
      _this.caigou_click()
    }else if(danju_leixing == '采购入库'){
      _this.ruku_click()
    }else if(danju_leixing == '销售订单'){
      _this.xiaoshou_click()
    }else if(danju_leixing == '销售出库'){
      _this.chuku_click()
    }
  },

  caigou_click:function(){
    var _this = this
    var sql = "select id,bianhao,riqi,gongyingshang,dianpu,caigou_danwei,isnull(jiashui_xiaoji,0) as jiashui_xiaoji,isnull(yifu,0) as yifu,round(isnull(jiashui_xiaoji,0)-isnull(yifu,0),2) as weifu,1 as isselect from (select id,bianhao,riqi,gongyingshang,dianpu,jiashui_xiaoji,caigou_danwei from caigou_dingdan as caigou left join(select caigou_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from caigou_dingdan_item group by caigou_id) as caigou_money on caigou.id = caigou_money.caigou_id) as caigou_dingdan left join (select danju_leixing,danju_bianhao,sum(convert(float,isnull(jizhang_jine,0))) + sum(convert(float,isnull(kedi_shuie,0))) as yifu from shouzhi_mingxi group by danju_leixing,danju_bianhao) as fukuan on caigou_dingdan.bianhao = fukuan.danju_bianhao where round(isnull(jiashui_xiaoji,0)-isnull(yifu,0),2) > 0 and dianpu ='" + _this.data.shouzhi_body.dianpu + "' and caigou_danwei='" + _this.data.shouzhi_body.jizhang_danwei + "'"
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

  xiaoshou_click:function(){
    var _this = this
    var sql = "select id,bianhao,riqi,kehu,dianpu,xiaoshou_danwei,isnull(jiashui_xiaoji,0) as jiashui_xiaoji,isnull(yifu,0) as yifu,round(isnull(jiashui_xiaoji,0)-isnull(yifu,0),2) as weifu,1 as isselect from(select id,bianhao,riqi,kehu,dianpu,jiashui_xiaoji,xiaoshou_danwei from xiaoshou_dingdan as xiaoshou left join (select xiaoshou_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from xiaoshou_dingdan_item group by xiaoshou_id) as xiaoshou_money on xiaoshou.id = xiaoshou_money.xiaoshou_id) as xiaoshou_dingdan left join (select danju_leixing,danju_bianhao,sum(convert(float,isnull(jizhang_jine,0))) + sum(convert(float,isnull(kedi_shuie,0))) as yifu from shouzhi_mingxi group by danju_leixing,danju_bianhao) as fukuan on xiaoshou_dingdan.bianhao = fukuan.danju_bianhao where round(isnull(jiashui_xiaoji,0)-isnull(yifu,0),2) > 0 and dianpu ='" + _this.data.shouzhi_body.dianpu + "' and xiaoshou_danwei='" + _this.data.shouzhi_body.jizhang_danwei + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          xiaoshou_list: list,
          xiaoshou_show: true,
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

  ruku_click:function(){
    var _this = this
    var sql = "select id,caigou_id,bianhao,riqi,gongyingshang,dianpu,ruku_danwei,jiashui_xiaoji,yifu,weifu,fukuan,isselect,isnull(dingjin_yu,0) as dingjin_yu from (select id,caigou_id,bianhao,riqi,gongyingshang,dianpu,ruku_danwei,jiashui_xiaoji,isnull(yifu,0) + convert(float,dingjin_use) as yifu,round(isnull(jiashui_xiaoji,0)-(isnull(yifu,0) + convert(float,dingjin_use)),2) as weifu,0 as fukuan,1 as isselect from (select id,caigou_id,bianhao,riqi,gongyingshang,dianpu,ruku_danwei,jiashui_xiaoji,isnull(dingjin_use,0) as dingjin_use from caigou_ruku as ruku left join(select ruku_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from caigou_ruku_item group by ruku_id) as ruku_money on ruku.id = ruku_money.ruku_id) as ruku_dingdan left join(select danju_leixing,danju_bianhao,sum(convert(float,isnull(jizhang_jine,0))) + sum(convert(float,isnull(kedi_shuie,0))) as yifu from shouzhi_mingxi group by danju_leixing,danju_bianhao) as fukuan on ruku_dingdan.bianhao = fukuan.danju_bianhao) as ruku left join (select danju_bianhao,dingjin,isnull(yiyong,0) as yiyong,convert(float,isnull(dingjin,0)) - convert(float,isnull(yiyong,0)) as dingjin_yu from (select danju_bianhao,isnull(sum(convert(float,isnull(jizhang_jine,0))+convert(float,isnull(kedi_shuie,0))),0) as dingjin from shouzhi_mingxi where danju_leixing = '采购订单' group by danju_bianhao ) as dingjin left join (select caigou_id,isnull(sum(convert(float,isnull(dingjin_use,0))),0) as yiyong from caigou_ruku group by caigou_id) as yiyong on dingjin.danju_bianhao = yiyong.caigou_id) as dingjin on ruku.caigou_id = dingjin.danju_bianhao where weifu > 0 and dianpu ='" + _this.data.shouzhi_body.dianpu + "' and ruku_danwei='" + _this.data.shouzhi_body.jizhang_danwei + "'"
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
          ruku_show: true,
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

  chuku_click:function(){
    var _this = this
    var sql = "select id,xiaoshou_id,bianhao,riqi,kehu,dianpu,chuku_danwei,jiashui_xiaoji,yifu,weifu,fukuan,isselect,isnull(dingjin_yu,0) as dingjin_yu from (select id,xiaoshou_id,bianhao,riqi,kehu,dianpu,chuku_danwei,jiashui_xiaoji,convert(float,isnull(dingjin_use,0)) + convert(float,isnull(yifu,0)) as yifu,round(isnull(jiashui_xiaoji,0)-convert(float,isnull(dingjin_use,0)) + convert(float,isnull(yifu,0)),2) as weifu,0 as fukuan,1 as isselect from (select id,bianhao,riqi,kehu,dianpu,chuku_danwei,jiashui_xiaoji,dingjin_use,xiaoshou_id from xiaoshou_chuku as chuku left join(select chuku_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from xiaoshou_chuku_item group by chuku_id) as chuku_money on chuku.id = chuku_money.chuku_id ) as chuku_dingdan left join(select danju_leixing,danju_bianhao,sum(convert(float,isnull(jizhang_jine,0))) + sum(convert(float,isnull(kedi_shuie,0))) as yifu from shouzhi_mingxi group by danju_leixing,danju_bianhao) as fukuan on chuku_dingdan.bianhao = fukuan.danju_bianhao) as chuku left join (select danju_bianhao,isnull(dingjin,0)-isnull(yiyong,0) as dingjin_yu from (select danju_bianhao,isnull(sum(convert(float,isnull(jizhang_jine,0))+convert(float,isnull(kedi_shuie,0))),0) as dingjin from shouzhi_mingxi where danju_leixing = '销售订单' group by danju_bianhao) as dingjin left join (select xiaoshou_id,isnull(sum(convert(float,isnull(dingjin_use,0))),0) as yiyong from xiaoshou_chuku group by xiaoshou_id) as yiyong on dingjin.danju_bianhao = yiyong.xiaoshou_id) as dingjin on chuku.xiaoshou_id = dingjin.danju_bianhao where weifu > 0 and dianpu ='" + _this.data.shouzhi_body.dianpu + "' and chuku_danwei='" + _this.data.shouzhi_body.jizhang_danwei + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          xiaoshou_list: list,
          chuku_show: true,
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
    _this.setData({
      caigou_list
    })
  },

  sel_xiaoshou:function(){
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    var kehu = _this.data.kehu
    var xiaoshou_list = _this.data.xiaoshou_list
    if(start_date == ''){
      start_date = "1900-01-01"
    }
    if(stop_date == ''){
      stop_date = "2100-12-31"
    }
    for(var i=0; i<xiaoshou_list.length; i++){
      var panduan = true
      if(!(xiaoshou_list[i].riqi >= start_date && xiaoshou_list[i].riqi <= stop_date)){
        panduan = false
      }
      if(gongyingshang != ''){
        if(xiaoshou_list[i].kehu.indexOf(kehu) == -1){
          panduan = false
        }
      }
      if(panduan){
        xiaoshou_list[i].isselect = 1
      }else{
        xiaoshou_list[i].isselect = 0
      }
    }
    _this.setData({
      xiaoshou_list
    })
  },

  sure_xiaoshou:function(){
    var _this = this
    var xiaoshou_list = _this.data.xiaoshou_list
    var list = []
    var p_shoukuan = 0
    var shouzhi_body = _this.data.shouzhi_body
    for(var i=0; i<xiaoshou_list.length; i++){
      if(xiaoshou_list[i].fukuan * 1 > 0){
        list.push(xiaoshou_list[i])
        p_shoukuan = p_shoukuan + xiaoshou_list[i].fukuan * 1
      }
    }
    shouzhi_body.jizhang_jine = (p_shoukuan * 1).toFixed(2)
    _this.setData({
      p_shoukuan,
      lianxi_list2:list,
      chuku_show:false,
    })
  },

  sure_caigou:function(){
    var _this = this
    var caigou_list = _this.data.caigou_list
    var list = []
    var p_shoukuan = 0
    var shouzhi_body = _this.data.shouzhi_body
    for(var i=0; i<caigou_list.length; i++){
      if(caigou_list[i].fukuan * 1 > 0){
        list.push(caigou_list[i])
        p_shoukuan = p_shoukuan + caigou_list[i].fukuan * 1
      }
    }
    shouzhi_body.jizhang_jine = (p_shoukuan * 1).toFixed(2)
    _this.setData({
      p_shoukuan, 
      lianxi_list2:list,
      ruku_show:false,
    })
  },

  caigou_select:function(e){
    var _this = this
    console.log(e)
    var this_index = e.currentTarget.dataset.index
    var caigou_list = _this.data.caigou_list[this_index]
    var shouzhi_body = _this.data.shouzhi_body
    shouzhi_body.danju_bianhao = caigou_list.bianhao
    shouzhi_body.jizhang_danwei = caigou_list.caigou_danwei
    var yukuan = caigou_list.weifu
    _this.setData({
      shouzhi_body,
      yukuan
    })
    _this.qxShow()
  },

  xiaoshou_select:function(e){
    var _this = this
    console.log(e)
    var this_index = e.currentTarget.dataset.index
    var xiaoshou_list = _this.data.xiaoshou_list[this_index]
    var shouzhi_body = _this.data.shouzhi_body
    shouzhi_body.danju_bianhao = xiaoshou_list.bianhao
    shouzhi_body.jizhang_danwei = xiaoshou_list.xiaoshou_danwei
    var yukuan = xiaoshou_list.weifu
    _this.setData({
      shouzhi_body,
      yukuan
    })
    _this.qxShow()
  },

  qxShow:function(){
    var _this = this
    _this.setData({
      xlShow2:false,
      ssqShow:false,
      product_show:false,
      caigou_show:false,
      xiaoshou_show:false,
      chuku_show:false,
      ruku_show:false,
    })
  },

  choiceDate: function (e) {
    var _this = this
    //e.preventDefault(); 
    var column_name = e.target.dataset.column_name
    if(column_name == 'shouzhi_riqi'){
      var shouzhi_body = _this.data.shouzhi_body
      shouzhi_body.shouzhi_riqi = e.detail.value
      _this.setData({
        shouzhi_body
      })
    }
    console.log(e.detail.value)
  },

  add_lianxiren:function(){
    var _this = this
    console.log(_this.data.lianxi_list)
    wx.showModal({
      title: '提示',
      content: '确认增加一条明细信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var list = _this.data.lianxi_list
          list.push({
            id:'',
            mingxi_type:'',
            yongtu:'',
            jizhang_jine:'',
            kedi_shuie:'',
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
      content: '确认删除第'+ (index*1 + 1) +'条明细信息？',
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
    var shouzhi_body = _this.data.shouzhi_body
    var lianxi_list = _this.data.lianxi_list
    console.log(shouzhi_body)
    console.log(lianxi_list)
    if(shouzhi_body.dianpu == ''){
      wx.showToast({
        title: '请选择店铺',
        icon: 'none'
      })
      return;
    }
    if(shouzhi_body.danju_leixing == ''){
      wx.showToast({
        title: '请选择单据类型',
        icon: 'none'
      })
      return;
    }
    if(shouzhi_body.danju_leixing != '日常开支' && shouzhi_body.danju_bianhao == ''){
      wx.showToast({
        title: '请选择单据编号',
        icon: 'none'
      })
      return;
    }
    if(shouzhi_body.shouzhi_riqi == ''){
      wx.showToast({
        title: '请选择记账日期',
        icon: 'none'
      })
      return;
    }

    if(shouzhi_body.jizhangren == ''){
      wx.showToast({
        title: '请选择记账人',
        icon: 'none'
      })
      return;
    }

    if(shouzhi_body.zhaiyao == ''){
      wx.showToast({
        title: '请填写摘要',
        icon: 'none'
      })
      return;
    }
    var money_sum = 0
    console.log(lianxi_list)
    for(var i=0; i<lianxi_list.length; i++){
      if(lianxi_list[i].mingxi_type == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条明细未选择明细类型',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].yongtu == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条明细未填写用途',
          icon: 'none'
        })
        return;
      }
      if(lianxi_list[i].jizhang_jine == ''){
        wx.showToast({
          title: '第' + (i * 1+1) + '条明细未填写记账金额',
          icon: 'none'
        })
        return;
      }
      money_sum = Math.round((shouzhi_body.jizhang_jine * 1) * 100) / 100
    }

    if(shouzhi_body.id == ''){
      wx.showLoading({
        title:'保存中'
      })

      if(_this.data.yukuan != undefined){
        if(money_sum > _this.data.yukuan){
          wx.showToast({
            title: '收付金额不能超过订单总额',
          })
          return;
        }
      }
      var lianxi_list2 = _this.data.lianxi_list2
      var sql = ""
      if(lianxi_list2 == undefined){
        sql = "insert into shouzhi_mingxi(dianpu,danju_leixing,danju_bianhao,shouzhi_bianhao,shouzhi_riqi,jizhangren,jizhang_type,jizhang_zhanghu,jizhang_jine,kedi_shuie,zhaiyao,shouzhi_type,jizhang_danwei,shoufu_type) output inserted.id values('" + shouzhi_body.dianpu + "','" + shouzhi_body.danju_leixing + "','" + shouzhi_body.danju_bianhao + "','" + shouzhi_body.shouzhi_bianhao + "','" + shouzhi_body.shouzhi_riqi + "','" + shouzhi_body.jizhangren + "','" + shouzhi_body.jizhang_type + "','" + shouzhi_body.jizhang_zhanghu + "','" + shouzhi_body.jizhang_jine + "','" + shouzhi_body.kedi_shuie + "','" + shouzhi_body.zhaiyao + "','" + _this.data.shouzhi_type.replace("记录",'') + "','" + shouzhi_body.jizhang_danwei + "','" + shouzhi_body.shoufu_type  + "')"
      }else{
        for(var i=0; i<lianxi_list2.length; i++){
          if(i == 0){
            sql = sql + "insert into shouzhi_mingxi(dianpu,danju_leixing,danju_bianhao,shouzhi_bianhao,shouzhi_riqi,jizhangren,jizhang_type,jizhang_zhanghu,jizhang_jine,kedi_shuie,zhaiyao,shouzhi_type,jizhang_danwei,shoufu_type) output inserted.id values('" + shouzhi_body.dianpu + "','" + shouzhi_body.danju_leixing + "','" + lianxi_list2[i].bianhao + "','" + shouzhi_body.shouzhi_bianhao + "','" + shouzhi_body.shouzhi_riqi + "','" + shouzhi_body.jizhangren + "','" + shouzhi_body.jizhang_type + "','" + shouzhi_body.jizhang_zhanghu + "','" + lianxi_list2[i].fukuan + "','" + shouzhi_body.kedi_shuie + "','" + shouzhi_body.zhaiyao + "','" + _this.data.shouzhi_type.replace("记录",'') + "','" + shouzhi_body.jizhang_danwei + "','" + shouzhi_body.shoufu_type  + "');"
          }else{
            sql = sql + "insert into shouzhi_mingxi(dianpu,danju_leixing,danju_bianhao,shouzhi_bianhao,shouzhi_riqi,jizhangren,jizhang_type,jizhang_zhanghu,jizhang_jine,kedi_shuie,zhaiyao,shouzhi_type,jizhang_danwei,shoufu_type) output inserted.id values('" + shouzhi_body.dianpu + "','" + shouzhi_body.danju_leixing + "','" + lianxi_list2[i].bianhao + "','" + shouzhi_body.shouzhi_bianhao + "-" + (i*1) + "','" + shouzhi_body.shouzhi_riqi + "','" + shouzhi_body.jizhangren + "','" + shouzhi_body.jizhang_type + "','" + shouzhi_body.jizhang_zhanghu + "','" + lianxi_list2[i].fukuan + "','" + shouzhi_body.kedi_shuie + "','" + shouzhi_body.zhaiyao + "','" + _this.data.shouzhi_type.replace("记录",'') + "','" + shouzhi_body.jizhang_danwei + "','" + shouzhi_body.shoufu_type  + "');"
          }
        }
      }
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = res.result.recordset[0].id
          shouzhi_body.id = new_id
          _this.setData({
            shouzhi_body
          })
          var sql = "insert into shouzhi_mingxi_item(mingxi_type,yongtu,jizhang_jine,kedi_shuie,shouzhi_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].mingxi_type + "','" + lianxi_list[i].yongtu + "','" + lianxi_list[i].jizhang_jine + "','" + lianxi_list[i].kedi_shuie + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].mingxi_type + "','" + lianxi_list[i].yongtu + "','" + lianxi_list[i].jizhang_jine + "','" + lianxi_list[i].kedi_shuie + "','" + new_id + "')"
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
      console.log(shouzhi_body)
      wx.showLoading({
        title:'保存中'
      })
      var sql = "update shouzhi_mingxi set dianpu='" + shouzhi_body.dianpu + "',danju_leixing='" + shouzhi_body.danju_leixing + "',danju_bianhao='" + shouzhi_body.danju_bianhao + "',shouzhi_bianhao='" + shouzhi_body.shouzhi_bianhao + "',shouzhi_riqi='" + shouzhi_body.shouzhi_riqi + "',jizhangren='" + shouzhi_body.jizhangren + "',jizhang_type='" + shouzhi_body.jizhang_type + "',jizhang_zhanghu='" + shouzhi_body.jizhang_zhanghu + "',jizhang_jine='" + shouzhi_body.jizhang_jine + "',kedi_shuie='" + shouzhi_body.kedi_shuie + "',zhaiyao='" + shouzhi_body.zhaiyao + "',jizhang_danwei='" + shouzhi_body.jizhang_danwei + "' where id=" + shouzhi_body.id
      console.log(shouzhi_body)
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var new_id = shouzhi_body.id
          var sql = "delete from shouzhi_mingxi_item where shouzhi_id='" + new_id + "';insert into shouzhi_mingxi_item(mingxi_type,yongtu,jizhang_jine,kedi_shuie,shouzhi_id) values "
          var sql2 = ""
          for(var i=0; i<lianxi_list.length; i++){
            if(sql2 == ""){
              sql2 = "('" + lianxi_list[i].mingxi_type + "','" + lianxi_list[i].yongtu + "','" + lianxi_list[i].jizhang_jine + "','" + lianxi_list[i].kedi_shuie + "','" + new_id + "')"
            }else{
              sql2 = sql2 + ",('" + lianxi_list[i].mingxi_type + "','" + lianxi_list[i].yongtu + "','" + lianxi_list[i].jizhang_jine + "','" + lianxi_list[i].kedi_shuie + "','" + new_id + "')"
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
    console.log(_this.data.shouzhi_body)
    console.log(_this.data.lianxi_list)
    if(index == undefined){
      var shouzhi_body = _this.data.shouzhi_body
      shouzhi_body[column] = new_value
      _this.setData({
        shouzhi_body
      })
    }else{
      var lianxi_list = _this.data.lianxi_list
      lianxi_list[index][column] = new_value
      if(column == 'jizhang_jine'){
        var jizhang_jine = 0.00
        for(var i=0; i<lianxi_list.length; i++){
          if(lianxi_list[i].jizhang_jine != ''){
            jizhang_jine = ((jizhang_jine*1) + (lianxi_list[i].jizhang_jine*1)).toFixed(2)
          }
        }
        var shouzhi_body = _this.data.shouzhi_body
        shouzhi_body.jizhang_jine = (jizhang_jine * 1).toFixed(2)
        _this.setData({
          shouzhi_body
        })
      }
      if(column == 'kedi_shuie'){
        var kedi_shuie = 0.00
        for(var i=0; i<lianxi_list.length; i++){
          if(lianxi_list[i].kedi_shuie != ''){
            kedi_shuie = ((kedi_shuie*1) + (lianxi_list[i].kedi_shuie*1)).toFixed(2)
          }
        }
        var shouzhi_body = _this.data.shouzhi_body
        shouzhi_body.kedi_shuie = (kedi_shuie * 1).toFixed(2)
        _this.setData({
          shouzhi_body
        })
      }
      _this.setData({
        lianxi_list
      })
    }
  },

  onInput2(e){
    console.log(e)
    var _this = this
    var new_value = e.detail
    var list = _this.data.xiaoshou_list
    var index = e.currentTarget.dataset.index
    var weifu = list[index].weifu
    if(weifu * 1 < new_value * 1){
      new_value = weifu * 1
    }
    list[index].fukuan = new_value
    _this.setData({
      xiaoshou_list: list
    })
  },

  onInput3(e){
    console.log(e)
    var _this = this
    var new_value = e.detail
    var list = _this.data.caigou_list
    var index = e.currentTarget.dataset.index
    var weifu = list[index].weifu
    if(weifu * 1 < new_value * 1){
      new_value = weifu * 1
    }
    list[index].fukuan = new_value
    _this.setData({
      caigou_list: list
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
    if(column == 'shoufu_type' && _this.data.shouzhi_body.jizhang_type !='日常开支'){
      return;
    }  
    if(column == 'danju_leixing' || column == 'danju_bianhao'){
      if(_this.data.xiaoshou_id != undefined || _this.data.chuku_id != undefined || _this.data.caigou_id != undefined || _this.data.ruku_id != undefined){
        return;
      }
    }

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

  sousuo_xiala(e){
    var _this = this
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    var tiaojian = _this.data[column]
    var new_list = []
    for(var i=0; i<list.length; i++){
      var panduan = true
      if(tiaojian != ''){
        if(list[i].name.indexOf(tiaojian) == -1){
          panduan = false
        }
      }
      if(panduan){
        new_list.push(list[i])
      }
    }
    _this.setData({
      list_xiala: new_list,
      click_column:column,
      click_index: undefined
    })
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
      var shouzhi_body = _this.data.shouzhi_body
      var lianxi_list = _this.data.lianxi_list
      if(click_column == 'hexiao_danju'){
        if(new_val == '重选'){
          if(_this.data.chuku_id != undefined){
            _this.chuku_click()
          }else if(_this.data.ruku_id != undefined){
            _this.ruku_click()
          }
        }else if(new_val == '查看'){
          if(_this.data.chuku_id != undefined){
            var list = _this.data.lianxi_list2
            console.log(list)
            _this.setData({
              xiaoshou_list: list,
              chuku_show: true,
              start_date: '',
              stop_date: '',
              kehu: '',
            })
          }else if(_this.data.ruku_id != undefined){
            var list = _this.data.lianxi_list2
            console.log(list)
            _this.setData({
              caigou_list: list,
              ruku_show: true,
              start_date: '',
              stop_date: '',
              kehu: '',
            })
          }
        }
      }else if(click_index == undefined){
        shouzhi_body[click_column] = new_val
        _this.setData({
          xlShow2: false,
          shouzhi_body,
        })
        if(click_column == 'danju_leixing' && new_val == '日常开支'){
          shouzhi_body.danju_bianhao = ''
          _this.setData({
            xlShow2: false,
            shouzhi_body,
          })
        }
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
    var type = "收支记录"
    var id = _this.data.shouzhi_body.id
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
    console.log(_this.data.shouzhi_type)
    wx.setNavigationBarTitle({title: _this.data.shouzhi_type});
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