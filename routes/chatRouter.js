var express = require("express")
const router = express.Router()
var chatController = require("../controllers/chatController")


router.post("/message",chatController.sendMessages);

module.exports = router
