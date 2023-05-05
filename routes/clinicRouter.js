var express = require("express")
const router = express.Router()
var clinicController = require("../controllers/clinicController")

router
  .route("/")
  .get(clinicController.getClinicList)
  .post(clinicController.addClinic)
router
  .route("/:id")
  .patch(clinicController.updateClinic)
  .delete(clinicController.deleteClinic)

module.exports = router
