var express = require("express")
const router = express.Router()
var solidController = require("../controllers/solidController")

router.get("/get_solids", solidController.getSolidList)
router.post("/add_solid", solidController.addSolid)
router.put("/update_solid", solidController.updateSolid)
router.delete("/delete_solid", solidController.deleteSolid)

module.exports = router
