
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    gongsi:'',
    listData: [
    { "code": "A", "text": '' },
    { "code": "B", "text": '' },
    { "code": "C", "text": '' },
    { "code": "D", "text": ''},],  
  
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
    var sql="SELECT sum(cast(A as int)) as a FROM baitaoquanxian where 公司='" + that.data.gongsi + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success:res=>{
        var tex =res.result.recordset
        that.setData({
          ["listData[0].text"]:tex[0].a,
        })
        
      }
    })
    var sqlb="SELECT sum(cast(B as int)) as b FROM baitaoquanxian where 公司='" + that.data.gongsi + "'"
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data:{
            query : sqlb
          },
          success:res=>{
            var tex =res.result.recordset
            that.setData({
              ["listData[1].text"]:tex[0].b
            })
           
          }
        })
    var sqlc="SELECT sum(cast(C as int)) as c FROM baitaoquanxian where 公司='" + that.data.gongsi + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sqlc
      },
      success:res=>{
        var tex =res.result.recordset
        that.setData({
          ["listData[2].text"]:tex[0].c
        })
       
      }
    })
    var sqld="SELECT sum(cast(D as int)) as d FROM baitaoquanxian where 公司='" + that.data.gongsi + "'"
                wx.cloud.callFunction({
                  name: 'sqlServer_117',
                  data:{
                    query : sqld
                  },
                  success:res=>{
                    var tex =res.result.recordset
                    that.setData({
                      ["listData[3].text"]:tex[0].d
                    })
                  }
                })
    
   


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})