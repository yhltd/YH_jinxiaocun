// 云函数入口文件
const cloud = require('wx-server-sdk')
const mssql = require('mssql')
cloud.init()
// 云函数入口函数
exports.main = async(event) => {
  var config = {
    user: 'bds28428944',
    password: '07910Lyh',
    server: 'bds28428944.my3w.com',
    database: 'bds28428944_db',
    port: '1433' * 1, //用数字相乘强制转换,之前没用 *1 转换所以报错！笨
    options: {
      encrypt: true
    },
    pool: {
      min: 0,
      max: 10,
      idleTimeoutMillis: 10
    }
  };
  try {
    await mssql.connect(config)
    result = await mssql.query(event.query)
    return result
  } catch (err) {
    return err
  }
}