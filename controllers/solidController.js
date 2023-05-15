var query = require("../db/query")
var connection = require("../db/connection")

exports.getSolidList = async (req, res) => {
  try {
    const result = await connection.dbQuery(query.selectAllQuery("solid"))
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: "Failed to list solid" })
  }
}
exports.getSolid = async (req, res) => {
  try {
    if (!(await connection.isExist("solid", req.params.solidId))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    const result = await connection.dbQuery(
      query.selectOneQuery("solid", req.params.solidId)
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: "Failed to list solid" })
  }
}

exports.addSolid = async (req, res) => {
  try {
    if (req.file) {
      req.body.image_url = req.file.path
    }
    const columns = Object.keys(req.body).join(", ")
    const values = Object.values(req.body)
      .map((value) => `'${value}'`)
      .join(", ")

    const result = await connection.dbQuery(
      query.insertQuery("solid", columns, values)
    )

    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: `Failed to add solid ${err.message}` })
  }
}

exports.updateSolid = async (req, res) => {
  try {
    const solidId = req.params.solidId
    if (!(await connection.isExist("solid", req.params.solidId))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    const updateQuery = query.updateOneWhereId("solid", req.body, solidId)
    const result = await connection.dbQuery(updateQuery)
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(400).send({ error: `Failed to update solid ${err.message}` })
  }
}
exports.deleteSolid = async (req, res) => {
  try {
    if (!(await connection.isExist("solid", req.params.solidId))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    await connection.dbQuery(query.deleteOneQuery("solid", req.params.solidId))
    res.status(201).send("Successfully solid deleted ")
  } catch (err) {
    res.status(400).send({ error: `Failed to delete solid ${err.message}` })
  }
}
