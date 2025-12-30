// pages/jxc_kucunpandian/jxc_kucunpandian.js
// pages/Tosell/Tosell.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden1: true,
    product_name:'',
    pankuData: {},
    stop_date: '',     
  wareHouse: '',     
  product_number: '',
  warehouseOptions: ['']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    var that = this
    var sql = `
      select 'product' as type, cpname as value from yh_jinxiaocun_mingxi where gs_name = '${app.globalData.gongsi}' group by cpname
      union all
      select 'warehouse' as type, cangku as value from yh_jinxiaocun_mingxi where gs_name = '${app.globalData.gongsi}' group by cangku
    `
    console.log(sql)
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: { 
        sql: sql
      },
      success(res) {
        var product_list = ['']
        var warehouseOptions = ['']
        
        for(var i = 0; i < res.result.length; i++){
          if(res.result[i].type === 'product') {
            product_list.push(res.result[i].value)
          } else if(res.result[i].type === 'warehouse') {
            warehouseOptions.push(res.result[i].value)
          }
        }
        
        that.setData({
          product_list: product_list,
          warehouseOptions: warehouseOptions
        })
      },
      fail(res) {
        console.log("失败", res)
      }
    });
  },



  bindPickerChange: function(e){
    var _this = this
    console.log(_this.data.product_list[e.detail.value])
    _this.setData({
      product_name: _this.data.product_list[e.detail.value]
    })
    // _this.sel1()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    that.sel1()
  },
  choiceDate: function (e) {
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  choicewareHouse: function(e) {
    const selectedIndex = e.detail.value;
    const wareHouse = this.data.warehouseOptions[selectedIndex];
    
    this.setData({
      selectedIndex: selectedIndex,
      wareHouse: wareHouse
    })
    console.log(wareHouse)
  },

  sel1: function() {
    var _this = this
    var that = this
    const db = wx.cloud.database()
    var app = getApp();
    wx.showToast({
      title: '正在搜索',
      icon: 'loading',
      duration: 1000
    })
    var gongsi = app.globalData.gongsi
    var product_name = _this.data.product_name
    var stop_date = _this.data.stop_date; // 确保这些变量有值
    var wareHouse = _this.data.wareHouse;
    var product_number = _this.data.product_number;
    console.log("商品代码", product_number)
    // var sql = "select mx.sp_dm,mx.cpname,mx.cplb,ifnull(rk.cpsl,0) as ruku_num,ifnull(rk.cp_price,0) as ruku_price,ifnull(ck.cpsl,0) as chuku_num,ifnull(ck.cp_price,0) as chuku_price from (select sp_dm,cpname,cplb from yh_jinxiaocun_mingxi where gs_name ='" + gongsi + "' group by sp_dm,cpname,cplb) as mx left join (select sp_dm,sum(cpsl) as cpsl,sum(cpsl*cpsj) as cp_price from yh_jinxiaocun_mingxi where mxtype = '入库' and gs_name = '" + gongsi + "' group by sp_dm) as rk on mx.sp_dm=rk.sp_dm left join (select sp_dm,sum(cpsl) as cpsl,sum(cpsl*cpsj) as cp_price from yh_jinxiaocun_mingxi where mxtype = '出库' and gs_name = '" + gongsi + "' group by sp_dm) as ck on ck.sp_dm=rk.sp_dm"
// 构建动态条件

    // if(product_name != '' && product_name != undefined){
    //   sql = sql + " where cpname = '" + product_name + "'"
    // }
   
    // if (app.globalData.shujuku == 0){
    // }
    // else if(app.globalData.shujuku == 1){
    //   wx.cloud.callFunction({
    //     name: 'sqlServer_117',
    //     data:{
    //       query : sql
    //     },
    //     success(res) {
    //       that.setData({
    //         szzhi: res.result.recordset
    //       })
    //     },
    //     fail(res) {
    //       console.log("失败", res)
    //     }
    //   });
      var conditions = [];
      var sql = "select mx.sp_dm,mx.cpname,mx.cplb,mx.cangku,ifnull(jc.jcsl,0) as ruku_num,ifnull(rk.cp_price,0) as ruku_price,ifnull(ck.cpsl,0) as chuku_num,ifnull(ck.cp_price,0) as chuku_price,ifnull(qc.cpsj,0) as qc_cpsj from (select sp_dm,cpname,cplb,cangku from yh_jinxiaocun_mingxi where gs_name ='" + gongsi + "' group by sp_dm,cpname,cplb,cangku) as mx left join (select sp_dm,cangku,sum(cpsl) as cpsl,sum(cpsl*cpsj) as cp_price from yh_jinxiaocun_mingxi where (mxtype = '入库' or mxtype = '调拨入库' or mxtype = '盘盈入库') and gs_name = '" + gongsi + "'" + (stop_date ? " and shijian <= '" + stop_date + "'" : "") + " group by sp_dm,cangku) as rk on mx.sp_dm=rk.sp_dm and mx.cangku=rk.cangku left join (select sp_dm,cangku,sum(cpsl) as cpsl,sum(cpsl*cpsj) as cp_price from yh_jinxiaocun_mingxi where (mxtype = '出库' or mxtype = '调拨出库' or mxtype = '盘亏出库') and gs_name = '" + gongsi + "'" + (stop_date ? " and shijian <= '" + stop_date + "'" : "") + " group by sp_dm,cangku) as ck on ck.sp_dm=rk.sp_dm and ck.cangku=rk.cangku left join (select cpid,cpname,cplb,cangku,ifnull(cpsl,0)+ifnull(rksl,0)-ifnull(cksl,0) as jcsl from (select link_rk.cpid,link_rk.cpname,link_rk.cplb,link_rk.cangku,ifnull(link_rk.cpsl,0) as cpsl,ifnull(link_rk.rksl,0) as rksl,ifnull(ck.cksl,0) as cksl from (select link_qc.cpid,link_qc.cpname,link_qc.cplb,link_qc.cangku,link_qc.cpsl,rk.rksl from(select cp.cpid,cp.cpname,cp.cplb,cp.cangku,qc.cpsl from(select cpid,cpname,cplb,cangku from yh_jinxiaocun_qichushu where gs_name = '"+ gongsi +"' union select sp_dm,cpname,cplb,cangku from yh_jinxiaocun_mingxi where gs_name = '"+ gongsi +"') as cp left join (select cpid,cplb,cpname,cangku,sum(cpsl) as cpsl from yh_jinxiaocun_qichushu where gs_name = '"+ gongsi +"' GROUP BY cpid,cpname,cplb,cangku) as qc on cp.cpid = qc.cpid and cp.cpname = qc.cpname and cp.cplb = qc.cplb and cp.cangku = qc.cangku) as link_qc left join (select sp_dm,cpname,cplb,cangku,sum(cpsl) as rksl from yh_jinxiaocun_mingxi where (mxtype = '入库' or mxtype = '调拨入库' or mxtype = '盘盈入库') and gs_name = '"+ gongsi + "'" + (stop_date ? " and shijian <= '" + stop_date + "'" : "") + " group by sp_dm,cpname,cplb,cangku) as rk on rk.sp_dm = link_qc.cpid and rk.cpname = link_qc.cpname and rk.cplb = link_qc.cplb and rk.cangku = link_qc.cangku) as link_rk left join (select sp_dm,cpname,cplb,cangku,sum(cpsl) as cksl from yh_jinxiaocun_mingxi where (mxtype = '出库' or mxtype = '调拨出库' or mxtype = '盘亏出库') and gs_name = '"+ gongsi + "'" + (stop_date ? " and shijian <= '" + stop_date + "'" : "") + " group by sp_dm,cpname,cplb,cangku) as ck on ck.sp_dm = link_rk.cpid and ck.cpname = link_rk.cpname and ck.cplb = link_rk.cplb and ck.cangku = link_rk.cangku) as jc_data) as jc on mx.sp_dm = jc.cpid and mx.cpname = jc.cpname and mx.cplb = jc.cplb and mx.cangku = jc.cangku left join (select cpid,cpname,cplb,cangku,cpsj from yh_jinxiaocun_qichushu where gs_name = '" + gongsi + "' group by cpid,cpname,cplb,cangku,cpsj) as qc on mx.sp_dm = qc.cpid and mx.cpname = qc.cpname and mx.cplb = qc.cplb and mx.cangku = qc.cangku"
      if (product_name != '' && product_name != undefined) {
        conditions.push("mx.cpname = '" + product_name + "'");
      }
      
     
      
      if (wareHouse != '' && wareHouse != undefined) {
        conditions.push("mx.cangku = '" + wareHouse + "'");  // 修改这里
      }
      
      if (product_number != '' && product_number != undefined) {
        conditions.push("mx.sp_dm like '%" + product_number + "%'");
      }
      
      console.log("商品代码", product_number)
      console.log("查询条件", conditions.length)
      // 如果有条件，添加到 SQL
      if (conditions.length > 0) {
        sql = sql + " where " + conditions.join(" and ");
      }
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: sql
      },
      success(res) {
        that.setData({
          szzhi: res.result
        })
        console.log("成功", res.result)
      },
      fail(res) {
        console.log("失败", res)
      }
    });
},
pankui_churuku: function(){
  var _this = this;
  var pankuData = _this.getAllPankuNumbers();
  
  if (pankuData.length === 0) {
    wx.showToast({
      title: '没有盘亏数据',
      icon: 'none'
    });
    return;
  }
  
  wx.showLoading({
    title: '正在生成盘亏单据...',
  });
  
  var insertSql = "INSERT INTO yh_jinxiaocun_mingxi (orderid, shijian, cpname, sp_dm, cplb, cangku, cpsl, cpsj, mxtype, gs_name, zh_name) VALUES ";
  var values = [];
  
  var currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  for(var i = 0; i < pankuData.length; i++) {
    var item = pankuData[i];
    var mxtype = '';
    var quantity = 0;
    
    // 根据盘亏数量正负确定单据类型
    if (item.盘亏数量 > 0) {
      mxtype = '盘亏出库';
      quantity = Math.abs(item.盘亏数量);
    } else if (item.盘亏数量 < 0) {
      mxtype = '盘盈入库';
      quantity = Math.abs(item.盘亏数量);
    } else {
      continue;
    }
    
    // 生成单据号
    var orderId = '';
    if (mxtype === '盘亏出库') {
      orderId = 'PKCK' + new Date().getTime() + '_' + i;
    } else {
      orderId = 'PYRK' + new Date().getTime() + '_' + i;
    }
    
    // 修正SQL拼接错误
    values.push("('" + orderId + "', '" + currentTime + "', '" + 
                item.商品名称 + "', '" + item.商品代码 + "', '" + 
                item.商品类别 + "', '" + item.所属仓库 + "', " + 
                quantity + ", " + 
                (item.单价 || 0) + ", '" + mxtype + "', '" + 
                app.globalData.gongsi + "', '" + app.globalData.finduser + "')");
  }
  
  if (values.length === 0) {
    wx.hideLoading();
    wx.showToast({
      title: '没有有效的盘亏数据',
      icon: 'none'
    });
    return;
  }
  
  insertSql += values.join(", ");
  console.log('生成的SQL:', insertSql); // 调试用
  
  wx.cloud.callFunction({
    name: "sqlConnection",
    data: { 
      sql: insertSql
    },
    success(res) {
      wx.hideLoading();
      console.log('盘亏单据生成成功:', res);
      wx.showToast({
        title: '盘亏单据生成成功',
        icon: 'success'
      });
    },
    fail(res) {
      wx.hideLoading();
      console.log("盘亏单据生成失败", res);
      wx.showToast({
        title: '盘亏单据生成失败',
        icon: 'none'
      });
    }
  });
},
  goto_print: function(){
    var _this = this;
    
    // 获取所有盘亏数量不为0且有值的数据
    var pankuData = _this.getAllPankuNumbers();
    
    // 如果没有盘亏数据，提示用户
    if (pankuData.length === 0) {
      wx.showToast({
        title: '没有盘亏数据可打印',
        icon: 'none'
      });
      return;
    }
    
    console.log('打印的盘亏数据:', pankuData);
    
    wx.navigateTo({
      url: "../../packageJ/page/print/print?list=" + JSON.stringify(pankuData) + "&type=商品盘亏报表",
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    var that = this
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 500
    })
    that.onLoad()
    that.onShow()
    wx.stopPullDownRefresh()
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

  },
  shanchu: function(e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    console.log(id)
    console.log(that.data.szzhi)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "sqlConnection",
            data: {
              sql: "DELETE * FROM yh_jinxiaocun_mingxi  where sp_dm='" + that.data.szzhi[id].sp_dm + "'"
            },
            success(res) {
              // that.setData({
              //   szzhi: res.result
              // }
              // )
              console.log
              // console.log(that.data.szzhi)
            },
            fail(res) {
              console.log("失败", res)

            }
          });
          // db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).remove({
          //   success: console.log,
          //   fail: console.error,

          // })
          that.onShow()
        } else if (res.cancel) {

          return false;
        }

      }
    })


  },
  xiugai: function(e) {
    var that = this
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    console.log(id)
    that.setData({
      hidden1: !that.data.hidden1,
      szzh: that.data.szzhi[id],
      cpsj: that.data.szzhi[id].cpsj,
      cpjj: that.data.szzhi[id].cpjj,
      cplb: that.data.szzhi[id].cplb,
      mxtype: that.data.szzhi[id].mxtype,
      cpsl: that.data.szzhi[id].cpsl,
      cpjg: that.data.szzhi[id].cpjg,
    })
    // db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzhi[id]._id).update({
    //   data:{


    //   }
    // })

  },
  cpsj: function(e) {
    var cpsj = e.detail.value
    console.log(cpsj)
    this.setData({
      cpsj: cpsj
    })
  },
  cpjj: function(e) {
    var cpjj = e.detail.value
    console.log(cpjj)
    this.setData({
      cpjj: cpjj
    })
  },
  cplb: function(e) {
    var cplb = e.detail.value
    console.log(cplb)
    this.setData({
      cplb: cplb
    })
  },
  mxtype: function(e) {
    var mxtype = e.detail.value
    console.log(mxtype)
    this.setData({
      mxtype: mxtype
    })
  },
  cpsl: function(e) {
    var cpsl = e.detail.value
    console.log(cpsl)
    this.setData({
      cpsl: cpsl
    })
  },
  cpjg: function(e) {
    var cpjg = e.detail.value
    console.log(cpjg)
    this.setData({
      cpjg: cpjg
    })
  },
  tjjg: function() {
    var that = this
    var cpsj = that.data.cpsj
    var cpjj = that.data.cpjj
    var cplb = that.data.cplb
    var mxtype = that.data.mxtype
    var cpsl = that.data.cpsl
    var cpjg = that.data.cpjg
    const db = wx.cloud.database()

    db.collection("Yh_JinXiaoCun_mingxi").doc(that.data.szzh._id).update({
      data: {
        cpsj: cpsj,
        cpjj: cpjj,
        cplb: cplb,
        mxtype: mxtype,
        cpsl: cpsl,
        cpjg: cpjg,


      },
      success: res => {
        wx.showToast({

          title: '修改成功！',

        })

      }

    })
    that.setData({
      hidden1: true,

      cpsljg: ""
    })

    that.onLoad()


  },
  spClose: function() {
    this.setData({
      hidden1: true,

      cpsljg: ""
    })
  },
    // 获取盘库数量
    getPankuNum: function(index) {
      return this.data.pankuData[index] ? this.data.pankuData[index].panku_num : '';
    },
  
    // 获取盘亏数量
    getPankuiNum: function(index) {
      if (!this.data.pankuData[index]) return 0;
      
      const rukuNum = Number(this.data.szzhi[index].ruku_num) || 0;
      const pankuNum = Number(this.data.pankuData[index].panku_num) || 0;
      return rukuNum - pankuNum;
    },

    onInput: function(e) {
      const index = e.currentTarget.dataset.id;
      const value = e.detail.value;
      
      // 计算盘亏数量
      const rukuNum = Number(this.data.szzhi[index].ruku_num) || 0;
      const pankuNum = Number(value) || 0;
      const pankuiNum = rukuNum - pankuNum;
      
      // 保存数据
      const key = `pankuData.${index}`;
      this.setData({
        [key]: {
          panku_num: value,
          pankui_num: pankuiNum,
          sp_dm: this.data.szzhi[index].sp_dm
        }
      });
      
      console.log(`商品 ${index}:`, {
        盘库数量: value,
        盘亏数量: pankuiNum
      });
    },
    onInput2: function (e) {
      var _this = this
      let column = e.currentTarget.dataset.column
      _this.setData({
        
        [column]: e.detail.value
      })
    },
   // 获取所有盘库数量
   getAllPankuNumbers: function() {
    const result = [];
    
    for (let i = 0; i < this.data.szzhi.length; i++) {
      const pankuItem = this.data.pankuData[i];
      
      // 检查：有盘库数据、盘库数量不为空、盘亏数量不为0
      if (pankuItem && 
          pankuItem.panku_num !== '' && 
          pankuItem.panku_num !== null && 
          pankuItem.pankui_num !== 0) {
        
        result.push({
          index: i,
          商品代码: this.data.szzhi[i].sp_dm,
          商品名称: this.data.szzhi[i].cpname,
          商品类别: this.data.szzhi[i].cplb,
          库存数量: this.data.szzhi[i].ruku_num,
          所属仓库: this.data.szzhi[i].cangku,
          单价: this.data.szzhi[i].qc_cpsj,
          盘库数量: pankuItem.panku_num,
          盘亏数量: pankuItem.pankui_num,
          状态: pankuItem.pankui_num > 0 ? '盘亏' : '盘盈'
        });
      }
    }
    
    return result;
  },
  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.选择盘库日期后点击查询可查看该日期库存。2.点击搜索框或在输入框内输入信息后可按商品名，所属仓库，商品代码汇总。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

})

