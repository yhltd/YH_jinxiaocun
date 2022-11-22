// pages/general/general.js
Page({

  /**
   * 页面的初始数据
   */

  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  data: {
    max_page:1,
    this_page:1,
    picker_select:'待接受任务',
    pick_list:[
      {label:'待接受任务'},
      {label:'进行中任务'},
      {label:'已完成任务'},
      {label:'已取消任务'},
    ],
    checkItems:[],
    list: [],
    title: [
      {
      text: "客户",
      width: "450rpx",
      columnName: "kehu",
      type: "text",
      isupd: true
    },{
        text: "图号",
        width: "275rpx",
        columnName: "pic_no",
        type: "text",
        isupd: true
      },
      {
        text: "订单名称",
        width: "400rpx",
        columnName: "order_name",
        type: "text",
        isupd: true
      },
      {
        text: "单台组成名称",
        width: "230rpx",
        columnName: "dantai_name",
        type: "text",
        isupd: true
      },
      {
        text: "大工序",
        width: "200rpx",
        columnName: "gongxu",
        type: "text",
        isupd: true
      },
      {
        text: "零件名称",
        width: "350rpx",
        columnName: "lingjian",
        type: "text",
        isupd: true
      },
      {
        text: "尺寸信息",
        width: "275rpx",
        columnName: "size",
        type: "text",
        isupd: true
      },{
        text: "生产数量",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },{
        text: "任务类型",
        width: "200rpx",
        columnName: "type",
        type: "text",
        isupd: true
      },{
        text: "接单人",
        width: "200rpx",
        columnName: "jiedanren",
        type: "text",
        isupd: true
      },{
        text: "是否完工",
        width: "200rpx",
        columnName: "is_wangong",
        type: "text",
        isupd: true
      },{
        text: "材质",
        width: "200rpx",
        columnName: "cailiao",
        type: "text",
        isupd: true
      },{
        text: "用时（天）",
        width: "200rpx",
        columnName: "gongshi",
        type: "text",
        isupd: true
      },{
        text: "备注（窗口）",
        width: "230rpx",
        columnName: "remark",
        type: "text",
        isupd: true
      },{
        text: "备注（新增）",
        width: "230rpx",
        columnName: "beizhu",
        type: "text",
        isupd: true
      },{
        text: "选项",
        width: "200rpx",
        columnName: "xuanxiang",
        type: "text",
        isupd: true
      },{
        text: "制造商接受状态",
        width: "300rpx",
        columnName: "zhizao_jieshou",
        type: "text",
        isupd: true
      },{
        text: "制造商完成情况",
        width: "300rpx",
        columnName: "zhizao_wancheng",
        type: "text",
        isupd: true
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var this_select = JSON.parse(options.picker_select)
    _this.setData({
      userInfo:userInfo,
      picker_select:this_select,
    })
    var ee = []
    if(this_select =='待接受任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '' ",1,50]
    }else if(this_select =='进行中任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '已接受' and isnull(zhizao_wancheng,'') != '已完成' ",1,50]
    }else if (this_select =='已完成任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '已接受' and zhizao_wancheng = '已完成'",1,50]
    }else if (this_select =='已取消任务'){
      var ee = ["where zhizao_list like '%" + _this.data.userInfo.username + "%' and jiedanren != '" + _this.data.userInfo.username + "' ",1,50]
    }
    _this.setData({
      ee
    })
    _this.pageShow(ee)
    _this.tableShow(ee)
  },

  choicePick (e) {
    var _this = this
    _this.setData({
      picker_select: _this.data.pick_list[e.detail.value].label
    })
    var this_select = _this.data.pick_list[e.detail.value].label
    var ee = []
    if(this_select =='待接受任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '' ",1,50]
    }else if(this_select =='进行中任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '已接受' and isnull(zhizao_wancheng,'') != '已完成' ",1,50]
    }else if (this_select =='已完成任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '已接受' and zhizao_wancheng = '已完成'",1,50]
    }else if (this_select =='已取消任务'){
      var ee = ["where zhizao_list like '%" + _this.data.userInfo.username + "%' and jiedanren != '" + _this.data.userInfo.username + "' ",1,50]
    }
    _this.setData({
      ee
    })
    _this.pageShow(ee)
    _this.tableShow(ee)
  },

  page_up_click () {
    var _this = this
    var this_select = _this.data.picker_select
    var this_page = _this.data.this_page
    var max_page = _this.data.max_page
    if(this_page * 1 + 1 > max_page){
      wx.showToast({
        title: '已经最后一页！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var start_page = this_page * 50 + 1
    var stop_page = start_page + 49
    this_page = this_page + 1
    _this.setData({
      this_page
    })
    var ee = []
    if(this_select =='待接受任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '' ",start_page,stop_page]
    }else if(this_select =='进行中任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '已接受' and isnull(zhizao_wancheng,'') != '已完成' ",start_page,stop_page]
    }else if (this_select =='已完成任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '已接受' and zhizao_wancheng = '已完成'",start_page,stop_page]
    }else if (this_select =='已取消任务'){
      var ee = ["where zhizao_list like '%" + _this.data.userInfo.username + "%'",start_page,stop_page]
    }
    _this.setData({
      ee
    })
    _this.page_show(ee)
  },

  page_down_click () {
    var _this = this
    var this_select = _this.data.picker_select
    var this_page = _this.data.this_page
    var max_page = _this.data.max_page
    if(this_page * 1 - 1 < 1){
      wx.showToast({
        title: '已经第一页！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    this_page = this_page - 1
    var start_page = this_page * 50 + 1
    var stop_page = start_page + 49
    _this.setData({
      this_page
    })
    var ee = []
    if(this_select =='待接受任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '' ",start_page,stop_page]
    }else if(this_select =='进行中任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '已接受' and isnull(zhizao_wancheng,'') != '已完成' ",start_page,stop_page]
    }else if (this_select =='已完成任务'){
      var ee = ["where jiedanren = '" + _this.data.userInfo.username + "' and isnull(zhizao_jieshou,'') = '已接受' and zhizao_wancheng = '已完成'",start_page,stop_page]
    }else if (this_select =='已取消任务'){
      var ee = ["where zhizao_list like '%" + _this.data.userInfo.username + "%'",start_page,stop_page]
    }
    _this.setData({
      ee
    })
    _this.page_show(ee)
  },


  tableShow: function (e) {
    var _this = this
    var sql = "select * from (select row_number() over(order by id) as row_num,* from (select tl.id,isnull(tl.kehu,'') as kehu,isnull(pic_no,'') as pic_no,isnull(order_name,'') as order_name,isnull(dantai_name,'') as dantai_name,isnull(gongxv,'') as gongxv,isnull(lingjian,'') as lingjian,isnull(size,'') as size,isnull(num,'') as num,isnull(type,'') as type,isnull(jiedanren,'') as jiedanren,riqi,riqi2,isnull(is_wangong,'') as is_wangong,'' as cailiao,isnull(gongshi,'') as gongshi,isnull(remark,'') as remark,isnull(xuanxiang,'') as xuanxiang,isnull(jixing,'') as jixing,isnull(tl.order_no,'') as order_no,isnull(shunxv,'') as shunxv,'' as ks,isnull(dantai_id,'') as dantai_id,isnull(beizhu,'') as beizhu,isnull(zhizao_jieshou,'') as zhizao_jieshou,isnull(zhizao_wancheng,'') as zhizao_wancheng,isnull(kuguan_ruku,'') as kuguan_ruku,isnull(zhizao_list,'') as zhizao_list,isnull(ma.kehu,'') as kehu2 from task_list as tl left join (select id,order_no,kehu,ku from management) as ma on tl.order_no = ma.order_no where (tl.ku<>'库' or tl.ku is null and ma.ku<>'库' or ma.ku is null)) as list "+ e[0] +") as list_end where row_num between " + e[1] + " and " + e[2] 
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_bazhou',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        for(var i=0; i<list.length; i++){
          if(list[i].kehu2 != ''){
            list[i].kehu = list[i].kehu2
          }
        }
        console.log(list)
        _this.setData({
          list: list,
          checkItems:[],
        })
        console.log(list)
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  page_show: function (e) {
    var _this = this
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var sql = "select * from (select row_number() over(order by id) as row_num,* from (select tl.id,isnull(tl.kehu,'') as kehu,isnull(pic_no,'') as pic_no,isnull(order_name,'') as order_name,isnull(dantai_name,'') as dantai_name,isnull(gongxv,'') as gongxv,isnull(lingjian,'') as lingjian,isnull(size,'') as size,isnull(num,'') as num,isnull(type,'') as type,isnull(jiedanren,'') as jiedanren,riqi,riqi2,isnull(is_wangong,'') as is_wangong,'' as cailiao,isnull(gongshi,'') as gongshi,isnull(remark,'') as remark,isnull(xuanxiang,'') as xuanxiang,isnull(jixing,'') as jixing,isnull(tl.order_no,'') as order_no,isnull(shunxv,'') as shunxv,'' as ks,isnull(dantai_id,'') as dantai_id,isnull(beizhu,'') as beizhu,isnull(zhizao_jieshou,'') as zhizao_jieshou,isnull(zhizao_wancheng,'') as zhizao_wancheng,isnull(kuguan_ruku,'') as kuguan_ruku,isnull(zhizao_list,'') as zhizao_list from task_list as tl where (tl.ku<>'库' or tl.ku is null)) as list "+ e[0] +") as list_end where row_num between " + e[1] + " and " + e[2] 
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_bazhou',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        for(var i=0; i<list.length; i++){
          if(list[i].kehu2 != ''){
            list[i].kehu = list[i].kehu2
          }
        }
        console.log(list)
        _this.setData({
          list: list
        })
        console.log(list)
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
        wx.hideLoading({

        })
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
        wx.hideLoading({

        })
      }
    })
  },

  pageShow: function (e) {
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this
    var sql = "select count(*) as page from (select row_number() over(order by id) as row_num,* from (select tl.id,isnull(tl.kehu,'') as kehu,isnull(pic_no,'') as pic_no,isnull(order_name,'') as order_name,isnull(dantai_name,'') as dantai_name,isnull(gongxv,'') as gongxv,isnull(lingjian,'') as lingjian,isnull(size,'') as size,isnull(num,'') as num,isnull(type,'') as type,isnull(jiedanren,'') as jiedanren,riqi,riqi2,isnull(is_wangong,'') as is_wangong,'' as cailiao,isnull(gongshi,'') as gongshi,isnull(remark,'') as remark,isnull(xuanxiang,'') as xuanxiang,isnull(jixing,'') as jixing,isnull(tl.order_no,'') as order_no,isnull(shunxv,'') as shunxv,'' as ks,isnull(dantai_id,'') as dantai_id,isnull(beizhu,'') as beizhu,isnull(zhizao_jieshou,'') as zhizao_jieshou,isnull(zhizao_wancheng,'') as zhizao_wancheng,isnull(kuguan_ruku,'') as kuguan_ruku,isnull(zhizao_list,'') as zhizao_list,isnull(ma.kehu,'') as kehu2 from task_list as tl left join (select id,order_no,kehu,ku from management) as ma on tl.order_no = ma.order_no where (tl.ku<>'库' or tl.ku is null and ma.ku<>'库' or ma.ku is null)) as list "+ e[0] +") as list_end "
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_bazhou',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        var this_row = list[0].page
        var max_page = Math.ceil(this_row * 1 / 50)
        console.log(max_page)
        var this_page = 1
        _this.setData({
          max_page,
          this_page,
        })
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
        wx.hideLoading({

        })
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        wx.hideLoading({

        })
        console.log("请求失败！")
      }
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  clickView:function(){
    var _this = this
    if(_this.data.picker_select != '待接受任务' && _this.data.picker_select != '进行中任务'){
      wx.showToast({
        title: '无需操作！',
        icon: 'none'
      })
      return;
    }
    _this.setData({
      xgShow:true,
    })
  },

  yes_click:function(){
    var _this = this
    var checkItems = _this.data.checkItems
    var sql = ""
    if(_this.data.picker_select == '待接受任务'){
      sql = "update task_list set zhizao_jieshou = '已接受' where id in("
    }else if(_this.data.picker_select == '进行中任务'){
      sql = "update task_list set zhizao_wancheng = '已完成' where id in("
    }

    for(var i=0;i<checkItems.length;i++){
      if(i==checkItems.length-1){
        sql += checkItems[i]+")"
        break;
      }
      sql += checkItems[i]+","
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_bazhou',
      data: {
        query: sql
      },
      success: res => {
        _this.setData({
          id:'',
        })
        _this.qxShow()
        var e = _this.data.ee
         _this.tableShow(e)

        wx.showToast({
          title: '修改成功！',
          icon: 'none'
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })

  },

  no_click:function(){
    var _this = this
    var checkItems = _this.data.checkItems
    var sql = ""

    if(_this.data.picker_select == '待接受任务'){
      sql = "update task_list set zhizao_jieshou = '已拒绝' where id in("
    }else if(_this.data.picker_select == '进行中任务'){
      sql = "update task_list set zhizao_wancheng = '未完成' where id in("
    }

    for(var i=0;i<checkItems.length;i++){
      if(i==checkItems.length-1){
        sql += checkItems[i]+")"
        break;
      }
      sql += checkItems[i]+","
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_bazhou',
      data: {
        query: sql
      },
      success: res => {
        _this.setData({
          id:'',
        })
        _this.qxShow()
        var e = _this.data.ee
         _this.tableShow(e)

        wx.showToast({
          title: '修改成功！',
          icon: 'none'
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })

  },

  choice_checkBox_examine : function(e){
    var _this = this;
    var value = e.detail.value
    var id = e.currentTarget.dataset.id;
    var checkItems = _this.data.checkItems;
    if(value!=""){
      checkItems.push(id)
    }else{
      for(let i=0;i<checkItems.length;i++){
        if(checkItems[i]==id){
          checkItems.splice(i,1)
        }
      }
    }
    _this.setData({
      checkItems
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})