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
      text: "学生姓名",
      width: "200rpx",
      columnName: "RealName",
      type: "text",
      isupd: true
    },
    {
      text: "性别",
      width: "200rpx",
      columnName: "Sex",
      type: "text",
      isupd: true
    },
    {
      text: "报名日期",
      width: "200rpx",
      columnName: "rgdate",
      type: "text",
      isupd: true
    },
    {
      text: "培训课程",
      width: "200rpx",
      columnName: "Course",
      type: "text",
      isupd: true
    },
    {
      text: "责任教师",
      width: "200rpx",
      columnName: "Teacher",
      type: "text",
      isupd: true
    },
    {
      text: "班级",
      width: "200rpx",
      columnName: "Classnum",
      type: "text",
      isupd: true
    },
    {
      text: "电话",
      width: "200rpx",
      columnName: "phone",
      type: "text",
      isupd: true
    },
    {
      text: "学费",
      width: "200rpx",
      columnName: "Fee",
      type: "text",
      isupd: true
    },
    {
      text: "已缴费",
      width: "200rpx",
      columnName: "mall",
      type: "text",
      isupd: true
    },
    {
      text: "未交费",
      width: "200rpx",
      columnName: "Nocost",
      type: "text",
      isupd: true
    },
    {
      text: "已上课时",
      width: "200rpx",
      columnName: "nall",
      type: "text",
      isupd: true
    },
    {
      text: "剩余课时",
      width: "200rpx",
      columnName: "Nohour",
      type: "text",
      isupd: true
    },
    {
      text: "总课时",
      width: "200rpx",
      columnName: "Allhour",
      type: "text",
      isupd: true
    },
    {
      text: "状态",
      width: "200rpx",
      columnName: "Type",
      type: "text",
      isupd: true
    },
  
    ],
    xingbie_list:['男','女'],
    xsxm: "",
    xb: "",
    bmrq: "",
    pxkc: "",
    zrjs: "",
    bj:"",
    dh:"",    
    xf:"",
    zks:"",
    zt:"",
    ckpx:"",
    riqi1:'',
    riqi2:'',
    
    // 新增代码
    quanxian_zeng:0,
    quanxian_shan:0,
    quanxian_gai:0,
    quanxian_cha:0,
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
    let user = app.globalData.gongsi;

    if(app.globalData.shujuku==0){

      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "select ID,RealName,Sex,rgdate,Course,Teacher,Classnum,phone,Fee,(select SUM(case when Company ='"+_this.data.userInfo.Company+"' and realname=student.realname then paid+money else 0 end) from payment ) mall ,ifnull(ifnull(Fee,0) -ifnull((select SUM(case when Company ='"+_this.data.userInfo.Company+"' and realname=student.realname then paid+money else 0 end) from payment ),0),0) as Nocost,(select SUM(case when Company='"+_this.data.userInfo.Company+"' and student_name=student.realname and course=student.Course then keshi else 0 end ) from keshi_detail ) nall,ifnull(Allhour,0) - ifnull((select SUM(case when Company='"+_this.data.userInfo.Company+"' and student_name=student.realname and course=student.Course then keshi else 0 end ) from keshi_detail ),0) as Nohour,Allhour,Type FROM student where RealName LIKE '%" + e[0] + "%' AND Teacher LIKE '%" + e[1] + "%' AND Course LIKE '%" + e[2] + "%' AND rgdate >= '" + e[3] + "' AND rgdate <= '" + e[4] + "'"
        },
        success: res => {
          console.log(res.result)
          var list = res.result
          for(var i=0; i<list.length; i++){
            list[i].rgdate = list[i].rgdate.split("T")[0]
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

    }else if(app.globalData.shujuku == 1){
      var sql = `
      SELECT 
          s.ID,
          s.RealName,
          s.Sex,
          s.rgdate,
          s.Course,
          s.Teacher,
          s.Classnum,
          s.phone,
          s.Fee,
          ISNULL(p.total_paid, 0) as mall,
          ISNULL(s.Fee, 0) - ISNULL(p.total_paid, 0) as Nocost,
          ISNULL(k.used_keshi, 0) as nall,
          ISNULL(s.Allhour, 0) - ISNULL(k.used_keshi, 0) as Nohour,
          s.Allhour,
          s.Type
      FROM xueshengguanlixitong_excel.dbo.student s
      LEFT JOIN (
          SELECT 
              realname,
              SUM(CASE WHEN Company = '${_this.data.userInfo.Company}' THEN paid + money ELSE 0 END) as total_paid
          FROM xueshengguanlixitong_excel.dbo.payment 
          GROUP BY realname
      ) p ON s.RealName = p.realname
      LEFT JOIN (
          SELECT 
              student_name,
              course,
              SUM(CASE WHEN Company = '${_this.data.userInfo.Company}' THEN keshi ELSE 0 END) as used_keshi
          FROM xueshengguanlixitong_excel.dbo.keshi_detail 
          GROUP BY student_name, course
      ) k ON s.RealName = k.student_name AND s.Course = k.course
      WHERE s.RealName LIKE '%${e[0]}%' 
          AND s.Teacher LIKE '%${e[1]}%' 
          AND s.Course LIKE '%${e[2]}%' 
          AND s.rgdate >= '${e[3]}' 
          AND s.rgdate <= '${e[4]}'
      `;

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: sql
        },
        success: res => {
          console.log(res.result.recordset)
          var list = res.result.recordset
          for(var i=0; i<list.length; i++){
            list[i].rgdate = list[i].rgdate.split("T")[0]
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
      
    }

    
  },
  getExcel : function(){ 
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = [{
      text: "学生姓名",
      width: "200rpx",
      columnName: "RealName",
      type: "text",
      isupd: true
    },
    {
      text: "性别",
      width: "200rpx",
      columnName: "Sex",
      type: "text",
      isupd: true
    },
    {
      text: "报名日期",
      width: "200rpx",
      columnName: "rgdate",
      type: "text",
      isupd: true
    },
    {
      text: "培训课程",
      width: "200rpx",
      columnName: "Course",
      type: "text",
      isupd: true
    },
    {
      text: "责任教师",
      width: "200rpx",
      columnName: "Teacher",
      type: "text",
      isupd: true
    },
    {
      text: "班级",
      width: "200rpx",
      columnName: "Classnum",
      type: "text",
      isupd: true
    },
    {
      text: "电话",
      width: "200rpx",
      columnName: "phone",
      type: "text",
      isupd: true
    },
    {
      text: "学费",
      width: "200rpx",
      columnName: "Fee",
      type: "number",
      isupd: true
    },
    {
      text: "已缴费",
      width: "200rpx",
      columnName: "mall",
      type: "text",
      isupd: true
    },
    {
      text: "未交费",
      width: "200rpx",
      columnName: "Nocost",
      type: "text",
      isupd: true
    },
    {
      text: "已上课时",
      width: "200rpx",
      columnName: "nall",
      type: "text",
      isupd: true
    },
    {
      text: "剩余课时",
      width: "200rpx",
      columnName: "Nohour",
      type: "text",
      isupd: true
    },
    {
      text: "总课时",
      width: "200rpx",
      columnName: "Allhour",
      type: "number",
      isupd: true
    },
    {
      text: "状态",
      width: "200rpx",
      columnName: "Type",
      type: "text",
      isupd: true
    },
  
    ]
    var cloudList = {
      name : '学生信息',
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

    if(app.globalData.shujuku==0){

      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "select * from power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='学生信息'"
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
            var e = ['','', '','1900-01-01','2100-12-31']
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
          var zhuangtai = []
          for(var i=0; i<list.length; i++){
            if(list[i].course != '' && list[i].course != null && list[i].course != undefined){
              kecheng.push(list[i].course)
            }
            if(list[i].teacher != '' && list[i].teacher != null && list[i].teacher != undefined){
              jiaoshi.push(list[i].teacher)
            }
            if(list[i].type != '' && list[i].type != null && list[i].type != undefined){
              zhuangtai.push(list[i].type)
            }
          }
          _this.setData({
            kecheng_list: kecheng,
            jiaoshi_list : jiaoshi,
            zhuangtai_list : zhuangtai
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

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from xueshengguanlixitong_excel.dbo.power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='学生信息'"
        },
        success: res => {
          console.log("✅ 完整返回结果:", res);
          console.log(res.result.recordset)
          var list = res.result.recordset
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
            var e = ['','', '','1900-01-01','2100-12-31']
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
        name: 'sqlServer_117',
        data: {
          query: "select * from xueshengguanlixitong_excel.dbo.shezhi where Company = '" + userInfo.Company + "'"
        },
        success: res => {
          console.log("✅ 完整返回结果:", res);
          console.log(res.result.recordset)
          var list = res.result.recordset
          var kecheng = []
          var jiaoshi = []
          var zhuangtai = []
          for(var i=0; i<list.length; i++){
            if(list[i].course != '' && list[i].course != null && list[i].course != undefined){
              kecheng.push(list[i].course)
            }
            if(list[i].teacher != '' && list[i].teacher != null && list[i].teacher != undefined){
              jiaoshi.push(list[i].teacher)
            }
            if(list[i].type != '' && list[i].type != null && list[i].type != undefined){
              zhuangtai.push(list[i].type)
            }
          }
          _this.setData({
            kecheng_list: kecheng,
            jiaoshi_list : jiaoshi,
            zhuangtai_list : zhuangtai
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
      
    }

    

    

  },

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var pxkc = _this.data.kecheng_list[e.detail.value]
    console.log(pxkc)
    _this.setData({
      pxkc: pxkc,
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

  bindPickerChange3: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var zt = _this.data.zhuangtai_list[e.detail.value]
    console.log(zt)
    _this.setData({
      zt: zt,
    })
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
      xsxm: "",
      xb: "",
      bmrq: "",
      pxkc: "",
      zrjs: "",
      bj:"",
      dh:"",    
      xf:"",
      yjf:"",
      wjf:"",
      ysks:"",
      syks:"",
      zks:"",
      zt:"",
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime(),
      xsxm: "",
      xb: "",
      bmrq: "",
      pxkc: "",
      zrjs: "",
      bj:"",
      dh:"",    
      xf:"",
      yjf:"",
      wjf:"",
      ysks:"",
      syks:"",
      zks:"",
      zt:"",
    })
  },

  add1: function () {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log(_this.data.xsxm)
    console.log(_this.data.xb)
    console.log(_this.data.bmrq)
    console.log(_this.data.pxkc)
    console.log(_this.data.zrjs)
    console.log(_this.data.bj)
    console.log(_this.data.dh)
    console.log(_this.data.xf)
    console.log(_this.data.yjf)
    console.log(_this.data.wjf)
    console.log(_this.data.ysks)
    console.log(_this.data.syks)
    console.log(_this.data.zks)
    console.log(_this.data.zt)
    if (_this.data.xsxm != "" && _this.data.zrjs != "" && _this.data.pxkc != "" && _this.data.bmrq != "") {


      if(app.globalData.shujuku==0){
        wx.cloud.callFunction({
          name: 'sql_jiaowu',
          data: {
            sql: "insert into student(RealName,Sex,rgdate,Course,Teacher,Classnum,phone,Fee,Allhour,Type,Company)values('" + _this.data.xsxm + "','" + _this.data.xb + "','" + _this.data.bmrq + "','" + _this.data.pxkc + "','" + _this.data.zrjs + "','" + _this.data.bj + "','" + _this.data.dh + "','" + _this.data.xf + "','" + _this.data.zks + "','" + _this.data.zt + "','"+user+"')"
          },
          success: res => {
            _this.setData({
              xsxm: "",
              xb: "",
              bmrq: "",
              pxkc: "",
              zrjs: "",
              bj:"",
              dh:"",    
              xf:"",
              yjf:"",
              wjf:"",
              ysks:"",
              syks:"",
              zks:"",
              zt:"",
            })
            _this.qxShow()
            var e = ['','', '','1900-01-01','2100-12-31']
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

      }else if(app.globalData.shujuku == 1){
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: "insert into xueshengguanlixitong_excel.dbo.student(RealName,Sex,rgdate,Course,Teacher,Classnum,phone,Fee,Allhour,Type,Company) values('" + _this.data.xsxm + "','" + _this.data.xb + "','" + _this.data.bmrq + "','" + _this.data.pxkc + "','" + _this.data.zrjs + "','" + _this.data.bj + "','" + _this.data.dh + "','" + _this.data.xf + "','" + _this.data.zks + "','" + _this.data.zt + "','" + user + "')"
          },
          success: res => {
            _this.setData({
              xsxm: "",
              xb: "",
              bmrq: "",
              pxkc: "",
              zrjs: "",
              bj:"",
              dh:"",    
              xf:"",
              yjf:"",
              wjf:"",
              ysks:"",
              syks:"",
              zks:"",
              zt:"",
            })
            _this.qxShow()
            var e = ['','', '','1900-01-01','2100-12-31']
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
        
      }


      
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
    console.log(_this.data.list[e.currentTarget.dataset.index].ID)
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].ID,
      xsxm: _this.data.list[e.currentTarget.dataset.index].RealName, 
      xb: _this.data.list[e.currentTarget.dataset.index].Sex, 
      bmrq: _this.data.list[e.currentTarget.dataset.index].rgdate, 
      pxkc: _this.data.list[e.currentTarget.dataset.index].Course, 
      zrjs: _this.data.list[e.currentTarget.dataset.index].Teacher, 
      bj:_this.data.list[e.currentTarget.dataset.index].Classnum, 
      dh:_this.data.list[e.currentTarget.dataset.index].phone, 
      xf:_this.data.list[e.currentTarget.dataset.index].Fee, 
      yjf:_this.data.list[e.currentTarget.dataset.index].mall, 
      wjf:_this.data.list[e.currentTarget.dataset.index].Nocost, 
      ysks:_this.data.list[e.currentTarget.dataset.index].nall, 
      syks:_this.data.list[e.currentTarget.dataset.index].Nohour, 
      zks:_this.data.list[e.currentTarget.dataset.index].Allhour, 
      zt:_this.data.list[e.currentTarget.dataset.index].Type, 
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.xsxm != "" && _this.data.zrjs != "" && _this.data.pxkc != "" && _this.data.bmrq != "") {

      if(app.globalData.shujuku==0){

        wx.cloud.callFunction({
          name: 'sql_jiaowu',
          data: {
            sql: "update student set RealName='" + _this.data.xsxm + "',Sex='" + _this.data.xb + "',rgdate='" + _this.data.bmrq + "',Course='" + _this.data.pxkc + "',Teacher='" + _this.data.zrjs + "',Classnum='" + _this.data.bj + "',phone='" + _this.data.dh + "',Fee='" + _this.data.xf + "',Allhour='" + _this.data.zks + "',Type='" + _this.data.zt + "'  where ID='" + _this.data.id + "'"
          },
          success: res => {
            _this.setData({
              xsxm: "",
              xb: "",
              bmrq: "",
              pxkc: "",
              zrjs: "",
              bj:"",
              dh:"",    
              xf:"",
              yjf:"",
              wjf:"",
              ysks:"",
              syks:"",
              zks:"",
              zt:"",
            })
            _this.qxShow()
            var e = ['','', '','1900-01-01','2100-12-31']
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

      }else if(app.globalData.shujuku == 1){

        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: "update xueshengguanlixitong_excel.dbo.student set RealName='" + _this.data.xsxm + "',Sex='" + _this.data.xb + "',rgdate='" + _this.data.bmrq + "',Course='" + _this.data.pxkc + "',Teacher='" + _this.data.zrjs + "',Classnum='" + _this.data.bj + "',phone='" + _this.data.dh + "',Fee='" + _this.data.xf + "',Allhour='" + _this.data.zks + "',Type='" + _this.data.zt + "' where ID=" + _this.data.id
          },
          success: res => {
            _this.setData({
              xsxm: "",
              xb: "",
              bmrq: "",
              pxkc: "",
              zrjs: "",
              bj:"",
              dh:"",    
              xf:"",
              yjf:"",
              wjf:"",
              ysks:"",
              syks:"",
              zks:"",
              zt:"",
            })
            _this.qxShow()
            var e = ['','', '','1900-01-01','2100-12-31']
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
        
      }


      
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

    if(app.globalData.shujuku==0){
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "delete from student where ID='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            xsxm: "",
            xb: "",
            bmrq: "",
            pxkc: "",
            zrjs: "",
            bj:"",
            dh:"",    
            xf:"",
            yjf:"",
            wjf:"",
            ysks:"",
            syks:"",
            zks:"",
            zt:"",
          })
          _this.qxShow()
          var e = ['','', '','1900-01-01','2100-12-31']
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

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "delete from student where ID='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            xsxm: "",
            xb: "",
            bmrq: "",
            pxkc: "",
            zrjs: "",
            bj:"",
            dh:"",    
            xf:"",
            yjf:"",
            wjf:"",
            ysks:"",
            syks:"",
            zks:"",
            zt:"",
          })
          _this.qxShow()
          var e = ['','', '','1900-01-01','2100-12-31']
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
      
    }


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
      xsxm:"",
      zrjs:"",
      ckpx:"",
      riqi1:'',
      riqi2:'',
    })
  },
  sel1:function(){
    var _this = this
    var riqi1 = _this.data.riqi1
    var riqi2 = _this.data.riqi2
    if(riqi1 == ''){
      riqi1 = "1900-01-01"
    }
    if(riqi2 == ''){
      riqi2 = "2100-12-31"
    }

    if(_this.data.riqi1 > _this.data.riqi2){
      wx.showToast({
        title: '开始日期不能大于结束日期',
        icon:'none',
        duration: 2000//持续的时间
      })
      return;
    }

    var e = [_this.data.xsxm,_this.data.zrjs,_this.data.ckpx,riqi1,riqi2]
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