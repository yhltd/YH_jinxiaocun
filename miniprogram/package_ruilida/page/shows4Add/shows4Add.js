// package_ruilida/page/shows/shows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:[],
    title_1:[
      {
        text:'销售报价',
        url: '../xiaoshou_baojia/xiaoshou_baojia',
        icon: "../../image/xiaoshoubaojia.png"
      },
      {
        text:'销售订单',
        url: '../xiaoshou_dingdan/xiaoshou_dingdan',
        icon: "../../image/xiaoshoudingdan.png"
      },
      {
        text:'销售出库',
        url: '../xiaoshou_chuku/xiaoshou_chuku',
        icon: "../../image/xiaoshouchuku.png"
      },
      {
        text:'销售开票',
        url: '../xiaoshou_kaipiao/xiaoshou_kaipiao',
        icon: "../../image/xiaoshoukaipiao.png"
      },
      {
        text:'收入记录',
        url: '../caigou_fukuan/caigou_fukuan',
        icon: "../../image/shourujilu.png"
      },
    ],
    title_2:[
      {
        text:'采购订单',
        url: '../caigou_dingdan/caigou_dingdan',
        icon: "../../image/caigoudingdan.png"
      },
      {
        text:'采购入库',
        url: '../caigou_ruku/caigou_ruku',
        icon: "../../image/caigouruku.png"
      },
      {
        text:'采购收票',
        url: '../caigou_shoupiao/caigou_shoupiao',
        icon: "../../image/caigoushoupiao.png"
      },
      {
        text:'支出记录',
        url: '../caigou_fukuan/caigou_fukuan',
        icon: "../../image/zhichujilu.png"
      },
    ],
    title_3:[
      {
        text:'转账',
        url: '../zhuanzhang/zhuanzhang',
        icon: "../../image/zhuanzhang.png"
      },
      {
        text:'库存',
        url: '../kucun/kucun',
        icon: "../../image/kucun.png"
      },
      {
        text:'账户余额',
        url: '../zhanghu_yue/zhanghu_yue',
        icon: "../../image/zhanghuyue.png"
      },
      {
        text:'收入分类统计',
        url: '../shouru_fenlei/shouru_fenlei',
        icon: "../../image/shourufenleitongji.png"
      },
      {
        text:'支出分类统计',
        url: '../zhichu_fenlei/zhichu_fenlei',
        icon: "../../image/zhichufenleitongji.png"
      },
      {
        text:'月度收支统计',
        url: '../yuedu_shouzhi/yuedu_shouzhi',
        icon: "../../image/yuedushouzhitongji.png"
      },
    ],
    title_4:[
      {
        text:'账号管理',
        url: '../userInfo/userInfo',
        icon: "../../image/zhanghaoguanli.png"
      },
      {
        text:'权限管理',
        url: '../userPower/userPower',
        icon: "../../image/quanxianguanli.png"
      },
      {
        text:'客户资料',
        url: '../customer/customer',
        icon: "../../image/kehuziliao.png"
      },
      {
        text:'供应商资料',
        url: '../gongyingshang/gongyingshang',
        icon: "../../image/gongyingshangziliao.png"
      },
      {
        text:'商品资料',
        url: '../product/product',
        icon: "../../image/shangpinziliao.png"
      },
      {
        text:'附加税设置',
        url: '../peizhi_shuilv/peizhi_shuilv',
        icon: "../../image/fujiashuishezhi.png"
      },
      {
        text:'商品分类',
        url: '../peizhi/peizhi',
        icon: "../../image/shangpinfenlei.png"
      },
      {
        text:'仓库',
        url: '../peizhi/peizhi',
        icon: "../../image/cangku.png"
      },
      {
        text:'收款账户',
        url: '../peizhi/peizhi',
        icon: "../../image/shoukuanzhanghu.png"
      },
      {
        text:'店铺',
        url: '../peizhi/peizhi',
        icon: "../../image/dianpu.png"
      },
      {
        text:'核算单位',
        url: '../peizhi/peizhi',
        icon: "../../image/hesuandanwei.png"
      },
      {
        text:'客户等级',
        url: '../peizhi/peizhi',
        icon: "../../image/kehudengji.png"
      },
      {
        text:'供应商等级',
        url: '../peizhi/peizhi',
        icon: "../../image/gongyingshangdengji.png"
      },
      {
        text:'价格等级',
        url: '../peizhi/peizhi',
        icon: "../../image/jiagedengji.png"
      },
      {
        text:'客户分类',
        url: '../peizhi/peizhi',
        icon: "../../image/kehufenlei.png"
      },
      {
        text:'质保等级',
        url: '../peizhi/peizhi',
        icon: "../../image/zhibaodengji.png"
      },
      {
        text:'价格上浮率',
        url: '../peizhi/peizhi',
        icon: "../../image/jiageshangfulv.png"
      },
      {
        text:'记账分类',
        url: '../peizhi/peizhi',
        icon: "../../image/jizhangfenlei.png"
      },
      {
        text:'记账明细类型',
        url: '../peizhi/peizhi',
        icon: "../../image/jizhangmingxileixing.png"
      },
    ],
    this_date:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var title = userInfo.changyong
    if(title != ''){
      title = JSON.parse(title)
    }else{
      title = []
    }
    var this_date = getNowDate()
    _this.setData({
      userInfo,
      this_date,
      title
    })
  },

  add:function(e){
    console.log(e)
    var _this = this
    var column = e.currentTarget.dataset.column
    var index = e.currentTarget.dataset.index
    var this_item = _this.data[column][index]
    console.log(this_item)
    var title = _this.data.title
    for(var i=0; i<title.length; i++){
      if(title[i].text == this_item.text){
        wx.showToast({
          title: '已有此项，无需重复添加',
          icon: 'none'
        })
        return;
      }
    }
    title.push(this_item)
    _this.setData({
      title
    })
  },

  del:function(e){
    console.log(e)
    var _this = this
    var title = _this.data.title
    var index = e.target.dataset.index
    console.log(index)
    title.splice(index,1)
    console.log(title)
    _this.setData({
      title
    })
  },

  save:function(){
    var _this = this
    var value = JSON.stringify(_this.data.title)
    var sql = "update userInfo set changyong = '" + value + "' where id =" + _this.data.userInfo.id
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '保存成功',
          icon: 'none'
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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


function getNowDate() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }