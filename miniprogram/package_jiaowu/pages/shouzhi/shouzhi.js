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
        columnName: "rgdate",
        type: "text",
        isupd: true
      },
      {
        text: "收入金额",
        width: "200rpx",
        columnName: "money",
        type: "text",
        isupd: true
      },
      {
        text: "收入分类",
        width: "200rpx",
        columnName: "msort",
        type: "text",
        isupd: true
      },
      {
        text: "收入备注",
        width: "200rpx",
        columnName: "mremark",
        type: "text",
        isupd: true
      },
      {
        text: "支出金额",
        width: "200rpx",
        columnName: "paid",
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
      {
        text: "支出备注",
        width: "200rpx",
        columnName: "premark",
        type: "text",
        isupd: true
      },
      {
        text: "经手人",
        width: "200rpx",
        columnName: "handle",
        type: "text",
        isupd: true
      },      
    ],
    rq: "",
    srje: "",
    srfl: "",
    srbz: "",
    zcje: "",
    zcfl: "",
    zcbz: "",
    jsr: "",

    ljsr:"",
    ljzc:"",
    xfsr:"",
    ljjy:"",
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
        sql: "select * from income where rgdate >='" + e[0] + "' and rgdate <='" + e[1] + "' and Company='" + user + "'"
      },
      success: res => {
        console.log(res.result)
        var list = res.result
        var shouru_sum = 0
        var zhichu_sum = 0
        var xuefei_sum = 0
        var jieyu = 0
        for(var i=0; i<list.length; i++){
          list[i].rgdate = list[i].rgdate.split("T")[0]
          if(list[i].money != '' && list[i].money != null){
            shouru_sum = shouru_sum + list[i].money * 1
          }
          if(list[i].paid != '' && list[i].paid != null){
            zhichu_sum = zhichu_sum + list[i].paid * 1
          }
          if(list[i].msort == '学费'){
            xuefei_sum = xuefei_sum + list[i].money * 1
          }
        }
        jieyu = shouru_sum - zhichu_sum
        var huizong_list = [shouru_sum,zhichu_sum,xuefei_sum,jieyu]
        console.log(huizong_list)
        _this.setData({
          list: list,
          huizong_list:huizong_list
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
      name : '收支统计',
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
    let user = userInfo.Company;
    _this.setData({
      userInfo:userInfo
    })

    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: {
        sql: "select * from power where Company = '" + userInfo.Company + "' and t_id = " + userInfo.ID + " and view_name ='收支明细'"
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
          var e = ['1900-01-01', '2100-12-31']
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
        var fenlei = []
        var fenlei1 = []
        var jingshou = []
        for(var i=0; i<list.length; i++){
          if(list[i].msort != '' && list[i].msort != null && list[i].msort != undefined){
            fenlei.push(list[i].msort)
          }
          if(list[i].psort != '' && list[i].psort != null && list[i].psort != undefined){
            fenlei1.push(list[i].psort)
          }
          if(list[i].teacher != '' && list[i].teacher != null && list[i].teacher != undefined){
            jingshou.push(list[i].teacher)
          }
        }
        _this.setData({
          fenlei_list: fenlei,
          fenlei1_list: fenlei1,
          jingshou_list:jingshou
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

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var fenlei = _this.data.fenlei_list[e.detail.value]
    console.log(fenlei)
    _this.setData({
      srfl: fenlei,
    })
  },

  bindPickerChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var fenlei1 = _this.data.fenlei1_list[e.detail.value]
    console.log(fenlei1)
    _this.setData({
      zcfl: fenlei1,
    })
  },

  bindPickerChange3: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var jingshou = _this.data.jingshou_list[e.detail.value]
    console.log(jingshou)
    _this.setData({
      jsr: jingshou,
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
      srje: "",
      srfl: "",
      srbz: "",
      zcje: "",
      zcfl: "",
      zcbz: "",
      jsr: "",
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
      srje: "",
      srfl: "",
      srbz: "",
      zcje: "",
      zcfl: "",
      zcbz: "",
      jsr: "",
    })
  },






  add1: function () {
    var _this = this
    let user = _this.data.userInfo.Company;
    console.log(_this.data.rq)
    console.log(_this.data.srje)
    console.log(_this.data.srfl)
    console.log(_this.data.srbz)
    console.log(_this.data.zcje)
    console.log(_this.data.zcfl)
    console.log(_this.data.zcbz)
    console.log(_this.data.jsr)
    if (_this.data.jsr != "" ) {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "insert into income(rgdate,money,msort,mremark,paid,psort,premark,handle,Company) values('" + _this.data.rq + "','" + _this.data.srje + "','" + _this.data.srfl + "','" + _this.data.srbz + "','" + _this.data.zcje +"','" + _this.data.zcfl +"','" + _this.data.zcbz +"','" + _this.data.jsr + "','"+user+"')"
        },
        success: res => {
          


          _this.setData({
            rq: "",
            srje: "",
            srfl: "",
            srbz: "",
            zcje: "",
            zcfl: "",
            zcbz: "",
            jsr: "",
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31']
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
      rq: _this.data.list[e.currentTarget.dataset.index].rgdate, 
      srje: _this.data.list[e.currentTarget.dataset.index].money,
      srfl: _this.data.list[e.currentTarget.dataset.index].msort,
      srbz: _this.data.list[e.currentTarget.dataset.index].mremark,
      zcje: _this.data.list[e.currentTarget.dataset.index].paid, 
      zcfl: _this.data.list[e.currentTarget.dataset.index].psort,
      zcbz: _this.data.list[e.currentTarget.dataset.index].premark,
      jsr: _this.data.list[e.currentTarget.dataset.index].handle,
      
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.jsr != "" ) {
      wx.cloud.callFunction({
        name: 'sql_jiaowu',
        data: {
          sql: "update income set rgdate='" + _this.data.rq + "',money='" + _this.data.srje + "',msort='" + _this.data.srfl + "',mremark='" + _this.data.srbz + "',paid='" + _this.data.zcje + "',psort='" + _this.data.zcfl + "',premark='" + _this.data.zcbz + "',handle='" + _this.data.jsr + "' where ID='" + _this.data.id +"'"
        },
        success: res => {
          _this.setData({
            rq: "",
            srje: "",
            srfl: "",
            srbz: "",
            zcje: "",
            zcfl: "",
            zcbz: "",
            jsr: "",
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31']
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
          sql: "delete from income where ID='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            rq: "",
            srje: "",
            srfl: "",
            srbz: "",
            zcje: "",
            zcfl: "",
            zcbz: "",
            jsr: "",
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31']
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
    })
  },
  tubiao:function(){
    var _this = this
    if(_this.data.quanxian_cha != '√'){
      wx.showToast({
        title: '无查询权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    wx.navigateTo({
      url: "../tubiao/tubiao?userInfo="+JSON.stringify(_this.data.userInfo) + "&huizong_list=" + JSON.stringify(_this.data.huizong_list)
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

    var e = [_this.data.riqi1,_this.data.riqi2]
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