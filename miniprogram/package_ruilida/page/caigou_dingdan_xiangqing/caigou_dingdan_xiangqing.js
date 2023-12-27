// package_ruilida/page/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kaipiao_show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var id = options.id
    const systemInfo = wx.getSystemInfoSync();
    var scoll_height = systemInfo.windowHeight * 0.63
    _this.setData({
      userInfo,
      id,
      scoll_height
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

  onChange:function(e){
    var _this = this
    console.log(e)
    var list = _this.data.xukai_list
    console.log(list)
    if(list[0].checked == false){
      list[0].checked = true
    }else{
      list[0].checked = false
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
        url: '../caigou_shoupiaoAdd/caigou_shoupiaoAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + '&shoupiao_list=' + JSON.stringify(benci_list) + "&gongyingshang_name=" + _this.data.list[0].gongyingshang,
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
    wx.navigateTo({
      url: '../caigou_dingdanAdd/caigou_dingdanAdd?userInfo=' + JSON.stringify(userInfo) + '&product_list=' + JSON.stringify(product_list) + '&xiaoshou_id=' + _this.data.list[0].bianhao,
    })
  },

  tableShow: function (e) {
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.caigou_dingdan_sel != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    var id = _this.data.id
    var sql = "select * from (select id,caigou3.bianhao,riqi,gongyingshang,dianpu,jinxiang_shuilv,beizhu,shenhe,shenhe_zhuangtai,ruku_zhuangtai,shoupiao_zhuangtai,fukuan_zhuangtai from (select id,caigou2.bianhao,riqi,gongyingshang,dianpu,jinxiang_shuilv,beizhu,shenhe,shenhe_zhuangtai,ruku_zhuangtai,shoupiao_zhuangtai from (select id,caigou.bianhao,riqi,gongyingshang,dianpu,jinxiang_shuilv,beizhu,shenhe,shenhe_zhuangtai,ruku_zhuangtai from caigou_dingdan as caigou left join (select bianhao,case when sum(panduan) = 0 then '未入库' when sum(panduan) < count(bianhao) then '部分入库' when count(bianhao) <= sum(panduan) then '全部入库' end as ruku_zhuangtai from (select bianhao,caigou.shangpin_bianma,isnull(caigou.shuliang,0) as caigou_shuliang,isnull(ruku.shuliang,0) as ruku_shuliang,case when convert(float,isnull(caigou.shuliang,0)) > convert(float,isnull(ruku.shuliang,0)) then 0 else 1 end as panduan from(select bianhao,shangpin_bianma,shuliang from caigou_dingdan_item as item left join caigou_dingdan as dingdan on item.caigou_id = dingdan.id) as caigou left join (select shangpin_bianma,shuliang,ruku_id,caigou_id from caigou_ruku_item as ruku left join (select * from caigou_ruku where isnull(caigou_id,'') != '') as ruku_dan on ruku.ruku_id = ruku_dan.id where isnull(caigou_id,'') != '') as ruku on caigou.bianhao = ruku.caigou_id and caigou.shangpin_bianma = ruku.shangpin_bianma) as ruku group by bianhao) as ruku on caigou.bianhao = ruku.bianhao) as caigou2 left join (select bianhao,case when isnull(shoupiao_money,0) = 0 then '未收票' when isnull(shoupiao_money,0) < isnull(caigou_money,0) then '部分收票' when isnull(shoupiao_money,0) >= isnull(caigou_money,0) then '全部收票' end as shoupiao_zhuangtai from(select bianhao,sum(convert(float,isnull(jiashui_xiaoji,0))) as caigou_money from caigou_dingdan_item as item left join caigou_dingdan as caigou on caigou.id = item.caigou_id group by bianhao) as caigou left join(select caigou_bianhao,sum(convert(float,isnull(kaipiao_jine,0)) + convert(float,isnull(kaipiao_shuie,0))) as shoupiao_money from caigou_shoupiao group by caigou_bianhao) as shoupiao on caigou.bianhao = shoupiao.caigou_bianhao) as shoupiao on caigou2.bianhao = shoupiao.bianhao) as caigou3 left join (select bianhao,isnull(caigou_money,0) as caigou_money,isnull(money,0) as shoufu_money,case when isnull(money,0)  = 0 then '未付款' when isnull(caigou_money,0) > isnull(money,0)  then '部分付款' when isnull(caigou_money,0) <= isnull(money,0) then '全部付款' end as fukuan_zhuangtai from (select bianhao,sum(convert(float,isnull(jiashui_xiaoji,0))) as caigou_money from caigou_dingdan_item as item left join caigou_dingdan as caigou on caigou.id = item.caigou_id group by bianhao) as caigou left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi group by danju_bianhao) as shoufukuan on caigou.bianhao = shoufukuan.danju_bianhao) as fukuan on caigou3.bianhao = fukuan.bianhao) as caigou where id = " + _this.data.id
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
        var sql = "select dingdan.id,dingdan.shangpin_bianma,dingdan.name,dingdan.guige,dingdan.caizhi,dingdan.jishu_biaozhun,dingdan.zhibao_dengji,dingdan.danwei,dingdan.shuliang,isnull(ruku.shuliang,0) as ruku_shuliang,isnull(dingdan.shuliang,0)-isnull(ruku.shuliang,0) as weichu_shuliang,dingdan.caigou_danjia,dingdan.jiashui_xiaoji from(select * from caigou_dingdan_item where caigou_id = " + id + ") as dingdan left join (select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(convert(float,isnull(shuliang,0))) as shuliang,caigou_danjia,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from (select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,caigou_danjia,jiashui_xiaoji from caigou_ruku left join caigou_ruku_item on caigou_ruku.id = caigou_ruku_item.ruku_id where caigou_id = '" + list[0].bianhao + "') as ruku group by shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,caigou_danjia) as ruku on dingdan.shangpin_bianma = ruku.shangpin_bianma;"

        sql = sql + "select id,riqi,jiashui_xiaoji from caigou_ruku as ruku left join (select ruku_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from caigou_ruku_item group by ruku_id) as item on ruku.id = item.ruku_id where caigou_id = '" + list[0].bianhao + "';"

        sql = sql + "select id,shouzhi_riqi,convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0)) as money from shouzhi_mingxi where danju_leixing = '采购订单' and danju_bianhao = '" + list[0].bianhao + "' union select shouzhi_mingxi.id,shouzhi_riqi,convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0)) as money from shouzhi_mingxi left join xiaoshou_chuku on shouzhi_mingxi.danju_bianhao = xiaoshou_chuku.bianhao where danju_leixing = '采购入库' and xiaoshou_id = '" + list[0].bianhao + "' order by shouzhi_riqi;"

        sql = sql + "select caigou_shoupiao.id,kaipiao_riqi,jiashui_heji from caigou_ruku left join caigou_shoupiao on caigou_ruku.bianhao = caigou_shoupiao.caigou_bianhao where isnull(caigou_shoupiao.id,'') != '' and caigou_id = '" + list[0].bianhao + "';"
        
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
            for(var i=0; i<chuku_list.length; i++){
              chuku_list[i].jiashui_xiaoji = Math.round(chuku_list[i].jiashui_xiaoji * 100) / 100
            }
            var shoukuan_list = res.result.recordsets[2]
            var kaipiao_list = res.result.recordsets[3]
            console.log(product_list)
            console.log(chuku_list)
            console.log(shoukuan_list)
            console.log(kaipiao_list)
            var list = _this.data.list
            list[0].item = product_list
            _this.setData({
              list,
              chuku_list,
              shoukuan_list,
              kaipiao_list,
              p_heji:heji,
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
    console.log(pro_list)
    var add_list = []
    for(var i=0; i<pro_list.length; i++){
      if(pro_list[i].weichu_shuliang > 0){
        add_list.push(pro_list[i])
      }
    }
    if(add_list.length > 0){
      wx.navigateTo({
        url: '../caigou_rukuAdd/caigou_rukuAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + '&caigou_id=' + id,
      })
    }else{
      wx.showToast({
        title: '订单中商品已全部入库',
        icon:'none'
      })
    }
  },

  goto_ruku_xiangqing(e){
    var _this = this
    console.log(e) 
    var index = e.currentTarget.dataset.index
    console.log(_this.data.chuku_list)
    var id = _this.data.chuku_list[index].id
    wx.navigateTo({
      url: '../caigou_ruku_xiangqing/caigou_ruku_xiangqing' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
    })
  },

  goto_fukuan_xiangqing(e){
    var _this = this
    console.log(e) 
    var index = e.currentTarget.dataset.index
    console.log(_this.data.shoukuan_list)
    var id = _this.data.shoukuan_list[index].id
    wx.navigateTo({ 
      url: '../caigou_fukuanAdd/caigou_fukuanAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id + "&shouzhi_type=支出记录", 
    })
  },

  goto_shoupiao_xiangqing(e){
    var _this = this
    console.log(e) 
    var index = e.currentTarget.dataset.index
    console.log(_this.data.kaipiao_list)
    var id = _this.data.kaipiao_list[index].id
    wx.navigateTo({
      url: '../caigou_shoupiaoAdd/caigou_shoupiaoAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
    })
  },

  shoukuan_add:function(){
    var _this = this
    var id = _this.data.id
    var type = '付订金'
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
          url: '../caigou_fukuanAdd/caigou_fukuanAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + '&caigou_id=' + id + '&shouzhi_type=支出记录' + "&shoufu_type=付订金&yukuan=" + yukuan,
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
    var sql = "select id,bianhao,riqi,gongyingshang,dianpu,cangku,beizhu,caigou_id,ruku_danwei,yewuyuan,jiashui_xiaoji,ruku_id,isnull(caigou_bianhao,'') as xiaoshou_bianhao,isnull(jiashui_heji,0) as jiashui_heji,jiashui_xiaoji-isnull(jiashui_heji,0) as weikai,jiashui_xiaoji-isnull(jiashui_heji,0) as this_kai,'false' as checked from (select * from caigou_ruku as ruku left join (select sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji,ruku_id from caigou_ruku_item group by ruku_id) as item on ruku.id = item.ruku_id) as ruku left join (select caigou_bianhao,sum(convert(float,isnull(jiashui_heji,0))) as jiashui_heji from caigou_shoupiao group by caigou_bianhao) as shoupiao on ruku.bianhao = shoupiao.caigou_bianhao where jiashui_xiaoji-isnull(jiashui_heji,0) > 0 and caigou_id = '" + bianhao + "'"
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
            title: '此订单下所有入库单已全部收票',
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