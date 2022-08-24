// 100lie_page/pages/userpeople/userpeople.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    name:'',
    info:'',
    lie:'',
    renyuan:'',
    input:true,
    titil1:[
      {text:'A'}, {text:'B'}, {text:'C'}, {text:'D'}, {text:'E'},
      {text:'F'}, {text:'G'}, {text:'H'}, {text:'I'}, {text:'J'}, {text:'K'}, {text:'L'},
      {text:'M'}, {text:'N'}, {text:'O'}, {text:'P'}, {text:'Q'}, {text:'R'}, {text:'S'},
      {text:'T'}, {text:'U'}, {text:'V'}, {text:'W'}, {text:'X'}, {text:'Y'}, {text:'Z'},
    ],
    titil2:[
      {text:'AA'}, {text:'AB'}, {text:'AC'}, {text:'AD'}, {text:'AE'}, {text:'AF'}, {text:'AG'},
      {text:'AH'}, {text:'AI'}, {text:'AJ'}, {text:'AK'}, {text:'AL'}, {text:'AM'}, {text:'AN'},
      {text:'AO'}, {text:'AP'}, {text:'AQ'}, {text:'AR'}, {text:'ASS'}, {text:'AT'}, {text:'AU'},
      {text:'AV'}, {text:'AW'}, {text:'AX'}, {text:'AY'}, {text:'AZ'}
    ],
    titil3:[
      {text:'BA'}, {text:'BB'}, {text:'BC'}, {text:'BD'}, {text:'BE'}, {text:'BF'}, {text:'BG'},
      {text:'BH'}, {text:'BI'}, {text:'BJ'}, {text:'BK'}, {text:'BL'}, {text:'BM'}, {text:'BN'},
      {text:'BO'}, {text:'BP'}, {text:'BQ'}, {text:'BR'}, {text:'BS'}, {text:'BT'}, {text:'BU'},
      {text:'BV'}, {text:'BW'}, {text:'BX'}, {text:'BYY'}, {text:'BZ'},
    ],
    titil4:[
      {text:'CA'}, {text:'CB'}, {text:'CC'}, {text:'CD'}, {text:'CE'}, {text:'CF'}, {text:'CG'},
      {text:'CH'}, {text:'CI'}, {text:'CJ'}, {text:'CK'}, {text:'CL'}, {text:'CM'}, {text:'CN'},
      {text:'CO'}, {text:'CP'}, {text:'CQ'}, {text:'CR'}, {text:'CS'}, {text:'CT'}, {text:'CU'},
      {text:'CV'} 
      // , {text:'公司'}
    ],
    list:[],

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
        user:options.user,
      })
    }
   
    var sql = "select * from baitaoquanxian_copy2 where 公司 = '" + that.data.gongsi + "' "
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        var list = res.result.recordset
        that.setData({
          list,
          id:list[0].id
        })
      }
    })
   

  },

  jiechu:function(e){
    var _this=this
    var list=_this.data.list
    var index= e.currentTarget.dataset.index
    var colmun=e.currentTarget.dataset.column
    if(list[index][colmun] != '' && list[index][colmun] != undefined){
      wx.showModal({
        title: '提示',
        content: '是否解除' + colmun + '列的占用？',
        success: function(res) {
          if (res.confirm) {
            var sql = "update baitaoquanxian_copy2 set " + colmun + "='' where id=" + list[index].id + ";"
            wx.cloud.callFunction({
              name: 'sqlServer_117',
              data:{
                query: sql
              },
              success(res){
                wx.showToast({
                  title: '解除成功',
                  icon:"none"
                })
                _this.onLoad()
              }
            })
          }
        }
      })
    }
  },

  //删除
  delt:function(){
    var that = this
    this.setData({
      input:false
    })
  },

  piliang_jiechu(){
    var _this = this
    console.log(_this.data.id)
    wx.showModal({
      title: '提示',
      content: '是否解除工作台所有列的占用？',
      success: function(res) {
        if (res.confirm) {
          var sql = "update baitaoquanxian_copy2 set A='',B='',C='',D='',E='',F='',G='',H='',I='',J='',K='',L='',M='',N='',O='',P='',Q='',R='',S='',T='',U='',V='',W='',X='',Y='',Z='',AA='',AB='',AC='',AD='',AE='',AF='',AG='',AH='',AI='',AJ='',AK='',AL='',AM='',AN='',AO='',AP='',AQ='',AR='',ASS='',AT='',AU='',AV='',AW='',AX='',AY='',AZ='',BA='',BB='',BC='',BD='',BE='',BF='',BG='',BH='',BI='',BJ='',BK='',BL='',BM='',BN='',BO='',BP='',BQ='',BR='',BS='',BT='',BU='',BV='',BW='',BX='',BYY='',BZ='',CA='',CB='',CC='',CD='',CE='',CF='',CG='',CH='',CI='',CJ='',CK='',CL='',CM='',CN='',CO='',CP='',CQ='',CR='',CS='',CT='',CU='',CV='' where id=" + _this.data.id + ";"
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data:{
              query: sql
            },
            success(res){
              wx.showToast({
                title: '全部解除占用完成',
                icon:"none"
              })
              _this.setData({
                handle: true
              })
              _this.onLoad()
            }
          })
        }
      }
    })
    
  },

  use_book:function(){
    var _this = this
    _this.hidView(_this,"moreDo");
    wx.showModal({
      title: '使用说明',
      content: '1.此页面用于手动解除工作台列的占用情况。\n2.点击有人占用的列可弹出确认解除占用窗口，点击确定后解除对应列的占用。\n3.点击下方一键解除按钮，可一键解除工作台所有列的占用。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },
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