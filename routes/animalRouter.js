var express = require("express")
const router = express.Router()
var petController = require("../controllers/animalController")

router.get("/get_pets", petController.getPetList)
router.post("/add_pet", petController.addPet)
router.put("/update_pet", petController.updatePet)
router.delete("/delete_pet", petController.deletePet)

module.exports = router
