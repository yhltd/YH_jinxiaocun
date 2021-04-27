// miniprogram/package_tb3999803/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},

    scrollLoading: false,
    page: {
      now: 1,
      size: 20,
      list: [],
      isFinish: false,
      isLoad: false,
      isError: false,
      isEmpty: false,
    },

    showSelectPopup: false,

    selectParams: {
      productionNo: '',
      XDriqi: {
        startDate: '',
        endDate: ''
      },
      area : '',
      clientNo: '',
      clientName: '',
      clientSite: ''
    },
    showChoiceXDriqi: false,
    nowType: '',


    showOrderDetail: false,
    nowOrder: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: JSON.parse(options.user)
    })
    this.page();
  },

  selectSql: function(){
    var _this = this;
    var params = _this.data.selectParams;
    var sql = " where 1 = 1"

    if(params.productionNo != ''){
      sql+= " and productionNo like '%" + params.productionNo + "%'"
    }
    if(params.XDriqi.startDate == ''){
      params.XDriqi.startDate = "2021/1/1"
    }
    if(params.XDriqi.endDate == ''){
      params.XDriqi.endDate = "2999/1/1"
    }
    sql += " and XDriqi between '" + params.XDriqi.startDate + "' and '" + params.XDriqi.endDate + "'";

    if(params.area != ''){
      sql+= " and (select top 1 area from client where client.clientNo = order_information.clientNo) like '%" + params.area + "%'"
    }

    if(params.clientNo != ''){
      sql+= " and clientNo like '%" + params.clientNo + "%'"
    }

    if(params.clientName != ''){
      sql+= " and clientName like '%" + params.clientName + "%'"
    }

    if(params.clientSite != ''){
      sql+= " and clientSite like '%" + params.clientSite + "%'"
    }

    return sql;
  },

  pageInit: function(){
    this.setData({
      ['page.now']: 1,
      ['page.list']: [],
      ['page.isFinish']: false,
      ['page.isLoad']: false,
      ['page.isError']: false,
      ['page.isEmpty']: false
    })
  },

  page: function(callback){
    var _this = this;
    var page = _this.data.page;
    if(page.isLoad || page.isFinish) return;

    _this.setData({
      ['page.isLoad']: true,
      ['page.isError']: false
    })

    var sql = "select * from (select id,row_number() over(order by id) as rownum,'查看' as show,productionNo,XDriqi,clientNo,clientName,clientSite,percentage,client,deliveryAddress,projectTime,form,content,count,money,(select sum(cast(pay.money as float)) from pay where pay.clientNo = order_information.clientNo) as pay_money,way,receivable,paidan_date,state from order_information" + _this.selectSql() + ") as a where rownum > " + (page.now-1)*page.size + " and rownum < " + (parseInt(page.now*page.size) + 1);
    
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        var pageList = page.list;
        if(res.result != {}){
          var list = res.result.recordset;

          _this.setData({
            ['page.now']: page.now + 1,
            ['page.list']: pageList.concat(list),
            ['page.isFinish']: list.length < page.size,
            ['page.isLoad']: false
          }) 
        }else{
          _this.setData({
            ['page.isEmpty']: pageList.length == 0
          })
        }
      },
      fail: res => {
        _this.setData({
          ['page.isError']: true
        })
      },
      complete: res => {
        if(typeof callback == 'function'){
          callback();
        }
      }
    })
  },

  pageRefresh: function(){
    var _this = this;
    if(_this.data.page.isLoad) return;

    _this.pageInit();
    _this.page(function(){
      _this.setData({
        scrollLoading: false
      })
    });
  },

  openSelectPopup: function(){
    this.setData({
      showSelectPopup: true
    })
  },
  closeSelectPopup: function(){
    this.setData({
      showSelectPopup: false
    })
  },

  onClickXDriqi: function(e){
    this.setData({
      showChoiceXDriqi: true,
      nowType: e.target.dataset.type
    })
  },
  setXDriqi: function(e){
    var _this = this;
    _this.setData({
      showChoiceXDriqi: false
    })
    if(e.type == 'confirm'){
      _this.setData({
        ['selectParams.XDriqi.' + _this.data.nowType]: _this.formatter(e.detail)
      })
    }
  },

  formatter: function(d){
    let date = new Date(d)
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
  },

  setSelectParams: function(e){
    this.setData({
      ['selectParams.' + e.currentTarget.dataset.type]: e.detail
    })
  },

  selectParamsReset: function(){
    let selectParams =  {
      productionNo: '',
      XDriqi: {
        startDate: '',
        endDate: ''
      },
      area : '',
      clientNo: '',
      clientName: '',
      clientSite: ''
    };

    this.setData({
      selectParams
    })
  },

  onSelectAll: function(){
    this.pageInit();
    this.selectParamsReset();
    this.page();
  },

  selectParamsSave: function(){
    var _this = this;
    _this.pageInit();
    _this.page(function(){
      _this.setData({
        showSelectPopup: false
      })
    })
  },

  openOrderDetail: function(e){
    this.setData({
      showOrderDetail: true,
      nowOrder: e.target.dataset.index
    })
    console.log(this.data.page.list[e.target.dataset.index])
  },

  closeOrderDetail: function(){
    this.setData({
      showOrderDetail: false
    })
  }
})