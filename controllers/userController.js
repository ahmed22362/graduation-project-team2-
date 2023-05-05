var query = require("../db/query")
var connection = require("../db/connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.getUsers = async (req, res) => {
  try {
    const result = await connection.dbQuery(query.queryList.GET_USER_QUERY)
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: "Failed to get users" })
  }
}
exports.getUser = async (req, res) => {
  try {
    if (!(await connection.isExist(`"user"`, req.params.id))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    const result = await connection.dbQuery(
      query.selectOneQuery(`"user"`, req.params.id)
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: "Failed to get users" })
  }
}

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, country, city, phone, image_url, role } =
      req.body
    if (!(email && password)) {
      return res
        .status(400)
        .json({ status: "fail", message: "please provide email or password" })
    }
    const encryptedUserPassword = await bcrypt.hash(password, 10)
    let values = [
      name,
      email,
      encryptedUserPassword,
      encryptedUserPassword,
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
    res.status(201).json({ status: "successful", data: result.rows[0] })
  } catch (err) {
    console.log("Error : " + err)
    res.status(500).send({ error: "Failed to add user" })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { name, email, country, city, phone, image_url } = req.body
    let values = [name, email, country, city, phone, image_url, req.params.id]
    if (!(await connection.isExist(`"user"`, req.params.id))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    const result = await connection.dbQuery(
      query.queryList.UPDATE_USER_QUERY,
      values
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: `Failed to update user ${err.message}` })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    if (!(await connection.isExist(`"user"`, req.params.id))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    await connection.dbQuery(query.deleteOneQuery(`"user"`, req.params.id))
    res.status(201).send("Successfully solid deleted ")
  } catch (err) {
    res.status(400).send({ error: `Failed to delete user ${err.message}` })
  }
}

exports.signUp = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { email, password } = req.body

    // Validate user input
    if (!(email || password)) {
      res.status(400).send("All input is required")
    }

    // check if user already exist
    // Validate if user exist in our database
    if (await connection.isExistWhere(`"user"`, `email = '${email}'`)) {
      return res.status(409).send("email Already Exist. Please Login")
    }
    //Encrypt user password
    const encryptedUserPassword = await bcrypt.hash(password, 10)

    // Create user in our database
    const { name, country, city, phone, image_url, role } = req.body
    let values = [
      name,
      email,
      encryptedUserPassword,
      encryptedUserPassword,
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
    const id = result.rows[0].id
    // Create token
    const token = jwt.sign({ user_id: id }, "process.env.TOKEN_KEY", {
      expiresIn: "5h",
    })
    // return new user
    res.status(201).json({ message: "done", token, data: result.rows[0] })
  } catch (err) {
    console.log(err)
  }
}
