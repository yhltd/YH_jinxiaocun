// 100lie_page/pages/work_bench/work_bench.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initHidView :　true,
    empty : "",
    userInfo : "",
    this_quanxian:"",
    this_where : ['','日期','1900-01-01','2100-12-31'],
    isDate : true,
    shenheren: "",
    countPage : 20, //每一页显示的数据数据数量
    pageCount : 0, //总页数
    pageNum : 1, //当前页 
    page_arr:[10,20,50,100],
    hid_view : true,
    where : "",
    animationData_countPage :[],
    quanxian_list:{
      C:'',D:'',E:'',F:'',G:'',H:'',I:'',J:'',K:'',L:'',M:'',N:'',O:'',P:'',Q:'',R:'',S:'',T:'',U:'',V:'',W:'',X:'',Y:'',Z:'',
      AA:'',AB:'',AC:'',AD:'',AE:'',AF:'',AG:'',AH:'',AI:'',AJ:'',AK:'',AL:'',AM:'',AN:'',AO:'',AP:'',AQ:'',AR:'',ASS:'',AT:'',AU:'',AV:'',AW:'',AX:'',AY:'',AZ:'',
      BA:'',BB:'',BC:'',BD:'',BE:'',BF:'',BG:'',BH:'',BI:'',BJ:'',BK:'',BL:'',BM:'',BN:'',BO:'',BP:'',BQ:'',BR:'',BS:'',BT:'',BU:'',BV:'',BW:'',BX:'',BYY:'',BZ:'',
      CA:'',CB:'',CC:'',CD:'',CE:'',CF:'',CG:'',CH:'',CI:'',CJ:'',CK:'',CL:'',CM:'',CN:'',CO:'',CP:'',CQ:'',CR:'',CS:'',CT:'',CU:'',CV:'',CW:'',CX:''
    },
    list : {},
    titil : [
      {text:"序号",width:"100rpx",columnName:"ROW_ID",hidden:false},
      {text:"人员",width:"200rpx",columnName:"人员",hidden:false},
      {text:"录入时间",width:"220rpx",columnName:"日期",hidden:false},
      {text:"最后修改时间",width:"220rpx",columnName:"a最后修改日期",hidden:false},
      {text:"A",width:"300rpx",columnName:"A"},{text:"B",width:"300rpx",columnName:"B",hidden:false},{text:"C",width:"300rpx",columnName:"C",hidden:false},{text:"D",width:"300rpx",columnName:"D",hidden:false},{text:"E",width:"300rpx",columnName:"E",hidden:false},{text:"F",width:"300rpx",columnName:"F",hidden:false},{text:"G",width:"300rpx",columnName:"G",hidden:false},{text:"H",width:"300rpx",columnName:"H",hidden:false},
      {text:"I",width:"300rpx",columnName:"I",hidden:false},{text:"J",width:"300rpx",columnName:"J",hidden:false},{text:"K",width:"300rpx",columnName:"K",hidden:false},{text:"L",width:"300rpx",columnName:"L",hidden:false},{text:"M",width:"300rpx",columnName:"M",hidden:false},{text:"N",width:"300rpx",columnName:"N",hidden:false},{text:"O",width:"300rpx",columnName:"O",hidden:false},{text:"P",width:"300rpx",columnName:"P",hidden:false},
      {text:"Q",width:"300rpx",columnName:"Q",hidden:false},{text:"R",width:"300rpx",columnName:"R",hidden:false},{text:"S",width:"300rpx",columnName:"S",hidden:false},{text:"T",width:"300rpx",columnName:"T",hidden:false},{text:"U",width:"300rpx",columnName:"U",hidden:false},{text:"V",width:"300rpx",columnName:"V",hidden:false},{text:"W",width:"300rpx",columnName:"W",hidden:false},{text:"X",width:"300rpx",columnName:"X",hidden:false},
      {text:"Y",width:"300rpx",columnName:"Y",hidden:false},{text:"Z",width:"300rpx",columnName:"Z",hidden:false},
      {text:"AA",width:"300rpx",columnName:"AA",hidden:false},{text:"AB",width:"300rpx",columnName:"AB",hidden:false},{text:"AC",width:"300rpx",columnName:"AC",hidden:false},{text:"AD",width:"300rpx",columnName:"AD",hidden:false},{text:"AE",width:"300rpx",columnName:"AE",hidden:false},{text:"AF",width:"300rpx",columnName:"AF",hidden:false},{text:"AG",width:"300rpx",columnName:"AG",hidden:false},{text:"AH",width:"300rpx",columnName:"AH",hidden:false},
      {text:"AI",width:"300rpx",columnName:"AI",hidden:false},{text:"AJ",width:"300rpx",columnName:"AJ",hidden:false},{text:"AK",width:"300rpx",columnName:"AK",hidden:false},{text:"AL",width:"300rpx",columnName:"AL",hidden:false},{text:"AM",width:"300rpx",columnName:"AM",hidden:false},{text:"AN",width:"300rpx",columnName:"AN",hidden:false},{text:"AO",width:"300rpx",columnName:"AO",hidden:false},{text:"AP",width:"300rpx",columnName:"AP",hidden:false},
      {text:"AQ",width:"300rpx",columnName:"AQ",hidden:false},{text:"AR",width:"300rpx",columnName:"AR",hidden:false},{text:"AS",width:"300rpx",columnName:"ASS",hidden:false},{text:"AT",width:"300rpx",columnName:"AT",hidden:false},{text:"AU",width:"300rpx",columnName:"AU",hidden:false},{text:"AV",width:"300rpx",columnName:"AV",hidden:false},{text:"AW",width:"300rpx",columnName:"AW",hidden:false},{text:"AX",width:"300rpx",columnName:"AX",hidden:false},
      {text:"AY",width:"300rpx",columnName:"AY",hidden:false},{text:"AZ",width:"300rpx",columnName:"AZ",hidden:false},
      {text:"BA",width:"300rpx",columnName:"BA",hidden:false},{text:"BB",width:"300rpx",columnName:"BB",hidden:false},{text:"BC",width:"300rpx",columnName:"BC",hidden:false},{text:"BD",width:"300rpx",columnName:"BD",hidden:false},{text:"BE",width:"300rpx",columnName:"BE",hidden:false},{text:"BF",width:"300rpx",columnName:"BF",hidden:false},{text:"BG",width:"300rpx",columnName:"BG",hidden:false},{text:"BH",width:"300rpx",columnName:"BH",hidden:false},
      {text:"BI",width:"300rpx",columnName:"BI",hidden:false},{text:"BJ",width:"300rpx",columnName:"BJ",hidden:false},{text:"BK",width:"300rpx",columnName:"BK",hidden:false},{text:"BL",width:"300rpx",columnName:"BL",hidden:false},{text:"BM",width:"300rpx",columnName:"BM",hidden:false},{text:"BN",width:"300rpx",columnName:"BN",hidden:false},{text:"BO",width:"300rpx",columnName:"BO",hidden:false},{text:"BP",width:"300rpx",columnName:"BP",hidden:false},
      {text:"BQ",width:"300rpx",columnName:"BQ",hidden:false},{text:"BR",width:"300rpx",columnName:"BR",hidden:false},{text:"BS",width:"300rpx",columnName:"BS",hidden:false},{text:"BT",width:"300rpx",columnName:"BT",hidden:false},{text:"BU",width:"300rpx",columnName:"BU",hidden:false},{text:"BV",width:"300rpx",columnName:"BV",hidden:false},{text:"BW",width:"300rpx",columnName:"BW",hidden:false},{text:"BX",width:"300rpx",columnName:"BX",hidden:false},
      {text:"BY",width:"300rpx",columnName:"BYY",hidden:false},{text:"BZ",width:"300rpx",columnName:"BZ",hidden:false},
      {text:"CA",width:"300rpx",columnName:"CA",hidden:false},{text:"CB",width:"300rpx",columnName:"CB",hidden:false},{text:"CC",width:"300rpx",columnName:"CC",hidden:false},{text:"CD",width:"300rpx",columnName:"CD",hidden:false},{text:"CE",width:"300rpx",columnName:"CE",hidden:false},{text:"CF",width:"300rpx",columnName:"CF",hidden:false},{text:"CG",width:"300rpx",columnName:"CG",hidden:false},{text:"CH",width:"300rpx",columnName:"CH",hidden:false},
      {text:"CI",width:"300rpx",columnName:"CI",hidden:false},{text:"CJ",width:"300rpx",columnName:"CJ",hidden:false},{text:"CK",width:"300rpx",columnName:"CK",hidden:false},{text:"CL",width:"300rpx",columnName:"CL",hidden:false},{text:"CM",width:"300rpx",columnName:"CM",hidden:false},{text:"CN",width:"300rpx",columnName:"CN",hidden:false},{text:"CO",width:"300rpx",columnName:"CO",hidden:false},{text:"CP",width:"300rpx",columnName:"CP",hidden:false},
      {text:"CQ",width:"300rpx",columnName:"CQ",hidden:false},{text:"CR",width:"300rpx",columnName:"CR",hidden:false},{text:"CS",width:"300rpx",columnName:"CS",hidden:false},{text:"CT",width:"300rpx",columnName:"CT",hidden:false},{text:"CU",width:"300rpx",columnName:"CU",hidden:false},{text:"CV",width:"300rpx",columnName:"CV",hidden:false}
    ],
    animationData_input : "",
    value_input : "",
    index_input : "",
    column_input : "",
    input_type : "text",
    money_type : "",
    dateArray : [
      {text:"年",name:"year",value:""},
      {text:"月",name:"month",value:""},
      {text:"日",name:"day",value:""},
      {text:"时",name:"hour",value:""},
      {text:"分",name:"minute",value:""},
      {text:"秒",name:"second",value:""},
    ],
    accounting_arr : [],
    animationData_upd_code : "",

    upd_index : 0,

    animationData_moreDo_view : "",
    animationData_select_view : "",
    options:[
      {
        items : [],
        text : "",
        selectHid : true,
        columnName : "word"
      }
    ],
    isSelect : false,
    examine : false,
    checkItems : [],
    animationData_examine : [],
    zeng:'否',
    shan:'否',
    gai:'否',
    cha:'否',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo,
    })


    var sql = "select * from baitaoquanxian_gongsi where B='" + userInfo.B + "'; select * from baitaoquanxian_copy1 where renyuan_id ='" + userInfo.renyuan_id + "' and chashanquanxian ='修改'; select C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP,AQ,AR,ASS,AT,AU,AV,AW,AX,AY,AZ,BA,BB,BC,BD,BE,BF,BG,BH,BI,BJ,BK,BL,BM,BN,BO,BP,BQ,BR,BS,BT,BU,BV,BW,BX,BYY,BZ,CA,CB,CC,CD,CE,CF,CG,CH,CI,CJ,CK,CL,CM,CN,CO,CP,CQ,CR,CS,CT,CU,CV,CW,CX from baitaoquanxian_copy1 where renyuan_id ='" + userInfo.renyuan_id + "' and chashanquanxian ='查询';select ins,del,upd,sel from baitaoquanxian_department where company='" + _this.data.userInfo.B + "' and view_name ='工作台' and department_name ='" + _this.data.userInfo.bumen + "'"

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        var list1 = res.result.recordsets[0]
        var list2 = res.result.recordsets[1]
        var list3 = res.result.recordsets[2]
        var list4 = res.result.recordsets[3]
        var titil = _this.data.titil
        console.log(list1)
        console.log(list2)
        console.log(list3)
        console.log(list4)
        if(list4 == []){
          wx.showToast({
            title: '未读取到部门权限信息，请联系管理员！',
            icon : 'none'
          })
          return;
        }else{
          _this.setData({
            zeng:list4[0].ins,
            shan:list4[0].del,
            gai:list4[0].upd,
            cha:list4[0].sel,
          })
        }
        if(_this.data.cha !='是'){
          wx.showToast({
            title: '无查询权限！',
            icon : 'none'
          })
          return;
        }
        var quanxian_list = _this.data.quanxian_list
        var quanxian_arr=[
          'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
          'AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','ASS','AT','AU','AV','AW','AX','AY','AZ',
          'BA','BB','BC','BD','BE','BF','BG','BH','BI','BJ','BK','BL','BM','BN','BO','BP','BQ','BR','BS','BT','BU','BV','BW','BX','BYY','BZ',
          'CA','CB','CC','CD','CE','CF','CG','CH','CI','CJ','CK','CL','CM','CN','CO','CP','CQ','CR','CS','CT','CU','CV','CW','CX'
        ]
        for(var i=4; i<titil.length; i++){
          if(list3[0][quanxian_arr[i-4]] == "√"){
            titil[i].hidden = false
          }else{
            titil[i].hidden = true
          }
        }
        console.log(titil)

        for(var i=0; i<quanxian_arr.length; i++){
          if(list1[0][quanxian_arr[i]] == "√" && list2[0][quanxian_arr[i]] == "√"){
            quanxian_list[quanxian_arr[i]] = "√"
          }
        }
        console.log(quanxian_list)
        _this.setData({
          titil:titil,
          quanxian_list:quanxian_list
        })

        var e=['','日期','1900-01-01','2100-12-31']
        _this.init(e)
        _this.hid_view()
      },
      err: res => {
        console.log("错误!")
      },
      fail : res=>{
        wx.showToast({
          title: '请求失败！',
          icon : 'none'
        })
        console.log("请求失败！")
      }
    })

  },

  
bindPickerChange1: function(e) {
  var _this = this
  _this.setData({
    countPage: _this.data.page_arr[e.detail.value]
  })
},

  clickView : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var upd_db_id = e.currentTarget.dataset.id
    var column = e.currentTarget.dataset.column;
    var value = e.currentTarget.dataset.value;
    var input_type = e.currentTarget.dataset.input_type;
    var money_type = e.currentTarget.dataset.money_type;
    if(_this.data.gai !='是'){
      wx.showToast({
        title: '无修改权限！',
        icon : 'none'
      })
      return;
    }
    var sql= "select " + column + " from baitaoquanxian_copy2 where 公司='" + _this.data.userInfo.B + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        if(list[0][column] != '' && list[0][column] != _this.data.userInfo.C){
          wx.showToast({
            title: '此列已被占用！',
            icon : 'none'
          })
          return;
        }else{
          wx.cloud.callFunction({
            name : "sqlServer_117",
            data : {
              query: "update baitaoquanxian_copy2 set ["+column+"] = '"+_this.data.userInfo.C+"' where 公司 = '" + _this.data.userInfo.B+"'"
            },
            success : res=>{
              console.log('已占用' + column + '列')
              _this.setData({
                value_input : value,
                index_input : index,
                column_input : column,
                upd_db_id,
                money_type
              })
          
              if(input_type=="date"){
                if(value!=""){
                  var arr = value.split(" ");
                  var arr1 = arr[0].split("-")
                  var arr2 = arr[1].split(":")
                  _this.setData({
                    ["dateArray["+0+"].value"] : arr1[0],
                    ["dateArray["+1+"].value"] : arr1[1],
                    ["dateArray["+2+"].value"] : arr1[2],
                    ["dateArray["+3+"].value"] : arr2[0],
                    ["dateArray["+4+"].value"] : arr2[1],
                    ["dateArray["+5+"].value"] : arr2[2]
                  })
                }
                _this.setData({
                  isDate : false,
                  input_type: "date"
                })
              }else{
                _this.setData({
                  isDate : true,
                  input_type: "text"
                })
              }
          
              _this.showView(_this,"input");
            },
            err : res =>{
              console.log('错误')
            }
          })
        }
        console.log(list)
      },
      err: res => {
        console.log("错误!")
      },
      fail : res=>{
        wx.showToast({
          title: '请求失败！',
          icon : 'none'
        })
        console.log("请求失败！")
      }
    })

   
  },

  save: function(e){
    var _this = this;

    var new_value_input = ""
    var new_value_input = e.detail.value.new
    if(new_value_input==""){
      new_value_input = _this.data.value_input
    }
    
    var index = _this.data.index_input;
    var column = _this.data.column_input;
    var id = _this.data.upd_db_id

    _this.hidView(_this,"input")
    
    _this.setData({
      ["list["+index+"]."+column] : new_value_input,
      empty : ""
    })


    var this_time = _this.getNowTime()
    wx.cloud.callFunction({
      name : "sqlServer_117",
      data : {
        query: "update baitaoquanxian set ["+column+"] = '"+new_value_input+"',a最后修改日期=convert(date,'" + this_time + "') where id = '"+id+"'"
      },
      success : res=>{
        wx.showToast({
          title: "修改成功",
          icon : "none"
        })
      },
      err : res =>{
        wx.showToast({
          title: "错误",
          icon : "none"
        })
      }
    })
  },

  delete: function(e){
    var _this = this;
    if(_this.data.shan !='是'){
      wx.showToast({
        title: '无修改权限！',
        icon : 'none'
      })
      return;
    }
    wx.showModal({
      title : '提示',
      content : '确定删除吗？',
      cancelColor: '#009688',
      confirmColor : '#DD5044',
      success : res => {
        if (res.confirm) {
          let id = e.currentTarget.dataset.id
          wx.showLoading({
            title: '加载中',
            mask : 'true'
          })
          var sql = "delete from baitaoquanxian where id = '" + id + "';"
          wx.cloud.callFunction({
            name : 'sqlServer_117',
            data : {
              query : sql
            },
            success : res =>{
              wx.hideLoading({
                success: (res)=>{
                  var e = _this.data.this_where
                  _this.init(e);
                },
                complete: (res) => {
                  wx.showToast({
                    title: '删除成功',
                    icon : 'success'
                  })
                },
              })
            },
            err : res =>{
              console.log("错误："+res)
            },
            fail : res=>{
              console.log("请求失败！"+res)
            }
          })
        }
      }
    })
  },

  insert:function(){
    var _this = this
    var this_time = _this.getNowTime()
    wx.showModal({
      title : '提示',
      content : '确定添加一行吗？',
      cancelColor: '#009688',
      confirmColor : '#DD5044',
      success : res => {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
            mask : 'true'
          })
          var sql = "insert into baitaoquanxian(公司,人员,日期,a最后修改日期) values('" + _this.data.userInfo.B + "','" + _this.data.userInfo.C + "',convert(date,'" + this_time + "')" + ",convert(date,'" + this_time + "'));"
          console.log(sql)
          wx.cloud.callFunction({
            name : 'sqlServer_117',
            data : {
              query : sql
            },
            success : res =>{
              wx.hideLoading({
                success: (res)=>{
                  var e = _this.data.this_where
                  _this.init(e);
                  _this.hidView(_this,"moreDo")
                },
                complete: (res) => {
                  wx.showToast({
                    title: '添加成功',
                    icon : 'success'
                  })
                },
              })
            },
            err : res =>{
              console.log("错误："+res)
            },
            fail : res=>{
              console.log("请求失败！"+res)
            }
          })
        }
      }
    })
  },

  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"input")
    _this.hidView(_this,"countPage")
    _this.hidView(_this,"upd_code_input")
    _this.hidView(_this,"select")
    _this.hidView(_this,"moreDo")
    _this.hidView(_this,"examine")
  },

  hidView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    _this.setData({
      hid_view : false
    })

    switch(type){
      case "input":
        animation.translateX(-400).step()
        if(_this.data.column_input != '' && _this.data.column_input != undefined){
          var sql = "update baitaoquanxian_copy2 set " + _this.data.column_input + " ='' where 公司='" + _this.data.userInfo.B + "'"
          wx.cloud.callFunction({
            name : "sqlServer_117",
            data : {
              query: sql
            },
            success : res=>{
              console.log('解除占用成功')
            },
            err : res =>{
              console.log('解除占用错误')
            }
          })
        }

        _this.setData({
          animationData_input : animation.export(),
          value_input : "",
          index_input : "",
          column_input : ""
        })
        break;
      case "upd_code_input":
        animation.translateX(500).step()
        _this.setData({
          animationData_upd_code : animation.export()
        })
        break;
      case "select":
        animation.translateY(500).step()
        _this.setData({
          animationData_select_view : animation.export()
        })
        break;
      case "moreDo":
        animation.translateX(-300).step()
        _this.setData({
          animationData_moreDo_view : animation.export()
        })
        break;
      case "examine":
        animation.translateX(-400).step()
        _this.setData({
          animationData_examine : animation.export()
        })
        break;
      case "countPage":
        animation.translateX(-400).step()
        _this.setData({
          animationData_countPage : animation.export()
        })
        break;
    }
  },

  showSelect : function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    _this.showView(_this,"select")
  },

  showChoiceMonth1 : function(e){
    var _this = this;
    _this.setData({
      start_date: e.detail.value
    })
  },
  showChoiceMonth2 : function(e){
    var _this = this;
    _this.setData({
      stop_date: e.detail.value
    })
  },

  init : function(e){
    var _this = this;
    if(_this.data.cha !='是'){
      wx.showToast({
        title: '无查询权限！',
        icon : 'none'
      })
      return;
    }

    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    
    var userInfo = _this.data.userInfo;
    var pageNum = _this.data.pageNum;
    var countPage = _this.data.countPage;
    _this.getPageCount(e);
    var sql = "select *,ROW_NUMBER() over(order by 日期 desc) as ROW_ID from baitaoquanxian where 公司 = '"+userInfo.B+"' and 人员 like '%" + e[0] + "%'" 
    if(e[1] != ''){
      sql = sql + " and " + e[1] + " >= convert(date,'" + e[2] + "') and " + e[1] + " <= convert(date,'" + e[3] + "')"
    }
    sql = "select * from (" + sql + ") as a where a.ROW_ID > "+(pageNum-1)*countPage+" and a.ROW_ID < "+(pageNum*countPage+1)
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        for(var i=0; i<list.length; i++){
          var this_date = list[i]['日期'].split('T')
          list[i]['日期'] =  this_date[0]
          var this_date = list[i]['a最后修改日期'].split('T')
          list[i]['a最后修改日期'] =  this_date[0]
        }
        console.log(list)
        _this.setData({
          list:list
        })
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail : res=>{
        wx.showToast({
          title: '请求失败！',
          icon : 'none'
        })
        console.log("请求失败！")
      }
    })
  },

  select:function(e){
    var _this = this
    console.log(e.detail.value)
    var start_date = e.detail.value.start_date
    var stop_date = e.detail.value.stop_date
    var person_name = e.detail.value.person_name
    if(start_date == ''){
      start_date = "1900-01-01"
    }
    if(stop_date == ''){
      stop_date = "2100-12-31"
    }
    if(start_date > stop_date){
      wx.showToast({
        title: '开始日期不能大于结束日期',
        icon:'none',
        duration: 2000//持续的时间
      })
      return
    }

    var e = [person_name,'日期',start_date,stop_date]
    _this.setData({
      this_where:e
    })
    _this.init(e)
    _this.hidView(_this,"select");
  },

  moreDo: function(){
    var _this = this;
    _this.showView(_this,"moreDo")
  },

  switchpage : function(e){
    var _this = this;
    if(_this.data.isSelect){
      return
    }
    var index= e.currentTarget.dataset.index;
    var pageNum = _this.data.pageNum;
    var pageCount = _this.data.pageCount;

    if(index=="-1"){
      pageNum--;
      if(pageNum<1){
        wx.showToast({
          title: "已经是第一页",
          icon : "none"
        })
      }else{
        _this.setData({
          pageNum
        })
        var e = _this.data.this_where
        _this.init(e);
      }
    }else{
      pageNum++;
      if(pageNum>pageCount){
        wx.showToast({
          title: "已经是最后一页",
          icon : "none"
        })
      }else{
        _this.setData({
          pageNum
        })
        var e = _this.data.this_where
        _this.init(e);
      }
    }
  },

  show_updPageCount : function(){
    var _this =this;
    _this.showView(_this,"countPage")
  },

  save_countPage : function(e){
    var _this = this;
    var countPage = e.detail.value.countPage
    _this.setData({
      pageNum : 1,
      countPage
    })
    _this.hidView(_this,"countPage")
    var e = _this.data.this_where
    _this.init(e)
  },

  showView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    _this.setData({
      initHidView : false,
      hid_view : true
    })

    switch(type){
      case "input":
        animation.translateX(0).step()
        _this.setData({
          animationData_input : animation.export()
        })
        break;
      case "upd_code_input":
        animation.translateX(0).step()
        _this.setData({
          animationData_upd_code : animation.export()
        })
        break;
      case "select":
        animation.translateY(0).step()
        _this.setData({
          animationData_select_view : animation.export()
        })
        break;
      case "moreDo":
        animation.translateX(0).step()
        _this.setData({
          animationData_moreDo_view : animation.export()
        })
        break;
      case "examine":
        animation.translateX(0).step()
        _this.setData({
          animationData_examine : animation.export()
        })
        break;
      case "countPage":
        animation.translateX(0).step()
        _this.setData({
          animationData_countPage : animation.export()
        })
        break;
    }
    
  },

  getPageCount : function(e){
    var _this = this;
    var userInfo = _this.data.userInfo
    var sql = "select count(*) as pageCount from (SELECT * from baitaoquanxian as ac) as t where t.公司='" + userInfo.B +"' and 人员 like '%" + e[0] + "%'" 
    if(e[1] != ''){
      sql = sql + " and t." + e[1] + " >= convert(date,'" + e[2] + "') and t." + e[1] + " <= convert(date,'" + e[3] + "')"
    }

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var countPage = _this.data.countPage;
        var pageCount = Math.ceil(list[0].pageCount/countPage);
        _this.setData({
          pageCount
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail : res=>{
        wx.showToast({
          title: '请求失败！',
          icon : 'none'
        })
        console.log("请求失败！")
      }
    })
  },

    //获取当前时间
  getNowTime : function() {
    var date = new Date();
    //年 getFullYear()：四位数字返回年份
    var year = date.getFullYear(); //getFullYear()代替getYear()
    //月 getMonth()：0 ~ 11
    var month = date.getMonth() + 1;
    //日 getDate()：(1 ~ 31)
    var day = date.getDate();
    //时 getHours()：(0 ~ 23)
    var hour = date.getHours();
    //分 getMinutes()： (0 ~ 59)
    var minute = date.getMinutes();
    //秒 getSeconds()：(0 ~ 59)
    var second = date.getSeconds();
    var time = year + '-' + this.addZero(month) + '-' + this.addZero(day)
    return time;
  },
  //小于10的拼接上0字符串
  addZero : function(s) {
    return s < 10 ? ('0' + s) : s;
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
      name : '工作台',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:'text',
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
  onReady() {
    var _this = this;
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

