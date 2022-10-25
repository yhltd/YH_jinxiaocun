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
      text: "登录名",
      width: "200rpx",
      columnName: "UserName",
      type: "text",
      isupd: true
    },
    {
      text: "密码",
      width: "200rpx",
      columnName: "Password",
      type: "text",
      isupd: true
    },
    {
      text: "姓名",
      width: "200rpx",
      columnName: "RealName",
      type: "text",
      isupd: true
    },
    {
      text: "用户类别",
      width: "200rpx",
      columnName: "UseType",
      type: "text",
      isupd: true
    },
    {
      text: "年龄",
      width: "200rpx",
      columnName: "Age",
      type: "text",
      isupd: true
    },
    {
      text: "电话",
      width: "200rpx",
      columnName: "Phone",
      type: "text",
      isupd: true
    },
    {
      text: "家庭住址",
      width: "200rpx",
      columnName: "Home",
      type: "text",
      isupd: true
    },
    {
      text: "身份证号",
      width: "200rpx",
      columnName: "photo",
      type: "text",
      isupd: true
    },
    {
      text: "学历",
      width: "200rpx",
      columnName: "Education",
      type: "text",
      isupd: true
    },
    {
      text: "状态",
      width: "200rpx",
      columnName: "state",  
      type: "text",
      isupd: true
    },
    ],
    zhuangtai_list:['正常','禁用'],
    dlm: "",
    mm: "",
    xm: "",
    yhlb: "",
    nl: "",
    dh:"",
    jtzz:"",
    sfzh:"",
    xl:"",
    zt:"",
    // 新增代码
    isdis: '',
    isdischa: '',
    isdisgai: '',
    isdisshan: '',
    isdisquanxian:'',
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
    console.log(_this.data.dlm)
    console.log(_this.data.xm)
    console.log(_this.data.dh)
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select * from teacher where UserName like '%" + e[0] + "%' and RealName like '%" + e[1] + "%' and Phone like '%" + e[2] + "%' and Company='"+user+"'"
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
  getExcel : function(){ 
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title
    var cloudList = {
      name : '账号管理',
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
        sql: "select * from power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='账号管理'"
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
          var e = ['','','']
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

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var zhuangtai = _this.data.zhuangtai_list[e.detail.value]
    console.log(zhuangtai)
    _this.setData({
      zt: zhuangtai,
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
      dlm: "",
      mm: "",
      xm: "",
      yhlb: "",
      nl: "",
      dh:"",
      jtzz:"",
      sfzh:"",
      xl:"",
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
      dlm: "",
      mm: "",
      xm: "",
      yhlb: "",
      nl: "",
      dh:"",
      jtzz:"",
      sfzh:"",
      xl:"",
      zt:"",
    })
  },

  add1: function () {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log(_this.data.dlm)
    console.log(_this.data.mm)
    console.log(_this.data.xm)
    console.log(_this.data.yhlb)
    console.log(_this.data.nl)
    console.log(_this.data.dh)
    console.log(_this.data.jtzz)
    console.log(_this.data.sfzh)
    console.log(_this.data.xl)
    console.log(_this.data.zt)
    if (_this.data.dlm != "" && _this.data.mm != "" && _this.data.xm != "" && _this.data.dh != "") {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "insert into teacher(UserName,Password,RealName,UseType,Age,Phone,Home,photo,Education,state,Company) values('" + _this.data.dlm + "','" + _this.data.mm + "','" + _this.data.xm + "','" + _this.data.yhlb + "','" + _this.data.nl + "','" + _this.data.dh +"','" + _this.data.jtzz +"','" + _this.data.sfzh +"','" + _this.data.xl +"','" + _this.data.zt +"','"+user+"')"
        },
        success: res => {
          _this.setData({
            dlm: "",
            mm: "",
            xm: "",
            yhlb: "",
            nl: "",
            dh:"",
            jtzz:"",
            sfzh:"",
            xl:"",
            zt:"",
          })
          _this.qxShow()
          var e = ['','','']
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
      id: _this.data.list[e.currentTarget.dataset.index].ID, 
      dlm: _this.data.list[e.currentTarget.dataset.index].UserName, 
      mm: _this.data.list[e.currentTarget.dataset.index].Password, 
      xm: _this.data.list[e.currentTarget.dataset.index].RealName, 
      yhlb: _this.data.list[e.currentTarget.dataset.index].UseType, 
      nl: _this.data.list[e.currentTarget.dataset.index].Age, 
      dh:_this.data.list[e.currentTarget.dataset.index].Phone, 
      jtzz:_this.data.list[e.currentTarget.dataset.index].Home, 
      sfzh:_this.data.list[e.currentTarget.dataset.index].photo, 
      xl:_this.data.list[e.currentTarget.dataset.index].Education, 
      zt:_this.data.list[e.currentTarget.dataset.index].state, 
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
          sql: "update teacher set UserName='" + _this.data.dlm + "',Password='" + _this.data.mm + "',RealName='" + _this.data.xm + "',UseType='" + _this.data.yhlb + " ',Age='" + _this.data.nl + " ',Phone='" + _this.data.dh + " ',Home='" + _this.data.jtzz + " ',photo='" + _this.data.sfzh + " ',Education='" + _this.data.xl + " ',state='" + _this.data.zt + " ' where ID='" + _this.data.id +"'"
        },
        success: res => {
          _this.setData({
            dlm: "",
            mm: "",
            xm: "",
            yhlb: "",
            nl: "",
            dh:"",
            jtzz:"",
            sfzh:"",
            xl:"",
            zt:"",
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
          sql: "delete from teacher where ID='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            dlm: "",
            mm: "",
            xm: "",
            yhlb: "",
            nl: "",
            dh:"",
            jtzz:"",
            sfzh:"",
            xl:"",
            zt:"",
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
      dlm:"",
      xm:"",
      dh:'',
    })
  },
  kebiao:function(){
    var _this = this
    wx.navigateTo({
      
      url: "../quanxian/quanxian?userInfo="+JSON.stringify(_this.data.userInfo)
    })
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