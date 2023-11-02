// package_huaqun/page/zhguanli/zhguanli.js
const chooseLocation = requirePlugin('chooseLocation');
var QQMapWX = require("../utils/qqmap-wx-jssdk");
var qqmapsdk = new QQMapWX({
  key: 'KKRBZ-TBCW3-TXD37-OWJED-QYFPF-VYFCL'
});
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
    quanxian_type:['管理员','操作员','玻璃厂','客户'],
    quanxian_list:['是','否'],
    list: [],
    title: [{
        text: "账号",
        width: "250rpx",
        columnName: "username",
        type: "text",
        isupd: true
      },
      {
        text: "密码",
        width: "250rpx",
        columnName: "password",
        type: "text",
        isupd: true
      },
      {
        text: "公司",
        width: "250rpx",
        columnName: "company",
        type: "text",
        isupd: true
      },
      {
        text: "姓名",
        width: "250rpx",
        columnName: "name",
        type: "text",
        isupd: true
      },
      {
        text: "简码",
        width: "250rpx",
        columnName: "pinyin",
        type: "text",
        isupd: true
      },
      {
        text: "权限",
        width: "250rpx",
        columnName: "power",
        type: "text",
        isupd: true
      },
      {
        text: "区域",
        width: "250rpx",
        columnName: "quyu",
        type: "text",
        isupd: true
      },
      {
        text: "送货地址",
        width: "250rpx",
        columnName: "address_name",
        type: "text",
        isupd: true
      },
      {
        text: "填写铝框金额权限",
        width: "300rpx",
        columnName: "money",
        type: "text",
        isupd: true
      },
      {
        text: "审单权限",
        width: "250rpx",
        columnName: "shendan",
        type: "text",
        isupd: true
      },
      {
        text: "付款权限",
        width: "250rpx",
        columnName: "pay",
        type: "text",
        isupd: true
      },
      {
        text: "开料权限",
        width: "250rpx",
        columnName: "kailiao",
        type: "text",
        isupd: true
      },
      {
        text: "组装权限",
        width: "250rpx",
        columnName: "zuzhuang",
        type: "text",
        isupd: true
      },
      {
        text: "包装权限",
        width: "250rpx",
        columnName: "baozhuang",
        type: "text",
        isupd: true
      },
      // {
      //   text: "定位位置",
      //   width: "250rpx",
      //   columnName: "dingwei",
      //   type: "text",
      //   isupd: true
      // },
      // {
      //   text: "定位时间",
      //   width: "250rpx",
      //   columnName: "dingwei_shijian",
      //   type: "text",
      //   isupd: true
      // },
    ],
    quyu_list:[],
    id:'',
    username: '', 
    password: '',
    pinyin:'',
    name: '',
    power: '',
    money: '',
    shendan: '',
    pay: '',
    kailiao: '',
    zuzhuang: '',
    baozhuang: '',
    company:'',
    quyu:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var sql = "select isnull(quyu,'') as name from dropdowntable where isnull(quyu,'') != ''"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          quyu_list: list
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
    wx.getLocation({
      isHighAccuracy: true,
      type: 'gcj02',
      success (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          latitude: latitude,
          longitude: longitude,
         })
      }
     })
    var e = ['','']
    _this.tableShow(e)
  },

  header_xiala: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    var list2 = []
    console.log(list)
    for(var i=0; i< list.length; i++){
      var name = list[i].name
      console.log(name.indexOf(_this.data.quyu))
      if(name.indexOf(_this.data.quyu) > -1){
        list2.push({name:name})
      }
    }
    console.log(list2)
    _this.setData({
      list_xiala: list2,
      click_column:column,
    })
    console.log(list)
    _this.setData({
      xlShow2: true
    })
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      _this.setData({
        xlShow2: false,
        [click_column]:new_val
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },

  bindPickerChange1: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column_name
    console.log(_this.data.quanxian_type[e.detail.value])
    _this.setData({
      [column]: _this.data.quanxian_type[e.detail.value]
    })
  },

  bindPickerChange2: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column_name
    console.log(_this.data.quanxian_list[e.detail.value])
    _this.setData({
      [column]: _this.data.quanxian_list[e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select * from userInfo where name like '%" + e[0] + "%' and  power like '%" + e[1] + "%' order by username"
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
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

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  clickView:function(e){
    var _this = this
    console.log(e)
    var column = e.target.dataset.column
    if(column == 'address_name'){
      wx.showModal({
        title: '提示',
        content: '将跳转到地址选择，是否继续？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            _this.setData({
              id: _this.data.list[e.currentTarget.dataset.index].id,
            })
            const key = 'SEUBZ-4CGL4-YC3UO-FW2T5-W5DVT-QVFJJ'; //使用在腾讯位置服务申请的key
            const referer = '进销存云合'; //调用插件的app的名称
            const location = JSON.stringify({
              latitude: _this.data.latitude,
              longitude: _this.data.longitude
            });
            wx.navigateTo({
              url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      _this.setData({
        id: _this.data.list[e.currentTarget.dataset.index].id,
        username: _this.data.list[e.currentTarget.dataset.index].username, 
        password: _this.data.list[e.currentTarget.dataset.index].password,
        pinyin: _this.data.list[e.currentTarget.dataset.index].pinyin,
        company: _this.data.list[e.currentTarget.dataset.index].company,
        name: _this.data.list[e.currentTarget.dataset.index].name,
        power: _this.data.list[e.currentTarget.dataset.index].power,
        money:  _this.data.list[e.currentTarget.dataset.index].money,
        shendan:  _this.data.list[e.currentTarget.dataset.index].shendan,
        pay:  _this.data.list[e.currentTarget.dataset.index].pay,
        kailiao:  _this.data.list[e.currentTarget.dataset.index].kailiao,
        zuzhuang:  _this.data.list[e.currentTarget.dataset.index].zuzhuang,
        baozhuang:  _this.data.list[e.currentTarget.dataset.index].baozhuang,
        quyu:  _this.data.list[e.currentTarget.dataset.index].quyu,
        xgShow:true,
      })
    }
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      id:'',
      username: '', 
      password: '',
      pinyin:'',
      name: '',
      power: '',
      money: '',
      shendan: '',
      pay: '',
      kailiao: '',
      zuzhuang: '',
      baozhuang: '',
    })
  },
  add1: function(){
    var _this = this

    if(_this.data.username == ''){
      wx.showToast({
        title: '请输账号！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.password == ''){
      wx.showToast({
        title: '请输密码！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    if(_this.data.name == ''){
      wx.showToast({
        title: '请输姓名！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(_this.data.company == ''){
      wx.showToast({
        title: '请输公司！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(_this.data.power == ''){
      wx.showToast({
        title: '请输权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "insert into userInfo(username,password,name,pinyin,power,money,shendan,pay,kailiao,zuzhuang,baozhuang,company,quyu) values('" + _this.data.username + "','" + _this.data.password + "','" + _this.data.name + "','" + _this.data.pinyin + "','" + _this.data.power + "','" + _this.data.money + "','" + _this.data.shendan + "','" + _this.data.pay + "','" + _this.data.kailiao + "','" + _this.data.zuzhuang + "','" + _this.data.baozhuang + "','" + _this.data.company + "','" + _this.data.quyu + "')"
        },
        success: res => {
          _this.setData({
            id:'',
            username: '', 
            password: '',
            company: '',
            name: '',
            power: '',
            pinyin:'',
            money: '',
            shendan: '',
            pay: '',
            kailiao: '',
            zuzhuang: '',
            baozhuang: '',
            quyu:'',
          })
          _this.qxShow()
          var e = ['','']
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
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  upd1:function(){
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "update userInfo set username='" + _this.data.username + "',password='" + _this.data.password + "',name='" + _this.data.name + "',pinyin='" + _this.data.pinyin + "',power='" + _this.data.power + "',money='" + _this.data.money + "',shendan='" + _this.data.shendan + "',pay='" + _this.data.pay + "',kailiao='" + _this.data.kailiao + "',zuzhuang='" + _this.data.zuzhuang + "',baozhuang='" + _this.data.baozhuang + "',company='" + _this.data.company + "',quyu='" + _this.data.quyu + "' where id=" + _this.data.id  
      },
      success: res => {
        _this.setData({
            id:'',
            username: '', 
            password: '',
            company: '',
            name: '',
            pinyin:'',
            power: '',
            money: '',
            shendan: '',
            pay: '',
            kailiao: '',
            zuzhuang: '',
            baozhuang: '',
            quyu:'',
        })
        _this.qxShow()
        var e = ['','']
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
  },

  del1:function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "delete from userInfo where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            username: '', 
            password: '',
            company: '',
            pinyin:'',
            name: '',
            power: '',
            money: '',
            shendan: '',
            pay: '',
            kailiao: '',
            zuzhuang: '',
            baozhuang: '',
            quyu:'',
          })
          _this.qxShow()
          var e = ['','']
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
      name:"",
      power:"",
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.name,_this.data.power]
    _this.tableShow(e)
    _this.qxShow()
  },

  

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var _this = this
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    console.log(location)
    if(location != null && _this.data.id != ''){
      console.log(location.name)
      var sql = "update userInfo set address = '" + location.latitude + ',' + location.longitude + "',address_name = '" + location.name + "' where id = " + _this.data.id
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
          var e = ['','']
          _this.tableShow(e)
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          console.log("请求失败！")
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
