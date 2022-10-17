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
  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa: 1,
      isdisgai: 1,
      isdisshan: 1
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log("department_list1")
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "排产核对") {
        console.log(department_list1[i])
        //添加没权限
        if (department_list1[i].add == "否") {
          _this.setData({
            isdis: 2
          });
          // console.log("否 isdis："+_this.data.isdis)
        } else {
          _this.setData({
            isdis: 1
          });
          // console.log("是 isdis："+_this.data.isdis)

        }
        //修改没权限
        if (department_list1[i].upd == "否") {
          _this.setData({
            isdisgai: 2
          });
        } else {
          _this.setData({
            isdisgai: 1
          });

        }
        //删除没权限
        if (department_list1[i].del == "否") {
          _this.setData({
            isdisshan: 2
          });
          console.log("否 isdisshan：" + _this.data.isdisshan)
        } else {
          _this.setData({
            isdisshan: 1
          });

          console.log("是 isdisshan：" + _this.data.isdisshan)
        }
        //查询没权限
        if (department_list1[i].sel == "否") {
          _this.setData({
            isdischa: 2
          });
        } else {
          _this.setData({
            isdischa: 1
          });

        }
        console.log(_this.data.isdis)

      }
    }
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
    this.panduanquanxian()
    var e = ['']
    if (_this.data.isdischa == 1) {
      _this.tableShow(e)
    }
    
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
    _this.setData({
      tjShow: true,
      ddh:"",
      mk:"",
      rq:"",
      sl:""
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

  add1: function () {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log(_this.data.id)
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
          sql: "insert into power (t_id,view_name,`add`,del,upd,sel,company) values('"+_this.data.id+"','"+_this.data.ymmc+"','"+_this.data.zeng+"','"+_this.data.shan+"','"+_this.data.gai+"','"+_this.data.cha+"','"+user+"')"
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
    console.log(t_id + "  " + name+" "+zeng)
    _this.setData({
      t_id: t_id,
      xm:name,
      zeng:zeng
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