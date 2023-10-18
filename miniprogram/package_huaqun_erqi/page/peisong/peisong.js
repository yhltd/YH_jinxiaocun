// package_huaqun_erqi/page/peisong/peisong.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  xgShow2: false,
  cxShow: false,
  xlShow: false,
  rqxzShow2: false,
  data: {
    quyu:'',
    kongjian: 3,
    minDate: new Date(2000, 1, 1).getTime(),
    maxDate: new Date(2099, 12, 31).getTime(),
    currentDate: new Date().getTime(),
    onload_panduan:'',
    header_list:{
      insert_date:'',
      order_number:'',
    },
    list:[
      {
        order_number: '',
        insert_date: '',
        customer_name: '',
        customer_name_renyuan: '',
        customer_name_riqi: '',
        customer_need_text: '',
        customer_need_text_renyuan: '',
        customer_need_text_riqi: '',
        customer_need_img1: '',
        customer_need_img1_renyuan: '',
        customer_need_img1_riqi: '',
        customer_need_text1: '',
        customer_need_text1_renyuan: '',
        customer_need_text1_riqi: '',
        customer_need_text2: '',
        customer_need_text2_renyuan: '',
        customer_need_text2_riqi: '',
        songhuo_address: '',
        songhuo_address_renyuan: '',
        songhuo_address_riqi: '',
        anzhuang_address: '',
        anzhuang_address_renyuan: '',
        anzhuang_address_riqi: '',
        phone: '',
        phone_renyuan: '',
        phone_riqi: '',
        customer_order: '',
        customer_order_renyuan: '',
        customer_order_riqi: '',
        songhuo_danhao: '',
        songhuo_danhao_renyuan: '',
        songhuo_danhao_riqi: '',
        peihuo_img1: '',
        peihuo_img1_renyuan: '',
        peihuo_img1_riqi: '',
        peihuo_img2: '',
        peihuo_img2_renyuan: '',
        peihuo_img2_riqi: '',
        peihuo_img3: '',
        peihuo_img3_renyuan: '',
        peihuo_img3_riqi: '',
        peihuo_img4: '',
        peihuo_img4_renyuan: '',
        peihuo_img4_riqi: '',
        peihuo_img5: '',
        peihuo_img5_renyuan: '',
        peihuo_img5_riqi: '',
        peisong_img1: '',
        peisong_img1_renyuan: '',
        peisong_img1_riqi: '',
        peisong_img2: '',
        peisong_img2_renyuan: '',
        peisong_img2_riqi: '',
        peisong_img3: '',
        peisong_img3_renyuan: '',
        peisong_img3_riqi: '',
        money: '',
        money_renyuan: '',
        money_riqi: '',
        shoukuan: '',
        shoukuan_renyuan: '',
        shoukuan_riqi: '',
        wancheng: '',
        wancheng_renyuan: '',
        wancheng_riqi: '',
        beizhu: '',
        beizhu_renyuan: '',
        beizhu_riqi: '',
        kucun_text: '',
        kucun_text_renyuan: '',
        kucun_text_riqi: '',
        kucun_img1: '',
        kucun_img1_renyuan: '',
        kucun_img1_riqi: '',
        kucun_img2: '',
        kucun_img2_renyuan: '',
        kucun_img2_riqi: '',
        kucun_img3: '',
        kucun_img3_renyuan: '',
        kucun_img3_riqi: '',
      }
    ],
    baocun:'保存',
    this_img: '',
    this_column: '',
    wancheng_list: [
      {name: '优先处理'},
      {name: '配货作业中'},
      {name: '配货完成'},
      {name: '完成'},
      {name: '未完成-缺货'},
      {name: '未完成-配错货'},
    ],
    shoukuan_list: [
      {name: ''},
      {name: '已收款'},
      {name: '送货收款'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    console.log(options)
    console.log(options.order_number)
    var userInfo = JSON.parse(options.userInfo)
    var onload_panduan = ""
    if(options.order_number == undefined){
      onload_panduan = "new"
    }else{
      onload_panduan = "old"
    }
    _this.setData({
      userInfo,
      onload_panduan
    })

    // var sql = "select isnull(company,'') as name from erqi_userInfo where isnull(company,'') != '' group by company"
    var sql = "select isnull(company,'') as name,isnull(quyu,'') as quyu from userInfo where isnull(company,'') != '' group by company,quyu"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var customer_name_list = res.result.recordset
        console.log(customer_name_list)
        _this.setData({
          customer_name_list
        })
      },
      err: res => {
        wx.showToast({
          title: '读取下拉列表错误！',
          icon: 'none'
        })
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

    
    if(options.order_number == undefined){
      var bianhao_left = getBianHao()
      var list = _this.data.list
      if(_this.data.userInfo.power == '客户'){
        list[0].customer_name = userInfo.company
        list[0].customer_name_renyuan = userInfo.name
        list[0].customer_name_riqi = getNowDate1()
        _this.setData({
          list
        })
      }
      var sql = "select order_number from erqi_peisongdan where order_number like '" + bianhao_left + "%'"
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: sql
        },
        success: res => {
          var bianhao_list = res.result.recordset
          var new_bianhao = "001" 
          for(var i=0; i<bianhao_list.length; i++){
            if(bianhao_list[i].order_number != '' && bianhao_list[i].order_number != null && bianhao_list[i].order_number != undefined){
              var this_bianhao = bianhao_list[i].order_number.slice(10)
              console.log(this_bianhao)
              if(this_bianhao >= new_bianhao){
                new_bianhao = (this_bianhao * 1 + 1).toString()
                if(new_bianhao.length == 1){
                  new_bianhao = "00" + new_bianhao.toString()
                }else if(new_bianhao.length == 2){
                  new_bianhao = "0" + new_bianhao.toString()
                }
                console.log(new_bianhao)
              }
            }
          }
          new_bianhao = bianhao_left.toString() + new_bianhao.toString()
          var list = _this.data.list
          list[0].order_number = new_bianhao
          list[0].insert_date = getNowDate()
          console.log(list)
          _this.setData({
            list
          })
        },
        err: res => {
          wx.showToast({
            title: '读取下拉列表错误！',
            icon: 'none'
          })
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
    }else{
      var sql = "select * from erqi_peisongdan where order_number='" + options.order_number + "'"
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: sql
        },
        success: res => {
          var list = res.result.recordset
          console.log(list)
          _this.setData({
            list
          })
        },
        err: res => {
          wx.showToast({
            title: '读取下拉列表错误！',
            icon: 'none'
          })
          console.log("错误!")
        },
        fail: res => {
          console.log(res)
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
    }
  },

  sel_xiala: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    if(_this.data.this_column == 'wancheng' || _this.data.this_column == 'shoukuan'){
      var list = _this.data[_this.data.this_column + "_list"]
      _this.setData({
        list_xiala: list,
      })
      console.log(list)
      _this.setData({
        xlShow: true,
        xgShow: false
      })
    }else if(_this.data.this_column == 'customer_name'){
      var list = []
      var xunhuan_list = _this.data[_this.data.this_column + "_list"]
      console.log(_this.data.this_value)
      if(_this.data.this_value != ''){
        for(var i=0; i<xunhuan_list.length; i++){
          if(xunhuan_list[i].name.indexOf(_this.data.this_value) != -1){
            list.push(xunhuan_list[i])
          }
        }
      }else{
        list = xunhuan_list
      }
      _this.setData({
        list_xiala: list,
      })
      console.log(list)
      _this.setData({
        xlShow: true,
        xgShow: false
      })
    }
  },

  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      var new_val = e.detail.name
      var quyu = e.detail.quyu
      if(quyu != null && quyu != undefined){
        _this.setData({
          quyu: quyu
        })
      }
      console.log(e.detail)
      _this.setData({
        xlShow: false,
        xgShow: true,
        this_value: new_val
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow: false,
        xgShow: true,
      })
    }
  },

  save: function(){
    var _this = this
    var list = _this.data.list
    console.log(list[0].songhuo_danhao)
    if(list[0].customer_name == ""){
      wx.showToast({
        title: '未填写客户名称！',
        icon: 'none'
      })
         return list[0].customer_name_riqi;
    }
    console.log(list)
    // if (list[0].songhuo_danhao == ""){
    //   wx.showToast({
    //     title: '未填写送货单号！',
    //     icon: 'none'
    //   })
    //      return list[0].customer_name_riqi;
    // } 

    var sql = "select * from erqi_peisongdan where songhuo_danhao = '" + list[0].songhuo_danhao + "'"
    console.log(sql)
    wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: sql
        },
        success: res => {
          console.log(res)
         if(res.result.recordset == ""){
           console.log('成功')
          wx.showLoading({
            title: '保存文字',
          })
          if(list[0].id == "" || list[0].id == undefined){
            var sql = "insert into erqi_peisongdan(order_number,insert_date,customer_name,customer_name_renyuan,customer_name_riqi,customer_need_text,customer_need_text_renyuan,customer_need_text_riqi,customer_need_img1_renyuan,customer_need_img1_riqi,customer_need_text1,customer_need_text1_renyuan,customer_need_text1_riqi,customer_need_text2,customer_need_text2_renyuan,customer_need_text2_riqi,songhuo_address,songhuo_address_renyuan,songhuo_address_riqi,anzhuang_address,anzhuang_address_renyuan,anzhuang_address_riqi,phone,phone_renyuan,phone_riqi,customer_order,customer_order_renyuan,customer_order_riqi,songhuo_danhao,songhuo_danhao_renyuan,songhuo_danhao_riqi,peihuo_img1_renyuan,peihuo_img1_riqi,peihuo_img2_renyuan,peihuo_img2_riqi,peihuo_img3_renyuan,peihuo_img3_riqi,peihuo_img4_renyuan,peihuo_img4_riqi,peihuo_img5_renyuan,peihuo_img5_riqi,peisong_img1_renyuan,peisong_img1_riqi,peisong_img2_renyuan,peisong_img2_riqi,peisong_img3_renyuan,peisong_img3_riqi,wancheng,wancheng_renyuan,wancheng_riqi,beizhu,beizhu_renyuan,beizhu_riqi,kucun_text,kucun_text_renyuan,kucun_text_riqi,kucun_img1_renyuan,kucun_img1_riqi,kucun_img2_renyuan,kucun_img2_riqi,kucun_img3_renyuan,kucun_img3_riqi,money,money_renyuan,money_riqi,shoukuan,shoukuan_renyuan,shoukuan_riqi,quyu) output inserted.id values('" + list[0].order_number + "','" + list[0].insert_date + "','" + list[0].customer_name + "','" + list[0].customer_name_renyuan + "','" + list[0].customer_name_riqi + "','" + list[0].customer_need_text + "','" + list[0].customer_need_text_renyuan + "','" + list[0].customer_need_text_riqi + "','" + list[0].customer_need_img1_renyuan + "','" + list[0].customer_need_img1_riqi+ "','" + list[0].customer_need_text1 + "','" + list[0].customer_need_text1_renyuan + "','" + list[0].customer_need_text1_riqi + "','"  + list[0].customer_need_text2 + "','" + list[0].customer_need_text2_renyuan + "','" + list[0].customer_need_text2_riqi + "','" + list[0].songhuo_address + "','" + list[0].songhuo_address_renyuan + "','" + list[0].songhuo_address_riqi + "','" + list[0].anzhuang_address + "','" + list[0].anzhuang_address_renyuan + "','" + list[0].anzhuang_address_riqi + "','" + list[0].phone + "','" + list[0].phone_renyuan + "','" + list[0].phone_riqi + "','" + list[0].customer_order + "','" + list[0].customer_order_renyuan + "','" + list[0].customer_order_riqi + "','" + list[0].songhuo_danhao + "','" + list[0].songhuo_danhao_renyuan + "','" + list[0].songhuo_danhao_riqi + "','" + list[0].peihuo_img1_renyuan + "','" + list[0].peihuo_img1_riqi + "','" + list[0].peihuo_img2_renyuan + "','" + list[0].peihuo_img2_riqi + "','" + list[0].peihuo_img3_renyuan + "','" + list[0].peihuo_img3_riqi + "','" + list[0].peihuo_img4_renyuan + "','" + list[0].peihuo_img4_riqi + "','" + list[0].peihuo_img5_renyuan + "','" + list[0].peihuo_img5_riqi + "','" + list[0].peisong_img1_renyuan + "','" + list[0].peisong_img1_riqi + "','" + list[0].peisong_img2_renyuan + "','" + list[0].peisong_img2_riqi + "','" + list[0].peisong_img3_renyuan + "','" + list[0].peisong_img3_riqi + "','" + list[0].wancheng + "','" + list[0].wancheng_renyuan + "','" + list[0].wancheng_riqi + "','" + list[0].beizhu + "','" + list[0].beizhu_renyuan + "','" + list[0].beizhu_riqi + "','" + list[0].kucun_text + "','" + list[0].kucun_text_renyuan + "','" + list[0].kucun_text_riqi + "','" + list[0].kucun_img1_renyuan + "','" + list[0].kucun_img1_riqi + "','" + list[0].kucun_img2_renyuan + "','" + list[0].kucun_img2_riqi + "','" + list[0].kucun_img3_renyuan + "','" + list[0].kucun_img3_riqi + "','" + list[0].money + "','" + list[0].money_renyuan + "','" + list[0].money_riqi + "','" + list[0].shoukuan + "','" + list[0].shoukuan_renyuan + "','" + list[0].shoukuan_riqi + "','" + _this.data.quyu + "')"
            console.log(sql)
            wx.cloud.callFunction({
              name: 'sqlserver_huaqun',
              data: {
                query: sql
              },
              success: res => {
                console.log(res)
                wx.hideLoading()
                wx.showLoading({
                  title: '保存图片',
                })
                list[0].id = res.result.recordset[0].id
                var sql = "update erqi_peisongdan set customer_need_img1='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-01.jpg',peihuo_img1='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-04.jpg',peihuo_img2='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-05.jpg',peihuo_img3='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-06.jpg',peihuo_img4='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-07.jpg',peihuo_img5='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-08.jpg',peisong_img1='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-09.jpg',peisong_img2='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-10.jpg',peisong_img3='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-11.jpg',kucun_img1='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-12.jpg',kucun_img2='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-13.jpg',kucun_img3='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-14.jpg' where id=" + list[0].id
                console.log(sql)
                
                if(list[0].customer_need_img1.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].customer_need_img1.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-01.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-01.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
                
                // if(list[0].customer_need_img2.indexOf("base64") != -1){
                //   var fsm = wx.getFileSystemManager();
                //   var buffer = wx.base64ToArrayBuffer(list[0].customer_need_img2.split(',')[1]);
                //   const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-02.jpg';
                //   fsm.writeFileSync(fileName, buffer, 'binary');
                //   console.log(fileName);
                //    wx.uploadFile({
                //     url: 'http://yhocn.cn:9087/file/upload',
                //     header: { "Content-Type": "multipart/form-data" },
                //     filePath: fileName,
                //     name: 'file',
                //     formData:{
                //     name: list[0].order_number +'-02.jpg',
                //     path: '/huaqun_erqi/',
                //     kongjian: _this.data.kongjian,
                //     },
                //     success(res){
                //       console.log(res.data);
                //       if(res.data.indexOf("存储空间不足") != -1){
                //         wx.showToast({
                //           title: '存储空间不足！',
                //           icon: 'none'
                //         })
                //       }
                //     }
                //   })
                // }
      
                // if(list[0].customer_need_img3.indexOf("base64") != -1){
                //   var fsm = wx.getFileSystemManager();
                //   var buffer = wx.base64ToArrayBuffer(list[0].customer_need_img3.split(',')[1]);
                //   const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-03.jpg';
                //   fsm.writeFileSync(fileName, buffer, 'binary');
                //   console.log(fileName);
                //    wx.uploadFile({
                //     url: 'http://yhocn.cn:9087/file/upload',
                //     header: { "Content-Type": "multipart/form-data" },
                //     filePath: fileName,
                //     name: 'file',
                //     formData:{
                //     name: list[0].order_number +'-03.jpg',
                //     path: '/huaqun_erqi/',
                //     kongjian: _this.data.kongjian,
                //     },
                //     success(res){
                //       console.log(res.data);
                //       if(res.data.indexOf("存储空间不足") != -1){
                //         wx.showToast({
                //           title: '存储空间不足！',
                //           icon: 'none'
                //         })
                //       }
                //     }
                //   })
                // }
      
                if(list[0].peihuo_img1.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peihuo_img1.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-04.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-04.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peihuo_img2.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peihuo_img2.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-05.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-05.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peihuo_img3.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peihuo_img3.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-06.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-06.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peihuo_img4.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peihuo_img4.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-07.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-07.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peihuo_img5.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peihuo_img5.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-08.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-08.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peisong_img1.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peisong_img1.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-09.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-09.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peisong_img2.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peisong_img2.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-10.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-10.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peisong_img3.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peisong_img3.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-11.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-11.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].kucun_img1.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].kucun_img1.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-12.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-12.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].kucun_img2.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].kucun_img2.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-13.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-13.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].kucun_img3.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].kucun_img3.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-14.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                   wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-14.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
                wx.cloud.callFunction({
                  name: 'sqlserver_huaqun',
                  data: {
                    query: sql
                  },
                  success: res => {
                    _this.setData({
                      baocun: '已保存'
                    })
                    wx.hideLoading()
                    wx.showToast({
                      title: '保存成功',
                      icon: 'none'
                    })
                  },
                  err: res => {
                    wx.showToast({
                      title: '保存错误！',
                      icon: 'none'
                    })
                    console.log("错误!")
                  },
                  fail: res => {
                    console.log(res)
                    wx.showToast({
                      title: '请求失败！',
                      icon: 'none'
                    })
                    console.log("请求失败！")
                  }
                })
      
                
                console.log(sql)
              },
              err: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '错误！',
                  icon: 'none'
                })
                console.log("错误!")
              },
              fail: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '请求失败！',
                  icon: 'none'
                })
                console.log("请求失败！")
              }
            })
          }else{
            var sql = "update erqi_peisongdan set order_number='" + list[0].order_number + "',insert_date='" + list[0].insert_date + "',customer_name='" + list[0].customer_name + "',customer_name_renyuan='" + list[0].customer_name_renyuan + "',customer_name_riqi='" + list[0].customer_name_riqi + "',customer_need_text='" + list[0].customer_need_text + "',customer_need_text_renyuan='" + list[0].customer_need_text_renyuan + "',customer_need_text_riqi='" + list[0].customer_need_text_riqi + "',customer_need_img1_renyuan='" + list[0].customer_need_img1_renyuan + "',customer_need_img1_riqi='" + list[0].customer_need_img1_riqi + "',customer_need_text1='" + list[0].customer_need_text1 + "',customer_need_text1_renyuan='" + list[0].customer_need_text1_renyuan + "',customer_need_text1_riqi='" + list[0].customer_need_text1_riqi +"',customer_need_text2='" + list[0].customer_need_text2 + "',customer_need_text2_renyuan='" + list[0].customer_need_text2_renyuan + "',customer_need_text2_riqi='" + list[0].customer_need_text2_riqi + "',songhuo_address='" + list[0].songhuo_address + "',songhuo_address_renyuan='" + list[0].songhuo_address_renyuan + "',songhuo_address_riqi='" + list[0].songhuo_address_riqi + "',anzhuang_address='" + list[0].anzhuang_address + "',anzhuang_address_renyuan='" + list[0].anzhuang_address_renyuan + "',anzhuang_address_riqi='" + list[0].anzhuang_address_riqi + "',phone='" + list[0].phone + "',phone_renyuan='" + list[0].phone_renyuan + "',phone_riqi='" + list[0].phone_riqi + "',customer_order='" + list[0].customer_order + "',customer_order_renyuan='" + list[0].customer_order_renyuan + "',customer_order_riqi='" + list[0].customer_order_riqi + "',songhuo_danhao='" + list[0].songhuo_danhao + "',songhuo_danhao_renyuan='" + list[0].songhuo_danhao_renyuan + "',songhuo_danhao_riqi='" + list[0].songhuo_danhao_riqi + "',peihuo_img1_renyuan='" + list[0].peihuo_img1_renyuan + "',peihuo_img1_riqi='" + list[0].peihuo_img1_riqi + "',peihuo_img2_renyuan='" + list[0].peihuo_img2_renyuan + "',peihuo_img2_riqi='" + list[0].peihuo_img2_riqi + "',peihuo_img3_renyuan='" + list[0].peihuo_img3_renyuan + "',peihuo_img3_riqi='" + list[0].peihuo_img3_riqi + "',peihuo_img4_renyuan='" + list[0].peihuo_img4_renyuan + "',peihuo_img4_riqi='" + list[0].peihuo_img4_riqi + "',peihuo_img5_renyuan='" + list[0].peihuo_img5_renyuan + "',peihuo_img5_riqi='" + list[0].peihuo_img5_riqi + "',peisong_img1_renyuan='" + list[0].peisong_img1_renyuan + "',peisong_img1_riqi='" + list[0].peisong_img1_riqi + "',peisong_img2_renyuan='" + list[0].peisong_img2_renyuan + "',peisong_img2_riqi='" + list[0].peisong_img2_riqi + "',peisong_img3_renyuan='" + list[0].peisong_img3_renyuan + "',peisong_img3_riqi='" + list[0].peisong_img3_riqi + "',wancheng='" + list[0].wancheng + "',wancheng_renyuan='" + list[0].wancheng_renyuan + "',wancheng_riqi='" + list[0].wancheng_riqi + "',beizhu='" + list[0].beizhu + "',beizhu_renyuan='" + list[0].beizhu_renyuan + "',beizhu_riqi='" + list[0].beizhu_riqi + "',kucun_text='" + list[0].kucun_text + "',kucun_text_renyuan='" + list[0].kucun_text_renyuan + "',kucun_text_riqi='" + list[0].kucun_text_riqi + "',kucun_img1_renyuan='" + list[0].kucun_img1_renyuan + "',kucun_img1_riqi='" + list[0].kucun_img1_riqi + "',kucun_img2_renyuan='" + list[0].kucun_img2_renyuan + "',kucun_img2_riqi='" + list[0].kucun_img2_riqi + "',kucun_img3_renyuan='" + list[0].kucun_img3_renyuan + "',kucun_img3_riqi='" + list[0].kucun_img3_riqi + "',money='" + list[0].money + "',money_renyuan='" + list[0].money_renyuan + "',money_riqi='" + list[0].money_riqi + "',shoukuan='" + list[0].shoukuan + "',shoukuan_renyuan='" + list[0].shoukuan_renyuan + "',shoukuan_riqi='" + list[0].shoukuan_riqi + "' where id =" + list[0].id
            console.log(sql)
            wx.cloud.callFunction({
              name: 'sqlserver_huaqun',
              data: {
                query: sql
              },
              success: res => {
                console.log(res)
                wx.hideLoading()
                wx.showLoading({
                  title: '保存图片',
                })
                var sql = "update erqi_peisongdan set customer_need_img1='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-01.jpg',peihuo_img1='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-04.jpg',peihuo_img2='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-05.jpg',peihuo_img3='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-06.jpg',peihuo_img4='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-07.jpg',peihuo_img5='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-08.jpg',peisong_img1='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-09.jpg',peisong_img2='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-10.jpg',peisong_img3='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-11.jpg',kucun_img1='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-12.jpg',kucun_img2='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-13.jpg',kucun_img3='http://yhocn.cn:9088/huaqun_erqi/" + list[0].order_number + "-14.jpg' where id=" + list[0].id
                console.log(sql)
      
                if(list[0].customer_need_img1.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].customer_need_img1.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-01.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-01.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
                
                // if(list[0].customer_need_img2.indexOf("base64") != -1){
                //   var fsm = wx.getFileSystemManager();
                //   var buffer = wx.base64ToArrayBuffer(list[0].customer_need_img2.split(',')[1]);
                //   const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-02.jpg';
                //   fsm.writeFileSync(fileName, buffer, 'binary');
                //   console.log(fileName);
                //   wx.uploadFile({
                //     url: 'http://yhocn.cn:9087/file/upload',
                //     header: { "Content-Type": "multipart/form-data" },
                //     filePath: fileName,
                //     name: 'file',
                //     formData:{
                //     name: list[0].order_number +'-02.jpg',
                //     path: '/huaqun_erqi/',
                //     kongjian: _this.data.kongjian,
                //     },
                //     success(res){
                //       console.log(res.data);
                //       if(res.data.indexOf("存储空间不足") != -1){
                //         wx.showToast({
                //           title: '存储空间不足！',
                //           icon: 'none'
                //         })
                //       }
                //     }
                //   })
                // }
      
                // if(list[0].customer_need_img3.indexOf("base64") != -1){
                //   var fsm = wx.getFileSystemManager();
                //   var buffer = wx.base64ToArrayBuffer(list[0].customer_need_img3.split(',')[1]);
                //   const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-03.jpg';
                //   fsm.writeFileSync(fileName, buffer, 'binary');
                //   console.log(fileName);
                //   wx.uploadFile({
                //     url: 'http://yhocn.cn:9087/file/upload',
                //     header: { "Content-Type": "multipart/form-data" },
                //     filePath: fileName,
                //     name: 'file',
                //     formData:{
                //     name: list[0].order_number +'-03.jpg',
                //     path: '/huaqun_erqi/',
                //     kongjian: _this.data.kongjian,
                //     },
                //     success(res){
                //       console.log(res.data);
                //       if(res.data.indexOf("存储空间不足") != -1){
                //         wx.showToast({
                //           title: '存储空间不足！',
                //           icon: 'none'
                //         })
                //       }
                //     }
                //   })
                // }
      
                if(list[0].peihuo_img1.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peihuo_img1.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-04.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-04.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peihuo_img2.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peihuo_img2.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-05.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-05.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peihuo_img3.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peihuo_img3.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-06.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-06.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peihuo_img4.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peihuo_img4.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-07.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-07.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peihuo_img5.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peihuo_img5.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-08.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-08.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peisong_img1.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peisong_img1.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-09.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-09.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peisong_img2.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peisong_img2.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-10.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-10.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].peisong_img3.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].peisong_img3.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-11.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-11.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].kucun_img1.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].kucun_img1.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-12.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-12.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].kucun_img2.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].kucun_img2.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-13.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-13.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
      
                if(list[0].kucun_img3.indexOf("base64") != -1){
                  var fsm = wx.getFileSystemManager();
                  var buffer = wx.base64ToArrayBuffer(list[0].kucun_img3.split(',')[1]);
                  const fileName = wx.env.USER_DATA_PATH + '/'+ list[0].order_number +'-14.jpg';
                  fsm.writeFileSync(fileName, buffer, 'binary');
                  console.log(fileName);
                  wx.uploadFile({
                    url: 'http://yhocn.cn:9087/file/upload',
                    header: { "Content-Type": "multipart/form-data" },
                    filePath: fileName,
                    name: 'file',
                    formData:{
                    name: list[0].order_number +'-14.jpg',
                    path: '/huaqun_erqi/',
                    kongjian: _this.data.kongjian,
                    },
                    success(res){
                      console.log(res.data);
                      if(res.data.indexOf("存储空间不足") != -1){
                        wx.showToast({
                          title: '存储空间不足！',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
                wx.cloud.callFunction({
                  name: 'sqlserver_huaqun',
                  data: {
                    query: sql
                  },
                  success: res => {
                    _this.setData({
                      baocun: '已保存'
                    })
                    wx.hideLoading()
                    wx.showToast({
                      title: '保存成功',
                      icon: 'none'
                    })
                  },
                  err: res => {
                    wx.showToast({
                      title: '保存错误！',
                      icon: 'none'
                    })
                    console.log("错误!")
                  },
                  fail: res => {
                    console.log(res)
                    wx.showToast({
                      title: '请求失败！',
                      icon: 'none'
                    })
                    console.log("请求失败！")
                  }
                })
              },
              err: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '错误！',
                  icon: 'none'
                })
                console.log("错误!")
              },
              fail: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '请求失败！',
                  icon: 'none'
                })
                console.log("请求失败！")
              }
            })
          }
         }else{
          wx.showToast({
            title: '送货单号已存在，请勿重复添加！',
            icon: 'none'
          })
          console.log("存在!")
         }
        },
        err: res => {
          wx.showToast({
            title: '错误！',
            icon: 'none'
          })
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '错误！',
            icon: 'none'
          })
          console.log("错误!")
        }
      })
    
  },

  imgClick: function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    console.log(e.currentTarget.dataset.value)
    var column = e.currentTarget.dataset.column
    if(column == 'songhuo_danhao' || column == 'peihuo_img1' || column == 'peihuo_img2' || column == 'peihuo_img3' || column == 'peihuo_img4' || column == 'peihuo_img5' || column == 'peisong_img1' || column == 'peisong_img2' || column == 'peisong_img3' || column == 'wancheng' || column == 'beizhu'){
      if(_this.data.userInfo.power == '客户'){
        wx.showToast({
          title: '客户不允许编辑此处！',
          icon: 'none'
        })
        return;
      }
    }
    console.log(e.currentTarget.dataset.column)
    console.log(_this.data.list[0][e.currentTarget.dataset.column]) 
    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:_this.data.list[0][e.currentTarget.dataset.column],
      xgShow2:true,
    })
  },

  imgdown: function(e){
    var _this = this
    var url = _this.data.this_value;   // base64
    if(url.indexOf("http") != -1){
      wx.downloadFile({
        url: url, //仅为示例，并非真实的资源
        success (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            wx.saveImageToPhotosAlbum({
              filePath:res.tempFilePath,
              success(res) {
                wx.showToast({
                  title: '保存成功，请到手机相册查看',
                  icon: 'none'
                })
                console.log(res)
              },
              fail: function(err) {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
                console.log('保存失败', err);
              }
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '下载失败，请检查图片是否已保存',
        icon: 'none'
      })
    }
  },

  imgload: function(e){
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
          success: function(res) {
            console.log(res.tempFilePath)
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePath, //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: res => { //成功的回调
                console.log('data:image/png;base64,' + res.data)
                var size = res.data.length / 1048576
                console.log(size)
                if(size > 3){
                  wx.showToast({
                    title: '图片转化后超过3M，不允许上传！',
                    icon: 'none'
                  })
                  return;
                }
                var list = _this.data.list
                list[0][_this.data.this_column] = 'data:image/png;base64,' + res.data
                list[0][_this.data.this_column + "_renyuan"] = _this.data.userInfo.name
                list[0][_this.data.this_column + "_riqi"] = getNowDate1()
                _this.setData({
                  list
                })
                _this.qxShow()
                console.log(list)
              }
            })
          },
          fail: function(res) {
            console.log(res)
          },
        })
      }
    })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  clickView:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    console.log(e.currentTarget.dataset.value)
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    if(column == 'customer_name' || column == 'songhuo_danhao' || column == 'peihuo_img1' || column == 'peihuo_img2' || column == 'peihuo_img3' || column == 'peihuo_img4' || column == 'peihuo_img5' || column == 'peisong_img1' || column == 'peisong_img2' || column == 'peisong_img3' || column == 'wancheng' || column == 'beizhu' || column == 'money' || column == 'shoukuan'){
      if(_this.data.userInfo.power == '客户'){
        wx.showToast({
          title: '客户不允许编辑此处！',
          icon: 'none'
        })
        return;
      }
    }
    if((column == 'customer_need_text' || column == 'customer_need_img1' || column == 'customer_need_text1' || column == 'customer_need_text2' || column == 'songhuo_address' || column == 'anzhuang_address' || column == 'phone' || column == 'customer_order' || column == 'songhuo_danhao' || column == 'customer_need_img1' || column == 'customer_need_img1' || column == 'customer_need_img1' || column == 'customer_need_img1') && _this.data.list[0].peihuo_img1 != ''){
      if(_this.data.userInfo.power != '管理员'){
        wx.showToast({
          title: '工作进行到配货时不允许编辑此处！',
          icon: 'none'
        })
        return;
      }
    }
    console.log(index)
    console.log(column)
    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      this_index:e.currentTarget.dataset.index,
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    var this_value = _this.data.this_value
    var list = _this.data.list
    list[index][this_column] = this_value
    var userInfo = _this.data.userInfo
    list[index][this_column + '_renyuan'] = userInfo.name
    list[index][this_column + '_riqi'] = getNowDate1()
    // if(this_column == 'customer_name' && this_value != '' && list[index]['wancheng'] == ''){
    //   list[index]['wancheng'] = "配货作业中"
    //   list[index]['wancheng_renyuan'] = userInfo.name
    //   list[index]['wancheng_riqi'] = getNowDate()
    // }
    console.log(list[index * 1])
    _this.setData({
      list:list,
      xgShow:false,
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      xgShow2: false,
      cxShow: false,
    })
  },

  selRIQI2: function () {
    var _this = this
    _this.setData({
      rqxzShow2: true,
    })
  },

  onInput22: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '年'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())+ '日'

    var riqi = Y + M + D
    var header_list = _this.data.header_list
    header_list.insert_date = riqi
    _this.setData({
      header_list
    });
    _this.qxShow22()
  },

  chean_list: function() {
    var _this = this
    _this.setData({
      list:[
        {
          order_number: '',
          insert_date: '',
          customer_name: '',
          customer_name_renyuan: '',
          customer_name_riqi: '',
          customer_need_text: '',
          customer_need_text_renyuan: '',
          customer_need_text_riqi: '',
          customer_need_img1: '',
          customer_need_img1_renyuan: '',
          customer_need_img1_riqi: '',
          customer_need_text1: '',
          customer_need_text1_renyuan: '',
          customer_need_text1_riqi: '',
          customer_need_text2: '',
          customer_need_text2_renyuan: '',
          customer_need_text2_riqi: '',
          songhuo_address: '',
          songhuo_address_renyuan: '',
          songhuo_address_riqi: '',
          anzhuang_address: '',
          anzhuang_address_renyuan: '',
          anzhuang_address_riqi: '',
          phone: '',
          phone_renyuan: '',
          phone_riqi: '',
          customer_order: '',
          customer_order_renyuan: '',
          customer_order_riqi: '',
          songhuo_danhao: '',
          songhuo_danhao_renyuan: '',
          songhuo_danhao_riqi: '',
          peihuo_img1: '',
          peihuo_img1_renyuan: '',
          peihuo_img1_riqi: '',
          peihuo_img2: '',
          peihuo_img2_renyuan: '',
          peihuo_img2_riqi: '',
          peihuo_img3: '',
          peihuo_img3_renyuan: '',
          peihuo_img3_riqi: '',
          peihuo_img4: '',
          peihuo_img4_renyuan: '',
          peihuo_img4_riqi: '',
          peihuo_img5: '',
          peihuo_img5_renyuan: '',
          peihuo_img5_riqi: '',
          peisong_img1: '',
          peisong_img1_renyuan: '',
          peisong_img1_riqi: '',
          peisong_img2: '',
          peisong_img2_renyuan: '',
          peisong_img2_riqi: '',
          peisong_img3: '',
          peisong_img3_renyuan: '',
          peisong_img3_riqi: '',
          money: '',
          money_renyuan: '',
          money_riqi: '',
          shoukuan: '',
          shoukuan_renyuan: '',
          shoukuan_riqi: '',
          wancheng: '',
          wancheng_renyuan: '',
          wancheng_riqi: '',
          beizhu: '',
          beizhu_renyuan: '',
          beizhu_riqi: '',
          kucun_text: '',
          kucun_text_renyuan: '',
          kucun_text_riqi: '',
          kucun_img1: '',
          kucun_img1_renyuan: '',
          kucun_img1_riqi: '',
          kucun_img2: '',
          kucun_img2_renyuan: '',
          kucun_img2_riqi: '',
          kucun_img3: '',
          kucun_img3_renyuan: '',
          kucun_img3_riqi: '',
        }
      ],
    })
    var bianhao_left = getBianHao()
    var list = _this.data.list
    if(_this.data.userInfo.power == '客户'){
      list[0].customer_name = userInfo.company
      list[0].customer_name_renyuan = userInfo.name
      list[0].customer_name_riqi = getNowDate1()
      _this.setData({
        list
      })
    }
    var sql = "select order_number from erqi_peisongdan where order_number like '" + bianhao_left + "%'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var bianhao_list = res.result.recordset
        var new_bianhao = "001" 
        for(var i=0; i<bianhao_list.length; i++){
          if(bianhao_list[i].order_number != '' && bianhao_list[i].order_number != null && bianhao_list[i].order_number != undefined){
            var this_bianhao = bianhao_list[i].order_number.slice(10)
            console.log(this_bianhao)
            if(this_bianhao >= new_bianhao){
              new_bianhao = (this_bianhao * 1 + 1).toString()
              if(new_bianhao.length == 1){
                new_bianhao = "00" + new_bianhao.toString()
              }else if(new_bianhao.length == 2){
                new_bianhao = "0" + new_bianhao.toString()
              }
              console.log(new_bianhao)
            }
          }
        }
        new_bianhao = bianhao_left.toString() + new_bianhao.toString()
        var list = _this.data.list
        list[0].order_number = new_bianhao
        list[0].insert_date = getNowDate()
        console.log(list)
        _this.setData({
          list,
          baocun:'保存'
        })
      },
      err: res => {
        wx.showToast({
          title: '读取下拉列表错误！',
          icon: 'none'
        })
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

  qxShow22: function () {
    var _this = this
    _this.setData({
      rqxzShow2: false,
    })
  },

  onInputDate(event) {
    var _this = this
    _this.setData({
      currentDate: event.detail,
    });
  },

  async upd_pic1(){
    if(this.list[0].customer_need_img1.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].customer_need_img1.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-01.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-01.jpg',
        path: '/huaqun_erqi/',
        kongjian: this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  // async upd_pic2(){
  //   if(this.list[0].customer_need_img2.indexOf("base64") != -1){
  //     var fsm = wx.getFileSystemManager();
  //     var buffer = wx.base64ToArrayBuffer(this.list[0].customer_need_img2.split(',')[1]);
  //     const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-02.jpg';
  //     fsm.writeFileSync(fileName, buffer, 'binary');
  //     console.log(fileName);
  //      wx.uploadFile({
  //       url: 'http://yhocn.cn:9087/file/upload',
  //       header: { "Content-Type": "multipart/form-data" },
  //       filePath: fileName,
  //       name: 'file',
  //       formData:{
  //       name: this.list[0].order_number +'-02.jpg',
  //       path: '/huaqun_erqi/',
  //       kongjian: _this.data.kongjian,
  //       },
  //       success(res){
  //         console.log(res.data);
  //         if(res.data.indexOf("存储空间不足") != -1){
  //           wx.showToast({
  //             title: '存储空间不足！',
  //             icon: 'none'
  //           })
  //         }
  //       }
  //     })
  //   }
  // },

  // async upd_pic3(){
  //   if(this.list[0].customer_need_img3.indexOf("base64") != -1){
  //     var fsm = wx.getFileSystemManager();
  //     var buffer = wx.base64ToArrayBuffer(this.list[0].customer_need_img3.split(',')[1]);
  //     const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-03.jpg';
  //     fsm.writeFileSync(fileName, buffer, 'binary');
  //     console.log(fileName);
  //      wx.uploadFile({
  //       url: 'http://yhocn.cn:9087/file/upload',
  //       header: { "Content-Type": "multipart/form-data" },
  //       filePath: fileName,
  //       name: 'file',
  //       formData:{
  //       name: this.list[0].order_number +'-03.jpg',
  //       path: '/huaqun_erqi/',
  //       kongjian: _this.data.kongjian,
  //       },
  //       success(res){
  //         console.log(res.data);
  //         if(res.data.indexOf("存储空间不足") != -1){
  //           wx.showToast({
  //             title: '存储空间不足！',
  //             icon: 'none'
  //           })
  //         }
  //       }
  //     })
  //   }
  // },

  async upd_pic4(){
    if(this.list[0].peihuo_img1.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].peihuo_img1.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-04.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-04.jpg',
        path: '/huaqun_erqi/',
        kongjian: _this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  async upd_pic5(){
    if(this.list[0].peihuo_img2.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].peihuo_img2.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-05.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-05.jpg',
        path: '/huaqun_erqi/',
        kongjian: _this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  async upd_pic6(){
    if(this.list[0].peihuo_img3.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].peihuo_img3.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-06.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-06.jpg',
        path: '/huaqun_erqi/',
        kongjian: _this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  async upd_pic7(){
    if(this.list[0].peihuo_img4.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].peihuo_img4.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-07.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-07.jpg',
        path: '/huaqun_erqi/',
        kongjian: _this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  async upd_pic8(){
    if(this.list[0].peihuo_img5.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].peihuo_img5.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-08.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-08.jpg',
        path: '/huaqun_erqi/',
        kongjian: _this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  async upd_pic9(){
    if(this.list[0].peisong_img1.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].peisong_img1.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-09.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-09.jpg',
        path: '/huaqun_erqi/',
        kongjian: _this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  async upd_pic10(){
    if(this.list[0].peisong_img2.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].peisong_img2.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-10.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-10.jpg',
        path: '/huaqun_erqi/',
        kongjian: _this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  async upd_pic11(){
    if(this.list[0].peisong_img3.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].peisong_img3.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-11.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-11.jpg',
        path: '/huaqun_erqi/',
        kongjian: _this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  async upd_pic12(){
    if(this.list[0].kucun_img1.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].kucun_img1.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-12.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-12.jpg',
        path: '/huaqun_erqi/',
        kongjian: _this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  async upd_pic13(){
    if(this.list[0].kucun_img2.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].kucun_img2.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-13.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-13.jpg',
        path: '/huaqun_erqi/',
        kongjian: _this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  async upd_pic14(){
    if(this.list[0].kucun_img3.indexOf("base64") != -1){
      var fsm = wx.getFileSystemManager();
      var buffer = wx.base64ToArrayBuffer(this.list[0].kucun_img3.split(',')[1]);
      const fileName = wx.env.USER_DATA_PATH + '/'+ this.list[0].order_number +'-14.jpg';
      fsm.writeFileSync(fileName, buffer, 'binary');
      console.log(fileName);
       wx.uploadFile({
        url: 'http://yhocn.cn:9087/file/upload',
        header: { "Content-Type": "multipart/form-data" },
        filePath: fileName,
        name: 'file',
        formData:{
        name: this.list[0].order_number +'-14.jpg',
        path: '/huaqun_erqi/',
        kongjian: _this.data.kongjian,
        },
        success(res){
          console.log(res.data);
          if(res.data.indexOf("存储空间不足") != -1){
            wx.showToast({
              title: '存储空间不足！',
              icon: 'none'
            })
          }
        }
      })
    }
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

function getBianHao() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = "PS"+ year.toString() + month.toString() + day.toString() ;
  return currentdate;
 }
 function getNowDate1() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var sign3 = "年";
  var sign4 = "月";
  var sign5 = "日";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + sign3 + month + sign4 + day + sign5 + " " + hour + sign2 + minutes + sign2 + seconds ;
  // var currentdate = year + sign1 + month + sign1 + day ;
  console.log(currentdate)
  return currentdate;
 }
 
 function getNowDate() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }

 function getNowTime() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + month + day + hour + minutes + seconds
  return currentdate;
 }

 