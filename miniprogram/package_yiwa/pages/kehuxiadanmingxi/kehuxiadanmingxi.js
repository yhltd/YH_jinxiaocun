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
  xlShow:false,
  data: {
    list: [],
    list_xiala:[
      {name:'正常'},
      {name:'不发货'},
    ],
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
      {
        text: "状态",
        width: "250rpx",
        columnName: "zhuangtai",
        type: "text",
        isupd: true
      },
    ],
   
    id:'',
    uid:'',
    name:'',
    Customer_id:'',
    Documentnumber: '', 
    riqi: '',
    riqi1: '',
    riqi2: '',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo,
    })
    console.log(userInfo)

    var e = ['','1900-01-01', '2100-12-31']
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    let power = _this.data.userInfo.power;
    let id = _this.data.userInfo.id;
    var sql
    if (power=='管理员' || power == '报货员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,zhuangtai from Detailsoforder as DC left join (select id,name,power from userInfo) as us on us.id = DC.Customer_id where us.name like '%" + e[0] + "%' and  DC.riqi between '" + e[1] + "' and '" + e[2] + "' group by Documentnumber,name,us.id,riqi,Customer_id,zhuangtai "
    }else if (power=='客户'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,zhuangtai from Detailsoforder as DC left join (select id,name,power from userInfo) as us on us.id = DC.Customer_id where us.name like '%" + e[0] + "%' and DC.Customer_id='"+ id +"' and  DC.riqi between '" + e[1] + "' and '" + e[2] + "' group by Documentnumber,name,us.id,riqi,Customer_id,zhuangtai"
    }else if (power=='业务员'){
      sql ="select us.id as uid,us.name,DC.Customer_id,DC.Documentnumber,DC.riqi,zhuangtai from Detailsoforder as DC left join (select id,name,power,salesman from userInfo) as us on us.id = DC.Customer_id where us.name like '%" + e[0] + "%'  and us.salesman = '"+ id +"' and us.power='客户' and  DC.riqi between '" + e[1] + "' and '" + e[2] + "' group by Documentnumber,name,us.id,riqi,Customer_id,zhuangtai"
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
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list
        })
        console.log(list)
        _this.qxShow()
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
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var Documentnumber = _this.data.list[e.currentTarget.dataset.index].Documentnumber
    console.log(Documentnumber)

    if(column == 'zhuangtai'){
      if(_this.data.userInfo.power != '管理员' && _this.data.userInfo.power != '报货员'){
        wx.showToast({
          title: '非管理员或报货员无权限设置！',
          icon: 'none',
          duration: 3000
        })
        return;
      }
      _this.setData({
        id: _this.data.list[e.currentTarget.dataset.index].Documentnumber,
        xlShow:true,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '是否查看订单详情？',
        success (res) {
         if (res.confirm) {
            wx.navigateTo({
              url: "../xiadanmingxichakan/xiadanmingxichakan?Documentnumber="+JSON.stringify(Documentnumber)+ "&userInfo="+JSON.stringify(_this.data.userInfo)
            })
          } else if (res.cancel) {
  
          }
        }
      })
    }
  },

  select1: function (e){
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var sql = "update Detailsoforder set zhuangtai='" + new_val + "' where Documentnumber=" + _this.data.id
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlserver_yiwa',
        data: {
          query: sql
        },
        success: res => {
          var e = ['','1900-01-01', '2100-12-31']
          _this.tableShow(e)
          wx.showToast({
            title: '修改成功！',
            icon: 'none',
            duration: 3000
          })
          _this.setData({
            xlShow: false,
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
    } else if (e.type == "close") {
      _this.setData({
        xlShow: false,
      })
    }
  },
  
  
  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      uid:'',
      name:'',
      Customer_id:'',
      Documentnumber: '', 
      riqi: '',
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

  del1:function(e){
    var _this = this
    let power = _this.data.userInfo.power;
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var Documentnumber = _this.data.list[e.currentTarget.dataset.index].Documentnumber
    console.log(Documentnumber)
    var sql
    if (power=='管理员'){
      sql ="delete from Detailsoforder where Documentnumber='"+ Documentnumber +"'"
    }else{
      wx.showToast({
        title: '无权限！',
        icon: 'none'
      })
      return;
    }
    console.log(sql)
    wx.showModal({
      title: '提示',
      content: '确认删除此条订单？',
      success (res) {
       if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlserver_yiwa',
            data: {
              query: sql
            },
            success: res => {
              _this.setData({
                id:'',
                uid:'',
                name:'',
                Customer_id:'',
                Documentnumber: '', 
                riqi: '',
              })
              _this.qxShow()
              var e = ['','1900-01-01', '2100-12-31']
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
        } else if (res.cancel) {

        }
      }
    })
  },
  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      name:"",
      riqi1:"",
      riqi2:"",
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
    if(_this.data.riqi1==''){
      _this.setData({
        riqi1:'1900-01-01'
      })
    }
    if(_this.data.riqi2==''){
      _this.setData({
        riqi2:'2100-12-31'
      })
    }
    var e = [_this.data.name,_this.data.riqi1,_this.data.riqi2]
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
