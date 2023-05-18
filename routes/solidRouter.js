var express = require("express")
const router = express.Router({ mergeParams: true })
var solidController = require("../controllers/solidController")
const authController = require("./../controllers/authController")

router.post("/like", authController.protect, solidController.addLike)
router
  .route("/")
  .get(solidController.getSolidList)
  .post(solidController.addSolid)
router
  .route("/:solidId")
  .patch(solidController.updateSolid)
  .delete(solidController.deleteSolid)
  .get(solidController.getSolid)

module.exports = router
