var query = require("../db/query")
var connection = require("../db/connection")
const jwtConfig = require("./../config/jwtConfig")
const validator = require("../utils/validator")
const sendEmail = require("../utils/email")

const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const bcrypt = require("bcrypt")
const moment = require("moment")
const crypto = require("crypto")

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
    // console.log(req.body)
    // Get user input
    console.log(req.body)
    const { name, email, password, password_confirm } = req.body

    // Validate user input
    if (!(email && password && name)) {
      return res.status(400).send("All input is required")
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
      return res.status(409).send("email Already Exist.")
    }
    //Encrypt user password
    const encryptedUserPassword = await bcrypt.hash(password, 10)

    // Create user in our database
    const { country, city, phone, image_url, role } = req.body
    let values = [
      name,
      email,
      encryptedUserPassword,
      encryptedUserPassword,
      country,
      city,
      phone,
      image_url,
    ]
    connection
      .dbQuery(query.queryList.SAVE_USER_QUERY, values)
      .then((result) => {
        // return new user
        createSentToken(result.rows[0], 200, res)
      })
  } catch (err) {
    console.log(err.message)
    res
      .status(400)
      .json({ status: "fail", message: `Failed to signup user ${err.message}` })
  }
}
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // 1) Check if the email and password exits
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "fail", message: "email and password is required" })
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

exports.forgetPassword = async (req, res, next) => {
  // Find user
  if (!req.body.email) {
    return res
      .status(400)
      .json({ status: "fail", message: "please input email" })
  }
  const model = await connection.dbQuery(
    query.selectAllWhereQuery(`"user"`, `email = '${req.body.email}'`)
  )
  if (model.rows.length == 0) {
    return res
      .status(404)
      .send({ error: `Failed to find user with this email` })
  }
  // Create reset token
  const { code, hashed_code } = validator.createPasswordResetCode()

  const date = new Date()
  const new_date = moment(date)
    .add(30, "m")
    .toDate()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")

  const result = await connection.dbQuery(
    query.queryList.UPDATE_USER_PASSWORD_RESET_CODE,
    [hashed_code, new_date, model.rows[0].id]
  )
  // Send code to user Email
  const message = `Forgot your password? Submit this code with your new password and passwordConfirm to validate.\
  \nIf you didn't request to reset your password please ignore this message.\
  \n Your code is ${code}`
  try {
    await sendEmail({
      email: result.rows[0].email,
      subject: "Your password reset Code <valid for 30 min>",
      message,
    })
    return res.status(200).json({
      status: "success",
      message: `Code sent to mail! for test purpose the code is: ${code}`,
    })
  } catch (error) {
    const result = await connection.dbQuery(
      query.queryList.UPDATE_USER_PASSWORD_RESET_CODE,
      [null, null, model.rows[0].id]
    )
    console.log(`${error} for record: ${result.rows[0]}`)
    return res.status(404).send({
      error: `Failed to send the mail for this user: ${error.message}`,
    })
  }
}
exports.resetPassword = async (req, res, next) => {
  // Find the user based on token
  const hashedCode = crypto
    .createHash("sha256")
    .update(req.body.code)
    .digest("hex")
  // Check password and token
  const date = new Date()
  const new_date = moment(date)
    .toDate()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
  const model = await connection.dbQuery(
    query.selectAllWhereQuery(`"user"`, `password_reset_code = '${hashedCode}'`)
  )
  console.log(
    query.selectAllWhereQuery(`"user"`, `password_reset_code = '${hashedCode}'`)
  )
  if (model.rows.length == 0) {
    return res.status(400).send({ error: `invalid token or has expire` })
  }
  // Update changedPasswordAt property for the user
  if (req.body.password !== req.body.password_confirm) {
    return res.status(400).json({
      status: "fail",
      message: "password and password confirm must match!",
    })
  }
  const encryptedUserPassword = await bcrypt.hash(req.body.password, 10)

  connection
    .dbQuery(query.queryList.UPDATE_USER_PASSWORD_RESET_CODE, [
      null,
      null,
      model.rows[0].id,
    ])
    .then(async (result) => {
      const model = await connection.dbQuery(
        query.queryList.UPDATE_USER_PASSWORD_QUERY,
        [encryptedUserPassword, encryptedUserPassword, result.rows[0].id]
      )
      // Update the user and log in via jwt
      createSentToken(model.rows[0], 200, res)
    })
}

// not done yet! do it if you want
exports.updateUserPassword = async (req, res, next) => {
  // Get User
  const model = await Model.findByPk(req.user.id)
  // Check password and compare it
  if (
    !(await model.correctPassword(req.body.passwordCurrent, model.password))
  ) {
    return next(new AppError("Invalid current password", 401))
  }
  // Update the user data
  model.password = req.body.password
  model.passwordConfirm = req.body.passwordConfirm
  await model.save()
  // Log user in, send JWT
  createSentToken(model, 200, res)
}
