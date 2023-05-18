var query = require("../db/query")
var connection = require("../db/connection")

exports.getPetComments = async (req, res) => {
  const pet_id = req.query.pet_id
  try {
    if (!pet_id) {
      return res
        .status(400)
        .json({ status: "fail", message: "please provide a pet id in params" })
    }

    const result = await connection.dbQuery(
      query.selectAllWhereQuery("comment", `pet_id=${pet_id}`)
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res
      .status(400)
      .json({ status: "fail", message: `can not get comments: ${err.message}` })
  }
}
exports.getAllComments = async (req, res) => {
  try {
    const result = await connection.dbQuery(query.selectAllQuery("comment"))
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ error: "Failed to list comments" })
  }
}

exports.addComment = async (req, res) => {
  try {
    if (req.user) {
      req.body.user_id = req.user.id
    }
    const columns = Object.keys(req.body).join(", ")
    const values = Object.values(req.body)
      .map((value) => `'${value}'`)
      .join(", ")
    const q = query.insertQuery("comment", columns, values)
    const result = await connection.dbQuery(q)
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: `Failed to add comment ${err.message}` })
  }
}

exports.updateComment = async (req, res) => {
  try {
    const { text, id } = req.body

    let values = [text, id]
    if (!(await connection.isExist("comment", req.params.id))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    const q = query.updateOneWhereId("comment", req.body, req.params.commentId)
    console.log(q, req.params)
    const result = await connection.dbQuery(q)
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(400).send({ error: `Failed to update comment ${err.message}` })
  }
}
exports.deleteComment = async (req, res) => {
  const { id } = req.body
  let values = [id]
  try {
    if (!(await connection.isExist("comment", req.params.id))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    await connection.dbQuery(query.deleteOneQuery("comment", values))
    res.status(201).send("Successfully comment deleted ")
  } catch (err) {
    res.status(400).send({ error: `Failed to delete comment ${err.message}` })
  }
}
