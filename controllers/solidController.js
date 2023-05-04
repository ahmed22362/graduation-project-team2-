var query = require("../db/query")
var connection = require("../db/connection")

exports.getSolidList = async (req, res) => {
  try {
    var solidListQuery = query.queryList.GET_SOLID_LIST_QUERY
    var result = await connection.dbQuery(solidListQuery)
    return res.status(200).send(JSON.stringify(result.rows))
  } catch (err) {
    return res.status(500).send({ error: "Failed to list solid" })
  }
}

exports.addSolid = async (req, res) => {
  try {
    var solid_id = req.body.solid_id
    var name = req.body.name
    var info = req.body.info
    var solid_imge = req.body.solid_id
    var price = req.body.price
    var is_food = req.body.is_food
    var user_id = req.body.user_id
    var country = req.body.country
    var city = req.body.city

    let values = [
      solid_id,
      name,
      info,
      solid_imge,
      price,
      is_food,
      user_id,
      country,
      city,
    ]
    var saveSolidQuery = query.queryList.SAVE_SOLID_QUERY
    await connection.dbQuery(saveSolidQuery, values)
    return res.status(201).send("Successfully solid created ")
  } catch (err) {
    console.log("Error : " + err)
    return res.status(500).send({ error: "Failed to add solid" })
  }
}

exports.updateSolid = async (req, res) => {
  try {
    var solid_id = req.body.solid_id
    var name = req.body.name
    var info = req.body.info
    var solid_imge = req.body.solid_id
    var price = req.body.price
    var is_food = req.body.is_food
    var user_id = req.body.user_id
    var country = req.body.country
    var city = req.body.city

    let values = [
      name,
      info,
      solid_imge,
      price,
      is_food,
      user_id,
      country,
      city,
      solid_id,
    ]
    var updateSolidQuery = query.queryList.UPDATE_SOLID_QUERY
    await connection.dbQuery(updateSolidQuery, values)
    return res.status(201).send("Successfully solid updated ")
  } catch (err) {
    console.log("Error : " + err)
    return res.status(500).send({ error: "Failed to update solid" })
  }
}
exports.deleteSolid = async (req, res) => {
  try {
    var solid_id = req.body.solid_id
    if (!solid_id) {
      return res.status(500).send({ error: "can not delete empty solid" })
    }
    var deleteSolidQuery = query.queryList.DELETE_SOLID_QUERY
    await connection.dbQuery(deleteSolidQuery, [solid_id])
    return res.status(201).send("Successfully solid deleted ")
  } catch (err) {
    console.log("Error : " + err)
    return res.status(500).send({ error: "Failed to delete solid" })
  }
}
