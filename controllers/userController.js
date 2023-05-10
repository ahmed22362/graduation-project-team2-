var query = require("../db/query")
var connection = require("../db/connection")
const pool = require("./../db/pool")
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
    if (!(email && password)) {
      return res
        .status(400)
        .json({ status: "fail", message: "please provide email or password" })
    }
    if (password !== password_confirm) {
      return res.status(400).json({
        status: "fail",
        message: "password and password confirm not matched",
      })
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
    ]
    const result = await connection.dbQuery(
      query.queryList.SAVE_USER_QUERY,
      values
    )
    if (role === "admin") {
      await pool.query(query.queryList.UPDATE_USER_ROLE_QUERY, [
        "admin",
        result.rows[0].id,
      ])
    }
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
    res.status(201).send("Successfully user deleted ")
  } catch (err) {
    res.status(400).send({ error: `Failed to delete user ${err.message}` })
  }
}

exports.deleteAll = async (req, res) => {
  try {
    await connection.dbQuery('DELETE FROM "user" where id != 1')
    res.status(201).send("Successfully user deleted ")
  } catch (err) {
    res.status(400).send({ error: `Failed to delete user ${err.message}` })
  }
}
