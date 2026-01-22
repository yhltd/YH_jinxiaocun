var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    companyName: "",
    id: 0,
    input_type: "",
    modal9: false,
    mark: '',
    edit_old: '',
    edit_new: '',
    
    list: [],
    page: "1",
    IsLastPage: false,
    maxpagenumber: 1,
    showTitleModal: false,
    titleFields: [''], // 存储拆分后的字段数组
    showGuide: false, // 控制弹窗显示

     // 公式配置相关
    showFormulaModal: false,
    formulaTargetField: '',
    formulaTargetIndex: -1,
    formulaExpression: '',
    formulaList: [],
    
    // 标题配置相关
    dynamicTitles: [], // 动态标题配置
    titleSeparator: "|||", // 标题分隔符
    
    // 数据字段映射
    dataFields: [], // 存储数据字段名的数组，与标题一一对应
    titleConfigData: null // 存储id=1的完整记录数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setData({
      companyName: options.companyName,
      result: JSON.parse(options.access)
    })
    wx.setNavigationBarTitle({
      title: '动态工资明细'
    })
    
    // 加载所有数据
    this.loadAllData();
    
    // 加载公式配置
    this.loadFormulaConfig();
  },

  // 加载公式配置
loadFormulaConfig: function() {
  var that = this;
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select * from gongzi_dongtaigongshi where gongsi = '" + that.data.companyName + "' order by id"
    },
    success: res => {
      that.setData({
        formulaList: res.result.recordset || []
      });
    },
    err: res => {
      console.log("加载公式配置错误:", res);
    }
  });
},

  // 新增：一次性加载所有数据
loadAllData: function() {
  var _this = this;
  
  // 查询公司名称相等的全部数据，id=1的数据作为标题，其他数据作为内容
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select * from gongzi_dongtaimingxi where gongsi = '" + _this.data.companyName + "' order by id"
    },
    success: res => {
      console.log("全部数据查询结果:", res.result.recordset);
      
      if (res.result.recordset.length > 0) {
        // 分离标题配置(id=1)和其他数据(id>1)
        var allData = res.result.recordset;
        var titleRecord = null;
        var contentData = [];
        
        allData.forEach(function(item) {
          if (item.id == 1) {
            titleRecord = item; // id=1的作为标题配置
          } else {
            contentData.push(item); // 其他数据作为内容
          }
        });
        
        // 处理标题配置
        if (titleRecord) {
          _this.setData({
            titleConfigData: titleRecord
          });
          
          _this.processTitleConfig(titleRecord, function() {
            // 标题配置处理完成后，处理内容数据
            var processedContentData = _this.processContentData(contentData);
            console.log("处理后的数据",processedContentData)
            
            // 设置处理后的内容数据
            _this.setData({
              list: processedContentData,  // 使用处理后的数据
              IsLastPage: true,
              maxpagenumber: 1
            });
          });
        } else {
          // 如果没有标题配置，创建默认配置
          _this.createDefaultTitleConfig(function() {
            _this.setData({
              list: contentData,
              IsLastPage: true,
              maxpagenumber: 1
            });
          });
        }
      } else {
        // 如果没有数据，创建默认配置
        _this.createDefaultTitleConfig(function() {
          _this.setData({
            list: [],
            IsLastPage: true,
            maxpagenumber: 1
          });
        });
      }
    },
    err: res => {
      console.log("加载全部数据错误!", res);
      wx.showToast({
        title: '加载数据失败',
        icon: 'error'
      });
    }
  });
},

// 新增：处理标题配置
processTitleConfig: function(titleRecord, callback) {
  var _this = this;
  
  var titleStr = titleRecord.name;
  var dynamicTitles = [];
  var dataFields = [];
  
  if (titleStr && titleStr.trim() !== '') {
    // 使用分隔符分割标题
    var titleArray = titleStr.split(_this.data.titleSeparator);
    
    // 生成动态标题配置
    titleArray.forEach((title, index) => {
      if (title.trim() !== '') {
        // 注意：这里我们不再使用field_1, field_2等硬编码字段名
        // 而是使用index来对应数据数组中的位置
        dynamicTitles.push({
          text: title.trim(),
          width: 20,
          columnIndex: index, // 使用索引而不是字段名
          type: "text",
          isupd: true
        });
      }
    });
    
    _this.setData({
      dynamicTitles: dynamicTitles
    }, () => {
      console.log("动态标题配置:", dynamicTitles);
      callback && callback();
    });
  } else {
    // 如果name字段为空，从字段中获取配置
    _this.handleEmptyTitleConfig(titleRecord, callback);
  }
},
processContentData: function(contentData) {
  var _this = this;
  var processedData = [];
  
  contentData.forEach(function(item) {
    var dataItem = {
      id: item.id,
      gongsi: item.gongsi,
      name: item.name,
      originalData: item
    };
    
    // 解析分隔符字符串
    if (item.name && item.name.trim() !== '') {
      var dataArray = item.name.split(_this.data.titleSeparator);
      
      dataArray.forEach(function(value, index) {
        dataItem['col_' + index] = value.trim();
      });
    }
    
    // 计算公式结果
    dataItem = _this.calculateFormula(dataItem);
    
    processedData.push(dataItem);
  });
  
  console.log("处理后的数据（包含计算结果）:", processedData);
  return processedData;
},

   // 创建默认标题配置
   createDefaultTitleConfig: function(callback) {
    var _this = this;
    
    var dynamicTitles = [];
    var dataFields = [];
    
    // 创建5个默认字段
    for (var i = 1; i <= 5; i++) {
      var fieldName = 'field_' + i;
      dynamicTitles.push({
        text: '字段' + i,
        width: 20,
        columnName: fieldName,
        type: "text",
        isupd: true
      });
      dataFields.push(fieldName);
    }
    
    // 插入默认标题配置到数据库
    var defaultTitle = dynamicTitles.map(t => t.text).join(_this.data.titleSeparator);
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "insert into gongzi_dongtaimingxi (id, gongsi, name) values (1, '" + _this.data.companyName + "', '" + defaultTitle + "')"
      },
      success: res => {
        _this.setData({
          dynamicTitles: dynamicTitles,
          dataFields: dataFields
        }, () => {
          callback && callback();
        });
      },
      err: res => {
        console.log("创建默认配置失败:", res);
        _this.setData({
          dynamicTitles: dynamicTitles,
          dataFields: dataFields
        }, () => {
          callback && callback();
        });
      }
    });
  },


   // 处理空的标题配置
   handleEmptyTitleConfig: function(titleRecord, callback) {
    var _this = this;
    
    // 从记录中获取所有字段（除了id、gongsi、name）
    var allFields = Object.keys(titleRecord);
    var dataFields = [];
    var dynamicTitles = [];
    
    // 过滤系统字段，只获取field_开头的字段
    allFields.forEach(field => {
      if (field.startsWith('field_') && titleRecord[field]) {
        var index = field.replace('field_', '');
        dynamicTitles.push({
          text: titleRecord[field].trim() || '字段' + index,
          width: 20,
          columnName: field,
          type: "text",
          isupd: true
        });
        dataFields.push(field);
      }
    });
    
    // 如果没有找到field_字段，创建默认
    if (dynamicTitles.length === 0) {
      for (var i = 1; i <= 5; i++) {
        var fieldName = 'field_' + i;
        dynamicTitles.push({
          text: '字段' + i,
          width: 20,
          columnName: fieldName,
          type: "text",
          isupd: true
        });
        dataFields.push(fieldName);
      }
    }
    
    _this.setData({
      dynamicTitles: dynamicTitles,
      dataFields: dataFields
    }, () => {
      callback && callback();
    });
  },


  // 加载总页数
  loadTotalPages: function() {
    var that = this
    // 增加公司名限制条件
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_dongtaimingxi where id > 1 and gongsi = '" + that.data.companyName + "'"
      },
      success: res => {
        that.setData({
          maxpagenumber: Math.ceil(res.result.recordset[0].maxpagenumber / 100) || 1
        })
      },
      err: res => {
        console.log("加载页数错误!")
      }
    })
  },

  // 编辑单元格
edit_cell(e) {
  var that = this
  var newValue = e.detail.value.value;
  
  if (newValue.length == 0) {
    newValue = that.data.edit_old;
  }
  
  console.log("提交成功，得到的值为:", newValue)
  console.log("列索引为：", that.data.mark)
  
  // 首先获取当前行的完整数据
  var currentRow = null;
  that.data.list.forEach(function(item) {
    if (item.id == that.data.id) {
      currentRow = item;
    }
  });
  
  if (currentRow) {
    // 解析原有的分隔符字符串
    var dataArray = currentRow.name.split(that.data.titleSeparator);
    
    // 更新对应索引的值（列索引）
    var columnIndex = parseInt(that.data.mark);
    if (columnIndex < dataArray.length) {
      dataArray[columnIndex] = newValue;
    } else {
      // 如果索引超出范围，扩展数组
      while (dataArray.length <= columnIndex) {
        dataArray.push('');
      }
      dataArray[columnIndex] = newValue;
    }
    
    // 重新拼接为分隔符字符串
    var updatedName = dataArray.join(that.data.titleSeparator);
    
    // 更新数据库
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update gongzi_dongtaimingxi set name = '" + updatedName + "' where id = '" + that.data.id + "' and gongsi = '" + that.data.companyName + "'"
      },
      success: res => {
        console.log('操作成功');
        
        // 编辑单元格后，重新计算所有公式
        that.calculateAndUpdateAllData();
      },
      err: res => {
        console.log("错误!", res)
      }
    })
  }
},

  // 点击编辑
click_edit(e) {
  var that = this
  var $collection = e.currentTarget.dataset
  that.setData({
    input_type: $collection.type,
    id: $collection.id,
    edit_old: $collection.x,
    mark: $collection.doinb, // 现在存储的是列索引
    modal9: true
  })
  console.log("对应列索引为:", that.data.mark)
},

  hide9() {
    var that = this
    that.setData({
      modal9: false,
    })
  },

  // 删除数据
  click_delete: function (e) {
    var _this = this;
    var $collection = e.currentTarget.dataset;
    var dbid = $collection.dbid;
    var id = $collection.id;
    
    wx.showModal({
      title: '操作选择',
      content: '确认删除么？序号' + id,
      showCancel: true,
      cancelText: "取消",
      confirmText: "删除",
      confirmColor: '#DD5044',
      success: function (res) {
        if (res.confirm) {
          // 增加公司名限制条件
          var sql = "delete from gongzi_dongtaimingxi where id = " + dbid + " and gongsi = '" + _this.data.companyName + "'";
          console.log(sql);
          
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: sql
            },
            success: res => {
              // 修改：重新加载所有数据
              _this.loadAllData();
              
              wx.showToast({
                title: '删除成功！序号为' + id,
                icon: 'none'
              });
            },
            err: res => {
              console.log("错误!", res);
            }
          });
        }
      }
    });
  },
  
  // 快速添加一行
// 快速添加一行
kuaisutianjia: function () {
  var that = this;
  
  // 创建空的字段数组
  var fieldCount = that.data.dynamicTitles.length;
  var emptyFields = [];
  for (var i = 0; i < fieldCount; i++) {
    emptyFields.push('');
  }
  var emptyData = emptyFields.join(that.data.titleSeparator);
  
  // 插入数据，增加公司名字段
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "insert into gongzi_dongtaimingxi (gongsi, name) values('" + that.data.companyName + "', '" + emptyData + "')"
    },
    success: res => {
      console.log("插入成功!!!!!!");
      // 修改：重新加载所有数据
      that.loadAllData();
    },
    err: res => {
      console.log("错误!", res);
    }
  });
},

  // 显示添加确认框
  showM: function () {
    var that = this
    wx.showModal({
      title: '请选择操作',
      content: '确认添加新的配置行？',
      showCancel: true,
      cancelText: "取消",
      confirmText: "添加",
      confirmColor: '#84B9F2',
      success: function (res) {
        if (res.confirm) {
          that.kuaisutianjia()
        }
      }
    })
  },

  // 上一页
  lastpage: function () {
    var that = this
    if (that.data.page == 1) {
      wx.showToast({
        title: '已经是第一页',
        icon: 'none'
      })
    } else {
      that.data.page--
      wx.showToast({
        title: '正在加载第' + that.data.page + '页',
        icon: 'none',
        duration: 2500
      })
      
      var dynamicTitles = that.data.dynamicTitles;
      var selectFields = "id";
      if (dynamicTitles.length > 0) {
        selectFields += ", " + dynamicTitles.map(t => t.columnName).join(", ");
      }
      
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, " + selectFields + 
                 " from gongzi_dongtaimingxi where gongsi = '" + that.data.companyName + "') temp_row where rownumber > (( '" + 
                 that.data.page + "' - 1) * 100) and rownumber <= ('" + that.data.page + "' * 100)"
        },
        success: res => {
          console.log("上一页进入成功：第" + that.data.page + "页")
          that.setData({
            list: res.result.recordset
          })
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {
          that.setData({
            page: that.data.page
          })
        }
      })
    }
  },

  // 下一页
  nextpage: function () {
    var that = this
    if (that.data.IsLastPage) {
      wx.showToast({
        title: '已经是最后一页',
        icon: 'none'
      })
    } else {
      that.data.page++
      wx.showToast({
        title: '正在加载第' + that.data.page + '页',
        icon: 'none',
        duration: 2500
      })
      
      var dynamicTitles = that.data.dynamicTitles;
      var selectFields = "id";
      if (dynamicTitles.length > 0) {
        selectFields += ", " + dynamicTitles.map(t => t.columnName).join(", ");
      }
      
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, " + selectFields + 
                 " from gongzi_dongtaimingxi where gongsi = '" + that.data.companyName + "') temp_row where rownumber > (( '" + 
                 that.data.page + "' - 1) * 100) and rownumber <= ('" + that.data.page + "' * 100)"
        },
        success: res => {
          console.log("返回长度", res.result)
          if (res.result.recordset.length != 0) {
            console.log("下一页进入成功：第" + that.data.page + "页")
            that.setData({
              list: res.result.recordset,
            })
          }
          if (res.result.recordset.length < 100) {
            that.setData({
              IsLastPage: true
            })
            console.log("抵达最后一页")
          }
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {
          that.setData({
            page: that.data.page
          })
        }
      })
    }
  },

  // 显示标题设置模态框
showTitleModal: function() {
  var that = this;
  
  // 先获取当前标题
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select name from gongzi_dongtaimingxi where id = 1 and gongsi = '" + that.data.companyName + "'"
    },
    success: res => {
      var titleFields = [''];
      if (res.result.recordset.length > 0 && res.result.recordset[0].name) {
        var titleStr = res.result.recordset[0].name;
        // 将存储的字符串拆分成数组
        titleFields = titleStr.split(that.data.titleSeparator);
        if (titleFields.length === 0) {
          titleFields = [''];
        }
      }
      
      that.setData({
        showTitleModal: true,
        titleFields: titleFields
      });
    },
    err: res => {
      console.log("获取当前标题错误:", res);
      that.setData({
        showTitleModal: true,
        titleFields: ['']
      });
    }
  });
},

// 隐藏标题设置模态框
hideTitleModal: function() {
  this.setData({
    showTitleModal: false
  });
},

// 添加字段输入框
addTitleField: function() {
  var titleFields = this.data.titleFields;
  titleFields.push('');
  this.setData({
    titleFields: titleFields
  });
},

// 删除字段（添加公式检查）
removeTitleField: function(e) {
  var index = e.currentTarget.dataset.index;
  var titleFields = this.data.titleFields;
  
  if (titleFields.length <= 1) {
    wx.showToast({
      title: '至少保留一个字段',
      icon: 'none'
    });
    return;
  }
  
  // 获取要删除的字段名称
  var fieldToDelete = titleFields[index];
  
  // 检查这个字段是否在公式配置中被使用
  var isUsedInFormula = this.checkFieldUsedInFormula(fieldToDelete);
  
  if (isUsedInFormula) {
    // 如果字段在公式中被使用，提示用户
    wx.showModal({
      title: '无法删除',
      content: `字段"${fieldToDelete}"已在公式配置中使用，请先删除相关公式再删除字段。`,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#07c160'
    });
    return;
  }
  
  // 检查这个字段是否作为公式的目标字段
  var isTargetField = this.checkFieldAsTarget(fieldToDelete);
  
  if (isTargetField) {
    // 如果字段是公式的目标字段，提示用户
    wx.showModal({
      title: '无法删除',
      content: `字段"${fieldToDelete}"是公式计算结果的目标字段，请先删除相关公式再删除字段。`,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#07c160'
    });
    return;
  }
  
  // 安全删除字段
  titleFields.splice(index, 1);
  this.setData({
    titleFields: titleFields
  });
},

// 新增：检查字段是否在公式配置中被使用
checkFieldUsedInFormula: function(fieldName) {
  var that = this;
  var isUsed = false;
  
  // 遍历所有公式配置
  that.data.formulaList.forEach(function(formula) {
    if (formula.gongshi && formula.gongshi.indexOf(fieldName) !== -1) {
      isUsed = true;
    }
  });
  
  return isUsed;
},

// 新增：检查字段是否作为公式的目标字段
checkFieldAsTarget: function(fieldName) {
  var that = this;
  var isTarget = false;
  
  // 遍历所有公式配置
  that.data.formulaList.forEach(function(formula) {
    if (formula.zhuziduan === fieldName) {
      isTarget = true;
    }
  });
  
  return isTarget;
},

// 输入字段内容
onTitleFieldInput: function(e) {
  var index = e.currentTarget.dataset.index;
  var value = e.detail.value;
  var titleFields = this.data.titleFields;
  
  titleFields[index] = value;
  this.setData({
    titleFields: titleFields
  });
},

// 保存标题配置
// 保存标题配置
saveTitle: function() {
  var that = this;
  
  // 过滤空字段
  var validFields = this.data.titleFields.filter(function(field) {
    return field.trim() !== '';
  });
  
  if (validFields.length === 0) {
    wx.showToast({
      title: '请至少输入一个字段',
      icon: 'none'
    });
    return;
  }
  
  // 在后台拼接字段（用|||分隔）
  var titleStr = validFields.join(that.data.titleSeparator);
  
  // 检查标题行是否存在
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select id from gongzi_dongtaimingxi where id = 1 and gongsi = '" + that.data.companyName + "'"
    },
    success: res => {
      var sql;
      if (res.result.recordset.length === 0) {
        // 插入标题行
        sql = "insert into gongzi_dongtaimingxi (id, gongsi, name) values (1, '" + that.data.companyName + "', '" + titleStr + "')";
      } else {
        // 更新标题行
        sql = "update gongzi_dongtaimingxi set name = '" + titleStr + "' where id = 1 and gongsi = '" + that.data.companyName + "'";
      }
      
      // 执行更新
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: { query: sql },
        success: res => {
          console.log("标题保存成功");
          
          // 如果列数减少，需要更新现有数据的格式
          var oldFieldCount = that.data.dynamicTitles.length;
          var newFieldCount = validFields.length;
          
          if (newFieldCount < oldFieldCount) {
            // 列数减少，需要截断现有数据
            that.truncateExistingData(oldFieldCount, newFieldCount);
          }
          
          that.hideTitleModal();
          
          // 重新加载所有数据
          that.loadAllData();
          
          wx.showToast({
            title: '配置保存成功',
            icon: 'success'
          });
        },
        err: res => {
          wx.showToast({
            title: '保存失败',
            icon: 'error'
          });
        }
      });
    },
    err: res => {
      console.log("检查标题行错误:", res);
    }
  });
},

// 新增：当列数减少时截断现有数据
truncateExistingData: function(oldCount, newCount) {
  var that = this;
  
  // 获取所有需要更新的数据行（id>1）
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select id, name from gongzi_dongtaimingxi where id > 1 and gongsi = '" + that.data.companyName + "'"
    },
    success: res => {
      var updatePromises = [];
      
      res.result.recordset.forEach(function(item) {
        if (item.name) {
          var dataArray = item.name.split(that.data.titleSeparator);
          // 截断到新的列数
          var truncatedArray = dataArray.slice(0, newCount);
          // 如果截断后长度不够，补充空值
          while (truncatedArray.length < newCount) {
            truncatedArray.push('');
          }
          var newName = truncatedArray.join(that.data.titleSeparator);
          
          // 添加到更新队列
          var updateSql = "update gongzi_dongtaimingxi set name = '" + newName + "' where id = " + item.id + " and gongsi = '" + that.data.companyName + "'";
          updatePromises.push(
            wx.cloud.callFunction({
              name: 'sqlServer_117',
              data: { query: updateSql }
            })
          );
        }
      });
      
      // 等待所有更新完成
      Promise.all(updatePromises).then(function() {
      });
    },
    err: res => {
    }
  });
},

// 更新表结构（添加/删除字段）
updateTableStructure: function(fieldNames, titleStr, updateTitleSql) {
  var that = this;
  var companyName = that.data.companyName;
  
  // 先更新标题行
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: { query: updateTitleSql },
    success: res => {
      console.log("标题保存成功");
      
      // 检查并添加缺少的字段到现有数据行
      that.addMissingFieldsToRows(fieldNames, titleStr);
    },
    err: res => {
      console.log("保存标题错误:", res);
      wx.showToast({
        title: '保存失败',
        icon: 'error'
      });
    }
  });
},

// 为现有数据行添加缺少的字段
addMissingFieldsToRows: function(fieldNames, titleStr) {
  var that = this;
  
  // 获取当前最大字段数
  var maxFieldCount = fieldNames.length;
  
  // 这里可以根据需要添加SQL语句来为现有行添加字段
  // 例如：如果需要为现有数据添加新列，可以执行ALTER TABLE语句
  
  // 由于是动态表结构，我们不需要真的修改数据库表结构
  // 只需要确保保存的title字符串是正确的即可
  
  that.hideTitleModal();
  
  // 重新加载标题配置和数据
  that.loadTitleConfig(() => {
    that.loadData();
  });
  
  wx.showToast({
    title: '配置保存成功',
    icon: 'success'
  });
},

 // 保持当前页数据
baochi: function () {
  var that = this;
  
  // 重新加载所有数据（会自动重新计算公式）
  that.loadAllData();
  
  wx.showToast({
    title: '操作成功',
    icon: 'success'
  });
},

// 显示公式配置模态框
showFormulaModal: function() {
  var that = this;
  
  // 加载已有的公式配置
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select * from gongzi_dongtaigongshi where gongsi = '" + that.data.companyName + "' order by id"
    },
    success: res => {
      
      that.setData({
        showFormulaModal: true,
        formulaList: res.result.recordset || [],
        formulaTargetField: '',
        formulaTargetIndex: -1,
        formulaExpression: ''
      });
    },
    err: res => {
      that.setData({
        showFormulaModal: true,
        formulaList: [],
        formulaTargetField: '',
        formulaTargetIndex: -1,
        formulaExpression: ''
      });
    }
  });
},

// 隐藏公式配置模态框
hideFormulaModal: function() {
  this.setData({
    showFormulaModal: false
  });
},

// 目标字段选择变化
onTargetFieldChange: function(e) {
  var index = e.detail.value;
  var selectedField = this.data.dynamicTitles[index].text;
  
  this.setData({
    formulaTargetIndex: index,
    formulaTargetField: selectedField
  });
},

// 公式输入
onFormulaInput: function(e) {
  this.setData({
    formulaExpression: e.detail.value
  });
},

// 插入运算符
insertOperator: function(e) {
  var operator = e.currentTarget.dataset.operator;
  var currentExpression = this.data.formulaExpression;
  
  this.setData({
    formulaExpression: currentExpression + operator
  });
},

// 修改插入字段的方法，使用更简单的字段名
insertField: function(e) {
  var fieldText = e.currentTarget.dataset.text;
  var currentExpression = this.data.formulaExpression;
  
  // 使用更简单的字段名格式
  var newExpression = currentExpression + (currentExpression ? ' ' : '') + fieldText + ' ';
  
  this.setData({
    formulaExpression: newExpression
  });
},

// 保存公式
saveFormula: function() {
  var that = this;
  
  // 验证输入
  if (!that.data.formulaTargetField) {
    wx.showToast({
      title: '请选择目标字段',
      icon: 'none'
    });
    return;
  }
  
  if (!that.data.formulaExpression || that.data.formulaExpression.trim() === '') {
    wx.showToast({
      title: '请输入计算公式',
      icon: 'none'
    });
    return;
  }
  
  // 获取目标字段在动态标题中的索引
  var targetColumnIndex = -1;
  that.data.dynamicTitles.forEach(function(item, index) {
    if (item.text === that.data.formulaTargetField) {
      targetColumnIndex = index;
    }
  });
  
  if (targetColumnIndex === -1) {
    wx.showToast({
      title: '目标字段不存在',
      icon: 'none'
    });
    return;
  }
  
  // 检查是否已存在相同的目标字段公式
  var existingFormula = that.data.formulaList.find(function(item) {
    return item.zhuziduan === that.data.formulaTargetField;
  });
  
  var sql;
  if (existingFormula) {
    // 更新现有公式
    sql = "update gongzi_dongtaigongshi set gongshi = '" + that.data.formulaExpression + 
          "' where zhuziduan = '" + that.data.formulaTargetField + 
          "' and gongsi = '" + that.data.companyName + "'";
  } else {
    // 插入新公式
    sql = "insert into gongzi_dongtaigongshi (zhuziduan, gongshi, gongsi) values ('" + 
          that.data.formulaTargetField + "', '" + that.data.formulaExpression + "', '" + 
          that.data.companyName + "')";
  }
  
  // 保存到数据库
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: { query: sql },
    success: res => {
      console.log("公式保存成功");
      
      // 重新加载公式列表
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from gongzi_dongtaigongshi where gongsi = '" + that.data.companyName + "' order by id"
        },
        success: res => {
          that.setData({
            formulaList: res.result.recordset || [],
            formulaTargetField: '',
            formulaTargetIndex: -1,
            formulaExpression: ''
          });
          
          // 保存成功后，计算并更新所有数据
          that.calculateAndUpdateAllData();
          
          wx.showToast({
            title: '公式保存成功',
            icon: 'success'
          });
        },
        err: res => {
          console.log("重新加载公式列表错误:", res);
        }
      });
    },
    err: res => {
      console.log("保存公式错误:", res);
      wx.showToast({
        title: '保存失败',
        icon: 'error'
      });
    }
  });
},

// 新增：计算并更新所有数据的函数
// 修改后的 calculateAndUpdateAllData 函数
calculateAndUpdateAllData: function() {
  var that = this;
  
  console.log('开始计算并更新所有数据...');
  
  // 获取所有内容数据（id>1的数据）
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select * from gongzi_dongtaimingxi where id > 1 and gongsi = '" + that.data.companyName + "' order by id"
    },
    success: res => {
      var contentData = res.result.recordset;
      
      if (contentData.length === 0) {
        console.log('没有需要计算的数据');
        return;
      }
      
      console.log('需要计算的数据条数:', contentData.length);
      
      // 计算并更新每条数据
      var updatePromises = [];
      
      contentData.forEach(function(item, itemIndex) {
        try {
          // 创建数据对象
          var dataItem = {
            id: item.id,
            gongsi: item.gongsi,
            name: item.name,
            originalData: item
          };
          
          // 解析分隔符字符串
          var dataArray = [];
          if (item.name && item.name.trim() !== '') {
            dataArray = item.name.split(that.data.titleSeparator);
          }
          
          // 确保数组长度与标题数量一致
          while (dataArray.length < that.data.dynamicTitles.length) {
            dataArray.push('');
          }
          
          // 为dataItem设置col_X属性
          dataArray.forEach(function(value, index) {
            dataItem['col_' + index] = value.trim();
          });
          
          console.log(`处理第${itemIndex + 1}行数据，ID: ${item.id}`);
          console.log('原始数据数组:', dataArray);
          
          // 计算公式结果
          var calculatedItem = that.calculateFormula(dataItem);
          
          // 将计算结果转换为分隔符字符串
          var newDataArray = [];
          var hasChange = false;
          
          for (var i = 0; i < that.data.dynamicTitles.length; i++) {
            // 获取计算后的值
            var calculatedValue = calculatedItem['col_' + i];
            var originalValue = dataArray[i] || '';
            
            // 如果计算后的值不存在，使用原始值
            if (calculatedValue === undefined || calculatedValue === null) {
              calculatedValue = originalValue;
            }
            
            // 确保是字符串
            calculatedValue = calculatedValue.toString();
            
            // 检查是否有变化
            if (calculatedValue !== originalValue) {
              hasChange = true;
              console.log(`字段${i}有变化: ${originalValue} -> ${calculatedValue}`);
            }
            
            newDataArray.push(calculatedValue);
          }
          
          var newName = newDataArray.join(that.data.titleSeparator);
          
          console.log('新的数据字符串:', newName);
          
          // 更新数据库
          var updateSql = "update gongzi_dongtaimingxi set name = '" + newName + 
                        "' where id = " + item.id + " and gongsi = '" + that.data.companyName + "'";
          
          console.log('执行SQL:', updateSql);
          
          updatePromises.push(
            new Promise((resolve, reject) => {
              wx.cloud.callFunction({
                name: 'sqlServer_117',
                data: { query: updateSql },
                success: function(updateRes) {
                  console.log(`更新成功: ID=${item.id}`);
                  resolve({ id: item.id, success: true });
                },
                fail: function(updateErr) {
                  console.error(`更新失败: ID=${item.id}`, updateErr);
                  resolve({ id: item.id, success: false, error: updateErr });
                }
              });
            })
          );
          
        } catch (error) {
          console.error('处理数据行时出错:', error, '数据:', item);
        }
      });
      
      // 等待所有更新完成
      if (updatePromises.length > 0) {
        Promise.all(updatePromises).then(function(results) {
          console.log('所有数据更新完成');
          
          var successCount = results.filter(r => r.success).length;
          var failCount = results.filter(r => !r.success).length;
          
          console.log(`成功: ${successCount}条，失败: ${failCount}条`);
          
          // 重新加载页面数据
          that.loadAllData();
          
          wx.showToast({
            icon: 'success',
            duration: 2000
          });
        }).catch(function(error) {
          console.error('更新数据时出错:', error);
          wx.showToast({
            title: '更新数据失败',
            icon: 'error'
          });
        });
      }
    },
    err: res => {
      console.log("获取数据错误:", res);
      wx.showToast({
        title: '获取数据失败',
        icon: 'error'
      });
    }
  });
},

// 安全的表达式计算函数
safeEval: function(expression) {
  try {
    console.log('计算表达式:', expression);
    
    // 确保表达式是有效的
    if (!expression || expression.trim() === '') {
      return 0;
    }
    
    // 移除所有空格
    expression = expression.replace(/\s+/g, '');
    
    // 使用表达式计算器（完全避免eval和Function）
    return this.evaluateExpression(expression);
    
  } catch (error) {
    console.error('表达式计算错误:', error, '表达式:', expression);
    return 0;
  }
},
// 表达式计算器（支持 + - * / 和括号）
evaluateExpression: function(expression) {
  try {
    // 定义运算符优先级
    var precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };
    
    // 将中缀表达式转换为后缀表达式（逆波兰表示法）
    function infixToPostfix(expr) {
      var output = [];
      var stack = [];
      var i = 0;
      
      while (i < expr.length) {
        var ch = expr[i];
        
        if (/\d/.test(ch) || ch === '.') {
          // 解析数字
          var numStr = '';
          while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === '.')) {
            numStr += expr[i];
            i++;
          }
          output.push(parseFloat(numStr));
          continue;
        } else if (ch === '(') {
          stack.push(ch);
        } else if (ch === ')') {
          while (stack.length && stack[stack.length - 1] !== '(') {
            output.push(stack.pop());
          }
          stack.pop(); // 弹出 '('
        } else if (ch in precedence) {
          // 运算符
          while (stack.length && 
                 stack[stack.length - 1] !== '(' && 
                 precedence[stack[stack.length - 1]] >= precedence[ch]) {
            output.push(stack.pop());
          }
          stack.push(ch);
        }
        i++;
      }
      
      // 弹出栈中剩余运算符
      while (stack.length) {
        output.push(stack.pop());
      }
      
      return output;
    }
    
    // 计算后缀表达式
    function evaluatePostfix(postfix) {
      var stack = [];
      
      for (var i = 0; i < postfix.length; i++) {
        var token = postfix[i];
        
        if (typeof token === 'number') {
          stack.push(token);
        } else {
          var b = stack.pop();
          var a = stack.pop();
          
          switch (token) {
            case '+': 
              stack.push(a + b); 
              break;
            case '-': 
              stack.push(a - b); 
              break;
            case '*': 
              stack.push(a * b); 
              break;
            case '/': 
              if (b === 0) return 0;
              stack.push(a / b); 
              break;
          }
        }
      }
      
      return stack.length > 0 ? stack[0] : 0;
    }
    
    // 转换为后缀表达式并计算
    var postfix = infixToPostfix(expression);
    var result = evaluatePostfix(postfix);
    
    console.log('表达式计算结果:', result);
    return result;
    
  } catch (error) {
    console.error('表达式解析错误:', error);
    return 0;
  }
},


// 简单表达式计算器
simpleExpressionCalc: function(expression) {
  try {
    // 移除所有空格
    expression = expression.replace(/\s+/g, '');
    
    // 简单的加减乘除计算
    var numbers = [];
    var operators = [];
    var currentNum = '';
    
    for (var i = 0; i < expression.length; i++) {
      var char = expression[i];
      
      if ('0123456789.'.includes(char)) {
        currentNum += char;
      } else if ('+-*/'.includes(char)) {
        if (currentNum !== '') {
          numbers.push(parseFloat(currentNum));
          currentNum = '';
        }
        operators.push(char);
      }
    }
    
    // 添加最后一个数字
    if (currentNum !== '') {
      numbers.push(parseFloat(currentNum));
    }
    
    // 如果数字和运算符数量不匹配，返回第一个数字或0
    if (numbers.length === 0) return 0;
    if (numbers.length === 1) return numbers[0];
    if (numbers.length !== operators.length + 1) {
      console.error('表达式格式错误');
      return numbers[0] || 0;
    }
    
    // 执行计算（简单顺序计算，不处理优先级）
    var result = numbers[0];
    for (var i = 0; i < operators.length; i++) {
      var operator = operators[i];
      var nextNum = numbers[i + 1];
      
      switch (operator) {
        case '+':
          result += nextNum;
          break;
        case '-':
          result -= nextNum;
          break;
        case '*':
          result *= nextNum;
          break;
        case '/':
          if (nextNum === 0) return 0;
          result /= nextNum;
          break;
      }
    }
    
    return result;
    
  } catch (error) {
    console.error('简单表达式计算错误:', error);
    return 0;
  }
},

// 计算公式结果（修复字段替换问题）
calculateFormula: function(rowData) {
  var that = this;
  
  // 如果没有公式，直接返回原始数据
  if (that.data.formulaList.length === 0) {
    return rowData;
  }
  
  // 深度复制行数据
  var calculatedRow = JSON.parse(JSON.stringify(rowData));
  
  // 创建字段值映射，初始化为原始值
  var fieldValues = {};
  for (var i = 0; i < that.data.dynamicTitles.length; i++) {
    fieldValues['col_' + i] = calculatedRow['col_' + i] || '0';
  }
  
  console.log('开始计算行数据，ID:', rowData.id);
  console.log('原始字段值:', fieldValues);
  
  // 先构建字段名到字段索引的映射
  var fieldNameToIndex = {};
  that.data.dynamicTitles.forEach(function(title, index) {
    if (title.text && title.text.trim() !== '') {
      fieldNameToIndex[title.text] = index;
    }
  });
  
  console.log('字段名映射:', fieldNameToIndex);
  
  // 迭代计算，直到所有公式都稳定（解决依赖问题）
  var maxIterations = 5; // 最大迭代次数，防止死循环
  var hasChanged = true;
  var iteration = 0;
  
  while (hasChanged && iteration < maxIterations) {
    hasChanged = false;
    iteration++;
    console.log(`第${iteration}次迭代计算`);
    
    // 对每个公式进行计算
    that.data.formulaList.forEach(function(formula, formulaIndex) {
      try {
        // 获取公式表达式和目标字段
        var expression = formula.gongshi;
        var targetField = formula.zhuziduan;
        
        if (!expression || !targetField) {
          return;
        }
        
        // 1. 先找到目标字段在动态标题中的索引
        var targetIndex = fieldNameToIndex[targetField];
        
        if (targetIndex === undefined || targetIndex === -1) {
          console.warn(`未找到目标字段: ${targetField}，跳过此公式`);
          return;
        }
        
        // 2. 准备表达式，替换字段名为它们的数值
        var workingExpression = expression;
        
        // 按字段名长度降序排序，先替换长的字段名，避免部分替换
        var sortedFieldNames = Object.keys(fieldNameToIndex).sort(function(a, b) {
          return b.length - a.length;
        });
        
        // 替换所有字段名为它们的最新数值
        sortedFieldNames.forEach(function(fieldName) {
          var fieldIndex = fieldNameToIndex[fieldName];
          var fieldKey = 'col_' + fieldIndex;
          var fieldValue = fieldValues[fieldKey] || '0';
          
          // 转换为数字
          var numericValue = parseFloat(fieldValue);
          if (isNaN(numericValue)) {
            numericValue = 0;
          }
          
          // 简单替换所有出现的字段名
          // 注意：使用全局替换，并且避免替换部分匹配
          var regex = new RegExp(fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          workingExpression = workingExpression.replace(regex, numericValue.toString());
        });
        
        console.log(`公式${formulaIndex + 1}: ${targetField} = ${expression}`);
        console.log('替换后表达式:', workingExpression);
        
        // 3. 计算表达式
        // 移除所有空格
        workingExpression = workingExpression.replace(/\s+/g, '');
        
        // 替换中文运算符
        workingExpression = workingExpression.replace(/＋/g, '+')
                                            .replace(/－/g, '-')
                                            .replace(/×/g, '*')
                                            .replace(/÷/g, '/')
                                            .replace(/（/g, '(')
                                            .replace(/）/g, ')');
        
        console.log('清理后表达式:', workingExpression);
        
        // 计算
        var result = 0;
        try {
          // 使用安全的计算函数
          result = that.safeEval(workingExpression);
          
          // 如果是无效结果，设置为0
          if (isNaN(result) || !isFinite(result)) {
            console.warn(`计算结果无效: ${result}，表达式: ${workingExpression}`);
            result = 0;
          }
          
          // 四舍五入保留2位小数
          result = Math.round(result * 100) / 100;
        } catch (calcError) {
          console.error('计算错误:', calcError, '表达式:', workingExpression);
          result = 0;
        }
        
        // 4. 更新字段值映射
        var oldValue = fieldValues['col_' + targetIndex] || '0';
        var newValue = result.toString();
        
        if (oldValue !== newValue) {
          fieldValues['col_' + targetIndex] = newValue;
          hasChanged = true;
          console.log(`结果: ${targetField} = ${oldValue} -> ${newValue}`);
        }
        
      } catch (error) {
        console.error('公式处理错误:', error);
      }
    });
  }
  
  // 将最终的计算结果更新到calculatedRow
  for (var i = 0; i < that.data.dynamicTitles.length; i++) {
    var fieldKey = 'col_' + i;
    if (fieldValues[fieldKey] !== undefined) {
      calculatedRow[fieldKey] = fieldValues[fieldKey];
    }
  }
  
  console.log('计算完成，最终字段值:', fieldValues);
  return calculatedRow;
},

// 删除公式
// 删除公式
deleteFormula: function(e) {
  var that = this;
  var formulaId = e.currentTarget.dataset.id;
  
  wx.showModal({
    title: '确认删除',
    content: '确定要删除这个公式吗？',
    success: function(res) {
      if (res.confirm) {
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: "delete from gongzi_dongtaigongshi where id = " + formulaId + 
                   " and gongsi = '" + that.data.companyName + "'"
          },
          success: res => {
            console.log("公式删除成功");
            
            // 更新公式列表
            var newFormulaList = that.data.formulaList.filter(function(item) {
              return item.id != formulaId;
            });
            
            that.setData({
              formulaList: newFormulaList
            });
            
            // 删除公式后，重新计算所有数据
            that.calculateAndUpdateAllData();
            
            wx.showToast({
              title: '公式已删除',
              icon: 'success'
            });
          },
          err: res => {
            console.log("删除公式错误:", res);
            wx.showToast({
              title: '删除失败',
              icon: 'error'
            });
          }
        });
      }
    }
  });
},
/**
 * 跳转到统计图表页面
 */
gotoStatistics: function() {
  var that = this;
  
  // 从全局获取公司名称
  var gongsi = app.globalData.gongsi || that.data.companyName;
  
  if (!gongsi) {
    wx.showToast({
      title: '公司信息缺失',
      icon: 'none'
    });
    return;
  }
  
  // 将动态标题和数据列表保存到全局数据中
  app.globalData.dynamicTitles = that.data.dynamicTitles || [];
  app.globalData.listData = that.data.list || [];
  
  console.log('准备跳转到统计图表页面，公司名称:', gongsi);
  
  // 直接跳转到统计图表页面，使用正确的路径
  wx.navigateTo({
    url: '/packageA/pages/1statistics/statistics?companyName=' + gongsi, // 去掉encodeURIComponent
    success: function() {
      console.log('跳转到统计图表页面成功');
    },
    fail: function(err) {
      console.error('跳转失败详情:', err);
      wx.showToast({
        title: '跳转失败，请检查路径',
        icon: 'none'
      });
    }
  });
},

// 添加显示方法
showGuide: function() {
  this.setData({
    showGuide: true
  });
},

// 添加隐藏方法
hideGuide: function() {
  this.setData({
    showGuide: false
  });
},
})