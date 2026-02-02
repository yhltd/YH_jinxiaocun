// packageP/page/PC_PaiBanMingXi/PC_PaiBanMingXi.js\
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    title: 
    [{ text: "姓名", width: "200rpx", columnName: "staff_name", type: "text", isupd: true },
    { text: "电话", width: "250rpx", columnName: "phone_number", type: "text", isupd: true },
    { text: "身份证号", width: "300rpx", columnName: "id_number", type: "text", isupd: true },
    { text: "部门", width: "200rpx", columnName: "department_name", type: "text", isupd: true },
    { text: "班次", width: "200rpx", columnName: "b", type: "text", isupd: true },
    { text: "日期", width: "200rpx", columnName: "c", type: "text", isupd: true },
    ],
    list:[],
    
    handle : true,
    xgShow:false,
    cxShow: false,
    rqxzShow1: false,
    xingming:"",
    bumen:"",
    xm :"",
    dh:"",
    sfzh:"",
    bm:"",
    bc:"",
    rq:"",
    isdis: '',
    isdischa: '',
    isdisgai:'',
    isdisshan:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.panduanquanxian()
    var e = ['', '']
    if (_this.data.isdischa == 1) {
      _this.tableShow(e)
    }
  },

  goto_yanshi: function(){
    wx.navigateTo({
      url: "../PC_mp4/PC_mp4?this_url=cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/pakageP_mp4/paiban.mp4"
      }) 
  },

  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa:1,
      isdisgai:1,
      isdisshan:1
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log(department_list1)
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "排班明细") {
        console.log(department_list1[i])
        //添加没权限
        if (department_list1[i].add == "否") {
          _this.setData({
            isdis: 2            
          });
          // console.log("否 isdis："+_this.data.isdis)
        } else {
          _this.setData({
            isdis: 1           
          });
         // console.log("是 isdis："+_this.data.isdis)

        }
        //修改没权限
        if (department_list1[i].upd == "否") {
          _this.setData({           
            isdisgai:2
          });
        } else {
          _this.setData({           
            isdisgai:1
          });

        }
        //删除没权限
        if (department_list1[i].del == "否") {
          _this.setData({
            isdisshan:2
          });
          console.log("否 isdisshan："+_this.data.isdisshan)
        } else {
          _this.setData({           
            isdisshan:1
          });
          
          console.log("是 isdisshan："+_this.data.isdisshan)
        }
        //查询没权限
        if (department_list1[i].sel == "否") {
          _this.setData({           
            isdischa:2
          });
        } else {
          _this.setData({           
            isdischa:1
          });

        }
        console.log(_this.data.isdis)

      }
    }
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  tableShow:function(e){
    var _this = this
    let user = app.globalData.gongsi;
    let xingming = _this.data.xingming;
    let bumen = _this.data.bumen;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select * from paibanbiao_detail where company='" + user + "' and staff_name like '%"+ xingming +"%' and department_name like '%"+ bumen +"%'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list: list,
        })
        wx.showToast({
          title: '刷新成功！',
          icon: 'none',
          duration: 3000
        })
        // console.log(list)
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

  inquire:function(){
    var _this=this
    _this.setData({
      tjShow:true,
      xm:"",
      dh:"",
      sfzh:"",
      bm:"",
      bc:"",
      rq:"",
      id:""
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  clickView:function(e){
    var _this = this
    _this.setData({
      xm: _this.data.list[e.currentTarget.dataset.index].staff_name,
      dh: _this.data.list[e.currentTarget.dataset.index].phone_number,
      sfzh: _this.data.list[e.currentTarget.dataset.index].id_number,
      bm: _this.data.list[e.currentTarget.dataset.index].department_name,
      bc: _this.data.list[e.currentTarget.dataset.index].b,
      rq: _this.data.list[e.currentTarget.dataset.index].c,
      id: _this.data.list[e.currentTarget.dataset.index].id,
      handle:false,
    })
  },

  hid_view:function(){
    var _this = this
    _this.setData({
      handle:true
    })
  },

  scPaiBan:function(){
    var _this = this
    _this.setData({
      delWindow1:true
    })
  },

  sure1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "delete from paibanbiao_detail where id='" + _this.data.id + "'"
      },
      success: res => {
        wx.showToast({
          title: '删除成功！',
          icon: 'none',
          duration: 3000
        })
        _this.tableShow()
        _this.setData({
          handle: true
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
  },

  onInput3: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  xgPaiBan:function(){
    var _this = this
    _this.setData({
      xgShow:true
    })
  },

  qxShow:function(){
    var _this = this
    _this.setData({
      xgShow: false,
      handle:true
    })
  },

  upd1: function () {
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "update paibanbiao_detail set staff_name='" + _this.data.xm + "',phone_number='" + _this.data.dh + "',id_number='" + _this.data.sfzh + "',department_name='" + _this.data.bm + "', b='" + _this.data.bc + "', c='" + _this.data.rq +"' where id='" + _this.data.id +"'"
        },
        success: res => {
          _this.setData({
            xm:"",
            dh:"",
            sfzh:"",
            bm:"",
            bc:"",
            rq:"",
            id:""
          })
          _this.qxShow()
          _this.tableShow()
          wx.showToast({
            title: '修改成功！',
            icon: 'none',
            duration: 3000
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

  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      xingming:"",
      bumen:""
    })
  },
  qxShow2: function () {
    var _this = this
    _this.setData({
      xgShow: false,
    })
  },
  sel1:function(){
    var _this = this
    var e = [_this.data.xingming,_this.data.bumen]
    _this.tableShow(e)
    _this.setData({
      cxShow:false,
      xingming:"",
      bumen:"",
    })
    wx.showToast({
      title: '查询成功！',
      icon: 'none',
      duration: 3000
    })
  },
  cxShow3: function () {
    var _this = this
    _this.setData({
      cxShow:false,
      xingming:"",
      bumen:"",
    })
  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title;
    var cloudList = {
      name : '排班明细',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:parseInt(title[i].width.split("r")[0])/10,
        columnName:title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu : 'true',
              fileType : 'xlsx',
              success : res=> {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail : res=> {
        console.log(res)
      }
    })
  },
})