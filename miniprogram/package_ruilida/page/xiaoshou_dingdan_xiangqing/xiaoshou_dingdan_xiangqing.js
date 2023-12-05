// package_ruilida/page/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var id = options.id
    _this.setData({
      userInfo,
      id
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
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
    var sql = "select * from(select id,xiaoshou3.bianhao,riqi,kehu,yewuyuan,shoujianren,shoujian_phone,shoujian_dizhi,dianpu,xiaoxiang_shuilv,beizhu,jiashui_heji,jiage_dengji,shenhe,shenhe_zhuangtai,chuku_zhuangtai,kaipiao_zhuangtai,shoukuan_zhuangtai from(select id,xiaoshou2.bianhao,riqi,kehu,yewuyuan,shoujianren,shoujian_phone,shoujian_dizhi,dianpu,xiaoxiang_shuilv,beizhu,jiashui_heji,jiage_dengji,shenhe,shenhe_zhuangtai,chuku_zhuangtai,kaipiao_zhuangtai from (select id,xiaoshou.bianhao,riqi,kehu,yewuyuan,shoujianren,shoujian_phone,shoujian_dizhi,dianpu,xiaoxiang_shuilv,beizhu,jiashui_heji,jiage_dengji,shenhe,shenhe_zhuangtai,chuku_zhuangtai from xiaoshou_dingdan as xiaoshou left join (select bianhao,case when sum(panduan) = 0 then '未出库' when sum(panduan) < count(bianhao) then '部分出库' when count(bianhao) <= sum(panduan) then '全部出库' end as chuku_zhuangtai from (select bianhao,xiaoshou.shangpin_bianhao,isnull(xiaoshou.shuliang,0) as xiaoshou_shuliang,isnull(chuku.shuliang,0) as chuku_shuliang,case when convert(float,isnull(xiaoshou.shuliang,0)) > convert(float,isnull(chuku.shuliang,0)) then 0 else 1 end as panduan from (select bianhao,shangpin_bianhao,shuliang from xiaoshou_dingdan_item as item left join xiaoshou_dingdan as dingdan on item.xiaoshou_id = dingdan.id ) as xiaoshou left join (select shangpin_bianma,shuliang,chuku_id,xiaoshou_id from xiaoshou_chuku_item as chuku left join (select * from xiaoshou_chuku where isnull(xiaoshou_id,'') != '') as chuku_dan on chuku.chuku_id = chuku_dan.id where isnull(xiaoshou_id,'') != '') as chuku on xiaoshou.bianhao = chuku.xiaoshou_id and xiaoshou.shangpin_bianhao = chuku.shangpin_bianma) as chuku group by bianhao) as chuku on xiaoshou.bianhao = chuku.bianhao) as xiaoshou2 left join (select bianhao,case when isnull(kaipiao_money,0) = 0 then '未开票' when isnull(kaipiao_money,0) < isnull(xiaoshou_money,0) then '部分开票' when isnull(kaipiao_money,0) >= isnull(xiaoshou_money,0) then '全部开票' end as kaipiao_zhuangtai from (select bianhao,sum(convert(float,isnull(jiashui_xiaoji,0))) as xiaoshou_money from xiaoshou_dingdan_item as item left join xiaoshou_dingdan as xiaoshou on xiaoshou.id = item.xiaoshou_id group by bianhao) as xiaoshou left join (select xiaoshou_bianhao,sum(convert(float,isnull(kaipiao_jine,0)) + convert(float,isnull(kaipiao_shuie,0))) as kaipiao_money from xiaoshou_kaipiao group by xiaoshou_bianhao) as kaipiao on xiaoshou.bianhao = kaipiao.xiaoshou_bianhao) as kaipiao on xiaoshou2.bianhao = kaipiao.bianhao) as xiaoshou3 left join(select bianhao,isnull(xiaoshou_money,0) as xiaoshou_money,isnull(money,0) as shoufu_money,case when isnull(money,0)  = 0 then '未收款' when isnull(xiaoshou_money,0) > isnull(money,0)  then '部分收款' when isnull(xiaoshou_money,0) <= isnull(money,0) then '全部收款' end as shoukuan_zhuangtai from(select bianhao,sum(convert(float,isnull(jiashui_xiaoji,0))) as xiaoshou_money from xiaoshou_dingdan_item as item left join xiaoshou_dingdan as xiaoshou on xiaoshou.id = item.xiaoshou_id group by bianhao) as xiaoshou left join (select danju_bianhao,sum(convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0))) as money from shouzhi_mingxi group by danju_bianhao) as shoufukuan on xiaoshou.bianhao = shoufukuan.danju_bianhao) as shoukuan on xiaoshou3.bianhao = shoukuan.bianhao) as xiaoshou where id = " + _this.data.id
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
        var sql = "select dingdan.id,dingdan.shangpin_bianhao,dingdan.shangpin_mingcheng,dingdan.guige,dingdan.caizhi,dingdan.jishu_biaozhun,dingdan.zhibao_dengji,dingdan.danwei,dingdan.shuliang,isnull(chuku.shuliang,0) as chuku_shuliang,isnull(dingdan.shuliang,0)-isnull(chuku.shuliang,0) as weichu_shuliang,dingdan.baojia_danjia,dingdan.jiashui_xiaoji from(select * from xiaoshou_dingdan_item where xiaoshou_id = 14) as dingdan left join (select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(convert(float,isnull(shuliang,0))) as shuliang,xiaoshou_danjia,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from (select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang,xiaoshou_danjia,jiashui_xiaoji from xiaoshou_chuku left join xiaoshou_chuku_item on xiaoshou_chuku.id = xiaoshou_chuku_item.chuku_id where xiaoshou_id = '" + list[0].bianhao + "') as chuku group by shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,xiaoshou_danjia) as chuku on dingdan.shangpin_bianhao = chuku.shangpin_bianma;"

        sql = sql + "select id,riqi,jiashui_xiaoji from xiaoshou_chuku as chuku left join (select chuku_id,sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji from xiaoshou_chuku_item group by chuku_id) as item on chuku.id = item.chuku_id where xiaoshou_id = '" + list[0].bianhao + "';"

        sql = sql + "select id,shouzhi_riqi,convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0)) as money from shouzhi_mingxi where danju_leixing = '销售订单' and danju_bianhao = '" + list[0].bianhao + "' union select shouzhi_mingxi.id,shouzhi_riqi,convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0)) as money from shouzhi_mingxi left join xiaoshou_chuku on shouzhi_mingxi.danju_bianhao = xiaoshou_chuku.bianhao where danju_leixing = '销售出库' and xiaoshou_id = '" + list[0].bianhao + "' order by shouzhi_riqi;"

        sql = sql + "select id,kaipiao_riqi,jiashui_heji from xiaoshou_kaipiao where xiaoshou_bianhao = '" + list[0].bianhao + "';"

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
            for(var i=0; i<chuku_list.length; i++){
              chuku_list[i].jiashui_xiaoji = Math.round(chuku_list[i].jiashui_xiaoji * 100) / 100
            }
            var shoukuan_list = res.result.recordsets[2]
            var kaipiao_list = res.result.recordsets[3]
            var caigou_list = res.result.recordsets[4]
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
        url: '../xiaoshou_chukuAdd/xiaoshou_chukuAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + '&xiaoshou_id=' + id,
      })
    }else{
      wx.showToast({
        title: '订单中商品已全部出库',
        icon:'none'
      })
    }
  },

  shoukuan_add:function(){
    var _this = this
    var id = _this.data.id
    var type = '收订金'
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
    var sql = "select id,bianhao,riqi,kehu,dianpu,cangku,beizhu,xiaoshou_id,chuku_danwei,yewuyuan,jiashui_xiaoji,chuku_id,isnull(xiaoshou_bianhao,'') as xiaoshou_bianhao,isnull(jiashui_heji,0) as jiashui_heji,jiashui_xiaoji-isnull(jiashui_heji,0) as weikai from (select * from xiaoshou_chuku as chuku left join (select sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji,chuku_id from xiaoshou_chuku_item group by chuku_id) as item on chuku.id = item.chuku_id) as chuku left join (select xiaoshou_bianhao,sum(convert(float,isnull(jiashui_heji,0))) as jiashui_heji from xiaoshou_kaipiao group by xiaoshou_bianhao) as kaipiao on chuku.bianhao = kaipiao.xiaoshou_bianhao where jiashui_xiaoji-isnull(jiashui_heji,0) > 0 and xiaoshou_id = '" + bianhao + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        var kaipiao_list = res.result.recordsets[0]
        console.log(kaipiao_list)
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