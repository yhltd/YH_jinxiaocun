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
    title: [{
      text: "日",
      width: 20,
      columnName: "A",
      type: "text",
      isupd: true
    },
    {
      text: "一",
      width: 20,
      columnName: "B",
      type: "text",
      isupd: true
    },
    {
      text: "二",
      width: 20,
      columnName: "C",
      type: "text",
      isupd: true
    },
    {
      text: "三",
      width: 20,
      columnName: "D",
      type: "text",
      isupd: true
    },
    {
      text: "四",
      width: 20,
      columnName: "E",
      type: "text",
      isupd: true
    },
    {
      text: "五",
      width: 20,
      columnName: "F",
      type: "text",
      isupd: true
    },
    {
      text: "六",
      width: 20,
      columnName: "G",
      type: "text",
      isupd: true
    },],
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
      title: '生日提醒'
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
    var this_date = getNowDate()
    var this_month = this_date.split("-")[1]
    var e = ['/'+ this_month +'/']
    _this.tableShow(e)
  },
  tableShow:function(e){
    var _this = this
    var sql = "select B,Q from gongzi_renyuan where L like '"+_this.data.companyName+"%' and Q like '%" + e[0] + "%'"
    wx.cloud.callFunction({
      name: "sqlServer_117",
      data: {
        query: sql
      },
      success: res => {
        console.log(res.result.recordset)
        var birthday_list = res.result.recordset
        var now_date = getNowDate()
        var this_start_date = now_date.split("-")[0] + e[0] + '1'
        var this_stop_date = new Date(this_start_date) 
        var this_start_week = new Date(this_start_date).getDay();
        this_stop_date = getCurrentMonthLast(this_stop_date)
        this_stop_date = getThisDate(this_stop_date)
        var this_stop_day = this_stop_date.split("/")[2] * 1
        console.log(this_start_date)
        console.log(this_stop_date)
        console.log(this_start_week)
        var end_array = []

        var title1 = ''
        var title2 = ''
        var title3 = ''
        var title4 = ''
        var title5 = ''
        var title6 = ''
        var title7 = ''
        var list1 = ''
        var list2 = ''
        var list3 = ''
        var list4 = ''
        var list5 = ''
        var list6 = ''
        var list7 = ''

        for(var i=1; i<= this_stop_day; i++){
          
          if(this_start_week == 0){
            title1 = i
            for(var j=0; j<birthday_list.length; j++){
              if(birthday_list[j].Q.split("/")[2] * 1 == i){
                if(list1 == ''){
                  list1 = birthday_list[j].B
                }else{
                  list1 = list1 + "," + birthday_list[j].B
                }
              }
            }
            this_start_week = this_start_week + 1
          }else if(this_start_week == 1){
            title2 = i
            for(var j=0; j<birthday_list.length; j++){
              if(birthday_list[j].Q.split("/")[2] * 1 == i){
                if(list2 == ''){
                  list2 = birthday_list[j].B
                }else{
                  list2 = list2 + "," + birthday_list[j].B
                }
              }
            }
            this_start_week = this_start_week + 1
          }else if(this_start_week == 2){
            title3 = i
            for(var j=0; j<birthday_list.length; j++){
              if(birthday_list[j].Q.split("/")[2] * 1 == i){
                if(list3 == ''){
                  list3 = birthday_list[j].B
                }else{
                  list3 = list3 + "," + birthday_list[j].B
                }
              }
            }
            this_start_week = this_start_week + 1
          }else if(this_start_week == 3){
            title4 = i
            for(var j=0; j<birthday_list.length; j++){
              if(birthday_list[j].Q.split("/")[2] * 1 == i){
                if(list4 == ''){
                  list4 = birthday_list[j].B
                }else{
                  list4 = list4 + "," + birthday_list[j].B
                }
              }
            }
            this_start_week = this_start_week + 1
          }else if(this_start_week == 4){
            title5 = i
            for(var j=0; j<birthday_list.length; j++){
              if(birthday_list[j].Q.split("/")[2] * 1 == i){
                if(list5 == ''){
                  list5 = birthday_list[j].B
                }else{
                  list5 = list5 + "," + birthday_list[j].B
                }
              }
            }
            this_start_week = this_start_week + 1
          }else if(this_start_week == 5){
            title6 = i
            for(var j=0; j<birthday_list.length; j++){
              if(birthday_list[j].Q.split("/")[2] * 1 == i){
                if(list6 == ''){
                  list6 = birthday_list[j].B
                }else{
                  list6 = list6 + "," + birthday_list[j].B
                }
              }
            }
            this_start_week = this_start_week + 1
          }else if(this_start_week == 6){
            title7 = i
            for(var j=0; j<birthday_list.length; j++){
              if(birthday_list[j].Q.split("/")[2] * 1 == i){
                if(list7 == ''){
                  list7 = birthday_list[j].B
                }else{
                  list7 = list7 + "," + birthday_list[j].B
                }
              }
            }
            this_start_week = this_start_week + 1
          }

          if(this_start_week == 7){
            end_array.push({
              A:title1,
              B:title2,
              C:title3,
              D:title4,
              E:title5,
              F:title6,
              G:title7,
            })
            end_array.push({
              A:list1,
              B:list2,
              C:list3,
              D:list4,
              E:list5,
              F:list6,
              G:list7,
            })
            this_start_week = 0
            var title1 = ''
            var title2 = ''
            var title3 = ''
            var title4 = ''
            var title5 = ''
            var title6 = ''
            var title7 = ''
            var list1 = ''
            var list2 = ''
            var list3 = ''
            var list4 = ''
            var list5 = ''
            var list6 = ''
            var list7 = ''
          }
        }
        if(this_start_week != 0){
          end_array.push({
            A:title1,
            B:title2,
            C:title3,
            D:title4,
            E:title5,
            F:title6,
            G:title7,
          })
          end_array.push({
            A:list1,
            B:list2,
            C:list3,
            D:list4,
            E:list5,
            F:list6,
            G:list7,
          })
        }
        console.log(end_array)
        _this.setData({
          list:end_array
        })
      },
      err: res => {
        console.log("错误!", res)
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
    var _this = this
    var index = that.data.selectIndex;
    var input = that.data.maskWindowInputValue;
    var start_date = _this.data.start_date
    if(start_date == ''){
      start_date = getNowDate()
    }else{
      start_date = new Date(start_date)
      start_date = getThisDate(start_date)
    }
    console.log(start_date)
    var this_month = start_date.split("/")[1]
    if (index == 0) {
      var e = ['/'+ this_month +'/']
      _this.tableShow(e)
      that.dismissMaskWindow();
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

})

function getNowDate() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }

 function getThisDate(this_date) {
  var date = this_date;
  var sign1 = "/";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }

 function getCurrentMonthLast(this_date){
  var date=this_date;
  var currentMonth=date.getMonth();
  var nextMonth=++currentMonth;
  var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
  var oneDay=1000*60*60*24;
  return new Date(nextMonthFirstDay-oneDay);
}

function isNumber(obj) {  
  return obj === +obj  
}

function isNotANumber(inputData) { 
  　　if (parseFloat(inputData).toString() == "NaN") { 
  　　　　return false; 
  　　} else { 
  　　　　return true; 
  　　} 
  }