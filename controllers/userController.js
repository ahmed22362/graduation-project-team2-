var query = require("../db/query")
var connection = require("../db/connection")

exports.getUsers = async (req, res) => {
  try {
    const result = await connection.dbQuery(query.queryList.GET_USER_QUERY)
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: "Failed to get users" })
  }
}

exports.addUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      password_confirm,
      country,
      city,
      phone,
      image_url,
      role,
    } = req.body
    let values = [
      name,
      email,
      password,
      password_confirm,
      country,
      city,
      phone,
      image_url,
      role,
    ]
    const result = await connection.dbQuery(
      query.queryList.SAVE_USER_QUERY,
      values
    )
    res.status(201).json({ status: "successful", data: result.rows })
  } catch (err) {
    console.log("Error : " + err)
    res.status(500).send({ error: "Failed to add user" })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { name, email, country, city, phone, image_url } = req.body
    let values = [name, email, country, city, phone, image_url, req.params.id]
    console.log(values)
    const result = await connection.dbQuery(
      query.queryList.UPDATE_USER_QUERY,
      values
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: `Failed to update user ${err.message}` })
  }
}

// exports.signUp = async (req, res) => {
//   // Our register logic starts here
//   try {
//     // Get user input
//     const { user_name, user_password, e_mail } = req.body

//     // Validate user input
//     if (!(e_mail && user_password && user_name)) {
//       res.status(400).send("All input is required")
//     }

//     // check if user already exist
//     // Validate if user exist in our database

//     const oldUser = await connection.dbQuery(
//       "SELECT * FROM users WHERE e_mail = $1",
//       e_mail
//     )
//     console.log(oldUser)

//     if (oldUser) {
//       return res.status(409).send("User Already Exist. Please Login")
//     }

//     //Encrypt user password
//     encryptedUserPassword = await bcrypt.hash(user_password, 10)

//     // Create user in our database
//     const user = await User.create({
//       user_name: user_name,
//       e_mail: e_mail.toLowerCase(), // sanitize
//       user_password: encryptedUserPassword,
//     })

//     // Create token
//     const token = jwt.sign(
//       { user_id: user.user_id, e_mail },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "5h",
//       }
//     )
//     // save user token
//     user.token = token

//     // return new user
//     res.status(201).json(user)
//   } catch (err) {
//     console.log(err)
//   }
//   // Our register logic ends here
// }
