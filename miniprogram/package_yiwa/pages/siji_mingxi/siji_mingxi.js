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
    title: [{
        text: "日期",
        width: "250rpx",
        columnName: "riqi",
        type: "text",
        isupd: true
      },
      {
        text: "司机",
        width: "250rpx",
        columnName: "driver_id",
        type: "text",
        isupd: true
      },
      {
        text: "录入人",
        width: "250rpx",
        columnName: "maker",
        type: "text",
        isupd: true
      },
     
    ],
    
    id:'',
    riqi: '', 
    password: '',
    customer_id:'',
    driver_id: '',
    maker: '',
    
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
    var _this = this
    var e = ['1999-01-01','2222-01-01','','']
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    var sql
    console.log(_this.data.userInfo.power=='管理员')
    if (_this.data.userInfo.power=='管理员'){
      sql ="select do.id,do.riqi,do.customer_id,isnull(us.name,'') as maker ,isnull(uss.name,'') as driver_id from driver_order as do LEFT JOIN (select * from userInfo) as us on do.maker=us.id LEFT JOIN (select * from userInfo) as uss on driver_id=uss.id where do.riqi between '"+ e[0] +"' and '"+ e[1] +"' and isnull(uss.name,'') like '%"+ e[2] +"%' and us.name like '%"+ e[3] +"%'"
    }else if (_this.data.userInfo.power=='司机'){
      sql ="select do.id,do.riqi,do.customer_id,isnull(us.name,'') as maker ,isnull(uss.name,'') as driver_id from driver_order as do LEFT JOIN (select * from userInfo) as us on do.maker=us.id LEFT JOIN (select * from userInfo) as uss on driver_id=uss.id where uss.power='司机' and do.riqi between '"+ e[0] +"' and '"+ e[1] +"'and isnull(uss.name,'') like '%"+ e[2] +"%' and us.name like '%"+ e[3] +"%'"
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
    var column = e.currentTarget.dataset.column
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      riqi: _this.data.list[e.currentTarget.dataset.index].riqi, 
      customer_id: _this.data.list[e.currentTarget.dataset.index].customer_id,
      driver_id: _this.data.list[e.currentTarget.dataset.index].driver_id,
      maker: _this.data.list[e.currentTarget.dataset.index].maker,
      xgShow:true,
    })
      
    
    var i=e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '是否查看此条详情？',
      success (res) {
        var aa = _this.data.list[i]
       if (res.confirm) {
          wx.navigateTo({
            url: "../siji_huizong/siji_huizong?aa="+JSON.stringify(aa)+ "&userInfo="+JSON.stringify(_this.data.userInfo)
          }) 
      } else if (res.cancel) {

      }
      }
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
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  

  del1:function(e){
    var _this = this
    let power = _this.data.userInfo.power;
    var i = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var Documentnumber = _this.data.list[e.currentTarget.dataset.index].Documentnumber
    console.log(_this.data.list[i].id)
    var sql
    if (power=='管理员' ){
      sql ="delete from driver_order where id='"+ _this.data.list[i].id +"'"
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
                username: '', 
                password: '',
                name:'',
                power: '',
                salesman: '',
                driver: '',
                qr_code: '',
              })
              _this.qxShow()
              var e = ['1900-01-01', '2100-12-31','','']
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
      riqi1:"",
      riqi2:"",
      driver_id:"",
      maker:"",
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
    var e = [_this.data.riqi1,_this.data.riqi2,_this.data.driver_id,_this.data.maker]
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
