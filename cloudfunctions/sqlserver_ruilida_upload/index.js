// 云函数入口文件
const cloud = require('wx-server-sdk')
const mssql = require('mssql')
cloud.init()
// 云函数入口函数
// exports.main = async(event) => {
//   var config = {
//     user: 'sa',
//     password: 'Lyh07910_001',
//     server: 'yhocn.cn',
//     database: 'ruilida_20231024',
//     port: '1433' * 1, //用数字相乘强制转换,之前没用 *1 转换所以报错！笨
//     options: {
//       encrypt: false
//     },
//     pool: {
//       min: 0,
//       max: 10,
//       idleTimeoutMillis: 10
//     }
//   };
//   try {
//     console.log(event.query)
//     await mssql.connect(config)
//     result = await mssql.query(event.query)
//     return result
//   } catch (err) {
//     return err
//   }
// }

exports.main = async (event) => {  
  try {  
    const chunk = event.chunk;  
    const sum = event.sum;  
    const index = event.index;  
    // 在这里对小块进行处理...  
    console.log('Processing chunk:', chunk);  
    console.log('Processing sum:', sum);  
    console.log('Processing index:', index);  
    // 检查是否还有下一个块  
    const hasNextChunk = sum > index // 检查是否有下一个块的条件  
    if (hasNextChunk) {  
      // 如果有下一个块，继续处理下一个块  
      await wx.cloud.callFunction({  
        name: 'sqlserver_ruilida_upload',  
        data: {  
          chunk: chunk,  
        },  
        success: res => {  
          console.log('Chunk processed successfully');  
        },  
        fail: err => {  
          console.error('Failed to process chunk', err);  
          res.fail('Failed to process chunk');  
        },  
      });  
    } else {  
      // 所有块处理完毕，将所有小块拼接为完整的字符串并返回结果  
      const completeString = chunks.join(''); // 使用join方法将所有小块拼接为完整的字符串   
      console.log(completeString)
      var config = {
        user: 'sa',
        password: 'Lyh07910_001',
        server: 'yhocn.cn',
        database: 'ruilida_20231024',
        port: '1433' * 1, //用数字相乘强制转换,之前没用 *1 转换所以报错！笨
        options: {
          encrypt: false
        },
        pool: {
          min: 0,
          max: 10,
          idleTimeoutMillis: 10
        }
      };
      await mssql.connect(config)
      result = await mssql.query(completeString)
      return result
    }  
  } catch (err) {  
    console.error('Failed to process chunk', err);  
    return err
  }  
};