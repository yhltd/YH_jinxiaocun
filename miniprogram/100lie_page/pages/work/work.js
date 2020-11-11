const getExcel = require('../util/print')
//import {print} from '../../../packageZ/util/print'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    name:'',
    date1: '',
    date2: '',
    index:'',
    input_name:'',
    column:'',
    idx:'',
    scrollTop: 0 ,
    lie:'',
    info:'', 
    duoxz:'',
    xuanz:'',
    text:"当前为及时同步更新数据",
    open:true,
    yan:true,
    yuan:true,
    select:true,
    mask:true,
    input:true,
    mask_up:true,
    more:true,
    print:true,
    false1:false,false2:false, false3:false,false4:false, false5:false,false6:false,false7:false,false8:false,
    false9:false,false10:false,false11:false,false12:false,false13:false,false14:false,false15:false,
    false16:false,false17:false,false18:false,false19:false,false20:false,false21:false,false22:false,
    false23:false,false24:false,false25:false,false26:false,false27:false,false28:false,false29:false,false30:false,false31:false,false32:false, false33:false,false34:false, false35:false,false36:false,
    false37:false,false38:false, false39:false,false40:false,false41:false,false42:false,false43:false,
    false44:false, false45:false,false46:false,false47:false,false48:false,false49:false,false50:false,
    false51:false,false52:false, false53:false,false54:false, false55:false,false56:false,false57:false,
    false58:false,false59:false,false60:false,false61:false,false62:false,false63:false,false64:false,
    false65:false,false66:false,false67:false,false68:false, false69:false,false70:false,false71:false,
    false72:false, false73:false,false74:false, false75:false,false76:false,false77:false,false78:false,
    false79:false,false80:false,false81:false,false82:false,false83:false,false84:false,false85:false,
    false86:false,false87:false,false88:false,false89:false,false90:false, false91:false,false92:false, 
    false93:false,false94:false, false95:false,false96:false,false97:false,false98:false,false99:false,
    false100:false,false101:false,false102:false,
    names:[],
    colmun:[],
    title:[],
    arr:[],
    titil:[
      {text:'A'}, {text:'B'}, {text:'C'}, {text:'D'}, {text:'E'},
      {text:'F'}, {text:'G'}, {text:'H'}, {text:'I'}, {text:'J'}, {text:'K'}, {text:'L'},
      {text:'M'}, {text:'N'}, {text:'O'}, {text:'P'}, {text:'Q'}, {text:'R'}, {text:'S'},
      {text:'T'}, {text:'U'}, {text:'V'}, {text:'W'}, {text:'X'}, {text:'Y'}, {text:'Z'},
      {text:'AA'}, {text:'AB'}, {text:'AC'}, {text:'AD'}, {text:'AE'}, {text:'AF'}, {text:'AG'},
      {text:'AH'}, {text:'AI'}, {text:'AJ'}, {text:'AK'}, {text:'AL'}, {text:'AM'}, {text:'AN'},
      {text:'AO'}, {text:'AP'}, {text:'AQ'}, {text:'AR'}, {text:'ASS'}, {text:'AT'}, {text:'AU'},
      {text:'AV'}, {text:'AW'}, {text:'AX'}, {text:'AY'}, {text:'AZ'},
      {text:'BA'}, {text:'BB'}, {text:'BC'}, {text:'BD'}, {text:'BE'}, {text:'BF'}, {text:'BG'},
      {text:'BH'}, {text:'BI'}, {text:'BJ'}, {text:'BK'}, {text:'BL'}, {text:'BM'}, {text:'BN'},
      {text:'BO'}, {text:'BP'}, {text:'BQ'}, {text:'BR'}, {text:'BS'}, {text:'BT'}, {text:'BU'},
      {text:'BV'}, {text:'BW'}, {text:'BX'}, {text:'BYY'}, {text:'BZ'},
      {text:'CA'}, {text:'CB'}, {text:'CC'}, {text:'CD'}, {text:'CE'}, {text:'CF'}, {text:'CG'},
      {text:'CH'}, {text:'CI'}, {text:'CJ'}, {text:'CK'}, {text:'CL'}, {text:'CM'}, {text:'CN'},
      {text:'CO'}, {text:'CP'}, {text:'CQ'}, {text:'CR'}, {text:'CS'}, {text:'CT'}, {text:'CU'},
      {text:'CV'},  {text:'id'},{text:'公司'}
    ],
    xuan:[
    {name: 'A', value:'A'}, {name: 'B', value:'B'},{name: 'C', value:'C'},{name: 'D', value:'D'},
    {name: 'E', value:'E'}, {name: 'F', value:'F'},{name: 'G', value:'G'},{name: 'H', value:'H'},
    {name: 'I', value:'I'}, {name: 'J', value:'J'},{name: 'K', value:'K'},{name: 'L', value:'L'},
    {name: 'M', value:'M'}, {name: 'N', value:'N'},{name: 'O', value:'O'},{name: 'P', value:'P'},
    {name: 'Q', value:'Q'}, {name: 'R', value:'R'},{name: 'S', value:'S'},{name: 'T', value:'T'},
    {name: 'U', value:'U'}, {name: 'V', value:'V'},{name: 'W', value:'W'},{name: 'X', value:'X'},
    {name: 'Y', value:'Y'}, {name: 'Z', value:'Z'},
    {name: 'AA', value: 'AA'}, {name: 'AB', value: 'AB'},{name: 'AC', value: 'AC'},{name: 'AD', value: 'AD'},
    {name: 'AE', value: 'AE'}, {name: 'AF', value: 'AF'},{name: 'AG', value: 'AG'},{name: 'AH', value: 'AH'},
    {name: 'AI', value: 'AI'}, {name: 'AJ', value: 'AJ'},{name: 'AK', value: 'AK'},{name: 'AL', value: 'AL'},
    {name: 'AM', value: 'AM'}, {name: 'AN', value: 'AN'},{name: 'AO', value: 'AO'},{name: 'AP', value: 'AP'},
    {name: 'AQ', value: 'AQ'}, {name: 'AR', value: 'AR'},{name:'ASS', value:'ASS'},{name: 'AT', value: 'AT'},
    {name: 'AU', value: 'AU'}, {name: 'AV', value: 'AV'},{name: 'AW', value: 'AW'},{name: 'AX', value: 'AX'},
    {name: 'AY', value: 'AY'}, {name: 'AZ', value: 'AZ'},
    {name: 'BA', value: 'BA'}, {name: 'BB', value:'BB'},{name:'BC', value:'BC'},{name: 'BD', value:'BD'},
    {name: 'BE', value: 'BE'}, {name: 'BF', value:'BF'},{name:'BG', value:'BG'},{name: 'BH', value:'BH'},
    {name: 'BI', value: 'BI'}, {name: 'BJ', value:'BJ'},{name:'BK', value:'BK'},{name: 'BL', value:'BL'},
    {name: 'BM', value: 'BM'}, {name: 'BN', value:'BN'},{name:'BO', value:'BO'},{name: 'BP', value:'BP'},
    {name: 'BQ', value: 'BQ'}, {name: 'BR', value:'BR'},{name:'BS', value:'BS'},{name: 'BT', value:'BT'},
    {name: 'BU', value: 'BU'}, {name: 'BV', value:'BV'},{name:'BW', value:'BW'},{name: 'BX', value:'BX'},
    {name: 'BYY', value: 'BYY'}, {name: 'BZ', value:'BZ'},
    {name: 'CA', value:'CA'}, {name: 'CB', value:'CB'},{name: 'CC', value:'CC'},{name: 'CD', value:'CD'},
    {name: 'CE', value:'CE'}, {name: 'CF', value:'CF'},{name: 'CG', value:'CG'},{name: 'CH', value:'CH'},
    {name: 'CI', value:'CI'}, {name: 'CJ', value:'CJ'},{name: 'CK', value:'CK'},{name: 'CL', value:'CL'},
    {name: 'CM', value:'CM'}, {name: 'CN', value:'CN'},{name: 'CO', value:'CO'},{name: 'CP', value:'CP'},
    {name: 'CQ', value:'CQ'}, {name: 'CR', value:'CR'},{name: 'CS', value:'CS'},{name: 'CT', value:'CT'},
    {name: 'CU', value:'CU'}, {name: 'CV', value:'CV'},{name: 'id', value:'id'}, {name: '公司', value:'公司'}
    ],
    arr:[{text:'A'}, {text:'B'}, {text:'C'}, {text:'D'}, {text:'E'},
  {text:'F'}, {text:'G'}, {text:'H'}, {text:'I'}, {text:'J'}, {text:'K'}, {text:'L'},
  {text:'M'}, {text:'N'}, {text:'O'}, {text:'P'}, {text:'Q'}, {text:'R'}, {text:'S'},
  {text:'T'}, {text:'U'}, {text:'V'}, {text:'W'}, {text:'X'}, {text:'Y'}, {text:'Z'},
  {text:'AA'}, {text:'AB'}, {text:'AC'}, {text:'AD'}, {text:'AE'}, {text:'AF'}, {text:'AG'},
  {text:'AH'}, {text:'AI'}, {text:'AJ'}, {text:'AK'}, {text:'AL'}, {text:'AM'}, {text:'AN'},
  {text:'AO'}, {text:'AP'}, {text:'AQ'}, {text:'AR'}, {text:'ASS'}, {text:'AT'}, {text:'AU'},
  {text:'AV'}, {text:'AW'}, {text:'AX'}, {text:'AY'}, {text:'AZ'},
  {text:'BA'}, {text:'BB'}, {text:'BC'}, {text:'BD'}, {text:'BE'}, {text:'BF'}, {text:'BG'},
  {text:'BH'}, {text:'BI'}, {text:'BJ'}, {text:'BK'}, {text:'BL'}, {text:'BM'}, {text:'BN'},
  {text:'BO'}, {text:'BP'}, {text:'BQ'}, {text:'BR'}, {text:'BS'}, {text:'BT'}, {text:'BU'},
  {text:'BV'}, {text:'BW'}, {text:'BX'}, {text:'BYY'}, {text:'BZ'},
  {text:'CA'}, {text:'CB'}, {text:'CC'}, {text:'CD'}, {text:'CE'}, {text:'CF'}, {text:'CG'},
  {text:'CH'}, {text:'CI'}, {text:'CJ'}, {text:'CK'}, {text:'CL'}, {text:'CM'}, {text:'CN'},
  {text:'CO'}, {text:'CP'}, {text:'CQ'}, {text:'CR'}, {text:'CS'}, {text:'CT'}, {text:'CU'},
  {text:'CV'},  {text:'id'},{text:'公司'}],
    list:[],
    users:[],
    insertList :[],
    ids:[],
    titleres:[],
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this   
    if(options!=undefined){
      that.setData({
        gongsi:options.gongsi,
        name:options.name,      
      })
    }
    // var randm=[];
    // for (var ii=0;ii<6;ii++){
    //   var num =Math.floor( Math.random()*33)+1    
    //       randm.push(num)    
    // }
     
    //  console.log('随机数',randm)
    var sql = " select C from baitaoquanxian_renyun WHERE B = '" + that.data.gongsi + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        var name = res.result.recordset
        var names = []
        for(var i=0 ;i<name.length;i++){
           names.push(name[i].C)
        }
        that.setData({
           names,
        })
      }
    }) 
      // wx.removeStorageSync('keytitil')
      // wx.removeStorageSync('keylist')    
    var ssql = "select * from baitaoquanxian where 公司 = '" + that.data.gongsi + "' "
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : ssql
      },
      success(res){
        var list = res.result.recordset      
        that.setData({
          list
        })
      }
    })  
    let duoxz = wx.getStorageSync('keylist')
    if(duoxz!=""){that.setData({
      duoxz: duoxz
    })}
    let titil = wx.getStorageSync('keytitil')
    if(titil!=""){that.setData({
      titil: titil
    })}
    that.yin();
  },
 
  // 开始日期
  strDateChange:function(e){
    this.setData({
      date1:e.detail.value
    })
  },
  // 结束日期
  endDateChange:function(e){
    this.setData({
      date2:e.detail.value
    })
  },
  // 人员
  renChange : function(e){
    var _this =this;
    _this.setData({
      index : e.detail.value
    })
  },
  // 日期图层
  hid_view:function() {
    var that=this
    that.setData({
      select:true,
      mask:true, 
    })
  },
 // 插入图层
  hid_up:function(){
    var that=this
    that.setData({
      input:true,
      mask_up:true, 
      more:true
    })
  },
  //取消
  up_view:function(){
    var that=this
    that.setData({
      input:true,
      mask_up:true,  
    })
  },
  // 日期查询按钮
  dateclick:function(e){
    var that=this
    var index = that.data.index
   if(that.data.date1.length==0 || that.data.date2.length==0 || that.data.names[index]==""){
     return;
   }
   that.setData({
    select:false,
    mask:false,
   })
    var sql = "select * from baitaoquanxian where 公司 = '" + that.data.gongsi + "' and 人员 = '" + that.data.names[index] + "' and 日期  >='" + that.data.date1 + "'and 日期<= '" + that.data.date2 + "'"
     wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
        success(res){
          console.log(res)
          var users =res.result.recordset
          that.setData({
          users
          })
        }
    })   
  },
  // 及时开关
  jishi:function(e){
    var that = this
    if(that.data.open){
      that.setData({
        text:"当前需手动同步更新数据"
      })
    }else{
      that.setData({
        text:"当前为及时同步更新数据"
      })
    }
    that.data.open=!that.data.open
  },
  //添加一行
  addhang:function(){
    var obj = new Object()
    var that = this
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    var sql =" insert into baitaoquanxian (日期,人员,公司) values ('" + currentdate + "','" + that.data.name+ "','" +that.data.gongsi + "') "
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success : res=> {
        that.onLoad();
      }
    })  
    var len = this.data.list.length 
    this.setData({
      scrollTop: 1000 * len  // 这里我们的单对话区域最高1000，取了最大值，应该有方法取到精确的
    });
  },
// 保存
  baocun:function(e){
    var that=this
    var obj = new Object()
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    var sql = ""
    var flag = true
    var list = that.data.list
    var idx =that.data.idx
    var ids = that.data.ids
    var insertList = that.data.insertList  
    for(var a = 0;a<ids.length;a++){
       sql+="update baitaoquanxian set "     
      for( var b = 0;b<insertList.length;b++){
        if(ids[a].id == insertList[b].id){
          sql+= insertList[b].column + "='" + insertList[b].val+ "',"
        }
      }
      sql = sql.substring(0,sql.length-1)
      sql+= ",日期 = '" + currentdate + "',人员 = '" + that.data.name+ "', 公司 = '" +that.data.gongsi + "'  where id = " + ids[a].id + ";"
    } 
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        if(that.data.insertList.length>0){
          wx.showToast({
            title: '保存成功',
          })
        }
        that.onLoad();
        that.setData({
          insertList:[],
          ids:[]
       })
      }
    })
  },
  // 点击事件
click:function(e){
  var that=this
  var idx = e.currentTarget.dataset.index
  var column = e.currentTarget.dataset.column 
  var clie = e.currentTarget.dataset.clie
  var lie = that.data.lie  
  var info = that.data.info
  var list=that.data.list  
  that.setData({
    column,
     idx,
  })
  if(list[idx][column]==""){
    that.setData({
      info:''
    })
  }else if(list[idx][column]!=""){
    that.setData({
      info:list[idx][column]
    })
  }
  var sqls= "select "+ clie +" from baitaoquanxian_copy1 WHERE quanxian = '" + that.data.gongsi + "' and B = '" + that.data.name + "' "
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query : sqls
    },
    success(res){
      console.log("res结果:"+res)
      if(res.result.recordset[0][clie]=="√"){      
      var csql = "select " + column + " from baitaoquanxian_copy2 where 公司 = '" + that.data.gongsi + "'"
    
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data:{
          query : csql
        },
        success(res){         
          if(res.result.recordset[0][column]=="" || res.result.recordset[0][column]== that.data.name ){
            var sql = "update baitaoquanxian_copy2 set "+ column +"= '" + that.data.name + "' where id = 7 and 公司 = '"+ that.data.gongsi + "';update baitaoquanxian_copy2 set "+ column +"= '" + that.data.gongsi + "' where id = 8 and 公司 = '"+ that.data.gongsi + "';" 
            that.setData({
              input:false,
              mask_up:false,              
            }) 
               if(lie!="" && lie!=column){
                 sql+="update baitaoquanxian_copy2 set "+ lie +"= '' where id = 7 and 公司 = '"+ that.data.gongsi + "';update baitaoquanxian_copy2 set "+ lie +"= '' where id = 8 and 公司 = '"+ that.data.gongsi + "'"
               }             
            wx.cloud.callFunction({
              name: 'sqlServer_117',
              data:{
                query : sql
              },        
              success : res=> {
                that.setData({
                  lie:column
                })              
              }
            })
          }else if(res.result.recordset[0][column]!="" || res.result.recordset[0][column]!= that.data.name ){
            that.setData({
              input:true,
              mask_up:true,  
           })
            wx.showToast({
              title: '该列有人使用，请使用其他列',
              icon:"none"
            })     
            return;
          }
        }            
      })
      }else{
        wx.showToast({
          title: '你没有该列权限',
          icon:"none"
        })
      }
    }
  }) 
},
// 把手动保存的结果记录起来
setList : function(e){
  var that = this
  var colume = that.data.column
  var val = e.detail.value.input_name
  var idx = that.data.idx
  var list = that.data.list
  var id
  var ids = that.data.ids
  var insertList = that.data.insertList
  if(ids.length==0){
    ids.push({ id:list[idx].id })
  }else{
    let num = 0
    for(let i=0;i<ids.length;i++){
      if(list[idx].id==ids[i])
        num++
        break;
    }
    if(num==0){
      ids.push({ id:list[idx].id })
    }
  }
  insertList.push({
    column : colume,
    idx :idx,
    val :val,
    id:list[idx].id 
  })
  that.setData({
    ["list["+idx+"]."+colume+""] : val,
    insertList,
    ids,
  })
},
// 提交
saves:function(e){ 
  var that = this
  var open = that.data.open;
  var obj = new Object()
  if(!open){
    that.setList(e)
    that.setData({
      input:true,
      mask_up:true,
    })
    return
  }
  var list = that.data.list
  var idx =that.data.idx
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  var input_name = that.data.input_name
  var column = that.data.column
  that.setData({
    input_name:e.detail.value.input_name,
  }) 
  if(column=="A" ||column=="B" || column=="C" ||column=="D"){
    if(isNaN(that.data.input_name)==true){
      wx.showToast({
        title: '请输数字',
      }) 
      return;
    }
  }
  if(that.data.input_name == ""){
    wx.showToast({
      title: '请输入',
    }) 
    return;
  }
  var sql
  var flag = true
  for(var j=0;j<list.length;j++){
    console.log(list[j].id,j)
    if(list[j].id!=undefined && list[idx].id == list[j].id){
      sql =" update baitaoquanxian set "+ that.data.column +" = '" +that.data.input_name + "',日期 = '" + currentdate + "',人员 = '" + that.data.name+ "', 公司 = '" +that.data.gongsi + "'  where id='"+list[idx].id + "'"
      flag=false   
    }
  }  
  if(flag){
    sql =" insert into baitaoquanxian ("+ that.data.column +",日期,人员,公司) values ('" +that.data.input_name + "','" + currentdate + "','" + that.data.name+ "','" +that.data.gongsi + "') "
  }  
   wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query : sql
    },
    success(res){
      if(that.data.input_name!=""){
        wx.showToast({
          title: '已保存',
        }) 
      } 
      that.onLoad();
      that.setData({
        insertList:[],
        input:true,
        mask_up:true,  
     })
    }
   })  
},
//关闭页面
onUnload() {
  var that=this
  var lie = that.data.lie
  var sql = "update baitaoquanxian_copy2 set "+ lie +"= '' where id = 7 and 公司 = '"+ that.data.gongsi + "';update baitaoquanxian_copy2 set "+ lie +"= '' where id = 8 and 公司 = '"+ that.data.gongsi + "' " 
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query : sql
    },
  })
},
//显示加载
onReady: function () {
  wx.showLoading({
    title: '加载中',
    mask : 'true'
  }) 
  setTimeout(function () {
    wx.hideLoading()
  }, 3000)
},
//更多
mor:function(){
  var that=this
  that.setData({
    more:false,
    mask_up:false
  })
},
// 数据汇总
dateGather(){
var that=this
that.setData({  
  mask_up:true,
  more:true,  
})
  wx.navigateTo({
    url: '../gather/gather?gongsi='+ that.data.gongsi,
  })
},
// 隐藏列
hid(){
  var that=this
  that.setData({
    mask_up:true,
    more:true, 
    yuan:false, 
  })
},
//显示列
showlie(){
  var that=this
  var duoxz=that.data.duoxz
  var titil = that.data.titil
  wx.removeStorageSync('keytitil')
   wx.removeStorageSync('keylist')  
  var arr=[
    {text:'A'}, {text:'B'}, {text:'C'}, {text:'D'}, {text:'E'},
    {text:'F'}, {text:'G'}, {text:'H'}, {text:'I'}, {text:'J'}, {text:'K'}, {text:'L'},
    {text:'M'}, {text:'N'}, {text:'O'}, {text:'P'}, {text:'Q'}, {text:'R'}, {text:'S'},
    {text:'T'}, {text:'U'}, {text:'V'}, {text:'W'}, {text:'X'}, {text:'Y'}, {text:'Z'},
    {text:'AA'}, {text:'AB'}, {text:'AC'}, {text:'AD'}, {text:'AE'}, {text:'AF'}, {text:'AG'},
    {text:'AH'}, {text:'AI'}, {text:'AJ'}, {text:'AK'}, {text:'AL'}, {text:'AM'}, {text:'AN'},
    {text:'AO'}, {text:'AP'}, {text:'AQ'}, {text:'AR'}, {text:'ASS'}, {text:'AT'}, {text:'AU'},
    {text:'AV'}, {text:'AW'}, {text:'AX'}, {text:'AY'}, {text:'AZ'},
    {text:'BA'}, {text:'BB'}, {text:'BC'}, {text:'BD'}, {text:'BE'}, {text:'BF'}, {text:'BG'},
    {text:'BH'}, {text:'BI'}, {text:'BJ'}, {text:'BK'}, {text:'BL'}, {text:'BM'}, {text:'BN'},
    {text:'BO'}, {text:'BP'}, {text:'BQ'}, {text:'BR'}, {text:'BS'}, {text:'BT'}, {text:'BU'},
    {text:'BV'}, {text:'BW'}, {text:'BX'}, {text:'BYY'}, {text:'BZ'},
    {text:'CA'}, {text:'CB'}, {text:'CC'}, {text:'CD'}, {text:'CE'}, {text:'CF'}, {text:'CG'},
    {text:'CH'}, {text:'CI'}, {text:'CJ'}, {text:'CK'}, {text:'CL'}, {text:'CM'}, {text:'CN'},
    {text:'CO'}, {text:'CP'}, {text:'CQ'}, {text:'CR'}, {text:'CS'}, {text:'CT'}, {text:'CU'},
    {text:'CV'},  {text:'id'},{text:'公司'}
  ]
  that.setData({
    more:true, 
    mask_up:true,
    titil:arr,
    false1:false,false2:false, false3:false,false4:false, false5:false,false6:false,false7:false,false8:false,
    false9:false,false10:false,false11:false,false12:false,false13:false,false14:false,false15:false,
    false16:false,false17:false,false18:false,false19:false,false20:false,false21:false,false22:false,
    false23:false,false24:false,false25:false,false26:false,false27:false,false28:false,false29:false,false30:false,false31:false,false32:false, false33:false,false34:false, false35:false,false36:false,
    false37:false,false38:false, false39:false,false40:false,false41:false,false42:false,false43:false,
    false44:false, false45:false,false46:false,false47:false,false48:false,false49:false,false50:false,
    false51:false,false52:false, false53:false,false54:false, false55:false,false56:false,false57:false,
    false58:false,false59:false,false60:false,false61:false,false62:false,false63:false,false64:false,
    false65:false,false66:false,false67:false,false68:false, false69:false,false70:false,false71:false,
    false72:false, false73:false,false74:false, false75:false,false76:false,false77:false,false78:false,
    false79:false,false80:false,false81:false,false82:false,false83:false,false84:false,false85:false,
    false86:false,false87:false,false88:false,false89:false,false90:false, false91:false,false92:false, 
    false93:false,false94:false, false95:false,false96:false,false97:false,false98:false,false99:false,
    false100:false,false101:false,false102:false,
  })
},
// 打印
pringbiao(){
  var that=this
  that.setData({
    print:false
  })
},
// 服务通知
service(){
//   1：参数
//  这里先说参数的意义，如何获取下面详细讲解。
// openid：每个微信唯一的id，服务通知用它的作用是你想要通知谁，谁的openid就给你发送过去，它类似你的电话号码，给你发短信，必须知道你的电话号。
// access_token：因为如何实现微信服务通知，底层我们不知道，微信给了接口，想用这个接口必须有access_token参数。因为微信保密做的还相对严格，所以获取就需要各种参数。
// form_id：我对这个理解不是很到位，在我看来就是触发这个微信服务通知函数、参数；先这样理解，你知道它必须获取就可以了。
// template_id：模板id，这个就是微信公众平台里边，你选用什么格式通知模板，就把对应的template_id粘贴过来。
// appid、secret：在微信公众平台里边，这个大家应该都熟悉，我就不多说了。
  var that=this
  wx.getSetting({
    withSubscriptions:true,
    success(res){
    console.log(res)
    }
  })
  that.setData({
    more:true, 
    mask_up:true,
  })
},
// 卡包
card(){
  // 1、必须先注册一个公众号（注：必须是企业服务号）
  // 2、必须公众号开通微信认证或者支付功能（注：任意开通一个即可）
  // 3、小程序必须开通微信认证
  // 以上三条必须同时具备方可实现此功能（注：微信公众号和小程序账号必须是在同一主体信息下的方可实现此功能）

 

  var that=this
},
// 图形分析
picture(){
  var that=this
  wx.navigateTo({
    url: '../picture/picture?gongsi='+ that.data.gongsi,
  })
  that.setData({
    more:true, 
    mask_up:true,
  })
},
//多选
duoxuan:function(e){
  var that=this
  var duoxz=e.detail.value
  that.setData({
    duoxz,
  })
},
// 选择打印
xuanz(e){
  var that=this
  var xuanz=e.detail.value
  console.log(xuanz)
  that.setData({
    xuanz,
  })
},
//隐藏
yin:function(){
  var that=this
  var titil = that.data.titil
  var duoxz=that.data.duoxz
  that.setData({
    yuan:true,
  })
  for(var j =0;j<titil.length;j++){
    for(var i =0;i<duoxz.length;i++){
      if(titil[j].text==duoxz[i]){
        titil.splice(j,1)
        j--
        break
      }
      if(duoxz[i]=='100'){
        titil.splice(0,102)
      }
    }
  }
  wx.setStorageSync('keytitil', titil)
  wx.setStorageSync('keylist', duoxz)
  for(var a=0;a<duoxz.length;a++){
    if(duoxz[a]=='A'){
      that.setData({
        false1:true
      })
    }
    if(duoxz[a]=='B'){
      that.setData({
        false2:true
      })
    }
    if(duoxz[a]=='C'){
      that.setData({
        false3:true
      })
    }
    if(duoxz[a]=='D'){
      that.setData({
        false4:true
      })
    }
    if(duoxz[a]=='E'){
      that.setData({
        false5:true
      })
    }
    if(duoxz[a]=='F'){
      that.setData({
        false6:true
      })
    }
    if(duoxz[a]=='G'){
      that.setData({
        false7:true
      })
    }
    if(duoxz[a]=='H'){
      that.setData({
        false8:true
      })
    }
    if(duoxz[a]=='I'){
      that.setData({
        false9:true
      })
    }
    if(duoxz[a]=='J'){
      that.setData({
        false10:true
      })
    }
    if(duoxz[a]=='K'){
      that.setData({
        false11:true
      })
    }
    if(duoxz[a]=='L'){
      that.setData({
        false12:true
      })
    }
    if(duoxz[a]=='M'){
      that.setData({
        false13:true
      })
    }
    if(duoxz[a]=='N'){
      that.setData({
        false14:true
      })
    }
    if(duoxz[a]=='O'){
      that.setData({
        false15:true
      })
    }
    if(duoxz[a]=='P'){
      that.setData({
        false16:true
      })
    }
    if(duoxz[a]=='Q'){
      that.setData({
        false17:true
      })
    }
    if(duoxz[a]=='R'){
      that.setData({
        false18:true
      })
    }
    if(duoxz[a]=='S'){
      that.setData({
        false19:true
      })
    }
    if(duoxz[a]=='T'){
      that.setData({
        false20:true
      })
    }
    if(duoxz[a]=='U'){
      that.setData({
        false21:true
      })
    }
    if(duoxz[a]=='V'){
      that.setData({
        false22:true
      })
    }
    if(duoxz[a]=='W'){
      that.setData({
        false23:true
      })
    }
    if(duoxz[a]=='X'){
      that.setData({
        false24:true
      })
    }
    if(duoxz[a]=='Y'){
      that.setData({
        false25:true
      })
    }
    if(duoxz[a]=='Z'){
      that.setData({
        false26:true
      })
    }
    if(duoxz[a]=='AA'){
      that.setData({
        false27:true
      })
    }
    if(duoxz[a]=='AB'){
      that.setData({
        false28:true
      })
    }
    if(duoxz[a]=='AC'){
      that.setData({
        false29:true
      })
    }
    if(duoxz[a]=='AD'){
      that.setData({
        false30:true
      })
    }
    if(duoxz[a]=='AE'){
      that.setData({
        false31:true
      })
    }
    if(duoxz[a]=='AF'){
      that.setData({
        false32:true
      })
    }
    if(duoxz[a]=='AG'){
      that.setData({
        false33:true
      })
    }
    if(duoxz[a]=='AH'){
      that.setData({
        false34:true
      })
    }
    if(duoxz[a]=='AI'){
      that.setData({
        false35:true
      })
    }
    if(duoxz[a]=='AJ'){
      that.setData({
        false36:true
      })
    }
    if(duoxz[a]=='AK'){
      that.setData({
        false37:true
      })
    }
    if(duoxz[a]=='AL'){
      that.setData({
        false38:true
      })
    }
    if(duoxz[a]=='AM'){
      that.setData({
        false39:true
      })
    }
    if(duoxz[a]=='AN'){
      that.setData({
        false40:true
      })
    }
    if(duoxz[a]=='AO'){
      that.setData({
        false41:true
      })
    }
    if(duoxz[a]=='AP'){
      that.setData({
        false42:true
      })
    }
    if(duoxz[a]=='AQ'){
      that.setData({
        false43:true
      })
    }
    if(duoxz[a]=='AR'){
      that.setData({
        false44:true
      })
    }
    if(duoxz[a]=='ASS'){
      that.setData({
        false45:true
      })
    }
    if(duoxz[a]=='AT'){
      that.setData({
        false46:true
      })
    }
    if(duoxz[a]=='AU'){
      that.setData({
        false47:true
      })
    }
    if(duoxz[a]=='AV'){
      that.setData({
        false48:true
      })
    }
    if(duoxz[a]=='AW'){
      that.setData({
        false49:true
      })
    }
    if(duoxz[a]=='AX'){
      that.setData({
        false50:true
      })
    }
    if(duoxz[a]=='AY'){
      that.setData({
        false51:true
      })
    }
    if(duoxz[a]=='AZ'){
      that.setData({
        false52:true
      })
    }
    if(duoxz[a]=='BA'){
      that.setData({
        false53:true
      })
    }
    if(duoxz[a]=='BB'){
      that.setData({
        false54:true
      })
    }
    if(duoxz[a]=='BC'){
      that.setData({
        false55:true
      })
    }
    if(duoxz[a]=='BD'){
      that.setData({
        false56:true
      })
    }
    if(duoxz[a]=='BE'){
      that.setData({
        false57:true
      })
    }
    if(duoxz[a]=='BF'){
      that.setData({
        false58:true
      })
    }
    if(duoxz[a]=='BG'){
      that.setData({
        false59:true
      })
    }
    if(duoxz[a]=='BH'){
      that.setData({
        false60:true
      })
    }
    if(duoxz[a]=='BI'){
      that.setData({
        false61:true
      })
    }
    if(duoxz[a]=='BJ'){
      that.setData({
        false62:true
      })
    }
    if(duoxz[a]=='BK'){
      that.setData({
        false63:true
      })
    }
    if(duoxz[a]=='BL'){
      that.setData({
        false64:true
      })
    }
    if(duoxz[a]=='BM'){
      that.setData({
        false65:true
      })
    }
    if(duoxz[a]=='BN'){
      that.setData({
        false66:true
      })
    }
    if(duoxz[a]=='BO'){
      that.setData({
        false67:true
      })
    }
    if(duoxz[a]=='BP'){
      that.setData({
        false68:true
      })
    }
    if(duoxz[a]=='BQ'){
      that.setData({
        false69:true
      })
    }
    if(duoxz[a]=='BR'){
      that.setData({
        false70:true
      })
    }
    if(duoxz[a]=='BS'){
      that.setData({
        false71:true
      })
    }
    if(duoxz[a]=='BT'){
      that.setData({
        false72:true
      })
    }
    if(duoxz[a]=='BU'){
      that.setData({
        false73:true
      })
    }
    if(duoxz[a]=='BV'){
      that.setData({
        false74:true
      })
    }
    if(duoxz[a]=='BW'){
      that.setData({
        false75:true
      })
    }
    if(duoxz[a]=='BX'){
      that.setData({
        false76:true
      })
    }
    if(duoxz[a]=='BYY'){
      that.setData({
        false77:true
      })
    }
    if(duoxz[a]=='BZ'){
      that.setData({
        false78:true
      })
    }
    if(duoxz[a]=='CA'){
      that.setData({
        false79:true
      })
    }
    if(duoxz[a]=='CB'){
      that.setData({
        false80:true
      })
    }
    if(duoxz[a]=='CC'){
      that.setData({
        false81:true
      })
    }
    if(duoxz[a]=='CD'){
      that.setData({
        false82:true
      })
    }
    if(duoxz[a]=='CE'){
      that.setData({
        false83:true
      })
    }
    if(duoxz[a]=='CF'){
      that.setData({
        false84:true
      })
    }
    if(duoxz[a]=='CG'){
      that.setData({
        false85:true
      })
    }
    if(duoxz[a]=='CH'){
      that.setData({
        false86:true
      })
    }
    if(duoxz[a]=='CI'){
      that.setData({
        false87:true
      })
    }
    if(duoxz[a]=='CJ'){
      that.setData({
        false88:true
      })
    }
    if(duoxz[a]=='CK'){
      that.setData({
        false89:true
      })
    }
    if(duoxz[a]=='CL'){
      that.setData({
        false90:true
      })
    }
    if(duoxz[a]=='CM'){
      that.setData({
        false91:true
      })
    }
    if(duoxz[a]=='CN'){
      that.setData({
        false92:true
      })
    }
    if(duoxz[a]=='CO'){
      that.setData({
        false93:true
      })
    }
    if(duoxz[a]=='CP'){
      that.setData({
        false94:true
      })
    }
    if(duoxz[a]=='CQ'){
      that.setData({
        false95:true
      })
    }
    if(duoxz[a]=='CR'){
      that.setData({
        false96:true
      })
    }
    if(duoxz[a]=='CS'){
      that.setData({
        false97:true
      })
    }
    if(duoxz[a]=='CT'){
      that.setData({
        false98:true
      })
    }
    if(duoxz[a]=='CU'){
      that.setData({
        false99:true
      })
    }
    if(duoxz[a]=='CV'){
      that.setData({
        false100:true
      })
    }  
    if(duoxz[a]=='id'){
      that.setData({
        false101:true
      })
    }  
    if(duoxz[a]=='公司'){
      that.setData({
        false102:true
      })
    }  
    if(duoxz[a]=='100'){
      that.setData({
      false1:true,false2:true, false3:true,false4:true, false5:true,false6:true,false7:true,false8:true,
      false9:true,false10:true,false11:true,false12:true,false13:true,false14:true,false15:true,
      false16:true,false17:true,false18:true,false19:true,false20:true,false21:true,false22:true,
      false23:true,false24:true,false25:true,false26:true,false27:true,false28:true,false29:true,false30:true,false31:true,false32:true, false33:true,false34:true, false35:true,false36:true,
      false37:true,false38:true, false39:true,false40:true,false41:true,false42:true,false43:true,
      false44:true, false45:true,false46:true,false47:true,false48:true,false49:true,false50:true,
      false51:true,false52:true, false53:true,false54:true, false55:true,false56:true,false57:true,
      false58:true,false59:true,false60:true,false61:true,false62:true,false63:true,false64:true,
      false65:true,false66:true,false67:true,false68:true, false69:true,false70:true,false71:true,
      false72:true, false73:true,false74:true, false75:true,false76:true,false77:true,false78:true,
      false79:true,false80:true,false81:true,false82:true,false83:true,false84:true,false85:true,
      false86:true,false87:true,false88:true,false89:true,false90:true, false91:true,false92:true, 
      false93:true,false94:true, false95:true,false96:true,false97:true,false98:true,false99:true,
      false100:true,false101:true,false102:true,
      })
    } 
  }
  that.setData({
    titil,
  })
},
// 打印titil
print:function(){
  var that=this
  var xuanz=that.data.xuanz
  var titil=that.data.titil
  var list=that.data.list
  var arr = [{text:'A'}, {text:'B'}, {text:'C'}, {text:'D'}, {text:'E'},
  {text:'F'}, {text:'G'}, {text:'H'}, {text:'I'}, {text:'J'}, {text:'K'}, {text:'L'},
  {text:'M'}, {text:'N'}, {text:'O'}, {text:'P'}, {text:'Q'}, {text:'R'}, {text:'S'},
  {text:'T'}, {text:'U'}, {text:'V'}, {text:'W'}, {text:'X'}, {text:'Y'}, {text:'Z'},
  {text:'AA'}, {text:'AB'}, {text:'AC'}, {text:'AD'}, {text:'AE'}, {text:'AF'}, {text:'AG'},
  {text:'AH'}, {text:'AI'}, {text:'AJ'}, {text:'AK'}, {text:'AL'}, {text:'AM'}, {text:'AN'},
  {text:'AO'}, {text:'AP'}, {text:'AQ'}, {text:'AR'}, {text:'ASS'}, {text:'AT'}, {text:'AU'},
  {text:'AV'}, {text:'AW'}, {text:'AX'}, {text:'AY'}, {text:'AZ'},
  {text:'BA'}, {text:'BB'}, {text:'BC'}, {text:'BD'}, {text:'BE'}, {text:'BF'}, {text:'BG'},
  {text:'BH'}, {text:'BI'}, {text:'BJ'}, {text:'BK'}, {text:'BL'}, {text:'BM'}, {text:'BN'},
  {text:'BO'}, {text:'BP'}, {text:'BQ'}, {text:'BR'}, {text:'BS'}, {text:'BT'}, {text:'BU'},
  {text:'BV'}, {text:'BW'}, {text:'BX'}, {text:'BYY'}, {text:'BZ'},
  {text:'CA'}, {text:'CB'}, {text:'CC'}, {text:'CD'}, {text:'CE'}, {text:'CF'}, {text:'CG'},
  {text:'CH'}, {text:'CI'}, {text:'CJ'}, {text:'CK'}, {text:'CL'}, {text:'CM'}, {text:'CN'},
  {text:'CO'}, {text:'CP'}, {text:'CQ'}, {text:'CR'}, {text:'CS'}, {text:'CT'}, {text:'CU'},
  {text:'CV'},  {text:'id'},{text:'公司'}]
  var num=0;
  var quan =0
  if(xuanz.length<=0){
    wx.showToast({
      title: '请选择',
      icon:'none'
    })
    return;
  }
  if(titil.length<102){
    titil=[]
    titil=arr
  }
  for(var j= 0;j<titil.length;j++){
    num=0
    for(var i =0;i<xuanz.length;i++){
      if(titil[j].text == xuanz[i]){
       num=1
       break
      }
    }
    if(num==0){
      titil.splice(j,1)
      j--
    }    
  }
  for(var a =0;a<xuanz.length;a++){   
    if(xuanz[a]=='100'){
      quan=100
      break;
    }
  } 
  if(quan==100){
    titil=arr
    that.setData({
      titil,
    })
  }else{
    that.setData({
      titil,    
    })
  }
  getExcel.print(titil,list,'工作台') 
  that.setData({
    print:true,
    more:true, 
    mask_up:true,
  })
  that.onLoad();
},

})
