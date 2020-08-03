const app = getApp()

function insert(tableName){
  var list = app.globalData.spaceList_cw;
  let overUsedSpace = app.globalData.spaceList_cw.usedSpace
  for(let i=0;i<list.list_table.length;i++){
    if(list.list_table[i].name == tableName){
      overUsedSpace+=list.list_table[i].size
    }
  }
  if(overUsedSpace>=app.globalData.spaceList_cw.allSpace){
    console.log("用户新增操作：usedSpace="+app.globalData.spaceList_cw.usedSpace+",allSpace="+app.globalData.spaceList_cw.allSpace+"不可以新增！")
    return false
  }else{
    app.globalData.spaceList_cw.usedSpace = overUsedSpace
    console.log("用户新增操作：usedSpace="+app.globalData.spaceList_cw.usedSpace+",allSpace="+app.globalData.spaceList_cw.allSpace+"可以新增！")
    return true
  }
}

function del(tableName,length){
  var list = app.globalData.spaceList_cw;
  for(let i=0;i<list.list_table.length;i++){
    if(list.list_table[i].name == tableName){
      app.globalData.spaceList_cw.usedSpace-=(list.list_table[i].size*length)
    }
  }
  console.log("用户删除操作：usedSpace="+app.globalData.spaceList_cw.usedSpace+",allSpace="+app.globalData.spaceList_cw.allSpace)
}

module.exports = {
  insert,
  del
}