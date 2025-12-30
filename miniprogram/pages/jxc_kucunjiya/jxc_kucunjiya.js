// pages/jxc_kucunjiya/jxc_kucunjiya.js
// pages/jxc_diaobotongji/jxc_diaobotongji.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    szzhi: [],
    start_date:'',
    stop_date:'',
    order_number:"",
    page:1,
    title: [
    {
      text: "商品代码",
      width: "200rpx",
      columnName: "cpid",
      type: "text",
      isupd: true
    },
    {
      text: "商品名称",
      width: "200rpx",
      columnName: "cpname",
      type: "text",
      isupd: true
    },
    {
      text: "商品类别",
      width: "200rpx",
      columnName: "splb",
      type: "text",
      isupd: true
    },
    {
      text: "库存金额",
      width: "230rpx",
      columnName: "jcje",
      type: "text",
      isupd: true
    },
    {
      text: "库存数量",
      width: "300rpx",
      columnName: "jcsl",
      type: "text",
      isupd: true
    },
    {
      text: "出库数量",
      width: "150rpx",
      columnName: "cksl",
      type: "text",
      isupd: true
    },
   
    {
      text: "仓库",
      width: "200rpx",
      columnName: "cangku",
      type: "text",
      isupd: true
    },
  ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    var szzhi = null;
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi
    that.sel1()
  },
  sel11:function(){
    this.setData({
      page:1
    })
    this.sel1()
  },
  // sel1:function(){
  //   var _this = this
  //   var app = getApp();
  //   var gongsi = app.globalData.gongsi
  //   var start_date = _this.data.start_date
  //   var stop_date = _this.data.stop_date
  //   var order_number = _this.data.order_number
  //   var page = _this.data.page-1
  //   if (start_date != ''){
  //     start_date = start_date + " 00:00:00"
  //   }else{
  //     start_date = "1900-01-01 00:00:00"
  //   }
  //   if (stop_date != ''){
  //     stop_date = stop_date + " 23:59:59"
  //   }else{
  //     stop_date = "2100-12-31 23:59:59"
  //   }
    

  //   wx.cloud.callFunction({
  //     name: "sqlConnection",
  //     data: {
  //    sql: "select cpid,cpname,cplb,qcsl,qcje,rksl,rkje,cksl,ckje,jcsl,jcje,ifnull(bian_yuan.bianyuan,'') as bianyuan,mark1,case when (qcje + jcje) / 2 != 0 then ROUND((ckje / ((qcje + jcje) / 2)) * 100, 2) else 0 end as zzl, (jcsl * (qishuchu.cpje - last_ck.cpje)) as yjdj, (((pre_jcsl.jcsl + jcsl) / 2) / (cksl / DATEDIFF('" + stop_date + "', '" + start_date + "'))) / 100 as ldxl from (select ifnull(link_rk.cpid,'') as cpid,ifnull(link_rk.cpname,'') as cpname,ifnull(link_rk.cplb,'') as cplb,ifnull(link_rk.cpsl,0) as qcsl,ifnull(link_rk.cpje,0) as qcje,ifnull(link_rk.rksl,0) as rksl,ifnull(link_rk.rkje,0) as rkje,ifnull(ck.cksl,0) as cksl,ifnull(ck.ckje,0) as ckje,ifnull(cpsl,0)+ifnull(rksl,0)-ifnull(cksl,0) as jcsl,ifnull(cpje,0)+ifnull(rkje,0)-ifnull(ckje,0) as jcje from (select link_qc.cpid,link_qc.cpname,link_qc.cplb,link_qc.cpsl,link_qc.cpje,rk.rksl,rk.rkje from(select cp.cpid,cp.cpname,cp.cplb,qc.cpsl,qc.cpje from(select cpid,cpname,cplb from yh_jinxiaocun_qichushu where gs_name = '"+ gongsi +"' union select sp_dm,cpname,cplb from  yh_jinxiaocun_mingxi where gs_name = '"+ gongsi +"') as cp left join (select cpid,cplb,cpname,sum(cpsl) as cpsl,sum(cpsj*cpsl) as cpje from yh_jinxiaocun_qichushu where gs_name = '"+ gongsi +"' GROUP BY cpid,cpname,cplb) as qc on cp.cpid = qc.cpid and cp.cpname = qc.cpname and cp.cplb = qc.cplb) as link_qc left join (select sp_dm,cpname,cplb,sum(cpsl) as rksl,sum(cpsl*cpsj) as rkje from yh_jinxiaocun_mingxi where mxtype = '入库' and gs_name = '"+ gongsi +"' and shijian between '" + start_date + "' and '" + stop_date + "'  group by sp_dm,cpname,cplb) as rk on rk.sp_dm = link_qc.cpid and rk.cpname = link_qc.cpname  and rk.cplb = link_qc.cplb) as link_rk left join (select sp_dm,cpname,cplb,sum(cpsl) as cksl,sum(cpsl*cpsj) as ckje from yh_jinxiaocun_mingxi where mxtype = '出库' and gs_name = '"+ gongsi +"' and shijian between '" + start_date + "' and '" + stop_date + "'   group by sp_dm,cpname,cplb) as ck on ck.sp_dm = link_rk.cpid and ck.cpname = link_rk.cpname and ck.cplb = link_rk.cplb) as jxc left join(select sp_dm,lei_bie,`name`,bianyuan,mark1 from yh_jinxiaocun_jichuziliao where gs_name = '"+ gongsi +"') as bian_yuan on jxc.cpid = bian_yuan.sp_dm and jxc.cpname = bian_yuan.`name` and jxc.cplb = bian_yuan.lei_bie left join (select cpid,cplb,cpname,cpje from yh_jinxiaocun_qichushu where gs_name = '"+ gongsi +"') as qishuchu on jxc.cpid = qishuchu.cpid and jxc.cpname = qishuchu.cpname and jxc.cplb = qishuchu.cplb left join (select sp_dm,cpname,cplb,cpsj as cpje from yh_jinxiaocun_mingxi where mxtype = '出库' and shijian = (select max(shijian) from yh_jinxiaocun_mingxi where mxtype = '出库' and shijian between '" + start_date + "' and '" + stop_date + "')) as last_ck on jxc.cpid = last_ck.sp_dm and jxc.cpname = last_ck.cpname and jxc.cplb = last_ck.cplb left join (select cpid,cpname,cplb,(ifnull(qc.cpsl,0) + ifnull(rk.rksl,0) - ifnull(ck.cksl,0)) as jcsl from (select cpid,cpname,cplb from yh_jinxiaocun_qichushu where gs_name = '"+ gongsi +"' union select sp_dm,cpname,cplb from yh_jinxiaocun_mingxi where gs_name = '"+ gongsi +"') as base left join (select cpid,cplb,cpname,sum(cpsl) as cpsl from yh_jinxiaocun_qichushu where gs_name = '"+ gongsi +"' group by cpid,cpname,cplb) as qc on base.cpid = qc.cpid and base.cpname = qc.cpname and base.cplb = qc.cplb left join (select sp_dm,cpname,cplb,sum(cpsl) as rksl from yh_jinxiaocun_mingxi where mxtype = '入库' and gs_name = '"+ gongsi +"' and shijian < '" + start_date + "' group by sp_dm,cpname,cplb) as rk on base.cpid = rk.sp_dm and base.cpname = rk.cpname and base.cplb = rk.cplb left join (select sp_dm,cpname,cplb,sum(cpsl) as cksl from yh_jinxiaocun_mingxi where mxtype = '出库' and gs_name = '"+ gongsi +"' and shijian < '" + start_date + "' group by sp_dm,cpname,cplb) as ck on base.cpid = ck.sp_dm and base.cpname = ck.cpname and base.cplb = ck.cplb) as pre_jcsl on jxc.cpid = pre_jcsl.cpid and jxc.cpname = pre_jcsl.cpname and jxc.cplb = pre_jcsl.cplb where cksl < " + order_number + " limit " + (page * 5) + ", 5"
  //       // sql: "SELECT *, '' as checkbox, date_format(yh_jinxiaocun_mingxi.shijian, '%Y-%m-%d') as time, date_format(yh_jinxiaocun_mingxi.shijian, '%Y-%m-%d %H:%i:%s') as time2, yh_jinxiaocun_jichuziliao.mark1 as mark1 FROM yh_jinxiaocun_mingxi LEFT JOIN yh_jinxiaocun_jichuziliao ON yh_jinxiaocun_mingxi.cpname =yh_jinxiaocun_jichuziliao.`name`WHERE yh_jinxiaocun_mingxi.gs_name = '" + gongsi + "'AND shijian >= '" + start_date + "'AND shijian <= '" + stop_date + "'AND orderid LIKE '%" + order_number + "%'LIMIT "+page+", 5" 
  //     },
  //     success(res) {
  //       for(var i=0;i<res.result.length;i++){
  //         if(res.result[i].mark1 != null){
  //           res.result[i].mark1 = "data:image/jpeg;base64," + res.result[i].mark1.replace(/[\r\n]/g, '')
  //         }
  //       }
  //       console.log(res.result)
  //       _this.setData({
  //         szzhi: res.result,
         
  //         // start_date:'',
  //         // stop_date:'',
  //         // order_number:'',
  //       })
  //       console.log(_this.data.szzhi)
  //     },
  //     fail(res) {
  //       console.log(res.result)
  //       console.log("失败", res)

  //     }
  //   });
  // },
  sel1: function(){
    var _this = this
    var app = getApp()
    var gongsi = app.globalData.gongsi
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    var order_number = _this.data.order_number || 999999
    var page = _this.data.page - 1
    
    console.log('=== 完整SQL调试 ===')

    if (start_date != ''){
      start_date = start_date + " 00:00:00"
    }else{
      start_date = "1900-01-01 00:00:00"
    }
    if (stop_date != ''){
      stop_date = stop_date + " 23:59:59"
    }else{
      stop_date = "2100-12-31 23:59:59"
    }

    // 分步骤构建 SQL，找出问题所在
    _this.buildAndTestSQL(gongsi, start_date, stop_date, order_number, page)
  },

  // 分步骤构建和测试 SQL
  buildAndTestSQL: function(gongsi, start_date, stop_date, order_number, page) {
    var _this = this
    
    // 第一步：测试基础查询（包含cangku字段）
    // 第一步：测试基础查询（包含cangku字段）
var step1Sql = `
select 
  cpid, cpname, cplb, qcsl, qcje, rksl, rkje, cksl, ckje, jcsl, jcje,
  ifnull(cangku_info.cangku, '') as cangku
from (
  select 
    ifnull(link_rk.cpid,'') as cpid,
    ifnull(link_rk.cpname,'') as cpname,
    ifnull(link_rk.cplb,'') as cplb,
    ifnull(link_rk.cpsl,0) as qcsl,
    ifnull(link_rk.cpje,0) as qcje,
    ifnull(link_rk.rksl,0) as rksl,
    ifnull(link_rk.rkje,0) as rkje,
    ifnull(ck.cksl,0) as cksl,
    ifnull(ck.ckje,0) as ckje,
    ifnull(cpsl,0)+ifnull(rksl,0)-ifnull(cksl,0) as jcsl,
    ifnull(cpje,0)+ifnull(rkje,0)-ifnull(ckje,0) as jcje
  from (
    select 
      link_qc.cpid, link_qc.cpname, link_qc.cplb, link_qc.cpsl, link_qc.cpje,
      rk.rksl, rk.rkje
    from (
      select 
        cp.cpid, cp.cpname, cp.cplb, qc.cpsl, qc.cpje
      from (
        select cpid, cpname, cplb from yh_jinxiaocun_qichushu where gs_name = '${gongsi}'
        union 
        select sp_dm, cpname, cplb from yh_jinxiaocun_mingxi where gs_name = '${gongsi}'
      ) as cp 
      left join (
        select cpid, cplb, cpname, sum(cpsl) as cpsl, sum(cpsj*cpsl) as cpje 
        from yh_jinxiaocun_qichushu where gs_name = '${gongsi}'
        GROUP BY cpid, cpname, cplb
      ) as qc on cp.cpid = qc.cpid and cp.cpname = qc.cpname and cp.cplb = qc.cplb
    ) as link_qc 
    left join (
      select sp_dm, cpname, cplb, sum(cpsl) as rksl, sum(cpsl*cpsj) as rkje
      from yh_jinxiaocun_mingxi 
      where (mxtype = '入库' or mxtype = '调拨入库' or mxtype = '盘盈入库') and gs_name = '${gongsi}' 
      and shijian between '${start_date}' and '${stop_date}'
      group by sp_dm, cpname, cplb
    ) as rk on rk.sp_dm = link_qc.cpid and rk.cpname = link_qc.cpname and rk.cplb = link_qc.cplb
  ) as link_rk 
  left join (
    select sp_dm, cpname, cplb, sum(cpsl) as cksl, sum(cpsl*cpsj) as ckje
    from yh_jinxiaocun_mingxi 
    where (mxtype = '出库' or mxtype = '调拨出库' or mxtype = '盘亏出库') and gs_name = '${gongsi}'
    and shijian between '${start_date}' and '${stop_date}'
    group by sp_dm, cpname, cplb
  ) as ck on ck.sp_dm = link_rk.cpid and ck.cpname = link_rk.cpname and ck.cplb = link_rk.cplb
) as jxc 
left join (
  select sp_dm, cangku 
  from yh_jinxiaocun_mingxi 
  where gs_name = '${gongsi}'
  group by sp_dm, cangku 
  limit 1
) as cangku_info on jxc.cpid = cangku_info.sp_dm
where cksl < ${order_number} 
limit ${page * 5}, 5
`

    console.log('步骤1: 测试基础查询（包含cangku字段）')
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: { sql: step1Sql },
      success(step1Res) {
        console.log('✅ 基础查询成功，数据条数:', step1Res.result.length)
        if (step1Res.result.length > 0) {
          console.log('cangku字段示例:', step1Res.result[0].cangku)
        }
        
        // 第二步：添加业务员关联
        _this.testWithBianyuan(gongsi, start_date, stop_date, order_number, page, step1Res.result)
      },
      fail(step1Res) {
        console.log('❌ 基础查询失败')
        console.log('错误信息:', JSON.stringify(step1Res, null, 2))
      }
    })
  },

  // 第二步：测试添加业务员关联（也包含cangku字段）
  testWithBianyuan: function(gongsi, start_date, stop_date, order_number, page, prevData) {
    var _this = this
    
    var step2Sql = `
  select 
    jxc.cpid, jxc.cpname, jxc.cplb, jxc.qcsl, jxc.qcje, jxc.rksl, jxc.rkje, 
    jxc.cksl, jxc.ckje, jxc.jcsl, jxc.jcje,
    jxc.cangku,
    ifnull(bian_yuan.bianyuan,'') as bianyuan,
    bian_yuan.mark1
  from (
    -- 这里插入第一步的基础查询（包含cangku）
    select 
      ifnull(link_rk.cpid,'') as cpid,
      ifnull(link_rk.cpname,'') as cpname,
      ifnull(link_rk.cplb,'') as cplb,
      ifnull(link_rk.cpsl,0) as qcsl,
      ifnull(link_rk.cpje,0) as qcje,
      ifnull(link_rk.rksl,0) as rksl,
      ifnull(link_rk.rkje,0) as rkje,
      ifnull(ck.cksl,0) as cksl,
      ifnull(ck.ckje,0) as ckje,
      ifnull(cpsl,0)+ifnull(rksl,0)-ifnull(cksl,0) as jcsl,
      ifnull(cpje,0)+ifnull(rkje,0)-ifnull(ckje,0) as jcje,
      ifnull(cangku_info.cangku, '') as cangku
    from (
      select 
        link_qc.cpid, link_qc.cpname, link_qc.cplb, link_qc.cpsl, link_qc.cpje,
        rk.rksl, rk.rkje
      from (
        select 
          cp.cpid, cp.cpname, cp.cplb, qc.cpsl, qc.cpje
        from (
          select cpid, cpname, cplb from yh_jinxiaocun_qichushu where gs_name = '${gongsi}'
          union 
          select sp_dm, cpname, cplb from yh_jinxiaocun_mingxi where gs_name = '${gongsi}'
        ) as cp 
        left join (
          select cpid, cplb, cpname, sum(cpsl) as cpsl, sum(cpsj*cpsl) as cpje 
          from yh_jinxiaocun_qichushu where gs_name = '${gongsi}'
          GROUP BY cpid, cpname, cplb
        ) as qc on cp.cpid = qc.cpid and cp.cpname = qc.cpname and cp.cplb = qc.cplb
      ) as link_qc 
      left join (
        select sp_dm, cpname, cplb, sum(cpsl) as rksl, sum(cpsl*cpsj) as rkje
        from yh_jinxiaocun_mingxi 
        where (mxtype = '入库' or mxtype = '调拨入库' or mxtype = '盘盈入库') and gs_name = '${gongsi}' 
        and shijian between '${start_date}' and '${stop_date}'
        group by sp_dm, cpname, cplb
      ) as rk on rk.sp_dm = link_qc.cpid and rk.cpname = link_qc.cpname and rk.cplb = link_qc.cplb
    ) as link_rk 
    left join (
      select sp_dm, cpname, cplb, sum(cpsl) as cksl, sum(cpsl*cpsj) as ckje
      from yh_jinxiaocun_mingxi 
      where (mxtype = '出库' or mxtype = '调拨出库' or mxtype = '盘亏出库') and gs_name = '${gongsi}'
      and shijian between '${start_date}' and '${stop_date}'
      group by sp_dm, cpname, cplb
    ) as ck on ck.sp_dm = link_rk.cpid and ck.cpname = link_rk.cpname and ck.cplb = link_rk.cplb
    left join (
      select sp_dm, cangku 
      from yh_jinxiaocun_mingxi 
      where gs_name = '${gongsi}'
      group by sp_dm, cangku 
      limit 1
    ) as cangku_info on link_rk.cpid = cangku_info.sp_dm
  ) as jxc 
  left join (
    select sp_dm, lei_bie, name, bianyuan, mark1 
    from yh_jinxiaocun_jichuziliao 
    where gs_name = '${gongsi}'
  ) as bian_yuan on jxc.cpid = bian_yuan.sp_dm and jxc.cpname = bian_yuan.name and jxc.cplb = bian_yuan.lei_bie
  where jxc.cksl < ${order_number} 
  limit ${page * 5}, 5
`

    console.log('步骤2: 测试业务员关联（包含cangku字段）')
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: { sql: step2Sql },
      success(step2Res) {
        console.log('✅ 业务员关联查询成功，数据条数:', step2Res.result.length)
        if (step2Res.result.length > 0) {
          console.log('cangku字段示例:', step2Res.result[0].cangku)
        }
        
        // 第三步：添加完整计算字段（现在cangku已经在前面获取了）
        _this.testWithFullCalculations(gongsi, start_date, stop_date, order_number, page, step2Res.result)
      },
      fail(step2Res) {
        console.log('❌ 业务员关联查询失败')
        console.log('错误信息:', JSON.stringify(step2Res, null, 2))
        
        // 如果失败，使用第一步的结果并手动添加字段
        console.log('使用第一步的基础数据并手动添加字段')
        _this.processAndSetDataWithManualFields(prevData)
      }
    })
  },

 // 修改第三步，去掉zzl计算，简化逻辑
testWithFullCalculations: function(gongsi, start_date, stop_date, order_number, page, prevData) {
  var _this = this
  
  console.log('步骤3: 在前两次查询数据基础上计算 yjdj 和 ldxl（简化版）')
  console.log('前两次查询数据条数:', prevData.length)
  
  // 直接使用前两次查询的数据，手动计算缺失字段
  _this.calculateAdditionalFields(gongsi, start_date, stop_date, prevData)
},

// 计算额外字段
calculateAdditionalFields: function(gongsi, start_date, stop_date, data) {
  var _this = this
  
  console.log('开始计算 yjdj 和 ldxl 字段')
  
  // 批量计算所有数据的额外字段
  _this.calculateYjdjAndLdxl(gongsi, start_date, stop_date, data, 0, function(processedData) {
    console.log('所有字段计算完成')
    _this.processAndSetData(processedData)
  })
},

// 递归计算 yjdj 和 ldxl
calculateYjdjAndLdxl: function(gongsi, start_date, stop_date, data, index, callback) {
  var _this = this
  
  if (index >= data.length) {
    callback(data)
    return
  }
  
  var item = data[index]
  
  // 并行计算 yjdj 和 ldxl
  Promise.all([
    _this.calculateYjdjForItem(gongsi, item),
    _this.calculateLdxlForItem(gongsi, start_date, stop_date, item)
  ]).then(([yjdj, ldxl]) => {
    // 添加计算字段
    item.spdm = item.cpid
    item.yjdj = yjdj
    item.ldxl = ldxl
    
   
    
    // 继续计算下一个
    _this.calculateYjdjAndLdxl(gongsi, start_date, stop_date, data, index + 1, callback)
  }).catch(error => {
    console.log(`计算第 ${index + 1} 条数据失败:`, error)
    // 设置默认值并继续
    item.spdm = item.cpid
    item.yjdj = 0
    item.ldxl = 0
    
    _this.calculateYjdjAndLdxl(gongsi, start_date, stop_date, data, index + 1, callback)
  })
},

// 计算单个项目的 yjdj
calculateYjdjForItem: function(gongsi, item) {
  return new Promise((resolve, reject) => {
    // 如果库存为0，直接返回0
    if (!item.jcsl || item.jcsl == 0) {
      resolve(0)
      return
    }
    
    var sql = `
      select 
        ifnull(qc.cpje, 0) as qichu_je,
        ifnull(ck.cpsj, 0) as last_ck_price
      from (
        select cpid, cplb, cpname, sum(cpsj*cpsl) as cpje 
        from yh_jinxiaocun_qichushu 
        where gs_name = '${gongsi}' 
        and cpid = '${item.cpid}' 
        and cpname = '${item.cpname}' 
        and cplb = '${item.cplb}'
        group by cpid, cpname, cplb
      ) as qc
      left join (
        select sp_dm, cpname, cplb, cpsj
        from yh_jinxiaocun_mingxi 
        where mxtype = '出库' 
        and sp_dm = '${item.cpid}' 
        and cpname = '${item.cpname}' 
        and cplb = '${item.cplb}'
        order by shijian desc 
        limit 1
      ) as ck on qc.cpid = ck.sp_dm and qc.cpname = ck.cpname and qc.cplb = ck.cplb
    `
    
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: { sql: sql },
      success(res) {
        if (res.result && res.result.length > 0) {
          var result = res.result[0]
          var yjdj = item.jcsl * (result.qichu_je - result.last_ck_price)
          resolve(yjdj || 0)
        } else {
          resolve(0)
        }
      },
      fail(err) {
        console.log('yjdj 计算失败:', err)
        resolve(0)
      }
    })
  })
},

// 计算单个项目的 ldxl

// 计算单个项目的 ldxl
calculateLdxlForItem: function(gongsi, start_date, stop_date, item) {
  return new Promise((resolve, reject) => {
    // 如果出库量为0，直接返回0
    if (!item.cksl || item.cksl <= 0) {
      resolve(0)
      return
    }
    
    // 计算日期差异
    var startDateObj = new Date(start_date)
    var stopDateObj = new Date(stop_date)
    var daysDiff = (stopDateObj - startDateObj) / (1000 * 60 * 60 * 24)
    
    if (daysDiff <= 0) {
      resolve(0)
      return
    }
    
    // 查询期初库存（start_date 之前的累计库存）
    var sql = `
      select 
        ifnull(qc.cpsl, 0) as qichu_sl,
        ifnull(rk.rksl, 0) as ruku_sl,
        ifnull(ck.cksl, 0) as chuku_sl,
        -- 新增：计算期末库存（stop_date 之前的累计库存）
        (ifnull(qc.cpsl, 0) + ifnull(all_rk.rksl, 0) - ifnull(all_ck.cksl, 0)) as qimo_sl
      from (
        select cpid, cplb, cpname, sum(cpsl) as cpsl 
        from yh_jinxiaocun_qichushu 
        where gs_name = '${gongsi}' 
        and cpid = '${item.cpid}' 
        and cpname = '${item.cpname}' 
        and cplb = '${item.cplb}'
        group by cpid, cpname, cplb
      ) as qc
      left join (
        select sp_dm, cpname, cplb, sum(cpsl) as rksl
        from yh_jinxiaocun_mingxi 
        where mxtype = '入库' 
        and gs_name = '${gongsi}' 
        and sp_dm = '${item.cpid}' 
        and cpname = '${item.cpname}' 
        and cplb = '${item.cplb}'
        and shijian < '${start_date}'  -- 开始日期前的入库
        group by sp_dm, cpname, cplb
      ) as rk on qc.cpid = rk.sp_dm and qc.cpname = rk.cpname and qc.cplb = rk.cplb
      left join (
        select sp_dm, cpname, cplb, sum(cpsl) as cksl
        from yh_jinxiaocun_mingxi 
        where mxtype = '出库' 
        and gs_name = '${gongsi}' 
        and sp_dm = '${item.cpid}' 
        and cpname = '${item.cpname}' 
        and cplb = '${item.cplb}'
        and shijian < '${start_date}'  -- 开始日期前的出库
        group by sp_dm, cpname, cplb
      ) as ck on qc.cpid = ck.sp_dm and qc.cpname = ck.cpname and qc.cplb = ck.cplb
      left join (
        select sp_dm, cpname, cplb, sum(cpsl) as rksl
        from yh_jinxiaocun_mingxi 
        where mxtype = '入库' 
        and gs_name = '${gongsi}' 
        and sp_dm = '${item.cpid}' 
        and cpname = '${item.cpname}' 
        and cplb = '${item.cplb}'
        and shijian < '${stop_date}'  -- 结束日期前的所有入库
        group by sp_dm, cpname, cplb
      ) as all_rk on qc.cpid = all_rk.sp_dm and qc.cpname = all_rk.cpname and qc.cplb = all_rk.cplb
      left join (
        select sp_dm, cpname, cplb, sum(cpsl) as cksl
        from yh_jinxiaocun_mingxi 
        where mxtype = '出库' 
        and gs_name = '${gongsi}' 
        and sp_dm = '${item.cpid}' 
        and cpname = '${item.cpname}' 
        and cplb = '${item.cplb}'
        and shijian < '${stop_date}'  -- 结束日期前的所有出库
        group by sp_dm, cpname, cplb
      ) as all_ck on qc.cpid = all_ck.sp_dm and qc.cpname = all_ck.cpname and qc.cplb = all_ck.cplb
    `
    
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: { sql: sql },
      success(res) {
        if (res.result && res.result.length > 0) {
          var result = res.result[0]
          
          // 期初库存 = 期初数量 + 开始日期前的入库 - 开始日期前的出库
          var preJcsl = result.qichu_sl + result.ruku_sl - result.chuku_sl
          
          // 期末库存 = 期初数量 + 结束日期前的所有入库 - 结束日期前的所有出库
          var endJcsl = result.qimo_sl
          
          // 平均库存 = (期初库存 + 期末库存) ÷ 2
          var avgJcsl = (preJcsl + endJcsl) / 2
          
          // 日均出库量 = 期间出库量 ÷ 天数
          var dailyOut = item.cksl / daysDiff
          
          // 库存周转天数 = 平均库存 ÷ 日均出库量
          var turnoverDays = avgJcsl / dailyOut
          
          // 最终结果 = 库存周转天数（去掉除以100，保留两位小数）
          var ldxl = Math.round(turnoverDays * 100) / 100
          
        
          
          resolve(ldxl || 0)
        } else {
          resolve(0)
        }
      },
      fail(err) {
        console.log('ldxl 计算失败:', err)
        resolve(0)
      }
    })
  })
},

// 处理并设置数据
processAndSetData: function(data) {
  var _this = this
  
 
  
 
  
  // 处理图片数据
  for(var i = 0; i < data.length; i++) {
    if(data[i].mark1 != null) {
      data[i].mark1 = "data:image/jpeg;base64," + data[i].mark1.replace(/[\r\n]/g, '')
    }
  }
  
  _this.setData({
    szzhi: data
  })
  
 
  console.log('最终数据:', _this.data.szzhi)
},
 up:function(){
   var _this=this
   var page = _this.data.page
   page=page-1
   if(page<1){
    wx.showToast({
      title: '已经是第一页',
      icon: 'none'
    })
    return;
   }
   _this.setData({
     page:page
   })
 
   _this.sel1()
 },
 down:function(){
 var _this=this
 var page = _this.data.page
  page=page+1
  if(page<1){
   wx.showToast({
     title: '已经是第一页',
     icon: 'none'
   })
   return;
  }
  _this.setData({
    page:page
  })

  _this.sel1()
},

  print_out:function(){
    var _this = this
    var list = _this.data.szzhi
    var output_list = []
    console.log(list)
    for(var i=0; i<list.length; i++){
      if(list[i].checkbox == true){
        output_list.push({
          sp_dm: "订单号：" + list[i].orderid,
          mingcheng: "时间：" + list[i].time2,
        })
      }
    }
    console.log(output_list)
    if(output_list.length == 0){
      wx.showToast({
        title: '未读取到选中商品',
        icon: 'none',
        duration: 2000
       })
       return;
    }
    wx.navigateTo({
      url: '../../packageJ/page/printQR/printQR?list=' + JSON.stringify(output_list),
    })
  },

  choiceDate: function (e) {
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 500
    })
    that.onLoad()
    that.onShow()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // shanchu: function(e) {
  //   var that = this
  //   const db = wx.cloud.database()
  //   var id = e.currentTarget.dataset.id
  //   var uid = e.currentTarget.dataset.uid;
  //   wx.showModal({
  //     title: '提示',
  //     content: '是否删除？',
  //     success: function(res) {
  //       if (res.confirm) {
  //         wx.cloud.callFunction({
  //           name: "sqlConnection",
  //           data: {
  //             sql: "DELETE FROM yh_jinxiaocun_mingxi where _id = '" + uid + "'"
  //           },
  //           success: res=> {
  //             wx.showToast({
  //               title: '删除成功',
  //             })
  //             that.onLoad()
  //           },
  //           fail: res=> {
  //             console.log("失败", res)
  //           }
  //         });
  //       } else if (res.cancel) {

  //         return false;
  //       }

  //     }
  //   })


  // },

  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.头部可根据日期区间进行查询。\n2.输入积压判断数量可以查询时间段内出库数量少于该值的商品。\n3.点击导出按钮可将当前显示的数据导出为excel文档。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  upd: function (e) {
    var _this = this;
    var id = e.target.dataset.id
    console.log(e.currentTarget.dataset)
    console.log(id)
    if(id != undefined){
      var uid = _this.data.szzhi[id]._id
      wx.navigateTo({
        url: '/pages/Tosell_update/Tosell_update?id=' + uid + '&fun=update',
      })
    }else{
      var hang = e.target.dataset.hang
      var all = _this.data.szzhi
      if(all[hang].checkbox == true){
        all[hang].checkbox = ""
      }else{
        all[hang].checkbox = true
      }
      _this.setData({
        szzhi: all
      })
      console.log(_this.data.szzhi)
    }

  },

  xiugai: function(e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    // wx.cloud.callFunction({
    //   name: "sqlConnection",
    //   data: {
    //     sql: "UPdat yh_jinxiaocun_mingxi set  where sp_dm='" + that.data.szzhi[id].sp_dm + "'"
    //   },
    //   success(res) {
    //     // that.setData({
    //     //   szzhi: res.result
    //     // }
    //     // )
    //     console.log
    //     // console.log(that.data.szzhi)
    //   }, fail(res) {
    //     console.log("失败", res)

    //   }
    // });
    // db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).update({
    //   data: {


    //   }
    // })

  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.szzhi;
    var title = _this.data.title
    var cloudList = {
      name : '明细',
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
  
})