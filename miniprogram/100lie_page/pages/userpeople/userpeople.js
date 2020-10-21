// 100lie_page/pages/userpeople/userpeople.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    name:'',
    info:'',
    input:true,
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
      {text:'CV'}, {text:'公司'}
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
          list
        })
      }
    })
   

  },
  //删除
  delt:function(){
    var that = this
    this.setData({
      input:false
    })

  },
  save:function(e){
    var that = this
    var titil = that.data.titil
    var lie=e.detail.value.input_name
    for(var i =0;i<titil.length;i++){
      if(lie!="" && lie==titil[i].text){
        var sql="update baitaoquanxian_copy2 set "+ lie +"= '' where id = 7 and 公司 = '"+ that.data.gongsi + "';update baitaoquanxian_copy2 set "+ lie +"= '' where id = 8 and 公司 = '"+ that.data.gongsi + "' "   
        wx.showToast({
          title: '删除成功',
        })  
        that.setData({
          info:''
        })
      }else if(lie==""){
        this.setData({
          input:true
        })
        return;
      }
    }      
    wx.cloud.callFunction({
      name: 'sqlServer_117',
        data:{
          query : sql
        },        
        success(){
         that.onLoad()
        }
    })
    this.setData({
      input:true
    })
  },
  up_view:function(){
    var that = this
    this.setData({
      input:true
    })

  },
  //刷新
  ref:function(){
    var that = this
    that.onLoad()
  },
  //显示加载
// onShow: function () {
//   wx.showLoading({
//     title: '加载中',
//     mask : 'true'
//   }) 
//   setTimeout(function () {
//     wx.hideLoading()
//   }, 1000)
// },
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