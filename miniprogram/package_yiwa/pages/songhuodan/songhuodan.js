Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false, 
  xgShow1: false,
  xgShow2: false,
  xgShow3: false,
  cxShow: false,
  xlShow:false,
  data: {
    list: [],
    title: [{
        text: "产品",
        width: "250rpx",
        columnName: "NameofProduct",
        type: "text",
        isupd: true
      },
      {
        text: "数量",
        width: "250rpx",
        columnName: "number",
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
        text: "总价",
        width: "250rpx",
        columnName: "zongjia",
        type: "text",
        isupd: true
      },
    ],

    huankuang_title: [{
      text: "产品名称",
      width: "250rpx",
      columnName: "product_name",
      type: "text",
      isupd: true
    },
    {
      text: "总欠",
      width: "250rpx",
      columnName: "zongqian",
      type: "text",
      isupd: true
    },
    {
      text: "出筐",
      width: "250rpx",
      columnName: "chukuang",
      type: "text",
      isupd: true
    },
    {
      text: "回筐",
      width: "250rpx",
      columnName: "huikuang",
      type: "text",
      isupd: true
    },
  ],

    id:'',
    username: '', 
    password: '',
    name:'',
    power: '',
    salesman: '',
    driver: '',
    qr_code: '',
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
    var sql = ""
    if(userInfo.power == '管理员'){
      sql = "select id,name from userInfo where power = '客户'"
    }else{
      sql = "select id,name from userInfo where power = '客户' and driver = '" + userInfo.id + "'"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var kehu_list = res.result.recordset
        console.log(kehu_list)
        _this.setData({ 
          kehu_list: kehu_list,
        })
        console.log(kehu_list)
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

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "select * from (select * from (select *,'' as zongjia from (select * from (select * from (select df.id,Customer_id,Documentnumber,riqi,NameofProduct,unit,Theunitprice,number,huikuang,zhongliang_num,name as kehu,phone as kehu_phone,driver,salesman,beizhu from Detailsoforder as df left join (select id,name,phone,driver,salesman from userInfo) as us on df.Customer_id = us.id) as df2 left join (select id as siji_id,name as siji,phone as siji_phone from userInfo) as us2 on df2.driver = us2.siji_id) as df3 left join (select id as yewuyuan_id,name as yewuyuan,phone as yewuyuan_phone from userInfo) as us3 on df3.salesman = us3.yewuyuan_id) as df4 left join (select Customer_id as kehu_id,NameofProduct as production_name,unit as danwei,isnull(sum(CONVERT(float,isnull(number,0))) - sum(CONVERT(float,isnull(huikuang,0))),0) as qiankuang from Detailsoforder where riqi < '" + e[1] + "' group by Customer_id,NameofProduct,unit) as kuang_left on df4.Customer_id = kuang_left.kehu_id and df4.NameofProduct = kuang_left.production_name and df4.unit = kuang_left.danwei) as df5 left join (select NameofProduct as product_name,unit as danwei1,zhongliang,kuang from DetailedConfiguration) as dc on df5.NameofProduct = dc.product_name and df5.unit = dc.danwei1 where Customer_id = " + e[0] + " and riqi = '" + e[1] + "') as df6 left join (select Customer_id as c_id,kuang_num as qichu_kuang,NameofProduct as ming,unit as dw from DetailsofProducts) as kuang on df6.NameofProduct = kuang.ming and df6.unit = kuang.dw and df6.Customer_id = kuang.c_id;select * from beizhu;"
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        if(list.length < 1){
          wx.showToast({
            title: '未查询到相关订单！',
            icon: 'none',
            duration: 3000
          })
          return;
        }
        var beizhu1 = res.result.recordsets[1][0].beizhu
        var beizhu2 = list[0].beizhu

        var head_list = {
          kehu:list[0].kehu,
          kehu_phone:list[0].kehu_phone,
          siji:list[0].siji,
          siji_phone:list[0].siji_phone,
          yewuyuan:list[0].yewuyuan,
          yewuyuan_phone:list[0].yewuyuan_phone,
          riqi:list[0].riqi,
        }
        console.log(list)
        var zhongliang_list = []
        var huankuang_list = []
        for(var i=0; i<list.length; i++){
          if(list[i].qichu_kuang == ''){
            list[i].qichu_kuang = 0
          }
          if(list[i].kuang == '是'){
            if(list[i].qichu_kuang == null){
              list[i].qichu_kuang = 0
            }
            huankuang_list.push({
              id:list[i].id,
              product_name:list[i].NameofProduct,
              zongqian:list[i].qichu_kuang * 1 + list[i].qiankuang * 1,
              chukuang:list[i].number,
              huikuang:list[i].huikuang,
            })
          }

          if(list[i].zhongliang != '是'){
            list[i].zongjia = list[i].number * list[i].Theunitprice
          }else{
            var zhongliang_sum = 0
            var zhongliang_arr = list[i].zhongliang_num.split(",")
            for(var j=0; j<zhongliang_arr.length; j++){
              if(zhongliang_arr[j] != ''){
                zhongliang_sum = zhongliang_sum * 1 + zhongliang_arr[j] * 1
              }
            }

            var item = [list[i].id,list[i].NameofProduct]

            var zhongliang_item = list[i].zhongliang_num.split(",")
            for(var j=1; j<= list[i].number * 1; j++){
              if(j - 1 < zhongliang_item.length){
                item.push(zhongliang_item[j-1])
              }else{
                item.push("")
              }
              
            }
            console.log(item)
            zhongliang_list.push(JSON.parse(JSON.stringify(item)))
            list[i].zongjia = zhongliang_sum * list[i].Theunitprice
            list[i].number = list[i].number + "(" + zhongliang_sum + ")"
            
          }
        }
        console.log(list)
        var zongjia = 0
        for(var i=0; i<list.length; i++){
          if(list[i].zongjia != '' && list[i].zongjia != undefined && list[i].zongjia != null){
            zongjia = zongjia * 1 + list[i].zongjia * 1
          }
        }
        zongjia = "总价：" + zongjia
        console.log(zhongliang_list)
        console.log(huankuang_list)
        _this.setData({ 
          list: list,
          head_list,
          zhongliang_list,
          huankuang_list,
          beizhu1,
          beizhu2,
          zongjia,
        })
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

  shengcheng:function(){
    var _this = this
    var head_list = _this.data.head_list
    var list = _this.data.list
    var zhongliang_list = _this.data.zhongliang_list
    var huankuang_list = _this.data.huankuang_list
    var beizhu1 = _this.data.beizhu1
    var beizhu2 = _this.data.beizhu2
    var zongjia = _this.data.zongjia
    var sel_id = _this.data.sel_id
    var sel_riqi = _this.data.sel_riqi
    if(sel_id == ''){
      wx.showToast({
        title: '请查询后再使用此功能！',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: "../dayin/dayin?head_list=" + JSON.stringify(head_list) + "&list=" + JSON.stringify(list) + "&zhongliang_list=" + JSON.stringify(zhongliang_list) + "&huankuang_list=" + JSON.stringify(huankuang_list) + "&beizhu1=" + JSON.stringify(beizhu1) + "&beizhu2=" + JSON.stringify(beizhu2) + "&zongjia=" + JSON.stringify(zongjia) + "&sel_id=" + JSON.stringify(sel_id) + "&sel_riqi=" + JSON.stringify(sel_riqi)
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      xgShow1:false,
      xgShow2:false,
      xgShow3:false,
    })
  },

  kehu_select:function(e){
    var _this = this
    var sql = ""
    var userInfo = _this.data.userInfo
    if(userInfo.power == '管理员'){
      sql = "select id,name from userInfo where power = '客户' and name like '%" + _this.data.name + "%'"
    }else{
      sql = "select id,name from userInfo where power = '客户' and driver = '" + userInfo.id + "' and name like '%" + _this.data.name + "%'"
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var kehu_list = res.result.recordset
        console.log(kehu_list)
        _this.setData({ 
          kehu_list: kehu_list,
          xlShow:true,
        })
        console.log(kehu_list)
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

  clickView:function(e){
    var _this = this
    var column = e.currentTarget.dataset.column
    if(column == 'username' || column == 'password' || column == 'name'){
      _this.setData({
        id: _this.data.list[e.currentTarget.dataset.index].id,
        username: _this.data.list[e.currentTarget.dataset.index].username, 
        password: _this.data.list[e.currentTarget.dataset.index].password,
        name: _this.data.list[e.currentTarget.dataset.index].name,
        power: _this.data.list[e.currentTarget.dataset.index].power,
        salesman: _this.data.list[e.currentTarget.dataset.index].salesman,
        driver: _this.data.list[e.currentTarget.dataset.index].driver,
        qr_code: _this.data.list[e.currentTarget.dataset.index].qr_code,
        xgShow:true,
      })
    }else if(column == 'salesman' && _this.data.list[e.currentTarget.dataset.index].power == '客户'){
      var list = _this.data.salesman
      _this.setData({
        id: _this.data.list[e.currentTarget.dataset.index].id,
        column:column,
        list_xiala:list,
        xlShow:true,
      })
    }else if(column == 'driver' && _this.data.list[e.currentTarget.dataset.index].power == '客户'){
      var list = _this.data.driver
      _this.setData({
        id: _this.data.list[e.currentTarget.dataset.index].id,
        column:column,
        list_xiala:list,
        xlShow:true,
      })
    }
  },



  select1: function (e){
    var _this = this
    if (e.type == "select") {
      _this.setData({
        name:e.detail.name,
        kehu_id:e.detail.id,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow: false,
      })
    }
  },

  bindPickerChange: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      power:_this.data.qx_list[e.detail.value]
    })
  },
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      username: '', 
      password: '',
      name:'',
      power: '',
      salesman: '',
      driver: '',
      qr_code: '',
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
 
  onInput2: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.name
    console.log(column)
    _this.setData({
      [column]: e.detail.value
    })
  },

  beizhu_click:function(e){
    var _this = this
    var column = e.currentTarget.dataset.column
    var value = e.currentTarget.dataset.value 
    console.log(column)
    console.log(value)
    if(column == 'beizhu1' && _this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '只有管理员账号可以修改备注1！',
        icon: 'none'
      })
      return;
    }
    _this.setData({
      this_column:column,
      this_value:value,
      xgShow3:true
    })
  }, 

  kuang_click:function(e){
    var _this = this
    var column = e.currentTarget.dataset.column
    var index = e.currentTarget.dataset.index
    var value = e.currentTarget.dataset.value
    if(column != 'huikuang'){
      return;
    }
    _this.setData({
      this_index:index,
      this_column:column,
      this_value:value,
      xgShow2:true
    })
  }, 

  upd3:function(){
    var _this = this
    var column = _this.data.this_column
    var value = _this.data.this_value
    console.log(column)
    console.log(value)
    _this.setData({
      [column]:value,
      xgShow3:false,
    })
  },


  upd2:function(){
    var _this = this
    var index = _this.data.this_index
    var column = _this.data.this_column
    var value = _this.data.this_value
    var list = _this.data.huankuang_list
    console.log(index)
    console.log(column)
    console.log(value)
    list[index][column] = value
    _this.setData({
      huankuang_list:list,
      xgShow2:false,
    })
  },

  zhongliang_click:function(e){
    var _this = this
    var index1 = e.currentTarget.dataset.index1
    var index2 = e.currentTarget.dataset.index2
    var value = e.currentTarget.dataset.value
    if(index2 < 2){
      return;
    }
    console.log(index1)
    console.log(index2)
    console.log(value)
    _this.setData({
      this_index1:index1,
      this_index2:index2,
      this_value:value,
      xgShow1:true
    })
  },

  upd1:function(){
    var _this = this
    var index1 = _this.data.this_index1
    var index2 = _this.data.this_index2
    var value = _this.data.this_value
    var value2 = ""
    var list = _this.data.zhongliang_list
    console.log(index1)
    console.log(index2)
    console.log(value)
    list[index1][index2] = value
    _this.setData({
      zhongliang_list:list,
      xgShow1:false,
    })

    if(list[index1].length > index2 + 1){
      index2 = index2 + 1
      value = _this.data.zhongliang_list[index1][index2]
      _this.setData({
        this_index1:index1,
        this_index2:index2,
        this_value:value,
        xgShow1:true
      })
    }
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      customer:"",
      leibie:"",
      area:"",
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    if(_this.data.name == ''){
      wx.showToast({
        title: '未选择客户！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.riqi == ''){
      wx.showToast({
        title: '未选择日期！',
        icon: 'none'
      })
      return;
    }
    var id = _this.data.kehu_id
    var riqi = _this.data.riqi
    _this.setData({
      sel_id:id,
      sel_riqi:riqi,
    })
    var e = [_this.data.sel_id,_this.data.sel_riqi]
    _this.tableShow(e)
    _this.qxShow()
  },

  save:function(){
    var _this = this
    var zhongliang_list = _this.data.zhongliang_list
    var sql1 = ""
    if(_this.data.sel_riqi == '' || _this.data.sel_id == ''){
      wx.showToast({
        title: '请查询后补全信息再点击此按钮！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(zhongliang_list.length > 0){
      for(var i=0; i<zhongliang_list.length; i++){
        var zhong_str = ""
        for(var j=2; j<zhongliang_list[i].length; j++){
          if(zhong_str == ""){
            zhong_str = zhongliang_list[i][j]
          }else{
            zhong_str = zhong_str + "," + zhongliang_list[i][j]
          }
        }
        sql1 = sql1 + "update Detailsoforder set zhongliang_num = '" + zhong_str + "' where id=" + zhongliang_list[i][0] + ";"
      }
      console.log(sql1)
    }


    var huankuang_list = _this.data.huankuang_list
    var sql2 = ""
    if(huankuang_list.length > 0){
      for(var i=0; i<huankuang_list.length; i++){
        sql2 = sql2 + "update Detailsoforder set huikuang ='" + huankuang_list[i].huikuang + "' where id=" + huankuang_list[i].id + ";"
      }
      console.log(sql2)
    }
    var sql3 = ""
    if(_this.data.userInfo.power == "管理员"){
      sql3 = "update beizhu set beizhu = '" + _this.data.beizhu1 + "' where id=1;"
    }
    
    var sql4 = ""
    
    sql4 = "update Detailsoforder set beizhu = '" + _this.data.beizhu2 + "' where Customer_id ='" + _this.data.sel_id + "' and riqi = '" + _this.data.sel_riqi + "';"
    var sql_end = sql1 + sql2 + sql3 + sql4
    console.log(sql_end) 
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql_end
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '保存成功！',
          icon: 'none',
          duration: 3000
        })
        var e = [_this.data.sel_id,_this.data.sel_riqi]
        _this.tableShow(e)
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
