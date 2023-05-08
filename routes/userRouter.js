var express = require("express")
const router = express.Router()
var userController = require("../controllers/userController")
const authController = require("./../controllers/authController")

router.post("/signup", authController.signUp)
router.post("/login", authController.login)
router.post("/forgetPassword", authController.forgetPassword)
router.post("/resetPassword", authController.resetPassword)
router
  .route("/")
  .get(userController.getUsers)
  .post(userController.addUser)
  .delete(userController.deleteAll)
router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser)
// router.post("/register",userController.signUp );
// router.post("/signup", userController/.signUp)

module.exports = router
