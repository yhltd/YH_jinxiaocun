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
    list: [],
    title: [{
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
      
    ],
    xiala_list:['是','否'],
    id:'',
    NameofProduct: '', 
    unit: '',
    Theunitprice:'',
    zhongliang:'',
    kuang:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "select * from DetailedConfiguration"
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
   
  },



  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "select * from DetailedConfiguration where NameofProduct like '%" + e[0] + "%' "
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
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
      id: _this.data.list[e.currentTarget.dataset.index].id,
      NameofProduct: _this.data.list[e.currentTarget.dataset.index].NameofProduct, 
      unit: _this.data.list[e.currentTarget.dataset.index].unit,
      Theunitprice: _this.data.list[e.currentTarget.dataset.index].Theunitprice,
      zhongliang:_this.data.list[e.currentTarget.dataset.index].zhongliang,
      kuang:_this.data.list[e.currentTarget.dataset.index].kuang,
      xgShow:true,
    })
  },

  bindPickerChange: function(e){
    var _this = this
    var column = e.currentTarget.dataset.column
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      [column]:_this.data.xiala_list[e.detail.value]
    })
  },
  
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      NameofProduct:'',
      unit:'',
      Theunitprice:'',
      zhongliang:'',
      kuang:'',
    })
  },
  add1: function(){
    var _this = this
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
      wx.cloud.callFunction({
        name: 'sqlserver_yiwa',
        data: {
          query: "insert into DetailedConfiguration(NameofProduct,unit,Theunitprice,zhongliang,kuang)output inserted.id values('" + _this.data.NameofProduct + "','" + _this.data.unit + "','" + _this.data.Theunitprice + "','" + _this.data.zhongliang + "','" + _this.data.kuang + "')"
        },
        success: res => {
          console.log(res)
          var product_id = res.result.recordset[0].id
          var sql = "select * from userinfo where power = '客户'"
          console.log(sql)
          wx.cloud.callFunction({
            name: 'sqlserver_yiwa',
            data: {
              query: sql
            },
            success: res => {
              var user_list = res.result.recordset
              var sql = "insert into DetailsofProducts(Thedetail_id,Customer_id,NameofProduct,unit,Theunitprice,zhongliang,kuang) values "
              var sql_foot = ""
              for(var i=0; i<user_list.length; i++){
                if(sql_foot == ""){
                  sql_foot = "('" + product_id + "','" + user_list[i].id + "','" + _this.data.NameofProduct + "','" + _this.data.unit + "','" + _this.data.Theunitprice + "','" + _this.data.zhongliang + "','" + _this.data.kuang + "')"
                }else{
                  sql_foot = sql_foot + ",('" + product_id + "','" + user_list[i].id + "','" + _this.data.NameofProduct + "','" + _this.data.unit + "','" + _this.data.Theunitprice + "','" + _this.data.zhongliang + "','" + _this.data.kuang + "')"
                }
              }
              sql = sql + sql_foot
              console.log(sql)
              wx.cloud.callFunction({
                name: 'sqlserver_yiwa',
                data: {
                  query: sql
                },
                success: res => {
                  _this.setData({
                      id:'',
                      NameofProduct:'',
                      unit:'',
                      Theunitprice:'',
                      zhongliang:'',
                      kuang:'',
                  })
                  _this.qxShow()
                  var e = ['']
                   _this.tableShow(e)
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
              wx.showToast({
                title: '请求失败！',
                icon: 'none'
              })
              console.log("请求失败！")
            }
          })
          _this.qxShow()
          var e = ['']
          _this.tableShow(e)
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

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  upd1:function(){
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "update DetailedConfiguration set NameofProduct='" + _this.data.NameofProduct + "',unit='" + _this.data.unit + "',Theunitprice='" + _this.data.Theunitprice + "',zhongliang='" + _this.data.zhongliang + "',kuang='" + _this.data.kuang + "' where id=" + _this.data.id
      },
      success: res => {
        _this.setData({
            id:'',
            NameofProduct:'',
            unit:'',
            Theunitprice:'',
            zhongliang:'',
            kuang:'',
        })
        _this.qxShow()
        var e = ['']
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

    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data: {
        query: "update DetailsofProducts set NameofProduct='" + _this.data.NameofProduct + "',unit='" + _this.data.unit + "',zhongliang='" + _this.data.zhongliang + "',kuang='" + _this.data.kuang + "' where Thedetail_id=" + _this.data.id
      },
      success: res => {
        _this.setData({
            id:'',
            NameofProduct:'',
            unit:'',
            Theunitprice:'',
            zhongliang:'',
            kuang:'',
        })
        _this.qxShow()
        var e = ['']
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

  del1:function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlserver_yiwa',
        data: {
          query: "delete from DetailedConfiguration where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            NameofProduct:'',
            unit:'',
            Theunitprice:'',
            zhongliang:'',
            kuang:'',
          })
          _this.qxShow()
          var e = ['']
          _this.tableShow(e)
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

      wx.cloud.callFunction({
        name: 'sqlserver_yiwa',
        data: {
          query: "delete from DetailsofProducts where Thedetail_id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            NameofProduct:'',
            unit:'',
            Theunitprice:'',
            zhongliang:'',
            kuang:'',
          })
          _this.qxShow()
          var e = ['']
          _this.tableShow(e)
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
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      NameofProduct:'',
      unit:'',
      Theunitprice:'',
      zhongliang:'',
      kuang:'',
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
    var e = [_this.data.NameofProduct]
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
