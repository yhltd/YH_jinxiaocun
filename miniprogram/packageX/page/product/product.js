
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    tingyong_list:['是','否'],
    input_type: 'text',
    updatePicker: true,
    updateInput: false,
    newdata:"",
    list: [],
    list2: [],
    product_name:"",
    type: "",
    ckr: "",
    company: "",
    uname: "",
    sheetqx1:[],
    sheetqx2:[],
    empty: "",
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    type: [], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    tempImage1: "", // 临时存储图片1的base64
    tempImage2: "", // 临时存储图片2的base64
    tempImage3: "", // 临时存储图片3的base64
    tempEditImage: "", // 临时存储编辑时的图片
    isImageField: false, 
    isDeletingImage: false,  

      // 新增文件上传相关数据
  showUploadModal: false,      // 上传弹窗显示状态
  showFileViewModal: false,    // 文件查看弹窗显示状态
  selectedFiles: [],           // 已选择的文件列表
  currentRecordId: 0,          // 当前操作的记录ID
  currentRecordName: '',       // 当前记录的商品名称
  fileName: '',                // 用户输入的文件名
  uploading: false,            // 上传中状态
  uploadProgress: 0,           // 上传进度
  currentFileList: [],         // 当前查看的文件列表
  currentFileName: '',         // 当前查看的文件名
  
  // 临时存储图片字段名和索引
  currentImageField: '',
  currentImageIndex: 0,
  
  // 新增图片URL字段
  tempImageUrl1: '',
  tempImageUrl2: '',
  tempImageUrl3: '',
  tempEditImageUrl: '', // 编辑时临时存储图片URL
    
    getDate: function () {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1);
      var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
      return year + "-" + month + "-" + day
    },
  //   title: [{ text: "序号", width: "100rpx", columnName: "rownum", type: "digit",isupd: true},
  //           { text: "商品编码", width: "200rpx", columnName: "product_bianhao", type: "text",isupd: true},
  //           { text: "商品类别",width: "200rpx",columnName: "type",type: "text",isupd: true},
  //           { text: "商品名称", width: "200rpx", columnName: "product_name", type: "text", isupd: true},
  //           { text: "单位", width: "400rpx", columnName: "unit", type: "text", isupd: true},
  //           { text: "单价", width: "250rpx", columnName: "price", type: "text", isupd: true},
  //           { text: "成本", width: "250rpx", columnName: "chengben", type: "text", isupd: true},
  //           { text: "商品规格", width: "200rpx", columnName: "specifications", type: "text", isupd: true },
  //           { text: "保存方式", width: "200rpx", columnName: "practice", type: "text", isupd: true },
  //           { text: "是否停用", width: "200rpx", columnName: "tingyong", type: "text", isupd: true},
  //           ],

  //   title2: [{ text: "商品编码", width: "100rpx", columnName: "product_name", type: "digit", isupd: true },
  //             { text: "商品类别", width: "250rpx", columnName: "type", type: "text", isupd: true },
  //             { text: "商品名称", width: "200rpx", columnName: "product_name", type: "text", isupd: true },
  //             { text: "单位", width: "400rpx", columnName: "unit", type: "text", isupd: true },
  //             { text: "单价", width: "200rpx", columnName: "price", type: "number", isupd: true },
  //             { text: "成本", width: "200rpx", columnName: "chengben", type: "number", isupd: true },
  //             { text: "商品规格", width: "200rpx", columnName: "specifications", type: "text", isupd: true },
  //             { text: "保存方式", width: "200rpx", columnName: "practice", type: "text", isupd: true },
  //             { text: "是否停用", width: "200rpx", columnName: "tingyong", type: "text", isupd: true }
              
  //             ],
  //   input_hid: true,
  //   frmStudfind: true,
  //   mask_hid: true,
  //   addTable: true,
  //   handle: true,
  //   details:true,
  //   addTable2: true,
  //   input_hid2: true,
  //   handle2: true,
  //   handle3:true,
  // },
  title: [{ text: "序号", width: "100rpx", columnName: "rownum", type: "digit",isupd: true},
            { text: "商品编码", width: "300rpx", columnName: "product_bianhao", type: "text",isupd: true},
            { text: "商品类别",width: "200rpx",columnName: "type",type: "text",isupd: true},
            { text: "商品名称", width: "200rpx", columnName: "product_name", type: "text", isupd: true},
            { text: "单位", width: "200rpx", columnName: "unit", type: "text", isupd: true},
            { text: "单价", width: "250rpx", columnName: "price", type: "text", isupd: true},
            { text: "成本", width: "250rpx", columnName: "chengben", type: "text", isupd: true},
            { text: "商品规格", width: "200rpx", columnName: "specifications", type: "text", isupd: true },
            { text: "保存方式", width: "300rpx", columnName: "practice", type: "text", isupd: true },
            { text: "详情", width: "300rpx", columnName: "xiangqing", type: "text", isupd: true},
            { text: "图片1", width: "200rpx", columnName: "photo", type: "text", isupd: true},
            { text: "图片2", width: "200rpx", columnName: "photo1", type: "text", isupd: true },
            { text: "图片3", width: "200rpx", columnName: "photo2", type: "text", isupd: true },
            { text: "是否停用", width: "200rpx", columnName: "tingyong", type: "text", isupd: true},
            ],

    title2: [{ text: "商品编码", width: "100rpx", columnName: "product_bianhao", type: "digit", isupd: true },
              { text: "商品类别", width: "250rpx", columnName: "type", type: "text", isupd: true },
              { text: "商品名称", width: "200rpx", columnName: "product_name", type: "text", isupd: true },
              { text: "单位", width: "400rpx", columnName: "unit", type: "text", isupd: true },
              { text: "单价", width: "200rpx", columnName: "price", type: "number", isupd: true },
              { text: "成本", width: "200rpx", columnName: "chengben", type: "number", isupd: true },
              { text: "商品规格", width: "200rpx", columnName: "specifications", type: "text", isupd: true },
              { text: "保存方式", width: "200rpx", columnName: "practice", type: "text", isupd: true },
              { text: "详情", width: "300rpx", columnName: "xiangqing", type: "text", isupd: true},
              { text: "图片1", width: "200rpx", columnName: "photo", type: "text", isupd: true},
              { text: "图片2", width: "200rpx", columnName: "photo1", type: "text", isupd: true },
              { text: "图片3", width: "200rpx", columnName: "photo2", type: "text", isupd: true },
              { text: "是否停用", width: "200rpx", columnName: "tingyong", type: "text", isupd: true }
              
              ],
    input_hid: true,
    frmStudfind: true,
    mask_hid: true,
    addTable: true,
    handle: true,
    details:true,
    addTable2: true,
    input_hid2: true,
    handle2: true,
    handle3:true,
  },
  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var window_tingyong = _this.data.tingyong_list[e.detail.value]
    console.log(window_tingyong)
    _this.setData({
      // window_tingyong: window_tingyong,
      window_tingyong: _this.data.tingyong_list[e.detail.value]
    })
  },

  // clickView: function(e) {
  //   var _this = this;
  //   var dataset_input = e.currentTarget.dataset;
  //   console.log(dataset_input)
  //   if (!dataset_input.isupd) {
  //     return;
  //   }
  //   if (dataset_input.input_type=="date") {
  //     _this.setData({
  //       updatePicker: false,
  //       empty: dataset_input.value
  //     })
  //   }else{
  //     _this.setData({
  //       updatePicker: true,
  //       updateInput: false,
  //       empty: dataset_input.value
  //     })
  //   }
  //   if (dataset_input.column =="rownum") {
  //     _this.setData({
  //       dataset_input,
  //       handle: false,
  //       mask_hid: false,
  //     })
  //   }else{
    
  //   _this.setData({
  //     dataset_input,
  //     input_hid: false,
  //     mask_hid: false,
  //     input_type: e.currentTarget.dataset.input_type
  //   })
  //   }
  // },
  clickView: function(e) {
    var _this = this;
    var dataset_input = e.currentTarget.dataset;
    console.log(dataset_input)
    
    if (!dataset_input.isupd) {
      return;
    }
    
    // 判断是否为图片字段
    const isImageField = dataset_input.column === 'photo' || 
                        dataset_input.column === 'photo1' || 
                        dataset_input.column === 'photo2';
    
    // 对于图片字段，设置特殊处理
    if (isImageField) {
      _this.setData({
        dataset_input,
        input_hid: false,
        mask_hid: false,
        input_type: 'image',
        tempEditImageUrl: '', // 清空临时图片
        currentImageField: dataset_input.column, // 保存当前图片字段名
        currentImageIndex: dataset_input.index // 保存当前索引
      });
    } else if (dataset_input.column == "rownum") {
      _this.setData({
        dataset_input,
        handle: false,
        mask_hid: false,
      });
    } else {
      _this.setData({
        dataset_input,
        input_hid: false,
        mask_hid: false,
        updatePicker: dataset_input.input_type !== 'date',
        input_type: dataset_input.input_type
      });
    }
  },
  

  // clickView2: function (e) {
  //   var _this = this;
  //   var dataset_input = e.currentTarget.dataset;
  //   if (!dataset_input.isupd) {
  //     return;
  //   }
  //   if (dataset_input.column == "did") {
  //     _this.setData({
  //       dataset_input,
  //       input_hid2: true,
  //       handle2: false,
  //       mask_hid: false,
  //     })
  //   } else {
  //     if (_this.data.sheetqx2.Upd == "1" && dataset_input.column == "date_time") {
  //     _this.setData({
  //       dataset_input,
  //       updatePicker: false,
  //       input_hid2: false,
  //       handle2: true,
  //       mask_hid: false,
  //       input_type: e.currentTarget.dataset.input_type
  //     })
  //     } else if (_this.data.sheetqx2.Upd == "1" && dataset_input.column != "date_time"){
  //       _this.setData({
  //         dataset_input,
  //         updatePicker: true,
  //         input_hid2: false,
  //         handle2: true,
  //         mask_hid: false,
  //         input_type: e.currentTarget.dataset.input_type
  //       })
  //     }else{
  //       wx.showToast({
  //         title: '无权限',
  //         icon: 'none',
  //       })
  //     }
  //   }
  // },

  clickView2: function (e) {
    var _this = this;
    var dataset_input = e.currentTarget.dataset;
    
    if (!dataset_input.isupd) {
      return;
    }
    
    // 判断是否为图片字段
    const isImageField = dataset_input.column === 'photo' || 
                        dataset_input.column === 'photo1' || 
                        dataset_input.column === 'photo2';
    
    if (dataset_input.column == "did") {
      _this.setData({
        dataset_input,
        input_hid2: true,
        handle2: false,
        mask_hid: false,
      })
    } else {
      if (_this.data.sheetqx2.Upd == "1") {
        _this.setData({
          dataset_input,
          updatePicker: dataset_input.input_type === 'date',
          input_hid2: false,
          handle2: true,
          mask_hid: false,
          tempEditImage: "" // 初始化临时图片
        })
      } else {
        wx.showToast({
          title: '无权限',
          icon: 'none',
        })
      }
    }
  },

  // chooseImageForEdit: function() {
  //   var _this = this;
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function(res) {
  //       var tempFilePaths = res.tempFilePaths;
        
  //       // 将图片转换为base64（带前缀）
  //       wx.getFileSystemManager().readFile({
  //         filePath: tempFilePaths[0],
  //         encoding: 'base64',
  //         success: res => {
  //           _this.setData({
  //             tempEditImage: 'data:image/jpeg;base64,' + res.data
  //           });
  //           wx.showToast({
  //             title: '图片选择成功',
  //             icon: 'success'
  //           });
  //         },
  //         fail: err => {
  //           wx.showToast({
  //             title: '图片转换失败',
  //             icon: 'none'
  //           });
  //         }
  //       });
  //     },
  //     fail: function(err) {
  //       console.log('选择图片失败', err);
  //     }
  //   });
  // },
  
  

  xq_qx: function () {
    var _this = this;
    _this.setData({
      input_hid2: true,
      handle2: true,
      tempEditImage: "" // 清空临时图片
    })
  },

  gengduo_show:function(){
    var _this = this;
    _this.setData({
      mask_hid:false,
      handle3:false
    })
  },




  xiangqing: function(e) {
    var _this = this;
    if(_this.data.sheetqx2.Sel=="1"){
    _this.setData({
      details: false,
      mask_hid: false,
      handle:true
    })
    _this.init2()
    }else{
      wx.showToast({
        title: '无权限',
        icon: 'none',
      })
    }
  },

  sanchu:function() {
    var _this = this;
    var id = _this.data.list[_this.data.dataset_input.index].id;
    wx.showModal({
      title: "提示",
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          var sql = "delete from product where id = '" + id + "';";
          wx.cloud.callFunction({
            name: 'sqlserver_xinyongka',
            data: {
              sql: sql
            },
            success: res => {
              wx.showToast({
                title: "删除成功",
                icon: "none"
              })
              _this.setData({
                handle: true,
                mask_hid: true
              })
              _this.init()
            },
            err: res => {
              wx.showToast({
                title: "错误",
                icon: "none"
              })
            }
          })
          var sql = "delete from day_trading where id = '" + id + "'";
          wx.cloud.callFunction({
            name: 'sqlserver_xinyongka',
            data: {
              sql: sql
            }
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
  },

  sanchu2: function () {
    var _this = this;
    if (_this.data.sheetqx1.Del == "1") {
    var did = _this.data.list2[_this.data.dataset_input.index].did;
    wx.showModal({
      title: "提示",
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          var sql = "delete from day_trading where did = '" + did + "'";
          wx.cloud.callFunction({
            name: 'sqlserver_xinyongka',
            data: {
              sql: sql
            },
            success: res => {
              wx.showToast({
                title: "删除成功",
                icon: "none"

              })
              _this.hid_view()
            },
            err: res => {
              wx.showToast({
                title: "错误",
                icon: "none"
              })
            }
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
    } else {
      wx.showToast({
        title: '无权限',
        icon: 'none',
      })
    }
  },

  // changed: function (e) {
  //   var _this = this;
  //   var dataset = _this.data.dataset_input;
  //   var index = dataset.index;
  //   var id = _this.data.list[index].id
  //   var column = dataset.column;
  //   var value = dataset.value;
  //   var new_value = e.detail.value.new;
  //   if (!dataset.isupd) {
  //     return;
  //   }
  //   if (new_value != "" ){
  //     var sql = "update product set " + column + " = '" + new_value + "' where id = '" + _this.data.list[index].id + "';"
  //   wx.cloud.callFunction({
  //     name: 'sqlserver_xinyongka',
  //     data: {
  //       sql: sql
  //     },
  //     success: res => {
  //       wx.showToast({
  //         title: "修改成功",
  //         icon: "none"
  //       })
  //       _this.setData({
  //         input_hid: false,
  //         mask_hid: false,
  //         input_type: e.currentTarget.dataset.input_type,
  //         ["list[" + index + "]." + column]: new_value,
  //         new: ""
  //       })
  //       _this.hid_view()
  //     },
  //     err: res => {
  //       wx.showToast({
  //         title: "错误",
  //         icon: "none"
  //       })
  //     }
  //   })
  //     }else{
  //     wx.showToast({
  //       title: "不能为空！",
  //       icon: "none"
  //     })
  //     }
  // },
  // changed: function (e) {
  //   var _this = this;
  //   var dataset = _this.data.dataset_input;
  //   var index = dataset.index;
  //   var id = _this.data.list[index].id
  //   var column = dataset.column;
    
  //   // 判断是否为图片字段
  //   const isImageField = column === 'photo' || column === 'photo1' || column === 'photo2';
    
  //   var new_value;
    
  //   if (isImageField) {
  //     // 图片字段：使用临时图片数据，并移除前缀只存储纯base64
  //     new_value = _this.data.tempEditImage ? _this.data.tempEditImage.replace('data:image/jpeg;base64,', '') : '';
  //   } else {
  //     // 其他字段：使用表单数据
  //     new_value = e.detail.value.new;
  //   }
    
  //   if (!dataset.isupd) {
  //     return;
  //   }
    
  //   if (new_value != "" ){
  //     var sql = "update product set " + column + " = '" + new_value + "' where id = '" + id + "';"
  //     wx.cloud.callFunction({
  //       name: 'sqlserver_xinyongka',
  //       data: {
  //         sql: sql
  //       },
  //       success: res => {
  //         wx.showToast({
  //           title: "修改成功",
  //           icon: "success"
  //         })
  //         _this.setData({
  //           input_hid: false,
  //           mask_hid: false,
  //           ["list[" + index + "]." + column]: isImageField ? new_value : new_value,
  //           new: "",
  //           tempEditImage: "" // 清空临时图片
  //         })
  //         _this.hid_view()
  //       },
  //       err: res => {
  //         wx.showToast({
  //           title: "错误",
  //           icon: "none"
  //         })
  //       }
  //     })
  //   } else {
  //     wx.showToast({
  //       title: "不能为空！",
  //       icon: "none"
  //     })
  //   }
  // },

  changed: function (e) {
    var _this = this;
    var dataset = _this.data.dataset_input;
    var index = dataset.index;
    var id = _this.data.list[index].id
    var column = dataset.column;
    
    // 判断是否为图片字段
    const isImageField = column === 'photo' || column === 'photo1' || column === 'photo2';
    
    var new_value;
    
    if (isImageField) {
      // 图片字段：使用临时图片URL，如果没有新图片则使用原值
      new_value = _this.data.tempEditImageUrl || dataset.value;
    } else {
      // 其他字段：使用表单数据
      new_value = e.detail.value.new;
      
      // 如果新值为空，则使用原值
      if (!new_value) {
        new_value = dataset.value;
      }
    }
    
    if (!dataset.isupd) {
      return;
    }
    
    // 显示加载中
    wx.showLoading({
      title: '保存中...',
      mask: true
    });
    
    var sql = "update product set " + column + " = '" + new_value + "' where id = '" + id + "';"
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: "修改成功",
          icon: "success"
        });
        
        // 更新本地数据
        _this.setData({
          ["list[" + index + "]." + column]: new_value,
          tempEditImageUrl: "", // 清空临时图片
          input_hid: true,
          mask_hid: true,
          isDeletingImage: false
        });
        
        _this.hid_view();
      },
      fail: err => {
        wx.hideLoading();
        console.error('修改失败:', err);
        wx.showToast({
          title: "修改失败",
          icon: "none"
        });
        _this.setData({ isDeletingImage: false });
      }
    });
  },



  // changed2: function (e) {
  //   var _this = this;
  //   var dataset = _this.data.dataset_input;
  //   var id = dataset.id;
  //   var column = dataset.column;
  //   var value = dataset.value;
  //   var index = dataset.index;
  //   var new_value = e.detail.value.new;
  //   if (!dataset.isupd) {
  //     return;
  //   }
  //   if (new_value!=""){
  //   var sql = "update day_trading set " + column + " = '" + new_value + "' where did = '" + _this.data.list2[index].did + "';"
  //   wx.cloud.callFunction({
  //     name: 'sqlserver_xinyongka',
  //     data: {
  //       sql: sql
  //     },
  //     success: res => {
  //       wx.showToast({
  //         title: "修改成功",
  //         icon: "none"
  //       })
  //       _this.setData({
  //         input_hid: false,
  //         mask_hid: false,
  //         input_type: e.currentTarget.dataset.input_type,
  //         ["list2[" + index + "]." + column]: new_value
  //       })
  //       _this.hid_view()
  //     },
  //     err: res => {
  //       wx.showToast({
  //         title: "错误",
  //         icon: "none"
  //       })
  //     }
  //   })
  //   }else{
  //     wx.showToast({
  //       title: "不能为空！",
  //       icon: "none"
  //     })
  //   }
  // },
 
  changed2: function (e) {
    var _this = this;
    var dataset = _this.data.dataset_input;
    var column = dataset.column;
    var index = dataset.index;
    
    // 判断是否为图片字段
    const isImageField = column === 'photo' || column === 'photo1' || column === 'photo2' || column === 'photo3';
    
    var new_value;
    
    if (isImageField) {
      // 图片字段：使用临时图片数据，并移除前缀只存储纯base64
      new_value = _this.data.tempEditImage ? _this.data.tempEditImage.replace('data:image/jpeg;base64,', '') : '';
    } else {
      // 其他字段：使用表单数据
      new_value = e.detail.value.new;
    }
    
    if (!dataset.isupd) {
      return;
    }
    
    if (new_value !== "" && new_value !== undefined) {
      var sql = "update day_trading set " + column + " = '" + new_value + "' where did = '" + _this.data.list2[index].did + "';"
      
      wx.cloud.callFunction({
        name: 'sqlserver_xinyongka',
        data: {
          sql: sql
        },
        success: res => {
          wx.showToast({
            title: "修改成功",
            icon: "success"
          })
          _this.setData({
            input_hid2: true,
            mask_hid: true,
            ["list2[" + index + "]." + column]: isImageField ? new_value : new_value, // 存储纯base64
            tempEditImage: "" // 清空临时图片
          })
        },
        fail: res => {
          wx.showToast({
            title: "修改失败",
            icon: "none"
          })
        }
      })
    } else {
      wx.showToast({
        title: "不能为空！",
        icon: "none"
      })
    }
  },
  
  // 图片加载错误处理
  onImageError: function(e) {
    console.log('图片加载失败:', e);
    wx.showToast({
      title: '图片加载失败',
      icon: 'none'
    });
  },
  

  choiceDate: function(e){
    //e.preventDefault(); 
    this.setData({
      [e.currentTarget.dataset.column_name]: e.detail.value
    })
  },


  choiceDate: function(e){
    //e.preventDefault(); 
    this.setData({
      [e.currentTarget.dataset.column_name]: e.detail.value
    })
  },

  inquire: function() {
    var _this = this;
    _this.setData({
      frmStudfind: false,
      mask_hid: false,
    })
  },


  entering: function() {
    var _this = this;
    _this.setData({
      addTable: false,
      mask_hid: false,
    })
  },


  luru: function () {
    var _this = this;
    _this.setData({
      addTable2: false,
      mask_hid: false,
    })
  },

  inquire_QX: function() {
    var _this = this;
    _this.hid_view();
  },


  hid_view: function() {
    var _this = this;
    _this.setData({
      input_hid: true,
      frmStudfind: true,
      mask_hid: true,
      addTable: true,
      handle: true,
      details: true,
      addTable2: true,
      input_hid2: true,
      handle2: true,
      handle3: true,
      tempImageUrl1: "",
      tempImageUrl2: "",
      tempImageUrl3: "",
      tempEditImageUrl: "",
      currentImageField: "",
      currentImageIndex: 0,
      empty: "",
      zdr: "",
      hkr: ""
    });
  },

  save: function(e) {
    var _this = this;
    _this.setData({
      product_name: e.detail.value.product_name,
      type: e.detail.value.type,
    })
    _this.init();
    _this.setData({
      frmStudfind: true,
      mask_hid: true,
      empty:"",
      zdr:"",
      hkr:""
    })
  },

  // add: function(e) {
  //   var _this = this;
  
  //   if (e.detail.value.product_bianhao !="" && e.detail.value.type != "" && e.detail.value.product_name != "" && e.detail.value.unit != "" && e.detail.value.price != "" && e.detail.value.chengben != "" && e.detail.value.specifications != "" && e.detail.value.practice != "" && e.detail.value.tingyong != "" ){
  //   let sql = "insert into product(company,product_bianhao,type,product_name,unit,price,chengben,specifications,practice,tingyong) values('" + _this.data.company + "','" +
  //     e.detail.value.product_bianhao + "','" + e.detail.value.type + "','" + e.detail.value.product_name + "','" +
  //     e.detail.value.unit + "','" + e.detail.value.price + "','" + e.detail.value.chengben + "','" + e.detail.value.specifications + "','" + e.detail.value.practice + "','" + e.detail.value.tingyong + "')"
  //     console.log(sql)
  //   wx.cloud.callFunction({
  //     name: 'sqlserver_xinyongka',
  //     data: {
  //       sql: sql
  //     },
  //     success: res => {
  //       wx.showToast({
  //         title: "添加成功！",
  //         icon: "none"
  //       })
  //       _this.init();
  //       _this.setData({
  //         addTable: true,
  //         mask_hid: true,
  //         empty:"",
  //         zdr:"",
  //         hkr:""
  //       })
  //     },
  //     error: res => {
  //       console.log(res)
  //     },
  //     fail: res => {
  //       console.log(res)
  //     }
  //   })
  //   }else{
  //     wx.showToast({
  //       title: "前六项不能为空！",
  //       icon:"none"
  //     })
  //   }
  // },

  add: function(e) {
    var _this = this;
    
    if (e.detail.value.product_bianhao !="" && e.detail.value.type != "" && e.detail.value.product_name != "" && e.detail.value.unit != "" && e.detail.value.price != "" && e.detail.value.chengben != "" && e.detail.value.specifications != "" && e.detail.value.practice != "" && e.detail.value.tingyong != "" ){
      
      // 修正字段映射
      let sql = "insert into product(company,product_bianhao,type,product_name,unit,price,chengben,specifications,practice,xiangqing,photo,photo1,photo2,tingyong) values('" + _this.data.company + "','" +
        e.detail.value.product_bianhao + "','" + e.detail.value.type + "','" + e.detail.value.product_name + "','" +
        e.detail.value.unit + "','" + e.detail.value.price + "','" + e.detail.value.chengben + "','" + 
        e.detail.value.specifications + "','" + e.detail.value.practice + "','" + 
        (e.detail.value.xiangqing || '') + "','" + 
        (_this.data.tempImageUrl1 || '') + "','" +  // 改为 tempImageUrl1
        (_this.data.tempImageUrl2 || '') + "','" +  // 改为 tempImageUrl2
        (_this.data.tempImageUrl3 || '') + "','" +  // 改为 tempImageUrl3
        e.detail.value.tingyong + "')"
      
      console.log('执行的SQL:', sql)
      
      wx.cloud.callFunction({
        name: 'sqlserver_xinyongka',
        data: {
          sql: sql
        },
        success: res => {
          console.log('云函数完整返回:', res);
          
          if (res.result && (res.result.affectedRows > 0 || res.result.insertId > 0)) {
            wx.showToast({
              title: "添加成功！",
              icon: "success",
              duration: 2000
            });
            
            setTimeout(() => {
              _this.init();
              _this.setData({
                addTable: true,
                mask_hid: true,
                empty: "",
                tempImage1: "",
                tempImage2: "",
                tempImage3: "",
                window_tingyong: ""
              });
            }, 1500);
            
          } else {
            wx.showToast({
              title: "添加失败，未影响数据行",
              icon: "none"
            });
          }
        },
        error: res => {
          console.log('error:', res);
          wx.showToast({
            title: "添加失败",
            icon: "none"
          });
        },
        fail: err => {
          console.log('fail:', err);
          wx.showToast({
            title: "网络错误",
            icon: "none"
          });
        }
      });
    } else {
      wx.showToast({
        title: "前六项不能为空！",
        icon: "none"
      });
    }
  },
  

  // 在关闭表单时清空临时图片数据
  inquire_QX: function() {
    var _this = this;
    _this.setData({
      tempImage1: "",
      tempImage2: "",
      tempImage3: ""
    })
    _this.hid_view();
  },
  sanchu: function() {
    var _this = this;
    var id = _this.data.list[_this.data.dataset_input.index].id;
    var item = _this.data.list[_this.data.dataset_input.index];
    
    wx.showModal({
      title: "提示",
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
            mask: true
          });
          
          // 先删除所有关联的图片
          const imageFields = ['photo', 'photo1', 'photo2'];
          const deletePromises = [];
          
          imageFields.forEach(field => {
            const imageUrl = item[field];
            if (imageUrl && imageUrl.includes('yhocn.cn:9088')) {
              const fileNameMatch = imageUrl.match(/\/([^/]+)$/);
              if (fileNameMatch && fileNameMatch[1]) {
                const fileName = fileNameMatch[1].split('.')[0];
                
                const promise = new Promise((resolve) => {
                  wx.request({
                    url: 'https://yhocn.cn:9097/file/delete',
                    method: 'POST',
                    data: {
                      order_number: fileName,
                      path: '/mendian/'
                    },
                    complete: resolve
                  });
                });
                deletePromises.push(promise);
              }
            }
          });
          
          // 等待所有图片删除完成（或超时）
          Promise.all(deletePromises).finally(() => {
            // 删除数据库记录
            var sql = "delete from product where id = '" + id + "';";
            wx.cloud.callFunction({
              name: 'sqlserver_xinyongka',
              data: {
                sql: sql
              },
              success: res => {
                wx.hideLoading();
                wx.showToast({
                  title: "删除成功",
                  icon: "success"
                });
                _this.setData({
                  handle: true,
                  mask_hid: true
                });
                _this.init();
              },
              fail: err => {
                wx.hideLoading();
                console.error('删除失败:', err);
                wx.showToast({
                  title: "删除失败",
                  icon: "none"
                });
              }
            });
          });
        }
      }
    });
  },

  add2: function (e) {
    if (e.detail.value.yhje != "" && e.detail.value.sh != "" && e.detail.value.ske != "" && e.detail.value.fl != "" && e.detail.value.dzje != "" && e.detail.value.jcsxf != "" && e.detail.value.qtsxf != "" ){
    var _this = this;
    var id = _this.data.list[_this.data.dataset_input.index].id;
    var now_time = _this.data.getDate();
    let sql = "insert into day_trading(id,date_time,repayment,commercial_tenant,swipe,rate,arrival_amount,basics_service_charge,other_service_charge,gongsi) values('" + id + "','" +
      now_time + "','" + e.detail.value.yhje + "','" + e.detail.value.sh + "','" +
      e.detail.value.ske + "','" + e.detail.value.fl + "','" +
      e.detail.value.dzje + "','" + e.detail.value.jcsxf + "','" + e.detail.value.qtsxf + "','" + _this.data.gongsi + "')"
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        wx.showToast({
          title: "添加成功！",
          icon: "none"
        })
      },
      error: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
    _this.hid_view();
    _this.setData({
      addTable2: true,
      mask_hid: true,
      empty:"",
      zdr:"",
      hkr:""
    })
    }else{
      wx.showToast({
        title: "必填项不能为空！",
        icon: "none"
      })
    }
  },



  // init: function() {
  //   var _this = this;
  //   let sql = "select * from product where product_name like '%" + _this.data.product_name + "%' and type like '%" + _this.data.type + "%' and company='"+ _this.data.company +"'"
  //   console.log(sql)
  //   wx.cloud.callFunction({
  //     name: 'sqlserver_xinyongka',
  //     data: {
  //       sql: sql
  //     },
  //     success: res => {
  //       console.log("select-success", res)
  //       _this.setData({
  //         list: res.result,
  //         product_name: "",
  //         type: "",
  //       })
  //     },
  //     fail: res=> {
  //       console.log("select-fail",res)
  //     }
  //   })
  // },
  // init: function() {
  //   var _this = this;
  //   let sql = "select * from product where product_name like '%" + _this.data.product_name + "%' and type like '%" + _this.data.type + "%' and company='"+ _this.data.company +"'"
  //   console.log(sql)
  //   wx.cloud.callFunction({
  //     name: 'sqlserver_xinyongka',
  //     data: {
  //       sql: sql
  //     },
  //     success: res => {
  //       console.log("select-success", res)
  
  //       // 处理图片数据
  //       const processedList = res.result.map(item => {
  //         // 清理 base64 前缀，只保留纯 base64 数据
  //         const processPhoto = (photo) => {
  //           if (!photo) return photo;
  //           if (photo.includes('base64,')) {
  //             return photo.split('base64,')[1];
  //           }
  //           return photo;
  //         };
  
  //         return {
  //           ...item,
  //           photo: processPhoto(item.photo),
  //           photo1: processPhoto(item.photo1),
  //           photo2: processPhoto(item.photo2)
  //         };
  //       });
  
  //       _this.setData({
  //         list: processedList,  // 使用处理后的数据
  //         product_name: "",
  //         type: "",
  //       })
  //     },
  //     fail: res=> {
  //       console.log("select-fail",res)
  //     }
  //   })
  // },
  init: function() {
    var _this = this;
    let sql = "select * from product where product_name like '%" + _this.data.product_name + "%' and type like '%" + _this.data.type + "%' and company='"+ _this.data.company +"'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        console.log("select-success", res)
        
        // 图片已经是URL，不需要额外处理
        const processedList = res.result.map(item => {
          return {
            ...item
            // 图片字段直接使用数据库中的URL
          };
        });
  
        _this.setData({
          list: processedList,
          product_name: "",
          type: "",
        })
      },
      fail: res=> {
        console.log("select-fail",res)
      }
    })
  },
    init2: function () {
      var _this = this;
      var id = _this.data.list[_this.data.dataset_input.index].id;
      let sql = "select * from day_trading right join customer on customer.id = day_trading.id where customer.id='" + id + "' and day_trading.gongsi='" + _this.data.gongsi +"'"
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlserver_xinyongka',
        data: {
          sql: sql
        },
        success: res => {
          console.log("select-success", res)
          _this.setData({
            list2: res.result,
            skr: "",
            fkr: "",
            ckr: "",
          })
        },
        fail: res => {
          console.log("select-fail", res)
        }
      })
    },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var userInfo = JSON.parse(options.userInfo)
     _this.setData({
       company: userInfo.company,
       uname: userInfo.uname,
     })
    console.log(userInfo)
    _this.init();
  },

  choice_checkBox: function(e) {
    var _this = this;
    var value = e.detail.value
    var index = e.currentTarget.dataset.index;
    var checkItems = _this.data.checkItems;
    if (value != "") {
      checkItems.push(index)
    } else {
      for (let i = 0; i < checkItems.length; i++) {
        if (checkItems[i] == index) {
          checkItems.splice(i, 1)
        }
      }
    }
    _this.setData({
      checkItems
    })
  },

  use_book:function(){
    wx.showModal({
      title: '使用说明',
      content: '1.点击查询按钮，输入条件点击确定即可查询。\n2.点击录入按钮，输入内容点击确定即可录入。\n3.点击序号，在弹出的窗口点击删除按钮即可删除。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  // get_excel: function () {
  //   var _this = this;
  //   wx.showLoading({
  //     title: '打开Excel中',
  //     mask: 'true'
  //   })
  //   var list = _this.data.list;
  //   var title = [{ text: "序号", width: "100rpx", columnName: "id", type: "digit", isupd: true },
  //   { text: "商品编码", width: "250rpx", columnName: "product_bianhao", type: "text", isupd: true },
  //   { text: "商品类别", width: "200rpx", columnName: "type", type: "text", isupd: true },
  //   { text: "商品名称", width: "400rpx", columnName: "product_name", type: "text", isupd: true },
  //   { text: "单位", width: "200rpx", columnName: "unit", type: "text", isupd: true },
  //   { text: "单价", width: "200rpx", columnName: "price", type: "number", isupd: true },
  //   { text: "成本", width: "200rpx", columnName: "chengben", type: "number", isupd: true },
  //   { text: "商品规格", width: "200rpx", columnName: "specifications", type: "text", isupd: true },
  //   { text: "保存方式", width: "200rpx", columnName: "practice", type: "text", isupd: true },
  //   { text: "是否停用", width: "200rpx", columnName: "tingyong", type: "text", isupd: true },
    
  //   ]
  //   var cloudList = {
  //     name: '商品设置',
  //     items: [],
  //     header: []
  //   }

  //   for (let i = 0; i < title.length; i++) {
  //     cloudList.header.push({
  //       item: title[i].text,
  //       type: title[i].type,
  //       width: parseInt(title[i].width.split("r")[0]) / 6,
  //       columnName: title[i].columnName
  //     })
  //   }
  //   cloudList.items = list
  //   console.log(cloudList)

  //   wx.cloud.callFunction({
  //     name: 'getExcel',
  //     data: {
  //       list: cloudList
  //     },
  //     success: function (res) {
  //       console.log("获取云储存id")
  //       wx.cloud.downloadFile({
  //         fileID: res.result.fileID,
  //         success: res => {
  //           console.log("获取临时路径")
  //           wx.hideLoading({
  //             success: (res) => {},
  //           })
  //           console.log(res.tempFilePath)
  //           wx.openDocument({
  //             filePath: res.tempFilePath,
  //             showMenu: 'true',
  //             fileType: 'xlsx',
  //             success: res => {
  //               console.log("打开Excel")
  //             }
  //           })
  //         }
  //       })
  //     },
  //     fail: res => {
  //       console.log(res)
  //     }
  //   })
  // },

  getExcel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title2

    // var title = [
    // { text: "商品编码", width: "250rpx", columnName: "product_bianhao", type: "text", isupd: true },
    // { text: "商品类别", width: "200rpx", columnName: "type", type: "text", isupd: true },
    // { text: "商品名称", width: "400rpx", columnName: "product_name", type: "text", isupd: true },
    // { text: "单位", width: "200rpx", columnName: "unit", type: "text", isupd: true },
    // { text: "单价", width: "200rpx", columnName: "price", type: "number", isupd: true },
    // { text: "成本", width: "200rpx", columnName: "chengben", type: "number", isupd: true },
    // { text: "商品规格", width: "200rpx", columnName: "specifications", type: "text", isupd: true },
    // { text: "保存方式", width: "200rpx", columnName: "practice", type: "text", isupd: true },
    // { text: "是否停用", width: "200rpx", columnName: "tingyong", type: "text", isupd: true },
    // ]
    var cloudList = {
      name: '商品设置',
      items: [],
      header: [],
    }

    for (let i = 0; i < title.length; i++) {
      cloudList.header.push({
        item: title[i].text,
        type: title[i].type,
        width: parseInt(title[i].width.split("r")[0]) / 6,
        columnName: title[i].columnName
      })
    }
    cloudList.items = list
    for (let j = 0; j < list.length; j++) {
      list[j].photo=""
    }
    console.log(cloudList)

    wx.cloud.callFunction({
      name: 'getExcel',
      data: {
        list: cloudList
      },
      success: function (res) {
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu: 'true',
              fileType: 'xlsx',
              success: res => {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail: res => {
        console.log(res)
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
// chooseImage1: function() { this.chooseImage('tempImage1'); },
// chooseImage2: function() { this.chooseImage('tempImage2'); },
// chooseImage3: function() { this.chooseImage('tempImage3'); },

chooseImage1: function() { this.chooseAndUploadImage('tempImageUrl1', 1); },
chooseImage2: function() { this.chooseAndUploadImage('tempImageUrl2', 2); },
chooseImage3: function() { this.chooseAndUploadImage('tempImageUrl3', 3); },

// 新增：选择并上传图片
chooseAndUploadImage: function(imageKey, imageIndex) {
  const _this = this;
  
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
          path: '/mendian/',
          kongjian: '3',
          fileType: fileExtension
        },
        header: { 'Content-Type': 'multipart/form-data' },
        success: function(uploadRes) {
          wx.hideLoading();
          try {
            var resData = JSON.parse(uploadRes.data);
            if (resData.code === 200 || resData.success) {
              var fileUrl = "http://yhocn.cn:9088/mendian/" + fileName;
              
              _this.setData({ 
                [imageKey]: fileUrl 
              });
              
              wx.showToast({ 
                title: '上传成功', 
                icon: 'success' 
              });
            } else {
              wx.showToast({ 
                title: '上传失败', 
                icon: 'none' 
              });
            }
          } catch (e) {
            console.error('解析响应失败:', e);
            wx.showToast({ 
              title: '上传失败', 
              icon: 'none' 
            });
          }
        },
        fail: function(err) {
          wx.hideLoading();
          console.error('上传失败:', err);
          wx.showToast({ 
            title: '上传失败', 
            icon: 'none' 
          });
        }
      });
    },
    fail: function(err) {
      console.log('选择图片失败', err);
    }
  });
},

// 编辑时选择图片
chooseImageForEdit: function() {
  var _this = this;
  
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: function(res) {
      const tempFilePath = res.tempFilePaths[0];
      
      wx.showLoading({
        title: '上传中...',
        mask: true
      });
      
      // 获取当前旧图片URL
      const oldImageUrl = _this.data.dataset_input.value;
      
      // 生成文件名
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000);
      const fileExtension = tempFilePath.split('.').pop() || 'jpg';
      const fileName = `${timestamp}_${random}.${fileExtension}`;
      
      // 先删除旧图片（如果有）
      const deleteOldImage = () => {
        return new Promise((resolve) => {
          if (oldImageUrl && oldImageUrl.includes('yhocn.cn:9088')) {
            // 从URL中提取文件名
            const fileNameMatch = oldImageUrl.match(/\/([^/]+)$/);
            if (fileNameMatch && fileNameMatch[1]) {
              const oldFileName = fileNameMatch[1].split('.')[0];
              
              wx.request({
                url: 'https://yhocn.cn:9097/file/delete',
                method: 'POST',
                data: {
                  order_number: oldFileName,
                  path: '/mendian/'
                },
                success: (delRes) => {
                  console.log('旧图片删除结果:', delRes.data);
                  resolve();
                },
                fail: (err) => {
                  console.error('删除旧图片失败:', err);
                  resolve(); // 即使删除失败也继续上传
                }
              });
            } else {
              resolve();
            }
          } else {
            resolve();
          }
        });
      };
      
      // 删除旧图片后上传新图片
      deleteOldImage().then(() => {
        // 上传新文件
        wx.uploadFile({
          url: 'https://yhocn.cn:9097/file/upload',
          filePath: tempFilePath,
          name: 'file',
          formData: {
            name: fileName,
            path: '/mendian/',
            kongjian: '3',
            fileType: fileExtension
          },
          header: { 'Content-Type': 'multipart/form-data' },
          success: function(uploadRes) {
            wx.hideLoading();
            try {
              var resData = JSON.parse(uploadRes.data);
              if (resData.code === 200 || resData.success) {
                var fileUrl = "http://yhocn.cn:9088/mendian/" + fileName;
                
                _this.setData({
                  tempEditImageUrl: fileUrl
                });
                
                wx.showToast({
                  title: '上传成功',
                  icon: 'success'
                });
              } else {
                wx.showToast({
                  title: '上传失败',
                  icon: 'none'
                });
              }
            } catch (e) {
              console.error('解析响应失败:', e);
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              });
            }
          },
          fail: function(err) {
            wx.hideLoading();
            console.error('上传失败:', err);
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            });
          }
        });
      });
    },
    fail: function(err) {
      console.log('选择图片失败', err);
    }
  });
},

// 单独删除图片（不替换，只删除）
deleteImageOnly: function() {
  var _this = this;
  var dataset = _this.data.dataset_input;
  var index = dataset.index;
  var id = _this.data.list[index].id;
  var column = dataset.column;
  var oldImageUrl = dataset.value;
  
  if (!oldImageUrl) {
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
        
        _this.setData({ isDeletingImage: true });
        
        // 从URL中提取文件名
        const fileNameMatch = oldImageUrl.match(/\/([^/]+)$/);
        if (fileNameMatch && fileNameMatch[1]) {
          const fileName = fileNameMatch[1].split('.')[0];
          
          // 先删除文件服务器上的图片
          wx.request({
            url: 'https://yhocn.cn:9097/file/delete',
            method: 'POST',
            data: {
              order_number: fileName,
              path: '/mendian/'
            },
            success: (delRes) => {
              console.log('图片删除结果:', delRes.data);
              
              // 更新数据库，将图片字段置为空
              var sql = "update product set " + column + " = '' where id = '" + id + "';"
              
              wx.cloud.callFunction({
                name: 'sqlserver_xinyongka',
                data: {
                  sql: sql
                },
                success: res => {
                  wx.hideLoading();
                  wx.showToast({
                    title: "图片删除成功",
                    icon: "success"
                  });
                  
                  // 更新本地数据
                  _this.setData({
                    ["list[" + index + "]." + column]: '',
                    input_hid: true,
                    mask_hid: true,
                    isDeletingImage: false,
                    tempEditImageUrl: ''
                  });
                  
                  _this.hid_view();
                },
                fail: err => {
                  wx.hideLoading();
                  console.error('数据库更新失败:', err);
                  wx.showToast({
                    title: "删除失败",
                    icon: "none"
                  });
                  _this.setData({ isDeletingImage: false });
                }
              });
            },
            fail: (err) => {
              wx.hideLoading();
              console.error('删除文件失败:', err);
              wx.showToast({
                title: '文件删除失败',
                icon: 'none'
              });
              _this.setData({ isDeletingImage: false });
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '无效的图片地址',
            icon: 'none'
          });
          _this.setData({ isDeletingImage: false });
        }
      }
    }
  });
},

// 修复压缩版本
chooseImage: function(imageKey) {
  const _this = this;
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: res => {
      const tempFilePath = res.tempFilePaths[0];
      
      // 先检查文件大小
      wx.getFileInfo({
        filePath: tempFilePath,
        success: fileInfo => {
          console.log('原图大小:', fileInfo.size);
          
          if (fileInfo.size > 2 * 1024 * 1024) {
            wx.showToast({ 
              title: '图片需小于2MB', 
              icon: 'none' 
            });
            return;
          }
          
          // 如果图片小于500KB，直接使用；否则压缩
          if (fileInfo.size < 500 * 1024) {
            _this.convertToBase64(tempFilePath, imageKey);
          } else {
            _this.compressImage(tempFilePath, imageKey);
          }
        },
        fail: err => {
          console.error('获取文件信息失败:', err);
          _this.convertToBase64(tempFilePath, imageKey);
        }
      });
    }
  });
},

// 转换为base64
convertToBase64: function(filePath, imageKey) {
  const _this = this;
  wx.getFileSystemManager().readFile({
    filePath: filePath,
    encoding: 'base64',
    success: res => {
      const base64Data = res.data;
      console.log('base64数据长度:', base64Data.length);
      
      _this.setData({ 
        [imageKey]: 'data:image/jpeg;base64,' + base64Data 
      });
      wx.showToast({ 
        title: '图片选择成功', 
        icon: 'success' 
      });
    },
    fail: err => {
      console.error('转换为base64失败:', err);
      wx.showToast({ 
        title: '图片处理失败', 
        icon: 'none' 
      });
    }
  });
},

// 图片压缩方法
compressImage: function(filePath, imageKey) {
  const _this = this;
  wx.compressImage({
    src: filePath,
    quality: 60, // 降低压缩质量
    success: compressRes => {
      console.log('压缩成功:', compressRes.tempFilePath);
      
      // 获取压缩后文件大小
      wx.getFileInfo({
        filePath: compressRes.tempFilePath,
        success: fileInfo => {
          console.log('压缩后大小:', fileInfo.size);
          _this.convertToBase64(compressRes.tempFilePath, imageKey);
        },
        fail: () => {
          _this.convertToBase64(compressRes.tempFilePath, imageKey);
        }
      });
    },
    fail: err => {
      console.error('压缩失败:', err);
      // 压缩失败时使用原图
      _this.convertToBase64(filePath, imageKey);
    }
  });
}
})