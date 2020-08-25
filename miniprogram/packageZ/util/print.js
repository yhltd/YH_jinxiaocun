var fileId = "";

function print(title,list,name){
  var _this = this;
  fileId = "";
  wx.showToast({
    title: '正在打开Excel',
    icon : 'loading'
  })
  var cloudList = {
    name : name,
    items : [],
    header : []
  }

  for(let i=0;i<title.length;i++){
    var type = ""
    switch(title[i].type){
      case 'number':
        type = title[i].type
        break;
      case 'text':
        type = "string"
        break;
      case 'digit':
        type = "number"
        break;
    }
    cloudList.header.push({
      item:title[i].text,
      type:type,
      width:parseInt(title[i].width.split("r")[0])/40,
      columnName:title[i].columnName
    })
    
  }
  cloudList.items = list

  wx.cloud.callFunction({
    name:'getExcel',
    data:{
      list : cloudList
    },
    success: function(res){
      console.log("获取云储存id",res)
      fileId = res.result.fileID
      wx.cloud.downloadFile({
        fileID : res.result.fileID,
        success : res=> {
          console.log("获得临时路径",res.tempFilePath)
          wx.getFileSystemManager().saveFile({
            tempFilePath: res.tempFilePath,
            filePath : wx.env.USER_DATA_PATH + "/" + name + ".xlsx",
            success : res=> {
              let path_downLoad = res.savedFilePath
              console.log("下载完成",res)
              wx.openDocument({
                filePath: path_downLoad,
                showMenu : true,
                success : res=> {
                  wx.showToast({
                    title: '用户打开文件',
                    icon : 'none'
                  })
                }
              })
            }
          })
        }
      })
    },
    fail : res=> {
      console.log(res)
    }
  })
}

function delCloudFile(){
  var fileIds = [];
  fileIds.push(fileId);
  wx.cloud.deleteFile({
    fileList: fileIds,
    success: res => {
      console.log(res.fileList);
    },
    fail : console.error
  })
}

module.exports = {
  print
}