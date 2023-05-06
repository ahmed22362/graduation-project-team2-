const jwt = require("jsonwebtoken")
var query = require("../db/query")
var connection = require("../db/connection")
const bcrypt = require("bcrypt")
const jwtConfig = require("./../config/jwtConfig")
const validator = require("../utils/validator")
const { promisify } = require("util")

const signToken = (payload) => {
  return jwt.sign(payload, jwtConfig.JWT_SECRET, {
    expiresIn: jwtConfig.JWT_EXPIRES_IN,
  })
}
const createSentToken = (model, statusCode, res) => {
  const token = signToken({ id: model.id })
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      model,
    },
  })
}
exports.signUp = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { email, password, password_confirm } = req.body

    // Validate user input
    if (!(email || password)) {
      res.status(400).send("All input is required")
    }
    const { valid, reason } = await validator.isEmailValid(email)
    // check if the email is really exist or not
    // if (!valid) {
    //   return res.status(400).json({
    //     status: "fail",
    //     message: `please enter valid email :${reason}`,
    //   })
    // }

    if (password !== password_confirm) {
      return res.status(400).json({
        status: "fail",
        message: "password and password confirm not matched",
      })
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
    connection
      .dbQuery(query.queryList.SAVE_USER_QUERY, values)
      .then((result) => {
        createSentToken(result.rows[0], 200, res)
      })
    // return new user
  } catch (err) {
    res.status(400).send({ error: `Failed to signup user ${err.message}` })
  }
}
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // 1) Check if the email and password exits
    if (!email || !password) {
      res.status(400).send("All input is required")
    }
    if (!(await connection.isExistWhere(`"user"`, `email = '${email}'`))) {
      return res.status(409).send("please enter an exist email")
    }
    const user = await connection.dbQuery(
      query.selectAllWhereQuery(`"user"`, `email = '${email}'`)
    )
    if (await validator.correctPassword(password, user.rows[0].password)) {
      connection
        .dbQuery(query.selectAllWhereQuery(`"user"`, `email = '${email}'`))
        .then((result) => {
          // return new user
          createSentToken(result.rows[0], 200, res)
        })
    } else {
      res
        .status(400)
        .json({ status: "fail", message: "the password is incorrect" })
    }
  } catch (err) {
    res.status(400).send({ error: `Failed to login user ${err.message}` })
  }
}
exports.protect = async (req, res, next) => {
  // 1) Getting token and Check if it's true
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  }
  if (!token) {
    return res
      .status(400)
      .json({ status: "fail", message: `please provide the token!` })
  }
  let decoded = ""
  // 2) Verification token
  try {
    decoded = await promisify(jwt.verify)(token, jwtConfig.JWT_SECRET)
  } catch (error) {
    return res
      .status(400)
      .send({ error: `Failed to parse the token ${error.message}` })
  }
  // 3) Check if the user still exist
  const result = await connection.dbQuery(
    query.selectOneQuery(`"user"`, decoded.id)
  )
  if (result.rows.length == 0) {
    return res
      .status(404)
      .send({ error: `Failed to find the user ${err.message}` })
  }
  req.user = result.rows[0]
  next()
}
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).send({ error: `You are not authorized to access this` })
    }
    next()
  }
}
