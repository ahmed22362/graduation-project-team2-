var express = require("express")
const router = express.Router()
var userController = require("../controllers/userController")

router.post("/signup", userController.signUp)
router.route("/").get(userController.getUsers).post(userController.addUser)
router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser)
// router.post("/register",userController.signUp );

module.exports = router
