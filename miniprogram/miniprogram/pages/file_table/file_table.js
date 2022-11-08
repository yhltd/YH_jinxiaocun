// pages/general/general.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  this_id:'',
  type:'',
  data: {
    list: [],
    title: [{
        text: "文件名称",
        width: "800rpx",
        columnName: "file_name",
        type: "text",
        isupd: true
      }
    ],

    id:'',
    riqi: '', 
    customer: '',
    pinyin: '',
    salesman:'',
    price:'',
    phone:'',
    address:'',
    remarks:'',
    ghye:'',
    zsye:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var this_id = options.this_id
    var type = options.type
    console.log(options)
    _this.setData({
      this_id:this_id,
      type:type
    })
    var e = [_this.data.this_id,_this.data.type]
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data: {
        query: "select * from fileTable where other_id = " + e[0] + " and type = '" + e[1] + "'"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list
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

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  clickView:function(e){
    var _this = this
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      files: _this.data.list[e.currentTarget.dataset.index].files, 
      file_name: _this.data.list[e.currentTarget.dataset.index].file_name, 
      xgShow:true,
    })
  },

  inquire: function () {
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
        wx.cloud.callFunction({
          name: 'sqlserver_zhejiang',
          data: {
            query: "insert into fileTable(files,file_name,type,other_id) values('" + base64 + "','" + tempFilePaths[0].name + "','" + _this.data.type + "','" + _this.data.this_id  + "')"
          },
          success: res => {
            var e = [_this.data.this_id,_this.data.type]
            _this.tableShow(e)
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

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },
  dowload:function(){
    var _this = this
    var imgSrc =  _this.data.files;//二进制流转为base64编码
    var name = _this.data.file_name
    var houzhui = _this.data.file_name.split('.')[_this.data.file_name.split('.').length - 1]
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

            // wx.saveImageToPhotosAlbum({ //保存为png格式到相册
            //     filePath: wx.env.USER_DATA_PATH + '/' + name,
            //     success: function (res) {
            //         wx.showToast({
            //             title: '下载成功',
            //             icon: 'none',
            //             duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
            //         })
            //     },
            //     fail: function (err) {
            //         console.log(err)
            //     }
            // })
        },
        fail: function (error) {
            console.log(error);
        }
      })
  },

  del1:function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlserver_zhejiang',
        data: {
          query: "delete from fileTable where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.qxShow()
          var e = [_this.data.this_id,_this.data.type]
          _this.tableShow(e)
          wx.showToast({
            title: '删除成功！',
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
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      customer:"",
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
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