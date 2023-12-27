// package_ruilida/page/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kaipiao_show:false,
    cxShow:false
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
    if(this_val > max_val){
      xukai_list[index].this_kai = max_val
    }else{
      xukai_list[index].this_kai = e.detail
    }
    _this.setData({
      xukai_list
    })
  },

  kaipiao_next:function(){
    var _this = this
    var benci_list = []
    for(var i=0; i<_this.data.xukai_list.length; i++){
      if(_this.data.xukai_list[i].this_kai * 1 > 0){
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
        title: '未读取到填写金额的收票信息',
        icon:'none'
      })
    }
  },

  tableShow: function () {
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.xiaoshou_chuku_sel != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    var id = _this.data.id
    console.log(id)
    var sql = "select * from caigou_ruku where id = " + _this.data.id
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        if(list[0].dingjin_use == ''){
          list[0].dingjin_use = 0
        }
        console.log(list)
        _this.setData({
          list: list,
          dingjin_use: list[0].dingjin_use,
        })
        var sql = "select * from caigou_ruku_item where ruku_id = " + _this.data.id + ";"

        sql = sql + "select id,shouzhi_riqi,convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0)) as money from shouzhi_mingxi where danju_leixing = '采购入库' and danju_bianhao = '" + list[0].bianhao + "';"

        sql = sql + "select caigou_shoupiao.id,kaipiao_riqi,jiashui_heji from caigou_ruku left join caigou_shoupiao on caigou_ruku.bianhao = caigou_shoupiao.caigou_bianhao where bianhao = '" + list[0].bianhao + "' and isnull(caigou_shoupiao.id,'') != '';"

        sql = sql + "select isnull(sum(convert(float,isnull(jizhang_jine,0))+convert(float,isnull(kedi_shuie,0))),0) as dingjin from shouzhi_mingxi where danju_leixing = '采购订单' and danju_bianhao = '" + list[0].caigou_id + "';"

        sql = sql + "select isnull(sum(convert(float,isnull(dingjin_use,0))),0) as yiyong from caigou_ruku where caigou_id = '" + list[0].caigou_id + "';"

        console.log(sql)

        wx.cloud.callFunction({
          name: 'sqlserver_ruilida',
          data: {
            query: sql
          },
          success: res => {
            console.log(res)
            var product_list = res.result.recordsets[0]
            var heji = 0 
            for(var i=0; i<product_list.length; i++){
              heji = heji + (product_list[i].jiashui_xiaoji * 1)
            }
            heji = Math.round(heji * 100) / 100
            var shoukuan_list = res.result.recordsets[1]
            var shoukuan_money = 0
            for(var i=0; i<shoukuan_list.length; i++){
              if(shoukuan_list[i].money != ''){
                shoukuan_money = shoukuan_money + Math.round(shoukuan_list[i].money * 100) / 100
              }
            }
            var kaipiao_list = res.result.recordsets[2]
            var dingjin_sum = Math.round(res.result.recordsets[3][0].dingjin * 100) / 100 
            var yiyong = Math.round(res.result.recordsets[4][0].yiyong * 100) / 100
            console.log(product_list)
            console.log(shoukuan_list)
            console.log(kaipiao_list)
            var list = _this.data.list
            list[0].item = product_list
            console.log(heji)
            console.log(list[0].dingjin_use)
            console.log(shoukuan_money)
            var qiankuan = heji - list[0].dingjin_use - shoukuan_money
            _this.setData({
              list,
              shoukuan_list,
              kaipiao_list,
              p_heji:heji,
              dingjin_sum,
              yiyong, 
              shoukuan_money,
              qiankuan
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

  qxShow:function(){
    var _this = this
    _this.setData({
      cxShow: false,
      kaipiao_show: false,
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  save_use:function(){
    var _this = this
    var this_id = _this.data.id
    var dingjin_use = _this.data.dingjin_use
    var p_heji = _this.data.p_heji
    var qiankuan = _this.data.heji - dingjin_use - _this.data.shoukuan_money
    var dingjin_yong = dingjin_use - _this.data.list[0].dingjin_use
    var dingjin_yue = _this.data.dingjin_sum - _this.data.yiyong
    if(qiankuan < 0){
      wx.showToast({
        title: '付款金额超出欠款总额',
        icon: 'none'
      })
    }else if(dingjin_yue < dingjin_yong){
      wx.showToast({
        title: '付款金额超出订金余额',
        icon: 'none'
      })
    }else {
      var sql = "update caigou_ruku set dingjin_use = '" + dingjin_use + "' where id=" + _this.data.id
      wx.cloud.callFunction({
        name: 'sqlserver_ruilida',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          _this.qxShow()
          wx.showToast({
            title: '成功',
            icon: 'none'
          })
          _this.tableShow()
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

  use_dingjin:function(){
    var _this = this
    var this_qiankuan = _this.data.qiankuan
    if(this_qiankuan > 0){
      _this.setData({
        cxShow:true
      })
    }else{
      wx.showToast({
        title: '此单已结清',
        icon: 'none'
      })
    }
  },

  shoukuan_add:function(){
    var _this = this
    var id = _this.data.id
    var type = '付欠款'
    var qiankuan = _this.data.qiankuan
    if(qiankuan > 0){
      var yukuan = qiankuan
      wx.navigateTo({
        url: '../caigou_fukuanAdd/caigou_fukuanAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + '&ruku_id=' + id + '&shouzhi_type=支出记录' + "&shoufu_type=付欠款&yukuan=" + yukuan,
      })
    }else{
      wx.showToast({
        title: '此单已结清',
        icon: 'none'
      })
    }
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

  kaipiao_add:function(){
    var _this = this
    var id = _this.data.id
    var bianhao = _this.data.list[0].bianhao
    var sql = "select id,bianhao,riqi,gongyingshang,dianpu,cangku,beizhu,caigou_id,ruku_danwei,yewuyuan,jiashui_xiaoji,ruku_id,isnull(caigou_bianhao,'') as caigou_bianhao,isnull(jiashui_heji,0) as jiashui_heji,jiashui_xiaoji-isnull(jiashui_heji,0) as weikai,jiashui_xiaoji-isnull(jiashui_heji,0) as this_kai from (select * from caigou_ruku as ruku left join (select sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji,ruku_id from caigou_ruku_item group by ruku_id) as item on ruku.id = item.ruku_id) as ruku left join (select caigou_bianhao,sum(convert(float,isnull(jiashui_heji,0))) as jiashui_heji from caigou_shoupiao group by caigou_bianhao) as kaipiao on ruku.bianhao = kaipiao.caigou_bianhao where jiashui_xiaoji-isnull(jiashui_heji,0) > 0 and bianhao = '" + bianhao + "'"
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