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

exports.addPet = async (req, res) => {
  try {
    const {
      type,
      user_id,
      gender,
      country,
      city,
      description,
      status,
      image_url,
    } = req.body
    const values = [
      type,
      user_id,
      gender,
      country,
      city,
      description,
      status,
      image_url,
    ]
    const result = await connection.dbQuery(
      query.queryList.SAVE_PET_QUERY,
      values
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).send({ error: `Failed to save pet ${err.message}` })
  }
}

exports.updatePet = async (req, res) => {
  try {
    const {
      type,
      user_id,
      gender,
      country,
      city,
      description,
      status,
      image_url,
    } = req.body
    const values = [
      type,
      user_id,
      gender,
      country,
      city,
      description,
      status,
      image_url,
      req.params.id,
    ]
    // check if pet exist
    const pet = await connection.dbQuery(
      `select * from pet where id = ${req.params.id}`
    )
    if (pet.rows.length == 0) {
      res
        .status(404)
        .json({ status: "fail", message: "there are no pet with this id" })
    } else {
      const result = await connection.dbQuery(
        query.queryList.UPDATE_PET_QUERY,
        values
      )
      res.status(200).json({ status: "successful", data: result.rows })
    }
  } catch (err) {
    res.status(500).send({ error: `Failed to update pet ${err.message}` })
  }
}
exports.deletePet = async (req, res) => {
  try {
    await connection.dbQuery(query.queryList.DELETE_PET_QUERY, req.params.id)
    res.status(201).send("Successfully pet deleted ")
  } catch (err) {
    res.status(500).send({ error: `Failed to delete pet ${err.message}` })
  }
}
