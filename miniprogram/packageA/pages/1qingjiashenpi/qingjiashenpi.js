var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    companyName: "",
    id: 0,
    maxLength: 0,
    jiaqiLength: 0,

    input_type: "",
    type: 1,
    startYear: 1980,
    endYear: 2030,
    cancelColor: "#888",
    color: "#5677fc",
    setDateTime: "",
    result: "",
    title_year: '',
    title_month: '',
    title_day: '',
    
    // 字段映射（日期1-31对应数据库字段E-AI）
    dayFieldMap: {
      1: 'E', 2: 'F', 3: 'G', 4: 'H', 5: 'I', 6: 'J', 7: 'K', 8: 'L', 9: 'M', 10: 'N',
      11: 'O', 12: 'P', 13: 'Q', 14: 'R', 15: 'S', 16: 'T', 17: 'U', 18: 'V', 19: 'W', 20: 'X',
      21: 'Y', 22: 'Z', 23: 'AA', 24: 'AB', 25: 'AC', 26: 'AD', 27: 'AE', 28: 'AF', 29: 'AG', 30: 'AH', 31: 'AI'
    },

    showModalStatus: false,
    animationData: "",
    tabIndex: 26,
    leftDrawer: false,
    mode: "left",
    scrollTop: null,
    list: [],
    title: [],
    title1: [
      {
        text: "部门",
        width: 20,
        columnName: "bumen",
        type: "text",
        isupd: true
      },
      {
        text: "员工名称",
        width: 40,
        columnName: "xingming",
        type: "text",
        isupd: true
      },
      {
        text: "申请时间",
        width: 40,
        columnName: "tijiaoshijian",
        type: "date",  // 改为date类型
        isupd: true
      },
      {
        text: "起始请假日期",
        width: 60,
        columnName: "qsqingjiashijian",
        type: "date",  // 改为date类型
        isupd: true
      },
      {
        text: "截止请假日期",
        width: 60,
        columnName: "jzqingjiashijan",
        type: "date",  // 改为date类型
        isupd: true
      },
      {
        text: "请假原因",
        width: 40,
        columnName: "qingjiayuanyin",
        type: "text",
        isupd: true
      },
      {
        text: "审批状态",
        width: 40,
        columnName: "zhuangtai",
        type: "text",
        isupd: true
      },
      {
        text: "审批原因",
        width: 80,
        columnName: "shenpiyuanyin",
        type: "text",
        isupd: true
      }
    ],
    page: "1",
    IsLastPage: false,
    gongsi: '',
    edit_old: '',
    modal9: false, 
    mark: '',
    edit_new: '',
    showDatePicker: false, // 新增：控制日期选择器显示
    currentDateField: '' // 新增：当前正在编辑的日期字段
  },


  click_delete: function (e) {
    var _this = this;
   
    var $collection = e.currentTarget.dataset
    var dbid = $collection.dbid
    var id = $collection.id
    wx.showModal({
      title: '操作选择',
      content: '确认删除么？序号'+id,
      showCancel: true,
      cancelText: "取消",
      cancelColor: '',
      confirmText: "删除",
      confirmColor: '#DD5044',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          var sql = "delete from gongzi_qingjiashenpi where id = "+ dbid
          console.log(sql)
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: sql
            },
            success: res => {
              _this.baochi();
            },
            err: res => {
              console.log("错误!", res)
            }
          })
          wx.showToast({
            title: '删除成功！序号为' + id,
            icon: 'none'
          })
        }
      },
      fail: function (res) {},
      complete: function (res) {},
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setData({
      companyName : options.companyName,
      result : JSON.parse(options.access)
    })
    wx.setNavigationBarTitle({
      title: '请假审批管理'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    console.log('onLoad')

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select * from gongzi_qingjiashenpi where gongsi = '"+_this.data.companyName+"' order by id desc"
      },
      success: res => {
        console.log("进入成功")
        if (res.result.recordset.length < 100) {
          this.setData({
            list: res.result.recordset,
            IsLastPage: true
          })
        } else {
          this.setData({
            list: res.result.recordset
          })
        }
      },
      err: res => {
        console.log("错误!", res)
      }
    })

    // 查询标题配置
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select peizhi from gongzi_title where peizhi is not null and peizhi != ''"
      },
      success: res => {
        console.log(res.result.recordsets[0])
        this.setData({
          title: res.result.recordsets[0]
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dateTime = this.selectComponent("#tui-dateTime-ctx")
    var that = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_qingjiashenpi where gongsi = '"+that.data.companyName+"'"
      },
      success: res => {
        that.setData({
          maxpagenumber: Math.ceil(res.result.recordset[0].maxpagenumber / 100)
        })
        console.log(that.data.maxpagenumber)
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },

  // 显示日期选择器
showDatePicker: function(e) {
  var $collection = e.currentTarget.dataset;
  var field = $collection.field;
  var id = $collection.id; // 获取行id
  var currentDate = $collection.value || this.getCurrentDate();
  
  // 清理日期格式，确保是YYYY-MM-DD格式
  var formattedDate = currentDate;
  if (formattedDate && formattedDate.includes('/')) {
    formattedDate = formattedDate.replace(/\//g, '-');
  }
  
  this.setData({
    showDatePicker: true,
    currentDateField: field,
    setDateTime: formattedDate,
    id: id, // 保存当前行的id
    type: 2 // 年月日选择器
  });
  
  console.log('点击日期字段，行ID:', id, '字段:', field, '当前值:', currentDate);
  
  // 触发日期选择器显示
  this.show();
},

  // 获取当前日期（YYYY-MM-DD格式）
  getCurrentDate: function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    
    // 确保月份和日期是两位数
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    
    // 返回YYYY-MM-DD格式
    return year + '-' + month + '-' + day;
  },

  // 显示日期时间选择器
  show: function () {
    var that = this;
    var dateTime = this.selectComponent("#tui-dateTime-ctx");
    dateTime.show();
  },

  // 日期选择器确认事件
  change: function (e) {
    var that = this;
    var value = e.detail.value; // 获取选择的日期值
    console.log('日期选择器返回值:', e.detail);
    
    // 确保日期格式为YYYY-MM-DD
    var selectedDate = '';
    if (e.detail.year && e.detail.month && e.detail.day) {
      // 如果返回的是分开的年月日
      var year = e.detail.year;
      var month = e.detail.month < 10 ? '0' + e.detail.month : e.detail.month;
      var day = e.detail.day < 10 ? '0' + e.detail.day : e.detail.day;
      selectedDate = year + '-' + month + '-' + day;
    } else if (value) {
      // 如果返回的是完整日期字符串
      selectedDate = value;
      // 清理可能的空格和多余字符
      selectedDate = selectedDate.trim();
      // 确保格式正确
      if (selectedDate.includes('/')) {
        selectedDate = selectedDate.replace(/\//g, '-');
      }
    } else {
      selectedDate = that.getCurrentDate();
    }
    
    console.log('格式化后的日期:', selectedDate);
    
    if (selectedDate) {
      // 更新数据库中的日期字段
      var sql = "update gongzi_qingjiashenpi set " + that.data.currentDateField + " = '" + selectedDate + "' where id = '" + that.data.id + "'";
      
      console.log('执行的SQL:', sql);
      
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: sql
        },
        success: res => {
          console.log('日期更新成功', res)
          // 刷新当前行的数据
          var list = that.data.list;
          for (var i = 0; i < list.length; i++) {
            if (list[i].id == that.data.id) {
              list[i][that.data.currentDateField] = selectedDate;
              break;
            }
          }
          that.setData({
            list: list,
            showDatePicker: false,
            currentDateField: ''
          });
          wx.showToast({
            title: '日期已更新',
            icon: 'success'
          });
        },
        err: res => {
          console.log("更新失败!", res)
          wx.showToast({
            title: '更新失败: ' + (res.errMsg || '未知错误'),
            icon: 'none'
          });
        }
      });
    }
  },

  showM: function () {
    var that = this
    wx.showModal({
      title: '请选择操作',
      content: '确认添加新的请假记录？',
      showCancel: true,
      cancelText: "取消",
      cancelColor: '',
      confirmText: "添加",
      confirmColor: '#84B9F2',
      success: function (res) {
        if (res.cancel) {
        } else {
          that.kuaisutianjia()
        }
      },
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  //添加
  kuaisutianjia: function () {
    var that = this
    var currentDate = this.getCurrentDate();
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "insert into gongzi_qingjiashenpi (gongsi, tijiaoshijian, zhuangtai) values('" + that.data.companyName + "', '" + currentDate + "', '待审批')"
      },
      success: res => {
        console.log("插入成功!!!!!!")
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        });
        that.baochi()
      },
      err: res => {
        console.log("错误!", res)
      }
    })
  },

  /*************************************下面是自定义函数，请谨慎修改***********************************/

  edit_cell(e) {
    var that = this
    if (e.detail.value.value.length == 0) {
      that.setData({
        edit_new: that.data.edit_old
      })
    } else if (e.detail.value.value.length != 0) {
      that.setData({
        edit_new: e.detail.value.value
      })
    }
    
    // 检查是否为日期字段
    var isDateField = ['tijiaoshijian', 'qsqingjiashijian', 'jzqingjiashijan'].includes(that.data.mark);
    
    // 检查是否为审批状态字段
    var isStatusField = (that.data.mark === 'zhuangtai');
    
    if (isDateField) {
      // 如果是日期字段，使用日期选择器而不是直接编辑
      that.setData({
        showDatePicker: true,
        currentDateField: that.data.mark,
        setDateTime: that.data.edit_new || that.getCurrentDate(),
        type: 2 // 年月日选择器
      });
      that.show();
      return;
    } else if (isStatusField) {
      // 如果是状态字段，显示状态选择器
      that.showStatusPicker(that.data.id, that.data.mark, that.data.edit_new || '待审批');
      return;
    }
    
    console.log("选中单元格的信息：", that.data.id, that.data.edit_old)
    console.log("提交成功，得到的值为:", that.data.edit_new)
    console.log("标记位为：", that.data.mark)
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update gongzi_qingjiashenpi set " + that.data.mark + " = '" + that.data.edit_new + "' where id = '" + that.data.id + "'"
      },
      success: res => {
        console.log('操作成功')
        that.baochi()
      },
      err: res => {
        console.log("错误!")
      }
    })
  },
  
  click_edit(e) {
    var that = this
    var $collection = e.currentTarget.dataset
    
    // 检查是否为日期字段
    var fieldType = 'text';
    var isDateField = false;
    
    // 根据字段名判断是否为日期字段
    if (['tijiaoshijian', 'qsqingjiashijian', 'jzqingjiashijan'].includes($collection.doinb)) {
      fieldType = 'date';
      isDateField = true;
    }
    
    // 检查是否为审批状态字段
    var isStatusField = ($collection.doinb === 'zhuangtai');
    
    that.setData({
      input_type: fieldType,
      id: $collection.id,
      name: $collection.name,
      edit_old: $collection.x,
      mark: $collection.doinb,
      modal9: (!isDateField && !isStatusField) // 如果是日期字段或状态字段，不显示普通编辑模态框
    })
    
    if (isDateField) {
      // 直接显示日期选择器（年月日）
      that.setData({
        showDatePicker: true,
        currentDateField: $collection.doinb,
        setDateTime: $collection.x || that.getCurrentDate(),
        type: 2 // 年月日选择器
      });
      that.show();
    } else if (isStatusField) {
      // 显示状态选择下拉框
      that.showStatusPicker($collection.id, $collection.doinb, $collection.x || '待审批');
    }
    
    console.log(that.data.id, that.data.name, that.data.edit_old, that.data.modal9)
    console.log("对应数据库中查找的标记位为:", that.data.mark)
  },

  // 新增：显示状态选择器方法
// 新增：显示状态选择器方法
showStatusPicker: function(id, field, currentValue) {
  var that = this;
  var statusOptions = ['待审批', '通过', '驳回'];
  
  wx.showActionSheet({
    itemList: statusOptions,
    success: function(res) {
      if (!res.cancel) {
        var selectedStatus = statusOptions[res.tapIndex];
        
        // 获取当前行的完整数据
        var currentRecord = null;
        var list = that.data.list;
        for (var i = 0; i < list.length; i++) {
          if (list[i].id == id) {
            currentRecord = list[i];
            break;
          }
        }
        
        if (currentRecord) {
          // 先更新请假审批表的数据库
          var sql = "update gongzi_qingjiashenpi set " + field + " = '" + selectedStatus + "' where id = '" + id + "'";
          
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: sql
            },
            success: res => {
              console.log('请假审批状态更新成功');
              
              // 更新考勤记录表
              that.updateAttendanceRecord(currentRecord, selectedStatus);
              
              // 刷新当前行的数据
              for (var i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                  list[i][field] = selectedStatus;
                  break;
                }
              }
              that.setData({
                list: list
              });
              
              wx.showToast({
                title: '状态已更新',
                icon: 'success'
              });
            },
            err: res => {
              console.log("更新失败!", res);
              wx.showToast({
                title: '更新失败',
                icon: 'none'
              });
            }
          });
        }
      }
    },
    fail: function(res) {
      console.log(res.errMsg);
    }
  });
},

showStatusPickerDirect: function(e) {
  var $collection = e.currentTarget.dataset;
  var id = $collection.id;
  var field = $collection.field;
  var currentValue = $collection.value;
  
  this.showStatusPicker(id, field, currentValue);
},

  hide9() {
    var that = this
    that.setData({
      modal9: false,
    })
  },

  //内嵌列表查找上一页数据
  lastpage: function () {
    var that = this
    if (that.data.IsLastPage && !(that.data.page == 1)) {
      that.data.IsLastPage = false
    }
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
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) desc) as rownumber, * from gongzi_qingjiashenpi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
        },
        success: res => {
          console.log("上一页进入成功：第" + this.data.page + "页")
          that.setData({
            list: res.result.recordset
          })
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {
          that.setData({
            page: this.data.page
          })
        }
      })
    }
  },
  
  //内嵌列表查找下一页数据
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
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) desc) as rownumber, * from gongzi_qingjiashenpi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
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
            page: this.data.page
          })
        }
      })
    }
  },

  showModal: function () {
    var animation = wx.createAnimation({
      duration: 220,
      timingFunction: "linear",
      delay: 0
    })
    animation.translateY(500).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  
  hideModal: function () {
    this.setData({
      showModalStatus: false
    })
  },

  getRegion: function (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      regionTxt: this.data.regionArr[index],
      tabIndex: index,
      showModalStatus: false
    })
    wx.showToast({
      title: '您选择了：' + this.data.regionArr[index],
      icon: "none"
    })
  },
  
  closeDrawer(e) {
    const mode = e.currentTarget.dataset.mode;
    if (mode == "left") {
      this.setData({
        leftDrawer: false
      })
    } else {
      this.setData({
        rightDrawer: false
      })
    }
  },
  
  rightDrawer() {
    this.setData({
      rightDrawer: true
    })
  },
  
  leftDrawer() {
    this.setData({
      leftDrawer: true
    })
  },

  //用于刷新页面时保持页数，或者跳转到某一页
  baochi: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 * from(select row_number() over(order by cast(id as int) desc) as rownumber, * from gongzi_qingjiashenpi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
      },
      success: res => {
        if(res.result.recordset==""){
          that.setData({
            list: ""
          })
        }else{
          that.setData({
            list: res.result.recordset
          })
        }
      },
      err: res => {
        console.log("错误!", res)
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_qingjiashenpi where gongsi = '"+that.data.companyName+"'"
      },
      success: res => {
        that.setData({
          maxpagenumber: Math.ceil(res.result.recordset[0].maxpagenumber / 100)
        })
        console.log(that.data.maxpagenumber)
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title1;
    var cloudList = {
      name : '请假审批记录',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:title[i].width,
        columnName:title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu : 'true',
              fileType : 'xlsx',
              success : res=> {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail : res=> {
        console.log(res)
      }
    })
  },
/**
 * 更新考勤记录表
 * @param {Object} record - 当前请假记录
 * @param {String} status - 新的审批状态
 */
updateAttendanceRecord: function(record, status) {
  var that = this;
  
  // 获取必要信息
  var xingming = record.xingming || ''; // 员工姓名
  var bumen = record.bumen || ''; // 部门
  var companyName = record.gongsi || that.data.companyName; // 公司名
  var startDate = record.qsqingjiashijian || ''; // 起始请假日期
  var endDate = record.jzqingjiashijan || ''; // 截止请假日期
  
  console.log('考勤更新参数:', {
    xingming, bumen, companyName, startDate, endDate, status
  });
  
  if (!xingming || !startDate || !endDate) {
    console.log('❌ 缺少必要参数，无法更新考勤记录');
    return;
  }
  
  // 解析起始和结束日期
  var startDateObj = new Date(startDate);
  var endDateObj = new Date(endDate);
  
  // 获取年月信息
  var startYear = startDateObj.getFullYear();
  var startMonth = startDateObj.getMonth() + 1;
  var endYear = endDateObj.getFullYear();
  var endMonth = endDateObj.getMonth() + 1;
  
  // 确保月份是两位数
  startMonth = startMonth < 10 ? '0' + startMonth : startMonth.toString();
  endMonth = endMonth < 10 ? '0' + endMonth : endMonth.toString();
  
  console.log('日期范围:', startYear + '-' + startMonth + ' 到 ' + endYear + '-' + endMonth);
  
  // 定义日期字段映射（与punch.js中的一致）
  var dayFieldMap = {
    1: 'E', 2: 'F', 3: 'G', 4: 'H', 5: 'I', 6: 'J', 7: 'K', 8: 'L', 9: 'M', 10: 'N',
    11: 'O', 12: 'P', 13: 'Q', 14: 'R', 15: 'S', 16: 'T', 17: 'U', 18: 'V', 19: 'W', 20: 'X',
    21: 'Y', 22: 'Z', 23: 'AA', 24: 'AB', 25: 'AC', 26: 'AD', 27: 'AE', 28: 'AF', 29: 'AG', 30: 'AH', 31: 'AI'
  };
  
  // 遍历请假期间的所有日期
  var currentDate = new Date(startDateObj);
  while (currentDate <= endDateObj) {
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    
    // 确保月份是两位数
    var formattedMonth = month < 10 ? '0' + month : month.toString();
    var formattedYear = year.toString();
    
    // 获取对应的数据库字段
    var dayField = dayFieldMap[day];
    
    if (dayField) {
      // 根据审批状态更新考勤记录
      if (status === '通过') {
        // 审批通过，将对应日期字段值改为'休'
        that.updateSingleDayAttendance(xingming, formattedYear, formattedMonth, dayField, companyName, '休', true);
      } else if (status === '驳回' || status === '待审批') {
        // 审批驳回或待处理，需要检查原始值
        that.checkAndUpdateDayAttendance(xingming, formattedYear, formattedMonth, dayField, companyName);
      }
    }
    
    // 日期加1天
    currentDate.setDate(currentDate.getDate() + 1);
  }
},

/**
 * 更新单日考勤记录
 */
updateSingleDayAttendance: function(xingming, year, month, dayField, companyName, newValue, forceUpdate) {
  var that = this;
  
  var updateQuery = `UPDATE gongzi_kaoqinjilu 
                     SET ${dayField} = '${newValue}'
                     WHERE name = '${xingming}' 
                     AND year = '${year}' 
                     AND moth = '${month}' 
                     AND AO = '${companyName}'`;
  
  console.log('更新考勤SQL:', updateQuery);
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: { query: updateQuery },
    success: res => {
      console.log(`✅ 考勤记录更新成功: ${year}-${month}-${dayField} = ${newValue}`);
      // 更新统计信息
      that.updateAttendanceStatistics(xingming, year, month, companyName);
    },
    fail: err => {
      console.error('❌ 更新考勤记录失败:', err);
      // 如果记录不存在，插入新记录
      if (forceUpdate) {
        that.insertAttendanceRecord(xingming, year, month, dayField, companyName, newValue);
      }
    }
  });
},

/**
 * 检查并更新单日考勤记录
 */
checkAndUpdateDayAttendance: function(xingming, year, month, dayField, companyName) {
  var that = this;
  
  // 先查询当前值
  var query = `SELECT ${dayField} as currentValue FROM gongzi_kaoqinjilu 
               WHERE name = '${xingming}' 
               AND year = '${year}' 
               AND moth = '${month}' 
               AND AO = '${companyName}'`;
  
  console.log('查询考勤SQL:', query);
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: { query: query },
    success: res => {
      if (res.result && res.result.recordset && res.result.recordset.length > 0) {
        var currentValue = res.result.recordset[0].currentValue;
        
        if (currentValue === '休') {
          // 如果原本值是'休'，则清空
          that.updateSingleDayAttendance(xingming, year, month, dayField, companyName, '', false);
        } else {
          console.log(`当前值不是'休'，保持原状: ${currentValue}`);
        }
      } else {
        console.log('没有找到对应的考勤记录');
      }
    },
    fail: err => {
      console.error('查询考勤记录失败:', err);
    }
  });
},

/**
 * 插入新的考勤记录
 */
insertAttendanceRecord: function(xingming, year, month, dayField, companyName, value) {
  var insertQuery = `INSERT INTO gongzi_kaoqinjilu (
    name, year, moth, ${dayField}, AO
  ) VALUES (
    '${xingming}', '${year}', '${month}', '${value}', '${companyName}'
  )`;
  
  console.log('插入考勤SQL:', insertQuery);
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: { query: insertQuery },
    success: res => {
      console.log('✅ 插入考勤记录成功');
    },
    fail: err => {
      console.error('❌ 插入考勤记录失败:', err);
    }
  });
},

/**
 * 更新统计信息
 */
updateAttendanceStatistics: function(xingming, year, month, companyName) {
  var that = this;
  
  // 延迟执行，确保数据已更新
  setTimeout(() => {
    var dayFieldMap = {
      1: 'E', 2: 'F', 3: 'G', 4: 'H', 5: 'I', 6: 'J', 7: 'K', 8: 'L', 9: 'M', 10: 'N',
      11: 'O', 12: 'P', 13: 'Q', 14: 'R', 15: 'S', 16: 'T', 17: 'U', 18: 'V', 19: 'W', 20: 'X',
      21: 'Y', 22: 'Z', 23: 'AA', 24: 'AB', 25: 'AC', 26: 'AD', 27: 'AE', 28: 'AF', 29: 'AG', 30: 'AH', 31: 'AI'
    };
    
    // 查询当前用户的考勤记录
    var query = `SELECT * FROM gongzi_kaoqinjilu 
                 WHERE name = '${xingming}' 
                 AND year = '${year}' 
                 AND moth = '${month}' 
                 AND AO = '${companyName}'`;
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: { query: query },
      success: res => {
        if (res.result && res.result.recordset && res.result.recordset.length > 0) {
          var record = res.result.recordset[0];
          
          // 统计出勤天数（AJ字段）
          var attendanceCount = 0;
          // 统计迟到早退天数（AN字段）
          var lateEarlyCount = 0;
          
          // 遍历1-31天的字段
          for (var day = 1; day <= 31; day++) {
            var fieldName = dayFieldMap[day];
            var value = record[fieldName];
            
            if (value) {
              // 判断是否出勤：出勤、早签、迟到（但不算旷勤）
              if (value === '出勤' || value === '早签' || value === '迟到' || value === '早退') {
                attendanceCount++;
              }
              
              // 判断是否迟到或早退
              if (value === '迟到' || value === '早退') {
                lateEarlyCount++;
              }
            }
          }
          
          console.log(`📊 统计结果 - 出勤天数: ${attendanceCount}, 迟到早退天数: ${lateEarlyCount}`);
          
          // 更新数据库中的统计字段
          var updateQuery = `UPDATE gongzi_kaoqinjilu 
                             SET AK = ${attendanceCount}, AN = ${lateEarlyCount}
                             WHERE name = '${xingming}' 
                             AND year = '${year}' 
                             AND moth = '${month}' 
                             AND AO = '${companyName}'`;
          
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: { query: updateQuery },
            success: res => {
              console.log('✅ 统计信息更新成功');
            },
            fail: err => {
              console.error('❌ 更新统计信息失败:', err);
            }
          });
        }
      },
      fail: err => {
        console.error('❌ 查询考勤记录失败:', err);
      }
    });
  }, 1000); // 延迟1秒确保数据已更新
},

})