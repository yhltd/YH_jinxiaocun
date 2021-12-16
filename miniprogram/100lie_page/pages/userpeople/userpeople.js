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
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
  sel:function(){
    var _this = this
    var lie = _this.data.lie
    var gongsi = _this.data.gongsi
    var lie_list = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ","BA","BB","BC","BD","BE","BF","BG","BH","BI","BJ","BK","BL","BM","BN","BO","BP","BQ","BR","BS","BT","BU","BV","BW","BX","BY","BZ","CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ","CK","CL","CM","CN","CO","CP","CQ","CR","CS","CT","CU","CV"]
    if(lie == '' || lie == undefined){
      wx.showToast({
        title: '请输入列号',
        icon: 'none'
      })
      return
    }
    lie = lie.toUpperCase()
    var panduan = lie_list.indexOf(lie)
    console.log(panduan)
    if (panduan <= -1){
      wx.showToast({
        title: '列号输入不正确',
        icon: 'none'
      })
      return
    }
    if(lie == "AS"){
      lie = "ASS"
    }
    if(lie == "BY"){
      lie = "BYY"
    }
    var sql = "select " + lie + " from baitaoquanxian_copy2 where 公司 = '" + _this.data.gongsi + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query: sql
      },
      success(res){        
       console.log(res)
       var quanxian_dic = res.result.recordset[0]
       var quanxian = quanxian_dic[lie]
       console.log(quanxian)
       _this.setData({
         renyuan:quanxian
       })
       wx.showToast({
        title: '查询完成',
        icon: 'none'
      })
      },
      err: res => {
        console.log("错误!")
      }
    })  
  },

  del:function(){
    var _this = this
    var lie = _this.data.lie
    var gongsi = _this.data.gongsi
    var lie_list = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ","BA","BB","BC","BD","BE","BF","BG","BH","BI","BJ","BK","BL","BM","BN","BO","BP","BQ","BR","BS","BT","BU","BV","BW","BX","BY","BZ","CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ","CK","CL","CM","CN","CO","CP","CQ","CR","CS","CT","CU","CV"]
    if(lie == '' || lie == undefined){
      wx.showToast({
        title: '请输入列号',
        icon: 'none'
      })
      return
    }
    lie = lie.toUpperCase()
    var panduan = lie_list.indexOf(lie)
    console.log(panduan)
    if (panduan <= -1){
      wx.showToast({
        title: '列号输入不正确',
        icon: 'none'
      })
      return
    }
    if(lie == "AS"){
      lie = "ASS"
    }
    if(lie == "BY"){
      lie = "BYY"
    }
    var sql = "update baitaoquanxian_copy2 set " + lie + "='' where 公司 = '" + _this.data.gongsi + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query: sql
      },
      success(res){        
       _this.setData({
         renyuan:''
       })
       _this.onLoad()
       wx.showToast({
        title: '删除完成',
        icon: 'none'
      })
      },
      err: res => {
        console.log("错误!")
      }
    })  
  },
  //刷新
  ref:function(){
    var that = this
    that.onLoad()
  },

  back:function(){
    wx.navigateBack({
      delta: 1
    })
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