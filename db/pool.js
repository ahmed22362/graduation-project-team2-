const { Pool, Client } = require("pg")
const dbConfig = require("./../config/dbConfig")
const query = require("./query")

const db_config = {

  connectionString: dbConfig.RENDER_URL,
  connectionTimeoutMillie: 300000,
  idleTimeoutMillie: 300000,
  max: 20,
}
const pool = new Pool(db_config)
pool.on("connect", async () => {
  checkDb(false, false)
  console.log("database is connect")
})

pool.on("remove", () => {
  console.log("database connection removed")
})

const checkDb = (flag, typeFlag) => {
  const client = new Client(db_config)
  if (flag) {
    client.connect((err) => {
      if (err) {
        console.error("Failed to connect to Postgres", err)
      } else {
        // Database already exists, create tables here
        // console.log(query.DDLQuery.CREATE_USER_TABLE)
        // create enum
        if (typeFlag) {
          client.query(query.DDLQuery.CREATE_pet_type)
          client.query(query.DDLQuery.CREATE_role_type)
          client.query(query.DDLQuery.CREATE_solid_type)
          client.query(query.DDLQuery.CREATE_gender_type)
          client.query(query.DDLQuery.CREATE_status_type)
        }
        // create tables
        client.query(query.DDLQuery.CREATE_USER_TABLE)
        client.query(query.DDLQuery.CREATE_PETS_TABLE)
        client.query(query.DDLQuery.CREATE_CLINKS_TABLE)
        client.query(query.DDLQuery.CREATE_SOLID_TABLE)
        client.query(query.DDLQuery.CREATE_User_Pet_TABLE)
        client.query(query.DDLQuery.CREATE_User_Solid_TABLE)
        client.query(query.DDLQuery.CREATE_COMMENTS_TABLE)
        client.query(query.DDLQuery.CREATE_RATING_TABLE)
        client.query(query.DDLQuery.CREATE_CHAT_TABLE)

        console.log("tables created successfully")
      }
    })
  }
}
module.exports = pool
