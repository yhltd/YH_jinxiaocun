Page({
  data: {
    list:[],
    listData: [
      { "code": "01", "text": "text1", "type": "type1" },
      { "code": "02", "text": "text2", "type": "type2" },
      { "code": "03", "text": "text3", "type": "type3" },
      { "code": "04", "text": "text4", "type": "type4" },
      { "code": "05", "text": "text5", "type": "type5" },
      { "code": "06", "text": "text6", "type": "type6" },
      { "code": "07", "text": "text7", "type": "type7" }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        user: 'sa',
        password: 'Lyh07910_001',
        server: 'yhocn.cn',
        database: 'yao',
        port: '1433',
        query: "select * from gongzi_gongzimingxi "
      },
      success: res => {
        console.log(res.result.recordset)
        this.setData({
          list: res.result.recordset
        })
      }, err: res => {
        console.log("错误!")
      }
    })
  }
})
