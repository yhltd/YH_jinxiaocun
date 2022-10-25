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
      columnName: "ksdate",
      type: "text",
      isupd: true
    },
    {
      text: "学生姓名",
      width: "200rpx",
      columnName: "realname",
      type: "text",
      isupd: true
    },
    {
      text: "定金金额",
      width: "200rpx",
      columnName: "paid",
      type: "text",
      isupd: true
    },
    {
      text: "学费金额",
      width: "200rpx",
      columnName: "money",
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
      text: "收费人",
      width: "200rpx",
      columnName: "keeper",
      type: "text",
      isupd: true
    },
    {
      text: "备注",
      width: "200rpx",
      columnName: "remark",
      type: "text",
      isupd: true
    },
    ],
    rq: "",
    xsxm: "",
    djje: "",
    xfje: "",
    jffs: "",
    sfr:"",
    bz:"",
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
        sql: "select * from payment where Company = '" + user + "' and ksdate >='" + e[0] + "'and ksdate <='" + e[1] + "' and realname like '%" + e[2] + "%'"
      },
      success: res => {
        console.log(res.result)
        var list = res.result
        for(var i=0; i<list.length; i++){
          list[i].ksdate = list[i].ksdate.split("T")[0]
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
    var title = _this.data.title
    var cloudList = {
      name : '缴费记录',
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
  dayin: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list;
    console.log(list)
    var title = _this.data.title2;
    console.log(title)
    var cloudList = {
      name: '工资明细',
      items: [], 
      header: []
    }

    for (let i = 0; i < title.length; i++) {
      cloudList.header.push({
        item: title[i].text,
        type: title[i].type,
        width: title[i].width,
        columnName: title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name: 'getExcel',
      data: {
        list: cloudList
      },
      success: function (res) {
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu: 'true',
              fileType: 'xlsx',
              success: res => {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail: res => {
        console.log(res)
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
        sql: "select * from power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='缴费记录'"
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
          var e = ['1900-01-01', '2100-12-31','']
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
      rq: "",
      xsxm: "",
      djje: "",
      xfje: "",
      jffs: "",
      sfr:"",
      bz:"",
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
      djje: "",
      xfje: "",
      jffs: "",
      sfr:"",
      bz:"",
    })
  },

  add1: function () {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log(_this.data.rq)
    console.log(_this.data.xsxm)
    console.log(_this.data.djje)
    console.log(_this.data.xfje)
    console.log(_this.data.jffs)
    console.log(_this.data.sfr)
    console.log(_this.data.bz)
    if (_this.data.xsxm != "" && _this.data.rq != ""  ) {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "insert into payment(ksdate,realname,paid,money,paiment,keeper,remark,Company) values('" + _this.data.rq + "','" + _this.data.xsxm + "','" + _this.data.djje + "','" + _this.data.xfje + "','" + _this.data.jffs + "','" + _this.data.sfr +"','" + _this.data.bz  +"','"+user+"')"
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
          var e = ['1900-01-01', '2100-12-31','']
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
      rq: _this.data.list[e.currentTarget.dataset.index].ksdate, 
      xsxm: _this.data.list[e.currentTarget.dataset.index].realname, 
      djje: _this.data.list[e.currentTarget.dataset.index].paid, 
      xfje: _this.data.list[e.currentTarget.dataset.index].money, 
      jffs: _this.data.list[e.currentTarget.dataset.index].paiment, 
      sfr:_this.data.list[e.currentTarget.dataset.index].keeper, 
      bz:_this.data.list[e.currentTarget.dataset.index].remark,
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.xsxm != "" && _this.data.rq != "" ) {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "update payment set ksdate='" + _this.data.rq + "',realname='" + _this.data.xsxm + "',paid='" + _this.data.djje + "',money='" + _this.data.xfje + "',paiment='" + _this.data.jffs + "',keeper='" + _this.data.sfr + "',remark='" + _this.data.bz + "' where id='" + _this.data.id + "'"
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
          var e = ['1900-01-01', '2100-12-31','']
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
          sql: "delete from payment where id='" + _this.data.id + "'"
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
          var e = ['1900-01-01', '2100-12-31','']
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
      riqi1:'',
      riqi2:'',
      xsxm:"",
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
    var e = [_this.data.riqi1,_this.data.riqi2,_this.data.xsxm]
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