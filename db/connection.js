var pool = require("./pool")
const query = require("./query")

exports.dbQuery = (queryText, queryParams) => {
  return new Promise((resolve, reject) => {
    pool
      .query(queryText, queryParams)
      .then((res) => {
        console.log("Query executed successfully")
        resolve(res)
      })
      .catch((err) => {
        console.log(`Query did not executed!: ${err.message}`)
        reject(err)
      })
  })
}

exports.isExist = async (table, id) => {
  try {
    var record = await pool.query(query.selectOneQuery(table, id))
    if (record.rowCount === 0) {
      return false
    }
    return true
  } catch (error) {
    return error.message
  }
}
exports.isExistWhere = async (table, where) => {
  try {
    var record = await pool.query(query.selectAllWhereQuery(table, where))
    if (record.rowCount === 0) {
      return false
    } else {
      return true
    }
  } catch (error) {
    return error.message
  }
}
