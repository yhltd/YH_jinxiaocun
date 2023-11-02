// 云函数入口文件
const cloud = require('wx-server-sdk')
const mssql = require('mssql')
const axios = require('axios/dist/node/axios.cjs');
cloud.init()
// 云函数入口函数
exports.main = async(event) => {
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
  try {
    console.log(event.query)
    await mssql.connect(config)
    if(event.query.indexOf('http://') != -1){
      let a = await axios({
        method: 'get',
        url: event.query,
        responseType: 'arraybuffer',
        headers: { "Content-Type": "*" }
      })
      console.log(a)
      var sql = a.data.toString('utf8')
      console.log(sql)
      result = await mssql.query(sql)
      return result
    }else{
      result = await mssql.query(event.query)
      return result
    }
  } catch (err) {
    return err
  }
}