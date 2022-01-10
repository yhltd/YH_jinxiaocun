Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMaskWindowShow: false,
    maskWindowList: [' 查询工资'],
    selectIndex: -1,
    price1 : 0,
    price2 : 0,
    isSearch : false,
    heji :[],
    list: [],
    title: [],
    companyName : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      companyName : options.companyName
    })
    wx.setNavigationBarTitle({
      title: '个人所得税'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    console.log('onLoad')
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 AU,sum((cast(ATA as money)*cast(AU as money))) AS COUNT1,COUNT(id) as num, sum((cast(AW AS money)*cast(AU AS money))) AS COUNT2 FROM gongzi_gongzimingxi WHERE AU is not null and BD = '"+_this.data.companyName+"' GROUP BY AU"
      },
      success: res => {
        if (res.result.recordset.length < 100) {
          this.setData({
            list: res.result.recordset,
            IsLastPage: true
          })
          _this.baochi()
        } else {
          this.setData({
            list: res.result.recordset
          })
        }
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select gerensuodeshui from gongzi_title where gerensuodeshui is not null"
      },
      success: res => {
        this.setData({
          title: res.result.recordsets[0]
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

  },
  baochi: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 AU,sum((cast(ATA as money)*cast(AU as money))) AS COUNT1,COUNT(id) as num, sum((cast(AW AS money)*cast(AU AS money))) AS COUNT2 FROM gongzi_gongzimingxi WHERE AU is not null and BD = '"+that.data.companyName+"' GROUP BY AU"
      },
      success: res => {
        var list = res.result.recordset;
        var heji = {jishui : 0,renshu : 0,gerensuodeshui : 0};
        for(var i=0;i<list.length;i++){
          var count1 = parseInt(list[i].COUNT1);
          var num = parseInt(list[i].num);
          var count2 = parseInt(list[i].COUNT2);
          if(count1!=0 && count1!=NaN && count1!=null){
            heji.jishui = count1+heji.jishui;
          }
          if(num!=0 && num!=NaN && num!=null){
            heji.renshu = num+heji.renshu;
          }
          if(count2!=0 && count2!=NaN && count2!=null){
            heji.gerensuodeshui = count2+heji.gerensuodeshui;
          }
        }
        this.setData({
          list: res.result.recordset,
          heji: heji
        })
      },
      err: res => {
        console.log("错误!", res)
      }
    })
  },


})