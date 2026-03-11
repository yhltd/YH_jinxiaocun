const updSpace = require('../../util/updSpace')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initHidView : true,
    hid_view : false,
    empty : "",
    userInfo : "",
    this_quanxian:"",
    chaxun_hidden:true,

    countPage : 20, //每一页显示的数据数据数量
    pageCount : 0, //总页数
    pageNum : 1, //当前页 


    list : [],
    titil : [
      {text:"序号",width:"100rpx"},
      {text:"日期",width:"250rpx"},
      {text:"客户",width:"250rpx"},
      {text:"项目",width:"250rpx"},
      {text:"应收",width:"170rpx"},
      {text:"实收",width:"170rpx"},
      {text:"未收",width:"170rpx"},
      {text:"应付",width:"170rpx"},
      {text:"实付 ",width:"170rpx"},
      {text:"未付",width:"170rpx"},
      {text:"科目",width:"250rpx"},
      {text:"纳税金额",width:"250rpx"},
      {text:"已交税金额",width:"250rpx"},
      {text:"未交税金额",width:"250rpx"},
      {text:"摘要",width:"250rpx"},
      {text:"文件",width:"160rpx"} 
    ],
    showUploadModal: false,      // 上传弹窗显示状态
    showFileViewModal: false,    // 文件查看弹窗显示状态
    selectedFiles: [],           // 已选择的文件列表
    currentRecordId: 0,          // 当前操作的记录ID
    currentFileName: '',         // 当前记录的人员姓名（使用现有字段）
    fileName: '',                // 用户输入的文件名
    uploading: false,            // 上传中状态
    uploadProgress: 0,           // 上传进度
    currentFileList: [],         // 当前查看的文件列表
    currentRecordName: '',       // 当前记录名称
    value_input : "",
    index_input : "",
    column_input : "",
    message_input : "",
    upd_db_id : "",
    input_type : "",
    animationData_input : [],

    isDelete : false,
    checkItems : [],
    zeng:"",
    shan:"",
    gai:""
  },

  init : function(){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;
    var pageNum = _this.data.pageNum;
    var countPage = _this.data.countPage;

    _this.getPageCount();

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select id,kehu,zhaiyao,company,project,receivable,receipts,cope,payment,accounting,isnull(convert(VARCHAR,CONVERT(date,insert_date)),'') as insert_date,ROW_ID,nashuijine,yijiaoshuijine,(a.nashuijine-a.yijiaoshuijine) as weijiaoshuijine,(a.receivable-a.receipts) as notget1,(a.cope-a.payment) as notget2,wenjian from (select *,row_number() over(order by id) as ROW_ID from SimpleData where company = '"+_this.data.userInfo.company+"') as a where  a.ROW_ID > "+(pageNum-1)*countPage+" and a.ROW_ID < "+(pageNum*countPage+1)
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list : list,
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

  getPageCount : function(){
    var _this = this;
    var userInfo = _this.data.userInfo

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select count(*) as pageCount from SimpleData where company = '"+_this.data.userInfo.company+"'"
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
  switchpage : function(e){
    var _this = this;
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

  clickView : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var upd_db_id = e.currentTarget.dataset.id
    var column = e.currentTarget.dataset.column;
    var message = e.currentTarget.dataset.message
    var value = e.currentTarget.dataset.value;
    var input_type = e.currentTarget.dataset.input_type;
    _this.setData({
      value_input : value,
      index_input : index,
      column_input : column,
      message_input : message,
      upd_db_id,
      input_type
    })
    if(_this.data.gai){
      _this.showView(_this,"input");
    }else{
      wx.showToast({
        title: '无修改权限',
        icon: "none",
        duration: 1000
      })
    }
    
  },

  save: function(e){
    var _this = this;
    console.log(e)
    var new_value_input = e.detail.value.new
    var class_id = _this.data.class_id
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

    wx.cloud.callFunction({
      name : "sqlServer_cw",
      data : {
        query: "update SimpleData set ["+column+"] = '"+new_value_input+"' where id = '"+id+"'"
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

  showView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    _this.setData({
      initHidView : false,
      hid_view : true
    })

    wx.nextTick(()=>{
      switch(type){
        case "input":
          animation.translateX(0).step()
          _this.setData({
            animationData_input : animation.export()
          })
          break;
        case "moreDo":
          animation.translateX(0).step()
          _this.setData({
            animationData_moreDo_view : animation.export()
          })
          break;
        case "updClass":
          animation.translateY(0).step()
          _this.setData({
            animationData_updClass : animation.export()
          })
          break;
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
          column_input : "",
          message_input : ""
        })
        break;
      case "moreDo":
        animation.translateX(-300).step()
        _this.setData({
          animationData_moreDo_view : animation.export()
        })
        break;
      case "updClass":
        animation.translateY(300).step()
        _this.setData({
          animationData_updClass : animation.export()
        })
        break;
    }
  },
  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"input")
    _this.hidView(_this,"moreDo")
    _this.hidView(_this,"updClass")
  },

  moreDo: function(){
    var _this = this;
    _this.showView(_this,"moreDo")
  },
  bindDelete : function(){
    var _this = this;
    if(_this.data.shan){
      _this.hidView(_this,"moreDo")
      _this.setData({
        isDelete : true
      })
    }else{
      wx.showToast({
        title: '无删除权限',
        icon: "none",
        duration: 1000
      })
    }
  },

  choice_checkBox_delete : function(e){
    var _this = this;
    var id = e.currentTarget.dataset.id
    var value = e.detail.value
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
  
  delete : function(){
    
    var _this = this;
    var checkItems = _this.data.checkItems
    if(checkItems==""){
      wx.showToast({
        title: '请选择项目',
        icon :'none'
      })
      return
    }

    wx.showModal({
      title : '提示',
      content : '确定删除吗？',
      cancelColor: '#009688',
      confirmColor : '#DD5044',
      success : res => {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
            mask : 'true'
          })
          var sql = "delete from SimpleData where id in ("
          for(var i=0;i<checkItems.length;i++){
            if(i==checkItems.length-1){
              sql += checkItems[i]+")"
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
                success: (res)=>{
                  _this.init();
                },
                complete: (res) => {
                  wx.showToast({
                    title: '删除成功',
                    icon : 'success'
                  })
                  updSpace.del("SimpleData",checkItems.length)
                },
              })
            },
            err : res =>{
              console.log("错误："+res)
            },
          })
        }
      }
    })
  },

  backDelete : function(){
    this.setData({
      checkItems : [],
      isDelete : false
    })
  },

  insert : function(){
    var _this = this;
    if(_this.data.zeng){
      _this.hidView(_this,"moreDo")
      wx.showModal({
        title : '提示',
        content : '即将跳转到新增页面',
        cancelColor : '#282B33',
        confirmColor : '#009688',
        success : res => {
          if(res.confirm){
            var userInfo = _this.data.userInfo
            wx.navigateTo({
              url: '../../pages/c_jijiantaizhang_insert/c_jijiantaizhang_insert?userInfo='+JSON.stringify(userInfo),
            })
          }else if(res.cancel){
            return;
          }
        }
      })
    }else{
      wx.showToast({
        title: '无新增权限',
        icon: "none",
        duration: 1000
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var user = JSON.parse(options.userInfo)
    var bianhao = user.bianhao
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from quanxian where bianhao ='" + bianhao + "'"
      },
      success: res => {
        var list = res.result.recordset[0]
        console.log(list)
        var shan = true
        var gai = true
        var zeng = true
        if (list.jjtz_delete != "是"){
          shan = false
        }
        if (list.jjtz_update != "是"){
          gai = false
        }
        if (list.jjtz_add != "是"){
          zeng = false
        }
        _this.setData({
          shan:shan,
          gai:gai,
          zeng:zeng
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
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })
  },

  use_book:function(){
    var _this = this
    _this.hidView(_this,"moreDo");
    wx.showModal({
      title: '使用说明',
      content: '1.点击更多操作后在弹出的窗口中点击删除项目按钮，选中想要删除的数据后点击右下角删除按钮即可删除。\n2.点击更多操作后点击新增项目按钮，在弹出的页面中录入信息点击确定按钮即可添加。\n3.点击页面已有数据的对应列，可弹出修改窗口，录入数据点击确定按钮后即可修改对应位置。',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
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

  chaxun_show:function(){
    var _this = this
    _this.hid_view()
    _this.setData({
      chaxun_hidden:false,
      xiangmumingcheng:"",
      start_date:"",
      stop_date:"",
    })
  },

  chaxun_quxiao:function(){
    var _this = this
    _this.hid_view()
    _this.setData({
      chaxun_hidden:true
    })
  },

  select:function(e){
    var _this = this
    console.log(e.detail.value)
    var start_date = e.detail.value.start_date
    var stop_date = e.detail.value.stop_date
    var xiangmumingcheng = e.detail.value.xiangmumingcheng
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

    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var userInfo = _this.data.userInfo;
    var pageNum = _this.data.pageNum;
    var countPage = _this.data.countPage;

    var sql = "select id,kehu,zhaiyao,company,project,receivable,receipts,cope,payment,accounting,isnull(convert(VARCHAR,CONVERT(date,insert_date)),'') as insert_date,ROW_ID,nashuijine,yijiaoshuijine,(a.nashuijine-a.yijiaoshuijine) as weijiaoshuijine,(a.receivable-a.receipts) as notget1,(a.cope-a.payment) as notget2,wenjian from (select *,row_number() over(order by id) as ROW_ID from SimpleData where company = '" + _this.data.userInfo.company + "') as a where  a.ROW_ID > " + (pageNum - 1) * countPage + " and a.ROW_ID < " + (pageNum * countPage + 1) + " and project like '%" + xiangmumingcheng + "%' and insert_date >= '" + start_date + " 00:00:00.000' and insert_date <= '" + stop_date + " 23:59:59.000';"

    console.log(sql)

   

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list : list,
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
    _this.chaxun_quxiao()
  },
  showUploadModalFunc: function(e) {
    var recordId = e.currentTarget.dataset.id || 0;
    var recordName = e.currentTarget.dataset.name || '';
    
    this.setData({
      showUploadModal: true,
      selectedFiles: [],
      currentRecordId: recordId,
      currentRecordName: recordName,
      fileName: '',
      uploading: false,
      uploadProgress: 0
    });
  },
  
  // 隐藏上传弹窗
  hideUploadModal: function() {
    this.setData({
      showUploadModal: false,
      uploading: false,
      uploadProgress: 0,
      selectedFiles: [],
      fileName: ''
    });
  },
  
  // 隐藏文件查看弹窗
  hideFileViewModal: function() {
    this.setData({
      showFileViewModal: false,
      currentFileList: [],
      currentFileName: '',
      currentRecordId: 0
    });
  },
  
  // 文件名输入监听
  onFileNameInput: function(e) {
    this.setData({
      fileName: e.detail.value
    });
  },
  
  // 选择文档
  chooseFile: function() {
    var that = this;
    wx.chooseMessageFile({
      count: 9,
      type: 'file',
      extension: ['jpg', 'png', 'jpeg', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'],
      success: function(res) {
        var files = res.tempFiles.map(file => ({
          path: file.path,
          name: file.name,
          size: file.size,
          type: file.type
        }));
        that.setData({ selectedFiles: files });
      }
    });
  },
  
  // 选择图片
  chooseImage: function() {
    var that = this;
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var files = res.tempFiles.map((file, index) => ({
          path: file.tempFilePath,
          name: `图片_${index + 1}.jpg`,
          size: file.size,
          type: 'image'
        }));
        that.setData({ selectedFiles: files });
      }
    });
  },
  
  // 上传文件
  uploadFile: function() {
    var that = this;
    
    if (that.data.selectedFiles.length === 0) {
      wx.showToast({ title: '请选择文件', icon: 'none' });
      return;
    }
    
    if (!that.data.currentRecordId) {
      wx.showToast({ title: '请选择一条记录', icon: 'none' });
      return;
    }
    
    wx.showModal({
      title: '确认上传',
      content: `确定要上传 ${that.data.selectedFiles.length} 个文件吗？`,
      success: function(res) {
        if (res.confirm) {
          that.startUpload();
        }
      }
    });
  },
  
  // 开始上传
  startUpload: function() {
    var that = this;
    var uploadedFiles = [];
    var totalFiles = that.data.selectedFiles.length;
    var completedCount = 0;
    
    that.setData({ uploading: true, uploadProgress: 0 });
    
    var recordId = that.data.currentRecordId;
    var recordName = that.data.currentRecordName || '未知';
    var userFileName = that.data.fileName || '';
    
    function uploadNextFile(index) {
      if (index >= totalFiles) {
        that.handleUploadComplete(uploadedFiles);
        return;
      }
      
      var file = that.data.selectedFiles[index];
      var fileExtension = file.name.split('.').pop().toLowerCase();
      
      // 构建文件名
      var finalFileName = '';
      if (userFileName && userFileName.trim() !== '') {
        var baseName = userFileName.trim().replace(/[\\/:*?"<>|]/g, '_');
        if (baseName.includes('.')) baseName = baseName.split('.').slice(0, -1).join('.');
        finalFileName = totalFiles === 1 
          ? `${baseName}.${fileExtension}` 
          : `${baseName}_${index + 1}.${fileExtension}`;
      } else {
        var safeRecordName = recordName.replace(/[\\/:*?"<>|]/g, '_').substring(0, 10);
        finalFileName = totalFiles === 1 
          ? `文件_${safeRecordName}.${fileExtension}` 
          : `文件_${safeRecordName}_${index + 1}.${fileExtension}`;
      }
      
      that.setData({ uploadProgress: Math.round((index / totalFiles) * 100) });
      
      wx.uploadFile({
        url: 'https://yhocn.cn:9097/file/upload',
        filePath: file.path,
        name: 'file',
        formData: {
          name: finalFileName,
          path: '/caiwu/',
          kongjian: '3',
          fileType: fileExtension,
          recordId: recordId,
          recordName: recordName,
          userFileName: userFileName
        },
        header: { 'Content-Type': 'multipart/form-data' },
        success: function(uploadRes) {
          completedCount++;
          try {
            var resData = JSON.parse(uploadRes.data);
            if (resData.code === 200 || resData.success) {
              var fileUrl = "http://yhocn.cn:9088/caiwu/" + finalFileName;
              uploadedFiles.push({
                name: finalFileName,
                url: fileUrl,
                originalName: file.name,
                userFileName: userFileName,
                size: file.size,
                type: fileExtension
              });
            }
          } catch (e) {
            console.error('解析响应失败:', e);
          }
          setTimeout(() => uploadNextFile(index + 1), 500);
        },
        fail: function(err) {
          completedCount++;
          console.error('上传失败:', err);
          setTimeout(() => uploadNextFile(index + 1), 1000);
        }
      });
    }
    
    uploadNextFile(0);
  },
  
  // 上传完成处理
  handleUploadComplete: function(uploadedFiles) {
    var that = this;
    
    that.setData({ uploading: false, uploadProgress: 100 });
    
    if (uploadedFiles.length > 0) {
      // 保存文件到数据库，保存成功后刷新页面
      that.saveFilesToDatabase(uploadedFiles, function() {
        setTimeout(() => {
          that.hideUploadModal();
          wx.showToast({
            title: `上传完成，成功 ${uploadedFiles.length} 个文件`,
            icon: 'success',
            duration: 3000
          });
          that.init(); // 刷新列表
        }, 500);
      });
    } else {
      // 没有文件上传成功
      setTimeout(() => {
        that.hideUploadModal();
        wx.showToast({
          title: '上传失败，请重试',
          icon: 'none',
          duration: 3000
        });
      }, 500);
    }
  },
  
  
  // 保存文件信息到数据库
  saveFilesToDatabase: function(files, callback) {
    var that = this;
    
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select wenjian from SimpleData where id = " + that.data.currentRecordId
      },
      success: res => {
        var existingFiles = res.result.recordset[0]?.wenjian || '';
        var existingArray = existingFiles ? existingFiles.split(',').map(f => f.trim()) : [];
        var newFileUrls = files.map(file => file.url);
        var allFileUrls = existingArray.concat(newFileUrls);
        var fileUrlsString = allFileUrls.join(',');
        
        wx.cloud.callFunction({
          name: 'sqlServer_cw',
          data: {
            query: "update SimpleData set wenjian = '" + fileUrlsString + "' where id = " + that.data.currentRecordId
          },
          success: () => {
            console.log('文件信息保存成功');
            if (callback) callback(); // 数据库更新成功后执行回调
          },
          fail: (err) => {
            console.error('文件信息保存失败:', err);
            if (callback) callback(); // 即使失败也执行回调，避免界面卡住
          }
        });
      },
      fail: (err) => {
        console.error('查询文件信息失败:', err);
        if (callback) callback(); // 查询失败也执行回调
      }
    });
  },
  
  // 查看文件
  viewFiles: function(e) {
    var that = this;
    var recordId = e.currentTarget.dataset.id;
    
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select wenjian, kehu from SimpleData where id = " + recordId
      },
      success: res => {
        if (res.result.recordset.length > 0) {
          var record = res.result.recordset[0];
          var files = record.wenjian || '';
          var fileList = files ? (files.includes(',') ? files.split(',').map(f => f.trim()) : [files]) : [];
          
          that.setData({
            showFileViewModal: true,
            currentFileList: fileList,
            currentFileName: record.kehu || '',
            currentRecordId: recordId
          });
        }
      }
    });
  },
  
  // 删除文件
  deleteFile: function(e) {
    var that = this;
    var fileUrl = e.currentTarget.dataset.url;
    var recordId = e.currentTarget.dataset.id;
    var fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1).split('.')[0];
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个文件吗？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://yhocn.cn:9097/file/delete',
            data: {
              order_number: fileName,
              path: '/caiwu/'
            },
            success: function(res) {
              if (res.data.code === 200 || res.data.success) {
                that.removeFileFromDatabase(fileUrl, recordId);
              }
            }
          });
        }
      }
    });
  },
  
  // 从数据库移除文件记录
  removeFileFromDatabase: function(fileUrl, recordId) {
    var that = this;
    
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: { query: "select wenjian from SimpleData where id = " + recordId },
      success: res => {
        var currentFiles = res.result.recordset[0]?.wenjian || '';
        var fileArray = currentFiles.split(',');
        var newFileArray = fileArray.filter(file => file.trim() !== fileUrl.trim());
        var newFiles = newFileArray.join(',');
        
        wx.cloud.callFunction({
          name: 'sqlServer_cw',
          data: { query: "update SimpleData set wenjian = '" + newFiles + "' where id = " + recordId },
          success: () => {
            that.init();
            that.viewFiles({ currentTarget: { dataset: { id: recordId } } });
          }
        });
      }
    });
  },
  
  // 预览文件
  previewFile: function(e) {
    var fileUrl = e.currentTarget.dataset.url;
    var fileExtension = fileUrl.split('.').pop().toLowerCase();
    var imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    
    if (imageExtensions.includes(fileExtension)) {
      wx.previewImage({ urls: [fileUrl], current: fileUrl });
    } else {
      wx.setClipboardData({
        data: fileUrl,
        success: () => wx.showToast({ title: '链接已复制', icon: 'success' })
      });
    }
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
    var _this = this;
    _this.init()
    _this.hid_view()
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