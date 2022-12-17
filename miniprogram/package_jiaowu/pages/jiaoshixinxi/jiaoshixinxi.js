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
        columnName: "t_name",
        type: "text",
        isupd: true
      },
      {
        text: "性别",
        width: "200rpx",
        columnName: "sex",
        type: "text",
        isupd: true
      },
      {
        text: "身份证号码",
        width: "200rpx",
        columnName: "id_code",
        type: "text",
        isupd: true
      },
      {
        text: "民族",
        width: "200rpx",
        columnName: "minzu",
        type: "text",
        isupd: true
      },
      {
        text: "生日",
        width: "200rpx",
        columnName: "birthday",
        type: "text",
        isupd: true
      },
      {
        text: "职位",
        width: "200rpx",
        columnName: "post",
        type: "text",
        isupd: true
      },
      {
        text: "学历",
        width: "200rpx",
        columnName: "education",
        type: "text",
        isupd: true
      },
      {
        text: "联系电话",
        width: "200rpx",
        columnName: "phone",
        type: "text",
        isupd: true
      },
      {
        text: "入职日期",
        width: "200rpx",
        columnName: "rz_riqi",
        type: "text",
        isupd: true
      },
      {
        text: "在职状态",
        width: "200rpx",
        columnName: "state",
        type: "text",
        isupd: true
      },
      {
        text: "社保情况",
        width: "200rpx",
        columnName: "shebao",
        type: "text",
        isupd: true
      },
      {
        text: "地址",
        width: "200rpx",
        columnName: "address",
        type: "text",
        isupd: true
      },
    ],
    jsxm: "",
    xb: "",
    sfzhm: "",
    mz: "",
    sr: "",
    zw: "",
    xl: "",
    lxdh: "",
    rzrq: "",
    zzzt: "",
    sbqk: "",
    dz: "",
    // 新增代码
    isdis: '',
    isdischa: '',
    isdisgai: '',
    isdisshan: '',
    xingbie_list:['男','女'],
    minDate: new Date(1900, 1, 1).getTime(),
    maxDate: new Date(2100, 12, 31).getTime(),
    currentDate: new Date().getTime(),
    state_list:['在职','离职']
  },

  bindPickerChange4: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var xb = _this.data.xingbie_list[e.detail.value]
    console.log(xb)
    _this.setData({
      xb: xb,
    })
  },


  bindPickerChange5: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      zzzt: _this.data.state_list[e.detail.value]
    })
  },

  bindPickerChange6: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      jsxm: _this.data.t_name_list[e.detail.value]
    })
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
        sql: "select * from teacherinfo where company ='"+user+"' and t_name like '%" + e[0] + "%'"
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
        sql: "select teacher from shezhi where Company = '" + userInfo.Company + "'"
      },
      success: res => {
        var list = res.result
        console.log(list[0].teacher)
        var teacker = [] 
        for(var i=0; i<list.length; i++){
          if(list[i].teacher != '' && list[i].teacher != null && list[i].teacher != undefined){
            teacker.push(list[i].teacher)
            console.log(list[i].teacher)
          }
        }
        _this.setData({
          t_name_list:teacker,
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

    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select * from power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='教师信息'"
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
          var e = ['']
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
    if(_this.data.quanxian_zeng != '√'){
      wx.showToast({
        title: '无新增权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      tjShow: true,
      jsxm: "",
      xb: "",
      sfzhm: "",
      mz: "",
      sr: "",
      zw: "",
      xl: "",
      lxdh: "",
      rzrq: "",
      zzzt: "",
      sbqk: "",
      dz: "",
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime(),
      jsxm: "",
      xb: "",
      sfzhm: "",
      mz: "",
      sr: "",
      zw: "",
      xl: "",
      lxdh: "",
      rzrq: "",
      zzzt: "",
      sbqk: "",
      dz: "",
    })
  },

  add1: function () {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log(_this.data.jsxm)
    console.log(_this.data.xb)
    console.log(_this.data.sfzhm)
    console.log(_this.data.mz)
    console.log(_this.data.sr)
    console.log(_this.data.zw)
    console.log(_this.data.xl)
    console.log(_this.data.lxdh)
    console.log(_this.data.rzrq)
    console.log(_this.data.zzzt)
    console.log(_this.data.sbqk)
    console.log(_this.data.dz)
    if (_this.data.jsxm != "") {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "insert into teacherinfo(t_name,sex,id_code,minzu,birthday,post,education,phone,rz_riqi,state,shebao,address,company) values('" + _this.data.jsxm + "','" + _this.data.xb + "','" + _this.data.sfzhm + "','" + _this.data.mz + "','" + _this.data.sr + "','" + _this.data.zw + "','" + _this.data.xl + "','" + _this.data.lxdh + "','" + _this.data.rzrq + "','" + _this.data.zzzt + "','" + _this.data.sbqk + "','" + _this.data.dz +  "','"+user+"')"
        },
        success: res => {
          _this.setData({
            jsxm: "",
            xb: "",
            sfzhm: "",
            mz: "",
            sr: "",
            zw: "",
            xl: "",
            lxdh: "",
            rzrq: "",
            zzzt: "",
            sbqk: "",
            dz: "",
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
    } else {
      wx.showToast({
        title: '信息输入不全！',
        icon: 'none'
      })
    }
  },

  clickView:function(e){
    var _this = this
    if(_this.data.quanxian_gai != '√'){
      wx.showToast({
        title: '无修改权限！',
        icon: 'none'
      })
      return;
    }
    _this.setData({
      jsxm: _this.data.list[e.currentTarget.dataset.index].t_name, 
      xb: _this.data.list[e.currentTarget.dataset.index].sex,
      sfzhm: _this.data.list[e.currentTarget.dataset.index].id_code,
      mz: _this.data.list[e.currentTarget.dataset.index].minzu,
      sr: _this.data.list[e.currentTarget.dataset.index].birthday,
      zw: _this.data.list[e.currentTarget.dataset.index].post,
      xl: _this.data.list[e.currentTarget.dataset.index].education, 
      lxdh: _this.data.list[e.currentTarget.dataset.index].phone,
      rzrq: _this.data.list[e.currentTarget.dataset.index].rz_riqi,
      zzzt: _this.data.list[e.currentTarget.dataset.index].state,
      sbqk: _this.data.list[e.currentTarget.dataset.index].shebao,
      dz: _this.data.list[e.currentTarget.dataset.index].address,
      
      id: _this.data.list[e.currentTarget.dataset.index].id,
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    let user = _this.data.userInfo.Company;
    if (_this.data.t_name != "" ) {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "update teacherinfo set t_name='" + _this.data.jsxm + "',sex='" + _this.data.xb + "',id_code='" + _this.data.sfzhm + "',minzu='" + _this.data.mz + "',birthday='" + _this.data.sr + "',post='" + _this.data.zw + "',education='" + _this.data.xl + "',phone='" + _this.data.lxdh + "',rz_riqi='" + _this.data.rzrq + "',state='" + _this.data.zzzt + "',shebao='" + _this.data.sbqk + "',address='" + _this.data.dz + "' where id='" + _this.data.id +"'"
        },
        success: res => {
          _this.setData({
            jsxm: "",
            xb: "",
            sfzhm: "",
            mz: "",
            sr: "",
            zw: "",
            xl: "",
            lxdh: "",
            rzrq: "",
            zzzt: "",
            sbqk: "",
            dz: "",
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
    } else {
      wx.showToast({
        title: '信息输入不全！',
        icon: 'none'
      })
    }
  },

  del1:function(){
    var _this = this

    if(_this.data.quanxian_shan != '√'){
      wx.showToast({
        title: '无删除权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "delete from teacherinfo where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            jsxm: "",
            xb: "",
            sfzhm: "",
            mz: "",
            sr: "",
            zw: "",
            xl: "",
            lxdh: "",
            rzrq: "",
            zzzt: "",
            sbqk: "",
            dz: "",
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
      jsxm:"",
      
    })
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
    var e = [_this.data.jsxm]
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