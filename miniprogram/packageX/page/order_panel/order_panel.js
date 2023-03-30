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
  },

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var window_guige = _this.data.guige_list[e.detail.value]
    console.log(window_guige)
    _this.setData({
      window_guige: window_guige,
      window_price: _this.data.price_list[e.detail.value]
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
      window_photo:_this.data.product_list[index].photo
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
    if(_this.data.window_name == ''){
      wx.showToast({
        title: '未读取到商品名称！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(_this.data.window_num == ''){
      wx.showToast({
        title: '未读取到商品数量！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(_this.data.window_guige == ''){
      wx.showToast({
        title: '未读取到商品规格！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    
    cartlist.push({
      cplx:_this.data.window_type,
      cpmc:_this.data.window_name,
      gs:_this.data.window_num,
      dw:_this.data.window_unit,
      dj:_this.data.window_price,
      dzbl:1,
      zhdj:_this.data.window_price,
      zhje:_this.data.window_price * _this.data.window_num
    })
    console.log(cartlist)
    var this_num = 0
    var this_price = 0
    for(var i=0; i<cartlist.length; i++){
      this_num = this_num + cartlist[i].gs * 1
      this_price = this_price + cartlist[i].zhje * 1
    }
    _this.setData({
      num_sum:this_num,
      price_sum:this_price,
      cart_list:cartlist,
      specifications_hid:true,
      mask_hid:true
    })
  },

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
    var sql2 = "select type,product_name,unit,price,photo,specifications,practice from product where company ='" + userInfo.gongsi + "'"
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

  member_click:function(e){
    var _this = this
    var index = e.currentTarget.dataset.index;
    console.log(index)
    _this.setData({
      member_zhanghao:_this.data.member_list[index].username,
      member_xingming:_this.data.member_list[index].name,
      member_hid:true,
    })
  },

  order_insert:function(){
    var _this = this
    var cart_list = _this.data.cart_list
    console.log(cart_list)
    var ddh = _this.data.orders_value
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
    var riqi = year + "-" + month + "-" + day
    var hyzh = _this.data.member_zhanghao
    var hyxm = _this.data.member_xingming
    var yhfa = 1
    var xfje = ""
    var ssje = ""
    var yhje = ""
    var syy = _this.data.userInfo.uname
    var company = _this.data.userInfo.gongsi
    var hyjf = ""
    if(cart_list.length == 0){
      wx.showToast({
        title: '购物车为空！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if(hyzh == ''){
      wx.showToast({
        title: '未选择会员！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var sql1 = "insert into orders_details(ddid,cplx,cpmc,dw,dj,dzbl,zhdj,zhje,gs,company) values "
    var sql2 = ""
    var sql3 = "insert into orders(riqi,ddh,hyzh,hyxm,yhfa,xfje,ssje,yhje,syy,company,hyjf) values('" + riqi + "','" + ddh + "','" + hyzh + "','" + hyxm + "','" + yhfa + "','" + xfje + "','" + ssje + "','" + yhje + "','" + syy + "','" + company + "','" + hyjf + "')"
    for(var i=0; i<cart_list.length; i++){
      if(sql2 == ''){
        sql2 = "('" + ddh + "','" + cart_list[i].cplx + "','" + cart_list[i].cpmc + "','" + cart_list[i].dw + "','" + cart_list[i].dj + "','" + cart_list[i].dzbl + "','" + cart_list[i].zhdj + "','" + cart_list[i].zhje + "','" + cart_list[i].gs + "','" + company +  "')"
      }else{
        sql2 = sql2 + ",('" + ddh + "','" + cart_list[i].cplx + "','" + cart_list[i].cpmc + "','" + cart_list[i].dw + "','" + cart_list[i].dj + "','" + cart_list[i].dzbl + "','" + cart_list[i].zhdj + "','" + cart_list[i].zhje + "','" + cart_list[i].gs + "','" + company +  "')"
      }
    }

    console.log(sql3 + ";" + sql1 + sql2)
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
              icon: "none"
            })
            _this.closePopup()
            _this.closejiesuan()
            var myDate = new Date()
            var year = myDate.getFullYear()
            var month = myDate.getMonth()+1
            var day = myDate.getDate()
            if (month < 10){
                month = '0' + month;
            }
            if(day <10){
                day = '0' + day;
            }
            var orders_value = year.toString()+month.toString()+day.toString()
            wx.cloud.callFunction({
              name: 'sqlserver_xinyongka',
              data: {
                sql: "select max(ddh) as ddh from orders where company ='" + _this.data.userInfo.gongsi + "' and ddh like '" + orders_value + "%'"
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
            console.log(res)
          },
          fail: res => {
            console.log(res)
          }
        })
      },
      error: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  type_click:function(e) {
    var _this = this
    var this_name = e.currentTarget.dataset.name;
    console.log(this_name)
    var sql = ""
    if(this_name == '全部'){
      sql = "select * from product where company ='" + _this.data.userInfo.gongsi + "'"
    }else{
      sql = "select * from product where company ='" +  _this.data.userInfo.gongsi +"' and type ='" + this_name + "'"
    }
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: {
        sql: sql
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
  }
})