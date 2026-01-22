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
        text: "姓名",
        width: 20,
        columnName: "xingming",
        type: "text",
        isupd: true
      },
      {
        text: "提交日期",
        width: 20,
        columnName: "tijiaoriqi",
        type: "text",
        isupd: true
      },
      {
        text: "申请原因",
        width: 20,
        columnName: "shenqingyuanyin",
        type: "text",
        isupd: true
      },
      {
        text: "审批结果",
        width: 20,
        columnName: "shenpijieguo",
        type: "select",
        options: ["通过", "驳回"],
        isupd: true
      },
      {
        text: "审批原因",
        width: 20,
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
    selectOptions: ["通过", "驳回"],
    selectedValue: "",
    showSelectModal: false,
    currentSelectField: ""
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
          // 修改点1：表名改为 gongzi_lizhishenpi
          var sql = "delete from gongzi_lizhishenpi where id = "+ dbid
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
      title: '离职管理表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    console.log('onLoad')
    console.log('公司名称',_this.data.companyName)

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 * from gongzi_lizhishenpi where gongsi = '"+_this.data.companyName+"' order by id desc"
      },
      success: res => {
        console.log("进入成功",res)
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
    // 修改点3：统计表名改为 gongzi_lizhishenpi
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_lizhishenpi where gongsi = '"+that.data.companyName+"'"
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

  // 日期选择相关函数
  nianyueri: function (e) {
    // 此函数用于处理日期字段
    console.log("日期选择");
  },
  
    // 显示选择审批结果的模态框
    showSelectResult: function (e) {
      var that = this;
      var $collection = e.currentTarget.dataset;
      that.setData({
        currentSelectField: $collection.field,
        selectedValue: $collection.value || "",
        showSelectModal: true,
        currentRowId: $collection.id
      });
    },

  // 处理选择结果
  handleSelectChange: function (e) {
    var value = e.detail.value;
    var selectedText = this.data.selectOptions[value];
    this.setData({
      selectedValue: selectedText
    });
  },

  // 确认选择
  confirmSelect: function () {
    var that = this;
    var field = that.data.currentSelectField;
    var value = that.data.selectedValue;
    var id = that.data.currentRowId;
    
    if (!value) {
      wx.showToast({
        title: '请选择审批结果',
        icon: 'none'
      });
      return;
    }
    
    // 更新数据库，直接保存选项文本
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update gongzi_lizhishenpi set " + field + " = '" + value + "' where id = '" + id + "'"
      },
      success: res => {
        console.log('更新审批结果成功');
        that.setData({
          showSelectModal: false,
          selectedValue: "",
          currentSelectField: ""
        });
        that.baochi(); // 刷新数据
        wx.showToast({
          title: '更新成功',
          icon: 'success'
        });
      },
      err: res => {
        console.log("错误!", res);
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
      }
    });
  },

  // 取消选择
  cancelSelect: function () {
    this.setData({
      showSelectModal: false,
      selectedValue: "",
      currentSelectField: ""
    });
  },


  showM: function () {
    var that = this
    wx.showModal({
      title: '请选择操作',
      content: '确认添加新的离职申请？',
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

  // 显示日期选择
  show: function (e) {
    var that = this;
    var field = e.currentTarget.dataset.field;
    var currentValue = e.currentTarget.dataset.value;
    
    // 设置当前选中的日期字段
    that.setData({
      currentDateField: field,
      setDateTime: currentValue || "",
      type: 2 // 设置为日期类型
    });
    
    this.dateTime.show();
  },
  
  // 日期选择变化
  change: function (e) {
    var that = this;
    var value = e.detail.result;
    var field = that.data.currentDateField;
    var id = that.data.currentEditId;
    
    // 更新数据库
    if (id && field && value) {
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "update gongzi_lizhishenpi set " + field + " = '" + value + "' where id = '" + id + "'"
        },
        success: res => {
          console.log('更新日期成功');
          that.baochi(); // 刷新数据
          wx.showToast({
            title: '日期已更新',
            icon: 'success'
          });
        },
        err: res => {
          console.log("错误!", res);
          wx.showToast({
            title: '更新失败',
            icon: 'none'
          });
        }
      });
    }
  },

  //添加
  tianjia: function () {
    // 日期添加相关逻辑
  },

  //添加新记录
  kuaisutianjia: function () {
    var that = this
    // 获取当天日期，格式为 YYYY-MM-DD
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');
    var todayStr = year + '-' + month + '-' + day;
    
    console.log("插入日期:", todayStr);
    
    // 插入新记录时自动插入当天日期
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "insert into gongzi_lizhishenpi (gongsi, tijiaoriqi) values('" + that.data.companyName + "', '" + todayStr + "')"
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

  /*刷新页面 */
  shuaxin: function (e) {
    var that = this
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
    that.onLoad()
    wx.showToast({
      title: '同步数据成功',
      icon: 'none'
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
    console.log("选中单元格的信息：", that.data.id, that.data.edit_old)
    console.log("提交成功，得到的值为:", that.data.edit_new)
    console.log("标记位为：", that.data.mark)
    
    // 修改点5：更新表名
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update gongzi_lizhishenpi set " + that.data.mark + " = '" + that.data.edit_new + "' where id = '" + that.data.id + "'"
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
    
    // 如果是审批结果字段，显示选择模态框而不是编辑模态框
    if ($collection.doinb === 'shenpijieguo') {
      that.showSelectResult(e);
      return;
    }
    
    // 如果是提交日期字段，不进行编辑
    if ($collection.doinb === 'tijiaoriqi') {
      wx.showToast({
        title: '提交日期不可编辑',
        icon: 'none'
      });
      return;
    }
    
    // 其他字段使用原来的编辑方式
    that.setData({
      input_type : $collection.type,
      id: $collection.id,
      name: $collection.name,
      edit_old: $collection.x,
      mark: $collection.doinb,
      modal9: true
    })
    console.log(that.data.id, that.data.name, that.data.edit_old, that.data.modal9)
    console.log("对应数据库中查找的标记位为:", that.data.mark)
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
      // 修改点6：分页查询表名和字段
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) desc) as rownumber, * from gongzi_lizhishenpi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
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
      // 修改点7：分页查询表名和字段
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) desc) as rownumber, * from gongzi_lizhishenpi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
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
    // 修改点8：保持页数的查询，表名和字段
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 * from(select row_number() over(order by cast(id as int) desc) as rownumber, * from gongzi_lizhishenpi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
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

    // 更新总页数
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_lizhishenpi where gongsi = '"+that.data.companyName+"'"
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

  /*刷新页面 */
  shuaxin: function (e) {
    var that = this
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
    that.baochi()
    wx.showToast({
      title: '同步数据成功',
      icon: 'none'
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
      name : '离职管理表',
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
})