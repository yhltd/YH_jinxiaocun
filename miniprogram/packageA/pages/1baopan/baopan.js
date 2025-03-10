Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    isSearch : false,
    isLoad : false,
    options01: [],
    options02: [],
    selected: {},
    title_bumen: '全选',
    title_gangwei: '全选',
    time: '',
    isMaskWindowShow: false,
    maskWindowList: ['查询日期'],
    selectIndex: -1,
    isMaskWindowInputShow: false,
    isMaskWindowInputShow1: false,
    maskWindowInputValue: '',
    start_date:'',
    stop_date:'',
    maxpagenumber: 0,
    showModalStatus: false,
    animationData: "",
    tabIndex: 26,
    leftDrawer: false,
    mode: "left",
    scrollTop: null,
    list: [],
    title: [],
    title1:[
      {
        text: "员工姓名",
        width: 20,
        columnName: "B",
        type: "text",
        isupd: true
      },
      {
        text: "录入日期",
        width: 20,
        columnName: "BC",
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
        text: "全勤天数",
        width: 20,
        columnName: "M",
        type: "text",
        isupd: true
      },
      {
        text: "个人支出",
        width: 20,
        columnName: "geren",
        type: "text",
        isupd: true
      },
      {
        text: "企业支出",
        width: 20,
        columnName: "qiye",
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
    type : "",
    companyName : "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.setNavigationBarTitle({
      title: '工资报盘表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    
    console.log('onLoad')
    _this.setData({
      isLoad : false,
      companyName : options.companyName,
      result : JSON.parse(options.access)
    })
    console.log(_this.data.result)
   
    var sql ="SELECT TOP 100 id, B, BC, AY, M,CASE WHEN ISNUMERIC(AJ) = 1 THEN CAST(AJ AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AK) = 1 THEN CAST(AK AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AL) = 1 THEN CAST(AL AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AM) = 1 THEN CAST(AM AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AN) = 1 THEN CAST(AN AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AO) = 1 THEN CAST(AO AS FLOAT) ELSE 0 END AS geren,CASE WHEN ISNUMERIC(Z) = 1 THEN CAST(Z AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AA) = 1 THEN CAST(AA AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AB) = 1 THEN CAST(AB AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AC) = 1 THEN CAST(AC AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AD) = 1 THEN CAST(AD AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AE) = 1 THEN CAST(AE AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AF) = 1 THEN CAST(AF AS FLOAT) ELSE 0 END AS qiye FROM gongzi_gongzimingxi WHERE BD = '"+_this.data.companyName+"'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        // query: "select top 100 id,B,BC,AY,M,CONVERT(float,isnull(AJ,0)) + convert(float,isnull(AK,0)) + convert(float,isnull(AL,0)) + convert(float,isnull(AM,0)) + convert(float,isnull(AN,0)) + convert(float,isnull(AO,0)) as geren,CONVERT(float,isnull(Z,0)) + convert(float,isnull(AA,0)) + convert(float,isnull(AB,0)) + convert(float,isnull(AC,0)) + convert(float,isnull(AD,0)) + convert(float,isnull(AE,0)) + convert(float,isnull(AF,0)) as qiye from gongzi_gongzimingxi where BD = '"+_this.data.companyName+"'"
        query: "SELECT TOP 100 id, B, BC, AY, M,CASE WHEN ISNUMERIC(AJ) = 1 THEN CAST(AJ AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AK) = 1 THEN CAST(AK AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AL) = 1 THEN CAST(AL AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AM) = 1 THEN CAST(AM AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AN) = 1 THEN CAST(AN AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AO) = 1 THEN CAST(AO AS FLOAT) ELSE 0 END AS geren,CASE WHEN ISNUMERIC(Z) = 1 THEN CAST(Z AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AA) = 1 THEN CAST(AA AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AB) = 1 THEN CAST(AB AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AC) = 1 THEN CAST(AC AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AD) = 1 THEN CAST(AD AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AE) = 1 THEN CAST(AE AS FLOAT) ELSE 0 END +CASE WHEN ISNUMERIC(AF) = 1 THEN CAST(AF AS FLOAT) ELSE 0 END AS qiye FROM gongzi_gongzimingxi WHERE BD = '"+_this.data.companyName+"'"
      },
      success: res => {
        console.log(res.result)
        console.log(res.query)
        
        if (res.result.recordset.length < 100) {
          this.setData({
            list: res.result.recordset,
            IsLastPage: true,
            isLoad : true
          })
        } else {
          this.setData({
            list: res.result.recordset,
            isLoad : true
          })
        }
    
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select baopan from gongzi_title where baopan is not null "
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

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
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
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_gongzimingxi where BD = '"+that.data.companyName+"'"
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

  bindDateChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      start_date: e.detail.value
    })
    console.log(this.data.start_date)
  },

  bindDateChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      stop_date: e.detail.value
    })
    console.log(this.data.stop_date)
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
    var start_date = that.data.start_date
    var stop_date = that.data.stop_date
    if(start_date == ''){
      //start_date = '1900-01-01'
      start_date = '1900/01/01'
    }
    if(stop_date == ''){
      // stop_date = '2100-12-31'
      stop_date = '2100/12/31'
    }
    console.log(start_date)
    console.log(stop_date)
    start_date = start_date.replace(/-/g, '/');
    stop_date =stop_date.replace(/-/g, '/');
    var sql = "select top 100 id,B,BC,AY,M,CONVERT(float,isnull(AJ,0)) + convert(float,isnull(AK,0)) + convert(float,isnull(AL,0)) + convert(float,isnull(AM,0)) + convert(float,isnull(AN,0)) + convert(float,isnull(AO,0)) as geren,CONVERT(float,isnull(Z,0)) + convert(float,isnull(AA,0)) + convert(float,isnull(AB,0)) + convert(float,isnull(AC,0)) + convert(float,isnull(AD,0)) + convert(float,isnull(AE,0)) + convert(float,isnull(AF,0)) as qiye from gongzi_gongzimingxi where BD = '"+that.data.companyName+"' and BC != '' and BC >='" + start_date + "' and BC <='" + stop_date + "'"
    console.log(sql)
    if (index == 0) {
      //按姓名查询
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: sql
        },
        success: res => {
          console.log("日期查询成功！", res.result)
          that.setData({
            list: res.result.recordset,
            isSearch : true
          })
          that.dismissMaskWindow();
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {

        }
      })
    }
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
      maskWindowInputValue: "",
      start_date:'',
      stop_date:'',
    })
  },

  // 隐藏蒙版窗体
  dismissMaskWindow: function () {
    this.setData({
      isMaskWindowShow: false,
      selectIndex: -1,
      isMaskWindowInputShow: false,
      isMaskWindowInputShow1: false,
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
   dayin: function(e) {
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
    console.log("当前页面list:",that.data.list)
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
    this.setData({
      maskWindowInputValue : "",
      isSearch : false
    })
    that.baochi()
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
    if(that.data.result.upd!=1){
      wx.showToast({
        title: '您没有权限',
        icon : 'none'
      })
      return;
    }
    var $collection = e.currentTarget.dataset
    that.setData({
      type: $collection.type,
      id: $collection.id,
      name: $collection.name,
      edit_old: $collection.x,
      mark: $collection.doinb, //这个值是传过来的该列在mssql数据库的【列标】，也是json数组中的标记位，因为标记为不能取到，所以只能一个一个在WXML中定义，然后传值（老板说json取不到标记位，我现在时间紧迫没时间研究，等有空了重看代码的时候再研究！）
      modal9: true
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
    wx.close
  },





  /*
  函数块名称：1.点击编辑单元格，弹出输入模态对话框  2.长按删除单元格对应的数据库中的列
  作者：117
  时间：2020/5/20
  */

  click_delete: function (e) {
    var _this = this;
    if(_this.data.result.del!=1){
      wx.showToast({
        title: '您没有权限',
        icon : 'none'
      })
      return;
    }
    var $collection = e.currentTarget.dataset
    var id = $collection.id
    var name = $collection.name
    wx.showModal({
      title: '操作选择',
      content: '姓名为' + name + "，序号为" + id + "的成员被选中\r\n请选择操作",
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      cancelColor: '', //取消文字的颜色
      confirmText: "删除", //默认是“确定”
      confirmColor: '#DD5044', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          
        } else {
          //删除
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: "DELETE from gongzi_gongzimingxi where id = " + id
            },
            success: res => {
              wx.showToast({
                title: '删除编号'+id+"的员工",
                icon :"none"
              })
              _this.baochi();
            },
            err: res => {
              console.log("错误!", res)
            }
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
  作者：11
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
      this.setData({
        isLoad : false
      })
      wx.showToast({
        title: '正在加载第' + that.data.page + '页',
        icon: 'none',
        duration: 2500
      })

      var start_date = that.data.start_date
      var stop_date = that.data.stop_date
      if(start_date == ''){
        start_date = '1900-01-01'
      }
      if(stop_date == ''){
        stop_date = '2100-12-31'
      }
      console.log(start_date)
      console.log(stop_date)

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, id,B,BC,AY,M,CONVERT(float,isnull(AJ,0)) + convert(float,isnull(AK,0)) + convert(float,isnull(AL,0)) + convert(float,isnull(AM,0)) + convert(float,isnull(AN,0)) + convert(float,isnull(AO,0)) as geren,CONVERT(float,isnull(Z,0)) + convert(float,isnull(AA,0)) + convert(float,isnull(AB,0)) + convert(float,isnull(AC,0)) + convert(float,isnull(AD,0)) + convert(float,isnull(AE,0)) + convert(float,isnull(AF,0)) as qiye from gongzi_gongzimingxi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and BD = '"+that.data.companyName+"' and BC >='" + start_date + "' and BC <='" + stop_date + "'"
        },
        success: res => {
          console.log("上一页进入成功：第" + this.data.page + "页")
          that.setData({
            list: res.result.recordset,
            isLoad :true
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
      this.setData({
        isLoad : false
      })

    var start_date = that.data.start_date
    var stop_date = that.data.stop_date
    if(start_date == ''){
      start_date = '1900-01-01'
    }
    if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    console.log(start_date)
    console.log(stop_date)

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, id,B,BC,AY,M,CONVERT(float,isnull(AJ,0)) + convert(float,isnull(AK,0)) + convert(float,isnull(AL,0)) + convert(float,isnull(AM,0)) + convert(float,isnull(AN,0)) + convert(float,isnull(AO,0)) as geren,CONVERT(float,isnull(Z,0)) + convert(float,isnull(AA,0)) + convert(float,isnull(AB,0)) + convert(float,isnull(AC,0)) + convert(float,isnull(AD,0)) + convert(float,isnull(AE,0)) + convert(float,isnull(AF,0)) as qiye from gongzi_gongzimingxi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and BD = '"+that.data.companyName+"' and BC >='" + start_date + "' and BC <='" + stop_date + "'"
        },
        success: res => {
          console.log("返回长度", res.result)
          //长度不为0则说明不是最后一页，可以输出
          if (res.result.recordset.length != 0) {
            console.log("下一页进入成功：第" + that.data.page + "页")
            that.setData({
              list: res.result.recordset,
              isLoad : true
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
        3.searchBtn  查找
        4.tianjia  添加，调用baochi()
    其中核心模块是保持
    作者：117
    时间:2020/5/25
  */


  //用于刷新页面时保持页数，或者跳转到某一页
  baochi: function () {
    var that = this
    var sql = "";

    var start_date = that.data.start_date
    var stop_date = that.data.stop_date
    if(start_date == ''){
      start_date = '1900-01-01'
    }
    if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    console.log(start_date)
    console.log(stop_date)

    if(that.data.isSearch){
      sql = "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, id,B,BC,AY,M,CONVERT(float,isnull(AJ,0)) + convert(float,isnull(AK,0)) + convert(float,isnull(AL,0)) + convert(float,isnull(AM,0)) + convert(float,isnull(AN,0)) + convert(float,isnull(AO,0)) as geren,CONVERT(float,isnull(Z,0)) + convert(float,isnull(AA,0)) + convert(float,isnull(AB,0)) + convert(float,isnull(AC,0)) + convert(float,isnull(AD,0)) + convert(float,isnull(AE,0)) + convert(float,isnull(AF,0)) as qiye from gongzi_gongzimingxi where BD = '"+that.data.companyName+"') temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and BC >= '"+ start_date +"' and BC <='"+ stop_date +"'"
    }else{
      sql = "select * from (select id,B,BC,AY,M,CONVERT(float,isnull(AJ,0)) + convert(float,isnull(AK,0)) + convert(float,isnull(AL,0)) + convert(float,isnull(AM,0)) + convert(float,isnull(AN,0)) + convert(float,isnull(AO,0)) as geren,CONVERT(float,isnull(Z,0)) + convert(float,isnull(AA,0)) + convert(float,isnull(AB,0)) + convert(float,isnull(AC,0)) + convert(float,isnull(AD,0)) + convert(float,isnull(AE,0)) + convert(float,isnull(AF,0)) as qiye,ROW_NUMBER() over(order by [id]) rownumber from gongzi_gongzimingxi where BD = '"+that.data.companyName+"') t where t.rownumber between ('" + that.data.page + "'-1)*100 and '" + that.data.page + "'*100"
    }
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
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
    this.setData({
      isSearch : false
    })
    that.baochi()
    wx.showToast({
      title: '同步数据成功',
      icon: 'none'
    })
  },

  //添加
  tianjia: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "insert into gongzi_gongzimingxi (B,BD) values('请输入','"+that.data.companyName+"')"
      },
      success: res => {
        console.log("插入成功")
        that.baochi()
      },
      err: res => {
        console.log("错误!", res)
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
    console.log(list)
    var title = _this.data.title1;
    console.log(title)
    var cloudList = {
      name : '报盘',
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

  shenpi_insert:function(){
    var _this = this
    if(_this.data.list.length > 0){
      var shifa = 0
      var geren = 0
      var qiye = 0
      var yuangong = 0
      var quanqin = 0
      var this_list = _this.data.list
      for(var i=0;i<this_list.length;i++){
        shifa = shifa + this_list[i].AY * 1
        geren = geren + this_list[i].geren * 1
        qiye = qiye + this_list[i].qiye * 1
        yuangong = yuangong + 1
        quanqin = quanqin + this_list[i].M * 1
      }
      wx.navigateTo({
        url: '../1baopan_shenpi_edit/baopan_shenpi_edit?companyName=' + _this.data.companyName + '&shifa=' + shifa + '&geren=' + geren  + '&qiye=' + qiye + '&yuangong=' + yuangong + '&quanqin=' + quanqin 
      })
    }else{
      wx.showToast({
        title: `无数据，无需审批`,
        icon: 'none',
      })
    }
  },
  shenpi_goto:function(){
    var _this = this
    wx.navigateTo({
      url:'../1baopan_shenpi/baopan_shenpi?companyName=' + _this.data.companyName
    })
  }
})