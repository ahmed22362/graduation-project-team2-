var pool = require("./pool")

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
