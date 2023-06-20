var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    companyName: "",
    jiaqi: [],
    jiaqiLength: 0,
    kaoqin_array:['出勤','旷勤','请假','迟到','早退'],
    maxpagenumber: 0,
    isMaskWindowShow: false,
    maskWindowList: ['全局姓名查询', '当月姓名查询'],
    selectIndex: -1,
    isMaskWindowInputShow: false,
    maskWindowInputValue: '',
    isSearch: false,
    picker_disabled:'true',

    type: 0,
    startYear: 1980,
    endYear: 2100,
    cancelColor: "#888",
    color: "#5677fc",
    setDateTime: "",
    title_year1: '',
    title_month1: '',
    title_year2: '',
    title_month2: '',
    title_year3: '',
    title_month3: '',
    this_date:'',


    sql: '',
    sql2: '',
    animationData: "",
    tabIndex: 26,
    leftDrawer: false,
    mode: "left",
    scrollTop: null,
    list: [],
    excelList:[],
    title:[],
    title1: [{
        text: "姓名",
        width: 20,
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "年",
        width: 20,
        columnName: "year",
        type: "text",
        isupd: true
      },
      {
        text: "月",
        width: 20,
        columnName: "moth",
        type: "text",
        isupd: true
      },
      {
        text: "1",
        width: 20,
        columnName: "E",
        type: "text",
        isupd: true
      },
      {
        text: "2",
        width: 20,
        columnName: "F",
        type: "text",
        isupd: true
      },
      {
        text: "3",
        width: 20,
        columnName: "G",
        type: "text",
        isupd: true
      },
      {
        text: "4",
        width: 20,
        columnName: "H",
        type: "text",
        isupd: true
      },
      {
        text: "5",
        width: 20,
        columnName: "I",
        type: "text",
        isupd: true
      },
      {
        text: "6",
        width: 20,
        columnName: "J",
        type: "text",
        isupd: true
      },
      {
        text: "7",
        width: 20,
        columnName: "K",
        type: "text",
        isupd: true
      },
      {
        text: "8",
        width: 20,
        columnName: "L",
        type: "text",
        isupd: true
      },
      {
        text: "9",
        width: 20,
        columnName: "M",
        type: "text",
        isupd: true
      },
      {
        text: "10",
        width: 20,
        columnName: "N",
        type: "text",
        isupd: true
      },
      {
        text: "11",
        width: 20,
        columnName: "O",
        type: "text",
        isupd: true
      },
      {
        text: "12",
        width: 20,
        columnName: "P",
        type: "text",
        isupd: true
      },
      {
        text: "13",
        width:20,
        columnName: "Q",
        type: "text",
        isupd: true
      },
      {
        text: "14",
        width: 20,
        columnName: "R",
        type: "text",
        isupd: true
      },
      {
        text: "15",
        width: 20,
        columnName: "S",
        type: "text",
        isupd: true
      },
      {
        text: "16",
        width: 20,
        columnName: "T",
        type: "text",
        isupd: true
      },
      {
        text: "17",
        width: 20,
        columnName: "U",
        type: "text",
        isupd: true
      },
      {
        text: "18",
        width: 20,
        columnName: "V",
        type: "text",
        isupd: true
      },
      {
        text: "19",
        width: 20,
        columnName: "W",
        type: "text",
        isupd: true
      },
      {
        text: "30",
        width: 20,
        columnName: "X",
        type: "text",
        isupd: true
      },
      {
        text: "21",
        width: 20,
        columnName: "Y",
        type: "text",
        isupd: true
      },
      {
        text: "22",
        width: 20,
        columnName: "Z",
        type: "text",
        isupd: true
      },
      {
        text: "23",
        width: 20,
        columnName: "AA",
        type: "text",
        isupd: true
      },
      {
        text: "24",
        width: 20,
        columnName: "AB",
        type: "text",
        isupd: true
      },
      {
        text: "25",
        width: 20,
        columnName: "AC",
        type: "text",
        isupd: true
      },
      {
        text: "26",
        width: 20,
        columnName: "AD",
        type: "text",
        isupd: true
      },
      {
        text: "27",
        width: 20,
        columnName: "AE",
        type: "text",
        isupd: true
      },
      {
        text: "28",
        width: 20,
        columnName: "AF",
        type: "text",
        isupd: true
      },
      {
        text: "29",
        width: 20,
        columnName: "AG",
        type: "text",
        isupd: true
      },
      {
        text: "30",
        width: 20,
        columnName: "AH",
        type: "text",
        isupd: true
      },
      {
        text: "31",
        width: 20,
        columnName: "AI",
        type: "text",
        isupd: true
      },
      {
        text: "全勤天数",
        width: 20,
        columnName: "AJ",
        type: "text",
        isupd: true
      },
      {
        text: "实际天数",
        width: 20,
        columnName: "AK",
        type: "text",
        isupd: true
      },
      {
        text: "请假时间/小时",
        width: 20,
        columnName: "AL",
        type: "text",
        isupd: true
      },
      {
        text: "加班时间/小时",
        width: 20,
        columnName: "AM",
        type: "text",
        isupd: true
      },
      {
        text: "迟到天数",
        width: 20,
        columnName: "AN",
        type: "text",
        isupd: true
      },
    ],
    page: "1",
    IsLastPage: false,
    moth: '',
    name: '',
    edit_cell: '',
    modal9: false,
    mark: '',
    edit_new: '',
    id: '',
    lie: "",
    text_type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var time = util.newTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    _this.setData({
      time: time,
      companyName: options.companyName,
      result: JSON.parse(options.access)
    });

    wx.setNavigationBarTitle({
      title: '考勤表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    console.log('onLoad:')
    var that = this

    /*  不让onload刷新出数据，从选择日期开始刷出数据
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 (2+2*moth+3*(moth+1)/5+[year]+[year]/4-[year]/100+[year]/400)%7 as xingqi, * from gongzi_kaoqinjilu "
      },
      success: res => {
        if (res.result.recordset.length < 100) {
          that.setData({
            list: res.result.recordset,
            IsLastPage: true
          })
          console.log(that.data.list)
        } else {
          that.setData({
            list: res.result.recordset
          })
        }
      },
      err: res => {
        console.log("错误!")
      }
    })
    */

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select kaoqinbiao from gongzi_title where kaoqinbiao is not null and kaoqinbiao != ''"
      },
      success: res => {
        console.log(res.result.recordsets[0]);
        this.setData({

          title: res.result.recordsets[0]
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

  },

  bindPickerChange: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      edit_old: _this.data.kaoqin_array[e.detail.value]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dateTime = this.selectComponent("#tui-dateTime-ctx")
    var that = this

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_kaoqinjilu where AO = '" + that.data.companyName + "'"
      },
      success: res => {
        console.log(that.data.companyName);
        that.setData({
          maxpagenumber: Math.ceil(res.result.recordset[0].maxpagenumber / 100)
        })
        console.log(that.data.maxpagenumber)
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select day,month,year from gongzi_peizhi where day is not null and gongsi = '" + that.data.companyName + "'"
      },
      success: res => {
        console.log("假期:", res.result.recordset.length)
        that.setData({
          jiaqi: res.result.recordset,
          jiaqiLength: res.result.recordset.length
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },


  //月份选择器
  show1: function (e) {
    this.setData({
      cancelColor: "#888",
      color: "#5677fc",
      setDateTime: "",
      startYear: 1980,
      endYear: 2100,
      this_date:1
    })
    this.setData({
      type: 3 //选的是第三个类型的🔨UI
    })
    this.dateTime.show();
  },
  show2: function (e) {
    this.setData({
      cancelColor: "#888",
      color: "#5677fc",
      setDateTime: "",
      startYear: 1980,
      endYear: 2100,
      this_date:2
    })
    this.setData({
      type: 3 //选的是第三个类型的🔨UI
    })
    this.dateTime.show();
  },

  show3: function (e) {
    this.setData({
      cancelColor: "#888",
      color: "#5677fc",
      setDateTime: "",
      startYear: 1980,
      endYear: 2100,
      this_date:3
    })
    this.setData({
      type: 3 //选的是第三个类型的🔨UI
    })
    this.dateTime.show();
  },

  change: function (e) {
    var that = this
    console.log(e.detail)
    var month = e.detail.month
    console.log(month.length)
    if(month.length == 1){
      month = "0" + month
    }
    console.log(month)
    if (that.data.this_date == 1){
      that.setData({
        title_month1: month,
        title_year1: e.detail.year
      })
    }else if(that.data.this_date == 2){
      that.setData({
        title_month2: month,
        title_year2: e.detail.year
      })
    }else if(that.data.this_date == 3){
      that.setData({
        title_month3: month,
        title_year3: e.detail.year
      })
    }
    
    var title_year1 = that.data.title_year1
    var title_year2 = that.data.title_year2
    var title_year3 = that.data.title_year3
    var title_month1 = that.data.title_month1
    var title_month2 = that.data.title_month2
    var title_month3 = that.data.title_month3
    

    if (title_year1 == ''){
      title_year1 = "1900"
      title_month1 = "01"
    }
    if (title_year2 == ''){
      title_year2 = "2100"
      title_month2 = "12"
    }
    if(that.data.this_date ==1 || that.data.this_date ==2){
      var sql = "select top 100 (2+2*moth+3*(moth+1)/5+[year]+[year]/4-[year]/100+[year]/400)%7 as xingqi, * from gongzi_kaoqinjilu where year+moth >= " + title_year1 + title_month1 + " and year+moth <=" + title_year2 + title_month2 + " and AO = '" + this.data.companyName + "' order by year desc,moth desc"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        console.log('change', res)
        if (res.result.recordset.length < 100) {
          that.setData({
            list: res.result.recordset,
            IsLastPage: true
          })
          console.log(that.data.list)
        } else {
          that.setData({
            list: res.result.recordset
          })
        }
      },
      err: res => {
        console.log("错误!")
      }
    })
    }else if(that.data.this_date ==3){
      console.log(title_month3)
      if (title_month3 != '' && title_year3 != '') {
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: "insert into gongzi_kaoqinjilu (name,moth,year,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE,AF,AG,AH,AI,AO) VALUES ('请输入','" + title_month3 + "','" + title_year3 + "','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','" + that.data.companyName + "')"
          },
          success: res => {
            console.log("插入成功")
            that.baochi()
          },
          err: res => {
            console.log("错误!", res)
          }
        })
      } else {
        wx.showToast({
          title: '请先选择年月份',
          icon: 'none',
          duration: 2200,
        })
      }
    }
  },

  //全勤天数和每年不同的法定休假日写入
  jiaqi_refresh: function (e) {
    var _this = this
    //点击关闭左遮罩
		var time = new Date();
		var year = time.getFullYear();
		var month = time.getMonth()+1;
    var column_arr = ['E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN']
    var this_date = format()
    var day = new Date(year,month,0).getDate()
    var sql = ""
    for(var i=1; i<=day; i++){
      var this_date2 = this_date + "-" + i
      if(i<10){
        this_date2 = this_date + "-0" + i
      }
      var week = new Date(this_date2).getDay();
      if(sql == "" && (week == 0 || week == 6)){
        sql = "update gongzi_kaoqinjilu set " + column_arr[i-1] + "='休'"
      }else if(sql != "" && (week == 0 || week == 6)){
        sql = sql + "," + column_arr[i-1] + "='休'"
      }
    }
    if(sql != ''){
      if(month < 10){
        month = "0" + month
      }
      sql = sql + " where year='" + year + "' and moth='" + month + "'"
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: sql
        },
        success: res => {
          wx.showToast({
            title: '完成',
            icon: 'none',
            duration: 2200,
          })
          _this.baochi()
        },
        err: res => {
          console.log("错误!", res)
        }
      })
    }
  },

    dangyue_refresh: function (e) {
      var _this = this
      //点击关闭左遮罩
      var time = new Date();
      var year = time.getFullYear();
      var month = time.getMonth()+1;
      var column_arr = ['E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN']
      var sql = ""
      for(var i=1; i<=31; i++){
        if(sql == ""){
          sql = "update gongzi_kaoqinjilu set " + column_arr[i-1] + "=''"
        }else{
          sql = sql + "," + column_arr[i-1] + "=''"
        }
      }
      if(sql != ''){
        if(month < 10){
          month = "0" + month
        }
        sql = sql + " where year='" + year + "' and moth='" + month + "'"
        console.log(sql)
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: sql
          },
          success: res => {
            wx.showToast({
              title: '完成',
              icon: 'none',
              duration: 2200,
            })
            _this.baochi()
          },
          err: res => {
            console.log("错误!", res)
          }
        })
      }
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

  },




  /*刷新页面 */
  shuaxin: function (e) {
    var that = this
    //点击关闭左遮罩
    const mode = e.currentTarget.dataset.mode;
    if (mode == "left") {
      this.setData({
        leftDrawer: false
      })
    } else {
      this.setData({
        rightDrawer: false
      })
    }
    //刷新页面
    that.baochi()

    wx.showToast({
      title: '同步数据成功',
      icon: 'none'
    })
  },

  /*函数名：统计
  描述：统计当月每位员工实际出勤的天数
  作者：117
  时间：2020/5/22
  */
  tongji: function (e) {
    var that = this
    //点击关闭左遮罩
    const mode = e.currentTarget.dataset.mode;
    if (mode == "left") {
      this.setData({
        leftDrawer: false
      })
    } else {
      this.setData({
        rightDrawer: false
      })
    }
    //考勤统计部分
    var length = that.data.list.length //共有多少行
    var quanqin = [length]
    var shijitianshu = [length] //实到
    var qingjia = [length] //请假
    var jiaban = [length] //加班
    var chidao = [length] //迟到
    var day = [31] //标记位
    var initial = [0, 0, ] //初始化数组，为了让没初始化的数组可以自增操作
    var monthLength = 0
    for (var loop = 0; loop < length; loop++) {
      day[1] = that.data.list[loop].E
      day[2] = that.data.list[loop].F
      day[3] = that.data.list[loop].G
      day[4] = that.data.list[loop].H
      day[5] = that.data.list[loop].I
      day[6] = that.data.list[loop].J
      day[7] = that.data.list[loop].K
      day[8] = that.data.list[loop].L
      day[9] = that.data.list[loop].M
      day[10] = that.data.list[loop].N
      day[11] = that.data.list[loop].O
      day[12] = that.data.list[loop].P
      day[13] = that.data.list[loop].Q
      day[14] = that.data.list[loop].R
      day[15] = that.data.list[loop].S
      day[16] = that.data.list[loop].T
      day[17] = that.data.list[loop].U
      day[18] = that.data.list[loop].V
      day[19] = that.data.list[loop].W
      day[20] = that.data.list[loop].X
      day[21] = that.data.list[loop].Y
      day[22] = that.data.list[loop].Z
      day[23] = that.data.list[loop].AA
      day[24] = that.data.list[loop].AB
      day[25] = that.data.list[loop].AC
      day[26] = that.data.list[loop].AD
      day[27] = that.data.list[loop].AE
      day[28] = that.data.list[loop].AF
      day[29] = that.data.list[loop].AG
      day[30] = that.data.list[loop].AH
      day[31] = that.data.list[loop].AI

      //判断月份对应的每月天数，只计算天数内的数据，超出部分记为错误
      if (that.data.list[loop].moth == 1 || that.data.list[loop].moth == 3 || that.data.list[loop].moth == 5 || that.data.list[loop].moth == 7 || that.data.list[loop].moth == 8 || that.data.list[loop].moth == 10 || that.data.list[loop].moth == 12) {
        monthLength = 31
      } else if (that.data.list[loop].moth == 4 || that.data.list[loop].moth == 6 || that.data.list[loop].moth == 9 || that.data.list[loop].moth == 11) {
        monthLength = 30
      } else if (that.data.list[loop].moth == 2 || that.data.list[loop].year % 4 == 0) {
        monthLength = 29
      } else if (that.data.list[loop].moth == 2 || that.data.list[loop].year % 4 != 0) {
        monthLength = 28
      }
      initial[1] = monthLength

      //利用标记位赋值函数， shijitianshu == 实际出勤天数 
      for (var i = 1; i < monthLength + 1; i++) {
        if (i == 1) { //数组初始化，保证正常运行！
          quanqin[loop] = initial[1] //全勤天数的计算思路是当月天数减去休假天数，所以先给赋值上本月天数，然后跟着循环减
          shijitianshu[loop] = initial[0]
          chidao[loop] = initial[0]
          qingjia[loop] = initial[0]
          jiaban[loop] = initial[0]
        }
        if (day[i] == '休') {
          quanqin[loop]--
        } else if (day[i] == '卡') {
          shijitianshu[loop]++
        } else if (day[i] == '迟') {
          chidao[loop]++
        } else if (day[i] == '请1') {
          qingjia[loop] = qingjia[loop] + 1
        } else if (day[i] == '请2') {
          qingjia[loop] = qingjia[loop] + 2
        } else if (day[i] == '请3') {
          qingjia[loop] = qingjia[loop] + 3
        } else if (day[i] == '请4') {
          qingjia[loop] = qingjia[loop] + 4
        } else if (day[i] == '请5') {
          qingjia[loop] = qingjia[loop] + 5
        } else if (day[i] == '请6') {
          qingjia[loop] = qingjia[loop] + 6
        } else if (day[i] == '请7') {
          qingjia[loop] = qingjia[loop] + 7
        } else if (day[i] == '加1') {
          jiaban[loop] = jiaban[loop] + 1
        } else if (day[i] == '加2') {
          jiaban[loop] = jiaban[loop] + 2
        } else if (day[i] == '加3') {
          jiaban[loop] = jiaban[loop] + 3
        } else if (day[i] == '加4') {
          jiaban[loop] = jiaban[loop] + 4
        } else if (day[i] == '加5') {
          jiaban[loop] = jiaban[loop] + 5
        } else if (day[i] == '加6') {
          jiaban[loop] = jiaban[loop] + 6
        } else if (day[i] == '加7') {
          jiaban[loop] = jiaban[loop] + 7
        }
      }
      day = []
    }

    //更新实际天数并写入,实际天数=shijitianshu
    for (var ii = 0; ii < length; ii++) {
      //拼接  实际出勤天数的统计 + 请假 + 加班 + 迟到
      that.data.sql = that.data.sql + "update gongzi_kaoqinjilu set AJ = " + quanqin[ii] + " where id =" + that.data.list[ii].id + " and AO = '" + that.data.companyName + "';" + "update gongzi_kaoqinjilu set AK = " + shijitianshu[ii] + " where id =" + that.data.list[ii].id + " and AO = '" + that.data.companyName + "';" + "update gongzi_kaoqinjilu set AL = " + qingjia[ii] + " where id =" + that.data.list[ii].id + " and AO = '" + that.data.companyName + "';" + "update gongzi_kaoqinjilu set AM = " + jiaban[ii] + " where id =" + that.data.list[ii].id + " and AO = '" + that.data.companyName + "';" + "update gongzi_kaoqinjilu set AN = " + chidao[ii] + " where id =" + that.data.list[ii].id + "and AO = '" + that.data.companyName + "';"
    }
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: that.data.sql
      },
      success: res => {
        console.log("加载完成！")
      },
      fail: err => {},
      complete: () => {
        //置空
        that.setData({
          sql: ''
        })
      }
    })
    that.onLoad()
    that.baochi()

    wx.showToast({
      title: '统计成功，请同步数据后查看...',
      icon: 'none',
      duration: 1500
    })
  },


  /*************************************下面是自定义函数，请谨慎修改***********************************/

  /*该自定义模态弹窗来自Thor UI，感谢 */
  /*函数块名称：自定义可输入弹窗的传值和编辑
    描述：自定义一个可输入的遮罩层弹窗，用的form形式，提交修改mssql数据库执行update
    作者：117
    时间：2020/5/21
  */
  edit_cell(e) {
    var that = this
    console.log(that.data.edit_old)
    if (e.detail.value.value.length == 0) { //如果输入为空则保持原来的值
      that.setData({
        edit_new: that.data.edit_old
      })
    } else if (e.detail.value.value.length != 0) {
      that.setData({
        edit_new: e.detail.value.value
      })
    }
    console.log("选中单元格的信息：", that.data.id, that.data.name, that.data.edit_old) //that.data.edit_old的是单元格修改之前的值
    console.log("提交成功，得到的值为:", that.data.edit_new)

    //通过云函数修改数据库内容
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update gongzi_kaoqinjilu set " + that.data.mark + " = '" + that.data.edit_new + "' where id = '" + that.data.id + "' and AO = '" + that.data.companyName + "'"
      },
      success: res => {
        console.log('操作成功')
        //成功说明insert操作已经执行，则清除所有的标记
        that.setData({
          id: "",
          name: "",
          edit_old: "",
          edit_new: "",
        })
        that.hide9()
        that.baochi()
      },
      err: res => {
        console.log("错误!")
      }
    })
  },
  click_edit(e) {
    var that = this
    if (that.data.result.upd != 1) {
      wx.showToast({
        title: '您没有权限',
        icon: 'none'
      })
      return
    }
    console.log(e)
    var lie = e.currentTarget.dataset.doinb
    var text_type
    var picker_disabled = true
    if (lie == "AJ" || lie == "AK" || lie == "AL" || lie == "AM" || lie == "AN") {
      text_type = "number"
    } else {
      text_type = "text"
    }

    if (lie == "E" || lie == "F" || lie == "G" || lie == "H" || lie == "I" || lie == "J" || lie == "K" || lie == "L" || lie == "M" || lie == "N" || lie == "O" || lie == "P" || lie == "Q" || lie == "R" || lie == "S" || lie == "T" || lie == "U" || lie == "V" || lie == "W" || lie == "X" || lie == "Y" || lie == "Z" || lie == "AA" || lie == "AB" || lie == "AC" || lie == "AD" || lie == "AE" || lie == "AF" || lie == "AG" || lie == "AH" || lie == "AI") {
      var picker_disabled = false
    }
    var collection = e.currentTarget.dataset
    that.setData({
      text_type: text_type,
      id: collection.id,
      name: collection.name,
      edit_old: collection.x,
      mark: collection.doinb, //这个值是传过来的该列在mssql数据库的【列标】，也是json数组中的标记位，因为标记为不能取到，所以只能一个一个在WXML中定义，然后传值（老板说json取不到标记位，我现在时间紧迫没时间研究，等有空了重看代码的时候再研究！）
      modal9: true,
      picker_disabled:picker_disabled
    })
    console.log(that.data.id, that.data.name, that.data.edit_old, that.data.modal9)
    console.log("对应数据库中查找的标记位为:", that.data.mark)
  },
  //通过清除标记位modal9，来隐藏弹窗的控制函数
  hide9() {
    var that = this
    //清除标记位
    that.setData({
      modal9: false,
      // edit_old: ''
    })
    console.log("隐藏自定义可输入弹窗！！")
  },





  /*
  函数块名称：1.点击编辑单元格，弹出输入模态对话框  2.长按删除单元格对应的数据库中的列
  作者：117
  时间：2020/5/20
  */

  click_delete: function (e) {
    var that = this
    if (that.data.result.del != 1) {
      wx.showToast({
        title: '您没有权限',
        icon: 'none'
      })
      return;
    }
    var $collection = e.currentTarget.dataset
    var id = $collection.id
    var name = $collection.name
    var month = $collection.moth
    var year = $collection.year
    console.log(id, name, month, year)
    wx.showModal({
      title: '警告',
      content: '正在删除姓名为' + name + "的" + year + "年" + month + "月的考勤\r\n删除后不能恢复\r\n请选择操作",
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      cancelColor: '', //取消文字的颜色
      confirmText: "删除", //默认是“确定”
      confirmColor: '#DD5044', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
          //这里可以callfunction！！！！
        } else {
          //点击删除
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: "delete from gongzi_kaoqinjilu where id =" + id + " and AO = '" + that.data.companyName + "'"
            },
            success: res => {
              console.log("成功删除")
              that.baochi()
            },
            fail: err => {
              console.log("失败!!!!")
            }
          })
          wx.showToast({
            title: '已删除，姓名：' + name,
            icon: 'none'
          })
        }
      },
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })

    //修改之后刷新页面
  },




  /*
  函数块名称：分页逻辑
  作者：117
  时间：2020/5/15
  */
  //内嵌列表查找上一页数据
  lastpage: function () {
    var that = this
    console.log("1:islastpage?:", that.data.IsLastPage)
    //点击上一页，则取消最后一页的状态标记(但是如果是第一页则不取消标记状态，因为第一页又是最后一页的情况存在)
    if (that.data.IsLastPage && !(that.data.page == 1)) {
      that.data.IsLastPage = false
    }
    console.log("2:islastpage?:", that.data.IsLastPage)
    //判断第一页和上一页的翻页
    if (that.data.page == 1) {
      wx.showToast({
        title: '已经是第一页',
        icon: 'none'
      })
    } else {
      that.data.page--
      wx.showToast({
        title: '正在加载第' + that.data.page + '页',
        icon: 'none',
        duration: 2500
      })

      var title_year1 = that.data.title_year1
      var title_year2 = that.data.title_year2
      var title_month1 = that.data.title_month1
      var title_month2 = that.data.title_month2

      if (title_year1 == ''){
        title_year1 = "1900"
        title_month1 = "01"
      }
      if (title_year2 == ''){
        title_year2 = "2100"
        title_month2 = "12"
      }

      var sql = "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, (2+2*moth+3*(moth+1)/5+[year]+[year]/4-[year]/100+[year]/400)%7 as xingqi, * from gongzi_kaoqinjilu where year+moth >= " + title_year1 + title_month1 + " and year+moth <=" + title_year2 + title_month2 + ") temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and AO = '" + that.data.companyName + "' order by year,moth"

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: sql
        },
        success: res => {
          console.log("上一页进入成功：第" + this.data.page + "页")
          that.setData({
            list: res.result.recordset
          })
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {
          that.setData({
            page: this.data.page
          })
        }
      })
    }
  },
  //内嵌列表查找下一页数据
  nextpage: function () {
    var that = this
    console.log("islastpage?:", that.data.IsLastPage)
    //通过Islastpage判断是否为最后一页
    //如果第一页是最后一页，则在onload里第一次setdata中将Islastpage置true
    if (that.data.IsLastPage) {
      wx.showToast({
        title: '已经是最后一页',
        icon: 'none'
      })
    } else {
      that.data.page++
      wx.showToast({
        title: '正在加载第' + that.data.page + '页',
        icon: 'none',
        duration: 2500
      })

      var title_year1 = that.data.title_year1
      var title_year2 = that.data.title_year2
      var title_month1 = that.data.title_month1
      var title_month2 = that.data.title_month2

      if (title_year1 == ''){
        title_year1 = "1900"
        title_month1 = "01"
      }
      if (title_year2 == ''){
        title_year2 = "2100"
        title_month2 = "12"
      }

      var sql = "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, (2+2*moth+3*(moth+1)/5+[year]+[year]/4-[year]/100+[year]/400)%7 as xingqi, * from gongzi_kaoqinjilu where year+moth >= " + title_year1 + title_month1 + " and year+moth <=" + title_year2 + title_month2 + ") temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and AO = '" + that.data.companyName + "' order by year,moth"

      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: sql
        },
        success: res => {
          console.log("返回长度", res.result)
          //长度不为0则说明不是最后一页，可以输出
          if (res.result.recordset.length != 0) {
            console.log("下一页进入成功：第" + that.data.page + "页")
            that.setData({
              list: res.result.recordset,
            })
          }
          //输出的长度小于100，则本页的下一页是最后一页，将标记置true
          if (res.result.recordset.length < 100) {
            that.setData({
              IsLastPage: true
            })
            console.log("抵达最后一页")
          }
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {
          that.setData({
            page: this.data.page
          })
        }
      })
    }
  },








  /*
    函数块名称：左侧遮罩层
    作者：117
    时间：2020/5/14
    描述：功能按钮滑出操作区域的组件函数，包括从左侧，右侧，底部滑出，本项目只应用到从左侧滑出
    具体功能详见Thor UI 开发文档
    修改时间：
  */
  showModal: function () {
    console.log("触发函数")
    // 显示遮罩层
    // 创建动画实例 
    var animation = wx.createAnimation({
      duration: 220,
      timingFunction: "linear",
      delay: 0
    })
    //执行第一组动画：Y轴偏移500px后(盒子高度是500px) ，停
    animation.translateY(500).step()
    //导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    this.setData({
      showModalStatus: false
    })
  },
  //这是从底部弹出的模态窗口的，尚未应用的扩展模块，不要在意
  getRegion: function (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      regionTxt: this.data.regionArr[index],
      tabIndex: index,
      showModalStatus: false
    })
    wx.showToast({
      title: '您选择了：' + this.data.regionArr[index],
      icon: "none"
    })
  },
  closeDrawer(e) {
    const mode = e.currentTarget.dataset.mode;
    if (mode == "left") {
      this.setData({
        leftDrawer: false
      })
    } else {
      this.setData({
        rightDrawer: false
      })
    }
  },
  rightDrawer() {
    this.setData({
      rightDrawer: true
    })
  },
  leftDrawer() {
    var _this = this;
    if (_this.data.title_month == "" || _this.data.title_year == "") {
      wx.showToast({
        title: '请选择年月',
        icon: "none"
      })
      return;
    }
    _this.setData({
      leftDrawer: true
    })
  },




  /*
    函数块名称:页面处理四小龙！
    描述：
        1.baochi保持页面的页数并刷新
        2.shuaxin  刷新页面，保持页数，调用了baochi()
        3.chazhao  查找
        4.tianjia  添加，调用baochi()
    其中核心模块是保持
    作者：117
    时间:2020/5/25
  */


  //用于刷新页面时保持页数，或者跳转到某一页
  baochi: function () {
    var that = this
    // var sql ="select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, (2+2*moth+3*(moth+1)/5+[year]+[year]/4-[year]/100+[year]/400)%7 as xingqi, * from gongzi_kaoqinjilu where year+moth >= " + that.data.title_year1 + that.data.title_moth1 +"and year+moth <=" + that.data.title_year2 + that.data.title_month2 + ") temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and AO ='" + that.data.companyName + "' order by year,moth"
    // wx.cloud.callFunction({
    //   name: 'sqlServer_117',
    //   data: {
    //     query: sql
    //   },
    //   success: res => {
    //     console.log(sql)
    //     this.setData({
    //       list: res.result.recordset,
    //       isSearch: false
    //     })
    //   },
    //   err: res => {
    //     console.log("错误!", res)
    //   }
    // })

    wx.cloud.callFunction({
      name: "sqlServer_117",
      data: {
        query: "select top 100 * from gongzi_kaoqinjilu where name like'%%' and AO like '%%' order by year,moth"
      },
      success: res => {
        console.log("姓名查询成功！", res.result)
        that.setData({
          list: res.result.recordset,
          isSearch: true
        })
      },
      err: res => {
        console.log("错误!", res)
      },
      complete: () => {

      }
    })
  },


  /*刷新页面 */
  shuaxin: function (e) {
    var that = this
    //点击关闭左遮罩
    const mode = e.currentTarget.dataset.mode;
    if (mode == "left") {
      this.setData({
        leftDrawer: false
      })
    } else {
      this.setData({
        rightDrawer: false
      })
    }
    that.baochi()
    wx.showToast({
      title: '同步数据成功',
      icon: 'none'
    })
  },

  //查找 ---- 失效！
  chazhao: function (e) {

    var that = this
    //按照姓名，部门，职务三个查找？e中包含三个数值
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 * from gongzi_kaoqinjilu where name = '" + that.data.name + "' and moth = '" + that.data.title_month + "' and year = '" + that.data.title_year + "' and AO = '" + that.data.companyName + "' order by year,moth"
      },
      success: res => {
        console.log("查找成功")
        this.setData({
          list: res.result.recordset,
          title_month: '',
          title_year: ''
        })
      },
      err: res => {
        console.log("错误!", res)
      }
    })
  },

  //添加
  tianjia: function () {
    var that = this
    var month = that.data.title_month
    var year = that.data.title_year

    if (month != '' && year != '') {
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "insert into gongzi_kaoqinjilu (name,moth,year,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE,AF,AG,AH,AI,AO) VALUES ('请输入'," + month + "," + year + ",'-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','" + that.data.companyName + "')"
        },
        success: res => {
          console.log("插入成功")
          
          that.baochi()
        },
        err: res => {
          console.log("错误!", res)
        }
      })
    } else {
      wx.showToast({
        title: '请先选择年月份\r\n点击"年月份选择"',
        icon: 'none',
        duration: 2200,
      })
    }
  },


  /*函数名称：单选查询自定义蒙版
    作者：117
    时间：2020/5/26
  */
  /**
   * 取消操作
   */
  cancel: function (text) {
    // 实际取消操作
  },

  /**
   * 页面查询按钮功能
   */
  searchBtn: function (e) {
    var _this = this;
    if (_this.data.title_month == "" || _this.data.title_year == "") {
      wx.showToast({
        title: '请选择年月',
        icon: "none"
      })
      return;
    }
    _this.showMaskWindow();
  },

  //弹框以外区域点击
  maskWindowBgClick: function (e) {
    this.dismissMaskWindow();
  },

  //弹窗区域点击事件
  clickTap: function (e) {

  },

  //切换选择项事件
  maskWindowTableSelect: function (e) {
    var index = e.currentTarget.dataset.windowIndex;
    this.setData({
      selectIndex: e.currentTarget.dataset.windowIndex,
      isMaskWindowInputShow: true
    })
  },

  //输入框输入绑定事件
  maskWindowInput: function (e) {
    var value = e.detail.value;
    var that = this
    this.setData({
      maskWindowInputValue: value
    })
    console.log(value)
    console.log(that.data.selectIndex)
  },

  //点击确定按钮之后的事件
  maskWindowOk: function (e) {
    var that = this
    var index = that.data.selectIndex;
    var input = that.data.maskWindowInputValue;
    console.log(input)

    var title_year1 = that.data.title_year1
    var title_year2 = that.data.title_year2
    var title_month1 = that.data.title_month1
    var title_month2 = that.data.title_month2

    if (title_year1 == ''){
      title_year1 = "1900"
      title_month1 = "01"
    }
    if (title_year2 == ''){
      title_year2 = "2100"
      title_month2 = "12"
    }
    if (index == 0) {
      //按姓名查询
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "select top 100 * from gongzi_kaoqinjilu where name like'%" + input + "%' and AO = '" + that.data.companyName + "' order by year,moth"
        },
        success: res => {
          console.log("姓名查询成功！", res.result)
          that.setData({
            list: res.result.recordset,
            isSearch: true
          })
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {

        }
      })
    } else if (index == 1) {
      wx.cloud.callFunction({
        name: "sqlServer_117",
        data: {
          query: "select top 100 * from gongzi_kaoqinjilu where name like '%" + input + "%' and year+moth >= '" +title_year1 + title_month1 + "' and year+moth <= '" + title_year2 + title_month2 + "' and AO = '" + that.data.companyName + "' order by year,moth"
        },
        success: res => {
          console.log("姓名查询成功！", res.result)
          that.setData({
            list: res.result.recordset
          })
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {

        }
      })
    }


    //点击取消按钮后的操作
    this.cancel();
    this.dismissMaskWindow();
  },

  maskWindowCancel: function (e) {
    this.dismissMaskWindow();
  },

  // 显示蒙版弹窗
  showMaskWindow: function () {
    this.setData({
      isMaskWindowShow: true,
      selectIndex: -1,
      isMaskWindowInputShow: false,
      maskWindowInputValue: ""
    })
  },

  // 隐藏蒙版窗体
  dismissMaskWindow: function () {
    this.setData({
      isMaskWindowShow: false,
      selectIndex: -1,
      isMaskWindowInputShow: false,
      maskWindowInputValue: ""
    })
  },





  //打印模块
  dayin: function (e) {
    var that = this
    //点击关闭左遮罩
    const mode = e.currentTarget.dataset.mode;
    if (mode == "left") {
      this.setData({
        leftDrawer: false
      })
    } else {
      this.setData({
        rightDrawer: false
      })
    }
    console.log("当前页面list:", that.data.list)
    wx.showToast({
      title: '功能尚未开发',
      icon: 'none',
    })
  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    console.log(list)
    var title = _this.data.title1;
    console.log(title)
    var cloudList = {
      name : '考勤表',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:title[i].width,
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
})

function format()
	{
		//dataString是整数，否则要parseInt转换
		var time = new Date();
		var year = time.getFullYear();
		var month = time.getMonth()+1;
		var day = time.getDate();
		var hour = time.getHours();
		var minute = time.getMinutes();
		var second = time.getSeconds();
		return year+'-'+(month<10?'0'+month:month)
	}