const express = require("express")
var userController = require("../controllers/userController")
const authController = require("./../controllers/authController")
const connection = require("../db/connection")
const petRouter = require("./petRouter")
const router = express.Router({ mergeParams: true })

router.post("/signup", authController.signUp)
router.post("/login", authController.login)
router.post("/forgetPassword", authController.forgetPassword)
router.post("/resetPassword", authController.resetPassword)
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updateUserPassword
)
// router.route("/pet-favorite")
// router.route("/solid-favorite")
router.get("/home", userController.getHome)
router.get("/pet", authController.protect, userController.getUserPets)
router
  .route("/")
  .get(userController.getUsers)
  .post(userController.addUser)
  .delete(userController.deleteAll)
router
  .route("/:userId")
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser)

// router.post("/register",userController.signUp );
// router.post("/signup", userController/.signUp)
router.get("/joinPet", async (req, res) => {
  try {
    await connection.dbQuery(
      " SELECT * FROM pet JOIN 'user' ON pet.user_id = user.id"
    )
    res.status(201).send("Successfully user joined ")
  } catch (err) {
    res.status(400).send({ error: `Failed to join user ${err.message}` })
  }
})
router.get("/joinSolid", async (req, res) => {
  try {
    await connection.dbQuery(
      " SELECT * FROM  solid JOIN 'user' ON solid.user_id = user.id"
    )
    res.status(201).send("Successfully user joined ")
  } catch (err) {
    res.status(400).send({ error: `Failed to join user ${err.message}` })
  }
})
module.exports = router
