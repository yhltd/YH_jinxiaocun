Page({

  /**
   * 页面的初始数据
   */
  data: {
    isload : true,
    result : [],
    input_type : "",
    isMaskWindowShow: false,
    selectIndex: -1,
    isMaskWindowInputShow: false,
    isMaskWindowInputShow1:false,
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
    
    svHidden : false,
    selectHid : false,
    selectText : "请选择",
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
    var _this = this;
    _this.setData({
      companyName : options.companyName,
      result : JSON.parse(options.access),
      isload : true
    })
    wx.setNavigationBarTitle({
      title: '部门汇总表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "SELECT C as department,count(id) AS num,SUM(CAST(G AS float)) AS G,SUM(CAST(H AS float)) AS H,SUM(CAST(I AS float)) AS I,SUM(CAST(J AS float)) AS J,SUM(CAST(K AS float)) AS K,SUM(CAST(L AS float)) AS  L,SUM(CAST(M AS float)) AS M,SUM(CAST(N AS float)) AS N,SUM(CAST(O AS float)) AS O,SUM(CAST(P AS float)) AS P,SUM(CAST(Q AS float)) AS Q,SUM(CAST(R AS float)) AS R,SUM(CAST(S AS float)) AS S,SUM(CAST(T AS float)) AS T,SUM(CAST(U AS float)) AS U,SUM(CAST(V AS float)) AS V,SUM(CAST(W AS float)) AS W,SUM(CAST(X AS float)) AS X,SUM(CAST(Y AS float)) AS Y,SUM(CAST(Z AS float)) AS Z,SUM(CAST(AA AS float)) AS AA,SUM(CAST(AB AS float)) AS AB,SUM(CAST(AC AS float)) AS AC,SUM(CAST(AD AS float)) AS AD,SUM(CAST(AE AS float)) AS AE,SUM(CAST(AF AS float)) AS AF,SUM(CAST(AG AS float)) AS AG,SUM(CAST(AH AS float)) AS AH,SUM(CAST(AI AS float)) AS AI,SUM(CAST(AJ AS float)) AS AJ,SUM(CAST(AK AS float)) AS AK,SUM(CAST(AL AS float)) AS AL,SUM(CAST(AM AS float)) AS AM,SUM(CAST(AN AS float)) AS AN,SUM(CAST(AO AS float)) AS AO,SUM(CAST(AP AS float)) AS AP,SUM(CAST(AQ AS float)) AS AQ,SUM(CAST(AR AS float)) AS AR,SUM(CAST(ASA AS float)) AS ASA,SUM(CAST(ATA AS float)) AS ATA,SUM(CAST(AU AS float)) AS AU,SUM(CAST(AV AS float)) AS AV,SUM(CAST(AW AS float)) AS AW,SUM(CAST(AX AS float)) AS AX,SUM(CAST(AY AS float)) AS AY FROM gongzi_gongzimingxi where BD = '"+_this.data.companyName+"' GROUP BY C,bd"
      },
      success: res => {
        console.log("进入成功!")
          this.setData({
            list: res.result.recordset,
            isload : false
          })
      },
      err: res => {
        console.log("数据库连接失败！")
      }
    })

    wx.cloud.callFunction({
      name: "sqlServer_117",
      data: {
        query: "select id,bumen from gongzi_peizhi where gongsi = '"+_this.data.companyName+"' and bumen != '-' and bumen is not null"
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


    console.log("进入title查询")
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select bumenhuizong from gongzi_title where bumenhuizong is not null"
      },
      success: res => {
        console.log("进入成功!")
        this.setData({
          title: res.result.recordsets[0]
        })
      },
      err: res => {
        console.log("数据库连接失败！")
      },
      complete: () => {}
    })

    console.log('onLoad')


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
        query: "select count(doinb) as maxpagenumber from (SELECT count(C) as doinb,count(BD) as companyName from gongzi_gongzimingxi group by C,BD HAVING BD = '"+that.data.companyName+"')t1"
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
  /*
  函数名：部门跳转函数
  描述：点击跳转指定部门
  作者：117
  时间：2020.4
  */
  to_bumenxiangqing: function (e) {
    var XD = e.currentTarget.dataset;
    var companyName = this.data.companyName
    console.log(XD)
    var department = XD.department
    wx.navigateTo({
      url: "../1bumenxiangqing/index?message=" + department + "&companyName=" +companyName +"&access="+JSON.stringify(this.data.result)
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
      input_type : $collection.type,
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

  },
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
    var _this = this;
    var selectHid = _this.data.selectHid
    _this.setData({
      selectHid : selectHid?false:true
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
          query: "select top 100 * from(select row_number() over(order by COUNT(id) asc) as rownumber,  C as department,COUNT(id) as num,SUM(CAST(G as int))AS G,SUM(CAST(H as int))as H,SUM(CAST(I as int))as I,SUM(CAST(J as int))as J,SUM(CAST(K as int))as K,SUM(CAST(L as int))as L,SUM(CAST(M as int))as M,SUM(CAST(N as int))as N,SUM(CAST(O as int))as O,SUM(CAST(P as int))as P,SUM(CAST(Q as int))as Q,SUM(CAST(R as int))as R,SUM(CAST(S as int))as S,SUM(CAST(T as int))as T,SUM(CAST(U as int))as U,SUM(CAST(V as int))as V,SUM(CAST(W as int))as W,SUM(CAST(X as int))as X,SUM(CAST(Y as int))as Y,SUM(CAST(Z as int))as Z,SUM(CAST(AA as int))as AA,SUM(CAST(AB as int))as AB,SUM(CAST(AC as int))as AC,SUM(CAST(AD as int))as AD,SUM(CAST(AE as int))as AE,SUM(CAST(AF as int))as AF,SUM(CAST(AG as int))as AG,SUM(CAST(AH as int))as AH,SUM(CAST(AI as int))as AI ,SUM(CAST(AJ as int))as AJ,SUM(CAST(AK as int))as AK,SUM(CAST(AL as int))as AL,SUM(CAST(AM as int))as AM,SUM(CAST(AN as int))as AN,SUM(CAST(AO as int))as AO,SUM(CAST(AP as int))as AP,SUM(CAST(AQ as int))as AQ,SUM(CAST(AR as int))as AR,SUM(CAST(ASA as int))as ASA,SUM(CAST(ATA as int))as ATA,SUM(CAST(AU as money))as AU,SUM(CAST(AV as int))as AV,SUM(CAST(AW as int))as AW,SUM(CAST(AX as int))as AX,SUM(CAST(AY as int))as AY from gongzi_gongzimingxi GROUP BY C,BD having BD = '"+that.data.companyName+"') temp_row where rownumber > (( '"+that.data.page+"' - 1) * 100);"
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
  nextpage: function (e) {
    var _this = this

    var pagego = e.currentTarget.dataset.pagego
    var page = parseInt(_this.data.page);
    if(pagego=="1"){page++}else{page--}

    if(page>_this.data.maxpagenumber){ 
      wx.showToast({
        title: '已经是最后一页！',
        icon : 'none'
      })
      return;
    }else if(page<1){
      wx.showToast({
        title: '已经是第一页！',
        icon : 'none'
      })
      return;
    }else{
      _this.setData({
        page
      })
      _this.baochi();
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
    that.setData({
      isload : true
    })
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select * from (SELECT C as department,count(id) AS num,SUM(CAST(G AS float)) AS G,SUM(CAST(H AS float)) AS H,SUM(CAST(I AS float)) AS I,SUM(CAST(J AS float)) AS J,SUM(CAST(K AS float)) AS K,SUM(CAST(L AS float)) AS  L,SUM(CAST(M AS float)) AS M,SUM(CAST(N AS float)) AS N,SUM(CAST(O AS float)) AS O,SUM(CAST(P AS float)) AS P,SUM(CAST(Q AS float)) AS Q,SUM(CAST(R AS float)) AS R,SUM(CAST(S AS float)) AS S,SUM(CAST(T AS float)) AS T,SUM(CAST(U AS float)) AS U,SUM(CAST(V AS float)) AS V,SUM(CAST(W AS float)) AS W,SUM(CAST(X AS float)) AS X,SUM(CAST(Y AS float)) AS Y,SUM(CAST(Z AS float)) AS Z,SUM(CAST(AA AS float)) AS AA,SUM(CAST(AB AS float)) AS AB,SUM(CAST(AC AS float)) AS AC,SUM(CAST(AD AS float)) AS AD,SUM(CAST(AE AS float)) AS AE,SUM(CAST(AF AS float)) AS AF,SUM(CAST(AG AS float)) AS AG,SUM(CAST(AH AS float)) AS AH,SUM(CAST(AI AS float)) AS AI,SUM(CAST(AJ AS float)) AS AJ,SUM(CAST(AK AS float)) AS AK,SUM(CAST(AL AS float)) AS AL,SUM(CAST(AM AS float)) AS AM,SUM(CAST(AN AS float)) AS AN,SUM(CAST(AO AS float)) AS AO,SUM(CAST(AP AS float)) AS AP,SUM(CAST(AQ AS float)) AS AQ,SUM(CAST(AR AS float)) AS AR,SUM(CAST(ASA AS float)) AS ASA,SUM(CAST(ATA AS float)) AS ATA,SUM(CAST(AU AS float)) AS AU,SUM(CAST(AV AS float)) AS AV,SUM(CAST(AW AS float)) AS AW,SUM(CAST(AX AS float)) AS AX,SUM(CAST(AY AS float)) AS AY,ROW_NUMBER() over(order by C) ROW_ID FROM gongzi_gongzimingxi where BD = '"+that.data.companyName+"' GROUP BY C,bd) as t where t.ROW_ID > "+that.data.page+"-1*100 and t.ROW_ID<"+that.data.page+"*100+1"
      },
      success: res => {
        console.log(res.result.recordset)
        this.setData({
          list: res.result.recordset,
          isload : false
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
    var selectText = that.data.selectText
    wx.cloud.callFunction({
      name: "sqlServer_117",
      data: {
        query: "select top 100 C as department,COUNT(id) as num,SUM(CAST(G as float))AS G,SUM(CAST(H as float))as H,SUM(CAST(I as float))as I,SUM(CAST(J as float))as J,SUM(CAST(K as float))as K,SUM(CAST(L as float))as L,SUM(CAST(M as float))as M,SUM(CAST(N as float))as N,SUM(CAST(O as float))as O,SUM(CAST(P as float))as P,SUM(CAST(Q as float))as Q,SUM(CAST(R as float))as R,SUM(CAST(S as float))as S,SUM(CAST(T as float))as T,SUM(CAST(U as float))as U,SUM(CAST(V as float))as V,SUM(CAST(W as float))as W,SUM(CAST(X as float))as X,SUM(CAST(Y as float))as Y,SUM(CAST(Z as float))as Z,SUM(CAST(AA as float))as AA,SUM(CAST(AB as float))as AB,SUM(CAST(AC as float))as AC,SUM(CAST(AD as float))as AD,SUM(CAST(AE as float))as AE,SUM(CAST(AF as float))as AF,SUM(CAST(AG as float))as AG,SUM(CAST(AH as float))as AH,SUM(CAST(AI as float))as AI ,SUM(CAST(AJ as float))as AJ,SUM(CAST(AK as float))as AK,SUM(CAST(AL as float))as AL,SUM(CAST(AM as float))as AM,SUM(CAST(AN as float))as AN,SUM(CAST(AO as float))as AO,SUM(CAST(AP as float))as AP,SUM(CAST(AQ as float))as AQ,SUM(CAST(AR as float))as AR,SUM(CAST(ASA as float))as ASA,SUM(CAST(ATA as float))as ATA,SUM(CAST(AU as money))as AU,SUM(CAST(AV as float))as AV,SUM(CAST(AW as float))as AW,SUM(CAST(AX as float))as AX,SUM(CAST(AY as float))as AY from gongzi_gongzimingxi where C = '" + selectText + "' and BD = '"+that.data.companyName+"' GROUP BY C"
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

  close() {
    // 关闭select
    this.selectComponent('#select').close()
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
        query: "insert into gongzi_gongzimingxi (B,BD) values('请输入','"+that.data.companyName+"')"
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