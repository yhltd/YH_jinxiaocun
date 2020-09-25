const app = getApp()

function insert(tableName){
  var list = app.globalData.spaceList_z;
  let overUsedSpace = app.globalData.spaceList_z.usedSpace
  for(let i=0;i<list.list_table.length;i++){
    if(list.list_table[i].name == tableName){
      overUsedSpace+=list.list_table[i].size
    }
  }
  if(overUsedSpace>=app.globalData.spaceList_z.allSpace){
    console.log("用户新增操作：usedSpace="+app.globalData.spaceList_z.usedSpace+",allSpace="+app.globalData.spaceList_z.allSpace+"不可以新增！")
    return false
  }else{
    app.globalData.spaceList_z.usedSpace = overUsedSpace
    console.log("用户新增操作：usedSpace="+app.globalData.spaceList_z.usedSpace+",allSpace="+app.globalData.spaceList_z.allSpace+"可以新增！")
    return true
  }
}

function del(tableName,length){
  var list = app.globalData.spaceList_z;
  for(let i=0;i<list.list_table.length;i++){
    if(list.list_table[i].name == tableName){
      app.globalData.spaceList_z.usedSpace-=(list.list_table[i].size*length)
    }
  }
  console.log("用户删除操作：usedSpace="+app.globalData.spaceList_z.usedSpace+",allSpace="+app.globalData.spaceList_z.allSpace)
}

module.exports = {
  insert,
  del
}