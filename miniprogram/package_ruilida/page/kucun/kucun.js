// package_ruilida/page/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xlShow2: false,
    cxShow: false,
    name:'',
    enable: '',
    list_check: [
      {
        name:'商品编码',
        columnName: "shangpin_bianma",
        type: "text",
        width: "250rpx",
      },{
        name:'商品名称',
        columnName: 'name',
        type: "text",
        width: "250rpx",
      },{
        name:'规格',
        columnName: 'guige',
        type: "text",
        width: "250rpx",
      },{
        name:'材质',
        columnName: 'caizhi',
        type: "text",
        width: "250rpx",
      },{
        name:'技术标准',
        columnName: 'jishu_biaozhun',
        type: "text",
        width: "250rpx",
      },{
        name:'质保等级',
        columnName: 'zhibao_dengji',
        type: "text",
        width: "250rpx",
      },{
        name:'单位',
        columnName: 'danwei',
        type: "text",
        width: "250rpx",
      },{
        name:'库存结余',
        columnName: 'shuliang',
        type: "text",
        width: "250rpx",
      }
    ],
    all_result: ['商品编码','商品名称','规格','材质','技术标准','质保等级','单位','库存结余'],
    result: ['商品编码','商品名称','规格','材质','技术标准','质保等级','单位','库存结余'],
    gongneng_list:[
      {
        name:'查询'
      },{
        name:'导出Excel'
      }
    ],
    quanxuan_value: true,
    cangku: '',
    type:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo,
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
    var e = [_this.data.cangku,_this.data.type]
    _this.qxShow()
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    var sql = ""
    var userInfo = _this.data.userInfo
    if(userInfo.power_mingxi.kucun_sel != '是'){
      wx.showToast({
        title: '当前账号无权限',
        icon: 'none'
      })
      return;
    }
    if(e[0] == ''){
      sql = "select isnull(type,'') as type,shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang from(select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(shuliang) as shuliang from (select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(convert(float,isnull(shuliang,0))) as shuliang from caigou_ruku_item group by shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei union select shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(convert(float,isnull(shuliang,0))) * -1 as shuliang from xiaoshou_chuku_item group by shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei) as kucun group by shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei ) as kucun  left join (select type,bianhao from product_item left join product on product_item.product_id = product.id) as pro on kucun.shangpin_bianma = pro.bianhao where isnull(type,'') like '%" + e[1] + "%';select * from peizhi where type ='仓库';select * from peizhi where type ='商品分类'"
    }else{
      sql = "select isnull(type,'') as type,cangku,shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,shuliang from (select cangku,shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(shuliang) as shuliang from (select cangku,shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(convert(float,isnull(shuliang,0))) as shuliang from caigou_ruku_item as item left join caigou_ruku as caigou on item.ruku_id = caigou.id group by cangku,shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei union select cangku,shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei,sum(convert(float,isnull(shuliang,0))) * -1 as shuliang from xiaoshou_chuku_item as item left join xiaoshou_chuku xiaoshou on item.chuku_id = xiaoshou.id group by cangku,shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei) as kucun  where cangku = '" + e[0] + "' group by cangku,shangpin_bianma,name,guige,caizhi,jishu_biaozhun,zhibao_dengji,danwei) as end_kucun left join (select type,bianhao from product_item left join product on product_item.product_id = product.id) as pro on end_kucun.shangpin_bianma = pro.bianhao where isnull(type,'') like '%" + e[1] + "%';select * from peizhi where type ='仓库';select * from peizhi where type ='商品分类'"
    }
    
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets[0]
        var cangku_list = res.result.recordsets[1]
        var type_list = res.result.recordsets[2]
        var zongji = 0
        for(var i=0; i<list.length; i++){
          list[i].shuliang = Math.round(list[i].shuliang * 100) / 100
          zongji = zongji + (list[i].shuliang * 1)
        }
        zongji = Math.round(zongji * 100) / 100
        console.log(list)
        _this.setData({
          list: list,
          num: list.length,
          cangku_list,
          type_list,
          zongji
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

  xiala_show: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column + "_list"]
    _this.setData({
      list_xiala: list,
      click_column:column,
    })
    console.log(list)
    _this.setData({
      xlShow2: true
    })
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      if(click_column == 'gongneng' && new_val == '导出Excel'){
        _this.setData({
          xlShow2: false,
          dayin_show: true,
        })
      }else if(click_column == 'gongneng' && new_val == '查询'){
        _this.setData({
          xlShow2: false,
          cxShow: true,
        })
      }else if(click_column == 'gongneng' && new_val == '刷新'){
        _this.setData({
          xlShow2: false,
          cangku:'',
        })
        _this.sel1()
      }else{
        _this.setData({
          [click_column]: new_val,
          xlShow2: false,
        })
      }
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },
  qxShow:function(){
    var _this = this
    _this.setData({
      xlShow2: false,
      dayin_show: false,
      cxShow: false
    })
  },

  onChange(event) {
    var _this = this
    console.log('onChange')
    console.log(event)
    if(event.detail.length == _this.data.list_check.length){
      _this.setData({
        quanxuan_value: true,
      });
    }else{
      _this.setData({
        quanxuan_value: false,
      });
    }
    _this.setData({
      result: event.detail,
    });
  },

  toggle(event) {
    console.log('toggle')
    console.log(event)
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() {
    console.log('noop')
  },

  quanxuan:function(e){
    var _this = this
    console.log(e)
    var this_val = e.detail
    if(this_val == false){
      _this.setData({
        quanxuan_value: false,
        result:[]
      })
    }else{
      _this.setData({
        quanxuan_value: true,
        result:_this.data.all_result
      })
    }
  },

  toExcel:function(){
    var _this = this
    if(_this.data.result.length == 0){
      wx.showToast({
        title: '请选择导出信息',
        icon: 'none'
      })
      return;
    }
    var this_column = []
    var result = _this.data.result
    for(var j=0; j<_this.data.list_check.length; j++){
      for(var i=0; i<result.length; i++){
        if(_this.data.list_check[j].name == result[i]){
          this_column.push(_this.data.list_check[j])
          continue;
        }
      }
    }
    console.log(this_column)
    var list = _this.data.list;
    if(list.length == 0){
      wx.showToast({
        title: '无可导出数据，请查询后再试！',
        icon: 'none'
      })
      return;
    }
    _this.qxShow()
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    console.log(list)
    var title_put = this_column
    console.log(title_put)
    var cloudList = {
      name : '库存',
      items : [],
      header : []
    }
    for(let i=0;i<title_put.length;i++){
      cloudList.header.push({
        item:title_put[i].name,
        type:title_put[i].type,
        width:parseInt(title_put[i].width.split("r")[0]),
        columnName:title_put[i].columnName
      })
    }
    var item = []
    for(var i=0; i<list.length; i++){
      item.push({
        shangpin_bianma: list[i].shangpin_bianma,
        name: list[i].name,
        guige: list[i].guige,
        caizhi: list[i].caizhi,
        jishu_biaozhun: list[i].jishu_biaozhun,
        zhibao_dengji: list[i].zhibao_dengji,
        danwei: list[i].danwei,
        shuliang: list[i].shuliang + "",
      })
    }
    console.log("导出列表：" + item)
    cloudList.items = item
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        var this_name = new Date().getTime() + ".xlsx"
        var fileId = res.result.fileID
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获得临时路径",res.tempFilePath)
            delCloudFile(fileId)
            wx.openDocument({
              filePath: res.tempFilePath,
              fileType : 'xlsx',
              showMenu : true,
              success : res=> {
                wx.hideLoading({
                  success: (res) => {},
                })
                console.log("用户打开文件")
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
    _this.setData({
      start_date:'',
      stop_date:'',
      shoupiao_danwei:'',
    })
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

function delCloudFile(fileId){
  var fileIds = [];
  fileIds.push(fileId);
  wx.cloud.deleteFile({
    fileList: fileIds,
    success: res => {
      console.log(res.fileList);
    },
    fail : console.error
  })
}