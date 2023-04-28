var pool = require('./pool');

exports.dbQuery = (queryText, queryParams) => {
    return new Promise((resolve , reject) => {

        pool.query(queryText, queryParams)
            .then(res => {
                console.log("mmmmmmmmmm")
                resolve(res);
            })
            .catch(err => {
                console.log("cccccccccccc")
                reject(err);
            })
    });
}