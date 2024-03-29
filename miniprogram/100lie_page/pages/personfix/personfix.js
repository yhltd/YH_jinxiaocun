// 100lie_page/pages/personfix/personfix.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    renyuan_name:'',
    quanxian_leixing :'修改',
    quanxian_list:['修改','查询'],
    titil:[
      // {text:'公司'},
       {text:'访问人员'},
       {text:'权限类型'},
       {text:'A'}, {text:'B'}, 
       {text:'C'}, {text:'D'}, {text:'E'},
      {text:'F'}, {text:'G'}, {text:'H'}, {text:'I'}, {text:'J'}, {text:'K'}, {text:'L'},
      {text:'M'}, {text:'N'}, {text:'O'}, {text:'P'}, {text:'Q'}, {text:'R'}, {text:'S'},
      {text:'T'}, {text:'U'}, {text:'V'}, {text:'W'}, {text:'X'}, {text:'Y'}, {text:'Z'},
      {text:'AA'}, {text:'AB'}, {text:'AC'}, {text:'AD'}, {text:'AE'}, {text:'AF'}, {text:'AG'},
      {text:'AH'}, {text:'AI'}, {text:'AJ'}, {text:'AK'}, {text:'AL'}, {text:'AM'}, {text:'AN'},
      {text:'AO'}, {text:'AP'}, {text:'AQ'}, {text:'AR'}, {text:'AS'}, {text:'AT'}, {text:'AU'},
      {text:'AV'}, {text:'AW'}, {text:'AX'}, {text:'AY'}, {text:'AZ'},
      {text:'BA'}, {text:'BB'}, {text:'BC'}, {text:'BD'}, {text:'BE'}, {text:'BF'}, {text:'BG'},
      {text:'BH'}, {text:'BI'}, {text:'BJ'}, {text:'BK'}, {text:'BL'}, {text:'BM'}, {text:'BN'},
      {text:'BO'}, {text:'BP'}, {text:'BQ'}, {text:'BR'}, {text:'BS'}, {text:'BT'}, {text:'BU'},
      {text:'BV'}, {text:'BW'}, {text:'BX'}, {text:'BY'}, {text:'BZ'},
      {text:'CA'}, {text:'CB'}, {text:'CC'}, {text:'CD'}, {text:'CE'}, {text:'CF'}, {text:'CG'},
      {text:'CH'}, {text:'CI'}, {text:'CJ'}, {text:'CK'}, {text:'CL'}, {text:'CM'}, {text:'CN'},
      {text:'CO'}, {text:'CP'}, {text:'CQ'}, {text:'CR'}, {text:'CS'}, {text:'CT'}, {text:'CU'},
      {text:'CV'}
      // , {text:'CW'}, {text:'CX'}, 
    ],
    list:[],
    handle : true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    if(options!=undefined){
      _this.setData({
        gongsi:userInfo.B,
        userInfo:userInfo
      })
    }

    var sql="select ins,del,upd,sel from baitaoquanxian_department where company = '" + _this.data.userInfo.B + "' and department_name ='" + _this.data.userInfo.bumen + "' and view_name='人员权限设置'"
    var _this =this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){     
        var quanxian = res.result.recordset
        if(quanxian == []){
          wx.showToast({
            title: '未读取到部门权限信息，请联系管理员',
            icon:"none"
          })
          return;
        }else{
          _this.setData({
            zeng:quanxian[0].ins,
            shan:quanxian[0].del,
            gai:quanxian[0].upd,
            cha:quanxian[0].sel,
          })
          _this.tableShow()
        }
      }
    })

    
  },

tableShow:function(){
  var _this = this
  if(_this.data.cha != '是'){
    wx.showToast({
      title: '无查询权限',
      icon:"none"
    })
    return;
  }
  var sql="select * from baitaoquanxian_copy1 WHERE quanxian = '" + _this.data.gongsi + "' and chashanquanxian='" + _this.data.quanxian_leixing + "'"
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query : sql
    },
    success(res){
      var list =res.result.recordset
      _this.setData({
        list
      })
    }
  })
},

click:function(e){
  var _this=this
  var list=_this.data.list
  var index= e.currentTarget.dataset.index
  var colmun=e.currentTarget.dataset.column
  var names= e.currentTarget.dataset.name
  var sqls= "select " + colmun + " from baitaoquanxian_gongsi where B ='"+ _this.data.gongsi +"'  "
    wx.cloud.callFunction({
      name: 'sqlServer_117',
    data:{
      query: sqls
    },
    success(res){
      if(res.result.recordset[0][colmun]=="√"){
        _this.update(list,index,colmun,names)
      }else{
        wx.showToast({
          title: '你没有该列权限',
          icon:"none"
        })
      }
    }
    })
},

bindPickerChange1: function(e) {
  var _this = this
  console.log('picker发送选择改变，携带值为', e.detail.value)
  _this.setData({
    quanxian_leixing: _this.data.quanxian_list[e.detail.value]
  })
},

click_view:function(e){
  var _this = this
  _this.setData({
    id: _this.data.list[e.currentTarget.dataset.index].id,
    handle:false,
  })
},

quanxian_piliang1(){
  var _this = this
  if(_this.data.gai != '是'){
    wx.showToast({
      title: '无修改权限',
      icon:"none"
    })
    return;
  }
  console.log(_this.data.id)
  var sql = "update baitaoquanxian_copy1 set C='√',D='√',E='√',F='√',G='√',H='√',I='√',J='√',K='√',L='√',M='√',N='√',O='√',P='√',Q='√',R='√',S='√',T='√',U='√',V='√',W='√',X='√',Y='√',Z='√',AA='√',AB='√',AC='√',AD='√',AE='√',AF='√',AG='√',AH='√',AI='√',AJ='√',AK='√',AL='√',AM='√',AN='√',AO='√',AP='√',AQ='√',AR='√',ASS='√',AT='√',AU='√',AV='√',AW='√',AX='√',AY='√',AZ='√',BA='√',BB='√',BC='√',BD='√',BE='√',BF='√',BG='√',BH='√',BI='√',BJ='√',BK='√',BL='√',BM='√',BN='√',BO='√',BP='√',BQ='√',BR='√',BS='√',BT='√',BU='√',BV='√',BW='√',BX='√',BYY='√',BZ='√',CA='√',CB='√',CC='√',CD='√',CE='√',CF='√',CG='√',CH='√',CI='√',CJ='√',CK='√',CL='√',CM='√',CN='√',CO='√',CP='√',CQ='√',CR='√',CS='√',CT='√',CU='√',CV='√',CW='√',CX='√' where id=" + _this.data.id + ";"
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query: sql
    },
    success(res){
      wx.showToast({
        title: '全部勾选完成',
        icon:"none"
      })
      _this.setData({
        handle: true
      })
      _this.tableShow()
    }
  })
},

quanxian_piliang2(){
  var _this = this
  if(_this.data.gai != '是'){
    wx.showToast({
      title: '无修改权限',
      icon:"none"
    })
    return;
  }
  console.log(_this.data.id)
  var sql = "update baitaoquanxian_copy1 set C='',D='',E='',F='',G='',H='',I='',J='',K='',L='',M='',N='',O='',P='',Q='',R='',S='',T='',U='',V='',W='',X='',Y='',Z='',AA='',AB='',AC='',AD='',AE='',AF='',AG='',AH='',AI='',AJ='',AK='',AL='',AM='',AN='',AO='',AP='',AQ='',AR='',ASS='',AT='',AU='',AV='',AW='',AX='',AY='',AZ='',BA='',BB='',BC='',BD='',BE='',BF='',BG='',BH='',BI='',BJ='',BK='',BL='',BM='',BN='',BO='',BP='',BQ='',BR='',BS='',BT='',BU='',BV='',BW='',BX='',BYY='',BZ='',CA='',CB='',CC='',CD='',CE='',CF='',CG='',CH='',CI='',CJ='',CK='',CL='',CM='',CN='',CO='',CP='',CQ='',CR='',CS='',CT='',CU='',CV='',CW='',CX='' where id=" + _this.data.id + ";"
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query: sql
    },
    success(res){
      wx.showToast({
        title: '全部取消勾选完成',
        icon:"none"
      })
      _this.setData({
        handle: true
      })
      _this.tableShow()
    }
  })
},

hid_view(){
  var _this = this
  _this.setData({
    handle: true
  })
},



update:function(list,index,colmun,names){
  var _this=this
  var _this = this
  if(_this.data.gai != '是'){
    wx.showToast({
      title: '无修改权限',
      icon:"none"
    })
    return;
  }
  if(list[index][colmun]=="√"){
    list[index][colmun]=" "
  }else if(list[index][colmun] != "√"){
    list[index][colmun]="√"
  }
  var sql="update baitaoquanxian_copy1 set " + colmun + " = '" +list[index][colmun] + "' where quanxian = '" + _this.data.gongsi + "' and B= '" + names+ "' "
  wx.cloud.callFunction({

    name: 'sqlServer_117',
    data:{
      query: sql
    },
    success(res){
      wx.showToast({
        title: '修改成功',
        icon:"none"
      })
     _this.tableShow()
    //  _this.setData({
    //    list
    //  })

    }

  })

},

onInput: function (e) {
  var _this = this
  let column = e.currentTarget.dataset.column
  _this.setData({
    [column]: e.detail.value
  })
},

sel:function(){
  var _this = this
  if(_this.data.cha != '是'){
    wx.showToast({
      title: '无查询权限',
      icon:"none"
    })
    return;
  }

  
  var renyuan = _this.data.renyuan_name
  var sql="select * from baitaoquanxian_copy1 WHERE quanxian = '" + _this.data.gongsi + "' and B like '%" + renyuan + "%' and chashanquanxian='" + _this.data.quanxian_leixing + "'"
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query : sql
    },
    success(res){
      var list = res.result.recordset
      _this.setData({
        list
      })
    }
  })
},

back:function(){
  wx.navigateBack({
    delta: 1
  })
},

goto:function(){
  var _this = this
  wx.navigateTo({
    url: "../personfix2/personfix2?userInfo="+JSON.stringify(_this.data.userInfo)
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
  }, 1000)
},
  
})