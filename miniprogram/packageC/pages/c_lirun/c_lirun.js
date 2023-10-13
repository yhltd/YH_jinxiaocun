const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],
    month : 7,
    sum_year : 0,
    sum_month : 0,
    initHidView :false,
    chaxun_hidden:true,
    list : {},
    titil : [
      {text:"项目/科目",width:"300rpx",type:"text",columnName:"accounting"},
      {text:"本期金额",width:"200rpx",type:"number",columnName:"benqi"},
      {text:"本年累计",width:"200rpx",type:"number",columnName:"bennian"},
      {text:"上期金额",width:"200rpx",type:"number",columnName:"shangqi"},
    ],
    animationData_choice : []
  },

  get_list:function(list){
    console.log(list)
    var _this = this
    var ret_list = []
    var all = list[0]
    var list1 = list[1]
    var list2 = list[2]
    var list3 = list[3]

    if(all.length > 0 && list1.length > 0){
      for(var i=0;i<all.length;i++){
        for(var j=0;j<list1.length;j++){
          if(all[i].project == list1[j].project && all[i].accounting == list1[j].accounting){
            all[i].benqi = all[i].benqi * 1 + list1[j].benqi * 1
          }
        }
      }
    }

    if(all.length > 0 && list2.length > 0){
      for(var i=0;i<all.length;i++){
        for(var j=0;j<list2.length;j++){
          if(all[i].project == list2[j].project && all[i].accounting == list2[j].accounting){
            all[i].bennian = all[i].bennian * 1 + list2[j].bennian * 1
          }
        }
      }
    }

    if(all.length > 0 && list3.length > 0){
      for(var i=0;i<all.length;i++){
        for(var j=0;j<list3.length;j++){
          if(all[i].project == list3[j].project && all[i].accounting == list3[j].accounting){
            all[i].shangqi = all[i].shangqi * 1 + list3[j].shangqi * 1
          }
        }
      }
    }
    var xiangmu_list = []
    if(all.length > 0){
      for(var i=0; i<all.length; i++){
        if(xiangmu_list.length == 0){
          xiangmu_list.push({
            project:all[i].project,
            accounting:'',
            benqi:0,
            bennian:0,
            shangqi:0
          })
        }else{
          if(all[i].project != xiangmu_list[xiangmu_list.length-1].project){
            xiangmu_list.push({
              project:all[i].project,
              accounting:'',
              benqi:0,
              bennian:0,
              shangqi:0
            })
          }
        }
      }
    }

    if(all.length > 0 && xiangmu_list.length > 0){
      for(var i=0; i<xiangmu_list.length; i++){
        for(var j=0; j<all.length; j++){
          if(xiangmu_list[i].project == all[j].project){
            xiangmu_list[i].benqi = xiangmu_list[i].benqi * 1 + all[j].benqi * 1
            xiangmu_list[i].bennian = xiangmu_list[i].bennian * 1 + all[j].bennian * 1
            xiangmu_list[i].shangqi = xiangmu_list[i].shangqi * 1 + all[j].shangqi * 1
          }
        }
      }
    }

    var end_list = []
    var this_len = 0
    var sum1 = 0
    var sum2 = 0
    var sum3 = 0
    if(all.length > 0 && xiangmu_list.length > 0){
      for(var i=0; i<all.length; i++){
        if(this_len < xiangmu_list.length){
          if(all[i].project == xiangmu_list[this_len].project){
            end_list.push({
              accounting:xiangmu_list[this_len].project,
              benqi:xiangmu_list[this_len].benqi,
              bennian:xiangmu_list[this_len].bennian,
              shangqi:xiangmu_list[this_len].shangqi,
            })
            this_len = this_len + 1
          }
        }
        end_list.push({
          accounting:all[i].accounting,
          benqi:all[i].benqi,
          bennian:all[i].bennian,
          shangqi:all[i].shangqi,
        })
        sum1 = sum1 * 1 + all[i].benqi * 1
        sum2 = sum2 * 1 + all[i].bennian * 1
        sum3 = sum3 * 1 + all[i].shangqi * 1
      }
      end_list.push({
        accounting:"净利润：",
        benqi:sum1,
        bennian:sum2,
        shangqi:sum3,
      })
    }

    console.log(all)
    console.log(xiangmu_list)
    console.log(end_list)
    return end_list
  },

  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.点击左下角查询按钮，输入条件点击确定按钮后即可按条件查询。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  chaxun_show:function(){
    var _this = this
    _this.setData({
      chaxun_hidden:false,
    })
  },

  chaxun_quxiao:function(){
    var _this = this
    _this.setData({
      chaxun_hidden:true
    })
  },

  select:function(e){
    var _this = this
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var form = e.detail.value


    const formatData = date => {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      return [year + '-' + month + '-' + day,year,month,day]
      // return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }

    var nowDate = formatData(new Date())

    var start_date = form.start_date
    var stop_date = form.stop_date

    if(start_date=='' || start_date == undefined){
      start_date = nowDate[1] + "-01-01"
    }
    if(stop_date==''){
      stop_date = nowDate[1] + "-12-31"
    }
    console.log(start_date)
    var start_year = start_date.split('-')
    var stop_year = stop_date.split('-')
    
    console.log(start_year)
    console.log(stop_year)

    if(start_year[0] != stop_year[0]){
      wx.showToast({
        title: '不允许跨年查询',
        icon:'none'
      })
      return;
    }

    var userInfo = _this.data.userInfo;

    var sql = "select '项目：'+project as project,'科目：'+accounting as accounting,0.0 as benqi,0.0 as bennian,0.0 as shangqi from SimpleData where company='"+ userInfo.company +"' group by project,accounting order by project,accounting;select '项目：'+project as project,'科目：'+accounting as accounting,(sum(receipts)-sum(payment)) as benqi,0.0 as bennian,0.0 as shangqi from SimpleData where company='"+ userInfo.company +"' and insert_date>='" + start_date + "' and insert_date<='" + stop_date + "' group by project,accounting;select '项目：'+project as project,'科目：'+accounting as accounting,0.0 as benqi,(sum(receipts)-sum(payment)) as bennian,0.0 as shangqi from SimpleData where company='"+ userInfo.company +"' and insert_date>='" + start_year[0] + "-01-01" + "' and insert_date<='" + stop_year[0] + "-12-31" + "' group by project,accounting;select '项目：'+project as project,'科目：'+accounting as accounting,0.0 as benqi,0.0 as bennian,(sum(receipts)-sum(payment)) as shangqi from SimpleData where company='"+ userInfo.company +"' and insert_date<'" + start_date + "'  group by project,accounting;"

    console.log(sql)

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordsets
        this_list = _this.get_list(list)
        console.log(this_list)
        for(var i=0; i<this_list.length; i++){
          if(this_list[i].accounting.indexOf("科目：") != -1){
            console.log("dd")
            this_list[i].accounting = "　" + this_list[i].accounting
          }
        }
        _this.setData({
          this_list,
        })
      },
      err: res => {
        console.log("错误!")
      },
      complete: res => {
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
    _this.chaxun_quxiao()
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })

    wx.hideLoading({
      success: (res) => {},
    })

    var userInfo = JSON.parse(options.userInfo)

    var sql = "select invoice_type from InvoicePeizhi where company ='" + userInfo.company + "';select kehu from KehuPeizhi where company ='" + userInfo.company + "';"
    wx.cloud.callFunction({
      name : 'sqlServer_cw',
      data : {
        query : sql
      },
      success : res => {
        var this_list = res.result.recordsets
        var kehu_select = res.result.recordsets[1]
        var zhonglei_select = res.result.recordsets[0]
        var kehu = []
        var zhonglei = []
        for(var i=0; i< kehu_select.length; i++){
          kehu.push(
            kehu_select[i].kehu
          )
        }
        for(var i=0; i< zhonglei_select.length; i++){
          zhonglei.push(
            zhonglei_select[i].invoice_type
          )
        }
        _this.setData({
          kehu_list : kehu,
          zhonglei_list : zhonglei
        })
      }
    })

    const formatData = date => {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      return [year + '-' + month + '-' + day,year,month,day]
      // return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }

    var nowDate = formatData(new Date())

    var start_date = nowDate[1] + "-01-01"
    var stop_date = nowDate[1] + "-12-31"

    sql = "select '项目：'+project as project,'科目：'+accounting as accounting,0.0 as benqi,0.0 as bennian,0.0 as shangqi from SimpleData where company='"+ userInfo.company +"' group by project,accounting order by project,accounting;select '项目：'+project as project,'科目：'+accounting as accounting,(sum(receipts)-sum(payment)) as benqi,0.0 as bennian,0.0 as shangqi from SimpleData where company='"+ userInfo.company +"' and insert_date>='" + start_date + "' and insert_date<='" + stop_date + "' group by project,accounting;select '项目：'+project as project,'科目：'+accounting as accounting,0.0 as benqi,(sum(receipts)-sum(payment)) as bennian,0.0 as shangqi from SimpleData where company='"+ userInfo.company +"' and insert_date>='" + start_date + "' and insert_date<='" + stop_date + "' group by project,accounting;select '项目：'+project as project,'科目：'+accounting as accounting,0.0 as benqi,0.0 as bennian,(sum(receipts)-sum(payment)) as shangqi from SimpleData where company='"+ userInfo.company +"' and insert_date<'" + start_date + "'  group by project,accounting;"
    console.log(sql)
    wx.cloud.callFunction({
      name : 'sqlServer_cw',
      data : {
        query : sql
      },
      success : res => {
        console.log(res.result.recordsets)
        var this_list = res.result.recordsets
        this_list = _this.get_list(this_list)
        console.log(this_list)
        for(var i=0; i<this_list.length; i++){
          if(this_list[i].accounting.indexOf("科目：") != -1){
            console.log("dd")
            this_list[i].accounting = "　" + this_list[i].accounting
          }
        }
        _this.setData({
          list : this_list,
        })

      }
    })


  },

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      kehu: _this.data.kehu_list[e.detail.value]
    })
  },

  bindDateChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      start_date: e.detail.value
    })
  },

  bindDateChange3: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      stop_date: e.detail.value
    })
  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = _this.data.titil
    var cloudList = {
      name : '极简总账',
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

