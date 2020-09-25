// 100lie_page/pages/companyfix/companyfix.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
  title:[
 {text:'公司名称',width:"500rpx",colmun:"B",val:''},{text:'A',width:"200rpx",colmun:"C",val:''},{text:'B',width:"200rpx",colmun:"D",val:''},
    {text:'C',width:"200rpx",colmun:"E",val:''},{text:'D',width:"200rpx",colmun:"F",val:''},{text:'E',width:"200rpx",colmun:"G",val:''},
    {text:'F',width:"200rpx",colmun:"H",val:''},{text:'G',width:"200rpx",colmun:"I",val:''},{text:'H',width:"200rpx",colmun:"J",val:''},
    {text:'I',width:"200rpx",colmun:"K",val:''},{text:'J',width:"200rpx",colmun:"L",val:''},{text:'K',width:"200rpx",colmun:"M",val:''},
    {text:'L',width:"200rpx",colmun:"N",val:''},{text:'M',width:"200rpx",colmun:"O",val:''},{text:'N',width:"200rpx",colmun:"P",val:''},
    {text:'O',width:"200rpx",colmun:"Q",val:''},{text:'P',width:"200rpx",colmun:"R",val:''},{text:'Q',width:"200rpx",colmun:"S",val:''},
    {text:'R',width:"200rpx",colmun:"T",val:''},{text:'S',width:"200rpx",colmun:"U",val:''},{text:'T',width:"200rpx",colmun:"V",val:''},
    {text:'U',width:"200rpx",colmun:"W",val:''},{text:'V',width:"200rpx",colmun:"X",val:''},{text:'W',width:"200rpx",colmun:"Y",val:''},
    {text:'X',width:"200rpx",colmun:"Z",val:''},{text:'Y',width:"200rpx",colmun:"AA",val:''},{text:'Z',width:"200rpx",colmun:"AB",val:''},
    {text:'AA',width:"200rpx",colmun:"AC",val:''},{text:'AB',width:"200rpx",colmun:"AD",val:''},
    {text:'AC',width:"200rpx",colmun:"AE",val:''},{text:'AD',width:"200rpx",colmun:"AF",val:''},{text:'AE',width:"200rpx",colmun:"AG",val:''},
    {text:'AF',width:"200rpx",colmun:"AH",val:''},{text:'AG',width:"200rpx",colmun:"AI",val:''},{text:'AH',width:"200rpx",colmun:"AJ",val:''},
    {text:'AI',width:"200rpx",colmun:"AK",val:''},{text:'AJ',width:"200rpx",colmun:"AL",val:''},{text:'AK',width:"200rpx",colmun:"AM",val:''},
    {text:'AL',width:"200rpx",colmun:"AN",val:''},{text:'AM',width:"200rpx",colmun:"AO",val:''},{text:'AN',width:"200rpx",colmun:"AP",val:''},
    {text:'AO',width:"200rpx",colmun:"AQ",val:''},{text:'AP',width:"200rpx",colmun:"AR",val:''},{text:'AQ',width:"200rpx",colmun:"ASS",val:''},
    {text:'AR',width:"200rpx",colmun:"AT",val:''},{text:'AS',width:"200rpx",colmun:"AU",val:''},{text:'AT',width:"200rpx",colmun:"AV",val:''},
    {text:'AU',width:"200rpx",colmun:"AW",val:''},{text:'AV',width:"200rpx",colmun:"AX",val:''},{text:'AW',width:"200rpx",colmun:"AY",val:''},
    {text:'AX',width:"200rpx",colmun:"AZ",val:''},{text:'AY',width:"200rpx",colmun:"BA",val:''},{text:'AZ',width:"200rpx",colmun:"BB",val:''},
    {text:'BA',width:"200rpx",colmun:"BC",val:''},{text:'BB',width:"200rpx",colmun:"BD",val:''},
    {text:'BC',width:"200rpx",colmun:"BE",val:''},{text:'BD',width:"200rpx",colmun:"BF",val:''},{text:'BE',width:"200rpx",colmun:"BG",val:''},
    {text:'BF',width:"200rpx",colmun:"BH",val:''},{text:'BG',width:"200rpx",colmun:"BI",val:''},{text:'BH',width:"200rpx",colmun:"BJ",val:''},
    {text:'BI',width:"200rpx",colmun:"BK",val:''},{text:'BJ',width:"200rpx",colmun:"BL",val:''},{text:'BK',width:"200rpx",colmun:"BM",val:''},
    {text:'BL',width:"200rpx",colmun:"BN",val:''},{text:'BM',width:"200rpx",colmun:"BO",val:''},{text:'BN',width:"200rpx",colmun:"BP",val:''},
    {text:'BO',width:"200rpx",colmun:"BQ",val:''},{text:'BP',width:"200rpx",colmun:"BR",val:' '},{text:'BQ',width:"200rpx",colmun:"BS",val:''},
    {text:'BR',width:"200rpx",colmun:"BT",val:' '},{text:'BS',width:"200rpx",colmun:"BU",val:''},{text:'BT',width:"200rpx",colmun:"BV",val:''},
    {text:'BU',width:"200rpx",colmun:"BW",val:''},{text:'BV',width:"200rpx",colmun:"BX",val:''},{text:'BW',width:"200rpx",colmun:"BYY",val:''},
    {text:'BX',width:"200rpx",colmun:"BZ",val:''},{text:'BY',width:"200rpx",colmun:"CA",val:''},{text:'BZ',width:"200rpx",colmun:"CB",val:''},
    {text:'CA',width:"200rpx",colmun:"CC",val:''},{text:'CB',width:"200rpx",colmun:"CD",val:''},
    {text:'CC',width:"200rpx",colmun:"CE",val:''},{text:'CD',width:"200rpx",colmun:"CF",val:''},{text:'CE',width:"200rpx",colmun:"CG",val:''},
    {text:'CF',width:"200rpx",colmun:"CH",val:''},{text:'CG',width:"200rpx",colmun:"CI",val:''},{text:'CH',width:"200rpx",colmun:"CJ",val:''},
    {text:'CI',width:"200rpx",colmun:"CK",val:''},{text:'CJ',width:"200rpx",colmun:"CL",val:''},{text:'CK',width:"200rpx",colmun:"CM",val:''},
    {text:'CL',width:"200rpx",colmun:"CN",val:''},{text:'CM',width:"200rpx",colmun:"CO",val:''},{text:'CN',width:"200rpx",colmun:"CP",val:''},
    {text:'CO',width:"200rpx",colmun:"CQ",val:''},{text:'CP',width:"200rpx",colmun:"CR",val:''},{text:'CQ',width:"200rpx",colmun:"CS",val:''},
    {text:'CR',width:"200rpx",colmun:"CT",val:''},{text:'CS',width:"200rpx",colmun:"CU",val:''},{text:'CT',width:"200rpx",colmun:"CV",val:''},
    {text:'CU',width:"200rpx",colmun:"CW",val:''},{text:'CV',width:"200rpx",colmun:"CX",val:''},{text:'CW',width:"200rpx",colmun:"CY",val:''},
    {text:'CX',width:"200rpx",colmun:"CZ",val:''},{text:'CY',width:"200rpx",colmun:"DA",val:''},{text:'CZ',width:"200rpx",colmun:"DB",val:''},
  ]


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options!=undefined){
      this.setData({
        ["title[0].val"]:options.gongsi
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