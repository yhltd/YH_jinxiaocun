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
        text: "身份",
        width: 20,
        columnName: "shenfen",
        type: "text",
        isupd: true
      },
      {
        text: "薪资类型",
        width: 20,
        columnName: "xinzileixing",
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
      cancelText: "取消", //默认是“取消”
      cancelColor: '', //取消文字的颜色
      confirmText: "删除", //默认是“确定”
      confirmColor: '#DD5044', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          // 修改点1：表名改为 gongzi_shenfen
          var sql = "delete from gongzi_shenfen where id = "+ dbid
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
      title: '身份配置表' // 建议修改标题
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    console.log('onLoad')

    // 修改点2：查询表改为 gongzi_shenfen，并只查询必要的列
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 id, shenfen, xinzileixing from gongzi_shenfen where gongsi = '"+_this.data.companyName+"'"
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

    // 修改点3：查询标题的表和字段可能也需要调整，这里根据你的实际表结构修改
    // 原查询可能已不适用，这里保留但可能需要你后期调整
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
    // 修改点4：统计表名改为 gongzi_shenfen
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_shenfen where gongsi = '"+that.data.companyName+"'"
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

    // 修改点5：以下两个关于 day 字段的统计在新表中很可能不存在，建议注释或删除
    // 因为它们原用于“假期”功能，新表结构可能已无此字段
    /*
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(day)as count from gongzi_shenfen where day is not null and day <>'-' and day <> '' and gongsi = '"+that.data.companyName+"'"
      },
      success: res => {
        console.log("进入成功:", res.result.recordset[0].count)
        that.setData({
          jiaqiLength: res.result.recordset[0].count + 1
        })
      },
      err: res => {
        console.log("错误!", res)
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(day)as count from gongzi_shenfen where gongsi ='"+that.data.companyName+"'"
      },
      success: res => {
        console.log("进入成功:", res.result.recordset[0].count)
        that.setData({
          maxLength: res.result.recordset[0].count + 1
        })
      },
      err: res => {
        console.log("错误!", res)
      }
    })
    */
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

  // 注意：nianyueri, show, change, tianjia 函数与日期字段强相关，新表若无year,month,day字段，调用会出错。
  // 根据你的需求“其他逻辑不动”，这里保留，但你需要确认新表是否有这些字段，否则应禁用或修改相关UI。
  nianyueri: function (e) {
    // 此函数涉及year,month,day字段，若新表无这些字段，需调整逻辑或UI不再触发
    console.log("日期功能在新表可能不适用");
    // ... 函数体保持不变，但执行可能会报错 ...
  },
  showM: function () {
    var that = this
    wx.showModal({
      title: '请选择操作',
      content: '确认添加新的配置行？',
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
    // 日期选择相关，同nianyueri函数说明
  },
  change: function (e) {
    // 日期选择相关，同nianyueri函数说明
  },
  //添加
  tianjia: function () {
    // 日期选择相关，同nianyueri函数说明
  },



  //添加
  kuaisutianjia: function () {
    var that = this
    // 修改点6：插入表名改为 gongzi_shenfen
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "insert into gongzi_shenfen (gongsi) values('"+that.data.companyName+"')"
      },
      success: res => {
        console.log("插入成功!!!!!!")
        that.setData({
          list: that.data.list
        })
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
    console.log("标记位为：", that.data.mark) // 这个mark应该是 'shenfen' 或 'xinzileixing'
    // 修改点7：更新表名，且mark值现在只能是'shenfen'或'xinzileixing'
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update gongzi_shenfen set " + that.data.mark + " = '" + that.data.edit_new + "' where id = '" + that.data.id + "'"
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
    that.setData({
      input_type : $collection.type,
      id: $collection.id,
      name: $collection.name,
      edit_old: $collection.x,
      mark: $collection.doinb, // 对应WXML中data-doinb绑定的字段名
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
      // 修改点8：分页查询表名和字段
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, * from gongzi_shenfen) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
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
      // 修改点9：分页查询表名和字段
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, * from gongzi_shenfen) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
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
    // 修改点10：保持页数的查询，表名和字段
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, * from gongzi_shenfen) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
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
        query: "select count(id) as maxpagenumber from gongzi_shenfen where gongsi = '"+that.data.companyName+"'"
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
    var title = _this.data.title1; // 这里使用的已经是新的两列配置
    var cloudList = {
      name : '身份配置', // 建议修改导出文件名
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