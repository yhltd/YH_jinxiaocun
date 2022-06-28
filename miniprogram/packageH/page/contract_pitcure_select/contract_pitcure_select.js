var app = getApp();
//声明文件系统
const fs = wx.getFileSystemManager();
//随机定义路径名称
var times = new Date().getTime();
var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    hetong_id : '',
    all:[],
    qianzi_pitcure:'',
    qianzi_id:'',
    hetong_pitcure:'',
    qianzi_type:'',
    send_judge:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      hetong_id : userInfo.id,
      qianzi_type : userInfo.qianzi_type,
      send_judge:userInfo.send_judge
    })
    console.log(userInfo.id)
    _this.init();

  },

  init: function(){
    var _this = this

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from contract_picture where contract_id = '" + _this.data.hetong_id + "'"
      }, 
      success: res => {
        var list = res.result.recordset
        // for(var i=0;i<list.length;i++){
        //   list[i].picture = "data:image/jpeg;base64," + list[i].picture.replace(/[\r\n]/g, '')
        // }
        _this.setData({
          all: list
        })
        console.log(list)
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    var _this = this
    console.log(that.data.qianzi_pitcure)
    console.log(that.data.qianzi_id)
    that.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  qianzi: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    console.log(that.data.all)
    console.log(that.data.send_judge)
    if(that.data.send_judge =='是'){
      wx.showToast({
        title:"此合同已过签字",
        icon: 'none',//图标，支持"success"、"loading" 
        duration: 1500,//提示的延迟时间，单位毫秒，默认：1500 
        mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false 
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '是否在此图片上签字？',
        success: function(res) {
          if (res.confirm) {
            
            var picture_id = that.data.all[id].id
            wx.navigateTo({
              url: '../contract_pitcure_send/contract_pitcure_send' + '?userInfo=' + JSON.stringify({
                id : picture_id,
                qianzi_type: that.data.qianzi_type
              })
            })
  
          } else if (res.cancel) {
            return false;
          }
        }
      })
    }

  },

  yulan:function(e){
    var that = this
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否查看此图片？',
      success: function(res) {
        if (res.confirm) {
          
          var this_picture = that.data.all[id].picture
          wx.previewImage({
            urls: [this_picture], //预览图片 数组
          })

        } else if (res.cancel) {
          return false;
        }
      }
    })
  }

})