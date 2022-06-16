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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      hetong_id : userInfo.id,
      qianzi_type : userInfo.qianzi_type
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
        for(var i=0;i<list.length;i++){
          list[i].picture = "data:image/jpeg;base64," + list[i].picture.replace(/[\r\n]/g, '')
        }
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

  //合成图片
  hechengimge: function () {
    // 给个小提示，正在执行
    var _this = this
    wx.showLoading({
      title: '合成中',
      mask: true
    })
    console.log(this, '123');
    // 绘制合成图片到canvas
    let that = this
    that.setData({
      show: false
    })
    const ctx = wx.createCanvasContext('handWriting') //让这个先执行
    ctx.drawImage(_this.data.hetong_pitcure, 0, 0, (750 / 2), (1000 / 2)) //1、背景图
    console.log(this, '1、背景图'+_this.data.hetong_pitcure);
    ctx.drawImage(_this.data.qianzi_pitcure, 50, 400, 100, 30) //2、签名图
    console.log(this, '2、签名图'+_this.data.qianzi_pitcure);
    console.log(this, '345');
    ctx.draw(true, () => {
      console.log(this, 'panduan1');
      //获取临时缓存合成照片路径，存入data中
      wx.canvasToTempFilePath({
        canvasId: 'handWriting',
        success: function (res) {
          console.log(this, 'panduan2');
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath)
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log(this, 'panduan3');
          console.log(res);
          wx.showToast({
            title: '失败',
            icon: 'error',
            duration: 2000
          })
        }
      }, this)
    }
    
    )
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
    // if(that.data.qianzi_id != ''){
    //   console.log('panduan1')
    //   for(var i=0;i<_this.data.all.length;i++){
    //     if(_this.data.all[i].id == that.data.qianzi_id){
    //       console.log('panduan2')
    //       var str = _this.data.all[i].picture;
    //       str = str.replace('data:image/jpeg;base64,','')
    //       console.log(str)
    //       fs.writeFile({
    //         filePath: codeimg,
    //         data: str,
    //         encoding: 'base64',
    //         success: (res) => {
    //           //写入成功了的话，新的图片路径就能用了
    //           console.log(res)
    //           console.log(codeimg)
    //           _this.setData({
    //             hetong_pitcure: codeimg
    //           })
    //           _this.hechengimge();
    //           // const ctx = wx.createCanvasContext('handWriting') //让这个先执行
    //           // ctx.drawImage(codeimg, 0, 0, (750 / 2), (1000 / 2)) //1、背景图
    //           // ctx.drawImage(_this.data.qianzi_pitcure, 50, 400, 100, 30) //
    //           // ctx.draw(true, () => {
    //           //   console.log('panduan3')
    //           //   //获取临时缓存合成照片路径，存入data中
    //           //   wx.canvasToTempFilePath({
    //           //     canvasId: 'handWriting',
    //           //     success: function (res) {
    //           //       console.log('panduan4')
    //           //       var tempFilePath = res.tempFilePath;
    //           //       console.log(tempFilePath)
    //           //       wx.showToast({
    //           //         title: '成功',
    //           //         icon: 'success',
    //           //         duration: 2000
    //           //       })
    //           //     },
    //           //     fail: function (res) {
    //           //       console.log('panduan5')
    //           //       console.log(res);
    //           //       wx.showToast({
    //           //         title: '失败',
    //           //         icon: 'error',
    //           //         duration: 2000
    //           //       })
    //           //     }
    //           //   }, this)
    //           // }
    //           // )

    //         }
    //       });
    //     }
    //   }
    // }
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
  },

})