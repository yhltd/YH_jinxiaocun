// package_huaqun/page/zhguanli/zhguanli.js
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
    list: [],
    title: [{
        text: "客户名称",
        width: "250rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "产品名称",
        width: "250rpx",
        columnName: "NameofProduct",
        type: "text",
        isupd: true
      },
      {
        text: "单位",
        width: "250rpx",
        columnName: "unit",
        type: "text",
        isupd: true
      },
      {
        text: "单价",
        width: "250rpx",
        columnName: "Theunitprice",
        type: "text",
        isupd: true
      },
      {
        text: "是否需要后补重量",
        width: "300rpx",
        columnName: "zhongliang",
        type: "text",
        isupd: true
      },
      {
        text: "是否需要还筐",
        width: "250rpx",
        columnName: "kuang",
        type: "text",
        isupd: true
      },
      {
        text: "期初欠筐",
        width: "250rpx",
        columnName: "kuang_num",
        type: "text",
        isupd: true
      },
      {
        text: "当前欠筐",
        width: "250rpx",
        columnName: "dangqian_kuang",
        type: "text",
        isupd: true
      },
    ],
    list:[],
    id:'',
    name:'',
    Thedetail_id: '',  
    Customer_id: '',
    NameofProduct:'',
    unit: '',
    Theunitprice:'',
    kuang_num:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo
    })
    var ee = ['','',1,50]
    _this.setData({
      ee
    })
    _this.pageShow(ee)
    _this.tableShow(ee)
    // _this.tableShow(e)  
  },
  pageShow: function (e) {
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this
    var sql = ""
    if(_this.data.userInfo.power == '管理员'){
      sql = "select count(*) as page from (select * from(select row_number() over(order by name,chanpin.NameofProduct) as row_num,id,name,salesman,chanpin.NameofProduct,unit,Theunitprice,zhongliang,kuang,kuang_num,isnull(qiankuang,'') as qiankuang,isnull(huikuang,'') as huikuang from (select userInfo.id as Customer_id,DP.id,userInfo.name as name,userInfo.salesman,DC.NameofProduct,DC.unit,DP.Theunitprice,DC.zhongliang,DC.kuang,DP.kuang_num from DetailsofProducts as DP left join DetailedConfiguration as DC on DP.Thedetail_id = DC.id left join userInfo on DP.Customer_id = userInfo.id) as chanpin left join (select Customer_id,NameofProduct,sum(convert(float,number)) as qiankuang,sum(convert(float,huikuang)) as huikuang from Detailsoforder group by Customer_id,NameofProduct) as kuang on chanpin.Customer_id = kuang.Customer_id and chanpin.NameofProduct = kuang.NameofProduct and kuang = '是' where chanpin.NameofProduct like '%" + e[0] + "%' and name like '%" + e[1] + "%' ) as list ) as list_end"
    }else{
      sql = "select count(*) as page from (select * from(select row_number() over(order by name,chanpin.NameofProduct) as row_num,id,name,salesman,chanpin.NameofProduct,unit,Theunitprice,zhongliang,kuang,kuang_num,isnull(qiankuang,'') as qiankuang,isnull(huikuang,'') as huikuang from (select userInfo.id as Customer_id,DP.id,userInfo.name as name,userInfo.salesman,DC.NameofProduct,DC.unit,DP.Theunitprice,DC.zhongliang,DC.kuang,DP.kuang_num from DetailsofProducts as DP left join DetailedConfiguration as DC on DP.Thedetail_id = DC.id left join userInfo on DP.Customer_id = userInfo.id) as chanpin left join (select Customer_id,NameofProduct,sum(convert(float,number)) as qiankuang,sum(convert(float,huikuang)) as huikuang from Detailsoforder group by Customer_id,NameofProduct) as kuang on chanpin.Customer_id = kuang.Customer_id and chanpin.NameofProduct = kuang.NameofProduct and kuang = '是' where salesman = '" + _this.data.userInfo.id + "' and chanpin.NameofProduct like '%" + e[0] + "%' and name like '%" + e[1] + "%' ) as list ) as list_end"
    }
    
    console.log("想要的"+sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
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

  tableShow: function (e) {
    var _this = this
    var sql = ""
    console.log(_this.data.userInfo.power)
    if(_this.data.userInfo.power == '管理员'){
      sql = "select * from(select row_num,id,name,salesman,chanpin.NameofProduct,unit,Theunitprice,zhongliang,kuang,kuang_num,isnull(qiankuang,'') as qiankuang,isnull(huikuang,'') as huikuang from (select row_num,userInfo.id as Customer_id,DP.id,userInfo.name as name,userInfo.salesman,DC.NameofProduct,DC.unit,DP.Theunitprice,DC.zhongliang,DC.kuang,DP.kuang_num from (select row_number() over(order by Customer_id,NameofProduct) as row_num,* from DetailsofProducts) as DP left join DetailedConfiguration as DC on DP.Thedetail_id = DC.id left join userInfo on DP.Customer_id = userInfo.id) as chanpin left join (select Customer_id,NameofProduct,sum(convert(float,number)) as qiankuang,sum(convert(float,huikuang)) as huikuang from Detailsoforder group by Customer_id,NameofProduct) as kuang on chanpin.Customer_id = kuang.Customer_id and chanpin.NameofProduct = kuang.NameofProduct and kuang = '是' where chanpin.NameofProduct like '%" + e[0] + "%' and name like '%" + e[1] + "%' ) as list where row_num between " + e[2] + " and " + e[3] +  " order by row_num"
    }else{
      sql = "select * from(select row_num,id,name,salesman,chanpin.NameofProduct,unit,Theunitprice,zhongliang,kuang,kuang_num,isnull(qiankuang,'') as qiankuang,isnull(huikuang,'') as huikuang from (select row_num,userInfo.id as Customer_id,DP.id,userInfo.name as name,userInfo.salesman,DC.NameofProduct,DC.unit,DP.Theunitprice,DC.zhongliang,DC.kuang,DP.kuang_num from (select row_number() over(order by Customer_id,NameofProduct) as row_num,* from DetailsofProducts) as DP left join DetailedConfiguration as DC on DP.Thedetail_id = DC.id left join userInfo on DP.Customer_id = userInfo.id) as chanpin left join (select Customer_id,NameofProduct,sum(convert(float,number)) as qiankuang,sum(convert(float,huikuang)) as huikuang from Detailsoforder group by Customer_id,NameofProduct) as kuang on chanpin.Customer_id = kuang.Customer_id and chanpin.NameofProduct = kuang.NameofProduct and kuang = '是' where salesman = '" + _this.data.userInfo.id + "' and chanpin.NameofProduct like '%" + e[0] + "%' and name like '%" + e[1] + "%' ) as list where row_num between " + e[2] + " and " + e[3] +  " order by row_num"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        for(var i=0; i<list.length; i++){
          if(list[i].kuang == '是'){
            list[i].dangqian_kuang = list[i].kuang_num * 1 - list[i].qiankuang * 1 + list[i].huikuang
          }
        }
        console.log(list)
        _this.setData({
          list: list
        })
        console.log(list)
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
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

  clickView:function(e){
    var _this = this
    _this.setData({
      index: e.currentTarget.dataset.index,
      id: _this.data.list[e.currentTarget.dataset.index].id,
      NameofProduct: _this.data.list[e.currentTarget.dataset.index].NameofProduct, 
      unit: _this.data.list[e.currentTarget.dataset.index].unit,
      Theunitprice: _this.data.list[e.currentTarget.dataset.index].Theunitprice,
      kuang_num: _this.data.list[e.currentTarget.dataset.index].kuang_num,
      xgShow:true,
    })
  },
  
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      NameofProduct: '', 
      unit: '',
      Theunitprice:'',
      kuang_num:'',
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    var value = e.detail.value
    if(column == 'kuang_num'){
      var replaceArray = [];
      for (let i = 0; i < value.length; ++i) {//正则判断是否合法
        var textValue = (/^[0-9_.+-]$/.test(value.charAt(i)));
        if (!textValue) {
          replaceArray.push(value.charAt(i));
        }
      }
      if (replaceArray.length != 0) {
        wx.showToast({
          title: '只能输入数字，小数点和加减号',
          icon: 'none'
        })
        for (let j = 0; j < replaceArray.length; ++j) {//循环删除不合法内容
          value = value.replace(replaceArray[j], '');
        }
      }
    }
    _this.setData({
      currentDate: e.detail,
      [column]: value
    })
  },

  upd1:function(){
    var _this = this
    var sql = ""
    if(_this.data.userInfo.power == '管理员' ){
      sql = "update DetailsofProducts set Theunitprice='" + _this.data.Theunitprice + "',kuang_num='" + _this.data.kuang_num + "' where id=" + _this.data.id
    }else{
      wx.showToast({
        title: '无权限！',
      })
      return;
    }
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        //query: "update DetailsofProducts set Theunitprice='" + _this.data.Theunitprice + "',kuang_num='" + _this.data.kuang_num + "' where id=" + _this.data.id
        query: sql
      },
      success: res => {
        var list = _this.data.list
        var index = _this.data.index
        list[index].Theunitprice = _this.data.Theunitprice
        list[index].kuang_num = _this.data.kuang_num
        _this.setData({
            list,
            id:'',
            NameofProduct: '', 
            unit: '',
            Theunitprice:'',
            kuang_num:'',
        })
        _this.qxShow()
        console.log(_this.data.cxcpmc)
        // var e = [_this.data.cxcpmc,_this.data.cxkhmc]
        //  _this.tableShow(e)
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

  page_up_click () {
    var _this = this
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
    var ee = [_this.data.NameofProduct,_this.data.name,start_page,stop_page]
    
    _this.setData({
      ee
    })
    _this.page_show(ee)
  },

  page_down_click () {
    var _this = this
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
    var ee = [_this.data.NameofProduct,_this.data.name,start_page,stop_page]
    _this.setData({
      ee
    })
    _this.page_show(ee)
  },

  page_show: function (e) {
    var _this = this
    var sql = ""
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    if(_this.data.userInfo.power == '管理员'){
      sql = "select * from(select row_number() over(order by name,chanpin.NameofProduct) as row_num,id,name,salesman,chanpin.NameofProduct,unit,Theunitprice,zhongliang,kuang,kuang_num,isnull(qiankuang,'') as qiankuang,isnull(huikuang,'') as huikuang from (select userInfo.id as Customer_id,DP.id,userInfo.name as name,userInfo.salesman,DC.NameofProduct,DC.unit,DP.Theunitprice,DC.zhongliang,DC.kuang,DP.kuang_num from DetailsofProducts as DP left join DetailedConfiguration as DC on DP.Thedetail_id = DC.id left join userInfo on DP.Customer_id = userInfo.id) as chanpin left join (select Customer_id,NameofProduct,sum(convert(float,number)) as qiankuang,sum(convert(float,huikuang)) as huikuang from Detailsoforder group by Customer_id,NameofProduct) as kuang on chanpin.Customer_id = kuang.Customer_id and chanpin.NameofProduct = kuang.NameofProduct and kuang = '是' where chanpin.NameofProduct like '%" + e[0] + "%' and name like '%" + e[1] + "%' ) as list where row_num between " + e[2] + " and " + e[3]
    }else{
      sql = "select * from(select row_number() over(order by name,chanpin.NameofProduct) as row_num,id,name,salesman,chanpin.NameofProduct,unit,Theunitprice,zhongliang,kuang,kuang_num,isnull(qiankuang,'') as qiankuang,isnull(huikuang,'') as huikuang from (select userInfo.id as Customer_id,DP.id,userInfo.name as name,userInfo.salesman,DC.NameofProduct,DC.unit,DP.Theunitprice,DC.zhongliang,DC.kuang,DP.kuang_num from DetailsofProducts as DP left join DetailedConfiguration as DC on DP.Thedetail_id = DC.id left join userInfo on DP.Customer_id = userInfo.id) as chanpin left join (select Customer_id,NameofProduct,sum(convert(float,number)) as qiankuang,sum(convert(float,huikuang)) as huikuang from Detailsoforder group by Customer_id,NameofProduct) as kuang on chanpin.Customer_id = kuang.Customer_id and chanpin.NameofProduct = kuang.NameofProduct and kuang = '是' where salesman = '" + _this.data.userInfo.id + "' and chanpin.NameofProduct like '%" + e[0] + "%' and name like '%" + e[1] + "%' ) as list where row_num between " + e[2] + " and " + e[3]
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
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

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.NameofProduct]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.NameofProduct,_this.data.name,1,50]
    this.setData({
      cxcpmc: _this.data.NameofProduct,
      cxkhmc: _this.data.name
    })
    _this.pageShow(e)
    _this.tableShow(e)
    _this.qxShow()
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
