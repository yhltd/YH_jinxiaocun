// 100lie_page/pages/companyfix/companyfix.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    lie:'',
    quanxian:'',
  title:[
 {text:'公司名称',width:"500rpx",colmun:"B",val:''},
//  {text:'A',width:"200rpx",colmun:"C",val:''},{text:'B',width:"200rpx",colmun:"D",val:''},
    {text:'C',width:"200rpx",colmun:"C",val:''},{text:'D',width:"200rpx",colmun:"D",val:''},{text:'E',width:"200rpx",colmun:"E",val:''},
    {text:'F',width:"200rpx",colmun:"F",val:''},{text:'G',width:"200rpx",colmun:"G",val:''},{text:'H',width:"200rpx",colmun:"H",val:''},
    {text:'I',width:"200rpx",colmun:"I",val:''},{text:'J',width:"200rpx",colmun:"J",val:''},{text:'K',width:"200rpx",colmun:"K",val:''},
    {text:'L',width:"200rpx",colmun:"L",val:''},{text:'M',width:"200rpx",colmun:"M",val:''},{text:'N',width:"200rpx",colmun:"N",val:''},
    {text:'O',width:"200rpx",colmun:"O",val:''},{text:'P',width:"200rpx",colmun:"P",val:''},{text:'Q',width:"200rpx",colmun:"Q",val:''},
    {text:'R',width:"200rpx",colmun:"R",val:''},{text:'S',width:"200rpx",colmun:"S",val:''},{text:'T',width:"200rpx",colmun:"T",val:''},
    {text:'U',width:"200rpx",colmun:"U",val:''},{text:'V',width:"200rpx",colmun:"V",val:''},{text:'W',width:"200rpx",colmun:"W",val:''},
    {text:'X',width:"200rpx",colmun:"X",val:''},{text:'Y',width:"200rpx",colmun:"Y",val:''},{text:'Z',width:"200rpx",colmun:"Z",val:''},
    {text:'AA',width:"200rpx",colmun:"AA",val:''},{text:'AB',width:"200rpx",colmun:"AB",val:''},
    {text:'AC',width:"200rpx",colmun:"AC",val:''},{text:'AD',width:"200rpx",colmun:"AD",val:''},{text:'AE',width:"200rpx",colmun:"AE",val:''},
    {text:'AF',width:"200rpx",colmun:"AF",val:''},{text:'AG',width:"200rpx",colmun:"AG",val:''},{text:'AH',width:"200rpx",colmun:"AH",val:''},
    {text:'AI',width:"200rpx",colmun:"AI",val:''},{text:'AJ',width:"200rpx",colmun:"AJ",val:''},{text:'AK',width:"200rpx",colmun:"AK",val:''},
    {text:'AL',width:"200rpx",colmun:"AL",val:''},{text:'AM',width:"200rpx",colmun:"AM",val:''},{text:'AN',width:"200rpx",colmun:"AN",val:''},
    {text:'AO',width:"200rpx",colmun:"AO",val:''},{text:'AP',width:"200rpx",colmun:"AP",val:''},{text:'AQ',width:"200rpx",colmun:"AQ",val:''},
    {text:'AR',width:"200rpx",colmun:"AR",val:''},{text:'AS',width:"200rpx",colmun:"ASS",val:''},{text:'AT',width:"200rpx",colmun:"AT",val:''},
    {text:'AU',width:"200rpx",colmun:"AU",val:''},{text:'AV',width:"200rpx",colmun:"AV",val:''},{text:'AW',width:"200rpx",colmun:"AW",val:''},
    {text:'AX',width:"200rpx",colmun:"AX",val:''},{text:'AY',width:"200rpx",colmun:"AY",val:''},{text:'AZ',width:"200rpx",colmun:"AZ",val:''},
    {text:'BA',width:"200rpx",colmun:"BA",val:''},{text:'BB',width:"200rpx",colmun:"BB",val:''},
    {text:'BC',width:"200rpx",colmun:"BC",val:''},{text:'BD',width:"200rpx",colmun:"BD",val:''},{text:'BE',width:"200rpx",colmun:"BE",val:''},
    {text:'BF',width:"200rpx",colmun:"BF",val:''},{text:'BG',width:"200rpx",colmun:"BG",val:''},{text:'BH',width:"200rpx",colmun:"BH",val:''},
    {text:'BI',width:"200rpx",colmun:"BI",val:''},{text:'BJ',width:"200rpx",colmun:"BJ",val:''},{text:'BK',width:"200rpx",colmun:"BK",val:''},
    {text:'BL',width:"200rpx",colmun:"BL",val:''},{text:'BM',width:"200rpx",colmun:"BM",val:''},{text:'BN',width:"200rpx",colmun:"BN",val:''},
    {text:'BO',width:"200rpx",colmun:"BO",val:''},{text:'BP',width:"200rpx",colmun:"BP",val:' '},{text:'BQ',width:"200rpx",colmun:"BQ",val:''},
    {text:'BR',width:"200rpx",colmun:"BR",val:' '},{text:'BS',width:"200rpx",colmun:"BS",val:''},{text:'BT',width:"200rpx",colmun:"BT",val:''},
    {text:'BU',width:"200rpx",colmun:"BU",val:''},{text:'BV',width:"200rpx",colmun:"BV",val:''},{text:'BW',width:"200rpx",colmun:"BW",val:''},
    {text:'BX',width:"200rpx",colmun:"BX",val:''},{text:'BY',width:"200rpx",colmun:"BYY",val:''},{text:'BZ',width:"200rpx",colmun:"BZ",val:''},
    {text:'CA',width:"200rpx",colmun:"CA",val:''},{text:'CB',width:"200rpx",colmun:"CB",val:''},
    {text:'CC',width:"200rpx",colmun:"CC",val:''},{text:'CD',width:"200rpx",colmun:"CD",val:''},{text:'CE',width:"200rpx",colmun:"CE",val:''},
    {text:'CF',width:"200rpx",colmun:"CF",val:''},{text:'CG',width:"200rpx",colmun:"CG",val:''},{text:'CH',width:"200rpx",colmun:"CH",val:''},
    {text:'CI',width:"200rpx",colmun:"CI",val:''},{text:'CJ',width:"200rpx",colmun:"CJ",val:''},{text:'CK',width:"200rpx",colmun:"CK",val:''},
    {text:'CL',width:"200rpx",colmun:"CL",val:''},{text:'CM',width:"200rpx",colmun:"CM",val:''},{text:'CN',width:"200rpx",colmun:"CN",val:''},
    {text:'CO',width:"200rpx",colmun:"CO",val:''},{text:'CP',width:"200rpx",colmun:"CP",val:''},{text:'CQ',width:"200rpx",colmun:"CQ",val:''},
    {text:'CR',width:"200rpx",colmun:"CR",val:''},{text:'CS',width:"200rpx",colmun:"CS",val:''},{text:'CT',width:"200rpx",colmun:"CT",val:''},
    {text:'CU',width:"200rpx",colmun:"CU",val:''},{text:'CV',width:"200rpx",colmun:"CV",val:''},{text:'CW',width:"200rpx",colmun:"CW",val:''},
    {text:'CX',width:"200rpx",colmun:"CX",val:''}
    // ,{text:'CY',width:"200rpx",colmun:"DY",val:''},{text:'CZ',width:"200rpx",colmun:"CZ",val:''},
  ]


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options!=undefined){
      this.setData({
        ["title[0].val"]:options.gongsi,
        gongsi: options.gongsi
      })
    }
    
   var sql="select * from baitaoquanxian_gongsi where B = '" + this.data.title[0].val + "'"
   
    var that =this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){     
        var title=that.data.title
        var i 
      for( i=1;i<title.length;i++){
        var colmun = title[i].colmun
        var val  =res.result.recordset[0][colmun]
        title[i].val=val
      }
     that.setData({
       title
     })
    }
  })
  },
  click:function(e){
    var that=this
    var title=that.data.title
    var index= e.currentTarget.dataset.index
    var colmun=e.currentTarget.dataset.colmun
    if(title[index].val=="√"){
      title[index].val=" "
    }else if(title[index].val != "√"){
      title[index].val="√"
    }
    
    var sql="update baitaoquanxian_gongsi set " +title[index].colmun + " = '" +title[index].val + "' where B = '" + title[0].val + "'; "
    if( title[index].val=" "){
      sql+= "update baitaoquanxian_copy1 set " +title[index].colmun + " = '" +title[index].val + "'where quanxian ='" + title[0].val + "'"
     }
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query: sql
      },
      success(res){        
       that.setData({
         title
       })
       that.onLoad()
       wx.showToast({
        title: '修改成功',
        icon:"none"
      })
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
  quanxian_click:function(){
    var _this = this
    var quanxian = _this.data.quanxian
    console.log(quanxian)
    if(quanxian == ""){
      quanxian = "√"
    }else if(quanxian != ""){
      quanxian = ""
    }
    _this.setData({
      quanxian : quanxian
    })
    console.log(quanxian)
  },

  sel:function(){
    var _this = this
    var lie = _this.data.lie
    var gongsi = this.data.gongsi
    var lie_list = ["C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ","BA","BB","BC","BD","BE","BF","BG","BH","BI","BJ","BK","BL","BM","BN","BO","BP","BQ","BR","BS","BT","BU","BV","BW","BX","BY","BZ","CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ","CK","CL","CM","CN","CO","CP","CQ","CR","CS","CT","CU","CV","CW","CX"]
    if(lie == "" || lie == undefined){
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
    var sql = "select " + lie + " from baitaoquanxian_gongsi where B='" + gongsi + "'"
    console.log(sql)
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
         quanxian:quanxian
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
  upd:function(){
    var _this = this
    var _this = this
    var lie = _this.data.lie
    var gongsi = _this.data.gongsi
    var quanxian = _this.data.quanxian
    var lie_list = ["C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ","BA","BB","BC","BD","BE","BF","BG","BH","BI","BJ","BK","BL","BM","BN","BO","BP","BQ","BR","BS","BT","BU","BV","BW","BX","BY","BZ","CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ","CK","CL","CM","CN","CO","CP","CQ","CR","CS","CT","CU","CV","CW","CX"]
    if(lie == "" || lie == undefined){
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
    var sql = "update baitaoquanxian_gongsi set " + lie + "='" + quanxian + "' where B='" + gongsi + "'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query: sql
      },
      success(res){        
       console.log(res)
       _this.onLoad()
       wx.showToast({
        title: '修改完成',
        icon: 'none'
      })
      },
      err: res => {
        console.log("错误!")
      }
    })  
  },

  // 显示加载
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