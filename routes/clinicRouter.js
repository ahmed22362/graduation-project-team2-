var express = require("express")
const router = express.Router()
var clinicController = require("../controllers/clinicController")

router.get("/get_clinic", clinicController.getClinicList)
router.post("/add_clinic", clinicController.addClinic)
router.put("/update_clinic", clinicController.updateClinic)
router.delete("/delete_clinic", clinicController.deleteClinic)

module.exports = router
