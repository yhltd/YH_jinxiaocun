// package_ruilida/page/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kaipiao_show:false,
    cxShow:false,
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
    const systemInfo = wx.getSystemInfoSync();
    var scoll_height = systemInfo.windowHeight * 0.63
    var type = options.type
    _this.setData({
      userInfo,
      id,
      scoll_height,
      type
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
        url: '../xiaoshou_kaipiaoAdd/xiaoshou_kaipiaoAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + '&kaipiao_list=' + JSON.stringify(benci_list) + "&kehu_name=" + _this.data.list[0].kehu,
      })
    }else{
      wx.showToast({
        title: '未读取到填写金额的开票信息',
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
    var sql = "select * from xiaoshou_chuku where id = " + _this.data.id
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
        var sql = "select * from xiaoshou_chuku_item where chuku_id = " + _this.data.id + ";"

        sql = sql + "select id,shouzhi_riqi,convert(float,isnull(jizhang_jine,0)) + convert(float,isnull(kedi_shuie,0)) as money from shouzhi_mingxi where danju_leixing = '销售出库' and danju_bianhao = '" + list[0].bianhao + "';"

        sql = sql + "select xiaoshou_kaipiao.id,kaipiao_riqi,jiashui_heji from xiaoshou_chuku left join xiaoshou_kaipiao on xiaoshou_chuku.bianhao = xiaoshou_kaipiao.xiaoshou_bianhao where bianhao = '" + list[0].bianhao + "' and isnull(xiaoshou_kaipiao.id,'') != '';"

        sql = sql + "select isnull(sum(convert(float,isnull(jizhang_jine,0))+convert(float,isnull(kedi_shuie,0))),0) as dingjin from shouzhi_mingxi where danju_leixing = '销售订单' and danju_bianhao = '" + list[0].xiaoshou_id + "';"

        sql = sql + "select isnull(sum(convert(float,isnull(dingjin_use,0))),0) as yiyong from xiaoshou_chuku where xiaoshou_id = '" + list[0].xiaoshou_id + "';"

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
            var type = _this.data.type
            if(type == '生成收款单'){
              _this.setData({
                type:''
              })
              _this.shoukuan_add()
            }else if(type == '生成开票'){
              _this.setData({
                type:''
              })
              _this.kaipiao_add()
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
    var dingjin_use_new = _this.data.dingjin_use_new
    var p_heji = _this.data.p_heji
    var qiankuan = _this.data.heji - dingjin_use_new - _this.data.shoukuan_money
    var dingjin_yong = dingjin_use_new - _this.data.list[0].dingjin_use
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
      var sql = "update xiaoshou_chuku set dingjin_use = '" + dingjin_use_new + "' where id=" + _this.data.id
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
    var dingjin_use = _this.data.dingjin_use
    var dingjin_use_new = _this.data.dingjin_use
    if(dingjin_use * 1 == 0){
      var qiankuan = _this.data.qiankuan * 1
      var dingjin_sum = (_this.data.dingjin_sum * 1) - (_this.data.yiyong * 1)
      if(qiankuan <= dingjin_sum){
        dingjin_use_new = qiankuan
      }else{
        dingjin_use_new = dingjin_sum
      }
    }
    if(this_qiankuan > 0){
      _this.setData({
        cxShow:true,
        dingjin_use_new
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
    var type = '收欠款'
    var qiankuan = _this.data.qiankuan
    if(qiankuan > 0){
      var yukuan = qiankuan
      wx.navigateTo({
        url: '../caigou_fukuanAdd/caigou_fukuanAdd?userInfo=' + JSON.stringify(_this.data.userInfo) + '&chuku_id=' + id + '&shouzhi_type=收入记录' + "&shoufu_type=收欠款&yukuan=" + yukuan,
      })
    }else{
      wx.showToast({
        title: '此单已结清',
        icon: 'none'
      })
    }
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

  kaipiao_add:function(){
    var _this = this
    var id = _this.data.id
    var bianhao = _this.data.list[0].bianhao
    var sql = "select id,bianhao,riqi,kehu,dianpu,cangku,beizhu,xiaoshou_id,chuku_danwei,yewuyuan,jiashui_xiaoji,chuku_id,isnull(xiaoshou_bianhao,'') as xiaoshou_bianhao,isnull(jiashui_heji,0) as jiashui_heji,jiashui_xiaoji-isnull(jiashui_heji,0) as weikai,jiashui_xiaoji-isnull(jiashui_heji,0) as this_kai from (select * from xiaoshou_chuku as chuku left join (select sum(convert(float,isnull(jiashui_xiaoji,0))) as jiashui_xiaoji,chuku_id from xiaoshou_chuku_item group by chuku_id) as item on chuku.id = item.chuku_id) as chuku left join (select xiaoshou_bianhao,sum(convert(float,isnull(jiashui_heji,0))) as jiashui_heji from xiaoshou_kaipiao group by xiaoshou_bianhao) as kaipiao on chuku.bianhao = kaipiao.xiaoshou_bianhao where jiashui_xiaoji-isnull(jiashui_heji,0) > 0 and bianhao = '" + bianhao + "'"
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

  del1:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.index)
    var id = _this.data.id
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.xiaoshou_chuku_del != '是'){
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
          var sql = "delete from xiaoshou_chuku where id=" + id + ";delete from xiaoshou_chuku_item where chuku_id ='" + id + "'"
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
    if(userInfo.power_mingxi.xiaoshou_chuku_upd != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../xiaoshou_chukuAdd/xiaoshou_chukuAdd' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=" + id,
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
        var print_list = {
          title:'销售出库单',
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
            name:product_list[i].name,
            num:product_list[i].shuliang,
            price:product_list[i].xiaoshou_danjia,
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
          url: '../print_danju_peizhi/print_danju_peizhi' + '?userInfo=' + JSON.stringify(_this.data.userInfo) + "&id=3",
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
    var type = "销售出库"
    var id = _this.data.list.id
    console.log(id)
    console.log(type)
    wx.navigateTo({
      url: '../fileUpload/fileUpload?userInfo=' + JSON.stringify(_this.data.userInfo) + "&type=" + type + "&id=" + id,
    })
  },

  kaipiao_close:function(){
    var _this = this
    _this.setData({ 
      kaipiao_show:false
    })
  },

  back:function(){
    var _this = this
    wx.navigateBack({
      delta: 1
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