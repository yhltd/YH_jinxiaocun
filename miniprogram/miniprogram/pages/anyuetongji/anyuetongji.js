// pages/general/general.js
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
  xlShow4: false,
  xlShow1: false,
  xlShow5: false,
  data: {
    list: [],
    title: [{
        text: "类型",
        width: "300rpx",
        columnName: "type",
        type: "text",
        isupd: true
      },
      {
        text: "1月",
        width: "400rpx",
        columnName: "yue1",
        type: "text",
        isupd: true
      },
      {
        text: "2月",
        width: "200rpx",
        columnName: "yue2",
        type: "text",
        isupd: true
      },
      {
        text: "3月",
        width: "200rpx",
        columnName: "yue3",
        type: "text",
        isupd: true
      },
      {
        text: "4月",
        width: "200rpx",
        columnName: "yue4",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "5月",
        width: "200rpx",
        columnName: "yue5",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "6月",
        width: "200rpx",
        columnName: "yue6",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "7月",
        width: "200rpx",
        columnName: "yue7",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "8月",
        width: "200rpx",
        columnName: "yue8",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "9月",
        width: "200rpx",
        columnName: "yue9",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "10月",
        width: "200rpx",
        columnName: "yue10",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "11月",
        width: "200rpx",
        columnName: "yue11",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "12月",
        width: "200rpx",
        columnName: "yue12",
        type: "text",
        isupd: true
      }
    ],
    warehouse_list:[],
    id:'',
    warehouse: '', 
    pihao: '',
    listChanPin:[],
    listShenHe:[
      {name:'审核通过'},
      {name:'审核未通过'}
    ],
    type_list:['销售','退货'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo
    })
    var date = new Date(); 
    var year = date.getFullYear();
    _this.setData({
      year:year
    })
    if(userInfo.power == '管理员'  || _this.data.userInfo.power == '审核人'){
      var e = [year,'']
    }else{
      var e = [year,"where salesman ='" + userInfo.name + "' "]
    }
    
    _this.tableShow(e)
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
    var sql="select isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,xiaoji) else 0 end),'') as yue1,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,xiaoji) else 0 end) as yue12  from (select s.id,s.riqi,s.customer_id,s.sh_staff,s.pick,s.wuliu_order,s.product_id,s.pihao,s.num,s.xiaoji,s.remarks,s.warehouse,s.type,s.express,s.fahuo,s.price,c.salesman,c.customer,s.sale_state from sale as s left join customerInfo as c on s.customer_id = c.id " + e[1] + ") as s where sale_state = '审核通过' and fahuo = '已发货';select sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,xiaoji) else 0 end) as yue1,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,xiaoji) else 0 end) as yue12  from (select s.id,s.riqi,s.customer_id,s.sh_staff,s.pick,s.wuliu_order,s.product_id,s.pihao,s.num,s.xiaoji,s.remarks,s.warehouse,s.type,s.express,s.fahuo,s.price,c.salesman,c.customer,s.sale_state from sale as s left join customerInfo as c on s.customer_id = c.id " + e[1] + ") as s where sale_state = '审核通过'  and fahuo = '已发货';select sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,r_jine) else 0 end) as yue1,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,r_jine) else 0 end) as yue2,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,r_jine) else 0 end) as yue3,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,r_jine) else 0 end) as yue4,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,r_jine) else 0 end) as yue5,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,r_jine) else 0 end) as yue6,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,r_jine) else 0 end) as yue7,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,r_jine) else 0 end) as yue8,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,r_jine) else 0 end) as yue9,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,r_jine) else 0 end) as yue10,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,r_jine) else 0 end) as yue11,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,r_jine) else 0 end) as yue12 from (select p.id,p.pay,p.quota,p.r_jine,p.f_jine,p.discount,p.remarks,p.riqi,p.customer_id,c.salesman,c.customer,p.state from payment as p left join customerInfo as c on p.customer_id = c.id "+ e[1] +") as p where state = '审核通过';select sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,f_jine) else 0 end) as yue1,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,f_jine) else 0 end) as yue2,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,f_jine) else 0 end) as yue3,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,f_jine) else 0 end) as yue4,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,f_jine) else 0 end) as yue5,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,f_jine) else 0 end) as yue6,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,f_jine) else 0 end) as yue7,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,f_jine) else 0 end) as yue8,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,f_jine) else 0 end) as yue9,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,f_jine) else 0 end) as yue10,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,f_jine) else 0 end) as yue11,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,f_jine) else 0 end) as yue12 from (select p.id,p.pay,p.quota,p.r_jine,p.f_jine,p.discount,p.remarks,p.riqi,p.customer_id,c.salesman,c.customer,p.state from payment as p left join customerInfo as c on p.customer_id = c.id "+ e[1] +") as p where state = '审核通过'"
    var sql1="select sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,xiaoji) else 0 end) as yue1,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,xiaoji) else 0 end) as yue12  from (select s.id,s.riqi,s.customer_id,s.sh_staff,s.pick,s.wuliu_order,s.product_id,s.pihao,s.num,s.xiaoji,s.remarks,s.warehouse,s.type,s.express,s.fahuo,s.price,c.salesman,c.customer,s.sale_state, from sale as s left join customerInfo as c on s.customer_id = c.id " + e[1] + ") as s where sale_state = '审核通过'  and fahuo = '已发货';select sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,xiaoji) else 0 end) as yue1,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,xiaoji) else 0 end) as yue12  from (select s.id,s.riqi,s.customer_id,s.sh_staff,s.pick,s.wuliu_order,s.product_id,s.pihao,s.num,s.xiaoji,s.remarks,s.warehouse,s.type,s.express,s.fahuo,s.price,c.salesman,c.customer,s.sale_state, from sale as s left join customerInfo as c on s.customer_id = c.id " + e[1] + ") as s where sale_state = '审核通过'  and fahuo = '已发货';select sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,r_jine) else 0 end) as yue1,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,r_jine) else 0 end) as yue2,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,r_jine) else 0 end) as yue3,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,r_jine) else 0 end) as yue4,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,r_jine) else 0 end) as yue5,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,r_jine) else 0 end) as yue6,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,r_jine) else 0 end) as yue7,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,r_jine) else 0 end) as yue8,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,r_jine) else 0 end) as yue9,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,r_jine) else 0 end) as yue10,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,r_jine) else 0 end) as yue11,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,r_jine) else 0 end) as yue12 from (select p.id,p.pay,p.quota,p.r_jine,p.f_jine,p.discount,p.remarks,p.riqi,p.customer_id,c.salesman,c.customer,p.state from payment as p left join customerInfo as c on p.customer_id = c.id "+ e[1] +") as p where state = '审核通过';select sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,f_jine) else 0 end) as yue1,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,f_jine) else 0 end) as yue2,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,f_jine) else 0 end) as yue3,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,f_jine) else 0 end) as yue4,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,f_jine) else 0 end) as yue5,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,f_jine) else 0 end) as yue6,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,f_jine) else 0 end) as yue7,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,f_jine) else 0 end) as yue8,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,f_jine) else 0 end) as yue9,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,f_jine) else 0 end) as yue10,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,f_jine) else 0 end) as yue11,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,f_jine) else 0 end) as yue12 from (select p.id,p.pay,p.quota,p.r_jine,p.f_jine,p.discount,p.remarks,p.riqi,p.customer_id,c.salesman,c.customer,p.state from payment as p left join customerInfo as c on p.customer_id = c.id "+ e[1] +") as p where state = '审核通过'"
    var sql2="select isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,xiaoji) else 0 end),'') as yue1,isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,xiaoji) else 0 end),'') as yue2,isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,xiaoji) else 0 end),'') as yue3,isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,xiaoji) else 0 end),'') as yue4,isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,xiaoji) else 0 end),'') as yue5,isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,xiaoji) else 0 end),'') as yue6,isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,xiaoji) else 0 end),'') as yue7,isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,xiaoji) else 0 end),'') as yue8,isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,xiaoji) else 0 end),'') as yue9,isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,xiaoji) else 0 end),'') as yue10,isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,xiaoji) else 0 end),'') as yue11,isnull(sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,xiaoji) else 0 end),'') as yue12  from (select s.id,s.riqi,s.customer_id,s.sh_staff,s.pick,s.wuliu_order,s.product_id,s.pihao,s.num,s.xiaoji,s.remarks,s.warehouse,s.type,s.express,s.fahuo,s.price,c.salesman,c.customer,s.sale_state from sale as s left join customerInfo as c on s.customer_id = c.id " + e[1] + ") as s where sale_state = '审核通过' and fahuo = '已发货';"
    var sql3="select isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,xiaoji) else 0 end),'') as yue1,isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,xiaoji) else 0 end),'') as yue2,isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,xiaoji) else 0 end),'') as yue3,isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,xiaoji) else 0 end),'') as yue4,isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,xiaoji) else 0 end),'') as yue5,isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,xiaoji) else 0 end),'') as yue6,isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,xiaoji) else 0 end),'') as yue7,isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,xiaoji) else 0 end),'') as yue8,isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,xiaoji) else 0 end),'') as yue9,isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,xiaoji) else 0 end),'') as yue10,isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,xiaoji) else 0 end) ,'')as yue11,isnull(sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,xiaoji) else 0 end),'') as yue12  from (select s.id,s.riqi,s.customer_id,s.sh_staff,s.pick,s.wuliu_order,s.product_id,s.pihao,s.num,s.xiaoji,s.remarks,s.warehouse,s.type,s.express,s.fahuo,s.price,c.salesman,c.customer,s.sale_state from sale as s left join customerInfo as c on s.customer_id = c.id " + e[1] + ") as s where sale_state = '审核通过'  and fahuo = '已发货';"
    var sql4="select isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,r_jine) else 0 end),'') as yue1,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,r_jine) else 0 end),'') as yue2,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,r_jine) else 0 end),'') as yue3,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,r_jine) else 0 end),'') as yue4,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,r_jine) else 0 end),'') as yue5,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,r_jine) else 0 end),'') as yue6,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,r_jine) else 0 end),'') as yue7,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,r_jine) else 0 end),'') as yue8,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,r_jine) else 0 end),'') as yue9,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,r_jine) else 0 end),'') as yue10,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,r_jine) else 0 end),'') as yue11,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,r_jine) else 0 end),'') as yue12 from (select p.id,p.pay,p.quota,p.r_jine,p.f_jine,p.discount,p.remarks,p.riqi,p.customer_id,c.salesman,c.customer,p.state from payment as p left join customerInfo as c on p.customer_id = c.id "+ e[1] +") as p where state = '审核通过';"
    var sql5="select isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,f_jine) else 0 end),'') as yue1,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,f_jine) else 0 end),'') as yue2,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,f_jine) else 0 end),'') as yue3,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,f_jine) else 0 end),'') as yue4,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,f_jine) else 0 end),'') as yue5,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,f_jine) else 0 end),'') as yue6,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,f_jine) else 0 end),'') as yue7,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,f_jine) else 0 end),'') as yue8,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,f_jine) else 0 end),'') as yue9,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,f_jine) else 0 end),'') as yue10,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,f_jine) else 0 end),'') as yue11,isnull(sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,f_jine) else 0 end),'') as yue12 from (select p.id,p.pay,p.quota,p.r_jine,p.f_jine,p.discount,p.remarks,p.riqi,p.customer_id,c.salesman,c.customer,p.state from payment as p left join customerInfo as c on p.customer_id = c.id "+ e[1] +") as p where state = '审核通过'"
    var sql6=sql2+sql3+sql4+sql5
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql6
      },
      success: res => {
        console.log(sql)
        console.log(res.result)
        var list1 = res.result.recordsets[0]
        var list2 = res.result.recordsets[1]
        var list3 = res.result.recordsets[2]
        var list4 = res.result.recordsets[3]
        var this_list = []
        this_list.push({
          type:'出货金额',
          yue1:list1[0].yue1,
          yue2:list1[0].yue2,
          yue3:list1[0].yue3,
          yue4:list1[0].yue4,
          yue5:list1[0].yue5,
          yue6:list1[0].yue6,
          yue7:list1[0].yue7,
          yue8:list1[0].yue8,
          yue9:list1[0].yue9,
          yue10:list1[0].yue10,
          yue11:list1[0].yue11,
          yue12:list1[0].yue12,
          num:'0'
        })

        this_list.push({
          type:'退货金额',
          yue1:list2[0].yue1,
          yue2:list2[0].yue2,
          yue3:list2[0].yue3,
          yue4:list2[0].yue4,
          yue5:list2[0].yue5,
          yue6:list2[0].yue6,
          yue7:list2[0].yue7,
          yue8:list2[0].yue8,
          yue9:list2[0].yue9,
          yue10:list2[0].yue10,
          yue11:list2[0].yue11,
          yue12:list2[0].yue12,
        })

        this_list.push({
          type:'返款金额',
          yue1:list3[0].yue1,
          yue2:list3[0].yue2,
          yue3:list3[0].yue3,
          yue4:list3[0].yue4,
          yue5:list3[0].yue5,
          yue6:list3[0].yue6,
          yue7:list3[0].yue7,
          yue8:list3[0].yue8,
          yue9:list3[0].yue9,
          yue10:list3[0].yue10,
          yue11:list3[0].yue11,
          yue12:list3[0].yue12,
        })

        this_list.push({
          type:'回款金额',
          yue1:list4[0].yue1,
          yue2:list4[0].yue2,
          yue3:list4[0].yue3,
          yue4:list4[0].yue4,
          yue5:list4[0].yue5,
          yue6:list4[0].yue6,
          yue7:list4[0].yue7,
          yue8:list4[0].yue8,
          yue9:list4[0].yue9,
          yue10:list4[0].yue10,
          yue11:list4[0].yue11,
          yue12:list4[0].yue12,
        })

        _this.setData({
          list: this_list
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

  selKH: function () {
    var _this = this

    var sql = "select customer as name,id,customer from customerInfo where customer like '%" + _this.data.customer + "%' or pinyin like'%" + _this.data.customer + "%'"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          listKeHu: list
        })
        console.log(list)
        _this.setData({
          xlShow5: true
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

  select5: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow5: false,
        customer: e.detail.customer,
        customer_id: e.detail.id,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow5: false,
      })
    }
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime(),
      id: '',
      riqi: '',
      customer: '',
      customer_id: '',
      sh_staff: '',
      express: '',
      pick: '',
      wuliu_order: '',
      warehouse: '',
      staff: '',
      product_id: '',
      product_name: '',
      spec: '',
      unit: '',
      price: '',
      xiaoji:'',
      pihao: '',
      num: '',
      remarks:'',
      type:'',
    })
  },

  clickView:function(e){
    var _this = this
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      riqi: _this.data.list[e.currentTarget.dataset.index].riqi, 
      customer: _this.data.list[e.currentTarget.dataset.index].customer,
      customer_id: _this.data.list[e.currentTarget.dataset.index].customer_id,
      sh_staff: _this.data.list[e.currentTarget.dataset.index].sh_staff,
      express: _this.data.list[e.currentTarget.dataset.index].express,
      pick: _this.data.list[e.currentTarget.dataset.index].pick,
      wuliu_order: _this.data.list[e.currentTarget.dataset.index].wuliu_order,
      warehouse: _this.data.list[e.currentTarget.dataset.index].warehouse,
      staff: _this.data.list[e.currentTarget.dataset.index].staff,
      product_id: _this.data.list[e.currentTarget.dataset.index].product_id,
      product_name: _this.data.list[e.currentTarget.dataset.index].product_name,
      spec: _this.data.list[e.currentTarget.dataset.index].spec,
      unit: _this.data.list[e.currentTarget.dataset.index].unit,
      price: _this.data.list[e.currentTarget.dataset.index].price,
      xiaoji: _this.data.list[e.currentTarget.dataset.index].xiaoji,
      pihao: _this.data.list[e.currentTarget.dataset.index].pihao,
      num: _this.data.list[e.currentTarget.dataset.index].num,
      remarks: _this.data.list[e.currentTarget.dataset.index].remarks,
      type:_this.data.list[e.currentTarget.dataset.index].type,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    var date = new Date(); 
    var year = date.getFullYear();
    if(_this.data.userInfo.power == '管理员' || _this.data.userInfo.power == '审核人'){
      var e = [year,'']
    }else{
      var e = [year,"where salesman ='" + _this.data.userInfo.name + "' "]
    }
    _this.tableShow(e)
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      year:"",
      customer:'',
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
    var year = _this.data.year
    if(year == '' || year == undefined){
      var date = new Date(); 
      year = date.getFullYear();
    }
    if(_this.data.userInfo.power == '管理员'  || _this.data.userInfo.power == '审核人'){
      if(_this.data.customer == ''){
        var e = [year,'']
      }else{
        var e = [year,"where customer ='" + _this.data.customer + "'"]
      }
      
    }else{
      if(_this.data.customer == ''){
        var e = [year,"where salesman ='" + _this.data.userInfo.name + "' "]
      }else{
        var e = [year,"where customer ='" + _this.data.customer + "' and salesman ='" + _this.data.userInfo.name + "' "]
      }
    }
    _this.tableShow(e)
    _this.qxShow()
  },

  select4: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow4: false,
        product_name: e.detail.product_name,
        spec: e.detail.spec,
        unit: e.detail.unit,
        price:e.detail.price,
        product_id: e.detail.id,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow4: false,
      })
    }
  },

  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      var shenhe = e.detail.name
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: "update ruku set state='" + shenhe + "' where id=" + _this.data.id 
        },
        success: res => {
          _this.setData({
            id: '',
            riqi: '',
            customer: '',
            customer_id: '',
            sh_staff: '',
            express: '',
            pick: '',
            wuliu_order: '',
            warehouse: '',
            staff: '',
            product_id: '',
            product_name: '',
            spec: '',
            unit: '',
            price: '',
            xiaoji:'',
            pihao: '',
            num: '',
            remarks:'',
            type:'',
            xlShow1: false,
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','']
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
      _this.setData({
        xlShow1: false,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow1: false,
      })
    }
  },

  selCD: function () {
    var _this = this
    _this.setData({
      xlShow4: true
    })
  },

  selSH: function () {
    var _this = this
    _this.setData({
      xlShow1: true
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
      name : '按月统计',
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