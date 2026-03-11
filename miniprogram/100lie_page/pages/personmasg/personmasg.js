// 100lie_page/pages/personmasg/personmasg.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    input_hid:true,
    upd_hid:true,
    mask_hid:true,
    input_det:true,
    mask_det:true,
    sel_hid:true,
    name: "",
    num: "",
    pwd: "",
    detname:'',
    showUploadModal: false,      // 上传弹窗显示状态
    showFileViewModal: false,    // 文件查看弹窗显示状态
    selectedFiles: [],           // 已选择的文件列表
    currentRecordId: 0,          // 当前操作的记录ID
    currentRecordName: '',       // 当前记录的人员姓名
    fileName: '',                // 用户输入的文件名
    uploading: false,            // 上传中状态
    uploadProgress: 0,           // 上传进度
    
    currentFileList: [],         // 当前查看的文件列表
    currentFileName: '',         // 当前查看的文件名
    titil:[
      {text:'姓名'},
      {text:'账号'},
      {text:'密码'},
      {text:'账号状态'},
      {text:'部门'},
      {text:'邮箱'},
      {text:'电话号'},
      {text:'员工编号'},
      {text:'绑定微信'},
      {text:'文件'},
    ],
    list:[],
    zhuangtai_list:['正常','锁定'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    var that = this
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    if(options!=undefined){
      that.setData({
        gongsi:userInfo.B,
        userInfo:userInfo
      })
    }
    var sql="select ins,del,upd,sel from baitaoquanxian_department where company = '" + _this.data.userInfo.B + "' and department_name ='" + _this.data.userInfo.bumen + "' and view_name='人员管理'"
    var that =this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){     
        var quanxian = res.result.recordset
        if(quanxian == []){
          wx.showToast({
            title: '未读取到部门权限信息，请联系管理员',
            icon:"none"
          })
          return;
        }else{
          _this.setData({
            zeng:quanxian[0].ins,
            shan:quanxian[0].del,
            gai:quanxian[0].upd,
            cha:quanxian[0].sel,
          })
          _this.tableShow()
          var sql="select department_name from baitaoquanxian_department WHERE company = '" + that.data.gongsi + "' group by department_name"
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data:{
              query : sql
            },
            success(res){
              var list=res.result.recordset
              var department_list = []
              for(var i=0; i<list.length; i++){
                if(list[i].department_name != '' &&list[i].department_name != undefined){
                  department_list.push(list[i].department_name)
                }
              }
              console.log(department_list)
              that.setData({
                department_list
              })
            }
          })
        }
      }
    })

    
  },
  //添加
  add:function(){
    var that=this
    var userNum = app.globalData.userNum
    if(userNum != undefined && userNum != null){
      if(userNum != ""){
        var sql = "select count(id) as id from baitaoquanxian_renyun where B='" + that.data.gongsi + "'"
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data:{
            query : sql
          },
          success(res){
            if(res.result.recordset[0].id * 1 >= userNum * 1){
              wx.showToast({
                title: '已有账号数量过多，请删除无用账号后再试！',
                icon: 'none'
              })
            }else{
              that.setData({
                input_hid:false,
                mask_hid:false,
                name:"",
                num:"",
                pwd:"",
                zhuangtai:"",
                bumen:"",
                email:"",
                phone:"",
                bianhao:"",
                id:"",
              })
            }
          }
        })
      }else{
        that.setData({
          input_hid:false,
          mask_hid:false,
          name:"",
          num:"",
          pwd:"",
          zhuangtai:"",
          bumen:"",
          email:"",
          phone:"",
          bianhao:"",
          id:"",
        })
      }
    }else{
      that.setData({
        input_hid:false,
        mask_hid:false,
        name:"",
        num:"",
        pwd:"",
        zhuangtai:"",
        bumen:"",
        email:"",
        phone:"",
        bianhao:"",
        id:"",
      })
    }
},

bangding:function(e){
  var _this = this
  var list = _this.data.list
  var index = e.currentTarget.dataset.index
  var wechart_user = list[index].wechart_user
  wx.showModal({
    title: '提示',
    content: '是否使用当前微信绑定此账号？',
    success: function(res) {
      if (res.confirm) {
        var this_id = wx.getStorageSync('openid')
        console.log(this_id)
        wx.login({
          success: (res) => {
              console.log(res);
              _this.setData({
                  wxCode: res.code,
              })
              let m_code = _this.data.wxCode; // 获取code
              let m_AppId = app.globalData.this_id1 + app.globalData.this_id2 + app.globalData.this_id3 ;
              let m_mi =  app.globalData.sec_dd1 + app.globalData.sec_dd2 + app.globalData.sec_dd3;
              console.log("m_code:" + m_code);
              let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + m_AppId + "&secret=" + m_mi + "&js_code=" + m_code + "&grant_type=authorization_code";
              wx.request({
                  url: url,
                  success: (res) => {
                      console.log(res);
                      _this.setData({
                          wxOpenId: res.data.openid
                      })
                      //获取到你的openid
                      console.log("====openID=======");
                      console.log(_this.data.wxOpenId);
                      var sql = "update baitaoquanxian_renyun set wechart_user = '" + _this.data.wxOpenId + "' where id=" +  list[index].id
                      console.log(sql)
                      wx.cloud.callFunction({
                        name: 'sqlServer_117',
                        data:{
                          query : sql
                        },
                        success(res){
                          console.log(res)
                          wx.showToast({
                            title: '绑定成功',
                            icon:"none"
                          })
                          _this.tableShow()
                        }
                      })
                  }
              })
          }
      })
      }
    }
  })
},


jiebang:function(e){
  var _this = this
  var list = _this.data.list
  var index = e.currentTarget.dataset.index
  wx.showModal({
    title: '提示',
    content: '是否解除此账号的微信绑定？',
    success: function(res) {
      if (res.confirm) {
        var sql = "update baitaoquanxian_renyun set wechart_user = '' where id=" +  list[index].id
        console.log(sql)
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data:{
            query : sql
          },
          success(res){
            console.log(res)
            wx.showToast({
              title: '解绑成功',
              icon:"none"
            })
            _this.tableShow()
          }
        })
      }
    }
  })
},


bindPickerChange1: function(e) {
  var _this = this
  _this.setData({
    zhuangtai: _this.data.zhuangtai_list[e.detail.value]
  })
},

tableShow: function(){
  var _this = this
  var that = this
  if(_this.data.cha != '是'){
    wx.showToast({
      title: '无查询权限',
      icon:"none"
    })
    return;
  }
  var sql="select id,isnull(B,'') as B,isnull(C,'') as C,isnull(D,'') as D,isnull(E,'') as E,isnull(zhuangtai,'') as zhuangtai,isnull(email,'') as email,isnull(phone,'') as phone,isnull(bianhao,'') as bianhao,isnull(bumen,'') as bumen,isnull(renyuan_id,'') as renyuan_id,case when isnull(wechart_user,'') = '' then '未绑定' else '已绑定' end as wechart_user,isnull(wenjian,'') as wenjian from baitaoquanxian_renyun WHERE B = '" + that.data.gongsi + "' "
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query : sql
    },
    success(res){
      var list=res.result.recordset
      console.log("tableShow",list)
      that.setData({
        list
      })
    }
  })
},

bindPickerChange2: function(e) {
  var _this = this
  _this.setData({
    bumen: _this.data.department_list[e.detail.value]
  })
},

  //修改
  update:function(e){
  var _this = this
  var list = _this.data.list
  var index= e.currentTarget.dataset.index

  if(_this.data.shan != '是'){
    wx.showToast({
      title: '无删除权限',
      icon:"none"
    })
    return;
  }

  _this.setData({
    upd_hid:false,
    mask_hid:false,
    name:list[index].C,
    num:list[index].D,
    pwd:list[index].E,
    zhuangtai:list[index].zhuangtai,
    bumen:list[index].bumen,
    email:list[index].email,
    phone:list[index].phone,
    bianhao:list[index].bianhao,
    id:list[index].id,
  })
},
hid_view:function(){
  var that=this
  that.setData({
    input_hid:true,
    mask_hid:true,
    upd_hid:true,
  })
},
hid_det:function() {
  var that=this
  that.setData({
    input_det:true,
    mask_det:true,
  })
},
save:function(e){
  var that=this
  var list=that.data.list
  that.setData({
    name:e.detail.value.input_name,
    num: e.detail.value.input_num,
    pwd: e.detail.value.input_pwd,
    zhuangtai:e.detail.value.input_zhuangtai,
    bumen:e.detail.value.input_bumen,
    email:e.detail.value.input_email,
    phone:e.detail.value.input_phone,
    bianhao:e.detail.value.input_bianhao,
  })
  if(that.data.name.length==0||that.data.pwd.length==0||that.data.num.length==0||that.data.zhuangtai.length==0||that.data.bumen.length==0){
    wx.showToast({
      title: '前五项不能为空',
      icon:"none"
    })
    return;
  }
for( var i =0; i<list.length;i++){
if(that.data.name==list[i].C){
  wx.showToast({
    title: '该用户已存在',
    icon:"none"
  })
  return;
}
}
  var this_time = getCurrentTime();

  var sql="insert into baitaoquanxian_renyun (B,C,D,E,zhuangtai,bumen,email,phone,bianhao,renyuan_id) values ('" + that.data.gongsi + "','"+that.data.name+ "','"+that.data.num+"','"+that.data.pwd+"','"+that.data.zhuangtai+"','"+that.data.bumen+"','"+that.data.email+"','"+that.data.phone+"','"+that.data.bianhao+"','"+this_time+"');insert into  baitaoquanxian_copy1 (quanxian,B,renyuan_id) values('" + that.data.gongsi + "','"+that.data.name+"','"+this_time+"')"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){       
          wx.showToast({
            title: '添加成功',
            icon:'success'
          })
         that.tableShow()        
      }
    })   
  that.setData({
    input_hid:true,
    mask_hid:true,
  })
  that.tableShow()
},

upd:function(e){
  var that=this
  var list=that.data.list
  that.setData({
    name:e.detail.value.input_name,
    num: e.detail.value.input_num,
    pwd: e.detail.value.input_pwd,
    zhuangtai:e.detail.value.input_zhuangtai,
    bumen:e.detail.value.input_bumen,
    email:e.detail.value.input_email,
    phone:e.detail.value.input_phone,
    bianhao:e.detail.value.input_bianhao,
  })
  if(that.data.name.length==0||that.data.pwd.length==0||that.data.num.length==0||that.data.zhuangtai.length==0||that.data.bumen.length==0){
    wx.showToast({
      title: '前五项不能为空',
      icon:"none"
    })
    return;
  }
for( var i =0; i<list.length;i++){
  if(that.data.name==list[i].C && that.data.id != list[i].id){
    wx.showToast({
      title: '该姓名已存在',
      icon:"none"
    })
    return;
  }
}
  var sql="update baitaoquanxian_renyun set C='" + that.data.name + "',D='"+that.data.num+"',E='"+that.data.pwd+"',zhuangtai='"+that.data.zhuangtai+"',bumen='"+that.data.bumen+"',email='"+that.data.email+"',phone='"+that.data.phone+"',bianhao='"+that.data.bianhao+"' where id="+that.data.id
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){       
          wx.showToast({
            title: '修改成功',
            icon:'success'
          })
         that.tableShow()        
      }
    })   
  that.setData({
    input_hid:true,
    mask_hid:true,
    upd_hid:true,
  })
  that.tableShow()
},

// 删除
det:function(){
  var that=this
  that.setData({
    input_det:false,
    mask_det:false,
  })
},
det_view:function() {
  var that=this
  that.setData({
    input_det:true,
    mask_det:true,

  })
},

delete:function(e){
  var _this = this
  var list = _this.data.list
  var index= e.currentTarget.dataset.index

  if(_this.data.shan != '是'){
    wx.showToast({
      title: '无删除权限',
      icon:"none"
    })
    return;
  }

  if(list[index].renyuan_id != '' && list[index].renyuan_id != undefined){
    wx.showModal({
      title: '提示',
      content: '是否删除此条账号？',
      success: function(res) {
        if (res.confirm) {
          var sql="DELETE FROM baitaoquanxian_renyun WHERE renyuan_id = '" +list[index].renyuan_id + "';DELETE FROM baitaoquanxian_copy1 WHERE renyuan_id = '"+ list[index].renyuan_id + "'"
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data:{
              query: sql
            },
            success(res){
              wx.showToast({
                title: '删除成功',
                icon:"none"
              })
              _this.tableShow()
            }
          })
        }
      }
    })
  }
},

baochi: function() {
  this.tableShow();  // 直接调用 tableShow 刷新列表
},

// 文件名输入监听
onFileNameInput: function(e) {
  this.setData({
    fileName: e.detail.value
  });
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
        name: `简历照片_${index + 1}.jpg`,
        size: file.size,
        type: 'image'
      }));
      that.setData({ selectedFiles: files });
    }
  });
},
uploadFile: function() {
  var that = this;
  
  if (that.data.selectedFiles.length === 0) {
    wx.showToast({ title: '请选择文件', icon: 'none' });
    return;
  }
  
  if (!that.data.currentRecordId) {
    wx.showToast({ title: '请先选择一条记录', icon: 'none' });
    return;
  }
  
  wx.showModal({
    title: '确认上传',
    content: `确定为 "${that.data.currentRecordName}" 上传 ${that.data.selectedFiles.length} 个文件吗？`,
    success: function(res) {
      if (res.confirm) {
        that.startUpload();
      }
    }
  });
},

startUpload: function() {
  var that = this;
  var uploadedFiles = [];
  var totalFiles = that.data.selectedFiles.length;
  var completedCount = 0;
  
  that.setData({ uploading: true, uploadProgress: 0 });
  
  var recordId = that.data.currentRecordId;
  var recordName = that.data.currentRecordName || '未知人员';
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
        ? `简历_${safeRecordName}.${fileExtension}` 
        : `简历_${safeRecordName}_${index + 1}.${fileExtension}`;
    }
    
    that.setData({ uploadProgress: Math.round((index / totalFiles) * 100) });
    
    wx.uploadFile({
      url: 'https://yhocn.cn:9097/file/upload',
      filePath: file.path,
      name: 'file',
      formData: {
        name: finalFileName,
        path: '/fenquan/',
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
            var fileUrl = "http://yhocn.cn:9088/fenquan/" + finalFileName;
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

handleUploadComplete: function(uploadedFiles) {
  var that = this;
  
  if (uploadedFiles.length > 0) {
    that.saveFilesToDatabase(uploadedFiles);
  }
  
  that.setData({ uploading: false, uploadProgress: 100 });
  
  setTimeout(() => {
    that.hideUploadModal();
    wx.showToast({
      title: `上传完成，成功 ${uploadedFiles.length} 个文件`,
      icon: 'success',
      duration: 3000
    });
    that.baochi(); // 刷新列表
  }, 1000);
},


saveFilesToDatabase: function(files) {
  var that = this;
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select wenjian from baitaoquanxian_renyun where id = " + that.data.currentRecordId
    },
    success: res => {
      var existingFiles = '';
      if (res.result.recordset && res.result.recordset.length > 0) {
        existingFiles = res.result.recordset[0]?.wenjian || '';
      }
      
      // 处理现有文件
      var existingArray = [];
      if (existingFiles) {
        if (existingFiles.includes(',')) {
          existingArray = existingFiles.split(',').map(f => f.trim()).filter(f => f);
        } else {
          existingArray = [existingFiles.trim()];
        }
      }
      
      // 新文件URL
      var newFileUrls = files.map(file => file.url);
      
      // 合并去重
      var allFileUrls = [...new Set([...existingArray, ...newFileUrls])];
      var fileUrlsString = allFileUrls.join(',');
      
      // 更新数据库
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "update baitaoquanxian_renyun set wenjian = '" + fileUrlsString.replace(/'/g, "''") + "' where id = " + that.data.currentRecordId
        },
        success: () => {
          console.log('文件记录更新成功');
          that.tableShow(); // 刷新列表
        },
        fail: err => {
          console.error('更新文件记录失败:', err);
          wx.showToast({
            title: '更新文件记录失败',
            icon: 'none'
          });
        }
      });
    },
    fail: err => {
      console.error('查询现有文件失败:', err);
      wx.showToast({
        title: '查询失败',
        icon: 'none'
      });
    }
  });
},
viewFiles: function(e) {
  var that = this;
  var recordId = e.currentTarget.dataset.id;
  var recordName = e.currentTarget.dataset.name || '';
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "select wenjian from baitaoquanxian_renyun where id = " + recordId
    },
    success: res => {
      if (res.result.recordset && res.result.recordset.length > 0) {
        var record = res.result.recordset[0];
        var files = record.wenjian || '';
        // 处理文件列表，确保是数组格式
        var fileList = [];
        if (files) {
          if (files.includes(',')) {
            fileList = files.split(',').map(f => f.trim()).filter(f => f);
          } else {
            fileList = [files.trim()];
          }
        }
        
        that.setData({
          showFileViewModal: true,
          currentFileList: fileList,
          currentFileName: recordName,  // 使用传入的姓名
          currentRecordId: recordId
        });
      } else {
        wx.showToast({
          title: '未找到文件记录',
          icon: 'none'
        });
      }
    },
    fail: err => {
      console.error('查询文件失败:', err);
      wx.showToast({
        title: '查询失败',
        icon: 'none'
      });
    }
  });
},

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
            path: '/fenquan/'
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

removeFileFromDatabase: function(fileUrl, recordId) {
  var that = this;
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: { 
      query: "select wenjian from baitaoquanxian_renyun where id = " + recordId 
    },
    success: res => {
      if (!res.result.recordset || res.result.recordset.length === 0) {
        return;
      }
      
      var currentFiles = res.result.recordset[0]?.wenjian || '';
      var fileArray = [];
      if (currentFiles) {
        if (currentFiles.includes(',')) {
          fileArray = currentFiles.split(',').map(f => f.trim()).filter(f => f);
        } else {
          fileArray = [currentFiles.trim()];
        }
      }
      
      // 移除要删除的文件
      var newFileArray = fileArray.filter(file => file.trim() !== fileUrl.trim());
      var newFiles = newFileArray.join(',');
      
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: { 
          query: "update baitaoquanxian_renyun set wenjian = '" + newFiles.replace(/'/g, "''") + "' where id = " + recordId 
        },
        success: () => {
          that.tableShow(); // 刷新列表
          
          // 重新加载文件列表
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: "select wenjian from baitaoquanxian_renyun where id = " + recordId
            },
            success: res => {
              if (res.result.recordset && res.result.recordset.length > 0) {
                var record = res.result.recordset[0];
                var files = record.wenjian || '';
                var fileList = [];
                if (files) {
                  if (files.includes(',')) {
                    fileList = files.split(',').map(f => f.trim()).filter(f => f);
                  } else {
                    fileList = [files.trim()];
                  }
                }
                
                that.setData({
                  currentFileList: fileList
                });
              }
            }
          });
        },
        fail: err => {
          console.error('更新文件记录失败:', err);
          wx.showToast({
            title: '删除失败',
            icon: 'none'
          });
        }
      });
    }
  });
},
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
hideUploadModal: function() {
  this.setData({
    showUploadModal: false,
    uploading: false,
    uploadProgress: 0,
    selectedFiles: [],
    fileName: ''
  });
},

hideFileViewModal: function() {
  this.setData({
    showFileViewModal: false,
    currentFileList: [],
    currentFileName: '',
    currentRecordId: 0
  });
},

onReady: function () {
  wx.showLoading({
    title: '加载中',
    mask : 'true'
  }) 
  setTimeout(function () {
    wx.hideLoading()
  }, 1000)
},
hid_sel:function(){
  var _this = this
  _this.setData({
    name : "",
    sel_hid:true
  })
},
sel_show:function(){
  var _this = this
  _this.setData({
    name : "",
    sel_hid:false,
    name:"",
    num:"",
    pwd:"",
    zhuangtai:"",
    bumen:"",
    email:"",
    phone:"",
    bianhao:"",
    id:"",
  })
},
sel:function(e){
  var _this = this
  var name = e.detail.value.input_detname
  var sql="select id,isnull(B,'') as B,isnull(C,'') as C,isnull(D,'') as D,isnull(E,'') as E,isnull(zhuangtai,'') as zhuangtai,isnull(email,'') as email,isnull(phone,'') as phone,isnull(bianhao,'') as bianhao,isnull(bumen,'') as bumen,isnull(renyuan_id,'') as renyuan_id,case when isnull(wechart_user,'') = '' then '未绑定' else '已绑定' end as wechart_user ,isnull(wenjian,'') as wenjian from baitaoquanxian_renyun WHERE B = '" + _this.data.gongsi + "' and C like '%" + name + "%'"
  console.log(sql)
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query : sql
    },
    success(res){
      var list=res.result.recordset
      console.log("sel",list)
      _this.setData({
        list
      })
      _this.hid_sel()
    }
  })

},

ref:function(){
  var _this = this
  _this.tableShow()
}
})

function repair(i){
  if (i >= 0 && i <= 9) {
      return "0" + i;
  } else {
      return i;
  }
}

function getCurrentTime() {
  var date = new Date();//当前时间
  var year = date.getFullYear() //返回指定日期的年份
  var month = repair(date.getMonth() + 1);//月
  var day = repair(date.getDate());//日
  var hour = repair(date.getHours());//时
  var minute = repair(date.getMinutes());//分
  var second = repair(date.getSeconds());//秒
  
  //当前时间 
  var curTime = year + month + day + hour + minute + second;
  return curTime;
}