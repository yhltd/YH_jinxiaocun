// package_huaqun/page/zhguanli/zhguanli.js
// const chooseLocation = requirePlugin('chooseLocation');
// var QQMapWX = require("../utils/qqmap-wx-jssdk");
// var qqmapsdk = new QQMapWX({
//   key: 'KKRBZ-TBCW3-TXD37-OWJED-QYFPF-VYFCL'
// });
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
  data: {
    list: [],
    title: [{
        text: "工艺名",
        width: "250rpx",
        columnName: "gongyi",
        type: "text",
        isupd: true
      },
      {
        text: "备注",
        width: "250rpx",
        columnName: "beizhu",
        type: "text",
        isupd: true
      },
      {
        text: "单价",
        width: "250rpx",
        columnName: "danjia",
        type: "text",
        isupd: true
      },
      {
        text: "单位",
        width: "250rpx",
        columnName: "danwei",
        type: "text",
        isupd: true
      },
      {
        text: "图片",
        width: "380rpx",
        columnName: "pic",
        type: "text",
        isupd: true
      },
    ],
    id: '',
    gongyi: '',
    beizhu: '',
    danjia: '',
    danwei: '',
    pic: '',
    kongjian: 8
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var this_type = options.type
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      this_type,
      userInfo
    })
    var e = ['', '', '']
    _this.tableShow(e)
  },

  imgload: function (e) {
    var _this = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res)
        console.log(res.tempFiles)
        wx.compressImage({
          src: res.tempFiles[0].tempFilePath, // 图片路径
          quality: 50, // 压缩质量
          success: function (res) {
            console.log(res.tempFilePath)
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePath, //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: res => { //成功的回调
                console.log('data:image/png;base64,' + res.data)
                var size = res.data.length / 1048576
                console.log(size)
                if (size > 3) {
                  wx.showToast({
                    title: '图片转化后超过3M，不允许上传！',
                    icon: 'none'
                  })
                  return;
                }
                var pic = 'data:image/png;base64,' + res.data
                _this.setData({
                  pic
                })
              }
            })
          },
          fail: function (res) {
            console.log(res)
          },
        })
      }
    })
  },

  

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: "select * from chanpin_item where gongyi like '%" + e[0] + "%' and beizhu like '%" + e[1] + "%' and danwei like '%" + e[2] + "%' and type = '" + _this.data.this_type + "'"
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list,
          query: getRandomIntInclusive(1,100000)
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
      id: '',
      gongyi: '',
      beizhu: '',
      danjia: '',
      danwei: '',
      pic: '',
    })
  },

  inquire: function () {
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.quanxian != '管理员' && userInfo.bianjichanpinxinxi != '是'){
      wx.showToast({
        title: '无权限',
        icon: 'none'
      })
      return;
    }
    _this.setData({
      tjShow: true,
      id: '',
      gongyi: '',
      beizhu: '',
      danjia: '',
      danwei: '',
      pic: '',
    })
  },
  add1: function () {
    var _this = this
    if (_this.data.gongyi == '') {
      wx.showToast({
        title: '请输工艺名！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: "insert into chanpin_item(gongyi,beizhu,danjia,danwei,type) output inserted.id values('" + _this.data.gongyi + "','" + _this.data.beizhu + "','" + _this.data.danjia + "','" + _this.data.danwei + "','" + _this.data.this_type + "')"
      },
      success: res => {
        console.log(res)
        _this.setData({
          id: res.result.recordsets[0][0].id
        })
        var sql = "update chanpin_item set pic = 'https://yhocn.cn:9100/tb3999803/产品-" + res.result.recordsets[0][0].id + ".jpg' where id=" + res.result.recordsets[0][0].id
        wx.cloud.callFunction({
          name: 'sqlServer_tb3999803',
          data: {
            query: sql
          },
          success: res => {
            console.log(res)
            if (_this.data.pic.indexOf("base64") != -1) {
              var fsm = wx.getFileSystemManager();
              var buffer = wx.base64ToArrayBuffer(_this.data.pic.split(',')[1]);
              const fileName = wx.env.USER_DATA_PATH + '/产品-' + _this.data.id + '.jpg';
              fsm.writeFileSync(fileName, buffer, 'binary');
              console.log(fileName);
              wx.uploadFile({
                url: 'https://yhocn.cn:9089/file/upload',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                filePath: fileName,
                name: 'file',
                formData: {
                  name: '产品-' + _this.data.id + '.jpg',
                  path: '/tb3999803/',
                  kongjian: _this.data.kongjian,
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.indexOf("存储空间不足") != -1) {
                    wx.showToast({
                      title: '存储空间不足！',
                      icon: 'none'
                    })
                  } else {
                    _this.setData({
                      id: '',
                      gongyi: '',
                      beizhu: '',
                      danjia: '',
                      danwei: '',
                      pic: '',
                      type: '',
                    })
                    _this.qxShow()
                    var e = ['', '', '']
                    _this.tableShow(e)
                    wx.showToast({
                      title: '添加成功！',
                      icon: 'none'
                    })
                  }
                }
              })
            } else {
              _this.setData({
                id: '',
                gongyi: '',
                beizhu: '',
                danjia: '',
                danwei: '',
                pic: '',
                type: '',
              })
              _this.qxShow()
              var e = ['', '', '']
              _this.tableShow(e)
              wx.showToast({
                title: '添加成功！',
                icon: 'none'
              })
            }
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

  imgdown: function(e){ 
    var _this = this
    console.log(e)
    var url = e.currentTarget.dataset.value;   // base64
    if(url.indexOf("https") != -1){
      wx.previewImage({
        showmenu: true,
        urls: [url + "?query=1"] // 预览的地址url
      })
    }else{
      wx.showToast({
        title: '预览失败，请检查图片是否已保存',
        icon: 'none'
      })
    }
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  upd1: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: "update chanpin_item set gongyi='" + _this.data.gongyi + "',beizhu='" + _this.data.beizhu + "',danjia='" + _this.data.danjia + "',danwei='" + _this.data.danwei + "',type='" + _this.data.type + "',pic='https://yhocn.cn:9100/tb3999803/产品-" + _this.data.id + ".jpg' where id=" + _this.data.id
      },
      success: res => {
        console.log(res)
        if (_this.data.pic.indexOf("base64") != -1) {
          var fsm = wx.getFileSystemManager();
          var buffer = wx.base64ToArrayBuffer(_this.data.pic.split(',')[1]);
          const fileName = wx.env.USER_DATA_PATH + '/产品-' + _this.data.id + '.jpg';
          fsm.writeFileSync(fileName, buffer, 'binary');
          console.log(fileName);
          wx.uploadFile({
            url: 'https://yhocn.cn:9089/file/upload',
            header: {
              "Content-Type": "multipart/form-data"
            },
            filePath: fileName,
            name: 'file',
            formData: {
              name: '产品-' + _this.data.id + '.jpg',
              path: '/tb3999803/',
              kongjian: _this.data.kongjian,
            },
            success(res) {
              console.log(res.data);
              if (res.data.indexOf("存储空间不足") != -1) {
                wx.showToast({
                  title: '存储空间不足！',
                  icon: 'none'
                })
              } else {
                _this.setData({
                  id: '',
                  gongyi: '',
                  beizhu: '',
                  danjia: '',
                  danwei: '',
                  pic: '',
                  type: '',
                })
                _this.qxShow()
                var e = ['', '', '']
                _this.tableShow(e)

                wx.showToast({
                  title: '修改成功！',
                  icon: 'none'
                })
              }
            }
          })
        } else {
          _this.setData({
            id: '',
            gongyi: '',
            beizhu: '',
            danjia: '',
            danwei: '',
            pic: '',
            type: '',
          })
          _this.qxShow()
          var e = ['', '', '']
          _this.tableShow(e)
          wx.showToast({
            title: '修改成功！',
            icon: 'none'
          })
        }
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

  clickView: function (e) {
    var _this = this
    console.log(e)
    var column = e.currentTarget.dataset.column
    var userInfo = _this.data.userInfo
    if(userInfo.quanxian != '管理员' && userInfo.bianjichanpinxinxi != '是'){
      wx.showToast({
        title: '无权限',
        icon: 'none'
      })
      return;
    }
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      gongyi: _this.data.list[e.currentTarget.dataset.index].gongyi,
      beizhu: _this.data.list[e.currentTarget.dataset.index].beizhu,
      danjia: _this.data.list[e.currentTarget.dataset.index].danjia,
      danwei: _this.data.list[e.currentTarget.dataset.index].danwei,
      pic: _this.data.list[e.currentTarget.dataset.index].pic,
      type: _this.data.list[e.currentTarget.dataset.index].type,
      xgShow: true,
    })
  },

  del1: function () {
    var _this = this
    var userInfo = _this.data.userInfo
    if(userInfo.quanxian != '管理员' && userInfo.bianjichanpinxinxi != '是'){
      wx.showToast({
        title: '无权限',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: "提示",
      content: '确定删除？',
      cancelColor: '#282B33',
      confirmColor: '#BC4A4A',
      success: res => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlServer_tb3999803',
            data: {
              query: "delete from chanpin_item where id='" + _this.data.id + "'"
            },
            success: res => {
              console.log(res)
              wx.request({
                url: 'https://yhocn.cn:9089/file/deleteBase64', //仅为示例，并非真实的接口地址
                data: {
                  path: '/tb3999803/产品-' + _this.data.id + ".jpg",
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success (res) {
                  console.log(res.data)
                  _this.setData({
                    id: '',
                    gongyi: '',
                    beizhu: '',
                    danjia: '',
                    danwei: '',
                    pic: '',
                    type: '',
                  })
                  _this.qxShow()
                  var e = ['', '', '']
                  _this.tableShow(e)
                  wx.showToast({
                    title: '删除成功！',
                    icon: 'none'
                  })
                }
              })
            },
            err: res => {
              console.log("错误!")
              _this.qxShow()
              var e = ['', '', '']
              _this.tableShow(e)
            },
            fail: res => {
              wx.showToast({
                title: '请求失败！',
                icon: 'none'
              })
              console.log("请求失败！")
              _this.qxShow()
              var e = ['', '', '']
              _this.tableShow(e)
            },
            complete: res => {
              _this.qxShow()
              var e = ['', '', '']
              _this.tableShow(e)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      id: '',
      gongyi: '',
      beizhu: '',
      danjia: '',
      danwei: '',
      pic: '',
      type: '',
    })
  },

  sel1: function () {
    var _this = this
    var e = [_this.data.gongyi, _this.data.beizhu, _this.data.danwei]
    _this.tableShow(e)
    _this.qxShow()
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
    var e = ['', '', '']
    _this.tableShow(e)
    wx.setNavigationBarTitle({
      title: _this.data.this_type
    });
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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}