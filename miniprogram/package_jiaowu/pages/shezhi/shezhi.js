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
      text: "课程列表",
      width: "200rpx",
      columnName: "course",
      type: "text",
      isupd: true
    },
    {
      text: "责任教师",
      width: "200rpx",
      columnName: "teacher",
      type: "text",
      isupd: true
    },
    {
      text: "状态设定",
      width: "200rpx",
      columnName: "type",
      type: "text",
      isupd: true
    },
    {
      text: "缴费方式",
      width: "200rpx",
      columnName: "paiment",
      type: "text",
      isupd: true
    },
    {
      text: "收入方式",
      width: "200rpx",
      columnName: "msort",
      type: "text",
      isupd: true
    },
    {
      text: "支出分类",
      width: "200rpx",
      columnName: "psort",
      type: "text",
      isupd: true
    },
  
    ],
    kclb: "",
    zrjs: "",
    ztsd: "",
    jffs: "",
    srfs: "",
    zcfl:"",
    
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
    console.log(_this.data.dlm)
    console.log(_this.data.xm)
    console.log(_this.data.dh)
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select * from shezhi where Company='"+user+"'"
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
    this.panduanquanxian()
    var e = ['', '','1900-01-01','2100-12-31']
    if (_this.data.isdischa == 1) {
      _this.tableShow(e)
    }
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
    console.log(_this.data.course)
    console.log(_this.data.teacher)
    console.log(_this.data.type)
    console.log(_this.data.paiment)
    console.log(_this.data.msort)
    console.log(_this.data.psort)
    if (_this.data.dlm != "" && _this.data.mm != "" && _this.data.xm != "" && _this.data.dh != "") {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "insert into shezhi(course,teacher,type,paiment,msort,psort,Company) values('" + _this.data.kclb + "','" + _this.data.zrjs + "','" + _this.data.ztsd + "','" + _this.data.jffs + "','" + _this.data.srfs + "','" + _this.data.zcfl +"','"+user+"')"
        },
        success: res => {
          _this.setData({
            kclb: "",
            zrjs: "",
            ztsd: "",
            jffs: "",
            srfs: "",
            zcfl:"",
          })
          _this.qxShow()
          var e = ['', '','1900-01-01','2100-12-31']
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
      kclb: _this.data.list[e.currentTarget.dataset.index].course, 
      zrjs: _this.data.list[e.currentTarget.dataset.index].teacher, 
      ztsd: _this.data.list[e.currentTarget.dataset.index].type, 
      jffs: _this.data.list[e.currentTarget.dataset.index].paiment, 
      srfs: _this.data.list[e.currentTarget.dataset.index].msort, 
      zcfl:_this.data.list[e.currentTarget.dataset.index].psort, 
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.dlm != "" && _this.data.mm != "" && _this.data.xm != "" && _this.data.dh != "") {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "update shezhi set course='" + _this.data.kclb + "',teacher='" + _this.data.zrjs + "',type='" + _this.data.ztsd + "',paiment='" + _this.data.jffs + " ',msort='" + _this.data.srfs + " ',psort='" + _this.data.zcfl +" ' where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            kclb: "",
            zrjs: "",
            ztsd: "",
            jffs: "",
            srfs: "",
            zcfl:"",
          })
          _this.qxShow()
          var e = ['', '','']
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
          sql: "delete from shezhi where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            kclb: "",
            zrjs: "",
            ztsd: "",
            jffs: "",
            srfs: "",
            zcfl:"",
          })
          _this.qxShow()
          var e = ['', '','']
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
    // _this.setData({
    //   cxShow:true,
    //   dlm:"",
    //   xm:"",
    //   dh:'',
    // })
    
  },
  sel1:function(){
    var _this = this
    var e = [_this.data.dlm,_this.data.xm,_this.data.dh]
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