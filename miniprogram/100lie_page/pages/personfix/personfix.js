// 100lie_page/pages/personfix/personfix.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    renyuan_name:'',
    titil:[
      // {text:'公司'},
       {text:'访问人员'},
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
    var that = this
    var userInfo = JSON.parse(options.userInfo)
    if(options!=undefined){
      that.setData({
        gongsi:userInfo.B,
        userInfo:userInfo
      })
    }
    var sql="select * from baitaoquanxian_copy1 WHERE quanxian = '" + that.data.gongsi + "' "
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        var list =res.result.recordset
        that.setData({
          list
        })
      }
    })
  },
click:function(e){
  var that=this
  var list=that.data.list
  var index= e.currentTarget.dataset.index
  var colmun=e.currentTarget.dataset.column
  var names= e.currentTarget.dataset.name
  var sqls= "select " + colmun + " from baitaoquanxian_gongsi where B ='"+ that.data.gongsi +"'  "
    wx.cloud.callFunction({
      name: 'sqlServer_117',
    data:{
      query: sqls
    },
    success(res){
      if(res.result.recordset[0][colmun]=="√"){
        that.update(list,index,colmun,names)
      }else{
        wx.showToast({
          title: '你没有该列权限',
          icon:"none"
        })
      }
    }
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
      _this.onLoad()
    }
  })
},

quanxian_piliang2(){
  var _this = this
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
      _this.onLoad()
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
  var that=this
  if(list[index][colmun]=="√"){
    list[index][colmun]=" "
  }else if(list[index][colmun] != "√"){
    list[index][colmun]="√"
  }
  var sql="update baitaoquanxian_copy1 set " + colmun + " = '" +list[index][colmun] + "' where quanxian = '" + that.data.gongsi + "' and B= '" + names+ "' "
  wx.cloud.callFunction({

    name: 'sqlServer_117',
    data:{
      query: sql
    },
    success(res){
     that.onLoad()
    //  that.setData({
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
  var renyuan = _this.data.renyuan_name
  var sql="select * from baitaoquanxian_copy1 WHERE quanxian = '" + _this.data.gongsi + "' and B like '%" + renyuan + "%'"
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