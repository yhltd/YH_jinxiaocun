// package_ruilida/page/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xlShow2: false,
    cxShow: false,
    name:'',
    bianhao:'',
    list_check: [
      {
        name:'供应商编号',
        columnName: "bianhao",
        type: "text",
        width: "250rpx",
      },{
        name:'供应商名称',
        columnName: 'name',
        type: "text",
        width: "250rpx",
      },{
        name:'采购员',
        columnName: 'caigouyuan',
        type: "text",
        width: "250rpx",
      }
    ],
    all_result: ['供应商编号', '供应商名称', '采购员'],
    result: ['供应商编号', '供应商名称', '采购员'],
    gongneng_list:[
      {
        name:'查询'
      },{
        name:'刷新'
      },{
        name:'导出Excel'
      }
    ],
    quanxuan_value: true,
    file_type_list:[
      {name:'拍照或相册'},
      {name:'聊天文件'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    console.log(options)
    var userInfo = JSON.parse(options.userInfo)
    var type = options.type
    var id = options.id
    _this.setData({
      userInfo,
      type,
      mingxi_id: id
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  xiala_show: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    _this.setData({
      list_xiala: list,
      click_column:column,
    })
    console.log(list)
    _this.setData({
      xlShow2: true
    })
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      if(new_val == '拍照或相册'){
        _this.setData({
          xlShow2: false,
        })
        _this.img_upload()
      }else if(new_val == '聊天文件'){
        _this.setData({
          xlShow2: false,
        })
        _this.file_upload()
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },

  sel1:function(){
    var _this = this
    _this.tableShow()
  },

  tableShow: function () {
    var _this = this
    var sql = "select id,[file],file_name from file_upload where type = '" + _this.data.type + "' and file_id = '" + _this.data.mingxi_id + "'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list,
          num: list.length,
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

  file_dowload:function(e){
    var _this = this
    console.log(e.target.dataset.index)
    var index = e.target.dataset.index
    var file = _this.data.list[index].file
    wx.showModal({
      title: '提示',
      content: '确认查看此文件？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.downloadFile({  
            url: file, // 文件下载地址  
            success: function (res) {  
              console.log('下载成功', res);  
              // 可以根据需要进行后续处理，如保存到本地、显示下载文件等  
              var this_path = res.tempFilePath
              wx.openDocument({
                filePath: this_path,   // 装载对应文件的路径
                showMenu: true,       // 右上角的菜单转发分享操作
                success: function (res) {
                    console.log('打开成功');
                },
                fail: function (err) {
                    console.log('打开失败：', err);
                }
            })
            },  
            fail: function (res) {  
              console.log('下载失败', res);  
            }  
          });  
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })    
  },

  del1:function(e){
    var _this = this
    console.log(e.target.dataset.index)
    var index = e.target.dataset.index
    var id = _this.data.list[index].id
    wx.showModal({
      title: '提示',
      content: '确认删除此条文件？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var sql = "delete from file_upload where id=" + id 
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
              _this.sel1()
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
  //   var _this = this
  //   wx.chooseMessageFile({
  //     count: 1,
  //     type: 'file',
  //     success (res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       const tempFilePaths = res.tempFiles
  //       console.log(tempFilePaths)
  //       var base64 = wx.getFileSystemManager().readFileSync(tempFilePaths[0].path, "base64")
  //       var houzhui = getBase64Type(tempFilePaths[0].name.split('.')[tempFilePaths[0].name.split('.').length - 1])
  //       console.log(houzhui)
  //       if(houzhui == undefined){
  //         wx.showToast({
  //           title: '无法识别文件类型！',
  //           icon: 'none',
  //           duration: 3000
  //         })
  //         return;
  //       }
  //       base64 = houzhui + "," + base64
  //       console.log("insert into file_upload([file],file_name,type,file_id) values('" + base64 + "','" + tempFilePaths[0].name + "','" + _this.data.type + "','" + _this.data.mingxi_id  + "')")
  //       wx.cloud.callFunction({
  //         name: 'sqlserver_ruilida',
  //         data: {
  //           query: "insert into file_upload([file],file_name,type,file_id) values('" + base64 + "','" + tempFilePaths[0].name + "','" + _this.data.type + "','" + _this.data.mingxi_id  + "')"
  //         },
  //         success: res => {
  //           console.log(res)
  //           _this.tableShow()
  //           wx.showToast({
  //             title: '添加成功！',
  //             icon: 'none'
  //           })
  //         },
  //         err: res => {
  //           console.log("错误!")
  //         },
  //         fail: res => {
  //           console.log(res)
  //           wx.showToast({
  //             title: '请求失败！',
  //             icon: 'none'
  //           })
  //           console.log("请求失败！")
  //         }
  //       })
  //     }
  //   })
  // },

  file_upload: function () { 
    var _this = this
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success (res) {
        wx.showLoading({
          title: '保存图片',
        })
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles
        console.log(tempFilePaths)
        var name = tempFilePaths[0].name
        var type = _this.data.type
        var mingxi_id = _this.data.mingxi_id
        var new_id = 7
        var name_arr = name.split(".")
        var houzhui = name_arr[name_arr.length - 1]
        console.log(new_id + "." + houzhui)
        var sql = "insert into file_upload(file_name,type,file_id) output inserted.id values('" + name + "','" + type + "','" + mingxi_id + "')" 
        console.log(sql)
        wx.cloud.callFunction({
          name: 'sqlserver_ruilida',
          data: {
            query: sql
          },
          success: res => {
            console.log(res)
            var new_id = res.result.recordset[0].id
            var sql = "update file_upload set [file] = 'http://yhocn.cn:9088/ruilida/销售报价单/" + new_id + "." + houzhui + "' where id = " + new_id
            wx.cloud.callFunction({
              name: 'sqlserver_ruilida',
              data: {
                query: sql
              },
              success: res => {
                console.log(res)
                wx.getFileSystemManager().readFile({
                  filePath: tempFilePaths[0].path, //选择图片返回的相对路径
                  encoding: 'base64', //编码格式
                  success: res => { //成功的回调
                    console.log('data:image/png;base64,' + res.data)
                    var base64 = res.data
                    var fsm = wx.getFileSystemManager();
                    var buffer = wx.base64ToArrayBuffer(base64);
                    const fileName = wx.env.USER_DATA_PATH + '/' + new_id + "." + houzhui;
                    fsm.writeFileSync(fileName, buffer, 'binary');
                    console.log(fileName);
                    wx.uploadFile({
                      url: 'http://yhocn.cn:9087/file/upload',
                      header: { "Content-Type": "multipart/form-data" },
                      filePath: fileName,
                      name: 'file',
                      formData:{
                      name: new_id + "." + houzhui,
                      path: '/ruilida/' + type + "/",
                      kongjian: 999,
                      },
                      success(res){
                        wx.hideLoading()
                        console.log(res.data);
                        _this.tableShow()
                      }
                    })
                  }
                })
              },
              err: res => {
                wx.hideLoading()
                console.log("错误!")
              },
              fail: res => {
                wx.hideLoading()
                console.log(res)
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
            console.log(res)
            wx.showToast({
              title: '请求失败！',
              icon: 'none'
            })
            console.log("请求失败！")
          }
        })
      }
    })
  },


  img_upload: function () { 
    var _this = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success (res) {
        console.log("图片")
        console.log(res)
        console.log(res.tempFiles[0].tempFilePath)
        wx.showLoading({
          title: '保存图片',
        })
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0].tempFilePath
        console.log(tempFilePaths)
        var name_arr = tempFilePaths.split("/")
        var name = name_arr[name_arr.length - 1]
        var type = _this.data.type
        var mingxi_id = _this.data.mingxi_id
        var new_id = 7
        var name_arr = name.split(".")
        var houzhui = name_arr[name_arr.length - 1]
        var timestamp = Date.now();
        timestamp = String(timestamp);
        name = timestamp + "." + houzhui
        console.log(new_id + "." + houzhui)
        var sql = "insert into file_upload(file_name,type,file_id) output inserted.id values('" + name + "','" + type + "','" + mingxi_id + "')" 
        console.log(sql)
        wx.cloud.callFunction({
          name: 'sqlserver_ruilida',
          data: {
            query: sql
          },
          success: res => {
            console.log(res)
            var new_id = res.result.recordset[0].id
            var sql = "update file_upload set [file] = 'http://yhocn.cn:9088/ruilida/" + type + "/" + new_id + "." + houzhui + "' where id = " + new_id
            wx.cloud.callFunction({
              name: 'sqlserver_ruilida',
              data: {
                query: sql
              },
              success: res => {
                console.log(res)
                wx.getFileSystemManager().readFile({
                  filePath: tempFilePaths, //选择图片返回的相对路径
                  encoding: 'base64', //编码格式
                  success: res => { //成功的回调
                    console.log('data:image/png;base64,' + res.data)
                    var base64 = res.data
                    var fsm = wx.getFileSystemManager();
                    var buffer = wx.base64ToArrayBuffer(base64);
                    const fileName = wx.env.USER_DATA_PATH + '/' + new_id + "." + houzhui;
                    fsm.writeFileSync(fileName, buffer, 'binary');
                    console.log(fileName);
                    wx.uploadFile({
                      url: 'http://yhocn.cn:9087/file/upload',
                      header: { "Content-Type": "multipart/form-data" },
                      filePath: fileName,
                      name: 'file',
                      formData:{
                      name: new_id + "." + houzhui,
                      path: '/ruilida/' + type + "/",
                      kongjian: 999,
                      },
                      success(res){
                        wx.hideLoading()
                        console.log(res.data);
                        _this.tableShow()
                      }
                    })
                  }
                })
              },
              err: res => {
                wx.hideLoading()
                console.log("错误!")
              },
              fail: res => {
                wx.hideLoading()
                console.log(res)
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
            console.log(res)
            wx.showToast({
              title: '请求失败！',
              icon: 'none'
            })
            console.log("请求失败！")
          }
        })
      }
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
    _this.sel1()
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

function getBase64Type(type) {
  switch (type) {
      case 'txt':
          return 'data:text/plain;base64';
      case 'doc':
          return 'data:application/msword;base64';
      case 'docx':
          return 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64';
      case 'xls':
          return 'data:application/vnd.ms-excel;base64';
      case 'xlsx':
          return 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64';
      case 'pdf':
          return 'data:application/pdf;base64';
      case 'pptx':
          return 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64';
      case 'ppt':
          return 'data:application/vnd.ms-powerpoint;base64';
      case 'png':
          return 'data:image/png;base64';
      case 'jpg':
          return 'data:image/jpeg;base64';
      case 'gif':
          return 'data:image/gif;base64';
      case 'svg':
          return 'data:image/svg+xml;base64';
      case 'ico':
          return 'data:image/x-icon;base64';
      case 'bmp':
          return 'data:image/bmp;base64';
  }
}