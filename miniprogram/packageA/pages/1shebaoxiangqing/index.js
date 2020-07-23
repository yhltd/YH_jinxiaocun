Page({

  /**
   * 页面的初始数据
   */
  data: {
    result :[],
    input_type:"text",
    department:'',

    options01: [],
    options02: [],
    selected: {},
    title_bumen: '全选',
    title_gangwei: '全选',
    time: '',
    isMaskWindowShow: false,
    maskWindowList: [' 查询姓名', ' 查询部门', ' 查询岗位'],
    maskWindowList1: ['三项联合查询'],
    selectIndex: -1,
    isMaskWindowInputShow: false,
    isMaskWindowInputShow1: false,
    maskWindowInputValue: '',

    maxpagenumber: 0,
    showModalStatus: false,
    animationData: "",
    tabIndex: 26,
    leftDrawer: false,
    mode: "left",
    scrollTop: null,
    list: [],
    title: [],
    page: "1",
    IsLastPage: false,
    id: '',
    name: '',
    edit_old: '',
    modal9: false,
    mark: '',
    edit_new: '',
    companyName : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var department = options.message
    this.setData({
      department:department,
      companyName : options.companyName,
      result : JSON.parse(options.access)
    })
    //顶部信息
    wx.setNavigationBarTitle({
      title: options.message + '社保详情表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    //接收传回来的参数
    console.log("接收到的参数为", department)



    //云函数连接数据库
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select TOP 100 id,B,C,D,Z,AJ,(Z+AJ)AS COUNT1,AA,AK,(AA+AK)AS COUNT2,AC,AD,(Z+AA+AC+AD)AS COUNT3,(AJ + AK)AS COUNT4 from gongzi_gongzimingxi where C = '" + department + "' and BD = '"+this.data.companyName+"'"
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
        console.log("错误!")
      }
    })


    console.log("进入title查询")
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select shebaoxiangqing from gongzi_title where shebaoxiangqing is not null"
      },
      success: res => {
        this.setData({
          title: res.result.recordsets[0]
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    console.log('onLoad')


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(1) as maxpagenumber from (select top 100 * from gongzi_gongzimingxi where C = '"+that.data.department+"' and BD = '"+that.data.companyName+"')t1"
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
    if (that.data.options01 == '') {
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "SELECT ROW_NUMBER()  OVER(ORDER BY ID) Id,bumen as Name FROM gongzi_peizhi where bumen != '-' and bumen !='' and gongsi = '"+that.data.companyName+"'"
        },
        success: res => {
          console.log("姓名查询成功！", res.result)
          that.setData({
            options01: res.result.recordset
          })
        },
        err: res => {
          console.log("错误!", res)
        }
      })
    }
    if (that.data.options02 == '') {
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "SELECT ROW_NUMBER()  OVER(ORDER BY ID) Id,zhiwu as Name FROM gongzi_peizhi where zhiwu != '-' and zhiwu !='' and gongsi = '"+that.data.companyName+"'"
        },
        success: res => {
          console.log("姓名查询成功！", res.result)
          that.setData({
            options02: res.result.recordset
          })
        },
        err: res => {
          console.log("错误!", res)
        }
      })
    }
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

  /*函数名称：单选查询自定义蒙版
      作者：117
      时间：2020/5/26
    */
  /**
   * 取消操作
   */
  cancel: function (text) {
    // 实际取消操作
    this.setData({
      title_bumen: '全选',
      title_gangwei: '全选',
    })
  },

  /**
   * 页面查询按钮功能
   */
  searchBtn: function (e) {
    this.showMaskWindow();
  },

  //弹框以外区域点击
  maskWindowBgClick: function (e) {
    this.dismissMaskWindow();
  },

  //弹窗区域点击事件
  clickTap: function (e) {

  },

  //切换选择项事件
  maskWindowTableSelect: function (e) {
    var index = e.currentTarget.dataset.windowIndex;
    console.log(e.currentTarget.dataset)
    this.setData({
      selectIndex: e.currentTarget.dataset.windowIndex,
      isMaskWindowInputShow: index == 0 || index == 1 || index == 2,
      isMaskWindowInputShow1: index == 3
    })
  },

  //输入框输入绑定事件
  maskWindowInput: function (e) {
    var value = e.detail.value;
    var that = this
    this.setData({
      maskWindowInputValue: value
    })
    console.log(value)
    console.log(that.data.selectIndex)
  },

  //点击确定按钮之后的事件
  maskWindowOk: function (e) {
    var that = this
    var index = that.data.selectIndex;
    var input = that.data.maskWindowInputValue;
    console.log(input)

    if (index == 0) {
      //按姓名查询
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "select top 100 * from gongzi_gongzimingxi where B ='" + input + "' and BD = '"+that.data.companyName+"'"
        },
        success: res => {
          console.log("姓名查询成功！", res.result)
          that.setData({
            list: res.result.recordset
          })
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {

        }
      })
    } else if (index == 1) {
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "select top 100 * from gongzi_gongzimingxi where C ='" + input + "' and BD = '"+that.data.companyName+"'"
        },
        success: res => {
          console.log("姓名查询成功！", res.result)
          that.setData({
            list: res.result.recordset
          })
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {

        }
      })
    } else if (index == 2) {
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "select top 100 * from gongzi_gongzimingxi where D ='" + input + "' and BD = '"+that.data.companyName+"'"
        },
        success: res => {
          console.log("姓名查询成功！", res.result)
          that.setData({
            list: res.result.recordset
          })
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {

        }
      })
    } else if (index == 3) {
      console.log("input的值为:", input)
      if (input == '') {
        wx.showToast({
          title: '未输入姓名\n\t联合查询失败',
          icon: 'none',
          duration: 2000
        })
      } else if (that.data.title_gangwei != '全选' && that.data.title_bumen != '全选') {
        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: "select top 100 * from gongzi_gongzimingxi where B ='" + input + "'and C='" + that.data.title_bumen + "'and D='" + that.data.title_gangwei + "' and BD = '"+that.data.companyName+"'"
          },
          success: res => {
            console.log("姓名查询成功！", res.result)
            that.setData({
              list: res.result.recordset
            })
          },
          err: res => {
            console.log("错误!", res)
          },
        })
      } else if (that.data.title_gangwei != '全选' && that.data.title_bumen == '全选') {
        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: "select top 100 * from gongzi_gongzimingxi where B ='" + input + "'and D='" + that.data.title_gangwei + "' and BD = '"+that.data.companyName+"'"
          },
          success: res => {
            console.log("姓名查询成功！", res.result)
            that.setData({
              list: res.result.recordset
            })
          },
          err: res => {
            console.log("错误!", res)
          },
        })
      } else if (that.data.title_bumen != '全选' && that.data.title_gangwei == '全选') {
        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: "select top 100 * from gongzi_gongzimingxi where B ='" + input + "'and C='" + that.data.title_bumen + "' and BD = '"+that.data.companyName+"'"
          },
          success: res => {
            console.log("姓名查询成功！", res.result)
            that.setData({
              list: res.result.recordset
            })
          },
          err: res => {
            console.log("错误!", res)
          },
        })
      } else if (that.data.title_bumen == '全选' && that.data.title_gangwei == '全选') {
        wx.cloud.callFunction({
          name: "sqlServer_117",
          data: {
            query: "select top 100 * from gongzi_gongzimingxi where B ='" + input + "' and BD = '"+that.data.companyName+"'"
          },
          success: res => {
            console.log("姓名查询成功！", res.result)
            that.setData({
              list: res.result.recordset
            })
          },
          err: res => {
            console.log("错误!", res)
          },
        })
      }
    }


    //点击取消按钮后的操作
    this.cancel();
    this.dismissMaskWindow();
  },

  maskWindowCancel: function (e) {
    this.dismissMaskWindow();
  },

  // 显示蒙版弹窗
  showMaskWindow: function () {
    this.setData({
      isMaskWindowShow: true,
      selectIndex: -1,
      isMaskWindowInputShow: false,
      isMaskWindowInputShow1: false,
      maskWindowInputValue: ""
    })
  },

  // 隐藏蒙版窗体
  dismissMaskWindow: function () {
    this.setData({
      isMaskWindowShow: false,
      selectIndex: -1,
      isMaskWindowInputShow: false,
      isMaskWindowInputShow1: false,
      maskWindowInputValue: ""
    })
  },
  //其中的下拉框
  change01(e) {
    var that = this
    this.setData({
      selected: {
        ...e.detail
      }
    })
    wx.showToast({
      title: `部门选择了${this.data.selected.name}`,
      icon: 'none',
    })
    console.log(e.detail.id, e.detail.name)
    that.setData({
      title_bumen: e.detail.name
    })
  },
  change02(e) {
    var that = this
    this.setData({
      selected: {
        ...e.detail
      }
    })
    wx.showToast({
      title: `岗位选择了${this.data.selected.name}`,
      icon: 'none',
    })
    console.log(e.detail.id, e.detail.name)
    that.setData({
      title_gangwei: e.detail.name
    })
  },
  close() {
    // 关闭select
    this.selectComponent('#select').close()
  },




  //打印模块
  dayin: function (e) {
    var that = this
    //点击关闭左遮罩
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
    console.log("当前页面list:", that.data.list)
    wx.showToast({
      title: '功能尚未开发',
      icon: 'none',
    })
  },

  /*刷新页面 */
  shuaxin: function (e) {
    var that = this
    //点击关闭左遮罩
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

  /*该自定义模态弹窗来自Thor UI，感谢 */
  /*函数块名称：自定义可输入弹窗的传值和编辑
    描述：自定义一个可输入的遮罩层弹窗，用的form形式，提交修改mssql数据库执行update
    作者：117
    时间：2020/5/21
  */
  edit_cell(e) {
    var that = this
    if (e.detail.value.value.length == 0) { //如果输入为空则保持原来的值
      that.setData({
        edit_new: that.data.edit_old
      })
    } else if (e.detail.value.value.length != 0) {
      that.setData({
        edit_new: e.detail.value.value
      })
    }
    console.log("选中单元格的信息：", that.data.id, that.data.name, that.data.edit_old) //that.data.edit_old的是单元格修改之前的值
    console.log("提交成功，得到的值为:", that.data.edit_new)

    //通过云函数修改数据库内容
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update gongzi_gongzimingxi set " + that.data.mark + " = '" + that.data.edit_new + "' where id = '" + that.data.id + "' and BD = '" + that.data.companyName + "'"
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
    if(that.data.result.upd!=1){
      wx.showToast({
        title: '您没有权限',
        icon : 'none'
      })
      return;
    }
    var $collection = e.currentTarget.dataset
    that.setData({
      id: $collection.id,
      name: $collection.name,
      edit_old: $collection.x,
      mark: $collection.doinb, //这个值是传过来的该列在mssql数据库的【列标】，也是json数组中的标记位，因为标记为不能取到，所以只能一个一个在WXML中定义，然后传值（老板说json取不到标记位，我现在时间紧迫没时间研究，等有空了重看代码的时候再研究！）
      modal9: true,
      input_type : $collection.type
    })
    console.log(that.data.id, that.data.name, that.data.edit_old, that.data.modal9)
    console.log("对应数据库中查找的标记位为:", that.data.mark)
  },
  //通过清除标记位modal9，来隐藏弹窗的控制函数
  hide9() {
    var that = this
    //清除标记位
    that.setData({
      modal9: false,
    })
    console.log("隐藏自定义可输入弹窗！！")
  },





  /*
  函数块名称：1.点击编辑单元格，弹出输入模态对话框  2.长按删除单元格对应的数据库中的列
  作者：117
  时间：2020/5/20
  */

  click_delete: function (e) {
    var $collection = e.currentTarget.dataset
    var id = $collection.id
    var name = $collection.name
    wx.showModal({
      title: '操作选择',
      content: '姓名为' + name + "，序号为" + id + "的成员被选中\r\n请选择操作",
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      cancelColor: '', //取消文字的颜色
      confirmText: "编辑", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
          //这里可以callfunction！！！！
        } else {
          //点击编辑
          wx.showToast({
            title: '编辑姓名：' + name,
            icon: 'none'
          })
        }
      },
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })

    //修改之后刷新页面
  },




  /*
  函数块名称：分页逻辑
  作者：117
  时间：2020/5/15
  */
  //内嵌列表查找上一页数据
  lastpage: function () {
    var that = this
    console.log("1:islastpage?:", that.data.IsLastPage)
    //点击上一页，则取消最后一页的状态标记(但是如果是第一页则不取消标记状态，因为第一页又是最后一页的情况存在)
    if (that.data.IsLastPage && !(that.data.page == 1)) {
      that.data.IsLastPage = false
    }
    console.log("2:islastpage?:", that.data.IsLastPage)
    //判断第一页和上一页的翻页
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
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, id,B,C,D,Z,AJ,(Z+AJ)AS COUNT1,AA,AK,(AA+AK)AS COUNT2,AC,AD,(Z+AA+AC+AD)AS COUNT3,(AJ + AK)AS COUNT4 from gongzi_gongzimingxi where C = '" + department + "' and BD = '" + that.data.companyName + "') temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100);"
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
    console.log("islastpage?:", that.data.IsLastPage)
    //通过Islastpage判断是否为最后一页
    //如果第一页是最后一页，则在onload里第一次setdata中将Islastpage置true
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
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, id,B,C,D,Z,AJ,(Z+AJ)AS COUNT1,AA,AK,(AA+AK)AS COUNT2,AC,AD,(Z+AA+AC+AD)AS COUNT3,(AJ + AK)AS COUNT4 from gongzi_gongzimingxi where C = '" + department + "' and BD = '" + that.data.companyName + "') temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100);"
        },
        success: res => {
          console.log("返回长度", res.result)
          //长度不为0则说明不是最后一页，可以输出
          if (res.result.recordset.length != 0) {
            console.log("下一页进入成功：第" + that.data.page + "页")
            that.setData({
              list: res.result.recordset,
            })
          }
          //输出的长度小于100，则本页的下一页是最后一页，将标记置true
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








  /*
    函数块名称：左侧遮罩层
    作者：117
    时间：2020/5/14
    描述：功能按钮滑出操作区域的组件函数，包括从左侧，右侧，底部滑出，本项目只应用到从左侧滑出
    具体功能详见Thor UI 开发文档
    修改时间：
  */
  showModal: function () {
    console.log("触发函数")
    // 显示遮罩层
    // 创建动画实例 
    var animation = wx.createAnimation({
      duration: 220,
      timingFunction: "linear",
      delay: 0
    })
    //执行第一组动画：Y轴偏移500px后(盒子高度是500px) ，停
    animation.translateY(500).step()
    //导出动画对象赋给数据对象储存
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
  //这是从底部弹出的模态窗口的，尚未应用的扩展模块，不要在意
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




  /*
    函数块名称:页面处理四小龙！
    描述：
        1.baochi保持页面的页数并刷新
        2.shuaxin  刷新页面，保持页数，调用了baochi()
        3.chazhao  查找
        4.tianjia  添加，调用baochi()
    其中核心模块是保持
    作者：117
    时间:2020/5/25
  */


  //用于刷新页面时保持页数，或者跳转到某一页
  baochi: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, id,B,C,D,Z,AJ,(Z+AJ)AS COUNT1,AA,AK,(AA+AK)AS COUNT2,AC,AD,(Z+AA+AC+AD)AS COUNT3,(AJ + AK)AS COUNT4 from gongzi_gongzimingxi where C = '" + that.data.department + "' and BD = '" + that.data.companyName + "') temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100);"
      },
      success: res => {
        this.setData({
          list: res.result.recordset
        })
      },
      err: res => {
        console.log("错误!", res)
      }
    })


  },


  /*刷新页面 */
  shuaxin: function (e) {
    var that = this
    //点击关闭左遮罩
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

  //查找
  chazhao: function () {
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 * from gongzi_gongzimingxi where B = '亚索'"
      },
      success: res => {
        console.log("查找成功")
        this.setData({
          list: res.result.recordset
        })
      },
      err: res => {
        console.log("错误!", res)
      }
    })
  },

  //添加
  tianjia: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "insert into gongzi_gongzimingxi (B,BD) values('请输入','" + that.data.companyName + "')"
      },
      success: res => {
        console.log("插入成功")
        that.setData({
          list: res.result.recordset
        })
        that.baochi()
      },
      err: res => {
        console.log("错误!", res)
      }
    })
  },

})