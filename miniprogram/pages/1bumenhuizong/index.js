Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: null,
    list: [],
    title: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '部门汇总表'
      
    })
    console.log('onLoad')
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        user: 'sa',
        password: 'Lyh07910_001',
        server: 'yhocn.cn',
        database: "test",
        port: '1433',
        query: "select * from gongzi_gongzimingxi"
      },
      success: res => {
        console.log(res.result.recordset)
        this.setData({
          list: res.result.recordset
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        user: 'sa',
        password: 'Lyh07910_001',
        server: 'yhocn.cn',
        database: "test",
        port: '1433',
        query: "select bumenhuizong from title"
      },
      success: res => {
        this.setData({
          title: res.result.recordsets[0]
        })
        console.log(res.result.recordsets[0])
      },
      err: res => {
        console.log("错误!")
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})