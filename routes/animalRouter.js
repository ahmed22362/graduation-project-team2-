var express =require ('express');
const router = express.Router();
var petControler = require('../controlers/animalControler');

router.get("/get_pets",petControler.getPetList);
router.post("/add_pet",petControler.addPet);
router.put("/update_pet",petControler.updatePet);
router.delete("/delete_pet",petControler.deletePet);

module.exports = router