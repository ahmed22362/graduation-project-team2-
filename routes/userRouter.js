var express = require("express")
const router = express.Router()
var userController = require("../controllers/userController")

router.get("/get_user", userController.getUsers)
router.post("/add_user", userController.addUser)
router.put("/update_user", userController.updateUser)
// router.post("/register",userController.signUp );

module.exports = router
