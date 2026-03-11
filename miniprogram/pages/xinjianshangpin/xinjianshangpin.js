// pages/xinjianshangpin/xinjianshangpin.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value0:'',
    value1:'',
    value2:'',
    value4:'',
    bigImg: "",
    bigImg: "", // 保持原字段名，但将存储URL
  tempImageUrl: '', // 临时存储新上传的图片URL
  uploading: false, // 上传状态
    list: [{
        txet: "商品代码",
        index: 0
      },
      {
        txet: "品名",
        index: 1
      },
      {
        txet: "单位",
        index: 2
      },
      // {
      //   txet: "进价",
      //   index: 3
      // },
      {
        txet: "类别",
        index: 4
      },
      // {
      //   txet: "备注",
      //   index: 5
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    if (options.query != null) {
      console.log(options.query)
    }

    if(app.globalData.shujuku==0){

      var sql = "select sp_dm from yh_jinxiaocun_jichuziliao where gs_name ='" + app.globalData.gongsi + "'"
      console.log(sql)
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: sql
        },
        success(res) {
          console.log("商品列表", res.result)
          _this.setData({
            product_id:res.result
          })
          // 在返回结果中会包含新创建的记录的 _id
        },
        fail(res) {
          console.log("失败", res)
        }
      });

    }else if(app.globalData.shujuku == 1){

      var sql = "select sp_dm from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jichuziliao_mssql where gs_name ='" + app.globalData.gongsi + "'"
      console.log(sql)
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: sql
        },
        success(res) {
          console.log("商品列表", res.result.recordset)
          _this.setData({
            product_id:res.result.recordset
          })
          // 在返回结果中会包含新创建的记录的 _id
        },
        fail(res) {
          console.log("失败", res)
        }
      });
      
    }

   
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
    var that = this
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 500
    })
    that.onLoad()
    that.onShow()
    wx.stopPullDownRefresh()
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
  // chooseImage: function(e) {
  //   let that = this;
  //   wx.chooseImage({
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function(res) {
  //       wx.showLoading({
  //         title: '上传中',
  //       });
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       let filePath = res.tempFilePaths[0];
  //       const name = Math.random() * 1000000;
  //       const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]

  //       wx.cloud.uploadFile({
  //         cloudPath: "tupian/" + cloudPath, //云存储图片名字

  //         filePath, //临时路径

  //         success: res => {
  //           console.log('[上传图片] 成功：', res)
  //           that.setData({
  //             bigImg: res.fileID, //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
  //           });
  //           let fileID = res.fileID;
  //           //把图片存到users集合表

  //           console.log(name1)

  //         },
  //         fail: e => {
  //           console.error('[上传图片] 失败：', e)
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       });
  //     }

  //   })
  // },

  // chooseImage: function(e) {
  //   var that = this
  //   wx.chooseImage({
  //     success: res => {
  //     wx.getFileSystemManager().readFile({
  //       filePath: res.tempFilePaths[0], //选择图片返回的相对路径
  //       encoding: 'base64', //编码格式
  //       success: res => { //成功的回调
  //       console.log('data:image/png;base64,' + res.data)
  //       that.setData({
  //         bigImg: res.data, //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
  //       }, wx.showToast({
  //         title: '图片选择成功',
  //         'icon': 'none',
  //         duration: 3000
  //       }))
  //       }
  //     })
  //     }
  //   })
  // },

  // 修改 chooseImage 方法，使用文件服务器上传
chooseImage: function(e) {
  var that = this;
  
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: res => {
      const tempFilePath = res.tempFilePaths[0];
      
      wx.showLoading({
        title: '上传中...',
        mask: true
      });
      
      that.setData({ uploading: true });
      
      // 生成文件名
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000);
      const fileExtension = tempFilePath.split('.').pop() || 'jpg';
      const fileName = `${timestamp}_${random}.${fileExtension}`;
      
      // 上传文件
      wx.uploadFile({
        url: 'https://yhocn.cn:9097/file/upload',
        filePath: tempFilePath,
        name: 'file',
        formData: {
          name: fileName,
          path: '/jinxiaocun/',
          kongjian: '3',
          fileType: fileExtension
        },
        header: { 'Content-Type': 'multipart/form-data' },
        success: function(uploadRes) {
          wx.hideLoading();
          try {
            var resData = JSON.parse(uploadRes.data);
            if (resData.code === 200 || resData.success) {
              var fileUrl = "http://yhocn.cn:9088/jinxiaocun/" + fileName;
              
              that.setData({ 
                tempImageUrl: fileUrl,
                bigImg: fileUrl, // 同时更新 bigImg 用于提交
                uploading: false
              });
              
              wx.showToast({ 
                title: '图片上传成功', 
                icon: 'success' 
              });
              
              console.log('图片URL:', fileUrl);
            } else {
              wx.showToast({ 
                title: '上传失败', 
                icon: 'none' 
              });
              that.setData({ uploading: false });
            }
          } catch (e) {
            console.error('解析响应失败:', e);
            wx.showToast({ 
              title: '上传失败', 
              icon: 'none' 
            });
            that.setData({ uploading: false });
          }
        },
        fail: function(err) {
          wx.hideLoading();
          console.error('上传失败:', err);
          wx.showToast({ 
            title: '上传失败', 
            icon: 'none' 
          });
          that.setData({ uploading: false });
        }
      });
    },
    fail: function(err) {
      console.log('选择图片失败', err);
    }
  });
},

// 删除已选择的图片（添加页面使用）
deleteImage: function() {
  var that = this;
  var imageUrl = that.data.tempImageUrl || that.data.bigImg;
  
  if (!imageUrl) {
    wx.showToast({
      title: '暂无图片可删除',
      icon: 'none'
    });
    return;
  }
  
  wx.showModal({
    title: '确认删除',
    content: '确定要删除这张图片吗？',
    success: function(res) {
      if (res.confirm) {
        wx.showLoading({
          title: '删除中...',
          mask: true
        });
        
        that.setData({ uploading: true });
        
        // 从URL中提取文件名
        const fileNameMatch = imageUrl.match(/\/([^/]+)$/);
        if (fileNameMatch && fileNameMatch[1]) {
          const fileName = fileNameMatch[1].split('.')[0];
          
          // 删除文件服务器上的图片
          wx.request({
            url: 'https://yhocn.cn:9097/file/delete',
            method: 'POST',
            data: {
              order_number: fileName,
              path: '/jinxiaocun/'
            },
            success: (delRes) => {
              console.log('图片删除结果:', delRes.data);
              
              // 清空图片数据
              that.setData({
                tempImageUrl: '',
                bigImg: '',
                uploading: false
              });
              
              wx.hideLoading();
              wx.showToast({
                title: '图片删除成功',
                icon: 'success'
              });
            },
            fail: (err) => {
              wx.hideLoading();
              console.error('删除图片失败:', err);
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              });
              that.setData({ uploading: false });
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '无效的图片地址',
            icon: 'none'
          });
          that.setData({ uploading: false });
        }
      }
    }
  });
},
  input: function(e) {

    var id = e.currentTarget.dataset.id
    var value = e.detail.value
    this.setData({
      [`value${id}`]: value
    })
    console.log(id)
    console.log(value)
    console.log([`value${id}`])
  },
  // querenxinjian: function() {
  //   var that = this;

  //   var value0 = that.data.value0
  //   var value1 = that.data.value1
  //   var value2 = that.data.value2
  //   var value3 = that.data.value3
  //   var value4 = that.data.value4
  //   var value5 = that.data.value5
  //   var bigImg = that.data.bigImg
  //   var finduser = app.globalData.finduser
  //   var gongsi = app.globalData.gongsi
  //   console.log(gongsi)
  //   console.log(finduser)
  //   console.log(value0)
  //   const db = wx.cloud.database();
  //   if(value0 == '' || value1 == '' || value2 == '' || value4 == ''){
  //     wx.showToast({
  //       title: '信息填写不全，请检查',
  //       icon:'none'
  //     })
  //     return;
  //   }
  //   var product_id = that.data.product_id
  //   for(var i=0; i<product_id.length; i++){
  //     if(product_id[i].sp_dm == value0){
  //       wx.showToast({
  //         title: '商品代码重复',
  //         'icon': 'none',
  //         duration: 3000
  //       })
  //       return;
  //     }
  //   }


  //   if(app.globalData.shujuku==0){

  //     wx.cloud.callFunction({
  //       name: "sqlConnection",
  //       data: {
  //         sql: "insert yh_jinxiaocun_jichuziliao (sp_dm,`name`,lei_bie,dan_wei,zh_name,gs_name,mark1) values('" + value0 + "','" + value1 + "','" + value4 + "','" + value2 + "','" + finduser + "','" + gongsi + "','" + bigImg + "')"
  //       },
  //       success(res) {
  //         console.log("成功", res)
  //         // 在返回结果中会包含新创建的记录的 _id
  //         wx.showToast({
  //           title: '新建成功',
  //           'icon': 'none',
  //           duration: 3000
  //         })
  //       },
  //       fail(res) {
  //         console.log("失败", res)
  
  //       }
  //     });

  //   }else if(app.globalData.shujuku == 1){

  //     wx.cloud.callFunction({
  //       name: "sqlServer_117",
  //       data: {
  //         query: "insert yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jichuziliao_mssql (sp_dm,[name],lei_bie,dan_wei,zh_name,gs_name,mark1) values('" + value0 + "','" + value1 + "','" + value4 + "','" + value2 + "','" + finduser + "','" + gongsi + "','" + bigImg + "')"
  //       },
  //       success(res) {
  //         console.log("成功", res)
  //         // 在返回结果中会包含新创建的记录的 _id
  //         wx.showToast({
  //           title: '新建成功',
  //           'icon': 'none',
  //           duration: 3000
  //         })
  //       },
  //       fail(res) {
  //         console.log("失败", res)
  
  //       }
  //     });
      
  //   }

    
  //   // db.collection('Yh_JinXiaoCun_chanpin').add({

  //   //   data: {
  //   //     finduser:finduser,
  //   //     gongsi:gongsi,
  //   //     bigImg: bigImg,
  //   //     value0: value0,
  //   //     value1: value1,
  //   //     value2: value2,
  //   //     value3: value3,
  //   //     value4: value4,
  //   //     value5: value5

  //   //   },
  //   //   success: res => {
  //   //     // 在返回结果中会包含新创建的记录的 _id
  //   //     wx.showToast({
  //   //       title: '新建成功',
  //   //       'icon': 'none',
  //   //       duration: 3000
  //   //     })

  //   //   }
  //   // })

  //   wx.navigateBack({
  //     // delta: 1 
  //   })
  // }

  querenxinjian: function() {
    var that = this;
  
    var value0 = that.data.value0
    var value1 = that.data.value1
    var value2 = that.data.value2
    var value3 = that.data.value3
    var value4 = that.data.value4
    var value5 = that.data.value5
    // 使用 bigImg 或 tempImageUrl
    var bigImg = that.data.bigImg || that.data.tempImageUrl || ''
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    
    console.log(gongsi)
    console.log(finduser)
    console.log(value0)
    
    // 表单验证
    if(value0 == '' || value1 == '' || value2 == '' || value4 == ''){
      wx.showToast({
        title: '信息填写不全，请检查',
        icon:'none'
      })
      return;
    }
    
    // 检查商品代码是否重复
    var product_id = that.data.product_id
    for(var i=0; i<product_id.length; i++){
      if(product_id[i].sp_dm == value0){
        wx.showToast({
          title: '商品代码重复',
          'icon': 'none',
          duration: 3000
        })
        return;
      }
    }
  
    // 显示加载中
    wx.showLoading({
      title: '保存中...',
      mask: true
    });
  
    if(app.globalData.shujuku==0){
      // MySQL版本
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "insert into yh_jinxiaocun_jichuziliao (sp_dm,`name`,lei_bie,dan_wei,zh_name,gs_name,mark1) values('" + value0 + "','" + value1 + "','" + value4 + "','" + value2 + "','" + finduser + "','" + gongsi + "','" + bigImg + "')"
        },
        success(res) {
          wx.hideLoading();
          console.log("成功", res)
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500);
        },
        fail(res) {
          wx.hideLoading();
          console.log("失败", res)
          wx.showToast({
            title: '新建失败',
            icon: 'none'
          })
        }
      });
  
    }else if(app.globalData.shujuku == 1){
      // SQL Server版本
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "insert into yh_jinxiaocun_excel.dbo.yh_jinxiaocun_jichuziliao_mssql (sp_dm,[name],lei_bie,dan_wei,zh_name,gs_name,mark1) values('" + value0 + "','" + value1 + "','" + value4 + "','" + value2 + "','" + finduser + "','" + gongsi + "','" + bigImg + "')"
        },
        success(res) {
          wx.hideLoading();
          console.log("成功", res)
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500);
        },
        fail(res) {
          wx.hideLoading();
          console.log("失败", res)
          wx.showToast({
            title: '新建失败',
            icon: 'none'
          })
        }
      });
    }
  },
})