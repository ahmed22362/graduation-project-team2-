var query = require("../db/query")
var connection = require("../db/connection")

exports.getPetList = async (req, res) => {
  try {
    const result = await connection.dbQuery(query.queryList.GET_PET_LIST_QUERY)
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(400).send({ error: `Failed to list pet; ${err.message}` })
  }
}
exports.getPet = async (req, res) => {
  try {
    if (!(await connection.isExist(`pet`, req.params.petId))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    const result = await connection.dbQuery(
      query.selectOneQuery(`"pet"`, req.params.petId)
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: "Failed to get users" })
  }
}

exports.getHome = async (req, res) => {}

exports.addPet = async (req, res) => {
  try {
    if (req.file) {
      req.body.image_url = req.file.path
    }
    const columns = Object.keys(req.body).join(", ")
    const values = Object.values(req.body)
      .map((value) => `'${value}'`)
      .join(", ")

    const result = await connection.dbQuery(
      query.insertQuery("pet", columns, values)
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: `Failed to save pet ${err.message}` })
  }
}

exports.updatePet = async (req, res) => {
  try {
    if (req.file) {
      req.body.image_url = req.file.path
    }
    const petId = req.params.petId
    const body = req.body
    // check if pet exist
    if (!(await connection.isExist(`pet`, petId))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    const updateQuery = query.updateOneWhereId("pet", body, petId)
    console.log(updateQuery)
    const result = await connection.dbQuery(updateQuery)

    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: `Failed to update pet ${err.message}` })
  }
}
exports.deletePet = async (req, res) => {
  try {
    if (!(await connection.isExist(`pet`, req.params.petId))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    await connection.dbQuery(query.deleteOneQuery("pet", req.params.petId))
    res.status(201).send("Successfully pet deleted ")
  } catch (err) {
    res.status(500).send({ error: `Failed to delete pet ${err.message}` })
  }
}
