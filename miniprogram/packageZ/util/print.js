function print(title,list,name){
  var _this = this;
  wx.showLoading({
    title: '正在打开Excel',
    mask : 'true'
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
      item: title[i].text,
      type: type,
      width:parseInt(title[i].width.split("r")[0])/20,
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
      var fileId = res.result.fileID
      wx.cloud.downloadFile({
        fileID : res.result.fileID,
        success : res=> {
          console.log("获得临时路径",res.tempFilePath)
          wx.getFileSystemManager().saveFile({
            tempFilePath: res.tempFilePath,
            filePath : wx.env.USER_DATA_PATH + "/" + name + getTime() + ".xlsx",
            success : res=> {
              let path_downLoad = res.savedFilePath
              console.log("下载完成",res)
              delCloudFile(fileId)
              wx.openDocument({
                filePath: path_downLoad,
                fileType : 'xlsx',
                showMenu : true,
                success : res=> {
                  wx.hideLoading({
                    success: (res) => {},
                  })
                  console.log("用户打开文件")
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

function delCloudFile(fileId){
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

function getTime(){
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth()+1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth()+1);
  var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
  return year+"-"+month+"-"+day
}

module.exports = {
  print,
  getTime
}