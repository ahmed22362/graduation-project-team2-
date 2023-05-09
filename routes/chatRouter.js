var express = require("express")
const router = express.Router()
var chatController = require("../controllers/chatController")


router
    .post("/massege",chatController.sendMassege);

module.exports = router
