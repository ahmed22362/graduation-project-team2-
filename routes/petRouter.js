var express = require("express")
const router = express.Router()
var petController = require("../controllers/petController")

router.route("/").get(petController.getPetList).post(petController.addPet)
router
  .route("/:id")
  .patch(petController.updatePet)
  .delete(petController.deletePet)
  .get(petController.getPet)

module.exports = router
