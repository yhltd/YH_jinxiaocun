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

     // 添加状态选项
     statusOptions: [
      { label: '通过', value: '通过' },
      { label: '驳回', value: '驳回' },
    ],

     // 文件上传相关数据
     showUploadModal: false,
     showFileViewModal: false,
     selectedFiles: [],
     currentRecordId: 0,
     currentRecordName: '',
     fileDescription: '',
     uploading: false,
     uploadProgress: 0,
     
     currentFileList: [],
     currentFileName: '',

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
        text: "投历人名",
        width: 20,
        columnName: "touliren",
        type: "text",
        isupd: true
      },
      {
        text: "学历",
        width: 20,
        columnName: "xueli",
        type: "text",
        isupd: true
      },
      {
        text: "目标岗位",
        width: 20,
        columnName: "mubiaogangwei",
        type: "text",
        isupd: true
      },
      {
        text: "提交时间",
        width: 20,
        columnName: "tijiaoshijian",
        type: "text",
        isupd: true
      },
      {
        text: "文件",
        width: 20,
        columnName: "wenjian",
        type: "text",
        isupd: true
      },
      {
        text: "备注",
        width: 20,
        columnName: "beizhu",
        type: "text",
        isupd: true
      },
      {
        text: "状态",
        width: 20,
        columnName: "zhuangtai",
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
    edit_new: ''
  },

  click_delete: function (e) {
    var _this = this;
    
    var $collection = e.currentTarget.dataset
    var dbid = $collection.dbid
    var id = $collection.id
    
    wx.showModal({
      title: '操作选择',
      content: '确认删除么？序号'+id,
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是"取消"
      cancelColor: '', //取消文字的颜色
      confirmText: "删除", //默认是"确定"
      confirmColor: '#DD5044', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          // 第一步：先查询该记录是否有文件
          wx.showLoading({
            title: '检查文件中...',
            mask: true
          });
          
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: "select wenjian from gongzi_jianliguanli where id = " + dbid
            },
            success: res => {
              wx.hideLoading();
              
              if (res.result.recordset.length > 0) {
                var wenjian = res.result.recordset[0].wenjian || '';
                
                // 如果有文件，弹出提示并结束操作
                if (wenjian && wenjian.trim() !== '') {
                  wx.showModal({
                    title: '无法删除',
                    content: '该记录关联了文件，请先删除所有文件后再删除记录。',
                    showCancel: false,
                    confirmText: '知道了',
                    confirmColor: '#5677fc',
                    success: function(res) {
                      if (res.confirm) {
                        // 用户点击知道了，结束操作
                        console.log('用户确认，结束删除操作');
                      }
                    }
                  });
                  return; // 结束操作
                }
              }
              
              // 没有文件，直接删除记录
              _this.deleteRecordDirectly(dbid, id);
            },
            err: res => {
              wx.hideLoading();
              console.log("查询文件失败!", res);
              
              // 查询失败，询问用户是否继续删除
              wx.showModal({
                title: '查询失败',
                content: '无法确认是否有关联文件，是否继续删除记录？',
                confirmText: '继续删除',
                cancelText: '取消',
                success: function(res) {
                  if (res.confirm) {
                    _this.deleteRecordDirectly(dbid, id);
                  }
                }
              });
            }
          })
        }
      },
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  
  // 直接删除记录（没有文件的情况）
  deleteRecordDirectly: function(dbid, id) {
    var that = this;
    
    wx.showLoading({
      title: '正在删除记录...',
      mask: true
    });
    
    // 修改：表名改为 gongzi_jianliguanli
    var sql = "delete from gongzi_jianliguanli where id = "+ dbid;
    console.log(sql);
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        wx.hideLoading();
        that.baochi();
        wx.showToast({
          title: '删除成功！序号为' + id,
          icon: 'success',
          duration: 2000
        });
      },
      err: res => {
        wx.hideLoading();
        console.log("错误!", res);
        wx.showToast({
          title: '删除记录失败',
          icon: 'none'
        });
      }
    });
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
      title: '简历审批表' // 修改标题
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    console.log('onLoad')

    // 修改：查询表改为 gongzi_jianliguanli，查询所有7个字段
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 id, touliren, xueli, mubiaogangwei, tijiaoshijian, wenjian, beizhu, zhuangtai from gongzi_jianliguanli where gongsi = '"+_this.data.companyName+"' and zhuangtai = '待处理' order by id desc"
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

    // 如果需要查询标题配置，这里可能需要调整
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
    // 修改：统计表名改为 gongzi_jianliguanli
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_jianliguanli where gongsi = '"+that.data.companyName+"' and zhuangtai = '待处理'"
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

  nianyueri: function (e) {
    console.log("日期功能");
  },
  
  showM: function () {
    var that = this
    wx.showModal({
      title: '请选择操作',
      content: '确认添加新的简历记录？',
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

  show: function () {
  },
  
  change: function (e) {
  },
  
  tianjia: function () {
  },

  kuaisutianjia: function () {
    var that = this
    // 修改：插入表名改为 gongzi_jianliguanli，可以设置默认值
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "insert into gongzi_jianliguanli (gongsi, tijiaoshijian, zhuangtai) values('"+that.data.companyName+"', CONVERT(varchar(10), GETDATE(), 120), '待处理')"
      },
      success: res => {
        console.log("插入成功!!!!!!")
        that.baochi()
      },
      err: res => {
        console.log("错误!", res)
      }
    })
  },

  edit_cell(e) {
    var that = this;
    
    var newValue = '';
    
    // 如果是状态字段，从选择器获取值
    if (that.data.isStatusField) {
      if (that.data.statusIndex >= 0) {
        newValue = that.data.statusOptions[that.data.statusIndex].value;
      } else {
        wx.showToast({
          title: '请选择状态',
          icon: 'none'
        });
        return;
      }
    } else {
      // 原有获取输入框值的逻辑
      var formData = e.detail ? e.detail.value : {};
      if (formData && formData.value !== undefined) {
        newValue = formData.value;
      } else {
        console.warn("表单数据格式异常:", e);
        return;
      }
      
      if (newValue.length == 0) {
        newValue = that.data.edit_old;
      }
    }
    
    console.log("提交成功，得到的值为:", newValue);
    console.log("字段为：", that.data.mark);
    console.log("ID为：", that.data.id);
    
    // 显示加载中
    wx.showLoading({
      title: '更新中...',
    });
    
    // 构建更新SQL
    var safeValue = (newValue || '').replace(/'/g, "''");
    var sql = "update gongzi_jianliguanli set " + that.data.mark + " = '" + safeValue + "' where id = " + that.data.id;
    
    console.log("执行SQL:", sql);
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        wx.hideLoading();
        console.log("更新成功:", res);
        
        // 关闭弹窗并重置状态
        that.setData({
          modal9: false,
          isStatusField: false,
          statusIndex: -1,
          modalTitle: ''
        });
        
        // 刷新数据
        that.baochi();
        
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 2000
        });
      },
      err: res => {
        wx.hideLoading();
        console.log("更新失败:", res);
        
        wx.showToast({
          title: '更新失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  
  click_edit(e) {
    var that = this;
    
    var $collection = e.currentTarget.dataset;
    
    // 确保id是数字
    var recordId = parseInt($collection.id);
    if (isNaN(recordId)) {
      console.error("ID不是有效数字:", $collection.id);
      wx.showToast({
        title: '记录ID无效',
        icon: 'none'
      });
      return;
    }
    
    var fieldName = $collection.doinb || '';
    var currentValue = $collection.x || '';
    var isStatusField = (fieldName === 'zhuangtai');
    var statusIndex = -1;
    
    // 如果是状态字段，查找当前值对应的索引
    if (isStatusField && currentValue) {
      var options = that.data.statusOptions;
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === currentValue) {
          statusIndex = i;
          break;
        }
      }
    }
    
    that.setData({
      input_type: $collection.type || 'text',
      id: recordId,
      edit_old: currentValue,
      mark: fieldName,
      modal9: true,
      edit_new: currentValue,
      isStatusField: isStatusField,
      statusIndex: statusIndex,
      modalTitle: isStatusField ? '修改状态' : '修改'
    });
  },

  onStatusChange: function(e) {
    var index = e.detail.value;
    this.setData({
      statusIndex: index
    });
  },


  hide9() {
    console.log("关闭弹窗");
    this.setData({
      modal9: false,
      isStatusField: false,
      statusIndex: -1,
      modalTitle: ''
    });
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
      // 修改：分页查询表名改为 gongzi_jianliguanli
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, * from gongzi_jianliguanli) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"' and zhuangtai = '待处理'"
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
      // 修改：分页查询表名改为 gongzi_jianliguanli
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, * from gongzi_jianliguanli) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"' and zhuangtai = '待处理'"
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
    // 修改：保持页数的查询，表名改为 gongzi_jianliguanli
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, * from gongzi_jianliguanli) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"' and zhuangtai = '待处理'"
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

    // 修改：统计表名改为 gongzi_jianliguanli
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_jianliguanli where gongsi = '"+that.data.companyName+"' and zhuangtai = '待处理'"
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
    var title = _this.data.title1; // 使用7个字段的配置
    var cloudList = {
      name : '简历管理表',
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

  //--------上传文件----------
  showUploadModalFunc: function(e) {
    var recordId = e.currentTarget.dataset.id || 0;
    var recordName = e.currentTarget.dataset.name || '';
    
    console.log('上传弹窗，记录ID:', recordId, '姓名:', recordName);
    
    this.setData({
      showUploadModal: true,
      selectedFiles: [],
      currentRecordId: recordId,
      currentRecordName: recordName,
      fileName: '', // 清空文件名称输入框
      fileDescription: '',
      uploading: false,
      uploadProgress: 0
    });
  },

  onFileDescriptionInput: function(e) {
    this.setData({
      fileDescription: e.detail.value
    });
  },

  viewFiles: function(e) {
  var that = this;
  var recordId = e.currentTarget.dataset.id;
  var recordName = e.currentTarget.dataset.name || '';
  
  console.log('查看文件，记录ID:', recordId, '姓名:', recordName);
  
  // 查询当前记录的文件信息
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select wenjian, touliren from gongzi_jianliguanli where id = " + recordId
    },
    success: res => {
      console.log('查询文件结果:', res);
      
      var fileList = [];
      if (res.result.recordset.length > 0) {
        var record = res.result.recordset[0];
        var files = record.wenjian || '';
        var name = record.touliren || recordName;
        
        // 如果是逗号分隔的多个文件
        if (files && files.trim() !== '') {
          if (files.includes(',')) {
            fileList = files.split(',').map(file => file.trim());
          } else {
            fileList = [files];
          }
        }
        
        that.setData({
          showFileViewModal: true,
          currentFileList: fileList,
          currentFileName: name,
          currentRecordId: recordId
        });
      }
    },
    err: res => {
      console.log("查询文件失败:", res);
      wx.showToast({
        title: '查询文件失败',
        icon: 'none'
      });
    }
  });
},

 // 预览文件（新增）
 previewFile: function(e) {
  var fileUrl = e.currentTarget.dataset.url;
  console.log('预览文件:', fileUrl);
  
  if (!fileUrl) {
    wx.showToast({
      title: '文件地址无效',
      icon: 'none'
    });
    return;
  }
  
  // 判断文件类型
  var fileExtension = fileUrl.split('.').pop().toLowerCase();
  var imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
  
  if (imageExtensions.includes(fileExtension)) {
    // 图片文件，使用预览
    wx.previewImage({
      urls: [fileUrl],
      current: fileUrl,
      success: function() {
        console.log('图片预览成功');
      },
      fail: function(err) {
        console.error('图片预览失败:', err);
        wx.showToast({
          title: '预览失败',
          icon: 'none'
        });
      }
    });
  } else if (fileExtension === 'pdf') {
    // PDF文件，尝试在浏览器中打开
    wx.showModal({
      title: '打开PDF',
      content: 'PDF文件需要在浏览器中打开，是否复制链接？',
      success: function(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: fileUrl,
            success: function() {
              wx.showToast({
                title: '链接已复制，请在浏览器中打开',
                icon: 'success'
              });
            }
          });
        }
      }
    });
  } else {
    // 其他文件类型，复制链接
    wx.setClipboardData({
      data: fileUrl,
      success: function() {
        wx.showToast({
          title: '链接已复制',
          icon: 'success'
        });
      }
    });
  }
},

// 选择文件
chooseFile: function() {
  var that = this;
  
  wx.chooseMessageFile({
    count: 9,
    type: 'file',
    extension: ['jpg', 'png', 'jpeg', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'],
    success: function(res) {
      var files = res.tempFiles.map(file => {
        return {
          path: file.path,
          name: file.name,
          size: file.size,
          type: file.type
        };
      });
      
      that.setData({
        selectedFiles: files
      });
      
      wx.showToast({
        title: `已选择 ${files.length} 个文件`,
        icon: 'none',
        duration: 1500
      });
    },
    fail: function(err) {
      console.error('选择文件失败:', err);
      wx.showToast({
        title: '选择文件失败',
        icon: 'none'
      });
    }
  });
},

// 选择图片
chooseImage: function() {
  var that = this;
  
  wx.chooseMedia({
    count: 9,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    success: function(res) {
      var files = res.tempFiles.map((file, index) => {
        // 获取文件扩展名
        var fileExtension = 'jpg';
        if (file.tempFilePath) {
          var match = file.tempFilePath.match(/\.([^\.]+)$/);
          if (match) {
            fileExtension = match[1].toLowerCase();
          }
        }
        
        return {
          path: file.tempFilePath,
          name: `简历照片_${index + 1}.${fileExtension}`,
          size: file.size,
          type: 'image'
        };
      });
      
      that.setData({
        selectedFiles: files
      });
      
      wx.showToast({
        title: `已选择 ${files.length} 张图片`,
        icon: 'none',
        duration: 1500
      });
    },
    fail: function(err) {
      console.error('选择图片失败:', err);
      wx.showToast({
        title: '选择图片失败',
        icon: 'none'
      });
    }
  });
},

  // 隐藏文件上传弹窗
  hideUploadModal: function() {
    this.setData({
      showUploadModal: false,
      uploading: false,
      uploadProgress: 0,
      selectedFiles: [],
      fileName: '', // 清空文件名称
      fileDescription: ''
    });
  },

  // 选择文件（简化版，基于您的模式）
  chooseFile: function() {
    var that = this;
    
    wx.chooseMessageFile({
      count: 9, // 最多选择9个文件
      type: 'file',
      extension: ['jpg', 'png', 'jpeg', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx'],
      success: function(res) {
        var files = res.tempFiles.map(file => {
          return {
            path: file.path,
            name: file.name,
            size: file.size,
            type: file.type
          };
        });
        
        that.setData({
          selectedFiles: files
        });
        
        wx.showToast({
          title: `已选择 ${files.length} 个文件`,
          icon: 'none'
        });
      },
      fail: function(err) {
        console.error('选择文件失败:', err);
        wx.showToast({
          title: '选择文件失败',
          icon: 'none'
        });
      }
    });
  },

  // 选择图片（基于您的 imgload 函数模式）
  chooseImage: function() {
    var that = this;
    
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var files = res.tempFiles.map((file, index) => {
          return {
            path: file.tempFilePath,
            name: `image_${Date.now()}_${index + 1}.jpg`,
            size: file.size,
            type: 'image'
          };
        });
        
        that.setData({
          selectedFiles: files
        });
        
        wx.showToast({
          title: `已选择 ${files.length} 张图片`,
          icon: 'none'
        });
      },
      fail: function(err) {
        console.error('选择图片失败:', err);
        wx.showToast({
          title: '选择图片失败',
          icon: 'none'
        });
      }
    });
  },

  // 文件名称输入
  onFileNameInput: function(e) {
    this.setData({
      fileName: e.detail.value
    });
  },

  // 订单号输入
  onOrderNumberInput: function(e) {
    this.setData({
      orderNumber: e.detail.value
    });
  },

  // 上传文件（基于您的 add1 函数模式）
  uploadFile: function() {
    var that = this;
    
    // 验证
    if (that.data.selectedFiles.length === 0) {
      wx.showToast({
        title: '请选择文件',
        icon: 'none'
      });
      return;
    }
    
    if (!that.data.currentRecordId) {
      wx.showToast({
        title: '请先选择一条简历记录',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '确认上传',
      content: `确定要为 "${that.data.currentRecordName}" 上传 ${that.data.selectedFiles.length} 个简历文件吗？`,
      success: function(res) {
        if (res.confirm) {
          that.startUpload();
        }
      }
    });
  },

  // 开始上传（修改为简历管理场景）
  startUpload: function() {
    var that = this;
    var uploadedFiles = [];
    var totalFiles = that.data.selectedFiles.length;
    var completedCount = 0;
    
    that.setData({
      uploading: true,
      uploadProgress: 0
    });
    
    // 获取记录信息和用户输入的文件名
    var recordId = that.data.currentRecordId;
    var recordName = that.data.currentRecordName || '未知人员';
    var userFileName = that.data.fileName || ''; // 获取用户输入的文件名
    
    // 按顺序上传每个文件
    function uploadNextFile(index) {
      if (index >= totalFiles) {
        // 所有文件上传完成
        that.handleUploadComplete(uploadedFiles);
        return;
      }
      
      var file = that.data.selectedFiles[index];
      var fileExtension = file.name.split('.').pop().toLowerCase();
      
      // 构建最终文件名：基于用户输入的文件名
      var finalFileName = '';
      
      if (userFileName && userFileName.trim() !== '') {
        // 清理文件名中的非法字符
        var baseName = userFileName.trim().replace(/[\\/:*?"<>|]/g, '_');
        
        // 如果文件名已经包含扩展名，去掉它
        if (baseName.includes('.')) {
          baseName = baseName.split('.').slice(0, -1).join('.');
        }
        
        // 多文件上传时添加序号后缀
        if (totalFiles === 1) {
          finalFileName = `${baseName}.${fileExtension}`;
        } else {
          finalFileName = `${baseName}_${index + 1}.${fileExtension}`;
        }
      } else {
        // 如果用户没有输入文件名，使用默认命名
        var safeRecordName = recordName.replace(/[\\/:*?"<>|]/g, '_').substring(0, 10);
        if (totalFiles === 1) {
          finalFileName = `简历_${safeRecordName}.${fileExtension}`;
        } else {
          finalFileName = `简历_${safeRecordName}_${index + 1}.${fileExtension}`;
        }
      }
      
      // 更新上传进度
      var progress = Math.round((index / totalFiles) * 100);
      that.setData({
        uploadProgress: progress
      });
      
      console.log(`开始上传第 ${index + 1} 个文件:`, finalFileName);
      
      // 直接使用 wx.uploadFile 上传
      wx.uploadFile({
        url: 'https://yhocn.cn:9097/file/upload',
        filePath: file.path,
        name: 'file',
        formData: {
          name: finalFileName,
          path: '/人事系统/简历文件/',
          kongjian: '3',
          fileType: fileExtension,
          recordId: recordId,
          recordName: recordName,
          userFileName: userFileName, // 保存用户输入的文件名
          originalName: file.name,
          index: index + 1,
          total: totalFiles,
          timestamp: Date.now()
        },
        header: {
          'Content-Type': 'multipart/form-data'
        },
        success: function(uploadRes) {
          completedCount++;
          
          try {
            var resData = JSON.parse(uploadRes.data);
            console.log(`第 ${index + 1} 个文件上传响应:`, resData);
            
            if (resData.code === 200 || resData.success) {
              // 构建文件URL
              var fileUrl = "http://yhocn.cn:9088/人事系统/简历文件/" + finalFileName;
              uploadedFiles.push({
                name: finalFileName,
                url: fileUrl,
                originalName: file.name,
                userFileName: userFileName,
                size: file.size,
                type: fileExtension
              });
              
              wx.showToast({
                title: `(${completedCount}/${totalFiles}) 上传成功`,
                icon: 'none',
                duration: 1000
              });
              
              // 继续上传下一个文件
              setTimeout(() => uploadNextFile(index + 1), 500);
            } else {
              wx.showToast({
                title: `第 ${index + 1} 个文件失败`,
                icon: 'none',
                duration: 2000
              });
              setTimeout(() => uploadNextFile(index + 1), 1000);
            }
          } catch (e) {
            console.error('解析响应失败:', e, uploadRes.data);
            // 即使解析失败也继续上传
            setTimeout(() => uploadNextFile(index + 1), 1000);
          }
        },
        fail: function(err) {
          completedCount++;
          console.error(`第 ${index + 1} 个文件上传失败:`, err);
          
          wx.showToast({
            title: `第 ${index + 1} 个文件上传失败`,
            icon: 'none',
            duration: 2000
          });
          
          setTimeout(() => uploadNextFile(index + 1), 1000);
        }
      });
    }
    
    // 开始上传第一个文件
    uploadNextFile(0);
  },

  

  // 处理上传完成
  handleUploadComplete: function(uploadedFiles) {
    var that = this;
    
    if (uploadedFiles.length > 0) {
      // 保存文件信息到数据库
      that.saveFilesToDatabase(uploadedFiles);
    }
    
    that.setData({
      uploading: false,
      uploadProgress: 100
    });
    
    setTimeout(() => {
      that.hideUploadModal();
      
      wx.showToast({
        title: `上传完成，成功 ${uploadedFiles.length} 个文件`,
        icon: 'success',
        duration: 3000
      });
      
      // 刷新页面数据
      setTimeout(() => {
        that.baochi();
    }, 1500);
}, 1000);
  },

  // 保存文件信息到数据库
  saveFilesToDatabase: function(files) {
    var that = this;
    
    if (!files || files.length === 0) return;
    
    // 查询现有文件
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select wenjian from gongzi_jianliguanli where id = " + that.data.currentRecordId
      },
      success: res => {
        var existingFiles = '';
        if (res.result.recordset.length > 0) {
          existingFiles = res.result.recordset[0].wenjian || '';
        }
        
        // 构建新的文件URL列表
        var newFileUrls = files.map(file => file.url);
        var allFileUrls = [];
        
        if (existingFiles && existingFiles.trim() !== '') {
          var existingArray = existingFiles.split(',').map(file => file.trim());
          allFileUrls = existingArray.concat(newFileUrls);
        } else {
          allFileUrls = newFileUrls;
        }
        
        var fileUrlsString = allFileUrls.join(',');
        
        // 更新数据库
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: "update gongzi_jianliguanli set wenjian = '" + fileUrlsString + "' where id = " + that.data.currentRecordId
          },
          success: res => {
            console.log('文件信息保存到数据库成功:', res);
          },
          err: res => {
            console.log('数据库保存失败:', res);
          }
        });
      },
      err: res => {
        console.log('查询现有文件失败:', res);
      }
    });
  },

  // 文件删除功能（基于您的模式）
  deleteFile: function(e) {
    var that = this;
    var fileUrl = e.currentTarget.dataset.url;
    var recordId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个文件吗？',
      success: function(res) {
        if (res.confirm) {
          that.deleteFileFromServer(fileUrl, recordId);
        }
      }
    });
  },

  // 删除服务器上的文件
  deleteFileFromServer: function(fileUrl, recordId) {
    var that = this;
    
    // 从URL中提取文件名
    var fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    var cleanFileName = fileName.split('.')[0]; // 移除扩展名
    
    console.log('删除文件:', fileName, '清理后:', cleanFileName);
    
    wx.showLoading({
      title: '删除中...',
      mask: true
    });
    
    // 直接调用删除接口（基于您的模式）
    wx.request({
      url: 'https://yhocn.cn:9097/file/delete',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        order_number: cleanFileName,
        path: '/人事系统/简历文件/'
      },
      success: function(res) {
        wx.hideLoading();
        console.log('删除响应:', res.data);
        
        if (res.data.code === 200 || res.data.success) {
          // 从数据库移除文件记录
          that.removeFileFromDatabase(fileUrl, recordId);
          
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '删除失败: ' + (res.data.msg || '未知错误'),
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function(err) {
        wx.hideLoading();
        console.error('删除请求失败:', err);
        wx.showToast({
          title: '删除请求失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  // 从数据库移除文件记录
  removeFileFromDatabase: function(fileUrl, recordId) {
    var that = this;
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select wenjian from gongzi_jianliguanli where id = " + recordId
      },
      success: res => {
        if (res.result.recordset.length > 0) {
          var currentFiles = res.result.recordset[0].wenjian || '';
          var fileArray = currentFiles.split(',');
          
          // 移除被删除的文件
          var newFileArray = fileArray.filter(file => file.trim() !== fileUrl.trim());
          var newFiles = newFileArray.join(',');
          
          // 更新数据库
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: "update gongzi_jianliguanli set wenjian = '" + newFiles + "' where id = " + recordId
            },
            success: res => {
              console.log('数据库更新成功');
              // 刷新数据
              that.baochi();
            },
            err: res => {
              console.log('数据库更新失败:', res);
            }
          });
        }
      },
      err: res => {
        console.log('查询文件列表失败:', res);
      }
    });
  },
  // 隐藏文件查看弹窗（新增）
  hideFileViewModal: function() {
    this.setData({
      showFileViewModal: false,
      currentFileList: [],
      currentFileName: '',
      currentRecordId: 0
    });
  },

  // 隐藏文件上传弹窗（新增）
  hideUploadModal: function() {
    this.setData({
      showUploadModal: false,
      uploading: false,
      uploadProgress: 0,
      selectedFiles: [],
      fileDescription: ''
    });
  },
})