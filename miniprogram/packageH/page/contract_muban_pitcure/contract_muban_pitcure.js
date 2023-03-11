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
    console.log("select * from contract_picture_muban where contract_id = '" + _this.data.hetong_id + "'")
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from contract_picture_muban where contract_id = '" + _this.data.hetong_id + "'"
      }, 
      success: res => {
        console.log('查询成功')
        console.log(res)
        var list = res.result.recordset
        // for(var i=0;i<list.length;i++){
        //   list[i].picture = "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/" + list[i].picture.replace(/[\r\n]/g, '')
        // }
        _this.setData({
          all: list
        })

      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
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
    console.log(e)
    console.log(id)
    console.log(that.data.all)
    var fileid = that.data.all[id].picture
    console.log(fileid)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "sqlServer_cw",
            data: {
              query: "delete from contract_picture_muban where id = '" + that.data.all[id].id + "'"
            },
            success(res) {
              console.log("成功删除数据库数据", res)
              wx.cloud.deleteFile({
                fileList: [fileid],
                  success: res => {
                    // handle success
                    console.log(res.fileList)
                  },
                  fail: console.error
                })
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
        let size = this_picture.every(item => {
          return item.size <= 1000000
        })
        if(true){
          var out_picture = []
        for(var i=0;i<this_picture.length;i++){
          const name = Math.random() * 1000000;
          const cloudPath = name + this_picture[i].match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath: "contract_pitcure/" + cloudPath, //云存储图片名字
            filePath:this_picture[i], //临时路径
            success: res => {
              console.log('[上传图片] 成功：', res)
              let fileID = res.fileID;
              var sql = "insert into contract_picture_muban(contract_id,picture) values ('" + _this.data.hetong_id + "','" + fileID + "')"
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
              //把图片存到users集合表
            },
            fail: e => {
              console.error('[上传图片] 失败：', e)
            }
          })
          // wx.getFileSystemManager().readFile({
          //   filePath: this_picture[i], //选择图片返回的相对路径
          //   encoding: 'base64', //编码格式
          //   success: res => { //成功的回调
          //     out_picture[i] = res.data
            
          
          //   }
          // })
        }
        }else{
          wx.showToast({
            title: '上传图片不能超过1M！',
            icon: 'none'
          })
        }
        
      }
    })
  },


  jiahao2(){
    var _this = this
    wx.showModal({
      title: '提示',
      content: '是否下载合同图片？',
      success: function(res) {
        if (res.confirm) {
          for(var i=0;i< _this.data.all.length;i++){
            console.log(_this.data.all[i].picture)
            wx.cloud.downloadFile({
              fileID :_this.data.all[i].picture,
              filePath: wx.env.USER_DATA_PATH,
              success(res) {
                console.log(res)
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath, //图片文件路径
                  success: function (data) {
                      console.log(data)
                  },
                })
              }
            })
            
          }

          wx.showToast({
            title: '下载完成',
            icon: 'none'
          })

        } else if (res.cancel) {
          return false;
        }
      }
    })
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