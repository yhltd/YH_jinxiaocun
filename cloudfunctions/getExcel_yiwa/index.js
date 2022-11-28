// 云函数入口文件
const cloud = require('wx-server-sdk')
const nodeExcel = require('excel-export')
const path = require('path');
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
  var list = event.list;
  var tableMap = {
    styleXmlFile: path.join(__dirname, "styles.xml"),
    name: 'Sheet1',
    cols: [],
    rows: [],
  }

  
  //添加表头  此处要注意格式type，会影响到rows
  for(let i=0;i<list.header.length;i++){
    tableMap.cols.push({
      caption: list.header[i].item,
      type: 'string',
    })
  }
  for (let s = 0; s < list.items.length; s++) {
    var row = []
    for(let x=0;x<list.header.length;x++){
      if(list.header[x].type=='number'){
        row.push("'"+list.items[s][list.header[x].columnName])
        continue;
      }
      row.push(list.items[s][list.header[x].columnName])
    }
    tableMap.rows.push(row)
  }

  var excelResult = nodeExcel.execute(tableMap);
  var filePath = "outputExcels";
  var num = String(Math.floor( Math.random()*100000));    //胡超  20210524更新
  //var num = Math.floor( Math.random()*100000);   //原有
  var fileName = list.name+'.xlsx';
  path.join(filePath,num,fileName);             //胡超  20210524更新
  console.log(path)                           //胡超  20210524更新
  return await cloud.uploadFile({
    cloudPath: String(path),              //胡超  20210524更新
    //cloudPath: path.join(filePath,num,fileName),    //原有
    fileContent: new Buffer(excelResult, 'binary')
  });
  
}