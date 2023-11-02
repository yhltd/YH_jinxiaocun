// package_ruilida/page/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xlShow2: false,
    cxShow: false,
    name:'',
    bianhao:'',
    list_check: [
      {
        name:'供应商编号',
        columnName: "bianhao",
        type: "text",
        width: "250rpx",
      },{
        name:'供应商名称',
        columnName: 'name',
        type: "text",
        width: "250rpx",
      },{
        name:'采购员',
        columnName: 'caigouyuan',
        type: "text",
        width: "250rpx",
      }
    ],
    all_result: ['供应商编号', '供应商名称', '采购员'],
    result: ['供应商编号', '供应商名称', '采购员'],
    gongneng_list:[
      {
        name:'查询'
      },{
        name:'刷新'
      },{
        name:'导出Excel'
      }
    ],
    quanxuan_value: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    console.log(options)
    var userInfo = JSON.parse(options.userInfo)
    var type = options.type
    var id = options.id
    _this.setData({
      userInfo,
      type,
      mingxi_id: id
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  sel1:function(){
    var _this = this
    _this.tableShow()
  },

  tableShow: function () {
    var _this = this
    var sql = "select id,file_name from file_upload where type = '" + _this.data.type + "' and file_id = '" + _this.data.mingxi_id + "'"    
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list,
          num: list.length,
        })
        console.log(list)
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  click_view:function(e){
    
  },

  file_dowload:function(e){
    var _this = this
    console.log(e.target.dataset.index)
    var index = e.target.dataset.index
    var id = _this.data.list[index].id
    var sql = "select [file] from file_upload where id=" + id
    wx.showModal({
      title: '提示',
      content: '确认查看此文件？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res.result.recordset[0].file)
              var imgSrc =  res.result.recordset[0].file;//二进制流转为base64编码
              var name = _this.data.list[index].file_name
              var houzhui = _this.data.list[index].file_name.split('.')[_this.data.list[index].file_name.split('.').length - 1]
              console.log(houzhui)
              houzhui = getBase64Type(houzhui)
              console.log(houzhui)
              imgSrc = imgSrc.replace(houzhui + ',','')
              console.log(imgSrc)
              var save = wx.getFileSystemManager();
              save.writeFile({
                  filePath: wx.env.USER_DATA_PATH + '/' + name,
                  data: imgSrc,
                  encoding: 'base64',
                  success: res => {
                    wx.openDocument({
                      filePath: wx.env.USER_DATA_PATH + '/' + name,   // 装载对应文件的路径
                      // fileType: type,   // 指定打开的文件类型 我写的固定类型 也可根据文件的后缀动态设置
                      showMenu: true,       // 右上角的菜单转发分享操作
                      success: function (res) {
                          console.log('打开成功');
                      },
                      fail: function (err) {
                          console.log('打开失败：', err);
                      }
                  })
                  },
                  fail: function (error) {
                      console.log(error);
                  }
                })
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
              wx.showToast({
                title: '请求失败！',
                icon: 'none',
                duration: 3000
              })
              console.log("请求失败！")
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    
  },

  del1:function(e){
    var _this = this
    console.log(e.target.dataset.index)
    var index = e.target.dataset.index
    var id = _this.data.list[index].id
    wx.showModal({
      title: '提示',
      content: '确认删除此条文件？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var sql = "delete from file_upload where id=" + id 
          wx.cloud.callFunction({
            name: 'sqlserver_ruilida',
            data: {
              query: sql
            },
            success: res => {
              console.log(res)
              wx.showToast({
                title: '删除成功',
                icon: 'none'
              })
              _this.sel1()
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
              wx.showToast({
                title: '请求失败！',
                icon: 'none',
                duration: 3000
              })
              console.log("请求失败！")
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  file_upload: function () {
    var _this = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles
        console.log(tempFilePaths)
        var base64 = wx.getFileSystemManager().readFileSync(tempFilePaths[0].path, "base64")
        var houzhui = getBase64Type(tempFilePaths[0].name.split('.')[tempFilePaths[0].name.split('.').length - 1])
        console.log(houzhui)
        if(houzhui == undefined){
          wx.showToast({
            title: '无法识别文件类型！',
            icon: 'none',
            duration: 3000
          })
          return;
        }
        base64 = houzhui + "," + base64
        console.log("insert into file_upload([file],file_name,type,file_id) values('" + base64 + "','" + tempFilePaths[0].name + "','" + _this.data.type + "','" + _this.data.mingxi_id  + "')")
        wx.cloud.callFunction({
          name: 'sqlserver_ruilida',
          data: {
            query: "insert into file_upload([file],file_name,type,file_id) values('" + base64 + "','" + tempFilePaths[0].name + "','" + _this.data.type + "','" + _this.data.mingxi_id  + "')"
          },
          success: res => {
            console.log(res)
            _this.tableShow()
            wx.showToast({
              title: '添加成功！',
              icon: 'none'
            })
          },
          err: res => {
            console.log("错误!")
          },
          fail: res => {
            wx.showToast({
              title: '请求失败！',
              icon: 'none'
            })
            console.log("请求失败！")
          }
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var _this = this
    _this.sel1()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})

function getBase64Type(type) {
  switch (type) {
      case 'txt':
          return 'data:text/plain;base64';
      case 'doc':
          return 'data:application/msword;base64';
      case 'docx':
          return 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64';
      case 'xls':
          return 'data:application/vnd.ms-excel;base64';
      case 'xlsx':
          return 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64';
      case 'pdf':
          return 'data:application/pdf;base64';
      case 'pptx':
          return 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64';
      case 'ppt':
          return 'data:application/vnd.ms-powerpoint;base64';
      case 'png':
          return 'data:image/png;base64';
      case 'jpg':
          return 'data:image/jpeg;base64';
      case 'gif':
          return 'data:image/gif;base64';
      case 'svg':
          return 'data:image/svg+xml;base64';
      case 'ico':
          return 'data:image/x-icon;base64';
      case 'bmp':
          return 'data:image/bmp;base64';
  }
}