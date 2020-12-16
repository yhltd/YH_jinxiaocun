
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    gongsi:'',
    date1: '',
    date2: '',
    info:'', 
    inputname:'',
    liesum:true,
    listData: [
    { "code": "", "text": '' },
    ],  
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var listData=that.data.listData
    if(options!=undefined){
      that.setData({
        gongsi:options.gongsi,
      })
    }
    // select sum(case IsNumeric(A) when 1 then cast(A as int) else 0 end) from baitaoquanxian WHERE 公司 = 'A公司'
    // var sql="SELECT sum(cast(A as int)) as a FROM baitaoquanxian where 公司='" + that.data.gongsi + "'"
    // wx.cloud.callFunction({
    //   name: 'sqlServer_117',
    //   data:{
    //     query : sql
    //   },
    //   success:res=>{
    //     var tex =res.result.recordset
    //     that.setData({
    //       ["listData[0].text"]:tex[0].a,
    //     })
        
    //   }
    // })
    // var sqlb="SELECT sum(cast(B as int)) as b FROM baitaoquanxian where 公司='" + that.data.gongsi + "'"
    //     wx.cloud.callFunction({
    //       name: 'sqlServer_117',
    //       data:{
    //         query : sqlb
    //       },
    //       success:res=>{
    //         var tex =res.result.recordset
    //         that.setData({
    //           ["listData[1].text"]:tex[0].b
    //         })
           
    //       }
    //     })
    // var sqlc="SELECT sum(cast(C as int)) as c FROM baitaoquanxian where 公司='" + that.data.gongsi + "'"
    // wx.cloud.callFunction({
    //   name: 'sqlServer_117',
    //   data:{
    //     query : sqlc
    //   },
    //   success:res=>{
    //     var tex =res.result.recordset
    //     that.setData({
    //       ["listData[2].text"]:tex[0].c
    //     })
       
    //   }
    // })
    // var sqld="SELECT sum(cast(D as int)) as d FROM baitaoquanxian where 公司='" + that.data.gongsi + "'"
    //             wx.cloud.callFunction({
    //               name: 'sqlServer_117',
    //               data:{
    //                 query : sqld
    //               },
    //               success:res=>{
    //                 var tex =res.result.recordset
    //                 that.setData({
    //                   ["listData[3].text"]:tex[0].d
    //                 })
    //               }
    //             })

  },
  // 开始时间
  strDateChange:function(e){
    this.setData({
      date1:e.detail.value
    })
  },
  // 结束时间
  endDateChange:function(e){
    this.setData({
      date2:e.detail.value
    })
  },
  submitlie:function(e){
    var that=this
    that.setData({
      inputname:e.detail.value,
    })
   
  },
  // 查看
  cha:function(e){
    var that=this
    if (that.data.inputname==""){
     wx.showToast({
       title: '请输入列名',
       icon: 'none',
     })
     return;
    }
    if (that.data.date1==""){
      wx.showToast({
        title: '请选择起始日期',
        icon:'none'
      })
      return;
    }
    if(that.data.date2==""){
      wx.showToast({
        title: '请选择结束日期',
        icon:'none'
      })
      return;
    }

    var sql= "select sum(case IsNumeric("+that.data.inputname+") when 1 then cast("+that.data.inputname+" as int) else 0 end) as a from baitaoquanxian WHERE 公司 = '" + that.data.gongsi + "' and 日期  >='" + that.data.date1 + "'and 日期<= '" + that.data.date2 + "'"
   console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        var nums=res.result.recordset
        var text=nums[0].a
        console.log(text)
        that.setData({
          liesum:false,
          ["listData[0].text"]:text,
          'listData[0].code':that.data.inputname
        })
      }

    })

  },
})