var query = require("../db/query")
var connection = require("../db/connection")

exports.getClinicList = async (req, res) => {
  try {
    const result = await connection.dbQuery(query.selectAllQuery(`clinic`))
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).json({ error: "Failed to list Clinic" })
  }
}

exports.addClinic = async (req, res) => {
  try {
    const { name, phone, country, city, rating } = req.body
    let values = [name, phone, country, city, rating]
    const result = await connection.dbQuery(
      query.queryList.SAVE_CLINIC_QUERY,
      values
    )
    res.status(201).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).json({ error: `Failed to add Clinic ${err.message}` })
  }
}

exports.updateClinic = async (req, res) => {
  try {
    const { name, phone, country, city, rating } = req.body
    let values = [name, phone, country, city, rating, req.params.id]
    if (!(await connection.isExist("clinic", req.params.id))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    const result = await connection.dbQuery(
      query.queryList.UPDATE_CLINIC_QUERY,
      values
    )
    res.status(200).json({ status: "successful", data: result.rows })
  } catch (err) {
    res.status(500).json({ error: `Failed to update Clinic ${err.message}` })
  }
}
exports.deleteClinic = async (req, res) => {
  try {
    if (!(await connection.isExist("clinic", req.params.id))) {
      return res
        .status(404)
        .json({ status: "fail", message: "please provide valid id" })
    }
    const result = await connection.dbQuery(
      query.deleteOneQuery("clinic", req.params.id)
    )
    res
      .status(200)
      .json({ status: "successful", message: "clinic deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: `Failed to delete Clinic ${err.message}` })
  }
}
