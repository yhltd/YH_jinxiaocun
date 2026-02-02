
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    gender_list:['男','女'],
    state_list:['正常','停用'],
    input_type: 'text',
    updatePicker: true,
    updateInput: false,
    newdata:"",
    list: [],
    list2: [],
    name:"",
    phone: "",
    company: "",
    uname: "",
    sheetqx1:[],
    sheetqx2:[],
    empty: "",
    queryName: "", // 专门用于查询姓名的数据
    queryPhone: "", // 专门用于查询电话的数据
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    type: [], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    getDate: function () {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1);
      var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
      return year + "-" + month + "-" + day
    },
    title: [{ text: "序号", width: "100rpx", columnName: "rownum", type: "digit",isupd: true},
            { text: "账号", width: "200rpx", columnName: "username", type: "text",isupd: true},
            { text: "密码",width: "200rpx",columnName: "password",type: "text",isupd: true},
            { text: "姓名", width: "200rpx", columnName: "name", type: "text", isupd: true},
            { text: "性别", width: "400rpx", columnName: "gender", type: "text", isupd: true},
            { text: "会员等级", width: "200rpx", columnName: "level", type: "text", isupd: true}, // 新增
            { text: "积分", width: "150rpx", columnName: "points", type: "digit", isupd: true}, // 积分移动到等级后面
            { text: "账号状态", width: "250rpx", columnName: "state", type: "date", isupd: true},
            { text: "电话号", width: "250rpx", columnName: "phone", type: "date", isupd: true},
            { text: "生日", width: "200rpx", columnName: "birthday", type: "digit", isupd: true},

            ],

    title2: [{ text: "序号", width: "100rpx", columnName: "rownum", type: "digit",isupd: true},
            { text: "账号", width: "200rpx", columnName: "username", type: "text",isupd: true},
            { text: "密码",width: "200rpx",columnName: "password",type: "text",isupd: true},
            { text: "姓名", width: "200rpx", columnName: "name", type: "text", isupd: true},
            { text: "性别", width: "400rpx", columnName: "gender", type: "text", isupd: true},
            { text: "会员等级", width: "200rpx", columnName: "level", type: "text", isupd: true}, // 新增
            { text: "积分", width: "150rpx", columnName: "points", type: "digit", isupd: true}, // 积分移动到等级后面
            { text: "账号状态", width: "250rpx", columnName: "state", type: "date", isupd: true},
            { text: "电话号", width: "250rpx", columnName: "phone", type: "date", isupd: true},
            { text: "生日", width: "200rpx", columnName: "birthday", type: "digit", isupd: true},

            ],
    input_hid: true,
    frmStudfind: true,
    mask_hid: true,
    addTable: true,
    handle: true,
    details:true,
    addTable2: true,
    input_hid2: true,
    handle2: true,
    handle3:true,
  },

  bindPickerChangeXB: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var window_gender = _this.data.gender_list[e.detail.value]
    console.log(window_gender)
    _this.setData({
      // window_tingyong: window_tingyong,
      window_gender: _this.data.gender_list[e.detail.value]
    })
  },

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var window_state = _this.data.state_list[e.detail.value]
    console.log(window_state)
    _this.setData({
      // window_tingyong: window_tingyong,
      window_state: _this.data.state_list[e.detail.value]
    })
  },

  clickView: function(e) {
    var _this = this;
    var dataset_input = e.currentTarget.dataset;
    console.log(dataset_input)
    if (!dataset_input.isupd) {
      return;
    }
    if (dataset_input.input_type=="date") {
      _this.setData({
        updatePicker: false,
        empty: dataset_input.value
      })
    }else{
      _this.setData({
        updatePicker: true,
        updateInput: false,
        empty: dataset_input.value
      })
    }
    if (dataset_input.column =="rownum") {
      _this.setData({
        dataset_input,
        handle: false,
        mask_hid: false,
      })
    }else{
    
    _this.setData({
      dataset_input,
      input_hid: false,
      mask_hid: false,
      input_type: e.currentTarget.dataset.input_type
    })
    }
  },

  clickView2: function (e) {
    var _this = this;
    var dataset_input = e.currentTarget.dataset;
    if (!dataset_input.isupd) {
      return;
    }
    if (dataset_input.column == "did") {
      _this.setData({
        dataset_input,
        input_hid2: true,
        handle2: false,
        mask_hid: false,
      })
    } else {
      if (_this.data.sheetqx2.Upd == "1" && dataset_input.column == "date_time") {
      _this.setData({
        dataset_input,
        updatePicker: false,
        input_hid2: false,
        handle2: true,
        mask_hid: false,
        input_type: e.currentTarget.dataset.input_type
      })
      } else if (_this.data.sheetqx2.Upd == "1" && dataset_input.column != "date_time"){
        _this.setData({
          dataset_input,
          updatePicker: true,
          input_hid2: false,
          handle2: true,
          mask_hid: false,
          input_type: e.currentTarget.dataset.input_type
        })
      }else{
        wx.showToast({
          title: '无权限',
          icon: 'none',
        })
      }
    }
  },



  xq_qx: function () {
    var _this = this;
    _this.setData({
      input_hid2: true,
      handle2: true,
    })
  },

  gengduo_show:function(){
    var _this = this;
    _this.setData({
      mask_hid:false,
      handle3:false
    })
  },

  sanchu:function() {
    var _this = this;
    var id = _this.data.list[_this.data.dataset_input.index].id;
    wx.showModal({
      title: "提示",
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          var sql = "delete from member_info where id = '" + id + "';";
          wx.cloud.callFunction({
            name: 'sqlserver_xinyongka',
            data: {
              sql: sql
            },
            success: res => {
              wx.showToast({
                title: "删除成功",
                icon: "none"
              })
              _this.setData({
                handle: true,
                mask_hid: true
              })
              _this.init()
            },
            err: res => {
              wx.showToast({
                title: "错误",
                icon: "none"
              })
            }
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
  },

  changed: function (e) {
    var _this = this;
    var dataset = _this.data.dataset_input;
    var id = dataset.id;
    var column = dataset.column;
    var value = dataset.value;
    var index = dataset.index;
    var new_value = e.detail.value.new;
    if (!dataset.isupd) {
      return;
    }
    if (new_value != ""){
      var sql = "update member_info set " + column + " = '" + new_value + "' where id='" + _this.data.list[index].id + "';"
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        wx.showToast({
          title: "修改成功",
          icon: "none"
        })
        _this.setData({
          input_hid: false,
          mask_hid: false,
          input_type: e.currentTarget.dataset.input_type,
          ["list[" + index + "]." + column]: new_value,
          new: ""
        })
        _this.hid_view()
      },
      err: res => {
        wx.showToast({
          title: "错误",
          icon: "none"
        })
      }
    })
      }else{
      wx.showToast({
        title: "不能为空！",
        icon: "none"
      })
      }
  },

  choiceDate: function(e){
    //e.preventDefault(); 
    this.setData({
      [e.currentTarget.dataset.column_name]: e.detail.value
    })
  },

  inquire: function() {
    var _this = this;
    // 每次打开查询窗口时重置表单
    _this.resetQueryForm();
    _this.setData({
      frmStudfind: false,
      mask_hid: false,
    });
  },
  


  entering: function() {
    var _this = this;
    _this.setData({
      addTable: false,
      mask_hid: false,
    })
  },


  luru: function () {
    var _this = this;
    _this.setData({
      addTable2: false,
      mask_hid: false,
    })
  },

  inquire_QX: function() {
    var _this = this;
    _this.hid_view();
  },


  hid_view: function() {
    var _this = this;
    _this.setData({
      input_hid: true,
      frmStudfind: true,
      mask_hid: true,
      addTable: true,
      handle: true,
      details: true,
      addTable2: true,
      input_hid2: true,
      handle2: true,
      handle3: true,
    });
    // 重置查询表单
    _this.resetQueryForm();
  },

  save: function(e) {
    var _this = this;
    _this.setData({
      name: e.detail.value.name || "",
      phone: e.detail.value.phone || "",
    });
    _this.init();
    _this.setData({
      frmStudfind: true,
      mask_hid: true,
    });
  },

  add: function(e) {
    var _this = this;
    //console.log(e.detail.value.skr,)
    //_this.setData({
    // skr: e.detail.value.skr,
    // fkr: e.detail.value.fkr,
    // ckr: e.detail.value.ckr,
    // fkh: e.detail.value.fkh,
    // zdr: e.detail.value.zdr,
    // hkr: e.detail.value.hkr,
    // zje: e.detail.value.zje,
    // ysk: e.detail.value.ysk,
    // yke: e.detail.value.yke,
    // jke: e.detail.value.jke,
    // sxf: e.detail.value.sxf,
    // dhh: e.detail.value.dhh,
    // mm: e.detail.value.mm,
    // yh: e.detail.value.yh
    //})
    if(e.detail.value.zje==""){
      e.detail.value.zje =0
    }
    if (e.detail.value.yhk == "") {
      e.detail.value.yhk = 0
    }
    if (e.detail.value.yke == "") {
      e.detail.value.yke = 0
    }
    if (e.detail.value.jke == "") {
      e.detail.value.jke = 0
    }
    if (e.detail.value.points == "") {
      e.detail.value.points = 0
    }
    if (e.detail.value.username !="" && e.detail.value.password != "" && e.detail.value.name != "" && e.detail.value.gender != "" && e.detail.value.state != "" && e.detail.value.phone != "" && e.detail.value.birthday != "" ){
    let sql = "insert into member_info(company,username,password,name,gender,state,phone,birthday,points) values('" + _this.data.company + "','" +
      e.detail.value.username + "','" + e.detail.value.password + "','" + e.detail.value.name + "','" +
      e.detail.value.gender + "','" + e.detail.value.state +  "','" + e.detail.value.phone + "','" + e.detail.value.birthday + "',0)"
      console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        wx.showToast({
          title: "添加成功！",
          icon: "none"
        })
        _this.init()
      },
      error: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
    _this.init();
    _this.setData({
      addTable: true,
      mask_hid: true,
      empty:"",
      zdr:"",
      hkr:""
    })
    }else{
      wx.showToast({
        title: "信息不能为空！",
        icon:"none"
      })
    }
  },



  // init: function() {
  //   var _this = this;
  //   let sql = "select * from member_info where name like '%" + _this.data.name + "%' and phone like '%" + _this.data.phone + "%' and company='"+ _this.data.company +"'"
  //   console.log(sql)
  //   wx.cloud.callFunction({
  //     name: 'sqlserver_xinyongka',
  //     data: {
  //       sql: sql
  //     },
  //     success: res => {
  //       console.log("select-success", res)
  //       _this.setData({
  //         list: res.result,
  //         name: "",
  //         phone: "",
  //       })
  //     },
  //     fail: res=> {
  //       console.log("select-fail",res)
  //     }
  //   })
  // },
//------新0130
// init: function() {
//   var _this = this;
  
//   // 首先获取会员等级数据
//   let sql_level = "select * from member_jibie where company='" + _this.data.company + "' order by menkan asc"; // 按门槛升序排序
  
//   wx.cloud.callFunction({
//     name: 'sqlserver_xinyongka',
//     data: {
//       sql: sql_level
//     },
//     success: res_level => {
//       console.log("会员等级数据:", res_level.result);
//       var levelList = res_level.result || [];
      
//       // 然后获取会员数据
//       let sql_member = "select * from member_info where name like '%" + _this.data.name + "%' and phone like '%" + _this.data.phone + "%' and company='"+ _this.data.company +"'";
//       console.log(sql_member);
      
//       wx.cloud.callFunction({
//         name: 'sqlserver_xinyongka',
//         data: {
//           sql: sql_member
//         },
//         // success: res_member => {
//         //   console.log("会员数据:", res_member.result);
          
//         //   // 处理数据，根据积分自动计算会员等级
//         //   var memberList = res_member.result || [];
//         //   memberList = memberList.map(item => {
//         //     var points = parseFloat(item.points) || 0;
//         //     var memberLevel = "无等级"; // 默认等级
            
//         //     // 遍历等级列表，找到积分对应的等级
//         //     for (let i = 0; i < levelList.length; i++) {
//         //       var minPoints = parseFloat(levelList[i].menkan) || 0;
              
//         //       // 如果积分达到这个等级的门槛
//         //       if (points >= minPoints) {
//         //         memberLevel = levelList[i].jibie;
//         //       } else {
//         //         // 如果积分达不到下一个等级，就保持当前等级
//         //         break;
//         //       }
//         //     }
            
//         //     return {
//         //       ...item,
//         //       level: memberLevel // 添加自动计算的等级字段
//         //     };
//         //   });
          
//         //   _this.setData({
//         //     list: memberList,
//         //     name: "",
//         //     phone: "",
//         //   });
//         // },
//         //---新0130
//         success: res_member => {
//           console.log("会员数据:", res_member.result);
          
//           // 处理数据，根据积分自动计算会员等级
//           var memberList = res_member.result || [];
//           memberList = memberList.map(item => {
//             var points = parseFloat(item.points) || 0;
//             var memberLevel = "无等级"; // 默认等级
            
//             // 如果有等级数据
//             if (levelList.length > 0) {
//               // 按门槛升序排序
//               levelList.sort((a, b) => (parseFloat(a.menkan) || 0) - (parseFloat(b.menkan) || 0));
              
//               // 倒序遍历，找到第一个积分达到的门槛
//               for (let i = levelList.length - 1; i >= 0; i--) {
//                 var minPoints = parseFloat(levelList[i].menkan) || 0;
                
//                 // 如果积分达到这个等级的门槛
//                 if (points >= minPoints) {
//                   memberLevel = levelList[i].jibie;
//                   break; // 找到符合条件的最高等级就退出
//                 }
//               }
              
//               // 如果积分连最低等级都没达到
//               var lowestPoints = parseFloat(levelList[0].menkan) || 0;
//               if (points < lowestPoints) {
//                 memberLevel = "无等级";
//               }
//             }
            
//             return {
//               ...item,
//               level: memberLevel // 添加自动计算的等级字段
//             };
//           });
          
//           _this.setData({
//             list: memberList,
//             name: "",
//             phone: "",
//           });
//         },
//         fail: res=> {
//           console.log("select-fail",res);
//         }
//       });
//     },
//     fail: err => {
//       console.log("获取会员等级失败:", err);
//     }
//   });
// },
///----新0130
init: function() {
  var _this = this;
  
  // 首先获取会员等级数据
  let sql_level = "select * from member_jibie where company='" + _this.data.company + "' order by menkan asc";
  
  wx.cloud.callFunction({
    name: 'sqlserver_xinyongka',
    data: {
      sql: sql_level
    },
    success: res_level => {
      console.log("会员等级数据:", res_level.result);
      var levelList = res_level.result || [];
      
      // 先获取所有会员的订单实收金额总和
      let sql_orders_sum = `
        select hyzh, sum(heji.ssje) as total_ssje 
        from orders as ord 
        left join (
          select ddid, company, sum(convert(zhdj,float) * convert(gs,float)) as ssje 
          from orders_details 
          group by ddid
        ) as heji on ord.ddh = heji.ddid and ord.company = heji.company 
        where ord.company = '${_this.data.company}' 
          and hyzh != '' 
          and heji.ssje is not null
        group by hyzh
      `;
      
      console.log("查询订单总金额SQL:", sql_orders_sum);
      
      wx.cloud.callFunction({
        name: 'sqlserver_xinyongka',
        data: {
          sql: sql_orders_sum
        },
        success: res_orders => {
          console.log("会员订单总金额:", res_orders.result);
          
          // 创建会员订单金额映射
          var orderAmountMap = {};
          var memberUpdatePromises = []; // 用于存储更新积分的Promise
          
          res_orders.result.forEach(item => {
            if (item.hyzh && item.total_ssje !== null) {
              var totalSpent = parseFloat(item.total_ssje) || 0;
              orderAmountMap[item.hyzh] = totalSpent;
              
              // 立即更新数据库中会员的积分
              var updateSql = `
                UPDATE member_info 
                SET points = ${Math.round(totalSpent)} 
                WHERE username = '${item.hyzh}' 
                  AND company = '${_this.data.company}'
              `;
              
              console.log("更新会员积分SQL:", updateSql);
              
              // 执行更新
              memberUpdatePromises.push(
                new Promise((resolve, reject) => {
                  wx.cloud.callFunction({
                    name: 'sqlserver_xinyongka',
                    data: { sql: updateSql },
                    success: resolve,
                    fail: reject
                  });
                })
              );
            }
          });
          
          // 等待所有更新完成
          Promise.all(memberUpdatePromises)
            .then(() => {
              console.log("所有会员积分更新完成");
            })
            .catch(err => {
              console.error("部分会员积分更新失败:", err);
            })
            .finally(() => {
              // 然后获取会员数据（积分已更新）
              _this.loadMemberData(levelList, orderAmountMap);
            });
        },
        fail: err => {
          console.log("查询订单金额失败:", err);
          // 如果查询失败，只加载会员数据
          _this.loadMemberData(levelList, {});
        }
      });
    },
    fail: err => {
      console.log("获取会员等级失败:", err);
    }
  });
},

// 提取加载会员数据的函数
loadMemberData: function(levelList, orderAmountMap) {
  var _this = this;
  
  let sql_member = "select * from member_info where name like '%" + _this.data.name + "%' and phone like '%" + _this.data.phone + "%' and company='"+ _this.data.company +"'";
  console.log("查询会员SQL:", sql_member);
  
  wx.cloud.callFunction({
    name: 'sqlserver_xinyongka',
    data: {
      sql: sql_member
    },
    success: res_member => {
      console.log("会员数据:", res_member.result);
      
      // 处理数据，根据订单实收金额计算积分和等级
      var memberList = res_member.result || [];
      memberList = memberList.map(item => {
        var username = item.username || "";
        var totalSpent = orderAmountMap[username] || 0; // 该会员的总消费金额
        
        // 将消费金额作为积分（四舍五入取整）
        var points = Math.round(totalSpent); 
        
        var memberLevel = "无等级"; // 默认等级
        
        // 根据消费金额（积分）判断等级
        if (levelList.length > 0) {
          // 按门槛升序排序
          levelList.sort((a, b) => (parseFloat(a.menkan) || 0) - (parseFloat(b.menkan) || 0));
          
          // 倒序遍历，找到第一个消费金额达到的门槛
          for (let i = levelList.length - 1; i >= 0; i--) {
            var minPoints = parseFloat(levelList[i].menkan) || 0;
            
            // 如果消费金额达到这个等级的门槛
            if (totalSpent >= minPoints) {
              memberLevel = levelList[i].jibie;
              break; // 找到符合条件的最高等级就退出
            }
          }
          
          // 如果消费金额连最低等级都没达到
          var lowestPoints = parseFloat(levelList[0].menkan) || 0;
          if (totalSpent < lowestPoints) {
            memberLevel = "无等级";
          }
        }
        
        return {
          ...item,
          points: points, // 积分
          level: memberLevel, // 等级
          total_spent: totalSpent // 总消费金额
        };
      });
      
      _this.setData({
        list: memberList,
        name: "",
        phone: "",
      });
    },
    fail: res => {
      console.log("select-fail", res);
    }
  });
},

// 添加一个备用函数，如果查询订单失败时使用
loadMembersWithOriginalLogic: function(levelList) {
  var _this = this;
  
  let sql_member = "select * from member_info where name like '%" + _this.data.name + "%' and phone like '%" + _this.data.phone + "%' and company='"+ _this.data.company +"'";
  
  wx.cloud.callFunction({
    name: 'sqlserver_xinyongka',
    data: {
      sql: sql_member
    },
    success: res_member => {
      console.log("会员数据:", res_member.result);
      
      var memberList = res_member.result || [];
      memberList = memberList.map(item => {
        var points = parseFloat(item.points) || 0;
        var memberLevel = "无等级";
        
        // 使用原始积分数值计算等级
        if (levelList.length > 0) {
          levelList.sort((a, b) => (parseFloat(a.menkan) || 0) - (parseFloat(b.menkan) || 0));
          
          for (let i = levelList.length - 1; i >= 0; i--) {
            var minPoints = parseFloat(levelList[i].menkan) || 0;
            
            if (points >= minPoints) {
              memberLevel = levelList[i].jibie;
              break;
            }
          }
          
          var lowestPoints = parseFloat(levelList[0].menkan) || 0;
          if (points < lowestPoints) {
            memberLevel = "无等级";
          }
        }
        
        return {
          ...item,
          level: memberLevel
        };
      });
      
      _this.setData({
        list: memberList,
        name: "",
        phone: "",
      });
    },
    fail: res => {
      console.log("select-fail", res);
    }
  });
},




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var userInfo = JSON.parse(options.userInfo)
     _this.setData({
       company: userInfo.company,
       uname: userInfo.uname,
     })
    console.log(userInfo)
    _this.init();
  },

  choice_checkBox: function(e) {
    var _this = this;
    var value = e.detail.value
    var index = e.currentTarget.dataset.index;
    var checkItems = _this.data.checkItems;
    if (value != "") {
      checkItems.push(index)
    } else {
      for (let i = 0; i < checkItems.length; i++) {
        if (checkItems[i] == index) {
          checkItems.splice(i, 1)
        }
      }
    }
    _this.setData({
      checkItems
    })
  },

  use_book:function(){
    wx.showModal({
      title: '使用说明',
      content: '1.点击查询按钮，输入条件点击确定即可查询。\n2.点击录入按钮，输入内容点击确定即可录入。\n3.点击序号，在弹出的窗口点击删除按钮即可删除。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  get_excel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list2;
    var title = [{ text: "序号", width: "100rpx", columnName: "id", type: "digit", isupd: true },
    { text: "账号", width: "250rpx", columnName: "username", type: "text", isupd: true },
    { text: "密码", width: "200rpx", columnName: "password", type: "text", isupd: true },
    { text: "性别", width: "400rpx", columnName: "gender", type: "text", isupd: true },
    { text: "会员等级", width: "200rpx", columnName: "level", type: "text", isupd: true }, // 新增
    { text: "积分", width: "150rpx", columnName: "points", type: "digit", isupd: true }, // 积分位置调整
    { text: "账号状态", width: "200rpx", columnName: "state", type: "text", isupd: true },
    { text: "电话号", width: "200rpx", columnName: "phone", type: "date", isupd: true },
    { text: "生日", width: "200rpx", columnName: "birthday", type: "date", isupd: true },
    
    ]
    var cloudList = {
      name: '会员管理',
      items: [],
      header: []
    }

    for (let i = 0; i < title.length; i++) {
      cloudList.header.push({
        item: title[i].text,
        type: title[i].type,
        width: parseInt(title[i].width.split("r")[0]) / 6,
        columnName: title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name: 'getExcel',
      data: {
        list: cloudList
      },
      success: function (res) {
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu: 'true',
              fileType: 'xlsx',
              success: res => {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  getExcel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list;
    var title = [
      { text: "账号", width: "200rpx", columnName: "username", type: "text",isupd: true},
      { text: "密码",width: "200rpx",columnName: "password",type: "text",isupd: true},
      { text: "姓名", width: "200rpx", columnName: "name", type: "text", isupd: true},
      { text: "性别", width: "400rpx", columnName: "gender", type: "text", isupd: true},
      { text: "会员等级", width: "200rpx", columnName: "level", type: "text", isupd: true}, // 新增
    { text: "积分", width: "150rpx", columnName: "points", type: "number", isupd: true}, // 积分位置调整
      { text: "帐号状态", width: "250rpx", columnName: "state", type: "date", isupd: true},
      { text: "电话号", width: "250rpx", columnName: "phone", type: "date", isupd: true},
      { text: "生日", width: "200rpx", columnName: "birthday", type: "digit", isupd: true},
    ]
    var cloudList = {
      name: '会员管理',
      items: [],
      header: []
    }

    for (let i = 0; i < title.length; i++) {
      cloudList.header.push({
        item: title[i].text,
        type: title[i].type,
        width: parseInt(title[i].width.split("r")[0]) / 6,
        columnName: title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name: 'getExcel',
      data: {
        list: cloudList
      },
      success: function (res) {
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu: 'true',
              fileType: 'xlsx',
              success: res => {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },

// 重置查询表单
resetQueryForm: function() {
  var _this = this;
  _this.setData({
    queryName: "",
    queryPhone: ""
  });
  // wx.showToast({
  //   // title: '已重置',
  //   icon: 'success'
  // });
},




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  }
})