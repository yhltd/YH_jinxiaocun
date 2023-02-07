// packageP/page/PaiChanHeDui/PaiChanHeDui.js
const app = getApp();
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
        text: "教师姓名",
        width: "200rpx",
        columnName: "teacher_name",
        type: "text",
        isupd: true
      },
      {
        text: "课程名称",
        width: "200rpx",
        columnName: "course",
        type: "text",
        isupd: true
      },
      {
        text: "上课课时",
        width: "200rpx",
        columnName: "keshi",
        type: "text",
        isupd: true
      },
      {
        text: "每节金额",
        width: "200rpx",
        columnName: "jine",
        type: "text",
        isupd: true
      },
      {
        text: "工资核算",
        width: "200rpx",
        columnName: "gongzihesuan",
        type: "text",
        isupd: true
      },
    ],
    rq: "",
    xsxm: "",
    pxks: "",
    ks: "",
    zrjs: "",
    mjksje: "",
    riqi1:"",
    riqi2:"",
    // 新增代码
    isdis: '',
    isdischa: '',
    isdisgai: '',
    isdisshan: '',
    minDate: new Date(1900, 1, 1).getTime(),
    maxDate: new Date(2100, 12, 31).getTime(),
    currentDate: new Date().getTime(),
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  tableShow: function (e) {
    var _this = this
    let user = _this.data.userInfo.Company;
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select teacher_name,course,keshi,jine,keshi*jine as gongzihesuan from keshi_detail where riqi >= '" + e[0] + "' and riqi <= '" + e[1] + "' and teacher_name like '%" + e[2] + "%' and Company='"+user+"'"
      },
      success: res => {
        console.log(res.result)
        var list = res.result
        
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo
    })

    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select * from power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='教师工资'"
      },
      success: res => {
        console.log(res.result)
        var list = res.result
        var zeng = 0
        var shan = 0
        var gai = 0
        var cha = 0
        if(list.length > 0){
          zeng = list[0].add
          shan = list[0].del
          gai = list[0].upd
          cha = list[0].sel
        }
        _this.setData({
          quanxian_zeng:zeng,
          quanxian_shan:shan,
          quanxian_gai:gai,
          quanxian_cha:cha,
        })
        if(cha == '√'){
          var e = ['1999-01-01','2222-01-01','']
          _this.tableShow(e)
        }else{
          wx.showToast({
            title: '无查询权限！',
            icon: 'none',
            duration: 3000
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

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  onInput2: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    var riqi = Y + M + D
    console.log(riqi)
    _this.setData({
      rq: riqi,
    })
    _this.qxShow2()
    console.log(_this.data.rq)
  },
  qxShow2: function () {
    var _this = this
    _this.setData({
      rqxzShow1: false,
    })
  },

  selRIQI1: function () {
    var _this = this
    _this.setData({
      rqxzShow1: true,
    })
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      rq: "",
      xsxm: "",
      pxks: "",
      ks: "",
      zrjs: "",
      mjksje: "",
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime(),
      rq: "",
      xsxm: "",
      pxks: "",
      ks: "",
      zrjs: "",
      mjksje: "",
      riqi1:"",
      riqi2:"",
      t_name:"",
    })
  },

  add1: function () {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log(_this.data.rq)
    console.log(_this.data.xsxm)
    console.log(_this.data.pxks)
    console.log(_this.data.ks)
    console.log(_this.data.zrjs)
    console.log(_this.data.mjksje)
    if (_this.data.xsxm != "" && _this.data.zrjs != "" && _this.data.ks != "") {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "insert into keshi_detail(riqi,student_name,course,keshi,teacher_name,jine,Company) values('" + _this.data.rq + "','" + _this.data.xsxm + "','" + _this.data.pxks + "','" + _this.data.ks + "','" + _this.data.zrjs + "','" + _this.data.mjksje +  "','"+user+"')"
        },
        success: res => {
          _this.setData({
            rq: "",
            xsxm: "",
            pxks: "",
            ks: "",
            zrjs: "",
            mjksje: "",
          })
          _this.qxShow()
          var e = ['1999-01-01','2222-01-01',_this.data.t_name]
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
    } else {
      wx.showToast({
        title: '信息输入不全！',
        icon: 'none'
      })
    }
  },

  clickView:function(e){
    var _this = this
    _this.setData({
      rq: _this.data.list[e.currentTarget.dataset.index].riqi, 
      xsxm: _this.data.list[e.currentTarget.dataset.index].student_name,
      pxks: _this.data.list[e.currentTarget.dataset.index].course,
      ks: _this.data.list[e.currentTarget.dataset.index].keshi,
      zrjs: _this.data.list[e.currentTarget.dataset.index].teacher_name,
      mjksje: _this.data.list[e.currentTarget.dataset.index].jine,
      id: _this.data.list[e.currentTarget.dataset.index].id,
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    let user = _this.data.userInfo.Company;
    if (_this.data.xsxm != "" && _this.data.zrjs != "" && _this.data.ks != "") {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "update keshi_detail set riqi='" + _this.data.rq + "',student_name='" + _this.data.xsxm + "',course='" + _this.data.pxks + "',keshi='" + _this.data.ks + "',teacher_name='" + _this.data.zrjs + "',jine='" + _this.data.mjksje + "' where id='" + _this.data.id +"'"
        },
        success: res => {
          _this.setData({
            rq: "",
            xsxm: "",
            pxks: "",
            ks: "",
            zrjs: "",
            mjksje: "",
          })
          _this.qxShow()
          var e = ['1999-01-01','2222-01-01',_this.data.t_name]
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
    } else {
      wx.showToast({
        title: '信息输入不全！',
        icon: 'none'
      })
    }
  },

  del1:function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "delete from keshi_detail where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            rq: "",
            xsxm: "",
            pxks: "",
            ks: "",
            zrjs: "",
            mjksje: "",
          })
          _this.qxShow()
          var e = ['1999-01-01','2222-01-01',_this.data.t_name]
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

    if(_this.data.quanxian_cha != '√'){
      wx.showToast({
        title: '无查询权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    _this.setData({
      cxShow:true,
      rq:"",
      
    })
  },

  sel1:function(){
    var _this = this
    if(_this.data.riqi1=='' || _this.data.riqi1=='undefined'){
      _this.setData({
        riqi1:'1900-01-01'
      })
    }
    if(_this.data.riqi2=='' || _this.data.riqi1=='undefined'){
      _this.setData({
        riqi2:'2100-12-31'
      })
    }
    var e = [_this.data.riqi1,_this.data.riqi2,_this.data.t_name]
    console.log(_this.data)
    console.log(_this.data.riqi2)
    console.log(_this.data.t_name)
    _this.tableShow(e)
    _this.qxShow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})