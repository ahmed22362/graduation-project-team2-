var express = require("express")
const router = express.Router()
var solidController = require("../controllers/solidController")

router
  .route("/")
  .get(solidController.getSolidList)
  .post(solidController.addSolid)
router
  .route("/:id")
  .patch(solidController.updateSolid)
  .delete(solidController.deleteSolid)
  .get(solidController.getSolid)

module.exports = router
