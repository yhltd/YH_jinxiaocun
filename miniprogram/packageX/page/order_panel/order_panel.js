// packageX/page/order_panel/order_panel.js
Page({

  /**
   * 页面的初始数据
   */
 
   
  data: { 
    showIndex:null,//打开弹窗的对应下标
    height:'',//屏幕高度
    product_list:[],
    member_list:[],
    cart_list:[],
    member_list:[],
    test_list:['是','否'],
    mask_hid:true,
    specifications_hid:true,
    bottom_jiesuan:true,
    member_hid:true,
    orders_value:'',
    window_unit:'',
    member_where:'',
    num_sum:0,
    price_sum:0,
    startX: 0,        // 开始X坐标
    startY: 0,        // 开始Y坐标
    member_zhanghao:'',
    member_xingming:'',
    fullscreen_hid: true, // 控制全屏弹窗显示隐藏
    selectedProduct: {}, // 选中的商品信息
    imageList: [], // 存储图片列表
    currentImageIndex: 0, // 当前轮播图索引
    member_discount: 1, // 会员折扣率，默认1（不打折）
    member_level: '', // 会员等级
    original_price_sum: 0, // 原总价
    discount_saved: 0, // 节省金额
    discount_display: '10.0', // 折扣显示（如：9.5折）
    member_discounted_price: '', // 规格弹窗中的会员价显示
  },

  // bindPickerChange1: function(e) {
  //   var _this = this
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   var window_guige = _this.data.guige_list[e.detail.value]
  //   console.log(window_guige)
  //   _this.setData({
  //     window_guige: window_guige,
  //     window_price: _this.data.price_list[e.detail.value]
  //   })
  // },
//---新0202
bindPickerChange1: function(e) {
  var _this = this
  console.log('picker发送选择改变，携带值为', e.detail.value)
  var window_guige = _this.data.guige_list[e.detail.value]
  var selectedPrice = _this.data.price_list[e.detail.value]
  console.log(window_guige)
  
  // 计算会员价
  var currentDiscount = _this.data.member_discount || 1;
  var memberDiscountedPrice = (selectedPrice * currentDiscount).toFixed(2);
  
  _this.setData({
    window_guige: window_guige,
    window_price: selectedPrice,
    member_discounted_price: memberDiscountedPrice
  })
},

  bindPickerChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var window_practice = _this.data.baocun_list[e.detail.value]
    console.log(window_practice)
    _this.setData({
      window_practice: window_practice,
    }) 
  },

  cart_delete:function(e){
    var _this = this
    console.log(e)
    console.log(e.currentTarget.dataset)
    wx.showModal({
      title: '提示',
      content: '确认删除此行商品？',
      success (res) {
        if (res.confirm) {
          var list = _this.data.cart_list
          var num_sum = _this.data.num_sum * 1 - list[e.currentTarget.dataset.index].gs * 1
          var price_sum = _this.data.price_sum * 1 - list[e.currentTarget.dataset.index].zhje * 1
          console.log(num_sum)
          console.log(price_sum)
          list.splice(e.currentTarget.dataset.index,1)
          _this.setData({
            cart_list:list,
            num_sum,
            price_sum
          })
          console.log(list)
        }
      }
    })
  },

  numChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var window_num = _this.data.num
    console.log(window_guige)
    _this.setData({
      window_guige: window_guige,
      window_price: _this.data.price_list[e.detail.value]
    })
  },

  onInput: function (e) {
    var _this = this
    console.log(e.currentTarget.dataset)
    console.log(e.currentTarget.dataset.name)
    console.log(e.detail.value)
    let name = e.currentTarget.dataset.name
    _this.setData({
      [name]: e.detail.value,
    })
  },

  // 打开弹窗
  openPopup:function(e){
    var _this = this
    var index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index)
    console.log(_this.data.product_list[index])
    var guige_list = _this.data.product_list[index].specifications
    var price_list = _this.data.product_list[index].price
    var baocun_list = _this.data.product_list[index].practice
    guige_list = guige_list.split(',')
    price_list = price_list.split(',')
    baocun_list = baocun_list.split(',')
    console.log(guige_list)

     // 获取当前折扣率
  var currentDiscount = _this.data.member_discount || 1;
    _this.setData({
      window_name:_this.data.product_list[index].product_name,
      window_type:_this.data.product_list[index].type,
      window_num:'',
      window_guige:'',
      window_practice:'',
      window_price:'',
      guige_list,
      price_list,
      baocun_list,
      window_unit:_this.data.product_list[index].unit,
      window_photo:_this.data.product_list[index].photo,
      member_discounted_price: '' 
    })
    _this.setData({
      mask_hid:false,
      specifications_hid:false
    })
  },

  jiesuan:function(){
    var _this = this;
    _this.setData({
      bottom_jiesuan:false,
      mask_hid:false
    })
  },
  //关闭弹窗
  closePopup(){
    this.setData({
      mask_hid:true,
      member_hid:true,
      bottom_jiesuan:true,
      specifications_hid:true
    })
  },

  closejiesuan(){
    this.setData({
      mask_hid:true,
      cart_list:[],
      bottom_jiesuan:true,
      price_sum:0,
      num_sum:0,
      member_xingming:'',
      member_zhanghao:'',
      member_discount: 1, // 重置折扣率
      member_level: '', // 重置等级
      original_price_sum: 0, // 重置原总价
      discount_saved: 0, // 重置节省金额
      discount_display: '10.0', // 重置折扣显示
      member_discounted_price: '' // 重置会员价
    })
  },

  closejiesuan2(){
    this.setData({
      mask_hid:true,
      bottom_jiesuan:true,
    })
  },

  addtocart:function(){
    var _this = this
    var cartlist = _this.data.cart_list
    if(_this.data.window_name == '' || _this.data.window_name == null || _this.data.window_name == undefined){
      wx.showToast({
        title: '未读取到商品名称！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(_this.data.window_num == '' || _this.data.window_num == null || _this.data.window_num == undefined){
      wx.showToast({
        title: '未读取到商品数量！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(_this.data.window_guige == '' || _this.data.window_guige == null || _this.data.window_guige == undefined){
      wx.showToast({
        title: '未读取到商品规格！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(_this.data.window_price == '' || _this.data.window_price == null || _this.data.window_price == undefined){
      wx.showToast({
        title: '未读取到商品单价！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
      // 获取当前折扣率（如果有会员）
  var currentDiscount = _this.data.member_discount || 1;
  
  // 计算折扣后价格
  var originalPrice = parseFloat(_this.data.window_price) || 0;
  var quantity = parseFloat(_this.data.window_num) || 0;
  var discountedPrice = originalPrice * currentDiscount;
  var discountedAmount = discountedPrice * quantity;
  
  cartlist.push({
    cplx:_this.data.window_type,
    cpmc:_this.data.window_name,
    gs:_this.data.window_num,
    dw:_this.data.window_unit,
    dj:_this.data.window_price, // 保存原价
    dzbl: currentDiscount, // 折扣比例
    zhdj: discountedPrice.toFixed(2), // 折扣后单价
    zhje: discountedAmount.toFixed(2) // 折扣后金额
  })
  
  // 重新计算总价
  var this_num = 0
  var this_price = 0
  for(var i=0; i<cartlist.length; i++){
    this_num = this_num + parseFloat(cartlist[i].gs) || 0
    this_price = this_price + parseFloat(cartlist[i].zhje) || 0
  }
  
  _this.setData({
    num_sum: this_num,
    price_sum: this_price,
    cart_list: cartlist,
    specifications_hid: true,
    mask_hid: true
  })
},
  //   cartlist.push({
  //     cplx:_this.data.window_type,
  //     cpmc:_this.data.window_name,
  //     gs:_this.data.window_num,
  //     dw:_this.data.window_unit,
  //     dj:_this.data.window_price,
  //     dzbl:1,
  //     zhdj:_this.data.window_price,
  //     zhje:_this.data.window_price * _this.data.window_num
  //   })
  //   console.log(cartlist)
  //   var this_num = 0
  //   var this_price = 0
  //   for(var i=0; i<cartlist.length; i++){
  //     this_num = this_num + cartlist[i].gs * 1
  //     this_price = this_price + cartlist[i].zhje * 1
  //   }
  //   _this.setData({
  //     num_sum:this_num,
  //     price_sum:this_price,
  //     cart_list:cartlist,
  //     specifications_hid:true,
  //     mask_hid:true
  //   })
  // },

  chooseMember(){
    var _this = this
    _this.setData({
      member_hid:false,
      member_where:'',
    })
    _this.member_sel()
    
  },
  closemember(){
    this.setData({
      member_hid:true
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this;
    // 动态获取屏幕高度
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          height: result.windowHeight
        });
      },
    })
  },
  // 手指触摸动作开始
  touchStart: function(e){
    let that = this;
    //开始触摸时 重置所有删除
    that.data.list.forEach(function (v, i) {
        if (v.isTouchMove) v.isTouchMove = false; // 只操作为true的
    })
    // 记录手指触摸开始坐标
    that.setData({
        startX: e.changedTouches[0].clientX,  // 开始X坐标
        startY: e.changedTouches[0].clientY,  // 开始Y坐标
        list: that.data.list
    })
},

  // 手指触摸后移动
  touchMove: function(e){
    let that = this,
        index = e.currentTarget.dataset.index,    // 当前下标
        startX = that.data.startX,                // 开始X坐标
        startY = that.data.startY,                // 开始Y坐标
        touchMoveX = e.changedTouches[0].clientX, // 滑动变化坐标
        touchMoveY = e.changedTouches[0].clientY, // 滑动变化坐标
        // 获取滑动角度
        angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
　　　　　// 判断滑动角度
    that.data.list.forEach(function (v, i) {
        v.isTouchMove = false
        // 滑动超过30度角 return
        if (Math.abs(angle) > 30) return;
        if (i == index) {
            // 右滑
            if (touchMoveX > startX) 
                v.isTouchMove = false
            // 左滑
            else 
                v.isTouchMove = true
        }
    })
    // 更新数据
    that.setData({
        list: that.data.list
    })
  },

  // 计算滑动角度
  angle: function (start, end) {
    let that = this,
        _X = end.X - start.X,
        _Y = end.Y - start.Y;
    // 返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  // 删除
  delList: function(e){
    let that = this,
        index = e.currentTarget.dataset.index;  // 当前下标
　　　　　// 切割当前下标元素，更新数据
    that.data.cart_list.splice(index, 1); 
    that.setData({
        list: that.data.cart_list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    console.log(options)
    var userInfo = JSON.parse(options.userInfo)
    var myDate = new Date()
    var year = myDate.getFullYear()
    var month = myDate.getMonth()+1
    var day = myDate.getDate()
    var fixedvalue = 1
    if (month < 10){
        month = '0' + month;
    }
    if(day <10){
        day = '0' + day;
    }
    _this.setData({
      userInfo,
      scrollHeight:wx.getSystemInfoSync().screenHeight
    })
    var orders_value = year.toString()+month.toString()+day.toString()

    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: "select max(ddh) as ddh from orders where company ='" + userInfo.gongsi + "' and ddh like '" + orders_value + "%'"
      },

    success: res => {
      console.log("select-success", res)
      var list = res.result
      console.log(list)
      if(list[0].ddh != null){
        console.log(list[0].ddh * 1 + 1)
        _this.setData({
          orders_value: list[0].ddh * 1 + 1
        })
      }else{
        console.log(orders_value + "0001")
        _this.setData({
          orders_value:orders_value + "0001"
        })
      }
      
    },
    fail: res=> {
        console.log("select-fail",res)
      }
    })
    var sql = "select type from product where company ='" + userInfo.gongsi + "' group by type;"
    // var sql2 = "select type,product_name,unit,price,photo,specifications,practice,'' as price_look from product where company ='" + userInfo.gongsi + "'"
    var sql2 = "select type,product_name,unit,price,photo,specifications,practice,'' as price_look from product where company ='" + userInfo.gongsi + "' and (tingyong != '是' or tingyong is null or tingyong = '')"
    console.log(this.type) 
    console.log(sql + sql2)
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        console.log("select-success", res)
        var list = res.result
        var title = [{name:'全部'}]
        for(var i=0; i<list.length; i++){
          if(list[i].type != ''){
            title.push({
              name:list[i].type
            })
          }
        }
        _this.setData({
          title
        })
      },
      fail: res=> {
        console.log("select-fail",res)
      }
    })
    // 商品
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql2
      },
      // success: res => {
      //   console.log("select-success", res)
      //   var list = res.result
      //   for(var i=0; i<list.length; i++){
      //     list[i].price_look = list[i].price.split(",")[0]
      //   }
      //   _this.setData({
      //     product_list:list
      //   })
      // },
      success: res => {
        console.log("select-success", res)
        var list = res.result
        
        // 处理图片数据
        const processedList = list.map(item => {
          let photo = item.photo;
          
          // 强制处理：无论什么情况都确保有前缀
          if (photo && photo.trim() !== '') {
            // 如果已经是完整格式，保持不变
            if (photo.startsWith('data:image/')) {
              // 已经是完整格式
            } else {
              // 添加前缀
              photo = 'data:image/jpeg;base64,' + photo;
            }
          } else {
            photo = ''; // 确保空值
          }
          
          return {
            ...item,
            photo: photo,
            price_look: item.price ? item.price.split(",")[0] : ''
          };
        });
        
        // 强制设置数据
        _this.setData({
          product_list: [] // 先清空
        }, () => {
          // 再设置新数据
          setTimeout(() => {
            _this.setData({
              product_list: processedList
            });
            console.log('数据已强制刷新');
          }, 100);
        });
      },
      fail: res=> {
        console.log("select-fail",res)
      }
    })

    var sql = "select username,name,gender,phone,state from member_info where company ='" + userInfo.gongsi + "'"
    // var sql2 = "select username,name,gender,phone,state from member_info where company ='" + userInfo.gongsi + "'and (username like %'" + _this.data.username + "'% or name like%'" + _this.data.name + "' or phone like %'" + _this.data.phone + "')"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        console.log("select-success", res)
        var list = res.result
        _this.setData({
          member_list:list
        })
      },
      fail: res=> {
        console.log("select-fail",res)
      }
    })
    // 商品
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql2
      },
      success: res => {
        console.log("select-success", res)
        var list = res.result
        _this.setData({
          product_list:list
        })
      },
      fail: res=> {
        console.log("select-fail",res)
      }
    })
  },

  member_sel:function(){
    var _this = this
    var sql = "select username,name,gender,phone,state from member_info where company ='" + _this.data.userInfo.gongsi + "' and (username like '%" + _this.data.member_where + "%' or name like '%" + _this.data.member_where + "%' or phone like '%" + _this.data.member_where + "%')"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        console.log("select-success", res)
        var list = res.result
        _this.setData({
          member_list:list
        })
      },
      fail: res=> {
        console.log("select-fail",res)
      }
    })
  },

  // member_click:function(e){
  //   var _this = this
  //   var index = e.currentTarget.dataset.index;
  //   console.log(index)
  //   _this.setData({
  //     member_zhanghao:_this.data.member_list[index].username,
  //     member_xingming:_this.data.member_list[index].name,
  //     member_hid:true,
  //   })
  // },
//-----新0202
member_click:function(e){
  var _this = this
  var index = e.currentTarget.dataset.index;
  console.log(index)
  
  // 获取会员账号
  var memberUsername = _this.data.member_list[index].username;
  
  _this.setData({
    member_zhanghao: memberUsername,
    member_xingming: _this.data.member_list[index].name,
    member_hid:true,
  });
  
  // 调用函数获取会员折扣
  _this.getMemberDiscount(memberUsername);
},

// 新增函数：获取会员折扣比例
getMemberDiscount: function(memberUsername) {
  var _this = this;
  
  if (!memberUsername) {
    console.log('会员账号为空');
    return;
  }
  
  // 第一步：查询会员信息（包括积分）
  var sql1 = `SELECT username, name, points FROM member_info WHERE username = '${memberUsername}' AND company = '${_this.data.userInfo.gongsi}'`;
  
  console.log('查询会员信息SQL:', sql1);
  
  wx.cloud.callFunction({
    name: 'sqlserver_xinyongka',
    data: { sql: sql1 },
    success: res1 => {
      console.log('获取会员信息成功:', res1);
      if (res1.result && res1.result.length > 0) {
        var memberInfo = res1.result[0];
        var memberPoints = parseFloat(memberInfo.points) || 0;
        
        // 第二步：查询所有会员等级规则
        var sql2 = `SELECT jibie, menkan, bili FROM member_jibie WHERE company = '${_this.data.userInfo.gongsi}' ORDER BY menkan ASC`;
        
        wx.cloud.callFunction({
          name: 'sqlserver_xinyongka',
          data: { sql: sql2 },
          success: res2 => {
            console.log('获取会员等级规则成功:', res2);
            var levelRules = res2.result || [];
            var memberLevel = "无等级";
            var discountRate = 1; // 默认不打折
            
            // 根据积分计算会员等级
            if (levelRules.length > 0) {
              // 按门槛升序排序
              levelRules.sort((a, b) => (parseFloat(a.menkan) || 0) - (parseFloat(b.menkan) || 0));
              
              // 倒序遍历，找到第一个积分达到的门槛
              for (let i = levelRules.length - 1; i >= 0; i--) {
                var minPoints = parseFloat(levelRules[i].menkan) || 0;
                
                // 如果积分达到这个等级的门槛
                if (memberPoints >= minPoints) {
                  memberLevel = levelRules[i].jibie;
                  discountRate = parseFloat(levelRules[i].bili) || 1;
                  break; // 找到符合条件的最高等级就退出
                }
              }
              
              // 如果积分连最低等级都没达到
              var lowestPoints = parseFloat(levelRules[0].menkan) || 0;
              if (memberPoints < lowestPoints) {
                memberLevel = "无等级";
                discountRate = 1;
              }
            }
            
            // 计算折扣显示值（如：0.9 -> 9.0折）
            var discountDisplay = (discountRate * 10).toFixed(1);
            
            // 计算折扣后的价格
            _this.calculateDiscountedPrice(discountRate);
            
            _this.setData({
              member_discount: discountRate,
              member_level: memberLevel,
              discount_display: discountDisplay
            });
            
            // 如果规格弹窗打开着，重新计算会员价
            if (!_this.data.specifications_hid && _this.data.window_price) {
              var memberDiscountedPrice = (_this.data.window_price * discountRate).toFixed(2);
              _this.setData({
                member_discounted_price: memberDiscountedPrice
              });
            }
            
            wx.showToast({
              title: `已应用${memberLevel}折扣`,
              icon: 'success',
              duration: 2000
            });
            
            console.log('会员折扣计算完成:', {
              username: memberUsername,
              points: memberPoints,
              level: memberLevel,
              discount: discountRate,
              discountDisplay: discountDisplay
            });
          },
          fail: err2 => {
            console.log('获取会员等级规则失败:', err2);
            // 如果查询失败，使用默认值
            _this.applyDefaultDiscount('无等级');
          }
        });
      } else {
        console.log('未找到会员信息');
        wx.showToast({
          title: '未找到会员信息',
          icon: 'none'
        });
      }
    },
    fail: err1 => {
      console.log('查询会员信息失败:', err1);
      wx.showToast({
        title: '获取会员信息失败',
        icon: 'none'
      });
    }
  });
},

// 新增函数：计算折扣后的价格
// 新增函数：计算折扣后的价格
calculateDiscountedPrice: function(discountRate) {
  var _this = this;
  var cartList = _this.data.cart_list;
  
  if (cartList.length === 0) return;
  
  // 深拷贝购物车列表
  var newCartList = JSON.parse(JSON.stringify(cartList));
  var totalAmount = 0;
  var discountedAmount = 0;
  
  // 计算折扣后的价格
  for (var i = 0; i < newCartList.length; i++) {
    var item = newCartList[i];
    
    // 原价金额
    var originalPrice = parseFloat(item.dj) || 0;
    var quantity = parseFloat(item.gs) || 0;
    var originalAmount = originalPrice * quantity;
    
    // 折扣后单价
    var discountedPrice = originalPrice * discountRate;
    var discountedItemAmount = discountedPrice * quantity;
    
    // 更新购物车项
    newCartList[i].zhdj = discountedPrice.toFixed(2); // 折扣后单价
    newCartList[i].zhje = discountedItemAmount.toFixed(2); // 折扣后金额
    newCartList[i].dzbl = discountRate; // 折扣比例
    
    totalAmount += originalAmount;
    discountedAmount += discountedItemAmount;
  }
  
  // 计算折扣显示值
  var discountDisplay = (discountRate * 10).toFixed(1);
  
  // 更新数据
  _this.setData({
    cart_list: newCartList,
    price_sum: discountedAmount.toFixed(2), // 显示折扣后总价
    original_price_sum: totalAmount.toFixed(2), // 保存原总价
    discount_display: discountDisplay,
    discount_saved: (totalAmount - discountedAmount).toFixed(2) // 节省金额
  });
  
  console.log('折扣计算完成:', {
    discountRate: discountRate,
    totalAmount: totalAmount,
    discountedAmount: discountedAmount,
    saved: totalAmount - discountedAmount
  });
},

  // order_insert:function(){
  //   var _this = this
  //   var cart_list = _this.data.cart_list
  //   console.log(cart_list)
  //   var ddh = _this.data.orders_value
  //   var myDate = new Date()
  //   var year = myDate.getFullYear()
  //   var month = myDate.getMonth()+1
  //   var day = myDate.getDate()
  //   var fixedvalue = 1
  //   if (month < 10){
  //       month = '0' + month;
  //   }
  //   if(day <10){
  //       day = '0' + day;
  //   }
  //   var riqi = year + "-" + month + "-" + day
  //   var hyzh = _this.data.member_zhanghao
  //   var hyxm = _this.data.member_xingming
  //   var yhfa = 1
  //   var xfje = ""
  //   var ssje = ""
  //   var yhje = ""
  //   var syy = _this.data.userInfo.uname
  //   var company = _this.data.userInfo.gongsi
  //   var hyjf = ""
  //   if(cart_list.length == 0){
  //     wx.showToast({
  //       title: '购物车为空！',
  //       icon: 'none',
  //       duration: 3000
  //     })
  //     return;
  //   }
  //   if(hyzh == ''){
  //     wx.showToast({
  //       title: '未选择会员！',
  //       icon: 'none',
  //       duration: 3000
  //     })
  //     return;
  //   }
  //   var sql1 = "insert into orders_details(ddid,cplx,cpmc,dw,dj,dzbl,zhdj,zhje,gs,company) values "
  //   var sql2 = ""
  //   var sql3 = "insert into orders(riqi,ddh,hyzh,hyxm,yhfa,xfje,ssje,yhje,syy,company,hyjf) values('" + riqi + "','" + ddh + "','" + hyzh + "','" + hyxm + "','" + yhfa + "','" + xfje + "','" + ssje + "','" + yhje + "','" + syy + "','" + company + "','" + hyjf + "')"
  //   for(var i=0; i<cart_list.length; i++){
  //     if(sql2 == ''){
  //       sql2 = "('" + ddh + "','" + cart_list[i].cplx + "','" + cart_list[i].cpmc + "','" + cart_list[i].dw + "','" + cart_list[i].dj + "','" + cart_list[i].dzbl + "','" + cart_list[i].zhdj + "','" + cart_list[i].zhje + "','" + cart_list[i].gs + "','" + company +  "')"
  //     }else{
  //       sql2 = sql2 + ",('" + ddh + "','" + cart_list[i].cplx + "','" + cart_list[i].cpmc + "','" + cart_list[i].dw + "','" + cart_list[i].dj + "','" + cart_list[i].dzbl + "','" + cart_list[i].zhdj + "','" + cart_list[i].zhje + "','" + cart_list[i].gs + "','" + company +  "')"
  //     }
  //   }

  //   console.log(sql3 + ";" + sql1 + sql2)
  //   wx.cloud.callFunction({
  //     name: 'sqlserver_xinyongka',
  //     data: {
  //       sql: sql3
  //     },
  //     success: res => {
  //       wx.cloud.callFunction({
  //         name: 'sqlserver_xinyongka',
  //         data: {
  //           sql: sql1 + sql2
  //         },
  //         success: res => {
  //           wx.showToast({
  //             title: "添加成功！",
  //             icon: "none"
  //           })
  //           _this.closePopup()
  //           _this.closejiesuan()
  //           var myDate = new Date()
  //           var year = myDate.getFullYear()
  //           var month = myDate.getMonth()+1
  //           var day = myDate.getDate()
  //           if (month < 10){
  //               month = '0' + month;
  //           }
  //           if(day <10){
  //               day = '0' + day;
  //           }
  //           var orders_value = year.toString()+month.toString()+day.toString()
  //           wx.cloud.callFunction({
  //             name: 'sqlserver_xinyongka',
  //             data: {
  //               sql: "select max(ddh) as ddh from orders where company ='" + _this.data.userInfo.gongsi + "' and ddh like '" + orders_value + "%'"
  //             },
  //           success: res => {
  //             console.log("select-success", res)
  //             var list = res.result
  //             console.log(list)
  //             if(list[0].ddh != null){
  //               console.log(list[0].ddh * 1 + 1)
  //               _this.setData({
  //                 orders_value: list[0].ddh * 1 + 1
  //               })
  //             }else{
  //               console.log(orders_value + "0001")
  //               _this.setData({
  //                 orders_value:orders_value + "0001"
  //               })
  //             }
  //           },
  //           fail: res=> {
  //               console.log("select-fail",res)
  //             }
  //           })
  //           console.log(res)
  //         },
  //         fail: res => {
  //           console.log(res)
  //         }
  //       })
  //     },
  //     error: res => {
  //       console.log(res)
  //     },
  //     fail: res => {
  //       console.log(res)
  //     }
  //   })
  // },
//-----新0130
order_insert:function() {
  var _this = this
  var cart_list = _this.data.cart_list
  console.log(cart_list)
  
  // 检查购物车是否为空
  if(cart_list.length == 0){
    wx.showToast({
      title: '购物车为空！',
      icon: 'none',
      duration: 3000
    })
    return;
  }
  
  // 如果没有选择会员，弹出确认框
  if(_this.data.member_zhanghao == '' || _this.data.member_xingming == ''){
    wx.showModal({
      title: '提示',
      content: '确定不选择会员直接结账吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: function(res) {
        if (res.confirm) {
          // 用户点击确定，执行结账操作
          _this.executeOrderInsert();
        } else if (res.cancel) {
          // 用户点击取消，返回选择会员
          console.log('用户取消结账');
        }
      }
    });
  } else {
    // 如果已选择会员，直接执行结账
    _this.executeOrderInsert();
  }
},

// 将原来的结账逻辑提取到单独的函数中
executeOrderInsert: function() {
  var _this = this;
  var cart_list = _this.data.cart_list;
  var ddh = _this.data.orders_value;
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  var fixedvalue = 1;
  
  if (month < 10){
    month = '0' + month;
  }
  if(day <10){
    day = '0' + day;
  }
  
  var riqi = year + "-" + month + "-" + day;
  var hyzh = _this.data.member_zhanghao || '';  // 如果没有选择会员，设为空字符串
  var hyxm = _this.data.member_xingming || '';  // 如果没有选择会员，设为空字符串
  var yhfa = 1;
  var xfje = "";
  var ssje = "";
  var yhje = "";
  var syy = _this.data.userInfo.uname;
  var company = _this.data.userInfo.gongsi;
  var hyjf = "";
  
  var sql1 = "insert into orders_details(ddid,cplx,cpmc,dw,dj,dzbl,zhdj,zhje,gs,company) values ";
  var sql2 = "";
  var sql3 = "insert into orders(riqi,ddh,hyzh,hyxm,yhfa,xfje,ssje,yhje,syy,company,hyjf) values('" + riqi + "','" + ddh + "','" + hyzh + "','" + hyxm + "','" + yhfa + "','" + xfje + "','" + ssje + "','" + yhje + "','" + syy + "','" + company + "','" + hyjf + "')";
  
  for(var i=0; i<cart_list.length; i++){
    if(sql2 == ''){
      sql2 = "('" + ddh + "','" + cart_list[i].cplx + "','" + cart_list[i].cpmc + "','" + cart_list[i].dw + "','" + cart_list[i].dj + "','" + cart_list[i].dzbl + "','" + cart_list[i].zhdj + "','" + cart_list[i].zhje + "','" + cart_list[i].gs + "','" + company +  "')";
    }else{
      sql2 = sql2 + ",('" + ddh + "','" + cart_list[i].cplx + "','" + cart_list[i].cpmc + "','" + cart_list[i].dw + "','" + cart_list[i].dj + "','" + cart_list[i].dzbl + "','" + cart_list[i].zhdj + "','" + cart_list[i].zhje + "','" + cart_list[i].gs + "','" + company +  "')";
    }
  }

  console.log(sql3 + ";" + sql1 + sql2);
  
  wx.cloud.callFunction({
    name: 'sqlserver_xinyongka',
    data: {
      sql: sql3
    },
    success: res => {
      wx.cloud.callFunction({
        name: 'sqlserver_xinyongka',
        data: {
          sql: sql1 + sql2
        },
        success: res => {
          wx.showToast({
            title: "添加成功！",
            icon: "success",
            duration: 2000
          });
          
          _this.closePopup();
          _this.closejiesuan();
          
          var myDate = new Date();
          var year = myDate.getFullYear();
          var month = myDate.getMonth()+1;
          var day = myDate.getDate();
          
          if (month < 10){
            month = '0' + month;
          }
          if(day <10){
            day = '0' + day;
          }
          
          var orders_value = year.toString() + month.toString() + day.toString();
          
          wx.cloud.callFunction({
            name: 'sqlserver_xinyongka',
            data: {
              sql: "select max(ddh) as ddh from orders where company ='" + _this.data.userInfo.gongsi + "' and ddh like '" + orders_value + "%'"
            },
            success: res => {
              console.log("select-success", res);
              var list = res.result;
              console.log(list);
              if(list[0].ddh != null){
                console.log(list[0].ddh * 1 + 1);
                _this.setData({
                  orders_value: list[0].ddh * 1 + 1
                });
              }else{
                console.log(orders_value + "0001");
                _this.setData({
                  orders_value: orders_value + "0001"
                });
              }
            },
            fail: res=> {
              console.log("select-fail",res);
            }
          });
          
          console.log(res);
        },
        fail: res => {
          console.log(res);
          wx.showToast({
            title: "订单详情添加失败",
            icon: "none"
          });
        }
      });
    },
    error: res => {
      console.log(res);
      wx.showToast({
        title: "订单添加失败",
        icon: "none"
      });
    },
    fail: res => {
      console.log(res);
      wx.showToast({
        title: "网络错误",
        icon: "none"
      });
    }
  });
},
  type_click:function(e) {
    var _this = this
    var this_name = e.currentTarget.dataset.name;
    console.log(this_name)
    var sql = ""
    if(this_name == '全部'){
      // sql = "select *,'' as price_look from product where company ='" + _this.data.userInfo.gongsi + "'"
      sql = "select *,'' as price_look from product where company ='" + _this.data.userInfo.gongsi + "' and (tingyong != '是' or tingyong is null or tingyong = '')"
    }else{
      // sql = "select *,'' as price_look from product where company ='" +  _this.data.userInfo.gongsi +"' and type ='" + this_name + "'"
      sql = "select *,'' as price_look from product where company ='" +  _this.data.userInfo.gongsi +"' and type ='" + this_name + "' and (tingyong != '是' or tingyong is null or tingyong = '')"
    }
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        console.log("select-success", res)
        var list = res.result
        for(var i=0; i<list.length; i++){
          list[i].price_look = list[i].price.split(",")[0]
        }
        _this.setData({
          product_list:list
        })
      },
      fail: res=> {
        console.log("select-fail",res)
      }
    })
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    switch (e) {
      const{current} = e.currentTarget.dataset
      this.setData({
        current
      })
    }
  },
   // 打开全屏弹窗
   openFullscreenPopup: function(e) {
    const index = e.currentTarget.dataset.index;
    const product = this.data.product_list[index];
    const productName = product.product_name;
    
    this.setData({
      fullscreen_hid: false,
      selectedProduct: product,
      imageList: [],
      currentImageIndex: 0
    });
    
    this.getProductDetail(productName);
  },

  getProductDetail: function(productName) {
    const _this = this;
    
    wx.showLoading({
      title: '加载中...',
    });
    
    let sql = "SELECT * FROM product WHERE product_name = '" + productName + "'";
    
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
      },
      success: res => {
        wx.hideLoading();
        console.log('商品详情请求成功:', res);
        
        if (res.result && res.result.length > 0) {
          const productDetail = res.result[0];
          
          // 处理图片数据
          const imageList = _this.processProductImages(productDetail);
          
          _this.setData({
            selectedProduct: productDetail,
            imageList: imageList,
            currentImageIndex: 0
          });
          
          wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 1000
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('商品详情请求失败:', err);
      }
    });
  },
  processProductImages: function(productDetail) {
    const imageList = [];
    
    // 检查 photo 字段
    if (productDetail.photo && productDetail.photo.trim() !== '') {
      const photoUrl = productDetail.photo.includes('base64,') 
        ? productDetail.photo 
        : 'data:image/jpeg;base64,' + productDetail.photo;
      imageList.push(photoUrl);
    }
    
    // 检查 photo1 字段
    if (productDetail.photo1 && productDetail.photo1.trim() !== '') {
      const photo1Url = productDetail.photo1.includes('base64,') 
        ? productDetail.photo1 
        : 'data:image/jpeg;base64,' + productDetail.photo1;
      imageList.push(photo1Url);
    }
    
    // 检查 photo2 字段
    if (productDetail.photo2 && productDetail.photo2.trim() !== '') {
      const photo2Url = productDetail.photo2.includes('base64,') 
        ? productDetail.photo2 
        : 'data:image/jpeg;base64,' + productDetail.photo2;
      imageList.push(photo2Url);
    }
    
    console.log('处理后的图片列表:', {
      count: imageList.length,
      images: imageList.map((img, index) => `图片${index + 1}: ${img.substring(0, 50)}...`)
    });
    
    return imageList;
  },

  // 轮播图切换事件
  onImageSwiperChange: function(e) {
    this.setData({
      currentImageIndex: e.detail.current
    });
  },

  // 手动切换图片
  switchImage: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentImageIndex: index
    });
  },


  // 关闭全屏弹窗
  closeFullscreenPopup: function() {
    this.setData({
      fullscreen_hid: true,
      selectedProduct: {},
      imageList: [],
      currentImageIndex: 0
    });
  },

  // 从全屏弹窗打开规格选择
  openPopupFromFullscreen: function() {
    // 先关闭全屏弹窗
    this.setData({
      fullscreen_hid: true
    });
    
    // 延迟一下再打开规格弹窗，避免冲突
    setTimeout(() => {
      // 这里需要根据selectedProduct找到对应的index
      const productList = this.data.product_list;
      const selectedIndex = productList.findIndex(item => 
        item.product_name === this.data.selectedProduct.product_name
      );
      
      if (selectedIndex !== -1) {
        this.openPopup({ currentTarget: { dataset: { index: selectedIndex } } });
      }
    }, 300);
  },
  stopPropagation: function(e) {
    // 空函数，只是为了阻止事件冒泡
  },

})