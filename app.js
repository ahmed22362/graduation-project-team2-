const express = require("express")
var petRoute = require("./routes/petRouter")
var solidRoute = require("./routes/solidRouter")
var clinicRoute = require("./routes/clinicRouter")
var userRouter = require("./routes/userRouter")
var body_parser = require("body-parser")
const pool = require("./db/pool")
const app = express()

// pool.connect((err, client, done) => {
//   if (err) {
//     console.error("Error connecting to database:", err.stack)
//   } else {
//     console.log("Connected to database")
//     done()
//   }
// })

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

app.use("/pet", petRoute)
app.use("/solid", solidRoute)
app.use("/clinic", clinicRoute)
app.use("/user", userRouter)

app.use("/", (req, res) => {
  res.status(200).json({ status: "success", msg: "home page" })
})
app.listen(3222, () => {
  console.log(`server working on port ${3222}....`)
})
