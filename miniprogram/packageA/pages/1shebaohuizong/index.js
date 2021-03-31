Page({

  /**
   * 页面的初始数据
   */
  data: {
    result : [],
    isMaskWindowShow: false,
    selectIndex: -1,
    isMaskWindowInputShow: false,
    isMaskWindowInputShow1: false,
    maskWindowInputValue: "",
    maskWindowList: [' 查询部门'],
    options01 : [],
    selected : {},

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
    svHidden : false,
    selectHid : false,
    selectText : "请选择",
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
    var _this = this;
    _this.setData({
      companyName : options.companyName,
      result : JSON.parse(options.access)
    })
    wx.setNavigationBarTitle({
      title: '各部门社保汇总表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })

    console.log("进入title查询")
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select shebaohuizong from gongzi_title where shebaohuizong is not null"
      },
      success: res => {
        this.setData({
          title: res.result.recordsets[0]
        })
        console.log("title成功")
      },
      err: res => {
        console.log("错误!")
      },
      complete: () => {}
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "SELECT top 100 C as department,sum(cast(Z as float))as Z,sum(cast(AJ as float))as AJ,SUM(cast(Z as float)+cast(AJ AS float))AS COUNT1, SUM(CAST(AA AS float))AS AA,SUM(CAST(AK AS float))AS AK,SUM(CAST(AA AS float) + CAST(AK AS float))AS COUNT2,SUM(CAST(AC AS float))AS AC,SUM(CAST(AD AS float))AS AD,SUM(CAST(Z AS float)+CAST(AA AS float)+CAST(AC AS float)+CAST(AD AS float))AS COUNT3,SUM(CAST(AJ AS float)+CAST(AK AS float))AS COUNT4 FROM gongzi_gongzimingxi GROUP BY C,BD having BD ='"+_this.data.companyName+"'"
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.showModal({
      title: '❤ 小贴士 ❤',
      content: '点击‘部门’列可以跳转到相应部门的‘部门详情表’',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(1) as maxpagenumber from (SELECT count(C) as doinb,count(BD) as company from gongzi_gongzimingxi group by C,BD HAVING BD = '"+that.data.companyName+"')t1"
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

    wx.cloud.callFunction({
      name: "sqlServer_117",
      data: {
        query: "select id,bumen from gongzi_peizhi where gongsi = '"+that.data.companyName+"' and bumen != '-' and bumen is not null"
      },
      success: res => {
        console.log("部门查询成功！", res.result)
        this.setData({
          options01 : res.result.recordset
        })
        console.log(this.data.options01)
      },
      err: res => {
        console.log("错误!", res)
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
  /*
  函数名：部门跳转函数
  描述：点击跳转指定部门
  作者：117
  时间：2020.4
  */
  to_bumenxiangqing: function (e) {
    var XD = e.currentTarget.dataset;
    console.log(XD)
    var department = XD.department
    wx.navigateTo({
      url: "../1shebaoxiangqing/index?message=" + department+"&companyName="+this.data.companyName +"&access="+JSON.stringify(this.data.result),
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
    var $collection = e.currentTarget.dataset
    that.setData({
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
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, C as department,sum(cast(Z as int))as Z,sum(cast(AJ as int))as AJ,SUM(cast(Z as int)+cast(AJ AS INT))AS COUNT1, SUM(CAST(AA AS INT))AS AA,SUM(CAST(AK AS INT))AS AK,SUM(CAST(AA AS INT) + CAST(AK AS INT))AS COUNT2,SUM(CAST(AC AS INT))AS AC,SUM(CAST(AD AS INT))AS AD,SUM(CAST(Z AS INT)+CAST(AA AS INT)+CAST(AC AS INT)+CAST(AD AS INT))AS COUNT3,SUM(CAST(AJ AS INT)+CAST(AK AS INT))AS COUNT4 FROM gongzi_gongzimingxi GROUP BY C) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100);"
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
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, C as department,sum(cast(Z as int))as Z,sum(cast(AJ as int))as AJ,SUM(cast(Z as int)+cast(AJ AS INT))AS COUNT1, SUM(CAST(AA AS INT))AS AA,SUM(CAST(AK AS INT))AS AK,SUM(CAST(AA AS INT) + CAST(AK AS INT))AS COUNT2,SUM(CAST(AC AS INT))AS AC,SUM(CAST(AD AS INT))AS AD,SUM(CAST(Z AS INT)+CAST(AA AS INT)+CAST(AC AS INT)+CAST(AD AS INT))AS COUNT3,SUM(CAST(AJ AS INT)+CAST(AK AS INT))AS COUNT4 FROM gongzi_gongzimingxi GROUP BY C) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100);"
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



/**
 * 查询功能
 */
selTap : function(e){
  var _this = this;
  var index = e.currentTarget.dataset.windowIndex;
  _this.setData({
    svHidden : _this.data.svHidden?false:true,
    selectHid : false,
    selectText : "请选择",
    selectIndex : index,
    isMaskWindowInputShow : true,
    isMaskWindowInputShow1: true
  })
},
selectTap : function(){
  this.setData({
    selectHid : this.data.selectHid?false:true
  })
},
choice : function(e){
  var value = e.currentTarget.dataset.value;
  var id = e.currentTarget.dataset.index;
  var newSelected = {Id:id,Name:value};
  wx.showToast({
    title: "选择"+value+"序号"+id,
    icon: 'none'
  })
  this.setData({
    selectText : value,
    selectHid : false,
    selected : newSelected
  })
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
        query: "SELECT top 100 C as department,sum(cast(Z as int))as Z,sum(cast(AJ as int))as AJ,SUM(cast(Z as int)+cast(AJ AS INT))AS COUNT1, SUM(CAST(AA AS INT))AS AA,SUM(CAST(AK AS INT))AS AK,SUM(CAST(AA AS INT) + CAST(AK AS INT))AS COUNT2,SUM(CAST(AC AS INT))AS AC,SUM(CAST(AD AS INT))AS AD,SUM(CAST(Z AS INT)+CAST(AA AS INT)+CAST(AC AS INT)+CAST(AD AS INT))AS COUNT3,SUM(CAST(AJ AS INT)+CAST(AK AS INT))AS COUNT4 FROM gongzi_gongzimingxi GROUP BY C,BD having BD ='"+that.data.companyName+"'"
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
    this.showMaskWindow();
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

  maskWindowOk : function(){
    var that = this;
    var input = that.data.selected.Name;
    wx.cloud.callFunction({
      name: "sqlServer_117",
      data: {
        query: "SELECT top 100 C as department,sum(cast(Z as int))as Z,sum(cast(AJ as int))as AJ,SUM(cast(Z as int)+cast(AJ AS INT))AS COUNT1, SUM(CAST(AA AS INT))AS AA,SUM(CAST(AK AS INT))AS AK,SUM(CAST(AA AS INT) + CAST(AK AS INT))AS COUNT2,SUM(CAST(AC AS INT))AS AC,SUM(CAST(AD AS INT))AS AD,SUM(CAST(Z AS INT)+CAST(AA AS INT)+CAST(AC AS INT)+CAST(AD AS INT))AS COUNT3,SUM(CAST(AJ AS INT)+CAST(AK AS INT))AS COUNT4 FROM gongzi_gongzimingxi GROUP BY C,BD having C = '"+input+"' and BD = '"+that.data.companyName+"'"
      },
      success: res => {
        console.log("部门查询成功！", res.result)
        
        that.setData({
          list: res.result.recordset,
          svHidden : false,
          selectHid : false,
          selectText : "请选择",
        })
        that.dismissMaskWindow();
      },
      err: res => {
        console.log("错误!", res)
      },
      complete: () => {

      }
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

  //添加
  tianjia: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "insert into gongzi_gongzimingxi (B) values('请输入')"
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