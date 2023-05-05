const { Pool, Client } = require("pg")
const dotenv = require("dotenv")
const query = require("./query")
dotenv.config()
const connectionString = process.env.ELEPHANT_DATABASE_URL
const db_config = {
  user: "postgres",
  host: "localhost",
  database: "pets_db",
  password: "22362",
  port: 5432,
  // // connectionString: process.env.DATABASE_URL,
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
          client.query(query.DDLQuery)
        }
        // create tables
        client.query(query.DDLQuery.CREATE_USER_TABLE)
        client.query(query.DDLQuery.CREATE_PETS_TABLE)
        client.query(query.DDLQuery.CREATE_CLINKS_TABLE)
        client.query(query.DDLQuery.CREATE_SOLID_TABLE)
        client.query(query.DDLQuery.CREATE_User_Pet_TABLE)
        client.query(query.DDLQuery.CREATE_User_Solid_TABLE)
        console.log("tables created successfully")
      }
    })
  }
}
module.exports = pool
