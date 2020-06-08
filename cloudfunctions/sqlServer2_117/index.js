// 云函数入口文件
const cloud = require('wx-server-sdk')
const mssql = require('mssql')
cloud.init()
// 云函数入口函数
exports.main = async (event) => {
  var config = {
    user: event.user,
    password: event.password,
    server: event.server,
    database: event.database,
    port: event.port * 1, //用数字相乘强制转换
    options: {
      encrypt: true
    },
    pool: {
      min: 0,
      max: 10,
      idleTimeoutMillis: 30000
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