var express = require("express")
const router = express.Router()
var userController = require("../controllers/userController")

router.route("/").get(userController.getUsers).post(userController.addUser)
router.patch("/:id", userController.updateUser)
// router.post("/register",userController.signUp );

module.exports = router
