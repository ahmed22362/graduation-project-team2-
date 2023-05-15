var express = require("express")
const router = express.Router({ mergeParams: true })
var petController = require("../controllers/petController")
const multer = require("multer")

const { storage } = require("./../utils/cloudinary")

const upload = multer({ storage: storage("photos/pets") })

router
  .route("/")
  .get(petController.getPetList)
  .post(upload.single("image"), petController.addPet)
router
  .route("/:petId")
  .patch(upload.single("image"), petController.updatePet)
  .delete(petController.deletePet)
  .get(petController.getPet)

module.exports = router
