var query = require("../db/query")
var connection = require("../db/connection")

exports.getPetList = async (req, res) => {
  try {
    var petListQuery = query.queryList.GET_PET_LIST_QUERY
    var result = await connection.dbQuery(petListQuery)
    return res.status(200).send(JSON.stringify(result.rows))
  } catch (err) {
    return res.status(400).send({ error: `Failed to list pet; ${err.message}` })
  }
}

exports.addPet = async (req, res) => {
  try {
    var pet_id = req.body.pet_id
    var user_id = req.body.user_id
    var type = req.body.type
    var gender = req.body.gender
    var imge_pet = req.body.imge_pet
    var info = req.body.info
    var status = req.body.status
    var country = req.body.country
    var city = req.body.city
    var price = req.body.price

    let values = [
      pet_id,
      info,
      user_id,
      price,
      imge_pet,
      gender,
      type,
      status,
      country,
      city,
    ]
    var savePetQuery = query.queryList.SAVE_PET_QUERY
    await connection.dbQuery(savePetQuery, values)
    return res.status(201).send("Successfully pet created ")
  } catch (err) {
    console.log("Error : " + err)
    return res.status(500).send({ error: "Failed to save pet" })
  }
}

exports.updatePet = async (req, res) => {
  try {
    var pet_id = req.body.pet_id
    var user_id = req.body.user_id
    var type = req.body.type
    var gender = req.body.gender
    var imge_pet = req.body.imge_pet
    var info = req.body.info
    var status = req.body.status
    var country = req.body.country
    var city = req.body.city
    var price = req.body.price

    let values = [
      info,
      user_id,
      price,
      imge_pet,
      gender,
      type,
      status,
      country,
      city,
      pet_id,
    ]
    var updatePetQuery = query.queryList.UPDATE_PET_QUERY
    await connection.dbQuery(updatePetQuery, values)
    return res.status(201).send("Successfully pet updated ")
  } catch (err) {
    console.log("Error : " + err)
    return res.status(500).send({ error: "Failed to update pet" })
  }
}
exports.deletePet = async (req, res) => {
  try {
    var pet_id = req.body.pet_id
    if (!pet_id) {
      return res.status(500).send({ error: "can not delete empty pet" })
    }
    var deletePetQuery = query.queryList.DELETE_PET_QUERY
    await connection.dbQuery(deletePetQuery, [pet_id])
    return res.status(201).send("Successfully pet deleted ")
  } catch (err) {
    console.log("Error : " + err)
    return res.status(500).send({ error: "Failed to delete pet" })
  }
}
