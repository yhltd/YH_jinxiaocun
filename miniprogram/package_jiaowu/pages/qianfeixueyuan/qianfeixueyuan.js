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
      text: "欠费金额",
      width: "200rpx",
      columnName: "Nocost",
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
      text: "剩余课时",
      width: "200rpx",
      columnName: "Nohour",
      type: "text",
      isupd: true
    },
      
    ],
    xsxm: "",
    qfje: "",
    bmrq: "",
    pxkc: "",
    zrjs: "",
    bj:"",
    dh:"",
    syks:"",
    
    
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

    if(app.globalData.shujuku==0){

      var sql = "select ID,RealName,Sex,rgdate,Course,Teacher,Classnum,phone,Fee,(select SUM(case when Company ='"+user+"' and realname=student.realname then paid+money else 0 end) from payment ) mall ,ifnull(ifnull(Fee,0) -ifnull((select SUM(case when Company ='"+user+"' and realname=student.realname then paid+money else 0 end) from payment ),0),0) as Nocost,(select SUM(case when Company='"+user+"' and student_name=student.realname and course=student.Course then keshi else 0 end ) from keshi_detail ) nall,ifnull(Allhour,0) - ifnull((select SUM(case when Company='"+user+"' and student_name=student.realname and course=student.Course then keshi else 0 end ) from keshi_detail ),0) as Nohour,Allhour,Type FROM student where RealName LIKE '%" + _this.data.xsxm + "%' and ifnull(ifnull(Fee,0) -ifnull((select SUM(case when Company ='"+user+"' and realname=student.realname then paid+money else 0 end) from payment ),0),0) > 0"
    // var sql = "select * from student where Nocost is not null and Nocost>0 and RealName like '%" + _this.data.xsxm + "%' and Company='"+user+"'"
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: sql
      },
      success: res => {
        console.log(res.result)
        var list = res.result
        for(var i=0; i<list.length; i++){
          list[i].rgdate = list[i].rgdate.split("T")[0]
          if(list[i].Nohour == null){
            list[i].Nohour = 0
          }
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
              SUM(CASE WHEN Company = '${user}' THEN paid + money ELSE 0 END) as total_paid
          FROM xueshengguanlixitong_excel.dbo.payment 
          GROUP BY realname
      ) p ON s.RealName = p.realname
      LEFT JOIN (
          SELECT 
              student_name,
              course,
              SUM(CASE WHEN Company = '${user}' THEN keshi ELSE 0 END) as used_keshi
          FROM xueshengguanlixitong_excel.dbo.keshi_detail 
          GROUP BY student_name, course
      ) k ON s.RealName = k.student_name AND s.Course = k.course
      WHERE s.RealName LIKE '%${_this.data.xsxm}%' 
        AND (ISNULL(s.Fee, 0) - ISNULL(p.total_paid, 0)) > 0
      `;

console.log("🔍 执行的SQL:", sql);
console.log("🔍 查询参数 - user:", user, "xsxm:", _this.data.xsxm);

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        console.log("✅ 完整返回结果:", res);
    console.log("📊 recordset:", res.result.recordset);
    console.log("📊 记录数量:", res.result.recordset ? res.result.recordset.length : 0);
        var list = res.result.recordset
        for(var i=0; i<list.length; i++){
          list[i].rgdate = list[i].rgdate.split("T")[0]
          if(list[i].Nohour == null){
            list[i].Nohour = 0
          }
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
    var title = _this.data.title
    var cloudList = {
      name : '欠费学员',
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
          sql: "select * from power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='欠费学员'"
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

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from xueshengguanlixitong_excel.dbo.power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='欠费学员'"
        },
        success: res => {
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
    if (_this.data.dlm != "" && _this.data.mm != "" && _this.data.xm != "" && _this.data.dh != "") {

      if(app.globalData.shujuku==0){

        wx.cloud.callFunction({
          name: 'sql_jiaowu',
          data: {
            sql: "insert into student(course,teacher,type,paiment,msort,psort,Company) values('" + _this.data.kclb + "','" + _this.data.zrjs + "','" + _this.data.ztsd + "','" + _this.data.jffs + "','" + _this.data.srfs + "','" + _this.data.zcfl +"','"+user+"')"
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

      }else if(app.globalData.shujuku == 1){

        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: "insert into xueshengguanlixitong_excel.dbo.student(course,teacher,type,paiment,msort,psort,Company) values('" + _this.data.kclb + "','" + _this.data.zrjs + "','" + _this.data.ztsd + "','" + _this.data.jffs + "','" + _this.data.srfs + "','" + _this.data.zcfl + "','" + user + "')"
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
      yjf:_this.data.list[e.currentTarget.dataset.index].Cost, 
      wjf:_this.data.list[e.currentTarget.dataset.index].Nocost, 
      ysks:_this.data.list[e.currentTarget.dataset.index].Hour, 
      syks:_this.data.list[e.currentTarget.dataset.index].Nohour, 
      zks:_this.data.list[e.currentTarget.dataset.index].Allhour, 
      zt:_this.data.list[e.currentTarget.dataset.index].Type, 
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.dlm != "" && _this.data.mm != "" && _this.data.xm != "" && _this.data.dh != "") {

      if(app.globalData.shujuku==0){

        wx.cloud.callFunction({
          name: 'sql_jiaowu',
          data: {
            sql: "update student set course='" + _this.data.kclb + "',teacher='" + _this.data.zrjs + "',type='" + _this.data.ztsd + "',paiment='" + _this.data.jffs + " ',msort='" + _this.data.srfs + " ',psort='" + _this.data.zcfl +" ' where id='" + _this.data.id + "'"
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

      }else if(app.globalData.shujuku == 1){

        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: "update xueshengguanlixitong_excel.dbo.student set course='" + _this.data.kclb + "',teacher='" + _this.data.zrjs + "',type='" + _this.data.ztsd + "',paiment='" + _this.data.jffs + "',msort='" + _this.data.srfs + "',psort='" + _this.data.zcfl + "' where id=" + _this.data.id
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

    if(app.globalData.shujuku==0){

      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "delete from student where id='" + _this.data.id + "'"
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

    }else if(app.globalData.shujuku == 1){

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "delete from xueshengguanlixitong_excel.dbo.student where id='" + _this.data.id + "'"
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
    })
  },
  sel1:function(){
    var _this = this
    var e = [_this.data.xsxm]
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