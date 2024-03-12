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
  data: {
    kongjian: 8,
    text: '',
    pic1: '',
    pic2: '',
    pic3: '',
    pic4: '',
    pic5: '',
    pic6: '',
    pic7: '',
    pic8: '',
    pic9: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo
    })
  },

  imgload: function (e) {
    var _this = this;
    _this.setData({
      pic1: '',
      pic2: '',
      pic3: '',
      pic4: '',
      pic5: '',
      pic6: '',
      pic7: '',
      pic8: '',
      pic9: '',
    })
    function compressAndProcessImage(filePath) {
      return new Promise((resolve, reject) => {
        wx.compressImage({
          src: filePath,
          quality: 50,
          success: function (res) {
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePath,
              encoding: 'base64',
              success: function (res) {
                var pic = 'data:image/png;base64,' + res.data;
                resolve(pic); // 图片处理成功，解决 Promise  
              },
              fail: function (err) {
                reject(err); // 读取文件失败，拒绝 Promise  
              }
            });
          },
          fail: function (err) {
            reject(err); // 压缩图片失败，拒绝 Promise  
          }
        });
      });
    }

    function processImages(tempFiles) {
      var promises = tempFiles.map(function (file, index) {
        return compressAndProcessImage(file.tempFilePath).then(function (pic) {
          _this.setData({
            ['pic' + (index + 1)]: pic
          });
        });
      });
      return Promise.all(promises); // 等待所有图片处理完成  
    }

    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: function (res) {
        processImages(res.tempFiles).then(function () {
          console.log('所有图片处理完成');
        }).catch(function (err) {
          console.error('图片处理过程中出现错误:', err);
        });
      },
      fail: function (err) {
        console.error('选择媒体失败:', err);
      }
    });
  },

  add1: function () {
    var _this = this
    if (_this.data.text == '') {
      wx.showToast({
        title: '投诉或建议为空！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    wx.showLoading({
      title:'正在提交...'
    })
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: "insert into tousu(text,name) output inserted.id values('" + _this.data.text + "','" + _this.data.userInfo.name + "')"
      },
      success: res => {
        console.log(res)
        _this.setData({
          id: res.result.recordsets[0][0].id
        })
        var sql = "update tousu set pic1 = 'https://yhocn.cn:9100/tb3999803/投诉-" + _this.data.id + "-1.jpg',pic2 = 'https://yhocn.cn:9100/tb3999803/投诉-" + _this.data.id + "-2.jpg',pic3 = 'https://yhocn.cn:9100/tb3999803/投诉-" + _this.data.id + "-3.jpg',pic4 = 'https://yhocn.cn:9100/tb3999803/投诉-" + _this.data.id + "-4.jpg',pic5 = 'https://yhocn.cn:9100/tb3999803/投诉-" + _this.data.id + "-5.jpg',pic6 = 'https://yhocn.cn:9100/tb3999803/投诉-" + _this.data.id + "-6.jpg',pic7 = 'https://yhocn.cn:9100/tb3999803/投诉-" + _this.data.id + "-7.jpg',pic8 = 'https://yhocn.cn:9100/tb3999803/投诉-" + _this.data.id + "-8.jpg',pic9 = 'https://yhocn.cn:9100/tb3999803/投诉-" + _this.data.id + "-9.jpg' where id=" + _this.data.id
        wx.cloud.callFunction({
          name: 'sqlServer_tb3999803',
          data: {
            query: sql
          },
          success: res => {
            console.log(res)
            if (_this.data.pic1.indexOf("base64") != -1) {
              var fsm = wx.getFileSystemManager();
              var buffer = wx.base64ToArrayBuffer(_this.data.pic1.split(',')[1]);
              const fileName = wx.env.USER_DATA_PATH + '/投诉-' + _this.data.id + '-1.jpg';
              fsm.writeFileSync(fileName, buffer, 'binary');
              console.log(fileName);
              wx.uploadFile({
                url: 'https://yhocn.cn:9089/file/upload',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                filePath: fileName,
                name: 'file',
                formData: {
                  name: '投诉-' + _this.data.id + '-1.jpg',
                  path: '/tb3999803/',
                  kongjian: _this.data.kongjian,
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.indexOf("存储空间不足") != -1) {
                    wx.showToast({
                      title: '存储空间不足！',
                      icon: 'none'
                    })
                  }
                }
              })
            }
            if (_this.data.pic2.indexOf("base64") != -1) {
              var fsm = wx.getFileSystemManager();
              var buffer = wx.base64ToArrayBuffer(_this.data.pic2.split(',')[1]);
              const fileName = wx.env.USER_DATA_PATH + '/投诉-' + _this.data.id + '-2.jpg';
              fsm.writeFileSync(fileName, buffer, 'binary');
              console.log(fileName);
              wx.uploadFile({
                url: 'https://yhocn.cn:9089/file/upload',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                filePath: fileName,
                name: 'file',
                formData: {
                  name: '投诉-' + _this.data.id + '-2.jpg',
                  path: '/tb3999803/',
                  kongjian: _this.data.kongjian,
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.indexOf("存储空间不足") != -1) {
                    wx.showToast({
                      title: '存储空间不足！',
                      icon: 'none'
                    })
                  }
                }
              })
            }
            if (_this.data.pic3.indexOf("base64") != -1) {
              var fsm = wx.getFileSystemManager();
              var buffer = wx.base64ToArrayBuffer(_this.data.pic3.split(',')[1]);
              const fileName = wx.env.USER_DATA_PATH + '/投诉-' + _this.data.id + '-3.jpg';
              fsm.writeFileSync(fileName, buffer, 'binary');
              console.log(fileName);
              wx.uploadFile({
                url: 'https://yhocn.cn:9089/file/upload',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                filePath: fileName,
                name: 'file',
                formData: {
                  name: '投诉-' + _this.data.id + '-3.jpg',
                  path: '/tb3999803/',
                  kongjian: _this.data.kongjian,
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.indexOf("存储空间不足") != -1) {
                    wx.showToast({
                      title: '存储空间不足！',
                      icon: 'none'
                    })
                  }
                }
              })
            }
            if (_this.data.pic4.indexOf("base64") != -1) {
              var fsm = wx.getFileSystemManager();
              var buffer = wx.base64ToArrayBuffer(_this.data.pic4.split(',')[1]);
              const fileName = wx.env.USER_DATA_PATH + '/投诉-' + _this.data.id + '-4.jpg';
              fsm.writeFileSync(fileName, buffer, 'binary');
              console.log(fileName);
              wx.uploadFile({
                url: 'https://yhocn.cn:9089/file/upload',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                filePath: fileName,
                name: 'file',
                formData: {
                  name: '投诉-' + _this.data.id + '-4.jpg',
                  path: '/tb3999803/',
                  kongjian: _this.data.kongjian,
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.indexOf("存储空间不足") != -1) {
                    wx.showToast({
                      title: '存储空间不足！',
                      icon: 'none'
                    })
                  }
                }
              })
            }
            if (_this.data.pic5.indexOf("base64") != -1) {
              var fsm = wx.getFileSystemManager();
              var buffer = wx.base64ToArrayBuffer(_this.data.pic5.split(',')[1]);
              const fileName = wx.env.USER_DATA_PATH + '/投诉-' + _this.data.id + '-5.jpg';
              fsm.writeFileSync(fileName, buffer, 'binary');
              console.log(fileName);
              wx.uploadFile({
                url: 'https://yhocn.cn:9089/file/upload',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                filePath: fileName,
                name: 'file',
                formData: {
                  name: '投诉-' + _this.data.id + '-5.jpg',
                  path: '/tb3999803/',
                  kongjian: _this.data.kongjian,
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.indexOf("存储空间不足") != -1) {
                    wx.showToast({
                      title: '存储空间不足！',
                      icon: 'none'
                    })
                  }
                }
              })
            }
            if (_this.data.pic6.indexOf("base64") != -1) {
              var fsm = wx.getFileSystemManager();
              var buffer = wx.base64ToArrayBuffer(_this.data.pic6.split(',')[1]);
              const fileName = wx.env.USER_DATA_PATH + '/投诉-' + _this.data.id + '-6.jpg';
              fsm.writeFileSync(fileName, buffer, 'binary');
              console.log(fileName);
              wx.uploadFile({
                url: 'https://yhocn.cn:9089/file/upload',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                filePath: fileName,
                name: 'file',
                formData: {
                  name: '投诉-' + _this.data.id + '-6.jpg',
                  path: '/tb3999803/',
                  kongjian: _this.data.kongjian,
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.indexOf("存储空间不足") != -1) {
                    wx.showToast({
                      title: '存储空间不足！',
                      icon: 'none'
                    })
                  }
                }
              })
            }
            if (_this.data.pic7.indexOf("base64") != -1) {
              var fsm = wx.getFileSystemManager();
              var buffer = wx.base64ToArrayBuffer(_this.data.pic7.split(',')[1]);
              const fileName = wx.env.USER_DATA_PATH + '/投诉-' + _this.data.id + '-7.jpg';
              fsm.writeFileSync(fileName, buffer, 'binary');
              console.log(fileName);
              wx.uploadFile({
                url: 'https://yhocn.cn:9089/file/upload',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                filePath: fileName,
                name: 'file',
                formData: {
                  name: '投诉-' + _this.data.id + '-7.jpg',
                  path: '/tb3999803/',
                  kongjian: _this.data.kongjian,
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.indexOf("存储空间不足") != -1) {
                    wx.showToast({
                      title: '存储空间不足！',
                      icon: 'none'
                    })
                  }
                }
              })
            }
            if (_this.data.pic8.indexOf("base64") != -1) {
              var fsm = wx.getFileSystemManager();
              var buffer = wx.base64ToArrayBuffer(_this.data.pic8.split(',')[1]);
              const fileName = wx.env.USER_DATA_PATH + '/投诉-' + _this.data.id + '-8.jpg';
              fsm.writeFileSync(fileName, buffer, 'binary');
              console.log(fileName);
              wx.uploadFile({
                url: 'https://yhocn.cn:9089/file/upload',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                filePath: fileName,
                name: 'file',
                formData: {
                  name: '投诉-' + _this.data.id + '-8.jpg',
                  path: '/tb3999803/',
                  kongjian: _this.data.kongjian,
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.indexOf("存储空间不足") != -1) {
                    wx.showToast({
                      title: '存储空间不足！',
                      icon: 'none'
                    })
                  }
                }
              })
            }
            if (_this.data.pic9.indexOf("base64") != -1) {
              var fsm = wx.getFileSystemManager();
              var buffer = wx.base64ToArrayBuffer(_this.data.pic9.split(',')[1]);
              const fileName = wx.env.USER_DATA_PATH + '/投诉-' + _this.data.id + '-9.jpg';
              fsm.writeFileSync(fileName, buffer, 'binary');
              console.log(fileName);
              wx.uploadFile({
                url: 'https://yhocn.cn:9089/file/upload',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                filePath: fileName,
                name: 'file',
                formData: {
                  name: '投诉-' + _this.data.id + '-9.jpg',
                  path: '/tb3999803/',
                  kongjian: _this.data.kongjian,
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.indexOf("存储空间不足") != -1) {
                    wx.showToast({
                      title: '存储空间不足！',
                      icon: 'none'
                    })
                  }
                }
              })
            }
            wx.hideLoading()
            wx.showToast({
              title: '提交成功！',
              icon: 'none',
              duration: 3000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          },
          err: res => {
            wx.hideLoading()
            console.log("错误!")
          },
          fail: res => {
            wx.hideLoading()
            wx.showToast({
              title: '请求失败！',
              icon: 'none'
            })
            console.log("请求失败！")
          }
        })
      },
      err: res => {
        wx.hideLoading()
        console.log("错误!")
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
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