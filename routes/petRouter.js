var express = require("express")
const router = express.Router()
var petController = require("../controllers/petController")
const multer = require("multer")

const { storage } = require("./../utils/cloudinary")

const upload = multer({ storage })

router.get("/home", petController.getHome)
router
  .route("/")
  .get(petController.getPetList)
  .post(upload.single("image"), petController.addPet)
router
  .route("/:id")
  .patch(petController.updatePet)
  .delete(petController.deletePet)
  .get(petController.getPet)

module.exports = router
