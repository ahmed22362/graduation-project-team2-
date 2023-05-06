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
    if (!(await connection.isExist("solid", req.params.id))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    const result = await connection.dbQuery(
      query.selectOneQuery("solid", req.params.id)
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: "Failed to list solid" })
  }
}

exports.addSolid = async (req, res) => {
  try {
    const {
      name,
      type,
      price,
      country,
      city,
      description,
      image_url,
      user_id,
    } = req.body

    let values = [
      name,
      type,
      price,
      country,
      city,
      description,
      image_url,
      user_id,
    ]
    const result = await connection.dbQuery(
      query.queryList.SAVE_SOLID_QUERY,
      values
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: `Failed to add solid ${err.message}` })
  }
}

exports.updateSolid = async (req, res) => {
  try {
    const {
      name,
      type,
      price,
      country,
      city,
      description,
      image_url,
      user_id,
    } = req.body

    let values = [
      name,
      type,
      price,
      country,
      city,
      description,
      image_url,
      user_id,
      req.params.id,
    ]
    if (!(await connection.isExist("solid", req.params.id))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    const result = await connection.dbQuery(
      query.queryList.UPDATE_SOLID_QUERY,
      values
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(400).send({ error: `Failed to update solid ${err.message}` })
  }
}
exports.deleteSolid = async (req, res) => {
  try {
    if (!(await connection.isExist("solid", req.params.id))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    await connection.dbQuery(query.deleteOneQuery("solid", req.params.id))
    res.status(201).send("Successfully solid deleted ")
  } catch (err) {
    res.status(400).send({ error: `Failed to delete solid ${err.message}` })
  }
}
