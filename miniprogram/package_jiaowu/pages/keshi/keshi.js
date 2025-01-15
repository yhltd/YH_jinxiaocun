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
        text: "日期",
        width: "200rpx",
        columnName: "riqi",
        type: "text",
        isupd: true
      },
      {
        text: "学生姓名",
        width: "200rpx",
        columnName: "student_name",
        type: "text",
        isupd: true
      },
      {
        text: "培训课程",
        width: "200rpx",
        columnName: "course",
        type: "text",
        isupd: true
      },
      {
        text: "课时",
        width: "200rpx",
        columnName: "keshi",
        type: "text",
        isupd: true
      },
      {
        text: "责任教师",
        width: "200rpx",
        columnName: "teacher_name",
        type: "text",
        isupd: true
      },
      {
        text: "每节课时金额",
        width: "200rpx",
        columnName: "jine",
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
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select * from keshi_detail where teacher_name like '%" + e[0] + "%' and course like '%" + e[1] + "%' and riqi >='" + e[2] + "' and riqi <='" + e[3] + "' and Company='"+user+"'"
      },
      success: res => {
        console.log(res.result)
        var list = res.result
        for(var i=0; i<list.length; i++){
          list[i].riqi = list[i].riqi.split("T")[0]
        }
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
  getExcel : function(){ 
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = [
      {
        text: "日期",
        width: "200rpx",
        columnName: "riqi",
        type: "text",
        isupd: true
      },
      {
        text: "学生姓名",
        width: "200rpx",
        columnName: "student_name",
        type: "text",
        isupd: true
      },
      {
        text: "培训课程",
        width: "200rpx",
        columnName: "course",
        type: "text",
        isupd: true
      },
      {
        text: "课时",
        width: "200rpx",
        columnName: "keshi",
        type: "number",
        isupd: true
      },
      {
        text: "责任教师",
        width: "200rpx",
        columnName: "teacher_name",
        type: "text",
        isupd: true
      },
      {
        text: "每节课时金额",
        width: "200rpx",
        columnName: "jine",
        type: "number",
        isupd: true
      },
    ]
    var cloudList = {
      name : '课时统计',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:parseInt(title[i].width.split("r")[0])/10,
        columnName:title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu : 'true',
              fileType : 'xlsx',
              success : res=> {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail : res=> {
        console.log(res)
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
        sql: "select * from power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='课时统计'"
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
          var e = ['', '','1900-01-01','2100-12-31']
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
        sql: "select * from shezhi where Company = '" + userInfo.Company + "'"
      },
      success: res => {
        console.log(res.result)
        var list = res.result
        var kecheng = []
        var jiaoshi = []
        for(var i=0; i<list.length; i++){
          if(list[i].course != '' && list[i].course != null && list[i].course != undefined){
            kecheng.push(list[i].course)
          }
          if(list[i].teacher != '' && list[i].teacher != null && list[i].teacher != undefined){
            jiaoshi.push(list[i].teacher)
          }
        }
        _this.setData({
          kecheng_list: kecheng,
          jiaoshi_list : jiaoshi,
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

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var pxks = _this.data.kecheng_list[e.detail.value]
    console.log(pxks)
    _this.setData({
      pxks: pxks,
    })
  },

  bindPickerChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var zrjs = _this.data.jiaoshi_list[e.detail.value]
    console.log(zrjs)
    _this.setData({
      zrjs: zrjs,
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
    if(_this.data.quanxian_gai != '√'){
      wx.showToast({
        title: '无修改权限！',
        icon: 'none'
      })
      return;
    }
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
    let user = app.globalData.gongsi;
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
          var e = ['', '','1900-01-01','2100-12-31']
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
          var e = ['', '','1900-01-01','2100-12-31']
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
      zrjs:"",
      pxks:"",
      riqi1:'',
      riqi2:'',
    })
    
  },
  kqb:function(){
    var _this=this
    wx.navigateTo({
      url: "../kaoqinbiao/kaoqinbiao?userInfo="+JSON.stringify(_this.data.userInfo)
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

    if(_this.data.riqi1 > _this.data.riqi2){
      wx.showToast({
        title: '开始日期不能大于结束日期',
        icon:'none',
        duration: 2000//持续的时间
      })
      return;
    }

    var e = [_this.data.zrjs,_this.data.pxks,_this.data.riqi1,_this.data.riqi2]
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