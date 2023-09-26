// package_huaqun/page/ddchakanxiangqing/ddchakanxiangqing.js
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
    list: [],
    listChanPin:[],
    title: [{
      text: "客户姓名",
      width: "250rpx",
      columnName: "name",
      type: "text",
      isupd: true
    },
    {
      text: "单据编号",
      width: "250rpx",
      columnName: "Documentnumber",
      type: "text",
      isupd: true
    },
    {
      text: "日期",
      width: "250rpx",
      columnName: "riqi",
      type: "text",
      isupd: true
    },
    ],
    list2: [],
    ddxh_list_dj:[],
    title2: [{
      text: "产品名称",
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
      text: "重量",
      width: "250rpx",
      columnName: "zhongliang_num",
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
    {
      text: "单位",
      width: "250rpx",
      columnName: "unit",
      type: "text",
      isupd: true
    },
  ],
  
  id:'',
  Customer_id:'',
  Documentnumber:'',
  riqi:'',
  NameofProduct:'',
  unit:'',
  Theunitprice:'',
  number:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var Documentnumber = JSON.parse(options.Documentnumber)
    var userInfo = JSON.parse(options.userInfo)
     _this.setData({
      Documentnumber:Documentnumber,
      userInfo:userInfo
    })
    var sql
    console.log(userInfo)
    if (userInfo.power=='管理员' || userInfo.power=='报货员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"' group by Documentnumber,name,us.id,riqi,Customer_id "
    }else if (userInfo.power=='客户'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"' and us.id = '"+ userInfo.id +"' and us.power='客户' group by Documentnumber,name,us.id,riqi,Customer_id "
    }else if (userInfo.power=='业务员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"' and  us.salesman = '"+ userInfo.id +"' and us.power='客户' group by Documentnumber,name,us.id,riqi,Customer_id"
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
      return;
    }
    console.log(sql)

    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list:list,
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
    
    var sql=''
    console.log(userInfo.power=='管理员')
    if (userInfo.power=='管理员' || userInfo.power=='报货员'){
      sql ="select DC.id,us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number,zhongliang_num,huikuang from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where number != 0 and DC.Documentnumber = '"+ Documentnumber +"'"
    }else if (userInfo.power=='客户'){
      sql ="select DC.id,us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number,zhongliang_num,huikuang from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where number != 0 and DC.Documentnumber = '"+ Documentnumber +"' and us.id = '"+ userInfo.id +"' and us.power='客户'"
    }else if (userInfo.power=='业务员'){
      sql ="select DC.id,us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number,zhongliang_num,huikuang from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where number != 0 and DC.Documentnumber = '"+ Documentnumber +"' and us.salesman = '"+ userInfo.id +"' and us.power='客户'"
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
      return;
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        for(var i=0; i<list.length; i++){
          var zhongliang_sum = 0
          if(list[i].zhongliang_num != ''){
            var arr = list[i].zhongliang_num.split(",")
            for(var j=0; j<arr.length; j++){
              zhongliang_sum = zhongliang_sum + (arr[j] * 1)
            }
          }
          list[i].zhongliang_num = zhongliang_sum
        }
        _this.setData({
          list2:list,
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

    console.log(userInfo.id)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "select DP.id,Thedetail_id,Customer_id,DC.NameofProduct as name,DC.unit,DP.Theunitprice from DetailsofProducts as DP left join DetailedConfiguration as DC on DP.Thedetail_id = DC.id where Customer_id = '"+ userInfo.id +"'"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          listChanPin: list
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

    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "select NameofProduct,unit,Theunitprice from DetailedConfiguration"
        // query:"select DC.NameofProduct,DC.unit,DC.Theunitprice from Detailsoforder as DC  where number != 0 and DC.Documentnumber = '"+ _this.data.Documentnumber +"' and DC.Customer.id ='"+ _this.data.Customer_id +"'"
      },
      success: res => {
        console.log(res)
        var list2=res.result.recordset
        var NameofProduct_xl=[] 
          console.log(list2)
          for (var i = 0;list2.length>i;i++){
            NameofProduct_xl.push(list2[i].NameofProduct)
          }
          _this.setData({
            list22:list2,
            NameofProduct_xl:NameofProduct_xl
          })
          _this.qxShow()
          console.log(NameofProduct_xl)
          console.log(list2)
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

    var sql = "select max(riqi) as riqi from Detailsoforder"
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        var riqi = res.result.recordset[0].riqi
        if(riqi != null){
          _this.setData({
            insert_riqi: riqi
          })
        }
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
    console.log(_this.data.userInfo)
    var Documentnumber = _this.data.Documentnumber
    var sql
    console.log(Documentnumber)
    console.log()
    if (_this.data.userInfo.power=='管理员' || _this.data.userInfo.power=='报货员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"' group by Documentnumber,name,us.id,riqi,Customer_id "
    }else if (_this.data.userInfo.power=='客户'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"' and us.id = '"+ _this.data.userInfo.id +"' and us.power='客户' group by Documentnumber,name,us.id,riqi,Customer_id "
    }else if (_this.data.userInfo.power=='业务员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where DC.Documentnumber = '"+ Documentnumber +"' and  us.salesman = '"+ _this.data.userInfo.id +"' and us.power='客户' group by Documentnumber,name,us.id,riqi,Customer_id"
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
      return;
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list:list,
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
    
    var sql=''
    if (_this.data.userInfo.power=='管理员' || _this.data.userInfo.power=='报货员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where number != 0 and DC.Documentnumber = '"+ Documentnumber +"'"
    }else if (_this.data.userInfo.power=='客户'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where number != 0 and DC.Documentnumber = '"+ Documentnumber +"' and us.id = '"+ _this.data.userInfo.id +"' and us.power='客户'"
    }else if (_this.data.userInfo.power=='业务员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,DC.NameofProduct,DC.unit,DC.Theunitprice,DC.number from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where number != 0 and DC.Documentnumber = '"+ Documentnumber +"' and us.salesman = '"+ _this.data.userInfo.id +"' and us.power='客户'"
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
      return;
    }
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list2:list,
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
  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  clickView1:function(e){
    var _this = this
    var this_row = e.currentTarget.dataset.index
    console.log(_this.data.list2[e.currentTarget.dataset.index].Documentnumber)
    console.log(_this.data.list[0].riqi)
    if (_this.data.userInfo.power=='管理员' || (_this.data.userInfo.power=='报货员' && _this.data.list[0].riqi == _this.data.insert_riqi)){
      _this.setData({
        id: _this.data.list2[e.currentTarget.dataset.index].id,
        Customer_id: _this.data.list2[e.currentTarget.dataset.index].Customer_id, 
        Documentnumber: _this.data.list2[e.currentTarget.dataset.index].Documentnumber,
        riqi: _this.data.list2[e.currentTarget.dataset.index].riqi,
        NameofProduct: _this.data.list2[e.currentTarget.dataset.index].NameofProduct, 
        unit: _this.data.list2[e.currentTarget.dataset.index].unit,
        Theunitprice: _this.data.list2[e.currentTarget.dataset.index].Theunitprice,
        number: _this.data.list2[e.currentTarget.dataset.index].number,
        xgShow:true,
      })
    }else{
      wx.showToast({
        title: '非管理员只允许修改当日订单！',
        icon: 'none'
      })
    }
  },

  bindPickerChange: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为',e.detail.value)
    var i = e.detail.value
    console.log(i)
    
    _this.setData({
      NameofProduct:_this.data.NameofProduct_xl[e.detail.value],
      unit:_this.data.list22[i].unit,
      Theunitprice:_this.data.list22[i].Theunitprice,
    })
  },



  inquire: function () {
    var _this = this
    if (_this.data.userInfo.power=='管理员' || (_this.data.userInfo.power=='报货员' && _this.data.list[0].riqi == _this.data.insert_riqi)){
      _this.setData({
        tjShow: true,
        id:'',
        NameofProduct: '', 
        unit: '',
        Theunitprice :'',
        number :'',
      })
    }else{
      wx.showToast({
        title: '非管理员只允许修改当日订单！',
        icon: 'none'
      })
    }

  },
  add1: function(){
    var _this = this
    console.log(_this.data.list[0].riqi)
    console.log(_this.data)
    if(_this.data.NameofProduct == ''){
      wx.showToast({
        title: '请输产品名称！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.unit == ''){
      wx.showToast({
        title: '请输单位！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.Theunitprice == ''){
      wx.showToast({
        title: '请输单价！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.number == ''){
      wx.showToast({
        title: '请输数量！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var sql
    sql ="select * from Detailsoforder  where NameofProduct = '"+ _this.data.NameofProduct +"' and  Documentnumber = '"+ _this.data.Documentnumber +"'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: sql
      },
      success: res => {
        var sql
        if (_this.data.userInfo.power=='管理员' || _this.data.userInfo.power=='报货员'){
          sql ="update  Detailsoforder set Theunitprice= '" + _this.data.Theunitprice + "',number='" + _this.data.number + "'where NameofProduct = '"+ _this.data.NameofProduct +"' and  Documentnumber = '"+ _this.data.Documentnumber +"'"
        }else{
          wx.showToast({
            title: '无权限！',
            icon: 'none'
          })
          return;
        }
        console.log(sql)
        wx.cloud.callFunction({
          name: 'sqlserver_yiwa',
          data: {
            query: sql
          },
          success: res => {
            _this.setData({
              
              NameofProduct:'',
              unit:'',
              Theunitprice:'',
              number:'',
            })
            _this.qxShow()
            _this.tableShow()
            wx.showToast({
              title: '添加成功！',
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
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        var sql
        if (_this.data.userInfo.power=='管理员' || _this.data.userInfo.power=='报货员'){
          sql ="insert into Detailsoforder(Customer_id,Documentnumber,riqi,NameofProduct,unit,Theunitprice,number) values('" + _this.data.list[0].Customer_id + "','" + _this.data.Documentnumber + "','" + _this.data.list[0].riqi + "','" + _this.data.NameofProduct + "','" + _this.data.unit + "','" + _this.data.Theunitprice + "','" + _this.data.number + "')"
        }else{
          wx.showToast({
            title: '无权限！',
            icon: 'none'
          })
          return;
        }
        wx.cloud.callFunction({
          name: 'sqlserver_yiwa',
          data: {
            query: sql
          },
          success: res => {
            _this.setData({
              
              NameofProduct:'',
              unit:'',
              Theunitprice:'',
              number:'',
            })
            _this.qxShow()
            _this.tableShow()
            wx.showToast({
              title: '添加成功！',
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
      }
    })

    
  },


  onInput_text: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    console.log(e.detail.value)
    console.log(column) 
    _this.setData({
      [column]: e.detail.value
    })
  },

  

  upd1:function(e){
    var _this = this
    var i =e.currentTarget.dataset.index
    console.log(_this.data.number)
    var sql
    if (_this.data.userInfo.power=='管理员' || _this.data.userInfo.power=='报货员'){
      wx.showModal({
        title: '提示',
        content: '是否修改？',
        success (res) {
         if (res.confirm) {
           console.log(_this.data.id)
            sql="update Detailsoforder set NameofProduct ='" + _this.data.NameofProduct + "' ,unit ='" + _this.data.unit + "' ,Theunitprice ='" + _this.data.Theunitprice + "',number ='" + _this.data.number + "' where id='"+ _this.data.id +"'"
            console.log(sql)
            wx.cloud.callFunction({
              name: 'sqlserver_yiwa',
              data: {
                query: sql
              },
              success: res => {
                _this.setData({
                  id:'',
                  Customer_id:'',
                  riqi:'',
                  NameofProduct:'',
                  unit:'',
                  Theunitprice:'',
                  number:'',
                })
                _this.qxShow()
                _this.tableShow()
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
          }
        }
      })
     }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
    }
  },

  del1:function(e){
    var _this = this
    var i = e.currentTarget.dataset.index
    console.log(_this.data.this_index)
    console.log(_this.data.list2[i].id)
    var sql
    if (_this.data.userInfo.power=='管理员' || (_this.data.userInfo.power=='报货员' && _this.data.list[0].riqi == _this.data.insert_riqi)){
      wx.showModal({
        title: '提示',
        content: '是否删除？',
        success (res) {
         if (res.confirm) {
            sql="delete from Detailsoforder where id='"+ _this.data.list2[i].id +"'"
            console.log(sql)
            wx.cloud.callFunction({
              name: 'sqlserver_yiwa',
              data: {
                query: sql
              },
              success: res => {
                _this.setData({
                  id:'',
                  Customer_id:'',
                  riqi:'',
                  NameofProduct:'',
                  unit:'',
                  Theunitprice:'',
                  number:'',
                })
                _this.qxShow()
                _this.tableShow()
                wx.showToast({
                  title: '删除成功！',
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
          }
        }
      })
     }else{
      wx.showToast({
        title: '非管理员只允许修改当日订单！',
        icon: 'none'
      })
    }
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
    var e = [_this.data.khmc,_this.data.ddh]
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
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }
