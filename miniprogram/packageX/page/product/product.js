
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
    
    if (dataset_input.input_type == "date") {
      _this.setData({
        updatePicker: false,
        empty: dataset_input.value
      })
    } else {
      _this.setData({
        updatePicker: true,
        updateInput: false,
        empty: dataset_input.value
      })
    }
    
    if (dataset_input.column == "rownum") {
      _this.setData({
        dataset_input,
        handle: false,
        mask_hid: false,
      })
    } else if (isImageField) {
      // 图片字段特殊处理
      _this.setData({
        dataset_input,
        input_hid: false,
        mask_hid: false,
        input_type: 'image',
        tempEditImage: "" // 初始化临时图片
      })
    } else {
      _this.setData({
        dataset_input,
        input_hid: false,
        mask_hid: false,
        input_type: e.currentTarget.dataset.input_type
      })
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

  chooseImageForEdit: function() {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        
        // 将图片转换为base64（带前缀）
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0],
          encoding: 'base64',
          success: res => {
            _this.setData({
              tempEditImage: 'data:image/jpeg;base64,' + res.data
            });
            wx.showToast({
              title: '图片选择成功',
              icon: 'success'
            });
          },
          fail: err => {
            wx.showToast({
              title: '图片转换失败',
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
      // 图片字段：使用临时图片数据，并移除前缀只存储纯base64
      new_value = _this.data.tempEditImage ? _this.data.tempEditImage.replace('data:image/jpeg;base64,', '') : '';
    } else {
      // 其他字段：使用表单数据
      new_value = e.detail.value.new;
    }
    
    if (!dataset.isupd) {
      return;
    }
    
    if (new_value != "" ){
      var sql = "update product set " + column + " = '" + new_value + "' where id = '" + id + "';"
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
            input_hid: false,
            mask_hid: false,
            ["list[" + index + "]." + column]: isImageField ? new_value : new_value,
            new: "",
            tempEditImage: "" // 清空临时图片
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
    } else {
      wx.showToast({
        title: "不能为空！",
        icon: "none"
      })
    }
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
      handle3:true,
      empty:"",
      zdr:"",
      hkr:""
    })
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
        (_this.data.tempImage1 ? _this.data.tempImage1.replace('data:image/jpeg;base64,', '') : '') + "','" +  // photo
        (_this.data.tempImage2 ? _this.data.tempImage2.replace('data:image/jpeg;base64,', '') : '') + "','" +  // photo1
        (_this.data.tempImage3 ? _this.data.tempImage3.replace('data:image/jpeg;base64,', '') : '') + "','" +  // photo2
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
  
        // 处理图片数据
        const processedList = res.result.map(item => {
          // 清理 base64 前缀，只保留纯 base64 数据
          const processPhoto = (photo) => {
            if (!photo) return photo;
            if (photo.includes('base64,')) {
              return photo.split('base64,')[1];
            }
            return photo;
          };
  
          return {
            ...item,
            photo: processPhoto(item.photo),
            photo1: processPhoto(item.photo1),
            photo2: processPhoto(item.photo2)
          };
        });
  
        _this.setData({
          list: processedList,  // 使用处理后的数据
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
chooseImage1: function() { this.chooseImage('tempImage1'); },
chooseImage2: function() { this.chooseImage('tempImage2'); },
chooseImage3: function() { this.chooseImage('tempImage3'); },

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