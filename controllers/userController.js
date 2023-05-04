var query = require("../db/query")
var connection = require("../db/connection")

exports.getUsers = async (req, res) => {
  try {
    var usersQuery = query.queryList.GET_USER_QUERY
    var result = await connection.dbQuery(usersQuery)
    return res.status(200).send(JSON.stringify(result.rows))
  } catch (err) {
    return res.status(500).send({ error: "Failed to get user" })
  }
}

exports.addUser = async (req, res) => {
  try {
    var user_id = req.body.user_id
    var user_name = req.body.user_name
    var user_password = req.body.user_password
    var phone = req.body.phone
    var imge_user = req.body.imge_user
    var is_admin = req.body.is_admin
    var e_mail = req.body.e_mail
    var country = req.body.country
    var city = req.body.city
    var pet_id = req.body.pet_id

    let values = [
      user_id,
      user_name,
      user_password,
      phone,
      imge_user,
      is_admin,
      e_mail,
      country,
      city,
      pet_id,
    ]
    var saveUserQuery = query.queryList.SAVE_USER_QUERY
    await connection.dbQuery(saveUserQuery, values)
    return res.status(201).send("Successfully user created ")
  } catch (err) {
    console.log("Error : " + err)
    return res.status(500).send({ error: "Failed to add user" })
  }
}

exports.updateUser = async (req, res) => {
  try {
    var user_id = req.body.user_id
    var user_name = req.body.user_name
    var user_password = req.body.user_password
    var phone = req.body.phone
    var imge_user = req.body.imge_user
    var is_admin = req.body.is_admin
    var e_mail = req.body.e_mail
    var country = req.body.country
    var city = req.body.city
    var pet_id = req.body.pet_id

    let values = [
      user_name,
      user_password,
      phone,
      imge_user,
      is_admin,
      e_mail,
      country,
      city,
      pet_id,
      user_id,
    ]
    var updateUserQuery = query.queryList.UPDATE_USER_QUERY
    await connection.dbQuery(updateUserQuery, values)
    return res.status(201).send("Successfully user updated ")
  } catch (err) {
    console.log("Error : " + err)
    return res.status(500).send({ error: "Failed to update user" })
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
