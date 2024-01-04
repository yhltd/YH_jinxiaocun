// package_ruilida/page/productSelect/productSelect.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    active:0,
    this_type:'全部',
    product_show:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    app.globalData.ruili_pro = []
    var yixuan_list = options.yixuan
    if(yixuan_list != undefined){
      yixuan_list = JSON.parse(yixuan_list)
    }else{
      yixuan_list = []
    }
    _this.setData({
      yixuan_list
    })
    var sql = "select id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item_id,product_id,guige,bianhao,caigou_price,jinxiang,enable,isselect,isnull(shangpin_bianhao,'') as shangpin_bianhao,isnull(zuigaojia,'') as zuigaojia,isnull(zuidijia,'') as zuidijia from (select * from (select p.id,name,type,danwei,caizhi,jishu_biaozhun,zhibao_dengji,beizhu,item.id as item_id,product_id,guige,bianhao,lingshou_price,lingshou_bili,pifa_price,pifa_bili,dakehu_price,dakehu_bili,convert(float,caigou_price) as caigou_price,jinxiang,xiaoxiang,enable,1 as isselect from product as p left join product_item as item on p.id = item.product_id where enable = '是' ) as pro left join (select shangpin_bianhao,max(convert(float,baojia_danjia)) as zuigaojia from xiaoshou_dingdan_item group by shangpin_bianhao) as price on pro.bianhao = price.shangpin_bianhao) as pro left join (select shangpin_bianma,min(convert(float,caigou_danjia)) as zuidijia from caigou_dingdan_item group by shangpin_bianma) as caigou on pro.bianhao = caigou.shangpin_bianma;select name from peizhi where type = '商品分类' GROUP BY name"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var pro_list = res.result.recordsets[0]
        for(var i=0; i<pro_list.length; i++){
          pro_list[i].checked = false
        }
        console.log(pro_list)
        var type_list_result = res.result.recordsets[1]
        var type_list = [
          {
            name:'全部',
          }
        ]
        for(var i=0; i<type_list_result.length; i++){
          type_list.push({
            name:type_list_result[i].name
          })
        }
        _this.setData({
          pro_list,
          type_list,
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
    const systemInfo = wx.getSystemInfoSync();
    var scoll_height = systemInfo.windowHeight * 0.75
    _this.setData({
      scoll_height
    })
    console.log(systemInfo) 
  },

  danxuan_zengpin(e){
    var _this = this
    var pro_list = _this.data.pro_list
    var index = e.currentTarget.dataset.index
    if(pro_list[index].checked == false){
      pro_list[index].checked = true
    }else{
      pro_list[index].checked = false
    }
    _this.setData({
      pro_list
    })
  },

  save:function(){
    var _this = this
    var this_list = _this.data.pro_list
    var save_list = []
    for(var i=0; i<this_list.length; i++){
      if(this_list[i].num > 0){
        save_list.push(this_list[i])
      }
    }
    if(save_list.length == 0){
      wx.showToast({
        title: '未选择商品',
        icon:'none'
      })
      return;
    }
    app.globalData.ruili_pro = save_list
    _this.back()
  },

  back:function(){
    var _this = this
    wx.navigateBack({
      delta: 1
    })
  },

  list_select:function(){
    var _this = this
    _this.setData({
      product_show:true
    })
  },

  qxShow:function(){
    var _this = this
    _this.setData({
      product_show:false
    })
  },

  del_pro:function(e){
    var _this = this 
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确认删除此产品?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var pro_list = _this.data.pro_list
          pro_list[e.currentTarget.dataset.index].num = 0
          _this.setData({
            pro_list
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onChange:function(e){
    var _this = this
    console.log(e)
    var this_type = e.detail.title
    var this_index = e.detail.index
    _this.setData({
      this_type,
      active:this_index
    })
  },

  changeStepper:function(e){
    var _this = this
    console.log(e)
    var pro_list = _this.data.pro_list
    var yixuan_list = _this.data.yixuan_list
    if(yixuan_list[pro_list[e.currentTarget.dataset.index].bianhao] == undefined || yixuan_list[pro_list[e.currentTarget.dataset.index].bianhao] == ""){
      pro_list[e.currentTarget.dataset.index].num = e.detail
      _this.setData({
        pro_list
      })
    }else{
      pro_list[e.currentTarget.dataset.index].num = 0
      _this.setData({
        pro_list
      })
      wx.showToast({
        title: '已有此商品，请勿重复选择',
        icon:'none'
      })
      return;
    }
  },

  inputChange:function(e){
    var _this = this
    console.log(e)
    var text = e.detail
    console.log(_this.data.pro_list)
    var list = _this.data.pro_list
    for(var i=0; i<list.length; i++){
      if(text!= ''){
        if(list[i].name.indexOf(text) != -1){
          list[i].isselect = 1
        }else{
          list[i].isselect = 0
        }
      }else{
        list[i].isselect = 1
      }
    }
    console.log(list)
    _this.setData({
      pro_list: list
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