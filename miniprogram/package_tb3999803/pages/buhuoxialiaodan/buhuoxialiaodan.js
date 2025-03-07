// package_tb3999803/pages/buhuoxialiaodan/buhuoxialiaodan.js
Page({

  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  intoShow: false,
  xlShow: false,
  xlShow2: false,
  /**
   * 页面的初始数据
   */
  data: {
    bh: null,
    kh: null,
    zd: null,
    sc: null,
    dh: null,
    xm_type: ['工厂补板', '工厂配货', '工厂修改', '市场采购', '现场整改', '缺料', '破损'],
    dl_type: ['缺柜板', '缺门板', '缺条子', '灯带板', '异形板', '手工件', '弧形板', '五金配件', '其他'],
    jd_type: ['已审', '已补', '入库', '出库'],
    header_list: {
      dh: '',
      khmc: '',
      zdyh: '',
      // shengchanbianhao:'',
      xmjy: '',
      dmdd: '',
      tz: '',
    },
    isdisabled: true,
    khmcisdisabled: true,
    zdyhisdisabled: true,
    dhdisabled: true,
    list: [],
    title: [{
      text: "序号",
      width: "70rpx",
      width2: "calc(70vmin / 7.5)",
      columnName: "rownum",
      type: "text",
      isupd: true
    }, {
      text: "项目",
      width: "120rpx",
      width2: "calc(120vmin / 7.5)",
      columnName: "xm",
      type: "text",
      isupd: true
    }, {
      text: "大类",
      width: "180rpx",
      width2: "calc(180vmin / 7.5)",
      columnName: "dl",
      type: "text",
      isupd: true
    }, {
      text: "名称+材料+备注",
      width: "550rpx",
      width2: "calc(550vmin / 7.5)",
      columnName: "mccl",
      type: "text",
      isupd: true
    }, {
      text: "生产编号",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "scbh",
      type: "text",
      isupd: true
    }, {
      text: "进度",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "jd",
      type: "text",
      isupd: true
    }, {
      text: "发起日期",
      width: "275rpx",
      width2: "calc(275vmin / 7.5)",
      columnName: "fqrq",
      type: "text",
      isupd: true
    }, {
      text: "id",
      width: "0rpx",
      width2: "calc(0vmin / 7.5)",
      columnName: "id",
      type: "text",
      isupd: true
    }],
    dh: '',
    xmjy: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo: userInfo,
      dh: options.dh,
      bh: options.dh,
      kh: options.khmc,
      zd: options.zdyh,
      sc: options.scbh,
    })
    // var userInfo = _this.data.userInfo
    console.log(options.ddh + "    81")
    console.log(options.dh + "    82")
    console.log(options.khmc + "    83")
    console.log(options.zdyh + "    84")
    console.log(options.scbh + "    85")
    console.log(options.id + "    86")
    console.log(options.tz)
   
    if (options.tz == "dmdd") {
      console.log(options.dh)
      if (options.dh.length != 9) {
        wx.showModal({
          title: "提示",
          content: '请将本订单下单日期号改为系统订单号',
          cancelColor: '#282B33',
          confirmColor: '#BC4A4A',
        })
      }
      _this.dmddgetBaoGong()
    } else if (options.tz == "bhmx") {
      if (options.dh.length != 9) {
        wx.showModal({
          title: "提示",
          content: '请将本订单下单日期号改为系统订单号',
          cancelColor: '#282B33',
          confirmColor: '#BC4A4A',
        })
      }
      _this.buhuomingxigetBaoGong()
    } else if (options.tz == "smbg") {
      console.log("扫码报工")
      console.log(options.dh)
      if (options.productionNo.length != 9) {
        wx.showModal({
          title: "提示",
          content: '请将本订单下单日期号改为系统订单号',
          cancelColor: '#282B33',
          confirmColor: '#BC4A4A',
        })
      }
    }

    var header_list = _this.data.header_list
    // header_list.dh = options.ddh
    // ------------------20240822 xt
    if (options.ddh != undefined) {
      console.log(options.ddh + "    87")
      header_list.dh = options.ddh
    }
    if (options.dh != undefined) {
      console.log(options.dh + "   90")
      header_list.dh = options.dh
    }
    if (options.productionNo != undefined) {
      console.log(options.productionNo + "   91")
      header_list.dh = options.productionNo
    }
    header_list.xmjy = options.xmjy
    // ------------------------------
    header_list.khmc = options.khmc
    header_list.zdyh = options.zdyh
    // ------------------20240822 xt
    header_list.dmdd = options.dmdd
    if (userInfo.quanxian == "客户") {
      _this.setData({
        xm_type: ['补板', '配件', '返厂', '外购', '整改'],
      })
    }
    console.log(options.mccl)
    if (options.mccl != undefined) {
      header_list.mccl = options.mccl
      console.log(12345)
    } else {
      header_list.mccl = " "
      console.log(54321)
    }

    if (header_list.dmdd == undefined && header_list.xmjy == undefined) {
      _this.setData({
        isdisabled: false,
        dhdisabled: false,
        zdyhisdisabled: false,
        khmcisdisabled: false
      })
    }
    if (userInfo.quanxian == '客户') {
      header_list.khmc = userInfo.name
      _this.setData({
        isdisabled: false,
        zdyhisdisabled: false,
        dhdisabled: true,
        khmcisdisabled: true
      })
    }
    _this.setData({
      header_list,
    })
    if (header_list.dh != '' && options.tz == "smbg") {
      _this.getBaoGong()
    }
  },

  getBaoGong: function () {
    var _this = this
    var sql1 = ""
    // var now = new Date();

    // // 获取年、月、日、时、分、秒
    // var year = now.getFullYear(); // 年份
    // var month = now.getMonth() + 1; // 月份（注意：月份是从0开始的，所以需要加1）
    // var day = now.getDate(); // 日期
    // var hour = now.getHours(); // 小时
    // var minute = now.getMinutes(); // 分钟
    // var second = now.getSeconds(); // 秒钟
    // var tzrq = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    console.log(this.data.dh)
    console.log(this.data.bh)
    if (this.data.bh != '') {
      // sql1 = "select dh,khmc,zdyh,shengchanbianhao,xm,dl,mcsl as mccl,mccl,jd,fqrq,id from baogongmingxi where dh = '" + this.data.bh + "' and mccl <> '' order by fqrq"
      sql1 = "select dh,khmc,zdyh,isnull(scbh,'') as scbh,isnull(xm,'') as xm,isnull(dl,'') as dl,isnull(mccl,'') as mccl,isnull(jd,'') as jd,isnull(fqrq,'') as fqrq,id from baogongmingxi where dh = '" + this.data.bh + "' and (xm='破损' or xm='缺料') order by fqrq"
      console.log(sql1)
      wx.cloud.callFunction({
        name: 'sqlServer_tb3999803',
        data: {
          query: sql1
        },
        success: res => {
          console.log(res)
          var list = res.result.recordset
          console.log(list)
          if (list.length > 0) {
            var header_list = _this.data.header_list
            header_list.dh = list[0].dh
            header_list.khmc = list[0].khmc
            header_list.zdyh = list[0].zdyh
            header_list.scbh = list[0].scbh
            var list_old = JSON.stringify(list)
            list_old = JSON.parse(list_old)
            _this.setData({
              header_list,
              list,
              list_old,
            })
          }
          _this.setData({
            list: list,
            header_list: header_list,
          })
          console.log(list)
          // console.log(list.length)
          // console.log(tzrq)
          // for(var i=0; i<list.length; i++){
          //   console.log("发起日期1")
          //   if (_this.data.list[i].fqrq == "") {
          //     console.log("发起日期2")
          //     _this.data.fqrq = tzrq
          //   }
          // }
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
        },
      })
    }
  },

  buhuomingxigetBaoGong: function () {
    console.log("补货明细跳转")
    var _this = this
    var sql1 = ""
    console.log(this.data.dh)
    console.log(this.data.bh)
    if (this.data.bh != '') {
      sql1 = "select dh,khmc,zdyh,isnull(scbh,'') as scbh,isnull(xm,'') as xm,isnull(dl,'') as dl,isnull(mccl,'') as mccl,isnull(jd,'') as jd,isnull(fqrq,'') as fqrq,id from baogongmingxi where dh = '" + this.data.bh + "' and xm != '' order by fqrq"
      console.log(sql1)
      wx.cloud.callFunction({
        name: 'sqlServer_tb3999803',
        data: {
          query: sql1
        },
        success: res => {
          console.log(res)
          var list = res.result.recordset
          console.log(list)
          if (list.length > 0) {
            var header_list = _this.data.header_list
            header_list.dh = list[0].dh
            header_list.khmc = list[0].khmc
            header_list.zdyh = list[0].zdyh
            header_list.scbh = list[0].scbh
            var list_old = JSON.stringify(list)
            list_old = JSON.parse(list_old)
            _this.setData({
              header_list,
              list,
              list_old,
            })
          }
          _this.setData({
            list: list,
            header_list: header_list,
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
        },
      })
    }
  },

  dmddgetBaoGong: function () {
    console.log("补货明细跳转")
    var _this = this
    var sql1 = ""
    console.log(this.data.dh)
    console.log(this.data.bh)
    if (this.data.bh != '') {
      sql1 = "select dh,khmc,zdyh,isnull(scbh,'') as scbh,isnull(xm,'') as xm,isnull(dl,'') as dl,isnull(mccl,'') as mccl,isnull(jd,'') as jd,isnull(fqrq,'') as fqrq,id from baogongmingxi where dh = '" + this.data.bh + "' order by fqrq"
      console.log(sql1)
      wx.cloud.callFunction({
        name: 'sqlServer_tb3999803',
        data: {
          query: sql1
        },
        success: res => {
          console.log(res)
          var list = res.result.recordset
          console.log(list)
          if (list.length > 0) {
            var header_list = _this.data.header_list
            header_list.dh = list[0].dh
            header_list.khmc = list[0].khmc
            header_list.zdyh = list[0].zdyh
            header_list.scbh = list[0].scbh
            var list_old = JSON.stringify(list)
            list_old = JSON.parse(list_old)
            _this.setData({
              header_list,
              list,
              list_old,
            })
          }
          _this.setData({
            list: list,
            header_list: header_list,
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
        },
      })
    }
  },

  add_row: function () {
    var _this = this
    var list = _this.data.list

    var header_list = _this.data.header_list
    // 获取当前日期
    const currentDate = new Date();
    // 格式化日期为 "yyyy-MM-dd" 格式
    const formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
    // 将格式化后的日期设置为 input 元素的值
    // if (header_list.xmjy == "1") {
      console.log(111)
      list.push({
        xm: "缺料",
        dl: "",
        mcsl: "",
        jd: "",
        fqrq: formattedDate,
      })
      list.xm
    // } else {
    //   console.log(222)
    //   list.push({
    //     xm: "",
    //     dl: "",
    //     mcsl: "",
    //     jd: "",
    //     fqrq: formattedDate,

    //   })
    // }
    _this.setData({
      list
    })
  },
  clickView1: function (e) {
    var _this = this
    var this_column = e.currentTarget.dataset.column
    var index = e.currentTarget.dataset.index
    var this_value = e.currentTarget.dataset.value

    console.log(index)
    console.log(this_column)
    if (this_column == 'xm') {
      // if (header_list.xmjy == "1") {
      //   console.log("11")
      //   _this.setData({

      //   })
      // } else {

        _this.setData({
          this_column: e.currentTarget.dataset.column,
          this_value: e.currentTarget.dataset.value,
          this_index: e.currentTarget.dataset.index,
          xgShow1: true,

        })
      // }
    } else if (this_column == 'dl') {
      _this.setData({
        this_column: e.currentTarget.dataset.column,
        this_value: e.currentTarget.dataset.value,
        this_index: e.currentTarget.dataset.index,
        xgShow2: true,
      })

    } else if (this_column == 'jd') {
      _this.setData({
        this_column: e.currentTarget.dataset.column,
        this_value: e.currentTarget.dataset.value,
        this_index: e.currentTarget.dataset.index,
        xgShow3: true,

      })
    } else if (this_column == 'fqrq') {
      _this.setData({
        this_column: e.currentTarget.dataset.column,
        this_value: e.currentTarget.dataset.value,
        this_index: e.currentTarget.dataset.index,
        xgShow3: false,

      })
    } else if (this_column == 'scbh') {
      _this.setData({
        this_column: e.currentTarget.dataset.column,
        this_value: e.currentTarget.dataset.value,
        this_index: e.currentTarget.dataset.index,
        xgShow4: true,

      })
    } else {
      _this.setData({
        this_column: e.currentTarget.dataset.column,
        this_value: e.currentTarget.dataset.value,
        this_index: e.currentTarget.dataset.index,
        xgShow: true,

      })
    }

    // var this_row = e.currentTarget.dataset.index
    // console.log(this_row)
    // _this.setData({
    //   this_column:e.currentTarget.dataset.column,
    //   this_value:e.currentTarget.dataset.value,
    //   this_index:e.currentTarget.dataset.index,
    //   // xgShow:true,
    // })

  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  onInput_header: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    var header_list = _this.data.header_list
    header_list[column] = e.detail.value
    _this.setData({
      header_list
    })
  },

  bindPickerChange1: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.xm_type[e.detail.value]
    })
  },

  bindPickerChange2: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.dl_type[e.detail.value]
    })
  },

  bindPickerChange3: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: _this.data.jd_type[e.detail.value]
    })
  },
  upd: function () {
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    // var list = _this.data.list.xm
    var list = _this.data.list
    // console.log(_this.data.xm.value)
    list[index][this_column] = this.data.mcsl
    // console.log(list[index * 1])
    console.log(list)
    _this.setData({
      list: list,
      xgShow: false,
    })
  },
  upd1: function () {
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    var this_value = _this.data.xm.value
    // var list = _this.data.list.xm
    var list = _this.data.list
    // console.log(_this.data.xm.value)
    list[index][this_column] = this.data.xm
    // console.log(list[index * 1])
    console.log(list)
    _this.setData({
      list: list,
      xgShow1: false,
    })
  },
  upd2: function () {
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    // var list = _this.data.list.xm
    var list = _this.data.list
    // console.log(_this.data.xm.value)
    list[index][this_column] = this.data.dl
    // console.log(list[index * 1])
    console.log(list)
    _this.setData({
      list: list,
      xgShow2: false,
    })
  },
  upd3: function () {
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    // var list = _this.data.list.xm
    var list = _this.data.list
    // console.log(_this.data.xm.value)
    list[index][this_column] = this.data.jd
    // console.log(list[index * 1])
    console.log(list)
    _this.setData({
      list: list,
      xgShow3: false,
    })
  },
  upd4: function () {
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    // var list = _this.data.list.xm
    var list = _this.data.list
    // console.log(_this.data.xm.value)
    list[index][this_column] = this.data.scbh
    // console.log(list[index * 1])
    console.log(list)
    _this.setData({
      list: list,
      xgShow4: false,
    })
  },
  add1: function () {
    var _this = this
    var header_list = _this.data.header_list
    var dh = this.data.bh
    var khmc = this.data.kh
    var zdyh = this.data.zd
    var scbh = this.data.sc
    var now = new Date();

    // 获取年、月、日、时、分、秒
    var year = now.getFullYear(); // 年份
    var month = now.getMonth() + 1; // 月份（注意：月份是从0开始的，所以需要加1）
    var day = now.getDate(); // 日期
    var hour = now.getHours(); // 小时
    var minute = now.getMinutes(); // 分钟
    var second = now.getSeconds(); // 秒钟
    var riqipx = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    // console.log(header_list.dmdd)
    // if (header_list.dmdd == 1) {
      // var sql = "delete from baogongmingxi where dh='" + dh + "' and khmc='" + khmc + "' and zdyh = '" + zdyh + "'"
    // }

    // console.log(sql)
    // wx.cloud.callFunction({
    //   name: 'sqlServer_tb3999803',
    //   data: {
    //     query: sql
    //   },
    //   success: res => {
    //     // _this.qxShow()
    //     wx.showToast({
    //       icon: 'none'
    //     })
    //   },
    //   err: res => {
    //     console.log("错误!")
    //   },
    //   fail: res => {
    //     wx.showToast({
    //       title: '请求失败！',
    //       icon: 'none'
    //     })
    //     console.log("请求失败！")
    //   }
    // })
    // var id=_this.data.id
    var bj = ''
    console.log(_this.data.list)
    var sql1 = "insert into baogongmingxi(dh,khmc,zdyh,scbh,xm,dl,mccl,jd,fqrq,jlbh,riqipx) values"
    var sql2 = ""
    var sql4 = ""
    // for (var i = 0; i < _this.data.list.length; i++) {
    //   bj = _this.data.list[i].id
    //   console.log(bj)
    //   if (bj == '') {
    //     if (sql2 == "") {
    //       sql2 = "('" + _this.data.header_list.dh + "','" + _this.data.header_list.khmc + "','" + _this.data.header_list.zdyh + "','" + _this.data.header_list.shengchanbianhao + "','" + _this.data.list[i].xm + "','" + _this.data.list[i].dl + "','" + _this.data.list[i].mccl + "','" + _this.data.list[i].jd + "','" + _this.data.list[i].fqrq + "','1','" + riqipx + "')"
    //     }
    //     // else{
    //     //   sql2 = sql2 + ",('" + _this.data.header_list.dh + "','"+ _this.data.header_list.khmc +"','" + _this.data.header_list.zdyh +"','" + _this.data.header_list.shengchanbianhao +"','"+  _this.data.list[i].xm +"','"+  _this.data.list[i].dl +"','"+  _this.data.list[i].mccl +"','"+  _this.data.list[i].jd +"','"+  _this.data.list[i].fqrq +"','1','"+riqipx+"')"
    //     // }
    //   } else {
    //     sql2 = "('" + _this.data.header_list.dh + "','" + _this.data.header_list.khmc + "','" + _this.data.header_list.zdyh + "','" + _this.data.header_list.shengchanbianhao + "','" + _this.data.list[i].xm + "','" + _this.data.list[i].dl + "','" + _this.data.list[i].mccl + "','" + _this.data.list[i].jd + "','" + _this.data.list[i].fqrq + "','1','" + riqipx + "')"
    //   }
    // }
    // console.log(_this.data.header_list.shengchanbianhao)
    for(var i=0; i< _this.data.list.length; i++){
      if (_this.data.list[i].fqrq == "") {
        _this.data.list[i].fqrq = now()
      }
      if (this.data.bh == "") {
        if(_this.data.list[i].id == "" || _this.data.list[i].id == undefined){
          console.log("有新数据")
          if(sql2 == ""){
            sql2 = "('" + this.data.bh + "','"+ this.data.kh +"','" + this.data.zd +"','" + _this.data.list[i].scbh +"','"+  _this.data.list[i].xm +"','"+  _this.data.list[i].dl +"','"+  _this.data.list[i].mccl +"','"+  _this.data.list[i].jd +"','"+  _this.data.list[i].fqrq +"','1','"+riqipx+"')"
          }else{
          sql2 = sql2 + ",('" + this.data.bh + "','"+ this.data.kh +"','" + this.data.zd +"','" + _this.data.list[i].scbh +"','"+  _this.data.list[i].xm +"','"+  _this.data.list[i].dl +"','"+  _this.data.list[i].mccl +"','"+  _this.data.list[i].jd +"','"+  _this.data.list[i].fqrq +"','1','"+riqipx+"')"
          }
        } else {
          sql4 = "update baogongmingxi set dh='" + this.data.bh + "',khmc='" + this.data.kh + "',zdyh='" + this.data.zd + "',scbh='" + _this.data.list[i].scbh + "',xm='" + _this.data.list[i].xm + "',dl='" + _this.data.list[i].dl + "',mccl='" + _this.data.list[i].mccl + "',jd='" + _this.data.list[i].jd + "',fqrq='" + _this.data.list[i].fqrq + "',jlbh='1',riqipx='" + _this.data.list[i].riqipx + "' where id=" + _this.data.list[i].id
        }
      } else {
        if(_this.data.list[i].id == "" || _this.data.list[i].id == undefined){
          console.log("有新数据")
          if(sql2 == ""){
            sql2 = "('" + _this.data.header_list.dh + "','"+ _this.data.header_list.khmc +"','" + _this.data.header_list.zdyh +"','" + _this.data.list[i].scbh +"','"+  _this.data.list[i].xm +"','"+  _this.data.list[i].dl +"','"+  _this.data.list[i].mccl +"','"+  _this.data.list[i].jd +"','"+  _this.data.list[i].fqrq +"','1','"+riqipx+"')"
          }else{
          sql2 = sql2 + ",('" + _this.data.header_list.dh + "','"+ _this.data.header_list.khmc +"','" + _this.data.header_list.zdyh +"','" + _this.data.list[i].scbh +"','"+  _this.data.list[i].xm +"','"+  _this.data.list[i].dl +"','"+  _this.data.list[i].mccl +"','"+  _this.data.list[i].jd +"','"+  _this.data.list[i].fqrq +"','1','"+riqipx+"')"
          }
        } else {
          sql4 = "update baogongmingxi set dh='" + _this.data.header_list.dh + "',khmc='" + _this.data.header_list.khmc + "',zdyh='" + _this.data.header_list.zdyh + "',scbh='" + _this.data.list[i].scbh + "',xm='" + _this.data.list[i].xm + "',dl='" + _this.data.list[i].dl + "',mccl='" + _this.data.list[i].mccl + "',jd='" + _this.data.list[i].jd + "',fqrq='" + _this.data.list[i].fqrq + "',jlbh='1',riqipx='" + _this.data.list[i].riqipx + "' where id=" + _this.data.list[i].id
        }
      }
      
      wx.cloud.callFunction({
        name: 'sqlServer_tb3999803',
        data: {
          query: sql4
        },
        success: res => {
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
    var sql3 = sql1 + sql2
    console.log(sql3)
    console.log(sql4)
    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql3
      },
      success: res => {
        // _this.qxShow()
        wx.showToast({
          title: '添加成功！',
          icon: 'none'
        })
        // if(header_list.clmc==undefined){
        //   header_list.clmc=""
        // }
        //   header_list.clmc=res.clmc,
        //   console.log( header_list.clmc)
        //   _this.setData({
        //     header_list: header_list,
        //   })
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

  qxShow: function () {
    var _this = this
    _this.setData({
      xgShow: false,
      xgShow1: false,
      xgShow2: false,
      xgShow3: false,
      xgShow4: false,
    })
  },


  tableShow: function (e) {
    var _this = this
    var sql = ""
    var userInfo = _this.data.userInfo
    var header_list = _this.data.header_list
    var dh = header_list.dh
    var khmc = header_list.khmc
    var zdyh = header_list.zdyh

    sql = "select xm,dl,mccl,jd,fqrq,mccl,isnull(scbh,'') as scbh,id from baogongmingxi where dh = '" + dh + "' and khmc = '" + khmc + "' and zdyh = '" + zdyh + "' and (xm='破损' or xm='缺料') order by fqrq"

    console.log(sql)

    wx.cloud.callFunction({
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset
        console.log(list)
        if (list == "") {
          console.log(66)
        } else {
          header_list.mccl = list[0].mccl
        }
        console.log(header_list.mccl)
        _this.setData({
          list: list,
          header_list: header_list,
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
      },
    })
  },

  tableShow1: function (e) {
    var _this = this
    var sql1 = ""
    // var now = new Date();

    // // 获取年、月、日、时、分、秒
    // var year = now.getFullYear(); // 年份
    // var month = now.getMonth() + 1; // 月份（注意：月份是从0开始的，所以需要加1）
    // var day = now.getDate(); // 日期
    // var hour = now.getHours(); // 小时
    // var minute = now.getMinutes(); // 分钟
    // var second = now.getSeconds(); // 秒钟
    // var tzrq = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    console.log(this.data.bh)
    console.log(this.data.dh)
    if (this.data.bh != '') {
      // sql1 = "select dh,khmc,zdyh,shengchanbianhao,xm,dl,mccl,jd,fqrq,id from baogongmingxi where dh = '" + this.data.bh + "' and mccl <> '' order by fqrq"
      sql1 = "select dh,khmc,zdyh,isnull(scbh,'') as scbh,isnull(xm,'') as xm,isnull(dl,'') as dl,isnull(mccl,'') as mccl,isnull(jd,'') as jd,isnull(fqrq,'') as fqrq,id from baogongmingxi where dh = '" + this.data.bh + "' and (xm='补货' or xm='缺料') order by fqrq"
      console.log(sql1)
      wx.cloud.callFunction({
        name: 'sqlServer_tb3999803',
        data: {
          query: sql1
        },
        success: res => {
          console.log(res)
          var list = res.result.recordset
          console.log(list)
          if (list.length > 0) {
            var header_list = _this.data.header_list
            header_list.dh = list[0].dh
            header_list.khmc = list[0].khmc
            header_list.zdyh = list[0].zdyh
            header_list.scbh = list[0].scbh
            var list_old = JSON.stringify(list)
            list_old = JSON.parse(list_old)
            _this.setData({
              header_list,
              list: list,
              list_old,
            })
          }
          _this.setData({
            list: list,
            header_list: header_list,
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
        },
      })
    }
    // for(var i=0; i< _this.data.list.length; i++){
    //   if (_this.data.list[i].fqrq == "") {
    //     _this.data.list[i].fqrq=tzrq
    //   }
    // }
  },

  sel1: function () {
    var _this = this
    var header_list = _this.data.header_list
    // var e = [_this.data.mccl]
    var e = this.data.bh
    _this.tableShow1(e)
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