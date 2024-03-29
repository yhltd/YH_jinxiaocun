var util = require("../../../utils/util.js")

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    input_type: "",
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

    isSearch: false,

    maxpagenumber: 0,
    showModalStatus: false,
    animationData: "",
    tabIndex: 26,
    leftDrawer: false,
    mode: "left",
    scrollTop: null,
    list: [],
    title: [],
    title1: [{
        text: "姓名",
        width: 20,
        columnName: "B",
        type: "text",
        isupd: true
      },
      {
        text: "部门",
        width: 20,
        columnName: "C",
        type: "text",
        isupd: true
      },
      {
        text: "岗位",
        width: 20,
        columnName: "D",
        type: "text",
        isupd: true
      },
      {
        text: "身份证号码",
        width: 20,
        columnName: "E",
        type: "text",
        isupd: true
      },
      {
        text: "入职时间",
        width: 20,
        columnName: "F",
        type: "text",
        isupd: true
      },
      {
        text: "基本工资",
        width: 20,
        columnName: "G",
        type: "text",
        isupd: true
      },
      {
        text: "效绩工资",
        width: 20,
        columnName: "H",
        type: "text",
        isupd: true
      },
      {
        text: "岗位工资",
        width: 20,
        columnName: "I",
        type: "text",
        isupd: true
      },
      {
        text: "当月合计工资",
        width: 20,
        columnName: "G",
        type: "text",
        isupd: true
      },
      {
        text: "跨度工资",
        width: 20,
        columnName: "K",
        type: "text",
        isupd: true
      },
      {
        text: "职称津贴",
        width: 20,
        columnName: "L",
        type: "text",
        isupd: true
      },
      {
        text: "月出勤天数",
        width: 20,
        columnName: "M",
        type: "text",
        isupd: true
      },
      {
        text: "加班时间",
        width: 20,
        columnName: "N",
        type: "text",
        isupd: true
      },
      {
        text: "加班费",
        width: 20,
        columnName: "O",
        type: "text",
        isupd: true
      },
      {
        text: "全勤应发",
        width: 20,
        columnName: "P",
        type: "text",
        isupd: true
      },
      {
        text: "缺勤天数",
        width: 20,
        columnName: "Q",
        type: "text",
        isupd: true
      },
      {
        text: "缺勤扣款",
        width: 20,
        columnName: "R",
        type: "text",
        isupd: true
      },
      {
        text: "迟到天数",
        width: 20,
        columnName: "S",
        type: "text",
        isupd: true
      },
      {
        text: "迟到扣款",
        width: 20,
        columnName: "T",
        type: "text",
        isupd: true
      },
      {
        text: "应发工资",
        width: 20,
        columnName: "U",
        type: "text",
        isupd: true
      },
      {
        text: "社保基数",
        width: 20,
        columnName: "V",
        type: "text",
        isupd: true
      },
      {
        text: "医疗技术",
        width: 20,
        columnName: "W",
        type: "text",
        isupd: true
      },
      {
        text: "公积金基数",
        width: 20,
        columnName: "X",
        type: "text",
        isupd: true
      },
      {
        text: "年金基数",
        width: 20,
        columnName: "Y",
        type: "text",
        isupd: true
      },
      {
        text: "企业养老",
        width: 20,
        columnName: "Z",
        type: "text",
        isupd: true
      },
      {
        text: "企业失业",
        width: 20,
        columnName: "AA",
        type: "text",
        isupd: true
      },
      {
        text: "企业医疗",
        width: 20,
        columnName: "AB",
        type: "text",
        isupd: true
      },
      {
        text: "企业工伤",
        width: 20,
        columnName: "AC",
        type: "text",
        isupd: true
      },
      {
        text: "企业生育",
        width: 20,
        columnName: "AD",
        type: "text",
        isupd: true
      },
      {
        text: "企业公积金",
        width: 20,
        columnName: "AE",
        type: "text",
        isupd: true
      },
      {
        text: "企业年金",
        width: 20,
        columnName: "AF",
        type: "text",
        isupd: true
      },
      {
        text: "滞纳金",
        width: 20,
        columnName: "AG",
        type: "text",
        isupd: true
      },
      {
        text: "利息",
        width: 20,
        columnName: "AH",
        type: "text",
        isupd: true
      },
      {
        text: "企业小计",
        width: 20,
        columnName: "AI",
        type: "text",
        isupd: true
      },
      {
        text: "个人养老",
        width: 20,
        columnName: "AJ",
        type: "text",
        isupd: true
      },
      {
        text: "个人失业",
        width: 20,
        columnName: "AK",
        type: "text",
        isupd: true
      },
      {
        text: "个人医疗",
        width: 20,
        columnName: "AL",
        type: "text",
        isupd: true
      },
      {
        text: "个人生育",
        width: 20,
        columnName: "AM",
        type: "text",
        isupd: true
      },
      {
        text: "个人公积金",
        width: 20,
        columnName: "AN",
        type: "text",
        isupd: true
      },
      {
        text: "个人年金4%",
        width: 20,
        columnName: "AO",
        type: "text",
        isupd: true
      },
      {
        text: "滞纳金",
        width: 20,
        columnName: "AP",
        type: "text",
        isupd: true
      },
      {
        text: "利息",
        width: 20,
        columnName: "AQ",
        type: "text",
        isupd: true
      },
      {
        text: "个人小计",
        width: 20,
        columnName: "AR",
        type: "text",
        isupd: true
      },
      {
        text: "税前工资",
        width: 20,
        columnName: "ASA",
        type: "text",
        isupd: true
      },
      {
        text: "应税工资",
        width: 20,
        columnName: "ATA",
        type: "text",
        isupd: true
      },
      {
        text: "税率",
        width: 20,
        columnName: "AU",
        type: "text",
        isupd: true
      },
      {
        text: "扣除数",
        width: 20,
        columnName: "AV",
        type: "text",
        isupd: true
      },
      {
        text: "代扣个人所得税",
        width: 20,
        columnName: "AW",
        type: "text",
        isupd: true
      },
      {
        text: "1%年金",
        width: 20,
        columnName: "AX",
        type: "text",
        isupd: true
      },
      {
        text: "实发工资",
        width: 20,
        columnName: "AY",
        type: "text",
        isupd: true
      },
      {
        text: "验算公式",
        width: 20,
        columnName: "AZ",
        type: "text",
        isupd: true
      },
      {
        text: "银行账户",
        width: 20,
        columnName: "BA",
        type: "text",
        isupd: true
      },
      {
        text: "调薪时间",
        width: 20,
        columnName: "BB",
        type: "text",
        isupd: true
      },
      {
        text: "录入时间",
        width: 20,
        columnName: "BC",
        type: "text",
        isupd: true
      },
      {
        text: "公司",
        width: 20,
        columnName: "BD",
        type: "text",
        isupd: true
      },
    ],
    page: "1",
    IsLastPage: false,
    id: '',
    name: '',
    edit_old: '',
    modal9: false,
    mark: '',
    edit_new: '',
    isload: false,
    companyName: "",
    pick_list : [],
    bumen_name: [],
    shebao_name: [],
    gongjijin_name : [],
    zhiwu_name : [],
    rqxzShow3: false,
    nowDate:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      companyName: options.companyName,
      result: JSON.parse(options.access)
    })
    _this.selBM()
    wx.setNavigationBarTitle({
      title: '工资明细表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    console.log('onLoad')


    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 * from gongzi_gongzimingxi where BD = '" + _this.data.companyName + "'"
      },
      success: res => {
        console.log("进入成功")
        if (res.result.recordset.length < 100) {
          this.setData({
            list: res.result.recordset,
            IsLastPage: true,
            isload: true
          })
        } else {
          this.setData({
            list: res.result.recordset,
            isload: true
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
        query: "select gongzimingxi from gongzi_title where gongzimingxi is not null"
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


    const formatData = date => {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      return year + '-' + month + '-' + day
      // return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }
    this.setData({
      nowDate: formatData(new Date())
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var TIME = util.newTime(new Date());
    this.setData({
      time: TIME,
    });

    if (that.data.options01 == '') {
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "SELECT ROW_NUMBER()  OVER(ORDER BY ID) Id,bumen as Name FROM gongzi_peizhi where bumen != '-' and bumen !='' and gongsi = '" + that.data.companyName + "'"
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
          query: "SELECT ROW_NUMBER()  OVER(ORDER BY ID) Id,zhiwu as Name FROM gongzi_peizhi where zhiwu != '-' and zhiwu !='' and gongsi = '" + that.data.companyName + "'"
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


    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_gongzimingxi where BD = '" + that.data.companyName + "'"
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
    this.baochi()
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
          query: "select top 100 * from gongzi_gongzimingxi where B like '%" + input + "%' and BD = '" + that.data.companyName + "'"
        },
        success: res => {
          console.log("姓名查询成功！", res.result)
          that.setData({
            list: res.result.recordset,
            isSearch: true
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
          query: "select top 100 * from gongzi_gongzimingxi where C like '%" + input + "%' and BD = '" + that.data.companyName + "'"
        },
        success: res => {
          console.log("姓名查询成功！", res.result)
          that.setData({
            list: res.result.recordset,
            isSearch: true
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
          query: "select top 100 * from gongzi_gongzimingxi where D like '%" + input + "%' and BD = '" + that.data.companyName + "'"
        },
        success: res => {
          console.log("姓名查询成功！", res.result)
          that.setData({
            list: res.result.recordset,
            isSearch: true
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
            query: "select top 100 * from gongzi_gongzimingxi where B like '%" + input + "%' and C like '%" + that.data.title_bumen + "%' and D like '%" + that.data.title_gangwei + "%' and BD = '" + that.data.companyName + "'"
          },
          success: res => {
            console.log("姓名查询成功！", res.result)
            that.setData({
              list: res.result.recordset,
              isSearch: true
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
            query: "select top 100 * from gongzi_gongzimingxi where B like '%" + input + "%' and D like '%" + that.data.title_gangwei + "%' and BD = '" + that.data.companyName + "'"
          },
          success: res => {
            console.log("姓名查询成功！", res.result)
            that.setData({
              list: res.result.recordset,
              isSearch: true
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
            query: "select top 100 * from gongzi_gongzimingxi where B like '%" + input + "%' and C like '%" + that.data.title_bumen + "%' and BD = '" + that.data.companyName + "'"
          },
          success: res => {
            console.log("姓名查询成功！", res.result)
            that.setData({
              list: res.result.recordset,
              isSearch: true
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
            query: "select top 100 * from gongzi_gongzimingxi where B like '%" + input + "%' and BD = '" + that.data.companyName + "'"
          },
          success: res => {
            console.log("姓名查询成功！", res.result)
            that.setData({
              list: res.result.recordset,
              isSearch: true
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
      isMaskWindowInputShow: false,
      isMaskWindowInputShow1: false
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
    this.selectComponent('#select1').close()
    this.selectComponent('#select2').close()
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
        query: "update gongzi_gongzimingxi set " + that.data.mark + " = '" + that.data.edit_new + "' where id = '" + that.data.id + "'"
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
    if (that.data.result.upd != 1) {
      wx.showToast({
        title: '您没有权限',
        icon: 'none'
      })
      return;
    }
    var $collection = e.currentTarget.dataset
    that.setData({
      input_type: $collection.type,
      id: $collection.id,
      name: $collection.name,
      edit_old: $collection.x,
      mark: $collection.doinb, //这个值是传过来的该列在mssql数据库的【列标】，也是json数组中的标记位，因为标记为不能取到，所以只能一个一个在WXML中定义，然后传值（老板说json取不到标记位，我现在时间紧迫没时间研究，等有空了重看代码的时候再研究！）
      modal9: true
    })
    console.log(that.data.id, that.data.name, that.data.edit_old, that.data.modal9)
    console.log("对应数据库中查找的标记位为:", that.data.mark)
  },

  updateDate: function (e) {
    this.setData({
      edit_old: e.detail.value
    })
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
    var that = this
    if (that.data.result.del != 1) {
      wx.showToast({
        title: '您没有权限',
        icon: 'none'
      })
      return;
    }
    var $collection = e.currentTarget.dataset
    var id = $collection.id
    var name = $collection.name
    wx.showModal({
      title: '警告',
      content: '正在删除姓名为' + name + "的数据\r\n删除后不能恢复\r\n请选择操作",
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      cancelColor: '#84B9F2', //取消文字的颜色
      confirmText: "删除", //默认是“确定”
      confirmColor: '#DD5044', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
          //这里可以callfunction！！！！
        } else {
          //点击删除
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: "delete from gongzi_gongzimingxi where id =" + id
            },
            success: res => {
              console.log("成功删除")
              var is = that.data.isSearch;
              if (is) {
                that.maskWindowOk()
              } else {
                that.baochi()
              }
            },
            fail: err => {
              console.log("失败!!!!")
            }
          })
          wx.showToast({
            title: '已删除，姓名：' + name,
            icon: 'none'
          })

        }
      },
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })

    //修改之后刷新页面

  },

  click_update: function (e) {
    var that = this
    if (that.data.result.upd != 1) {
      wx.showToast({
        title: '您没有权限',
        icon: 'none'
      })
      return;
    }
    var $collection = e.currentTarget.dataset
    var id = $collection.id
    var name = $collection.name
    console.log(id)
    wx.showModal({
      title: '警告',
      content: '正在修改姓名为' + name + "的数据\r\n请选择操作",
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      cancelColor: '#84B9F2', //取消文字的颜色
      confirmText: "确定", //默认是“确定”
      confirmColor: '#DD5044', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
          //这里可以callfunction！！！！
        } else {
          //点击修改
          wx.navigateTo({
            url: '../1gongzimingxi_edit/index?companyName=' + that.data.companyName + '&id=' + id
          })
          wx.showToast({
            title: '正在跳转',
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
      this.setData({
        isload: false
      })
      that.data.page--
      wx.showToast({
        title: '正在加载第' + that.data.page + '页',
        icon: 'none',
        duration: 2500
      })
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, * from gongzi_gongzimingxi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and BD = '" + that.data.companyName + "'"
        },
        success: res => {
          console.log("上一页进入成功：第" + this.data.page + "页")
          that.setData({
            list: res.result.recordset,
            isSearch: false,
            isload: true
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
      this.setData({
        isload: false
      })
      that.data.page++
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, * from gongzi_gongzimingxi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and BD = '" + that.data.companyName + "'"
        },
        success: res => {
          console.log("返回长度", res.result)
          //长度不为0则说明不是最后一页，可以输出
          if (res.result.recordset.length != 0) {
            console.log("下一页进入成功：第" + that.data.page + "页")
            that.setData({
              list: res.result.recordset,
              isSearch: false,
              isload: true
            })
            wx.showToast({
              title: '正在加载第' + that.data.page + '页',
              icon: 'none',
            })
          }
          //输出的长度小于100，则本页的下一页是最后一页，将标记置true
          if (res.result.recordset.length < 100) {
            that.setData({
              IsLastPage: true
            })
            wx.showToast({
              title: '正在加载第' + that.data.page + '页',
              icon: 'none',
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
    var is = that.data.isSearch;
    var input = that.data.searchValue;
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, * from gongzi_gongzimingxi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and BD = '" + that.data.companyName + "'"
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



  //添加
  tianjia: function () {
    var that = this
    // wx.showModal({
    //   title: '提醒',
    //   content: "◀◀快速添加将直接添加一行\r\n详细添加将跳转到添加页面▶▶",
    //   showCancel: true, //是否显示取消按钮
    //   cancelText: "快速添加", //默认是“取消”
    //   cancelColor: '', //取消文字的颜色
    //   confirmText: "详细添加", //默认是“确定”
    //   confirmColor: '#84B9F2', //确定文字的颜色
    //   success: function (res) {
    //     if (res.cancel) {
    //       //点击取消,默认隐藏弹框
    //       wx.cloud.callFunction({
    //         name: 'sqlServer_117',
    //         data: {
    //           query: "insert into gongzi_gongzimingxi (B,BC,BD) values('请输入','" + that.data.nowDate + "','" + that.data.companyName + "')"
    //         },
    //         success: res => {
    //           console.log("插入成功")
    //           that.setData({
    //             list: res.result.recordset
    //           })
    //           that.baochi();
    //         },
    //         err: res => {
    //           console.log("错误!", res)
    //         }
    //       })
    //     } else {
    //       //点击跳转到详细添加页
    //       wx.navigateTo({
    //         url: '../1gongzimingxi_edit/index?companyName=' + that.data.companyName
    //       })
    //       wx.showToast({
    //         title: '正在跳转',
    //         icon: 'none'
    //       })
    //     }
    //   },
    //   fail: function (res) {}, //接口调用失败的回调函数
    //   complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    // })

    wx.showModal({
      title: '提示',
      content: '是否添加工资明细？',
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../1gongzimingxi_edit/index?companyName=' + that.data.companyName
          })
          wx.showToast({
            title: '正在跳转',
            icon: 'none'
          })
        } else if (res.cancel) {
          return false;
        }
      }
    })

  },
  selBM: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select bumen from gongzi_peizhi where bumen != '-' and bumen != '' and gongsi = '" + _this.data.companyName + "';" + "select kaoqin from gongzi_peizhi where kaoqin != '-' and kaoqin != '' and gongsi = '" + _this.data.companyName + "';" +"select kaoqin_peizhi from gongzi_peizhi where kaoqin_peizhi != '-' and kaoqin_peizhi != '' and gongsi = '" + _this.data.companyName + "';"+"select zhiwu from gongzi_peizhi where zhiwu != '-' and zhiwu != '' and gongsi = '" + _this.data.companyName + "';"
      },
      success: res => {
        console.log(res.result)
        var bumen = res.result.recordsets[0]
        var bumen2 = []
        console.log(bumen)
        for (var i = 0; i < bumen.length; i++) {
          bumen2.push(
            bumen[i].bumen
          )
        }
        var shebao = res.result.recordsets[1]
        var shebao2 = []
        console.log(bumen)
        for (var i = 0; i < shebao.length; i++) {
          shebao2.push(
            shebao[i].kaoqin
          )
        }
        var gongjijin = res.result.recordsets[2]
        var gongjijin2 = []
        console.log(bumen)
        for (var i = 0; i < gongjijin.length; i++) {
          gongjijin2.push(
            gongjijin[i].kaoqin_peizhi
          )
        }
        var zhiwu = res.result.recordsets[3]
        var zhiwu2 = []
        for (var i = 0; i < zhiwu.length; i++) {
          zhiwu2.push(
            zhiwu[i].zhiwu
          )
        }
        console.log(zhiwu2)
        _this.setData({
          bumen_name: bumen2,
          shebao_name: shebao2,
          gongjijin_name : gongjijin2,
          zhiwu_name : zhiwu2
        })
      },
    })
  },

  bumen_select: function (e) {
    var _this = this
    var mark = _this.data.mark
    if(mark == 'C'){
      var bumen = _this.data.bumen_name[e.detail.value]
    }else if(mark == 'D'){
      var bumen = _this.data.zhiwu_name[e.detail.value]
    }else if(mark == 'V'){
      var bumen = _this.data.shebao_name[e.detail.value]
    }else if(mark == 'X'){
      var bumen = _this.data.gongjijin_name[e.detail.value]
    }
    
    console.log(bumen)
    _this.setData({
      edit_old: bumen
    })
  },

  getExcel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list;
    console.log(list)
    var title = _this.data.title1;
    console.log(title)
    var cloudList = {
      name: '工资明细',
      items: [],
      header: []
    }

    for (let i = 0; i < title.length; i++) {
      cloudList.header.push({
        item: title[i].text,
        type: title[i].type,
        width: title[i].width,
        columnName: title[i].columnName
      })
    }
    cloudList.items = list
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



})