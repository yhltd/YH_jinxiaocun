// package_huaqun/page/ddxiadan/ddxiadan.js

Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  xlShow: false,
  data: {
    onload_panduan:'',
    header_list:{
      customer_name:'',
      insert_date:'',
      order_number:'',
      pinyin:'',
      shipping_address:'',
      phone:'',
      shipping_type:'',
      install_address:'',
      customer_number:'',
    },
    body_list:[
      {
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },
    ],
    body_list_refresh:[
      {
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    if(_this.data.onload_panduan != 1){
      var userInfo = JSON.parse(options.userInfo)
      var order_number = JSON.parse(options.order_number)
      _this.setData({
        userInfo:userInfo,
        order_number:order_number,
        onload_panduan:1
      })
    }
    _this.tableShow()
  },

  tableShow: function(){
    var _this = this
    var sql = "select * from lvkuang_xiadan where order_number ='" + _this.data.order_number + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          body_list: list
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

  onInput_text: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    var list = _this.data.header_list
    list[column] = e.detail.value
    _this.setData({
      header_list: list
    })
  },

  clickView:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    console.log(e.currentTarget.dataset.value)
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    if(_this.data.userInfo.power == '管理员' ||(_this.data.userInfo.power == '操作员' && _this.data.userInfo.pay == '是')){

    }else{
      wx.showToast({
        title: '无付款权限！',
        icon: 'none'
      })
      return;
    }
    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      this_index:e.currentTarget.dataset.index,
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    var this_value = _this.data.this_value
    var list = _this.data.body_list
    list[index * 1][this_column] = this_value
    var sql = "update lvkuang_xiadan set " + this_column + "='" + this_value + "' where id=" + _this.data.body_list[index].id
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '修改成功！',
          icon: 'none',
          duration: 3000
        })
        _this.setData({
          xgShow:false,
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
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
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