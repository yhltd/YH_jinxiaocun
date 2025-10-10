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
    cloudList.header.push({
      item: title[i].text,
      columnName:title[i].text
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
              wx.openDocument({
                filePath: path_downLoad,
                fileType : 'xlsx',
                showMenu : true,
                success : res=> {
                  delCloudFile(fileId)
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
  wx.cloud.callFunction({
    name:'detExcel',
    data:{
      fileID : fileId
    },
    success(res){
      console.log('删除日志',res)
    },
    
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
  print
}