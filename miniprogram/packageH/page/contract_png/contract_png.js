// pages/shangpinxuanze/shangpinxuanze.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    hetong_id : '',
    all:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      hetong_id : userInfo.id,
    })

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
        for(var i=0;i<list.length;i++){
          list[i].picture = "data:image/jpeg;base64," + list[i].picture.replace(/[\r\n]/g, '')
        }
        _this.setData({
          all: list
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

  shanchu: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    console.log(that.data.all)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "sqlServer_cw",
            data: {
              query: "delete from contract_picture where id = '" + that.data.all[id].id + "'"
            },
            success(res) {
              console.log("成功", res)
              that.init();
            },
            fail(res) {
              console.log("失败", res)
              that.init();
            }
          });
        } else if (res.cancel) {
          return false;
        }
      }
    })
  },
  jiahao1: function() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: 'camera',
      success(res) {
        console.log(res.tempFilePaths);
        var this_picture = res.tempFilePaths
        var out_picture = []
        for(var i=0;i<this_picture.length;i++){
          wx.getFileSystemManager().readFile({
            filePath: this_picture[i], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              out_picture[i] = res.data
              if(i == this_picture.length){
                var sql = "insert into contract_picture(contract_id,picture) values "
                var value = ''
                for(var j=0;j<out_picture.length;j++){
                  if(value != ''){
                    value = " ('" + _this.data.hetong_id + "','" + out_picture[j] + "')"
                  }else{
                    value = value + " ,('" + _this.data.hetong_id + "','" + out_picture[j] + "')"
                  }
                }
                sql = sql + value
                console.log(sql)
                wx.cloud.callFunction({
                  name: 'sqlServer_cw',
                  data: {
                    query: sql
                  },
                  success: res => {
                    _this.init()
                    wx.showToast({
                      title: '添加成功！',
                      icon: 'none'
                    })
                  },
                  err: res => {
                    console.log("错误!")
                  },
                  fail: res => {
                    wx.showToast({
                      title: '请求失败！',
                      icon: 'none'
                    })
                    console.log("请求失败！")
                  }
                })
              }
            }
          })
        }
      }
    })
  },

})