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
      text: "姓名",
      width: "200rpx",
      columnName: "s_name",
      type: "text",
      isupd: true
    },
    {
      text: "页面名称",
      width: "200rpx",
      columnName: "view_name",
      type: "text",
      isupd: true
    },
    {
      text: "增",
      width: "200rpx",
      columnName: "add",
      type: "text",
      isupd: true
    },
    {
      text: "删",
      width: "200rpx",
      columnName: "del",
      type: "text",
      isupd: true
    },
    {
      text: "改",
      width: "200rpx",
      columnName: "upd",
      type: "text",
      isupd: true
    },
    {
      text: "查",
      width: "200rpx",
      columnName: "sel",
      type: "text",
      isupd: true
    },
    
    ],
    view_list:['学生信息','教师信息','权限管理','用户管理','缴费记录','课时统计','收支明细','欠费学员','教师工资','教师课时统计','考勤表','教师课表','设置'],
    view_list1:['√',' '],
    view_list2:['√',' '],
    view_list3:['√',' '],
    view_list4:['√',' '],
    xm: "",
    ymmc: "",
    zeng: "",
    shan: "",
    gai: "",
    cha:"",
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
    let namee = _this.data.userInfo;
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select p.id,t_id,view_name,`add`,del,upd,sel,RealName as s_name from power as p left join teacher as t on p.t_id=t.ID  where p.company ='"+user+"'"
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
    // let user = _this.data.userInfo.Company;
    var userInfo = JSON.parse(options.userInfo)
    
    _this.setData({
      userInfo:userInfo
    })

    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select * from power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='权限管理'"
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
    
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select ID,RealName from teacher"
      },
      success: res => {
        console.log(res.result)
        var name_list = res.result
        var name=[]
        for (var i = 0; i < name_list.length; i++) {
          name.push(name_list[i].RealName)
        }
        _this.setData({
          name_list:name_list,
          name:name
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
      xm: "",
      ymmc: "",
      zeng: "",
      shan: "",
      gai: "",
      cha:"",
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime(),
      xm: "",
      ymmc: "",
      zeng: "",
      shan: "",
      gai: "",
      cha:"",
    })
  },

  add1: function () {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log(_this.data.t_id)
    console.log(_this.data.xm)
    console.log(_this.data.ymmc)
    console.log(_this.data.zeng)
    console.log(_this.data.shan)
    console.log(_this.data.gai)
    console.log(_this.data.cha)
    if (_this.data.xm != "" ) {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "insert into power (t_id,view_name,`add`,del,upd,sel,company) values('"+_this.data.t_id+"','"+_this.data.ymmc+"','"+_this.data.zeng+"','"+_this.data.shan+"','"+_this.data.gai+"','"+_this.data.cha+"','"+user+"')"
        },
        success: res => {
          _this.setData({
            xm: "",
            ymmc: "",
            zeng: "",
            shan: "",
            gai: "",
            cha:"",
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
      id: _this.data.list[e.currentTarget.dataset.index].id, 
      xm: _this.data.list[e.currentTarget.dataset.index].s_name, 
      t_id: _this.data.list[e.currentTarget.dataset.index].t_id, 
      ymmc: _this.data.list[e.currentTarget.dataset.index].view_name, 
      zeng: _this.data.list[e.currentTarget.dataset.index].add, 
      shan: _this.data.list[e.currentTarget.dataset.index].del, 
      gai: _this.data.list[e.currentTarget.dataset.index].upd, 
      cha: _this.data.list[e.currentTarget.dataset.index].sel, 
      xgShow:true,
    })
  },

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var t_id = _this.data.name_list[e.detail.value].ID
    var name = _this.data.name_list[e.detail.value].RealName
    console.log(t_id + "  " + name)
    _this.setData({
      t_id: t_id,
      xm:name,
    })
  },

  bindPickerChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      ymmc:_this.data.view_list[e.detail.value]
    })
  },
  bindPickerChange3: function(e) {
    var _this = this
    _this.setData({
      zeng:_this.data.view_list1[e.detail.value]
    })
    console.log(e.detail.value)
  },
  bindPickerChange4: function(e) {
    var _this = this
    _this.setData({
      shan:_this.data.view_list2[e.detail.value]
    })
  },
  bindPickerChange5: function(e) {
    var _this = this
    _this.setData({
      gai:_this.data.view_list3[e.detail.value]
    })
  },
  bindPickerChange6: function(e) {
    var _this = this
    _this.setData({
      cha:_this.data.view_list4[e.detail.value]
    })
  },

  upd1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.xm != "") {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "update power set view_name='"+_this.data.ymmc+"', `add`='"+_this.data.zeng+"',del='"+_this.data.shan+"',upd='"+_this.data.gai+"',sel='"+_this.data.cha+"' where id='"+_this.data.id+"'"
        },
        success: res => {
          _this.setData({
            xm: "",
            ymmc: "",
            zeng: "",
            shan: "",
            gai: "",
            cha:"",
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
          sql: "delete from power where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            rq: "",
            xsxm: "",
            djje: "",
            xfje: "",
            jffs: "",
            sfr:"",
            bz:"",
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
      ymmc:'',
    })
  },
  sel1:function(){
    var _this = this
    var e = [_this.data.ymmc]
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