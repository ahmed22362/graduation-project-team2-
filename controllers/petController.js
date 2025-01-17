var query = require("../db/query")
var connection = require("../db/connection")
const validator = require("./../utils/validator")
exports.getPetList = async (req, res) => {
  try {
    const result = await connection.dbQuery(query.queryList.GET_PET_LIST_QUERY)
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(400).send({ error: `Failed to list pet; ${err.message}` })
  }
}
exports.getUserPets = async (req, res) => {
  try {
    if (!req.user.id) {
      return res
        .status(400)
        .json({ status: "fail", message: "please provide user id" })
    }
    const result = await connection.dbQuery(
      query.selectAllWhereQuery("pet", `user_id=${req.user.id}`)
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res
      .status(400)
      .json({ status: "fail", message: `can not get comments: ${err.message}` })
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
      query.selectOneQuery(`pet`, req.params.petId)
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res
      .status(400)
      .json({ status: "fail", message: `Failed to get pets:${err.message}` })
  }
}

exports.addPet = async (req, res) => {
  try {
    if (req.file) {
      req.body.image_url = req.file.path
    }
    if (req.user) {
      req.body.user_id = req.user.id
    }
    console.log(req.body)
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
    console.log(req.body)
    // check if pet exist
    if (!(await connection.isExist(`pet`, petId))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    if (
      !(await validator.isOwner("pet", petId, req.user.id)) &&
      req.user.role == "user"
    ) {
      return res.status(403).json({
        status: "fail",
        message: "you don't own permissions to do this!",
      })
    }
    const updateQuery = query.updateOneWhereId("pet", body, petId)
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
    if (
      !(await validator.isOwner("pet", req.params.petId, req.user.id)) &&
      req.user.role == "user"
    ) {
      return res.status(403).json({
        status: "fail",
        message: "you don't own permissions to do this!",
      })
    }
    await connection.dbQuery(query.deleteOneQuery("pet", req.params.petId))
    res.status(201).send("Successfully pet deleted ")
  } catch (err) {
    res.status(500).send({ error: `Failed to delete pet ${err.message}` })
  }
}

exports.addLike = async (req, res) => {
  req.body.user_id = req.user.id
  try {
    const pet = await connection.dbQuery(
      `update pet set "like" = "like" + 1 where id = '${req.body.pet_id}' returning *`
    )
    const like = pet.rows[0]
    const q = query.insertQuery(
      "user_pet_favorite",
      "user_id , pet_id",
      `${req.user.id}, ${req.body.pet_id}`
    )
    await connection.dbQuery(q)
    res.status(200).json({ status: "success", data: like })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: `can't like the same post twice: ${error.message}`,
    })
  }
}
