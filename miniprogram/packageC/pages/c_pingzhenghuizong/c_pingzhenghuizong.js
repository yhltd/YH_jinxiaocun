const updSpace = require('../../util/updSpace')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    initHidView :　true,
    empty : "",
    userInfo : "",

    isDate : true,

    countPage : 50, //每一页显示的数据数据数量
    pageCount : 0, //总页数
    pageNum : 1, //当前页 
    hid_view : true,
    where : "",
    animationData_countPage :[],

    list : {},
    titil : [
      {text:"序号",width:"100rpx",type:"number",columnName:"ROW_ID"},
      {text:"凭证字",width:"200rpx",type:"text",columnName:"word"},
      {text:"凭证号",width:"300rpx",type:"text",columnName:"no"},
      {text:"录入时间",width:"350rpx",type:"text",columnName:"voucherDate"},
      {text:"摘要",width:"200rpx",type:"text",columnName:"abstract"},
      {text:"科目代码",width:"200rpx",type:"text",columnName:"code"},
      {text:"科目名称",width:"650rpx",type:"text",columnName:"name"},
      {text:"借方金额",width:"200rpx",type:"digit",columnName:"load"},
      {text:"贷方金额",width:"200rpx",type:"digit",columnName:"borrowed"},
      {text:"部门",width:"200rpx",type:"text",columnName:"department"},
      {text:"开支项目",width:"300rpx",type:"text",columnName:"expenditure"},
      {text:"备注",width:"200rpx",type:"text",columnName:"note"},
      {text:"审核人",width:"200rpx",type:"text",columnName:"man"},
      {text:"应收/付",width:"200rpx",type:"digit",columnName:"money"},
      {text:"实收/付",width:"200rpx",type:"digit",columnName:"real"},
      {text:"未收/付",width:"200rpx",type:"digit",columnName:"not_get"}
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

    accounting : [
      {text:"资产类",arr:[]},
      {text:"负债类",arr:[]},
      {text:"权益类",arr:[]},
      {text:"成本类",arr:[]},
      {text:"损益类",arr:[]},
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
    animationData_examine : []
  },

  getAccountion : function(){
    var _this = this;
    wx.cloud.callFunction({
      name : "sqlServer_cw",
      data : {
        query : "select cast(code as varchar)code,name,LEFT(code,1) as area from Accounting where company = '"+_this.data.userInfo.company+"'"
      },
      success : res=>{
        var Accounting = _this.data.accounting
        var list = res.result.recordset;
        for(var i=0;i<list.length;i++){
          if(list[i].area==1){
            Accounting[0].arr.push({code:list[i].code,name:list[i].name})
          }
          if(list[i].area==2){
            Accounting[1].arr.push({code:list[i].code,name:list[i].name})
          }
          if(list[i].area==3){
            Accounting[2].arr.push({code:list[i].code,name:list[i].name})
          }
          if(list[i].area==4){
            Accounting[3].arr.push({code:list[i].code,name:list[i].name})
          }
          if(list[i].area==5){
            Accounting[4].arr.push({code:list[i].code,name:list[i].name})
          }
        }
        
        _this.setData({
          accounting : Accounting
        })
        
      }
    })
  },

  //初始化页面
  init : function(where2){
    wx.showLoading({
      title : "加载中",
      mask : 'true'
    })
    var _this = this;
    _this.getPageCount();

    var pageNum = _this.data.pageNum;
    var countPage = _this.data.countPage;

    var where = "where t.[ROW_ID] > "+(pageNum-1)*countPage+" and t.[ROW_ID] <'"+(pageNum*countPage+1)+"'"
    if(where2!="" && where2!=undefined){
      where = ""
    }else{
      where2 = ""
    }

    var sql = "select * from (select (select name from Accounting where code = LEFT (vs.code, 4)) AS name1,(select name from Accounting where code = LEFT (vs.code, 6)) AS name2,(select name from Accounting where code = LEFT (vs.code, 8)) AS name3,year(vs.voucherDate) as [year],month(vs.voucherDate) as [month],vs.id,vs.word,vs.[no],ISNULL(CONVERT(VARCHAR(100), vs.voucherDate, 20), '') as voucherDate,vs.abstract,vs.code,vs.department,vs.expenditure,vs.note,vs.man,ac.name,ac.load,ac.borrowed,vs.money,vs.real,(money-real) as not_get,ROW_NUMBER() over(order by vs.id) ROW_ID from VoucherSummary as vs left join Accounting as ac on vs.code = ac.code and ac.company = '"+_this.data.userInfo.company+"' where vs.company = '"+_this.data.userInfo.company+"' ) t "+where+where2

    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {

        var list = res.result.recordset
        for(var i=0;i<list.length;i++){
          if(list[i].name1!=list[i].name2){
            list[i].name1 +="-"+list[i].name2
          }
          if(list[i].name2!=list[i].name3){
            list[i].name1 +="-"+list[i].name3
          }
          list[i].name = list[i].name1
          if(list[i].borrowed!=0){
            list[i].borrowed = list[i].money
            list[i].load = 0
          }else if(list[i].load!=0){
            list[i].load = list[i].money
            list[i].borrowed = 0
          }
        }
        
        _this.setData({
          list
        })
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  delete: function(e){
    var _this = this;
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
          var sql = "delete from VoucherSummary where id = '" + id + "';"
          wx.cloud.callFunction({
            name : 'sqlServer_cw',
            data : {
              query : sql
            },
            success : res =>{
              wx.hideLoading({
                success: (res)=>{
                  _this.init();
                },
                complete: (res) => {
                  wx.showToast({
                    title: '删除成功',
                    icon : 'success'
                  })
                  updSpace.del("VoucherSummary",1)
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

  clickView : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var upd_db_id = e.currentTarget.dataset.id
    var column = e.currentTarget.dataset.column;
    var value = e.currentTarget.dataset.value;
    var input_type = e.currentTarget.dataset.input_type;
    var money_type = e.currentTarget.dataset.money_type;
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

  show_upd_view : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id

    _this.setData({
      index_input : index,
      upd_db_id : id
    })
    _this.showView(_this,"upd_code_input")
  },

  save: function(e){
    var _this = this;

    var new_value_input = ""
    if(_this.data.input_type=="date"){
      var year = parseInt(e.detail.value.year)
      var month = parseInt(e.detail.value.month)
      var day = parseInt(e.detail.value.day)
      var hour = parseInt(e.detail.value.hour)
      var minute = parseInt(e.detail.value.minute)
      var second = parseInt(e.detail.value.second)
      new_value_input = year+"-"+(month>=10?month:"0"+month)+"-"+(day>=10?day:"0"+day)+" "+(hour>=10?hour:"0"+hour)+":"+(minute>=10?minute:"0"+minute)+":"+(second>=10?second:"0"+second)
    }else{
      var new_value_input = e.detail.value.new
      if(new_value_input==""){
        new_value_input = _this.data.value_input
      }
    }

    
    
    var index = _this.data.index_input;
    var column = _this.data.column_input;
    var id = _this.data.upd_db_id

   
    _this.hidView(_this,"input")
    
    
    if(column=="money"){
      var money_type = _this.data.money_type;
      _this.setData({
        ["list["+index+"].money"] : new_value_input,
        ["list["+index+"]."+money_type] : new_value_input,
        empty : ""
      })
    }else{
      _this.setData({
        ["list["+index+"]."+column] : new_value_input,
        empty : ""
      })
    }

    _this.setData({
      ["list["+index+"].not_get"] : _this.data.list[index].money-_this.data.list[index].real
    })

    wx.cloud.callFunction({
      name : "sqlServer_cw",
      data : {
        query: "update VoucherSummary set ["+column+"] = '"+new_value_input+"' where id = '"+id+"'"
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

  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"input")
    _this.hidView(_this,"upd_code_input")
    _this.hidView(_this,"select")
    _this.hidView(_this,"moreDo")
    _this.hidView(_this,"examine")
    _this.hidView(_this,"countPage")
  },

  choice_item : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index
    var arr = _this.data.accounting[index].arr

    _this.setData({
      accounting_arr : arr,
      upd_index : index
    })
  },  

  choice_item_upd : function(e){
    var _this = this;
    var index = _this.data.index_input;
    var id = _this.data.upd_db_id;
    var name = e.currentTarget.dataset.name
    var code = e.currentTarget.dataset.code;
    var arr = _this.data.accounting_arr

    var code1 = code.substr(0,4)
    var code2 = code.substr(0,6)
    var code3 = code.substr(0,8)

    var name1,name2,name3
    for(var i=0;i<arr.length;i++){
      if(code1==arr[i].code){name1 = arr[i].name}
      if(code2==arr[i].code){name2 = arr[i].name}
      if(code3==arr[i].code){name3 = arr[i].name}
    }
    if(name1!=name2){name1+="-"+name2}
    if(name2!=name3){name1+="-"+name3}

    _this.hidView(_this,"upd_code_input")
    _this.setData({
      ["list["+index+"].code"] : code,
      ["list["+index+"].name"] : name1,
    })

    var sql = "update VoucherSummary set code = '"+code+"' where id = '"+id+"'"

    
    wx.cloud.callFunction({
      name : "sqlServer_cw",
      data : {
        query : sql
      },
      success : res=>{
        wx.showToast({
          title: "修改成功",
          icon : "none"
        })
      }
    })
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
        _this.init();
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
        _this.init();
      }
    }
  },

  getOptions : function(){
    var _this = this;
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select word from VoucherWord where company = '"+_this.data.userInfo.company+"' GROUP BY word"
      },
      success: res => {
        var wordList = res.result.recordset
        var optionsItem = [];
        for(var i=0;i<wordList.length;i++){
          optionsItem.push(wordList[i].word)
        }

        _this.setData({
          ["options[0].items"] : optionsItem
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  moreDo: function(){
    var _this = this;
    _this.showView(_this,"moreDo")
  },

  getPageCount : function(){
    var _this = this;
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select count(id) as [count] from VoucherSummary where company='"+_this.data.userInfo.company+"'"
      },
      success: res => {


        var list = res.result.recordset
        var countPage = _this.data.countPage;
        var pageCount = Math.ceil(list[0].count/countPage);
        _this.setData({
          pageCount
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },
  selectTap : function(e){
    var _this = this;
    var items_index = e.currentTarget.dataset.items_index
    var selectHid = _this.data.options[items_index].selectHid
    for(var i=0;i<_this.data.options.length;i++){
      if(i==items_index){
        _this.setData({
          ["options["+items_index+"].selectHid"] : selectHid?false:true
        })
        continue;
      }
      _this.setData({
        ["options["+i+"].selectHid"] : true
      })
    }
  },
  choice : function(e){
    var _this = this;
    var items_index = e.currentTarget.dataset.items_index;
    var items = _this.data.options[items_index];
    var index = e.currentTarget.dataset.item_index;
    var value = items.items[index]
    
    _this.setData({
      ["options["+items_index+"].text"] : value,
      ["options["+items_index+"].selectHid"] : true,
    })
  },
  input:function(e){
    var _this =this;
    var index = e.currentTarget.dataset.index
    var value = e.detail.value

    _this.setData({
      ["options["+index+"].text"] : value
    })
  },
  showSelect : function(){
    var _this = this;
    _this.hidView(_this,"moreDo")
    _this.showView(_this,"select")
  },

  select : function(e){
    var _this = this;
    var word = e.detail.value.word;
    var year = e.detail.value.year;
    var month = e.detail.value.month;

    var where = "where 1=1"
    if(word!=""){
      where += " and word = '"+word+"'"
    }
    if(year!=""){
      where += " and year(voucherDate) = '"+year+"'"
    }
    if(month!=""){
      where += " and month(voucherDate) = '"+month+"'"
    }
    if(word=="" && year=="" && month==""){
      _this.hidView(_this,"select");
      return
    }

    _this.setData({
      where,
      isSelect : true
    })
    _this.init(where)
    _this.hidView(_this,"select");
  },

  backSelect : function(){
    var _this = this;
    _this.setData({
      where : "where t.[ROW_ID] > "+(_this.data.pageNum-1)*_this.data.countPage+" and t.[ROW_ID] <'"+(_this.data.pageNum*_this.data.countPage+1)+"'",
      isSelect : false,
      examine : false,
      checkItems : []
    })
    _this.init();
  },

  examine : function(){
    var _this = this;
    _this.setData({
      empty : "",
      examine : true
    })
    _this.hidView(_this,"moreDo")
  },

  choice_checkBox_examine : function(e){
    var _this = this;
    var value = e.detail.value
    var id = e.currentTarget.dataset.id;
    var checkItems = _this.data.checkItems;
    if(value!=""){
      checkItems.push(id)
    }else{
      for(let i=0;i<checkItems.length;i++){
        if(checkItems[i]==id){
          checkItems.splice(i,1)
        }
      }
    }
    _this.setData({
      checkItems
    })
  },

  upd_examine : function(){
    var _this = this;
    var checkItems = _this.data.checkItems;
    if(checkItems==""){
      wx.showToast({
        title: '请选择凭证',
        icon :'none'
      })
      return
    }
    _this.showView(_this,"examine")
  },

  examine_save : function(e){
    var _this = this
    
    var man = e.detail.value.man
    var db_do = e.detail.value.do
    if(man=="" || db_do==""){
      wx.showToast({
        title: '请输入审核信息',
        icon : 'none'
      })
      return
    }
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })

    var userInfo = _this.data.userInfo
    wx.cloud.callFunction({
      name : 'sqlServer_cw',
      data : {
        query : "select * from Account where id='"+userInfo.id+"' and do = '"+db_do+"' and company = '"+_this.data.userInfo.company+"'"
      },
      success : res =>{
        if(res.result.recordset.length!=0){
          var checkItems = _this.data.checkItems;
          var sql = "update VoucherSummary set man = '"+man+"' where id in (";
          for(var i=0;i<checkItems.length;i++){
            if(i==checkItems.length-1){
              sql += checkItems[i]+") and company = '"+userInfo.company+"'"
              break;
            }
            sql += checkItems[i]+","
          }
          wx.cloud.callFunction({
            name : 'sqlServer_cw',
            data : {
              query : sql
            },
            success : res =>{
              wx.hideLoading({
                complete: (res) => {}
              })
              _this.init()
              
              _this.hidView(_this,"examine")
              wx.showToast({
                title: '修改成功',
                icon : 'success'
              })
              _this.setData({
                empty : "",
                examine : false,
                isSelect : false
              })
            },
            err : res =>{
              console.log("错误："+res)
            }
          })
        }else{
          wx.hideLoading({
            complete: (res) => {},
          })
          wx.showToast({
            title: '操作密码错误！',
            icon : 'none'
          })
          return;
        }
      },
      err : res =>{
        console.log("错误："+res)
      }
    })
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
    _this.init()
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
      name : '凭证汇总',
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

  onReady : function(){
    var _this = this;
    _this.init()
    _this.hid_view();
    _this.getAccountion();
    _this.getOptions();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo : JSON.parse(options.userInfo)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})